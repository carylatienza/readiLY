# Feature: 05-asr-scoring-engine — On-Device Oral Reading Scoring

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

## Feature Description

The scoring engine that turns a `RECORDED` assessment session (plan 04: 16 kHz/16-bit/mono WAV + student + passage FKs) into an oral reading fluency score — fully on-device, fully offline. Pipeline:

1. **ASR**: sherpa-onnx `OfflineRecognizer` running the INT8 **Zipformer transducer** model `sherpa-onnx-zipformer-gigaspeech-2023-12-12` (~69 MB on disk, ~200 MB runtime RAM, RTF < 0.1) bundled in APK assets. Decoding uses `modified_beam_search` with a **hotwords file built from the passage tokens** — the sherpa-onnx mechanism for biasing decoding toward the known reference text (sherpa-onnx has no Vosk-style hard grammar; soft contextual biasing + alignment is the constrained-decoding strategy the feasibility doc calls for). Transducer output includes token-level timestamps; BPE tokens are merged into words with per-word start times.
2. **Alignment**: Needleman-Wunsch global alignment of hypothesis words against the passage's stored `tokens` (plan 03), producing a per-reference-word verdict: `CORRECT | SUBSTITUTION | OMISSION | SELF_CORRECTION`, plus `INSERTION` records anchored between reference words. Word equality passes through a **dialect-tolerance normalizer** (Philippine English /p/↔/f/, /b/↔/v/, /t,d/↔/th/ are not errors — Phil-IRI mandate) with a configurable substitution set (the calibration knob).
3. **Metrics**: WCPM, accuracy %, and error counts by type, persisted as a `ScoringResultEntity` Room row (summary columns + per-word results as a JSON column).
4. **Background execution**: an application-scoped `ScoringQueue` observes `AssessmentSessionDao.observeUnscored()` (built in plan 04 exactly for this) and scores sessions one at a time; it is self-healing across process death because the Flow re-emits unscored rows on next app start. Sessions flip `RECORDED → SCORED`.
5. **Results screen**: passage rendered with per-word color coding (green/amber/red/strikethrough per verdict) + a summary card (WCPM, accuracy %, error breakdown), reachable from the session save flow.

**Language scope (MVP): English-only scoring.** No production-ready, ≤200 MB, sherpa-onnx-compatible Filipino/Tagalog model exists as of mid-2026 (see NOTES for the full survey and the fine-tuning path). Filipino-passage sessions stay `RECORDED` and the results screen shows a "Filipino scoring coming soon" state.

## User Story

As a Grade 1–3 teacher
I want the app to automatically score a recorded reading session — words correct per minute, accuracy, and which words the student missed — right on my tablet with no internet
So that I get an objective, Phil-IRI-aligned fluency measure minutes after the assessment instead of spending hours hand-marking running records

## Problem Statement

Plan 04 produces audio; nothing evaluates it. Manual Phil-IRI scoring requires the teacher to track seven miscue types with a stopwatch — the exact burden this app exists to remove. The scoring must run on 4 GB DepEd tablets offline, and it must NOT use Seq2Seq ASR (Whisper/Moonshine), because those models hallucinate grammatically correct text over a struggling reader's disfluent audio and silently inflate WCPM — the single biggest technical risk named in `docs/research/Technical Feasibility Assessment.md` (§6).

## Solution Statement

- **Engine: sherpa-onnx** (Transducer/Zipformer, INT8) via the published Maven artifact — the feasibility doc's primary recommendation: frame-accurate timestamps, hallucination-resistant, ~200 MB RAM, RTF < 0.1 on ARM. Vosk (grammar-restricted HMM-TDNN) is the documented fallback, not built now.
- **Model**: `sherpa-onnx-zipformer-gigaspeech-2023-12-12` int8 — offline (non-streaming) English Zipformer trained on GigaSpeech (broad acoustic variety, better for accented speech than LibriSpeech-only models). encoder.int8 ≈ 68 MB + decoder ≈ small fp32 + joiner.int8 ≈ 253 KB + tokens/bpe ≈ 69 MB total. Bundled in `app/src/main/assets/` (offline-first: no download step, target schools have no reliable connectivity; APK grows ~70 MB — acceptable and sideload-friendly).
- **Constrained decoding**: `decodingMethod = "modified_beam_search"` + hotwords file generated from the passage tokens (soft biasing, transducer-only feature). Hard constraint is impossible in sherpa-onnx; the Needleman-Wunsch alignment stage is what actually classifies miscues, per the Wadhwani AI precedent (post-processing alignment against the target paragraph, 95% hit precision).
- **Alignment: Needleman-Wunsch** (global, not local — the child attempts the whole passage; global alignment naturally yields omissions at gaps and insertions at hypothesis surplus). Pure Kotlin, O(n·m), passages ≤ ~130 words — microseconds. Chosen over plain Levenshtein because we need the full backtrace (per-word verdicts), not just a distance.
- **Self-correction pass**: after alignment, a 3-word look-ahead window nullifies a substitution/insertion when the correct target word follows (Phil-IRI: self-corrections are not errors — `Validation of Automated Oral Reading Fluency Systems.md` §Miscue Taxonomy, rule 2).
- **Calibration knob**: `DialectTolerance` — a configurable phoneme-class normalization applied before word comparison (/p/↔/f/, /b/↔/v/, th↔t/d), defaulting ON, stored as a simple settings value so field calibration doesn't need a rebuild.
- **Persistence**: one `ScoringResultEntity` (summary columns + `wordResults` JSON via TypeConverter) — no separate per-word table; plan 06 dashboards read summary columns, the results screen reads the JSON. `// ponytail:` JSON column; split into a child table only if plan 06 ever needs per-word SQL queries.
- **Background job: application-scoped coroutine queue, not WorkManager.** The `RECORDED` status column in Room *is* the durable work queue; `observeUnscored()` re-drives it after any crash/kill. WorkManager would add a dependency, Hilt-work wiring, and a second source of truth for zero extra guarantee here. `// ponytail:` in-process queue; adopt WorkManager only if scoring must run with the app fully closed.

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: High
**Primary Systems Affected**: New `scoring` package (ASR + alignment + metrics), Room DB (new entity, version bump), assets (model files), navigation (results route), Application class (queue start)
**Dependencies**: `com.k2fsa.sherpa.onnx:sherpa-onnx-android:1.13.4` (Maven Central; JNI + Kotlin API + prebuilt .so for all ABIs), `kotlinx-serialization-json` (already present from plan 03 seed loading). No other new dependencies.

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

Plans 01–04 create these; locate by name and reconcile exact paths/types before starting:

- `app/src/main/java/com/readily/app/data/local/ReadilyDatabase.kt` (plan 01) — Why: entity registration + version-bump + migration convention (plan 01 forbids `fallbackToDestructiveMigration`; check what plans 02–04 actually did).
- `app/src/main/java/com/readily/app/data/db/AssessmentSessionEntity.kt` + `AssessmentSessionDao.kt` (plan 04) — Why: `SessionStatus { RECORDED, SCORED }`, `observeUnscored()` (this plan's work queue), `updateStatus()`, `audioFilePath`, `durationMs`, PK types for the FK.
- `app/src/main/java/com/readily/app/data/local/entity/PassageEntity.kt` (plan 03) — Why: `tokens: List<String>` is the alignment reference; `language` field (`"fil"`/`"en"`) gates scoring; reuse its `List<String>` TypeConverter.
- `app/src/main/java/com/readily/app/data/passages/PassageTokenizer.kt` (plan 03) — Why: **the single tokenizer contract** — hypothesis words MUST be normalized through `tokenizePassage` so both sides of the alignment use identical rules (lowercase, punctuation-stripped, hyphens/apostrophes kept). Do not write a second tokenizer.
- `app/src/main/java/com/readily/app/ui/session/PassageDisplay.kt` (plan 04) — Why: annotated-string single-`Text` rendering pattern; the results screen mirrors it with per-word colors instead of `highlightIndex`.
- `app/src/main/java/com/readily/app/ui/session/RecordingViewModel.kt` (plan 04) — Why: the save path this plan hooks (navigate to results after save); `@HiltViewModel`/`SavedStateHandle` conventions.
- `app/src/main/java/com/readily/app/di/DatabaseModule.kt` (plan 01) — Why: DAO provider pattern.
- `app/src/main/java/com/readily/app/ReadilyApplication.kt` (plan 01) — Why: where the scoring queue is started.
- `app/src/main/java/com/readily/app/ui/navigation/ReadilyNavHost.kt` (plan 01/04) — Why: route style for the new results destination.
- `gradle/libs.versions.toml` + `app/build.gradle.kts` (plan 01) — Why: version-catalog convention for the new sherpa-onnx dependency; kotlinx-serialization already wired in plan 03.
- An existing DAO androidTest (plans 01/04) — Why: instrumentation test setup to mirror.

### New Files to Create

(Package root `com.readily.app` per plan 01; adjust to reality.)

- `app/src/main/java/com/readily/app/scoring/AsrEngine.kt` — sherpa-onnx wrapper: create recognizer from assets, decode a WAV file + passage hotwords → `List<HypWord>` (word, startSec)
- `app/src/main/java/com/readily/app/scoring/DialectTolerance.kt` — normalization for dialect-tolerant word equality (the calibration knob)
- `app/src/main/java/com/readily/app/scoring/PassageAligner.kt` — Needleman-Wunsch + self-correction pass → per-word verdicts
- `app/src/main/java/com/readily/app/scoring/ScoreCalculator.kt` — verdicts + duration → WCPM, accuracy %, error counts
- `app/src/main/java/com/readily/app/scoring/ScoringQueue.kt` — application-scoped queue observing unscored sessions, orchestrates ASR → align → score → persist
- `app/src/main/java/com/readily/app/data/db/ScoringResultEntity.kt` — Room entity (+ `WordScore` serializable + verdict enum)
- `app/src/main/java/com/readily/app/data/db/ScoringResultDao.kt`
- `app/src/main/java/com/readily/app/data/repository/ScoringResultRepository.kt`
- `app/src/main/java/com/readily/app/ui/results/ResultsScreen.kt` — summary card + color-coded passage + legend
- `app/src/main/java/com/readily/app/ui/results/ResultsViewModel.kt`
- `app/src/main/assets/asr/en/` — model files: `encoder-epoch-30-avg-1.int8.onnx`, `decoder-epoch-30-avg-1.onnx`, `joiner-epoch-30-avg-1.int8.onnx`, `tokens.txt`, `bpe.model` (from the pinned tarball)
- `app/src/test/java/com/readily/app/scoring/PassageAlignerTest.kt` — verdict correctness (pure JVM, no model)
- `app/src/test/java/com/readily/app/scoring/DialectToleranceTest.kt`
- `app/src/test/java/com/readily/app/scoring/ScoreCalculatorTest.kt`
- `app/src/androidTest/java/com/readily/app/scoring/ScoringPipelineTest.kt` — real model + fixture WAV end-to-end
- `app/src/androidTest/assets/fixture_reading.wav` — test fixture (a `test_wavs/*.wav` from the model tarball; see task)

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [sherpa-onnx Android index](https://k2-fsa.github.io/sherpa/onnx/android/index.html)
  - Section: prebuilt libraries and integration options
  - Why: confirms Maven artifact vs jniLibs approaches; we use Maven `com.k2fsa.sherpa.onnx:sherpa-onnx-android:1.13.4`
- [OfflineRecognizer.kt Kotlin API source](https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/kotlin-api/OfflineRecognizer.kt)
  - Why: exact config surface — `OfflineRecognizer(assetManager, config)` loads models **directly from APK assets**; `OfflineRecognizerConfig(featConfig, modelConfig, decodingMethod, maxActivePaths, hotwordsFile, hotwordsScore)`; `OfflineModelConfig(transducer = OfflineTransducerModelConfig(encoder, decoder, joiner), tokens, numThreads, modelType)`; result has `text`, `tokens: Array<String>`, `timestamps: FloatArray`
- [Zipformer offline transducer models](https://k2-fsa.github.io/sherpa/onnx/pretrained_models/offline-transducer/zipformer-transducer-models.html)
  - Section: `sherpa-onnx-zipformer-gigaspeech-2023-12-12` — file list, int8 sizes, sample output with `timestamps`
  - Why: the pinned model; download URL `https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-zipformer-gigaspeech-2023-12-12.tar.bz2`
- [sherpa-onnx hotwords / contextual biasing](https://k2-fsa.github.io/sherpa/onnx/hotwords/index.html)
  - Why: hotwords require `modified_beam_search`, transducer models only; hotwords file format (one phrase per line, optional `:score`), `modeling-unit=bpe` + `bpe-vocab` requirement; this is the ONLY decoding-constraint mechanism sherpa-onnx offers — there is no hard grammar
- [Timestamps discussion #985](https://github.com/k2-fsa/sherpa-onnx/discussions/985)
  - Why: confirms transducer/CTC models emit token-level timestamps; Whisper does not (moot — excluded)
- [sherpa-onnx releases (asr-models tag)](https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models)
  - Why: model tarball host; tarballs include `test_wavs/` with known transcripts — source of the instrumentation fixture
- [Needleman-Wunsch algorithm](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm)
  - Why: reference for the scoring matrix + backtrace implemented in `PassageAligner`
- [Vosk Android (fallback, NOT built now)](https://alphacephei.com/vosk/android) and [Vosk models](https://alphacephei.com/vosk/models)
  - Why: documents the fallback path in NOTES — `com.alphacephei:vosk-android:0.3.75`, `vosk-model-small-en-us-0.15` (40 MB), grammar-restricted `Recognizer(model, 16000f, jsonGrammar)`, `setWords(true)` word timestamps; also the only Tagalog option (`vosk-model-tl-ph-generic-0.6`, 320 MB — over budget)
- `docs/research/Technical Feasibility Assessment.md` §3.2, §5, §6 — Why: architecture mandate (no Seq2Seq, constrained decoding, Levenshtein scoring) and RAM budget
- `docs/research/Validation of Automated Oral Reading Fluency Systems.md` §Miscue Taxonomy — Why: the miscue → ASR-operationalization table, dialect-leniency mandate, self-correction nullification window (3–5 words), and Phil-IRI accuracy formula `(words − miscues)/words × 100` with Independent ≥97 / Instructional 90–96 / Frustration ≤89 bands

### Patterns to Follow

**Naming**: `*Entity`, `*Dao`, `*Repository`, `*ViewModel`, `*Screen` per plans 01–04; scoring domain logic lives in `scoring/` (plan 01 NOTES: domain code appears when plan 05 brings real business logic — this is that moment; a `scoring` package, no use-case class ceremony).

**UI state**: `data class ResultsUiState(...)` as `StateFlow`, `collectAsStateWithLifecycle()` — mirror plan 04.

**DI**: DAO in `DatabaseModule`; `AsrEngine`, `ScoringQueue` as `@Singleton @Inject constructor` concrete classes (no interfaces — single implementation; the Vosk fallback, if ever needed, swaps `AsrEngine`'s internals, its output type `List<HypWord>` already engine-neutral).

**Tokenizer contract (load-bearing)**: hypothesis text is normalized with plan 03's `tokenizePassage` — identical casing/punctuation rules on both alignment inputs, or every comparison silently fails.

**Error handling**: scoring failures must never crash the app or wedge the queue — catch per-session, log, leave the session `RECORDED` (retried next app start), continue with the next session.

**Verdict/data model (contract for plan 06 + results UI)**:

```kotlin
enum class WordVerdict { CORRECT, SUBSTITUTION, OMISSION, INSERTION, SELF_CORRECTION }

@Serializable
data class WordScore(
    val refIndex: Int,        // index into passage tokens; for INSERTION: index of the ref word it precedes (tokens.size = trailing)
    val refWord: String,      // "" for INSERTION
    val hypWord: String?,     // null for OMISSION
    val verdict: WordVerdict,
    val startSec: Float?,     // ASR timestamp of hypWord; null for OMISSION
)
```

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation (pure logic — no model, no Android)

`DialectTolerance`, `PassageAligner` (Needleman-Wunsch + self-correction pass), `ScoreCalculator`. All pure Kotlin, JVM-unit-tested exhaustively BEFORE any ASR wiring — this is where scoring correctness lives, and it's testable in milliseconds.

### Phase 2: Core Implementation (ASR)

Add the sherpa-onnx dependency, place model assets, build `AsrEngine` (recognizer from assets, WAV decode, hotwords, BPE-token → word merge with timestamps). Verify RAM/latency on device.

### Phase 3: Integration (persistence + queue + UI)

`ScoringResultEntity`/DAO/repository + DB registration; `ScoringQueue` wired into the Application; `ResultsScreen` + route; hook session-save navigation to results.

### Phase 4: Testing & Validation

JVM suites for phase-1 logic; instrumentation test running the real model over a fixture WAV with expected scoring; manual end-to-end on device (record → auto-score → color-coded results).

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### UPDATE gradle/libs.versions.toml + app/build.gradle.kts

- **IMPLEMENT**: Add `sherpaOnnx = "1.13.4"` to `[versions]`, `sherpa-onnx-android = { module = "com.k2fsa.sherpa.onnx:sherpa-onnx-android", version.ref = "sherpaOnnx" }` to `[libraries]`; `implementation(libs.sherpa.onnx.android)` in the app module. In `android {}` add `androidResources { noCompress += "onnx" }` (skip APK compression of model files — faster asset loads, no zip-inflate spike). Add `abiFilters` NOTE: keep default ABIs (arm64-v8a + armeabi-v7a cover DepEd tablets); if APK size must shrink later, split per ABI — not now.
- **GOTCHA**: verify 1.13.4 resolves from Maven Central (`gradlew.bat :app:dependencies --configuration debugRuntimeClasspath | findstr sherpa`); if the artifact name differs (some versions publish as `sherpa-onnx`), check https://central.sonatype.com/search?q=com.k2fsa.sherpa.onnx and pin whatever the current stable coordinate is. If no Maven artifact works, fall back to the documented jniLibs + Kotlin-API-files approach: https://k2-fsa.github.io/sherpa/onnx/android/build-sherpa-onnx.html (prebuilt .so bundles on the releases page) — do NOT build from source.
- **VALIDATE**: `gradlew.bat :app:dependencies --configuration debugRuntimeClasspath --quiet | findstr /i sherpa`

### CREATE scoring/DialectTolerance.kt

- **IMPLEMENT**: pure function object with a configurable rule set:
  ```kotlin
  class DialectTolerance(private val enabled: Boolean = true) {
      // Philippine-English L1-transfer pairs that Phil-IRI mandates are NOT errors:
      // p↔f, b↔v, and th→t/d. Applied as canonicalization so both directions match.
      fun canonical(word: String): String =
          if (!enabled) word
          else word.replace("ph", "f")   // before single-char maps
              .replace("th", "t")
              .replace('f', 'p').replace('v', 'b')
              // ponytail: grapheme-level canonicalization, not phoneme-level.
              // Upgrade path: G2P + phoneme-class comparison if field data shows
              // false accepts (e.g. "fan"/"pan" as distinct passage words).
      fun matches(ref: String, hyp: String): Boolean =
          ref == hyp || canonical(ref) == canonical(hyp)
  }
  ```
  The `enabled` flag is the calibration knob — plumb it from a simple stored setting (reuse plan 01's `AppMetadataEntity` key/value store: key `"dialect_tolerance"`, default `"on"`; no DataStore dependency).
- **GOTCHA**: canonicalization is symmetric by design (both sides mapped to one canonical form) — never write one-directional replacement or `matches` becomes order-dependent. Note the deliberate ceiling: if the passage itself contains a minimal pair (`fan` vs `pan`), tolerance can mask a real substitution — acceptable for MVP, flagged in NOTES.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE scoring/PassageAligner.kt

- **IMPLEMENT**: Needleman-Wunsch global alignment + self-correction pass:
  ```kotlin
  class PassageAligner(private val tolerance: DialectTolerance) {
      fun align(refTokens: List<String>, hyp: List<HypWord>): List<WordScore>
  }
  data class HypWord(val word: String, val startSec: Float)
  ```
  - DP matrix `(ref.size+1) x (hyp.size+1)`, scores: match `+2` (via `tolerance.matches`), mismatch `-1`, gap `-1`. Standard init (first row/col = i * gap). Backtrace from bottom-right preferring diagonal on ties (keeps substitutions over omission+insertion pairs, which also collapses most transpositions to 2 substitutions instead of 4 errors).
  - Backtrace emit: diagonal+match → `CORRECT`; diagonal+mismatch → `SUBSTITUTION`; up (ref consumed, no hyp) → `OMISSION`; left (hyp surplus) → `INSERTION` anchored at current `refIndex`.
  - **Self-correction pass** (after backtrace, Phil-IRI rule): for each `SUBSTITUTION` at refIndex *i*, if any of the next ≤3 `WordScore`s in emission order is an `INSERTION` whose `hypWord` matches `refTokens[i]` (tolerance-aware), reclassify the substitution as `SELF_CORRECTION` and DROP that insertion (the child said the wrong thing then fixed it — not an error, not an extra word). Also: consecutive `INSERTION`s whose `hypWord` equals the immediately following `CORRECT` ref word (a stutter/repetition "the the the dog") → drop the duplicates and mark the ref word's score `SELF_CORRECTION` if it was preceded by ≥1 such repeat, else leave `CORRECT` and just drop them. `// ponytail: repetitions folded into self-correction handling; a distinct REPETITION verdict (Phil-IRI counts it as 1 error) can be added when plan 06 wants it displayed.`
- **PATTERN**: pure class, constructor-injected tolerance — mirrors `PassageTokenizer`'s pure-function testability (plan 03).
- **GOTCHA**: ref tokens are already normalized (plan 03 tokenizer); hyp words must arrive already passed through the same `tokenizePassage` (done in `AsrEngine`, next tasks) — the aligner itself does NO casing/punctuation work. Emission order must be ref-order with insertions interleaved at their anchor, so the results screen can render sequentially.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/test/java/com/readily/app/scoring/PassageAlignerTest.kt + DialectToleranceTest.kt

- **IMPLEMENT**: JUnit4 (plan 01 harness), table-driven cases — this is the highest-value test surface in the whole plan:
  - perfect read → all `CORRECT`
  - one wrong word → single `SUBSTITUTION`
  - skipped word → `OMISSION`
  - extra word → `INSERTION` with correct anchor `refIndex`
  - "the b- bag is big" style: hyp `[the, back, bag, is, big]` vs ref `[the, bag, is, big]` → `bag` = `SELF_CORRECTION`, no insertion counted
  - repetition hyp `[the, the, dog]` vs ref `[the, dog]` → no error inflation
  - dialect: hyp `pish` vs ref `fish` → `CORRECT` with tolerance on, `SUBSTITUTION` with tolerance off (construct aligner with `DialectTolerance(enabled=false)`)
  - empty hypothesis (silent recording) → all `OMISSION`, no crash
  - hyp longer than ref (child rambles) → trailing `INSERTION`s at `refIndex = tokens.size`
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*PassageAlignerTest" --tests "*DialectToleranceTest"`

### CREATE scoring/ScoreCalculator.kt (+ ScoreCalculatorTest.kt)

- **IMPLEMENT**:
  ```kotlin
  data class ScoreSummary(
      val wcpm: Float, val accuracyPct: Float,
      val correct: Int, val substitutions: Int, val omissions: Int,
      val insertions: Int, val selfCorrections: Int, val totalRefWords: Int,
  )
  object ScoreCalculator {
      fun calculate(scores: List<WordScore>, refWordCount: Int, durationMs: Long): ScoreSummary
  }
  ```
  - `correct` counts `CORRECT + SELF_CORRECTION` (Phil-IRI: self-corrections are not miscues).
  - `accuracyPct = correct / refWordCount * 100` (Phil-IRI formula: `(words − miscues)/words`; omissions+substitutions are the miscues against ref words; insertions reported as a count but do NOT reduce accuracy denominator — matches the Phil-IRI accuracy formula over passage words. Document this judgment in a comment).
  - `wcpm = correct / (durationMs / 60000f)`, guard `durationMs < 1000` → wcpm 0 (avoid divide-by-noise on instant stops). Duration = the session's full recorded duration (matches the teacher-stopwatch semantics of Phil-IRI; a first-to-last-word window would inflate scores for kids with long silent tails — deliberate call, see NOTES).
  - Test: fixed verdict lists with hand-computed WCPM/accuracy incl. the 60-second and sub-second edge cases.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*ScoreCalculatorTest"`

### DOWNLOAD model → CREATE app/src/main/assets/asr/en/

- **IMPLEMENT**: fetch `https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-zipformer-gigaspeech-2023-12-12.tar.bz2` (curl works on Windows 10+: `curl -L -o model.tar.bz2 <url>` then `tar -xjf model.tar.bz2`). Copy into `app/src/main/assets/asr/en/`: `encoder-epoch-30-avg-1.int8.onnx` (~68 MB), `decoder-epoch-30-avg-1.onnx` (fp32 — int8 decoder degrades transducer accuracy per sherpa docs; it's small), `joiner-epoch-30-avg-1.int8.onnx`, `tokens.txt`, `bpe.model`. Do NOT copy fp32 encoder/joiner. Keep `test_wavs/` aside for the fixture task. Add a `.gitattributes` or repo-size note only if the repo rejects ~70 MB binaries — if GitHub push fails on size, wire Git LFS for `app/src/main/assets/asr/**` (`git lfs track "*.onnx"`); otherwise commit directly.
- **GOTCHA**: exact filenames inside the tarball are authoritative — verify with `tar -tjf` before hardcoding paths in `AsrEngine`. If any file exceeds 100 MB (it doesn't — encoder is ~68 MB) GitHub hard-rejects without LFS.
- **VALIDATE**: `dir app\src\main\assets\asr\en` shows the 5 files; `gradlew.bat :app:assembleDebug` then check APK size grew ~70 MB (`dir app\build\outputs\apk\debug`)

### CREATE scoring/AsrEngine.kt

- **IMPLEMENT**:
  ```kotlin
  @Singleton
  class AsrEngine @Inject constructor(@ApplicationContext private val context: Context) {
      // Decodes a 16kHz/16-bit/mono WAV (plan 04 format) biased toward passageTokens.
      // Returns hypothesis words in spoken order with start-time seconds.
      suspend fun transcribe(wavFile: File, passageTokens: List<String>): List<HypWord>
  }
  ```
  - Build config: `OfflineRecognizerConfig(featConfig = FeatureConfig(sampleRate = 16000, featureDim = 80), modelConfig = OfflineModelConfig(transducer = OfflineTransducerModelConfig(encoder = "asr/en/encoder-epoch-30-avg-1.int8.onnx", decoder = "asr/en/decoder-epoch-30-avg-1.onnx", joiner = "asr/en/joiner-epoch-30-avg-1.int8.onnx"), tokens = "asr/en/tokens.txt", numThreads = 2, modelType = "transducer"), decodingMethod = "modified_beam_search", maxActivePaths = 4, hotwordsFile = <written below>, hotwordsScore = 1.5f)` — copy exact field names from [OfflineRecognizer.kt](https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/kotlin-api/OfflineRecognizer.kt) at the pinned version; they drift between releases.
  - **Hotwords**: write `passageTokens.distinct()` uppercase (GigaSpeech BPE vocab is uppercase — check `tokens.txt`; match its casing) one per line to `File(context.cacheDir, "hotwords.txt")` before creating the recognizer. Check whether the pinned Kotlin API requires `modelingUnit = "bpe"` + `bpeVocab = "asr/en/bpe.model"` fields on the model config for hotwords (the hotwords doc says yes for raw-text hotwords) — set them if present. If per-stream hotwords (`createStream(hotwords)`) exists at this version, prefer it and create ONE long-lived recognizer; otherwise create the recognizer per call (config-bound hotwords) — construction cost ~1–3 s, fine for a background job. `// ponytail: recognizer-per-job if config-bound; cache keyed by nothing — one job at a time.`
  - Constructor path: `OfflineRecognizer(context.assets, config)` — assetManager non-null loads models straight from APK assets (no file copy).
  - WAV read: skip the 44-byte header (plan 04 writes canonical headers), read PCM16 little-endian into `FloatArray` samples / 32768f (sherpa `acceptWaveform(samples: FloatArray, sampleRate: Int)`); then `createStream()`, `acceptWaveform`, `decode(stream)`, `getResult(stream)`; `stream.release()`, and `recognizer.release()` if per-job.
  - **BPE merge**: result gives `tokens: Array<String>` + `timestamps: FloatArray` (parallel). Tokens beginning with `"▁"` (U+2581) start a new word: accumulate, word startSec = first token's timestamp. Lowercase each merged word and pass through plan 03's `tokenizePassage` (join then re-split, or apply its strip rules per word) so hyp words match ref normalization exactly.
  - Run everything on `Dispatchers.Default` (CPU-bound); wrap in try/catch → rethrow as a domain `ScoringException` for the queue to handle.
- **GOTCHA**: RAM — recognizer ≈ 200 MB resident. Never hold two recognizers; never run scoring concurrently (queue enforces serial). Verify `▁` is the actual word-boundary marker in `tokens.txt` (it is for icefall BPE models) before trusting the merge. Timestamps are token START times in seconds — there are no end times; that's sufficient (we only need order + start for future karaoke).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE data/db/ScoringResultEntity.kt + ScoringResultDao.kt

- **IMPLEMENT**:
  ```kotlin
  @Entity(
      tableName = "scoring_results",
      foreignKeys = [ForeignKey(entity = AssessmentSessionEntity::class, parentColumns = ["id"],
          childColumns = ["sessionId"], onDelete = ForeignKey.CASCADE)],
      indices = [Index("sessionId", unique = true)]
  )
  data class ScoringResultEntity(
      @PrimaryKey val id: String,          // UUID — match plan 04 PK style
      val sessionId: String,               // match AssessmentSessionEntity.id type
      val wcpm: Float, val accuracyPct: Float,
      val correctCount: Int, val substitutionCount: Int, val omissionCount: Int,
      val insertionCount: Int, val selfCorrectionCount: Int, val totalWords: Int,
      val wordResults: List<WordScore>,    // JSON TypeConverter (kotlinx.serialization)
      val modelName: String,               // "sherpa-onnx-zipformer-gigaspeech-2023-12-12-int8"
      val dialectToleranceOn: Boolean,     // calibration provenance — plan 06/validation needs to know
      val scoredAt: Long,
  )
  ```
  DAO: `@Insert insert`, `@Query("SELECT * FROM scoring_results WHERE sessionId = :sessionId") suspend fun getBySession(sessionId): ScoringResultEntity?`, `observeBySession(...): Flow<ScoringResultEntity?>` (results screen), `@Query("SELECT * FROM scoring_results")` list for plan 06. TypeConverter: `Json.encodeToString/decodeFromString<List<WordScore>>` beside plan 03's tokens converter.
- **PATTERN**: plan 04 `AssessmentSessionEntity` FK/index style; plan 03 List converter.
- **GOTCHA**: unique index on `sessionId` — one result per session; re-scoring (future) replaces, not duplicates. FK column indexed or strict lint fails.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE ReadilyDatabase.kt + di/DatabaseModule.kt

- **IMPLEMENT**: register entity + converter, add abstract DAO fn, bump version, add the `Migration(n, n+1)` with the `CREATE TABLE scoring_results ...` + unique index SQL if plans 02–04 followed plan 01's no-destructive-migration policy (check `app/schemas/` for current version and prior migration style; mirror it). Provide DAO in `DatabaseModule`.
- **GOTCHA**: copy the exact `CREATE TABLE` SQL from the newly exported schema JSON (`app/schemas/.../<n+1>.json` after a KSP build) — hand-written SQL drifting from Room's expectation fails at runtime validation.
- **VALIDATE**: `gradlew.bat :app:kspDebugKotlin` then confirm new schema JSON exists: `dir app\schemas /s /b`

### CREATE data/repository/ScoringResultRepository.kt

- **IMPLEMENT**: `@Singleton class ScoringResultRepository @Inject constructor(private val dao: ScoringResultDao)` — `suspend fun save(result)`, `fun observeBySession(sessionId)`, `suspend fun getBySession(sessionId)`. Concrete class, no interface.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE scoring/ScoringQueue.kt + UPDATE ReadilyApplication.kt

- **IMPLEMENT**:
  ```kotlin
  @Singleton
  class ScoringQueue @Inject constructor(
      private val sessionDao: AssessmentSessionDao,
      private val passageRepo: PassageRepository,      // plan 03 name — verify
      private val asrEngine: AsrEngine,
      private val resultRepo: ScoringResultRepository,
      private val metadataDao: AppMetadataDao,         // dialect_tolerance setting
  ) {
      fun start(scope: CoroutineScope) {
          scope.launch(Dispatchers.Default) {
              sessionDao.observeUnscored().collect { sessions ->
                  for (session in sessions) scoreSafely(session)
              }
          }
      }
  }
  ```
  - `scoreSafely`: load passage; **if `passage.language != "en"` → skip** (stays RECORDED; results screen shows the Filipino-pending state); if WAV file missing → mark `SCORED` with a zeroed result carrying `modelName = "missing-audio"` (don't wedge the queue on a deleted file — `// ponytail:` a FAILED status is nicer; add one when plan 06 needs to display it); else: `transcribe` → `PassageAligner(DialectTolerance(setting)).align` → `ScoreCalculator.calculate(scores, passage.tokens.size, session.durationMs)` → `resultRepo.save(...)` → `sessionDao.updateStatus(session.id, SCORED)` (status flip LAST — crash between save and flip just re-scores idempotently; the unique `sessionId` index means use `@Insert(onConflict = REPLACE)`).
  - Serial by construction (single collector, sequential for-loop). Re-emission of the same unscored list mid-processing is fine — `collectLatest` would cancel mid-score, so use plain `collect`; guard re-entry with a simple in-progress ID set if `observeUnscored` re-emits during the loop (Room re-emits on the status update — filter sessions already handled this pass).
  - `ReadilyApplication.onCreate`: inject `ScoringQueue`, call `start(applicationScope)` where `applicationScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)` (create the scope property if plan 01 didn't).
- **GOTCHA**: Room `Flow` re-emits on EVERY table change — the loop must tolerate seeing a session twice (idempotent REPLACE insert + status re-check `if (session.status != RECORDED) continue` handles it). Never let one bad WAV throw out of the `collect` — catch inside the loop.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/results/ResultsViewModel.kt + ResultsScreen.kt

- **IMPLEMENT**:
  - ViewModel: `@HiltViewModel`, `SavedStateHandle` arg `sessionId`; combines session + passage + `resultRepo.observeBySession(sessionId)` into `ResultsUiState(status: Pending|Scoring|Scored|FilipinoUnsupported, summary, wordScores, passageTitle, studentName)`. `Pending/Scoring`: result row absent + session RECORDED → show "Scoring…" spinner (the queue is working; Room Flow delivers the result live when it lands). `FilipinoUnsupported`: passage language == "fil".
  - Screen: summary card (WCPM large, accuracy % with Phil-IRI band label: ≥97 Independent / 90–96 Instructional / ≤89 Frustration, error counts row), then the color-coded passage, then a legend. Passage rendering: MIRROR plan 04's `PassageDisplay` annotated-string approach — one `Text` + `buildAnnotatedString`, per-word `SpanStyle`: CORRECT → default/green tint, SELF_CORRECTION → green underline, SUBSTITUTION → red background (show `hypWord` beneath? no — keep MVP to color + legend), OMISSION → red strikethrough, INSERTION → the inserted `hypWord` rendered inline in italic amber at its anchor. ≥24.sp, `verticalScroll`. Use theme-derived colors + distinct text decorations (strikethrough/underline/italic) so verdicts survive color-blindness.
  - `// ponytail:` no audio playback and no live karaoke on this screen — color-coded verdicts satisfy plan scope; playback-synced highlighting (using `startSec`) is a plan-06+ enhancement, timestamps are already persisted for it.
- **PATTERN**: plan 04 screens (Scaffold, snackbar, `collectAsStateWithLifecycle`).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE navigation graph + RecordingViewModel/Screen save flow

- **IMPLEMENT**: add route `results/{sessionId}` (match existing route style). After plan 04's save-on-stop sets its saved flag, navigate to `results/{sessionId}` instead of plain back (popUpTo the setup screen so back from results exits the assessment flow). Also add a results entry point wherever session history is listed, if plan 04 built one; if not, skip — plan 06 owns history UI.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE androidTest fixture + app/src/androidTest/java/com/readily/app/scoring/ScoringPipelineTest.kt

- **IMPLEMENT**:
  - Fixture: copy `test_wavs/1089-134686-0001.wav` (or the first test wav) from the model tarball into `app/src/androidTest/assets/fixture_reading.wav`. It is already 16 kHz mono PCM16. Obtain its ground-truth transcript by running the desktop decode once (or from the model's docs page sample output — the zipformer-gigaspeech docs print the decoded text for each test wav) and hardcode it in the test as the "passage".
  - Test 1 (perfect read): copy fixture from test assets to a temp file; build passage tokens = `tokenizePassage(groundTruthTranscript)`; run `AsrEngine.transcribe` + `PassageAligner` + `ScoreCalculator` directly (no queue). Assert: `accuracyPct >= 90f` and `omissions + substitutions <= tokens.size / 10` (tolerance for minor model variance — do NOT assert exact transcript equality, model updates would break it) and `wcpm > 0`.
  - Test 2 (omission detection): passage = ground truth + 10 appended words (e.g. repeat the first 10 tokens at the end); assert `omissionCount >= 8` — proves the engine does NOT hallucinate unread text (the core anti-Seq2Seq requirement, asserted executably).
  - Test 3 (timestamps): assert `HypWord.startSec` is non-decreasing and within `[0, wavDurationSec]`.
  - `@RunWith(AndroidJUnit4::class)`; read androidTest asset via `InstrumentationRegistry.getInstrumentation().context.assets`.
- **GOTCHA**: this test loads the real 69 MB model — runs on device/emulator only, takes ~10–30 s; keep it out of any CI job without an emulator (plan 01 CI only compiles androidTest — already safe). Main-APK assets (the model) are read via `targetContext.assets`, fixture via instrumentation `context.assets` — two different AssetManagers, don't mix them up.
- **VALIDATE**: `gradlew.bat :app:assembleDebugAndroidTest` (compile); with a device: `gradlew.bat :app:connectedDebugAndroidTest --tests "*ScoringPipelineTest*"`

### Full-suite gate

- **VALIDATE**: `gradlew.bat ktlintCheck :app:lintDebug :app:testDebugUnitTest :app:assembleDebug :app:assembleDebugAndroidTest`

---

## TESTING STRATEGY

### Unit Tests

Pure-JVM, no model, exhaustive — `PassageAlignerTest` (all five verdicts, self-correction window, repetition folding, empty/overflow hypotheses), `DialectToleranceTest` (symmetry, on/off), `ScoreCalculatorTest` (WCPM/accuracy math, duration guards). The aligner tests are the scoring ground truth; treat any behavior change here as a spec change.

### Integration Tests

`ScoringPipelineTest` (instrumented, real model + fixture WAV): accuracy floor on a perfect read, omission detection on padded passage (executable proof of no hallucination), timestamp monotonicity. DAO round-trip of `ScoringResultEntity` incl. the JSON `wordResults` converter — add one case to the pipeline test or mirror plan 04's DAO test.

### Edge Cases

- Silent/near-silent WAV → all omissions, WCPM 0, no crash, session still flips SCORED
- Filipino passage session → never scored, results screen shows unsupported state, English sessions behind it in the queue still process
- WAV file deleted before scoring → queue continues (zeroed result), no wedge
- App killed mid-scoring → on next launch the session is still RECORDED and re-scores (idempotent REPLACE)
- Session scored while results screen open in "Scoring…" state → Room Flow pushes the result live
- Dialect tolerance off → `pish/fish` counts as substitution (calibration knob verified end to end)
- Passage word appearing twice (common in Grade 1 texts) — alignment handles duplicates by position, verified by a unit case
- Recognizer construction failure (corrupt asset) → ScoringException caught, session left RECORDED, error logged

---

## VALIDATION COMMANDS

All non-interactive, from repo root (Windows).

### Level 1: Syntax & Style

```
gradlew.bat ktlintCheck :app:lintDebug
```

### Level 2: Unit Tests

```
gradlew.bat :app:testDebugUnitTest
```

### Level 3: Integration Tests

```
gradlew.bat :app:assembleDebugAndroidTest
```
With a connected device/emulator (required for the real-model pipeline test):
```
gradlew.bat :app:connectedDebugAndroidTest --tests "*ScoringPipelineTest*"
```

### Level 4: Manual Validation

1. `gradlew.bat :app:installDebug` (APK ≈ 70 MB larger than plan 04's — expected).
2. New Assessment → pick student + an **English** passage → record yourself reading it verbatim → stop.
3. Results screen appears: "Scoring…" then (≤ ~30 s) WCPM/accuracy + mostly-green passage. Accuracy should be ≥ 90% for a fluent adult read.
4. Repeat, deliberately skipping a sentence and ad-libbing two extra words → omissions show strikethrough, insertions show amber italics, WCPM drops.
5. Repeat with a **Filipino** passage → "Filipino scoring coming soon" state, session remains listed as recorded.
6. While scoring runs, watch RAM: `adb shell dumpsys meminfo com.readily.app | findstr TOTAL` — total stays under ~500 MB (app + ~200 MB recognizer), returns to baseline after (recognizer released).
7. Kill the app mid-scoring (`adb shell am force-stop com.readily.app`), relaunch → session re-scores automatically.

### Level 5: Additional Validation (Optional)

- Desktop sanity decode of the fixture with sherpa-onnx CLI (pip `sherpa-onnx`) to confirm ground-truth transcript before hardcoding it in the test.
- Room schema JSON diff — one new table only.

---

## ACCEPTANCE CRITERIA

- [ ] English `RECORDED` sessions are scored automatically in the background and flip to `SCORED` with no user action
- [ ] Engine is sherpa-onnx Zipformer transducer INT8 (`sherpa-onnx-zipformer-gigaspeech-2023-12-12`) — no Whisper/Moonshine/Seq2Seq anywhere in the dependency graph
- [ ] Decoding biased to the passage via hotwords + `modified_beam_search`; scoring via Needleman-Wunsch alignment against `PassageEntity.tokens`
- [ ] Per-word verdicts persisted: correct, substitution, omission, insertion, self-correction — with ASR timestamps
- [ ] Self-corrections within a 3-word window are not counted as errors (Phil-IRI rule)
- [ ] Dialect tolerance (/p/↔/f/, /b/↔/v/, th↔t/d) applied by default and toggleable via stored setting; provenance recorded on the result row
- [ ] WCPM, accuracy % (with Phil-IRI band), and per-type error counts persisted in `ScoringResultEntity` and shown on the results screen
- [ ] Results screen renders the passage with per-word color coding + non-color text decorations + legend
- [ ] Whole pipeline fully offline; audio and transcript never leave the device
- [ ] Peak process RAM during scoring ≤ ~500 MB on a 4 GB device; recognizer released after each job
- [ ] Filipino sessions skipped gracefully with an explanatory UI state
- [ ] Instrumented pipeline test proves ≥90% accuracy on a verbatim read AND ≥8/10 omissions detected on padded reference (anti-hallucination assertion)
- [ ] All validation commands pass; no regressions in plans 01–04 tests

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] Full test suite passes (unit + instrumented on a device)
- [ ] No linting or type checking errors
- [ ] Manual on-device pass: record → auto-score → color-coded results, incl. omission/insertion scenario and kill-mid-score recovery
- [ ] Model files committed (LFS if push size demands it) and APK builds from clean checkout
- [ ] Acceptance criteria all met
- [ ] `WordScore`/`ScoringResultEntity` contract noted for plan 06 (dashboard reads summary columns; word detail in JSON)

---

## NOTES

**Model choice — `sherpa-onnx-zipformer-gigaspeech-2023-12-12` int8.** Offline (non-streaming) fits the batch-scoring job better than a streaming model (we score a finished WAV; no latency constraint). GigaSpeech training data (podcasts/audiobooks/YouTube) is acoustically broader than LibriSpeech, helping with accented Philippine English. ~69 MB disk / ~200 MB RAM / RTF < 0.1 fits the index.md budget exactly. Alternatives considered: `sherpa-onnx-streaming-zipformer-en-20M-2023-02-17` (~25 MB, weaker accuracy) if APK size ever becomes the binding constraint; the larger 2023-06-21 streaming model (179 MB encoder) blows the budget for no batch-mode benefit.

**Filipino/Tagalog gap (honest survey, mid-2026).** No sherpa-onnx/icefall Tagalog model exists; the 14-language multilingual releases don't include Tagalog. The only shipped offline option is Vosk `vosk-model-tl-ph-generic-0.6` (320 MB — exceeds the 200 MB budget, no small variant). MMS/wav2vec2 covers Tagalog via a 1B-param adapter model — no ONNX export, far over budget. Community Whisper Tagalog fine-tunes exist but are excluded (Seq2Seq). **Path to Filipino scoring (per feasibility doc §4):** fine-tune a Zipformer/wav2vec2 on ~10 h of child speech — CFSC (8 h, UP DSP, includes isolated miscue recordings) and/or BK3AT (122 h, Grades 1–3) under academic agreements; icefall provides the Zipformer training recipes and sherpa-onnx export. That is the deferred "Child-speech fine-tuning" item in index.md — this plan's engine/alignment/scoring stack is language-agnostic and needs only new model assets + a language→model map in `AsrEngine` when the model exists.

**Constrained decoding reality check.** sherpa-onnx offers soft biasing only (hotwords, transducer + `modified_beam_search`); Vosk offers true grammar restriction (`Recognizer(model, 16000f, "[\"...\"]")`). We take sherpa's soft bias + strong post-hoc alignment (the Wadhwani AI architecture: free-ish decode, then align to the target paragraph — 95%/88% hit/deletion precision at scale). If field pilots show hotword biasing insufficient for heavy-miscue readers, the documented fallback is Vosk (`com.alphacephei:vosk-android:0.3.75` + `vosk-model-small-en-us-0.15`, 40 MB) with per-passage grammar + `[unk]` and `setWords(true)` timestamps — `AsrEngine.transcribe`'s signature already accommodates it without touching aligner/calculator/UI.

**WCPM duration = full session duration**, not first-to-last-word span. Matches Phil-IRI stopwatch semantics and doesn't reward long silent tails; plan 04 already stops recording at the teacher's tap, which is the natural end-of-reading marker. Timestamps are persisted per word if plan 06 ever wants span-based rates.

**Deliberate simplifications (each with an upgrade path):** grapheme-level (not phoneme/G2P) dialect canonicalization; no distinct REPETITION/TRANSPOSITION verdicts (diagonal-preferring backtrace collapses most transpositions to substitutions; Phil-IRI counts both as errors either way — refine when plan 06 displays miscue taxonomy); no hesitation/VAD miscue (needs pause analysis; timestamps stored make it a pure post-processing addition); no live karaoke or audio playback on results; no re-score button; in-process queue instead of WorkManager.

**Repo weight:** committing ~70 MB of model binaries is the one repo-shape change; Git LFS only if plain push fails. Bundling in assets (vs download-once) is deliberate: target schools are offline — a download step is a deployment landmine.

**Confidence Score: 7/10** — the alignment/metrics core is pure, fully specified, and unit-tested before any native code runs; the Room/UI work follows established plan-01–04 patterns. Residual risk concentrates in the sherpa-onnx Kotlin API surface (exact config field names, hotwords `modelingUnit`/`bpeVocab` fields, and per-stream-hotwords availability vary between releases — the executor must read `OfflineRecognizer.kt` at the pinned version, called out inline) and in the Maven artifact coordinate, for which a documented jniLibs fallback exists. Plans 01–04 being unimplemented at planning time adds the usual path/type reconciliation burden, flagged at each touchpoint.

Sources: [sherpa-onnx Android docs](https://k2-fsa.github.io/sherpa/onnx/android/index.html), [build/jniLibs guide](https://k2-fsa.github.io/sherpa/onnx/android/build-sherpa-onnx.html), [OfflineRecognizer.kt](https://github.com/k2-fsa/sherpa-onnx/blob/master/sherpa-onnx/kotlin-api/OfflineRecognizer.kt), [offline zipformer models](https://k2-fsa.github.io/sherpa/onnx/pretrained_models/offline-transducer/zipformer-transducer-models.html), [hotwords](https://k2-fsa.github.io/sherpa/onnx/hotwords/index.html), [KWS](https://k2-fsa.github.io/sherpa/onnx/kws/index.html), [timestamps #985](https://github.com/k2-fsa/sherpa-onnx/discussions/985), [asr-models releases](https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models), [Vosk Android](https://alphacephei.com/vosk/android), [Vosk models](https://alphacephei.com/vosk/models), [Needleman-Wunsch](https://en.wikipedia.org/wiki/Needleman%E2%80%93Wunsch_algorithm), `docs/research/Technical Feasibility Assessment.md`, `docs/research/Validation of Automated Oral Reading Fluency Systems.md`

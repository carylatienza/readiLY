# readiLY — Master Build Plan (read this before any other plan)

**Written:** 2026-11-16 · **For:** the agent (Opus) that will build the readiLY Android MVP · **Status:** decisions 1–4 in §10 are answered; 5–10 run on their stated defaults until a founder says otherwise.

This file sits above plans `01`–`07`. Those seven plans are detailed and mostly sound, but they were written in July 2026 in one sitting, before any code existed, and they have drifted from each other and from what the business plan and landing page now promise. This file tells you what to build, in what order, which of the older plans' instructions to override, and what is still undecided.

**Where this file and a numbered plan disagree, this file wins.** Where this file is silent, the numbered plan wins. Where both are silent, choose the simplest thing that satisfies the hard constraints in §2 and note the choice in the PR.

---

## 1. Where the project actually stands

Verified in the repo and on this machine on 2026-11-16:

| Thing | State |
|---|---|
| Application code | **None.** No `app/`, no Gradle files, no CI workflow. |
| Build plans | `01`–`07` in `.agents/plans/`, never executed. |
| Landing page | `landing/` (static HTML/CSS/vanilla JS), v2 merged to `main` via PR #3. Carries visible `CONFIRM` markers and an empty `FORM_ENDPOINT`. |
| Business plan | `docs/startup qc/ReadiLY_Business_Plan_v3.md` on `main`. Later revisions V5–V9 exist only on branch `docs/business-plan-v4-polish` (unmerged). |
| Design | 13 app mockups, embedded as base64 PNGs at the bottom of `docs/startup qc/ReadiLY In-Depth Details.md` (`[image1]`…`[image13]`). The landing page's `:root` block in `landing/styles.css` holds the "Educore" colour tokens, including the four miscue colours. |
| Research | 7 reports in `docs/research/`. |
| Local toolchain | Python 3.11/3.12 present. **No JDK, no Gradle, no Android SDK, no `adb` found** (checked `PATH`, `ANDROID_HOME`, the default SDK folder, `Program Files`). |
| Git | Working branch `landing-page` is already merged; `main` is at the PR #3 merge. PR #2 (`docs/business-plan-v2-updates`) is still open from July and contains `docs/PRD.md` and `docs/BUILD.md`, both of which predate the scope changes in §4. |
| OpenSpec | `openspec/specs/` and `openspec/changes/` empty; `openspec/config.yaml` `context:` unfilled. |

Things this plan does **not** know and must not assume (see §10): whether the 3 September 2026 Pitch Day demo happened and what was shown, whether the ten teacher interviews were done, whether there is a pilot date, and which physical Android device is available for testing.

Stale statements to distrust:

- `CLAUDE.md` says there is no chosen stack and no commits on `main`. Both are false now. The stack was locked on 2026-07-18 (see §2).
- `docs/startup qc/ReadiLY_Business_Plan_Final.docx` claims a working prototype and a passing 90% accuracy test. Neither exists. The 90% figure is an acceptance criterion in plan `05`.
- `.agents/plans/index.md` lists DepEd form export as deferred. The business plan (v3 §6) and the landing page both say it is in the MVP.

---

## 2. What is fixed

Do not reopen these. They were decided by the founders and are relied on by the business plan.

**Stack:** Kotlin, native Android, Jetpack Compose + Material 3, MVVM, Hilt, Room, sherpa-onnx for on-device speech recognition, Supabase (Postgres + Auth) for optional sync. Single `:app` module. Package `com.readily.app`. minSdk 28, 4 GB RAM tablets and phones.

**Hard constraints:**

1. **Offline-first.** Every feature works in airplane mode. Sync is optional and opportunistic. The app is fully usable with no account.
2. **No sequence-to-sequence recogniser** (Whisper, Moonshine, or similar). Transducer or HMM models only. The reason is the product's core claim: a model that repairs a stumbling child's transcript inflates the score of exactly the children the tool exists to find.
3. **Audio never leaves the device.** Not for processing, not for backup, not in logs or crash reports. Only small JSON score records may sync.
4. **Cloud identity is initials + LRN.** Full names stay in Room on the device.
5. **Model and runtime fit in about 200 MB of RAM**, INT8 quantised. MVP model: `sherpa-onnx-zipformer-gigaspeech-2023-12-12`.
6. **English-only automatic scoring in the MVP.** Filipino passages are recordable and teacher-scored (§4, item F). Never show a machine score for a Filipino session.
7. **Original passages only.** No DepEd, CRLA or Phil-IRI passage text is bundled (licensing: CRLA is CC BY-NC; Phil-IRI needs DepEd approval for commercial use).
8. **No predictive claims.** Flags are deterministic rules and the interface says so.

**Honesty rules** (from `CONTEXT.md`, `CLAUDE.md` and the `compliance-reviewer` agent). These apply to code comments, UI strings, commit messages, PR bodies and docs alike:

- A number readiLY has not measured in a classroom is a **design target**, never a result.
- Named children (Miguel, Bea, Paolo) are **illustrative learners**, always labelled.
- Do not remove a `CONFIRM` marker from `landing/` unless a founder has confirmed that specific claim.
- The app measures word recognition, not comprehension. Label levels "Oral Reading (Word Recognition) Level".
- Use the glossary in `CONTEXT.md`: *learner*, *school head*, *pilot list*, *design target*. In code, the existing plans use `Student*` for entity names; keep that in identifiers (renaming seven plans buys nothing) and use "learner" in user-facing strings.

---

## 3. How to work

- **Branching.** Start from an up-to-date `main` (`git switch main && git pull`). One branch and one PR per phase in §6, named `feat/android-<nn>-<slug>`. Do not stack unmerged phases unless a founder asks.
- **Executing a numbered plan.** Read this file, then the numbered plan, then apply the overrides in §5 and the additions in §4 *while* implementing. Do not edit the numbered plan first and then execute it; fix the plan file in the same PR only where an override makes its text wrong.
- **Versions.** Every pinned version in plans `01`–`07` was checked in July 2026 and is now four months old. Before pinning, look up the current stable release of each dependency and its compatibility notes (AGP ↔ Gradle ↔ Kotlin ↔ KSP ↔ Compose BOM; sherpa-onnx Maven coordinate and Kotlin API; supabase-kt ↔ Ktor). Do not trust a version number from the plan or from memory.
- **Verification.** A phase is done when its gate in §6 passes and you have run it, not when the code compiles. If a gate needs a device or emulator and none is available, say so in the PR and leave the box unticked.
- **Commits and PRs.** Use `/commit` and the `create-github-pull-request` skill (it runs `code-reviewer` and `compliance-reviewer`). Anything that touches `landing/`, pitch or business docs, or a user-facing number must go through `compliance-reviewer`.
- **Asking.** Decisions marked **OPEN** in §10 belong to the founders. Use the stated default so work is not blocked, and flag in the PR that a default was used.
- **Not applicable here.** `/init-project` (written for Python/FastAPI), `agent-browser`, `e2e-test` and `verify-landing` do not apply to the Android app. `verify-landing` still applies to any `landing/` change.

---

## 4. Scope added since the July plans

The business plan v3 (§6, §7) and the landing page promise features the seven plans do not contain. Each is listed with where it lands.

**A. Teacher override.** *Lands in phase 5.* On the results screen every passage word is tappable. Tapping opens a small sheet to change the verdict (correct, substitution, omission, self-correction; insertions can be dismissed). The score, accuracy and level recompute at once.
- Store the machine's verdicts and the teacher's verdicts separately. Add to `ScoringResultEntity`: `machineWordResults` (written once, never edited), `wordResults` (current), `overrideCount`, `teacherAdjusted`. Summary columns always reflect `wordResults`.
- Override rate (`overrideCount / totalWords`) is a pilot metric with a design target of under 10%. Compute it from stored data; never display it as an achieved result.

**B. Consent checkpoint.** *Lands in phases 2 and 4.* Add `consentOnFile: Boolean` and `consentConfirmedAt: Long?` to `StudentEntity`. The teacher ticks "A signed parental consent form is on file" per learner. The recording screen refuses to start the microphone for a learner without it and says why. Enforce this in the ViewModel or recorder, not only by disabling a button. Unit-test the refusal.

**C. Noise check and warm-up read.** *Lands in phase 4.* Before recording, sample about two seconds of ambient audio and compute RMS. Above a threshold, warn that the room may be too loud to score reliably; the teacher may proceed. The threshold is one named constant, marked as uncalibrated until pilot data exists. Offer an optional warm-up read on a fixed practice sentence: the meter runs, nothing is written to disk, nothing is scored.

**D. Level label.** *Lands in phase 5.* Independent 97–100%, Instructional 90–96%, Frustration 89% and below, labelled as word-recognition level. Already specified in plans `05`/`06`; listed here so it is not dropped.

**E. Export.** *New phase 8, plan to be written (§7).* Two outputs: an open CSV of a class's results (the "your data is yours" promise), and a class record sheet with the Phil-IRI oral reading columns: passage level, total words, miscues, reading time in minutes and seconds, reading rate, accuracy, level.
- Reading rate uses the Phil-IRI formula, words read × 60 ÷ reading time in seconds.
- **Do not claim the output is "the DepEd form" or that "the portal accepts it"** until a founder supplies the official template and the mapping has been checked against it. The official Excel templates are not in the repo.
- **Do not derive a CRLA profile** (Full/Moderate/Light Refresher, Grade Ready) from accuracy. CRLA profiles come from the CRLA instrument's own parts and comprehension items, which this app does not administer. Plan `06` already says this; it still holds.
- Comprehension columns stay blank, or are teacher-entered if the founders want that (OPEN, §10).

**F. Teacher-scored mode for Filipino.** *Lands in phase 5, reusing A.* A Filipino session opens the same results screen with every word initially unmarked and a banner saying automatic scoring is English-only. The teacher taps the words the learner missed; reading time comes from the recording. Mark the result `scoredBy = TEACHER`. This turns "Filipino coming soon" into something usable, costs almost nothing once A exists, and is also the fallback if English recognition proves weak in a noisy room.

**G. App theme.** *Lands in phase 1.* Use the Educore tokens from `landing/styles.css` (`--purple #6D50FF`, `--ink #0F0F0F`, the four miscue colour pairs) as the Material 3 colour scheme instead of the default palette, so the app matches the landing page mock. Colours only; do not port the landing layout. Extract the 13 mockups from the In-Depth Details file into the scratchpad and look at them before building each screen.

---

## 5. Overrides: where the seven plans contradict each other

The plans were written in parallel and disagree on conventions. Use these resolutions everywhere.

| Topic | Conflict | Resolution |
|---|---|---|
| Database class and location | `ReadilyDatabase` in `data/local/` (01, 05) vs `AppDatabase` in `data/db/` (02, 03, 04) | `ReadilyDatabase` in `data/local/`. |
| Package layout | `data/roster/`, `data/db/`, `data/local/entity/`, `com.readily.dashboard` all appear | Entities in `data/local/entity/`, DAOs in `data/local/dao/`, repositories in `data/repository/`, screens in `ui/<feature>/`, pure logic in `scoring/`, `audio/`, and `ui/dashboard/` for analytics. Everything under `com.readily.app`. |
| Schema changes | 01 forbids destructive migration; 02 and 04 rely on it | No destructive fallback. Each phase that changes the schema bumps the version by one and declares a Room `AutoMigration` (the changes are all additive). Hand-write a `Migration` only where auto-migration cannot express the change. Commit the exported schema JSON. |
| DAO tests | Instrumented only (01, 04) vs Robolectric preferred (02) | Add Robolectric in phase 1 and run DAO tests on the JVM so CI covers them with no emulator. Keep instrumented tests only for what needs a real device: the microphone and the real-model scoring test. |
| Soft delete | `isDeleted: Boolean` (02) vs `deletedAt: Long?` (07) | `isDeleted` + `updatedAt` from phase 2 onward. Phase 7 adds only `syncedAt: Long?`. |
| Deleting a learner | 04 uses FK `CASCADE` from sessions to students, but learners are soft-deleted so the cascade never fires | When a learner or class is soft-deleted, soft-delete their sessions and results in the same transaction and **delete their WAV files from disk**. A removed child's voice must not linger on the tablet. Test it. |
| Sync-ready columns | 04's `AssessmentSessionEntity` and 05's `ScoringResultEntity` lack `updatedAt` / `isDeleted` | Add both columns when the entities are first created, so phase 7 needs only `syncedAt`. |
| Lint | `ktlintCheck` (01) vs `lintDebug` (02, 04) | Run both in CI and in every phase gate. |
| Entity names in later plans | 06 and 07 refer to `SchoolClass`, `ScoringResult`, `Student` | Read the real code; the names are `ClassSectionEntity`, `StudentEntity`, `AssessmentSessionEntity`, `ScoringResultEntity`, `PassageEntity`. |
| Session status | 05 marks a session `SCORED` with a zeroed result when the audio is missing | Add a `FAILED` status instead. A fabricated zero score must never reach the dashboard or an export. |
| Model files in git | 05 commits about 70 MB of model binaries, with LFS as a fallback | Do not commit them. Add a Gradle task that downloads the pinned tarball, verifies a SHA-256 written in the build file, and unpacks the five needed files into `app/src/main/assets/asr/en/`; git-ignore that folder; cache it in CI. The APK still bundles the model, so the app stays offline. |
| Passage count and audio retention | Not addressed anywhere | See §10 (OPEN). Default: keep a WAV until its session is scored and the teacher leaves the results screen, then offer deletion in settings; never auto-upload. |

Two corrections to plan `05`'s reasoning, both about the product's central claim:

1. **Hotword biasing can itself inflate scores.** Plan `05` biases the recogniser toward the passage's words and tests only that *unread* text is reported as omitted. It does not test the more dangerous case: a child says "house" and the biased recogniser hears the expected "horse". Phase 5 must measure this (see its gate) and choose `hotwordsScore` from the measurement. If biasing hides substitutions, turn it off; plain greedy or beam decoding plus alignment is an acceptable MVP.
2. **Grapheme-level dialect tolerance over-accepts.** Replacing every `f`→`p`, `v`→`b`, `th`→`t` on both sides makes "fan"/"pan", "vest"/"best" and "three"/"tree" equal. Keep the mechanism, but seed passages must avoid such pairs within one passage, and a unit test must fail if a seed passage contains two different tokens with the same canonical form.

---

## 6. Phases

Each phase is one PR. Gates are the minimum; the numbered plan's own validation commands also apply.

### Phase 0 — Environment and repo hygiene
No app code.

1. Install and verify the toolchain: JDK 17, Android SDK command-line tools, the platform and build-tools the chosen AGP needs, `adb`. Record the versions in the PR. If installation needs the founder (licence prompts, disk space, Android Studio preference), stop and ask.
2. Establish a test target: a physical Android device with USB debugging (preferred, since microphone and RAM behaviour matter) or an API 28 emulator image. See §10.
3. Update `CLAUDE.md`: the stack is chosen, this file is the entry point, `main` has history, the Android commands (`gradlew.bat …`). Keep it short; link here instead of repeating.
4. Fill `openspec/config.yaml` `context:` with the stack and the hard constraints from §2.
5. Rewrite `.agents/plans/index.md` so its order, deferred list and constraints match this file (export is no longer deferred; plans `08` and `09` exist).
6. Rewrite or delete `.claude/commands/init-project.md` (it describes a Python stack).
7. Do **not** merge, close or rebase PR #2 or the `docs/business-plan-v4-polish` branch without a founder's say-so (§10).

**Gate:** `java -version` shows 17; `adb devices` lists a target or the emulator boots; docs above are consistent with each other.

### Phase 1 — Recognition spike (time-boxed, throwaway)
The largest risk in the whole product is whether this model, on Philippine-accented English read aloud, with alignment, gives usable verdicts. Find out before building six screens around it. Python is already installed.

1. In the scratchpad or `spike/` (git-ignored), `pip install sherpa-onnx`, download the pinned model, and write a script: WAV + passage text → words with timestamps → Needleman-Wunsch alignment → verdicts, accuracy, WCPM.
2. Ask a founder to record a handful of 16 kHz mono WAVs of themselves reading a short passage: verbatim, with skipped words, with deliberate substitutions of similar-sounding words, with self-corrections, and with background noise. Adult voices only; **do not record children** for the spike (no consent process exists yet).
3. Run each recording with hotword biasing off, and at two or three `hotwordsScore` values. Tabulate: substitutions caught, omissions caught, false errors on the verbatim read.
4. Write the findings into the phase 5 PR description later and into a short note in this folder now (`spike-findings.md`): chosen decoding settings, observed failure modes, anything that changes the plan.

**Gate:** a table of results exists and a go / adjust / stop recommendation is written. If verbatim adult reads score below about 90% accuracy, or biased decoding hides most deliberate substitutions and unbiased decoding is unusable, stop and tell the founders before phase 2. These are adult-voice numbers and say nothing yet about children; label them that way.

### Phase 2 — Project foundation → `01-project-foundation.md`
Overrides: re-verify every version; add Robolectric; Educore colour scheme (§4 G); CI runs `ktlintCheck lintDebug assembleDebug testDebugUnitTest assembleDebugAndroidTest`.

**Gate:** clean checkout builds; unit tests green locally and in GitHub Actions; app launches to the home screen on the test target.

### Phase 3 — Roster and passages → `02-student-roster.md`, `03-passage-library.md`
These two are independent and may share a PR or be two.

Overrides and additions:
- Consent fields and UI on the learner (§4 B).
- Learner deletion cascades to sessions, results and WAV files (§5) — implement the hook now, even though sessions arrive in phase 4.
- CSV roster import is a stretch goal in plan `02`; skip it unless a founder asks.
- Seed passages: 18 originals (3 per grade × Grades 1–3 × English and Filipino), Grade 1 40–60 words, Grade 2 60–90, Grade 3 90–130, Filipino settings, `source = "readiLY original"`. You will draft them; mark them in the PR as **drafts needing review by a teacher or reading specialist** before any pilot (§10). Add the minimal-pair test from §5.
- Plan `03` lets teachers add custom passages. Keep it, with an on-screen note that the teacher is responsible for having the right to use the text.

**Gate:** create a class and learners, tick consent, browse and filter passages, all in airplane mode; data survives a force-stop; DAO and ViewModel tests green on the JVM.

### Phase 4 — Recording → `04-assessment-session.md`
Overrides and additions: consent refusal (§4 B); noise check and warm-up (§4 C); `updatedAt`/`isDeleted` on the session entity; `FAILED` status exists in the enum.

**Gate (needs a device with a microphone):** record a passage; pull the WAV with `adb` and confirm 16 kHz, mono, 16-bit and that it plays; recording is refused without consent; the three-minute cap, the back-press dialog and denied permission all behave as plan `04` describes; nothing is written outside app-private storage.

### Phase 5 — Scoring, override, teacher-scored mode → `05-asr-scoring-engine.md`
Port the spike's alignment to Kotlin with the plan's unit tests first, then wire sherpa-onnx.

Overrides and additions: model download task (§5); decoding settings from the spike; teacher override (§4 A); teacher-scored Filipino (§4 F); level label (§4 D); `FAILED` status; result entity carries `machineWordResults`, `overrideCount`, `teacherAdjusted`, `scoredBy`, `updatedAt`, `isDeleted`.

**Gate:**
- JVM tests for the aligner, dialect tolerance, calculator and override recomputation are green.
- On a device, the three instrumented tests in plan `05` pass (verbatim read at or above 90% accuracy; at least 8 of 10 padded words reported omitted; timestamps monotonic).
- **New:** a fixture recording containing deliberate substitutions has at least the majority of them reported as substitutions with the chosen settings. Record the exact count in the PR; do not round it up into a claim.
- Peak memory while scoring stays near the 500 MB process ceiling in plan `05`, measured with `dumpsys meminfo` on the test target and reported with the device model.
- A Filipino session shows no machine score and can be teacher-scored.
- Force-stopping mid-score and relaunching re-scores the session.

**At this point the record → score → review loop works.** This is the demo. Tell the founders so they can decide whether to update the landing page's status section; do not edit those `CONFIRM` markers yourself.

### Phase 6 — Dashboard → `06-teacher-dashboard.md`
Overrides: exclude `FAILED` and soft-deleted sessions from every statistic; show teacher-scored and teacher-adjusted results with a small marker; the "needs attention" list states its three rules on screen; the benchmark line (Hasbrouck–Tindal US norms) is labelled as US reference data, not a Philippine standard, or left out (OPEN, §10).

**Gate:** with a class of seeded sessions, band counts, coverage and flags match a hand calculation in the test; an unassessed learner is visible; everything works offline.

### Phase 7 — Export → new plan `08-export.md`
Write the plan with `/plan-feature` first (§7), then execute it.

**Gate:** exported CSV opens in Excel with correct UTF-8 (names with ñ), one row per learner per assessed passage, values equal to the results screen; the file is written through the system share/save dialog, not to shared storage silently; export works offline.

### Phase 8 — Sync → `07-supabase-sync.md` (only if the founders want it now)
This is the one phase that sends children's data off the device. It is not needed for a demo or for a single-tablet pilot. Default: **defer** until a founder asks (§10).

If it goes ahead — overrides: only `syncedAt` is added; initials + LRN only, enforced by a unit test that fails if a DTO has a name or audio field; a learner with no LRN syncs with a random local ID, never a name; no Supabase keys in git; creating the Supabase project and applying SQL is a founder action, not yours.

**Gate:** plan `07`'s criteria, including the two-account row-level-security check, plus the app behaving identically with no account.

### Phase 9 — Pilot readiness → new plan `09-pilot-readiness.md` (write when a pilot date exists)
Release build with R8 and a signing key held by the founders, a settings screen (dialect tolerance, delete recordings, about/privacy text), an in-app note of what the app does and does not measure, a one-page teacher guide, and a run on the oldest device the founders can borrow. The consent form, the outsourcing agreement and NPC registration are legal work for the founders; the app only enforces the checkpoint.

---

## 7. Plans that still need writing

| File | Write it when | Must cover |
|---|---|---|
| `spike-findings.md` | End of phase 1 | Settings chosen, result table, failure modes, changes to phase 5. |
| `08-export.md` | Before phase 7 | CSV schema; the Phil-IRI oral-reading columns from §4 E; how the official template will be mapped once supplied; UTF-8 BOM for Excel; share-sheet delivery; what the export must not claim. |
| `09-pilot-readiness.md` | When a pilot date exists | Release signing, settings, in-app disclosures, device matrix, teacher guide. |

Use `/plan-feature` for each so they match the existing plans' format.

---

## 8. Things you must not do

- Do not record, store or request children's voices during development. Founders' adult voices and the model's own test WAVs only.
- Do not add analytics, crash reporting or any network library before phase 8. Until then the manifest has no `INTERNET` permission, which is the simplest proof of the offline claim.
- Do not log learner names, LRNs, transcripts or file paths.
- Do not present spike or fixture numbers as accuracy. They are adult-voice development checks.
- Do not remove `CONFIRM` markers, set `SHOW_CONFIRM = false`, or fill `FORM_ENDPOINT` in `landing/`.
- Do not add a dependency where the platform already does the job. The plans deliberately avoid a chart library, Accompanist, a CSV library and WorkManager (until sync); keep it that way.
- Do not create the Supabase project, register accounts, or publish anything on the founders' behalf.

---

## 9. Risks, in order

1. **Recognition quality on children in a real classroom is unknown** and cannot be learned at a desk. Phase 1 tests the pipeline on adults only. Override (A) and teacher-scored mode (F) exist so the app is still useful when the machine is wrong.
2. **Hotword biasing may mask errors.** Measured in phases 1 and 5.
3. **No build environment or confirmed test device yet.** Phase 0.
4. **"Fills in the DepEd form" is promised publicly but the template is not in hand.** Until it is, the export is a class record in Phil-IRI's terms, and the landing claim keeps its `CONFIRM`.
5. **Seed passages are written by an agent, not a reading specialist.** Flagged for review; levels are by word count only.
6. **Stale versions.** Re-verified per phase.
7. **Two founders, both students.** The plan is ordered so that stopping after phase 5 still leaves a demonstrable product, and after phase 7 a pilot-capable one.

---

## 10. Open decisions for the founders

Defaults are what the agent will do if no answer arrives.

| # | Question | Default |
|---|---|---|
| 1 | What is the immediate goal? | **Answered 2026-11-16: a working demo.** Build phases 0–5 as fast as is safe, then 6–7. Phases 8–9 wait for a founder's request. Still unknown: whether a demo date exists, and what was shown at Pitch Day. |
| 2 | What is the test target? | **Answered 2026-11-16: the founder's own Android phone or tablet over USB.** Install JDK 17 and the command-line SDK on this PC. In phase 0, ask the founder to enable USB debugging, then record the device model, Android version and RAM in the PR. If it is newer or larger than a 4 GB school tablet, say so next to every memory or speed figure. |
| 3 | Who records the spike audio? | **Answered 2026-11-16: the founders will record.** At the start of phase 1, give them one short English passage and a numbered script of about ten clips (what to read and how to misread it), accept whatever format their phone produces, and convert to 16 kHz mono WAV yourself. Keep the clips out of git. |
| 4 | What does export aim for? | **Answered 2026-11-16: a plain class record.** CSV plus a class sheet with the Phil-IRI oral-reading columns, comprehension left blank, no claim that it is the DepEd form. Matching the official Excel templates is a later change, once a founder adds them to the repo. The landing page's "fills in the DepEd spreadsheet" claim keeps its `CONFIRM` marker. |
| 5 | Is cloud sync wanted before the first pilot? | Deferred. |
| 6 | Who reviews the 18 seed passages? | Shipped as labelled drafts; flagged before any pilot. |
| 7 | How long should recordings stay on the tablet? | Kept until the teacher deletes them in settings; removed when the learner is removed. |
| 8 | Show the US fluency benchmark line on the progress chart? | Left out. |
| 9 | What should happen to PR #2 and the V5–V9 business plan branch? | Left untouched. |
| 10 | Have the teacher interviews changed anything about what teachers want from the app? | Nothing assumed. |

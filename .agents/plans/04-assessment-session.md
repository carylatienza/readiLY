# Feature: 04-assessment-session — Recording Flow

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

## Feature Description

The assessment recording flow: a teacher picks a student (from plan 02's roster) and a passage (from plan 03's library), lands on a recording screen showing the passage in large, readable print, taps a record button, reads along while the student reads aloud, and taps stop. Audio is captured as **raw PCM 16 kHz / 16-bit / mono and saved as a WAV file in app-private storage** (the exact format sherpa-onnx expects in plan 05 — no resampling step later). A `AssessmentSession` Room entity records student FK, passage FK, timestamp, duration, audio file path, and `status = RECORDED`. Plan 05 consumes `RECORDED` sessions and flips them to `SCORED`.

The passage display in this plan is static large text — **no live word tracking yet** — but it is built as a composable that takes a per-word highlight state (`highlightIndex: Int`, `-1` = none) so plan 05 can drive karaoke highlighting from ASR timestamps without touching this screen's layout.

A live amplitude meter gives the teacher visible confirmation that the mic is capturing. Recording hard-caps at 3 minutes. Interruptions (phone call → audio focus loss), permission denial, and storage exhaustion are handled explicitly.

## User Story

As a Grade 1–3 teacher
I want to record a student reading a passage aloud on my tablet, seeing the passage text and a live mic level while I record
So that I have an on-device audio capture of the reading, ready for automatic scoring, without any manual timing or transcription

## Problem Statement

Oral reading assessment today requires the teacher to simultaneously time the student, follow the text, and mark miscues by hand. The app needs a dead-simple capture step — pick student, pick passage, press record — that produces audio in exactly the format the on-device ASR engine (plan 05) needs, works fully offline, and never lets audio leave the device (index.md: Data Privacy Act constraint).

## Solution Statement

- **`AudioRecord` (not `MediaRecorder`)** streaming raw PCM 16 kHz/16-bit/mono to a file, with a 44-byte WAV header patched in on stop. `MediaRecorder` only outputs compressed containers (AAC/AMR) that plan 05 would have to decode and resample; `AudioRecord` gives us sherpa-onnx's native input format directly and exposes per-buffer samples for the amplitude meter for free.
- **Recording runs in a `ViewModel`-scoped coroutine on `Dispatchers.IO`** — no foreground service. The teacher keeps the screen open during a ≤3-minute assessment; a service is speculative complexity here. Screen kept on via `ScreenFlagsEffect` / `FLAG_KEEP_SCREEN_ON` so the OS can't kill the capture mid-read.
- **Permission via platform Activity Result API** (`rememberLauncherForActivityResult` + `ActivityResultContracts.RequestPermission`) — no Accompanist dependency; it's experimental and this is one permission on one screen.
- **Audio focus** requested with `AudioFocusRequest` (`AUDIOFOCUS_GAIN`); on focus loss (incoming call) the recording stops and saves what was captured, marked complete — a partial reading is still scoreable.
- **Storage**: `context.filesDir/recordings/<sessionId>.wav`. App-private, no permissions needed, excluded from backups. Free space checked before start (need ≤ ~5.6 MB for 3 min: 16000 × 2 × 180).
- **`AssessmentSession` Room entity** with FKs to `students` and `passages`, and a `SessionStatus` enum (`RECORDED`, `SCORED`) persisted via a Room `TypeConverter` (or stored as String — match plan 01's converter conventions).

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: Medium
**Primary Systems Affected**: Room DB (new entity + DAO + migration-free additive table), navigation graph, new Compose screens (session setup, recording), audio subsystem (new)
**Dependencies**: None new — platform `android.media.AudioRecord`/`AudioFocusRequest`, existing Compose/Hilt/Room stack from plan 01

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

Plans 01–03 create these; exact paths may differ slightly — locate them by name before starting:

- `app/src/main/java/.../data/db/AppDatabase.kt` — Why: register the new `AssessmentSessionEntity` + DAO here; follow existing `@Database` entity list and version-bump convention (pre-release: bump version, `fallbackToDestructiveMigration` per plan 01, confirm).
- `app/src/main/java/.../data/db/StudentEntity.kt` (plan 02) — Why: entity/PK/naming conventions to mirror; FK target (`students` table, `id` column).
- `app/src/main/java/.../data/db/PassageEntity.kt` (plan 03) — Why: FK target; also how tokenized words are stored (the recording screen renders the pre-tokenized word list, not raw text — the word list is what plan 05 aligns against).
- `app/src/main/java/.../di/DatabaseModule.kt` (plan 01) — Why: Hilt DAO provider pattern to mirror.
- Any existing `*ViewModel.kt` from plan 02/03 — Why: `@HiltViewModel` + `StateFlow` UI-state pattern, repository injection convention.
- Navigation graph file from plan 01 (e.g. `AppNavHost.kt`) — Why: route-with-arguments pattern; this plan adds two destinations.
- An existing DAO test from plan 02 — Why: Room test setup (in-memory DB, runner) to mirror.

### New Files to Create

(Adjust package root to whatever plan 01 established, e.g. `com.readily.app`.)

- `data/db/AssessmentSessionEntity.kt` — Room entity + `SessionStatus` enum
- `data/db/AssessmentSessionDao.kt` — insert, getById, getByStudent, updateStatus
- `data/repository/AssessmentSessionRepository.kt` — thin wrapper over DAO + audio-file deletion helper (concrete class, no interface — single implementation)
- `audio/WavFileWriter.kt` — streams PCM to file, writes/patches 44-byte WAV header
- `audio/AudioRecorder.kt` — wraps `AudioRecord` loop: start/stop, emits amplitude + elapsed-time flow, enforces 3-min cap, handles audio focus
- `ui/session/SessionSetupScreen.kt` — student picker + passage picker → "Start Assessment"
- `ui/session/RecordingScreen.kt` — passage display, amplitude meter, record/stop, permission flow
- `ui/session/RecordingViewModel.kt` — owns `AudioRecorder`, saves the session row
- `ui/session/PassageDisplay.kt` — the karaoke-ready composable (see design note)
- `app/src/test/java/.../audio/WavFileWriterTest.kt` — header correctness (JVM unit test)
- `app/src/androidTest/java/.../data/db/AssessmentSessionDaoTest.kt` — FK + insert/query

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [AudioRecord reference](https://developer.android.com/reference/android/media/AudioRecord)
  - Constructor params, `getMinBufferSize`, `read(ShortArray, ...)`, `STATE_INITIALIZED` check
  - Why: core capture API; must verify state after construction (init fails silently on bad params)
- [Raw PCM → WAV gist (kmark)](https://gist.github.com/kmark/d8b1b01fb0d2febf5770)
  - Full working AudioRecord→WAV example incl. header patching after recording
  - Why: reference implementation for the 44-byte header field layout and post-hoc size patch
- [Fix PCM→WAV noise / header layout guide](https://www.javaspring.net/blog/writing-pcm-recorded-data-into-a-wav-file-java-android/)
  - Byte-exact header field offsets; little-endian pitfalls
  - Why: a malformed header = white noise; this documents each of the 44 bytes
- [Request runtime permissions](https://developer.android.com/training/permissions/requesting#request-permission)
  - `shouldShowRequestPermissionRationale`, request flow
  - Why: canonical permission UX (rationale → request → settings redirect on permanent denial)
- [Compose + Activity Result / permissions](https://composables.com/blog/permissions)
  - `rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission())` pattern in Compose without Accompanist
  - Why: exact composable-side wiring used in Task 8
- [Audio focus](https://developer.android.com/media/optimize/audio-focus#audio-focus-change)
  - `AudioFocusRequest.Builder`, `OnAudioFocusChangeListener`, `AUDIOFOCUS_LOSS`
  - Why: phone-call interruption handling (Task 5)
- [Accompanist permissions](https://google.github.io/accompanist/permissions/) — read only to confirm we are deliberately NOT adding it (experimental, one permission doesn't justify a dependency)
- [Room relationships / @ForeignKey](https://developer.android.com/reference/androidx/room/ForeignKey)
  - Why: FK + `onDelete` semantics for student/passage references

### Patterns to Follow

**Naming:** Match plans 01–03: `*Entity`, `*Dao`, `*Repository`, `*ViewModel`, `*Screen` (Compose), tables snake-or-lower-case per plan 02's `students` table.

**UI state:** Single `data class RecordingUiState(...)` exposed as `StateFlow` from the ViewModel, collected with `collectAsStateWithLifecycle()` — mirror plan 02/03 screens.

**DI:** DAO provided in the existing `DatabaseModule`; `AudioRecorder` constructor-injected into the ViewModel via `@Inject constructor` (no module needed — concrete class).

**Error handling:** Repository/recorder failures surface as a sealed/enum error field on the UI state → snackbar or inline message; never crash on `IOException`. Match whatever plan 02 does for insert failures.

**Karaoke-ready display contract (load-bearing for plan 05):**

```kotlin
@Composable
fun PassageDisplay(
    words: List<String>,          // pre-tokenized from PassageEntity (plan 03)
    highlightIndex: Int,          // -1 = no highlight (this plan always passes -1)
    modifier: Modifier = Modifier,
)
```

Render with a single `Text` + `buildAnnotatedString` (spans per word, `SpanStyle(background=...)` on `highlightIndex`) inside `verticalScroll` — NOT one composable per word (passages can be 100+ words; annotated string recomposes cheaply and wraps naturally). Font ≥ 28.sp, generous `lineHeight`. Plan 05 will also need auto-scroll-to-word: expose word index only; plan 05 can add `bringIntoView` then. Do not build auto-scroll now.

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation (data layer)

`AssessmentSessionEntity` + DAO + repository, registered in `AppDatabase` and Hilt. Additive schema change (new table + version bump).

### Phase 2: Core Implementation (audio)

`WavFileWriter` (pure-JVM, unit-testable: header writing + patch-on-close), then `AudioRecorder` (AudioRecord loop on `Dispatchers.IO`, amplitude/elapsed `StateFlow`, 3-min cap, audio focus). These have no UI dependency and are the risk center — build and test them first.

### Phase 3: Integration (UI + navigation)

`SessionSetupScreen` (reuses plan 02 student list + plan 03 passage list data), `RecordingScreen` with permission flow, `PassageDisplay`, amplitude meter, and the save-on-stop path writing the session row. Wire two routes into the nav graph; add a "New Assessment" entry point from wherever plan 02/03 put their home navigation.

### Phase 4: Testing & Validation

JVM test for WAV header byte-exactness; instrumented DAO test for FK integrity; manual on-device recording pass (record → verify WAV plays → verify row in DB).

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### CREATE data/db/AssessmentSessionEntity.kt

- **IMPLEMENT**:
  ```kotlin
  enum class SessionStatus { RECORDED, SCORED }

  @Entity(
      tableName = "assessment_sessions",
      foreignKeys = [
          ForeignKey(entity = StudentEntity::class, parentColumns = ["id"],
              childColumns = ["studentId"], onDelete = ForeignKey.CASCADE),
          ForeignKey(entity = PassageEntity::class, parentColumns = ["id"],
              childColumns = ["passageId"], onDelete = ForeignKey.RESTRICT),
      ],
      indices = [Index("studentId"), Index("passageId")]
  )
  data class AssessmentSessionEntity(
      @PrimaryKey val id: String,            // UUID string — match plans 02/03 PK style; if they use Long autogen, use that instead
      val studentId: /* match StudentEntity.id type */,
      val passageId: /* match PassageEntity.id type */,
      val recordedAt: Long,                  // epoch millis
      val durationMs: Long,
      val audioFilePath: String,             // absolute path under filesDir/recordings
      val status: SessionStatus,
  )
  ```
  Add a `TypeConverter` for `SessionStatus` (name ↔ String) in the project's existing converters file, or annotate DB with a new converter class if none exists.
- **PATTERN**: `StudentEntity.kt` (plan 02) for annotations/PK style — copy its exact conventions.
- **GOTCHA**: FK columns MUST be indexed or Room emits a warning-as-error under plan 01's strict lint. `onDelete = CASCADE` for student (deleting a student removes their sessions — also delete WAV files, see repository task); `RESTRICT` for passage (bundled passages are never deleted, but don't allow silent orphaning).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE data/db/AssessmentSessionDao.kt

- **IMPLEMENT**:
  ```kotlin
  @Dao
  interface AssessmentSessionDao {
      @Insert suspend fun insert(session: AssessmentSessionEntity)
      @Query("SELECT * FROM assessment_sessions WHERE id = :id")
      suspend fun getById(id: String): AssessmentSessionEntity?
      @Query("SELECT * FROM assessment_sessions WHERE studentId = :studentId ORDER BY recordedAt DESC")
      fun observeByStudent(studentId: String): Flow<List<AssessmentSessionEntity>>
      @Query("SELECT * FROM assessment_sessions WHERE status = 'RECORDED' ORDER BY recordedAt ASC")
      fun observeUnscored(): Flow<List<AssessmentSessionEntity>>  // plan 05's work queue
      @Query("UPDATE assessment_sessions SET status = :status WHERE id = :id")
      suspend fun updateStatus(id: String, status: SessionStatus)
      @Query("DELETE FROM assessment_sessions WHERE id = :id")
      suspend fun delete(id: String)
  }
  ```
- **PATTERN**: plan 02's `StudentDao` — match suspend/Flow conventions exactly.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE data/db/AppDatabase.kt

- **IMPLEMENT**: Add `AssessmentSessionEntity::class` to the `entities` array, bump `version`, add `abstract fun assessmentSessionDao(): AssessmentSessionDao`, register the `SessionStatus` converter.
- **GOTCHA**: Pre-release DB — if plan 01 configured `fallbackToDestructiveMigration()`, a version bump suffices; if not, add it (no user data in the wild yet). Do NOT write a Migration object.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE di/DatabaseModule.kt

- **IMPLEMENT**: `@Provides fun provideAssessmentSessionDao(db: AppDatabase) = db.assessmentSessionDao()`
- **PATTERN**: existing DAO providers in the same file.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE data/repository/AssessmentSessionRepository.kt

- **IMPLEMENT**: `@Singleton class AssessmentSessionRepository @Inject constructor(private val dao: AssessmentSessionDao)` with `suspend fun save(session)`, `observeByStudent`, `observeUnscored`, and `suspend fun deleteWithAudio(session)` that deletes the WAV file (`File(session.audioFilePath).delete()`) then the row. Concrete class, no interface.
- **GOTCHA**: Student CASCADE deletes rows but not files — plan 02's student-delete path should call a cleanup; add `suspend fun deleteAllForStudent(studentId)` that deletes files then relies on cascade, and note in plan 02's delete flow (UPDATE the student ViewModel's delete to call it if trivially reachable; otherwise leave a `// ponytail:` note — orphaned WAVs are bounded and harmless until then).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE audio/WavFileWriter.kt

- **IMPLEMENT**: Pure-JVM class (no Android imports → JVM-unit-testable):
  ```kotlin
  class WavFileWriter(private val file: File, private val sampleRate: Int = 16000) {
      // writes 44 placeholder bytes on open; append(shorts: ShortArray, count: Int)
      // converts to little-endian bytes via ByteBuffer.order(LITTLE_ENDIAN);
      // close() seeks to offsets 4 (fileSize-8) and 40 (dataSize) via RandomAccessFile
      // and patches the sizes. Header: mono (offset 22 = 1), 16-bit (offset 34 = 16),
      // byteRate = sampleRate*2 (offset 28), blockAlign = 2 (offset 32).
  }
  ```
  Follow the byte layout in the [kmark gist](https://gist.github.com/kmark/d8b1b01fb0d2febf5770) and the [header field guide](https://www.javaspring.net/blog/writing-pcm-recorded-data-into-a-wav-file-java-android/) exactly.
- **GOTCHA**: All multi-byte header fields are **little-endian** ("RIFF"/"WAVE"/"fmt "/"data" magic strings are ASCII, not LE ints). Getting endianness wrong = static noise. Use `BufferedOutputStream` for appends, `RandomAccessFile` only for the final patch.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*WavFileWriterTest*"` (test created in the testing task — write the test in the same task if you prefer red/green)

### CREATE audio/AudioRecorder.kt

- **IMPLEMENT**:
  ```kotlin
  class AudioRecorder @Inject constructor(@ApplicationContext private val context: Context) {
      data class RecState(val isRecording: Boolean = false, val elapsedMs: Long = 0,
                          val amplitude: Float = 0f /* 0..1 */, val error: RecError? = null)
      enum class RecError { INIT_FAILED, STORAGE_FULL, FOCUS_LOST, IO_ERROR }
      val state: StateFlow<RecState>
      suspend fun start(outputFile: File)   // caller has already checked permission
      fun stop()                            // idempotent
      companion object { const val MAX_DURATION_MS = 180_000L; const val SAMPLE_RATE = 16_000 }
  }
  ```
  - `start`: check `outputFile.parentFile.usableSpace > 6_000_000` else `STORAGE_FULL`; request audio focus (`AudioFocusRequest.Builder(AUDIOFOCUS_GAIN)` on API 26+, listener sets `FOCUS_LOST` and calls `stop()` on `AUDIOFOCUS_LOSS`/`AUDIOFOCUS_LOSS_TRANSIENT`); construct `AudioRecord(MediaRecorder.AudioSource.MIC, 16000, CHANNEL_IN_MONO, ENCODING_PCM_16BIT, bufferSize)` where `bufferSize = maxOf(AudioRecord.getMinBufferSize(...) * 2, 8192)`; verify `state == STATE_INITIALIZED` else `INIT_FAILED`; `startRecording()`; loop on `Dispatchers.IO`: `read(shortBuf, 0, shortBuf.size)` → `wavWriter.append` → amplitude = `maxAbs/32767f` → update state every buffer (~256 ms at 4096 shorts); break when `elapsedMs >= MAX_DURATION_MS` (auto-stop, not an error).
  - `stop`: end loop, `audioRecord.stop(); release()`, `wavWriter.close()` (header patch), `abandonAudioFocusRequest`. Wrap all IO in try/catch → `IO_ERROR` but still attempt header patch so partial audio stays playable.
  - Min SDK is Android 9 (API 28) per index.md, so `AudioFocusRequest` (API 26) needs no legacy fallback.
- **PATTERN**: none in repo yet — this file is the reference implementation for audio.
- **GOTCHA**: `AudioRecord` construction with an unsupported rate returns an object in `STATE_UNINITIALIZED` instead of throwing — always check. 16 kHz mono PCM16 is guaranteed on all devices per the [AudioRecord docs](https://developer.android.com/reference/android/media/AudioRecord) (44.1 kHz is the only *documented* guarantee; 16 kHz works universally in practice, but keep the `INIT_FAILED` path — that's the calibration knob if a device misbehaves). Never call `read` after `release()` — guard with the loop flag.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE app/src/main/AndroidManifest.xml

- **IMPLEMENT**: `<uses-permission android:name="android.permission.RECORD_AUDIO" />` and `<uses-feature android:name="android.hardware.microphone" android:required="true" />`
- **VALIDATE**: `gradlew.bat :app:processDebugManifest`

### CREATE ui/session/RecordingViewModel.kt

- **IMPLEMENT**: `@HiltViewModel`, injects `AudioRecorder`, `AssessmentSessionRepository`, passage/student repos (plans 02/03), `SavedStateHandle` for nav args (`studentId`, `passageId`). Exposes combined `RecordingUiState` (student name, passage words list, recorder state, saved flag). `onStartRecording()`: creates `File(context.filesDir, "recordings/$sessionId.wav")` (mkdirs), launches `recorder.start(file)` in `viewModelScope`. `onStopRecording()`: `recorder.stop()`, then inserts `AssessmentSessionEntity(status = RECORDED, durationMs = recorder.state.value.elapsedMs, ...)`; sets saved flag → UI navigates back. Auto-stop at cap and `FOCUS_LOST` both route through the same save path (partial recording is saved, not discarded). `onCleared()` calls `recorder.stop()` (teacher backs out mid-recording → save what exists, insert the row).
- **PATTERN**: plan 02/03 ViewModels for `SavedStateHandle` nav-arg and StateFlow conventions.
- **GOTCHA**: Get `filesDir` via an injected `@ApplicationContext` or through the repository — do not hold an Activity context in the ViewModel.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/session/PassageDisplay.kt

- **IMPLEMENT**: the composable exactly as specified in *Patterns to Follow* (annotated-string single Text, `highlightIndex`, ≥28.sp, `verticalScroll`).
- **GOTCHA**: This signature is a contract with plan 05 — do not change parameter names/types without updating index.md notes.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/session/RecordingScreen.kt

- **IMPLEMENT**:
  - Permission: on record-button tap, `ContextCompat.checkSelfPermission`; if denied, `rememberLauncherForActivityResult(ActivityResultContracts.RequestPermission()) { granted -> if (granted) viewModel.onStartRecording() else showDenied = true }` then `launcher.launch(Manifest.permission.RECORD_AUDIO)`. Denied state: inline message "Microphone access is needed to record the assessment" + "Open Settings" button (`Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.fromParts("package", packageName, null))`). Pattern per [Compose permissions guide](https://composables.com/blog/permissions) and [official permission UX](https://developer.android.com/training/permissions/requesting#request-permission).
  - Layout: student name + passage title top bar; `PassageDisplay(words, highlightIndex = -1)` filling most of the screen; bottom bar with elapsed time `mm:ss / 3:00`, amplitude meter, and one Record/Stop FAB.
  - Amplitude meter: a plain `LinearProgressIndicator(progress = { state.amplitude })` — no custom canvas. It visibly moves with speech; that's the whole requirement.
  - While recording: `DisposableEffect` sets `FLAG_KEEP_SCREEN_ON` on the window (clear on dispose); intercept back (`BackHandler`) with a confirm dialog ("Stop and save recording?").
  - Errors from `RecError` → snackbar text: STORAGE_FULL → "Not enough storage to record", FOCUS_LOST → "Recording interrupted — saved what was recorded", INIT_FAILED/IO_ERROR → "Recording failed. Try again."
  - On `saved` flag → navigate back (session list/home).
- **PATTERN**: plan 02/03 screens for scaffold/snackbar/nav conventions.
- **GOTCHA**: Don't auto-request permission on screen entry — request on first record tap (better UX, and avoids rationale complexity). `FOCUS_LOST` still saves; the message must say so.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/session/SessionSetupScreen.kt (+ ViewModel if the pattern demands one)

- **IMPLEMENT**: Two-step picker on one screen: list of students (reuse plan 02's repository/observe flow), then list of passages (plan 03's repository — show title + grade level + language). "Start" enabled when both selected → navigate to recording route with both ids. If plan 02/03 expose ready-made list composables, reuse them; do not rebuild list items.
- **PATTERN**: plan 02 roster screen / plan 03 library screen.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE navigation graph (plan 01's AppNavHost)

- **IMPLEMENT**: Add routes `session/setup` and `session/record/{studentId}/{passageId}` (match plan 01's route style — string routes or type-safe `@Serializable` destinations, whichever exists). Add a "New Assessment" button/FAB on the home screen navigating to `session/setup`.
- **PATTERN**: existing destinations in the nav file.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/test/java/.../audio/WavFileWriterTest.kt

- **IMPLEMENT**: JVM test (temp folder): write a known 1-second sine/ramp ShortArray, close, then assert on raw bytes: `"RIFF"` at 0, `"WAVE"` at 8, channels==1 at offset 22, sampleRate==16000 at 24, bitsPerSample==16 at 34, `"data"` at 36, dataSize at 40 == 32000, RIFF size at 4 == fileLength-8. Read fields with `ByteBuffer.wrap(bytes).order(LITTLE_ENDIAN)`.
- **PATTERN**: plan 01's unit-test setup (JUnit, no Robolectric needed — class is pure JVM).
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*WavFileWriterTest*"`

### CREATE app/src/androidTest/java/.../data/db/AssessmentSessionDaoTest.kt

- **IMPLEMENT**: In-memory Room DB: insert student + passage (minimal fixtures), insert session, assert `getById` round-trips incl. `status`; assert inserting a session with a bogus `studentId` throws `SQLiteConstraintException`; assert deleting the student cascades the session away; assert `updateStatus(id, SCORED)` reflects in `observeUnscored()`.
- **PATTERN**: plan 02's DAO test.
- **VALIDATE**: `gradlew.bat :app:connectedDebugAndroidTest --tests "*AssessmentSessionDaoTest*"` (requires an attached device/emulator; if none in CI, run full unit suite instead and flag)

### Full-suite gate

- **VALIDATE**: `gradlew.bat :app:lintDebug :app:testDebugUnitTest :app:assembleDebug`

---

## TESTING STRATEGY

### Unit Tests

- `WavFileWriterTest` — byte-exact header validation (the highest-risk pure-logic component; a wrong header silently breaks plan 05).
- ViewModel test only if plan 02/03 established a ViewModel-test pattern with a main-dispatcher rule; otherwise skip — the ViewModel is thin glue over tested parts.

### Integration Tests

- `AssessmentSessionDaoTest` (instrumented) — FK integrity, cascade, status transitions, unscored queue query.

### Edge Cases

- Permission denied → denied twice (permanent) → settings redirect path renders.
- Storage below ~6 MB → `STORAGE_FULL` before any file is created.
- Audio focus loss mid-recording (simulate: start recording, place a call / use another recording app) → session saved with partial duration, snackbar shown.
- 3-minute cap → auto-stop, `durationMs ≈ 180000`, session saved.
- Back press mid-recording → confirm dialog → save-and-exit.
- `AudioRecord` init failure → `INIT_FAILED` surfaced, no zombie file left (delete the placeholder WAV on init failure).
- Stop immediately after start (0–1 buffers) → valid tiny WAV, no crash on header patch.

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness. All non-interactive, run from repo's Android project root.

### Level 1: Syntax & Style

```
gradlew.bat :app:lintDebug
```
(plus `gradlew.bat ktlintCheck` / `detekt` if plan 01 wired them — check root build file)

### Level 2: Unit Tests

```
gradlew.bat :app:testDebugUnitTest
```

### Level 3: Integration Tests

```
gradlew.bat :app:connectedDebugAndroidTest
```
(needs emulator/device; skip in environments without one and note it)

### Level 4: Manual Validation

1. `gradlew.bat :app:installDebug`, open app → New Assessment → pick student + passage.
2. Tap record → permission dialog appears → grant → meter moves while speaking, timer counts.
3. Speak the passage, tap stop → returns/back; confirm session row: `adb shell "run-as <applicationId> ls files/recordings"` shows the WAV.
4. Pull and play: `adb shell "run-as <applicationId> cat files/recordings/<id>.wav" > out.wav` → plays cleanly, is 16 kHz mono (`ffprobe out.wav` if available).
5. Deny permission → inline message + Open Settings works.
6. Record past 3:00 → auto-stops and saves.

### Level 5: Additional Validation (Optional)

- Room schema JSON diff (if `exportSchema = true` in plan 01) — new table only, no changes to existing tables.

---

## ACCEPTANCE CRITERIA

- [ ] Teacher can pick student + passage and reach the recording screen
- [ ] Passage renders as large-print (≥28.sp) tokenized words via `PassageDisplay(words, highlightIndex)` with the plan-05-ready signature
- [ ] Record produces a valid WAV: RIFF header, 16 kHz, mono, 16-bit PCM, correct data-size fields
- [ ] Audio stored only under `filesDir/recordings/` (app-private; nothing on shared storage, nothing to network)
- [ ] `AssessmentSessionEntity` row saved with correct FKs, timestamp, duration, path, `status = RECORDED`
- [ ] Amplitude meter visibly responds to speech; elapsed timer runs; hard stop at 3:00
- [ ] Permission denial handled with rationale message + settings redirect; no crash
- [ ] Audio-focus loss (call) stops and saves partial recording with user-visible message
- [ ] Storage-full pre-check blocks recording with a clear message
- [ ] All validation commands pass with zero errors; no regressions in plans 01–03 tests

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full test suite passes (unit + instrumented where a device is available)
- [ ] No linting or type checking errors
- [ ] Manual on-device recording test confirms playable 16 kHz WAV + DB row
- [ ] Acceptance criteria all met
- [ ] `PassageDisplay` contract documented for plan 05 (signature unchanged from this plan)

---

## NOTES

- **AudioRecord over MediaRecorder** — MediaRecorder can't emit raw PCM; sherpa-onnx wants 16 kHz PCM float/int16. AudioRecord removes a decode+resample step from plan 05 and provides amplitude samples for free. This is the single most load-bearing decision in this plan.
- **No foreground service / no pause-resume / no playback UI** — skipped: sessions are ≤3 min with the teacher actively on-screen (`FLAG_KEEP_SCREEN_ON`). Add a foreground service only if field testing shows OS kills; add playback in plan 06 if teachers ask.
- **No Accompanist** — one permission, platform Activity Result API is 10 lines. Add Accompanist only if a later plan needs multi-permission state mapping.
- **Interruption policy = save partial, never discard** — a struggling reader's partial attempt is still WCPM-scoreable over the recorded window; discarding punishes exactly the flaky-hardware classrooms this app targets.
- **Karaoke highlighting deferred by design** — `highlightIndex` is plumbed but always `-1` here; plan 05 drives it from ASR word timestamps. Auto-scroll-to-word also deferred to plan 05.
- **Confidence Score: 8/10** — audio/WAV/permission/Room work is well-trodden and fully specified; the residual risk is that plans 01–03 aren't implemented yet, so exact file paths, PK types, and nav-route style in this plan are conventions the executor must reconcile against whatever those plans actually produced (called out inline at each such point).

Sources: [AudioRecord reference](https://developer.android.com/reference/android/media/AudioRecord), [kmark PCM→WAV gist](https://gist.github.com/kmark/d8b1b01fb0d2febf5770), [PCM→WAV header guide](https://www.javaspring.net/blog/writing-pcm-recorded-data-into-a-wav-file-java-android/), [Android runtime permissions](https://developer.android.com/training/permissions/requesting#request-permission), [Compose permissions without Accompanist](https://composables.com/blog/permissions), [Accompanist permissions (not adopted)](https://google.github.io/accompanist/permissions/), [Audio focus](https://developer.android.com/media/optimize/audio-focus#audio-focus-change), [Room ForeignKey](https://developer.android.com/reference/androidx/room/ForeignKey)

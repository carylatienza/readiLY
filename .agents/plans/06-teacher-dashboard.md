# Feature: 06-teacher-dashboard

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc. **This plan was written against the plan docs for 01–05, not final code — before writing anything, open the actual entities/DAOs produced by plans 02, 04, and 05 and substitute the real names wherever this plan says "adapt to actual".**

## Feature Description

Turn the `ScoringResult` data produced by plan 05 into teacher-facing insight, fully offline:

1. **Class summary screen** — per-class overview: count of students per Phil-IRI reading-level band (Independent / Instructional / Frustration, from each student's latest assessment), a "needs attention" flag list (lowest accuracy/WCPM or declining trend), and assessment coverage (% of the class with at least one completed assessment).
2. **Student profile screen** — WCPM + accuracy trend across sessions as a hand-drawn Compose Canvas line chart (2 series + a grade-level WCPM benchmark reference line), miscue-type breakdown (counts per miscue type across sessions), and a session history list where each row navigates to the existing per-word results screen from plan 05.
3. **Banding logic** — pure Kotlin functions mapping accuracy % to Phil-IRI oral reading levels, with unit tests.

**Deliberate MVP boundary: NO predictive AI.** Flags are simple deterministic rules (thresholds + last-3-session slope). The index lists "Early-warning predictive AI" as deferred — this plan must not creep into it. Rule-based flags are explainable to teachers and Division Offices, which the research doc identifies as critical for trust.

## User Story

As a Grade 1–3 public school teacher
I want to see my class's reading levels, struggling students, and each student's progress over time at a glance
So that I can target interventions and fill DepEd reporting needs without manually tabulating scores — even fully offline.

## Problem Statement

Plans 01–05 produce raw per-session scoring data (WCPM, accuracy %, per-word miscues) stored in Room, but a teacher with 40–50 students cannot act on raw rows. The research doc (`docs/research/Systemic Realities of Early Grade Reading Assessments.md`) shows teachers currently hand-tabulate Phil-IRI/CRLA results into Excel under deadline pressure, producing clerical errors and "window dressing". There is no screen that answers: *Who is at Frustration level? Who is slipping? Who hasn't been assessed yet?*

## Solution Statement

Add a `dashboard` feature package with two Compose screens (ClassSummary, StudentProfile) backed by ViewModels that combine existing Room flows (students from plan 02, sessions + scoring results from plans 04/05). All analytics — banding, flag rules, trend slope, coverage % — are pure Kotlin functions in a `ReadingAnalytics` file, unit-tested with plain JUnit (no Android deps). The trend chart is a hand-drawn `Canvas` composable (~120 lines) rather than a chart library: only 2 line series + 1 reference line are needed, so Vico (multi-module dependency, its own theming system) fails the weight test. No new Gradle dependencies at all.

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: Medium
**Primary Systems Affected**: UI (Compose screens + navigation), domain (new pure analytics functions), data (read-only — new DAO queries only, no schema change expected)
**Dependencies**: None new. Reuses Compose, Hilt, Room, Navigation from plan 01.

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

Plans 01–05 may still be in flight when this file is authored; read the *implemented code* first, falling back to the plan docs:

- `.agents/plans/index.md` — Why: locked stack + constraints (offline-first, low-end hardware).
- `.agents/plans/01-project-foundation.md` and the actual app module it produced — Why: package root (assumed `com.readily.*` — **adapt to actual**), navigation graph pattern, ViewModel/Hilt pattern, theme, test harness commands.
- `.agents/plans/02-student-roster.md` + its `Student`/`SchoolClass` entities and DAOs — Why: class/student IDs, grade-level field (needed for benchmark line), list-screen Compose patterns to mirror.
- `.agents/plans/04-assessment-session.md` + its `AssessmentSession` entity — Why: session ↔ student ↔ passage linkage and timestamps (trend x-axis).
- `.agents/plans/05-asr-scoring-engine.md` + its `ScoringResult` (WCPM, accuracy %, miscue types) and per-word result entities/screen — Why: exact field names for analytics inputs, and the per-word results screen route that session-history rows must navigate to.
- `docs/research/Systemic Realities of Early Grade Reading Assessments.md` (lines 13–29) — Why: CRLA profiles (Full/Moderate/Light Refresher, Grade Ready) and Phil-IRI Independent/Instructional/Frustration context; explains why flags must be simple and explainable (line 125: teachers fear "transparent data" — the UI copy should frame flags as intervention prompts, not verdicts).

### New Files to Create

Paths assume plan-01 layout `app/src/main/java/com/readily/` with per-feature packages — **adapt to actual**:

- `app/src/main/java/com/readily/dashboard/ReadingAnalytics.kt` — pure functions: banding, flag rules, trend slope, coverage.
- `app/src/main/java/com/readily/dashboard/DashboardModels.kt` — small UI-facing data classes (`ReadingLevel`, `StudentSnapshot`, `ClassSummary`, `TrendPoint`).
- `app/src/main/java/com/readily/dashboard/ClassSummaryViewModel.kt`
- `app/src/main/java/com/readily/dashboard/ClassSummaryScreen.kt`
- `app/src/main/java/com/readily/dashboard/StudentProfileViewModel.kt`
- `app/src/main/java/com/readily/dashboard/StudentProfileScreen.kt`
- `app/src/main/java/com/readily/dashboard/TrendChart.kt` — hand-drawn Canvas line chart.
- `app/src/test/java/com/readily/dashboard/ReadingAnalyticsTest.kt` — JVM unit tests.

If plans 02/05 placed DAOs elsewhere, ADD queries to the existing DAO files rather than creating new ones.

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [Phil-IRI Full Package v1 (DepEd 2018 manual)](https://ia903103.us.archive.org/18/items/PhilIRIFullPackageV1/Phil-IRI%20Full%20Package%20v1.pdf)
  - Section: Oral Reading Test criteria
  - Why: authoritative word-recognition thresholds — **Independent 97–100%, Instructional 90–96%, Frustration ≤89%** (verified 2026-07-18; matches the values given in scope). Comprehension thresholds (80/59/58) are out of scope — we band on word-reading accuracy only, and the UI must label the band "Oral Reading (Word Recognition) Level" to avoid implying comprehension was measured.
- [Compose Canvas graphics](https://developer.android.com/develop/ui/compose/graphics/draw/overview)
  - Sections: `Canvas` composable, `drawLine`/`drawPath`/`drawCircle`, `drawText` via `rememberTextMeasurer`
  - Why: everything needed for the hand-drawn chart.
- [Hasbrouck & Tindal 2017 ORF norms](https://www.readingrockets.org/topics/assessment-and-evaluation/articles/fluency-norms-chart-2017-update)
  - Why: WCPM benchmark reference values. **There are no official DepEd WCPM norms** (Phil-IRI records reading speed but publishes no per-grade WCPM cutoffs), so use Hasbrouck–Tindal 50th-percentile **spring** values: Grade 1 = 60, Grade 2 = 100, Grade 3 = 112 WCPM. Label the chart line "US norm (H-T 2017)" — these are English L1 norms and will overshoot Filipino/PH-English readers; they are context, not a pass/fail bar. Note this caveat in a KDoc on the constant.
- [Vico chart library](https://github.com/patrykandpatrick/vico) — **evaluated and rejected**: multi-module dependency (~ several hundred KB + its own model/theme layer) to draw 2 polylines. Hand-drawn Canvas is lighter and dependency-free; fits the low-end hardware constraint. Reconsider Vico only if charts grow past ~3 series or need pan/zoom.

### Patterns to Follow

Mirror whatever plan 01 established; expected shape (verify against real code):

**ViewModel:** `@HiltViewModel class XViewModel @Inject constructor(dao/repo, savedStateHandle)` exposing a single `StateFlow<UiState>` via `stateIn(viewModelScope, WhileSubscribed(5000), initial)`.

**Screen:** stateless `@Composable fun XScreen(state, callbacks)` + a route-level composable that collects the ViewModel; register in the existing NavHost with typed routes matching plan 01's convention.

**Room:** DAO methods returning `Flow<List<T>>`; JOINs via `@Query` with embedded/relation as plans 02/05 did.

**Naming:** match existing entity names exactly — e.g. if plan 05 called it `accuracyPercent: Float` vs `accuracy: Double`, use theirs.

**Analytics purity:** `ReadingAnalytics.kt` must have zero Android/Room imports so tests run on the JVM with plain JUnit (matching plan 01's unit-test setup).

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation

Pure domain logic first — it has no dependency on UI or unfinished naming questions beyond `ScoringResult` field names.

**Tasks:**
- Define `ReadingLevel` enum and snapshot/summary data classes.
- Implement banding, flag, slope, and coverage functions.
- Unit-test them exhaustively (boundaries at 89.99/90/96.99/97, empty lists, single session).

### Phase 2: Core Implementation

**Tasks:**
- Add DAO queries: latest scoring result per student in a class; all results for one student ordered by session timestamp; assessed-student count per class.
- Build both ViewModels combining flows into UI state.
- Build `TrendChart` Canvas composable.

### Phase 3: Integration

**Tasks:**
- Build both screens; wire navigation: class list (plan 02) → ClassSummary → StudentProfile → per-word results screen (plan 05).
- Add dashboard entry point (e.g. "Class summary" action on the class detail screen — mirror wherever plan 02 put class-level actions).

### Phase 4: Testing & Validation

**Tasks:**
- Analytics unit tests (already written in Phase 1 — extend for flag rules).
- ViewModel unit tests with fake DAOs (mirror plan 02/04 ViewModel test pattern if one exists; otherwise plain fakes, no mocking library).
- Lint + full test suite + manual run.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable. All commands run from repo root `C:\Users\caryl\Documents\COLLEGE\readiLY\readiLY` (or the Android project root if plan 01 nested it — check for `gradlew.bat` location first and prefix accordingly).

### READ existing code (no output)

- **IMPLEMENT**: Read plan-05's `ScoringResult` entity, plan-04's `AssessmentSession`, plan-02's `Student`/`SchoolClass` + DAOs, plan-01's NavHost and one existing ViewModel+Screen pair. Record: package root, entity field names, route convention, test source-set location.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin` (baseline compiles before you touch anything)

### CREATE app/src/main/java/com/readily/dashboard/DashboardModels.kt

- **IMPLEMENT**:
  ```kotlin
  enum class ReadingLevel { INDEPENDENT, INSTRUCTIONAL, FRUSTRATION }

  data class StudentSnapshot(
      val studentId: Long,          // adapt to actual ID type
      val name: String,
      val latestAccuracy: Double?,  // null = never assessed
      val latestWcpm: Double?,
      val level: ReadingLevel?,
      val flagged: Boolean,
      val flagReason: String?,      // "Frustration level", "Declining accuracy", "Lowest WCPM in class"
  )

  data class ClassSummary(
      val countsByLevel: Map<ReadingLevel, Int>,
      val coveragePercent: Int,     // 0..100
      val flagged: List<StudentSnapshot>,
      val students: List<StudentSnapshot>,
  )

  data class TrendPoint(val sessionTimestamp: Long, val wcpm: Double, val accuracyPercent: Double)
  ```
- **GOTCHA**: keep these Android-free (no `@Entity`, no Compose types) so analytics tests stay on the JVM.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/dashboard/ReadingAnalytics.kt

- **IMPLEMENT**: pure top-level/object functions:
  ```kotlin
  /** Phil-IRI 2018 oral reading (word recognition) thresholds. */
  fun bandFor(accuracyPercent: Double): ReadingLevel = when {
      accuracyPercent >= 97.0 -> ReadingLevel.INDEPENDENT
      accuracyPercent >= 90.0 -> ReadingLevel.INSTRUCTIONAL
      else -> ReadingLevel.FRUSTRATION
  }

  /** Least-squares slope over the last [window] points; null if < 2 points. */
  fun trendSlope(values: List<Double>, window: Int = 3): Double?

  /** Flag rules (deliberate MVP boundary — NO predictive AI, rules only):
   *  1. latest band == FRUSTRATION
   *  2. accuracy slope over last 3 sessions < -1.0 (percentage points/session)
   *  3. bottom decile of class by latest WCPM (min 1 student when class has any scores)
   *  First matching rule supplies flagReason. */
  fun flagReasonFor(snapshot: ..., classWcpms: List<Double>): String?

  fun coveragePercent(assessedCount: Int, totalCount: Int): Int // 0 when total == 0

  /** ponytail: Hasbrouck–Tindal 2017 spring 50th-percentile WCPM (US English norms —
   *  context line only; replace with DepEd/PH norms when they exist). */
  val WCPM_BENCHMARK_BY_GRADE: Map<Int, Int> = mapOf(1 to 60, 2 to 100, 3 to 112)
  ```
- **GOTCHA**: banding boundaries are inclusive-lower (90.0 is INSTRUCTIONAL, 97.0 is INDEPENDENT, 89.99 is FRUSTRATION). If plan 05 stores accuracy as 0..1 fraction instead of 0..100, convert at the ViewModel boundary, not inside `bandFor` — keep the function in the same unit as the Phil-IRI manual (%).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/test/java/com/readily/dashboard/ReadingAnalyticsTest.kt

- **IMPLEMENT**: JUnit tests (match plan 01's JUnit version):
  - `bandFor`: 100→IND, 97→IND, 96.9→INSTR, 90→INSTR, 89.9→FRUST, 0→FRUST.
  - `trendSlope`: empty→null, single→null, [90,85,80]→-5.0, flat→0.0, uses only last `window` points.
  - `flagReasonFor`: frustration wins over decline; declining instructional student flagged; healthy student not flagged; never-assessed student not flagged (no data ≠ struggling — they show in coverage instead).
  - `coveragePercent`: 0 students→0, 3 of 40→8 (rounding), all assessed→100.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*ReadingAnalyticsTest"`

### UPDATE existing scoring/session DAO (from plan 05 — adapt file path to actual)

- **IMPLEMENT**: ADD queries (adapt table/column names to actual schema):
  ```kotlin
  // latest scoring result per student for a class (JOIN session→student, MAX(timestamp) per student)
  @Query("""SELECT ... FROM scoring_result sr JOIN assessment_session s ON ...
            WHERE s.classId = :classId GROUP BY s.studentId HAVING MAX(s.startedAt)""")
  fun latestResultsForClass(classId: Long): Flow<List<StudentLatestResult>>

  // full history for one student, oldest first
  fun resultsForStudent(studentId: Long): Flow<List<ScoringResultWithSession>>
  ```
  Use a small `data class StudentLatestResult(...)` projection (Room POJO, not entity). Miscue-type breakdown: if plan 05 stores per-word rows, add `SELECT miscueType, COUNT(*) ... WHERE studentId = :id GROUP BY miscueType`; if it stores per-type counts on `ScoringResult`, just sum in the ViewModel — check first.
- **GOTCHA**: `GROUP BY ... HAVING MAX()` bare-column selection works in SQLite but verify with the Room query compile check; alternatively use a correlated subquery `WHERE s.startedAt = (SELECT MAX(...) ...)`. Room validates at compile time — the VALIDATE step catches mistakes.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin` (Room query verification runs here)

### CREATE app/src/main/java/com/readily/dashboard/ClassSummaryViewModel.kt

- **IMPLEMENT**: `@HiltViewModel`, takes `classId` from `SavedStateHandle` (mirror plan 02's detail-screen pattern). `combine(studentDao.studentsInClass(classId), scoringDao.latestResultsForClass(classId), studentHistoriesNeededForSlope)` → map through `ReadingAnalytics` → `StateFlow<ClassSummary>`. For the slope rule, fetch last-3 accuracy per student via one extra query (`resultsForStudent` per flagged candidate is O(n) queries — acceptable for ≤50 students; simpler: one query returning last 3 results per student via window function is over-engineering for MVP, do per-student only for students whose latest band isn't INDEPENDENT).
- **GOTCHA**: students with zero sessions must still appear (name + "Not yet assessed") — drive the list from the roster, left-joining results, never from results alone.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/dashboard/ClassSummaryScreen.kt

- **IMPLEMENT**: Scaffold + LazyColumn:
  1. Header row of three level chips: "Independent n / Instructional n / Frustration n" (label the section "Oral Reading Level (Phil-IRI word recognition)").
  2. Coverage line: "`x` of `y` students assessed (`z`%)" + `LinearProgressIndicator`.
  3. "Needs attention" section listing flagged `StudentSnapshot`s with `flagReason` subtitle.
  4. Full student list (all students, level badge or "Not yet assessed"), each row `onClick` → StudentProfile route.
  Mirror plan 02's list-item composable styling. Color the level badges from the existing theme (semantic: green/amber/red equivalents from MaterialTheme.colorScheme — don't hardcode hex).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/dashboard/TrendChart.kt

- **IMPLEMENT**: 
  ```kotlin
  @Composable
  fun TrendChart(
      points: List<TrendPoint>,
      wcpmBenchmark: Int?,          // null hides reference line
      modifier: Modifier = Modifier,
  )
  ```
  Single `Canvas` (~fixed 200.dp height): x = session index (equidistant — simpler than time-scaled and reads better for 2–10 sessions), left y-axis = WCPM (0..max(points, benchmark)*1.1), right y-axis = accuracy 0..100. Draw: gridlines (3–4 horizontal), WCPM polyline + dots (colorScheme.primary), accuracy polyline + dots (colorScheme.tertiary), dashed horizontal benchmark line (`PathEffect.dashPathEffect`) with a small "G{n} norm 60 wpm (H-T 2017, US)" label via `rememberTextMeasurer`, and min/max y-axis labels. Legend as a `Row` of dot+label below the canvas (plain composables, not canvas text). If `points.size < 2`, render a "Need at least 2 assessments to show a trend" placeholder instead.
- **GOTCHA**: Canvas y grows downward — map `y = height * (1 - (v - min) / (max - min))`; guard `max == min` (single value / flat) to avoid divide-by-zero. Keep it dumb: no touch, no animation, no pan/zoom. `ponytail: hand-drawn 2-series chart; switch to Vico if charts grow interactive or >3 series.`
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/dashboard/StudentProfileViewModel.kt

- **IMPLEMENT**: `@HiltViewModel`, `studentId` from `SavedStateHandle`. Combine student row (for name + grade), `resultsForStudent(studentId)`, miscue breakdown query → UI state: `List<TrendPoint>`, `Map<MiscueType, Int>` (use plan 05's actual miscue enum), session history list (date, passage title, WCPM, accuracy, level via `bandFor`), and `WCPM_BENCHMARK_BY_GRADE[student.grade]`.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/dashboard/StudentProfileScreen.kt

- **IMPLEMENT**: LazyColumn: (1) header — name, grade, latest level badge; (2) `TrendChart`; (3) miscue breakdown — one row per miscue type with count and a proportional bar (plain `Box` with fractional width — no chart needed); (4) session history — each row shows date/passage/WCPM/accuracy/level, `onClick` navigates to plan 05's per-word results route passing its expected argument (session or result ID — check the actual route signature).
- **GOTCHA**: reuse plan 05's route constant/builder; do NOT redeclare a second route to the same screen.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE navigation graph (plan 01's NavHost file — adapt path)

- **IMPLEMENT**: ADD `classSummary/{classId}` and `studentProfile/{studentId}` destinations following the existing route convention; ADD an entry point from the class detail/roster screen (plan 02) — e.g. a "Class summary" icon/button where that screen already places actions.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ViewModel tests (same test source set as existing ViewModel tests, if plan 01 established one)

- **IMPLEMENT**: `ClassSummaryViewModelTest`: fake DAOs emitting fixed flows → assert counts per band, coverage %, unassessed student present, flagged ordering. `StudentProfileViewModelTest`: assert TrendPoints ordered by timestamp and benchmark resolved from grade. Use `kotlinx-coroutines-test` `runTest` + `StandardTestDispatcher` per plan 01's setup; skip these if plan 01 shipped no ViewModel-test infrastructure and note it — analytics tests already cover the logic (ViewModels are thin mapping).
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*dashboard*"`

### Final sweep

- **IMPLEMENT**: nothing new — run the full suite.
- **VALIDATE**: `gradlew.bat lint testDebugUnitTest assembleDebug`

---

## TESTING STRATEGY

### Unit Tests

- `ReadingAnalyticsTest` — the core deliverable: exact Phil-IRI boundary values, slope math, flag rule precedence, coverage rounding. Pure JVM, no Robolectric.
- ViewModel tests with hand-rolled fake DAOs (no mocking library unless plans 01–05 already added one).

### Integration Tests

None new. Navigation and DAO queries are compile-time-verified (typed routes + Room query validation). If plan 01 set up Room in-memory DAO tests, ADD one test for `latestResultsForClass` (two students, two sessions each → returns only the latest per student); otherwise skip — the query is the riskiest untested piece, so prefer adding it if the harness exists.

### Edge Cases

- Class with 0 students; class where nobody is assessed (coverage 0%, no flags, no crash).
- Student with exactly 1 session (no trend line, no slope flag; level still shown).
- All students at Frustration (bottom-decile rule must not flag everyone twice / reasons must not duplicate).
- Accuracy exactly 90.0 and 97.0 (band boundaries).
- Flat scores (slope 0 → not declining).
- Grade outside 1–3 (benchmark map miss → hide reference line, don't crash).

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness. Run from wherever `gradlew.bat` lives (repo root or `android/` — check).

### Level 1: Syntax & Style

- `gradlew.bat lint` (plus `gradlew.bat ktlintCheck` / `detekt` if plan 01 configured them — check `build.gradle.kts`)

### Level 2: Unit Tests

- `gradlew.bat :app:testDebugUnitTest --tests "*ReadingAnalyticsTest"`
- `gradlew.bat testDebugUnitTest`

### Level 3: Integration Tests

- `gradlew.bat :app:compileDebugKotlin` (Room query + typed-route compile verification)
- `gradlew.bat connectedDebugAndroidTest` only if plans 01–05 already have instrumented tests and a device/emulator is attached; otherwise skip (non-interactive constraint).

### Level 4: Manual Validation

- `gradlew.bat assembleDebug`, install on device/emulator, then with seeded data (use plan 04/05's flow or a debug seed if one exists): open a class → Class summary shows band counts + coverage; assess one student twice with different scores → their profile shows a 2-point trend line with the benchmark dashed line; tap a session row → lands on per-word results; airplane mode on → everything above still works (offline-first check).

### Level 5: Additional Validation (Optional)

- `agent-browser`/`e2e-test` skills are web-only — not applicable to this Android app. If available, use the `run` skill to launch an emulator and screenshot both screens.

---

## ACCEPTANCE CRITERIA

- [ ] Class summary shows per-band counts, coverage %, and rule-based flag list; unassessed students visible.
- [ ] Student profile shows WCPM+accuracy trend chart with grade benchmark line, miscue breakdown, and session history linking to per-word results.
- [ ] `bandFor` implements Phil-IRI 2018 word-recognition thresholds exactly (≥97 / 90–96 / <90) and is a pure function with passing boundary tests.
- [ ] Flags are deterministic rules only — no ML/prediction anywhere (MVP boundary honored).
- [ ] Zero new Gradle dependencies (chart is hand-drawn Canvas).
- [ ] Works fully offline.
- [ ] All validation commands pass with zero errors; no regressions in existing tests.
- [ ] Code follows plan 01–05 conventions (package root, ViewModel/route/DAO patterns, actual entity field names).

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full test suite passes (unit + integration)
- [ ] No linting or type checking errors
- [ ] Manual testing confirms feature works (both screens, navigation into per-word results, offline)
- [ ] Acceptance criteria all met
- [ ] Code reviewed for quality and maintainability

---

## NOTES

- **Thresholds source**: Phil-IRI 2018 manual (DepEd) — word recognition: Independent 97–100%, Instructional 90–96%, Frustration 89% and below. Verified against the manual PDF and secondary sources 2026-07-18. We band on word recognition only; Phil-IRI's full classification also uses comprehension (80/59/58%), which this app doesn't measure — UI copy must say "Oral Reading (Word Recognition) Level".
- **CRLA note**: CRLA profiles (Full/Moderate/Light Refresher, Grade Ready) are criterion-based on the CRLA instrument itself, not accuracy %, so they cannot be honestly derived from our scoring data. Deferred with the CRLA/Phil-IRI form export item in `index.md`. Do not fake a CRLA mapping.
- **WCPM benchmarks**: Hasbrouck–Tindal 2017 spring 50th percentile (G1 60, G2 100, G3 112) — US English L1 norms, used because no official DepEd/PH WCPM norms exist. Displayed as a labeled context line, never as a pass/fail rule. Swap in PH norms when available (constant lives in one place).
- **No predictive AI**: deliberate MVP boundary per `index.md` deferred list — flags are three transparent rules. This also addresses the research doc's "threat of transparent data" concern: teachers can explain every flag.
- **Chart decision**: hand-drawn Canvas over Vico — 2 static series + 1 reference line doesn't justify a dependency; keeps APK small for low-end tablets. Revisit if interactivity is requested.
- **Trend rule ceiling**: least-squares slope over last 3 sessions is naive (no passage-difficulty normalization — a harder passage looks like decline). Acceptable at MVP; normalize by passage level when passage difficulty metadata proves reliable.

**Confidence Score**: 7/10 — logic and UI are straightforward, but this plan was authored before plans 01–05 landed as code, so exact entity/field/route names are assumptions the executor must reconcile first (the plan front-loads that reconciliation as Task 1).

# Feature: 02-student-roster — Classes & Student Management (Offline, Room)

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

> **Package note:** This plan assumes the base package created by `01-project-foundation` is `com.readily.app`. Before starting, run `Get-ChildItem app/src/main/java -Recurse -Directory | Select-Object -First 5` (or check `app/build.gradle.kts` `namespace`) and substitute the real package everywhere below.

## Feature Description

Local-only management of class sections and student rosters for Grade 1–3 teachers. Teachers create class sections (name, grade level, school year), add students (name, optional LRN, gender), edit both, and soft-delete either. Everything lives in Room; no network. Entities are designed **sync-ready now** (UUID string primary keys, `updatedAt` epoch-millis, `isDeleted` flag) because plan `07-supabase-sync` will push these rows to Supabase Postgres — auto-increment int keys would collide across devices and force a painful migration, and hard deletes can't be propagated as tombstones. Paying the tiny cost up front avoids a schema rewrite in plan 07.

## User Story

As a Grade 1–3 public-school teacher
I want to create my class sections and enroll my students on the tablet, even fully offline
So that I can select a student when running a reading assessment (plan 04) and keep per-student records

## Problem Statement

The assessment flow (plan 04) needs a student to attach results to. There is currently no way to represent classes or students in the app. Teachers work in schools with little/no connectivity, so roster management must be 100% local, and the data model must not need rework when cloud sync arrives.

## Solution Statement

Two Room entities (`ClassSectionEntity`, `StudentEntity`) with a FK relation, DAOs exposing `Flow` queries filtered on `isDeleted = 0`, one repository per aggregate is overkill — a single `RosterRepository` wrapping both DAOs, Hilt-provided. Four Compose screens (class list, class detail, add/edit class dialog/screen, add/edit student screen) driven by ViewModels using `stateIn`/`collectAsStateWithLifecycle`. Soft delete = set `isDeleted = true` + bump `updatedAt`. Stretch: CSV import of a student list.

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: Medium
**Primary Systems Affected**: Room database, Hilt DI graph, Compose navigation graph
**Dependencies**: None new — Room, Hilt, Compose Navigation, `lifecycle-runtime-compose` all arrive in plan 01. `java.util.UUID` is JDK stdlib.

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

(Created by plan 01 — exact paths may differ; find them first with Glob.)

- `app/src/main/java/**/data/db/*Database.kt` — Why: the `@Database` class you must register new entities in and bump the version of (pre-release: version 1 + `fallbackToDestructiveMigration` is fine, no migration needed).
- `app/src/main/java/**/di/*Module.kt` (database/DI module) — Why: pattern for providing DAOs/repositories via Hilt; mirror it.
- `app/src/main/java/**/navigation/*.kt` — Why: route definitions and NavHost to extend with roster destinations.
- `app/build.gradle.kts` — Why: confirm `namespace`, KSP + Room + Hilt plugin setup; confirm `lifecycle-runtime-compose` is present (add if not).
- `.agents/plans/index.md` — Why: locked constraints (offline-first, RA 10173, no raw PII beyond need).

### New Files to Create

(Under the real base package; `data/roster/` and `ui/roster/` keep it to two directories.)

- `data/roster/ClassSectionEntity.kt` — Room entity
- `data/roster/StudentEntity.kt` — Room entity (FK to class)
- `data/roster/RosterDao.kt` — one DAO file, both entities' queries (they're one aggregate)
- `data/roster/ClassWithStudents.kt` — `@Relation` POJO for class detail
- `data/roster/RosterRepository.kt` — thin wrapper over DAO, `@Inject constructor`
- `ui/roster/ClassListViewModel.kt`, `ui/roster/ClassListScreen.kt`
- `ui/roster/ClassDetailViewModel.kt`, `ui/roster/ClassDetailScreen.kt`
- `ui/roster/EditClassScreen.kt` (+ its ViewModel, or fold into ClassListViewModel if plan-01 conventions favor it)
- `ui/roster/EditStudentViewModel.kt`, `ui/roster/EditStudentScreen.kt`
- `app/src/test/java/**/data/roster/RosterDaoTest.kt` — Robolectric/instrumented DAO test (match plan-01 test harness; if plan 01 set up androidTest with an in-memory DB, put it there instead)
- `app/src/test/java/**/ui/roster/ClassListViewModelTest.kt`

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [Room: Define data using entities](https://developer.android.com/training/data-storage/room/defining-data#primary-key)
  - Specific section: Primary key / `@PrimaryKey` on a String column
  - Why: UUID keys are just `@PrimaryKey val id: String` — **no TypeConverter needed if you store the UUID as String directly** (generate with `UUID.randomUUID().toString()` as the property default). Skip converters entirely.
- [Room: Referencing complex data](https://developer.android.com/training/data-storage/room/referencing-data) — only needed if you later store real `UUID` objects; we don't.
- [Room: Define relationships / @Relation](https://developer.android.com/training/data-storage/room/relationships/one-to-many)
  - Specific section: One-to-many with `@Embedded` + `@Relation`
  - Why: `ClassWithStudents` for the class-detail screen. Gotcha: `@Relation` cannot filter children (`isDeleted`) — filter in the mapper or use a plain second query (we use a second query; simpler).
- [Room: Write async DAO queries — Flow](https://developer.android.com/training/data-storage/room/async-queries#observable)
  - Why: `Flow<List<T>>` return types re-emit on table change; this is the whole reactive layer.
- [Consuming flows safely in Jetpack Compose (Manuel Vivo, Android Developers)](https://medium.com/androiddevelopers/consuming-flows-safely-in-jetpack-compose-cde014d0d5a3)
  - Why: use `collectAsStateWithLifecycle()` (backed by `repeatOnLifecycle`), never `collectAsState()`, so Room queries stop when the app is backgrounded.
- [StateFlow: stateIn](https://developer.android.com/kotlin/flow/stateflow-and-sharedflow#stateflow)
  - Why: ViewModels expose `dao flow -> stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), initial)`.
- [NPC / RA 10173 Data Privacy Act primer](https://privacy.gov.ph/data-privacy-act/)
  - Why: children's data. See NOTES — we store only name, optional LRN, gender, grade; no birthdate, address, photo, or contact info.

### Patterns to Follow

Plan 01 establishes the concrete conventions — mirror whatever it produced. Expected shape:

**Entity:**

```kotlin
@Entity(tableName = "class_sections")
data class ClassSectionEntity(
    @PrimaryKey val id: String = UUID.randomUUID().toString(),
    val name: String,
    val gradeLevel: Int,          // 1..3, enforced in ViewModel validation
    val schoolYear: String,       // e.g. "2026-2027"
    val updatedAt: Long = System.currentTimeMillis(),
    val isDeleted: Boolean = false,
)
```

**DAO Flow query (always excludes soft-deleted):**

```kotlin
@Query("SELECT * FROM class_sections WHERE isDeleted = 0 ORDER BY name")
fun observeClasses(): Flow<List<ClassSectionEntity>>
```

**Soft delete (never `@Delete`):**

```kotlin
@Query("UPDATE students SET isDeleted = 1, updatedAt = :now WHERE id = :id")
suspend fun softDeleteStudent(id: String, now: Long = System.currentTimeMillis())
```

**ViewModel state:** single `data class UiState`, exposed as `StateFlow` via `stateIn(...WhileSubscribed(5_000)...)`; events as plain ViewModel functions. **Screen:** `collectAsStateWithLifecycle()`, stateless content composable + route composable, matching plan-01 screens.

**Naming:** `*Entity`, `*Dao`, `*Repository`, `*ViewModel`, `*Screen` — match plan-01 casing exactly.

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation (data layer)

Entities, relation POJO, DAO, database registration, Hilt wiring.

**Tasks:**

- Create `ClassSectionEntity`, `StudentEntity` (FK + index on `classSectionId`)
- Create `RosterDao` with Flow queries, upserts, soft-delete updates
- Register entities in `@Database`, provide DAO in the Hilt DB module

### Phase 2: Core Implementation (repository + ViewModels)

**Tasks:**

- `RosterRepository` delegating to the DAO (thin; no interface — one implementation)
- `ClassListViewModel`, `ClassDetailViewModel`, `EditStudentViewModel` (+ edit-class state) with input validation (non-blank name, grade in 1..3, LRN 12 digits if provided)

### Phase 3: Integration (UI + navigation)

**Tasks:**

- Compose screens: class list (FAB add, tap → detail, swipe/menu delete), class detail (student list + add student), add/edit class, add/edit student
- Add roster routes to the plan-01 NavHost; make class list the start destination if plan 01 left a placeholder home

### Phase 4: Testing & Validation

**Tasks:**

- DAO tests on an in-memory Room DB (insert, observe excludes soft-deleted, FK cascade behavior)
- ViewModel unit tests (validation, save, delete) with a fake repository or in-memory DAO
- Full build + lint + tests

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable. All commands run from repo root, non-interactive.

### CREATE data/roster/ClassSectionEntity.kt

- **IMPLEMENT**: Entity as shown in Patterns above. Table `class_sections`.
- **PATTERN**: Any entity from plan 01 (e.g. `app/src/main/java/**/data/**/*Entity.kt`) — match annotation style.
- **IMPORTS**: `androidx.room.Entity`, `androidx.room.PrimaryKey`, `java.util.UUID`
- **GOTCHA**: Store UUID as `String`, not `java.util.UUID` — avoids TypeConverters entirely.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE data/roster/StudentEntity.kt

- **IMPLEMENT**: Table `students`: `id: String` (UUID default), `classSectionId: String`, `fullName: String`, `lrn: String?` (nullable — many G1 teachers won't have it at enrollment), `gender: String` ("M"/"F"; a two-value enum class is not worth it, keep String with ViewModel validation), `updatedAt: Long`, `isDeleted: Boolean = false`. `@Entity(foreignKeys = [ForeignKey(entity = ClassSectionEntity::class, parentColumns = ["id"], childColumns = ["classSectionId"], onDelete = ForeignKey.NO_ACTION)], indices = [Index("classSectionId")])`.
- **PATTERN**: `ClassSectionEntity.kt` (previous task)
- **IMPORTS**: `androidx.room.ForeignKey`, `androidx.room.Index`
- **GOTCHA**: Use `NO_ACTION`/no cascade — classes are soft-deleted, so FK delete cascades never fire; a CASCADE would mask bugs. Room warns without the `Index` on the FK column — include it.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE data/roster/RosterDao.kt (+ ClassWithStudents.kt)

- **IMPLEMENT**: `@Dao interface RosterDao` with:
  - `observeClasses(): Flow<List<ClassSectionEntity>>` (`isDeleted = 0 ORDER BY name`)
  - `observeClass(id: String): Flow<ClassSectionEntity?>`
  - `observeStudents(classSectionId: String): Flow<List<StudentEntity>>` (`isDeleted = 0 ORDER BY fullName`)
  - `getStudent(id: String): StudentEntity?` (suspend, for edit-screen prefill)
  - `@Upsert suspend fun upsertClass(c: ClassSectionEntity)` / `upsertStudent(s: StudentEntity)`
  - `softDeleteClass(id, now)` and `softDeleteStudent(id, now)` as `@Query UPDATE` per Patterns; `softDeleteClass` should also soft-delete its students in the same transaction (`@Transaction` default method calling both UPDATEs, students via `WHERE classSectionId = :id`).
  - Skip `ClassWithStudents`/`@Relation` unless the detail screen actually needs a joined object — two separate Flows (`observeClass` + `observeStudents`) `combine`d in the ViewModel is simpler and lets each list filter `isDeleted` in SQL. **Do that; don't create ClassWithStudents.kt.** (`@Relation` can't filter deleted children — documented gotcha.)
- **PATTERN**: plan-01 DAO file
- **IMPORTS**: `androidx.room.*`, `kotlinx.coroutines.flow.Flow`
- **GOTCHA**: `@Upsert` needs Room 2.5+; plan 01 pins a current version, fine. Don't wrap Flow queries in `suspend`.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain` (KSP validates SQL at compile time)

### UPDATE the @Database class + Hilt DB module

- **IMPLEMENT**: Add both entities to `entities = [...]`; add `abstract fun rosterDao(): RosterDao`; `@Provides fun provideRosterDao(db: AppDatabase) = db.rosterDao()` in the existing module. Pre-release, keep `version = 1` if this is the first real entity set, else bump version and rely on plan-01's destructive-migration fallback.
- **PATTERN**: existing database + DI module from plan 01
- **GOTCHA**: If plan 01 shipped zero entities, Room may have an empty-entities placeholder — remove it.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE data/roster/RosterRepository.kt

- **IMPLEMENT**: `class RosterRepository @Inject constructor(private val dao: RosterDao)` — one-line delegations. No interface (single implementation; add one only when sync in plan 07 needs a seam — it won't, sync will call the same DAO).
- **PATTERN**: plan-01 repository if one exists; else this file sets the convention.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE ui/roster/ClassListViewModel.kt + ClassListScreen.kt

- **IMPLEMENT**: VM: `val classes: StateFlow<List<ClassSectionEntity>> = repo.observeClasses().stateIn(viewModelScope, WhileSubscribed(5_000), emptyList())`; `fun saveClass(name, grade, schoolYear)` with validation (name non-blank, grade in 1..3), `fun deleteClass(id)`. Screen: `LazyColumn` of class cards (name, grade, SY, student count optional — skip count, needs a join, add later if teachers ask), FAB → add-class, item tap → detail route, item overflow menu → Edit / Delete with a plain `AlertDialog` confirm ("Students in this class will also be removed").
- **PATTERN**: plan-01 sample screen/ViewModel — match Scaffold/TopAppBar usage.
- **IMPORTS**: `androidx.lifecycle.compose.collectAsStateWithLifecycle`, `androidx.hilt.navigation.compose.hiltViewModel`
- **GOTCHA**: `collectAsStateWithLifecycle` requires `lifecycle-runtime-compose` — verify in `app/build.gradle.kts`, add via version catalog if missing.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE ui/roster/EditClassScreen.kt (add/edit class)

- **IMPLEMENT**: Simple form: name `OutlinedTextField`, grade level as three `FilterChip`s (1/2/3 — chips beat a dropdown for 3 fixed values), school year text field defaulting to current SY computed from the date (June cutoff: month >= 6 → "YYYY-(YYYY+1)"). Save calls `upsertClass` (same path for add and edit — pass optional `classId` nav arg, prefill via `observeClass`). Reuse `ClassListViewModel` or a tiny `EditClassViewModel` — follow plan-01 granularity; default to a separate small VM.
- **GOTCHA**: On edit, always set `updatedAt = System.currentTimeMillis()` in the copy before upsert — sync (plan 07) depends on it.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE ui/roster/ClassDetailViewModel.kt + ClassDetailScreen.kt

- **IMPLEMENT**: VM takes `classSectionId` from `SavedStateHandle`; `combine(repo.observeClass(id), repo.observeStudents(id)) { c, s -> UiState(c, s) }.stateIn(...)`. Screen: class name/grade in TopAppBar, `LazyColumn` of students (name, LRN if present, gender), FAB → add student, item tap → edit student, overflow → delete with confirm dialog. Empty state: "No students yet" + hint.
- **PATTERN**: nav-arg-via-SavedStateHandle pattern from plan-01 detail screen if one exists.
- **GOTCHA**: `observeClass` emits `null` after soft delete — pop back stack when class becomes null.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### CREATE ui/roster/EditStudentViewModel.kt + EditStudentScreen.kt

- **IMPLEMENT**: Form: full name (required), LRN (optional; if non-blank must be exactly 12 digits — DepEd LRN format; validate with `lrn.length == 12 && lrn.all(Char::isDigit)`), gender as two `FilterChip`s (M/F). Add and edit share the screen via optional `studentId` nav arg; prefill with `getStudent`. Save → `upsertStudent` with fresh `updatedAt`, then navigate back.
- **GOTCHA**: LRN is the student's national learner ID — it IS PII under RA 10173; keep it optional and never log it. Use `KeyboardType.Number` for the LRN field.
- **VALIDATE**: `.\gradlew.bat :app:compileDebugKotlin --console=plain`

### UPDATE navigation graph

- **IMPLEMENT**: Add routes: `classList` (start destination if home is still a placeholder), `classDetail/{classSectionId}`, `editClass?classId={classId}`, `editStudent/{classSectionId}?studentId={studentId}`. Use whatever route style plan 01 chose (string routes vs type-safe `@Serializable` routes) — **match it exactly**.
- **PATTERN**: plan-01 NavHost file
- **VALIDATE**: `.\gradlew.bat :app:assembleDebug --console=plain`

### CREATE DAO test (RosterDaoTest.kt)

- **IMPLEMENT**: In-memory DB (`Room.inMemoryDatabaseBuilder`); tests: (1) upsert class then `observeClasses().first()` contains it; (2) soft-deleted class/student excluded from observe queries; (3) `softDeleteClass` also soft-deletes its students; (4) upsert with same id updates instead of duplicating. Put it wherever plan 01 runs Room tests (Robolectric in `test/` or `androidTest/` — copy the existing harness).
- **PATTERN**: plan-01 test setup (runner, Robolectric config)
- **GOTCHA**: `Flow.first()` needs `kotlinx-coroutines-test` `runTest`; already present from plan 01.
- **VALIDATE**: `.\gradlew.bat :app:testDebugUnitTest --tests "*RosterDaoTest*" --console=plain` (or `connectedDebugAndroidTest` if instrumented — prefer Robolectric so CI needs no device)

### CREATE ViewModel test (ClassListViewModelTest.kt)

- **IMPLEMENT**: Use in-memory DAO + real repository (no mocks needed): saveClass with blank name is rejected; valid save appears in `classes`; deleteClass removes it from the flow. Set `Dispatchers.setMain` per plan-01 test convention.
- **VALIDATE**: `.\gradlew.bat :app:testDebugUnitTest --tests "*ClassListViewModelTest*" --console=plain`

### STRETCH (optional): CSV import of student list

- **IMPLEMENT**: Only if core tasks are done and green. `ActivityResultContracts.OpenDocument` (`text/*` + `text/comma-separated-values`), read via `contentResolver.openInputStream`, parse with `readLines().map { it.split(',') }` — **no CSV library**; teacher lists are `name` or `name,lrn,gender` rows, header row skipped if first cell isn't a name-looking value (contains "name" case-insensitive). Show a preview list with a Confirm button before inserting; invalid rows shown skipped with count. Insert via `upsertStudent` loop in one `@Transaction`.
- **GOTCHA**: Excel-exported CSVs may be UTF-8 with BOM — strip `﻿` from the first line. Quoted commas in names are rare in PH class lists; note in UI "commas in names not supported" rather than writing an RFC 4180 parser. `// ponytail: naive CSV split, swap in a real parser only if teachers report broken imports`
- **VALIDATE**: `.\gradlew.bat :app:assembleDebug --console=plain`

---

## TESTING STRATEGY

Match the harness plan 01 created (JUnit4 + Robolectric expected). No new test frameworks.

### Unit Tests

- DAO: in-memory Room, cover soft-delete filtering and the class→students cascade soft delete (the only non-trivial SQL).
- ViewModels: real repository over in-memory DAO (cheaper and more honest than mocks); validation rules (blank name, grade bounds, LRN format).

### Integration Tests

None beyond DAO-through-repository — there is no network or service layer to integrate. Compose UI tests are deferred; the e2e-test skill covers journeys once the app is runnable end to end.

### Edge Cases

- Soft-deleted class: students hidden, detail screen pops back, class absent from list but row still in DB (verify with a raw query in the DAO test).
- Re-adding a student with the same name: allowed (names collide in real classes; UUID id disambiguates).
- LRN: blank OK; 11 or 13 digits rejected; non-digits rejected.
- School year string free-form but defaulted; don't over-validate.
- Rotation/process death: nav args via SavedStateHandle already cover it; form state loss on process death is acceptable for MVP.

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness. All from repo root, PowerShell, non-interactive.

### Level 1: Syntax & Style

```
.\gradlew.bat :app:lintDebug --console=plain
```

### Level 2: Unit Tests

```
.\gradlew.bat :app:testDebugUnitTest --console=plain
```

### Level 3: Integration Tests

```
.\gradlew.bat :app:assembleDebug --console=plain
```

(Full-build compile + Room SQL verification + Hilt graph validation. `connectedDebugAndroidTest` only if plan 01 put DAO tests in androidTest and a device/emulator is attached.)

### Level 4: Manual Validation

Install `app\build\outputs\apk\debug\app-debug.apk` on device/emulator:

1. Create class "Sampaguita", Grade 1, SY default → appears in list.
2. Open it, add student "Juan Dela Cruz", no LRN, M → appears.
3. Edit student, add LRN `123456789012` → persists after app restart (kill process).
4. Delete student → gone from list; delete class → gone, back at list.
5. Airplane mode on for all of the above — behavior identical (no network code exists; this is a sanity check).

### Level 5: Additional Validation (Optional)

`agent-browser`/`e2e-test` skills are web-only — not applicable to a native Android app. Skip.

---

## ACCEPTANCE CRITERIA

- [ ] Teacher can create/edit/soft-delete classes (name, grade 1–3, school year) and students (name, optional 12-digit LRN, gender)
- [ ] All list screens update reactively (Room Flow → StateFlow → collectAsStateWithLifecycle)
- [ ] Soft-deleted rows stay in the DB with `isDeleted = 1` and fresh `updatedAt`; never appear in UI
- [ ] Deleting a class soft-deletes its students in one transaction
- [ ] All entities have UUID string PKs, `updatedAt`, `isDeleted` (sync-ready for plan 07)
- [ ] All validation commands pass with zero errors
- [ ] Works with zero connectivity (no network permission/code added)
- [ ] No PII beyond name/LRN/gender/grade stored; LRN never logged

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full test suite passes (unit + integration)
- [ ] No linting or type checking errors
- [ ] Manual testing confirms feature works
- [ ] Acceptance criteria all met
- [ ] Code reviewed for quality and maintainability

---

## NOTES

**Why UUID string PKs now:** plan 07 syncs these rows to Supabase Postgres from many teacher devices. Auto-increment ints collide across devices; UUIDs generated client-side don't, and Supabase `uuid` columns accept them directly. Stored as `String` in Room so no TypeConverter is needed ([Room primary key docs](https://developer.android.com/training/data-storage/room/defining-data#primary-key)). If insert-order index locality ever matters, switch generation to UUIDv7 — a one-line change; random v4 via `UUID.randomUUID()` is fine at classroom scale (≤ ~50 students/class).

**Why soft delete:** sync needs tombstones — a hard-deleted row can't tell the server to delete its copy. `isDeleted` + `updatedAt` is the minimal last-write-wins sync contract.

**Why no `@Relation`:** it can't filter soft-deleted children; two SQL-filtered Flows `combine`d in the ViewModel are simpler and correct ([Room relationships docs](https://developer.android.com/training/data-storage/room/relationships/one-to-many)).

**RA 10173 (PH Data Privacy Act) / child data:** students are minors — collect the minimum: full name, optional LRN, gender, class. Deliberately excluded: birthdate, address, guardian contacts, photos. Data is device-local in this plan (no processing beyond the teacher's own device). When plan 07 syncs, LRN + name + scores become personal data of minors in transit/at rest — that plan must cover encryption and lawful-basis notes; this plan's job is only to not over-collect. Never put student names or LRNs in logs or crash reports.

**Deliberately skipped:** repository interface (one impl), UUID TypeConverter (String PK), student count on class cards (needs a join; add on request), Compose UI tests (deferred to e2e pass), CSV RFC-4180 parsing (naive split, marked with a `ponytail:` comment), Paging (a class has ≤ 60 students).

**Sources used for research:** [Room primary keys](https://developer.android.com/training/data-storage/room/defining-data#primary-key), [Room relationships](https://developer.android.com/training/data-storage/room/relationships/one-to-many), [Room Flow queries](https://developer.android.com/training/data-storage/room/async-queries#observable), [Consuming flows safely in Compose](https://medium.com/androiddevelopers/consuming-flows-safely-in-jetpack-compose-cde014d0d5a3), [UUID PKs with Room for cloud sync](https://www.codestudy.net/blog/using-uuid-for-primary-key-using-room-with-android/), [Room built-in UUID converter issue](https://issuetracker.google.com/issues/195413406).

**Confidence Score**: 8/10 — data layer and screens are boilerplate-level Room/Compose; the only uncertainty is plan-01's exact conventions (package name, nav route style, test harness), which the plan instructs the executor to discover and mirror first.

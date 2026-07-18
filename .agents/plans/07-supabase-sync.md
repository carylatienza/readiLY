# Feature: 07-supabase-sync — Teacher Auth + Opportunistic Background Sync

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc. Plans 01–06 established the scaffold (Kotlin, Compose, MVVM, Hilt, Room) with UUID-keyed, `updatedAt`-stamped entities: `ClassSection`, `Student`, `Passage`, `AssessmentSession`, `ScoringResult`. Confirm exact package name and entity field names by reading the actual files before writing any sync code — this plan uses `com.readily.app` as the assumed base package; substitute the real one everywhere.

## Feature Description

Add optional Supabase cloud sync: teachers can create an email/password account, after which their local Room data (classes, students, sessions, scoring results — **JSON only, never audio**) syncs opportunistically to a Postgres backend with row-level security so each teacher sees only their own rows. Sync runs as a periodic WorkManager job when the network is available, plus a manual "Sync now" button. The app remains 100% functional with no account and no connectivity — sync is a strictly additive backup/multi-device feature.

## User Story

As a Grade 1–3 public school teacher
I want my students' assessment results backed up to the cloud when I have signal
So that I don't lose a semester of reading data if my tablet is lost, broken, or reissued — without needing internet during class.

## Problem Statement

All readiLY data currently lives only in Room on a single low-end tablet. Device loss = total data loss. Teachers in PH public schools have intermittent connectivity (school Wi-Fi, occasional mobile data), so any cloud dependency must be opportunistic, never blocking. Student data is Sensitive Personal Information under RA 10173 (academic evaluation of minors), so what syncs and how must be deliberately minimized.

## Solution Statement

- **supabase-kt 3.5.0** (BOM) with `auth-kt` (email/password) and `postgrest-kt` modules, Ktor OkHttp engine. No realtime, no storage module (audio never leaves the device).
- **Postgres schema** mirroring Room entities, checked into `supabase/migrations/0001_initial_sync_schema.sql`, every table carrying `teacher_id uuid references auth.users` with RLS `using/with check ((select auth.uid()) = teacher_id)`.
- **Sync strategy:** offline-first push-then-pull, last-write-wins on `updatedAt`. <!-- ponytail: LWW on updatedAt — loses concurrent edits across devices; upgrade path is per-field merge or a conflict-review UI, deferred until multi-device is a real use case (single teacher, single tablet is the MVP reality). -->
- **PII minimization (decision): student names are NOT synced.** The cloud row stores `initials` (e.g. "J.D.C.") + LRN (the DepEd Learner Reference Number, already a pseudonymous state identifier). Rationale: RA 10173 §3 classifies education records of minors as SPI; syncing full names would require encryption-at-application-level plus stronger consent posture per `docs/research/Legal and Compliance Assessment.md`. Initials+LRN keeps the cloud dataset pseudonymized while remaining joinable to the local roster (full names stay in Room only). This is smaller and legally safer than client-side field encryption (key management on shared tablets is its own project). If the pitch later needs names in a web dashboard, revisit with pgsodium/column encryption.
- **WorkManager**: `PeriodicWorkRequest` (6h, `NetworkType.CONNECTED`) + one-shot expedited request for "Sync now". HiltWorker for DI.
- **Sync status UI**: settings screen shows signed-in email, last-synced timestamp, pending-change count; roster/dashboard untouched.
- **Auth optional**: everything gated behind "is there a Supabase session?"; no session → workers no-op instantly.

Dirty-row tracking: add a nullable `syncedAt: Long?` column to each syncable entity (null or `< updatedAt` = pending push). This avoids a separate outbox table. Deletes: soft-delete flag `deletedAt: Long?` on syncable entities so deletions propagate (hard-delete rows only after a successful push). <!-- ponytail: soft-delete instead of an outbox/tombstone table; if entity count or query complexity grows, move to a dedicated pending_ops table. -->

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: High
**Primary Systems Affected**: Room entities/DAOs (new columns), DI graph (Hilt), new `sync/` and `auth/` packages, Settings UI, Gradle version catalog, new `supabase/` dir at repo root
**Dependencies**: `io.github.jan-tennert.supabase:bom:3.5.0` (`auth-kt`, `postgrest-kt`), `io.ktor:ktor-client-okhttp:3.x` (match supabase-kt's Ktor version), `androidx.work:work-runtime-ktx`, `androidx.hilt:hilt-work` + `androidx.hilt:hilt-compiler`

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

(Plans 01–06 were not yet materialized when this plan was written — locate these by convention; adjust names to reality.)

- `.agents/plans/index.md` — Why: locked stack + hard constraints (NO raw audio to cloud; offline-first non-negotiable; RA 10173).
- `app/build.gradle.kts` and `gradle/libs.versions.toml` — Why: version catalog pattern for adding dependencies; check existing Ktor/serialization versions for conflicts.
- Room entities: `ClassSection`, `Student`, `Passage`, `AssessmentSession`, `ScoringResult` (search `@Entity` under `app/src/main/java/**/data/`) — Why: exact field names/types to mirror in SQL; where to add `syncedAt`/`deletedAt`.
- The Room `@Database` class — Why: bump version + add migration for new columns.
- Existing DAO files — Why: mirror query naming conventions for new `pending`-style queries.
- The Hilt `@Module` providing the database — Why: pattern for providing `SupabaseClient`.
- Existing Settings/navigation screen + ViewModel — Why: where the Auth/Sync UI hangs; mirror ViewModel + StateFlow patterns.
- `docs/research/Legal and Compliance Assessment.md` (lines ~8–30, 145–165) — Why: SPI classification of fluency scores, DICT cloud policy note.

### New Files to Create

- `supabase/migrations/0001_initial_sync_schema.sql` — Postgres schema + RLS policies (checked into repo, applied via Supabase dashboard/CLI).
- `app/src/main/java/com/readily/app/sync/SupabaseModule.kt` — Hilt module providing `SupabaseClient`.
- `app/src/main/java/com/readily/app/sync/SyncRepository.kt` — push-then-pull logic, LWW merge.
- `app/src/main/java/com/readily/app/sync/SyncWorker.kt` — `@HiltWorker` CoroutineWorker.
- `app/src/main/java/com/readily/app/sync/SyncScheduler.kt` — enqueue periodic + one-shot work (small object, could fold into repository if trivial).
- `app/src/main/java/com/readily/app/sync/dto/SyncDtos.kt` — `@Serializable` DTOs for the five entities (student DTO carries initials+LRN, no name).
- `app/src/main/java/com/readily/app/auth/AuthRepository.kt` — sign-up/sign-in/sign-out/session state around supabase auth.
- `app/src/main/java/com/readily/app/auth/AuthViewModel.kt` + `AuthScreen.kt` — email/password form.
- `app/src/main/java/com/readily/app/sync/SyncStatusViewModel.kt` + sync section in Settings screen — last synced, pending count, Sync now button, sign out.
- `app/src/test/java/com/readily/app/sync/SyncRepositoryTest.kt` — LWW merge unit tests.

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [supabase-kt Installing (official Kotlin reference)](https://supabase.com/docs/reference/kotlin/installing)
  - BOM usage, module names (`auth-kt`, `postgrest-kt`), Ktor engine requirement
  - Why: exact dependency coordinates; supabase-kt 3.x requires Ktor 3.x; min SDK 26 (else desugaring)
- [supabase-kt GitHub README](https://github.com/supabase-community/supabase-kt/blob/master/README.md) and [Releases](https://github.com/supabase-community/supabase-kt/releases)
  - Why: confirm current version at implementation time (3.5.0 as of April 2026); `gotrue-kt` was renamed `auth-kt` in 3.0.0 — do not use old module names from pre-2024 tutorials
- [Use Supabase with Android Kotlin quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/kotlin)
  - Why: `createSupabaseClient { install(Auth); install(Postgrest) }` setup shape
- [Row Level Security | Supabase Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
  - Sections: "Policies", "Helper functions — auth.uid()", "RLS performance recommendations"
  - Why: per-teacher policy shape; wrap `auth.uid()` in `(select auth.uid())` for per-statement caching; index `teacher_id`; use `TO authenticated`
- [WorkManager: PeriodicWorkRequest + constraints](https://developer.android.com/develop/background-work/background-tasks/persistent/getting-started/define-work#schedule_periodic_work)
  - Why: periodic work with `NetworkType.CONNECTED`, `ExistingPeriodicWorkPolicy.KEEP`
- [Hilt + WorkManager integration](https://developer.android.com/training/dependency-injection/hilt-jetpack#workmanager)
  - Why: `@HiltWorker`, `HiltWorkerFactory`, disabling default WorkManager initializer in the manifest — the classic gotcha

### Patterns to Follow

**Entities:** UUID string primary keys, `updatedAt: Long` epoch-millis stamped on every write (established plans 01–06). Sync relies on this — every repository write path MUST already refresh `updatedAt`; verify before trusting LWW.

**DI:** constructor-injected repositories, `@Module @InstallIn(SingletonComponent::class)` providers — mirror the database module.

**UI:** ViewModel exposes `StateFlow<UiState>`, Compose screen collects with `collectAsStateWithLifecycle` — mirror the dashboard screens from plan 06.

**Serialization:** kotlinx.serialization `@Serializable` DTOs with `@SerialName("snake_case")` for Postgres column names. Keep DTOs separate from Room entities (Room entities carry local-only fields like full name).

**Hard rules (index.md):** no audio bytes, file paths, or storage-bucket code anywhere in this feature; app must never block on network.

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation

Dependencies, Supabase schema, Room column additions.

**Tasks:**
- Add supabase-kt BOM, auth-kt, postgrest-kt, ktor-client-okhttp, work-runtime-ktx, hilt-work to version catalog + app module
- Write and check in the SQL migration with RLS
- Add `syncedAt`/`deletedAt` columns + Room migration

### Phase 2: Core Implementation

Auth and sync engine.

**Tasks:**
- SupabaseClient Hilt provider (URL/key from `BuildConfig`, values in `local.properties` — never hardcode)
- AuthRepository (signUpWith(Email), signInWith(Email), signOut, sessionStatus flow)
- SyncRepository: push dirty rows per entity (upsert), pull rows `updated_at > lastPullCursor`, LWW merge into Room
- SyncWorker + scheduling

### Phase 3: Integration

**Tasks:**
- Auth screen + nav route (reachable from Settings only; never a launch gate)
- Sync status section in Settings; "Sync now"; sign-out clears session + cancels periodic work
- Schedule periodic sync on successful sign-in / app start when session exists

### Phase 4: Testing & Validation

**Tasks:**
- Unit tests: LWW merge (local newer, remote newer, equal, remote soft-delete), DTO mapping (assert Student DTO has no `name` field)
- WorkManager test with `WorkManagerTestInitHelper` (worker no-ops without session)
- Manual: sign up, seed data, sync, verify rows in Supabase dashboard, verify second teacher account sees zero rows (RLS)

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### UPDATE gradle/libs.versions.toml + app/build.gradle.kts

- **IMPLEMENT**: Add versions/libs: `supabase-bom = "3.5.0"` (verify latest on the releases page first), `ktor = "3.x"` (match supabase-kt's Ktor), `work = "2.10.x"`, `hilt-work = "1.2.x"`. In app module: `implementation(platform(libs.supabase.bom))`, `implementation("io.github.jan-tennert.supabase:auth-kt")`, `implementation("io.github.jan-tennert.supabase:postgrest-kt")`, `implementation(libs.ktor.client.okhttp)`, work + hilt-work + `ksp(libs.androidx.hilt.compiler)`. Add `buildConfigField` for `SUPABASE_URL` / `SUPABASE_ANON_KEY` read from `local.properties` (empty-string defaults so CI builds without secrets); add the two keys to `local.properties` and confirm it is gitignored.
- **PATTERN**: existing version-catalog entries in `gradle/libs.versions.toml`
- **GOTCHA**: module is `auth-kt`, not `gotrue-kt` (renamed in 3.0.0). Min SDK must be ≥26 or enable core library desugaring. Kotlinx-serialization plugin must already be applied (Room plans may have it; add if not).
- **VALIDATE**: `gradlew.bat :app:dependencies --configuration releaseRuntimeClasspath | findstr supabase`

### CREATE supabase/migrations/0001_initial_sync_schema.sql

- **IMPLEMENT**: Five tables mirroring the Room entities, snake_case, `id uuid primary key`, `teacher_id uuid not null default auth.uid() references auth.users(id) on delete cascade`, `updated_at bigint not null`, `deleted_at bigint`. `students` table: `initials text not null`, `lrn text`, **no name column**. `scoring_results`: JSON metrics column `jsonb`. Enable RLS on every table; per table create four policies `TO authenticated`: select/insert/update/delete all `using ((select auth.uid()) = teacher_id)` (insert uses `with check`). Add `create index ... on <table>(teacher_id);` and an index on `(teacher_id, updated_at)` for pull queries.
- **PATTERN**: [RLS docs — policies + performance](https://supabase.com/docs/guides/database/postgres/row-level-security)
- **GOTCHA**: wrap `auth.uid()` in `select` for per-statement caching; without `TO authenticated` policies also evaluate for anon. `updated_at` as epoch-millis `bigint` (matches Room `Long`) — do NOT use `timestamptz`, avoids TZ/precision drift in LWW comparisons.
- **VALIDATE**: `docker run --rm -v "%CD%\supabase\migrations:/sql" postgres:16 bash -c "psql --set ON_ERROR_STOP=1 -f /sql/0001_initial_sync_schema.sql --echo-errors -d postgres -U postgres -h localhost || true"` — if no Docker locally, validate by applying in the Supabase SQL editor and note that in the PR; at minimum: `gradlew.bat help` (no-op) + visual SQL review.

### UPDATE Room entities + @Database (add sync columns + migration)

- **IMPLEMENT**: Add `syncedAt: Long? = null` and `deletedAt: Long? = null` to `ClassSection`, `Student`, `Passage`, `AssessmentSession`, `ScoringResult`. Add `initials: String` derivation is NOT stored — compute at DTO-mapping time from the local name. Bump DB version; add `Migration(n, n+1)` with `ALTER TABLE ... ADD COLUMN syncedAt INTEGER` / `deletedAt INTEGER` per table. Update all list queries to filter `WHERE deletedAt IS NULL`; change delete operations to set `deletedAt`/`updatedAt` instead of hard delete (add a purge query: hard-delete rows where `deletedAt IS NOT NULL AND syncedAt >= updatedAt`).
- **PATTERN**: existing entities/DAOs from plans 02–05
- **GOTCHA**: this touches every DAO delete path from earlier plans — grep for `@Delete` and `DELETE FROM` and convert each. Passages are bundled/seeded content: if teachers cannot edit passages, EXCLUDE `Passage` from sync entirely (smaller surface) — decide by reading plan 03's implementation; default to excluding it.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*Migration*"` (write a Room migration test with `MigrationTestHelper`), then `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/sync/SupabaseModule.kt

- **IMPLEMENT**: `@Module @InstallIn(SingletonComponent::class)`; `@Provides @Singleton fun provideSupabase(): SupabaseClient = createSupabaseClient(BuildConfig.SUPABASE_URL, BuildConfig.SUPABASE_ANON_KEY) { install(Auth); install(Postgrest) }`.
- **PATTERN**: existing database Hilt module
- **IMPORTS**: `io.github.jan.supabase.createSupabaseClient`, `io.github.jan.supabase.auth.Auth`, `io.github.jan.supabase.postgrest.Postgrest`
- **GOTCHA**: package is `io.github.jan.supabase.auth` in 3.x (not `.gotrue`). Auth plugin persists sessions on Android automatically (SharedPreferences-backed settings) — no extra code.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/auth/AuthRepository.kt

- **IMPLEMENT**: wraps `supabase.auth`: `suspend fun signUp(email, password)`, `signIn`, `signOut`; `val sessionStatus: Flow<SessionStatus> = supabase.auth.sessionStatus`; `fun currentUserId(): String?`. Map supabase exceptions to a small sealed `AuthResult` (Success / Error(message)) — no retry logic, callers show the message.
- **IMPORTS**: `io.github.jan.supabase.auth.auth`, `io.github.jan.supabase.auth.providers.builtin.Email`, `io.github.jan.supabase.auth.status.SessionStatus`
- **GOTCHA**: `signUpWith(Email)` may require email confirmation depending on Supabase project settings — for MVP, disable "Confirm email" in the Supabase dashboard and note it in the SQL migration file header as a project-setup comment.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/sync/dto/SyncDtos.kt

- **IMPLEMENT**: `@Serializable` DTO per synced entity with `@SerialName` snake_case names matching the SQL migration exactly. `StudentDto(id, class_section_id, initials, lrn, grade_level, updated_at, deleted_at)` — mapper `Student.toDto()` computes `initials` from the local full name (first letter of each whitespace-separated token + "."), and `StudentDto.toEntity(existingLocal: Student?)` preserves the local `name` when merging a pull (remote has no name; if no local row exists, store `initials` as the display name placeholder).
- **PATTERN**: kotlinx.serialization usage from plan 05 (scoring JSON) if present
- **GOTCHA**: audio path fields on `AssessmentSession` MUST NOT appear in any DTO — this is the RA 10173 / index.md hard rule. Add a unit test asserting the serialized JSON of each DTO contains no `audio`/`name` keys.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*DtoTest*"`

### CREATE app/src/main/java/com/readily/app/sync/SyncRepository.kt

- **IMPLEMENT**: single `suspend fun syncAll(): SyncResult`. Per entity (order: ClassSection → Student → AssessmentSession → ScoringResult, FK-safe):
  1. **Push**: query DAO for rows `WHERE syncedAt IS NULL OR updatedAt > syncedAt`; map to DTOs; `supabase.from("table").upsert(dtos)`; on success set `syncedAt = updatedAt` per row; purge pushed soft-deletes.
  2. **Pull**: `supabase.from("table").select { filter { gt("updated_at", lastPullCursor) } }.decodeList<Dto>()`; for each remote row: if no local row → insert; else if `remote.updated_at > local.updatedAt` → overwrite local (preserving local-only fields like student name, audio path) and set `syncedAt`; else keep local (it will push next cycle). Remote `deleted_at != null` → soft-delete locally.
  - Store `lastPullCursor` (max remote updated_at seen) + `lastSyncedAt` wall-clock in the app's existing DataStore/SharedPreferences (reuse whatever plan 01 set up; if none, add Preferences DataStore).
  - Expose `fun pendingCount(): Flow<Int>` (sum of per-DAO pending-count queries).
  - Wrap the whole thing in try/catch returning `SyncResult.Failure(e)` — never throw to UI/worker.
- **GOTCHA**: LWW is deliberate — comment it: `// ponytail: last-write-wins on updatedAt; concurrent multi-device edits lose silently. Upgrade: conflict table + review UI when multi-device ships.` Push before pull so a device's fresh edits aren't clobbered by stale remote rows in the same cycle. `upsert` needs no `onConflict` arg when PK is `id`.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*SyncRepositoryTest*"`

### CREATE app/src/main/java/com/readily/app/sync/SyncWorker.kt + SyncScheduler.kt

- **IMPLEMENT**: `@HiltWorker class SyncWorker @AssistedInject constructor(@Assisted ctx, @Assisted params, private val auth: AuthRepository, private val sync: SyncRepository) : CoroutineWorker`. `doWork()`: no session → `Result.success()` immediately; else `syncAll()`, map Failure → `Result.retry()` (WorkManager backoff). Scheduler object: `schedulePeriodic(ctx)` = `PeriodicWorkRequestBuilder<SyncWorker>(6, HOURS).setConstraints(Constraints(requiredNetworkType = NetworkType.CONNECTED)).build()` enqueued with `enqueueUniquePeriodicWork("sync", ExistingPeriodicWorkPolicy.KEEP, ...)`; `syncNow(ctx)` = unique `OneTimeWorkRequest` with same constraint + `setExpedited(OutOfQuotaPolicy.RUN_AS_NON_EXPEDITED_WORK_REQUEST)`; `cancel(ctx)` on sign-out.
- **PATTERN**: [Hilt WorkManager docs](https://developer.android.com/training/dependency-injection/hilt-jetpack#workmanager)
- **GOTCHA**: must add `Configuration.Provider` to the `@HiltAndroidApp` Application class with `HiltWorkerFactory`, AND remove the default initializer in the manifest (`<provider android:name="androidx.startup.InitializationProvider" ...><meta-data android:name="androidx.work.WorkManagerInitializer" tools:node="remove"/></provider>`) — skipping this crashes at first enqueue with "WorkManager is not initialized".
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin` then `gradlew.bat :app:testDebugUnitTest --tests "*SyncWorkerTest*"`

### UPDATE Application class + AndroidManifest.xml

- **IMPLEMENT**: as per GOTCHA above; also call `SyncScheduler.schedulePeriodic(this)` from `Application.onCreate()` only when `auth.currentUserId() != null` (cheap check; periodic work is KEEP so re-enqueue is idempotent).
- **VALIDATE**: `gradlew.bat :app:assembleDebug`

### CREATE AuthScreen.kt + AuthViewModel.kt, UPDATE navigation + Settings screen

- **IMPLEMENT**: Auth screen: email + password fields, Sign in / Create account buttons, error text, loading state — plain Compose, mirror an existing form screen. Settings gains a "Cloud backup" section: signed-out → "Set up cloud backup" button → Auth screen; signed-in → email, "Last synced: <relative time>", "Pending changes: <n>" (from `pendingCount()`), "Sync now" button (calls `SyncScheduler.syncNow`), "Sign out" (auth.signOut + SyncScheduler.cancel). `SyncStatusViewModel` combines sessionStatus + pendingCount + lastSyncedAt into one `StateFlow<SyncUiState>`.
- **PATTERN**: existing ViewModel/StateFlow/nav-route conventions from plan 06 screens
- **GOTCHA**: never make auth a startup gate — app launches straight to roster regardless of session. Observe WorkManager's `getWorkInfosForUniqueWorkFlow("sync")` if you want a "Syncing…" spinner; otherwise skip it (lastSyncedAt updating is enough feedback).
- **VALIDATE**: `gradlew.bat :app:assembleDebug` and `gradlew.bat :app:lintDebug`

### CREATE app/src/test/java/com/readily/app/sync/SyncRepositoryTest.kt (+ DtoTest, SyncWorkerTest)

- **IMPLEMENT**: pure-JVM tests with fake DAOs + fake Postgrest layer (extract a thin `SyncApi` interface over supabase calls so the repository is testable without network). Cases: local-newer wins, remote-newer wins, remote soft-delete applies, push marks syncedAt, no-session worker returns success without calling syncAll, DTO JSON contains no `name`/`audio` keys.
- **PATTERN**: existing unit tests from plans 02–06 (JUnit + kotlinx-coroutines-test)
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest`

---

## TESTING STRATEGY

### Unit Tests

JVM tests (JUnit, coroutines-test, fakes over the `SyncApi` seam): LWW merge matrix, DTO field-safety (no name, no audio), worker session gating, initials derivation ("Juan Dela Cruz" → "J.D.C.").

### Integration Tests

Room migration test via `MigrationTestHelper` (androidTest). WorkManager scheduling via `WorkManagerTestInitHelper` if instrumentation is already wired in plan 01; otherwise the scheduler is thin enough to leave to manual validation.

### Edge Cases

- Sync invoked with no session → immediate success, zero network calls
- Sync mid-flight when connectivity drops → `Result.retry()`, local data untouched (push sets `syncedAt` only after server confirms)
- Same row edited locally and remotely between syncs → newer `updatedAt` wins, no crash, no duplicate rows
- Student deleted locally, already synced → tombstone pushes, then purges
- Clock skew between devices → accepted LWW hazard; documented, not handled
- Second teacher's account → RLS returns zero rows (manual check)
- Sign out then sign in as a different teacher on the same device → local Room data belongs to teacher A; MVP behavior: warn on sign-in if local DB is non-empty and lastPullCursor belongs to another user id (store owning user id alongside cursor; mismatch → require explicit "keep local data offline-only" vs "clear local data" choice). Keep this to one dialog.

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness. All run from repo root, non-interactive.

### Level 1: Syntax & Style

```
gradlew.bat :app:lintDebug
gradlew.bat :app:compileDebugKotlin
```

### Level 2: Unit Tests

```
gradlew.bat :app:testDebugUnitTest
```

### Level 3: Integration Tests

```
gradlew.bat :app:assembleDebug
gradlew.bat :app:assembleDebugAndroidTest
```

(Run `connectedDebugAndroidTest` only if an emulator/device is attached; do not block on it in CI-less environment.)

### Level 4: Manual Validation

1. Create a Supabase project; run `supabase/migrations/0001_initial_sync_schema.sql` in the SQL editor; disable email confirmation in Auth settings; put URL/anon key in `local.properties`.
2. Install debug build; verify full app flow works with airplane mode on and no account.
3. Sign up as teacher A; add class/students; run an assessment; tap Sync now; verify rows in Supabase Table Editor — confirm `students` has initials+LRN only, no names; confirm no storage buckets exist / no audio anywhere.
4. Sign up as teacher B on another device/emulator; sync; verify zero of teacher A's rows visible (RLS proof).
5. Edit a student on device A, sync; pull on device B (if testing multi-device), confirm LWW.
6. Toggle airplane mode mid-sync; confirm app stays responsive and next sync recovers.

### Level 5: Additional Validation (Optional)

Supabase dashboard → Database → Policies: confirm 4 policies per table, all `TO authenticated`. `EXPLAIN ANALYZE select * from students;` as authenticated user to sanity-check the teacher_id index is used.

---

## ACCEPTANCE CRITERIA

- [ ] App is fully functional with no account and no connectivity (unchanged offline behavior)
- [ ] Teacher can sign up / sign in / sign out with email+password
- [ ] All five (or four, if Passage excluded) entity types push and pull; LWW on updatedAt; soft-deletes propagate
- [ ] No audio bytes/paths and no student full names ever leave the device (unit-test enforced)
- [ ] RLS verified: a second account sees zero rows
- [ ] Periodic sync (network-constrained) + manual Sync now both work
- [ ] Settings shows signed-in email, last synced time, pending count
- [ ] SQL migration checked in under `supabase/migrations/`
- [ ] All validation commands pass with zero errors
- [ ] Room migration test passes; no regressions in existing tests

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full test suite passes (unit + integration)
- [ ] No linting or type checking errors
- [ ] Manual testing confirms feature works (including RLS two-account check)
- [ ] Acceptance criteria all met
- [ ] Code reviewed for quality and maintainability

---

## NOTES

**Deliberate simplifications (ponytail-marked in code):**
- **LWW on updatedAt** instead of CRDT/conflict UI — single-teacher-single-tablet is the real MVP usage; upgrade path: conflict table + review screen when multi-device ships.
- **Soft-delete columns** instead of an outbox/tombstone table.
- **Initials+LRN** instead of client-side name encryption — pseudonymization satisfies RA 10173 minimization better than shipping names encrypted with a key that lives on the same account; revisit with pgsodium column encryption if a name-bearing web dashboard is ever required.
- **Pull cursor is a single global timestamp**, not per-table — one extra pull of already-seen rows is harmless (upsert-idempotent).

**Compliance anchors:** RA 10173 SPI classification of academic evaluations of minors (`docs/research/Legal and Compliance Assessment.md` §1); DICT cloud policy — Supabase acceptable for development, PH data-residency migration is a deferred index.md item before DepEd pilot.

**Version note:** supabase-kt 3.5.0 (Apr 2026) verified via [releases](https://github.com/supabase-community/supabase-kt/releases); re-check at implementation time. Requires Ktor 3.x and minSdk 26+.

**Confidence Score: 7/10** — the sync engine and schema are well-specified, but plans 01–06 code did not exist when this was written, so exact entity fields, package names, and DAO shapes are assumed; the implementer must reconcile the Read-first tasks against reality. Supabase project provisioning (dashboard steps) is inherently manual.

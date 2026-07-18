# Feature: 01-project-foundation

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

## Feature Description

Bootstrap the readiLY Android application from an empty repository: a single-module Gradle project (Kotlin DSL + version catalog) with Jetpack Compose + Material 3, an MVVM package skeleton (`data` / `domain` / `ui`), Hilt dependency injection, Room database with one placeholder entity and an explicit migration strategy, a Compose Navigation skeleton showing an empty Home screen, a unit-test and instrumentation-test harness (JUnit4, MockK, Turbine), ktlint static analysis, and a GitHub Actions CI workflow that builds and runs unit tests on every push/PR. Everything downstream (roster, passages, assessment, ASR, sync) builds on this scaffold.

## User Story

As a readiLY developer
I want a fully configured, CI-verified Android project skeleton with the locked architecture (Compose, MVVM, Hilt, Room, offline-first)
So that every subsequent feature plan can be implemented against consistent, tested foundations without re-litigating tooling decisions.

## Problem Statement

The repository contains only planning docs — no application code, build system, or CI. Plans 02–07 (roster, passages, assessment, ASR, dashboard, sync) all assume a working Compose/Hilt/Room project targeting low-end DepEd tablets (Android 9+ / API 28, 4 GB RAM). Without a scaffold, each plan would have to invent structure, and version drift between plans would compound.

## Solution Statement

Create the smallest complete Android project that satisfies all locked stack decisions: one `:app` module (no premature multi-module split), version catalog pinning 2026-stable versions, KSP (not kapt) for Hilt and Room, Compose compiler bundled with Kotlin 2.x (no separate compiler artifact), Room 2.8.x with `exportSchema = true` and a schema directory committed for future migrations, a single `NavHost` with one Home destination, test harness proving the ViewModel and DAO layers are testable, ktlint via the jlleitschuh Gradle plugin, and a GitHub Actions workflow (`ubuntu-latest`, JDK 17, gradle actions cache) running `build` + `test`.

## Feature Metadata

**Feature Type**: New Capability (project bootstrap)
**Estimated Complexity**: Medium (many moving parts, but all boilerplate-standard)
**Primary Systems Affected**: Entire repository — creates the app module, build system, and CI
**Dependencies**: AGP, Kotlin, KSP, Compose BOM, Hilt, Room, Navigation Compose, JUnit4, MockK, Turbine, kotlinx-coroutines-test, ktlint-gradle

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

This is a greenfield repo — there is no application code. Read these docs for constraints:

- `.agents/plans/index.md` — Why: locked stack decisions, execution order, and the four hard constraints (offline-first, no Seq2Seq ASR, no raw audio to cloud, low-end hardware budget)
- `docs/research/Technical Feasibility Assessment.md` — Why: hardware targets and phasing that justify minSdk 28 and the RAM budget
- `CLAUDE.md` — Why: repo conventions; note the `/init-project` command is for a Python stack and must NOT be run

### New Files to Create

Package root: `com.readily.app`. All paths relative to repo root.

- `settings.gradle.kts` — plugin/dependency repositories, `:app` include
- `build.gradle.kts` — root build file (plugin declarations, `apply false`)
- `gradle.properties` — JVM args, AndroidX flags
- `gradle/libs.versions.toml` — version catalog (single source of truth for versions)
- `gradle/wrapper/gradle-wrapper.properties` (+ wrapper jar/scripts via `gradle wrapper`)
- `gradlew`, `gradlew.bat` — wrapper scripts
- `.gitignore` — Android/Gradle ignores
- `app/build.gradle.kts` — app module config
- `app/proguard-rules.pro` — empty placeholder
- `app/src/main/AndroidManifest.xml` — application entry, MainActivity
- `app/src/main/java/com/readily/app/ReadilyApplication.kt` — `@HiltAndroidApp`
- `app/src/main/java/com/readily/app/MainActivity.kt` — `@AndroidEntryPoint`, `setContent { ReadilyApp() }`
- `app/src/main/java/com/readily/app/ui/theme/Theme.kt` — Material 3 theme (light/dark)
- `app/src/main/java/com/readily/app/ui/navigation/ReadilyNavHost.kt` — NavHost + route definitions
- `app/src/main/java/com/readily/app/ui/home/HomeScreen.kt` — empty Home composable
- `app/src/main/java/com/readily/app/ui/home/HomeViewModel.kt` — `@HiltViewModel`, exposes a `StateFlow`
- `app/src/main/java/com/readily/app/data/local/ReadilyDatabase.kt` — `@Database(version = 1, exportSchema = true)`
- `app/src/main/java/com/readily/app/data/local/entity/AppMetadataEntity.kt` — placeholder entity
- `app/src/main/java/com/readily/app/data/local/dao/AppMetadataDao.kt` — placeholder DAO
- `app/src/main/java/com/readily/app/di/DatabaseModule.kt` — Hilt module providing DB + DAO
- `app/src/main/res/values/strings.xml`, `values/themes.xml` — app name, base theme
- `app/src/test/java/com/readily/app/ui/home/HomeViewModelTest.kt` — unit test (MockK + Turbine)
- `app/src/androidTest/java/com/readily/app/data/local/AppMetadataDaoTest.kt` — in-memory Room instrumentation test
- `.github/workflows/ci.yml` — build + unit test workflow

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

Pinned versions (verified stable as of July 2026):

| Dependency | Version | Notes |
|---|---|---|
| Android Gradle Plugin | **8.13.0** | Deliberately NOT AGP 9.x (see Notes) |
| Gradle wrapper | **8.13** (or the version AGP 8.13 requires per its release notes) | |
| Kotlin | **2.2.20** | Compose compiler bundled since 2.0 |
| KSP | **2.2.20-2.0.x** (latest patch matching Kotlin 2.2.20 prefix) | Prefix MUST equal Kotlin version |
| Compose BOM | **2026.06.00** | `androidx.compose:compose-bom` |
| Hilt | **2.57.1** | KSP-only setup |
| AndroidX Hilt (navigation-compose) | **1.2.0** | `hilt-navigation-compose` |
| Room | **2.8.4** | Deliberately NOT Room 3.0 (see Notes) |
| Navigation Compose | `androidx.navigation:navigation-compose` **2.9.x latest stable** | |
| compileSdk / targetSdk | **36** | minSdk **28** |
| JUnit | 4.13.2 | MockK latest stable, Turbine latest stable, kotlinx-coroutines-test matching Kotlin |
| ktlint-gradle (org.jlleitschuh.gradle.ktlint) | latest stable (13.x) | |

- [AGP release notes](https://developer.android.com/build/releases/gradle-plugin) — Section: version compatibility table (Gradle/SDK/JDK requirements for AGP 8.13). Why: pin matching Gradle wrapper and JDK 17.
- [AGP 8.13 release notes](https://developer.android.com/build/releases/agp-8-13-0-release-notes) — Why: confirms API 36 support and Kotlin 2.x compatibility.
- [Compose BOM mapping](https://developer.android.com/develop/ui/compose/bom/bom-mapping) — Why: verify library versions BOM 2026.06.00 resolves to.
- [Compose setup + compiler plugin](https://developer.android.com/develop/ui/compose/setup-compose-dependencies-and-compiler) — Section: "Compose Compiler Gradle plugin". Why: since Kotlin 2.0 you apply `org.jetbrains.kotlin.plugin.compose` at the Kotlin version — there is NO `kotlinCompilerExtensionVersion` anymore.
- [Compose ↔ Kotlin compatibility map](https://developer.android.com/jetpack/androidx/releases/compose-kotlin) — Why: sanity-check Kotlin 2.2.20 against the BOM.
- [Hilt with Gradle](https://dagger.dev/hilt/gradle-setup.html) — Section: "Using Hilt with KSP". Why: exact plugin + ksp dependency coordinates.
- [Hilt AndroidX releases](https://developer.android.com/jetpack/androidx/releases/hilt) — Section: declaring dependencies. Why: `hilt-navigation-compose` coordinates.
- [Room setup](https://developer.android.com/training/data-storage/room#setup) — Section: Kotlin/KSP setup snippet. Why: KSP arg for schema export (`room.schemaLocation` via the Room Gradle plugin `androidx.room`).
- [Room migrations](https://developer.android.com/training/data-storage/room/migrating-db-versions#export-schemas) — Section: "Export schemas". Why: migration strategy from day one.
- [Room releases](https://developer.android.com/jetpack/androidx/releases/room) — Why: confirm 2.8.4 is latest 2.x stable; Room 3 (`androidx.room3`) is a separate artifact line released 2026-07 — do NOT use yet.
- [Navigation Compose](https://developer.android.com/develop/ui/compose/navigation) — Section: "Get started". Why: NavHost skeleton pattern.
- [Testing Compose/coroutines: Turbine](https://github.com/cashapp/turbine#readme) — Why: Flow assertion pattern for ViewModel test.
- [gradle/actions setup-gradle](https://github.com/gradle/actions/blob/main/docs/setup-gradle.md) — Why: CI caching action.
- [ktlint-gradle](https://github.com/jlleitschuh/ktlint-gradle#configuration) — Why: plugin id `org.jlleitschuh.gradle.ktlint` and `ktlintCheck` task.

### Patterns to Follow

Greenfield — these plans DEFINE the patterns for the rest of the project:

**Naming Conventions:**
- Package root `com.readily.app`; layers as sub-packages: `data.local.{entity,dao}`, `data.repository` (later), `domain` (later plans add use-cases only when logic warrants), `ui.<feature>`, `ui.theme`, `ui.navigation`, `di`.
- Entities end in `Entity`, DAOs in `Dao`, ViewModels in `ViewModel`, screens in `Screen`.
- Version catalog keys: kebab-free lowerCamel in `[libraries]` (e.g. `androidx-room-runtime`), plugins under `[plugins]`.

**Error Handling:** ViewModels expose `StateFlow<UiState>` sealed/immutable data classes; no exceptions cross the ui layer. (Only skeleton needed in this plan.)

**Testing Pattern:** unit tests in `app/src/test` with `MainDispatcherRule` (a `TestWatcher` swapping `Dispatchers.Main` for a `StandardTestDispatcher`), MockK for stubs, Turbine for Flow assertions. DAO tests in `app/src/androidTest` against `Room.inMemoryDatabaseBuilder`.

**Migration Pattern:** `exportSchema = true`, Room Gradle plugin `schemaDirectory("$projectDir/schemas")`, `app/schemas/` committed to git. Never use `fallbackToDestructiveMigration` in release code; every version bump ships a `Migration` object (and later an androidTest `MigrationTestHelper` test).

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation

Gradle skeleton: wrapper, settings, root build, version catalog, gitignore, gradle.properties. Nothing Android-specific compiles yet, but `gradlew.bat help` succeeds.

**Tasks:**
- Generate Gradle wrapper at the version AGP 8.13 requires
- Write version catalog with all pinned versions
- Root `build.gradle.kts` + `settings.gradle.kts` with google()/mavenCentral()

### Phase 2: Core Implementation

The `:app` module: manifest, Application class, MainActivity, theme, Hilt wiring, Room database + placeholder entity/DAO, Hilt module.

**Tasks:**
- `app/build.gradle.kts` with android block (minSdk 28, compile/target 36), Compose, KSP, Hilt, Room plugins
- Application/Activity/theme/Compose entry
- Room DB v1 with schema export; `DatabaseModule` providing singleton DB + DAO

### Phase 3: Integration

Navigation skeleton + Home feature slice proving the full MVVM wiring (Hilt → ViewModel → Compose).

**Tasks:**
- `ReadilyNavHost` with `home` route as start destination
- `HomeScreen` + `HomeViewModel` (`hiltViewModel()` injection)

### Phase 4: Testing & Validation

Test harness, lint, CI.

**Tasks:**
- Unit test for `HomeViewModel` (MockK + Turbine + coroutines-test)
- Instrumentation test for the DAO (in-memory Room)
- ktlint plugin applied; `ktlintCheck` green
- `.github/workflows/ci.yml` running `ktlintCheck build test`

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable.

### CREATE .gitignore

- **IMPLEMENT**: standard Android ignores: `.gradle/`, `build/`, `local.properties`, `.idea/`, `*.iml`, `.kotlin/`, `captures/`, `.cxx/`. Do NOT ignore `app/schemas/`.
- **VALIDATE**: `git check-ignore build` (exits 0 once a build dir would exist; alternatively `git status --short` shows no generated noise after later builds)

### CREATE gradle/libs.versions.toml

- **IMPLEMENT**: `[versions]` block pinning: agp = "8.13.0", kotlin = "2.2.20", ksp = "2.2.20-2.0.x-latest-patch" (resolve exact patch from https://github.com/google/ksp/releases — prefix must be 2.2.20), composeBom = "2026.06.00", hilt = "2.57.1", hiltNavigationCompose = "1.2.0", room = "2.8.4", navigationCompose (latest 2.9.x stable from https://developer.android.com/jetpack/androidx/releases/navigation), coreKtx, lifecycle, activityCompose, junit = "4.13.2", mockk, turbine, coroutinesTest, androidxTestJunit, espresso, ktlintGradle. `[libraries]` for each artifact; `[plugins]` for `com.android.application`, `org.jetbrains.kotlin.android`, `org.jetbrains.kotlin.plugin.compose` (version = kotlin), `com.google.devtools.ksp`, `com.google.dagger.hilt.android`, `androidx.room`, `org.jlleitschuh.gradle.ktlint`.
- **GOTCHA**: `org.jetbrains.kotlin.plugin.compose` MUST use the Kotlin version, not a Compose version — the Compose compiler ships with Kotlin since 2.0. There is no `composeOptions.kotlinCompilerExtensionVersion` anymore.
- **VALIDATE**: (after wrapper exists) `gradlew.bat help --quiet`

### CREATE settings.gradle.kts, build.gradle.kts (root), gradle.properties

- **IMPLEMENT**: settings: `pluginManagement { repositories { google(); mavenCentral(); gradlePluginPortal() } }`, `dependencyResolutionManagement { repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS); repositories { google(); mavenCentral() } }`, `rootProject.name = "readiLY"`, `include(":app")`. Root build: all plugins from catalog with `apply false`. gradle.properties: `org.gradle.jvmargs=-Xmx2g -Dfile.encoding=UTF-8`, `android.useAndroidX=true`, `org.gradle.caching=true`, `org.gradle.configuration-cache=true`.
- **GOTCHA**: configuration cache is safe with AGP 8.13/Hilt/KSP; if a plugin breaks it, drop the flag rather than fighting it in this plan.
- **VALIDATE**: `gradlew.bat projects --quiet` (after next task)

### CREATE gradle wrapper (gradle/wrapper/*, gradlew, gradlew.bat)

- **IMPLEMENT**: run `gradle wrapper --gradle-version <version required by AGP 8.13>` if a local Gradle exists; otherwise copy `gradle-wrapper.properties` pointing at `https://services.gradle.org/distributions/gradle-<ver>-bin.zip` plus wrapper jar/scripts from any recent Android project or the Gradle distribution. JDK 17 required — verify `java -version` locally.
- **GOTCHA**: check the AGP↔Gradle compatibility table in the AGP release notes before pinning the wrapper version.
- **VALIDATE**: `gradlew.bat --version`

### CREATE app/build.gradle.kts + app/proguard-rules.pro

- **IMPLEMENT**: apply plugins (alias from catalog): android application, kotlin.android, kotlin compose plugin, ksp, hilt, room, ktlint. `android { namespace = "com.readily.app"; compileSdk = 36; defaultConfig { applicationId = "com.readily.app"; minSdk = 28; targetSdk = 36; versionCode = 1; versionName = "0.1.0"; testInstrumentationRunner = "com.readily.app.HiltTestRunner" (or default `androidx.test.runner.AndroidJUnitRunner` — default is fine for this plan since the DAO test doesn't need Hilt) }; buildFeatures { compose = true }; compileOptions → Java 17; kotlin { jvmToolchain(17) } }`. `room { schemaDirectory("$projectDir/schemas") }`. Dependencies: compose BOM (`implementation(platform(...))` AND `androidTestImplementation(platform(...))`), ui/material3/tooling-preview, `debugImplementation` ui-tooling + ui-test-manifest, activity-compose, lifecycle-viewmodel-compose + lifecycle-runtime-compose, navigation-compose, hilt-android + `ksp(hilt-android-compiler)`, hilt-navigation-compose, room-runtime + room-ktx + `ksp(room-compiler)`, testImplementation: junit, mockk, turbine, kotlinx-coroutines-test; androidTestImplementation: androidx.test.ext:junit, espresso-core, room-testing.
- **GOTCHA**: use `ksp(...)` NOT `kapt(...)` for both Hilt and Room — kapt is legacy and slower. Use the default AndroidJUnitRunner; add a Hilt test runner only when a test actually needs Hilt (plan 02+).
- **VALIDATE**: `gradlew.bat :app:dependencies --configuration debugCompileClasspath --quiet | findstr compose-bom`

### CREATE app/src/main/AndroidManifest.xml + res (strings.xml, themes.xml)

- **IMPLEMENT**: manifest with `<application android:name=".ReadilyApplication" android:label="@string/app_name" android:theme="@style/Theme.Readily" ...>` and MainActivity as launcher with `android:exported="true"`. `themes.xml`: `Theme.Readily` parent `android:Theme.Material.Light.NoActionBar` (Compose draws everything; no need for Material Components XML theme dependency).
- **GOTCHA**: no `package=` attribute in the manifest — namespace lives in build.gradle.kts with AGP 8+.
- **VALIDATE**: `gradlew.bat :app:processDebugMainManifest`

### CREATE ReadilyApplication.kt, MainActivity.kt, ui/theme/Theme.kt

- **IMPLEMENT**: `@HiltAndroidApp class ReadilyApplication : Application()`. `@AndroidEntryPoint class MainActivity : ComponentActivity()` with `setContent { ReadilyTheme { ReadilyNavHost() } }`. Theme.kt: `ReadilyTheme` composable using `lightColorScheme()`/`darkColorScheme()` and `MaterialTheme` — default Material 3 colors, no custom palette yet.
- **GOTCHA**: extend `ComponentActivity`, not `AppCompatActivity` — no appcompat dependency needed.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE data/local/entity/AppMetadataEntity.kt + data/local/dao/AppMetadataDao.kt

- **IMPLEMENT**: `@Entity(tableName = "app_metadata") data class AppMetadataEntity(@PrimaryKey val key: String, val value: String)`. DAO: `@Dao interface AppMetadataDao { @Query("SELECT * FROM app_metadata WHERE key = :key") suspend fun get(key: String): AppMetadataEntity?; @Upsert suspend fun put(entity: AppMetadataEntity); @Query("SELECT * FROM app_metadata") fun observeAll(): Flow<List<AppMetadataEntity>> }`.
- **GOTCHA**: this entity is a genuine keeper (schema version markers, seed flags), not throwaway scaffolding — later plans add real entities beside it and bump the DB version with migrations.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE data/local/ReadilyDatabase.kt

- **IMPLEMENT**: `@Database(entities = [AppMetadataEntity::class], version = 1, exportSchema = true) abstract class ReadilyDatabase : RoomDatabase() { abstract fun appMetadataDao(): AppMetadataDao; companion object { const val NAME = "readily.db" } }`. Add a `// Migration strategy:` comment block: every schema change bumps `version`, adds a `Migration(n, n+1)` registered in DatabaseModule, and commits the new JSON under app/schemas/.
- **VALIDATE**: `gradlew.bat :app:kspDebugKotlin` then confirm `app/schemas/com.readily.app.data.local.ReadilyDatabase/1.json` exists: `dir app\schemas /s /b`

### CREATE di/DatabaseModule.kt

- **IMPLEMENT**: `@Module @InstallIn(SingletonComponent::class) object DatabaseModule` with `@Provides @Singleton fun provideDatabase(@ApplicationContext context: Context): ReadilyDatabase = Room.databaseBuilder(context, ReadilyDatabase::class.java, ReadilyDatabase.NAME).build()` and `@Provides fun provideAppMetadataDao(db: ReadilyDatabase): AppMetadataDao = db.appMetadataDao()`.
- **GOTCHA**: no `fallbackToDestructiveMigration()` — ever. Missing-migration crashes in dev are the feature.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/home/HomeViewModel.kt + ui/home/HomeScreen.kt

- **IMPLEMENT**: `@HiltViewModel class HomeViewModel @Inject constructor(private val appMetadataDao: AppMetadataDao) : ViewModel()` exposing `val uiState: StateFlow<HomeUiState>` built with `appMetadataDao.observeAll().map { HomeUiState(ready = true) }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), HomeUiState())`; `data class HomeUiState(val ready: Boolean = false)`. `HomeScreen(viewModel: HomeViewModel = hiltViewModel())` collects with `collectAsStateWithLifecycle()` and shows a centered `Text("readiLY")`.
- **PATTERN**: this ViewModel→StateFlow→collectAsStateWithLifecycle shape is THE pattern for all later screens.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE ui/navigation/ReadilyNavHost.kt

- **IMPLEMENT**: `object Routes { const val HOME = "home" }`; `@Composable fun ReadilyNavHost(navController: NavHostController = rememberNavController()) { NavHost(navController, startDestination = Routes.HOME) { composable(Routes.HOME) { HomeScreen() } } }`.
- **GOTCHA**: string routes are fine here; if the team prefers type-safe (Serializable) routes, decide in plan 02 when a second destination exists — don't add kotlinx-serialization for one route.
- **VALIDATE**: `gradlew.bat :app:assembleDebug`

### CREATE app/src/test/java/com/readily/app/ui/home/HomeViewModelTest.kt

- **IMPLEMENT**: a `MainDispatcherRule : TestWatcher` (starting/finished set/reset `Dispatchers.Main` with `StandardTestDispatcher`) in the same file (move to a shared test util in plan 02 when a second test needs it). Test: `every { dao.observeAll() } returns flowOf(emptyList())` via `mockk<AppMetadataDao>()`; `viewModel.uiState.test { ... awaitItem() ... }` with Turbine asserting initial then ready state inside `runTest`.
- **GOTCHA**: `stateIn` with `WhileSubscribed` only activates when collected — Turbine's `test { }` provides the collector; assert the initial `HomeUiState()` first, then the mapped item.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "com.readily.app.ui.home.HomeViewModelTest"`

### CREATE app/src/androidTest/java/com/readily/app/data/local/AppMetadataDaoTest.kt

- **IMPLEMENT**: `@RunWith(AndroidJUnit4::class)`; `@Before` builds `Room.inMemoryDatabaseBuilder(ApplicationProvider.getApplicationContext(), ReadilyDatabase::class.java).allowMainThreadQueries().build()`; `@After` closes it. One test: `put` then `get` round-trips an entity; one test: `observeAll` emits the inserted row (`runBlocking { dao.observeAll().first() }`).
- **GOTCHA**: this compiles in CI but only RUNS on a device/emulator — CI validates via `assembleDebugAndroidTest`, not execution (no emulator on free runners without extra setup; add managed devices later if wanted).
- **VALIDATE**: `gradlew.bat :app:assembleDebugAndroidTest`

### UPDATE app/build.gradle.kts — ktlint already applied; configure if needed

- **IMPLEMENT**: apply `org.jlleitschuh.gradle.ktlint` (root or app module). Default rules; no custom `.editorconfig` beyond `[*.{kt,kts}]` `indent_size = 4` if ktlint flags generated defaults. Run `gradlew.bat ktlintFormat` once to normalize all created files.
- **VALIDATE**: `gradlew.bat ktlintCheck`

### CREATE .github/workflows/ci.yml

- **IMPLEMENT**:
  ```yaml
  name: CI
  on:
    push: { branches: [main] }
    pull_request:
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-java@v4
          with: { distribution: temurin, java-version: "17" }
        - uses: gradle/actions/setup-gradle@v4
        - run: chmod +x gradlew
        - run: ./gradlew ktlintCheck :app:assembleDebug :app:testDebugUnitTest :app:assembleDebugAndroidTest --stacktrace
  ```
- **GOTCHA**: `gradlew` created on Windows may lack the executable bit — the `chmod +x` step (or `git update-index --chmod=+x gradlew` at commit time) is required or CI fails with "Permission denied".
- **VALIDATE**: locally only: `gradlew.bat ktlintCheck :app:assembleDebug :app:testDebugUnitTest :app:assembleDebugAndroidTest` (full CI proof comes from the first push)

---

## TESTING STRATEGY

No prior test conventions exist — this plan establishes them.

### Unit Tests

JUnit4 in `app/src/test`. Coroutine code uses `kotlinx-coroutines-test` (`runTest` + `MainDispatcherRule`), Flows asserted with Turbine, collaborators stubbed with MockK. One test class per ViewModel. This plan ships `HomeViewModelTest` proving the harness works end to end.

### Integration Tests

Instrumentation tests in `app/src/androidTest` against in-memory Room (`AppMetadataDaoTest`). CI compiles them (`assembleDebugAndroidTest`); execution is manual on a connected device (`gradlew.bat connectedDebugAndroidTest`) until an emulator/managed-device job is justified.

### Edge Cases

- `HomeUiState` initial value emitted before the DAO Flow produces (WhileSubscribed cold-start)
- DAO `get` on a missing key returns null (add assertion in `AppMetadataDaoTest`)
- `@Upsert` on an existing key replaces the value (second put same key)

---

## VALIDATION COMMANDS

All commands run from repo root on Windows, non-interactive.

### Level 1: Syntax & Style

```
gradlew.bat ktlintCheck
```

### Level 2: Unit Tests

```
gradlew.bat :app:testDebugUnitTest
```

### Level 3: Integration Tests

```
gradlew.bat :app:assembleDebugAndroidTest
```
(Full execution requires a device: `gradlew.bat :app:connectedDebugAndroidTest` — optional here.)

### Level 4: Manual Validation

```
gradlew.bat :app:assembleDebug
```
Then install on a device/emulator (`adb install -r app\build\outputs\apk\debug\app-debug.apk`) and confirm the app launches to a "readiLY" Home screen with no crash (Hilt graph + Room build + NavHost all exercised at startup). Also confirm `app\schemas\com.readily.app.data.local.ReadilyDatabase\1.json` is committed.

### Level 5: Additional Validation (Optional)

Push a branch and confirm the GitHub Actions `CI` workflow passes on the PR.

---

## ACCEPTANCE CRITERIA

- [ ] `gradlew.bat :app:assembleDebug` succeeds from a clean checkout (JDK 17)
- [ ] App launches to an empty Home screen on an API 28 device/emulator without crashing
- [ ] All versions pinned in `gradle/libs.versions.toml`; no hardcoded versions in build files
- [ ] Hilt injects `HomeViewModel` (via `hiltViewModel()`) and `ReadilyDatabase` (via `DatabaseModule`)
- [ ] Room schema JSON v1 exported to `app/schemas/` and committed
- [ ] KSP used for all annotation processing — zero `kapt` references in the repo
- [ ] `gradlew.bat :app:testDebugUnitTest` passes (HomeViewModelTest green)
- [ ] `gradlew.bat :app:assembleDebugAndroidTest` compiles the DAO test
- [ ] `gradlew.bat ktlintCheck` passes
- [ ] CI workflow runs lint + build + unit tests + androidTest compile on push/PR
- [ ] minSdk = 28, targetSdk = compileSdk = 36

---

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full test suite passes (unit + androidTest compilation)
- [ ] No linting errors
- [ ] Manual testing confirms app launches to Home
- [ ] Acceptance criteria all met
- [ ] `app/schemas/` and wrapper files committed; `gradlew` has the executable bit in git

---

## NOTES

**Why AGP 8.13.0 and not 9.1.1 (current latest stable):** AGP 9.x introduces breaking DSL/behavior changes (built-in Kotlin handling, removed opt-outs, R8 repackaging defaults) and thinner community troubleshooting coverage. 8.13.0 supports API 36 and Kotlin 2.2+, is battle-tested, and upgrading later is a version-catalog bump. `ponytail:` pinned AGP 8.13.0; upgrade to 9.x in a dedicated chore once plans 01–04 are stable.

**Why Room 2.8.4 and not Room 3.0:** Room 3 (`androidx.room3`, released 2026-07) is a different artifact line, KSP/Kotlin-codegen only, weeks old at planning time, and downstream ecosystem (Hilt samples, SO answers) still targets 2.x. 2.x is in maintenance (bug fixes continue). `ponytail:` Room 2.8.4; migrate to Room 3 only if a needed feature (KMP, async-only API) materializes.

**Kotlin 2.3.x avoided:** reported KSP/Hilt incompatibilities around Kotlin 2.3.0; 2.2.20 + matching KSP is the safe pairing. Verify the exact KSP patch release (prefix `2.2.20-`) from https://github.com/google/ksp/releases when filling the catalog.

**KSP not kapt:** Hilt supports KSP since 2.48; Room since 2.6. kapt appears nowhere in this project.

**Compose compiler:** bundled with Kotlin since 2.0 — apply plugin `org.jetbrains.kotlin.plugin.compose` at the Kotlin version. Any tutorial mentioning `kotlinCompilerExtensionVersion` is outdated; ignore it.

**Single module, no domain code yet:** `domain/` exists as a package convention only; no use-case classes until a plan has real business logic (05 scoring). No multi-module split — YAGNI at this scale.

**Low-end target implications for this plan:** minSdk 28 means no desugaring drama for java.time (API 26+), but keep `coreLibraryDesugaring` off until something needs it. R8/minification config is deferred to a release-prep plan; debug builds are the working currency for plans 01–06.

**Deferred (intentionally out of scope):** Hilt test runner (`HiltTestRunner`) — add in plan 02 when a test injects; baseline profiles; detekt (ktlint chosen — formatting-only, zero-config; add detekt if code-smell rules are wanted later); emulator job in CI (gradle managed devices) — add when androidTest execution in CI pays for its minutes.

## Confidence Score

**8/10** — all components are standard, well-documented boilerplate and every task has a local validation command. The two residual risks: exact KSP patch version must be resolved at implementation time against Kotlin 2.2.20, and the AGP 8.13 ↔ Gradle wrapper version pairing must be read from the compatibility table rather than assumed.

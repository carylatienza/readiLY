# Feature: 03-passage-library

The following plan should be complete, but its important that you validate documentation and codebase patterns and task sanity before you start implementing.

Pay special attention to naming of existing utils types and models. Import from the right files etc.

## Feature Description

A bundled, leveled library of oral-reading passages (Filipino + English, Grades 1–3) stored in Room. Each passage carries a pre-tokenized word list — the exact word sequence the ASR engine (plan 05) will constrain decoding against — plus metadata (grade, language, word count, source/attribution). Seed passages ship as a JSON asset loaded into Room on first run. Teachers browse/filter passages, preview them, and can add custom passages via simple text entry with automatic tokenization and word count.

## User Story

As a Grade 1–3 teacher
I want to pick a grade- and language-appropriate reading passage from a built-in library (or add my own)
So that I can run a standardized oral reading assessment without hunting for printed Phil-IRI/CRLA materials.

## Problem Statement

Assessment sessions (plan 04) need a known, leveled text with an exact word sequence. Nothing in the app provides passages yet; teachers otherwise rely on scarce printed DepEd materials. The ASR scoring engine additionally requires a deterministic token list per passage — prose alone is not enough for constrained decoding.

## Solution Statement

One Room entity (`PassageEntity`) with a `tokens` list persisted via a JSON `TypeConverter`. A single pure function `tokenizePassage(body)` produces tokens and word count for both seed data and teacher-entered passages (one code path, no drift). Seed data is an asset JSON parsed with `kotlinx.serialization` and inserted from `RoomDatabase.Callback.onCreate` (fires exactly once, on first DB creation — no "first run" flag needed). Two Compose screens (list with grade/language filter chips, detail/preview) plus an add-passage dialog/screen, each with a Hilt ViewModel exposing `StateFlow`, mirroring plan 02's roster feature.

### Research finding: CRLA/Phil-IRI passage structure & bundling (do not skip)

- **Phil-IRI** (DepEd Order 14 s. 2018): individualized oral reading uses graded narrative passages — Filipino passages exist for Grades 1–7, English for Grades 2–7 (English literacy formally starts later under MTB-MLE). Passages come in comparable sets (A–D) matched on word count, vocabulary load, and sentence complexity; each has 5–7 comprehension questions. Lower-grade passages are short: roughly 50–130 words (a published Grade-level sample is 103 words). Scoring: accuracy = (words − miscues)/words; Independent ≥97%, Instructional 90–96%, Frustration ≤89% (see `docs/research/The Landscape of AI-Powered Oral Reading Assessments.md` lines 13–27).
- **CRLA** (ABC+/RTI, Grades 1–3): a 5-minute rapid screen — letter sounds, word decoding, and *very short* sentence/story reading (tens of words, not hundreds). CRLA texts are shorter and simpler than Phil-IRI passages (same doc, lines 29–44).
- **Copyright**: Phil-IRI/CRLA manuals are Philippine government works — RA 8293 §176 says no copyright subsists in government works, **but** exploitation *for profit* requires prior DepEd approval and possible royalties, and the Phil-IRI manual itself flags that some included passages are *borrowed from third-party copyright holders*. readiLY is a commercial startup, so bundling official passages verbatim is legally risky without a DepEd agreement.
- **Recommendation (implemented in this plan)**: ship **original passages written to Phil-IRI-style specs** for the MVP — 3 per grade per language (18 total). Word-count targets: Grade 1: 40–60 words, Grade 2: 60–90 words, Grade 3: 90–130 words. Narrative style, culturally Filipino settings (sari-sari store, jeepney, fiesta, farm), controlled vocabulary, `source` field set to `"readiLY original"`. Official DepEd passages become a later licensed import, aligned with the deferred "CRLA/Phil-IRI form export" item in `.agents/plans/index.md`.

## Feature Metadata

**Feature Type**: New Capability
**Estimated Complexity**: Medium
**Primary Systems Affected**: Room database (new entity/DAO/migration-free schema bump if plan 02 shipped v1), Compose navigation graph, DI modules
**Dependencies**: `kotlinx-serialization-json` (add if plan 01 didn't); everything else (Room, Hilt, Compose, Navigation) is already in the scaffold from plan 01

---

## CONTEXT REFERENCES

### Relevant Codebase Files IMPORTANT: YOU MUST READ THESE FILES BEFORE IMPLEMENTING!

Plans 01–02 create the scaffold; exact paths below assume the plan-01 conventions. **Verify actual package name and file locations before writing code** (`Glob **/AppDatabase.kt`, `**/*NavGraph*.kt`).

- `.agents/plans/index.md` — Why: locked stack + constraints (offline-first, low-end hardware)
- `app/src/main/java/**/data/local/AppDatabase.kt` (from plan 01/02) — Why: you must register `PassageEntity`, the DAO, the TypeConverter, and bump `version`
- `app/src/main/java/**/data/local/dao/StudentDao.kt` (from plan 02) — Why: DAO style to mirror (Flow-returning queries, suspend writes)
- `app/src/main/java/**/di/DatabaseModule.kt` — Why: where the DB is built; the seed `RoomDatabase.Callback` must be added here
- `app/src/main/java/**/ui/roster/*` (plan 02 screens/ViewModels) — Why: ViewModel + StateFlow + Compose list patterns to mirror
- Navigation graph file from plan 01 — Why: register the three new routes
- `docs/research/The Landscape of AI-Powered Oral Reading Assessments.md` (lines 13–44) — Why: Phil-IRI/CRLA leveling facts backing seed-content specs

### New Files to Create

(Substitute the real base package for `com.readily.app`.)

- `app/src/main/java/com/readily/app/data/local/entity/PassageEntity.kt` — Room entity
- `app/src/main/java/com/readily/app/data/local/dao/PassageDao.kt` — DAO
- `app/src/main/java/com/readily/app/data/local/Converters.kt` — `List<String>` ↔ JSON TypeConverter (UPDATE if plan 02 already created one)
- `app/src/main/java/com/readily/app/data/passages/PassageTokenizer.kt` — pure tokenize function
- `app/src/main/java/com/readily/app/data/passages/SeedPassage.kt` — `@Serializable` DTO for the asset JSON
- `app/src/main/java/com/readily/app/data/passages/PassageRepository.kt` — thin repository over the DAO
- `app/src/main/assets/passages/seed_passages.json` — 18 original passages
- `app/src/main/java/com/readily/app/ui/passages/PassageListScreen.kt` + `PassageListViewModel.kt`
- `app/src/main/java/com/readily/app/ui/passages/PassageDetailScreen.kt` + `PassageDetailViewModel.kt`
- `app/src/main/java/com/readily/app/ui/passages/AddPassageScreen.kt` + `AddPassageViewModel.kt`
- `app/src/test/java/com/readily/app/data/passages/PassageTokenizerTest.kt`
- `app/src/test/java/com/readily/app/data/passages/SeedPassageParsingTest.kt`

### Relevant Documentation YOU SHOULD READ THESE BEFORE IMPLEMENTING!

- [Room: Prepopulate your database](https://developer.android.com/training/data-storage/room/prepopulate#callback) — `RoomDatabase.Callback.onCreate` approach; Why: seed insertion exactly once on DB creation
- [Room: Referencing complex data (TypeConverters)](https://developer.android.com/training/data-storage/room/referencing-data) — Why: persisting `List<String>` tokens
- [kotlinx.serialization JSON guide](https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/json.md) — Why: parsing the seed asset
- [Phil-IRI 2018 Manual (archive.org PDF)](https://ia903103.us.archive.org/18/items/PhilIRIFullPackageV1/Phil-IRI%20Full%20Package%20v1.pdf) — Why: passage structure/leveling reference for authoring seed content (reference only — do NOT copy passages from it)
- [RA 8293 §176, Official Gazette](https://www.officialgazette.gov.ph/1997/06/06/republic-act-no-8293/) — Why: legal basis for the "originals only" seeding decision

### Patterns to Follow

Mirror plan 02 (roster) throughout. Expected conventions from plan 01:

**Naming:** `XxxEntity`, `XxxDao`, `XxxRepository`, `XxxViewModel`, `XxxScreen` composable per screen file.

**DAO:** reads return `Flow<List<T>>` via `@Query`; writes are `suspend`; `@Insert(onConflict = OnConflictStrategy.REPLACE)`.

**ViewModel:** `@HiltViewModel class ... @Inject constructor(repo)`, UI state as `StateFlow<UiState>` built with `stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), initial)`.

**DI:** DAOs provided from `DatabaseModule` (`@Provides fun providePassageDao(db: AppDatabase) = db.passageDao()`).

**Tokenization rule (single source of truth — plan 05 depends on it):** lowercase, split on whitespace, strip leading/trailing punctuation but keep word-internal apostrophes and hyphens (`don't`, `sari-sari`). Keep Filipino diacritics/ñ as-is (`\p{L}` classes, not `[a-z]`).

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation

Data layer: entity, converter, tokenizer, DAO, DB registration.

**Tasks:** create `PassageEntity`, `Converters`, `PassageTokenizer`, `PassageDao`; register in `AppDatabase` (bump version; pre-release, use `fallbackToDestructiveMigration()` only if plan 01 already set that policy — otherwise add a migration).

### Phase 2: Core Implementation

Seed data + repository.

**Tasks:** add `kotlinx-serialization` if absent; write `SeedPassage` DTO; author `seed_passages.json` (18 originals per the specs above); wire seed insertion via `RoomDatabase.Callback`; create `PassageRepository`.

### Phase 3: Integration

UI + navigation.

**Tasks:** list screen with grade/language filter chips; detail screen; add-passage screen; register routes in the nav graph; entry point from the app's home/nav structure.

### Phase 4: Testing & Validation

**Tasks:** unit tests for tokenizer and seed-JSON parsing (assert every passage's declared `wordCount` == token count and grade word-count targets hold); lint + build; manual run-through.

---

## STEP-BY-STEP TASKS

IMPORTANT: Execute every task in order, top to bottom. Each task is atomic and independently testable. Replace `com.readily.app` with the repo's actual base package.

### CREATE app/src/main/java/com/readily/app/data/local/entity/PassageEntity.kt

- **IMPLEMENT**:
  ```kotlin
  @Entity(tableName = "passages")
  data class PassageEntity(
      @PrimaryKey(autoGenerate = true) val id: Long = 0,
      val title: String,
      val body: String,
      val language: String,      // "fil" | "en" (ISO 639)
      val gradeLevel: Int,       // 1..3
      val wordCount: Int,
      val source: String,        // attribution, e.g. "readiLY original"
      val isCustom: Boolean = false,
      val tokens: List<String>,  // via TypeConverter — exact ASR word sequence
  )
  ```
- **PATTERN**: mirror `StudentEntity` from plan 02 (annotation style, table naming)
- **IMPORTS**: `androidx.room.Entity`, `androidx.room.PrimaryKey`
- **GOTCHA**: keep `language` a plain String with the two allowed values enforced at the input layer — an enum + converter is not worth it for two values. Store tokens, not just prose: plan 05 reads `tokens` directly.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE/UPDATE app/src/main/java/com/readily/app/data/local/Converters.kt

- **IMPLEMENT**: `@TypeConverter fun fromList(v: List<String>): String = Json.encodeToString(v)` and the reverse. If plan 02 already made a `Converters` class, ADD these two functions to it instead.
- **PATTERN**: [Room TypeConverters doc](https://developer.android.com/training/data-storage/room/referencing-data)
- **IMPORTS**: `androidx.room.TypeConverter`, `kotlinx.serialization.json.Json`, `kotlinx.serialization.encodeToString`
- **GOTCHA**: needs the `kotlinx-serialization` Gradle plugin + `kotlinx-serialization-json` dependency — see the Gradle task below if missing.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE app/build.gradle.kts (only if kotlinx-serialization is absent)

- **IMPLEMENT**: add `kotlin("plugin.serialization")` (same Kotlin version as plan 01) to plugins and `implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.3")` (match whatever version the version catalog uses, or add it to `libs.versions.toml` if plan 01 uses a catalog).
- **PATTERN**: existing dependency declarations in plan 01's build files / version catalog
- **GOTCHA**: check first — plan 01 may already ship it. Do not add a second JSON library (no Gson/Moshi).
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/data/passages/PassageTokenizer.kt

- **IMPLEMENT**: single pure function:
  ```kotlin
  fun tokenizePassage(body: String): List<String> =
      body.split(Regex("\\s+"))
          .map { it.trim { c -> !c.isLetterOrDigit() && c != '\'' && c != '-' }.lowercase() }
          .filter { it.isNotEmpty() }
  ```
- **PATTERN**: n/a (new leaf utility); keep it a top-level function, no class
- **GOTCHA**: `Char.isLetterOrDigit()` is Unicode-aware, so Filipino diacritics and `ñ` survive; leading/trailing quotes and punctuation are stripped, internal hyphens/apostrophes kept (`sari-sari` stays one token). This exact function is the contract with plan 05 — do not create a second tokenizer anywhere.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/data/local/dao/PassageDao.kt

- **IMPLEMENT**:
  ```kotlin
  @Dao
  interface PassageDao {
      @Query("SELECT * FROM passages WHERE (:grade IS NULL OR gradeLevel = :grade) AND (:language IS NULL OR language = :language) ORDER BY gradeLevel, language, title")
      fun observePassages(grade: Int?, language: String?): Flow<List<PassageEntity>>

      @Query("SELECT * FROM passages WHERE id = :id")
      fun observePassage(id: Long): Flow<PassageEntity?>

      @Insert suspend fun insert(passage: PassageEntity): Long
      @Insert suspend fun insertAll(passages: List<PassageEntity>)
      @Delete suspend fun delete(passage: PassageEntity)
  }
  ```
- **PATTERN**: `StudentDao` from plan 02 (Flow reads, suspend writes)
- **GOTCHA**: the nullable-parameter filter query keeps this to ONE query instead of four filter variants.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE app/src/main/java/com/readily/app/data/local/AppDatabase.kt

- **IMPLEMENT**: add `PassageEntity::class` to `entities`, bump `version`, add `@TypeConverters(Converters::class)` if not present, add `abstract fun passageDao(): PassageDao`.
- **PATTERN**: how plan 02 registered `StudentEntity`
- **GOTCHA**: version bump requires a migration or destructive fallback; follow whatever policy plan 01 set. Pre-release destructive fallback is fine if that's already the policy.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/data/passages/SeedPassage.kt

- **IMPLEMENT**:
  ```kotlin
  @Serializable
  data class SeedPassage(val title: String, val body: String, val language: String, val gradeLevel: Int, val source: String)

  fun SeedPassage.toEntity(): PassageEntity {
      val tokens = tokenizePassage(body)
      return PassageEntity(title = title, body = body, language = language, gradeLevel = gradeLevel,
          wordCount = tokens.size, source = source, isCustom = false, tokens = tokens)
  }
  ```
- **GOTCHA**: `wordCount` is always derived from tokens — the JSON deliberately has no wordCount field, so it can never disagree.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/assets/passages/seed_passages.json

- **IMPLEMENT**: JSON array of 18 `SeedPassage` objects — 3 per grade (1–3) per language (`fil`, `en`). **Author original passages** (do not copy Phil-IRI/CRLA texts — see research section). Specs:
  - Grade 1: 40–60 words, simple SVO sentences, high-frequency words
  - Grade 2: 60–90 words, compound sentences allowed
  - Grade 3: 90–130 words, short narrative arc
  - Narrative style, Filipino cultural settings (sari-sari store, jeepney, fiesta, palengke, farm, classroom); English passages use Philippine-English-friendly vocabulary
  - Every `source` = `"readiLY original"`
  - Example entry:
    ```json
    {"title": "Si Ana at ang Pusa", "language": "fil", "gradeLevel": 1, "source": "readiLY original",
     "body": "Si Ana ay may pusa. Ang pusa niya ay puti. Tuwing umaga, kumakain ang pusa ng isda. Mahal ni Ana ang kanyang pusa. Naglalaro sila sa bakuran tuwing hapon."}
    ```
- **GOTCHA**: file must be valid UTF-8 (Filipino text). Put it under `assets/` (not `res/raw/`) so the path stays a plain string.
- **VALIDATE**: `python -c "import json,io; d=json.load(io.open(r'app/src/main/assets/passages/seed_passages.json',encoding='utf-8')); assert len(d)==18, len(d); print('ok')"` (or the unit test two tasks down if Python is unavailable)

### UPDATE app/src/main/java/com/readily/app/di/DatabaseModule.kt

- **IMPLEMENT**: in the `Room.databaseBuilder(...)` chain, add `.addCallback(object : RoomDatabase.Callback() { override fun onCreate(db: SupportSQLiteDatabase) { ... } })` that launches on `Dispatchers.IO` (a `CoroutineScope(SupervisorJob() + Dispatchers.IO)`, or the app-scoped `@Singleton` scope if plan 01 provides one), reads `context.assets.open("passages/seed_passages.json")`, decodes `List<SeedPassage>` with `Json { ignoreUnknownKeys = true }`, maps `toEntity()`, and inserts via the DAO **obtained from a `Provider<AppDatabase>`** (Hilt `Provider` breaks the DB→callback→DB cycle; see the prepopulate doc's pattern).
- **PATTERN**: [Room prepopulate-from-callback doc](https://developer.android.com/training/data-storage/room/prepopulate#callback)
- **GOTCHA**: `onCreate` fires only when the DB file is first created — users who installed before this feature (dev devices with a v1 DB) get it via the version-bump destructive recreate, or clear app data. That is acceptable pre-release. Do NOT add a DataStore "seeded" flag — the callback already guarantees exactly-once.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/data/passages/PassageRepository.kt

- **IMPLEMENT**: `@Singleton class PassageRepository @Inject constructor(private val dao: PassageDao)` with pass-throughs `observePassages(grade, language)`, `observePassage(id)`, `delete(passage)`, and:
  ```kotlin
  suspend fun addCustomPassage(title: String, body: String, language: String, gradeLevel: Int): Long {
      val tokens = tokenizePassage(body)
      require(tokens.isNotEmpty()) { "Passage body must contain words" }
      return dao.insert(PassageEntity(title = title.trim(), body = body.trim(), language = language,
          gradeLevel = gradeLevel, wordCount = tokens.size, source = "Teacher-added", isCustom = true, tokens = tokens))
  }
  ```
- **PATTERN**: plan 02's repository (if plan 02 skipped repositories and injects DAOs into ViewModels directly, MIRROR that instead and put `addCustomPassage` logic in the ViewModel — match the existing layering, don't introduce a new one)
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/ui/passages/PassageListViewModel.kt

- **IMPLEMENT**: `@HiltViewModel`; two `MutableStateFlow` filters (`gradeFilter: Int?`, `languageFilter: String?`); `val passages = combine(gradeFilter, languageFilter) { g, l -> g to l }.flatMapLatest { (g, l) -> repo.observePassages(g, l) }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), emptyList())`; setter functions toggle a filter off when re-selected.
- **PATTERN**: plan 02 list ViewModel
- **IMPORTS**: `kotlinx.coroutines.flow.*`, `@OptIn(ExperimentalCoroutinesApi::class)` for `flatMapLatest`
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/ui/passages/PassageListScreen.kt

- **IMPLEMENT**: `Scaffold` with a `FloatingActionButton` (navigate to add-passage); a row of `FilterChip`s: Grade 1/2/3 and Filipino/English (selected state from ViewModel, tap toggles); `LazyColumn` of `ListItem`-style cards showing title, `"Grade $gradeLevel · ${if (language=="fil") "Filipino" else "English"} · $wordCount words"`, and a small "custom" badge when `isCustom`. Tap navigates to detail. Empty state text when the filtered list is empty.
- **PATTERN**: plan 02's roster list screen (Scaffold/LazyColumn/FAB structure)
- **IMPORTS**: `androidx.compose.material3.*`, `androidx.hilt.navigation.compose.hiltViewModel`
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/ui/passages/PassageDetailScreen.kt + PassageDetailViewModel.kt

- **IMPLEMENT**: ViewModel takes passage id from `SavedStateHandle`, exposes `stateIn`-ed `Flow<PassageEntity?>`. Screen: top bar with title and (for `isCustom` only) a delete action with a confirm `AlertDialog`; metadata row (grade, language, word count, source); passage `body` rendered large and readable (this same layout is the read-aloud preview plan 04 builds on — `fontSize = 20.sp`, generous `lineHeight`, `verticalScroll`).
- **PATTERN**: plan 02 detail screen; `SavedStateHandle` nav-arg pattern from plan 01's nav setup
- **GOTCHA**: bundled passages are not deletable/editable — hide the delete action unless `isCustom`.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/main/java/com/readily/app/ui/passages/AddPassageScreen.kt + AddPassageViewModel.kt

- **IMPLEMENT**: form with `OutlinedTextField` for title, multiline body field, grade selector (3 `FilterChip`s), language selector (2 `FilterChip`s). Live word count under the body field computed with `tokenizePassage(body).size`. Save button disabled until title non-blank and word count > 0; on save call `repo.addCustomPassage(...)` and navigate back.
- **PATTERN**: plan 02's add-student form
- **GOTCHA**: reuse `tokenizePassage` for the live count — same function that persists, so the preview count always matches the stored `wordCount`.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### UPDATE navigation graph (plan 01's NavGraph file)

- **IMPLEMENT**: add routes `passages`, `passages/{passageId}`, `passages/add`; wire the three screens; add a "Passages" entry point wherever plan 01/02 put top-level destinations (bottom bar or home menu).
- **PATTERN**: exactly how plan 02 registered roster routes
- **GOTCHA**: `passageId` nav arg is `NavType.LongType`.
- **VALIDATE**: `gradlew.bat :app:compileDebugKotlin`

### CREATE app/src/test/java/com/readily/app/data/passages/PassageTokenizerTest.kt

- **IMPLEMENT**: JUnit tests: basic split; punctuation stripped (`"Si Ana, at si Ben!"` → `["si","ana","at","si","ben"]`); hyphen/apostrophe kept (`"sari-sari"`, `"don't"`); Filipino diacritics survive; blank/whitespace-only body → empty list; multiple spaces/newlines collapse.
- **PATTERN**: plan 01's unit test setup (JUnit4, `app/src/test`)
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*PassageTokenizerTest"`

### CREATE app/src/test/java/com/readily/app/data/passages/SeedPassageParsingTest.kt

- **IMPLEMENT**: read `seed_passages.json` from the test's classpath or via a relative file path (`File("src/main/assets/passages/seed_passages.json")` works in a plain unit test), decode `List<SeedPassage>`, assert: 18 entries; 3 per (grade, language) pair; every `language` in `{"fil","en"}`; every `gradeLevel` in 1..3; token counts within the grade word-count bands (G1 40–60, G2 60–90, G3 90–130); no empty title/body.
- **GOTCHA**: this test is the seed-content gate — if authoring drifted outside spec it fails here, not on-device.
- **VALIDATE**: `gradlew.bat :app:testDebugUnitTest --tests "*SeedPassageParsingTest"`

---

## TESTING STRATEGY

### Unit Tests

Plain JUnit in `app/src/test` (plan 01 harness): tokenizer behavior (the plan-05 contract) and seed-JSON validation (count, distribution, word-count bands). Repository logic is thin pass-through; `addCustomPassage`'s derivation is covered transitively by the tokenizer tests plus one direct test if plan 02 established a DAO-faking pattern — mirror it if so, skip if not.

### Integration Tests

If plan 01/02 set up Room in-memory DB tests (`app/src/androidTest` or Robolectric), MIRROR one: build in-memory DB, run the seed callback logic (call the parse+insert function directly), assert 18 rows and filter query correctness. If no such harness exists yet, do not build one for this plan — the seed parsing test plus manual validation covers it.

### Edge Cases

- Passage body of only punctuation/whitespace → rejected by `addCustomPassage` (require) and Save stays disabled
- Filipino diacritics and `ñ` in tokens round-trip through the TypeConverter
- Both filters active with no matches → empty state, no crash
- Deleting a custom passage currently open in detail → detail Flow emits null; screen must handle null (navigate back or show placeholder)
- Very long custom passage (500+ words) → allowed; list card must not overflow (single-line title ellipsis)

---

## VALIDATION COMMANDS

Execute every command to ensure zero regressions and 100% feature correctness. All non-interactive, run from repo's Android project root.

### Level 1: Syntax & Style

```
gradlew.bat :app:compileDebugKotlin
gradlew.bat :app:lintDebug
```

### Level 2: Unit Tests

```
gradlew.bat :app:testDebugUnitTest
```

### Level 3: Integration Tests

```
gradlew.bat :app:assembleDebug
```
(Plus `gradlew.bat :app:connectedDebugAndroidTest` only if plan 01 established androidTest and an emulator is available — otherwise skip, per project state.)

### Level 4: Manual Validation

1. Fresh install (or clear app data) → open Passages: 18 passages listed.
2. Tap "Grade 2" + "Filipino" chips → exactly 3 passages shown; tap chip again → filter clears.
3. Open a passage → body readable, metadata correct, no delete action on bundled passage.
4. Add a custom passage (Filipino, Grade 1, ~50 words) → live word count updates while typing; after save it appears in the list with a custom badge; open it → delete action present; delete → gone.
5. Kill and relaunch the app → still 18 bundled passages (no duplicate seeding).

### Level 5: Additional Validation (Optional)

`agent-browser`/`e2e-test` skills are not applicable (native Android, no browser). Optionally inspect the DB: `adb shell "run-as <applicationId> sqlite3 databases/<dbname> 'SELECT COUNT(*), language, gradeLevel FROM passages GROUP BY language, gradeLevel;'"`.

---

## ACCEPTANCE CRITERIA

- [ ] `PassageEntity` stores title, body, language (fil/en), grade (1–3), word count, source, isCustom, and the pre-tokenized word list
- [ ] Exactly one tokenizer function exists and is used by seed loading, custom-passage creation, and the live word count
- [ ] 18 original seed passages (3 × grade 1–3 × fil/en) ship as a JSON asset, within grade word-count bands, `source = "readiLY original"` — no copied DepEd/Phil-IRI text
- [ ] Seeding happens exactly once (Room onCreate callback); relaunch does not duplicate
- [ ] List screen filters by grade and language via chips; detail screen previews the passage readably
- [ ] Teachers can add custom passages with auto word-count/tokenization; only custom passages are deletable
- [ ] All validation commands pass with zero errors
- [ ] Code follows plan 01/02 conventions (Hilt, StateFlow, Flow DAOs, Compose M3)
- [ ] No regressions in roster (plan 02) functionality

## COMPLETION CHECKLIST

- [ ] All tasks completed in order
- [ ] Each task validation passed immediately
- [ ] All validation commands executed successfully
- [ ] Full unit test suite passes
- [ ] No lint errors
- [ ] Manual testing steps 1–5 confirmed on device/emulator
- [ ] Acceptance criteria all met
- [ ] Code reviewed for quality and maintainability

## NOTES

- **Why originals, not official passages**: RA 8293 §176 exempts government works from copyright but requires DepEd approval for *for-profit* exploitation, and the Phil-IRI manual embeds third-party copyrighted passages. Bundling official texts is a licensing task for the pilot phase (see deferred "CRLA/Phil-IRI form export" in `.agents/plans/index.md`), not an MVP blocker.
- **Tokens stored, not derived at read time**: plan 05 needs a stable, versioned word sequence per passage; deriving on the fly risks tokenizer drift changing historical scores. Persisting tokens freezes the contract per passage row.
- **Deliberately skipped** (YAGNI for MVP): comprehension questions per passage (Phil-IRI has 5–7 — add in plan 06/export phase), passage sets A–D, Mother Tongue languages beyond Filipino/English, passage editing (delete + re-add covers it), readability-formula validation of custom passages.
- `openspec/` workflow: if the team is running `/opsx:propose` per feature, this plan maps 1:1 onto a `passage-library` change; not required to execute.

## Confidence Score

**8/10** for one-pass success. Risks: exact file paths/package names depend on plans 01–02 output (mitigated by the verify-first instruction and Glob hints); Hilt `Provider` cycle in the seed callback is the one fiddly spot; seed-passage authoring quality is subjective but gated by the parsing test.

# Coding Standards & Conventions

> **How to use:** Adapt the bracketed choices to your stack once, at project start, then treat this as law. The value is consistency, not the specific choices. When in doubt: match the code around you.

## Naming

- **Variables & functions:** descriptive, no abbreviations that need decoding (`assessmentScore`, not `asScr`)
  - Booleans read as questions: `isLoading`, `hasError`, `canSubmit`
  - Functions are verbs: `calculateScore()`, `fetchStudents()`; getters can be nouns
- **Files:** [choose one and stick to it — `kebab-case.ts` / `PascalCase.tsx` for components / `snake_case.py`]
- **Constants:** `SCREAMING_SNAKE_CASE` for true constants
- **Avoid:** single letters (except loop indices), names that lie (`temp`, `data2`, `newNewFinal`)

## Folder structure

> Pick the shape for your project type; document deviations in the README.

**Web app (feature-based):**
```
src/
  features/<feature>/     # components, hooks, logic per feature
  components/             # shared UI components
  lib/                    # shared utilities, API client
  types/                  # shared types
tests/                    # or co-located *.test.* files
```

**Backend service:**
```
src/
  routes/ (or api/)       # HTTP layer only — thin
  services/               # business logic
  models/ (or db/)        # data access
  lib/                    # shared utilities
tests/
```

**Mobile (Android/MVVM):**
```
app/src/main/java/<pkg>/
  ui/<screen>/            # View + ViewModel per screen
  data/                   # repositories, local DB, network
  domain/                 # models, use cases
```

**Rules regardless of shape:**
- Business logic never lives in the UI/route layer — keep those thin.
- A file over ~300 lines is a smell; split by responsibility.
- No `utils.ts` dumping ground beyond ~5 functions — name modules by what they do.

## Commit messages

Format: **Conventional Commits**

```
<type>(<optional scope>): <imperative summary, ≤72 chars>

<optional body: what & why, not how>
```

- **Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `perf`
- Examples:
  - `feat(assessment): add offline queue for audio uploads`
  - `fix(dashboard): handle empty class list without crash`
- One logical change per commit. If the summary needs "and", split it.

## Branching strategy

- `main` is always deployable. Never commit directly to it (team > 1).
- Branch per unit of work: `feat/<short-name>`, `fix/<short-name>`, `chore/<short-name>`
- Keep branches short-lived (days, not weeks) — merge or delete.
- Merge via PR with CI green + review (see `code-review-checklist.md`).
- [Choose: squash-merge (recommended for small teams) / merge commits]

## Code style rules

- Formatter output is never debated — run it, commit it.
- No commented-out code in `main`; git history remembers.
- No `console.log` / debug prints in merged code; use the logger.
- Errors are handled or explicitly propagated — never silently swallowed (`catch {}` is a bug).
- Comments explain *why*, not *what*. If the *what* needs a comment, rename or refactor instead.
- Magic numbers get named constants (`MAX_RETRY_COUNT = 3`, not `3`).

## Dependencies

- Adding a dependency is a decision — check maintenance status, size, and whether 20 lines of your own code would do.
- Pin versions (lockfile committed).
- Note non-obvious dependency choices in the decision log.

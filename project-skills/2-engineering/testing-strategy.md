# Testing Strategy Guide

> **How to use:** Read once at project start, decide the bracketed choices, and hold PRs to it. The goal is confidence to change code without fear — not a coverage number.

## Philosophy

- Tests exist to let you refactor and ship without manual re-checking everything.
- Test behavior through public interfaces, not implementation details. If a refactor breaks tests but not behavior, the tests were wrong.
- A few honest integration tests beat a hundred mock-heavy unit tests.
- Untested code is unfinished code — but not all code deserves the same rigor (see priorities below).

## The pyramid (default shape)

| Layer | What it covers | How many | Speed |
| :--- | :--- | :--- | :--- |
| **Unit** | Pure logic: scoring, parsing, validation, calculations | Many | ms |
| **Integration** | Modules working together: API route + DB, repository + local storage | Some | seconds |
| **End-to-end** | Critical user journeys through the real UI/app | Few (3-10) | minutes |

## What to test at each layer

### Unit tests
- Every function with branching logic or math — cover the happy path, edge inputs (empty, zero, max), and error inputs.
- Anything you had to think hard about while writing.
- Skip: trivial getters, framework glue, one-line pass-throughs.

### Integration tests
- Each API endpoint: success case + main failure cases (bad input → 400, missing auth → 401, not found → 404).
- Data layer: create/read/update/delete against a real (test) database, not mocks.
- External services mocked at the boundary (HTTP level), not deep inside your code.

### End-to-end tests
- Only the journeys where failure = business failure. Examples: sign up → log in; core workflow start-to-finish; payment/submission flow.
- Keep them stable: test IDs on elements, no sleeps, retry-friendly assertions.
- If an E2E test is flaky, fix it or delete it — a flaky test is worse than no test.

## Coverage philosophy

- Target: **[70-80]% line coverage as a smoke signal, not a goal.** Never write a test just to move the number.
- **100% coverage required** on: [money handling / scoring logic / data migration / whatever is business-critical here].
- **Coverage exempt:** generated code, config, UI snapshots.
- Rule that actually matters: **every bug fix gets a regression test** that fails before the fix and passes after.

## Practices

- [ ] Tests run with one command (`npm test` / `make test`) and in CI on every PR
- [ ] Test data via factories/builders, not copy-pasted 40-line fixtures
- [ ] Tests are independent — any order, no shared mutable state
- [ ] Fast suite (< [2] min) or split into fast (every PR) and slow (pre-merge/nightly) tiers
- [ ] When a bug reaches production, the retro asks: "what test would have caught this?"

## Test-case register (optional — for feature-traceable projects)

> If your PRD uses feature IDs, map critical test cases back to them so you can prove every must-have is verified. Keep to the important cases; don't register every unit test.

| TC | Feature (PRD F#) | Scenario | Expected result | Automated? |
| :--- | :--- | :--- | :--- | :--- |
| TC-01 | F1 | [happy path] | [ ] | [unit/integration/E2E/manual] |
| TC-02 | F1 | [key failure case] | [graceful degradation, message shown] | [ ] |

## AI / model evaluation (if the product includes AI)

> Normal tests check code; AI features also need *quality* evaluation, because they can be wrong without erroring.

- [ ] **Pinned evaluation set:** a fixed suite of test inputs committed to the repo ([e.g. 20 audio clips: clean reader, struggling reader, heavy accent, background noise, off-script rambling]) — run against every model/prompt change
- [ ] **Quality metrics defined:** [e.g. word-level accuracy ≥ X% on the eval set; false "at-risk" flag rate ≤ Y%]
- [ ] **Structured output validated:** model responses checked against a schema before use; malformed output has a fallback path
- [ ] **Regression rule:** a model, prompt, or threshold change ships only if eval-set scores don't drop
- [ ] **Real-world drift check:** periodically sample production inputs (with consent) into the eval set — lab audio ≠ classroom audio

## What we consciously don't test

> Write these down so nobody feels guilty or duplicates effort.

- [e.g. pixel-perfect visual styling — covered by UX review instead]
- [e.g. third-party library internals]

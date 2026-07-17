# Code Review Checklist

> **How to use:** For reviewers — and for authors before requesting review (self-review catches half the issues). Not every item applies to every PR; skim the sections that do. Review the *behavior* first, style last.

## Before review starts (author's job)

- [ ] PR description says what changed and why, links the issue/brief
- [ ] PR is small enough to review in ≤30 min (~400 lines max; split if bigger)
- [ ] CI is green (lint, tests, build)
- [ ] Author has self-reviewed the diff and left comments on anything surprising

## Correctness

- [ ] Does the code do what the PR description says? (Pull it and try it for anything user-facing)
- [ ] Edge cases handled: empty input, null/undefined, zero items, very large input, duplicate submission
- [ ] Error paths: what happens when the network fails, the API returns 500, the file is missing?
- [ ] Off-by-one, timezone, and unit (ms vs s) traps checked
- [ ] Concurrency: can this run twice at once? Is state mutated unsafely?

## Tests

- [ ] New behavior has tests; changed behavior has updated tests
- [ ] Tests would actually fail if the code were wrong (not just testing mocks)
- [ ] At least one test covers the main error/edge path, not just the happy path

## Security & data

- [ ] No secrets, keys, or credentials in the diff
- [ ] User input validated/sanitized at the boundary (injection, XSS)
- [ ] AuthZ checked: can user A access user B's data through this path?
- [ ] PII handled per project rules (logged? encrypted? minimized?)

## Design & maintainability

- [ ] Change is in the right layer (no business logic in UI/routes)
- [ ] Doesn't duplicate something that already exists in the codebase
- [ ] Naming is clear; a new teammate could follow the code without a guide
- [ ] No premature abstraction — solves today's problem simply
- [ ] Public-facing changes update docs/changelog

## Performance (when relevant)

- [ ] No N+1 queries / repeated network calls in loops
- [ ] Large lists paginated or virtualized
- [ ] Expensive work off the main/UI thread (mobile/web)

## Review etiquette

- Comment on the code, not the person. Suggest, don't command: "Consider X because Y."
- Distinguish blocking issues from nits (prefix nits with `nit:`).
- Approve when it's *good enough and safe*, not perfect — perfection goes in a follow-up issue.
- Author responds to every comment (fix, discuss, or explain) before merge.

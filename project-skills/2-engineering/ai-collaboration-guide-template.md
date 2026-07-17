# AI Collaboration Guide (AGENTS.md / CLAUDE.md template)

> **How to use:** Copy the section below the line into your repo root as `AGENTS.md` (or `CLAUDE.md` / `GEMINI.md` — same content, whatever your tool reads) and fill it in. This is the operating manual an AI coding assistant reads before touching your code — it prevents the classic failures: stale framework APIs from training memory, ignored conventions, and edits that contradict your docs. Keep it under a page; agents follow short rules better than long essays. Update the pinned-versions table whenever you upgrade.

---

# AGENTS.md — [Project Name]

[One paragraph: what this project is, the domain, and any hard constraints — e.g. "offline-first Android app for classroom literacy assessment; student data is sensitive; low-end devices are the target."]

## Read this first

Before writing code, read in this order:
1. `docs/prd.md` — what we're building and why (feature IDs `PRD-F#`)
2. `docs/tdd.md` — architecture, data models, API contracts
3. `docs/decisions.md` — settled decisions; do NOT relitigate these
4. This file — conventions and guardrails

## Pinned stack — do not trust training memory

> Verify conventions against official docs for THESE versions before using an API. If a version here looks outdated, ask — don't silently upgrade.

| Layer | Technology | Version | Verified |
| :--- | :--- | :--- | :--- |
| [Frontend] | [e.g. React Native / Jetpack Compose] | [x.y] | [date] |
| [Backend] | [ ] | [ ] | [ ] |
| [Database] | [ ] | [ ] | [ ] |
| [AI/ML] | [e.g. Whisper / Gemini API] | [ ] | [ ] |

**Deprecated in this repo — never use:** [e.g. old navigation library, legacy API v1 routes, moment.js]

## Commands

- Install: `[command]` · Run dev: `[command]` · Test: `[command]` · Lint/format: `[command]`
- Always run test + lint before declaring a task done.

## Conventions (full details: `docs/coding-standards.md`)

- [File naming: e.g. kebab-case; components PascalCase]
- [Layering rule: e.g. business logic in services/, never in routes or UI]
- Commits: Conventional Commits (`feat:`, `fix:`, …)
- Validate all external input at the boundary; errors never silently swallowed

## Golden-path examples

> When adding a [route/screen/model], copy the pattern from these reference files instead of inventing a new shape:

- API endpoint: `[src/routes/example.ts]`
- Screen + state: `[src/features/example/]`
- DB access: `[src/db/example.ts]`
- Test: `[tests/example.test.ts]`

## Guardrails

**Always:**
- Ask before adding a new dependency or changing the data schema
- Keep secrets in env vars; `.env` is never committed
- Match the style of surrounding code

**Never:**
- Commit credentials or API keys
- Leave TODO stubs or placeholder implementations in completed work
- Log or expose personal data ([especially: student names, audio recordings])
- Touch [protected areas: e.g. migration history, signing configs] without asking

## Definition of done (per task)

- [ ] Implements the referenced requirement/feature (`PRD-F#` if applicable)
- [ ] Tests pass and new behavior is covered
- [ ] Lint/format clean; no new warnings
- [ ] No secrets, no placeholder stubs
- [ ] Docs updated if behavior or schema changed

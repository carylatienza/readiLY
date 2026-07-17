# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

readiLY is pre-implementation: there is no application code, no package manifest, and no chosen tech stack yet. The repository currently contains business/planning docs and agent tooling only. Do not assume a framework, language, or build system — confirm with the user or check `docs/startup qc/` and any OpenSpec changes before writing code.

Business/product context lives in `docs/startup qc/`:
- `ReadiLY_Business Plan V1.md`, `ReadiLY_Lean_Canvas.md`, `ReadiLY_Pitch_Deck.md` — product concept, market, positioning
- `Startup_QC_Onboarding.md` — program onboarding context

## Spec-driven workflow (OpenSpec)

This repo uses OpenSpec (`openspec/`) for spec-driven change management, with matching slash commands installed for both this agent (`.agent/`) and Codex (`.codex/`). `openspec/specs/` and `openspec/changes/` are currently empty — no capabilities have been spec'd yet.

Workflow commands (`/opsx:*`):
- `/opsx:explore` — think through a problem before committing to a change; never writes code
- `/opsx:propose` — scaffold a new change and generate proposal.md / design.md / tasks.md via `openspec new change "<name>"`
- `/opsx:apply` — implement a change once its required artifacts are ready
- `/opsx:sync` — sync specs after a change is implemented
- `/opsx:archive` — archive a completed change

Useful raw CLI: `openspec status --change "<name>" --json`, `openspec list --json`.

`openspec/config.yaml` has an empty `context:` block — once a stack is chosen, fill it in there so it's surfaced to future artifact generation.

## Claude Code commands (`.claude/commands/`)

- `/prime` — load codebase context (structure, docs, git state) at the start of a session
- `/create-prd` — generate a PRD from conversation
- `/create-rules` — regenerate this file from codebase analysis (assumes actual code exists)
- `/plan-feature` — deep-research a feature and write an implementation plan to `.agents/plans/`
- `/execute` — implement a plan file produced by `/plan-feature`
- `/commit` — stage and commit all uncommitted changes with an atomic, tagged message
- `/init-project` — project bootstrap steps; **currently written for a Python/FastAPI/uv/Postgres/Docker stack that does not match this repo** — rewrite this command once the real stack is chosen, don't run it as-is

## Skills (`.claude/skills/`)

- `agent-browser` — CLI-driven browser automation (navigate, click, fill, screenshot, network mocking) for manual or scripted web testing
- `e2e-test` — full end-to-end test pass: parallel research agents map user journeys + DB schema + likely bugs, then agent-browser drives every journey with screenshots and DB validation. Requires Linux/WSL/macOS (not native Windows) and an existing browser-accessible frontend — not usable until there's an app to test

## Reference templates (`project-skills/`)

A standalone template library (PRD, TDD, coding standards, checklists, business docs) — not wired into any command. Copy from it manually when a document is needed; see `project-skills/README.md` for the suggested order of use.

## Git

No commits exist yet on `main`. Remote: `https://github.com/carylatienza/readiLY.git`.

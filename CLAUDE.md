# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

readiLY is pre-implementation: there is no application code or package manifest yet, but the stack is locked (see `.agents/plans/index.md`, decided 2026-07-18): **Kotlin Android-native, Jetpack Compose, MVVM, Hilt, Room (offline-first), sherpa-onnx on-device ASR, Supabase (Postgres + Auth) for cloud sync.** The repository currently contains business/planning docs, research, a 7-step implementation plan (`.agents/plans/`), and agent tooling. Check `.agents/plans/index.md` for build order and hard constraints (offline-first, no raw audio to cloud, English-only ASR for MVP) before writing code.

Business/product context lives in `docs/startup qc/`:
- `ReadiLY_Business Plan V1.md`, `ReadiLY_Lean_Canvas.md`, `ReadiLY_Pitch_Deck.md` — product concept, market, positioning
- `ReadiLY In-Depth Details.md`, `Startup QC Details.md` — expanded business/product detail
- `Startup_QC_Onboarding.md` — program onboarding context
- `MentorING Session/` — mentor Q&A and feedback notes

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
- `ceo-advisor` — executive strategy, board prep, investor/stakeholder management
- `content-creator` — SEO-optimized marketing content with brand-voice consistency
- `launch-strategy` — launch planning
- `pricing-strategy` — pricing decisions
- `product-manager-toolkit` — general PM workflows
- `saas-metrics-coach` — SaaS metrics guidance
- `senior-fullstack` — general fullstack engineering assistance
- `seo-audit` — SEO auditing

## Git

Work happens on `main`. Remote: `https://github.com/carylatienza/readiLY.git`.

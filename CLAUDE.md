# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

readiLY is a native Android app (offline oral-reading assessment for Grade 1–3 teachers) being built in phases. **Start every build session with `.agents/plans/00-master-build-plan.md`** — it holds the locked stack, the hard constraints, the phase order and gates, and the overrides to plans `01`–`07`. Where it disagrees with any other doc, it wins.

- **Stack (locked 2026-07-18):** Kotlin, Jetpack Compose + Material 3, MVVM, Hilt, Room, sherpa-onnx (on-device ASR), Supabase for optional sync. Single `:app` module, package `com.readily.app`, minSdk 28.
- **Hard constraints, in one line each:** works fully offline; no seq2seq recogniser (no Whisper/Moonshine); audio never leaves the device; cloud identity is initials + LRN only; English-only automatic scoring; original passages only; no predictive claims. Details in §2 of the master plan.
- `landing/` is a separate static page (HTML/CSS/vanilla JS); it is not part of the app.

Android commands (from the repo root, once phase 2 creates the Gradle project): `gradlew.bat assembleDebug`, `gradlew.bat testDebugUnitTest`, `gradlew.bat ktlintCheck lintDebug`, `adb devices`. Toolchain: JDK 17 (`JAVA_HOME`) and the Android SDK command-line tools (`ANDROID_HOME`).

Business/product context lives in `docs/startup qc/`:
- `ReadiLY_Business Plan V1.md`, `ReadiLY_Lean_Canvas.md`, `ReadiLY_Pitch_Deck.md` — product concept, market, positioning
- `Startup_QC_Onboarding.md` — program onboarding context

## Spec-driven workflow (OpenSpec)

This repo uses OpenSpec (`openspec/`) for spec-driven change management, with matching slash commands installed for both this agent (`.agent/`) and Codex (`.codex/`). `openspec/specs/` and `openspec/changes/` are currently empty; the Android build is driven by the plans in `.agents/plans/`, not by OpenSpec changes.

Workflow commands (`/opsx:*`):
- `/opsx:explore` — think through a problem before committing to a change; never writes code
- `/opsx:propose` — scaffold a new change and generate proposal.md / design.md / tasks.md via `openspec new change "<name>"`
- `/opsx:apply` — implement a change once its required artifacts are ready
- `/opsx:sync` — sync specs after a change is implemented
- `/opsx:archive` — archive a completed change

Useful raw CLI: `openspec status --change "<name>" --json`, `openspec list --json`.

`openspec/config.yaml` `context:` carries the stack and hard constraints so they reach generated artifacts; keep it in step with the master plan.

## Claude Code commands (`.claude/commands/`)

- `/prime` — load codebase context (structure, docs, git state) at the start of a session
- `/create-prd` — generate a PRD from conversation
- `/create-rules` — regenerate this file from codebase analysis (assumes actual code exists)
- `/plan-feature` — deep-research a feature and write an implementation plan to `.agents/plans/`
- `/execute` — implement a plan file produced by `/plan-feature`
- `/commit` — stage and commit all uncommitted changes with an atomic, tagged message
- `/init-project` — set up the Android toolchain on a new machine and check the build

## Skills (`.claude/skills/`)

- `agent-browser` — CLI-driven browser automation (navigate, click, fill, screenshot, network mocking) for manual or scripted web testing
- `e2e-test` — full end-to-end test pass: parallel research agents map user journeys + DB schema + likely bugs, then agent-browser drives every journey with screenshots and DB validation. Requires Linux/WSL/macOS (not native Windows) and an existing browser-accessible frontend — not usable until there's an app to test
- `verify-landing` — "did I break it?" check for the static `landing/` page (serve, no JS errors, interactions, 360/390/1440px, reduced motion, weight, honesty greps)
- `create-github-issue` → `create-github-pull-request` — standard change flow via the `gh` CLI; the PR skill runs both reviewer agents in fresh context
- `adversarial-code-review` — scored /100 review rubric used by `code-reviewer`
- `attach-screenshot` — PR-ready before/after screenshots of `landing/` changes

## Agents (`.claude/agents/`)

- `code-reviewer` — adversarial, scored review of a diff or PR (advisory, read-only)
- `compliance-reviewer` — strict pass on ReadiLY's honesty rules: no testimonials or invented results, illustrative learners labelled, CONFIRM markers kept, privacy claims the product can keep

## Reference templates (`project-skills/`)

A standalone template library (PRD, TDD, coding standards, checklists, business docs) — not wired into any command. Copy from it manually when a document is needed; see `project-skills/README.md` for the suggested order of use.

## Git

`main` is the default branch; work on one branch and one PR per build phase, named `feat/android-<nn>-<slug>` (see §3 of the master plan). Leave PR #2 and the `docs/business-plan-v4-polish` branch alone unless a founder says otherwise. Remote: `https://github.com/carylatienza/readiLY.git`.

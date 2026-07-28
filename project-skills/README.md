# Project Skills Library

A reusable set of templates and checklists for planning, building, and shipping software projects. Copy this folder into any new repo (web app, mobile app, or backend service) and fill in the templates as you go.

## Folder map

| Folder | What's inside | Use it when |
| :--- | :--- | :--- |
| `1-planning/` | PRD, feature brief, technical design doc, decision log | Before writing code |
| `2-engineering/` | Setup checklist, coding standards, code review checklist, testing strategy, AI collaboration guide (AGENTS.md template) | When starting the repo and throughout the build |
| `3-design-ux/` | Design system starter, UX review checklist | When building UI |
| `4-shipping/` | Release checklist, ops & monitoring template, retro/postmortem template | Before and after launch |
| `5-business/` | Market research, competitor analysis, user research, BRD, GTM plan, pricing & unit economics, pitch deck, legal/compliance | When the project needs to win customers, partners, or a competition — not just work |

## Suggested order of operations for a new project

1. **Idea** — write one paragraph describing the problem. If you can't, stop and talk to users first.
2. **Validate** (`5-business/user-research-guide.md` + `market-research-template.md`) — interview real users, size the market, scan competitors. Kill or sharpen the idea before writing specs.
3. **PRD** (`1-planning/prd-template.md`) — define problem, users, goals, scope, and success metrics. If money/partners are involved, pair it with the BRD (`5-business/brd-template.md`).
4. **TDD** (`1-planning/tdd-template.md`) — decide architecture, data models, and API contracts. Record big decisions in the decision log as you make them.
5. **Setup** (`2-engineering/project-setup-checklist.md`) — create the repo properly on day one; adopt the coding standards. Skim the legal/compliance checklist now to spot landmines early.
6. **Build** — for each feature bigger than a bug fix, write a feature brief. Test as you go per the testing strategy.
7. **Review** — every PR goes through the code review checklist; every screen goes through the UX review checklist.
8. **Ship** (`4-shipping/release-checklist.md`) — QA, rollback plan, changelog, launch. If launching to customers, write the GTM plan (`5-business/gtm-plan-template.md`) first.
9. **Retro** (`4-shipping/retro-postmortem-template.md`) — after each milestone or incident, capture what to change next time.

**Business docs on demand:** pricing & unit economics before any paid conversation; pitch deck checklist before any competition or investor meeting; refresh competitor analysis quarterly.

## Scaling up or down

**Small project / weekend hack / hackathon:**
- Skip the PRD; write a feature brief instead (10 minutes, not 2 hours).
- Skip the TDD unless there's a genuinely risky technical choice — then write just the "Decisions & tradeoffs" section.
- Still do: setup checklist (trimmed), release checklist (trimmed), a 15-minute retro.

**Medium project (weeks, small team):**
- Full PRD and TDD, but keep each under 2 pages.
- Decision log becomes important once two or more people are making choices.

**Large project (months, multiple contributors):**
- Everything here, plus keep the decision log religiously — it's what saves you six months in when someone asks "why did we do it this way?"

## Rules of thumb

- A template you fill in badly in 20 minutes beats a perfect doc you never write.
- Delete sections that don't apply. These are prompts, not contracts.
- Docs are living: update the PRD when scope changes, don't let it rot.
- If a doc's decision changed, log the change in the decision log rather than silently editing history.

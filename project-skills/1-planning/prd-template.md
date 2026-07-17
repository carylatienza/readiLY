# PRD: [Product / Feature Name]

> **How to use this template:** A PRD answers *what are we building, for whom, and why* — not *how*. Write it before any code. Keep it under 2 pages; if a section takes more than 15 minutes, you probably need more user research, not more writing. The "how" belongs in the TDD.
>
> **Good PRD test:** someone who has never talked to you could read it and build roughly the right thing.

- **Author:** [name]
- **Date:** [YYYY-MM-DD]
- **Status:** Draft / In review / Approved
- **Reviewers:** [names]

## 1. Problem statement

- What problem exists today? Describe it in the user's words, not the solution's words.
- Who feels this pain, how often, and how badly?
- What do they do today instead (workarounds, competitors, nothing)?
- Evidence: [link to user interviews, data, support tickets, research]

## 2. Goals

- [Goal 1 — outcome, not feature. e.g. "Teachers can assess a full class in one session" not "Build a dashboard"]
- [Goal 2]
- [Goal 3 — keep it to 3 max]

## 3. Non-goals

> Just as important as goals. What are we deliberately NOT doing in this version?

- [e.g. "No parent-facing app in v1"]
- [e.g. "English only; localization comes later"]

## 4. Target users

- **Primary user:** [who, and their context — device, environment, skill level]
- **Secondary users / stakeholders:** [who else is affected]
- **Early adopter profile:** [who we'll test with first]

## 5. Success metrics

> How will we know this worked? Pick 2-4 measurable things with targets.

| Metric | Baseline today | Target | How measured |
| :--- | :--- | :--- | :--- |
| [e.g. time per assessment] | [15 min] | [3 min] | [in-app timing] |
| [e.g. weekly active teachers] | [0] | [20 by pilot end] | [analytics] |

## 6. Scope & features

> Give each feature a stable ID (`F1`, `F2`, …) and never renumber — the TDD, tests, and task tracker can then reference them unambiguously.

| ID | Feature | What the user can do | Priority |
| :--- | :--- | :--- | :--- |
| F1 | [name] | [one sentence, user's perspective] | Must-have |
| F2 | [name] | [ ] | Must-have |
| F3 | [name] | [ ] | Nice-to-have (cut first if behind schedule) |

### Out of scope (v2+)
- [Future ideas — park them here so they stop creeping in]

## 7. User stories & acceptance criteria

> One story per must-have feature. Acceptance criteria in Given/When/Then form — they become your test cases for free. Always include at least one failure/edge criterion.

**US-1 (F1)** — As a [user], I want to [action] so that [benefit].
- Given [precondition], when [user action], then [expected outcome].
- Given [failure/edge case — offline, empty, invalid input], when [ ], then [graceful behavior, not a crash].

**US-2 (F2)** — As a [ ], I want to [ ] so that [ ].
- Given [ ], when [ ], then [ ].

## 7b. Non-functional requirements

> Only the ones that would change how you build. Delete rows that don't matter for this project.

- **Performance:** [e.g. assessment result shown ≤ 3s after reading ends; app usable on low-end devices]
- **Reliability:** [e.g. works fully offline; no data loss on crash mid-session]
- **Privacy/security:** [e.g. student data encrypted at rest; no PII leaves the device without sync consent]
- **Accessibility/locale:** [e.g. usable at 150% font scale; Tagalog + English UI]

## 8. Timeline & milestones

| Milestone | Target date | Definition of done |
| :--- | :--- | :--- |
| [Prototype] | [date] | [demo-able end-to-end flow] |
| [Pilot / beta] | [date] | [N real users using it] |
| [Launch] | [date] | [public / full rollout] |

## 9. Open questions & risks

- [ ] [Unresolved question — who will answer it and by when?]
- [ ] [Biggest risk to this plan and mitigation]

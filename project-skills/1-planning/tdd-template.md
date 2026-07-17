# Technical Design Doc: [System / Feature Name]

> **How to use:** The TDD answers *how* we'll build what the PRD describes. Write it when the work involves architectural choices, new data models, external integrations, or anything expensive to change later. Skip it for pure UI tweaks. Aim for 1-3 pages. The most valuable section is "Tradeoffs considered" — write down the options you rejected and why.

- **Author:** [name]
- **Date:** [YYYY-MM-DD]
- **Status:** Draft / In review / Approved
- **Related PRD:** [link]

## 1. Summary

- [2-3 sentences: what we're building and the chosen approach]

## 2. Architecture overview

> A diagram is worth more than paragraphs. ASCII, Mermaid, or a link to a drawing.

```
[Client] --> [API layer] --> [Service] --> [Database]
                              |
                              +--> [External service / AI model / queue]
```

- **Components:** [name each box above and its single responsibility]
- **New vs. existing:** [what already exists, what's being added or changed]
- **Key constraints:** [e.g. offline-first, must run on low-end Android, latency budget, cost ceiling]

## 3. Data models

> For each new/changed entity: fields, types, relationships. Note anything sensitive (PII) explicitly.

### [Entity name]
| Field | Type | Notes |
| :--- | :--- | :--- |
| id | uuid | PK |
| [field] | [type] | [constraints, indexed?, nullable?, PII?] |

- **Relationships:** [e.g. Student has many Assessments]
- **Migrations needed:** [yes/no — plan for existing data]

## 4. API contracts

> For each new/changed endpoint or interface. Include the error cases — they're where bugs live.

### `[METHOD] /path/to/endpoint`
- **Purpose:** [one line]
- **Request:** [shape / example JSON]
- **Response (success):** [shape / example JSON]
- **Errors:** [status codes + when each happens]
- **Auth:** [who can call this]

## 5. Tradeoffs considered

> The heart of the doc. For each significant decision, list at least one rejected alternative.

### Decision: [e.g. on-device inference vs. cloud API]
- **Chosen:** [option A]
- **Alternatives considered:** [option B, option C]
- **Why:** [the deciding factors — cost, latency, complexity, team skill]
- **What would make us revisit:** [the condition under which this decision expires]

*(Copy each significant decision into the decision log once approved.)*

## 6. Risks & mitigations

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| [e.g. ASR accuracy too low for accented speech] | Med | High | [pilot with real audio early; fallback to manual scoring] |

## 7. Rollout & operational notes

- **Feature flag / gradual rollout?** [plan]
- **Monitoring:** [what we'll watch to know it's healthy]
- **Rollback:** [how we undo this if it breaks]

## 8. Traceability (optional — for feature-ID projects)

> One row per must-have feature from the PRD: proves nothing was designed for that isn't required, and nothing required lacks a design.

| PRD F# | Component(s) | Endpoint / interface | Data model |
| :--- | :--- | :--- | :--- |
| F1 | [ ] | [ ] | [ ] |

## 9. Open questions

- [ ] [Question — owner — deadline]

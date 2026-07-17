# Legal, Compliance & Data Ethics Checklist

> **How to use:** Skim at project start to spot the landmines early, then work through relevant sections before any real users touch the product. This is a prompt list, not legal advice — items marked ⚖️ deserve a real professional's opinion before you scale or sign contracts. Especially critical when handling minors' data, government partnerships, or money.

- **Project:** [name]
- **Date reviewed:** [YYYY-MM-DD]
- **Jurisdiction(s):** [e.g. Philippines — Data Privacy Act (RA 10173); add per country when localizing]

## Data privacy

- [ ] **Data inventory:** one row per data element — if you can't fill this table, you don't know what you're collecting:

| Data element | Source | PII? | Stored where | Who can access | Retention |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [e.g. student name] | [teacher input] | PII (minor) | [local DB + cloud sync] | [teacher, admin] | [school year + N days] |
| [e.g. voice recording] | [in-app mic] | PII (minor, biometric-adjacent) | [ ] | [ ] | [delete after processing / N days] |
| [e.g. reading scores] | [derived] | [linked to PII] | [ ] | [ ] | [ ] |

- [ ] **Minimization:** every field justified — if you don't need it, don't collect it
- [ ] **Minors:** if users are children, consent comes from parents/guardians or the institution — consent flow designed and documented ⚖️
- [ ] **Consent & notice:** plain-language privacy notice exists; users/guardians actually see it before data collection
- [ ] **Voice/audio data:** retention period decided ([delete after processing / N days]); anonymization plan for any data used to improve models
- [ ] **Security basics:** encryption in transit and at rest; access limited by role; no personal data in logs or analytics events
- [ ] **Data subject rights:** you can find, export, and delete one person's data on request — test it
- [ ] **Breach plan:** who does what in the first 72 hours if data leaks ([national law may require notification]) ⚖️
- [ ] **Local law reviewed:** [PH: Data Privacy Act + NPC registration if required; note school/DepEd data-sharing agreement needs] ⚖️

## Institutional & government work

- [ ] Pilot agreements in writing, even simple ones: scope, duration, data handling, who owns results, exit terms
- [ ] Procurement rules understood before promising timelines ([LGU/DepEd purchasing has its own calendar and requirements]) ⚖️
- [ ] Permissions for on-site activities (school visits, recording students) obtained through official channels
- [ ] MOU/MOA template ready for partners ⚖️

## Intellectual property

- [ ] Business/product name searched: domain, app stores, and trademark registry ([IPOPHL for PH]) ⚖️
- [ ] Team IP agreement: who owns the code/brand if a member leaves — written down while everyone's friends ⚖️
- [ ] Third-party licenses honored: open-source licenses of dependencies checked ([no GPL surprises in proprietary code]); model/API terms of service allow your use case
- [ ] Content rights: reading passages, images, fonts — licensed or original

## Business formalities

- [ ] Entity decision: when to register a formal business ([PH: DTI/SEC + BIR]) and what competitions/grants require ⚖️
- [ ] Contracts signed by the right entity (or noted as personal until registration)
- [ ] Basic terms of service + acceptable use written before public launch
- [ ] Insurance/liability considered for on-site school activities

## AI-specific ethics

- [ ] **Bias check:** model tested across accents, dialects, and speech patterns of your real user population — not just clean test audio
- [ ] **Transparency:** teachers/users told what the AI does and doesn't do; scores framed as decision *support*, not verdicts
- [ ] **Human override:** a teacher can correct/override any AI assessment; corrections logged
- [ ] **High-stakes guard:** AI output alone never triggers a consequential decision about a child (retention, labeling) — policy written down
- [ ] **Model failure honesty:** known accuracy limits documented and disclosed to institutional buyers

## Review cadence

- [ ] Re-run this checklist before: first real users, each new jurisdiction, any government contract, any fundraise
- [ ] Open ⚖️ items tracked with owner + date: [list]

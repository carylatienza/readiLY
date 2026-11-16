# readiLY — Android MVP Plan Index

**Read [00-master-build-plan.md](00-master-build-plan.md) first.** It sets the phase order, the gates, and the overrides that apply on top of plans `01`–`07` (written July 2026). Where it disagrees with a numbered plan, it wins.

**Stack (locked 2026-07-18):** Kotlin, native Android, Jetpack Compose + Material 3, MVVM, Hilt, Room, sherpa-onnx on-device ASR, Supabase (Postgres + Auth) for optional sync.
**Targets:** Grade 1–3 teachers in Philippine public schools; 4 GB RAM Android tablets and phones, Android 9+ (API 28); fully usable offline.

## Phase order

One branch and one PR per phase, named `feat/android-<nn>-<slug>`. Execute a numbered plan with `/execute .agents/plans/<file>`, applying the master plan's overrides as you go.

| Phase | Plan | What it delivers | Notes |
|---|---|---|---|
| 0 | master plan §6 | JDK, Android SDK, test device; docs brought in line | No app code |
| 1 | `spike-findings.md` (to write) | Python spike: does the model plus alignment give usable verdicts on adult-voice recordings? | Time-boxed, throwaway; go / adjust / stop |
| 2 | [01-project-foundation.md](01-project-foundation.md) | Gradle project, Compose, Hilt, Room, Robolectric, CI, Educore colour scheme | Re-verify every version |
| 3 | [02-student-roster.md](02-student-roster.md), [03-passage-library.md](03-passage-library.md) | Classes and learners with consent checkpoint; 18 original seed passages (drafts) | |
| 4 | [04-assessment-session.md](04-assessment-session.md) | Recording flow, consent refusal, noise check, warm-up read | Needs a device with a microphone |
| 5 | [05-asr-scoring-engine.md](05-asr-scoring-engine.md) | On-device scoring, teacher override, teacher-scored Filipino, level label | The demo loop works after this phase |
| 6 | [06-teacher-dashboard.md](06-teacher-dashboard.md) | Learner profiles, class summaries, rule-based flags | |
| 7 | `08-export.md` (to write) | Open CSV and a class record sheet with Phil-IRI oral-reading columns | Not claimed to be the DepEd form |
| 8 | [07-supabase-sync.md](07-supabase-sync.md) | Optional sign-in and score sync (JSON only, initials + LRN) | Deferred until a founder asks |
| 9 | `09-pilot-readiness.md` (to write) | Release signing, settings, disclosures, teacher guide | When a pilot date exists |

## Deferred (do not build yet)

- **Cloud sync** (phase 8) — until a founder asks.
- **Matching the official DepEd Excel templates** — export ships as a plain class record first; mapping to the official template waits until a founder adds the template to the repo.
- **CRLA profile derivation** — CRLA profiles come from the CRLA instrument's own parts, which the app does not administer.
- **Early-warning predictive AI** — needs longitudinal pilot data first.
- **Parent home-practice app** — later outreach phase.
- **Child-speech fine-tuning (CFSC/BK3AT)** — needs dataset access agreements.
- **Automatic Filipino scoring** — no viable model within the memory budget; Filipino is teacher-scored in the MVP.
- **PH data-residency hosting migration** — revisit before a pilot with sync.

## Hard constraints every plan must respect

Full text in §2 of the master plan.

- **Offline-first** — every feature works with no connection; sync is optional and opportunistic; no `INTERNET` permission before phase 8.
- **No seq2seq ASR** (Whisper, Moonshine) — a model that repairs a stumbling child's transcript inflates the scores of the children the tool exists to find. Transducer or HMM only.
- **Audio never leaves the device** — only small JSON score records may sync (Data Privacy Act, RA 10173).
- **Cloud identity is initials + LRN** — full names stay on the device.
- **Low-end hardware** — model + runtime about 200 MB RAM, INT8. MVP model: `sherpa-onnx-zipformer-gigaspeech-2023-12-12`.
- **English-only automatic scoring** — Filipino sessions are teacher-scored and never show a machine score.
- **Original passages only** — no DepEd, CRLA or Phil-IRI passage text.
- **No predictive claims** — flags are deterministic rules, and the interface says so.

# readiLY — Build Roadmap

Product requirements and constraints: see [`PRD.md`](PRD.md). This doc is navigation only — build order and where the detail lives.

## Stack (locked 2026-07-18)

Kotlin Android-native, Jetpack Compose, MVVM, Hilt, Room (offline-first), sherpa-onnx (on-device ASR), Supabase (Postgres + Auth) for cloud sync.

## Build order

Implement top to bottom with `/execute .agents/plans/<file>`. Each plan is self-contained but assumes the ones above it are done.

| # | Plan | Delivers | Depends on |
|---|------|----------|------------|
| 1 | [01-project-foundation.md](../.agents/plans/01-project-foundation.md) | Android project scaffold: Compose, MVVM, Hilt, Room, navigation, CI/lint/test harness | — |
| 2 | [02-student-roster.md](../.agents/plans/02-student-roster.md) | Classes and student profiles, local Room storage | 1 |
| 3 | [03-passage-library.md](../.agents/plans/03-passage-library.md) | Bundled leveled reading passages (Filipino + English), grade-level tagging | 1 |
| 4 | [04-assessment-session.md](../.agents/plans/04-assessment-session.md) | Recording flow: pick student + passage, capture audio, karaoke-style passage display | 2, 3 |
| 5 | [05-asr-scoring-engine.md](../.agents/plans/05-asr-scoring-engine.md) | On-device sherpa-onnx ASR constrained to the passage; WCPM, accuracy %, miscue detection | 4 |
| 6 | [06-teacher-dashboard.md](../.agents/plans/06-teacher-dashboard.md) | Student reading profiles, class summaries, literacy-gap flags | 5 |
| 7 | [07-supabase-sync.md](../.agents/plans/07-supabase-sync.md) | Teacher auth + encrypted background sync of scores/results (JSON only, no audio) to Supabase | 6 |

Full index with rationale: [`.agents/plans/index.md`](../.agents/plans/index.md).

## Hard constraints

Offline-first, no raw audio to cloud, English-only ASR for MVP, no seq2seq ASR, ≤200 MB INT8 model budget. Full detail and reasoning: [`PRD.md` § Requirements & constraints](PRD.md#requirements--constraints).

## Deferred work

Early-warning predictive AI, parent home-practice app, CRLA/Phil-IRI export, child-speech fine-tuning, PH data-residency migration. Rationale: [`PRD.md` § Out of scope / deferred](PRD.md#out-of-scope--deferred).

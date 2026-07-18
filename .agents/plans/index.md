# readiLY — MVP Implementation Plan Index

**Scope:** Teacher-only assessment core (Phase 1 per `docs/research/Technical Feasibility Assessment.md`).
**Stack decisions (locked 2026-07-18):** Kotlin Android-native, Jetpack Compose, MVVM, Hilt, Room (offline-first), sherpa-onnx on-device ASR, Supabase (Postgres + Auth) for cloud sync.
**Targets:** Grade 1–3 teachers in PH public schools; low-end Android tablets (assume 4 GB RAM, Android 9+); Filipino + Philippine-English passages; fully functional offline.

## Execution order

Implement top to bottom with `/execute .agents/plans/<file>`. Each plan is self-contained but assumes the ones above it are done.

| # | Plan | What it delivers | Depends on |
|---|------|------------------|------------|
| 1 | [01-project-foundation.md](01-project-foundation.md) | Android project scaffold: Compose, MVVM, Hilt, Room, navigation, CI/lint/test harness | — |
| 2 | [02-student-roster.md](02-student-roster.md) | Classes and student profiles, local Room storage | 1 |
| 3 | [03-passage-library.md](03-passage-library.md) | Bundled leveled reading passages (Filipino + English), grade-level tagging | 1 |
| 4 | [04-assessment-session.md](04-assessment-session.md) | Recording flow: pick student + passage, capture audio, karaoke-style passage display | 2, 3 |
| 5 | [05-asr-scoring-engine.md](05-asr-scoring-engine.md) | On-device sherpa-onnx ASR with decoding constrained to the passage; WCPM, accuracy %, miscue detection | 4 |
| 6 | [06-teacher-dashboard.md](06-teacher-dashboard.md) | Student reading profiles, class summaries, literacy-gap flags | 5 |
| 7 | [07-supabase-sync.md](07-supabase-sync.md) | Teacher auth + encrypted background sync of scores/results (JSON only, no audio) to Supabase | 6 |

## Deferred (later-phase stubs — do not build yet)

- **Early-warning predictive AI** — needs longitudinal assessment data from pilots first.
- **Parent home-practice app** — Phase 2 of outreach strategy.
- **CRLA / Phil-IRI form export** — statutory report generation; needed before DepEd pilot, not before a working assessment loop.
- **Child-speech fine-tuning (CFSC/BK3AT)** — Phase 2 per feasibility doc; requires dataset access agreements.
- **PH data-residency hosting migration** (Converge Cloud etc.) — revisit before pilot; Supabase is fine for development.

## Key constraints every plan must respect

- **Offline-first is non-negotiable** — every feature works with zero connectivity; sync is opportunistic.
- **No Seq2Seq ASR** (Whisper/Moonshine) — hallucination inflates scores of struggling readers. Transducer/HMM only (sherpa-onnx Zipformer or Vosk).
- **No raw audio to cloud** — only kilobyte-scale JSON results sync; audio stays on device (Data Privacy Act RA 10173, child data).
- **Low-end hardware budget** — model + runtime ≤ ~200 MB RAM, INT8 quantized.
- **English-only ASR scoring for MVP** (confirmed during planning: no viable ≤200 MB Tagalog model exists; Vosk tl-ph is 320 MB). Filipino passages are browsable/recordable but skip scoring gracefully until the Phase 2 fine-tuning work. MVP model: `sherpa-onnx-zipformer-gigaspeech-2023-12-12` INT8 (~69 MB).

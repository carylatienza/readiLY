# readiLY — Product Requirements Document (MVP)

## Overview

readiLY is an AI-powered oral reading assessment app for Android. A teacher hands a tablet to a student, the student reads a passage aloud, and the app scores fluency (WCPM), accuracy, and miscues on-device — turning a ~15-minute manual assessment into a ~3-minute automated one. Fully offline-first, targeting Grade 1–3 classrooms in Philippine public schools.

## Problem

- Teachers assess oral reading one student at a time, manually — doesn't scale to full classrooms.
- Struggling readers are identified late because assessment coverage and frequency are limited by teacher time.
- Existing tools (Phil-IRI, CRLA, spreadsheets) capture a score but not diagnostic detail on *where* a student is struggling.

## Users

**Primary (MVP):** Grade 1–3 public school teachers in the Philippines. They are the only direct app users — they run assessments and read the dashboard.

**Assessed, not a direct user:** students aged 6–10, English-language passages.

**Out of scope for MVP:** DepEd/LGU administrators, NGOs, parents. These are real future stakeholders (see business plan / lean canvas) but nothing in the MVP is built for them.

## MVP Scope

Teacher-only assessment core, built in this order (full detail in `BUILD.md` and `.agents/plans/`):

1. Class and student roster management (local, offline).
2. Bundled leveled reading passages, Filipino + English, grade-tagged.
3. Assessment session: pick student + passage, record audio, karaoke-style passage display while reading.
4. On-device ASR scoring: words-correct-per-minute (WCPM), accuracy %, miscue detection.
5. Teacher dashboard: per-student reading profiles, class summaries, literacy-gap flags.
6. Supabase sync: teacher auth + encrypted background sync of score results (no audio).

## Out of scope / deferred

Not built in the MVP — revisit only after the above is working:

- **Early-warning predictive AI** — needs longitudinal assessment data from pilots first.
- **Parent home-practice app** — Phase 2 of outreach strategy.
- **CRLA / Phil-IRI form export** — statutory report generation; needed before a DepEd pilot, not before a working assessment loop.
- **Child-speech fine-tuning (CFSC/BK3AT)** — Phase 2; requires dataset access agreements.
- **PH data-residency hosting migration** (e.g. Converge Cloud) — revisit before pilot; Supabase is fine for development.

## Requirements & constraints

- **Offline-first is non-negotiable.** Every feature must work with zero connectivity; cloud sync is opportunistic only.
- **No raw audio ever leaves the device.** Only kilobyte-scale JSON score results sync to Supabase — required for Data Privacy Act (RA 10173) compliance on child data.
- **English-only ASR scoring for MVP.** No viable ≤200 MB Tagalog model exists (Vosk tl-ph is 320 MB). Filipino passages remain browsable/recordable but skip scoring gracefully.
- **No seq2seq ASR** (e.g. Whisper, Moonshine) — hallucination inflates scores for struggling readers. Transducer/HMM only (sherpa-onnx Zipformer or Vosk). MVP model: `sherpa-onnx-zipformer-gigaspeech-2023-12-12` INT8 (~69 MB).
- **Low-end hardware budget.** Target 4 GB RAM Android 9+ tablets; ASR model + runtime ≤ ~200 MB RAM.
- **Architecture:** Kotlin Android-native, Jetpack Compose, MVVM, Hilt, Room (offline-first), sherpa-onnx (on-device ASR), Supabase (Postgres + Auth) for cloud sync. Locked 2026-07-18.

## Success metrics

- Assessment time per student drops from ~15 min (manual) to ~3 min (app-assisted).
- 100% of students in a class can be assessed in a session, not a manual sample.
- Teacher gets an actionable per-student diagnostic (not just a score) after every assessment.

## Open questions / risks

- Filipino-language ASR scoring has no MVP path (see constraint above) — passages are recordable but not scored; needs a Phase 2 model decision.
- No pilot school access confirmed yet — success metrics above are targets, not measured results.
- sherpa-onnx accuracy on Philippine-accented English speech is unvalidated until real classroom recordings are tested (see `.agents/plans/05-asr-scoring-engine.md`).

# ReadiLY: Real-Time Reading Intelligence for Quezon City Classrooms

**Business Plan — V2 (Startup QC Submission)**

**Team IKIYUH**
* **Yhasmen Nogales** — AI & Machine Learning Lead | yhasmennogales04@gmail.com | Agentic AI Hackathon 2025 1st Runner-Up, DOST 7th iMake.wemake Winner
* **Caryl Joy A. Atienza** — Full Stack & Product Development Lead | carylatienzaa@gmail.com | BPI Datawave 2025 1st Runner-Up

*This version updates V1 with: mentor feedback (Cody Flores, Startup QC mentoring session), the locked technical stack, a first-pass financial section, and findings from seven deep-research reports covering legal/compliance, competitive landscape, DepEd procurement mechanics, and ASR validation standards (`docs/research/`).*

---

## Table of Contents
1. Executive Summary
2. Why Join Startup QC
3. Problem Statement
4. Goals & Objectives
5. Solution
6. Feasibility (Technical, Legal, Operational)
7. Market Analysis & Competitive Landscape
8. Business Model
9. Team Profile
10. Risks & Open Questions
11. Roadmap & Milestones

---

## 1. Executive Summary

ReadiLY is an AI-powered oral reading assessment system that turns a 3-minute reading activity into an instant, diagnostic picture of a student's fluency and accuracy — using only a teacher's Android phone or tablet, fully offline. It targets the most acute bottleneck in early-grade literacy: teachers can't assess reading fast enough or diagnostically enough to intervene before gaps compound.

**5-year vision:** ReadiLY becomes the standard digital layer on top of DepEd's existing oral reading assessments (Phil-IRI, CRLA) in Quezon City public and private schools, giving teachers real-time diagnosis instead of a lagging paper score.

**What research confirms about the opportunity:** DepEd itself has already validated the category — Microsoft Reading Progress pilots in Bais City, Cabanatuan, and Quezon City cut assessment time from two days to two hours per class and moved 100% of struggling learners in three Cabanatuan districts out of the lowest literacy tier. The gap Reading Progress leaves open is exactly ReadiLY's target: it is cloud-dependent on Microsoft Teams, which fails in the "last-mile" schools that lack stable connectivity — the offline-first requirement is not a nice-to-have, it's the reason a second product in this category can exist at all.

**Where this plan differs from V1:**
- **Positioning**: sell as a digital layer that automates Phil-IRI/CRLA-style scoring, not a competing tool — easier to validate and adopt, and legally necessary (see §6.2 — the CRLA's actual text is not free to use commercially).
- **Sequencing**: private schools first for revenue (shorter, standardized sales cycles), while an SDO Quezon City research-permit pathway runs in parallel using the Startup QC credential as a door-opener.
- **Scope**: MVP is a teacher-only assessment core in English only (WCPM, accuracy %, miscue detection) — no predictive AI, no parent app, no Filipino ASR scoring — until pilot data justifies building further.

---

## 2. Why Join Startup QC

ReadiLY is a two-person student team, pre-product and pre-revenue, technically strong but with no B2G sales experience and no education-domain expert on the founding team. Startup QC addresses exactly these gaps, and research confirms the fit is unusually direct for this specific program:
- **Pilot access**: SDO Quezon City is, per research, the single most pilot-ready division in the country for this exact product — it hosted the January 2026 national launch of Project AGAP.AI, and the QC LGU's Education Affairs Unit has a track record of directly funding and facilitating reading pilots (e.g., Adarna House's "Handang Magbasa"/"WIKAHON" programs), bypassing slower national channels.
- **Mentorship**: guidance already received on GTM sequencing and pricing (see §8) needs a companion track on compliance (DPA/NPC, consent mechanics), which is a harder gap for a two-person technical team to self-serve.
- **Government linkage**: Startup QC alumni (e.g., PlastiPave) have been directly piloted by QC government sites — the LGU endorsement functions as a "green lane" that de-risks a first conversation with a Schools Division Superintendent or an SEF-managing Local School Board.
- **Credibility**: matters doubly here, since QC's own Special Education Fund (₱2.36B in 2023, with dedicated line items for "Computer Software" and "ICT Equipment") is a realistic future revenue channel, not just a grant source.

---

## 3. Problem Statement

39.71% of learners in Quezon City are classified as struggling readers (QC CRLA Report, 2025–2026). Nationally, the Philippines allocated ₱1.37 trillion to education in 2026, yet foundational literacy gaps persist (DBM, 2026); EDCOM II's 10-year roadmap confirms this is systemic. The Philippines averages 36 students per teacher nationally (urban centers reaching 40–50), against 8–11.6 in Singapore and Malaysia (PISA 2018) — the structural root of why manual assessment can't scale here the way it might elsewhere.

The core failure isn't the absence of assessment — DepEd already mandates Phil-IRI (Grades 4–6, expanding downward) and CRLA (Grades 1–3, 8–15 minutes per student per language). It's that:
1. **Assessments are slow and manual.** For a 40-student Grade 3 class, a full CRLA cycle across three required languages (Mother Tongue, Filipino, English) can consume 5–12+ hours of instructional time — before Phil-IRI even starts for the higher grades.
2. **Scores without diagnosis.** Teachers get a level (Phil-IRI: Independent/Instructional/Frustration; CRLA: Full Refresher→Grade Ready) via a cognitively brutal manual process — tracking miscue taxonomy across seven categories in real time while running a stopwatch — not a breakdown of *why*.
3. **No early-warning loop.** Assessment is episodic (Beginning/Middle/End of School Year), so gaps compound between checkpoints.

A subtler, research-confirmed failure mode matters for design: under "No Read, No Pass" and "Zero Non-Readers" administrative pressure, teachers report being institutionally incentivized to under-report Frustration-level readers, since accurate reporting invites scrutiny rather than support. **Any tool that removes a teacher's ability to informally smooth over a bad cohort will be experienced as a threat, not just a convenience, unless it's positioned and rolled out carefully** (see §10).

---

## 4. Goals & Objectives

Two distinct milestones, not to be conflated — a usability pilot is not the same evidence DepEd needs for endorsement.

| Goal | Metric | Target |
|---|---|---|
| Cut assessment time per student | Minutes per oral reading check | 15–20 min → ~3 min |
| Full-class diagnostic coverage | % of students assessed per cycle | 100% (vs. partial today) |
| **Stage 1 — Usability pilot** | Pilot completion + teacher satisfaction | 1–3 schools, 2–3 teachers, 100–150 students, 2–4 weeks |
| **Stage 2 — Credible validation study** (prerequisite for any DepEd endorsement conversation) | Human–AI concordance vs. a double-blind adjudication panel | N=300 students, stratified across grades/schools; ICC > 0.85 for WCPM; weighted Cohen's Kappa > 0.80 for profile classification; Bland-Altman mean bias near zero |
| Prove willingness-to-pay | Signed private-school subscription or CSR-funded deployment | ≥1 paid or sponsored deployment within 6 months of Stage 1 pilot |
| Build a DepEd/LGU relationship in parallel | Research-permit conversation started with SDO Quezon City | Initiated during Stage 1, per the CID/EPS contacts in §6.3 |

Stage 2's benchmarks are not arbitrary — they're the field's actual bar: Amira Learning reports 98–99% WCPM correlation with expert raters, SoapBox Labs 96%, and even human-to-human inter-rater agreement on standardized tools like MICS/EGRA tops out around κ=0.81. ReadiLY does not need perfection — it needs to meet or beat the reliability of the manual process it's replacing, and to prove that with a real adjudication panel, not a correlation coefficient alone (see §6.1).

---

## 5. Solution

ReadiLY captures a student's oral reading on a teacher's Android device and produces, in real time:
1. **AI-powered oral reading assessment** — on-device speech recognition scores fluency and accuracy without a manual stopwatch/checklist.
2. **Error pattern detection** — flags specific miscue types (substitutions, omissions, hesitations, self-corrections) instead of a single score.
3. **Teacher dashboard** — per-student reading profiles and class-level summaries so a teacher can act the same day.
4. **(Deferred) Early-warning system** — trend detection across repeated assessments. Explicitly *not* built in the MVP; requires longitudinal pilot data first (see §11).

**Positioning decision:** rather than compete with Phil-IRI/CRLA, ReadiLY positions as a *digital layer* that automates and maps to those official assessments' scoring rubrics (WPM formula, miscue categories, Independent/Instructional/Frustration and Full Refresher→Grade Ready profile bands). This is both an easier sell — schools already have budget and mandate for these assessments — and, per §6.2, a *legal necessity*: the actual CRLA passages are licensed CC BY-NC 4.0 and cannot be digitized for a commercial product without a separate negotiated license from RTI International/USAID. ReadiLY must author its own original passages calibrated to the same difficulty/Lexile bands — the scoring *methodology* (WPM formulas, category names like "Frustration" or "Grade Ready") is not copyrightable and is free to use.

**Competitive differentiation, checked against the actual field (see §7):** global players already do AI oral reading assessment — this is not a novel category. Amira Learning (US, cloud-dependent, B2G/enterprise) and Microsoft Reading Progress (Teams-integrated, cloud-dependent, already piloted in QC/Bais/Cabanatuan) both fail in exactly the infrastructure conditions common in Philippine public schools: DepEd reports only ~64% of schools connected, and even "connected" often means one office line, not classroom Wi-Fi. Wadhwani AI's Vachan Samiksha (India, 30,000 schools) and SoapBox Labs (child-specific acoustic models, fully offline embedded ASR) are the closer technical analogues — proof that offline, child-tuned ASR at this hardware tier is a solved problem elsewhere, not a research risk unique to ReadiLY.

---

## 6. Feasibility

### 6.1 Technical feasibility (locked 2026-07-18)

| Layer | Specification |
|---|---|
| Platform | Kotlin, Android-native, Jetpack Compose |
| Architecture | MVVM + Hilt (DI) |
| Local storage | Room (offline-first; all features work with zero connectivity) |
| ASR | sherpa-onnx on-device, transducer/HMM only (Zipformer/Vosk) |
| MVP ASR model | `sherpa-onnx-zipformer-gigaspeech-2023-12-12`, INT8 quantized, ~69 MB, ~200-300 MB RAM at runtime, RTF < 0.1 (10x faster than real-time) on ARM |
| Hardware budget | Matches actual DepEd Computerization Program tablet spec: octa-core, 4 GB RAM, Android 9–11 — leaving <2 GB usable after OS overhead |
| Cloud sync | Supabase (Postgres + Auth); only kilobyte-scale JSON results sync — **no raw audio ever leaves the device** |
| Language scope (MVP) | **English-only ASR scoring.** No viable ≤200 MB Tagalog model currently exists (Vosk `tl-ph` is 320 MB) |

**Why no Seq2Seq ASR (Whisper/Moonshine), confirmed by research, not just asserted:** Seq2Seq models carry a strong internal language-model prior and will "auto-correct" disfluent child speech — a child stuttering through "Ang a... as... aso..." gets silently cleaned up to the grammatically correct sentence, producing an artificially inflated WCPM score for exactly the struggling readers the product exists to catch. This is a documented, named failure mode (whisper.cpp, Moonshine Tiny) — not a theoretical concern. Transducer (sherpa-onnx Zipformer) and HMM (Vosk) architectures instead support constrained decoding against a known reference passage (a WFST graph built from the passage's exact words), which is both more accurate for this task and structurally incapable of hallucinating a clean transcript.

**Validated accuracy bar to hit, not just aspire to** (from cross-system benchmarks in `Validation of Automated Oral Reading Fluency Systems.md`): ICC > 0.85 for WCPM, weighted Cohen's Kappa 0.75–0.80+ for profile classification, Bland-Altman mean bias near zero with no proportional bias at higher reading speeds. Comparable systems: Amira 98–99% WCPM correlation, SoapBox Labs 96%, Wadhwani AI 95% precision on correctly-read words / 88% on omissions. **Philippine-accented English and child speech specifically have not yet been benchmarked for this stack** — general research shows ASR word-error-rate roughly doubles to 5x on child speech versus adult baselines, and Whisper WER on Cebuano (a proxy for out-of-domain Philippine speech) exceeds 40% without fine-tuning. This is exactly why a Stage 2 validation study (§4) precedes any DepEd conversation, not a nice-to-have afterthought.

**Fine-tuning path when the MVP outgrows English-only:** two purpose-built child-speech corpora exist for this exact use case — the Children's Filipino Speech Corpus (CFSC, UP Diliman/DLSU, ~8 hours, includes isolated miscue recordings) and the Bangsamoro K-3 Assessment Tools corpus (BK3AT, 122 hours, 10 languages including Filipino and English). Research shows fine-tuning an adult-pretrained model with as little as 10 hours of child speech substantially outperforms models trained on 960 hours of adult-only speech — both corpora clear that bar. Both require a formal institutional research agreement, not an open download; this is tracked as a Phase 2 dependency (§11), not blocked on for MVP.

The MVP is scoped as a 7-step build (`.agents/plans/01`–`07`): project foundation → student roster → passage library → assessment session (record + karaoke-style passage display) → ASR scoring engine → teacher dashboard → Supabase sync.

### 6.2 Legal and regulatory feasibility

This is the single biggest gap V1 didn't address, and research shows it's not optional homework — it determines whether a pilot can legally happen at all.

**Data classification.** Under RA 10173 (Data Privacy Act), a child's raw voice is biometric personal information; the *generated reading score and profile category* is separately classified as Sensitive Personal Information (SPI) per NPC Advisory Opinion 2025-017, since it constitutes an educational/academic evaluation. **The on-device, audio-never-leaves-the-phone architecture mitigates breach severity, but does not exempt ReadiLY from SPI compliance obligations on the text-based score that syncs to Supabase.** This is explicitly flagged in research as "the riskiest legal assumption" a team in this position tends to make.

**Consent.** Under DepEd Order 40, s. 2012 (Child Protection Policy) and NPC guidance, only explicit, written, opt-in parental consent is valid — no implied consent, no opt-out notices. A standardized "Consent, Waiver, Indemnity and Release" form is required per student before the microphone can be used for that student, and a non-digital fallback (manual assessment) must remain available for any parent who declines. Special parental authority ("in loco parentis") that a school/teacher holds does **not** substitute for this — only a parent or legal guardian can consent to SPI processing.

**PIC/PIP structure.** The school/DepEd division is the Personal Information Controller; ReadiLY is the Personal Information Processor, acting strictly on the school's documented instructions. This means ReadiLY cannot repurpose pilot data (e.g., for model training) without separate, explicit authorization — a formal Outsourcing Agreement / Data Processing Agreement with the school or Division Superintendent is the required legal instrument (Section 43, DPA IRR), not a Data Sharing Agreement.

**NPC registration thresholds.** Mandatory registration of the data processing system (NPCRS) and appointment of a Data Protection Officer are triggered once the pilot scales past 1,000 students' SPI (NPC Circular 2022-04) — comfortably above the planned 100–150-student Stage 1 pilot, but a hard trigger to track before scaling to a full division.

**IP constraints on assessment content — a critical blocker, not a manageable one.** Phil-IRI is a Philippine government work (RA 8293 §176) and is usable for standard educational purposes, but *commercial* exploitation (a paid SaaS product) requires prior written DepEd approval. CRLA is worse: it's licensed **CC BY-NC 4.0** by RTI International/USAID, which *expressly and absolutely prohibits commercial use* — digitizing the actual CRLA passages into a paid product is a license violation, full stop, and negotiating a bespoke commercial license from RTI/USAID is described in research as "highly improbable, costly, and time-consuming for a student startup." **Mitigation already reflected in the MVP scope**: ReadiLY authors its own original reading passages calibrated to the same difficulty bands, and reuses only the uncopyrightable methodology — WPM formulas, miscue categories, and profile-band names (these are ideas/methods, not protected expression).

**Cloud hosting.** If Supabase's default hosting region isn't Philippine-based, DICT's "Cloud First Policy" (Circular 2017-002 / 2020-010) requires either a DICT-accredited provider/region or equivalent statutory protections (ISO 27001, ASEAN Model Contractual Clauses) for any data classified as government/sensitive — worth confirming before a real DepEd pilot, not before initial development.

**Compliance checklist, ranked by severity (from research):**

| Severity | Issue | Mitigation |
|---|---|---|
| Critical blocker | CRLA CC BY-NC 4.0 restriction | Author original passages; never digitize official CRLA text for a commercial product |
| Critical blocker | Missing explicit parental consent | Mandatory opt-in consent forms per DepEd protocol before any recording |
| High risk | No Outsourcing/Data Processing Agreement with the school | Execute before any pilot data is collected, not after |
| High risk | NPC registration once scaling past 1,000 students | Appoint a DPO and register before crossing the threshold |
| Manageable | Phil-IRI commercial use without DepEd approval | Seek administrative approval, or rely solely on original content |
| Manageable | DICT cloud hosting compliance | Confirm hosting region/accreditation before a DepEd-facing pilot |

### 6.3 Operational feasibility

**Ranked pilot targets (from research, not assumption):**

| SDO | Why it's viable | Realistic timeline |
|---|---|---|
| **Quezon City (primary target)** | Home turf for Startup QC leverage; LGU Education Affairs Unit has directly funded reading pilots before (Adarna House); hosted the national AGAP.AI launch | 2–3 months to research permit + school-level MOA |
| Cabanatuan City | Proven adopter of Microsoft Reading Progress and READExcel; infrastructure and teacher familiarity with AI reading tools already exists | 3–4 months |
| Makati | Rigorous CRLA longitudinal data culture; will demand strong phonological-accuracy evidence before approval | 4–5 months |

**The actual approval mechanics**, not assumed: a school-level pilot needs a MOA signed by the School Head under DepEd Order 40, s. 2015; a multi-school/division pilot needs an MOU/MOA from the Schools Division Superintendent. Because the app assesses and records minors, it separately requires a research permit under DepEd Order 16, s. 2017, reviewed by the Schools Division Research Committee. For a free pilot, the Adopt-a-School Program (RA 8525) is the cleanest vehicle — it classifies the software as a donation, requires proof of ≥1 year of legitimate registration, and is formalized via a Deed of Donation. **A standard pilot MOA process takes 3–6 months end to end** — this shapes the realistic timeline in §11 far more than optimism does.

**Post-pilot paid procurement is more startup-friendly than it used to be.** RA 12009 (New Government Procurement Act, IRR effective Feb 2025) replaced the old RA 9184 regime with modalities that materially help a small SaaS vendor: Small Value Procurement up to ₱2,000,000 now permits award on a single valid quotation; Direct Acquisition up to ₱200,000 needs no BAC approval or canvassing at all, provided the item is in the buyer's Annual Procurement Plan; and Section 37's Direct Procurement for Science, Technology, and Innovation allows a government buyer to contract directly with a "qualified startup business" for R&D-classified work, bypassing bidding entirely (IP ownership must be explicitly negotiated in this mode, since the IRR defaults IP to the government agency absent a written agreement). Quezon City's Special Education Fund was also recently broadened (Joint Circular No. 1, s. 2025) to explicitly cover literacy-remediation software under the ARAL Program Act — a real, named budget line, not a hypothetical one.

**Team gap**: the founding team is technical (AI/ML + full-stack) with no education-domain expert or B2G sales background. Per mentor guidance, this is the gap to fill first — via an advisor or partner, not a hire — because product-market validation should precede further tech investment.

---

## 7. Market Analysis & Competitive Landscape

**Sizing.** ₱1.37 trillion 2026 DepEd budget nationally; 39.71% of QC learners are struggling readers. Quezon City alone has dozens of public elementary schools and a large private-school base — enough for a multi-year beachhead before any ASEAN expansion claim is credible.

**Demographics.** Grade 1–3 teachers in QC public and private elementary schools, typically in classrooms averaging far above the ASEAN benchmark student-teacher ratio; students aged 6–10 in foundational literacy stages. Current behavior: paper-based or spreadsheet tracking (teachers manually transfer scores into Bureau of Learning Delivery Excel templates — a second, separate friction point any tool must not add to), periodic assessment, no real-time feedback loop.

**Competitive landscape, with validated performance where available:**

| Competitor | Model | Validated concordance | Gap ReadiLY targets |
|---|---|---|---|
| Phil-IRI / CRLA (DepEd-mandated, manual) | Human-administered | κ≈0.81 human inter-rater (i.e., ~19% disagreement even between trained humans) | Automate the same rubric rather than replace it; the "gold standard" is already imperfect |
| Microsoft Reading Progress | Cloud/Teams-integrated, already piloted in QC/Bais/Cabanatuan | Moderate-good agreement; some false positives on non-native pronunciation in EFL contexts | Fails in disconnected schools by architecture, not by choice — offline-first is a structural, not marginal, differentiator |
| Amira Learning | Cloud, B2G/enterprise, US-focused | r=0.98–0.99 WCPM | Not localized to Philippine dialects/accents; enterprise pricing model doesn't fit PH public-school budgets |
| Wadhwani AI (Vachan Samiksha) | Offline-capture + async cloud inference, 30,000 India schools | 95% precision on hits, 88% on deletions | Proof that this exact architecture (record locally, sync when connected) scales in a comparable LMIC context — a template to learn from, not a direct competitor here |
| SoapBox Labs | Fully offline embedded ASR, child-specific acoustic model | 96% WCPM correlation | Proof that fully-offline, child-tuned ASR at this hardware tier is achievable — the closest technical proof-of-concept for ReadiLY's own architecture |

**Go-to-market.**
- **Beachhead**: private elementary schools in Quezon City first — standardized, faster sales cycles per mentor guidance — while running the SDO Quezon City research-permit pathway (§6.3) in parallel rather than waiting on it.
- **Hook**: free pilot delivering same-day value (assessment time cut from ~15–20 min to ~3 min per student, full-class diagnostic coverage on day one).
- **Scaling**: pilot success → paid private-school subscriptions → SEF-funded or RA 12009 Direct-Acquisition public-school deployment, using private-sector traction and the eventual SDO QC pilot as social proof for the next segment.

---

## 8. Business Model

*(V1 proposed B2G-first licensing; this section revises the sequencing per mentor feedback and adds procurement-specific detail from research.)*

### 8.1 Revenue streams, in sequence
1. **B2B SaaS — private schools (first revenue target).** Per-student or per-teacher subscription; standardized sales cycle, no procurement bureaucracy.
2. **NGO/CSR-sponsored deployments.** Useful bridge revenue and a way to fund public-school pilots without depending on LGU procurement timelines.
3. **B2G — QC Special Education Fund / DepEd division licensing (longer horizon, but a real named channel).** QC's SEF (₱2.36B, 2023) already has line items for computer software and ICT equipment and was recently broadened to explicitly cover ARAL Program literacy-remediation software. Realistic entry points once a pilot exists: RA 12009 Direct Acquisition (contracts under ₱200,000, no BAC approval needed) at the school/district level, scaling to Small Value Procurement (up to ₱2,000,000) at the division level.

### 8.2 Pricing hypothesis
Per mentor guidance: pricing should track *who gets the most value*, and given DepEd's chronic underfunding, **per-student pricing** is the recommended default over per-school/per-division — it forces the value proposition to be legible at the level closest to the actual gap. Per-school/per-division licensing becomes viable once product-market fit and switching cost are demonstrated. No specific peso figure is set yet; this is validated during the Stage 1 pilot (§4) rather than assumed here.

### 8.3 Cost structure (directional, not a full model)
| Category | Nature | Notes |
|---|---|---|
| ASR model + app development | Fixed, one-time-ish | Founder time; no ML infra cost since inference is on-device |
| Cloud (Supabase) | Variable, low | JSON-only sync (no audio) keeps this near-negligible at pilot scale |
| Pilot support (device loans, teacher onboarding/training) | Variable | Main near-term cash cost |
| Compliance (DPO appointment once past 1,000 students, Outsourcing Agreement legal review, consent-form logistics) | Fixed + variable | Not optional per §6.2 — budget for this before scaling past the Stage 1 pilot, not after |

At this stage, the useful output is *directional cost awareness and a pricing hypothesis*, not a 3-year P&L — a full financial model is premature before pilot data exists to ground the assumptions.

### 8.4 Funding
Startup QC's equity-free grant is the primary near-term funding target. Friends-and-family funding for MVP build and pilot logistics is a common and reasonable bridge at this stage, used to fund the pilot itself and build the case for the next raise.

---

## 9. Team Profile

- **Yhasmen Nogales** — AI & Machine Learning Lead. Agentic AI Hackathon 2025 1st Runner-Up; DOST 7th iMake.wemake Winner.
- **Caryl Joy A. Atienza** — Full Stack & Product Development Lead. BPI Datawave 2025 1st Runner-Up.

**Known gap:** no education-domain expert or B2G sales lead on the founding team. Per mentor feedback, this is the priority gap to close — via advisor or partner relationship first, before further tech hiring.

---

## 10. Risks & Open Questions

- **Regulatory (see §6.2 for the full breakdown)**: exact DPO-appointment timing and Outsourcing Agreement execution must happen before, not after, any real student data is collected — this is now well-specified by research, but still requires a compliance consultant to execute correctly, per the mentor's own admission of unfamiliarity here.
- **The CRLA IP blocker is non-negotiable, not a risk to monitor** — it directly constrains product design (original passages only) and must be treated as already-mitigated in the MVP scope, not revisited later.
- **Teacher resistance / technostress is a real adoption risk, not just a training problem.** Research is explicit: teachers exhibit measurable anxiety that AI erodes the human diagnostic nuance of watching a child struggle (squinting, anxiety, speech patterns an algorithm can't see), and — more pointedly — some teachers are institutionally pressured to under-report struggling readers, meaning an objective, unalterable AI score can be experienced as a threat rather than a relief. Positioning ReadiLY as administrative relief (time saved) rather than a surveillance/accountability tool is a design and rollout decision, not just messaging.
- **Public-school access mechanics** are now well-mapped (§6.3: DepEd Order 40 s.2015, Order 16 s.2017, 3–6 month MOA timeline) — the residual risk is execution speed and relationship-building, not process ambiguity.
- **Moat durability**: Wadhwani AI and SoapBox Labs prove offline, child-tuned ASR is achievable elsewhere — so "offline-first" alone is a necessary condition to compete in the Philippine market, not a differentiator in itself. The defensible moat, if any, has to come from Philippine-accent/dialect accuracy validated through the Stage 2 study (§4), and from being embedded in the specific DepEd reporting workflow (auto-generating Phil-IRI/CRLA-format exports) that a foreign vendor is slower to prioritize.
- **B2G conversion risk**: edtech pilots in Philippine public schools commonly fail to convert to paid contracts without a strong internal champion — treated as an active relationship-building risk, not a solved problem.

---

## 11. Roadmap & Milestones

| Phase | Focus | Trigger to advance |
|---|---|---|
| **0 — MVP build** | Execute `.agents/plans/01`–`07`: teacher-only English assessment core, offline-first, Android, original (non-CRLA/Phil-IRI) passages | Working end-to-end assessment flow on-device |
| **1 — Private-school usability pilot** | 1–3 schools, 2–3 teachers, 100–150 students, 2–4 weeks | Pilot completion + teacher-reported time/diagnostic win |
| **1b — SDO QC engagement (parallel)** | Research-permit conversation with SDO QC CID/EPS contacts, coordinated via LEDIPO/Startup QC credential | Research permit process initiated |
| **2 — First paid/sponsored deployment** | Convert pilot into a paying private-school subscription or CSR-sponsored deployment | Signed agreement |
| **3 — Stage 2 validation study** | N=300, stratified, double-blind adjudication panel vs. ICC/Kappa/Bland-Altman thresholds (§4, §6.1) | Required before any formal DepEd endorsement conversation |
| **4 — LGU/DepEd public-school deployment** | Position as digital layer on Phil-IRI/CRLA; enter via RA 12009 Direct Acquisition or QC SEF funding | Signed MOA + procurement vehicle identified |
| **5 (deferred)** | Predictive early-warning AI, Filipino ASR fine-tuning (CFSC/BK3AT), parent app, ASEAN localization | Only after pilot data + revenue justify the investment |

---

*References: World Bank (2022) Learning Poverty; UNESCO; DBM 2026 education budget; QC CRLA Report 2025–2026; EDCOM II Turning Point Report; Quezon City Startup QC FAQ; ReadiLY mentoring session with Cody Flores (Startup QC); `docs/research/` — Legal and Compliance Assessment; The Landscape of AI-Powered Oral Reading Assessments; Strategic Pathway for AI-Driven EdTech Integration in Philippine Public Schools; Systemic Realities of Early Grade Reading Assessments; Technical Feasibility Assessment; Validation of Automated Oral Reading Fluency Systems.*

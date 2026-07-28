# ReadiLY

**The digital layer for DepEd's mandated early-grade reading assessments**

Team IKIYUH — Yhasmen Nogales · Caryl Joy A. Atienza
Startup QC 2026 — Student Category, Squad 3

---

## 1. Company Name

**ReadiLY**, by Team IKIYUH.

Yhasmen Nogales (AI & Machine Learning Lead) — yhasmennogales04@gmail.com
Caryl Joy A. Atienza (Full Stack & Product Lead) — carylatienzaa@gmail.com

---

## 2. Executive Summary

Every Filipino public school teacher in Grades 1 to 3 is legally required to sit down with each child, one at a time, and listen to them read aloud. This is the Comprehensive Rapid Literacy Assessment (CRLA), joined in Grade 3 by the Philippine Informal Reading Inventory (Phil-IRI). For a class of 40 in two languages, three times a year, that is roughly **40 hours of one-on-one testing per teacher per year** — a full working week — followed by hours of manual encoding into DepEd's Excel forms.

The assessments work. The Schools Division of Makati drove Grade 1 "Full Refresher" learners from 55.17% to 1.64% over three years by acting on this data. The problem is that the measurement itself consumes the instructional time that the intervention needs.

**ReadiLY is an offline-first Android app that administers those exact assessments and produces the exact DepEd forms.** A student reads a passage into a tablet; an on-device speech recogniser scores words-correct-per-minute, accuracy, and a per-word miscue map in under 30 seconds; the teacher gets the Phil-IRI reading level and CRLA profile, and exports the class record sheet already filled in. Three minutes instead of fifteen. No internet. No student audio ever leaves the device.

We are not building another dashboard for teachers to maintain. We are removing work they are already required to do.

**What is actually new here.** Not "AI for reading" — Microsoft and Amira have that. Two things: a speech architecture deliberately chosen so it *cannot* flatter a struggling reader (Section 7), and an output that is the DepEd form itself rather than a vendor's dashboard. No global vendor will build a Philippine statutory form, and no cloud vendor can run in a school with no signal.

**Where we are:** pre-revenue and pre-build. We hold a complete engineering specification, a selected and size-verified on-device model, 13 designed screens, and eight deep-research reports. We have not written production code and have not run a classroom pilot. Section 11 states precisely what is evidenced and what is not. **We commit to demonstrating a working assessment loop at Pitch Day on 3 September 2026.**

**What we are asking for:** ₱250,000 to fund Year 1 — a paid pilot with 8 private schools and a free validation pilot with 1–3 Quezon City public schools — and Startup QC's institutional access to SDO Quezon City. Break-even is **12 paying schools**. By Year 3 the plan reaches roughly **42,000 Grade 1–3 learners** and returns roughly **29,000 teacher-hours a year** to instruction (1,050 classes × 28 hours saved).

---

## 3. Why Join Startup QC

**Quezon City has already named this problem and already has the budget line.**

The QC CRLA Report for 2025–2026 classifies **39.71% of QC learners as struggling readers**, and the QC School Action Plan 2025–2026 names automated remediation of learning gaps as a stated objective. Nationally, DepEd's own CRLA for end-of-school-year 2024–2025 found **48.76% of Grades 1–3 not reading at grade level**.

Our mentor's central advice was to stop looking for new money and find the programme that already has an appropriation. Three exist, and they converge:

- **The ARAL Program (RA 12028)**, with implementing guidelines under DepEd Order 18, s. 2025 — 6,713,352 learners and 447,537 tutors, with progress monitoring mandated and reported through School Form 7 to the Division Office. ARAL tutors are largely para-teachers and pre-service teachers; they need standardised assessment tooling more than licensed teachers do.
- **Special Education Fund Joint Circular No. 1, s. 2025** (DepEd/DBM/DILG/DOF), which explicitly broadened SEF to fund ARAL and mandates a six-year SEF Investment Program **driven by CRLA and Phil-IRI data**. QC's SEF stood at ₱2.36 billion in 2023, with roughly ₱2.7 billion available for FY2026 appropriation — including an existing **₱2.98 million "Computer Software" line item**.
- **The QC Education Affairs Unit**, which already funds comparable pilots — Adarna House's *Handang Magbasa* / WIKAHON reached 300 Key Stage 1 teachers in QC, and Khan Academy Philippines operates here — through municipal channels rather than national procurement.

We are not asking Quezon City to invent a budget for us. We are asking to be evaluated against a line item that already exists and is already required to be spent on CRLA/Phil-IRI-driven interventions.

**Specifically, we need from Startup QC:** introduction and credibility with SDO Quezon City (SDS Dr. Carleen S. Sedilla, CID Chief Dr. Heidee F. Ferrer) to secure a research permit under DepEd Order 16, s. 2017 — a 2–3 month process with institutional backing versus 3–6 months without; continued mentorship on pricing and unit economics; and the ₱100,000 equity-free grant, which covers 40% of our Year 1 requirement.

---

## 4. Problem

**The evidence of the crisis is external and unambiguous.** The World Bank's April 2024 Learning Poverty Brief puts Philippine learning poverty — ten-year-olds unable to read and understand a simple text — at **91% as of 2022**, up from 69.5% in 2019, among the highest rates in East Asia and the Pacific. The Philippine Statistics Authority's 2024 FLEMMS survey found **70.8% functional literacy** among Filipinos aged 10–64, ranging from 59.3% in Zamboanga Peninsula to 81.2% in the Cordillera.

**But the gap we address is not the absence of assessment. It is the cost of it.** Phil-IRI and CRLA are mandated, well-designed, and demonstrably effective when acted on. The failure is operational.

*The arithmetic of one-on-one testing.* CRLA takes 8–15 minutes per student per language; a struggling reader takes the full ten or more, because the teacher must wait, encourage, and manage distress. Grade 3 now covers Filipino and English. For a class of 40:

| | Manual today | With ReadiLY |
|---|---|---|
| Per student, per language | 8–15 min | ~3 min |
| One assessment round, class of 40, 2 languages | ~13 hours | ~4 hours |
| Three rounds per school year | **~40 hours** | ~12 hours |

Forty hours is one full working week per teacher per year, on CRLA alone, before Phil-IRI and before any encoding. Across a nine-teacher Grades 1–3 cohort that is roughly **250 hours per school per year** — time taken directly from instruction.

*The encoding is a second, separate burden.* Results must be transcribed into automated Excel scoresheets: starting passage level, total words, miscues, reading time in minutes and seconds, and comprehension scores across literal, inferential, and critical questions. A single formula error, a failure to paste as values, or an outdated CRLA version corrupts a whole class record. **91.67% of surveyed teachers had received fewer than 20 hours of CRLA-related training.** Teachers also spend roughly ₱300 a month of their own money photocopying reading materials.

*The predictable consequence.* Individualised oral testing is frequently abbreviated, rushed, or skipped, and scores are copy-pasted across forms to satisfy the reporting requirement. The data that is supposed to target intervention becomes unreliable at exactly the point where it matters most.

**The specific problem we solve:** can a teacher complete the assessment they are already required to give, in a fraction of the time, on a device the school already has, without internet, without new training, without sending any child's voice off the device — and get the DepEd form already filled in?

---

## 5. Goals & Objectives

**Phase 0 — Before Pitch Day (now – 3 Sep 2026).** Two things we can do without funding, and are doing: **10 structured teacher interviews** using the ten-question instrument already written in our research, and a **working demonstration of the record-score-report loop** to show on Pitch Day. The engineering plans are complete; what stands between us and a demo is build time, not unknowns.

**Phase 1 — Validate in a classroom (Sep 2026 – Feb 2027).** Harden the MVP against the specification in Section 7. Register the business. Secure an SDO Quezon City research permit. Run a free pilot in 1–3 QC public schools: 2–3 teachers, 100–150 students, 4 weeks.

Success is measured, not assumed: assessment time per student under 4 minutes including setup; 100% of a class assessed within one week versus partial manual sampling today; **teacher override rate below 10% of scored words**; and teacher-reported trust captured by post-pilot survey.

**Phase 2 — First revenue (Mar – Aug 2027).** Convert to 8 paying private schools. Ship Phil-IRI Form 4/5 and CRLA class record sheet export. Publish a pilot results brief written for a Division Office audience.

**Phase 3 — Division and validation study (Sep 2027 – Aug 2028).** First paid division engagement. Begin the formal concordance study our own research defines as the credible bar: N = 300 students across three schools of differing type, double-blind rating by two trained DepEd reading coordinators with a third adjudicator for discrepancies over 2 WCPM, targeting **ICC > 0.85 for WCPM and weighted Cohen's Kappa > 0.80** for level classification. Begin Filipino ASR fine-tuning under academic data agreements.

---

## 6. Solution

**Positioning: ReadiLY is the digital layer for Phil-IRI and CRLA — not a parallel tool.**

This is deliberate, and it is the single most important decision in this plan. A tool that automates the reading test but leaves the teacher to encode the results is, in the words of our own research, *an exacerbation of their administrative burden*. The value is only unlocked when the statutory output comes out the other end.

**The core loop.** The teacher selects a student and a grade-tagged passage. The student reads aloud. The app records locally and an on-device recogniser, aligned against the passage's known text, returns in under 30 seconds:

- **Words correct per minute** and **accuracy percentage**, using Phil-IRI's own formula
- **A per-word miscue map** — omission, substitution, insertion, self-correction — with a three-word lookahead so genuine self-corrections are not counted as errors, as Phil-IRI requires
- **Reading level** — Independent (97–100%), Instructional (90–96%), Frustration (≤89%) — and CRLA profile band

**Statutory form export.** The class record sheet and Phil-IRI recording forms are generated already populated. This is in MVP scope, not deferred. It is the feature that converts ReadiLY from optional software into the path of least resistance.

**The teacher overrules the machine.** Every miscue is shown as a tappable word, and the teacher can correct any judgement; the score recomputes and the session is stored as teacher-adjusted. This is not a concession — it is the design. A teacher who cannot overrule a score will not trust it, and a tool teachers do not trust is abandoned quietly. Override frequency also becomes our sharpest accuracy signal in the pilot: every correction is a labelled error, telling us exactly where the model fails.

**Teacher dashboard.** Class summary by band, assessment coverage bar, and a "needs attention" list. The flag is **rule-based and says so in the interface**: latest band is Frustration, or accuracy declining across the last three sessions, or bottom decile of class by WCPM. It is not a predictive model, because we cannot yet validate a predictive claim.

**What we measure, and what we do not.** WCPM and accuracy are word-recognition measures, not comprehension. We say so plainly because the distinction matters: oral reading fluency correlates with comprehension at roughly r = 0.67–0.76 in the primary grades, which makes it a strong *screener* and a poor *substitute*. ReadiLY tells a teacher which children to look at closely. It does not tell them the child understood the passage, and the interface does not imply otherwise.

**Offline is the architecture, not a fallback.** Rosters, passages, recording, scoring, dashboard, and export all work with zero connectivity. Only score metadata syncs when a network appears — never audio. Student identity in the cloud is reduced to initials plus Learner Reference Number; full names stay on the device. The app is fully usable without an account.

**Dialect tolerance.** Phil-IRI explicitly mandates that dialectal variation is not an error. A grapheme-level normaliser treats common Philippine-English substitutions (p/f, b/v, th/t) as correct by default, and this is a runtime setting a division can calibrate.

**Language scope, and why it is now a finite problem.** MVP auto-scoring is English-only: no on-device Filipino model exists within our 200 MB budget today. This has historically looked like an unbounded problem — the mother tongue policy implied 19-plus languages. **It is no longer.** DepEd ended mandatory mother-tongue instruction for Kindergarten to Grade 3 from SY 2025–2026; K–3 is now Filipino and English. The language problem has collapsed from nineteen to two, and two is winnable. Filipino passages are recordable and reviewable today, with scoring labelled *coming soon* rather than silently missing.

**Deliberately out of scope for MVP:** comprehension scoring, predictive risk modelling, a parent app, and languages beyond Filipino and English. Each is a dated roadmap item, not a current capability.

**On intellectual property, stated plainly.** CRLA materials are licensed CC BY-NC 4.0 by DepEd, USAID, and RTI International — commercial use is prohibited, and a bespoke licence is not realistically obtainable by a student team. Phil-IRI is a government work under RA 8293 §176, which requires prior approval for exploitation for profit. Our resolution follows the idea–expression dichotomy: **we ship 18 original passages** (three per grade per language, written to Phil-IRI word-count specifications, set in Filipino contexts — the sari-sari store, the jeepney, the fiesta) and map to the scoring formulas and band names, which are not copyrightable. We will seek DepEd approval for form-format reproduction before any commercial deployment referencing Phil-IRI branding.

---

## 7. Feasibility

### Technical feasibility

**What exists today:** 13 designed screens; a complete seven-part engineering specification covering project scaffold, roster, passage library, recording, ASR and scoring, dashboard, and sync; a selected and size-verified model; and a specified scoring algorithm. **What does not exist yet: production code, and any classroom data.** We are not presenting design and specification as equivalent to a shipped product.

**The one technical decision that determines whether this works.** Most teams would reach for Whisper. We rejected it, and the reasoning is the core of our technical claim.

Sequence-to-sequence speech models are trained to produce fluent, plausible text. Given a child who stumbles, hesitates, and misreads, they **auto-correct the transcript** — silently converting a struggling reader into a proficient one. The score inflates precisely for the children the tool exists to find. For a diagnostic instrument this is not a quality issue; it is total failure.

We therefore use a **transducer architecture**, which emits tokens as it hears them and cannot invent text that was not spoken. Specifically `sherpa-onnx-zipformer-gigaspeech` INT8: **~69 MB on disk, ~200 MB peak RAM, real-time factor below 0.1** — comfortably inside the 4 GB RAM budget of DepEd Computerization Program tablets, where roughly 2 GB is actually available to an application. Scoring uses Needleman-Wunsch global alignment against the known passage text, which yields the full backtrace needed for per-word miscue classification.

**Acceptance criteria the build must pass** — stated as targets, not results: a verbatim reading must score at or above 90% accuracy, and a passage padded with unread text must register at least 8 of 10 unread words as omissions rather than inflating the score. This second test is the direct guard against the failure mode above.

Independent validation of comparable systems establishes the ceiling is real: Amira Learning reports r = 0.98–0.99 against human raters, SoapBox Labs r = 0.96, and academic ORF systems ±3–4 WPM. Trained human raters agree with each other at Cohen's κ ≈ 0.81 — roughly one disagreement in five. Automated scoring does not need to be perfect; it needs to be as consistent as a human, and it never gets tired at student thirty-eight.

**The principal technical risk is Filipino.** Child speech raises word error rates 40–45% over adult baselines, because children's fundamental frequency sits at 250–400 Hz against an adult female's ~200 Hz. The mitigation is data, and the data exists: the Children's Filipino Speech Corpus (57 children aged 6–11, with three hours of labelled reading miscues), BK3AT (122 hours, entirely Grades 1–3), and UP-DSP-PLD (454 hours). Published results show fine-tuning with as little as **10 hours of child speech outperforms a baseline trained on 960 hours of adult speech**. This is tractable.

### Operational and legal feasibility

**Hardware, and what a school actually needs.** One Android tablet or phone per Grade 1–3 teacher — not one per child. Devices are teacher-held, which matches how DepEd Computerization Program hardware is actually deployed (the student-to-computer ratio is 1:9, and those machines are teacher-issued). A three-section school needs three devices; assessments are sequential, so even one shared device per grade level works. DepEd has distributed over 1.25 million devices to roughly 93% of public schools and the FY2026 budget adds ₱10.6 billion more. Our critical-path diligence item, stated openly, is auditing the *working* device inventory in target schools before committing to a division.

**Classroom acoustics — the validity risk nobody's marketing mentions.** Philippine classrooms are frequently open-air, unpartitioned, and loud, and Grade 1–3 children are unused to speaking into a microphone; shyness alone can depress a fluency score and misclassify a capable reader. We treat this as a measurement-validity problem, not a nuisance. Three responses: a ₱150 wired headset with boom mic in the onboarding kit, which moves the microphone away from ambient noise; a pre-recording signal check that warns the teacher when the noise floor is too high to score reliably; and a one-minute familiarisation read that is recorded but not scored. Whether these are sufficient is a named pilot question, and it is the reason teacher override exists.

**Getting paid — the step most student plans omit.** Two undergraduates cannot invoice a Schools Division Office. Before any paid engagement we must register the business (DTI sole proprietorship in the near term, SEC incorporation before a division contract), obtain BIR registration and official receipts, and enrol in PhilGEPS. Adopt-a-School donations additionally require at least one year of registered existence. This is why Year 1 revenue comes from private schools, which can transact with a DTI-registered entity immediately, while the public pilot runs unpaid under a research permit. Registration costs are inside the Year 1 budget.

**Procurement is genuinely favourable.** Under the New Government Procurement Act (RA 12009, IRR effective February 2025): **Direct Acquisition up to ₱200,000** requires no BAC approval and no canvassing, **Small Value Procurement up to ₱2,000,000** can now be awarded on a single valid quotation, and §37 permits direct procurement from a qualified startup business. Our school-tier pricing sits deliberately inside the Direct Acquisition threshold — a school head can buy ReadiLY without a bidding process.

**Training and the COA question.** Teacher onboarding is one hour, delivered train-the-trainer at the school. There is no new assessment to learn — ReadiLY administers the one teachers already run, which is the point of the positioning. Separately, school heads are historically cautious about charging recurring software to MOOE under COA scrutiny; our answer is that a Grades 1–3 licence is a diagnostic instrument tied to a mandated assessment and an ARAL-eligible SEF line item, procured under Direct Acquisition with a single quotation, and we supply the justification language with the quote.

**Continuity, because we are two students and buyers should ask.** Three commitments a procurement officer can hold us to: assessment data belongs to the school and exports to open CSV on demand, so no record is trapped in our system; the app keeps functioning offline through the paid term even if we stop shipping updates, because scoring runs on the device and needs no server; and support is next-business-day by phone and Viber during the school year, the channel Philippine teachers actually use.

**Data privacy, handled as a design constraint.** A child's voice is biometric personal information under RA 10173 and RA 10367, and the resulting assessment score is Sensitive Personal Information. On-device processing does not exempt us — the score is still SPI. Our compliance posture: audio never leaves the device; we operate as a data **processor** under a Schools Division Outsourcing Agreement, not an informal MOA; explicit written parental consent aligned to DepEd Order 40, s. 2012, with a non-digital alternative for families who decline; NPC registration and a designated DPO once we process SPI for 1,000-plus individuals; and a hard checkpoint in the app requiring the teacher to confirm a signed consent form is on file before the microphone can activate.

---

## 8. Market Analysis

### Why now

Four things changed in the last eighteen months, and together they define the window:

1. **Money.** DepEd's FY2026 budget is **₱1.015 trillion** — the first time the Philippines has allocated above 4% of GDP to education, meeting the UNESCO benchmark.
2. **A legislated programme that needs our exact output.** ARAL (RA 12028) mandates progress monitoring for 6.7 million learners, and SEF Joint Circular No. 1, s. 2025 requires a six-year investment programme *driven by CRLA and Phil-IRI data*.
3. **Political priority.** EDCOM 2's *Turning Point* report frontloads resources to the foundational years and calls for an end to mass promotion.
4. **The language problem shrank.** Mother-tongue instruction ceased to be mandatory for K–3 in SY 2025–2026. Localisation is now a two-language problem.

### Sizing, built bottom-up

| | Basis | Learners (G1–3) | Annual value |
|---|---|---|---|
| **TAM** | All PH Grades 1–3, public (~5.9M) + private (~0.5M) | ~6.4M | ~₱512M |
| **SAM** | NCR and urbanised divisions with existing device inventory and active literacy programmes, plus private schools | ~900,000 | ~₱72M |
| **SOM (36 mo)** | SDO Quezon City at 30% penetration (~38,700) + 60 private schools (~12,000) | ~50,700 | ~₱4.1M |

Quezon City is the largest division in NCR: **95 public elementary schools and 258,201 elementary learners**, of which roughly 129,000 are in Grades 1–3. A full-division licence at our division rate is worth ₱7.7M a year; we model 30%, or ₱2.3M, alongside ₱1.8M from private schools.

Our Year 3 revenue plan of ₱3.84M is **93% of our own stated SOM**. We are not assuming we exceed the market we can actually reach.

### Competition, including the alternatives that are not companies

| Alternative | What it is | Why it does not close this gap |
|---|---|---|
| **The status quo** | Pen, stopwatch, Excel | Free, understood, and entrenched — our real competitor |
| **Microsoft Reading Progress** | Free in Teams; nationwide DepEd rollout announced Feb 2026 | See below |
| **Amira Learning** | US, r = 0.98–0.99, ~₱1,120/student/yr | Cloud-dependent; not Philippine-localised; priced for US districts |
| **SoapBox Labs** | Fully offline child-speech engine | No Philippine language support; licensed as a component, not a product |
| **Wadhwani AI (Vachan Samiksha)** | 30,000+ Indian government schools | Closest architecture to ours; not in the Philippines — evidence the model works at government scale |

**Microsoft is the serious threat and deserves a direct answer.** DepEd and Microsoft announced a nationwide Reading Progress rollout in February 2026, citing Bais City (60 schools, 14,000+ learners) and Cabanatuan. It is free, and Microsoft holds a national enterprise agreement we do not have. Our mentor asked us to find out *why these solutions are unable to localise and go offline*. Four reasons:

1. **Architecture.** Reading Progress is an Azure Speech call inside Teams. Offline is not a configuration flag — it is a different product. Microsoft's education business monetises cloud identity and licensing; a fully offline assessor works against that model.
2. **Language economics.** Filipino child read-aloud recognition requires labelled Filipino children's speech. That data sits almost exclusively in Philippine academic corpora — CFSC, BK3AT, UP-DSP-PLD — which are academic-licensed and reached through Philippine institutional agreements. A US vendor has neither the access route nor the business case: 6.4 million Grade 1–3 learners at Philippine price points is a rounding error against US district revenue.
3. **Output format.** Reading Progress returns Microsoft's metrics. It does not produce a Phil-IRI recording form or a CRLA class record sheet, so the teacher still re-keys everything into DepEd's Excel. No global vendor will build a Philippine statutory form.
4. **Identity and privacy.** It requires a Microsoft 365 Education account in Teams for each student. Provisioning identities for six-year-olds and routing their voice to a foreign cloud sits badly against RA 10173 SPI requirements and DICT Executive Order 119 data-residency rules.

**"Why won't DepEd just build this itself?"** It has tried the adjacent thing and the result is the automated Excel scoresheet that teachers now fight with. DepEd builds forms and policy well; it procures software rather than engineering it, which is precisely why RA 12009 §37 exists to let agencies buy directly from startups. The risk is not that DepEd builds a competitor — it is that DepEd standardises on a free foreign tool before a compliant local one is ready. That is the clock we are running against.

**Where our moat actually is.** Not "offline" and not "AI" — both are attributes competitors could copy. Two assets compound:

- **The compliance workflow.** Once a school's CRLA and Phil-IRI reporting runs through ReadiLY, the switching cost is not the software; it is the reporting process the school has stopped doing by hand.
- **The corpus.** A labelled Filipino children's oral-reading dataset is the asset that decides who owns this category, and ten hours of child speech beats 960 hours of adult speech — so it is achievable at our scale.

**On data rights, because these two claims can conflict.** As a data processor we cannot repurpose school-controlled assessment data for our own model training. So the corpus is not a by-product we quietly harvest; it is a separately negotiated, opt-in research contribution with its own consent language, its own agreement with the Division, and no bearing on the service a school receives if it declines. Where that consent is not given, we fall back on the academic corpora already identified — CFSC, BK3AT, UP-DSP-PLD — under institutional agreements with UP Diliman and DLSU. We would rather have a smaller lawful dataset than an unenforceable claim.

Offline-first buys us the time; the workflow and the corpus are what we build with it.

**Beyond Grades 1–3 reading.** The engine is a passage-aligned speech scorer; the reading assessment is one application of it. The same core extends to Grades 4–6 Phil-IRI, to oral numeracy checks under ARAL's mathematics phase, and to any of the ASEAN systems running comparable early-grade instruments. We are not claiming those markets today — but the ₱512M TAM above is the floor of the opportunity, not the ceiling.

---

## 9. Business Model

### Pricing

Per-student, following mentor guidance, with volume bands and a minimum commitment:

| Tier | Price | Minimum | Target |
|---|---|---|---|
| **School** | ₱150 per Grade 1–3 learner / year | ₱25,000 per school | Private schools — the entry motion |
| **Division** | ₱60 per Grade 1–3 learner / year | 5,000 learners (₱300,000) | SDO / LGU-funded — the scale motion |

Three anchors, each independently checkable:

- A 500-learner public elementary school pays roughly **₱37,500 a year — about 2.7% of its MOOE** (₱2,792 per elementary learner, FY2026).
- That sits **below the ₱200,000 Direct Acquisition threshold**: no bidding, no BAC, decided by the school head.
- It undercuts Amira by roughly 7–15× and Quipper (₱4,000–10,000 per student per year) by an order of magnitude.

On a straight salary-cost basis, the ~250 teacher-hours a nine-teacher cohort recovers each year is worth more than the licence — and unlike the licence, the time comes back as instruction.

### Go-to-market: private schools first

Our mentor was direct that relying on the public sector as a business model is a mistake, and that private-school sales cycles are shorter and more standardised. We follow that. Private schools are the revenue motion; the QC public pilot runs in parallel for validation and credibility, not for Year 1 income. LGU and division sales follow the published pilot evidence, funded through SEF against the ARAL and CRLA line items identified in Section 3.

### Unit economics

Contribution margin is **75%**, and the reason is architectural. On-device inference means the marginal cost of an assessment is **₱0** — cloud speech-to-text would cost ₱0.26–1.44 per audio hour, and a 100-school deployment generates 16,000 audio hours a year. Our variable costs are onboarding (₱5,250 per school, within DepEd Order 15, s. 2017 training caps) and support (~₱500 per school per year). Backend hosting is text-only and stays under ₱10,000 a month even at division scale.

**First Viable Market** — fixed operating cost ÷ contribution per customer: ₱250,000 ÷ ₱22,500 = **12 schools**. Twelve private schools in Metro Manila is a reachable target, not a market-share percentage.

**Why this scales rather than grows linearly.** Because inference runs on the device, serving the 100th school costs the same as the 10th: gross margin rises to roughly 84% at division scale, against under 76% for any cloud-dependent competitor. The same app that serves Quezon City serves any division in the country without new infrastructure — the constraint on growth is division relationships, not unit cost.

### Three-year projection

| | Year 1 (SY26–27) | Year 2 | Year 3 |
|---|---|---|---|
| Private schools (cumulative) | 8 | 28 | 60 |
| Division contracts | 0 (1 unpaid pilot) | 1 | 3 |
| **Revenue** | ₱240,000 | ₱1,296,000 | ₱3,840,000 |
| Contribution (75%) | ₱180,000 | ₱972,000 | ₱2,880,000 |
| Fixed operating costs | ₱250,000 | ₱755,000 | ₱1,735,000 |
| **Net position** | **(₱70,000)** | **+₱217,000** | **+₱1,145,000** |

Fixed costs are founder-led in Year 1 (infrastructure, devices, compliance, passage authoring, pilot logistics), add a part-time education and B2G lead plus founder stipends in Year 2, and a full-time engineer in Year 3. Founder labour is unpaid in Year 1 — an implicit subsidy we name rather than hide.

No churn data exists yet. For planning we assume the SaaS-SMB benchmark of 3–7% monthly and will replace it with pilot data. We target LTV:CAC of at least 3:1; CAC is not measurable until the first paid engagement, and we will not assert a ratio we cannot yet compute.

### Funding ask — ₱250,000

| Use | Amount |
|---|---|
| Pilot logistics — 9 schools onboarding and travel | ₱90,000 |
| Data-privacy compliance — consent templates, Outsourcing Agreement, Privacy Impact Assessment, NPC registration | ₱60,000 |
| Device test fleet and 12 months infrastructure | ₱60,000 |
| Authoring and illustrating 18 original passages | ₱40,000 |
| **Total** | **₱250,000** |

Sources: **₱100,000** from the Startup QC student grant and **₱150,000** from friends and family — the route our mentor identified as standard for MVP and pilot financing. With the grant secured, Year 1 is cash-positive.

---

## 10. Team Profile

**Yhasmen Nogales — AI & Machine Learning Lead.** 1st Runner-Up, Agentic AI Hackathon 2025. Winner, DOST 7th iMake.WeMake.
**Caryl Joy A. Atienza — Full Stack & Product Development Lead.** 1st Runner-Up, BPI Datawave 2025.

Both are undergraduates at the Polytechnic University of the Philippines. Three national competition placements between us is the evidence we can ship under deadline pressure.

**What we do not have, and the order we will fix it in.** Our mentor was clear that the binding constraint is not engineering: *"it's really the education domain expert / B2G sales expert, mainly because the tech development will naturally follow once you've invested into understanding the market."* We accept that ordering.

1. **Education domain expert with DepEd classroom experience** — our first advisory priority. Recruited through Startup QC mentorship and through the pilot teachers themselves, who double as domain validation.
2. **B2G and division relationships** — the mentor's warning was blunt: government adoption does not convert without a champion who will vouch for you internally. Identifying that person inside SDO QC is a named Phase 1 objective, not a hope.
3. **ASR engineering depth** — addressed through academic partnership with UP Diliman's Speech Processing Lab and De La Salle University, who hold the Filipino children's speech corpora our Phase 2 roadmap requires.

We have not yet engaged a named education adviser, and we are not claiming otherwise.

**On commitment.** Both founders graduate in 2027. ReadiLY is not a class project we intend to shelve at graduation: the Year 2 plan puts us on stipends and hires our first employee, which is the point at which this becomes our full-time occupation rather than our thesis. We would rather state that intention now and be held to it.

---

## 11. Evidence Status

Everything in this plan falls into one of three categories. We would rather be graded on an accurate map than a flattering one.

| Claim | Status | Basis |
|---|---|---|
| Learning poverty 91%; functional literacy 70.8% | **Externally validated** | World Bank Learning Poverty Brief (Apr 2024); PSA 2024 FLEMMS |
| 48.76% of Grades 1–3 below grade level; QC 39.71% struggling readers | **Externally validated** (QC figure pending primary-source retrieval) | DepEd CRLA EOSY 2024–25; QC CRLA Report 2025–26 |
| CRLA takes 8–15 min/student/language | **Externally validated** | DepEd CRLA administration guidelines |
| Interventions work when data is acted on | **Externally validated** | SDO Makati longitudinal 2022–25: Grade 1 Full Refresher 55.17% → 1.64% |
| Automated ORF scoring can match human raters | **Externally validated for other systems** | Amira r = 0.98–0.99; SoapBox r = 0.96 — not yet demonstrated for ReadiLY |
| Transducer architecture avoids score inflation | **Internally analysed, not yet tested** | Specification and acceptance criteria defined; build not started |
| Model fits DepEd tablet constraints | **Internally verified from published specifications** | 69 MB / ~200 MB RAM / RTF < 0.1 against 4 GB devices |
| Oral reading fluency predicts comprehension (r ≈ 0.67–0.76) | **Externally validated** | Primary-grade ORF literature; basis for screener-not-substitute framing |
| ReadiLY reduces assessment to ~3 min/student | **Untested assumption** | Design target; the primary pilot metric |
| Teachers will trust and act on an automated score | **Untested assumption** | Informal conversations only, not a structured study; 10 interviews before Pitch Day |
| Scoring holds up in a noisy open-air classroom | **Untested assumption** | Headset, noise-floor check and familiarisation read designed; unproven |
| Schools will pay ₱150/learner | **Untested assumption** | Benchmarked against MOOE and competitor pricing; no signed LOI |
| Filipino ASR accuracy | **Not yet attempted** | Corpora identified; access agreements not yet in place |
| CRLA/Phil-IRI content licensing | **Known constraint, mitigation designed** | Original passages; formulas and band names are uncopyrightable |

**Principal risks.** *Execution* — no code written yet; the Year 1 plan and the funding ask exist to close exactly this gap, and the Pitch Day demo is the first checkpoint. *Market* — Microsoft is free and going nationwide; countered on output format, offline capability and privacy architecture (Section 8), but the window is finite. *Technical* — Filipino scoring is unavailable at MVP and classroom noise is unproven. *Legal* — child voice data is SPI; on-device processing, explicit parental consent and a processor-side Outsourcing Agreement. *Team* — two students covering engineering, product and sales; advisers before hires.

---

## 12. Social Impact & Conclusion

We will not claim a peso figure for literacy's effect on GDP; our research base does not support one at the precision a judge should demand.

What we can state is narrower and true. DepEd Order 45, s. 2002 — "No Read, No Pass" — and the ARAL Act make reading proficiency a gate on grade progression. Roughly half of Filipino children in Grades 1 to 3 are not reading at grade level. The instrument for finding them already exists and already works when acted on; it is failing because it costs a teacher a full working week a year to administer and encode. Give that week back, and it is spent teaching the children the assessment identified.

ReadiLY has not been validated in a classroom, and this plan says so throughout rather than once. What we ask Startup QC for is precise and achievable inside a cadetship timeline: ₱250,000, access to Quezon City schools, and the institutional credibility to secure a research permit faster than two undergraduates could alone. The next twelve months are about closing the gaps this document names — not pretending they are closed.

---

## References

World Bank (2024). *Philippines Learning Poverty Brief*, April 2024 v2.
Philippine Statistics Authority (2025). *2024 Functional Literacy, Education and Mass Media Survey.*
Department of Education. CRLA End-of-School-Year Report 2024–2025; QC CRLA Report 2025–2026.
EDCOM 2 (2026). *Turning Point:* Final Report and 10-Year Roadmap; *Fixing the Foundations* (2025).
Republic Act 12028 (ARAL Program Act) and DepEd Order 18, s. 2025; DepEd Memorandum 001, s. 2026.
Republic Act 12009 (New Government Procurement Act), IRR effective February 2025.
Republic Act 10173 (Data Privacy Act) and RA 10367; NPC Advisory Opinion 2025-017; NPC Circular 2022-04.
Republic Act 8293 §176 (government works); CRLA materials, CC BY-NC 4.0 (DepEd/USAID/RTI International).
DepEd Order 16, s. 2017 (Research Management); DO 40, s. 2012 (Child Protection); DO 40, s. 2015 (Partnerships); DO 15, s. 2017 (Training Cost Caps); DO 45, s. 2002.
Joint Circular No. 1, s. 2025 (DepEd/DBM/DILG/DOF) on the Special Education Fund.
DepEd (2025). Order ending mandatory Mother Tongue as medium of instruction for K–3, SY 2025–2026.
Department of Budget and Management (2026). FY2026 National Budget — DepEd allocation ₱1.015 trillion.
Microsoft Philippines / DepEd (2026). Nationwide Reading Progress rollout announcement, February 2026.
Internal research (ReadiLY team, 2026, `docs/research/`): *Technical Feasibility Assessment*; *Validation of Automated Oral Reading Fluency Systems*; *Legal and Compliance Assessment*; *The Landscape of AI-Powered Oral Reading Assessments*; *Architecting Offline-First Educational AI in the Philippines*; *Strategic Pathway for AI-Driven EdTech Integration in Philippine Public Schools*; *Systemic Realities of Early Grade Reading Assessments*; *Diagnostics and Dysfunctions: Teacher and Student Pain Points in Phil-IRI and CRLA*.
Startup QC session materials: EJ Arboleda (Taxumo), *Unit Economics and Working Capital Management*; Guita Gopalan, *From One Customer to a Real Market*; Abe Lozada (LaunchGarage), *Pitch Deck 101*.
Mentor feedback: Cody Flores, Startup QC one-on-one session, July 2026.

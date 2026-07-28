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

The assessments work — the Schools Division of Makati drove Grade 1 "Full Refresher" learners from 55.17% to 1.64% in three years by acting on this data. The problem is that the measurement consumes the instructional time the intervention needs.

**ReadiLY is an offline-first Android app that administers those exact assessments and produces the exact DepEd scoresheet.** A student reads into a tablet; an on-device recogniser returns words-correct-per-minute, accuracy and a per-word miscue map in under 30 seconds; the teacher gets the Phil-IRI level and CRLA profile and exports the record sheet already filled in. Three minutes instead of fifteen. No internet. No student audio ever leaves the device. We are not building another dashboard for teachers to maintain — we are removing work they are already required to do.

**What is actually new here.** Not "AI for reading" — Microsoft and Amira have that. Two things: a speech architecture deliberately chosen so it *cannot* flatter a struggling reader (Section 7), and an output that is the DepEd scoresheet itself rather than a vendor's dashboard.

**Where we are:** pre-revenue and pre-build. We hold a complete engineering specification, a selected and size-verified on-device model, 13 designed screens, and eight deep-research reports. We have not written production code and have not run a classroom pilot. Section 11 states precisely what is evidenced and what is not. **We commit to demonstrating a working assessment loop at Pitch Day on 3 September 2026.**

**What we are asking for:** the **₱100,000 grant**, which is enough on its own to reach a validated pilot, plus Startup QC's institutional access to SDO Quezon City. Break-even is **12 paying schools**. By Year 3 the plan reaches roughly **32,000 Grade 1–3 learners** and returns roughly **22,000 teacher-hours a year** to instruction.

---

## 3. Why Join Startup QC

**Quezon City has already named this problem and already has the budget line.**

The QC CRLA Report for 2025–2026 classifies **39.71% of QC learners as struggling readers**, and the QC School Action Plan 2025–2026 names automated remediation of learning gaps as a stated objective. Nationally, DepEd's own CRLA for end-of-school-year 2024–2025 found **48.76% of Grades 1–3 not reading at grade level**.

Our mentor's central advice was to stop looking for new money and find the programme that already has an appropriation. Three exist, and they converge:

- **The ARAL Program (RA 12028)**, guidelines under DO 18, s. 2025 — 6,713,352 learners, 447,537 tutors, progress monitoring mandated and reported via School Form 7 to the Division Office. Those tutors are largely para-teachers and pre-service teachers, who need standardised tooling more than licensed teachers do.
- **SEF Joint Circular No. 1, s. 2025**, which broadened the Special Education Fund to cover ARAL and mandates a six-year investment programme **driven by CRLA and Phil-IRI data**. QC's SEF was ₱2.36 billion in 2023, ~₱2.7 billion available for FY2026 — including an existing **₱2.98 million "Computer Software" line**.
- **The QC Education Affairs Unit**, which already funds comparable pilots through municipal channels rather than national procurement: Adarna House's *Handang Magbasa*/WIKAHON reached 300 Key Stage 1 teachers here, and Khan Academy Philippines operates in the city.

We are not asking Quezon City to invent a budget. We are asking to be judged against a line that already exists and must already be spent on CRLA/Phil-IRI-driven work.

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

*The encoding is a second, separate burden.* Results are transcribed into Excel scoresheets — passage level, total words, miscues, reading time to the second, comprehension scores across literal, inferential and critical questions — then uploaded to DepEd's assessment portal against a fixed deadline. One formula error or a failure to paste as values corrupts a whole class record, and **91.67% of surveyed teachers had fewer than 20 hours of CRLA training**.

*The predictable consequence.* Oral testing gets abbreviated, rushed or skipped, and scores are copy-pasted across forms to satisfy the reporting requirement. The data meant to target intervention becomes unreliable exactly where it matters most.

**The specific problem we solve:** can a teacher complete the assessment they are already required to give, in a fraction of the time, on a device the school already has, without internet, without new training, without sending any child's voice off the device — and get the DepEd form already filled in?

---

## 5. Goals & Objectives

**Phase 0 — Before Pitch Day (now – 3 Sep 2026).** Two things we can do without funding, and are doing: **10 structured teacher interviews** using the ten-question instrument already written in our research, and a **working demonstration of the record-score-report loop** to show on Pitch Day. The engineering plans are complete; what stands between us and a demo is build time, not unknowns.

**Phase 1 — Validate in a classroom (Sep 2026 – Feb 2027).** Harden the MVP against the specification in Section 7. Register the business. Secure an SDO Quezon City research permit. Run a free pilot in 1–3 QC public schools: 2–3 teachers, 100–150 students, 4 weeks.

Success is measured, not assumed: assessment time per student under 4 minutes including setup; 100% of a class assessed within one week versus partial manual sampling today; **teacher override rate below 10% of scored words**; and teacher-reported trust captured by post-pilot survey. One boundary on what this pilot can prove: with English-only auto-scoring at MVP, it validates the English half of a bilingual assessment — Filipino passages are recorded and teacher-reviewed but not scored until Phase 3.

**Phase 2 — First revenue (Mar – Aug 2027).** Convert to 8 paying private schools. Ship Phil-IRI Form 4/5 and CRLA class record sheet export. Publish a pilot results brief written for a Division Office audience.

**Phase 3 — Division and validation study (Sep 2027 – Aug 2028).** First paid division engagement. Begin the formal concordance study our own research defines as the credible bar: N = 300 students across three schools of differing type, double-blind rating by two trained DepEd reading coordinators with a third adjudicator for discrepancies over 2 WCPM, targeting **ICC > 0.85 for WCPM and weighted Cohen's Kappa > 0.80** for level classification. Begin Filipino ASR fine-tuning under academic data agreements.

---

## 6. Solution

**Positioning: ReadiLY is the digital layer for Phil-IRI and CRLA — not a parallel tool.**

This is deliberate, and it is the single most important decision in this plan. A tool that automates the reading test but leaves the teacher to encode the results is, in the words of our own research, *an exacerbation of their administrative burden*. The value is only unlocked when the statutory output comes out the other end.

### What it does

**The core loop.** The teacher selects a student and a grade-tagged passage. The student reads aloud. The app records locally and an on-device recogniser, aligned against the passage's known text, returns in under 30 seconds:

- **Words correct per minute** and **accuracy percentage**, using Phil-IRI's own formula
- **A per-word miscue map** — omission, substitution, insertion, self-correction — with a three-word lookahead so genuine self-corrections are not counted as errors, as Phil-IRI requires
- **Reading level** — Independent (97–100%), Instructional (90–96%), Frustration (≤89%) — and CRLA profile band

**Statutory form export — the feature that decides adoption.** Results do not stop at the teacher. Schools encode and submit CRLA, RMA, and Phil-IRI results through DepEd's national assessment portal at `bld.deped.gov.ph/submission`, against fixed deadlines each cycle. ReadiLY therefore exports to the **official scoresheet template that portal accepts**, already populated, so nothing is re-keyed. To be exact about the boundary: we produce the file, the teacher still uploads it. That is the step that turns ReadiLY from optional software into the path of least resistance — and it is in MVP scope, not deferred.

**The teacher overrules the machine.** Every miscue is shown as a tappable word, and the teacher can correct any judgement; the score recomputes and the session is stored as teacher-adjusted. This is not a concession — it is the design. A teacher who cannot overrule a score will not trust it, and a tool teachers do not trust is abandoned quietly. Override frequency also becomes our sharpest accuracy signal in the pilot: every correction is a labelled error, telling us exactly where the model fails.

**Teacher dashboard.** Class summary by band, assessment coverage bar, and a "needs attention" list. The flag is **rule-based and says so in the interface**: latest band is Frustration, or accuracy declining across the last three sessions, or bottom decile of class by WCPM. It is not a predictive model, because we cannot yet validate a predictive claim.

### What it deliberately does not do

**What we measure, and what we do not.** WCPM and accuracy are word-recognition measures, not comprehension. We say so plainly because the distinction matters: oral reading fluency correlates with comprehension at roughly r = 0.67–0.76 in the primary grades, which makes it a strong *screener* and a poor *substitute*. ReadiLY tells a teacher which children to look at closely. It does not tell them the child understood the passage, and the interface does not imply otherwise.

**Offline is the architecture, not a fallback.** Rosters, passages, recording, scoring, dashboard and export all work with zero connectivity; only score metadata syncs when a network appears, never audio. Cloud identity is reduced to initials plus Learner Reference Number, full names stay on the device, and the app is fully usable without an account. Dialect is handled the way Phil-IRI requires — it mandates that dialectal variation is not an error — via a normaliser that treats common Philippine-English substitutions (p/f, b/v, th/t) as correct by default, calibrable per division.

**Language scope, and why it is now a finite problem.** MVP auto-scoring is English-only; no on-device Filipino model fits our 200 MB budget today. This used to look unbounded, because the mother-tongue policy implied 19-plus languages. **It no longer is.** DepEd ended mandatory mother-tongue instruction for K–3 from SY 2025–2026, leaving Filipino and English. Nineteen languages was intractable; two is winnable. Filipino passages are recordable and reviewable now, with scoring labelled *coming soon* rather than silently missing.

**Deliberately out of scope for MVP:** comprehension scoring, predictive risk modelling, and a parent app — each a dated roadmap item, not a current capability.

**On intellectual property, and why we write our own passages.** CRLA materials are licensed CC BY-NC 4.0 by DepEd, USAID, and RTI International — commercial use is prohibited, and a bespoke licence is not realistically obtainable by a student team. Phil-IRI is a government work under RA 8293 §176, which requires prior approval for exploitation for profit. Our resolution follows the idea–expression dichotomy: the scoring formulas and band names are not copyrightable, so we map to those and author the passages ourselves.

That constraint turns out to improve the product. Phil-IRI ships **four parallel sets (A–D)** for pretest and posttest precisely so that a child re-assessed three times a year never reads the same text twice — otherwise part of the measured gain is familiarity rather than learning. We mirror that design: **24 original passages**, four parallel sets per grade per language, rotated across the beginning-, middle-, and end-of-year cycles. Equivalence is controlled the way Phil-IRI controls it — matched word count, vocabulary level, sentence complexity, and theme — and the passages are set in Filipino contexts children recognise: the sari-sari store, the jeepney, the fiesta. We will seek DepEd approval for form-format reproduction before any commercial deployment referencing Phil-IRI branding.

---

## 7. Feasibility

### Technical feasibility

**What exists today:** 13 designed screens; a complete seven-part engineering specification covering project scaffold, roster, passage library, recording, ASR and scoring, dashboard, and sync; a selected and size-verified model; and a specified scoring algorithm. **What does not exist yet: production code, and any classroom data.** We are not presenting design and specification as equivalent to a shipped product.

**The one technical decision that determines whether this works.** Most teams would reach for Whisper. We rejected it, and the reasoning is the core of our technical claim. Sequence-to-sequence models are trained to produce fluent, plausible text, so given a child who stumbles and misreads they **auto-correct the transcript** — silently converting a struggling reader into a proficient one. The score inflates precisely for the children the tool exists to find. For a diagnostic instrument that is not a quality issue; it is total failure.

We therefore use a **transducer architecture**, which emits tokens as it hears them and cannot invent words that were not spoken: `sherpa-onnx-zipformer-gigaspeech` INT8, **~69 MB on disk, ~200 MB peak RAM, real-time factor below 0.1** — inside the ~2 GB actually available to an app on a 4 GB Computerization Program tablet. Scoring uses Needleman-Wunsch alignment against the known passage, which gives the full backtrace per-word miscue classification needs.

**Acceptance criteria the build must pass** — targets, not results, and derived from the bands rather than chosen for convenience. A verbatim reading must score **at or above 97% accuracy**, because 97% is exactly the Independent threshold: at 96% the system would label a flawless reader as needing instruction, and a screener that generates false positives on fluent children will be switched off by the second week. Separately, a passage padded with unread text must register at least 8 of 10 unread words as omissions — the direct guard against the inflation failure above. The two criteria pull in opposite directions on purpose; passing both is what makes the score usable.

Automated scoring does not need to be perfect. Trained human raters agree with each other at Cohen's κ ≈ 0.81 — they disagree roughly one time in five — so the bar is human-level consistency, not infallibility. And unlike a human, the model is no less careful at student thirty-eight than at student one.

**The principal technical risk is Filipino.** Child speech raises word error rates 40–45% over adult baselines — children's fundamental frequency sits at 250–400 Hz against an adult female's ~200 Hz. The mitigation is data, and it exists: the Children's Filipino Speech Corpus (57 children, three hours of labelled reading miscues), BK3AT (122 hours, entirely Grades 1–3), UP-DSP-PLD (454 hours). Published results show **10 hours of child speech outperforms a baseline trained on 960 hours of adult speech**. Tractable, and scoped to Phase 3.

### Operational and legal feasibility

**Hardware — one device per teacher, not per child.** Devices stay teacher-held, matching how Computerization Program hardware is actually deployed (student-to-computer ratio is 1:9, and those machines are teacher-issued). A three-section school needs three devices, and because assessments are sequential even one shared device per grade level works. DepEd has distributed over 1.25 million devices to ~93% of public schools. Our critical-path diligence item, stated openly, is auditing the *working* inventory in target schools before committing to a division.

**Classroom acoustics — the validity risk nobody's marketing mentions.** Philippine classrooms are frequently open-air and loud, and Grade 1–3 children are unused to microphones; shyness alone can depress a score and misclassify a capable reader. We treat this as a measurement problem, not a nuisance: a ₱150 boom-mic headset in the onboarding kit, a pre-recording noise-floor check that warns when conditions are too poor to score, and a one-minute familiarisation read that is recorded but not scored. Whether that is sufficient is a named pilot question — and it is the reason teacher override exists.

**Getting paid — the step most student plans omit.** Two undergraduates cannot invoice a Schools Division Office. Before any paid engagement we must register (DTI now, SEC before a division contract), obtain BIR registration and official receipts, and enrol in PhilGEPS; Adopt-a-School donations additionally require a year of registered existence. This is precisely why Year 1 revenue comes from private schools, which can transact with a DTI-registered entity immediately, while the public pilot runs unpaid under a research permit. Registration is funded in the Year 1 base case.

**Procurement is genuinely favourable.** Under the New Government Procurement Act (RA 12009, IRR effective February 2025): **Direct Acquisition up to ₱200,000** requires no BAC approval and no canvassing, **Small Value Procurement up to ₱2,000,000** can now be awarded on a single valid quotation, and §37 permits direct procurement from a qualified startup business. Our school-tier pricing sits deliberately inside the Direct Acquisition threshold — a school head can buy ReadiLY without a bidding process.

**What deployment actually looks like.** A school goes from decision to data in under a week: we issue a quote with the procurement justification attached; the school head purchases under Direct Acquisition, no bidding; we deliver a one-hour train-the-trainer session on site and load the class rosters by CSV; the first class is assessed that same week; and the populated scoresheet is exported at the end of the quarter in time for the portal deadline. Nothing in that sequence requires connectivity, new hardware, or DepEd Central Office involvement.

**Training and the COA question.** Teacher onboarding is one hour, delivered train-the-trainer at the school. There is no new assessment to learn — ReadiLY administers the one teachers already run, which is the point of the positioning. Separately, school heads are historically cautious about charging recurring software to MOOE under COA scrutiny; our answer is that a Grades 1–3 licence is a diagnostic instrument tied to a mandated assessment and an ARAL-eligible SEF line item, procured under Direct Acquisition with a single quotation, and we supply the justification language with the quote.

**Continuity, because we are two students and buyers should ask.** Three commitments a procurement officer can hold us to: assessment data belongs to the school and exports to open CSV on demand, so no record is trapped in our system; the app keeps functioning offline through the paid term even if we stop shipping updates, because scoring runs on the device and needs no server; and support is next-business-day by phone and Viber during the school year, the channel Philippine teachers actually use.

**Data privacy, handled as a design constraint.** A child's voice is biometric personal information under RA 10173 and RA 10367, and the resulting assessment score is Sensitive Personal Information. On-device processing does not exempt us — the score is still SPI. Our compliance posture: audio never leaves the device; we operate as a data **processor** under a Schools Division Outsourcing Agreement, not an informal MOA; explicit written parental consent aligned to DepEd Order 40, s. 2012, with a non-digital alternative for families who decline; NPC registration and a designated DPO once we process SPI for 1,000-plus individuals; and a hard checkpoint in the app requiring the teacher to confirm a signed consent form is on file before the microphone can activate.

---

## 8. Market Analysis

### Why now

Four things changed in the last eighteen months, and together they define the window:

1. **Devices.** DepEd's FY2026 budget is ₱1.015 trillion — above 4% of GDP for the first time — and ₱10.6 billion of it goes to the Computerization Program. That line matters to us specifically: it is the tablet base ReadiLY runs on, and it is being funded now.
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

Our Year 3 revenue plan of ₱3.24M is **79% of our own stated SOM** — we are not assuming we exceed the market we can actually reach, and we leave room for the assumptions in Section 11 to come in worse than modelled.

### Competition, including the alternatives that are not companies

| Alternative | What it is | Why it does not close this gap |
|---|---|---|
| **The status quo** | Pen, stopwatch, Excel | Free, understood, and entrenched — our real competitor |
| **Microsoft Reading Progress** | Free in Teams; nationwide DepEd rollout announced Feb 2026 | See below |
| **Amira Learning** | US, r = 0.98–0.99, ~₱1,120/student/yr | Cloud-dependent; not Philippine-localised; priced for US districts |
| **SoapBox Labs** | Fully offline child-speech engine | No Philippine language support; licensed as a component, not a product |
| **Wadhwani AI (Vachan Samiksha)** | 30,000+ Indian government schools | Closest architecture to ours; not in the Philippines — evidence the model works at government scale |

**Microsoft is the serious threat and deserves a direct answer.** DepEd and Microsoft announced a nationwide Reading Progress rollout in February 2026, citing Bais City (60 schools, 14,000+ learners) and Cabanatuan. It is free, and Microsoft holds a national enterprise agreement we do not have. Our mentor's challenge was the right one: find out *why* these vendors cannot localise and go offline, because an obstacle only we can clear is a moat and anything else is just a head start.

The answer is that all four obstacles are structural rather than technical. **Architecturally**, Reading Progress is an Azure Speech call inside Teams; offline is not a configuration flag but a different product, and Microsoft's education business monetises exactly the cloud identity and licensing that an offline assessor bypasses. **Economically**, Filipino child read-aloud recognition requires labelled Filipino children's speech, which sits almost entirely in Philippine academic corpora reachable only through Philippine institutional agreements — and 6.4 million Grade 1–3 learners at Philippine price points is a rounding error against US district revenue, so the business case never clears. **Operationally**, it returns Microsoft's metrics rather than the DepEd scoresheet, so the teacher still re-keys before submitting to the portal. **Legally**, it needs a Microsoft 365 Education account per student, and provisioning identities for six-year-olds while routing their voice to a foreign cloud runs against RA 10173 and DICT Executive Order 119 residency rules.

None of those are things Microsoft cannot do. They are things Microsoft has no reason to do.

**"Why won't DepEd just build this itself?"** It has tried the adjacent thing and the result is the automated Excel scoresheet that teachers now fight with. DepEd builds forms and policy well; it procures software rather than engineering it, which is precisely why RA 12009 §37 exists to let agencies buy directly from startups. The risk is not that DepEd builds a competitor — it is that DepEd standardises on a free foreign tool before a compliant local one is ready. That is the clock we are running against.

**Where our moat actually is.** Not "offline" and not "AI" — those are attributes a competitor could copy. Two assets compound instead. The first is **the compliance workflow**: once a school's CRLA and Phil-IRI reporting runs through ReadiLY, the switching cost is not the software but the reporting process it has stopped doing by hand. The second is **the corpus** — a labelled Filipino children's oral-reading dataset is what decides who owns this category, and since ten hours of child speech beats 960 hours of adult speech, it is achievable at our scale.

Those two claims can conflict, so we are explicit: as a data processor we cannot repurpose school-controlled data for our own training. The corpus is therefore a separately negotiated, opt-in research contribution with its own consent and its own division agreement, and declining it changes nothing about the service a school receives. Where consent is not given we fall back on the academic corpora — CFSC, BK3AT, UP-DSP-PLD — under institutional agreements. A smaller lawful dataset beats an unenforceable claim.

Offline-first buys the time; the workflow and the corpus are what we build with it. And the engine generalises: it is a passage-aligned speech scorer, so the same core extends to Grades 4–6 Phil-IRI and to oral numeracy under ARAL's mathematics phase. We claim neither today — but ₱512M is the floor of this opportunity, not the ceiling.

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

**How we reach the first eight schools.** We have no warm private-school customer and will not imply otherwise. Two routes. The better one is the **PUP College of Education**, our own institution: its practicum programme places student teachers in partner schools every term, which means standing relationships with real Grades 1–3 classrooms and faculty who can vouch that we are not strangers. The second is cold — PEAC-participating and CEAP private schools, principals' associations, and the Facebook groups where Philippine teachers organise. Our working assumption is 60 qualified approaches → ~24 demonstrations → 8 closes, a 13% approach-to-close rate. That is an assumption, not an observation; it is flagged in Section 11 and it is the number the first ten interviews exist to test.

**Why a school renews.** Renewal lands once a year at the school-year boundary, not monthly, and the reason to renew is the reason to adopt: CRLA and Phil-IRI reporting now runs through ReadiLY, and reverting means returning to stopwatches and manual encoding mid-cycle. Inside an account, the expansion path is Grades 1–3 into Grades 4–6 Phil-IRI, roughly doubling licensed learners without a new sale.

### Unit economics

Contribution margin is **75%**, and the reason is architectural. On-device inference means the marginal cost of an assessment is **₱0** — cloud speech-to-text would cost ₱0.26–1.44 per audio hour, and a 100-school deployment generates 16,000 audio hours a year. Our variable costs are onboarding (₱5,250 per school, within DepEd Order 15, s. 2017 training caps) and support (~₱500 per school per year). Backend hosting is text-only and stays under ₱10,000 a month even at division scale.

**First Viable Market** — fixed operating cost ÷ contribution per customer: ₱250,000 ÷ ₱22,500 = **12 schools**. Twelve private schools in Metro Manila is a reachable target, not a market-share percentage.

**Why this scales rather than grows linearly.** Because inference runs on the device, serving the 100th school costs the same as the 10th: gross margin rises to roughly 84% at division scale, against under 76% for any cloud-dependent competitor. The same app that serves Quezon City serves any division in the country without new infrastructure — the constraint on growth is division relationships, not unit cost.

### Three-year projection

An average private school pays ~₱30,000 — about 200 Grade 1–3 learners at ₱150 — so the pricing table and the projection agree by construction.

| | Year 1 (SY26–27) | Year 2 | Year 3 |
|---|---|---|---|
| Private schools (cumulative) | 8 | 28 | 60 |
| Division contracts | 0 (1 unpaid pilot) | 1 | 2 |
| **Revenue** | ₱240,000 | ₱1,296,000 | ₱3,240,000 |
| Contribution (75%) | ₱180,000 | ₱972,000 | ₱2,430,000 |
| Fixed operating costs | ₱250,000 | ₱755,000 | ₱1,735,000 |
| **Net position** | **(₱70,000)** | **+₱217,000** | **+₱695,000** |

We model **two** division contracts by Year 3, not three. Each requires a research permit, a division champion, and two to six months of relationship-building; forecasting three would contradict what we say elsewhere about how slowly public procurement moves.

| Fixed costs | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Infrastructure and tooling | ₱30,000 | ₱40,000 | ₱60,000 |
| Device test fleet | ₱30,000 | — | — |
| Compliance, registration, DPO retainer | ₱60,000 | ₱60,000 | ₱50,000 |
| Passage authoring (24 passages) | ₱50,000 | — | — |
| Pilot and onboarding logistics | ₱80,000 | ₱90,000 | ₱90,000 |
| Support | — | ₱25,000 | ₱35,000 |
| Part-time education / B2G lead | — | ₱300,000 | ₱420,000 |
| Engineer | — | — | ₱480,000 |
| Founder stipends | — | ₱240,000 | ₱600,000 |
| **Total** | **₱250,000** | **₱755,000** | **₱1,735,000** |

Founder labour is unpaid in Year 1 — an implicit subsidy we name rather than hide.

**Retention and lifetime value, measured the way school contracts actually work.** Monthly churn benchmarks do not apply to an annual licence bought once a school year; the meaningful figure is the annual renewal rate. Assuming a three-year school relationship, lifetime value is ₱22,500 × 3 = **₱67,500**, which sets our CAC ceiling at ₱22,500 to hold the 3:1 ratio the Startup QC unit-economics session sets as the standard. We have no CAC yet and will not assert one; ₱22,500 is the number Year 1 has to come in under.

**Working capital is the real reason for the ask.** School licences are collected at the start of the school year, but passage authoring, compliance, devices, and onboarding are all spent before the first invoice goes out. The gap between those two events — not the ₱70,000 accounting loss — is what ₱250,000 funds. A plan that showed only the loss would be understating what it costs to reach the first collection.

### Funding ask — ₱100,000 base case, ₱250,000 to run at full pace

We are not going to present money we do not have as committed. The plan is built so that **the ₱100,000 Startup QC grant alone is sufficient to reach a validated pilot**, in strict priority order:

| Priority | Use | Grant-only (₱100,000) | Fully funded (₱250,000) |
|---|---|---|---|
| 1 | Authoring 24 original passages | ₱50,000 | ₱50,000 |
| 2 | Business registration and core DPA documents | ₱30,000 | ₱60,000 |
| 3 | Infrastructure, 12 months | ₱20,000 | ₱30,000 |
| 4 | Pilot and onboarding logistics | deferred | ₱80,000 |
| 5 | Device test fleet | deferred | ₱30,000 |
| | **Total** | **₱100,000** | **₱250,000** |

Passages come first because without them there is no lawful product; registration second because without it we cannot be paid.

**On the grant-only case, stated plainly.** With ₱100,000 we test on borrowed and personal devices and run a three-school pilot instead of nine, which puts Year 1 at roughly 4 paying schools and ₱120,000 revenue against ₱100,000 of costs — close to break-even, but it pushes meaningful growth a year out. The additional ₱150,000 we would seek from friends and family, the route our mentor identified as standard at this stage, is what buys the full nine-school pilot and the Year 2 numbers above. **We have not raised it and do not treat it as secured.**

---

## 10. Team Profile

**Why we are building this.** We did not come to this as education experts. One of us came to it knowing what it feels like to lose confidence in speaking. Through school I struggled to express myself in English, and that insecurity followed me into internship applications and interviews — rooms where communication counted as much as anything technical. Looking into why so many Filipino students carry the same thing, the answer was that it starts far earlier than anyone addresses it: children are not identified until they have already fallen behind, while their teachers spend their hours administering and encoding assessments instead of intervening. ReadiLY exists to close that gap at the point where it is still cheap to close — not to replace teachers, but to give them back the time to build in a six-year-old the confidence I wish someone had built in me.

That is also why the product looks the way it does. It measures reading *aloud*, because speaking is where the confidence is won or lost. And it optimises for returning teacher hours rather than for producing analytics, because the teacher is the intervention.

**Yhasmen Nogales — AI & Machine Learning Lead.** 1st Runner-Up, Agentic AI Hackathon 2025. Winner, DOST 7th iMake.WeMake.
**Caryl Joy A. Atienza — Full Stack & Product Development Lead.** 1st Runner-Up, BPI Datawave 2025.

Both are undergraduates at the Polytechnic University of the Philippines. Three national competition placements between us is the evidence we can ship under deadline pressure.

**Our one channel to the classroom today** is a family member who teaches in a public school and administers these assessments. That is where our understanding of the encoding burden comes from rather than from literature alone. To be clear about what it is and is not: it is direct access to a practising teacher and a candidate pilot-teacher champion. It is not a formal adviser, not a customer, and not a committed pilot site.

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
| CRLA takes 8–15 min/student/language; results submit via the DepEd portal | **Externally validated** | DepEd CRLA administration guidelines; `bld.deped.gov.ph/submission` |
| Interventions work when data is acted on | **Externally validated** | SDO Makati longitudinal 2022–25: Grade 1 Full Refresher 55.17% → 1.64% |
| Oral reading fluency predicts comprehension (r ≈ 0.67–0.76) | **Externally validated** | Primary-grade ORF literature; basis for screener-not-substitute framing |
| Automated ORF scoring can match human raters | **Validated for other systems, not ours** | Amira r = 0.98–0.99; SoapBox r = 0.96 |
| Transducer avoids score inflation; model fits a 4 GB tablet | **Internally analysed, not yet tested** | Specification and acceptance criteria defined; 69 MB / ~200 MB RAM; build not started |
| ReadiLY reduces assessment to ~3 min/student | **Untested assumption** | Design target; the primary pilot metric |
| Teachers will trust and act on an automated score | **Untested assumption** | Informal conversations only, not a structured study; 10 interviews before Pitch Day |
| Scoring holds up in a noisy open-air classroom | **Untested assumption** | Headset, noise-floor check and familiarisation read designed; unproven |
| Schools will pay ₱150/learner | **Untested assumption** | Benchmarked against MOOE and competitor pricing; no signed LOI |
| 13% approach-to-close rate on private schools | **Untested assumption** | Basis for the Year 1 target of 8 schools; no outreach run yet |
| Filipino ASR accuracy | **Not yet attempted** | Corpora identified; access agreements not in place |

**The risk we would flag first if we were reading this as a judge:** no code exists yet. Everything else in this plan is contingent on that changing, which is why the Pitch Day demo — not the pilot, not the grant — is the checkpoint we have put our name to.

---

## 12. Social Impact & Conclusion

We will not claim a peso figure for literacy's effect on GDP; our research base does not support one at the precision a judge should demand.

What we can state is narrower and true. DepEd Order 45, s. 2002 — "No Read, No Pass" — and the ARAL Act make reading proficiency a gate on grade progression. Roughly half of Filipino children in Grades 1 to 3 are not reading at grade level. The instrument for finding them already exists and already works when acted on; it is failing because it costs a teacher a full working week a year to administer and encode. Give that week back, and it is spent teaching the children the assessment identified.

ReadiLY has not been validated in a classroom, and this plan says so throughout rather than once. What we ask Startup QC for is precise and achievable inside a cadetship timeline: ₱100,000, access to Quezon City schools, and the institutional credibility to secure a research permit faster than two undergraduates could alone. The next twelve months are about closing the gaps this document names — not pretending they are closed.

Here is what success looks like, concretely enough to hold us to. A Grade 1 teacher in Quezon City opens the school year knowing every child's reading level in the **first week** rather than the sixth — and spends the five weeks she used to lose to testing on the children the test found. Every child identified in week one is a child who gets help while it is still cheap to give. That is the whole thesis: not that we can assess reading better than a teacher, but that we can give her back the time to do something about it.

---

## References

**Statistics.** World Bank (2024), *Philippines Learning Poverty Brief* Apr 2024 v2 · PSA (2025), *2024 FLEMMS* · DepEd CRLA End-of-School-Year Report 2024–2025 and QC CRLA Report 2025–2026 · EDCOM 2 (2026), *Turning Point* and *Fixing the Foundations* (2025) · DBM FY2026 National Budget.

**Law and policy.** RA 12028 (ARAL) with DO 18, s. 2025 and DM 001, s. 2026 · RA 12009 (New Government Procurement Act), IRR Feb 2025 · RA 10173 and RA 10367, with NPC Advisory Opinion 2025-017 and NPC Circular 2022-04 · RA 8293 §176; CRLA materials CC BY-NC 4.0 (DepEd/USAID/RTI) · DO 16, s. 2017; DO 40, s. 2012; DO 40, s. 2015; DO 15, s. 2017; DO 45, s. 2002 · Joint Circular No. 1, s. 2025 (SEF) · DepEd (2025) order ending mandatory Mother Tongue for K–3 · DepEd Bureau of Learning Delivery assessment submission portal, `bld.deped.gov.ph/submission`.

**Market.** Microsoft Philippines / DepEd (2026), nationwide Reading Progress rollout, February 2026 · Phil-IRI Manual (2018), parallel Sets A–D.

**Internal research** (ReadiLY team, 2026, `docs/research/`): Technical Feasibility Assessment · Validation of Automated Oral Reading Fluency Systems · Legal and Compliance Assessment · The Landscape of AI-Powered Oral Reading Assessments · Architecting Offline-First Educational AI in the Philippines · Strategic Pathway for AI-Driven EdTech Integration · Systemic Realities of Early Grade Reading Assessments · Diagnostics and Dysfunctions: Teacher and Student Pain Points in Phil-IRI and CRLA.

**Startup QC.** EJ Arboleda (Taxumo), *Unit Economics and Working Capital Management* · Guita Gopalan, *From One Customer to a Real Market* · Abe Lozada (LaunchGarage), *Pitch Deck 101* · Mentor feedback: Cody Flores, July 2026.

# ReadiLY

### A teacher loses one working week a year finding out which children cannot read. We give her that week back.

**Fifteen minutes per child becomes three. No internet needed. No child's voice ever leaves the tablet.**

**Team IKIYUH** · Polytechnic University of the Philippines · Startup QC 2026, Student Category, Squad 3
Yhasmen Nogales — Artificial Intelligence Lead · yhasmennogales04@gmail.com
Caryl Joy A. Atienza — App and Product Lead · carylatienzaa@gmail.com

**We ask for:** the ₱100,000 grant · an introduction to SDO Quezon City · help securing a research permit we cannot get alone. **We commit to:** a working app, demonstrated live on Pitch Day, 3 September 2026.

**The two tests this plan is about.** **CRLA** (Comprehensive Rapid Literacy Assessment) — every public school teacher in Grades 1–3 must sit with one child at a time, listen to them read aloud, and record the result. **Phil-IRI** (Philippine Informal Reading Inventory) — the same, more detailed, from Grade 3 up. Both are required by law, given three times a year, done one child at a time and timed by hand, and both end with the teacher typing every result into a government spreadsheet and uploading it before a deadline. We call them **the reading tests**; everything ReadiLY does serves them. We are not inventing a new one.

---

## 1. Executive Summary

A Grade 1 teacher in a Quezon City public school has forty children and a legal obligation to find out which of them cannot read. She does it the only way the law allows: one child at a time, out loud, stopwatch in hand, while the other thirty-nine wait. Eight to fifteen minutes each. In Grade 3, twice over — English and Filipino. Three times a year.

That is **forty hours: one full working week**, spent finding out rather than doing something about it. Then every score must be typed into a government spreadsheet and uploaded before a deadline.

So the week gets rationed. Testing gets shortened, rushed, or skipped for the children who take longest — who are the children it exists to find.

**Found early, those children change trajectory.** The Schools Division of Makati acted on exactly this data and cut its share of Grade 1 children needing the most intensive help from 55.17% to 1.64% in three years. Finding children early works. **The finding is what fails.**

**ReadiLY is an Android tablet app that gives those same two tests and produces the same government form.** The child reads aloud; thirty seconds later the teacher sees words-correct-per-minute, accuracy, and exactly which words were wrong and how. She corrects anything the app got wrong, then exports the government form already filled in. Fifteen minutes becomes three, with no internet, and the child's voice never leaves the tablet.

Speed is not the product. **Coverage is.** Three minutes per child turns *"assess a few when there's time"* into *"assess all forty in the first week."* We are not building another dashboard for teachers to maintain — we are giving back a week they are currently required to spend.

**What is new** is not "AI for reading"; Microsoft and Amira have that. Two things. We chose a speech technology that **cannot flatter a struggling reader** — most voice systems guess what you meant and tidy the transcript, quietly hiding the children we exist to find (Section 7). And what comes out is **the government's own form**, already filled in, not a vendor report the teacher copies by hand. That is the difference between software a school admires and software a school buys.

It need not be flawless: two trained human examiners scoring the same child disagree about one time in five, so matching a careful human is the bar. And unlike a human at the end of a long week, the app is no less careful with the thirty-eighth child than the first.

**Where we honestly are.** Pre-revenue and pre-build. We hold a complete engineering specification, a speech engine verified to fit a school tablet, thirteen designed screens, and eight research reports. **We have not written the working code, and we have not tested in a classroom.** The Pitch Day demonstration on 3 September 2026 — not the pilot, not the grant — is the checkpoint with our names on it.

**The ask.** ₱100,000, which alone reaches a tested pilot, plus institutional access to SDO Quezon City. We break even at **12 paying schools**. By Year 3 the plan reaches roughly **36,000 children** and returns about **25,000 teaching hours a year**.

---

## 2. Why We Built ReadiLY

We did not come to this as education experts. One of us came to it knowing what it costs to lose your voice.

Through school I struggled to express myself in English, and that insecurity followed me into internship applications and interviews — rooms where how you speak counts as much as what you know. So I went looking for where it starts. A child who cannot read is rarely missed because someone stopped caring. They are missed because the person who would have caught them was busy, that week, catching up on the other thirty-nine.

That is a solvable problem, and a narrow one. Not the reading — the *finding*. It is a workload and measurement problem, which means software can solve it, which happens to be what we know how to build.

**— Yhasmen Nogales**

That is why the product measures reading *aloud*, and why it returns hours rather than generating charts. We are not the thing that helps the child; we are the thing that finds the child in time for someone else to.

**What we have, and what we do not.** Our one direct line into a classroom is a family member who teaches in a public school and gives these tests herself — the source of our understanding of the paperwork, not only studies. Access to one honest teacher is not market validation and we do not treat it as such; that is what the interviews and pilot in Section 5 are for. What it gives us is a customer to check assumptions against before spending money on them.

---

## 3. Why Join Startup QC

Quezon City has already named this problem and already has the money. What it lacks is the tool.

DepEd's own 2024–2025 results found **48.76% of children in Grades 1–3 not reading at grade level**. Quezon City's report puts 39.71% of its learners in the struggling category, and the city's School Action Plan 2025–2026 names automating the closing of learning gaps as a stated goal.

Our mentor's advice was blunt: stop hunting new money, find the programme that already has an appropriation. Three exist, and they converge.

- **The ARAL Program** (RA 12028) — a national tutoring law covering 6,713,352 children and 447,537 tutors, progress monitoring required and reported to the Division Office. Most of those tutors are teaching assistants and student teachers, who need standard tooling *more* than licensed teachers do.
- **The Special Education Fund** — the local property-tax pool cities spend on schools. A 2025 joint circular expanded it to cover ARAL and requires each city to build a six-year investment plan **driven specifically by these two tests' results**. QC's fund was ₱2.36 billion in 2023, roughly ₱2.7 billion available for 2026 — including an existing ₱2.98 million "Computer Software" line.
- **The QC Education Affairs Unit** — already funds comparable pilots directly, without national procurement. Adarna House's *Handang Magbasa* reached 300 early-grade teachers here; Khan Academy Philippines operates in the city.

We are not asking Quezon City to invent a budget. We are asking to be measured against one that already exists and already must be spent on work driven by these tests.

**What we need from you:** an introduction, and the credibility with it, to SDO Quezon City — Superintendent Dr. Carleen S. Sedilla and Curriculum Chief Dr. Heidee F. Ferrer — because working in public schools requires a research permit, two to three months with institutional backing versus three to six without; continued mentorship on pricing and customer economics; and the **₱100,000 grant**, covering 40% of Year 1. We keep the equity.

---

## 4. The Problem

**What one assessment round costs.** Thirteen hours for a class of forty in two languages — which she cannot take in one block, so it stretches across weeks. The child who takes longest is the child who reads worst: he needs the full fifteen minutes, because she must wait through the silences, encourage him, and manage the embarrassment of reading badly aloud with classmates in the room. Then twice more, because the law requires three rounds a year.

| | By hand today | With ReadiLY |
|---|---|---|
| One child, one language | 8–15 minutes | about 3 minutes |
| One round, 40 children, 2 languages | about 13 hours | about 4 hours |
| Three rounds per school year | **about 40 hours** | about 12 hours |

Across a typical nine-teacher Grades 1–3 cohort that is roughly **360 hours a year spent testing, of which ReadiLY returns about 250** to teaching. **That is the opportunity stated as a cost the buyer already carries:** 250 recovered teacher-hours is worth more in salary terms than the licence we charge for them (Section 9), making this a budget reallocation rather than a new expense — and putting the decision with a principal rather than a national committee.

**Then the paperwork.** Passage, word count, every mistake, reading time to the second, comprehension scores — all typed into an official spreadsheet, then uploaded to the national portal before a fixed deadline. One broken formula corrupts a class record, and teachers are largely untrained: our research review found **91.67% of surveyed teachers had fewer than 20 hours of training** on the newer test (*Diagnostics and Dysfunctions*, ReadiLY internal research, 2026).

**So the week gets rationed, and the rationing has a pattern.** Rounds get shortened, scores get copied across forms, a teacher assesses the children she can and estimates the rest. **The child who reads slowest takes longest, so he is skipped first — and he most needed to be found.** That is a workload failure, not a policy one. The test is good; Makati proves what happens when schools act on it. The instrument works and the arithmetic defeats it.

**Why it is worth paying to solve.** A child who cannot read in Grade 1 is cheap to help; the same child in Grade 4 is not, having spent three years falling behind in every subject requiring reading. Under "No Read, No Pass" and the ARAL Act, reading gates grade progression — so a child found late becomes the school's problem too, in retention, remediation and reported performance.

The wider numbers describe the end of that process: the World Bank's learning poverty measure — ten-year-olds who cannot read and understand a simple story — put the Philippines at **91% as of 2022**, up from 69.5% in 2019, among the worst in East Asia and the Pacific; the PSA's 2024 survey found 70.8% functional literacy among Filipinos aged 10–64, from 59.3% in Zamboanga Peninsula to 81.2% in the Cordillera.

**Our question is narrow.** Can a teacher assess *every* child she must assess — in a fraction of the time, on a tablet her school already owns, with no internet, no new test to learn, no child's voice leaving the device — and get the government form back already filled in?

---

## 5. Goals & Objectives

We have deliberately set targets that can prove us wrong.

**Phase 0 — before Pitch Day (now to 3 Sep 2026).** Two things needing no money, both underway: **ten structured teacher interviews** using the script already in our research, and **a working demonstration** of record–score–report. The engineering plans are finished; what stands between us and a demo is build time, not open questions.

**Phase 1 — prove it in a classroom (Sep 2026 – Feb 2027).** Harden the app against Section 7's standards, register the business, secure the research permit, then run a **free pilot in one to three QC public schools**: two to three teachers, 100–150 children, four weeks.

| What we measure | Target |
|---|---|
| Time to assess one child, including setup | under 4 minutes |
| Share of a class assessed within one week | 100%, against partial sampling today |
| How often a teacher must correct the app | under 10% of scored words |
| Whether teachers trust it | post-pilot survey |

**The second row matters most.** Speed is only worth having if it becomes coverage; if we halve the time and teachers still sample, we have built a convenience, not a solution. **One honest limit:** at launch the app scores English only, so this validates the English half of a two-language test. Filipino passages are recorded and teacher-reviewed, not auto-scored until Phase 3.

**Phase 2 — first revenue (Mar – Aug 2027).** Convert to eight paying private schools, ship the remaining form exports, publish a short results brief written for a Division Office audience rather than for us.

**Phase 3 — first division deal and formal proof (Sep 2027 – Aug 2028).** Sign the first paid division contract and begin the accuracy study our research defines as the credible bar: 300 children across three types of school, every recording scored independently by two trained DepEd reading coordinators who cannot see each other's marks, with a third expert settling real disagreements. The targets require our word-per-minute figures to match the experts' almost exactly and our level judgements to match theirs in the overwhelming majority of cases. Also this phase: teaching the system to score Filipino, using university recordings under formal research agreements.

---

## 6. The Solution

**ReadiLY is a layer on top of the two tests that already exist. It is not a new test.** That is the most important decision here, and it comes from the problem: a tool that automates the reading but leaves the teacher to type up results has merely produced — in our own research's words — *an exacerbation of their administrative burden*. Half the week back is not the offer.

**What changes in her day.** She picks a child and a grade-matched passage. He reads aloud. The tablet records locally, compares what it heard against the text it knows he was given, and thirty seconds later shows the three things the government form asks for: **words correct per minute and accuracy**, on the government's own formula; **every mistake, labelled** — skipped, swapped, added, or self-corrected, with a three-word wait so a child who stumbles then fixes it is not penalised, exactly as the rules require; and **his reading level** — Independent (97–100%), Instructional (90–96%), Frustration (89% and below).

**The feature that decides whether schools buy.** Schools must submit results through DepEd's national portal against fixed deadlines, so ReadiLY exports **the official spreadsheet that portal accepts, already filled in**. Nothing is retyped. To be exact: we produce the file, the teacher uploads it. That step makes ReadiLY the easiest available path rather than one more thing to maintain, and it ships in the first release. It is honestly a *buying* argument; what the purchase buys is coverage.

**She can always overrule us.** Every flagged word is tappable; she changes any judgement, the score recalculates, the record saves as teacher-adjusted. Not hedging — design. A teacher who cannot overrule a score will not trust it, and a tool teachers do not trust is abandoned quietly. It also yields labelled errors showing exactly where our system was wrong, which in the pilot becomes our sharpest accuracy measure.

**Across the class** she sees a summary by reading level, a coverage bar, and a "needs attention" list. **The interface states this list is rules, not prediction** — flagged if his latest level is Frustration, accuracy has fallen across three sessions, or he is in the bottom tenth by speed. We do not claim to predict who will struggle later, because we cannot prove it, and an unprovable claim is one a teacher eventually catches us in.

**What we measure, and what we do not.** Speed and accuracy measure whether a child can *recognise words*, not whether he *understood*. Early-grade research consistently finds the two strongly related but far from identical: reading aloud well predicts comprehension reasonably and substitutes for it badly. ReadiLY tells a teacher which children to look at closely; it never implies a child understood what he read.

**Offline is not a feature — it is what makes the market addressable.** Class lists, passages, recording, scoring, dashboard and export all work in airplane mode; when a connection appears only scores sync, never audio. A cloud product can sell only into the minority of schools with reliable bandwidth; ours sells into any school with a working tablet, which per Section 7 is most of them. Even synced scores are stripped: the cloud sees initials and learner reference number, never a full name, and a school can use the app with no account. Philippine accents are handled as the rules demand — regional pronunciation is not an error, so *p*/*f*, *b*/*v*, *t*/*th* substitutions count as correct by default, tunable per division.

**Language scope, and why the problem shrank.** Auto-scoring is English-only at launch; no Filipino engine today is small enough for the memory a tablet can spare. This used to look unwinnable, because the mother-tongue policy implied nineteen-plus languages. **It no longer is** — DepEd ended compulsory mother-tongue teaching for K–3 from SY 2025–2026, leaving Filipino and English. Nineteen languages was hopeless; two is a roadmap.

**Deliberately not in the first release:** comprehension scoring, risk prediction, a parent app — each a dated roadmap item, not a claim. That scope is narrow as a business decision, not only a product one: a two-person pre-revenue team that ships four features badly has no reference customer; one that ships a single mandated workflow completely has a renewal.

---

## 7. Proof of Concept

**What exists:** thirteen designed screens; a complete seven-part engineering specification covering every component from class list to final export; a speech engine chosen and verified for size and speed; a specified scoring method. **What does not:** the working code, and any classroom data. We are not presenting plans as a product.

**The one decision that determines whether this works.** Most teams would reach for **Whisper**, OpenAI's popular free recogniser. We rejected it deliberately. Whisper produces fluent, sensible text — mumble at it and it guesses what you meant, then writes the clean version. Give it a child who stumbles, skips and misreads, and it repairs the transcript, turning a struggling reader into a proficient one on paper. **The score inflates for precisely the children the tool exists to find.** A system built to find struggling readers that instead hides them has not failed partially; it has failed completely. So we use a stricter recogniser that commits to each word as it hears it and **cannot invent a word that was not spoken**: `sherpa-onnx-zipformer-gigaspeech`, compressed for a phone-class processor.

| Measure | ReadiLY | Available on a government school tablet |
|---|---|---|
| Space on the tablet | about 69 MB | ample |
| Memory while running | about 200 MB | about 2 GB usable on a 4 GB tablet |
| Speed | faster than ten times real time | — |

To compare what the child said against what he was given we use a sequence-comparison method borrowed from genetics. It does not merely score how different two texts are — it identifies *exactly which word* was skipped, swapped or added, which is what a teacher needs to see and what a percentage alone can never give her.

**Two acceptance tests the build must pass before a classroom sees it** — targets, not results, taken from the official bands rather than from what would flatter us. **Do not fail a good reader:** a perfect word-for-word reading must score **97% or higher**, because 97 is exactly the top-level threshold; score a flawless child at 96% and the app labels him as needing instruction, and a tool that raises false alarms about strong readers is switched off in week two. **Do not rescue a weak one:** given a passage where ten words were never read, it must catch at least eight as omissions — the direct guard against the failure above. The two pull against each other on purpose; passing both is what makes the number trustworthy enough to act on.

**The biggest technical risk is Filipino.** Children's voices are harder for machines — pitch sits at 250–400 Hz against roughly 200 Hz for an adult woman, and speech systems make 40–45% more errors on children. The fix is data, and it exists here: the **Children's Filipino Speech Corpus** (57 children, three hours, reading mistakes labelled), **BK3AT** (122 hours, entirely Grades 1–3), **UP-DSP-PLD** (454 hours). And the requirement is smaller than it sounds — published results show **10 hours of children's speech beats a system trained on 960 hours of adult speech**. Tractable, and scoped to Phase 3.

**Why we write our own passages.** We cannot use the government's: the newer test's materials are licensed in a way that bars commercial use, and the older test is a government work whose commercial exploitation requires prior approval. Our solution rests on a basic copyright principle — you cannot copyright a *method*, only the words expressing it — so we follow the formulas and level names exactly and author the passages ourselves. The constraint improved the product: the official test ships **four parallel sets (A–D)** so a child tested three times a year never reads the same text twice, or part of his "improvement" is familiarity with the story. We mirror it exactly — **24 original passages**, four matched sets per grade per language, controlled for word count, vocabulary, sentence complexity and theme — set where Filipino children actually live: the sari-sari store, the jeepney, the fiesta. Two business consequences: the ₱50,000 authoring line is the price of a lawfully sellable product, which is why it is funded first; and the passages become an owned asset, localisation Amira and Microsoft would each have to redo. Before any commercial sale reproducing the official form layout we will seek DepEd approval.

**Hardware — one tablet per teacher, not per child.** This is the difference between an affordable idea and an impossible one. Devices stay teacher-held, matching how government hardware is actually distributed: roughly one per nine students, issued to teachers. A three-section school needs three tablets, and because children are tested sequentially even one shared tablet per grade level works. DepEd has distributed over 1.25 million devices to about 93% of public schools. **Our open question,** checked before committing to any division: how many still work in the schools we target.

**Classroom noise — the risk nobody else's marketing mentions.** Philippine classrooms are often open-air and loud, and six-year-olds are unused to microphones; a shy child can score lower than he should. That is our own failure mode from the opposite direction, so we treat it as measurement: a ₱150 boom-mic headset in the onboarding kit, a noise check that warns when conditions are too poor to score fairly, and a one-minute warm-up read that is recorded but never scored. Whether that suffices is a named pilot question — and part of why she can overrule us.

**Getting paid — the step most student plans skip.** Two undergraduates cannot invoice a Schools Division Office. Before any paid work we must register (sole proprietorship now, a corporation before any division contract), register for tax and issue official receipts, and enrol in the government's electronic procurement system; Adopt-a-School donations additionally require a year of registered existence. This is exactly why Year 1 revenue comes from **private** schools, which can transact with a simply-registered business immediately, while the public pilot runs unpaid under a research permit. Registration is funded in the Year 1 base case.

**Procurement is unusually favourable.** Under the 2025 procurement law: **Direct Acquisition up to ₱200,000** — the school just buys it, no bidding, no committee, no competing quotes; **Small Value Procurement up to ₱2,000,000** — a division purchase awarded on a single valid quotation; and **Section 37** — agencies may buy directly from qualified startups. Our per-school pricing sits deliberately below ₱200,000, so **a principal can buy ReadiLY without a bidding process** — the decision-maker and the person who feels the pain are the same person. **Deployment takes under a week:** we send a quote with the legal justification attached; the principal buys directly; we deliver a one-hour on-site train-the-trainer session and load class lists from a spreadsheet; the first class is assessed that week; the completed form is exported at term's end in time for the deadline. Nothing there needs internet, new hardware, or national office approval. **Training is one hour** because there is no new test to learn — which is why "we saved you a week" does not arrive with "but first spend three days learning this." On the **auditor question**, school heads are historically nervous about charging recurring software to their operating budget, so we supply written justification with every quote: a diagnostic instrument tied to a legally mandated test and an eligible national tutoring programme, bought under the direct-acquisition rule with a single quotation.

**Continuity, because we are two students and buyers should ask.** Three promises a school can hold us to: **the data is the school's**, exporting to a plain spreadsheet on demand, so nothing is trapped in our system; **the app keeps working even if we stop**, because scoring runs on the tablet and needs no server of ours; and **support is next-business-day** by phone and Viber during the school year, the channel Philippine teachers actually use.

**Privacy as a design constraint, not a policy page.** Under Philippine law a child's voice is biometric personal information and his score is *sensitive* personal information — the most protected category — and on-device processing does not exempt us. So: **audio never leaves the tablet**, not for processing and not for backup; **the school owns the data and we are only the processor**, under a formal written agreement with the division rather than an informal memorandum; **written parental consent is required**, following DepEd's own rules, with a non-digital alternative for families who decline; **we register with the National Privacy Commission and appoint a data protection officer** once we handle sensitive data for more than a thousand individuals; and **the app enforces it** — the microphone will not activate until the teacher confirms a signed consent form is on file. That last one is the test of whether a privacy commitment is real. Ours is code, not a paragraph.

---

## 8. Market Analysis

**Why now, and not three years ago.** Four things changed in eighteen months. **The tablets are being funded** — DepEd's 2026 budget is ₱1.015 trillion, above 4% of national output for the first time, with ₱10.6 billion for school computerisation: the exact hardware ReadiLY runs on, being bought now. **A new law needs precisely our output** — ARAL covers 6.7 million children and requires progress monitoring, and the 2025 education-fund circular requires cities to build six-year plans *driven by these two tests' results*. **Political attention** — EDCOM 2's *Turning Point* calls for resources moved to the earliest grades and an end to promoting children who cannot read. **The language problem collapsed** — compulsory mother-tongue teaching for the youngest grades ended in 2025–2026, turning a nineteen-language problem into a two-language one.

| Sizing, built bottom-up | Who that is | Children in Grades 1–3 | Worth per year |
|---|---|---|---|
| **Everyone who could use it** | Every Grade 1–3 child nationally — 5.9M public, 0.5M private | about 6.4M | about ₱512M |
| **Who we could realistically serve** | Urbanised divisions with tablets and active literacy programmes, plus private schools | about 900,000 | about ₱72M |
| **What we target in 36 months** | Quezon City at 30% coverage (~38,700) plus 60 private schools (~12,000) | about 50,700 | about ₱4.1M |

Quezon City is the largest school division in Metro Manila: **95 public elementary schools and 258,201 elementary children**, roughly 129,000 in Grades 1–3. The whole division is worth ₱7.7M a year at our division rate; we model 30% of it, ₱2.3M, plus ₱1.8M from private schools. **We deliberately do not forecast past what we just said we could reach** — Year 3 touches 36,000 of those 50,700 children (71%) and earns ₱3.24M of the ₱4.1M (79%).

| Alternative | What it is | Why it does not close this gap |
|---|---|---|
| **Doing nothing differently** | Pen, stopwatch, spreadsheet | Free, familiar, entrenched — our real competitor |
| **Microsoft Reading Progress** | Free inside Teams; nationwide DepEd rollout announced Feb 2026 | See below |
| **Amira Learning** | US product, extremely accurate, about ₱1,120 per child per year | Needs constant internet; not localised; priced for American districts |
| **SoapBox Labs** | A genuinely offline children's speech engine | No Philippine language support; sold as a component, not a product |
| **Wadhwani AI** | Same idea, in 30,000+ Indian government schools | Not in the Philippines — and proof the approach works at government scale |

**Microsoft is the serious threat and deserves a straight answer.** In February 2026 DepEd and Microsoft announced a nationwide Reading Progress rollout, citing Bais City (60 schools, 14,000+ children) and Cabanatuan. It is free, and Microsoft has a national agreement we do not. Our mentor asked the right question: *why* can these companies not simply go offline and localise? An obstacle only we can clear is an advantage; anything else is a head start. All four are structural, not technical.

- **Technically,** Reading Progress sends audio to Microsoft's cloud from inside Teams. Offline is a different product, not a setting — and Microsoft's education business earns from exactly the cloud accounts an offline tool bypasses.
- **Financially,** recognising Filipino children reading aloud requires recordings of Filipino children reading aloud, almost all held in Philippine university archives reachable only through Philippine institutional agreements. And 6.4 million Filipino children at Philippine prices is a rounding error beside US district revenue.
- **Practically,** it hands the teacher Microsoft's report, not the government's form. She still retypes everything; the week comes back half-returned.
- **Legally,** it needs a Microsoft account per child. Creating cloud identities for six-year-olds and routing their voices abroad runs against Philippine data privacy law and government data-residency rules.

**None of this is something Microsoft could not do. It is something Microsoft has no reason to do.**

**"Why doesn't the government just build it?"** It tried the nearest thing, and the result is the automatic spreadsheet teachers currently fight with. DepEd designs tests and writes policy well; it buys software rather than engineering it, which is precisely why the new procurement law lets agencies purchase directly from startups. So the risk is not that DepEd builds a competitor — **it is that DepEd standardises on a free foreign tool before a compliant local one is ready.** That is the clock we run against, and why we ask for a permit rather than for time.

**Where our advantage lies.** Not "offline" and not "AI" — features a competitor could copy in a year. Two things compound. **The workflow becomes ours:** once a school's official reporting runs through ReadiLY, the cost of leaving is not the software but going back to doing the paperwork by hand, mid-year. **The recordings become ours:** a labelled archive of Filipino children reading aloud decides who owns this category, and because ten hours of children's speech beats 960 hours of adult speech, it is achievable at our size. Those ambitions can conflict, so we state the rule: as the school's data processor we cannot quietly reuse their children's recordings for training. The research archive is a *separate*, opt-in agreement with its own consent process, and a school that declines gets identical service; where consent is not given we fall back on the university archives under formal research agreements. A smaller lawful dataset beats a larger unenforceable claim.

The engine also generalises — it compares spoken words against a known text, so the same core extends to Grades 4–6 Phil-IRI and to oral numeracy under ARAL's mathematics phase. We claim neither today, but ₱512M is the floor of this opportunity, not the ceiling.

---

## 9. Business Model

| Tier | Price | Minimum | Who it is for |
|---|---|---|---|
| **Per school** | ₱150 per Grade 1–3 child per year | ₱25,000 per school | Private schools — how we start |
| **Per division** | ₱60 per Grade 1–3 child per year | 5,000 children (₱300,000) | City-funded divisions — how we scale |

Three checks on that price. **Against the school's budget:** a public elementary school of 500 children, roughly 250 in Grades 1–3, pays about ₱37,500 a year — 2.7% of its annual operating budget. **Against the purchasing rules:** ₱37,500 sits under the ₱200,000 direct-purchase ceiling, so the principal decides. **Against competitors:** seven times cheaper than Amira at school pricing, nearly nineteen times cheaper at division pricing, an order of magnitude below Quipper (₱4,000–10,000 per child per year). And on salary cost alone, the ~250 teacher-hours a nine-teacher school recovers is worth more than the licence — the difference being that the licence is an expense and the hours come back as teaching.

**Go-to-market: private schools first.** Our mentor was direct that a business dependent on government sales is a mistake and that private schools decide faster. So private schools are the revenue; the QC public pilot runs alongside for proof and credibility, not Year 1 income; division sales follow, backed by published pilot results and funded from Section 3's budget lines. **Reaching the first eight:** we have no warm customer and will not pretend otherwise. The better route is our own university's College of Education, whose practicum programme places student teachers in partner schools every term — existing relationships with real Grades 1–3 classrooms and faculty who can confirm we are not strangers. The second is cold: private school associations, principals' groups, and the Facebook groups where Philippine teachers organise. Our working assumption is 60 serious approaches → ~24 demonstrations → 8 sales, a **13% conversion rate** — an assumption rather than an observation, and exactly what the first ten interviews exist to test. **Why a school renews:** renewal lands once a year at the school-year boundary, and the reason to renew is the reason to buy — official reporting now runs through ReadiLY, and reverting means stopwatches and manual typing mid-cycle. Inside a school the natural expansion is Grades 1–3 into Grades 4–6, roughly doubling the licence without a new sale.

**Unit economics.** **One more assessment costs us nothing**, because speech processing happens on the tablet rather than on rented servers. For scale: cloud speech processing runs ₱0.26–1.44 per audio hour and a hundred-school deployment generates 16,000 hours a year — that entire cost line is zero for us, so the architectural decision that keeps the app working in an open-air classroom also removes our largest variable cost. Real per-school costs are training and setup (₱5,250, within the government's own training caps) and support (~₱500 per school per year); our servers handle text only and stay under ₱10,000 a month even at division scale. **Those costs imply we keep 81 centavos of every peso; we model 75** to absorb extra support calls, second training visits and early payment friction. **₱22,500 kept per school per year** is the figure everything below is built on. One clarification, because two lines look similar: the ₱5,250 applies to *paying* schools, while "pilot and onboarding logistics" below funds the free public pilot, travel, headsets and materials, which earn nothing. **We break even at 12 schools:** ₱250,000 fixed annual costs ÷ ₱22,500 per school — a countable target, not a market-share percentage. **And it scales rather than merely grows:** because processing runs on the device, the hundredth school costs what the tenth did, so margin rises to roughly 84% at division scale against under 76% for anyone cloud-dependent. What limits us is relationships, not cost.

An average private school pays about ₱30,000 — roughly 200 Grade 1–3 children at ₱150 — so the price list and the forecast agree by construction. Each modelled division contract covers about 12,000 children at ₱60, or ₱720,000.

| | Year 1 (2026–27) | Year 2 | Year 3 |
|---|---|---|---|
| Private schools (running total) | 8 | 28 | 60 |
| Division contracts (running total) | 0 (1 free pilot) | 1 | 2 |
| Children reached | ~1,600 | ~13,600 | **~36,000** |
| **Revenue** | ₱240,000 | ₱1,296,000 | ₱3,240,000 |
| Kept after direct costs (75%) | ₱180,000 | ₱972,000 | ₱2,430,000 |
| Fixed running costs | ₱250,000 | ₱755,000 | ₱1,735,000 |
| **Profit / (loss)** | **(₱70,000)** | **+₱217,000** | **+₱695,000** |

We model **two** division contracts by Year 3, not three: each needs a research permit, an internal champion, and two to six months of relationship-building, and forecasting three would contradict everything else we say about how slowly government moves.

| Where the fixed costs go | Year 1 | Year 2 | Year 3 |
|---|---|---|---|
| Servers and development tools | ₱30,000 | ₱40,000 | ₱60,000 |
| Test tablets | ₱30,000 | — | — |
| Legal registration, privacy compliance, data protection officer | ₱60,000 | ₱60,000 | ₱50,000 |
| Writing the 24 reading passages | ₱50,000 | — | — |
| Pilot and school setup logistics | ₱80,000 | ₱90,000 | ₱90,000 |
| Customer support | — | ₱25,000 | ₱35,000 |
| Part-time education and government-sales lead | — | ₱300,000 | ₱420,000 |
| Engineer | — | — | ₱480,000 |
| Founder salaries | — | ₱240,000 | ₱600,000 |
| **Total** | **₱250,000** | **₱755,000** | **₱1,735,000** |

Note the last line: **we pay ourselves nothing in Year 1.** A real subsidy, which we would rather name than hide.

**What a customer is worth.** Monthly cancellation rates do not apply — a school buys once a school year, so what matters is annual renewal. Assuming a three-year relationship, each school is worth **₱67,500** in retained revenue (₱22,500 × 3). The widely used rule is that a customer should be worth at least three times what it costs to win them, putting our ceiling at ₱22,500. We do not yet know what winning a school actually costs and will not invent a figure; ₱22,500 is the number Year 1 must come in under.

**Why we need money at all, given a ₱70,000 loss.** Schools pay at the *start* of the school year, but passages, registration, test tablets and pilot setup are spent *before* the first invoice. **The gap between money going out and money coming in — not the ₱70,000 loss — is what the ₱250,000 funds.**

**The ask: ₱100,000 is enough; ₱250,000 lets us run at full speed.** We will not present money we do not have as committed. The plan is built so **the grant alone reaches a tested pilot**, spent in strict priority order.

| Priority | What it buys | Grant only (₱100,000) | Fully funded (₱250,000) |
|---|---|---|---|
| 1 | Writing the 24 original reading passages | ₱50,000 | ₱50,000 |
| 2 | Business registration and privacy documents | ₱30,000 | ₱60,000 |
| 3 | Servers and tools, 12 months | ₱20,000 | ₱30,000 |
| 4 | Pilot and school setup logistics | deferred | ₱80,000 |
| 5 | Test tablets | deferred | ₱30,000 |
| | **Total** | **₱100,000** | **₱250,000** |

Passages first, because without them there is no product we can lawfully sell; registration second, because without it nobody can pay us. **The honest grant-only case:** with ₱100,000 we test on borrowed and personal tablets and run a **single-school pilot** instead of three, putting Year 1 at roughly four paying schools and ₱120,000 revenue against ₱100,000 of costs — near break-even, but real growth pushed out a year. The extra ₱150,000 we would raise from friends and family, the route our mentor identified as normal at this stage, buys the full three-school pilot and the Year 2 figures above. **We have not raised it, and we do not treat it as secured.**

---

## 10. The Team

Two founders, two halves of one problem. Both undergraduates at the Polytechnic University of the Philippines, graduating in 2027.

**Yhasmen Nogales — Artificial Intelligence Lead.** *1st Runner-Up, Agentic AI Hackathon 2025 · Winner, DOST 7th iMake.WeMake.* Owns the voice: choosing the speech engine and proving it fits a school tablet, the scoring and mistake-detection logic, handling Philippine accents fairly, and the Phase 3 work of teaching the system Filipino. The central decision in Section 7 — rejecting the popular recogniser for a stricter one, so no struggling reader is ever scored as fluent — is hers to defend and hers to prove against the two acceptance tests.

**Caryl Joy A. Atienza — App and Product Lead.** *1st Runner-Up, BPI Datawave 2025.* Owns everything the teacher touches: the thirteen designed screens, making the whole app work without internet, the correction interface, and the government form export that Section 6 identifies as the feature deciding adoption. Also owns getting schools set up and the relationship with them afterwards.

Three national competition placements between us is real evidence we can build and ship under deadline pressure. **It is not evidence we can sell to a government office, and we will not present it as though it were.**

**What we are missing, and the order we fix it.** Our mentor was clear that our limiting factor is not engineering: *"it's really the education domain expert / B2G sales expert, mainly because the tech development will naturally follow once you've invested into understanding the market."* We accept that ordering, which is why this list starts with people and not features. **(1) An education expert with real DepEd classroom experience** — our first advisory priority, brought in before the pilot begins, recruited through Startup QC mentorship and through the pilot teachers themselves, who double as expert validation. **(2) Someone who knows government sales and has division relationships** — the mentor's warning was blunt: government adoption does not happen without an insider willing to vouch for you, so identifying that person inside SDO QC is a named Phase 1 objective, not a wish. **(3) Deeper speech-technology expertise** — addressed through academic partnership with UP Diliman's speech laboratory and De La Salle University, who hold the Filipino children's recordings Phase 3 depends on. **We have not yet engaged a named education adviser, and we are not claiming otherwise.**

**On whether we will still be here in two years.** Both of us graduate in 2027, and ReadiLY is not a class project we intend to shelve at graduation. The Year 2 plan puts us on salaries and hires our first employee — the point at which this stops being our thesis and becomes our job. We would rather state that intention now and be held to it.

---

## 11. Conclusion

We will not put a peso figure on what literacy does for the economy; our research does not support that at the precision you should demand of us. What we can say is narrower, and true.

Philippine policy makes reading a gate on moving up a grade. Roughly half of Filipino children in Grades 1–3 are not reading at their level. The instrument for finding them already exists and already works when schools act on it — Makati proved that. It is failing for one reason: it costs a teacher a full working week each year to give and to encode, so it gets rationed, and the child who reads slowest is the first one cut.

**Give that week back, and it gets spent on the children the test just found.**

ReadiLY has not been proven in a classroom, and this plan says so plainly rather than burying it. What we ask of Startup QC is specific and achievable inside your programme: ₱100,000, access to Quezon City schools, and the institutional credibility to secure a research permit faster than two undergraduates could alone. The next twelve months are about closing the gaps this document names — not pretending they are already closed.

Here is what success looks like, concrete enough to hold us to. A Grade 1 teacher in Quezon City knows all forty of her children's reading levels in the first week of school. Not a sample — all forty, including the boy who reads slowest, who in any other year would have been quietly skipped because he takes fifteen minutes and there are thirty-nine others waiting. She spends the five weeks she used to lose on the children the testing found.

Twelve schools makes that business sustainable. Sixty schools and two divisions makes it profitable, on the numbers in Section 9. Neither requires us to be right about anything we have not already told you we still have to prove.

**We are not the ones who teach him to read. We are the ones who make sure his teacher knows, in September, that he cannot.**

---

## References

**Statistics.** World Bank (2024), *Philippines Learning Poverty Brief*, Apr 2024 v2 · PSA (2025), *2024 FLEMMS* · DepEd CRLA End-of-School-Year Report 2024–2025 and QC CRLA Report 2025–2026 · EDCOM 2 (2026), *Turning Point*, and *Fixing the Foundations* (2025) · DBM, FY2026 National Budget.

**Law and policy.** RA 12028 (ARAL) with DO 18, s. 2025 and DM 001, s. 2026 · RA 12009 (New Government Procurement Act), IRR Feb 2025 · RA 10173 and RA 10367, with NPC Advisory Opinion 2025-017 and NPC Circular 2022-04 · RA 8293 §176; CRLA materials CC BY-NC 4.0 (DepEd/USAID/RTI) · DO 16, s. 2017; DO 40, s. 2012; DO 40, s. 2015; DO 15, s. 2017; DO 45, s. 2002 · Joint Circular No. 1, s. 2025 (SEF) · DepEd (2025) order ending mandatory Mother Tongue for K–3 · DepEd submission portal, `bld.deped.gov.ph/submission`.

**Market.** Microsoft Philippines / DepEd (2026), nationwide Reading Progress rollout, February 2026 · Phil-IRI Manual (2018), parallel Sets A–D.

**Internal research** (ReadiLY team, 2026, `docs/research/`): Technical Feasibility Assessment · Validation of Automated Oral Reading Fluency Systems · Legal and Compliance Assessment · The Landscape of AI-Powered Oral Reading Assessments · Architecting Offline-First Educational AI in the Philippines · Strategic Pathway for AI-Driven EdTech Integration · Systemic Realities of Early Grade Reading Assessments · Diagnostics and Dysfunctions: Teacher and Student Pain Points in Phil-IRI and CRLA.

**Startup QC.** EJ Arboleda (Taxumo), *Unit Economics and Working Capital Management* · Guita Gopalan, *From One Customer to a Real Market* · Abe Lozada (LaunchGarage), *Pitch Deck 101* · Mentor feedback: Cody Flores, July 2026.

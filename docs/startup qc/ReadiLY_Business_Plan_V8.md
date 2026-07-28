# ReadiLY

### A teacher loses one working week a year finding out which children cannot read. We give her that week back.

**Fifteen minutes per child becomes three. No internet needed. No child's voice ever leaves the tablet.**

---

**Team IKIYUH**
Yhasmen Nogales — Artificial Intelligence Lead · yhasmennogales04@gmail.com
Caryl Joy A. Atienza — App and Product Lead · carylatienzaa@gmail.com

Polytechnic University of the Philippines
Startup QC 2026 — Student Category, Squad 3

**What we ask for:** the ₱100,000 grant · an introduction to the Quezon City Schools Division · help getting a permit we cannot get alone
**What we commit to:** a working version of the app, demonstrated live on Pitch Day, 3 September 2026

---

## The two tests this plan is about

Two reading tests run through this entire document. We define them once, here, then use plain names.

**CRLA** — the Comprehensive Rapid Literacy Assessment. Every public school teacher in Grades 1 to 3 must give it. She sits with one child at a time, listens to that child read aloud, and records how they did.

**Phil-IRI** — the Philippine Informal Reading Inventory. Same idea, more detailed, used from Grade 3 up.

Both are required by law. Both happen three times a year. Both are done one child at a time, out loud, timed by hand. And both end with the teacher typing every result into a government spreadsheet and uploading it before a deadline.

We call them **the reading tests**. Everything ReadiLY does serves those tests. We are not inventing a new one.

---

## Contents

1. Executive Summary
2. Why We Built ReadiLY
3. Why Join Startup QC
4. The Problem
5. Goals & Objectives
6. The Solution
7. Proof of Concept
8. Market Analysis
9. Business Model
10. The Team
11. Conclusion

---

## 1. Executive Summary

A Grade 1 teacher in a Quezon City public school has forty children and a legal obligation to find out which of them cannot read.

She does it the only way the law allows: one child at a time, out loud, stopwatch in hand, while the other thirty-nine wait. Eight to fifteen minutes each. In Grade 3, twice over — once in English, once in Filipino. Three times a year.

That is **forty hours. One full working week**, spent finding out something, rather than doing something about it. And she is not finished when the reading stops: every score has to be typed into a government spreadsheet and uploaded before a deadline.

So the week gets rationed. Testing gets shortened, or rushed, or quietly skipped for the children who take longest — who are, of course, the children it exists to find.

**When those children are found early, everything changes.** The Schools Division of Makati acted on exactly this data and cut its share of Grade 1 children needing the most intensive help from 55.17% to 1.64% in three years. Finding children early works. **The finding is what fails.**

### What ReadiLY does

ReadiLY is an Android tablet app that gives those same two tests and produces the same government form at the end.

The child reads aloud into the tablet. Thirty seconds later the teacher sees how many words the child read correctly per minute, their accuracy, and exactly which words they got wrong and how. She can correct anything the app got wrong. Then she exports the government form, already filled in.

Fifteen minutes becomes three. It works with no internet at all. And the child's recorded voice never leaves the tablet.

Speed is not the product. **Coverage is.** Three minutes per child is what turns *"assess a few of them when there's time"* into *"assess all forty in the first week of school."*

We are not building another dashboard for teachers to maintain. We are giving back a week they are currently required to spend.

### What is genuinely new here

Not "AI for reading." Microsoft and a US company called Amira already do that. Two things.

**We chose a speech technology that cannot flatter a struggling reader.** Most modern voice systems are built to guess what you *meant* and tidy up the transcript. Helpful for dictation, disastrous for a reading test: it quietly turns a struggling child into one who sounds fine, hiding the very children we exist to find. We use a stricter approach that can only write down what it actually heard. Section 7 explains how.

**What comes out the other end is the government's own form**, already filled in — not a vendor's report the teacher then copies across by hand. That is the difference between software a school admires and software a school buys.

The app does not need to be flawless. Two trained human examiners scoring the same child disagree about one time in five. Matching a careful human is the bar, not perfection. And unlike a human at the end of a long week, the app is no less careful with the thirty-eighth child than the first.

### Where we honestly are

Pre-revenue and pre-build. We have a complete engineering plan, a speech engine chosen and verified to fit a school tablet, thirteen designed screens, and eight in-depth research reports.

**We have not written the working code, and we have not tested in a classroom.** We commit to demonstrating a working version at Pitch Day on **3 September 2026** — not the pilot, not the grant. That is the checkpoint with our names on it.

### What we ask for

The ₱100,000 grant, which alone is enough to reach a tested pilot, plus Startup QC's institutional access to the Quezon City Schools Division.

We break even at **12 paying schools**. By Year 3 the plan reaches roughly **36,000 children** and returns about **25,000 teaching hours a year** — the same week, multiplied across nine hundred classrooms.

---

## 2. Why We Built ReadiLY

We did not come to this as education experts. One of us came to it knowing what it costs to lose your voice.

Through school I struggled to express myself in English. That insecurity followed me into internship applications and interviews — rooms where how you speak counts as much as anything you know.

So I went looking for where it starts. A child who cannot read is not usually missed because anyone stopped caring. They are missed because the person who would have caught them was busy, that week, catching up on the other thirty-nine.

That is a solvable problem, and a narrow one. Not the reading — the *finding*. It is a workload and measurement problem, which means it is solvable with software, which happens to be what we know how to build.

**— Yhasmen Nogales**

That is why the product looks the way it does. It measures reading *aloud*, because speaking is where confidence is won or lost. And it is built to return hours rather than to generate charts, because we are not the thing that helps the child. We are the thing that finds the child in time for someone else to.

**What we have, and what we do not.** Our one direct line into a classroom is a family member who teaches in a public school and gives these tests herself. That is where our understanding of the paperwork comes from — not only from studies. To be precise: she is a practising teacher we can ask questions, and a possible first pilot teacher. She is not a formal adviser, not a customer, and not a committed pilot site.

Access to one honest teacher is not market validation, and we do not treat it as such — that is what the ten structured interviews and the classroom pilot in Section 5 are for. What it does give us is a customer we can check our assumptions against before we spend money on them.

---

## 3. Why Join Startup QC

Quezon City has already named this problem and already has the money. What it does not have is the tool.

Nationally, the Department of Education's own 2024–2025 results found **48.76% of children in Grades 1 to 3 not reading at grade level.** Nearly half. Quezon City's own report puts 39.71% of its learners in the struggling category, and the city's School Action Plan for 2025–2026 lists automating the closing of learning gaps as a stated goal.

Our mentor's advice was blunt: stop hunting for new money and find the programme that already has an appropriation. Three exist, and they converge.

**The ARAL Program.** A national tutoring law (Republic Act 12028) covering 6,713,352 children and 447,537 tutors, with progress monitoring required and reported up to the Division Office. Most of those tutors are not licensed teachers — they are teaching assistants and student teachers, who need standard tooling *more* than licensed teachers do, not less.

**The Special Education Fund.** The pool of local property-tax money Philippine cities spend on schools. A 2025 joint circular expanded it to cover ARAL and requires each city to build a six-year investment plan **driven specifically by the results of these two reading tests**. Quezon City's fund was ₱2.36 billion in 2023, with roughly ₱2.7 billion available for 2026 — including an existing ₱2.98 million line labelled "Computer Software."

**The QC Education Affairs Unit.** The city already funds comparable pilots directly, without national procurement. Adarna House's *Handang Magbasa* reached 300 early-grade teachers here. Khan Academy Philippines operates in the city.

We are not asking Quezon City to invent a budget. We are asking to be measured against one that already exists and already has to be spent on work driven by these tests.

**What we need from you, specifically:**

1. **An introduction, and the credibility that comes with it,** to the Quezon City Schools Division — Superintendent Dr. Carleen S. Sedilla and Curriculum Chief Dr. Heidee F. Ferrer. Working in public schools requires a research permit. With institutional backing: two to three months. Without: three to six.
2. **Continued mentorship** on pricing and customer economics.
3. **The ₱100,000 grant**, covering 40% of Year 1. We keep the equity.

The rest of this plan is about what that week is worth, and why nobody has taken it back yet.

---

## 4. The Problem

### What an assessment round actually looks like

Start with the teacher, because the whole problem lives in her calendar.

Thirteen hours. That is one round of testing for a class of forty in two languages. She cannot take thirteen hours in one block, so it stretches across weeks — a few children pulled aside each session while the rest of the class is given something to do.

The child who takes longest is the child who reads worst. He needs the full fifteen minutes, because she has to wait through the silences, encourage him, and manage the embarrassment of reading badly out loud with classmates in the room. Meanwhile there are thirty-nine others, and a deadline.

Then she does it twice more, because the law says three rounds a year.

**Forty hours. One working week.** And that is only the first of the two tests, before a single number has been typed anywhere.

| | By hand today | With ReadiLY |
|---|---|---|
| One child, one language | 8–15 minutes | about 3 minutes |
| One round, 40 children, 2 languages | about 13 hours | about 4 hours |
| Three rounds per school year | **about 40 hours** | about 12 hours |

Across a typical nine-teacher Grades 1–3 cohort, that is roughly **360 hours a year spent testing — of which ReadiLY returns about 250** to teaching.

**That is the market opportunity, stated as a cost the buyer already carries.** 250 recovered teacher-hours is worth more in salary terms than the annual licence we charge for them (Section 9), which is why this is a budget reallocation rather than a new expense — and why the decision-maker is a principal rather than a national committee.

### Then the second week starts

Everything gets typed into an official spreadsheet: the passage, the word count, every mistake, the reading time to the second, the comprehension scores. Then uploaded to the national portal before a fixed deadline.

One broken formula or one wrong paste can corrupt an entire class's record. And teachers are largely untrained for it — our research review found **91.67% of surveyed teachers had fewer than 20 hours of training** on the newer of the two tests (*Diagnostics and Dysfunctions*, ReadiLY internal research, 2026).

### So the week gets rationed — and the rationing has a pattern

This is the sentence the rest of the plan rests on.

When finding costs a week, finding gets cut. Rounds get shortened. Scores get copied across forms so the report can be filed. A teacher assesses the children she can and estimates the rest.

**And the child who reads slowest takes the longest, so he is the first one skipped — and the one who most needed to be found.**

That is the failure, and it is a workload failure rather than a policy one. The test is good — the Makati result proves what happens when schools act on it. The instrument works and the arithmetic defeats it.

**This is why the problem is worth paying to solve.** A child who cannot read in Grade 1 is cheap to help. The same child in Grade 4 is not: he has spent three years falling behind in every subject that requires reading. And under the "No Read, No Pass" rule and the ARAL Act, reading proficiency gates grade progression — so a child found late is not only the child's problem. It becomes the school's, in retention, remediation, and reported performance.

The wider numbers describe the end of that process. The World Bank's learning poverty measure — ten-year-olds who cannot read and understand a simple story — put the Philippines at **91% as of 2022**, up from 69.5% in 2019, among the worst in East Asia and the Pacific. The Philippine Statistics Authority's 2024 survey found 70.8% functional literacy among Filipinos aged 10 to 64, from 59.3% in the Zamboanga Peninsula to 81.2% in the Cordillera.

**So the question we are answering is narrow.** Can a teacher assess *every* child she is required to assess — in a fraction of the time, on a tablet her school already owns, with no internet, no new test to learn, and no child's voice leaving the device — and get the government form back already filled in?

---

## 5. Goals & Objectives

We have deliberately set targets that can prove us wrong.

### Phase 0 — Before Pitch Day (now to 3 September 2026)

Two things that need no money, and are underway.

- **Ten structured teacher interviews**, using the ten-question script already written into our research.
- **A working demonstration** of the full loop: record a child, score the reading, produce the report.

The engineering plans are finished. What stands between us and a demo is build time, not open questions.

### Phase 1 — Prove it in a real classroom (September 2026 to February 2027)

Harden the app against the standards in Section 7. Register the business. Get the research permit. Then run a **free pilot in one to three Quezon City public schools**: two to three teachers, 100 to 150 children, four weeks.

Four measurements, all of which can fail:

| What we measure | Target |
|---|---|
| Time to assess one child, including setup | under 4 minutes |
| Share of a class assessed within one week | 100%, against partial sampling today |
| How often a teacher has to correct the app | under 10% of scored words |
| Whether teachers trust it | post-pilot survey |

**The second row is the one that matters.** Speed is only worth having if it becomes coverage — every child assessed, including the slow readers who get skipped today. If we halve the time and teachers still sample, we have built a convenience, not a solution.

**One honest limit.** At launch the app scores English only, so this pilot validates the English half of a two-language test. Filipino passages can be recorded and teacher-reviewed, but not automatically scored until Phase 3.

### Phase 2 — First revenue (March to August 2027)

Convert to eight paying private schools. Ship the remaining form exports. Publish a short results brief written for a Division Office audience rather than for us.

### Phase 3 — First division deal, and formal proof (September 2027 to August 2028)

Sign the first paid division contract, and begin the accuracy study our own research says is the credible bar: 300 children across three types of school, every recording scored independently by two trained Department of Education reading coordinators who cannot see each other's marks, with a third expert settling real disagreements.

In plain terms, the targets require our word-per-minute figures to line up with the experts' almost exactly, and our reading-level judgements to match theirs in the overwhelming majority of cases. Also in this phase: teaching the system to score Filipino, using university recordings under formal research agreements.

---

## 6. The Solution

**ReadiLY is a layer on top of the two tests that already exist. It is not a new test.**

That is the single most important decision in this plan, and it comes straight from the problem. A tool that automates the reading but leaves the teacher to type up results has — in the words of our own research — merely produced *an exacerbation of their administrative burden*. Half the week back is not the offer. The whole week is.

### What changes in her day

She picks a child and a passage matched to his grade. He reads aloud. The tablet records locally, compares what it heard against the text it knows he was given, and thirty seconds later shows her three things — the same three the government form asks for:

- **Words read correctly per minute, and accuracy** — using the government's own formula, not ours.
- **Every mistake, labelled** — a word skipped, swapped, added, or corrected by the child himself. The app waits three words before judging, so a child who stumbles and then fixes it is not penalised. That is exactly what the official rules require.
- **His official reading level** — Independent (97–100%), Instructional (90–96%), or Frustration (89% and below).

Three minutes instead of fifteen. Multiply that by forty children and the change is not that testing gets faster. It is that testing gets *finished* — in week one, with nobody skipped.

### The feature that decides whether schools buy

Results do not stop with her.

Schools must submit these results through the Department of Education's national portal against fixed deadlines. So ReadiLY exports the **official spreadsheet that portal accepts**, already filled in. Nothing is retyped.

To be exact about where we stop: we produce the file, the teacher still uploads it.

That is the step that makes ReadiLY the easiest available path rather than one more thing to maintain — and it ships in the first release. It is honestly a *buying* argument, not a mission. What the purchase buys is the coverage above.

### She can always overrule us

Every word the app flagged appears as a tappable item. She changes any judgement, the score recalculates, and the record saves as teacher-adjusted.

This is not hedging. It is the design. A teacher who cannot overrule a score will not trust it, and a tool teachers do not trust is abandoned quietly.

It also gives us something valuable: every correction is a labelled error, telling us exactly where our system was wrong. In the pilot, that becomes our sharpest measure of accuracy.

### What she sees across the class

A summary by reading level, a bar showing how many children have been assessed, and a "needs attention" list.

**The app states in its own interface that this list is rules, not prediction.** A child is flagged if his latest level is Frustration, or his accuracy has fallen across three sessions, or he is in the bottom tenth of the class by speed. We do not claim to predict who will struggle later, because we cannot prove such a claim — and a claim we cannot prove is one a teacher will eventually catch us in.

### What we measure, and what we do not

Reading speed and accuracy measure whether a child can *recognise words*. They do not measure whether he *understood*.

We say so plainly because the difference matters. Research in the early grades consistently finds the two strongly related but far from identical: reading aloud well predicts comprehension reasonably, and substitutes for it badly.

So ReadiLY tells a teacher which children to look at closely. It does not tell her a child understood what he read, and the interface never implies otherwise.

### Offline is not a feature. It is the condition of the problem.

Everything — class lists, passages, recording, scoring, the dashboard, the export — works with the tablet in airplane mode. When a connection appears, only scores sync. Never audio.

This is not a nicety for rural schools, it is what makes the market addressable. **A tool that needs connectivity cannot give back the week**, because the week is lost in every classroom, including the ones where a page takes thirty seconds to load. A cloud product can only sell into the minority of schools with reliable bandwidth. Ours can be sold into any school with a working tablet — which, per Section 7, is most of them.

Even the synced scores are stripped down: the cloud sees a child's initials and learner reference number, never his full name. A school can use the app with no account at all.

The app also handles Philippine accents the way the official rules demand. The rules state that regional pronunciation is not an error, so common substitutions — *p* for *f*, *b* for *v*, *t* for *th* — count as correct by default, tunable per division.

### On language: the problem just shrank

At launch, automatic scoring is English only. No Filipino speech engine exists today that is small enough to fit the memory a tablet can spare.

This used to look unwinnable, because the mother-tongue policy implied nineteen or more languages. **It no longer is.** The Department of Education ended compulsory mother-tongue teaching for Kindergarten to Grade 3 from the 2025–2026 school year. That leaves Filipino and English.

Nineteen languages was hopeless. Two is a roadmap.

Meanwhile Filipino passages can be recorded and teacher-reviewed, with automatic scoring marked *coming soon* rather than silently missing.

**Deliberately not in the first release:** comprehension scoring, risk prediction, and a parent app. Each is a dated roadmap item, not a claim.

That scope is narrow on purpose, and it is a business decision as much as a product one. A two-person pre-revenue team that ships four features badly has no reference customer; one that ships a single mandated workflow completely has a renewal. The narrow thing is the week.

---

## 7. Proof of Concept

### What exists, and what does not

**Exists:** thirteen designed screens; a complete seven-part engineering specification covering every component from class list to final export; a speech engine chosen and verified for size and speed; a fully specified scoring method.

**Does not exist:** the working code, and any classroom data.

We are not presenting plans as a product. What follows is why we believe the plans will hold.

### The one decision that determines whether any of this works

Most teams building this would reach for **Whisper**, the popular free speech recogniser from OpenAI. We rejected it, deliberately, and the reasoning is the core of our technical claim.

**What it does.** Whisper is built to produce fluent, sensible text. Mumble at it and it guesses what you probably meant, then writes down the clean version.

**Why that matters here.** Give it a child who stumbles, skips words and misreads, and it repairs the transcript — turning a struggling reader into a proficient one on paper. **The score inflates for precisely the children the tool exists to find.** A system built to find struggling readers that instead hides them has not failed partially. It has failed completely.

**What we use instead.** A stricter class of recogniser that commits to each word as it hears it and **cannot invent a word that was not spoken.** Specifically `sherpa-onnx-zipformer-gigaspeech`, compressed to run on a phone-class processor.

Three numbers, all checkable:

| Measure | ReadiLY | Available on a government school tablet |
|---|---|---|
| Space on the tablet | about 69 MB | ample |
| Memory while running | about 200 MB | about 2 GB usable on a 4 GB tablet |
| Speed | faster than ten times real time | — |

To compare what the child said against what he was given, we use a sequence-comparison method borrowed from genetics. It has the property we need: it does not merely score how different two texts are, it tells us *exactly which word* was skipped, swapped or added — which is what a teacher needs to see, and what a percentage alone can never give her.

### The two tests our build must pass before a classroom sees it

Targets, not results — and taken from the official grading bands rather than from what would flatter us.

**Do not fail a good reader.** A perfect, word-for-word reading must score **97% or higher**. Ninety-seven is precisely the threshold for the top level. Score a flawless child at 96% and the app labels him as needing instruction — and a tool that raises false alarms about strong readers gets switched off in week two.

**Do not rescue a weak one.** Feed the app a passage where ten words were never read, and it must catch at least eight as omissions. That is the direct guard against the transcript-repair failure above.

The two pull against each other on purpose. Passing both is what makes the number trustworthy enough to act on.

And it need not be perfect: two trained human examiners scoring the same child agree about four times in five. Matching a careful human is the bar.

### The biggest technical risk is Filipino, and we know why

Children's voices are genuinely harder for machines. Their vocal pitch sits at 250–400 Hz against roughly 200 Hz for an adult woman, and speech systems make 40–45% more errors on children than on adults.

The fix is data, and the data exists in the Philippines: the **Children's Filipino Speech Corpus** (57 children, three hours, reading mistakes already labelled), **BK3AT** (122 hours, entirely Grades 1 to 3), and **UP-DSP-PLD** (454 hours).

And the requirement is smaller than it sounds. Published results in this field show **10 hours of children's speech beats a system trained on 960 hours of adult speech.** Real, tractable, scheduled for Phase 3.

### Why we write our own passages — and why that made the product better

We cannot use the government's passages. The newer test's materials are licensed in a way that explicitly bars commercial use, and a custom licence is not realistic for a student team; the older test is a government work, and profiting from it requires prior approval.

Our solution rests on a basic copyright principle: you cannot copyright a *method*, only the words expressing it. The scoring formulas and level names are methods. So we follow those exactly and write the passages ourselves.

The constraint improved the product. The official test ships **four parallel sets (A through D)** for a reason: a child tested three times a year must never read the same text twice, or part of his "improvement" is just familiarity with the story. We mirror that exactly — **24 original passages**, four matched sets per grade per language, rotated across the year — controlled the way the official test controls them, for word count, vocabulary, sentence complexity and theme.

And we set them somewhere Filipino children actually recognise: the sari-sari store, the jeepney, the fiesta. A child reading about a school bus in the snow is being tested on two things at once, which makes the score less valid.

Two business consequences worth naming. The ₱50,000 passage-authoring line in Section 9 is the price of a product we can lawfully sell, which is why it is funded first. And the passages become an owned asset no competitor can license from us — localisation Amira and Microsoft would each have to redo. Before any commercial sale reproducing the official form layout, we will seek Department of Education approval.

### One tablet per teacher, not per child

This is the difference between an affordable idea and an impossible one.

The tablet stays with the teacher, which matches how government devices are actually distributed: roughly one per nine students, issued to teachers. A school with three sections per grade needs three tablets — and because children are tested one after another anyway, even a single shared tablet per grade level works. The government has distributed over 1.25 million devices to about 93% of public schools.

**Our open question,** and the first thing we check before committing to any division: how many of those devices still work in the specific schools we target.

### The risk nobody else's marketing mentions

Philippine classrooms are often open-air and loud. And six-year-olds are not used to microphones — a shy child can score lower than he should and be labelled wrongly.

That is our own failure mode arriving from the opposite direction, so we treat it as a measurement problem rather than an annoyance: a ₱150 boom-mic headset in the onboarding kit; a noise check before recording that warns the teacher when conditions are too poor to score fairly; and a one-minute warm-up read that is recorded but never scored.

Whether that is enough is an explicitly named pilot question. It is also part of why she can always overrule us.

### Getting paid: the step most student plans skip

Two undergraduates cannot simply invoice a government Schools Division Office.

Before any paid work we must register the business (sole proprietorship now, a corporation before any division contract), register for tax and issue official receipts, and enrol in the government's electronic procurement system. Adopt-a-School donations additionally require a year of registered existence.

This is exactly why Year 1 revenue comes from **private** schools, which can transact with a simply-registered business immediately, while the public pilot runs unpaid under a research permit. Registration is funded in the Year 1 base case.

### Government purchasing rules are, unusually, on our side

The Philippines rewrote its procurement law in 2025. Three provisions matter:

| Rule | What it means for a school |
|---|---|
| **Direct Acquisition up to ₱200,000** | The school just buys it. No bidding, no committee, no competing quotes. |
| **Small Value Procurement up to ₱2,000,000** | A division-sized purchase can be awarded on a single valid quotation. |
| **Section 37** | Agencies may buy directly from qualified startups. |

Our per-school pricing sits deliberately below that ₱200,000 line. **A principal can buy ReadiLY without running a bidding process** — which means the decision-maker and the person who feels the pain are the same person.

### What buying it looks like

Decision to data in under a week.

We send a quote with the legal purchasing justification attached. The principal buys it directly. We come on site for a one-hour session training the teachers who will train the rest, and load class lists from a spreadsheet. The first class is assessed that same week. At term's end the completed government form is exported in time for the deadline.

Nothing in that sequence needs internet, new hardware, or national office approval.

### Training, and the auditor question

Teacher training is one hour, on site. There is genuinely no new test to learn — ReadiLY gives the one she already gives. That is the entire point of being a layer rather than a replacement, and it is why "we saved you a week" does not arrive with "but first, spend three days learning this."

Separately, school heads are historically nervous about charging recurring software to their operating budget, because the state auditor may question it. Our answer, supplied in writing with every quote: this is a diagnostic instrument tied to a legally mandated test and an eligible national tutoring programme, bought under the direct-acquisition rule with a single quotation.

### Continuity, because we are two students and buyers should ask

Three promises a school can hold us to:

1. **The data is the school's.** It exports to a plain spreadsheet on demand. Nothing is trapped in our system.
2. **The app keeps working even if we stop.** Scoring happens on the tablet and needs no server of ours, so it runs offline for the whole paid term regardless of what becomes of us.
3. **Support is next-business-day** by phone and Viber during the school year — the channel Philippine teachers actually use.

### Privacy as a design constraint, not a policy page

Under Philippine law a child's voice is biometric personal information, and his resulting score is *sensitive* personal information — the most protected category. Processing on the device does not exempt us. The score is still sensitive data.

So: **audio never leaves the tablet**, not for processing and not for backup. **The school owns the data; we are only the processor**, under a formal written agreement with the division rather than an informal memorandum. **Written parental consent is required**, following the Department's own rules, with a non-digital alternative for families who decline. **We register with the National Privacy Commission and appoint a data protection officer** once we handle sensitive data for more than a thousand individuals. And **the app enforces it**: the microphone will not activate until the teacher confirms a signed consent form is on file.

That last one is the test of whether a privacy commitment is real. Ours is code, not a paragraph.

---

## 8. Market Analysis

### Why now, and not three years ago

Four things changed in eighteen months. Together they open a window that was closed.

**The tablets are being funded.** The Department of Education's 2026 budget is ₱1.015 trillion — above 4% of national output for the first time — with ₱10.6 billion for school computerisation. That is the exact hardware ReadiLY runs on, being bought right now.

**A new law needs precisely our output.** The ARAL tutoring act covers 6.7 million children and requires progress monitoring. The 2025 education-fund circular requires cities to build six-year plans *driven by the results of these two tests*.

**Political attention.** The congressional education commission's *Turning Point* report calls for resources moved to the earliest grades and an end to promoting children who cannot read.

**The language problem collapsed.** Compulsory mother-tongue teaching for the youngest grades ended in 2025–2026. A nineteen-language problem became a two-language problem.

### How big this is, honestly

Built from the ground up, not as a percentage of some global figure.

| | Who that is | Children in Grades 1–3 | Worth per year |
|---|---|---|---|
| **Everyone who could use it** | Every Grade 1–3 child in the country — 5.9M public, 0.5M private | about 6.4M | about ₱512M |
| **Who we could realistically serve** | Metro Manila and other urbanised divisions with tablets and active literacy programmes, plus private schools | about 900,000 | about ₱72M |
| **What we target in 36 months** | Quezon City at 30% coverage (~38,700) plus 60 private schools (~12,000) | about 50,700 | about ₱4.1M |

Quezon City is the largest school division in Metro Manila: **95 public elementary schools and 258,201 elementary children**, roughly 129,000 of them in Grades 1 to 3. The whole division would be worth ₱7.7M a year at our division rate. We model 30% of it, ₱2.3M, plus ₱1.8M from private schools.

**We deliberately do not forecast past what we just said we could reach.** Year 3 touches 36,000 of those 50,700 children (71%) and earns ₱3.24M of the ₱4.1M (79%).

### Who we are actually competing with

| Alternative | What it is | Why it does not close this gap |
|---|---|---|
| **Doing nothing differently** | Pen, stopwatch, spreadsheet | Free, familiar, entrenched — our real competitor |
| **Microsoft Reading Progress** | Free inside Microsoft Teams; nationwide DepEd rollout announced Feb 2026 | See below |
| **Amira Learning** | US product, extremely accurate, about ₱1,120 per child per year | Needs constant internet; not localised; priced for American districts |
| **SoapBox Labs** | A genuinely offline children's speech engine | No Philippine language support; sold as a component, not a product |
| **Wadhwani AI** | Same idea, in 30,000+ Indian government schools | Not in the Philippines — and proof the approach works at government scale |

### Microsoft is the serious threat, and it deserves a straight answer

In February 2026 the Department of Education and Microsoft announced a nationwide Reading Progress rollout, citing Bais City (60 schools, 14,000+ children) and Cabanatuan. It is free, and Microsoft has a national agreement we do not.

Our mentor asked the right question: *why* can these companies not simply go offline and localise? Because an obstacle only we can clear is an advantage. Anything else is a head start.

We looked. All four obstacles are structural, not technical.

**Technically, offline is a different product, not a setting.** Reading Progress sends audio to Microsoft's cloud from inside Teams. Removing the cloud is not a switch — and Microsoft's education business earns from exactly the cloud accounts an offline tool bypasses.

**Financially, the numbers never work.** Recognising Filipino children reading aloud requires recordings of Filipino children reading aloud, and almost all of it sits in Philippine university archives reachable only through Philippine institutional agreements. Meanwhile 6.4 million Filipino children at Philippine prices is a rounding error beside US district revenue.

**Practically, it hands the teacher Microsoft's report, not the government's form.** She still retypes everything before submitting. The week comes back half-returned.

**Legally, it needs a Microsoft account per child.** Creating cloud identities for six-year-olds and routing their voices abroad runs against Philippine data privacy law and government data-residency rules.

**None of this is something Microsoft could not do. It is something Microsoft has no reason to do.**

### "Why doesn't the government just build it?"

It tried the nearest thing, and the result is the automatic spreadsheet teachers currently fight with.

The Department is good at designing tests and writing policy. It buys software rather than engineering it — which is precisely why the new procurement law contains a clause letting agencies purchase directly from startups.

So the risk is not that the government builds a competitor. **The risk is that it standardises on a free foreign tool before a compliant local one is ready.** That is the clock we are running against, and it is why we are asking for a permit rather than for time.

### Where our real advantage lies

Not "offline" and not "AI." Those are features a competitor could copy in a year. Two things compound instead.

**The workflow becomes ours.** Once a school's official reporting runs through ReadiLY, the cost of leaving is not the software. It is going back to doing the paperwork by hand, mid-year. Nobody gives a week back voluntarily.

**The recordings become ours.** A properly labelled archive of Filipino children reading aloud decides who eventually owns this category — and because ten hours of children's speech beats 960 hours of adult speech, it is achievable at our size.

**Those two ambitions can conflict, so we state the rule.** As the school's data processor we cannot quietly reuse their children's recordings to train our system. So the research archive is a *separate*, opt-in agreement with its own consent process, and a school that declines gets identical service. Where consent is not given we fall back on the university archives under formal research agreements.

A smaller lawful dataset beats a larger unenforceable claim.

Offline buys us time. The workflow and the archive are what we build with it. And the engine generalises: it is fundamentally a system that compares spoken words against a known text, so the same core extends to Grades 4 to 6, and to oral numeracy under the tutoring programme's mathematics phase. We claim neither today — but ₱512M is the floor of this opportunity, not the ceiling.

---

## 9. Business Model

### What we charge

Per child per year, following our mentor's guidance, with a volume discount and a minimum order.

| Tier | Price | Minimum | Who it is for |
|---|---|---|---|
| **Per school** | ₱150 per Grade 1–3 child per year | ₱25,000 per school | Private schools — how we start |
| **Per division** | ₱60 per Grade 1–3 child per year | 5,000 children (₱300,000) | City-funded divisions — how we scale |

Three ways to check that price.

**Against the school's own budget.** A public elementary school of 500 children, roughly 250 of them in Grades 1 to 3, pays about ₱37,500 a year — 2.7% of its annual operating budget.

**Against the purchasing rules.** ₱37,500 sits comfortably under the ₱200,000 direct-purchase ceiling. No bidding, no committee: the principal decides.

**Against competitors.** Seven times cheaper than Amira at school pricing, nearly nineteen times cheaper at division pricing, and an order of magnitude below Quipper (₱4,000–10,000 per child per year).

And on salary cost alone, the roughly 250 teacher-hours a nine-teacher school recovers each year is worth more than the licence. The difference is that the licence is an expense and the hours come back as teaching.

### How we sell: private schools first

Our mentor was direct that a business dependent on government sales is a mistake, and that private schools decide faster and more predictably. We follow that.

**Private schools are the revenue.** The Quezon City public pilot runs alongside for proof and credibility, not for Year 1 income. Division sales come later, backed by published pilot results and funded from the budget lines in Section 3.

**How we reach the first eight.** We have no warm customer and will not pretend otherwise. Two routes.

The better one is our own university's College of Education, whose practicum programme places student teachers in partner schools every term. That means existing relationships with real Grades 1–3 classrooms and faculty who can confirm we are not strangers off the street.

The second is cold: private school associations, principals' groups, and the Facebook groups where Philippine teachers actually organise.

Our working assumption is 60 serious approaches → about 24 demonstrations → 8 sales, a 13% conversion rate. That is an assumption rather than an observation, and it is exactly what the first ten teacher interviews exist to test.

**Why a school renews.** Renewal happens once a year, at the start of the school year. And the reason to renew is the reason to buy: official reporting now runs through ReadiLY, and going back means returning to stopwatches and manual typing halfway through a cycle. Inside a school, the natural expansion is Grades 1–3 into Grades 4–6 — roughly doubling the licence without a new sale.

### What each customer costs us

**One more assessment costs us nothing.** Because the speech processing happens on the tablet rather than on rented servers, there is no per-recording fee. For scale: cloud speech processing runs ₱0.26–1.44 per audio hour, and a hundred-school deployment generates 16,000 hours a year. That entire cost line is zero for us — the same architectural decision that keeps the app working in an open-air classroom also removes our largest variable cost.

Our real per-school costs are training and setup (₱5,250, within the government's own training caps) and support (about ₱500 per school per year). Our servers only ever handle text and stay under ₱10,000 a month even at division scale.

**Those costs imply we keep 81 centavos of every peso. We model 75**, to absorb extra support calls, second training visits and payment friction in early accounts. **₱22,500 kept per school per year** is the figure everything below is built on.

One clarification, because two lines look similar: the ₱5,250 setup cost applies to *paying* schools. The "pilot and onboarding logistics" line below is separate — it funds the free public pilot, travel, headsets and materials, none of which earn anything.

**We break even at 12 schools:** ₱250,000 of fixed annual costs ÷ ₱22,500 kept per school. Twelve private schools in Metro Manila is a countable target, not a market-share percentage.

**And it scales rather than merely grows.** Because processing runs on the device, serving the hundredth school costs what the tenth did. Margin rises to roughly 84% at division scale against under 76% for anyone dependent on the cloud. The same app serves any division in the country with no new infrastructure. What limits us is relationships, not cost.

### Three-year projection

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

We model **two** division contracts by Year 3, not three. Each needs a research permit, an internal champion, and two to six months of relationship-building. Forecasting three would contradict everything else we say about how slowly government moves.

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

Note the last line: **we pay ourselves nothing in Year 1.** That is a real subsidy, and we would rather name it than hide it.

### What a customer is worth

Monthly cancellation rates — the standard software metric — do not apply here. A school buys once a school year. What matters is whether it renews.

Assuming a three-year relationship, each school is worth **₱67,500** in retained revenue (₱22,500 × 3). The widely used rule is that a customer should be worth at least three times what it costs to win them, which puts our ceiling for winning a school at ₱22,500.

We do not yet know what winning a school actually costs, and we will not invent a figure. ₱22,500 is simply the number Year 1 has to come in under.

### Why we need money at all, given a ₱70,000 loss

This is the part a first reading misses.

Schools pay at the *start* of the school year. But writing the passages, registering the company, buying test tablets and setting up the pilot are all spent *before* the first invoice goes out.

**The gap between money going out and money coming in — not the ₱70,000 loss — is what the ₱250,000 funds.** A plan showing only the loss would understate what it takes to reach the first payment.

### The ask: ₱100,000 is enough; ₱250,000 lets us run at full speed

We will not present money we do not have as committed.

The plan is built so **the ₱100,000 grant alone gets us to a tested pilot**, spent in strict priority order:

| Priority | What it buys | Grant only (₱100,000) | Fully funded (₱250,000) |
|---|---|---|---|
| 1 | Writing the 24 original reading passages | ₱50,000 | ₱50,000 |
| 2 | Business registration and privacy documents | ₱30,000 | ₱60,000 |
| 3 | Servers and tools, 12 months | ₱20,000 | ₱30,000 |
| 4 | Pilot and school setup logistics | deferred | ₱80,000 |
| 5 | Test tablets | deferred | ₱30,000 |
| | **Total** | **₱100,000** | **₱250,000** |

Passages first, because without them there is no product we can legally sell. Registration second, because without it nobody can pay us.

**And the honest version of the grant-only case.** With ₱100,000 we test on borrowed and personal tablets and run a **single-school pilot** instead of three. That puts Year 1 at roughly four paying schools and ₱120,000 revenue against ₱100,000 of costs — near break-even, but it pushes real growth out by a year.

The extra ₱150,000 we would raise from friends and family, the route our mentor identified as normal at this stage. That buys the full three-school pilot and the Year 2 figures above. **We have not raised it, and we do not treat it as secured.**

---

## 10. The Team

Two founders, two halves of one problem. Both undergraduates at the Polytechnic University of the Philippines, graduating in 2027.

**Yhasmen Nogales — Artificial Intelligence Lead**
*1st Runner-Up, Agentic AI Hackathon 2025 · Winner, DOST 7th iMake.WeMake*

Owns the voice: choosing the speech engine and proving it fits a school tablet, the scoring and mistake-detection logic, handling Philippine accents fairly, and the Phase 3 work of teaching the system Filipino. The central decision in Section 7 — rejecting the popular recogniser for a stricter one, so that no struggling reader is ever scored as fluent — is hers to defend and hers to prove against the two acceptance tests.

**Caryl Joy A. Atienza — App and Product Lead**
*1st Runner-Up, BPI Datawave 2025*

Owns everything the teacher touches: the thirteen designed screens, making the whole app work without internet, the correction interface, and the government form export that Section 6 identifies as the feature deciding adoption. Also owns getting schools set up, and the relationship with them afterwards.

Three national competition placements between us is real evidence we can build and ship under deadline pressure. **It is not evidence we can sell to a government office, and we will not present it as though it were.**

### What we are missing, and the order we fix it

Our mentor was clear that our limiting factor is not engineering:

> *"It's really the education domain expert / B2G sales expert, mainly because the tech development will naturally follow once you've invested into understanding the market."*

We accept that ordering completely — which is why the list below starts with a person and not a feature.

**1. An education expert with real Department of Education classroom experience.** Our first advisory priority, brought in before the pilot begins, recruited through Startup QC mentorship and through the pilot teachers themselves, who double as expert validation.

**2. Someone who knows government sales and has division relationships.** Our mentor's warning was blunt: government adoption does not happen without an insider willing to vouch for you. Finding that person inside the Quezon City division is a named Phase 1 objective, not a wish.

**3. Deeper speech-technology expertise.** Being addressed through academic partnership with the University of the Philippines Diliman's speech laboratory and De La Salle University, who hold the Filipino children's recordings Phase 3 depends on.

**We have not yet engaged a named education adviser, and we are not claiming otherwise.**

### On whether we will still be here in two years

Both of us graduate in 2027. ReadiLY is not a class project we intend to shelve at graduation.

The Year 2 plan puts us on salaries and hires our first employee — the point at which this stops being our thesis and becomes our job. We would rather state that intention now and be held to it.

---

## 11. Conclusion

We will not put a peso figure on what literacy does for the economy. Our research does not support that claim at the precision you should demand of us.

What we can say is narrower, and true.

Philippine policy makes reading a gate on moving up a grade. Roughly half of Filipino children in Grades 1 to 3 are not reading at their level. The instrument for finding them already exists and already works when schools act on it — Makati proved that.

It is failing for one reason. It costs a teacher a full working week each year to give and to encode, so it gets rationed, and the child who reads slowest is the first one cut.

**Give that week back, and it gets spent on the children the test just found.**

ReadiLY has not been proven in a classroom, and this plan says so plainly rather than burying it. What we ask of Startup QC is specific and achievable inside your programme: ₱100,000, access to Quezon City schools, and the institutional credibility to get a research permit faster than two undergraduates could manage alone.

The next twelve months are about closing the gaps this document names — not pretending they are already closed.

Here is what success looks like, concrete enough that you can hold us to it.

A Grade 1 teacher in Quezon City knows all forty of her children's reading levels in the first week of school. Not a sample. All forty — including the boy who reads slowest, who in any other year would have been quietly skipped, because he takes fifteen minutes and there are thirty-nine others waiting. She spends the five weeks she used to lose on the children the testing found.

Twelve schools makes that business sustainable. Sixty schools and two divisions makes it profitable, on the numbers in Section 9. Neither requires us to be right about anything we have not already told you we still have to prove.

**We are not the ones who teach him to read. We are the ones who make sure his teacher knows, in September, that he cannot.**

---

## References

**Statistics.** World Bank (2024), *Philippines Learning Poverty Brief*, Apr 2024 v2 · Philippine Statistics Authority (2025), *2024 Functional Literacy, Education and Mass Media Survey* · DepEd CRLA End-of-School-Year Report 2024–2025 and QC CRLA Report 2025–2026 · EDCOM 2 (2026), *Turning Point*, and *Fixing the Foundations* (2025) · Department of Budget and Management, FY2026 National Budget.

**Law and policy.** RA 12028 (ARAL Program) with DO 18, s. 2025 and DM 001, s. 2026 · RA 12009 (New Government Procurement Act), implementing rules Feb 2025 · RA 10173 (Data Privacy Act) and RA 10367, with NPC Advisory Opinion 2025-017 and NPC Circular 2022-04 · RA 8293 §176; CRLA materials licensed CC BY-NC 4.0 (DepEd/USAID/RTI) · DO 16, s. 2017; DO 40, s. 2012; DO 40, s. 2015; DO 15, s. 2017; DO 45, s. 2002 · Joint Circular No. 1, s. 2025 (Special Education Fund) · DepEd (2025) order ending mandatory Mother Tongue instruction for K–3 · DepEd Bureau of Learning Delivery submission portal, `bld.deped.gov.ph/submission`.

**Market.** Microsoft Philippines / DepEd (2026), nationwide Reading Progress rollout, February 2026 · Phil-IRI Manual (2018), parallel Sets A–D.

**Internal research** (ReadiLY team, 2026, `docs/research/`): Technical Feasibility Assessment · Validation of Automated Oral Reading Fluency Systems · Legal and Compliance Assessment · The Landscape of AI-Powered Oral Reading Assessments · Architecting Offline-First Educational AI in the Philippines · Strategic Pathway for AI-Driven EdTech Integration · Systemic Realities of Early Grade Reading Assessments · Diagnostics and Dysfunctions: Teacher and Student Pain Points in Phil-IRI and CRLA.

**Startup QC.** EJ Arboleda (Taxumo), *Unit Economics and Working Capital Management* · Guita Gopalan, *From One Customer to a Real Market* · Abe Lozada (LaunchGarage), *Pitch Deck 101* · Mentor feedback: Cody Flores, July 2026.

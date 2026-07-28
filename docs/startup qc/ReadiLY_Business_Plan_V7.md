# ReadiLY

### Finding the children who cannot read — in week one, not week twenty

**Fifteen minutes per child becomes three. No internet needed. No child's voice ever leaves the tablet.**

---

**Team IKIYUH**
Yhasmen Nogales — Artificial Intelligence Lead · yhasmennogales04@gmail.com
Caryl Joy A. Atienza — App and Product Lead · carylatienzaa@gmail.com

Polytechnic University of the Philippines
Startup QC 2026 — Student Category, Squad 3

**What we are asking for:** the ₱100,000 grant · an introduction to the Quezon City Schools Division · help getting the permit we cannot get alone
**What we are committing to:** a working version of the app, demonstrated live on Pitch Day, 3 September 2026

---

## A note on the two tests this plan is about

Two reading tests run this entire document, so we define them once, here, and use plain names afterwards.

**CRLA** — the Comprehensive Rapid Literacy Assessment. Every public school teacher in Grades 1, 2 and 3 must give it. The teacher sits with one child at a time and listens to that child read out loud, then records how well they did.

**Phil-IRI** — the Philippine Informal Reading Inventory. The same idea, more detailed, and used from Grade 3 upward.

Both are required by law. Both are given three times a year. Both are done one child at a time, out loud, with the teacher listening and timing by hand. And both end with the teacher typing the results into an official government spreadsheet and uploading it before a deadline.

We refer to these together as **the reading tests**. Everything ReadiLY does is in service of those tests. We are not inventing a new one.

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

In a class of forty, the children who cannot yet read are supposed to be found in the first weeks of school. Many are not found until the second half of the year — not because the test does not work, but because giving it costs the teacher a full working week.

**When those children are found early, the outcome changes completely.** The Schools Division of Makati used exactly this data to cut its share of Grade 1 children needing the most intensive help from 55.17% down to 1.64% in three years. Finding children early works. What fails is the finding.

Here is why it fails. The law requires the teacher to sit beside each child, one at a time, and listen to that child read a passage aloud while she times them and marks their mistakes on paper — in both English and Filipino, three times a year. Add it up and it comes to roughly **forty hours per teacher per year**, one full working week, spent testing rather than teaching. Then every score has to be typed by hand into a government spreadsheet and uploaded before a deadline.

So the testing gets shortened. Or rushed. Or quietly skipped for the children who take longest — who are precisely the children it exists to find.

### What ReadiLY does

ReadiLY is an Android tablet app that gives those same two tests and produces the same official government form at the end.

The child reads aloud into the tablet. Within thirty seconds the app reports how many words the child read correctly per minute, their accuracy as a percentage, and exactly which words they got wrong and how. The teacher sees the child's official reading level, can correct anything the app got wrong, and then exports the government form already filled in.

Fifteen minutes becomes three. It works with no internet connection at all. And the child's recorded voice never leaves the tablet.

That speed is not the point in itself — it is what makes **every child in the class** possible to assess, in the first week, rather than a sample of them somewhere around the sixth.

We are not building another dashboard for teachers to keep updated. We are removing work they are already required to do, so the work that matters can happen.

### What is genuinely new here

It is not "artificial intelligence for reading." Microsoft and a US company called Amira already do that.

It is two things.

**First, we chose a type of speech technology that cannot flatter a struggling reader.** Most modern voice systems are designed to guess what you *meant* to say and clean up the transcript. That is helpful for dictation and disastrous for a reading test, because it quietly turns a child who is struggling into a child who sounds fine — hiding the very children we are trying to find. We deliberately use a stricter approach that can only write down what it actually heard. Section 7 explains this in full.

**Second, what comes out the other end is the government's own form**, already filled in — not a private company's report that the teacher then has to copy across by hand. This is the difference between software a school admires and software a school buys.

The app does not have to be flawless to be useful. Two trained human examiners scoring the same child disagree with each other roughly one time in five. That is the real benchmark — being as consistent as a good human marker, not being perfect. And unlike a tired human, the app is no less careful with the thirty-eighth child of the day than with the first.

### Where we honestly are

Pre-revenue and pre-build. We have a complete engineering plan, a chosen speech engine we have verified will fit on a school tablet, thirteen designed screens, and eight in-depth research reports.

**We have not written the working code yet, and we have not tested in a classroom.** We commit to demonstrating a working version at Pitch Day on **3 September 2026**. That, not the pilot and not the grant, is the checkpoint we have put our names to.

### What we are asking for

The ₱100,000 grant — which on its own is enough to reach a tested pilot — plus Startup QC's institutional access to the Quezon City Schools Division.

We become profitable at **12 paying schools**. By Year 3 the plan reaches roughly **36,000 children** in Grades 1 to 3 and hands back around **25,000 teaching hours a year** — hours that go to the children the testing found.

---

## 2. Why We Built ReadiLY

We did not come to this as education experts. One of us came to it knowing what it feels like to lose confidence in speaking.

Through school I struggled to express myself in English, and that insecurity followed me into internship applications and interviews — rooms where how you communicate counts as much as anything technical.

When I looked into why so many Filipino students carry the same thing, the answer was that it starts far earlier than anyone deals with it. Children are not identified until they have already fallen behind. And their teachers spend their hours giving and encoding tests instead of actually helping.

ReadiLY exists to close that gap at the point where it is still cheap to close. Not to replace teachers — to give them back the time to build in a six-year-old the confidence I wish someone had built in me.

**— Yhasmen Nogales**

That is also why the product looks the way it does. It measures reading *aloud*, because speaking is where confidence is won or lost. And it is built to return teacher hours rather than to produce impressive charts, because the teacher is the intervention. We are not the thing that helps the child. We are the thing that finds the child in time for someone else to.

**What we have, and what we do not.** Our one direct link to a classroom today is a family member who teaches in a public school and gives these tests herself. That is where our understanding of the paperwork burden comes from — not only from reading studies. To be precise about what that is: a practising teacher we can ask questions, and a possible first pilot teacher. It is not a formal adviser, not a customer, and not a committed pilot school.

---

## 3. Why Join Startup QC

**Quezon City has already identified this problem, and the money to fix it already exists in its budget.**

Nationally, the Department of Education's own results for the 2024–2025 school year found that **48.76% of children in Grades 1 to 3 were not reading at their grade level**. Nearly half. Quezon City's own report puts 39.71% of its learners in the struggling category, and the city's School Action Plan for 2025–2026 lists automating the fixing of learning gaps as a stated goal.

Our mentor's central advice was blunt: stop hunting for new money and go find the programme that already has money allocated to it. Three exist, and they point at the same thing.

**The ARAL Program.** A national tutoring law (Republic Act 12028) covering 6,713,352 children and 447,537 tutors. It requires progress to be monitored and reported upward to the Division Office. Most of those tutors are not licensed teachers — they are teaching assistants and student teachers, who need standard, easy tools even more than licensed teachers do.

**The Special Education Fund.** This is the pool of local property-tax money that Philippine cities spend on schools. A 2025 joint circular expanded it to cover the ARAL tutoring programme and requires each city to build a six-year investment plan **driven specifically by the results of the two reading tests**. Quezon City's fund was ₱2.36 billion in 2023, with roughly ₱2.7 billion available for 2026 — including an existing ₱2.98 million line item labelled "Computer Software."

**The QC Education Affairs Unit.** The city already funds comparable pilots directly, without going through national government purchasing. Adarna House's *Handang Magbasa* programme reached 300 early-grade teachers here, and Khan Academy Philippines operates in the city.

We are not asking Quezon City to invent a budget. We are asking to be judged against a budget line that already exists and already has to be spent on work driven by these two tests.

### What we specifically need from Startup QC

1. **An introduction, and the credibility that comes with it,** to the Quezon City Schools Division — Superintendent Dr. Carleen S. Sedilla and Curriculum Chief Dr. Heidee F. Ferrer. We need a research permit to work in public schools. With institutional backing that takes two to three months. Without it, three to six.
2. **Continued mentorship** on pricing and on the economics of each customer.
3. **The ₱100,000 grant**, which covers 40% of what Year 1 requires. We keep the equity.

---

## 4. The Problem

### Children who cannot read are being found far too late

The World Bank measures something called learning poverty: the share of ten-year-olds who cannot read and understand a simple story. In the Philippines that figure was **91% as of 2022**, up from 69.5% in 2019 — among the worst in East Asia and the Pacific. The Philippine Statistics Authority's 2024 national literacy survey found that 70.8% of Filipinos aged 10 to 64 are functionally literate, ranging from 59.3% in the Zamboanga Peninsula to 81.2% in the Cordillera.

Those numbers describe the end of a long process. What matters is where it starts.

A child who cannot yet read in Grade 1 is inexpensive to help. The same child in Grade 4 is not — they have spent three years falling behind in every subject that requires reading, and by then the problem is no longer reading, it is everything.

**The tool for catching that child early already exists, and it works.** The two reading tests are required, well designed, and demonstrably effective when schools act on the results. What is broken is the day-to-day work of giving them.

### The reason: testing children one at a time costs a full working week

Each child takes 8 to 15 minutes per language. **The struggling reader takes the longest**, because the teacher has to wait, encourage, and manage a child who is embarrassed to be reading badly out loud. In Grade 3 it must be done in both Filipino and English.

For a class of forty:

| | By hand today | With ReadiLY |
|---|---|---|
| One child, one language | 8–15 minutes | about 3 minutes |
| One full round, 40 children, 2 languages | about 13 hours | about 4 hours |
| Three rounds per school year | **about 40 hours** | about 12 hours |

Forty hours is one full working week per teacher per year — and that is only the first of the two tests, before any paperwork.

A typical school has around nine teachers across Grades 1 to 3. That is roughly **360 hours a year spent testing, of which ReadiLY hands about 250 back** to actual teaching.

### And a second cost on top: the paperwork

Everything gets typed into an official spreadsheet: which passage the child read, how many words, every mistake, the reading time down to the second, and the comprehension scores. That file is then uploaded to the Department of Education's national portal before a fixed deadline.

One broken formula, or one wrong paste, can corrupt an entire class's record. And teachers are largely untrained for this: our own research review found that **91.67% of surveyed teachers had received fewer than 20 hours of training** on the newer of the two tests (*Diagnostics and Dysfunctions*, ReadiLY internal research, 2026).

### So the test gets cut — starting with the children who take longest

This is the sentence that connects everything above.

When testing costs a week and the paperwork costs more, testing gets shortened, rushed, or skipped. Scores get copied across forms so the report can be filed on time. Teachers sample a few children instead of assessing all forty.

**The child who reads slowest is the child most likely to be skipped, and the child who most needed to be found.** The data meant to tell a teacher which children need help becomes least trustworthy exactly where it matters most.

**So our problem statement is narrow and concrete.** Can a teacher assess *every* child she is required to assess — in a fraction of the time, on a tablet her school already has, with no internet, with no new training to learn, and without any child's voice leaving the device — and get the government form back already filled in?

---

## 5. Goals & Objectives

### Phase 0 — Before Pitch Day (now to 3 September 2026)

Two things we can do without a single peso, and are doing now.

- **Ten structured interviews with teachers**, using the ten-question script already written into our research.
- **A working demonstration** of the full loop: record a child, score the reading, produce the report.

The engineering plans are finished. What stands between us and a demonstration is build time, not unanswered questions.

### Phase 1 — Prove it in a real classroom (September 2026 to February 2027)

Finish and harden the app against the standards in Section 7. Register the business legally. Obtain the research permit from the Quezon City Schools Division. Then run a **free pilot in one to three Quezon City public schools**: two to three teachers, 100 to 150 children, four weeks.

We will judge ourselves on four measurable things:

| What we will measure | Target |
|---|---|
| Time to assess one child, including setup | under 4 minutes |
| Share of a class assessed within one week | 100%, versus partial sampling by hand today |
| How often teachers have to correct the app's judgement | under 10% of scored words |
| Whether teachers trust it | captured by survey after the pilot |

The second row is the one that matters most to us. Speed is only worth having if it converts into **complete coverage** — every child assessed, including the slow readers who get skipped today.

**One honest limit on what this pilot can prove.** At launch the app scores English only. So the pilot validates the English half of a two-language test. Filipino passages can be recorded and reviewed by the teacher, but not automatically scored until Phase 3.

### Phase 2 — First revenue (March to August 2027)

Convert to eight paying private schools. Ship the remaining official form exports. Publish a short results brief written for a Division Office audience — not for us.

### Phase 3 — First division deal, and formal proof (September 2027 to August 2028)

Sign the first paid division contract. Begin the formal accuracy study our own research says is the credible bar: 300 children across three different types of school, each recording independently scored by two trained Department of Education reading coordinators who cannot see each other's marks, with a third expert settling any real disagreement.

The statistical targets are the standard ones used to prove a test instrument agrees with expert humans. In plain terms: the app's word-per-minute figures must line up with the experts' almost exactly, and its reading-level judgements must match theirs the overwhelming majority of the time.

Also in this phase: begin teaching the system to score Filipino, using university speech recordings under formal research agreements.

---

## 6. The Solution

**ReadiLY is a digital layer on top of the two existing reading tests. It is not a new test.**

This is the single most important decision in this plan. A tool that automates the reading part but still leaves the teacher to type up the results is — in the words of our own research — *an exacerbation of their administrative burden*. It only becomes valuable when the official paperwork comes out the other end.

### How a session actually works

The teacher picks a child and a passage matched to their grade. The child reads aloud. The tablet records locally, compares what it heard against the text it knows the child was supposed to read, and within thirty seconds returns:

- **Words read correctly per minute, and accuracy as a percentage** — calculated using the government's own formula, not ours.
- **A map of every mistake**, labelled by type: a word skipped, a word swapped for another, a word added, or a word the child corrected themselves. The app waits three words before deciding, so a child who stumbles and then fixes it is not penalised — which is exactly what the official rules require.
- **The child's official reading level.** Independent (97–100% accuracy), Instructional (90–96%), or Frustration (89% and below).

Three minutes per child instead of fifteen is what turns "assess a sample of the class when there is time" into "assess all forty in the first week." Coverage, not speed, is the outcome we are buying with that time.

### The feature that decides whether schools adopt this

Results do not stop at the teacher.

Schools must submit these results through the Department of Education's national portal, against fixed deadlines each term. So ReadiLY exports the **official spreadsheet that portal accepts**, already filled in. Nothing is retyped.

To be exact about where our responsibility ends: we produce the file, the teacher still uploads it.

That single step is what turns ReadiLY from optional software into the easiest available path — and it is in the first release, not promised for later. It is, honestly, a *buying* argument rather than a mission: it is why a principal signs. What the signature buys is the coverage described above.

### The teacher can always overrule the app

Every word the app marked as a mistake appears as a tappable item on screen. The teacher can change any judgement, the score recalculates instantly, and the record is saved as teacher-adjusted.

This is not us hedging. It is the design.

A teacher who cannot overrule a score will not trust it, and a tool teachers do not trust gets quietly abandoned. There is a second benefit: every correction a teacher makes tells us exactly where our system was wrong. During the pilot, that becomes our sharpest measure of accuracy.

### What the teacher sees across the whole class

A summary of the class by reading level, a bar showing how many children have been assessed, and a "needs attention" list.

**We are explicit in the app itself that this list is based on simple rules, not a prediction.** A child is flagged if their latest level is Frustration, or their accuracy has fallen across the last three sessions, or they are in the bottom tenth of the class by reading speed. We do not claim to predict which children will struggle later, because we cannot yet prove such a claim.

### What we measure — and what we do not

Reading speed and accuracy measure whether a child can *recognise words*. They do not measure whether the child *understood* the passage.

We state this plainly because the difference matters. Research on early grades consistently finds these two things are strongly related but far from identical — reading aloud well predicts comprehension reasonably, and substitutes for it badly.

So ReadiLY tells a teacher which children to look at closely. It does not tell her a child understood what they read, and nothing in the interface pretends otherwise.

### Working without internet is the design, not a backup mode

Class lists, passages, recording, scoring, the dashboard, and the export all work with the tablet in airplane mode. When a connection does appear, only the scores sync — never the audio.

Even those scores are stripped down: the cloud sees a child's initials and their official learner reference number, never their full name. A school can use the app with no account at all.

The app also handles Philippine accents the way the official rules require. The rules state that regional pronunciation is not a reading error, so we treat the common substitutions — *p* for *f*, *b* for *v*, *t* for *th* — as correct by default, and this can be tuned per division.

### On language: the problem just got much smaller

At launch, automatic scoring is English only. There is simply no Filipino speech engine small enough today to fit in the memory a tablet can spare.

This used to look like an impossible problem, because the mother-tongue policy implied supporting nineteen or more languages. **It no longer is.** The Department of Education ended compulsory mother-tongue teaching for Kindergarten through Grade 3 starting in the 2025–2026 school year. That leaves Filipino and English.

Nineteen languages was hopeless. Two is winnable.

In the meantime, Filipino passages can be recorded and reviewed by the teacher, with automatic scoring clearly marked *coming soon* rather than silently missing.

**Deliberately not in the first release:** comprehension scoring, predicting future risk, and a parent app. Each is a dated item on our roadmap, not something we are claiming today.

---

## 7. Proof of Concept

### What exists today, and what does not

**Exists:** thirteen designed screens; a complete seven-part engineering specification covering every component from the class list to the final export; a chosen speech engine we have verified for size and speed; and a fully specified scoring method.

**Does not exist:** the working code, and any classroom data.

We are not presenting drawings and plans as if they were a finished product.

### The one technical decision that decides whether any of this works

This is the heart of our technical claim, and it is worth explaining properly.

Most teams building something like this would reach for **Whisper**, the popular free speech-recognition system from OpenAI. We rejected it deliberately.

Whisper and systems like it are built to produce *fluent, sensible text*. If you mumble, they guess what you probably meant and write down the clean version. For dictation, that is a feature.

For a reading test, it is fatal. Give it a child who stumbles, skips words, and misreads, and it quietly repairs the transcript — turning a struggling reader into a proficient one on paper. **The score inflates for precisely the children the tool exists to find.** A tool built to find struggling readers, that hides struggling readers, has not failed partially. It has failed completely.

So we use a stricter class of system — one that commits to each word as it hears it and **cannot invent a word that was not spoken.** The specific engine is `sherpa-onnx-zipformer-gigaspeech`, compressed to run efficiently on a phone-class processor.

Three numbers matter, and they are all checkable:

| Measure | ReadiLY | Available on a government school tablet |
|---|---|---|
| Space on the tablet | about 69 MB | ample |
| Memory while running | about 200 MB | about 2 GB usable on a 4 GB tablet |
| Speed | faster than ten times real time | — |

For comparing what the child said against what they were supposed to say, we use a well-established sequence-comparison method borrowed from genetics, which has the property we need: it does not just tell us how different the two are, it tells us *exactly which word* was skipped, swapped, or added.

### The two tests our build must pass before any classroom sees it

These are targets, not results. And they come from the official grading bands, not from what would be convenient for us.

**Test one: do not fail a good reader.** A perfect, word-for-word reading must score **97% or higher**. Ninety-seven is exactly the threshold for the top reading level. If the app scored a flawless child at 96%, it would label them as needing instruction — and a tool that raises false alarms about strong readers gets switched off in week two.

**Test two: do not rescue a weak one.** If we feed the app a passage where ten words were never read at all, it must catch at least eight of them as omissions. This is the direct guard against the transcript-repair failure described above.

The two tests pull against each other on purpose. Passing both is what makes the score trustworthy.

And it does not need to be perfect. Two trained human examiners scoring the same child agree about four times in five. Matching a careful human is the bar — not infallibility.

### The biggest technical risk is Filipino, and we know why

Children's voices are genuinely harder for machines than adults'. Their vocal pitch sits at 250–400 Hz against roughly 200 Hz for an adult woman, and speech systems make 40–45% more errors on children than on adults.

The fix is training data, and the data exists in the Philippines:

- **The Children's Filipino Speech Corpus** — 57 children, three hours, with reading mistakes already labelled
- **BK3AT** — 122 hours, entirely Grades 1 to 3
- **UP-DSP-PLD** — 454 hours

Encouragingly, published results in this field show that **just 10 hours of children's speech beats a system trained on 960 hours of adult speech.** The problem is real, tractable, and scheduled for Phase 3.

### Why we write our own reading passages — and why that makes the product better

We cannot use the government's own passages, for two reasons. The newer test's materials are published under a licence that explicitly prohibits commercial use, and getting a custom licence is not realistic for a student team. The older test is a government work, and profiting from it requires prior approval.

Our solution rests on a basic principle of copyright: you cannot copyright a *method*, only the specific words used to express it. The scoring formulas and the level names are methods. So we follow those exactly and write all the passages ourselves.

That constraint turned out to improve the product.

The official test ships **four parallel sets of passages (A through D)**, and for a good reason: a child tested three times a year must never read the same text twice, or part of the "improvement" is just familiarity with the story. We mirror that design exactly — **24 original passages**, four matched sets per grade per language, rotated across the start, middle, and end of the year.

We match them the same way the official test does: same word count, same vocabulary difficulty, same sentence complexity, same theme. And we set them somewhere Filipino children actually recognise — the sari-sari store, the jeepney, the fiesta.

Before any commercial sale that reproduces the official form layout, we will seek Department of Education approval.

### Hardware: one tablet per teacher, not per child

This matters, because it is the difference between an affordable idea and an impossible one.

The tablet stays with the teacher. That matches how government-issued devices are actually distributed today — the ratio is roughly one device per nine students, and those devices are issued to teachers. A school with three sections per grade needs three tablets, and because children are tested one after another anyway, even a single shared tablet per grade level works.

The government has distributed over 1.25 million devices to about 93% of public schools.

**Our honest open question,** and the first thing we will check before committing to any division: how many of those devices are actually still working in the specific schools we target.

### The risk nobody else's marketing mentions: classroom noise

Philippine classrooms are often open-air and loud. And six-year-olds are not used to microphones — a shy child can score lower than they should and be wrongly labelled.

That is the same failure we built the whole system to avoid, arriving from the opposite direction, so we treat it as a measurement problem rather than an annoyance:

- A ₱150 boom microphone headset ships in the onboarding kit
- The app checks the background noise level before recording and warns the teacher when conditions are too poor to score fairly
- Every child does a one-minute warm-up read that is recorded but not scored

Whether that is enough is an explicitly named question for the pilot. It is also part of why teachers can always overrule the app.

### Getting paid: the step most student plans skip

Two undergraduates cannot simply invoice a government Schools Division Office.

Before any paid work we must register the business (a sole-proprietorship registration now, a corporation before any division contract), register with the tax bureau and issue official receipts, and enrol in the government's electronic procurement system. Donations under the Adopt-a-School programme additionally require the business to have existed for a year.

This is exactly why our Year 1 revenue comes from **private** schools, which can transact with a simply-registered business immediately, while the public school pilot runs unpaid under a research permit. Registration is funded in the Year 1 base case.

### Government purchasing rules are, unusually, on our side

The Philippines rewrote its procurement law in 2025, and three provisions matter to us:

| Rule | What it means for a school |
|---|---|
| **Direct Acquisition up to ₱200,000** | The school can just buy it. No bidding, no committee, no collecting competing quotes. |
| **Small Value Procurement up to ₱2,000,000** | A division-sized purchase can be awarded on a single valid quotation. |
| **Section 37** | Government agencies are expressly permitted to buy directly from qualified startups. |

Our per-school pricing sits deliberately below that ₱200,000 line. **A school principal can buy ReadiLY without running a bidding process.**

### What buying it actually looks like

A school goes from decision to data in under a week.

We send a quote with the legal purchasing justification already attached. The principal buys it directly — no bidding. We come to the school for a one-hour session training the teachers who will train the rest, and load the class lists from a simple spreadsheet. The first class is assessed that same week. At the end of the term, the completed government form is exported in time for the deadline.

Nothing in that sequence needs internet, new hardware, or approval from the national office.

### Training, and the auditor question

Teacher training is one hour, delivered on site. There is genuinely no new test to learn — ReadiLY administers the one they already run. That is the whole point of positioning it as a layer rather than a replacement.

Separately, school heads are historically nervous about charging recurring software to their operating budget, because the state auditor may question it. Our answer, which we supply in writing with every quote: this is a diagnostic instrument tied to a legally mandated test and to an eligible national tutoring programme, purchased under the direct-acquisition rule with a single quotation.

### Continuity, because we are two students and buyers should ask

Three promises a school can hold us to:

1. **The data is the school's.** It exports to a plain spreadsheet on demand. Nothing is trapped inside our system.
2. **The app keeps working even if we stop.** Scoring happens on the tablet and needs no server of ours, so it functions offline for the whole paid term regardless of what happens to us.
3. **Support is next-business-day** by phone and Viber during the school year — the channel Philippine teachers actually use.

### Privacy, treated as a design constraint rather than a policy page

Under Philippine data privacy law, a child's voice counts as biometric personal information, and their resulting assessment score counts as *sensitive* personal information — the most protected category.

Processing on the device does not exempt us from that. The score is still sensitive data.

So our position is:

- **Audio never leaves the tablet.** Not for processing, not for backup.
- **The school is the data owner; we are only the processor**, under a formal written agreement with the division — not an informal memorandum.
- **Written parental consent is required**, following the Department's own consent rules, with a non-digital alternative for families who decline.
- **We register with the National Privacy Commission and appoint a data protection officer** once we handle sensitive data for more than a thousand individuals.
- **The app enforces this.** The microphone will not activate until the teacher confirms a signed consent form is on file.

---

## 8. Market Analysis

### Why now, and not three years ago

Four things changed in the last eighteen months. Together they open the window.

**1. The tablets are being funded.** The Department of Education's 2026 budget is ₱1.015 trillion — above 4% of national economic output for the first time — and ₱10.6 billion of it goes to school computerisation. That is the exact hardware ReadiLY runs on, and it is being bought right now.

**2. A new law needs precisely our output.** The ARAL tutoring act covers 6.7 million children and requires their progress to be monitored. The 2025 education-fund circular requires cities to build six-year plans *driven by the results of these two reading tests*.

**3. Political attention.** The congressional education commission's *Turning Point* report calls for resources to be moved to the earliest grades and for an end to automatically promoting children who cannot read.

**4. The language problem collapsed.** Compulsory mother-tongue teaching for the youngest grades ended in 2025–2026. What was a nineteen-language problem is now a two-language problem.

### How big is this, honestly

We built this from the ground up rather than taking a percentage of some global figure.

| | Who that is | Children in Grades 1–3 | Worth per year |
|---|---|---|---|
| **Everyone who could use it** | Every Grade 1–3 child in the country — 5.9M public, 0.5M private | about 6.4M | about ₱512M |
| **Who we could realistically serve** | Metro Manila and other urbanised divisions that already have tablets and active literacy programmes, plus private schools | about 900,000 | about ₱72M |
| **What we target in 36 months** | Quezon City at 30% coverage (~38,700 children) plus 60 private schools (~12,000) | about 50,700 | about ₱4.1M |

Quezon City is the largest school division in Metro Manila: **95 public elementary schools and 258,201 elementary children**, of whom roughly 129,000 are in Grades 1 to 3. Covering the whole division would be worth ₱7.7M a year at our division rate. We model reaching 30% of it, or ₱2.3M, plus ₱1.8M from private schools.

**We deliberately do not forecast beyond what we just said we could reach.** Our Year 3 plan touches 36,000 of those 50,700 children (71%) and earns ₱3.24M of the ₱4.1M (79%).

### Who we are actually competing with

| Alternative | What it is | Why it does not close this gap |
|---|---|---|
| **Doing nothing differently** | Pen, stopwatch, spreadsheet | Free, familiar, entrenched — this is our real competitor |
| **Microsoft Reading Progress** | Free inside Microsoft Teams; nationwide rollout with DepEd announced February 2026 | See below |
| **Amira Learning** | US product, extremely accurate, about ₱1,120 per child per year | Needs constant internet; not adapted to the Philippines; priced for American school districts |
| **SoapBox Labs** | A genuinely offline children's speech engine | No Philippine language support; sold as a component to other companies, not as a finished product |
| **Wadhwani AI** | Same idea, running in 30,000+ Indian government schools | Not in the Philippines — and useful proof that this approach works at government scale |

### Microsoft is the serious threat, and it deserves a straight answer

In February 2026, the Department of Education and Microsoft announced a nationwide rollout of Reading Progress, citing deployments in Bais City (60 schools, 14,000+ children) and Cabanatuan. It is free, and Microsoft has a national agreement we do not have.

Our mentor asked exactly the right question: *why* can these companies not just go offline and localise? Because if the obstacle is one only we can clear, that is a real advantage. If not, we merely have a head start.

We looked. All four obstacles are structural, not technical.

**Technically, offline is a different product, not a setting.** Reading Progress works by sending audio to Microsoft's cloud from inside Teams. Removing the cloud does not mean flipping a switch — and Microsoft's education business earns its money from exactly the cloud accounts and licences that an offline tool bypasses.

**Financially, the numbers never work.** Recognising Filipino children reading aloud requires recordings of Filipino children reading aloud, and almost all of that data sits inside Philippine university archives reachable only through Philippine institutional agreements. Meanwhile 6.4 million Filipino children at Philippine prices is a rounding error next to US school-district revenue. The business case never clears the bar.

**Practically, it gives the teacher Microsoft's report, not the government's form.** She still retypes everything before submitting.

**Legally, it needs a Microsoft account for every child.** Creating cloud identities for six-year-olds and routing their voices to servers abroad runs against Philippine data privacy law and government rules on where data must reside.

**None of this is something Microsoft could not do. It is something Microsoft has no reason to do.**

### "Why doesn't the government just build it?"

It tried the nearest thing, and the result is the automatic spreadsheet teachers currently fight with.

The Department of Education is good at designing tests and writing policy. It buys software rather than engineering it — which is precisely why the new procurement law contains a clause letting agencies purchase directly from startups.

So the risk is not that the government builds a competitor. **The risk is that it standardises on a free foreign tool before a compliant local one is ready.** That is the clock we are running against.

### Where our real advantage lies

Not "it works offline" and not "it uses AI." Those are features a competitor could copy in a year.

Two things compound instead.

**The workflow becomes ours.** Once a school's official reporting runs through ReadiLY, the cost of leaving is not the software — it is going back to doing the paperwork by hand, mid-year.

**The recordings become ours.** A properly labelled archive of Filipino children reading aloud is what decides who eventually owns this category. And because ten hours of children's speech beats 960 hours of adult speech, it is achievable at our size.

**Those two ambitions can conflict, so we are explicit about the rule.** As the school's data processor, we cannot quietly reuse their children's recordings to train our system. So the research archive is a *separate*, opt-in agreement with its own consent process, and a school that declines gets exactly the same service. Where consent is not given, we fall back on the university archives under formal research agreements.

A smaller lawful dataset beats a larger unenforceable claim.

Working offline buys us the time. The workflow and the archive are what we build with that time. And the underlying engine generalises: it is fundamentally a system that compares spoken words against a known text, so the same core extends to Grades 4 to 6, and to oral numeracy under the tutoring programme's mathematics phase. We claim neither today — but ₱512M is the floor of this opportunity, not the ceiling.

---

## 9. Business Model

### What we charge

We charge per child per year, following our mentor's guidance, with a volume discount and a minimum order.

| Tier | Price | Minimum | Who it is for |
|---|---|---|---|
| **Per school** | ₱150 per Grade 1–3 child per year | ₱25,000 per school | Private schools — how we get started |
| **Per division** | ₱60 per Grade 1–3 child per year | 5,000 children (₱300,000) | City-funded divisions — how we scale |

Three ways to sanity-check that price:

**Against the school's own budget.** A public elementary school of 500 children, of whom roughly 250 are in Grades 1 to 3, pays about ₱37,500 a year. That is 2.7% of its annual operating budget.

**Against the purchasing rules.** ₱37,500 is comfortably under the ₱200,000 direct-purchase ceiling. No bidding, no committee — the principal decides.

**Against competitors.** We are 7 times cheaper than Amira at school pricing and nearly 19 times cheaper at division pricing, and an order of magnitude below Quipper (₱4,000–10,000 per child per year).

And on pure salary cost, the roughly 250 teacher-hours a nine-teacher school gets back each year is worth more than the licence — with the difference that the licence is an expense and the hours come back as teaching.

### How we sell: private schools first

Our mentor was direct that building a business dependent on government sales is a mistake, and that private schools decide faster and more predictably. We follow that.

**Private schools are the revenue.** The Quezon City public pilot runs alongside it for proof and credibility, not for Year 1 income. Division sales come later, backed by published pilot results and funded from the education-fund budget lines identified in Section 3.

**How we reach the first eight schools.** We have no warm customer, and we will not pretend otherwise. Two routes.

The better one is our own university's College of Education. Its teaching-practicum programme places student teachers in partner schools every term — meaning existing relationships with real Grades 1–3 classrooms, and faculty who can confirm we are not strangers off the street.

The second is cold outreach: private school associations, principals' groups, and the Facebook groups where Philippine teachers actually organise.

Our working assumption is 60 serious approaches, leading to about 24 demonstrations, leading to 8 sales — a 13% conversion rate. That is an assumption rather than an observation, and it is exactly what the first ten teacher interviews exist to test.

**Why a school renews.** Renewal happens once a year, at the start of the school year — not monthly. And the reason to renew is the same as the reason to buy: the official reporting now runs through ReadiLY, and going back means returning to stopwatches and manual typing halfway through a cycle. Within a school, the natural expansion is from Grades 1–3 into Grades 4–6, roughly doubling the licence without a new sale.

### What each customer actually costs us

**Serving one more assessment costs us nothing.** Because the speech processing happens on the tablet rather than on rented servers, there is no per-recording fee. For comparison: cloud speech processing runs ₱0.26–1.44 per hour of audio, and a hundred-school deployment would generate 16,000 hours a year. That entire cost line is zero for us.

Our real per-school costs are training and setup (₱5,250, within the government's own training-cost caps) and support (about ₱500 per school per year). Our servers only ever handle text, and stay under ₱10,000 a month even at division scale.

**Those costs imply we keep 81 centavos of every peso.** We deliberately model 75 instead, to absorb extra support calls, second training visits, and payment friction in the early accounts. **₱22,500 kept per school per year** is the number every figure below is built on.

One clarification, because these two lines look similar: the ₱5,250 setup cost applies to *paying* schools. The "pilot and onboarding logistics" line in the cost table below is separate — it funds the free public school pilot, travel, headsets and materials, none of which earn revenue.

**We break even at 12 schools.** ₱250,000 of fixed annual costs divided by ₱22,500 kept per school. Twelve private schools in Metro Manila is a concrete, countable target — not a market-share percentage.

**And it scales rather than merely grows.** Because the processing runs on the device, serving the hundredth school costs the same as the tenth. Our margin rises to roughly 84% at division scale, against under 76% for anyone dependent on cloud processing. The same app serves any division in the country with no new infrastructure. What limits our growth is relationships, not cost.

### Three-year projection

An average private school pays about ₱30,000 — roughly 200 Grade 1–3 children at ₱150 — so the price list and the forecast agree by construction. Each division contract we model covers about 12,000 children at ₱60, or ₱720,000.

| | Year 1 (2026–27) | Year 2 | Year 3 |
|---|---|---|---|
| Private schools (running total) | 8 | 28 | 60 |
| Division contracts (running total) | 0 (1 free pilot) | 1 | 2 |
| Children reached | ~1,600 | ~13,600 | **~36,000** |
| **Revenue** | ₱240,000 | ₱1,296,000 | ₱3,240,000 |
| Kept after direct costs (75%) | ₱180,000 | ₱972,000 | ₱2,430,000 |
| Fixed running costs | ₱250,000 | ₱755,000 | ₱1,735,000 |
| **Profit / (loss)** | **(₱70,000)** | **+₱217,000** | **+₱695,000** |

We model **two** division contracts by Year 3, not three. Each one needs a research permit, an internal champion, and two to six months of relationship-building. Forecasting three would contradict what we say everywhere else about how slowly government moves.

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

### What a customer is worth over time

Monthly cancellation rates — the standard software metric — simply do not apply here. A school buys a licence once a school year. What matters is whether they renew annually.

Assuming a school stays with us three years, each one is worth **₱67,500** in retained revenue (₱22,500 × 3). The widely used rule is that a customer should be worth at least three times what it costs to win them, which sets our ceiling for winning a school at ₱22,500.

We do not yet know what it actually costs us to win a school, and we will not invent a figure. ₱22,500 is simply the number Year 1 has to come in under.

### Why we need money at all, given a loss of only ₱70,000

This is the part a first reading might miss.

Schools pay at the *start* of the school year. But writing the passages, registering the company, buying test tablets, and setting up the pilot are all spent *before* the first invoice goes out.

**The gap between money going out and money coming in — not the ₱70,000 loss — is what the ₱250,000 funds.** A plan that showed only the loss would understate what it actually takes to reach the first payment.

### The ask: ₱100,000 is enough; ₱250,000 lets us run at full speed

We will not present money we do not have as though it were committed.

The plan is deliberately built so that **the ₱100,000 Startup QC grant alone gets us to a tested pilot**, spent in strict priority order:

| Priority | What it buys | Grant only (₱100,000) | Fully funded (₱250,000) |
|---|---|---|---|
| 1 | Writing the 24 original reading passages | ₱50,000 | ₱50,000 |
| 2 | Business registration and privacy documents | ₱30,000 | ₱60,000 |
| 3 | Servers and tools, 12 months | ₱20,000 | ₱30,000 |
| 4 | Pilot and school setup logistics | deferred | ₱80,000 |
| 5 | Test tablets | deferred | ₱30,000 |
| | **Total** | **₱100,000** | **₱250,000** |

Passages come first because without them there is no product we can legally sell. Registration second, because without it nobody can pay us.

**And here is the honest version of the grant-only case.** With ₱100,000 we test on borrowed and personal tablets and run a **single-school pilot** instead of the full three-school plan. That puts Year 1 at roughly four paying schools and ₱120,000 of revenue against ₱100,000 of costs — near break-even, but it pushes real growth out by a year.

The extra ₱150,000 we would raise from friends and family, the route our mentor identified as normal at this stage. That is what buys the full three-school pilot and the Year 2 figures above. **We have not raised it, and we do not treat it as secured.**

---

## 10. The Team

Two founders, two clearly divided halves of the problem. Both are undergraduates at the Polytechnic University of the Philippines, graduating in 2027.

**Yhasmen Nogales — Artificial Intelligence Lead**
*1st Runner-Up, Agentic AI Hackathon 2025 · Winner, DOST 7th iMake.WeMake*

Owns everything to do with the voice: choosing the speech engine and proving it fits on a school tablet, the scoring and mistake-detection logic, handling Philippine accents fairly, and the Phase 3 work of teaching the system Filipino. The central technical decision in Section 7 — rejecting the popular speech system for a stricter one, so that no struggling reader is scored as fluent — is hers to defend and hers to prove against the two acceptance tests.

**Caryl Joy A. Atienza — App and Product Lead**
*1st Runner-Up, BPI Datawave 2025*

Owns everything the teacher actually touches: the thirteen designed screens, making the whole app work without internet, the correction interface, and the government form export that Section 6 identifies as the feature that decides adoption. Also owns getting schools set up and the relationship with them.

Three national competition placements between us is real evidence that we can build and ship under deadline pressure. **It is not evidence that we can sell to a government office, and we will not present it as though it were.**

### What we are missing, and the order we will fix it

Our mentor was clear that our limiting factor is not engineering:

> *"It's really the education domain expert / B2G sales expert, mainly because the tech development will naturally follow once you've invested into understanding the market."*

We accept that ordering completely.

**1. An education expert with real Department of Education classroom experience.** Our first advisory priority, to be brought in before the pilot begins. We will recruit through Startup QC mentorship and through the pilot teachers themselves, who double as expert validation.

**2. Someone who knows government sales and has division relationships.** Our mentor's warning was blunt: government adoption does not happen without an insider willing to vouch for you. Finding that person inside the Quezon City division is a named Phase 1 objective, not a wish.

**3. Deeper speech-technology expertise.** Being addressed through academic partnership with the University of the Philippines Diliman's speech laboratory and De La Salle University, who hold the Filipino children's recordings our Phase 3 roadmap depends on.

**We have not yet engaged a named education adviser, and we are not claiming otherwise.**

### On whether we will still be here in two years

Both of us graduate in 2027. ReadiLY is not a class project we intend to shelve at graduation.

The Year 2 plan puts us on salaries and hires our first employee — the point at which this stops being our thesis and becomes our job. We would rather state that intention now and be held to it.

---

## 11. Conclusion

We will not put a peso figure on what literacy does for the economy. Our research does not support that claim at the precision a judge should demand of us.

What we can say is narrower and true.

Philippine policy — the "No Read, No Pass" rule and the new tutoring act — makes reading ability a gate on moving up a grade. Roughly half of Filipino children in Grades 1 to 3 are not reading at their level. The tool for finding those children already exists, and already works when schools act on it.

It is failing for one reason: it costs a teacher a full working week each year to give and to encode. So it gets shortened, and the children who read slowest are the ones who get missed.

**Give that week back, and it gets spent teaching the children the test just found.**

ReadiLY has not been proven in a classroom, and this plan says so plainly rather than burying it. What we ask Startup QC for is specific and achievable inside your programme: ₱100,000, access to Quezon City schools, and the institutional credibility to get a research permit faster than two undergraduates could manage alone.

The next twelve months are about closing the gaps this document names — not pretending they are already closed.

Here is what success looks like, concrete enough that you can hold us to it.

A Grade 1 teacher in Quezon City knows every one of her forty children's reading levels in the first week of school. Not a sample of them. All of them — including the boy who reads slowest, who in any other year would have been quietly skipped because he takes fifteen minutes and there are thirty-nine others waiting. She spends the five weeks she used to lose to testing on the children the testing found.

Every child found in week one is a child who gets help while helping them is still easy.

That is the whole idea. Not that a tablet can assess reading better than a teacher — but that it can find the children she needs to reach, and give her back the time to reach them.

---

## References

**Statistics.** World Bank (2024), *Philippines Learning Poverty Brief*, Apr 2024 v2 · Philippine Statistics Authority (2025), *2024 Functional Literacy, Education and Mass Media Survey* · DepEd CRLA End-of-School-Year Report 2024–2025 and QC CRLA Report 2025–2026 · EDCOM 2 (2026), *Turning Point*, and *Fixing the Foundations* (2025) · Department of Budget and Management, FY2026 National Budget.

**Law and policy.** RA 12028 (ARAL Program) with DO 18, s. 2025 and DM 001, s. 2026 · RA 12009 (New Government Procurement Act), implementing rules Feb 2025 · RA 10173 (Data Privacy Act) and RA 10367, with NPC Advisory Opinion 2025-017 and NPC Circular 2022-04 · RA 8293 §176; CRLA materials licensed CC BY-NC 4.0 (DepEd/USAID/RTI) · DO 16, s. 2017; DO 40, s. 2012; DO 40, s. 2015; DO 15, s. 2017; DO 45, s. 2002 · Joint Circular No. 1, s. 2025 (Special Education Fund) · DepEd (2025) order ending mandatory Mother Tongue instruction for K–3 · DepEd Bureau of Learning Delivery submission portal, `bld.deped.gov.ph/submission`.

**Market.** Microsoft Philippines / DepEd (2026), nationwide Reading Progress rollout, February 2026 · Phil-IRI Manual (2018), parallel Sets A–D.

**Internal research** (ReadiLY team, 2026, `docs/research/`): Technical Feasibility Assessment · Validation of Automated Oral Reading Fluency Systems · Legal and Compliance Assessment · The Landscape of AI-Powered Oral Reading Assessments · Architecting Offline-First Educational AI in the Philippines · Strategic Pathway for AI-Driven EdTech Integration · Systemic Realities of Early Grade Reading Assessments · Diagnostics and Dysfunctions: Teacher and Student Pain Points in Phil-IRI and CRLA.

**Startup QC.** EJ Arboleda (Taxumo), *Unit Economics and Working Capital Management* · Guita Gopalan, *From One Customer to a Real Market* · Abe Lozada (LaunchGarage), *Pitch Deck 101* · Mentor feedback: Cody Flores, July 2026.

# ReadiLY — Mentoring Session Question List

Prepared for the Startup QC mentoring session to review the ReadiLY business plan.
Grounded in `ReadiLY_Business Plan V1.md`, `ReadiLY_Lean_Canvas.md`, and `ReadiLY In-Depth Details.md`.

---

## A. Questions to ask the mentor

### Business model & revenue

1. Our end users are public school teachers, but our paying customers are DepEd, LGUs, and private schools. How do we validate willingness-to-pay when the user and the buyer are different people?
2. B2G sales cycles with DepEd/LGUs are notoriously long. Should our first revenue come from private schools or NGO/CSR partnerships instead, and how do we sequence that?
3. What's a realistic pricing structure for this market — per student, per teacher, per school, per division? What comparable deals have you seen in Philippine edtech?
4. We haven't built financial projections yet (no revenue targets, cost estimates, or break-even analysis in the plan). What level of financial detail does a pre-product startup at our stage actually need?
5. How should we think about funding — grants (DOST, DTI, Startup QC), competitions, or angel investment — given we're pre-product?

### Validation & pilot

6. We're planning a pilot with 1–3 schools, 2–3 teachers, 100–150 students over 2–4 weeks. Is that enough to produce credible evidence, and what specific metrics would convince a DepEd division or an investor?
7. What's the right way to get pilot access to public schools — do we need a DepEd research permit or division-level MOA, and how long does that take?
8. How many teacher interviews or classroom observations should we do *before* building anything, and what should we be trying to disprove?

### Competition & positioning

9. DepEd already mandates Phil-IRI and CRLA. Should we position as a digital layer on top of those official assessments (with score mapping), or as a separate tool? Which is easier to sell?
10. Global tools like Amira Learning and Microsoft Reading Progress already do AI oral reading assessment. Is "localized for Filipino/Tagalog/mother-tongue + offline-first" a durable moat, or do we need something more?

### Regulatory & risk

11. What are the compliance requirements for processing children's voice data in the Philippines (Data Privacy Act / NPC rules), and at what stage do we need a DPO or privacy review?
12. What are the biggest reasons you've seen edtech pilots in Philippine public schools fail to convert into paid contracts?

### Team & execution

13. We're a two-person student team. What key gaps (ML engineering, education domain expert, B2G sales) should we fill first, and how — hires, advisors, or partnerships?
14. Given limited resources, what should our MVP scope be — full diagnostic AI, or a simpler version (e.g., timed WPM + accuracy on-device) that we can pilot fast?

---

## B. Questions to prepare answers for (the mentor will likely ask these)

1. **What evidence do you have that teachers want this?** The plan cites World Bank/UNESCO statistics but no primary research — no teacher interviews, surveys, or letters of intent. Bring any you have, or a plan to get them.
2. **Who pays, how much, and when do you break even?** The revenue streams section lists categories but zero numbers — no pricing, TAM/SAM/SOM, or cost projections.
3. **Can your ASR actually work on Filipino children's speech?** Whisper/wav2vec 2.0 are cited, but child speech recognition in Tagalog/Cebuano/mother tongue is a known hard problem, and there's no named training dataset. What's your data collection plan and accuracy target?
4. **How is this different from Phil-IRI digitization efforts or Microsoft Reading Progress (which is free)?** "Offline-first + local" needs a sharper answer.
5. **What happens when a teacher's low-end phone can't run on-device inference?** The edge-AI claim needs a minimum device spec.
6. **What's your timeline and what will you have built in 3, 6, 12 months?** The phases in the plan have no dates or costs attached.
7. **Why is the team the right one to build this?** Prepare your "unfair advantage" answer — the current one lists product features, not team advantages.

---

## C. Inconsistencies to fix in the plan before the session

These will be noticed by a careful reader:

- **Features 1 and 2 in the Business Plan have identical descriptions** (both say "Captures and analyzes student reading in real time…") — Feature 2 (Real-Time Learning Gap Diagnosis) needs its own text.
- **The product title differs across docs**: "Real-Time Reading Intelligence" (business plan) vs. "AI-Powered Early Talent Intelligence System" (in-depth doc). Pick one framing.
- The plan labels teachers "Primary Users (B2C)" but the Lean Canvas revenue is entirely B2G/B2B — clarify that teachers are users, not customers, or the mixed label will draw questions.
- The Input Layer description in the feasibility section has garbled text ("Karaoke style words, reading a thetat words…") — worth cleaning up.
- The Lean Canvas UVP section only has the high-level concept ("Google Maps for Literacy") — the actual one-sentence UVP is still blank.

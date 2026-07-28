# Retro / Postmortem: [Milestone or Incident Name]

> **How to use:** Run within a week of a milestone (retro) or within 48h of an incident (postmortem) while memory is fresh. Timebox to 30-60 min. **Blameless rule:** we assume everyone acted reasonably with the information they had — we fix systems and processes, not people. A retro without action items is just venting.

- **Date:** [YYYY-MM-DD]
- **Participants:** [names]
- **Type:** Milestone retro / Incident postmortem

## Summary

- [2-3 sentences: what shipped or what happened]

---

## For milestone retros

### What went well 🟢
- [Keep doing this — be specific: "writing the TDD first caught the sync problem early"]

### What didn't go well 🔴
- [Be specific about the pain: "spent 3 days on X because Y wasn't decided"]

### What we learned 💡
- [Surprises, wrong assumptions, things we'd tell our past selves]

### Metrics check
- [How did we do against the PRD success metrics? Plan vs. actual timeline?]

---

## For incident postmortems

### Impact
- **Duration:** [detected HH:MM → resolved HH:MM]
- **Who/what was affected:** [users, data, features — quantify if possible]

### Timeline
| Time | Event |
| :--- | :--- |
| [HH:MM] | [First bad deploy / trigger] |
| [HH:MM] | [Detected — how? alert or user report?] |
| [HH:MM] | [Mitigated] |
| [HH:MM] | [Fully resolved] |

### Root cause
- [Ask "why" ~5 times past the surface symptom. "The deploy broke login" → why → why → until you hit a process/system cause]

### What went well / what got lucky
- [e.g. rollback worked in 5 min / e.g. only caught because a user emailed — that's luck, not detection]

---

## Action items (required — the whole point)

> Each has ONE owner and a date. 2-5 items max; ten items means zero get done.

| # | Action | Owner | Due | Done |
| :--- | :--- | :--- | :--- | :--- |
| 1 | [e.g. add regression test for empty class list] | [name] | [date] | ☐ |
| 2 | [e.g. add crash-rate alert so users aren't our monitoring] | [name] | [date] | ☐ |

- [ ] Action items reviewed at next check-in (put it on the calendar now)
- [ ] Anything decision-worthy copied into the decision log

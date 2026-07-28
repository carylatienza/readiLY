# Ops & Monitoring: [Project Name]

> **How to use:** Fill this in before your first real users — launch day is too late to discover you're blind. The test: **if it broke right now, would you know before a user tells you?** For small projects, the ★ items are the minimum.

- **Author:** [name]
- **Date:** [YYYY-MM-DD]

## 1. Metrics & alert thresholds

> One row per thing that can hurt you. "Normal range" comes from observing a healthy week; set alerts outside it.

| Metric | How measured | Normal range | Alert when | Who's notified |
| :--- | :--- | :--- | :--- | :--- |
| ★ Error/crash rate | [crash reporting / error tracker] | [< 0.5%] | [> 2%] | [ ] |
| ★ Core endpoint latency | [request timing logs] | [≤ 500ms] | [> 2s sustained] | [ ] |
| AI/API cost per day | [provider billing / token metadata] | [₱/$ N] | [> 2× normal] | [ ] |
| AI usage per request | [tokens or seconds per call] | [≤ N] | [> 5× normal (runaway)] | [ ] |
| DB connections / storage | [db dashboard] | [ ] | [near tier limit] | [ ] |
| [Business pulse: e.g. assessments completed/day] | [analytics event] | [ ] | [drops to 0 — something's broken] | [ ] |

- **Tools:** [error tracking: Sentry/Crashlytics] · [uptime ping: free tier of UptimeRobot/etc.] · [analytics: ]
- ★ **Uptime check on the health endpoint** pings every [5] min and emails/messages on failure

## 2. Logging conventions

- **Format:** `[TIMESTAMP] [LEVEL] [COMPONENT] message` — structured, one event per line, machine-greppable
  - Example: `[2026-07-12T14:00:00Z] [INFO] [ASR_ENGINE] processed assessment_123 (1.2s, 850 tokens)`
- **Levels:** `ERROR` = needs action · `WARN` = degraded but working · `INFO` = key business events only — no debug noise in production
- **Never log:** passwords, tokens, personal data, raw audio/content of minors
- **Where logs live & retention:** [platform console / file / service] — kept [N days]

## 3. Incident triage guide

> Pre-write the playbook for your 3-5 most likely failures. Add a row after every real incident (from the postmortem).

| Symptom | Likely cause | First response |
| :--- | :--- | :--- |
| [e.g. AI requests timing out] | [provider outage / oversized input] | [check provider status page; verify input size caps] |
| [e.g. DB connection errors] | [pool exhaustion / tier limit hit] | [check active connections; restart; verify pool is shared not per-request] |
| [e.g. sync failures piling up] | [ ] | [ ] |

- ★ **Severity ladder:** P0 = down/data loss (drop everything) · P1 = core flow broken (fix today) · P2 = degraded (this week)
- **Who's on point:** [name/rotation] — **escalation:** [when to wake up whom]
- P0/P1 incidents get a postmortem (`retro-postmortem-template.md`) within 48h

## 4. Routine maintenance

- [ ] Weekly: skim error tracker for new/growing issues; check cost dashboard
- [ ] Monthly: dependency security updates; verify backups actually restore
- [ ] **Backups:** [what] backed up [how often] to [where]; restore tested on [date]

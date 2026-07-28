# Release Checklist

> **How to use:** Copy this into an issue/doc per release and check it off. For small projects, use the "minimum viable release" subset marked with ★. The rollback plan is not optional — write it *before* you need it.

- **Release:** [version / name]
- **Date:** [YYYY-MM-DD]
- **Owner:** [who presses the button]

## Pre-launch QA

- [ ] ★ All planned work merged; CI green on `main`
- [ ] ★ Full test suite passes; no known blocker bugs open
- [ ] ★ Core user journeys manually tested on a production-like build ([list the 3-5 journeys])
- [ ] Tested on real target devices/browsers ([list: e.g. low-end Android, Chrome, Safari])
- [ ] UX review checklist run on new/changed screens
- [ ] Performance sanity check (startup time, biggest screen, slowest query)
- [ ] Security pass: no secrets in build, dependencies audited (`npm audit` / equivalent), auth flows re-tested
- [ ] Data migrations tested against a copy of real data (and are reversible, or backup taken)
- [ ] Analytics/monitoring events verified firing (you can't fix what you can't see)

## Release mechanics

- [ ] ★ Version bumped ([semver: MAJOR.MINOR.PATCH]) and tagged in git
- [ ] ★ Changelog updated (format below)
- [ ] Release notes / store listing text ready (user-facing wording, screenshots if store release)
- [ ] Feature flags set to intended launch state
- [ ] Stakeholders/users notified if there's downtime or visible change

## Rollback plan (write BEFORE launching)

- **How we detect trouble:** [what metric/alert/report tells us it's broken — and who watches it for the first N hours]
- **Rollback trigger:** [the specific condition — e.g. crash rate > 2%, login failures, data corruption]
- **Rollback method:** [redeploy previous tag / disable feature flag / halt staged rollout / restore DB backup]
- **Rollback owner:** [name] — **Time to execute:** [estimate]
- [ ] Rollback method actually tested at least once (a plan you've never run is a hope)

## Post-launch (first 24-48h)

- [ ] ★ Monitor errors/crashes/key metrics at [+1h, +24h]
- [ ] Triage incoming user feedback; hotfix criteria agreed (what ships now vs. next release)
- [ ] Schedule the retro (see `retro-postmortem-template.md`)

---

## Changelog format (keep at top of CHANGELOG.md)

```markdown
## [1.2.0] - 2026-07-12
### Added
- Offline queue for audio uploads
### Changed
- Dashboard sorts students by risk level by default
### Fixed
- Crash when class list is empty
### Removed / Deprecated / Security
- (as needed)
```

- Newest release on top. Every user-visible change gets a line. Write for users, not committers.

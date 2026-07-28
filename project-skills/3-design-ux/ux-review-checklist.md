# UX Review Checklist

> **How to use:** Run this on every screen/flow before calling it done — ideally on a real device, not just your dev machine. The states section is where most apps fail: design the sad paths, not just the happy one.

## The five states (check EVERY screen)

- [ ] **Loading:** skeleton or spinner shown; layout doesn't jump when content arrives; no infinite spinner if the request hangs (timeout + message)
- [ ] **Empty:** first-use/no-data state has a friendly message and a clear next action — never a blank white screen
- [ ] **Error:** failures show a human message ("Couldn't load students — check your connection") with a retry action; never a raw error code or silent nothing
- [ ] **Partial/offline:** what happens with slow or no connectivity? Is unsaved work preserved? (Critical for offline-first apps)
- [ ] **Ideal:** the happy path with realistic data volume — including LONG names, 100+ items, and 0-follower edge content

## Accessibility

- [ ] Text contrast passes WCAG AA (4.5:1); don't rely on color alone to convey meaning (add icons/labels)
- [ ] Touch targets ≥ 44×44pt / 48×48dp with spacing between adjacent targets
- [ ] All interactive elements have accessible labels (screen reader tested on the core flow at least once)
- [ ] Keyboard navigation works (web): tab order logical, focus visible, no traps; Escape closes modals
- [ ] Text scales: bump device font size to 150% — nothing truncates into meaninglessness or overlaps
- [ ] Images have alt text; form inputs have real labels (not placeholder-as-label)
- [ ] No information conveyed by sound/animation alone; respects reduced-motion setting

## Responsiveness & devices

- [ ] Checked at smallest supported size (320px-wide web / small-screen phone) and largest (desktop / tablet)
- [ ] No horizontal scroll on mobile; no absurdly long line lengths on desktop (max-width set)
- [ ] Safe areas respected (notches, home indicator); keyboard doesn't cover the focused input
- [ ] Orientation change (mobile) doesn't lose state — or lock orientation deliberately

## Interaction quality

- [ ] Every tap/click gives feedback within 100ms (pressed state, ripple, spinner)
- [ ] Destructive actions confirm ("Delete student?") and/or offer undo
- [ ] Double-submit prevented (button disables while processing)
- [ ] Back button/gesture behaves as expected — doesn't exit the app mid-flow or lose form data
- [ ] Forms: validation messages appear next to the field, on blur or submit (not while still typing); submit shows what's wrong

## Copy & clarity

- [ ] Labels use the user's words, not internal jargon ("Reading score", not "ASR output")
- [ ] Error messages say what happened AND what to do next
- [ ] Dates, numbers, currency formatted for the target locale
- [ ] A first-time user could complete the core task with no explanation — test on one real person

## Final gut check

- [ ] Watch someone unfamiliar use it for 5 minutes without helping them. Where do they hesitate? That's your fix list.

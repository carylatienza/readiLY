---
name: attach-screenshot
description: Capture screenshots of a landing/ change (desktop and phone, optionally before/after) and turn them into PR-ready markdown. Invoke when opening a PR with visible changes (create-github-pull-request calls this), or when the user says "attach a screenshot", "show before/after", or "capture the change".
---

# Attach screenshots to a PR

## 1. Is it needed?

```bash
git diff --stat main...HEAD
```

Only for visible changes under `landing/`. For docs, OpenSpec or tooling changes
return `N/A - <reason>`.

## 2. Capture

Serve `landing/` as in `verify-landing` step 1, then use the `agent-browser` skill
to screenshot the sections the diff touches at **1440×900** and **390×844**. Scroll
each section into view and wait about 700ms before capturing, or the shot catches
the reveal animation midway.

Only capture states you actually produced. Mock-ups must still show their
"sample data" labels.

## 3. Save somewhere committable

GitHub only renders images it can reach, so commit them on the branch at
`docs/screens/<feature>/<n>-<section>-<width>.png`. Keep only the curated PNGs;
don't commit traces or raw recordings.

```bash
git add docs/screens/<feature>/*.png
git commit -m "docs: PR screenshots for <feature>"
```

## 4. Before/after for redesigns

Capture `main` first into `before-*.png` (stash a dirty tree, `git switch main`),
then switch back to the branch and capture `after-*.png`.

## 5. Return the markdown

```markdown
| Before | After |
|---|---|
| ![before](https://raw.githubusercontent.com/carylatienza/readiLY/<branch>/docs/screens/<feature>/before-hero-1440.png) | ![after](https://raw.githubusercontent.com/carylatienza/readiLY/<branch>/docs/screens/<feature>/after-hero-1440.png) |
```

Raw URLs only render once the branch is pushed. If the repo is private, use a
relative link instead: `../blob/<branch>/docs/screens/<feature>/after-hero-1440.png?raw=true`.

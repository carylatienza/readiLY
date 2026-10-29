---
name: verify-landing
description: >
  Confirm the static landing page in landing/ is healthy after a change: it serves,
  loads with no JS errors, interactions work, it fits at phone and desktop widths,
  respects reduced motion, stays light, and still obeys the honesty rules. Use as
  the "did I break it?" check before committing or opening a PR.
---

# Verify the landing page

`landing/` is plain HTML, CSS and vanilla JS with no build step, package manifest,
linter or test suite. Don't invent `npm` commands. Run these in order and stop at
the first real failure.

## 1. Serve it

Run in the background (reuse it if port 8765 is already serving):

```bash
cd landing && python -m http.server 8765 --bind 127.0.0.1
```

Then check the page and its assets return 200:

```bash
for p in "" styles.css main.js assets/og.png fonts/satoshi-400.woff2; do
  echo "/$p -> $(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8765/$p")"
done
```

## 2. Drive it in a browser

Use the `agent-browser` skill (or a headless Chrome/CDP script) at **1440×900**,
**390×844** and **360×640**:

- No console errors on load.
- At 360×640 the headline, sub-headline and primary button are visible without scrolling.
- No horizontal scroll (`document.documentElement.scrollWidth <= innerWidth`).
- The mobile menu opens and closes.
- FAQ items expand; the time accordion switches; both carousels advance and wrap.
- An empty form submit shows an error per required field and focuses the first one.
- Choosing role "Other" shows its note; a valid submit shows the success state.
- With `prefers-reduced-motion: reduce` emulated, nothing translates or scales.

## 3. Static checks

From `landing/`:

```bash
grep -o 'class="confirm' index.html | wc -l   # CONFIRM markers (9 today): must not drop silently
grep -n -i -E 'testimonial|trusted by|5 stars|customers love' index.html   # expect no hits
du -ch index.html styles.css main.js fonts/* | tail -1   # aim under 250 KB, never over 1 MB
```

Also scan the visible copy for exclamation marks and the external URLs in
`index.html` for hosts other than font CDNs.

If copy changed, run the `compliance-reviewer` agent on the diff.

## 4. Report

State what passed and what failed with the real output. Don't claim "done" if a
check failed; name the cause.

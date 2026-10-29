---
name: adversarial-code-review
description: >
  Review a diff or pull request on readiLY adversarially, produce a scored rubric
  and verdict, and optionally post it to the PR. Covers the static landing page
  (HTML/CSS/vanilla JS), docs and tooling. Use before merging, or for an honest
  second opinion. Best run in a fresh session or via the code-reviewer subagent.
---

# Adversarial code review

The context that wrote the change is the worst judge of it. Assume the diff is
wrong until proven right, score it, and (if asked) post it.

## 0. Find what "correct" means here

- `CLAUDE.md`: project state (pre-implementation, no chosen app stack).
- `CONTEXT.md`: the glossary. Wrong terms in copy are a house-rules finding.
- `docs/startup qc/`: the latest business plan, lean canvas and pitch deck are the
  source for prices, numbers and claims.
- `openspec/changes/<name>/` and `.agents/plans/` if the diff implements one.
- The `compliance-reviewer` agent holds the honesty rules. Score them under House
  rules here, but leave the strict line-by-line pass to that agent.

## 1. Gather the change

```bash
git status --short
git diff main...HEAD
gh pr view <N> --json title,body,headRefName && gh pr diff <N>    # for a PR
```

Read enough surrounding code to judge it. The PR body or issue is the spec.

## 2. Score (0-5 each, weighted to /100)

| Dimension | Weight | Low score means |
|---|---:|---|
| **Correctness** | 30 | Broken interaction (FAQ, accordion, carousels, menu, form validation/success), JS error, a number that disagrees with the business plan |
| **Web platform** | 20 | Accessibility (labels, focus, contrast, keyboard, `aria-*`), layout breaks at 360/390/1440px, horizontal scroll, motion not gated on `prefers-reduced-motion`, animating layout properties, page weight over 1 MB, assets from unexpected hosts |
| **House rules** | 20 | Violates the compliance checklist or the CONTEXT.md vocabulary |
| **Simplicity** | 15 | Dead code or CSS, needless abstraction, a build step or dependency where none is needed |
| **Verifiability** | 15 | No `verify-landing` run, no screenshots for a visual change, untestable claims |

Verdict: **90-100 APPROVE**, **70-89 APPROVE WITH NITS**, **50-69 REQUEST
CHANGES**, **< 50 BLOCK**. Any Critical (a JS error on load, a broken form, an
invented result or testimonial, a privacy claim the product can't keep) caps it at
REQUEST CHANGES.

## 3. Findings

Most severe first. Each: `file:line`, the defect, the input or viewport that shows
it, the fix. Try to break it. Don't pad; if it's clean, say so.

## 4. Output

```markdown
## Adversarial review - <PR title or branch>

**Verdict: APPROVE WITH NITS - 82/100**

| Dimension | Score | Notes |
|---|---|---|
| Correctness | 4/5 | |
| Web platform | 4/5 | |
| House rules | 4/5 | |
| Simplicity | 4/5 | |
| Verifiability | 4/5 | |

### 🔴 Critical
### 🟡 Warnings
### 🟢 Nits
```

## 5. Post (only when asked)

```bash
gh pr review <N> --comment --body-file <review.md>
```

Posting is public. Confirm the PR number with the user first.

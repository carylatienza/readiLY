---
name: create-github-pull-request
description: >
  Open a pull request on carylatienza/readiLY for a finished change, then run a
  fresh-context review (code-reviewer and compliance-reviewer subagents) and post the
  scored findings to the PR. Use to standardize how every change lands. Prerequisite:
  the work is committed on a feature branch.
---

# Create a pull request (with a built-in, unbiased review)

Open a PR, then let a **fresh reviewer** grade it before a human looks. The
reviewer must not be the session that wrote the change.

## 1. Preconditions

```bash
git branch --show-current          # must NOT be main
git status --short                 # change committed, tree clean
gh auth status                     # the logged-in account needs push access
```

- On `main`? Branch first: `git checkout -b <type>/<short-name>`
  (e.g. `feat/landing-faq`, `docs/business-plan-v9`).
- If `landing/` changed, run the `verify-landing` skill so it's green before review.
- If an OpenSpec change drove the work, run `openspec status --change "<name>"`
  and link the change folder in the PR body.

**Known issue:** pushes have failed with HTTP 403 when git is authenticated as an
account without write access to `carylatienza/readiLY`. If the push fails with
403, stop and tell the user which account was denied (`gh auth status`,
`git config user.name`). Don't retry with other credentials.

## 2. Push the branch

```bash
git push -u origin "$(git branch --show-current)"
```

## 3. Open the PR

Title: **`[type] Short description`** (`feat` / `fix` / `chore` / `docs` /
`refactor`). Follow the attribution lines the session gives you for commits and
PR bodies (this repo's commits carry a `Co-Authored-By` trailer).

```markdown
## What's in this PR
<What changed and why, in a few bullets. Closes #NN if there's an issue.>

## Screenshots
<From the attach-screenshot skill for any visible landing/ change, or N/A.>

## Test Plan
<verify-landing results, manual checks, viewports tested.>

## Checklist
- [ ] verify-landing passes (or N/A: no landing/ change)
- [ ] Honesty rules hold (compliance-reviewer: COMPLIANT)
- [ ] CONFIRM markers kept, or resolved with a source
- [ ] CONTEXT.md updated if a domain term changed
- [ ] OpenSpec change linked/synced if one exists
```

```bash
gh pr create --base main --title "[feat] ..." --body-file <pr.md>
```

## 4. Review in fresh subagents

Don't review the diff in this session. Spawn both, independently, with the PR
number:

- `code-reviewer`: does it work (scored /100 via `adversarial-code-review`).
- `compliance-reviewer`: does it obey ReadiLY's honesty and copy rules.

## 5. Post the findings

```bash
gh pr review <NN> --comment --body-file <review.md>
# --request-changes when the score is < 70, a Critical exists, or compliance is NON-COMPLIANT
```

GitHub won't let you approve your own PR, so use `--comment` unless a different
account is reviewing.

## 6. Report back

PR URL, review score and verdict, compliance result, and what to fix.

## Guardrails

- Pushing, opening a PR and posting reviews are public. Confirm the title and body
  with the user first.
- Reviewers are advisory. A human merges.

---
name: create-github-issue
description: >
  Open a well-structured GitHub issue on carylatienza/readiLY with the gh CLI, using
  a standard template so every change starts from a clear, scoped request. Use when
  you spot a bug in the landing page, want to propose a feature or doc change, or are
  turning a rough idea into trackable work before an OpenSpec change exists.
---

# Create a GitHub issue

Every change should start from an issue so work is visible and scoped before
anything is written. ReadiLY has no GitHub MCP server configured, so this uses the
`gh` CLI.

## Preconditions

```bash
gh auth status                 # must be logged in with write access to the repo
git remote get-url origin      # https://github.com/carylatienza/readiLY.git
```

Read `CLAUDE.md` and `CONTEXT.md` first. Use the glossary terms in the issue
(Learner, Illustrative learner, School head, Pilot list, Design target) and avoid
the words it says to avoid.

If the work is bigger than one fix, say so in the issue and suggest an OpenSpec
change (`/opsx:propose`) as the follow-up rather than designing it in the issue.

## 1. Draft the issue

```markdown
## Summary
<One sentence: what should change and why.>

## Context / problem
<What's wrong or missing today. Link the file (e.g. landing/index.html) or doc in
docs/startup qc/. For a bug: repro steps, viewport, expected vs actual.>

## Proposed change
<One concern where possible.>

## Affected area
<landing/ section, a business doc, OpenSpec change, tooling.>

## Acceptance criteria
- [ ] <A checkable outcome>
- [ ] Honesty rules still hold (no testimonials, logos, invented results; CONFIRM markers kept)
- [ ] `verify-landing` passes (if landing/ is touched)

## Notes
<Constraints, links, open questions. Write TODO for anything you're unsure of.>
```

## 2. Pick a type label

`bug`, `feature`, `chore` or `docs`. If the label doesn't exist on the repo
(`gh label list`), drop it rather than failing the create.

## 3. File it

Write the body to a temp file (`$CLAUDE_JOB_DIR/tmp/issue.md` in a background job),
then:

```bash
gh issue create --repo carylatienza/readiLY \
  --title "<concise imperative title>" --body-file <issue.md> --label feature
```

Hand back the issue number and URL.

## Guardrail

Opening an issue posts publicly. Show the user the title and body and confirm
before running `gh issue create`. Don't invent facts about schools, pilots or
results; leave a TODO for the human.

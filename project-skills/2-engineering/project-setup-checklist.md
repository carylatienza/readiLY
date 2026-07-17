# Project Setup Checklist

> **How to use:** Run through this on day one of a new repo. Doing it later always costs more. Trim freely for hackathons — but never skip `.gitignore`, secrets handling, and formatting.

## Repository basics

- [ ] Create repo with a clear name; add a one-paragraph description
- [ ] `README.md` with: what this is, how to run it locally, how to run tests
- [ ] `.gitignore` appropriate for the stack (node_modules, build output, `.env`, IDE files)
- [ ] License file (if open source) or note that it's private
- [ ] Default branch is `main`; branch protection on if team > 1

## Repo structure

- [ ] Agree folder layout up front (see `coding-standards.md`) — e.g. `src/`, `tests/`, `docs/`, `scripts/`
- [ ] Copy this `project-skills/` folder (or the parts you'll use) into `docs/`
- [ ] Add `docs/decisions.md` from the decision log template

## Environment & secrets

- [ ] `.env.example` committed with every required variable (names + descriptions, NO real values)
- [ ] `.env` in `.gitignore` — verify before first commit
- [ ] Document where real secrets live (password manager, cloud secret store)
- [ ] Local dev works from a fresh clone using only README instructions — test this

## Linting & formatting

- [ ] Formatter configured and committed (Prettier / Black / ktlint / gofmt — one per language)
- [ ] Linter configured (ESLint / Ruff / detekt / etc.) with a shared config file in the repo
- [ ] Editor config committed (`.editorconfig`) so tabs/spaces/line-endings are consistent
- [ ] Optional but recommended: pre-commit hook that runs format + lint (husky / pre-commit)

## Testing scaffold

- [ ] Test runner installed and one trivial passing test committed (proves the harness works)
- [ ] `npm test` / `make test` / single command runs everything

## CI/CD basics

- [ ] CI runs on every PR: install → lint → test → build
- [ ] CI must pass before merge (branch protection rule)
- [ ] Build artifact / deployment path decided, even if manual for now
- [ ] Deployment documented: how to deploy, how to roll back

## Project hygiene

- [ ] Issue tracker chosen (GitHub Issues / Linear / Trello) and linked in README
- [ ] `CHANGELOG.md` created (see release checklist for format)
- [ ] Commit message and branching conventions agreed (see `coding-standards.md`)

## Stack-specific extras

- **Web app:** [ ] responsive viewport meta, [ ] error boundary/page, [ ] analytics decision made
- **Mobile app:** [ ] app IDs/bundle names reserved, [ ] signing keys stored safely & documented, [ ] min OS version decided
- **Backend service:** [ ] health check endpoint, [ ] structured logging from day one, [ ] local DB via docker-compose or equivalent

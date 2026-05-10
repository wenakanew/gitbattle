# Contributing to GitBattle

Thank you for helping improve GitBattle. This document explains **how we work**, **what we expect**, and **how to submit changes**.

---

## Before you start

1. Read [**CODE_OF_CONDUCT.md**](CODE_OF_CONDUCT.md) — required for all participants.
2. Read [**GOVERNANCE.md**](GOVERNANCE.md) — how decisions are made.
3. Skim [**GitBattle_Project_Proposal.md**](GitBattle_Project_Proposal.md) — source of truth for features and architecture until code exists.

---

## Ways to contribute

- **Issues:** bugs, unclear docs, feature ideas (check for duplicates first).
- **Pull requests:** code, tests, documentation, templates.
- **Discussions:** questions and design brainstorming (when GitHub Discussions is enabled).

---

## Reporting issues

- Use the appropriate [**issue template**](.github/ISSUE_TEMPLATE/).
- Include **steps to reproduce** for bugs, plus environment (OS, Node version, browser) when relevant.
- One topic per issue when possible.

---

## Pull request workflow

1. **Fork** the repository and create a **branch** from `main` (or the default branch).
   - Branch naming: `feat/short-description`, `fix/short-description`, `docs/short-description`, `chore/short-description`.
2. **Keep PRs focused** — one logical change per PR unless maintainers agree otherwise.
3. **Update docs** when behavior or setup changes (README, CHANGELOG, proposal cross-links if needed).
4. **Describe** what changed and why in the PR description; link related issues (`Fixes #123`).
5. Wait for **review**. Address feedback or ask questions inline.

### Commit messages

- Prefer clear, imperative summaries: `Add match timer validation`, `Fix lobby reconnect race`.
- Optional convention: [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`).

---

## Code guidelines (when code lands)

Until the codebase is scaffolded, treat this as the **default bar** we will enforce:

- **TypeScript** with strict typing where the toolchain allows it.
- **Server authority** — game state and validation live on the server; clients are not trusted.
- **No shell execution** from user “Git” input — parsing only, as described in the proposal.
- **Tests** for parser and game logic (Vitest); API integration tests where valuable.
- **Formatting/linting** — follow project ESLint/Prettier config once added; run checks before pushing.

---

## Documentation contributions

- Match **tone**: clear, concise, accurate.
- Prefer **small, reviewable** doc PRs.
- Update [**CHANGELOG.md**](CHANGELOG.md) under **Unreleased** for user-visible doc fixes if they matter to readers.

---

## Licensing

By contributing, you agree that your contributions are licensed under the **same license as the project** ([MIT](LICENSE)), unless you explicitly state otherwise and the maintainers accept an exception in writing.

---

## Questions?

See [**SUPPORT.md**](SUPPORT.md). Maintainer contacts are listed in [**MAINTAINERS.md**](MAINTAINERS.md).

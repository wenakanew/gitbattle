# GitBattle

**GitBattle** is a real-time, browser-based **1v1 strategy game** where players type **Git commands** (`git add`, `git commit`, `git push`, `git merge`, …) as battle mechanics. The goal is **learning Git through competitive play**—with GitHub authentication, room-based matchmaking, spectators, and leaderboards.

> **Status:** Early stage — design and specification are documented in [`GitBattle_Project_Proposal.md`](GitBattle_Project_Proposal.md). Application code is not yet implemented in this repository.

**Repository:** [github.com/wenakanew/gitbattle](https://github.com/wenakanew/gitbattle) · **Clone:** `git clone https://github.com/wenakanew/gitbattle.git`

---

## Why GitBattle?

- **Typed commands**, not menus — real command syntax under time pressure.
- **Live multiplayer** — human opponents and spectators.
- **Room / admin model** — suited for classrooms and hosted sessions.
- **GitHub OAuth** — identity aligned with developer workflows.

See the [proposal](GitBattle_Project_Proposal.md) for full game rules, architecture, API sketch, and roadmap.

---

## Planned tech stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Socket.IO client |
| Backend | Node.js, Express, Socket.IO, Passport.js (GitHub OAuth), JWT |
| Data | PostgreSQL (Prisma), Redis |
| Deploy | Railway (API + DB), Vercel (frontend), GitHub Actions (CI) |

---

## Documentation index

| Document | Purpose |
|----------|---------|
| [`GitBattle_Project_Proposal.md`](GitBattle_Project_Proposal.md) | Full product & technical specification |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to contribute code, docs, and issues |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Community expectations |
| [`SECURITY.md`](SECURITY.md) | Reporting security vulnerabilities |
| [`GOVERNANCE.md`](GOVERNANCE.md) | Roles, decisions, and escalation |
| [`SUPPORT.md`](SUPPORT.md) | Where to ask questions |
| [`CHANGELOG.md`](CHANGELOG.md) | Release history |
| [`LICENSE`](LICENSE) | MIT License |
| [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) | Credits for third-party components |
| [`MAINTAINERS.md`](MAINTAINERS.md) | Project maintainers and contact |
| [`docs/OPEN_SOURCE_CHECKLIST.md`](docs/OPEN_SOURCE_CHECKLIST.md) | Steps before/after publishing on GitHub |
| [`docs/PRIVACY_POLICY_TEMPLATE.md`](docs/PRIVACY_POLICY_TEMPLATE.md) | Privacy policy draft outline (OAuth / GDPR-style) |
| [`github/rulesets/README.md`](github/rulesets/README.md) | GitHub **repository rulesets** (branch/tag JSON + apply instructions) |

---

## Getting involved

We welcome issues, documentation improvements, and pull requests. Please read [**CONTRIBUTING.md**](CONTRIBUTING.md) and [**CODE_OF_CONDUCT.md**](CODE_OF_CONDUCT.md) before participating.

---

## License

Copyright (c) 2026 Kaniu Jeffray Muthondu. GitBattle is released under the [MIT License](LICENSE).

---

## Acknowledgements

Game design and specification by **Kaniu Jeffray Muthondu**. Third-party notices will be listed in [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) as dependencies and assets are added.

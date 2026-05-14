# GitBattle

**GitBattle** is a real-time, browser-based **1v1 strategy game** where players type **Git commands** (`git add`, `git commit`, `git push`, `git merge`, …) as battle mechanics. The goal is **learning Git through competitive play**—with GitHub authentication, room-based matchmaking, spectators, and leaderboards.

> **Status:** Phase 1 **in progress** — monorepo with API, web app, Prisma schema, and GitHub OAuth (JWT cookie) is implemented. Gameplay (rooms, parser, match engine) is **not** built yet. See [`GitBattle_Project_Proposal.md`](GitBattle_Project_Proposal.md).

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

## Monorepo layout

| Path | Description |
|------|-------------|
| [`apps/server`](apps/server) | Express API, Prisma, Passport (GitHub), Socket.IO, JWT session cookie |
| [`apps/web`](apps/web) | Vite + React + Tailwind SPA (home + dashboard) |

---

## Local development

**Requirements:** Node 20+, Docker (for Postgres + Redis).

1. Start databases:

   ```bash
   docker compose up -d
   ```

2. Configure the server — copy [`.env.example`](.env.example) to `apps/server/.env` and adjust secrets. For GitHub sign-in, create an OAuth app and set **Authorization callback URL** to  
   `http://localhost:5173/auth/github/callback`  
   (same as `GITHUB_CALLBACK_URL` in `.env`) so cookies stay on the dev origin with Vite’s proxy.

3. Install and sync the database schema:

   ```bash
   npm install
   cd apps/server && npx prisma migrate dev --name init && cd ../..
   ```
   On first run Prisma creates `apps/server/prisma/migrations/`. Alternatively, from the repo root:  
   `npx prisma db push --schema apps/server/prisma/schema.prisma` (no migration history; fine for experiments).

4. Run both apps (two processes in one terminal):

   ```bash
   npm run dev
   ```

   - Web: [http://localhost:5173](http://localhost:5173)  
   - API + Socket.IO: [http://localhost:4000](http://localhost:4000) (`GET /health`)

   In dev, leave `VITE_API_URL` unset (see [`apps/web/.env.example`](apps/web/.env.example)) so the browser calls `/auth/*` on **:5173** and Vite proxies to the API.

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

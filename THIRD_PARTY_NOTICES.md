# Third-party notices

Runtime dependencies ship under their respective licenses via npm. Inspect exact versions in the repository **`package-lock.json`**. Highlights (not exhaustive):

| Package / stack | SPDX / license type | Notes |
|-------------------|---------------------|-------|
| [React](https://github.com/facebook/react), [React DOM](https://github.com/facebook/react) | MIT | Frontend UI |
| [Vite](https://github.com/vitejs/vite) | MIT | Frontend build |
| [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) | MIT | Styles |
| [TanStack Query](https://github.com/TanStack/query) | MIT | Data fetching (`@tanstack/react-query`) |
| [Express](https://github.com/expressjs/express) | MIT | HTTP API |
| [Prisma](https://github.com/prisma/prisma) | Apache-2.0 | ORM (`prisma`, `@prisma/client`) |
| [Socket.IO](https://github.com/socketio/socket.io) | MIT | WebSockets (server attached; browser client wired next) |
| [Passport](https://github.com/jaredhanson/passport), [`passport-github2`](https://github.com/jaredhanson/passport-github2) | MIT | OAuth |
| [`jsonwebtoken`](https://github.com/auth0/node-jsonwebtoken) | MIT | JWT session cookie signing |
| [Helmet](https://github.com/helmetjs/helmet), [cors](https://github.com/expressjs/cors), [cookie-parser](https://github.com/expressjs/cookie-parser) | MIT | Security / HTTP helpers |
| [ioredis](https://github.com/redis/ioredis) | Apache-2.0 | Redis client |
| [`zod`](https://github.com/colinhacks/zod) | MIT | Env validation |

For full attribution text where required by a license, see each package under `node_modules/<name>/` after install.

Fonts, icons, and audio assets are not vendored yet; add rows here when you bundle them.

## Proposal-phase materials

The [**GitBattle_Project_Proposal.md**](GitBattle_Project_Proposal.md) references Docker images (PostgreSQL, Redis); those images are governed by their upstream licenses when you pull them locally or in CI.

/**
 * Loaded before Vitest collects tests so `createApp()` can import `./env.js`.
 */

process.env.NODE_ENV ??= "test";
process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@127.0.0.1:5432/gitbattle";
process.env.REDIS_URL ??= "redis://127.0.0.1:6379";
process.env.JWT_SECRET ??= "vitest-jwt-secret-16chard";
process.env.WEB_ORIGIN ??= "http://localhost:5173";

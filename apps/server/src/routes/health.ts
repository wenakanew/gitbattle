import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { redisPing } from "../lib/redis.js";
import { isGitHubOAuthConfigured } from "../env.js";

export const healthRouter = Router();

healthRouter.get("/health", async (_req, res) => {
  let dbOk = false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbOk = true;
  } catch {
    dbOk = false;
  }

  const redisOk = await redisPing();

  res.json({
    status: dbOk ? "ok" : "degraded",
    postgres: dbOk ? "up" : "down",
    redis: redisOk ? "up" : "down",
    githubOAuthConfigured: isGitHubOAuthConfigured(),
  });
});

healthRouter.get("/ready", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    const redisOk = await redisPing();
    if (!redisOk) {
      res.status(503).json({ ready: false, reason: "redis" });
      return;
    }
    res.json({ ready: true });
  } catch {
    res.status(503).json({ ready: false, reason: "postgres" });
  }
});

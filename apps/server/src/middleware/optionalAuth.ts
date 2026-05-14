import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { readTokenFromRequest, verifyToken } from "../lib/jwt.js";

async function attachUser(req: Request): Promise<void> {
  const raw = readTokenFromRequest(req);
  if (!raw) {
    req.user = undefined;
    return;
  }
  const payload = verifyToken(raw);
  if (!payload?.sub) {
    req.user = undefined;
    return;
  }
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  req.user = user ?? undefined;
}

export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  await attachUser(req);
  next();
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await attachUser(req);
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

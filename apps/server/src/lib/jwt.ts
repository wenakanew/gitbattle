import jwt from "jsonwebtoken";
import type { Request } from "express";
import type { User } from "@prisma/client";
import { env } from "../env.js";

const COOKIE_NAME = "gitbattle_token";

export { COOKIE_NAME };

export interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

export function signUserToken(user: Pick<User, "id">): string {
  return jwt.sign({ sub: user.id }, env.JWT_SECRET, {
    expiresIn: "24h",
  });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function readTokenFromRequest(req: Request): string | null {
  const fromCookie =
    typeof req.headers.cookie === "string"
      ? parseCookie(req.headers.cookie, COOKIE_NAME)
      : undefined;
  if (fromCookie) return fromCookie;

  const auth = req.headers.authorization;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

function parseCookie(header: string, name: string): string | undefined {
  const parts = header.split(";").map((p) => p.trim());
  const prefix = `${name}=`;
  for (const p of parts) {
    if (p.startsWith(prefix)) return decodeURIComponent(p.slice(prefix.length));
  }
  return undefined;
}

import type { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    /** Used by Passport + our JWT layer for the Prisma-backed user row. */
    interface User extends PrismaUser {}
  }
}

export {};

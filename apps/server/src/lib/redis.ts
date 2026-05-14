import { Redis } from "ioredis";
import { env } from "../env.js";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  return redis;
}

export function connectRedis(): Redis {
  if (redis) return redis;
  redis = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 2,
  });
  return redis;
}

export async function redisPing(): Promise<boolean> {
  try {
    const client = connectRedis();
    const pong = await client.ping();
    return pong === "PONG";
  } catch {
    return false;
  }
}

import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

const memoryCounters = new Map<string, number>();

export function viewsKey(slug: string): string {
  return `views:${slug}`;
}

export function likesKey(slug: string): string {
  return `likes:${slug}`;
}

export const blogViewsKey = viewsKey;
export const blogLikesKey = likesKey;

export async function getCounter(key: string): Promise<number> {
  if (!redis) {
    return memoryCounters.get(key) ?? 0;
  }

  const value = await redis.get<number>(key);
  return typeof value === "number" ? value : 0;
}

export async function incrementCounter(key: string): Promise<number> {
  if (!redis) {
    const nextValue = (memoryCounters.get(key) ?? 0) + 1;
    memoryCounters.set(key, nextValue);
    return nextValue;
  }

  return redis.incr(key);
}

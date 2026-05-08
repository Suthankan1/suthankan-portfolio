import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse } from "next/server";
import { redis } from "./redis";

type RateLimitName = "contact" | "views" | "likes";

const rateLimiters = redis
  ? {
      contact: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, "1 m"),
        prefix: "ratelimit:contact",
      }),
      views: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(30, "1 m"),
        prefix: "ratelimit:views",
      }),
      likes: new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, "1 m"),
        prefix: "ratelimit:likes",
      }),
    }
  : null;

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "anonymous";
}

export async function rateLimitRequest(
  request: Request,
  name: RateLimitName,
): Promise<NextResponse<{ success: false; error: string }> | null> {
  const limiter = rateLimiters?.[name];

  if (!limiter) {
    return null;
  }

  const { success } = await limiter.limit(getClientIp(request));

  if (success) {
    return null;
  }

  return NextResponse.json(
    {
      success: false,
      error: "Too many requests. Please slow down.",
    },
    { status: 429 },
  );
}

import { NextRequest, NextResponse } from "next/server";
import { rateLimitRequest } from "../../../lib/rate-limit";
import { getCounter, incrementCounter, likesKey } from "../../../lib/redis";

export const runtime = "nodejs";

function getSlug(request: NextRequest): string | null {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  return slug && /^[a-z0-9-]+$/i.test(slug) ? slug : null;
}

function cookieName(slug: string): string {
  return `liked-${slug}`;
}

export async function GET(request: NextRequest) {
  const slug = getSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await getCounter(likesKey(slug));
  const liked = request.cookies.get(cookieName(slug))?.value === "true";

  return NextResponse.json({ count, liked });
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await rateLimitRequest(request, "likes");

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const slug = getSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const likedCookie = cookieName(slug);

  if (request.cookies.get(likedCookie)?.value === "true") {
    const count = await getCounter(likesKey(slug));
    return NextResponse.json({ count, liked: true, alreadyLiked: true });
  }

  const count = await incrementCounter(likesKey(slug));
  const response = NextResponse.json({ count, liked: true });

  response.cookies.set(likedCookie, "true", {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

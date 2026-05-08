import { NextRequest, NextResponse } from "next/server";
import { rateLimitRequest } from "../../../lib/rate-limit";
import { getCounter, incrementCounter, viewsKey } from "../../../lib/redis";

export const runtime = "nodejs";

function getSlug(request: NextRequest): string | null {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  return slug && /^[a-z0-9-]+$/i.test(slug) ? slug : null;
}

function viewCookieName(slug: string): string {
  return `viewed-${slug}`;
}

export async function GET(request: NextRequest) {
  const slug = getSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await getCounter(viewsKey(slug));
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await rateLimitRequest(request, "views");

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const slug = getSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const viewedCookie = viewCookieName(slug);

  if (request.cookies.get(viewedCookie)?.value === "true") {
    const count = await getCounter(viewsKey(slug));
    return NextResponse.json({ count, viewed: true, alreadyViewed: true });
  }

  const count = await incrementCounter(viewsKey(slug));
  const response = NextResponse.json({ count, viewed: true });

  response.cookies.set(viewedCookie, "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

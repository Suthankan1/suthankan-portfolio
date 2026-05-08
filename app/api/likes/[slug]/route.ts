import { NextRequest, NextResponse } from "next/server";
import { rateLimitRequest } from "../../../../lib/rate-limit";
import { getCounter, incrementCounter, likesKey } from "../../../../lib/redis";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeSlug(slug: string): string | null {
  const normalized = slug.trim();
  return normalized && /^[a-z0-9-]+$/i.test(normalized) ? normalized : null;
}

function likeCookieName(slug: string): string {
  return `liked-${slug}`;
}

async function getSlug({ params }: RouteContext): Promise<string | null> {
  const { slug } = await params;
  return normalizeSlug(slug);
}

export async function GET(request: NextRequest, context: RouteContext) {
  const slug = await getSlug(context);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await getCounter(likesKey(slug));
  const liked = request.cookies.get(likeCookieName(slug))?.value === "true";

  return NextResponse.json({ count, liked });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const rateLimitResponse = await rateLimitRequest(request, "likes");

  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const slug = await getSlug(context);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const likedCookie = likeCookieName(slug);

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

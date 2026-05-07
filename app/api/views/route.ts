import { NextRequest, NextResponse } from "next/server";
import { getCounter, incrementCounter, viewsKey } from "../../../lib/redis";

export const runtime = "nodejs";

function getSlug(request: NextRequest): string | null {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  return slug && /^[a-z0-9-]+$/i.test(slug) ? slug : null;
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
  const slug = getSlug(request);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await incrementCounter(viewsKey(slug));
  return NextResponse.json({ count });
}

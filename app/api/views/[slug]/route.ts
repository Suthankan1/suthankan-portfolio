import { NextResponse } from "next/server";
import { getCounter, incrementCounter, viewsKey } from "../../../../lib/redis";

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

async function getSlug({ params }: RouteContext): Promise<string | null> {
  const { slug } = await params;
  return normalizeSlug(slug);
}

export async function GET(_request: Request, context: RouteContext) {
  const slug = await getSlug(context);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await getCounter(viewsKey(slug));
  return NextResponse.json({ count });
}

export async function POST(_request: Request, context: RouteContext) {
  const slug = await getSlug(context);

  if (!slug) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  const count = await incrementCounter(viewsKey(slug));
  return NextResponse.json({ count });
}

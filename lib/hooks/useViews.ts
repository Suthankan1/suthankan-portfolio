"use client";

import { useEffect, useState } from "react";

type ViewResponse = {
  count?: number;
};

const incrementedSlugs = new Set<string>();

export function useViews(slug: string): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let cancelled = false;
    const encodedSlug = encodeURIComponent(slug);

    async function syncViews() {
      const viewResponse = await fetch(`/api/views/${encodedSlug}`, {
        cache: "no-store",
      });
      const viewData = (await viewResponse.json()) as ViewResponse;

      if (!cancelled && typeof viewData.count === "number") {
        setCount(viewData.count);
      }

      if (incrementedSlugs.has(slug)) {
        return;
      }

      incrementedSlugs.add(slug);

      const incrementResponse = await fetch(`/api/views/${encodedSlug}`, {
        method: "POST",
        cache: "no-store",
      });
      const incrementData = (await incrementResponse.json()) as ViewResponse;

      if (!cancelled && typeof incrementData.count === "number") {
        setCount(incrementData.count);
      }
    }

    syncViews().catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return count;
}

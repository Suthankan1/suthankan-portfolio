"use client";

import { useCallback, useEffect, useState } from "react";

type LikeResponse = {
  count?: number;
  liked?: boolean;
  alreadyLiked?: boolean;
};

type UseLikesResult = {
  count: number;
  liked: boolean;
  isPending: boolean;
  like: () => Promise<void>;
};

export function useLikes(slug: string): UseLikesResult {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!slug) {
      return;
    }

    let cancelled = false;
    const encodedSlug = encodeURIComponent(slug);

    async function syncLikes() {
      const response = await fetch(`/api/likes/${encodedSlug}`, {
        cache: "no-store",
      });
      const data = (await response.json()) as LikeResponse;

      if (!cancelled) {
        setCount(data.count ?? 0);
        setLiked(data.liked ?? false);
      }
    }

    syncLikes().catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const like = useCallback(async () => {
    if (!slug || liked || isPending) {
      return;
    }

    const encodedSlug = encodeURIComponent(slug);
    const previousCount = count;

    setIsPending(true);
    setLiked(true);
    setCount((currentCount) => currentCount + 1);

    try {
      const response = await fetch(`/api/likes/${encodedSlug}`, {
        method: "POST",
        cache: "no-store",
      });
      const data = (await response.json()) as LikeResponse;

      if (typeof data.count === "number") {
        setCount(data.count);
      }

      setLiked(data.liked ?? true);
    } catch {
      setCount(previousCount);
      setLiked(false);
    } finally {
      setIsPending(false);
    }
  }, [count, isPending, liked, slug]);

  return {
    count,
    liked,
    isPending,
    like,
  };
}

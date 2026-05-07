"use client";

import { Heart } from "lucide-react";
import { useLikes } from "../../lib/hooks/useLikes";
import { cn } from "../../lib/utils";

type LikeButtonProps = {
  slug: string;
  className?: string;
};

function formatCount(count: number): string {
  return new Intl.NumberFormat("en", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

export function LikeButton({ slug, className }: LikeButtonProps) {
  const { count, liked, isPending, like } = useLikes(slug);

  return (
    <button
      type="button"
      onClick={like}
      disabled={liked || isPending}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-default",
        liked
          ? "border-[color-mix(in_srgb,var(--accent-primary)_60%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-text-primary"
          : "border-border bg-bg-secondary text-text-secondary hover:border-[var(--accent-primary)] hover:text-text-primary",
        className,
      )}
      aria-pressed={liked}
      aria-label={liked ? `${count} likes, already liked` : `Like this post. ${count} likes`}
    >
      <Heart className={cn("h-4 w-4", liked ? "fill-[var(--accent-primary)] text-accent-primary" : "")} />
      {formatCount(count)}
    </button>
  );
}

"use client";

import { Eye } from "lucide-react";
import { useViews } from "../../lib/hooks/useViews";

type ViewCounterProps = {
  slug: string;
  className?: string;
};

function formatCount(count: number): string {
  return new Intl.NumberFormat("en", {
    notation: count >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(count);
}

export function ViewCounter({ slug, className }: ViewCounterProps) {
  const count = useViews(slug);

  return (
    <span
      className={className ?? "inline-flex items-center gap-2 rounded-full border border-border bg-bg-secondary px-4 py-2 text-sm font-semibold text-text-secondary"}
      aria-label={`${count} views`}
    >
      <Eye className="h-4 w-4 text-accent-primary" aria-hidden="true" />
      {formatCount(count)} views
    </span>
  );
}

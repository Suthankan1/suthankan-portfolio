import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "live" | "in-progress" | "archived" | "featured";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variantClasses: Record<BadgeVariant, string> = {
  live:
    "border-[color-mix(in_srgb,var(--accent-secondary)_40%,var(--border))] bg-[color-mix(in_srgb,var(--accent-secondary)_12%,transparent)] text-[var(--text-primary)]",
  "in-progress":
    "border-[color-mix(in_srgb,var(--accent-primary)_42%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_12%,transparent)] text-[var(--text-primary)]",
  archived:
    "border-[var(--border)] bg-[color-mix(in_srgb,var(--text-muted)_10%,transparent)] text-[var(--text-secondary)]",
  featured:
    "border-[color-mix(in_srgb,var(--accent-primary)_55%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_16%,transparent)] text-[var(--text-primary)]",
};

const dotClasses: Record<BadgeVariant, string> = {
  live: "bg-[var(--accent-secondary)]",
  "in-progress": "bg-[color-mix(in_srgb,var(--accent-primary)_68%,var(--accent-secondary))]",
  archived: "bg-[var(--text-muted)]",
  featured: "bg-[var(--accent-primary)]",
};

export function Badge({ className, children, variant = "live", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <span className={cn("h-2 w-2 rounded-full", dotClasses[variant])} />
      <span>{children}</span>
    </span>
  );
}

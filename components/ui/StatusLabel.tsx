import type { ReactNode } from "react";
import { Circle } from "lucide-react";
import { cn } from "../../lib/utils";

type StatusLabelProps = {
  children: ReactNode;
  tone?: "active" | "neutral" | "accent";
  className?: string;
};

const toneClasses = {
  active: "border-[color-mix(in_srgb,var(--accent-secondary)_48%,var(--border))]",
  neutral: "border-border",
  accent: "border-[color-mix(in_srgb,var(--accent-primary)_42%,var(--border))]",
} as const;

const iconClasses = {
  active: "fill-accent-secondary text-accent-secondary",
  neutral: "fill-text-muted text-text-muted",
  accent: "fill-accent-primary text-accent-primary",
} as const;

export function StatusLabel({ children, tone = "neutral", className }: StatusLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border bg-bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary",
        toneClasses[tone],
        className,
      )}
    >
      <Circle className={cn("h-2.5 w-2.5", iconClasses[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

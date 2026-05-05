import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type CardVariant = "default" | "featured" | "minimal";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  default:
    "border-[var(--border)] bg-[var(--bg-secondary)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]",
  featured:
    "border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border))] bg-[var(--bg-secondary)] shadow-[var(--shadow-md)] hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)]",
  minimal:
    "border-transparent bg-transparent shadow-none hover:bg-[color-mix(in_srgb,var(--text-primary)_4%,transparent)]",
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group rounded-[var(--radius-lg)] border transition-all duration-200 ease-out motion-reduce:transition-none",
        "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

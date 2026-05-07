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
    "border-[color-mix(in_srgb,var(--accent-primary)_28%,var(--border))] bg-[var(--bg-secondary)] shadow-[var(--shadow-md)] hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-lg)] before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[color-mix(in_srgb,var(--accent-primary)_24%,transparent)] before:opacity-0 before:blur-2xl before:transition-opacity before:duration-300 hover:before:opacity-100",
  minimal:
    "border-transparent bg-transparent shadow-none hover:bg-[color-mix(in_srgb,var(--text-primary)_4%,transparent)]",
};

export function Card({ className, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-[var(--radius-lg)] border transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out motion-reduce:transition-none",
        "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}

import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type TagProps = HTMLAttributes<HTMLSpanElement>;

export function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--accent-primary)_24%,var(--border))] bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] px-3 py-1 text-xs font-medium text-[var(--text-primary)] backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

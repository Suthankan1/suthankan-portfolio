"use client";

import type { ButtonHTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { forwardRef, useMemo, useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[var(--accent-primary)] text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
  secondary:
    "border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:bg-[color-mix(in_srgb,var(--accent-primary)_8%,transparent)]",
  ghost:
    "border-transparent bg-transparent text-[var(--text-primary)] hover:bg-[color-mix(in_srgb,var(--text-primary)_6%,transparent)]",
  danger:
    "border-transparent bg-[color-mix(in_srgb,var(--accent-primary)_22%,var(--text-primary))] text-white shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    asChild = false,
    className,
    children,
    disabled,
    isLoading = false,
    onMouseMove,
    onMouseLeave,
    size = "md",
    variant = "primary",
    type = "button",
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  const localRef = useRef<HTMLButtonElement | null>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");

  const isInteractive = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  function handleMouseMove(event: ReactMouseEvent<HTMLButtonElement>) {
    onMouseMove?.(event);

    if (!isInteractive || isLoading || disabled) {
      return;
    }

    const element = localRef.current;
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    setTransform(`translate3d(${offsetX * 8}px, ${offsetY * 6}px, 0)`);
  }

  function handleMouseLeave(event: ReactMouseEvent<HTMLButtonElement>) {
    onMouseLeave?.(event);
    setTransform("translate3d(0, 0, 0)");
  }

  const content = (
    <>
      {isLoading ? <Spinner /> : null}
      <span className={cn(isLoading ? "opacity-80" : null)}>{children}</span>
    </>
  );

  const sharedClassName = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border font-medium tracking-tight transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-50",
    "motion-reduce:transform-none motion-reduce:transition-none",
    "will-change-transform",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (asChild) {
    return (
      <Comp
        ref={ref}
        aria-busy={isLoading || undefined}
        aria-disabled={disabled || isLoading || undefined}
        className={sharedClassName}
        data-loading={isLoading ? "true" : undefined}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ transform }}
        {...props}
      >
        {content}
      </Comp>
    );
  }

  return (
    <Comp
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      aria-busy={isLoading || undefined}
      className={sharedClassName}
      data-loading={isLoading ? "true" : undefined}
      disabled={disabled || isLoading}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ transform }}
      type={type}
      {...props}
    >
      {content}
    </Comp>
  );
});

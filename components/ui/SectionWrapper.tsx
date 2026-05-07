"use client";

import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

type SectionWrapperProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  animateOnScroll?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className">;

export function SectionWrapper<T extends ElementType = "section">({
  as,
  animateOnScroll = false,
  children,
  className,
  ...props
}: SectionWrapperProps<T>) {
  const Comp = (as ?? "section") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(!animateOnScroll);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!animateOnScroll || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animateOnScroll, prefersReducedMotion]);

  return (
    <Comp
      ref={ref}
      className={cn(
        "w-full",
        animateOnScroll ? "transition-all duration-700 ease-out motion-reduce:transition-none" : null,
        animateOnScroll && !isVisible ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {children}
      </div>
    </Comp>
  );
}

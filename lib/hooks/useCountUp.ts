"use client";

import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

type UseCountUpResult = {
  count: number;
  targetRef: React.RefObject<HTMLElement | null>;
  hasStarted: boolean;
};

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3;
}

export function useCountUp({
  end,
  duration = 1200,
  threshold = 0.35,
  rootMargin = "0px 0px -8% 0px",
  once = true,
}: UseCountUpOptions): UseCountUpResult {
  const targetRef = useRef<HTMLElement | null>(null);
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setHasStarted(false);
          setCount(0);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    let frameId = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      setCount(Math.round(end * easedProgress));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [duration, end, hasStarted, prefersReducedMotion]);

  return { count, targetRef, hasStarted };
}

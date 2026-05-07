"use client";

import { useEffect, useMemo, useState } from "react";
import { CircleOff, Sparkles } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const STORAGE_KEY = "suthankan-cursor-glow";

export function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rawX = useMotionValue(-240);
  const rawY = useMotionValue(-240);
  const x = useSpring(rawX, { stiffness: 120, damping: 28, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.45 });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    setEnabled(storedValue ? storedValue === "enabled" : true);
  }, []);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      rawX.set(event.clientX - 240);
      rawY.set(event.clientY - 240);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, prefersReducedMotion, rawX, rawY]);

  const label = useMemo(() => (enabled ? "Disable cursor glow" : "Enable cursor glow"), [enabled]);
  const Icon = enabled ? CircleOff : Sparkles;

  function toggleGlow() {
    const nextValue = !enabled;
    setEnabled(nextValue);
    window.localStorage.setItem(STORAGE_KEY, nextValue ? "enabled" : "disabled");
  }

  return (
    <>
      {enabled && !prefersReducedMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 h-[480px] w-[480px] rounded-full opacity-25 blur-3xl"
          style={{
            x,
            y,
            zIndex: -1,
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-primary) 30%, transparent) 0%, transparent 68%)",
          }}
        />
      ) : null}

      <button
        type="button"
        aria-label={label}
        title={label}
        className="fixed bottom-4 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-primary/85 text-text-muted shadow-[var(--shadow-md)] backdrop-blur transition-colors hover:text-accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        onClick={toggleGlow}
      >
        <Icon className="h-4 w-4" />
      </button>
    </>
  );
}

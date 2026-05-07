"use client";

import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { useMotionValue, useMotionValueEvent, useReducedMotion, useSpring } from "framer-motion";

type MagneticHoverOptions = {
  disabled?: boolean;
  maxDisplacement?: number;
};

type MagneticHoverResult<T extends HTMLElement> = {
  ref: (node: T | null) => void;
  style: CSSProperties;
  onMouseMove: (event: ReactMouseEvent<T>) => void;
  onMouseLeave: () => void;
};

export function useMagneticHover<T extends HTMLElement>({
  disabled = false,
  maxDisplacement = 8,
}: MagneticHoverOptions = {}): MagneticHoverResult<T> {
  const prefersReducedMotion = useReducedMotion();
  const elementRef = useRef<T | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 280, damping: 24, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 280, damping: 24, mass: 0.35 });
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0)");

  const isDisabled = disabled || prefersReducedMotion;

  const updateTransform = useCallback(() => {
    setTransform(`translate3d(${x.get().toFixed(2)}px, ${y.get().toFixed(2)}px, 0)`);
  }, [x, y]);

  useMotionValueEvent(x, "change", updateTransform);
  useMotionValueEvent(y, "change", updateTransform);

  const ref = useCallback((node: T | null) => {
    elementRef.current = node;
  }, []);

  const onMouseMove = useCallback(
    (event: ReactMouseEvent<T>) => {
      if (isDisabled) {
        return;
      }

      const element = elementRef.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;

      rawX.set(offsetX * maxDisplacement);
      rawY.set(offsetY * maxDisplacement);
    },
    [isDisabled, maxDisplacement, rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return {
    ref,
    style: { transform },
    onMouseMove,
    onMouseLeave,
  };
}

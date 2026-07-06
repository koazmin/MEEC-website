"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  /** Override the gradient colours. Default is gold-to-white shimmer. */
  gradient?: string;
};

/**
 * Animated gradient text component. Applies a shifting
 * background-clip:text gradient for a premium shimmer effect.
 */
export default function GradientText({
  children,
  className = "",
  gradient = "linear-gradient(90deg, #e0a226 0%, #ffffff 25%, #e0a226 50%, #ffffff 75%, #e0a226 100%)",
}: GradientTextProps) {
  const reduce = useReducedMotion();

  return (
    <span
      className={`gradient-text ${reduce ? "" : "animate-text-shimmer"} ${className}`}
      style={{ backgroundImage: gradient }}
    >
      {children}
    </span>
  );
}

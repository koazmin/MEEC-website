"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ParallaxProps = {
  children: ReactNode;
  /** Vertical drift in pixels across the scroll range. Positive = moves down slower. */
  distance?: number;
  className?: string;
};

export default function Parallax({ children, distance = 60, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, reduce ? distance : -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

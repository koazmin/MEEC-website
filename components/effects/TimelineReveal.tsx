"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TimelineReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const headTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative pl-8 md:pl-0">
      {/* Background track line */}
      <div className="absolute left-[15px] top-0 h-full w-[2px] bg-line md:left-1/2 md:-translate-x-1/2" />

      {/* Animated gradient progress spine */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute left-[15px] top-0 h-full w-[2px] bg-gradient-to-b from-primary to-accent md:left-1/2 md:-translate-x-1/2"
      />

      {/* Glowing head that travels down with scroll */}
      <motion.div style={{ top: headTop }} className="absolute left-[15px] z-10 md:left-1/2">
        <span className="relative flex h-3 w-3 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-accent ring-4 ring-surface" />
        </span>
      </motion.div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

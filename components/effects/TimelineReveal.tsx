"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function TimelineReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative pl-8 md:pl-0">
      {/* Background track line */}
      <div className="absolute left-[15px] top-0 h-full w-[2px] bg-line md:left-1/2 md:-translate-x-1/2" />
      
      {/* Animated progress line */}
      <motion.div
        style={{ scaleY, originY: 0 }}
        className="absolute left-[15px] top-0 h-full w-[2px] bg-accent md:left-1/2 md:-translate-x-1/2"
      />
      
      <div className="relative z-10">{children}</div>
    </div>
  );
}

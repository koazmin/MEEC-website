"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Soft, slowly breathing colour mesh that sits behind a section's content. */
export default function AuroraGlow({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const orbs = [
    {
      className: "absolute -left-[6%] -top-[12%] h-[46vh] w-[46vw] rounded-full bg-accent/25 blur-[110px]",
      animate: { scale: [1, 1.25, 1], x: ["-4%", "6%", "-4%"], y: ["0%", "-6%", "0%"] },
      duration: 18,
    },
    {
      className: "absolute right-0 top-[18%] h-[50vh] w-[50vw] rounded-full bg-primary/20 blur-[130px]",
      animate: { scale: [1, 1.35, 1], x: ["4%", "-9%", "4%"], y: ["0%", "8%", "0%"] },
      duration: 24,
    },
    {
      className: "absolute left-[34%] top-[42%] h-[32vh] w-[32vw] rounded-full bg-accent-soft/40 blur-[100px]",
      animate: { scale: [1, 1.2, 1], opacity: [0.45, 0.8, 0.45] },
      duration: 14,
    },
  ];

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          animate={reduce ? undefined : orb.animate}
          transition={reduce ? undefined : { duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

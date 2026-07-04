"use client";

import { motion } from "framer-motion";

export default function FlightPath({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Decorative airplane routes across the screen */}
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M -100 800 Q 300 200, 700 500 T 1200 100"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="6"
          strokeDasharray="15 15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        />
        <motion.path
          d="M 1200 600 Q 800 300, 400 700 T -200 200"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeDasharray="10 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

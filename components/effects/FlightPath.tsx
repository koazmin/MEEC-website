"use client";

import { motion } from "framer-motion";

export default function FlightPath({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Decorative airplane routes across the screen */}
      <svg className="absolute inset-0 h-full w-full opacity-20" preserveAspectRatio="none">
        <motion.path
          d="M -100,800 Q 30% 20%, 70% 50% T 120% 10%"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="10 10"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
        <motion.path
          d="M 120%,600 Q 80% 30%, 40% 70% T -20% 20%"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 50, ease: "linear", repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Decorative vertical "learning pathway" spine with flowing energy + milestones. */
export default function PathwayConnectors() {
  const reduce = useReducedMotion();
  const nodes = [0.14, 0.5, 0.86];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pathway-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Faint dashed track */}
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--color-line)" strokeWidth="2" strokeDasharray="2 10" />

        {/* Gradient spine, drawn on scroll */}
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="url(#pathway-grad)"
          strokeWidth="3"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Flowing energy dashes */}
        {!reduce && (
          <motion.line
            x1="50%"
            y1="0"
            x2="50%"
            y2="100%"
            stroke="var(--color-accent)"
            strokeWidth="3"
            strokeDasharray="4 18"
            strokeLinecap="round"
            opacity="0.7"
            animate={{ strokeDashoffset: [0, -220] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          />
        )}
      </svg>

      {/* Milestone nodes */}
      {nodes.map((t, i) => (
        <div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${t * 100}%` }}
        >
          <span className="relative flex h-3.5 w-3.5">
            {!reduce && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />}
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-surface" />
          </span>
        </div>
      ))}
    </div>
  );
}

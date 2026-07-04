"use client";

import { motion } from "framer-motion";

export default function PathwayConnectors() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full -translate-x-1/2 lg:block">
      <svg className="h-full w-full" preserveAspectRatio="none">
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="var(--color-line)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />
        <motion.line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          stroke="var(--color-primary)"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

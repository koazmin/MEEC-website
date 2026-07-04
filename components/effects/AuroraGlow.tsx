"use client";

import { motion } from "framer-motion";

export default function AuroraGlow({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: ["0%", "5%", "-5%", "0%"],
          y: ["0%", "-5%", "5%", "0%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] left-[10%] h-[40vh] w-[40vw] rounded-full bg-accent/20 blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: ["0%", "-10%", "5%", "0%"],
          y: ["0%", "10%", "-5%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] top-[30%] h-[40vh] w-[40vw] rounded-full bg-primary/15 blur-[120px]"
      />
    </div>
  );
}

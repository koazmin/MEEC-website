"use client";

import { motion } from "framer-motion";

export default function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-2 left-0 w-full text-accent ${className}`}
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 15Q50 2 100 12T198 8"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />
    </svg>
  );
}

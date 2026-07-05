"use client";

import { motion } from "framer-motion";

/** Hand-painted underline that draws itself once when scrolled into view. */
export default function BrushStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute -bottom-2 left-0 w-full text-accent ${className}`}
      preserveAspectRatio="none"
    >
      {/* Soft wash under-stroke for a painted, layered feel */}
      <motion.path
        d="M3 16 Q52 4 100 13 T197 9"
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.28"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
      />
      {/* Crisp top stroke */}
      <motion.path
        d="M2 15 Q50 3 100 12 T198 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
      />
    </svg>
  );
}

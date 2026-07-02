"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedHeadingProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Optional element rendered after the words (e.g. an accent mark). */
  trailing?: ReactNode;
};

export default function AnimatedHeading({ text, className, as = "h2", trailing }: AnimatedHeadingProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className}>
        {text}
        {trailing}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.06 }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: "0%", opacity: 1 },
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
      {trailing}
    </MotionTag>
  );
}

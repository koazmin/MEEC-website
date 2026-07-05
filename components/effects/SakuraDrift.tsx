"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  sway: number;
  spin: number;
};

export default function SakuraDrift() {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (reduce) return;
    setPetals(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 14,
        delay: Math.random() * 12,
        duration: 11 + Math.random() * 12,
        sway: 40 + Math.random() * 70,
        spin: Math.random() > 0.5 ? 360 : -360,
      })),
    );
  }, [reduce]);

  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 will-change-transform"
          style={{ left: `${p.left}%`, width: p.size, height: p.size * 1.15 }}
          initial={{ y: "-12vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "115vh",
            x: [0, p.sway, -p.sway * 0.6, p.sway * 0.35, 0],
            rotate: [0, p.spin * 0.4, p.spin],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 30 35" className="h-full w-full drop-shadow-[0_2px_3px_rgba(180,80,110,0.25)]">
            <defs>
              <linearGradient id={`sk-${p.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff2f6" />
                <stop offset="55%" stopColor="#ffc2d4" />
                <stop offset="100%" stopColor="#ff86a8" />
              </linearGradient>
            </defs>
            {/* Sakura petal with a soft cleft at the tip */}
            <path
              d="M 15 34 C 24 28 29 15 25 6 C 22 0.5 17 5 15 8 C 13 5 8 0.5 5 6 C 1 15 6 28 15 34 Z"
              fill={`url(#sk-${p.id})`}
              opacity="0.92"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

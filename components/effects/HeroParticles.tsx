"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Lightweight floating sparkle particles for hero sections.
 * Pure CSS — no canvas, no heavy JS. Each dot gets a random
 * position, size and animation delay for an organic, magical feel.
 */
const particles = [
  { left: "8%", top: "18%", size: 3, delay: 0 },
  { left: "15%", top: "62%", size: 2, delay: 1.2 },
  { left: "22%", top: "35%", size: 4, delay: 0.5 },
  { left: "32%", top: "78%", size: 2, delay: 2.1 },
  { left: "42%", top: "22%", size: 3, delay: 1.8 },
  { left: "55%", top: "45%", size: 2, delay: 0.3 },
  { left: "62%", top: "72%", size: 3, delay: 1.5 },
  { left: "72%", top: "15%", size: 4, delay: 0.8 },
  { left: "78%", top: "55%", size: 2, delay: 2.4 },
  { left: "85%", top: "32%", size: 3, delay: 1.1 },
  { left: "92%", top: "68%", size: 2, delay: 0.6 },
  { left: "48%", top: "88%", size: 3, delay: 1.9 },
  { left: "18%", top: "85%", size: 2, delay: 2.8 },
  { left: "88%", top: "82%", size: 3, delay: 0.2 },
  { left: "38%", top: "12%", size: 2, delay: 1.4 },
];

export default function HeroParticles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-sparkle absolute rounded-full bg-white"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${2.5 + (i % 3) * 0.8}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

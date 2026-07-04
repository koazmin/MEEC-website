"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Petal = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  scale: number;
};

export default function SakuraDrift() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatePetals = () => {
      // Increased count for better visibility
      const newPetals = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // starting X percentage
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 15,
        scale: 0.5 + Math.random() * 0.7,
      }));
      setPetals(newPetals);
    };
    generatePetals();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ top: "-10%", left: `${petal.x}%`, opacity: 0, rotate: 0 }}
          animate={{
            top: "110%",
            left: `${petal.x - 20 + Math.random() * 40}%`, // drift sideways
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute drop-shadow-sm"
          style={{ scale: petal.scale, width: "24px", height: "30px" }}
        >
          {/* Realistic Sakura Petal SVG with cleft and gradient */}
          <svg viewBox="0 0 30 35" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <defs>
              <linearGradient id={`sakuraGrad-${petal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff0f3" />
                <stop offset="50%" stopColor="#ffb3c6" />
                <stop offset="100%" stopColor="#ff8fab" />
              </linearGradient>
            </defs>
            <path
              d="M 15 35 C 25 28, 30 15, 26 5 C 23 -1, 17 5, 15 8 C 13 5, 7 -1, 4 5 C 0 15, 5 28, 15 35 Z"
              fill={`url(#sakuraGrad-${petal.id})`}
              opacity="0.85"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

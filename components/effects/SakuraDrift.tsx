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
      const newPetals = Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // starting X percentage
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 15,
        scale: 0.4 + Math.random() * 0.6,
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
            opacity: [0, 0.8, 0.8, 0],
            rotate: 360,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-3 w-4 rounded-tl-full rounded-br-full bg-pink-300/40 shadow-[0_0_10px_rgba(251,207,232,0.3)] backdrop-blur-sm"
          style={{ scale: petal.scale }}
        />
      ))}
    </div>
  );
}

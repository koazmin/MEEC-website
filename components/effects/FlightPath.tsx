"use client";

import { motion } from "framer-motion";

export default function FlightPath({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
      {/* Decorative airplane routes across the screen */}
      <svg className="absolute inset-0 h-[120%] w-[120%] -left-[10%] -top-[10%] opacity-70" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        
        {/* Route 1 */}
        <path id="route-1" d="M -100 800 Q 300 200, 700 500 T 1200 100" fill="none" />
        
        {/* Faded background track */}
        <path
          d="M -100 800 Q 300 200, 700 500 T 1200 100"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.2"
        />
        
        {/* Animated drawing track */}
        <motion.path
          d="M -100 800 Q 300 200, 700 500 T 1200 100"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="12 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
        />

        {/* Airplane 1 */}
        <g fill="var(--color-primary)">
          {/* Airplane path rotated to face right (X-axis) so auto-rotate works correctly */}
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="translate(-12, -12) rotate(90)" />
          <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-1" />
          </animateMotion>
        </g>


        {/* Route 2 */}
        <path id="route-2" d="M 1200 600 Q 800 300, 400 700 T -200 200" fill="none" />
        
        <path
          d="M 1200 600 Q 800 300, 400 700 T -200 200"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeDasharray="8 8"
          opacity="0.2"
        />
        
        <motion.path
          d="M 1200 600 Q 800 300, 400 700 T -200 200"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeDasharray="12 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        />

        {/* Airplane 2 */}
        <g fill="var(--color-accent)">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" transform="translate(-12, -12) rotate(90)" />
          <animateMotion dur="22s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-2" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

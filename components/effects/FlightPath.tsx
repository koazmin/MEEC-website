"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FlightPath({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Trigger when 10% of the section is visible.
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  // Reset the SVG SMIL timeline to 0 when the component comes into view.
  // This perfectly synchronizes the native <animateMotion> with Framer Motion's JS timeline.
  useEffect(() => {
    if (isInView && svgRef.current && svgRef.current.setCurrentTime) {
      svgRef.current.setCurrentTime(0);
    }
  }, [isInView]);

  // A much better, clearer airplane shape (points UP by default, centered roughly at 12,15)
  const airplanePath = "M 12.000 0.000 C 13.657 0.000 15.000 1.343 15.000 3.000 L 15.000 10.000 L 24.000 15.000 L 24.000 18.000 L 15.000 15.000 L 15.000 23.000 L 18.000 26.000 L 18.000 29.000 L 12.000 27.000 L 6.000 29.000 L 6.000 26.000 L 9.000 23.000 L 9.000 15.000 L 0.000 18.000 L 0.000 15.000 L 9.000 10.000 L 9.000 3.000 C 9.000 1.343 10.343 0.000 12.000 0.000 Z";

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
      {/* Decorative airplane routes across the screen */}
      {isInView && (
        <svg ref={svgRef} className="absolute inset-0 h-[120%] w-[120%] -left-[10%] -top-[10%] opacity-80" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          
          {/* Mask that draws the line over time */}
          <mask id="path-mask">
            <motion.path
              d="M -50 800 Q 300 200, 700 500 T 1100 100"
              fill="none"
              stroke="white"
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 15, ease: "linear", repeat: Infinity }}
            />
          </mask>

          {/* ================= ROUTE 1 ================= */}
          <path id="route-1" d="M -50 800 Q 300 200, 700 500 T 1100 100" fill="none" />
          
          {/* Dotted Track that reveals itself using the mask */}
          <path
            d="M -50 800 Q 300 200, 700 500 T 1100 100"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeDasharray="12 12"
            opacity="0.8"
            mask="url(#path-mask)"
          />

          {/* Airplane 1 */}
          <g fill="var(--color-primary)">
            {/* Translate slightly forward so the airplane's nose covers the tip of the dotted line */}
            <path d={airplanePath} transform="translate(15, -12) rotate(90) scale(1.5)" />
            <animateMotion dur="15s" repeatCount="indefinite" rotate="auto">
              <mpath href="#route-1" />
            </animateMotion>
          </g>
        </svg>
      )}
    </div>
  );
}

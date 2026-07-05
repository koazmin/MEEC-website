"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Movie-style travel map, sized to sit in its own wide banner strip. A little
 * plane flies a curved route once and leaves a dotted trail behind it. The trail
 * reveal and the plane share one SMIL timeline (same begin + dur) so the plane
 * always sits exactly at the tip of the drawn line — no drift between engines.
 */
export default function FlightPath({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();

  // Gentle left→right climbing route in a wide 1200×260 band.
  const route = "M 70 210 C 360 255, 520 95, 770 140 S 1070 65, 1140 55";
  // Clean paper plane, nose on +x, centred on the origin. rotate="auto" turns it along the curve.
  const plane = "M 22 0 L -18 -13 L -7 0 L -18 13 Z";
  const DUR = 5;
  const BEGIN = 0.4;
  const play = inView && !reduce;

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg className="h-full w-full" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMid meet" fill="none">
        {/* Planned route — faint dotted line, always present */}
        <path
          d={route}
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeDasharray="1 12"
          strokeLinecap="round"
          opacity="0.18"
        />

        {/* Origin dot + destination pin */}
        <circle cx="70" cy="210" r="6.5" fill="var(--color-primary)" opacity="0.55" />
        <g>
          <circle cx="1140" cy="55" r="10" fill="none" stroke="var(--color-accent)" strokeWidth="3" opacity="0.85">
            {play && (
              <animate attributeName="r" values="10;15;10" dur="1.8s" begin={`${BEGIN + DUR}s`} repeatCount="indefinite" />
            )}
          </circle>
          <circle cx="1140" cy="55" r="3.5" fill="var(--color-accent)" />
        </g>

        {/* Travelled trail — brighter dotted line revealed progressively behind the plane */}
        <mask id="flight-reveal">
          <path
            d={route}
            stroke="#fff"
            strokeWidth="22"
            fill="none"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={play ? 1 : 0}
          >
            {play && (
              <animate
                attributeName="stroke-dashoffset"
                from="1"
                to="0"
                dur={`${DUR}s`}
                begin={`${BEGIN}s`}
                calcMode="linear"
                fill="freeze"
              />
            )}
          </path>
        </mask>
        <path
          d={route}
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="2 11"
          strokeLinecap="round"
          opacity="0.9"
          mask="url(#flight-reveal)"
        />

        {/* The plane */}
        {play ? (
          <g>
            <path d={plane} fill="var(--color-accent)" transform="scale(1.7)" />
            <path d="M -7 0 L 20 0" stroke="rgba(11,74,58,0.25)" strokeWidth="1.4" transform="scale(1.7)" />
            <animateMotion dur={`${DUR}s`} begin={`${BEGIN}s`} rotate="auto" fill="freeze" path={route} />
          </g>
        ) : (
          // Reduced motion / pre-view: plane parked at the destination, trail fully drawn.
          <g transform="translate(1140,55) rotate(-20) scale(1.7)">
            <path d={plane} fill="var(--color-accent)" />
            <path d="M -7 0 L 20 0" stroke="rgba(11,74,58,0.25)" strokeWidth="1.4" />
          </g>
        )}
      </svg>
    </div>
  );
}

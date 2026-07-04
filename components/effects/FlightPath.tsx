"use client";

export default function FlightPath({ className = "" }: { className?: string }) {
  // A much better, clearer airplane shape (points UP by default, centered roughly at 12,15)
  const airplanePath = "M 12.000 0.000 C 13.657 0.000 15.000 1.343 15.000 3.000 L 15.000 10.000 L 24.000 15.000 L 24.000 18.000 L 15.000 15.000 L 15.000 23.000 L 18.000 26.000 L 18.000 29.000 L 12.000 27.000 L 6.000 29.000 L 6.000 26.000 L 9.000 23.000 L 9.000 15.000 L 0.000 18.000 L 0.000 15.000 L 9.000 10.000 L 9.000 3.000 C 9.000 1.343 10.343 0.000 12.000 0.000 Z";

  return (
    <div className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
      {/* Decorative airplane routes across the screen */}
      <svg className="absolute inset-0 h-[120%] w-[120%] -left-[10%] -top-[10%] opacity-80" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        
        {/* ================= ROUTE 1 ================= */}
        <path id="route-1" d="M -100 800 Q 300 200, 700 500 T 1200 100" fill="none" />
        
        {/* Static Dotted Track */}
        <path
          d="M -100 800 Q 300 200, 700 500 T 1200 100"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="12 12"
          opacity="0.5"
        />

        {/* Airplane 1 */}
        <g fill="var(--color-primary)">
          {/* Airplane path rotated to face right (X-axis) so auto-rotate works correctly */}
          <path d={airplanePath} transform="translate(-12, -15) rotate(90) scale(1.2)" />
          <animateMotion dur="45s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-1" />
          </animateMotion>
        </g>


        {/* ================= ROUTE 2 ================= */}
        <path id="route-2" d="M 1200 600 Q 800 300, 400 700 T -200 200" fill="none" />
        
        {/* Static Dotted Track */}
        <path
          d="M 1200 600 Q 800 300, 400 700 T -200 200"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3"
          strokeDasharray="12 12"
          opacity="0.6"
        />

        {/* Airplane 2 */}
        <g fill="var(--color-accent)">
          <path d={airplanePath} transform="translate(-12, -15) rotate(90) scale(1.2)" />
          <animateMotion dur="60s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route-2" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}

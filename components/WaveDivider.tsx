type WaveDividerProps = {
  /** Colour the wave paints (usually the section it flows FROM). */
  fill?: string;
  /** "top" flows the fill down into the section below; "bottom" flips it. */
  position?: "top" | "bottom";
  className?: string;
};

// A seamless periodic wave (period 1200, drawn twice across a 2400 viewBox) so a
// translateX(-50%) loop tiles without a visible seam.
const PATH =
  "M0,30 C200,10 400,10 600,30 C800,50 1000,50 1200,30 C1400,10 1600,10 1800,30 C2000,50 2200,50 2400,30 L2400,0 L0,0 Z";
const PATH_2 =
  "M0,34 C240,54 460,54 640,34 C840,12 1020,12 1200,34 C1440,54 1660,54 1840,34 C2040,12 2220,12 2400,34 L2400,0 L0,0 Z";

export default function WaveDivider({ fill = "var(--color-paper)", position = "top", className = "" }: WaveDividerProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative w-full overflow-hidden leading-[0] ${
        position === "bottom" ? "rotate-180" : ""
      } ${className}`}
    >
      <div className="relative h-10 w-full md:h-16">
        <svg
          className="animate-wave-slow absolute inset-0 h-full w-[200%]"
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
          style={{ fill, opacity: 0.55 }}
        >
          <path d={PATH_2} />
        </svg>
        <svg
          className="animate-wave absolute inset-0 h-full w-[200%]"
          viewBox="0 0 2400 60"
          preserveAspectRatio="none"
          style={{ fill }}
        >
          <path d={PATH} />
        </svg>
      </div>
    </div>
  );
}

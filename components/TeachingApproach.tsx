import Image from "next/image";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import Icon from "./Icon";
import { teachingApproach } from "@/lib/content";

const highlights = [
  { icon: "sparkles", label: "Inspire curiosity" },
  { icon: "plant", label: "Foster creativity" },
  { icon: "award", label: "Ensure success" },
];

/** Spotlight band for the teaching-approach quote, shared by Home and About. */
export default function TeachingApproach() {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-primary-deep text-white shadow-[0_30px_60px_-35px_rgba(11,74,58,0.6)]">
            {/* Backdrop: drifting orbs + dot grid */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="animate-drift absolute -left-16 -top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <div className="animate-drift-slow absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              />
            </div>

            <div className="relative grid md:grid-cols-[1fr_1.2fr]">
              {/* Classroom photo, blending into the band */}
              <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
                <Image
                  src="/meec/gallery-2.webp"
                  alt="MEEC students learning together"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="animate-ken-burns object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-deep via-transparent to-transparent md:bg-linear-to-r md:via-primary-deep/20" />
              </div>

              {/* Quote content */}
              <div className="relative px-7 py-10 md:px-12 md:py-14">
                <span aria-hidden className="pointer-events-none absolute -top-2 right-6 font-display text-[7rem] leading-none text-accent/25">
                  &rdquo;
                </span>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
                  {teachingApproach.title}
                </p>
                <AnimatedHeading
                  text="Education becomes an exciting adventure"
                  className="mt-3 max-w-md font-display text-2xl font-medium leading-snug md:text-3xl"
                />
                <p className="mt-4 max-w-xl leading-relaxed text-white/80">{teachingApproach.body}</p>
                <ul className="mt-7 flex flex-wrap gap-2.5">
                  {highlights.map((h) => (
                    <li
                      key={h.label}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 hover:bg-white/15"
                    >
                      <Icon name={h.icon} className="h-4 w-4 text-accent" />
                      {h.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

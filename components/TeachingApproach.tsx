"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import Icon from "./Icon";
import { teachingApproach } from "@/lib/content";

const ROTATE_MS = 5000;

const facets = [
  {
    icon: "sparkles",
    label: "Inspire curiosity",
    body: "Innovative strategies spark real questions — every lesson becomes an adventure students want to explore.",
    image: "/meec/gallery-2.webp",
  },
  {
    icon: "plant",
    label: "Foster creativity",
    body: "Interactive, collaborative learning gives every student room to imagine, build and express their ideas.",
    image: "/meec/gallery-4.webp",
  },
  {
    icon: "award",
    label: "Ensure success",
    body: "Personalised support and proven methods shape bright minds, ready for a dynamic future.",
    image: "/meec/gallery-6.webp",
  },
];

/** Interactive spotlight band for the teaching-approach quote, shared by Home and About. */
export default function TeachingApproach() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const bandRef = useRef<HTMLDivElement>(null);

  // Auto-rotate the facets; pause while the visitor is hovering or has reduced motion.
  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % facets.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  // Amber spotlight that follows the pointer across the band.
  const onMove = (e: React.MouseEvent) => {
    const el = bandRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const facet = facets[active];

  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div
            ref={bandRef}
            onMouseMove={onMove}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="group relative overflow-hidden rounded-[28px] bg-primary-deep text-white shadow-[0_30px_60px_-35px_rgba(11,74,58,0.6)]"
          >
            {/* Backdrop: drifting orbs + dot grid */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="animate-drift absolute -left-16 -top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
              <div className="animate-drift-slow absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
              />
            </div>

            {/* Pointer spotlight (desktop) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px circle at var(--mx, 70%) var(--my, 30%), rgba(224,162,38,0.15), transparent 70%)",
              }}
            />

            <div className="relative grid md:grid-cols-[1fr_1.2fr]">
              {/* Photo — crossfades with the active facet */}
              <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={facet.image}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={facet.image}
                      alt={`MEEC — ${facet.label}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 45vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary-deep via-transparent to-transparent md:bg-linear-to-r md:via-primary-deep/20" />
              </div>

              {/* Quote + interactive facets */}
              <div className="relative px-7 py-10 md:px-12 md:py-14">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-2 right-6 font-display text-[7rem] leading-none text-accent/25"
                >
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

                {/* Facet tabs */}
                <div role="tablist" aria-label="Teaching approach highlights" className="mt-7 flex flex-wrap gap-2.5">
                  {facets.map((f, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={f.label}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActive(i)}
                        className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 max-sm:w-full ${
                          isActive
                            ? "border-accent bg-accent text-primary-deep shadow-[0_10px_24px_-12px_rgba(224,162,38,0.8)]"
                            : "border-white/15 bg-white/10 backdrop-blur-sm hover:border-accent/50 hover:bg-white/15"
                        }`}
                      >
                        <Icon name={f.icon} className="h-4 w-4 shrink-0" />
                        {f.label}
                        {/* Auto-rotate progress along the bottom of the active pill */}
                        {isActive && !reduce && !paused && (
                          <motion.span
                            key={`progress-${active}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-primary-deep/35"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active facet description */}
                <div className="mt-5 min-h-[72px] sm:min-h-[56px]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-xl leading-relaxed text-accent-soft"
                    >
                      {facet.body}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { programs, programTracks } from "@/lib/content";
import Icon from "./Icon";

const trackIcon: Record<string, string> = {
  GED: "book",
  Secondary: "cap",
  IGCSE: "globe",
  Diploma: "briefcase",
};

export default function Programs() {
  const [active, setActive] = useState<(typeof programTracks)[number]>("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (active === "All" ? programs : programs.filter((p) => p.track === active)),
    [active]
  );

  return (
    <section id="programs" className="scroll-mt-20 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our programs</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
            Find the right path for your education journey
          </h2>
          <p className="mt-4 text-lg text-muted">
            From GED and Secondary education to internationally recognised IGCSE and professional diplomas.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Program categories">
          {programTracks.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              onClick={() => setActive(t)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === t
                  ? "bg-primary text-white"
                  : "border border-line bg-paper text-ink/70 hover:border-primary hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.name}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.04 }}
                className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border p-6 transition-shadow duration-300 hover:shadow-[0_20px_40px_-22px_rgba(15,110,86,0.55)] ${
                  p.featured ? "border-primary bg-primary-soft/40" : "border-line bg-surface"
                }`}
              >
                <span className="pointer-events-none absolute inset-x-0 -top-px h-px scale-x-0 bg-linear-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon name={trackIcon[p.track]} className="h-5 w-5" />
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      p.featured ? "bg-primary text-white" : "bg-accent-soft text-primary-deep"
                    }`}
                  >
                    {p.featured ? "Popular" : p.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-medium text-ink">{p.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{p.blurb}</p>
                <p className="mt-4 border-t border-line pt-3 text-xs text-ink/55">{p.detail}</p>
                <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Learn more
                  <Icon name="arrow" className="h-4 w-4 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
                </span>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

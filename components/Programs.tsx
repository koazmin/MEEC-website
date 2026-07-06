"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { programs, programTracks, type Program } from "@/lib/content";
import Icon from "./Icon";

const trackIcon: Record<string, string> = {
  GED: "book",
  Secondary: "cap",
  IGCSE: "globe",
  Diploma: "briefcase",
};

const spring = { type: "spring" as const, stiffness: 300, damping: 24 };

export default function Programs() {
  const [active, setActive] = useState<(typeof programTracks)[number]>("All");
  const [open, setOpen] = useState<Program | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (active === "All" ? programs : programs.filter((p) => p.track === active)),
    [active]
  );

  // Close on Escape and lock body scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
                className={`group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border transition-shadow duration-300 hover:shadow-[0_20px_40px_-22px_rgba(15,110,86,0.55)] ${
                  p.featured ? "border-primary bg-primary-soft/40" : "border-line bg-surface"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(p)}
                  aria-haspopup="dialog"
                  className="flex h-full flex-col p-6 text-left"
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
                  <span className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                    Learn more
                    <Icon
                      name="arrow"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Program detail dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.name} details`}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.96 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, transition: spring }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-[24px] bg-surface shadow-2xl sm:rounded-[24px]"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-line bg-surface/95 px-6 py-5 backdrop-blur">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                      <Icon name={trackIcon[open.track]} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-ink md:text-2xl">{open.name}</h3>
                      <p className="mt-0.5 text-sm text-muted">Duration: {open.duration}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    aria-label="Close"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="space-y-7 px-6 py-6">
                {/* Overview */}
                <p className="leading-relaxed text-muted">{open.info.overview}</p>

                {/* Entry requirement (single-level programs) */}
                {open.info.entry && (
                  <div className="rounded-2xl border border-line bg-paper p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      Entry requirement
                    </p>
                    <p className="mt-1.5 text-sm text-ink">{open.info.entry}</p>
                  </div>
                )}

                {/* Levels */}
                {open.info.levels && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Levels</p>
                    <div className="mt-3 space-y-3">
                      {open.info.levels.map((l) => (
                        <div key={l.name} className="rounded-2xl border border-line bg-paper p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="font-medium text-ink">{l.name}</p>
                            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-primary-deep">
                              {l.duration}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm text-muted">
                            <span className="font-medium text-ink/70">Entry:</span> {l.entry}
                          </p>
                          {l.subjects && (
                            <ul className="mt-2.5 flex flex-wrap gap-1.5">
                              {l.subjects.map((s) => (
                                <li
                                  key={s}
                                  className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-deep"
                                >
                                  {s}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subjects */}
                {open.info.subjects && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {open.info.groups ? "Core subjects" : "Subjects"}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {open.info.subjects.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-[15px] text-muted">
                          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Groups: IGCSE tracks / diploma modules */}
                {open.info.groups && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                      {open.track === "Diploma" ? "Diplomas & modules" : "Optional tracks"}
                    </p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {open.info.groups.map((g) => (
                        <div key={g.name} className="rounded-2xl border border-line bg-paper p-4">
                          <p className="font-medium text-ink">{g.name}</p>
                          <ul className="mt-2 space-y-1.5">
                            {g.items.map((it) => (
                              <li key={it} className="flex items-start gap-2 text-sm text-muted">
                                <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {open.info.notes && (
                  <div className="rounded-2xl bg-primary-soft/50 p-4">
                    {open.info.notes.map((n) => (
                      <p key={n} className="flex items-start gap-2 text-sm leading-relaxed text-primary-deep">
                        <Icon name="star" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {n}
                      </p>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <a
                  href="/contact"
                  className="shine group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Enquire about this program
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

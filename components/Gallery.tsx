"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { gallery, activities } from "@/lib/content";
import Icon from "./Icon";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="campus" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Campus life</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
            {activities.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{activities.body}</p>
        </div>

        {/* Polaroid collage — scattered snapshots that straighten and lift on hover */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 md:gap-x-7 md:gap-y-11 lg:grid-cols-4">
          {gallery.map((src, i) => {
            // Deterministic scrapbook scatter: tilt + slight vertical drift per position.
            const rotations = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2", "rotate-2", "-rotate-3"];
            const drifts = ["", "md:translate-y-4", "md:translate-y-1", "md:translate-y-5", "md:translate-y-2", "", "md:translate-y-3", "md:translate-y-1"];
            const rot = rotations[i % rotations.length];
            const drift = drifts[i % drifts.length];
            return (
              <motion.div
                key={src}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: reduce ? 0 : (i % 4) * 0.07 }}
                className={drift}
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open campus photo ${i + 1}`}
                  className={`group relative block w-full bg-white p-2 pb-8 shadow-[0_12px_28px_-14px_rgba(17,36,29,0.4)] transition-all duration-300 ease-out sm:p-2.5 sm:pb-9 ${rot} hover:z-20 hover:rotate-0 hover:scale-[1.06] hover:shadow-[0_26px_50px_-18px_rgba(17,36,29,0.5)]`}
                >
                  {/* Masking tape */}
                  <span
                    aria-hidden
                    className={`absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 bg-accent-soft/80 shadow-sm ${
                      i % 2 ? "rotate-[4deg]" : "rotate-[-5deg]"
                    }`}
                  />
                  <span className="relative block aspect-[4/3] overflow-hidden bg-primary-soft">
                    <Image
                      src={src}
                      alt={`MEEC campus activity ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </span>
                  {/* Polaroid chin with a tiny handwritten-style mark */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-display text-[11px] italic tracking-wide text-ink/35 sm:bottom-2.5">
                    MEEC ✦ campus life
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Campus photo viewer"
          >
            <button
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-ink"
              onClick={() => setOpen(null)}
              aria-label="Close"
            >
              <Icon name="arrow" className="h-5 w-5 rotate-180" />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gallery frame: white mat + gold trim hugging the photo */}
              <div className="rounded-[22px] bg-white p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:p-2.5">
                <div className="rounded-2xl border-2 border-accent/60 p-1 sm:p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={gallery[open]}
                    alt={`MEEC campus activity ${open + 1}`}
                    className="block max-h-[74vh] max-w-[86vw] rounded-xl object-contain sm:max-h-[78vh]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

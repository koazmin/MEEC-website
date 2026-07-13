"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { events } from "@/lib/content";
import Icon from "./Icon";

type EventsGalleryProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  surface?: boolean;
};

const PREVIEW_COUNT = 8;

export default function EventsGallery({
  eyebrow = "Life at MEEC",
  title = "Moments from our community",
  subtitle = "Day trips, classes, and celebrations — a look at student life at MEEC.",
  surface = false,
}: EventsGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const reduce = useReducedMotion();
  const visible = showAll ? events : events.slice(0, PREVIEW_COUNT);

  return (
    <section className={`py-20 md:py-28 ${surface ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted">{subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => setOpen(i)}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: reduce ? 0 : (i % 4) * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line"
              aria-label={`Open MEEC event photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`MEEC community event ${i + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-primary-deep/0 transition-colors group-hover:bg-primary-deep/10" />
            </motion.button>
          ))}
        </div>

        {events.length > PREVIEW_COUNT && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              {showAll ? "Show fewer photos" : `View all ${events.length} photos`}
              <Icon name="arrow" className={`h-4 w-4 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
            </button>
          </div>
        )}
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
            aria-label="MEEC event photo viewer"
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
              <div className="rounded-[22px] bg-linear-to-r from-primary via-accent to-primary p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:p-2.5">
                <div className="rounded-2xl border-2 border-accent/60 p-1 sm:p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={events[open]}
                    alt={`MEEC community event ${open + 1}`}
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

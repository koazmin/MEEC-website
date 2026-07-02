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

export default function EventsGallery({
  eyebrow = "Life at MEEC",
  title = "Moments from our community",
  subtitle = "Day trips, classes, and celebrations — a look at student life at MEEC.",
  surface = false,
}: EventsGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className={`py-20 md:py-28 ${surface ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted">{subtitle}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {events.map((src, i) => (
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
              className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={events[open]} alt={`MEEC community event ${open + 1}`} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

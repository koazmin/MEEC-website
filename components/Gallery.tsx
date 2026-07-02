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

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((src, i) => (
            <motion.button
              key={src}
              onClick={() => setOpen(i)}
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: reduce ? 0 : (i % 4) * 0.07 }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-line"
              aria-label={`Open campus photo ${i + 1}`}
            >
              <Image
                src={src}
                alt={`MEEC campus activity ${i + 1}`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-primary-deep/0 transition-colors group-hover:bg-primary-deep/15" />
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
              className="relative h-[70vh] w-full max-w-3xl overflow-hidden rounded-2xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={gallery[open]} alt={`MEEC campus activity ${open + 1}`} fill className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

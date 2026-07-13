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

        {/* Bento mosaic — every 5th photo becomes a large 2x2 feature tile */}
        <div className="mt-8 grid grid-flow-dense grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((src, i) => {
            const featured = i % 5 === 0;
            return (
              <motion.button
                key={src}
                onClick={() => setOpen(i)}
                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : (i % 4) * 0.06 }}
                className={`group relative aspect-square overflow-hidden border border-line ${
                  featured ? "col-span-2 row-span-2 rounded-[26px]" : "rounded-2xl"
                }`}
                aria-label={`Open campus photo ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`MEEC campus activity ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Hover veil + zoom hint */}
                <span className="absolute inset-0 bg-linear-to-t from-primary-deep/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span
                  className={`absolute bottom-3 right-3 flex items-center justify-center rounded-full bg-white/90 text-primary-deep opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 ${
                    featured ? "h-11 w-11" : "h-9 w-9"
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3M11 8v6M8 11h6" />
                  </svg>
                </span>
                {/* Accent corner on feature tiles */}
                {featured && (
                  <span className="absolute left-0 top-0 h-1.5 w-16 rounded-br-full bg-linear-to-r from-accent to-accent/0" />
                )}
              </motion.button>
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

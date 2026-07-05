"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { oes } from "@/lib/content";
import Icon from "./Icon";

type Partner = (typeof oes.partnerDetails)[number];

const spring = { type: "spring" as const, stiffness: 300, damping: 22 };

export default function PartnersGrid() {
  const [open, setOpen] = useState<Partner | null>(null);
  const reduce = useReducedMotion();

  return (
    <>
      <motion.div
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        initial={reduce ? undefined : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, margin: "-60px" }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {oes.partnerDetails.map((p) => (
          <motion.button
            key={p.name}
            onClick={() => setOpen(p)}
            variants={{
              hidden: { opacity: 0, y: 22, scale: 0.94 },
              visible: { opacity: 1, y: 0, scale: 1, transition: spring },
            }}
            whileHover={reduce ? undefined : { y: -6, scale: 1.03, transition: spring }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            className="group relative flex h-full flex-col items-center justify-start gap-3 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-5 text-center transition-[border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_18px_38px_-20px_rgba(15,110,86,0.55)]"
            aria-haspopup="dialog"
          >
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-primary via-accent to-primary transition-transform duration-500 group-hover:scale-x-100" />
            <span className="relative mt-1 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-2">
              <Image
                src={p.logo}
                alt={`${p.name} logo`}
                fill
                loading="lazy"
                sizes="80px"
                className="object-contain p-1.5"
              />
            </span>
            <span className="text-sm font-medium leading-snug text-ink">{p.name}</span>
            <span className="text-xs text-muted">{p.country}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:opacity-100">
              View details
              <Icon name="arrow" className="h-3.5 w-3.5 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${open.name} details`}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-card)] bg-surface p-7 md:p-9"
              initial={reduce ? { opacity: 0 } : { scale: 0.9, opacity: 0, y: 28 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0, transition: spring }}
              exit={{ scale: 0.95, opacity: 0, y: 16, transition: { duration: 0.18 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all hover:rotate-90 hover:border-primary hover:text-primary"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <motion.div
                initial={reduce ? undefined : "hidden"}
                animate={reduce ? undefined : "visible"}
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } } }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                  className="flex items-center gap-4 pr-10"
                >
                  <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                    <Image src={open.logo} alt="" fill sizes="64px" className="object-contain p-1.5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{open.country}</p>
                    <h3 className="mt-1 font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
                      {open.name}
                    </h3>
                  </div>
                </motion.div>

                {"facts" in open && open.facts && (
                  <motion.ul
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    className="mt-6 space-y-2 rounded-2xl bg-primary-soft/50 p-4"
                  >
                    {open.facts.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[15px] text-primary-deep">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-primary" />
                        {f}
                      </li>
                    ))}
                  </motion.ul>
                )}

                {open.programs && (
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {open.programs.map((group) => (
                      <motion.div
                        key={group.label}
                        variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                        className={group.items.length > 10 ? "sm:col-span-2" : ""}
                      >
                        <p className="font-display text-lg font-medium text-ink">{group.label}</p>
                        <ul
                          className={`mt-3 gap-x-6 gap-y-1.5 ${
                            group.items.length > 10 ? "grid grid-cols-2 sm:grid-cols-3" : "space-y-1.5"
                          }`}
                        >
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-muted">
                              <Icon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

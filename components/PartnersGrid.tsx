"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { oes } from "@/lib/content";
import Icon from "./Icon";

type Partner = (typeof oes.partnerDetails)[number];

export default function PartnersGrid() {
  const [open, setOpen] = useState<Partner | null>(null);
  const reduce = useReducedMotion();

  return (
    <>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {oes.partnerDetails.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setOpen(p)}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: reduce ? 0 : (i % 5) * 0.05 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="group flex h-full flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-line bg-paper p-5 text-center transition-colors hover:border-primary hover:shadow-[0_14px_30px_-20px_rgba(15,110,86,0.5)]"
            aria-haspopup="dialog"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110">
              <Icon name="cap" className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium leading-snug text-ink">{p.name}</span>
            <span className="text-xs text-muted">{p.country}</span>
            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View details
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
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
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:text-primary"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                ✕
              </button>

              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{open.country}</p>
              <h3 className="mt-2 pr-10 font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
                {open.name}
              </h3>

              {"facts" in open && open.facts && (
                <ul className="mt-5 space-y-2">
                  {open.facts.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-muted">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-sm bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {open.programs && (
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {open.programs.map((group) => (
                    <div key={group.label} className={group.items.length > 10 ? "sm:col-span-2" : ""}>
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
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

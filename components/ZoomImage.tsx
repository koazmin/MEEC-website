"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type ZoomImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * A fill image that opens a full-screen lightbox when clicked.
 * Drop-in replacement for `<Image fill …/>` inside a `relative` container.
 */
export default function ZoomImage({ src, alt, sizes, className, loading }: ZoomImageProps) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${alt}`}
        className="absolute inset-0 h-full w-full cursor-zoom-in"
      >
        <Image src={src} alt={alt} fill sizes={sizes} loading={loading} className={className} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-5"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-xl text-ink"
            >
              ✕
            </button>
            <motion.div
              initial={reduce ? { opacity: 0 } : { scale: 0.94, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative h-[82vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  // Portal target only exists in the browser.
  useEffect(() => setMounted(true), []);

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

      {/* Portal to <body> so ancestor CSS transforms (e.g. Tilt) can't trap the
          fixed overlay inside the card. */}
      {mounted &&
        createPortal(
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
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Gallery frame: white mat + gold trim hugging the photo */}
                  <div className="rounded-[22px] bg-white p-2 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)] sm:p-2.5">
                    <div className="rounded-2xl border-2 border-accent/60 p-1 sm:p-1.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={alt}
                        className="block max-h-[74vh] max-w-[86vw] rounded-xl object-contain sm:max-h-[78vh]"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

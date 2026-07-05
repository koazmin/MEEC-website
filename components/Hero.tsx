"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import Icon from "./Icon";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const pathways = ["GED", "IGCSE O' Level", "Secondary", "Diplomas"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  // Fade the video in once it can play; otherwise the clean poster frame stays.
  const [videoReady, setVideoReady] = useState(false);

  // In-app browsers (Viber, Facebook, WeChat) often ignore the `autoPlay`
  // attribute and only honour a programmatic play() call — WeChat additionally
  // blocks playback until its JS bridge is ready or the user interacts. Kick it
  // off through every available channel so the clip starts on the first visit.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;

    const start = () => {
      v.play().then(() => setVideoReady(true)).catch(() => {});
    };

    // Fire as soon as the first frame is decoded.
    if (v.readyState >= 2) start();
    else v.addEventListener("loadeddata", start, { once: true });

    // WeChat gates autoplay behind its own ready event.
    document.addEventListener("WeixinJSBridgeReady", start);

    // Universal fallback: the first user gesture unlocks playback in any strict
    // in-app browser. The clip is muted, so a tap or scroll is enough.
    const gestures = ["touchstart", "click", "scroll"] as const;
    gestures.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));

    return () => {
      v.removeEventListener("loadeddata", start);
      document.removeEventListener("WeixinJSBridgeReady", start);
      gestures.forEach((e) => window.removeEventListener(e, start));
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.1]);
  const barsY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "38%"]);

  // Final word of the title becomes an italic accent flourish.
  const titleWords = hero.title.trim().split(" ");
  const lastWord = titleWords.pop() ?? "";
  const leadWords = titleWords.join(" ");

  return (
    <>
      {/* 1 — Video band (standalone). On phones use a 16:9 height so the
          landscape video's centred "MEEC" text is never cropped; full height on desktop. */}
      <section
        ref={ref}
        className="relative w-full overflow-hidden h-[280px] sm:h-[360px] md:h-screen md:min-h-[520px]"
      >
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 will-change-transform">
          <Image
            src={hero.poster}
            alt="MEEC — Wings for Your Dreams"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={hero.poster}
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          >
            <source src={hero.video} type="video/mp4" />
          </video>
          {/* Top scrim — kept short/soft so it only shades behind the header, not the video body */}
          <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink/65 via-ink/20 to-transparent" />
          {/* Bottom fade blends the video into the content section below */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-paper to-transparent" />
        </motion.div>

        {/* Decorative brand bars */}
        <motion.div
          aria-hidden
          style={{ y: barsY }}
          className="pointer-events-none absolute right-[6%] top-0 hidden h-full items-stretch gap-3 md:flex"
        >
          <span className="mt-20 w-3 rounded-full bg-accent/70" />
          <span className="mb-28 mt-10 w-3 rounded-full bg-white/40" />
        </motion.div>

        {/* Scroll cue */}
        <div aria-hidden className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80">
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-white/50 p-1.5"
          >
            <span className="h-2 w-1 rounded-full bg-white/80" />
          </motion.div>
        </div>
      </section>

      {/* 2 — Content (standalone, full width, below the video) */}
      <section className="bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-primary-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mx-auto mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink sm:text-6xl md:text-7xl">
              {leadWords} <span className="italic text-accent">{lastWord}.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{hero.body}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Link
                  href="/programs"
                  className="shine group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform active:scale-95"
                >
                  Explore programs
                  <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Visit our campus
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {pathways.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-primary-soft px-3.5 py-1.5 text-sm font-medium text-primary-deep"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}

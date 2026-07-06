"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import Icon from "./Icon";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import HeroParticles from "./effects/HeroParticles";
import GradientText from "./effects/GradientText";

const pathways = ["GED", "IGCSE O' Level", "Secondary", "Diplomas"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, reduce ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", reduce ? "0%" : "12%"]);

  // Final word of the title becomes an italic accent flourish.
  const titleWords = hero.title.trim().split(" ");
  const lastWord = titleWords.pop() ?? "";
  const leadWords = titleWords.join(" ");

  return (
    <section
      ref={ref}
      className="hero-curved-bottom hero-noise relative flex w-full items-center justify-center overflow-hidden h-[85vh] min-h-[520px] sm:h-screen sm:min-h-[600px]"
    >
      {/* ---- Video / Image background ---- */}
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

        {/* Cinematic gradient scrims */}
        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-linear-to-r from-ink/60 via-transparent to-ink/30" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,24,18,0.6) 100%)" }} />
      </motion.div>

      {/* ---- Floating glow orbs ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-morph animate-drift absolute -left-[10%] top-[10%] h-72 w-72 bg-accent/20 blur-[80px] md:h-96 md:w-96" />
        <div className="animate-morph animate-drift-slow absolute -right-[8%] bottom-[5%] h-64 w-64 bg-primary/25 blur-[80px] md:h-80 md:w-80" />
        <div className="animate-pulse-glow absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-accent/10 blur-[60px]" />
      </div>

      {/* ---- Particles ---- */}
      <HeroParticles />

      {/* ---- Decorative brand bars ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-0 hidden h-full items-stretch gap-3 md:flex"
      >
        <span className="mt-20 w-3 rounded-full bg-accent/50" />
        <span className="mb-28 mt-10 w-3 rounded-full bg-white/25" />
      </div>

      {/* ---- Content overlay ---- */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto max-w-6xl px-5 text-center will-change-transform"
      >
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="mx-auto mt-6 max-w-5xl font-display text-5xl font-medium leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {leadWords}{" "}
            <GradientText
              className="italic"
              gradient="linear-gradient(90deg, #e0a226 0%, #fff8e1 30%, #e0a226 50%, #fff8e1 70%, #e0a226 100%)"
            >
              {lastWord}.
            </GradientText>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{hero.body}</p>
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
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/20"
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
                className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm"
              >
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </motion.div>

      {/* ---- Animated accent line at bottom ---- */}
      <div className="absolute bottom-[60px] left-0 right-0 z-[3] flex justify-center">
        <div className="animate-draw-line h-px w-32 bg-linear-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* ---- Scroll cue with glow ---- */}
      <div aria-hidden className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-white/80 sm:bottom-24">
        <div className="animate-pulse-glow absolute -inset-4 rounded-full bg-accent/10 blur-xl" />
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-10 w-6 items-start justify-center rounded-full border border-white/50 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-white/80" />
        </motion.div>
      </div>
    </section>
  );
}

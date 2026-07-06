"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import HeroParticles from "./effects/HeroParticles";

type HeroVariant = "default" | "academic" | "global" | "maritime" | "creative" | "career";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
  /** Slowly zoom/pan the background image. Defaults on when an image is set. */
  kenBurns?: boolean;
  /** Large transparent watermark text behind the title. */
  watermark?: string;
  /** Visual colour theme. Each variant shifts the gradient mesh colours. */
  variant?: HeroVariant;
};

const variantGradients: Record<HeroVariant, string> = {
  default:
    "conic-gradient(from 0deg, transparent 0deg, rgba(224,162,38,0.20) 55deg, transparent 130deg, rgba(15,110,86,0.30) 235deg, transparent 320deg)",
  academic:
    "conic-gradient(from 30deg, transparent 0deg, rgba(15,110,86,0.25) 60deg, transparent 140deg, rgba(224,162,38,0.18) 250deg, transparent 340deg)",
  global:
    "conic-gradient(from 120deg, transparent 0deg, rgba(38,130,180,0.22) 65deg, transparent 150deg, rgba(15,110,86,0.28) 260deg, transparent 350deg)",
  maritime:
    "conic-gradient(from 200deg, transparent 0deg, rgba(20,80,120,0.28) 70deg, transparent 160deg, rgba(15,110,86,0.20) 270deg, transparent 355deg)",
  creative:
    "conic-gradient(from 270deg, transparent 0deg, rgba(224,162,38,0.30) 50deg, transparent 120deg, rgba(200,80,50,0.15) 220deg, transparent 310deg)",
  career:
    "conic-gradient(from 90deg, transparent 0deg, rgba(224,162,38,0.22) 55deg, transparent 130deg, rgba(15,110,86,0.35) 240deg, transparent 330deg)",
};

const variantOrbColors: Record<HeroVariant, [string, string, string]> = {
  default: ["bg-accent/30", "bg-primary/45", "bg-accent-soft/20"],
  academic: ["bg-primary/35", "bg-accent/25", "bg-primary-soft/30"],
  global: ["bg-[rgba(38,130,180,0.3)]", "bg-primary/35", "bg-accent/20"],
  maritime: ["bg-[rgba(20,80,120,0.35)]", "bg-primary/30", "bg-accent/15"],
  creative: ["bg-accent/35", "bg-[rgba(200,80,50,0.2)]", "bg-accent-soft/25"],
  career: ["bg-accent/25", "bg-primary/40", "bg-accent-soft/20"],
};

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  image,
  kenBurns = true,
  watermark,
  variant = "default",
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const orbs = variantOrbColors[variant];

  return (
    <section className="hero-curved-bottom hero-noise relative isolate flex min-h-[62vh] items-center overflow-hidden bg-primary-deep text-white md:min-h-[70vh]">
      {/* ---- Background layer ---- */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {/* Cinematic image, or a rich brand gradient when there's none */}
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className={`object-cover ${kenBurns && !reduce ? "animate-ken-burns" : ""}`}
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary-deep via-primary-deep/85 to-primary-deep/45" />
            <div className="absolute inset-0 bg-linear-to-t from-primary-deep via-primary-deep/25 to-primary-deep/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary-deep via-primary to-primary-deep" />
        )}

        {/* Animated gradient mesh — variant-coloured conic light */}
        <div
          className={`absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 opacity-50 ${
            reduce ? "" : "animate-spin-slow"
          }`}
          style={{ background: variantGradients[variant] }}
        />

        {/* Morphing aurora orbs — bigger, more visible */}
        <div
          className={`absolute -left-[10%] top-[6%] h-80 w-80 blur-[80px] md:h-[28rem] md:w-[28rem] ${orbs[0]} ${
            reduce ? "" : "animate-morph animate-drift"
          }`}
        />
        <div
          className={`absolute -bottom-[14%] right-[-8%] h-72 w-72 blur-[80px] md:h-96 md:w-96 ${orbs[1]} ${
            reduce ? "" : "animate-morph animate-drift-slow"
          }`}
        />
        <div
          className={`absolute right-[16%] top-[10%] hidden h-56 w-56 blur-[60px] md:block ${orbs[2]} ${
            reduce ? "" : "animate-float"
          }`}
        />

        {/* Pulsing glow focal point */}
        <div className={`absolute left-1/3 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[50px] ${reduce ? "" : "animate-pulse-glow"}`} />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        {/* Diagonal light sweep — more visible */}
        <div className={`absolute top-0 h-full w-2/3 bg-linear-to-r from-transparent via-white/[0.14] to-transparent ${reduce ? "" : "animate-sweep"}`} />
      </div>

      {/* ---- Floating particles ---- */}
      <HeroParticles />

      {/* ---- Watermark ---- */}
      {watermark && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hero-watermark font-display"
        >
          {watermark}
        </motion.span>
      )}

      {/* ---- Decorative floating geometric shapes ---- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Rotating hexagon outline */}
        <div className={`absolute -right-8 top-[18%] h-32 w-32 rounded-[20px] border border-white/[0.06] md:h-48 md:w-48 ${reduce ? "" : "animate-spin-slow"}`} style={{ animationDuration: "40s" }} />
        {/* Circle */}
        <div className={`absolute -left-12 bottom-[20%] h-24 w-24 rounded-full border border-white/[0.05] md:h-36 md:w-36 ${reduce ? "" : "animate-spin-slow"}`} style={{ animationDuration: "55s", animationDirection: "reverse" }} />
        {/* Small diamond */}
        <div className={`absolute right-[20%] bottom-[15%] hidden h-16 w-16 rotate-45 border border-white/[0.06] md:block ${reduce ? "" : "animate-float"}`} />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-[2] mx-auto w-full max-w-6xl px-5 py-24 md:py-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/90">{breadcrumb}</span>
          </nav>
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.06}>
            <span className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-accent-soft backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {eyebrow}
            </span>
          </Reveal>
        )}

        <AnimatedHeading
          as="h1"
          text={title}
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl"
        />

        {subtitle && (
          <Reveal delay={0.22}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{subtitle}</p>
          </Reveal>
        )}

        {/* Animated accent line — draws itself in */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center gap-3">
            <span className="animate-draw-line h-px w-20 bg-linear-to-r from-accent to-accent/40" />
            <span className="animate-pulse-glow h-2 w-2 rounded-full bg-accent" />
            <span className="animate-draw-line h-px w-10 bg-accent/30" style={{ animationDelay: "0.3s" }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
  /** Slowly zoom/pan the background image. Defaults on when an image is set. */
  kenBurns?: boolean;
};

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, image, kenBurns = true }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-deep pb-16 pt-28 text-white md:pb-24 md:pt-40">
      {/* Background: cinematic image, or an animated aurora when there's none */}
      {image ? (
        <div aria-hidden className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover ${kenBurns ? "animate-ken-burns" : ""}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/85 to-primary-deep/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-transparent to-primary-deep/25" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="animate-float absolute -left-24 -top-16 h-[28rem] w-[28rem] rounded-full bg-primary/50 blur-3xl" />
          <div className="animate-float-x absolute -bottom-24 right-0 h-[26rem] w-[26rem] rounded-full bg-accent/12 blur-3xl" />
        </div>
      )}

      {/* Faint dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />

      {/* Floating accent orbs */}
      <div
        aria-hidden
        className="animate-float pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-float-x pointer-events-none absolute left-[8%] top-12 hidden h-40 w-40 rounded-full bg-accent/10 blur-3xl md:block"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/85">{breadcrumb}</span>
          </nav>
        </Reveal>

        {eyebrow && (
          <Reveal delay={0.06}>
            <p className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">
              <span className="h-px w-8 bg-accent-soft/60" />
              {eyebrow}
            </p>
          </Reveal>
        )}

        <AnimatedHeading
          as="h1"
          text={title}
          className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl"
        />

        {subtitle && (
          <Reveal delay={0.22}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

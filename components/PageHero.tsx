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
    <section className="relative isolate flex min-h-[58vh] items-center overflow-hidden bg-primary-deep text-white md:min-h-[66vh]">
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
              className={`object-cover ${kenBurns ? "animate-ken-burns" : ""}`}
            />
            <div className="absolute inset-0 bg-linear-to-r from-primary-deep via-primary-deep/85 to-primary-deep/45" />
            <div className="absolute inset-0 bg-linear-to-t from-primary-deep via-primary-deep/25 to-primary-deep/70" />
          </>
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary-deep via-primary to-primary-deep" />
        )}

        {/* Slowly rotating conic light */}
        <div
          className="animate-spin-slow absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-40"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(224,162,38,0.20) 55deg, transparent 130deg, rgba(15,110,86,0.30) 235deg, transparent 320deg)",
          }}
        />

        {/* Drifting aurora orbs — clearly visible motion */}
        <div className="animate-drift absolute -left-[8%] top-[6%] h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
        <div className="animate-drift-slow absolute -bottom-[12%] right-[-6%] h-96 w-96 rounded-full bg-primary/45 blur-3xl" />
        <div className="animate-float absolute right-[16%] top-[10%] hidden h-56 w-56 rounded-full bg-accent-soft/20 blur-3xl md:block" />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />

        {/* Diagonal light sweep */}
        <div className="animate-sweep absolute top-0 h-full w-1/2 bg-linear-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* ---- Content ---- */}
      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 md:py-16">
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
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl"
        />

        {subtitle && (
          <Reveal delay={0.22}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">{subtitle}</p>
          </Reveal>
        )}

        {/* Decorative accent rule */}
        <Reveal delay={0.3}>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-px w-16 bg-linear-to-r from-accent to-transparent" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-px w-8 bg-accent/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

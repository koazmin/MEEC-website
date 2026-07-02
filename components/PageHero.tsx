import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
};

export default function PageHero({ eyebrow, title, subtitle, breadcrumb, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary-deep pb-14 pt-28 text-white md:pb-20 md:pt-36">
      {image && (
        <div aria-hidden className="absolute inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-deep via-primary-deep/90 to-primary-deep/55" />
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">·</span>
            <span className="text-white/85">{breadcrumb}</span>
          </nav>
          {eyebrow && (
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">{eyebrow}</p>
          )}
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}

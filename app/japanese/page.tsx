import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ZoomImage from "@/components/ZoomImage";
import { japanese } from "@/lib/content";

import SakuraDrift from "@/components/effects/SakuraDrift";
import BrushStroke from "@/components/effects/BrushStroke";

export const metadata: Metadata = {
  title: "Japanese language classes — MEEC",
  description: japanese.intro,
};

export default function JapanesePage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Japanese"
        eyebrow={japanese.eyebrow}
        title="MEEC Japanese Language Classes"
        subtitle={japanese.intro}
        image="/meec/japanese/jp-class-uniform.jpg"
        watermark="日本語"
        variant="creative"
      />

      {/* What we offer */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">What we offer</p>
            <h2 className="relative mt-3 inline-block font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              From your first word to working in Japan
              <BrushStroke className="opacity-40" />
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {japanese.offerings.map((o, i) => (
              <Reveal key={o.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name={o.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">{o.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JLPT ladder */}
      <section className="relative overflow-hidden bg-primary-deep py-20 text-white md:py-24">
        <SakuraDrift />
        <div className="relative z-10 mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">JLPT preparation</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Prepare for every level</h2>
            <p className="mt-4 max-w-2xl text-white/80">
              Structured exam-preparation classes for the Japanese-Language Proficiency Test — start where you are and
              climb toward fluency.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {japanese.jlpt.map((level, i) => (
              <Reveal key={level} delay={i * 0.07}>
                <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-5 text-center">
                  <p className="font-display text-3xl font-medium text-accent">{level}</p>
                  <p className="mt-1 text-xs text-white/70">
                    {level === "N5" ? "Beginner" : level === "N1" ? "Advanced" : "Step " + (i + 1)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Study in Japan */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line">
              <ZoomImage
                src="/meec/japanese/jp-class-study.jpg"
                alt="MEEC students studying in class"
                sizes="(max-width:768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Study in Japan</p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                Full support to study across Japan
              </h2>
              <p className="mt-4 text-lg text-muted">
                We provide education and consulting services with full support to enrol at Japanese language schools in
                cities such as:
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {japanese.cities.map((c) => (
                  <span key={c} className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary-deep">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Student placement — how MEEC introduces students to partner institutions */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Student placement</p>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink md:text-[2rem]">
              {japanese.placement.statement}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {japanese.placement.routes.map((r) => (
                <span key={r} className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary-deep">
                  {r}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mt-8 max-w-2xl border-l-4 border-accent pl-5 text-left font-display text-lg italic leading-relaxed text-ink/85">
              {japanese.placement.promise}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Skilled worker fields */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Work in Japan</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Skilled worker training fields
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Train for in-demand skilled work and we&rsquo;ll connect you with the right recruitment agency in Japan.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {japanese.skilledFields.map((f, i) => (
              <Reveal key={f.label} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary-deep">
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <p className="font-medium text-ink">{f.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Training in action */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Training in action</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Learning, caring, preparing
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { src: "/meec/japanese/jp-care-1.jpg", alt: "Nursing care training", span: "md:col-span-2 md:row-span-2" },
              { src: "/meec/japanese/jp-anatomy.jpg", alt: "Anatomy lesson", span: "" },
              { src: "/meec/japanese/jp-reception.jpg", alt: "Counselling at reception", span: "" },
              { src: "/meec/japanese/jp-care-2.jpg", alt: "Bedside care practice", span: "" },
              { src: "/meec/japanese/jp-orientation.jpg", alt: "Student orientation", span: "" },
            ].map((p, i) => (
              <Reveal key={p.src} delay={(i % 4) * 0.06} className={p.span}>
                <div className={`relative overflow-hidden rounded-2xl border border-line ${p.span ? "h-full min-h-[220px]" : "aspect-[4/3]"}`}>
                  <ZoomImage
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] bg-primary px-7 py-10 text-white md:flex-row md:px-14">
            <div>
              <h2 className="font-display text-2xl font-medium md:text-3xl">Begin your Japanese journey</h2>
              <p className="mt-2 text-white/85">Join our next intake — study, pass the JLPT, and work in Japan.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
            >
              Enquire now
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

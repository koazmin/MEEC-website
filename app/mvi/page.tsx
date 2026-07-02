import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { mvi } from "@/lib/content";

export const metadata: Metadata = {
  title: "MVI — Mahar Vocational Institute | MEEC",
  description: mvi.intro,
};

const valueIcon: Record<string, string> = { award: "award", globe: "globe", shield: "shield" };

export default function MviPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="MVI"
        eyebrow={mvi.fullName}
        title="Practical maritime training for the modern seafarer"
        subtitle={mvi.intro}
        image={mvi.hero}
      />

      {/* Vision / Mission */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Vision</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{mvi.vision}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Mission</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{mvi.mission}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary-deep py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Our core values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {mvi.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep">
                    <Icon name={valueIcon[v.icon]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Training programs</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Courses that get you ship-ready
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mvi.courses.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <span className="font-display text-2xl text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium text-ink">{c.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 flex items-start gap-2.5 text-sm leading-relaxed text-muted">
              <Icon name="award" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {mvi.trainers}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our trainers */}
      <section className="bg-primary-deep py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">Our team</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Meet our trainers</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
            {mvi.trainerPhotos.map((src, i) => (
              <Reveal key={src} delay={(i % 7) * 0.05}>
                <div className="relative mx-auto aspect-square w-full max-w-[120px] overflow-hidden rounded-full">
                  <Image
                    src={src}
                    alt={`MVI trainer ${i + 1}`}
                    fill
                    loading="lazy"
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Campus gallery */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our campus</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Where training happens
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {mvi.campus.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.06}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={src}
                    alt="MVI campus"
                    fill
                    loading="lazy"
                    sizes="(max-width:768px) 50vw, 33vw"
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
            <h2 className="font-display text-2xl font-medium md:text-3xl">Start your maritime career</h2>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
            >
              Enquire about courses
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

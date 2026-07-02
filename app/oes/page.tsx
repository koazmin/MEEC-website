import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { oes } from "@/lib/content";

export const metadata: Metadata = {
  title: "OES — overseas education services | MEEC",
  description: oes.mission,
};

export default function OesPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="OES"
        eyebrow={oes.tagline}
        title="Study abroad, with MEEC by your side"
        subtitle={oes.intro}
        image="/meec/japanese/jp-reception.jpg"
      />

      {/* Mission */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our mission</p>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink md:text-[2rem]">{oes.mission}</p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">How we help</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Everything you need, end to end
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {oes.services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations + levels */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <h3 className="font-display text-xl font-medium text-ink">Study destinations</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {oes.destinations.map((d) => (
                  <span key={d} className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary-deep">
                    {d}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">{oes.partnerNote}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-8">
              <h3 className="font-display text-xl font-medium text-ink">Qualification levels</h3>
              <ul className="mt-4 space-y-2">
                {oes.levels.map((l) => (
                  <li key={l} className="flex items-center gap-3 text-muted">
                    <Icon name="cap" className="h-5 w-5 text-primary" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner universities */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Partner universities</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Where our students go
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oes.partners.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 0.06}>
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      loading="lazy"
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-medium text-ink">{p.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{p.country}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Full partner list by country */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {oes.partnersByCountry.map((group, gi) => (
              <Reveal key={group.country} delay={gi * 0.08}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">{group.country}</p>
                  <ul className="mt-3 space-y-1.5">
                    {group.universities.map((u) => (
                      <li key={u} className="flex items-start gap-2 text-[15px] text-muted">
                        <Icon name="cap" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Medical Education Guild */}
          <Reveal delay={0.1}>
            <div className="mt-6 rounded-[var(--radius-card)] border border-line bg-primary-soft/40 p-6">
              <p className="text-sm font-semibold text-primary-deep">Medical Education Guild</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{oes.medicalGuild}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {oes.europeNations.map((n) => (
                  <span key={n} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary-deep">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner programme slides */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Programmes on offer</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              What our partners offer
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              A snapshot of the degrees available through our partner institutions. Tap a card to view the full list.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {oes.slides.map((s, i) => (
              <Reveal key={s.image} delay={i * 0.08}>
                <a
                  href={s.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-shadow hover:shadow-[0_14px_34px_-20px_rgba(15,110,86,0.5)]"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={s.image}
                      alt={`${s.name} — programmes offered`}
                      fill
                      loading="lazy"
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-medium text-ink">{s.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{s.country}</p>
                    </div>
                    <Icon name="external-link" className="h-5 w-5 text-primary" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] bg-primary px-7 py-10 text-white md:flex-row md:px-14">
            <h2 className="font-display text-2xl font-medium md:text-3xl">Ready to study overseas?</h2>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
            >
              Book a consultation
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

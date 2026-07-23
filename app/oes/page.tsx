import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import ZoomImage from "@/components/ZoomImage";
import PartnersGrid from "@/components/PartnersGrid";
import { oes, youtubeId } from "@/lib/content";

import FlightPath from "@/components/effects/FlightPath";

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
        image="/meec/oes/oes-hero.jpg"
        watermark="OES"
        variant="global"
      />

      {/* Mission */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our mission</p>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink md:text-[2rem]">{oes.mission}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <figure className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-5 rounded-[var(--radius-card)] border border-line bg-surface p-7 text-left sm:flex-row">
              <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-primary-soft">
                <Image src={oes.ceo.photo} alt={oes.ceo.name} fill sizes="96px" className="object-cover" />
              </span>
              <div>
                <blockquote className="font-display text-lg italic leading-snug text-ink/85">
                  &ldquo;{oes.ceo.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted">
                  <span className="font-medium text-ink">{oes.ceo.name}</span> · {oes.ceo.role}
                </figcaption>
              </div>
            </figure>
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
      <section className="relative overflow-hidden py-20 md:py-24">
        {/* Flight-path banner — a plane charts a route to our study destinations */}
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative h-28 md:h-36">
            <FlightPath />
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-6 grid max-w-6xl gap-10 px-5 md:grid-cols-2">
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
                    <ZoomImage
                      src={p.image}
                      alt={p.name}
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

          {/* Interactive partner grid — click a card for fees, rankings & programs */}
          <Reveal delay={0.08}>
            <p className="mt-8 text-sm text-muted">
              Tap any partner to see tuition fees, living costs, rankings, and the full program list.
            </p>
          </Reveal>
          <PartnersGrid />
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

      {/* Recorded info session */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              {oes.session.eyebrow}
            </p>
            <h2 className="mt-3 text-center font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              {oes.session.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">{oes.session.body}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10 aspect-video overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[0_24px_60px_-32px_rgba(15,110,86,0.5)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId(oes.session.youtube)}?rel=0&modestbranding=1`}
                title={oes.session.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OES gallery — masonry of counselling & send-off moments */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">In pictures</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Moments with our students
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Counselling sessions, campus send-offs, and the milestones we share with students on their overseas journey.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {oes.gallery.map((src, i) => (
              <Reveal key={src} delay={(i % 4) * 0.05}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                  <ZoomImage
                    src={src}
                    alt={`OES moment ${i + 1}`}
                    loading="lazy"
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OES team */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our team</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              The people behind OES
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {oes.team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08}>
                <div className="group h-full rounded-[var(--radius-card)] border border-line bg-paper p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_38px_-22px_rgba(15,110,86,0.55)]">
                  <span className="relative mx-auto block h-28 w-28 overflow-hidden rounded-full ring-2 ring-primary-soft transition-transform duration-300 group-hover:scale-105 md:h-32 md:w-32">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      loading="lazy"
                      sizes="128px"
                      className="object-cover"
                    />
                  </span>
                  <p className="mt-4 font-medium text-ink">{person.name}</p>
                  <p className="mt-1 text-sm text-muted">{person.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-[28px] bg-primary px-7 py-10 text-center text-white md:px-14 md:py-14">
            <h2 className="font-display text-2xl font-medium md:text-3xl">Ready to study overseas?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">
              Reach the OES team directly on Viber, or book a consultation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {oes.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {p}
                </a>
              ))}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-primary-deep transition-transform hover:scale-105 active:scale-95"
              >
                Book a consultation
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import WaveDivider from "@/components/WaveDivider";
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
        kenBurns
      />

      {/* Vision / Mission */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-2">
          {[
            { label: "Vision", body: mvi.vision, icon: "anchor" },
            { label: "Mission", body: mvi.mission, icon: "globe" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <Tilt max={5} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-8 transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_rgba(15,110,86,0.55)]">
                  <span className="pointer-events-none absolute -right-3 -top-4 text-primary-soft/60 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={item.icon} className="h-24 w-24" />
                  </span>
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <p className="relative text-sm font-semibold uppercase tracking-[0.16em] text-accent">{item.label}</p>
                  <p className="relative mt-4 text-lg leading-relaxed text-muted">{item.body}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values — wave-bordered green band */}
      <section className="relative bg-primary-deep text-white">
        <WaveDivider fill="var(--color-paper)" />
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute right-[8%] top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Our core values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {mvi.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="group h-full rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-7 transition-colors duration-300 hover:border-accent/50 hover:bg-white/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon name={valueIcon[v.icon]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveDivider fill="var(--color-paper)" position="bottom" />
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
                <div className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary hover:shadow-[0_22px_44px_-24px_rgba(15,110,86,0.55)]">
                  <span className="pointer-events-none absolute -right-1 -top-5 font-display text-7xl font-medium text-primary-soft/60 transition-colors duration-300 group-hover:text-accent/30">
                    0{i + 1}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon name="anchor" className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-4 font-medium text-ink">{c.name}</h3>
                  <p className="relative mt-1 text-sm leading-relaxed text-muted">{c.body}</p>
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
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

      {/* Our trainers — wave-bordered green band */}
      <section className="relative bg-primary-deep text-white">
        <WaveDivider fill="var(--color-paper)" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">Our team</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Meet our trainers</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7">
            {mvi.trainerPhotos.map((src, i) => (
              <Reveal key={src} delay={(i % 7) * 0.05}>
                <div className="group relative mx-auto aspect-square w-full max-w-[130px]">
                  <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent to-primary opacity-0 blur-[6px] transition-opacity duration-300 group-hover:opacity-70" />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-2 ring-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-hover:ring-accent">
                    <Image
                      src={src}
                      alt={`MVI trainer ${i + 1}`}
                      fill
                      loading="lazy"
                      sizes="130px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveDivider fill="var(--color-surface)" position="bottom" />
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
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {mvi.campus.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.06}>
                <Tilt max={7}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={src}
                      alt="MVI campus"
                      fill
                      loading="lazy"
                      sizes="(max-width:768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute bottom-3 left-3 flex items-center gap-1.5 text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <Icon name="anchor" className="h-4 w-4" />
                      MVI campus
                    </span>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[28px] bg-primary px-7 py-10 text-white md:flex-row md:px-14">
            <div
              aria-hidden
              className="animate-float-x pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
            />
            <h2 className="relative font-display text-2xl font-medium md:text-3xl">Start your maritime career</h2>
            <Link
              href="/contact"
              className="shine group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
            >
              Enquire about courses
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

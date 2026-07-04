import type { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import TimelineReveal from "@/components/effects/TimelineReveal";
import { aboutIntro, vision, mission, missionPillars, coreValues, leadership, teachingApproach } from "@/lib/content";

export const metadata: Metadata = {
  title: "About us — MEEC",
  description: aboutIntro.welcome,
};

const valueIcon: Record<string, string> = { award: "award", heart: "heart", shield: "shield" };

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="About us"
        eyebrow="About MEEC"
        title="Where inspiration meets education"
        subtitle={aboutIntro.welcome}
        image="/meec/japanese/jp-anatomy.jpg"
      />

      {/* Overview + vision */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line">
              <Image src="/meec/vision.webp" alt="MEEC vision" fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our vision</p>
              <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                A beacon of educational excellence
              </h2>
              <p className="mt-4 text-lg text-muted">{vision}</p>
              <p className="mt-4 text-muted">{aboutIntro.overview}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our mission</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Empowering students to reach their full potential
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-muted">{mission}</p>
          </Reveal>
          <div className="mt-14">
            <TimelineReveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {missionPillars.map((p, i) => (
                  <Reveal key={p.title} delay={i * 0.06}>
                    <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6">
                      <span className="font-display text-xl text-accent">0{i + 1}</span>
                      <h3 className="mt-2 font-medium text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </TimelineReveal>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="bg-primary-deep py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">What we stand for</p>
            <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">Our core values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {coreValues.map((v, i) => (
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

      {/* Leadership */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our leaders</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Guided by experience and heart
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {leadership.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <figure className="group h-full rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-[0_20px_40px_-20px_rgba(15,110,86,0.3)]">
                  <div className="flex items-center gap-5">
                    <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-primary-soft ring-2 ring-primary-soft transition-transform duration-500 group-hover:scale-105 group-hover:ring-primary/40">
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <p className="text-lg font-medium text-ink transition-colors duration-300 group-hover:text-primary">{person.name}</p>
                      <p className="text-sm text-muted">{person.role}</p>
                    </div>
                  </div>
                  <blockquote className="mt-5 font-display text-lg italic leading-snug text-ink/85 transition-colors duration-300 group-hover:text-ink">
                    &ldquo;{person.quote}&rdquo;
                  </blockquote>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching approach */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">{teachingApproach.title}</p>
            <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink md:text-[2.1rem]">
              {teachingApproach.body}
            </p>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

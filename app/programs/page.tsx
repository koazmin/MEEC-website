import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Programs from "@/components/Programs";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { igcseTracks, igcseCoreSubjects, gedScoring, diplomas, programAccreditation } from "@/lib/content";

import PathwayConnectors from "@/components/effects/PathwayConnectors";

export const metadata: Metadata = {
  title: "Our programs — MEEC",
  description:
    "From GED and Secondary education to internationally recognised IGCSE and professional diplomas.",
};

const requirements = [
  { program: "GED Starter", grade: "Grade 7 passed; Grade 8–9 present" },
  { program: "GED Foundation", grade: "Grade 10 passed / present" },
  { program: "GED Preparation", grade: "Grade 11 passed / present; Grade 12 present" },
  { program: "Secondary I", grade: "Grade 8 or Year 6 (International)" },
  { program: "Secondary II", grade: "Grade 9 or Secondary I (International)" },
  { program: "IGCSE O' Level", grade: "Grade 10 or Secondary II (International)" },
];

export default function ProgramsPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Our programs"
        eyebrow="Our programs"
        title="Programs built around your goals"
        subtitle="Academic pathways and professional diplomas, taught beyond the ordinary."
        image="/meec/japanese/jp-class-study.jpg"
      />

      <Programs />

      {/* Photo band */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative h-64 overflow-hidden rounded-[var(--radius-card)] border border-line md:h-80">
            <Image
              src="/meec/programs/image-42.png"
              alt="A MEEC teacher mentoring a student"
              fill
              loading="lazy"
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-md font-display text-xl font-medium text-white md:text-2xl">
              Personalised support at every step of your journey.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Entry requirements */}
      <section className="relative overflow-hidden bg-surface py-20 md:py-24">
        <PathwayConnectors />
        <div className="relative z-10 mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Entry requirements</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Where you can start
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-primary-soft/60 text-primary-deep">
                    <th className="px-5 py-3 font-medium">Program</th>
                    <th className="px-5 py-3 font-medium">Required level</th>
                  </tr>
                </thead>
                <tbody>
                  {requirements.map((r, i) => (
                    <tr key={r.program} className={i % 2 ? "bg-paper" : "bg-surface"}>
                      <td className="px-5 py-3 font-medium text-ink">{r.program}</td>
                      <td className="px-5 py-3 text-muted">{r.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IGCSE tracks */}
      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="relative h-12 w-24">
              <Image
                src="/meec/programs/image-38.png"
                alt="Cambridge IGCSE"
                fill
                sizes="96px"
                className="object-contain object-left"
              />
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-accent">IGCSE O&rsquo; Level</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Choose your subject track
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Core subjects for every student: {igcseCoreSubjects.join(", ")}. Then specialise with one of three
              optional tracks.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {igcseTracks.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6">
                  <h3 className="font-display text-xl font-medium text-ink">{t.name}</h3>
                  <ul className="mt-4 space-y-2">
                    {t.subjects.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-[15px] text-muted">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Professional diplomas */}
      <section className="bg-surface py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Professional diplomas</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Career-focused qualifications
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {diplomas.map((d, i) => (
              <Reveal key={d.name} delay={i * 0.08}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-paper p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name="briefcase" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-medium text-ink">{d.name}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {d.modules.map((m) => (
                      <li key={m} className="text-sm text-muted">{m}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GED scoring + accreditation */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <p className="text-sm font-semibold text-ink">GED scoring</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{gedScoring}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <p className="text-sm font-semibold text-ink">Accreditation</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{programAccreditation}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-6 rounded-[28px] bg-primary px-7 py-10 text-white md:flex-row md:px-14">
            <div>
              <h2 className="font-display text-2xl font-medium md:text-3xl">Not sure which program fits you?</h2>
              <p className="mt-2 text-white/85">Talk to our counsellors — we&rsquo;ll guide you to the right path.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-primary-deep transition-transform hover:scale-[1.03] active:scale-95"
            >
              Talk to us
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

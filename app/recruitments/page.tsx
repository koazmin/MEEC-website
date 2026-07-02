import type { Metadata } from "next";
import Image from "next/image";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { recruitment, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recruitments — join MEEC",
  description: recruitment.intro,
};

const whyIcon: Record<string, string> = { heart: "heart", stairs: "stairs", award: "award" };

export default function RecruitmentsPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Recruitments"
        eyebrow="Work with us"
        title="Build the future of education with MEEC"
        subtitle={recruitment.intro}
        image="/meec/japanese/jp-orientation.jpg"
      />

      {/* Why join */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Why join us</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              More than a job — a calling
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {recruitment.whyJoin.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name={whyIcon[w.icon]} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">{w.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Photo band */}
      <section className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative h-64 overflow-hidden rounded-[var(--radius-card)] border border-line md:h-80">
            <Image
              src="/meec/japanese/jp-anatomy.jpg"
              alt="MEEC teacher leading a class"
              fill
              loading="lazy"
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
            <p className="absolute bottom-5 left-6 max-w-md font-display text-xl font-medium text-white md:text-2xl">
              Teach, inspire, and grow with a team that cares.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">How to apply</p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              Four simple steps
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-5">
            {recruitment.process.map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <li className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-display text-base font-medium text-white">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-muted">{step}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact to apply */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-[28px] bg-primary px-7 py-10 text-center text-white md:px-14 md:py-14">
            <h2 className="font-display text-2xl font-medium md:text-3xl">Ready to apply?</h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">
              Send your CV and a short cover letter — reach our team directly by phone.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {site.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-base font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

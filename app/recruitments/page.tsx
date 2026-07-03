import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { recruitment, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recruitments — MEEC",
  description: recruitment.intro,
};

export default function RecruitmentsPage() {
  return (
    <SiteShell>
      {/* Banner */}
      <section className="relative">
        <div className="relative w-full overflow-hidden">
          <Image
            src={recruitment.banner}
            alt="MEEC Recruitments"
            width={2560}
            height={888}
            priority
            sizes="100vw"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Introduction
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <blockquote className="mt-6 border-l-4 border-accent pl-6 font-display text-lg leading-relaxed text-ink/90 italic md:text-xl">
              {recruitment.intro}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Sections: Open Days, School Visits, Info Sessions */}
      {recruitment.sections.map((section, si) => (
        <section
          key={section.title}
          className={`py-14 md:py-20 ${si % 2 === 1 ? "bg-surface" : ""}`}
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="grid items-start gap-10 md:grid-cols-2">
              {/* Text */}
              <div className={si % 2 === 1 ? "md:order-2" : ""}>
                <Reveal>
                  <h2 className="font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
                    {section.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="mt-4 leading-relaxed text-muted">
                    {section.body}
                  </p>
                </Reveal>
              </div>

              {/* Images grid */}
              <div
                className={`grid grid-cols-2 gap-3 ${si % 2 === 1 ? "md:order-1" : ""}`}
              >
                {section.images.map((img, ii) => (
                  <Reveal
                    key={img}
                    delay={ii * 0.06}
                    className={ii === 0 ? "col-span-2" : ""}
                  >
                    <div
                      className={`relative overflow-hidden rounded-[var(--radius-card)] border border-line ${
                        ii === 0 ? "aspect-[16/10]" : "aspect-square"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${section.title} ${ii + 1}`}
                        fill
                        loading="lazy"
                        sizes={
                          ii === 0
                            ? "(max-width:768px) 100vw, 45vw"
                            : "(max-width:768px) 50vw, 22vw"
                        }
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* What you'll gain */}
      <section className="bg-primary-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-medium leading-tight text-ink md:text-3xl">
              What you&rsquo;ll gain
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {recruitment.gains.map((g, i) => (
              <Reveal key={g} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-muted">{g}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <p className="mt-8 text-center text-lg text-primary-deep">
              👉 {recruitment.gainsCta}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Admissions Guidance */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Admissions Guidance &amp; Support
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-lg font-display text-xl font-medium italic text-ink md:text-2xl">
              &ldquo;{recruitment.admissions.tagline}&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-muted">
              {recruitment.admissions.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-[28px] bg-primary px-7 py-10 text-center text-white md:px-14 md:py-14">
            <h2 className="font-display text-2xl font-medium md:text-3xl">
              Ready to explore MEEC?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/85">
              Reach out to our team — we&rsquo;re here to answer your questions
              and help you get started.
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-primary-deep transition-transform hover:scale-105 active:scale-95"
              >
                Contact us
                <Icon
                  name="arrow"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

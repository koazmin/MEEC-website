import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import Parallax from "@/components/Parallax";
import Icon from "@/components/Icon";
import ZoomImage from "@/components/ZoomImage";
import { recruitment, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Recruitments — MEEC",
  description: recruitment.intro,
};

export default function RecruitmentsPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Recruitments"
        eyebrow="Join MEEC"
        title="Recruitments & outreach"
        subtitle="Connecting with students, sharing opportunities, and helping them make informed choices for their journey."
        image="/meec/recruitments/school-visits-3.jpg"
        watermark="JOIN"
        variant="career"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Introduction</p>
          </Reveal>
          <Reveal delay={0.06}>
            <blockquote className="mt-6 border-l-4 border-accent pl-6 font-display text-lg italic leading-relaxed text-ink/90 md:text-xl">
              {recruitment.intro}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Sections: Open Days, School Visits, Info Sessions */}
      {recruitment.sections.map((section, si) => {
        const reversed = si % 2 === 1;
        return (
          <section
            key={section.title}
            className={`relative overflow-hidden py-16 md:py-24 ${reversed ? "bg-surface" : ""}`}
          >
            {/* Ambient floating accent */}
            <div
              aria-hidden
              className={`animate-float pointer-events-none absolute top-16 h-64 w-64 rounded-full bg-accent-soft/40 blur-3xl ${
                reversed ? "left-[-6rem]" : "right-[-6rem]"
              }`}
            />
            <div className="relative mx-auto max-w-6xl px-5">
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                {/* Text */}
                <div className={reversed ? "md:order-2" : ""}>
                  <Reveal>
                    <span className="inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                      <span className="font-display text-2xl leading-none">0{si + 1}</span>
                      <span className="h-px w-8 bg-accent/50" />
                      Recruitment
                    </span>
                  </Reveal>
                  <Reveal delay={0.06}>
                    <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
                      {section.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={0.12}>
                    <p className="mt-4 text-lg leading-relaxed text-muted">{section.body}</p>
                  </Reveal>
                </div>

                {/* Interactive image collage */}
                <Parallax distance={28} className={reversed ? "md:order-1" : ""}>
                  <div className="grid grid-cols-2 gap-3">
                    <Reveal className="col-span-2">
                      <Tilt max={6}>
                        <div className="group relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[0_20px_50px_-28px_rgba(15,110,86,0.5)]">
                          <ZoomImage
                            src={section.images[0]}
                            alt={`${section.title} 1`}
                            loading="lazy"
                            sizes="(max-width:768px) 100vw, 46vw"
                            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                          />
                          <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                      </Tilt>
                    </Reveal>
                    {section.images.slice(1).map((img, ii) => (
                      <Reveal key={img} delay={0.1 * (ii + 1)}>
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-line">
                          <ZoomImage
                            src={img}
                            alt={`${section.title} ${ii + 2}`}
                            loading="lazy"
                            sizes="(max-width:768px) 50vw, 23vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                          />
                          <span className="pointer-events-none absolute inset-0 bg-primary-deep/0 transition-colors duration-300 group-hover:bg-primary-deep/15" />
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </Parallax>
              </div>
            </div>
          </section>
        );
      })}

      {/* What you'll gain */}
      <section className="bg-primary-soft py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-medium leading-tight text-ink md:text-4xl">
              What you&rsquo;ll gain
            </h2>
          </Reveal>
          <ul className="mt-10 space-y-4">
            {recruitment.gains.map((g, i) => (
              <Reveal key={g} delay={i * 0.05}>
                <li className="group flex items-start gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_14px_30px_-20px_rgba(15,110,86,0.5)]">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform duration-300 group-hover:scale-110">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  <span className="text-muted transition-colors group-hover:text-ink">{g}</span>
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

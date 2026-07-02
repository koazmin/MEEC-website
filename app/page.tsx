import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Gallery from "@/components/Gallery";
import EventsGallery from "@/components/EventsGallery";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import SubscribeForm from "@/components/SubscribeForm";
import FloatingContact from "@/components/FloatingContact";
import Parallax from "@/components/Parallax";
import Tilt from "@/components/Tilt";
import AnimatedHeading from "@/components/AnimatedHeading";
import {
  site,
  stats,
  mission,
  missionPillars,
  coreValues,
  teachingApproach,
} from "@/lib/content";

const valueIcon: Record<string, string> = {
  award: "award",
  heart: "heart",
  shield: "shield",
};

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <FloatingContact />
      <main id="main">
        <Hero />

        {/* Stats band */}
        <section className="border-y border-line bg-surface">
          <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-line px-5">
            {stats.map((s) => (
              <div key={s.label} className="group px-2 py-8 text-center md:py-10">
                <p className="font-display text-3xl font-medium text-primary transition-transform duration-300 group-hover:scale-110 md:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted md:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Announcement bar (replaces the old marquee strip) */}
        <section className="border-b border-line bg-primary-deep text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-4 px-5 py-3.5">
            <span className="inline-flex items-center gap-2.5 text-center text-[15px] font-medium">
              <span className="relative inline-flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <span>
                <strong className="font-semibold text-accent">Admissions open</strong> for the 2026
                intake — limited seats across all pathways.
              </span>
            </span>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-primary-deep transition-transform hover:scale-105 active:scale-95"
            >
              Apply now →
            </Link>
          </div>
        </section>

        {/* Vision / Mission */}
        <section id="about" className="relative scroll-mt-20 overflow-hidden py-20 md:py-28">
          <div
            aria-hidden
            className="animate-float pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary-soft/60 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-float-x pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-accent-soft/50 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <Parallax distance={36}>
                <div className="group relative aspect-square overflow-hidden rounded-[var(--radius-card)] border border-line">
                  <Image
                    src="/meec/vision.webp"
                    alt="MEEC vision"
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Parallax>
              <Reveal delay={0.1}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">Our mission</p>
                  <AnimatedHeading
                    text="A nurturing, inclusive place to reach your full potential"
                    className="mt-3 font-display text-3xl font-medium leading-tight text-ink md:text-4xl"
                  />
                  <p className="mt-4 text-lg text-muted">{mission}</p>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {missionPillars.map((p) => (
                      <li
                        key={p.title}
                        className="border-l-2 border-primary pl-4 transition-all duration-300 hover:border-accent hover:pl-5"
                      >
                        <p className="font-medium text-ink">{p.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section id="values" className="relative scroll-mt-20 overflow-hidden bg-primary-deep py-20 text-white md:py-28">
          <div
            aria-hidden
            className="animate-spin-slow pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full border border-white/5"
          />
          <div
            aria-hidden
            className="animate-float pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-soft">What we stand for</p>
              <AnimatedHeading
                text="Our core values"
                className="mt-3 font-display text-3xl font-medium leading-tight md:text-4xl"
              />
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {coreValues.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.08}>
                  <Tilt className="h-full">
                    <div className="group h-full rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-7 transition-colors duration-300 hover:border-accent/50 hover:bg-white/10">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon name={valueIcon[v.icon]} className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 font-display text-xl font-medium">{v.title}</h3>
                      <p className="mt-2 leading-relaxed text-white/75">{v.body}</p>
                    </div>
                  </Tilt>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Programs />
        <Gallery />
        <EventsGallery surface />


        {/* Teaching approach */}
        <section className="bg-surface py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                {teachingApproach.title}
              </p>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-ink md:text-[2.1rem]">
                {teachingApproach.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contact / Subscribe */}
        <section id="contact" className="scroll-mt-20 py-20 md:py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="overflow-hidden rounded-[28px] bg-primary px-7 py-12 text-white md:px-14 md:py-16">
              <div className="grid gap-10 md:grid-cols-2">
                <div>
                  <h2 className="font-display text-3xl font-medium leading-tight md:text-4xl">
                    Join us now!
                  </h2>
                  <p className="mt-4 max-w-md text-lg text-white/85">
                    Subscribe us and receive our update in your inbox directly.
                  </p>
                  <SubscribeForm />
                </div>
                <div className="flex flex-col gap-5 md:items-end md:text-right">
                  <div className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Icon name="pin" className="h-5 w-5" />
                    </span>
                    <p className="max-w-xs text-white/85">{site.address}</p>
                  </div>
                  <div className="flex items-start gap-3 md:flex-row-reverse">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Icon name="phone" className="h-5 w-5" />
                    </span>
                    <p className="text-white/85">
                      {site.phones.map((p) => (
                        <span key={p} className="block">
                          {p}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

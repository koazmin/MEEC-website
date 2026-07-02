import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import SubscribeForm from "@/components/SubscribeForm";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact us — MEEC",
  description: `Reach MEEC at ${site.address}.`,
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Contact us"
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        subtitle="Questions about programs, enrolment, or a campus visit? Reach out anytime."
        image="/meec/japanese/jp-reception.jpg"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          {/* Info */}
          <Reveal>
            <div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name="pin" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-medium text-ink">Visit us</p>
                    <p className="mt-1 max-w-xs text-muted">{site.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name="phone" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-medium text-ink">Call us</p>
                    {site.phones.map((p) => (
                      <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="mt-1 block text-muted hover:text-primary">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon name="globe" className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-medium text-ink">Connect with us</p>
                    <div className="mt-2 flex gap-3">
                      {site.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-primary-deep transition-colors hover:border-primary hover:bg-primary-soft"
                        >
                          <Icon name={s.icon} className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line">
                <iframe
                  title="MEEC location map"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            </div>
          </Reveal>

          {/* Inquiry form */}
          <Reveal delay={0.1}>
            <div className="rounded-[28px] bg-primary px-7 py-10 text-white md:px-10">
              <h2 className="font-display text-2xl font-medium md:text-3xl">Join us now!</h2>
              <p className="mt-3 text-white/85">Subscribe us and receive our update in your inbox directly.</p>
              <SubscribeForm />
            </div>
          </Reveal>
        </div>
      </section>
    </SiteShell>
  );
}

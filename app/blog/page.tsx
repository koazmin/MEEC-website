import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — MEEC",
  description: "News, ideas, and stories from the MEEC community.",
};

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        breadcrumb="Blog"
        eyebrow="From the community"
        title="Stories, ideas & updates"
        subtitle="News and reflections from the MEEC community."
        watermark="BLOG"
        variant="creative"
      />

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface transition-shadow hover:shadow-[0_14px_34px_-20px_rgba(15,110,86,0.5)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{post.date}</p>
                    <h2 className="mt-2 font-display text-xl font-medium text-ink">{post.title}</h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read more
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

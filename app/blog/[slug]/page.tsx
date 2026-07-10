import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { blogPosts, youtubeId } from "@/lib/content";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} — MEEC blog` : "Blog — MEEC" };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <SiteShell>
      <PageHero breadcrumb={post.title} eyebrow={post.date} title={post.title} />

      <article className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="relative aspect-video overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink">
              {post.youtube ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId(post.youtube)}?rel=0&modestbranding=1`}
                  title={post.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <Image src={post.image} alt="" fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" />
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p className="font-display text-2xl font-medium text-ink">{post.excerpt}</p>
              <p>
                At MEEC, we believe education is a living, evolving practice. As research and technology reshape the
                classroom, we continue to adapt our teaching so that every student is ready not just for exams, but for a
                dynamic future.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 border-t border-line pt-6">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              <Icon name="arrow" className="h-4 w-4 rotate-180" />
              Back to blog
            </Link>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}

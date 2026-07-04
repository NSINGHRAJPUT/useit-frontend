import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { BlogPost } from "@toolkit-pro/shared-types";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { apiGet } from "@/services/api";
import {
  buildArticleJsonLd,
  buildBlogMetadata,
  buildFaqJsonLd,
  getSiteSettings,
} from "@/lib/seo";
import { renderMarkdown } from "@/lib/markdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    apiGet<BlogPost>(`/blogs/${slug}`).catch(() => null),
    getSiteSettings(),
  ]);
  if (!post) return {};
  return buildBlogMetadata(post, settings);
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    apiGet<BlogPost>(`/blogs/${slug}`).catch(() => null),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  const articleJsonLd = buildArticleJsonLd(post, settings);
  const faqJsonLd = buildFaqJsonLd(post.faqs ?? []);
  const html = renderMarkdown(post.content);

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gold">
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>
      <article className="mx-auto mt-8 max-w-3xl">
        <Card className="rounded-3xl border-border/70">
          <CardContent className="p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-semibold uppercase tracking-[0.24em] text-gold">{post.author}</span>
              {post.publishedAt ? <span>{new Date(post.publishedAt).toLocaleDateString()}</span> : null}
              {post.readingTimeMinutes ? <span>{post.readingTimeMinutes} min read</span> : null}
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            {post.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featuredImage}
                alt={post.title}
                className="mt-8 w-full rounded-2xl border border-border/70"
              />
            ) : null}
            <div
              className="prose prose-invert mt-8 max-w-none leading-8 [&_a]:text-gold [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1 [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {post.faqs?.length ? (
              <section className="mt-12 border-t border-border/70 pt-8">
                <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
                <div className="mt-6 grid gap-4">
                  {post.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl border border-border/60 bg-muted/20 p-5">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
            {post.tags?.length ? (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-gold/20 px-3 py-1 text-xs text-gold">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
      </article>
    </Section>
  );
}

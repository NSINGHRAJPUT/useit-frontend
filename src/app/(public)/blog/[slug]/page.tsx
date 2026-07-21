import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import { ArrowLeft, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlogContent } from "@/components/blog/blog-content";
import { Section } from "@/components/layout/section";
import { getPublishedBlogBySlug, getPublishedBlogSlugs } from "@/lib/blog";
import {
  buildArticleJsonLd,
  buildBlogMetadata,
  buildFaqJsonLd,
  getSiteSettings,
} from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const slugs = await getPublishedBlogSlugs();
    return slugs.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPublishedBlogBySlug(slug);
    if (!post) return {};
    const settings = await getSiteSettings();
    return buildBlogMetadata(post, settings);
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: Awaited<ReturnType<typeof getPublishedBlogBySlug>> = null;
  try {
    post = await getPublishedBlogBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  const settings = await getSiteSettings();
  const articleJsonLd = buildArticleJsonLd(post, settings);
  const faqJsonLd = buildFaqJsonLd(post.faqs);
  const published = post.publishedAt ? dayjs(post.publishedAt).format("MMMM D, YYYY") : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <Section className="py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-gold"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <article className="mx-auto mt-8 max-w-3xl">
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{post.author}</span>
              {published ? <span>{published}</span> : null}
              {post.readingTimeMinutes ? (
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-4" />
                  {post.readingTimeMinutes} min read
                </span>
              ) : null}
            </div>
            <h1 className="font-heading text-4xl font-semibold leading-tight md:text-5xl">{post.title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
            {post.featuredImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full rounded-2xl border border-gold/15 object-cover"
              />
            ) : null}
          </header>

          <div className="mt-10">
            <BlogContent content={post.content} />
          </div>

          {post.faqs?.length ? (
            <div className="mt-12 rounded-2xl border border-gold/15 bg-card/40 p-5 sm:p-6">
              <h2 className="font-heading text-2xl font-semibold">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="mt-4">
                {post.faqs.map((faq, index) => (
                  <AccordionItem key={`${faq.question}-${index}`} value={String(index)}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : null}

          {post.tags?.length ? (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 text-xs text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      </Section>
    </>
  );
}

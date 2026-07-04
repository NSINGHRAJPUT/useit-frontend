import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { apiGet } from "@/services/api";
import { buildSiteMetadata, getSiteSettings } from "@/lib/seo";
import type { BlogPost } from "@toolkit-pro/shared-types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    ...buildSiteMetadata(settings),
    title: "Blog",
    description:
      "SEO guides, conversion workflows, and product updates from ToolKit Pro to help you work faster with files.",
    alternates: { canonical: "/blog" },
    openGraph: {
      ...buildSiteMetadata(settings).openGraph,
      title: "Blog | ToolKit Pro",
      url: "/blog",
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const posts = await apiGet<BlogPost[]>("/blogs").catch(() => []);
  const featuredPost = posts[0];

  return (
    <Section className="space-y-8">
      <div className="rounded-3xl border border-border/70 bg-card/60 p-8">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
          <Newspaper className="size-4" />
          Insights & updates
        </div>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight">
              Stories for makers who want faster, cleaner file workflows.
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Learn how to optimize assets, automate conversions, and ship polished media experiences without the usual friction.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-background/70 px-4 py-3 text-sm text-muted-foreground">
            {posts.length} articles available
          </div>
        </div>
      </div>

      {featuredPost ? (
        <Card className="overflow-hidden rounded-3xl">
          <CardContent className="grid gap-6 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
                Featured article
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{featuredPost.title}</h2>
              <p className="mt-3 text-muted-foreground">{featuredPost.excerpt}</p>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold"
              >
                Read article <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/30 p-5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">What you’ll find</p>
              <ul className="mt-3 space-y-2">
                <li>• Practical workflow advice for high-volume file tasks</li>
                <li>• Product updates and automation ideas</li>
                <li>• Tips for building better conversion experiences</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-muted/40"
          >
            <p className="text-sm font-medium text-gold">{post.author}</p>
            <p className="mt-3 text-xl font-semibold">{post.title}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground">
              Continue reading <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {!posts.length ? (
        <Card className="rounded-3xl border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            No articles are available yet. New guidance will appear here soon.
          </CardContent>
        </Card>
      ) : null}
    </Section>
  );
}

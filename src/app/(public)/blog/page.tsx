import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { listPublishedBlogs } from "@/lib/blog";
import { siteConfig } from "@/constants/site";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, tips, and updates about online file conversion, PDF tools, and image workflows.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const search = params.search?.trim() ?? "";

  let posts: Awaited<ReturnType<typeof listPublishedBlogs>>["posts"] = [];
  let totalPages = 1;
  let total = 0;
  let loadError: string | null = null;

  try {
    const result = await listPublishedBlogs({ page, limit: 12, search: search || undefined });
    posts = result.posts;
    totalPages = result.totalPages;
    total = result.total;
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unable to load blog posts.";
  }

  return (
    <Section>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Blog</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold md:text-5xl">Guides & updates</h1>
        <p className="mt-4 text-muted-foreground">
          Practical articles about file conversion, PDF workflows, and getting more from ToolKit Pro.
        </p>
      </div>

      <form className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row" action="/blog" method="get">
        <Input
          name="search"
          defaultValue={search}
          placeholder="Search articles"
          className="flex-1"
        />
        <Button type="submit" className="btn-gold border-0">
          Search
        </Button>
      </form>

      {loadError ? (
        <div className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-muted-foreground">
          {loadError}
        </div>
      ) : posts.length ? (
        <>
          <p className="mt-8 text-sm text-muted-foreground">
            {total} article{total === 1 ? "" : "s"}
            {search ? ` matching “${search}”` : ""}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div className="mt-10 rounded-2xl border border-gold/15 bg-card/40 p-8 text-center">
          <p className="text-lg font-medium">No published articles yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {search ? "Try a different search term." : "Check back soon for new guides and updates."}
          </p>
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-10 flex items-center justify-center gap-3">
          {page > 1 ? (
            <Button variant="outline" asChild>
              <Link href={`/blog?page=${page - 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`}>
                Previous
              </Link>
            </Button>
          ) : null}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages ? (
            <Button variant="outline" asChild>
              <Link href={`/blog?page=${page + 1}${search ? `&search=${encodeURIComponent(search)}` : ""}`}>
                Next
              </Link>
            </Button>
          ) : null}
        </div>
      ) : null}
    </Section>
  );
}

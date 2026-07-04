"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { BlogPost } from "@toolkit-pro/shared-types";
import { api } from "@/services/api";
import { BlogEditorForm, createEmptyBlog } from "@/components/admin/blog-editor-form";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";

export default function BlogEditPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<{ data: BlogPost }>(`/admin/blogs/${id}`)
      .then((response) => setBlog(response.data.data))
      .catch(() => setStatus("Unable to load blog record."))
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return (
      <Section>
        <p className="text-destructive">Missing blog ID.</p>
      </Section>
    );
  }

  return (
    <Section>
      <div className="grid gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold">Edit blog</h1>
            <p className="mt-3 text-muted-foreground">
              Tune content, metadata, FAQs, and publishing status.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/blogs">Back to list</Link>
          </Button>
        </div>

        {status ? <p className="text-sm text-destructive">{status}</p> : null}
        {loading ? <p>Loading...</p> : null}

        {blog ? (
          <BlogEditorForm
            blogId={blog._id}
            initial={{
              title: blog.title,
              slug: blog.slug,
              excerpt: blog.excerpt,
              content: blog.content,
              featuredImage: blog.featuredImage ?? "",
              author: blog.author,
              categories: blog.categories ?? [],
              tags: blog.tags ?? [],
              seoTitle: blog.seoTitle,
              seoDescription: blog.seoDescription,
              focusKeyword: blog.focusKeyword ?? "",
              canonicalUrl: blog.canonicalUrl ?? "",
              ogImage: blog.ogImage ?? "",
              metaRobots: blog.metaRobots ?? "index,follow",
              faqs: blog.faqs ?? [],
              status: blog.status,
              publishedAt: blog.publishedAt,
              scheduledPublishAt: blog.scheduledPublishAt,
            }}
          />
        ) : null}
      </div>
    </Section>
  );
}

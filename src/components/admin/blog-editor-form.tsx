"use client";

import type { BlogFaq, BlogPost } from "@toolkit-pro/shared-types";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type BlogFormState = Omit<BlogPost, "_id" | "createdAt" | "updatedAt" | "readingTimeMinutes">;

const emptyFaq = (): BlogFaq => ({ question: "", answer: "" });

export function createEmptyBlog(): BlogFormState {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    author: "ToolKit Pro",
    categories: [],
    tags: [],
    seoTitle: "",
    seoDescription: "",
    focusKeyword: "",
    canonicalUrl: "",
    ogImage: "",
    metaRobots: "index,follow",
    faqs: [],
    status: "draft",
  };
}

function splitCsv(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function BlogEditorForm({
  initial,
  blogId,
  onSaved,
}: {
  initial: BlogFormState;
  blogId?: string;
  onSaved?: (message: string) => void;
}) {
  const router = useRouter();
  const [blog, setBlog] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function updateField<K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) {
    setBlog((current) => ({ ...current, [key]: value }));
  }

  function updateFaq(index: number, field: keyof BlogFaq, value: string) {
    setBlog((current) => ({
      ...current,
      faqs: current.faqs.map((faq, faqIndex) =>
        faqIndex === index ? { ...faq, [field]: value } : faq,
      ),
    }));
  }

  async function handleSave(nextStatus?: BlogFormState["status"]) {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        ...blog,
        status: nextStatus ?? blog.status,
        publishedAt:
          (nextStatus ?? blog.status) === "published" ? new Date().toISOString() : blog.publishedAt,
      };
      const response = await api.post<{ data: BlogPost }>("/blogs", payload);
      const saved = response.data.data;
      setMessage(nextStatus === "published" ? "Blog published successfully." : "Blog saved successfully.");
      onSaved?.(message ?? "Saved");
      if (!blogId && saved._id) {
        router.push(`/admin/blogs/edit/${saved._id}`);
      }
    } catch {
      setMessage("Failed to save blog. Check required fields and permissions.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8">
      {message ? <p className="text-sm text-gold">{message}</p> : null}

      <section className="grid gap-4 rounded-2xl border border-border/70 bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">Content</h2>
          <Badge variant="outline" className="capitalize border-gold/20 text-gold">
            {blog.status}
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={blog.title}
              onChange={(event) => {
                const title = event.target.value;
                updateField("title", title);
                if (!blog.slug) updateField("slug", slugify(title));
                if (!blog.seoTitle) updateField("seoTitle", title);
              }}
            />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={blog.slug}
              onChange={(event) => updateField("slug", slugify(event.target.value))}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={blog.excerpt}
            onChange={(event) => updateField("excerpt", event.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="content">Content (Markdown)</Label>
          <Textarea
            id="content"
            value={blog.content}
            onChange={(event) => updateField("content", event.target.value)}
            rows={18}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={blog.author}
              onChange={(event) => updateField("author", event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="featuredImage">Featured image URL</Label>
            <Input
              id="featuredImage"
              value={blog.featuredImage ?? ""}
              onChange={(event) => updateField("featuredImage", event.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="categories">Categories (comma-separated)</Label>
            <Input
              id="categories"
              value={blog.categories.join(", ")}
              onChange={(event) => updateField("categories", splitCsv(event.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={blog.tags.join(", ")}
              onChange={(event) => updateField("tags", splitCsv(event.target.value))}
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-border/70 bg-card p-6">
        <h2 className="text-xl font-semibold">SEO</h2>
        <div>
          <Label htmlFor="focusKeyword">Focus keyword</Label>
          <Input
            id="focusKeyword"
            value={blog.focusKeyword ?? ""}
            onChange={(event) => updateField("focusKeyword", event.target.value)}
            placeholder="jpg to png converter"
          />
        </div>
        <div>
          <Label htmlFor="seoTitle">SEO title ({blog.seoTitle.length}/60)</Label>
          <Input
            id="seoTitle"
            value={blog.seoTitle}
            onChange={(event) => updateField("seoTitle", event.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="seoDescription">Meta description ({blog.seoDescription.length}/160)</Label>
          <Textarea
            id="seoDescription"
            value={blog.seoDescription}
            onChange={(event) => updateField("seoDescription", event.target.value)}
            rows={3}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="canonicalUrl">Canonical URL</Label>
            <Input
              id="canonicalUrl"
              value={blog.canonicalUrl ?? ""}
              onChange={(event) => updateField("canonicalUrl", event.target.value)}
              placeholder="Leave empty for default"
            />
          </div>
          <div>
            <Label htmlFor="ogImage">OG image URL</Label>
            <Input
              id="ogImage"
              value={blog.ogImage ?? ""}
              onChange={(event) => updateField("ogImage", event.target.value)}
              placeholder="Leave empty to use featured image"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="metaRobots">Robots directive</Label>
          <Input
            id="metaRobots"
            value={blog.metaRobots ?? "index,follow"}
            onChange={(event) => updateField("metaRobots", event.target.value)}
          />
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-border/70 bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">FAQ schema</h2>
          <Button type="button" variant="outline" size="sm" onClick={() => updateField("faqs", [...blog.faqs, emptyFaq()])}>
            Add FAQ
          </Button>
        </div>
        {blog.faqs.length ? (
          blog.faqs.map((faq, index) => (
            <div key={index} className="grid gap-3 rounded-xl border border-border/60 p-4">
              <Input
                value={faq.question}
                onChange={(event) => updateFaq(index, "question", event.target.value)}
                placeholder="Question"
              />
              <Textarea
                value={faq.answer}
                onChange={(event) => updateFaq(index, "answer", event.target.value)}
                placeholder="Answer"
                rows={3}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="justify-self-start"
                onClick={() => updateField("faqs", blog.faqs.filter((_, faqIndex) => faqIndex !== index))}
              >
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Add FAQs to unlock FAQ rich results in Google.</p>
        )}
      </section>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleSave("draft")} disabled={loading}>
          Save draft
        </Button>
        <Button className="btn-gold border-0" onClick={() => handleSave("published")} disabled={loading}>
          Publish
        </Button>
        {blogId ? (
          <Button variant="outline" asChild>
            <Link href={`/blog/${blog.slug}`} target="_blank">
              Preview live
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

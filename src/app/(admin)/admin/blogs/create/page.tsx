"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import { BlogEditorForm, createEmptyBlog } from "@/components/admin/blog-editor-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Section } from "@/components/layout/section";

interface GeneratedBlog {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  faqs: Array<{ question: string; answer: string }>;
}

export default function AdminBlogCreatePage() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState(1200);
  const [generated, setGenerated] = useState<GeneratedBlog | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post<{ data: GeneratedBlog }>("/ai/blog", {
        keyword,
        tone,
        wordCount,
      });
      setGenerated(response.data.data);
    } catch {
      setStatus("Unable to generate blog. Verify OpenRouter configuration and admin access.");
    } finally {
      setLoading(false);
    }
  }

  const initial = generated
    ? {
        ...createEmptyBlog(),
        title: generated.title,
        slug: generated.slug,
        excerpt: generated.excerpt,
        content: generated.content,
        seoTitle: generated.metaTitle,
        seoDescription: generated.metaDescription,
        focusKeyword: keyword,
        tags: keyword.split(/\s+/).filter(Boolean),
        faqs: generated.faqs ?? [],
        author: "ToolKit Pro",
        categories: ["guides"],
      }
    : createEmptyBlog();

  return (
    <Section>
      <div className="grid gap-8">
        <div>
          <h1 className="text-4xl font-semibold">Create blog post</h1>
          <p className="mt-3 text-muted-foreground">
            Generate SEO content with AI, refine metadata, then publish when ready.
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-border/70 bg-card p-6 sm:grid-cols-3">
          <div>
            <Label htmlFor="keyword">Focus keyword</Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="jpg to png converter"
            />
          </div>
          <div>
            <Label htmlFor="tone">Tone</Label>
            <Input
              id="tone"
              value={tone}
              onChange={(event) => setTone(event.target.value)}
              placeholder="professional"
            />
          </div>
          <div>
            <Label htmlFor="wordCount">Word count</Label>
            <Input
              id="wordCount"
              type="number"
              min={500}
              max={4000}
              value={wordCount}
              onChange={(event) => setWordCount(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="btn-gold border-0" onClick={handleGenerate} disabled={loading || !keyword}>
            {loading ? "Generating..." : "Generate with AI"}
          </Button>
          <Button variant="outline" onClick={() => router.push("/admin/blogs")}>
            Back to list
          </Button>
        </div>

        {status ? <p className="text-sm text-destructive">{status}</p> : null}

        {generated ? (
          <BlogEditorForm key={generated.slug} initial={initial} />
        ) : (
          <BlogEditorForm initial={createEmptyBlog()} />
        )}
      </div>
    </Section>
  );
}

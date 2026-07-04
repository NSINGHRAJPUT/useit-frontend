"use client";

import { useState } from "react";
import { api } from "@/services/api";
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

export default function BlogGeneratorPage() {
  const [keyword, setKeyword] = useState("");
  const [tone, setTone] = useState("professional");
  const [wordCount, setWordCount] = useState(1200);
  const [blog, setBlog] = useState<GeneratedBlog | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleGenerate() {
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post<{ data: GeneratedBlog }>("/ai/blog", {
        keyword,
        tone,
        wordCount,
      });
      setBlog(response.data.data);
    } catch (error) {
      setStatus(
        "Failed to generate blog. Check OpenRouter configuration and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDraft() {
    if (!blog) return;
    setStatus(null);
    setLoading(true);
    try {
      await api.post<{ data: unknown }>("/blogs", {
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        author: "ToolKit Pro AI",
        categories: ["ai"],
        tags: blog.slug.split("-").filter(Boolean),
        seoTitle: blog.metaTitle,
        seoDescription: blog.metaDescription,
        status: "draft",
      });
      setStatus("Draft saved successfully.");
    } catch {
      setStatus(
        "Failed to save draft. Make sure you have correct permissions.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <div className="grid gap-6">
        <div>
          <h1 className="text-4xl font-semibold">AI Blog Generator</h1>
          <p className="mt-3 text-muted-foreground">
            Generate SEO-ready blog posts with OpenRouter and save drafts
            directly to MongoDB.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              id="keyword"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="e.g. jpg to png converter"
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
            <Label htmlFor="wordCount">Word Count</Label>
            <Input
              id="wordCount"
              type="number"
              value={wordCount}
              min={500}
              max={4000}
              onChange={(event) => setWordCount(Number(event.target.value))}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleGenerate} disabled={loading || !keyword}>
            {loading ? "Generating..." : "Generate AI Blog"}
          </Button>
          {blog ? (
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              Save Draft
            </Button>
          ) : null}
        </div>

        {status ? <p className="text-sm text-destructive">{status}</p> : null}

        {blog ? (
          <div className="grid gap-6 rounded-lg border bg-card p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-semibold">Generated Blog</h2>
              <p className="mt-2 text-muted-foreground">
                Review the AI output and save it as a draft or publish it from
                the admin panel.
              </p>
            </div>
            <div className="grid gap-3">
              <p>
                <strong>Title:</strong> {blog.title}
              </p>
              <p>
                <strong>Slug:</strong> {blog.slug}
              </p>
              <p>
                <strong>Meta title:</strong> {blog.metaTitle}
              </p>
              <p>
                <strong>Meta description:</strong> {blog.metaDescription}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Excerpt</h3>
              <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                {blog.excerpt}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Content</h3>
              <pre className="mt-2 overflow-x-auto rounded-md border bg-slate-950 px-4 py-4 text-sm text-white">
                {blog.content}
              </pre>
            </div>
            <div>
              <h3 className="text-xl font-semibold">FAQs</h3>
              <div className="mt-3 grid gap-3">
                {blog.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-lg border p-4 bg-background"
                  >
                    <p className="font-semibold">{faq.question}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}

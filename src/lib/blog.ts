import "server-only";

import type { BlogPost } from "@toolkit-pro/shared-types";
import { connectDb } from "./db";
import { BlogModel } from "./models/blog.model";


type FeedBlogDocument = {
  _id: unknown;
  title?: string;
  slug: string;
  excerpt?: string;
  content?: string;
  body?: string;
  featuredImage?: string;
  author?: string;
  authorName?: string;
  categories?: string[];
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogImage?: string;
  metaRobots?: string;
  faqs?: Array<{ question: string; answer: string }>;
  readingTimeMinutes?: number;
  status: "draft" | "published";
  publishedAt?: Date;
  scheduledPublishAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function publishedFilter() {
  return {
    status: "published" as const,
    publishedAt: { $lte: new Date() },
  };
}

function serializeBlog(doc: FeedBlogDocument): BlogPost {
  // Prefer `content` when present (server feed / default schema),
  // but support `body` (HTML) from alternate feeds.
  const rawContent =
    typeof doc.content === "string" ? doc.content : typeof doc.body === "string" ? doc.body : "";
  const plainContent = rawContent.includes("<") ? htmlToText(rawContent) : rawContent;

  return {
    _id: String(doc._id),
    title: doc.title ?? "Untitled",
    slug: doc.slug,
    excerpt: doc.excerpt ?? plainContent.slice(0, 180) ?? "",
    content: rawContent,
    featuredImage: doc.featuredImage ?? undefined,
    author: doc.author ?? doc.authorName ?? "ToolKit Pro",
    categories: doc.categories ?? [],
    tags: doc.tags ?? [],
    seoTitle: doc.seoTitle ?? doc.title ?? "Untitled",
    seoDescription: doc.seoDescription ?? doc.excerpt ?? plainContent.slice(0, 180) ?? "",
    focusKeyword: doc.focusKeyword ?? undefined,
    canonicalUrl: doc.canonicalUrl ?? undefined,
    ogImage: doc.ogImage ?? undefined,
    metaRobots: doc.metaRobots ?? undefined,
    faqs: doc.faqs ?? [],
    readingTimeMinutes: doc.readingTimeMinutes ?? undefined,
    status: doc.status,
    publishedAt: doc.publishedAt?.toISOString(),
    scheduledPublishAt: doc.scheduledPublishAt?.toISOString(),
    createdAt: doc.createdAt?.toISOString(),
    updatedAt: doc.updatedAt?.toISOString(),
  };
}

export async function listPublishedBlogs({
  page = 1,
  limit = 12,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  await connectDb();

  const query = search?.trim()
    ? { $text: { $search: search.trim() }, ...publishedFilter() }
    : publishedFilter();

  const [docs, total] = await Promise.all([
    BlogModel.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean<FeedBlogDocument[]>(),
    BlogModel.countDocuments(query),
  ]);

  return {
    posts: docs.map((doc) => serializeBlog(doc)),
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getPublishedBlogBySlug(slug: string) {
  await connectDb();
  const doc = await BlogModel.findOne({ slug, ...publishedFilter() }).lean<FeedBlogDocument>();
  return doc ? serializeBlog(doc) : null;
}

export async function getPublishedBlogSlugs() {
  await connectDb();
  const docs = await BlogModel.find(publishedFilter())
    .select("slug updatedAt publishedAt")
    .sort({ publishedAt: -1 })
    .lean<Array<{ slug: string; updatedAt?: Date; publishedAt?: Date }>>();

  return docs.map((doc) => ({
    slug: doc.slug,
    updatedAt: (doc.updatedAt ?? doc.publishedAt)?.toISOString(),
  }));
}

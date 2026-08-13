import type { BlogPost } from "@toolkit-pro/shared-types";
import { localBlogPosts } from "@/content/blog/posts";

const BLOG_REVALIDATE_SECONDS = 300;
const BLOG_SLUGS_PAGE_LIMIT = 50;
const blogFetchOptions = { next: { revalidate: BLOG_REVALIDATE_SECONDS } };

function getRemoteBlogApiUrl(): string | null {
  const configured = process.env.NEXT_PUBLIC_BLOG_API_URL?.trim();
  if (!configured) return null;
  return configured.replace(/\/+$/, "");
}

function estimateReadingTimeFromHtml(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

function withReadingTime(post: BlogPost): BlogPost {
  if (post.readingTimeMinutes) return post;
  return {
    ...post,
    readingTimeMinutes: estimateReadingTimeFromHtml(post.content ?? ""),
  };
}

function getLocalPosts(): BlogPost[] {
  return localBlogPosts
    .filter((post) => post.status === "published")
    .map(withReadingTime)
    .sort((a, b) => {
      const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bDate - aDate;
    });
}

type ExternalPost = {
  id?: string;
  _id?: string;
  title?: string;
  slug: string;
  excerpt?: string;
  tags?: unknown;
  faqs?: unknown;
  status?: string;
  author?: string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  body?: string;
  content?: string;
  seoTitle?: string;
  seoDescription?: string;
  featuredImage?: string;
  ogImage?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
  metaRobots?: string;
  readingTimeMinutes?: number;
};

type ExternalListResponse = {
  posts?: ExternalPost[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
};

type ExternalDetailResponse = {
  post?: ExternalPost;
};

function normalizeTags(tags: unknown): string[] {
  return Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === "string") : [];
}

function normalizeFaqs(faqs: unknown): BlogPost["faqs"] {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .filter(
      (faq): faq is { question: string; answer: string } =>
        typeof faq === "object" &&
        faq !== null &&
        typeof (faq as { question?: unknown }).question === "string" &&
        typeof (faq as { answer?: unknown }).answer === "string",
    )
    .map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }));
}

function mapExternalPostToBlogPost(raw: ExternalPost): BlogPost {
  const author = raw.author ?? raw.authorName ?? "ApkaOS";
  const tags = normalizeTags(raw.tags);
  const faqs = normalizeFaqs(raw.faqs);
  const status = (raw.status === "draft" ? "draft" : "published") as "draft" | "published";
  const content =
    typeof raw.body === "string" ? raw.body : typeof raw.content === "string" ? raw.content : "";
  const plainText = content.includes("<") ? content.replace(/<[^>]+>/g, " ") : content;

  return {
    _id: raw.id ?? raw._id,
    title: raw.title ?? "Untitled",
    slug: raw.slug,
    excerpt: raw.excerpt ?? plainText.slice(0, 180),
    content,
    featuredImage: raw.featuredImage,
    author,
    categories: [],
    tags,
    seoTitle: raw.seoTitle ?? raw.title ?? "Untitled",
    seoDescription: raw.seoDescription ?? raw.excerpt ?? plainText.slice(0, 180),
    focusKeyword: raw.focusKeyword,
    canonicalUrl: raw.canonicalUrl,
    ogImage: raw.ogImage,
    metaRobots: raw.metaRobots ?? "index,follow",
    faqs,
    readingTimeMinutes:
      typeof raw.readingTimeMinutes === "number"
        ? raw.readingTimeMinutes
        : content
          ? estimateReadingTimeFromHtml(content)
          : undefined,
    status,
    publishedAt: raw.publishedAt,
    scheduledPublishAt: undefined,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

async function fetchBlogJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, blogFetchOptions);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Blog API request failed (${res.status}) for ${url}`);
  }

  return res.json() as Promise<T>;
}

async function listRemotePosts(): Promise<BlogPost[]> {
  const apiUrl = getRemoteBlogApiUrl();
  if (!apiUrl) return [];

  const limit = BLOG_SLUGS_PAGE_LIMIT;
  let page = 1;
  let total = Infinity;
  const posts: BlogPost[] = [];

  while ((page - 1) * limit < total) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const data = await fetchBlogJson<ExternalListResponse>(`${apiUrl}?${params.toString()}`);
    if (!data) break;
    total = data.total ?? posts.length;
    posts.push(...(data.posts ?? []).map(mapExternalPostToBlogPost));
    const currentPage = data.page ?? page;
    const pageLimit = data.limit ?? limit;
    if (!data.posts?.length || currentPage * pageLimit >= total) break;
    page += 1;
  }

  return posts.filter((post) => post.status === "published");
}

async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const local = getLocalPosts();
  let remote: BlogPost[] = [];
  try {
    remote = await listRemotePosts();
  } catch {
    remote = [];
  }

  const seen = new Set(local.map((post) => post.slug));
  const merged = [...local];
  for (const post of remote) {
    if (!post.slug || seen.has(post.slug)) continue;
    seen.add(post.slug);
    merged.push(withReadingTime(post));
  }
  return merged;
}

function matchesSearch(post: BlogPost, search: string) {
  const q = search.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.excerpt.toLowerCase().includes(q) ||
    post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
    (post.focusKeyword ?? "").toLowerCase().includes(q)
  );
}

export async function listPublishedBlogs({
  page = 1,
  limit = 12,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  const all = await getAllPublishedPosts();
  const filtered = search?.trim() ? all.filter((post) => matchesSearch(post, search.trim())) : all;
  const total = filtered.length;
  const start = (page - 1) * limit;
  return {
    posts: filtered.slice(start, start + limit),
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getPublishedBlogBySlug(slug: string) {
  const local = getLocalPosts().find((post) => post.slug === slug);
  if (local) return local;

  const apiUrl = getRemoteBlogApiUrl();
  if (!apiUrl) return null;

  const data = await fetchBlogJson<ExternalDetailResponse>(`${apiUrl}/${encodeURIComponent(slug)}`);
  if (!data?.post) return null;
  return withReadingTime(mapExternalPostToBlogPost(data.post));
}

export async function getPublishedBlogSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  const posts = await getAllPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
    updatedAt: post.updatedAt ?? post.publishedAt,
  }));
}

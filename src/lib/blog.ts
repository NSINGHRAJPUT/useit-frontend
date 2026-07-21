import type { BlogPost } from "@toolkit-pro/shared-types";

const DEFAULT_BLOG_API_URL = "https://www.nsrgfx.in/api/blog";
const BLOG_REVALIDATE_SECONDS = 300;
const BLOG_SLUGS_PAGE_LIMIT = 50;

const blogFetchOptions = { next: { revalidate: BLOG_REVALIDATE_SECONDS } };

function getBlogApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BLOG_API_URL?.trim();
  const base = configured || DEFAULT_BLOG_API_URL;
  return base.replace(/\/+$/, "");
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
  const author = raw.author ?? raw.authorName ?? "ToolKit Pro";
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

export async function listPublishedBlogs({
  page = 1,
  limit = 12,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
} = {}) {
  const apiUrl = getBlogApiUrl();
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search?.trim()) params.set("search", search.trim());

  const data = await fetchBlogJson<ExternalListResponse>(`${apiUrl}?${params.toString()}`);
  if (!data) {
    return { posts: [], total: 0, page, totalPages: 1 };
  }

  const resolvedLimit = data.limit ?? limit;
  const total = data.total ?? 0;

  return {
    posts: (data.posts ?? []).map(mapExternalPostToBlogPost),
    total,
    page: data.page ?? page,
    totalPages: data.totalPages ?? Math.max(1, Math.ceil(total / resolvedLimit)),
  };
}

export async function getPublishedBlogBySlug(slug: string) {
  const apiUrl = getBlogApiUrl();
  const data = await fetchBlogJson<ExternalDetailResponse>(`${apiUrl}/${encodeURIComponent(slug)}`);
  if (!data?.post) return null;
  return mapExternalPostToBlogPost(data.post);
}

export async function getPublishedBlogSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  const apiUrl = getBlogApiUrl();
  const limit = BLOG_SLUGS_PAGE_LIMIT;
  let page = 1;
  let total = Infinity;
  const results: Array<{ slug: string; updatedAt?: string }> = [];

  while ((page - 1) * limit < total) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    const data = await fetchBlogJson<ExternalListResponse>(`${apiUrl}?${params.toString()}`);
    if (!data) break;
    total = data.total ?? results.length;

    for (const post of data.posts ?? []) {
      if (post.slug) {
        results.push({ slug: post.slug, updatedAt: post.updatedAt ?? post.publishedAt });
      }
    }

    const currentPage = data.page ?? page;
    const pageLimit = data.limit ?? limit;
    if (!data.posts?.length || currentPage * pageLimit >= total) break;
    page += 1;
  }

  const seen = new Set<string>();
  return results.filter(({ slug }) => {
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

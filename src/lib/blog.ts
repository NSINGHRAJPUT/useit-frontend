import type { BlogPost } from "@toolkit-pro/shared-types";

const DEFAULT_BLOG_API_URL = "https://nsrgfx.in/api/blog";

function getBlogApiUrl(): string {
  return process.env.NEXT_PUBLIC_BLOG_API_URL?.trim() || DEFAULT_BLOG_API_URL;
}

function estimateReadingTimeFromHtml(html: string): number {
  // Remove tags + normalize whitespace. This keeps reading-time roughly stable.
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}

type ExternalListPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  tags?: string[];
  status: "draft" | "published" | string;
  authorName?: string;
  publishedAt?: string;
  updatedAt?: string;
  // Present on the detail endpoint; omitted on the list endpoint.
  body?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
};

type ExternalListResponse = {
  posts: ExternalListPost[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
};

type ExternalDetailPost = ExternalListPost & {
  createdAt?: string;
};

type ExternalDetailResponse = {
  post: ExternalDetailPost;
};

function mapExternalPostToBlogPost(listOrDetail: ExternalListPost | ExternalDetailPost): BlogPost {
  const author = listOrDetail.authorName ?? "ToolKit Pro";
  const tags = listOrDetail.tags ?? [];
  const status = (listOrDetail.status === "draft" ? "draft" : "published") as "draft" | "published";

  const content = typeof listOrDetail.body === "string" ? listOrDetail.body : "";
  const seoTitle = typeof listOrDetail.seoTitle === "string" ? listOrDetail.seoTitle : listOrDetail.title;
  const seoDescription =
    typeof listOrDetail.seoDescription === "string"
      ? listOrDetail.seoDescription
      : listOrDetail.excerpt ?? "";

  return {
    _id: listOrDetail.id,
    title: listOrDetail.title,
    slug: listOrDetail.slug,
    excerpt: listOrDetail.excerpt ?? "",
    content,
    featuredImage: undefined,
    author,
    categories: [],
    tags,
    seoTitle,
    seoDescription,
    focusKeyword: undefined,
    canonicalUrl: undefined,
    ogImage: undefined,
    metaRobots: "index,follow",
    faqs: [],
    readingTimeMinutes: content ? estimateReadingTimeFromHtml(content) : undefined,
    status,
    publishedAt: listOrDetail.publishedAt,
    scheduledPublishAt: undefined,
    createdAt: listOrDetail.createdAt,
    updatedAt: listOrDetail.updatedAt,
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
  const apiUrl = getBlogApiUrl();
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search?.trim()) params.set("search", search.trim());

  const res = await fetch(`${apiUrl}?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) {
    // Keep behavior predictable for the page component (shows "No published articles yet" if empty).
    throw new Error(`Failed to load blog posts (${res.status}).`);
  }

  const data = (await res.json()) as ExternalListResponse;
  const totalPages = data.totalPages ?? Math.max(1, Math.ceil(data.total / (data.limit || limit)));

  return {
    posts: (data.posts ?? []).map(mapExternalPostToBlogPost),
    total: data.total ?? 0,
    page: data.page ?? page,
    totalPages,
  };
}

export async function getPublishedBlogBySlug(slug: string) {
  const apiUrl = getBlogApiUrl();
  const res = await fetch(`${apiUrl}/${encodeURIComponent(slug)}`, { cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to load blog post (${res.status}).`);
  }

  const data = (await res.json()) as ExternalDetailResponse;
  if (!data?.post) return null;

  return mapExternalPostToBlogPost(data.post);
}

export async function getPublishedBlogSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  const apiUrl = getBlogApiUrl();

  // Fetch all pages to ensure static generation + sitemap cover everything.
  const limit = 200;
  let page = 1;
  let total = Infinity;
  const results: Array<{ slug: string; updatedAt?: string }> = [];

  while ((page - 1) * limit < total) {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    const res = await fetch(`${apiUrl}?${params.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load blog slugs (${res.status}).`);

    const data = (await res.json()) as ExternalListResponse;
    total = data.total ?? results.length;

    for (const p of data.posts ?? []) {
      results.push({ slug: p.slug, updatedAt: p.updatedAt ?? p.publishedAt });
    }

    if (!data.posts?.length || data.page * data.limit >= total) break;
    page += 1;
  }

  // De-dupe (in case of weird API pagination).
  const seen = new Set<string>();
  return results
    .filter(({ slug }) => {
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""));
}


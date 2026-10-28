import type { MetadataRoute } from "next";
import { getPublishedBlogSlugs } from "@/lib/blog";
import { categories, siteConfig, tools } from "@/constants/site";

/** Stable catalog date — bump when static/tool pages meaningfully change. */
const CATALOG_LAST_MODIFIED = new Date("2026-10-28T12:00:00.000Z");

const staticRoutes: Array<{
  route: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { route: "", changeFrequency: "daily", priority: 1 },
  { route: "/tools", changeFrequency: "weekly", priority: 0.9 },
  { route: "/categories", changeFrequency: "weekly", priority: 0.8 },
  { route: "/blog", changeFrequency: "weekly", priority: 0.75 },
  { route: "/about", changeFrequency: "monthly", priority: 0.5 },
  { route: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { route: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { route: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { route: "/terms-of-service", changeFrequency: "yearly", priority: 0.3 },
  { route: "/cookie-policy", changeFrequency: "yearly", priority: 0.3 },
  { route: "/refund-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const slugs = await getPublishedBlogSlugs();
    blogRoutes = slugs.map(({ slug, updatedAt }) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: updatedAt ? new Date(updatedAt) : CATALOG_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    blogRoutes = [];
  }

  return [
    ...staticRoutes.map(({ route, changeFrequency, priority }) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: CATALOG_LAST_MODIFIED,
      changeFrequency,
      priority,
    })),
    ...categories.map((category) => ({
      url: `${siteConfig.url}/categories/${category.slug}`,
      lastModified: CATALOG_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: CATALOG_LAST_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogRoutes,
  ];
}

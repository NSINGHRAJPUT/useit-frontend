import type { MetadataRoute } from "next";
import { getPublishedBlogSlugs } from "@/lib/blog";
import { siteConfig, tools } from "@/constants/site";

const staticRoutes = [
  "",
  "/tools",
  "/categories",
  "/blog",
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const slugs = await getPublishedBlogSlugs();
    blogRoutes = slugs.map(({ slug, updatedAt }) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      lastModified: updatedAt ? new Date(updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    blogRoutes = [];
  }

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : route === "/tools" ? 0.9 : route === "/blog" ? 0.75 : 0.7,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogRoutes,
  ];
}

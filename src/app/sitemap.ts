import type { MetadataRoute } from "next";
import { siteConfig, tools } from "@/constants/site";
import { getPublishedBlogSlugs } from "@/lib/seo";

const staticRoutes = [
  "",
  "/tools",
  "/categories",
  "/blog",
  "/pricing",
  "/about",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogPosts = await getPublishedBlogSlugs();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/blog" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : route === "/tools" || route === "/blog" ? 0.9 : 0.7,
    })),
    ...tools.map((tool) => ({
      url: `${siteConfig.url}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: post.updatedAt ? new Date(post.updatedAt) : post.publishedAt ? new Date(post.publishedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
  ];
}

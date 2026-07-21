import type { Metadata } from "next";
import type { BlogPost, SiteSettings } from "@toolkit-pro/shared-types";
import { siteConfig } from "@/constants/site";

export const defaultSiteSettings: SiteSettings = {
  siteName: siteConfig.name,
  siteDescription: siteConfig.description,
  defaultTitle: "ToolKit Pro - Online Conversion Tools for Images, PDFs & Documents",
  titleTemplate: "%s | ToolKit Pro",
  keywords: [
    "image converter",
    "pdf tools",
    "document converter",
    "online file conversion",
    "compress image",
    "merge pdf",
    "word to pdf",
  ],
  twitterCard: "summary_large_image",
  organizationName: siteConfig.name,
  organizationSameAs: [],
  weeklyPostGoal: 2,
  contentKeywords: [],
};

export async function getSiteSettings() {
  return defaultSiteSettings;
}

export function buildSiteMetadata(settings: SiteSettings): Metadata {
  const ogImage = settings.ogImage || `${siteConfig.url}/og-default.png`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.defaultTitle,
      template: settings.titleTemplate,
    },
    description: settings.siteDescription,
    keywords: settings.keywords,
    alternates: { canonical: "/" },
    openGraph: {
      title: settings.defaultTitle,
      description: settings.siteDescription,
      url: siteConfig.url,
      siteName: settings.siteName,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: settings.siteName }],
    },
    twitter: {
      card: settings.twitterCard,
      title: settings.defaultTitle,
      description: settings.siteDescription,
      images: [ogImage],
      ...(settings.twitterHandle ? { site: settings.twitterHandle, creator: settings.twitterHandle } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      ...(settings.googleSiteVerification ? { google: settings.googleSiteVerification } : {}),
      ...(settings.bingSiteVerification ? { other: { "msvalidate.01": settings.bingSiteVerification } } : {}),
    },
  };
}

export function buildBlogMetadata(post: BlogPost, settings: SiteSettings): Metadata {
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
  const image = post.ogImage || post.featuredImage || settings.ogImage || `${siteConfig.url}/og-default.png`;
  const robots = post.metaRobots || "index,follow";
  const [indexRule, followRule] = robots.split(",").map((part) => part.trim());

  return {
    title,
    description,
    keywords: [post.focusKeyword, ...(post.tags ?? [])].filter(Boolean) as string[],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: settings.siteName,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags ?? [],
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: indexRule !== "noindex",
      follow: followRule !== "nofollow",
    },
  };
}

export function buildOrganizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.organizationName || settings.siteName,
    url: siteConfig.url,
    logo: settings.organizationLogo,
    email: settings.organizationEmail || undefined,
    sameAs: settings.organizationSameAs,
  };
}

export function buildWebsiteJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: siteConfig.url,
    description: settings.siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleJsonLd(post: BlogPost, settings: SiteSettings) {
  const image = post.ogImage || post.featuredImage || settings.ogImage;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: settings.organizationName || settings.siteName,
      logo: settings.organizationLogo
        ? {
            "@type": "ImageObject",
            url: settings.organizationLogo,
          }
        : undefined,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image,
    mainEntityOfPage: post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`,
    keywords: [post.focusKeyword, ...(post.tags ?? [])].filter(Boolean).join(", "),
    wordCount: (post.content ?? "").split(/\s+/).filter(Boolean).length,
  };
}

export function buildFaqJsonLd(faqs: BlogPost["faqs"]) {
  if (!faqs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export async function getPublishedBlogSlugs() {
  try {
    const { getPublishedBlogSlugs: fetchSlugs } = await import("./blog");
    return fetchSlugs();
  } catch {
    return [];
  }
}

export function getWeekKey(date = new Date()) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - diff);
  return start.toISOString().slice(0, 10);
}

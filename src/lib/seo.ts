import type { Metadata } from "next";
import type { BlogPost, SiteSettings } from "@toolkit-pro/shared-types";
import { ADSENSE_CLIENT } from "@/constants/adsense";
import { siteConfig } from "@/constants/site";

export const defaultSiteSettings: SiteSettings = {
  siteName: siteConfig.name,
  siteDescription: siteConfig.description,
  defaultTitle: "ToolPin - Free Online Image, PDF & Document Tools",
  titleTemplate: "%s | ToolPin",
  keywords: [
    "free online converter",
    "image converter",
    "jpg to png",
    "pdf tools",
    "merge pdf",
    "compress image",
    "word to pdf",
    "document converter",
    "online file conversion",
    "webp converter",
    "json formatter",
    "toolpin",
  ],
  twitterCard: "summary_large_image",
  organizationName: "ToolPin",
  organizationEmail: siteConfig.contactEmail,
  organizationLogo: `${siteConfig.url}/icon`,
  organizationSameAs: [],
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined,
  bingSiteVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || undefined,
  weeklyPostGoal: 2,
  contentKeywords: [],
};

export async function getSiteSettings() {
  return defaultSiteSettings;
}

export function buildSiteMetadata(settings: SiteSettings): Metadata {
  const ogImage = settings.ogImage || `${siteConfig.url}/opengraph-image`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.defaultTitle,
      template: settings.titleTemplate,
    },
    description: settings.siteDescription,
    keywords: settings.keywords,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName, url: siteConfig.url }],
    creator: settings.siteName,
    publisher: settings.siteName,
    category: "File conversion tools",
    openGraph: {
      title: settings.defaultTitle,
      description: settings.siteDescription,
      url: siteConfig.url,
      siteName: settings.siteName,
      locale: "en_IN",
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
    other: {
      "google-adsense-account": ADSENSE_CLIENT,
    },
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const canonical = path.startsWith("http") ? path : `${siteConfig.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildBlogMetadata(post: BlogPost, settings: SiteSettings): Metadata {
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
  const image = post.ogImage || post.featuredImage || settings.ogImage || `${siteConfig.url}/opengraph-image`;
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
      authors: [post.author || "ToolPin"],
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
    logo: settings.organizationLogo || `${siteConfig.url}/icon`,
    email: settings.organizationEmail || siteConfig.contactEmail,
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
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      name: settings.organizationName || settings.siteName,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildArticleJsonLd(post: BlogPost, settings: SiteSettings) {
  const image = post.ogImage || post.featuredImage || settings.ogImage || `${siteConfig.url}/opengraph-image`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author || "ToolPin",
    },
    publisher: {
      "@type": "Organization",
      name: settings.organizationName || settings.siteName,
      logo: {
        "@type": "ImageObject",
        url: settings.organizationLogo || `${siteConfig.url}/icon`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    image,
    mainEntityOfPage: post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`,
    keywords: [post.focusKeyword, ...(post.tags ?? [])].filter(Boolean).join(", "),
    wordCount: (post.content ?? "").split(/\s+/).filter(Boolean).length,
  };
}

export function buildFaqJsonLd(faqs: Array<{ question: string; answer: string }> | undefined) {
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

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${siteConfig.url}${item.path}`,
    })),
  };
}

export function buildHowToJsonLd(name: string, description: string, steps: string[]) {
  if (!steps.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  };
}

export function buildSoftwareApplicationJsonLd(input: {
  name: string;
  description: string;
  url: string;
  featureList?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    url: input.url,
    description: input.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    ...(input.featureList?.length ? { featureList: input.featureList } : {}),
  };
}

export { getPublishedBlogSlugs } from "./blog";

export function getWeekKey(date = new Date()) {
  const start = new Date(date);
  const day = start.getDay();
  const diff = day === 0 ? 6 : day - 1;
  start.setDate(start.getDate() - diff);
  return start.toISOString().slice(0, 10);
}

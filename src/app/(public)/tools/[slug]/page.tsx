import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/tools/tool-layout";
import { categories, siteConfig, tools } from "@/constants/site";
import { enrichTool } from "@/lib/tool-content";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildHowToJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base = tools.find((item) => item.slug === slug);
  if (!base) return {};
  const tool = enrichTool(base);
  const path = `/tools/${tool.slug}`;
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    keywords: [tool.name, tool.category, ...(tool.searchKeywords ?? [])],
    alternates: { canonical: path },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: path,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = tools.find((item) => item.slug === slug);
  if (!base) notFound();
  const tool = enrichTool(base);
  const url = `${siteConfig.url}/tools/${tool.slug}`;

  const applicationJsonLd = buildSoftwareApplicationJsonLd({
    name: tool.name,
    description: tool.seoDescription,
    url,
    featureList: tool.benefits,
  });
  const faqJsonLd = buildFaqJsonLd(tool.faq);
  const howToJsonLd = buildHowToJsonLd(`How to use ${tool.name}`, tool.intro || tool.description, tool.howToSteps ?? []);
  const category = categories.find((item) => item.slug === tool.category);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    ...(category
      ? [{ name: category.name, path: `/categories/${category.slug}` }]
      : []),
    { name: tool.name, path: `/tools/${tool.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      {howToJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      ) : null}
      <ToolLayout tool={tool} />
    </>
  );
}

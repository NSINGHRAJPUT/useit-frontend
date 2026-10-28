import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "@/constants/adsense";
import { categories, siteConfig, tools } from "@/constants/site";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) return {};

  const categoryTools = tools.filter((tool) => tool.category === category.slug);
  return buildPageMetadata({
    title: `${category.name} — Free Online Converters`,
    description: category.longDescription || category.description,
    path: `/categories/${category.slug}`,
    keywords: [
      category.name.toLowerCase(),
      ...categoryTools.slice(0, 8).map((tool) => tool.name.toLowerCase()),
      "toolpin",
      "free online tools",
    ],
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryTools = tools.filter((tool) => tool.category === category.slug);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: category.name, path: `/categories/${category.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Section>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{category.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="mt-8 font-heading text-4xl font-semibold">{category.name}</h1>
        <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{category.longDescription}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {categoryTools.length} free tools on {siteConfig.name}. Most process files in your browser — no
          account, no watermark.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryTools.map((tool, index) => (
            <div key={tool.slug} className="contents">
              <ToolCard tool={tool} />
              {index === 5 ? (
                <div className="sm:col-span-2 lg:col-span-3">
                  <AdSlot slot={ADSENSE_SLOTS.inFeed} format="fluid" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-10">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-gold">
            Browse all {tools.length} tools <ArrowRight className="size-4" />
          </Link>
        </p>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { categories, tools } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";
import ToolsPageClient from "./tools-page-client";

export const metadata: Metadata = buildPageMetadata({
  title: "All Conversion Tools",
  description: `Browse ${tools.length} free ToolPin image, PDF, document, and text tools. Convert, compress, merge, and format files in your browser.`,
  path: "/tools",
  keywords: ["online conversion tools", "image converter", "pdf tools", "document converter", "toolpin tools"],
});

function ToolsCatalogFallback() {
  return (
    <>
      <p className="mt-4 text-sm text-muted-foreground">{tools.length} tools</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </>
  );
}

export default function ToolsPage() {
  return (
    <Section>
      <h1 className="font-heading text-4xl font-semibold">
        <span className="text-metallic-gold">Free conversion tools</span>
      </h1>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
        Browse {tools.length} ToolPin utilities for images, PDFs, Office documents, and text. Most tools process
        files in your browser — no account, no watermark. Use search or open a category to find a converter.
      </p>
      <nav aria-label="Tool categories" className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="inline-flex items-center rounded-md border border-gold/20 px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:border-gold/40 hover:text-gold"
          >
            {category.name}
          </Link>
        ))}
      </nav>
      <Suspense fallback={<ToolsCatalogFallback />}>
        <ToolsPageClient />
      </Suspense>
    </Section>
  );
}

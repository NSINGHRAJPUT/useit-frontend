import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "@/constants/adsense";
import { categories, tools } from "@/constants/site";
import { Badge } from "@/components/ui/badge";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Tool Categories",
  description:
    "Browse ToolPin tools by category: image converters, PDF editors, Office document exports, and text utilities.",
  path: "/categories",
  keywords: ["image tools", "pdf tools", "document converter", "json formatter", "toolpin categories"],
});

export default function CategoriesPage() {
  return (
    <Section>
      <h1 className="font-heading text-4xl font-semibold">Tool categories</h1>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
        ToolPin groups {tools.length} free utilities into four suites. Open a category to see converters, compressors,
        and formatters built for that job. Most image, PDF, and text tools run locally in your browser.
      </p>
      <div className="mt-8 grid gap-6">
        {categories.map((category, index) => {
          const categoryTools = tools.filter((t) => t.category === category.slug);
          return (
            <div key={category.slug}>
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-2xl font-semibold">{category.name}</h2>
                      <Badge variant="secondary">{category.status}</Badge>
                    </div>
                    <p className="mt-2 text-muted-foreground">{category.description}</p>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{category.longDescription}</p>
                  </div>
                  <Link
                    href={`/tools?category=${category.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gold"
                  >
                    View all {categoryTools.length} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {categoryTools.slice(0, 6).map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
              {index === 1 ? <div className="mt-6"><AdSlot slot={ADSENSE_SLOTS.inFeed} format="fluid" /></div> : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

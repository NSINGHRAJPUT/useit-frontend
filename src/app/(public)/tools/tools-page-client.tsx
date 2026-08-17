"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "@/constants/adsense";
import { categories, tools } from "@/constants/site";
import { matchesToolSearch } from "@toolkit-pro/shared-utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORY_SLUGS = new Set(categories.map((item) => item.slug));

export default function ToolsPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const query = searchParams.get("q") ?? searchParams.get("search") ?? "";
  const categoryParam = searchParams.get("category") ?? "all";
  const category = CATEGORY_SLUGS.has(categoryParam) ? categoryParam : "all";

  function updateParams(nextQuery: string, nextCategory: string) {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set("q", nextQuery.trim());
    if (nextCategory !== "all") params.set("category", nextCategory);
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesQuery = !query || matchesToolSearch(tool, query);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const selectedCategory = categories.find((item) => item.slug === category);

  return (
    <Section>
      <h1 className="font-heading text-4xl font-semibold">
        <span className="text-metallic-gold">Free conversion tools</span>
      </h1>
      <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">
        Browse {tools.length} ToolPin utilities for images, PDFs, Office documents, and text. Most tools process files
        in your browser — no account, no watermark. Use search or filter by category to find a converter.
      </p>
      {selectedCategory ? (
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{selectedCategory.longDescription}</p>
      ) : null}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search tools…"
          value={query}
          onChange={(e) => updateParams(e.target.value, category)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            variant={category === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => updateParams(query, "all")}
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={category === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => updateParams(query, cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{filtered.length} tools</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((tool, index) => (
          <div key={tool.slug} className="contents">
            <ToolCard tool={tool} />
            {index === 7 ? (
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <AdSlot slot={ADSENSE_SLOTS.inFeed} format="fluid" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

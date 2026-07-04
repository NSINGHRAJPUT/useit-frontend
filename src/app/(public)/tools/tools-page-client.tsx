"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { categories, tools } from "@/constants/site";
import { matchesToolSearch } from "@toolkit-pro/shared-utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ToolsPageClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesQuery = !query || matchesToolSearch(tool, query);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <Section>
      <h1 className="font-heading text-4xl font-semibold">
        <span className="text-metallic-gold">All conversion tools</span>
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Image, PDF, document, and text utilities — secure processing with signed downloads.
      </p>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Input
          placeholder="Search tools…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-md"
        />
        <div className="flex flex-wrap gap-2">
          <Button variant={category === "all" ? "default" : "outline"} size="sm" onClick={() => setCategory("all")}>
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat.slug}
              variant={category === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{filtered.length} tools</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </Section>
  );
}

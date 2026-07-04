"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { matchesToolSearch } from "@toolkit-pro/shared-utils";
import { tools } from "@/constants/site";

const popular = tools.slice(0, 6);

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return tools
      .filter((tool) => matchesToolSearch(tool, q))
      .slice(0, 5);
  }, [query]);

  return (
    <div className="relative hidden w-full max-w-md md:block">
      <label className="sr-only" htmlFor="global-search">
        Search tools
      </label>
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 shadow-sm">
        <Search className="size-4 text-muted-foreground" />
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tools"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
      {results.length > 0 || (query && results.length === 0) ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] rounded-2xl border border-border/70 bg-background p-3 shadow-xl">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-muted/60"
                >
                  <span>
                    <span className="block text-sm font-medium">
                      {tool.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {tool.operation}
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">Tool</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No tools match this search yet.
            </div>
          )}
        </div>
      ) : null}
      {!query ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {popular.slice(0, 3).map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

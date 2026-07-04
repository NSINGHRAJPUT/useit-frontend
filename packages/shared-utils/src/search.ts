import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { allTools } from "./tools";

export function matchesToolSearch(tool: ToolDefinition, query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const haystack = [
    tool.name,
    tool.slug,
    tool.description,
    tool.category,
    tool.operation,
    ...(tool.searchKeywords ?? []),
    ...tool.inputFormats,
    ...tool.outputFormats,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function getToolBySlug(slug: string) {
  return allTools.find((tool) => tool.slug === slug);
}

import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { toolSeoContent } from "@/content/tools";

export function enrichTool(tool: ToolDefinition): ToolDefinition {
  const extra = toolSeoContent[tool.slug];
  if (!extra) return tool;

  return {
    ...tool,
    seoTitle: extra.seoTitle,
    seoDescription: extra.seoDescription,
    intro: extra.intro,
    howToSteps: extra.howToSteps,
    longDescription: extra.guide,
    tips: extra.tips,
    benefits: extra.benefits,
    useCases: extra.useCases,
    faq: extra.faq,
    searchKeywords: extra.searchKeywords ?? tool.searchKeywords,
  };
}

import { allTools } from "@toolkit-pro/shared-utils";

export const toolConfig = allTools;

export function getToolConfig(slug: string) {
  return toolConfig.find((tool) => tool.slug === slug);
}

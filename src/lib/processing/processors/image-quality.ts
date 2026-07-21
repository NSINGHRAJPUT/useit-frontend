import type { ToolDefinition } from "@toolkit-pro/shared-types";

export const DEFAULT_IMAGE_QUALITY = 88;

export function parseQualityInput(value: string, fallback = DEFAULT_IMAGE_QUALITY): number {
  const trimmed = value.trim();
  if (!trimmed || !/^\d+$/.test(trimmed)) return fallback;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(100, Math.max(1, n));
}

export function sanitizeQualityInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 3);
}

export function imageToolSupportsQuality(tool: ToolDefinition): boolean {
  if (tool.category !== "image") return false;
  if (tool.operation === "compress" || tool.operation === "resize") return true;
  const fmt = tool.outputFormat;
  if (fmt === "same") return true;
  return ["jpg", "jpeg", "webp", "avif", "png", "gif", "tiff", "bmp"].includes(fmt);
}

export function imageQualityHint(tool: ToolDefinition): string | undefined {
  const base = `Default (${DEFAULT_IMAGE_QUALITY}) keeps size close to the original. Increasing quality can produce larger files.`;
  if (tool.operation === "compress" && tool.outputFormats.includes("png")) {
    return `${base} Lower values reduce PNG colors and size.`;
  }
  if (tool.outputFormat === "png" || tool.slug.endsWith("-to-png")) {
    return `${base} Converting to PNG usually increases size versus JPEG. Lower values use fewer colors.`;
  }
  if (imageToolSupportsQuality(tool)) {
    return `${base} Lower values reduce file size.`;
  }
  return undefined;
}

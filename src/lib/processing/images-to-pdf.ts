export type ImagesToPdfLayout = "one-per-page" | "custom" | "auto";
export type ImagesToPdfPageSize = "a4" | "letter" | "image";

export const PDF_PAGE_SIZES = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
} as const;

export const DEFAULT_PDF_MARGIN_MM = 10;
export const DEFAULT_IMAGES_PER_PAGE = 2;

export function mmToPoints(mm: number): number {
  return (mm * 72) / 25.4;
}

export function clampMarginMm(value: number): number {
  return Math.min(50, Math.max(0, Number.isFinite(value) ? value : DEFAULT_PDF_MARGIN_MM));
}

export function clampImagesPerPage(value: number): number {
  return Math.min(12, Math.max(1, Math.round(Number.isFinite(value) ? value : DEFAULT_IMAGES_PER_PAGE)));
}

export function gridForCount(count: number): { cols: number; rows: number } {
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  return { cols, rows };
}

export function getImagesPerPage(
  layout: ImagesToPdfLayout,
  customCount: number,
  remaining: number,
): number {
  if (layout === "one-per-page") return 1;
  if (layout === "custom") return Math.max(1, Math.min(customCount, remaining));

  if (remaining <= 1) return 1;
  if (remaining <= 4) return remaining;
  if (remaining <= 6) return 3;
  return 4;
}

export function estimatePageCount(
  imageCount: number,
  layout: ImagesToPdfLayout,
  customCount: number,
): number {
  if (!imageCount) return 0;

  let pages = 0;
  let remaining = imageCount;
  while (remaining > 0) {
    const perPage = getImagesPerPage(layout, customCount, remaining);
    remaining -= perPage;
    pages += 1;
  }
  return pages;
}

export function chunkItems<T>(items: T[], layout: ImagesToPdfLayout, customCount: number): T[][] {
  const chunks: T[][] = [];
  let index = 0;

  while (index < items.length) {
    const remaining = items.length - index;
    const perPage = getImagesPerPage(layout, customCount, remaining);
    chunks.push(items.slice(index, index + perPage));
    index += perPage;
  }

  return chunks;
}

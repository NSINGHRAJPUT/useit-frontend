export function parsePageRange(input: string, maxPages: number): number[] {
  const pages = new Set<number>();
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [rawStart, rawEnd] = part.split("-").map((value) => Number(value.trim()));
      if (!Number.isFinite(rawStart) || !Number.isFinite(rawEnd)) continue;
      const start = Math.min(rawStart, rawEnd);
      const end = Math.max(rawStart, rawEnd);
      for (let page = start; page <= end; page++) {
        if (page >= 1 && page <= maxPages) pages.add(page);
      }
      continue;
    }

    const page = Number(part);
    if (Number.isFinite(page) && page >= 1 && page <= maxPages) {
      pages.add(page);
    }
  }

  return [...pages].sort((a, b) => a - b);
}

export function formatPageRange(pages: number[]): string {
  if (!pages.length) return "";
  return pages.join(", ");
}

export type SplitMode = "pages" | "ranges" | "every";

function parseRangePart(part: string, maxPages: number): number[] {
  if (part.includes("-")) {
    const [rawStart, rawEnd] = part.split("-").map((value) => Number(value.trim()));
    if (!Number.isFinite(rawStart) || !Number.isFinite(rawEnd)) return [];
    const start = Math.min(rawStart, rawEnd);
    const end = Math.max(rawStart, rawEnd);
    const pages: number[] = [];
    for (let page = start; page <= end; page++) {
      if (page >= 1 && page <= maxPages) pages.push(page);
    }
    return pages;
  }

  const page = Number(part);
  if (Number.isFinite(page) && page >= 1 && page <= maxPages) return [page];
  return [];
}

export function parseSplitRangeGroups(input: string, maxPages: number): number[][] {
  const groups: number[][] = [];
  const parts = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  for (const part of parts) {
    const pages = parseRangePart(part, maxPages);
    if (pages.length) groups.push(pages);
  }

  return groups;
}

export function buildSplitGroups(
  mode: SplitMode,
  maxPages: number,
  splitRanges: string,
  splitEvery: number,
): number[][] {
  if (maxPages < 1) return [];

  if (mode === "pages") {
    return Array.from({ length: maxPages }, (_, index) => [index + 1]);
  }

  if (mode === "every") {
    const chunkSize = Math.max(1, Math.round(splitEvery));
    const groups: number[][] = [];
    for (let start = 1; start <= maxPages; start += chunkSize) {
      const end = Math.min(start + chunkSize - 1, maxPages);
      groups.push(Array.from({ length: end - start + 1 }, (_, index) => start + index));
    }
    return groups;
  }

  return parseSplitRangeGroups(splitRanges, maxPages);
}

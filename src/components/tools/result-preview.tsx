"use client";

import Image from "next/image";
import type { ToolResult } from "./download-card";

export function ResultPreview({ result }: { result: ToolResult | null }) {
  if (!result) return null;
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium">Result preview</p>
      <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
        <Image src={result.downloadUrl} alt={result.fileName} fill sizes="(max-width: 768px) 100vw, 640px" className="object-contain" unoptimized />
      </div>
    </div>
  );
}

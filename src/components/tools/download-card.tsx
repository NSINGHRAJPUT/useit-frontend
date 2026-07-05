"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/format";

export interface ToolResult {
  id: string;
  downloadUrl: string;
  fileName: string;
  inputSize: number;
  outputSize: number;
  expiresAt?: string;
}

export function DownloadCard({ result, compact = false }: { result: ToolResult; compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "flex h-full flex-col gap-3 rounded-lg border border-gold/15 bg-card p-4 shadow-sm"
          : "rounded-lg border bg-card p-5 shadow-sm"
      }
    >
      <p className={compact ? "truncate text-sm font-semibold" : "font-semibold"} title={result.fileName}>
        {result.fileName}
      </p>
      <p className={compact ? "text-xs text-muted-foreground" : "mt-2 text-sm text-muted-foreground"}>
        {formatBytes(result.inputSize)} → {formatBytes(result.outputSize)}
        {result.fileName.endsWith(".zip") ? " · ZIP" : null}
      </p>
      <div className={compact ? "mt-auto" : undefined}>
        <Button className={compact ? "w-full" : "mt-5 w-full"} size={compact ? "sm" : "default"} asChild>
          <a href={result.downloadUrl}>
            <Download className="size-4" />
            Download
          </a>
        </Button>
      </div>
    </div>
  );
}

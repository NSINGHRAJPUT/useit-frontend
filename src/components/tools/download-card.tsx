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

export function DownloadCard({ result }: { result: ToolResult }) {
  return (
    <div className="rounded-lg border bg-card p-5 shadow-sm">
      <p className="font-semibold">{result.fileName}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Input {formatBytes(result.inputSize)} · Output {formatBytes(result.outputSize)}
        {result.fileName.endsWith(".zip") ? " · Extract ZIP for all pages" : null}
      </p>
      <Button className="mt-5 w-full" asChild>
        <a href={result.downloadUrl}>
          <Download className="size-4" />
          Download
        </a>
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Archive, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/format";
import { downloadResultsAsZip } from "@/lib/download-zip";
import { DownloadCard, type ToolResult } from "./download-card";

export function BatchResultsPanel({
  results,
  zipFileName,
}: {
  results: ToolResult[];
  zipFileName: string;
}) {
  const [zipping, setZipping] = useState(false);
  const ready = results.filter((result) => result.downloadUrl);

  if (!ready.length) return null;
  if (ready.length === 1) return <DownloadCard result={ready[0]!} />;

  const totalOutput = ready.reduce((sum, result) => sum + result.outputSize, 0);

  async function handleZipDownload() {
    setZipping(true);
    try {
      await downloadResultsAsZip(ready, zipFileName);
      toast.success("ZIP download started.");
    } catch {
      toast.error("Could not create ZIP. Try downloading files individually.");
    } finally {
      setZipping(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gold/20 bg-card p-5 shadow-sm">
        <p className="font-semibold">{ready.length} files ready</p>
        <p className="mt-2 text-sm text-muted-foreground">Total output {formatBytes(totalOutput)}</p>
        <Button className="mt-4 w-full" onClick={handleZipDownload} disabled={zipping}>
          {zipping ? <Loader2 className="size-4 animate-spin" /> : <Archive className="size-4" />}
          Download all as ZIP
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Or download separately
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ready.map((result) => (
            <DownloadCard key={result.id} result={result} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

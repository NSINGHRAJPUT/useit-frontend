"use client";

import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  downloadBlob,
  exportEdmHtml,
  type EdmExportFormat,
} from "@/lib/edm/exportEdmHtml";
import { DownloadCard, type ToolResult } from "@/components/tools/download-card";
import { ProcessingStatus, type ToolStatus } from "@/components/tools/processing-status";

type ImageFormat = "png" | "jpg";

export function HtmlExportTool({ tool }: { tool: ToolDefinition }) {
  const isImageTool = tool.slug === "html-to-image";
  const [html, setHtml] = useState("");
  const [canvasWidth, setCanvasWidth] = useState(760);
  const [imageFormat, setImageFormat] = useState<ImageFormat>("png");
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const previewSrcDoc = useMemo(() => html, [html]);

  async function importHtml(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1_000_000) {
      toast.error("HTML file must be 1 MB or smaller.");
      event.target.value = "";
      return;
    }
    setHtml(await file.text());
    toast.success(`Loaded ${file.name}`);
    event.target.value = "";
  }

  async function runExport() {
    if (!html.trim()) {
      toast.error("Paste or import HTML before exporting.");
      return;
    }
    if (!Number.isInteger(canvasWidth) || canvasWidth < 360 || canvasWidth > 1440) {
      toast.error("Canvas width must be between 360 and 1440 pixels.");
      return;
    }

    const format: EdmExportFormat = isImageTool ? imageFormat : "pdf";
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setBusy(true);
    setStatus("processing");
    setResult(null);

    try {
      const blob = await exportEdmHtml({
        html,
        format,
        width: canvasWidth,
        signal: controller.signal,
      });
      const fileName = `toolpin-${tool.slug}-${Date.now()}.${format}`;
      const downloadUrl = URL.createObjectURL(blob);
      setResult({
        id: crypto.randomUUID(),
        downloadUrl,
        fileName,
        inputSize: new TextEncoder().encode(html).length,
        outputSize: blob.size,
        isLocal: false,
      });
      downloadBlob(blob, fileName);
      setStatus("completed");
      toast.success(`${format.toUpperCase()} downloaded.`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Export failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-3 rounded-lg border border-gold/15 bg-card p-4 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="edm-canvas-width">Canvas width (px)</Label>
          <Input
            id="edm-canvas-width"
            type="number"
            min={360}
            max={1440}
            step={10}
            value={canvasWidth}
            onChange={(e) => setCanvasWidth(Number(e.target.value))}
            className="w-28"
          />
        </div>
        {isImageTool ? (
          <div className="space-y-2">
            <Label htmlFor="edm-image-format">Image format</Label>
            <select
              id="edm-image-format"
              value={imageFormat}
              onChange={(e) => setImageFormat(e.target.value as ImageFormat)}
              className="flex h-9 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs"
            >
              <option value="png">PNG (2×)</option>
              <option value="jpg">JPG (2×)</option>
            </select>
          </div>
        ) : null}
        <Button onClick={runExport} disabled={busy} className="btn-gold">
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          {busy
            ? "Rendering…"
            : isImageTool
              ? `Download ${imageFormat.toUpperCase()}`
              : "Download PDF"}
        </Button>
        <Label className="cursor-pointer rounded-md border border-input bg-background px-3 py-2 text-sm font-medium hover:bg-accent">
          Import .html
          <input
            type="file"
            accept=".html,.htm,text/html"
            onChange={importHtml}
            className="sr-only"
          />
        </Label>
      </div>

      <p className="text-xs text-muted-foreground">
        Preview scripts are disabled. External images and fonts load only from public HTTPS hosts
        (or hosts listed in <code className="text-metallic-gold">EDM_ASSET_HOSTS</code>). PDF/image
        export briefly sends HTML to ToolPin&apos;s render API; nothing is stored after download.
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
        <section className="overflow-hidden rounded-lg border border-gold/15 bg-card shadow-sm">
          <div className="border-b border-gold/10 px-4 py-3">
            <h2 className="text-sm font-semibold">HTML source</h2>
            <p className="text-xs text-muted-foreground">Paste a complete document, including CSS.</p>
          </div>
          <Textarea
            aria-label="HTML code"
            spellCheck={false}
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="Paste <!DOCTYPE html> … </html> here"
            className="min-h-[420px] rounded-none border-0 bg-[#0f172a] font-mono text-xs leading-5 text-slate-100 focus-visible:ring-0"
          />
        </section>

        <section className="min-w-0 overflow-hidden rounded-lg border border-gold/15 bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-gold/10 px-4 py-3">
            <span className="text-xs font-medium text-muted-foreground">
              Live preview · {canvasWidth}px
            </span>
            <span className="text-xs text-muted-foreground">Scripts disabled</span>
          </div>
          <div className="h-[420px] overflow-auto bg-muted/40 p-4">
            <div className="mx-auto bg-white shadow-md" style={{ width: canvasWidth }}>
              <iframe
                title={`${tool.name} preview`}
                srcDoc={previewSrcDoc}
                sandbox=""
                referrerPolicy="no-referrer"
                style={{ width: canvasWidth, height: 380, display: "block", border: 0 }}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_280px]">
        <ProcessingStatus status={status} />
        {result ? <DownloadCard result={result} /> : null}
      </div>
    </div>
  );
}

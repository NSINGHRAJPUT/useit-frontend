"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { buildDocumentHtml, PAGE_WIDTH } from "@/components/tools/edm/documentHtml";
import {
  downloadBlob,
  exportEdmHtml,
} from "@/lib/edm/exportEdmHtml";
import { DownloadCard, type ToolResult } from "@/components/tools/download-card";
import { ProcessingStatus, type ToolStatus } from "@/components/tools/processing-status";

const TextEditor = dynamic(
  () => import("@/components/tools/edm/TextEditor").then((mod) => mod.TextEditor),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-lg border border-gold/15 bg-card px-4 py-8 text-sm text-muted-foreground shadow-sm">
        Loading editor…
      </div>
    ),
  },
);

function isEmptyBody(html: string) {
  return !html.replace(/<p><\/p>/g, "").replace(/<p>\s*<\/p>/g, "").trim();
}

export function TextDocumentTool({ tool }: { tool: ToolDefinition }) {
  const isPdf = tool.slug === "text-to-pdf";
  const [bodyHtml, setBodyHtml] = useState("<p></p>");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const documentHtml = useMemo(() => buildDocumentHtml(bodyHtml, PAGE_WIDTH), [bodyHtml]);

  async function copyHtml() {
    try {
      await navigator.clipboard.writeText(documentHtml);
      setCopied(true);
      toast.success("HTML copied to clipboard.");
      window.setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Couldn't copy HTML. Use Chrome on HTTPS or localhost.",
      );
    }
  }

  function downloadHtml() {
    if (isEmptyBody(bodyHtml)) {
      toast.error("Add some content before downloading HTML.");
      return;
    }
    const blob = new Blob([documentHtml], { type: "text/html;charset=utf-8" });
    const fileName = `toolpin-document-${Date.now()}.html`;
    downloadBlob(blob, fileName);
    setResult({
      id: crypto.randomUUID(),
      downloadUrl: URL.createObjectURL(blob),
      fileName,
      inputSize: new TextEncoder().encode(bodyHtml).length,
      outputSize: blob.size,
      isLocal: true,
    });
    setStatus("completed");
    toast.success("HTML file downloaded.");
  }

  async function exportPdf() {
    if (isEmptyBody(bodyHtml)) {
      toast.error("Add some content before exporting a PDF.");
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setBusy(true);
    setStatus("processing");
    setResult(null);

    try {
      const blob = await exportEdmHtml({
        html: documentHtml,
        format: "pdf",
        width: PAGE_WIDTH,
        signal: controller.signal,
      });
      const fileName = `toolpin-document-${Date.now()}.pdf`;
      downloadBlob(blob, fileName);
      setResult({
        id: crypto.randomUUID(),
        downloadUrl: URL.createObjectURL(blob),
        fileName,
        inputSize: new TextEncoder().encode(documentHtml).length,
        outputSize: blob.size,
        isLocal: false,
      });
      setStatus("completed");
      toast.success("PDF downloaded.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "PDF export failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-gold/15 bg-card p-3 shadow-sm">
        {!isPdf ? (
          <>
            <Button type="button" variant="outline" onClick={copyHtml}>
              {copied ? "Copied!" : "Copy HTML"}
            </Button>
            <Button type="button" className="btn-gold" onClick={downloadHtml}>
              Download HTML
            </Button>
          </>
        ) : (
          <Button type="button" className="btn-gold" onClick={exportPdf} disabled={busy}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {busy ? "Building PDF…" : "Download PDF"}
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {isPdf
          ? "Writing stays in this tab until you export. PDF export briefly sends HTML to ToolPin’s render API; the file is not kept after download."
          : "HTML is built entirely in your browser. Nothing is uploaded for Copy or Download HTML."}
      </p>

      <TextEditor onHtmlChange={setBodyHtml} />

      <div className="grid gap-4 sm:grid-cols-[1fr_280px]">
        <ProcessingStatus status={status} />
        {result ? <DownloadCard result={result} /> : null}
      </div>
    </div>
  );
}

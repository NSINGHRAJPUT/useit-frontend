"use client";

import { useCallback, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DEFAULT_IMAGES_PER_PAGE,
  DEFAULT_PDF_MARGIN_MM,
  estimatePageCount,
  type ImagesToPdfLayout,
  type ImagesToPdfPageSize,
} from "@/lib/processing/images-to-pdf";
import { processTool } from "@/lib/processing/router";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { SelectedFilesPreview } from "./selected-files-preview";
import { UploadDropzone } from "./upload-dropzone";

const LAYOUT_OPTIONS: { value: ImagesToPdfLayout; label: string; description: string }[] = [
  {
    value: "one-per-page",
    label: "1 image per page",
    description: "Each image gets its own page, scaled to fit inside the margins.",
  },
  {
    value: "custom",
    label: "Custom images per page",
    description: "Choose how many images to place on each page in a grid.",
  },
  {
    value: "auto",
    label: "Auto fit per page",
    description: "Automatically packs images onto each page to reduce empty space.",
  },
];

function sanitizeMarginInput(value: string): string {
  return value.replace(/[^\d.]/g, "").slice(0, 5);
}

function parseMarginInput(value: string, fallback = DEFAULT_PDF_MARGIN_MM): number {
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(50, Math.max(0, n));
}

export function ImagesToPdfTool({ tool }: { tool: ToolDefinition }) {
  const [files, setFiles] = useState<File[]>([]);
  const [layout, setLayout] = useState<ImagesToPdfLayout>("one-per-page");
  const [pageSize, setPageSize] = useState<ImagesToPdfPageSize>("a4");
  const [marginInput, setMarginInput] = useState(String(DEFAULT_PDF_MARGIN_MM));
  const [imagesPerPageInput, setImagesPerPageInput] = useState(String(DEFAULT_IMAGES_PER_PAGE));
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [runKey, setRunKey] = useState(0);

  const imagesPerPage = Math.min(
    12,
    Math.max(1, Math.round(Number(imagesPerPageInput.replace(/\D/g, "")) || DEFAULT_IMAGES_PER_PAGE)),
  );

  const estimatedPages = useMemo(
    () => estimatePageCount(files.length, layout, imagesPerPage),
    [files.length, layout, imagesPerPage],
  );

  const effectivePageSize =
    layout === "one-per-page" ? pageSize : pageSize === "image" ? "a4" : pageSize;

  const onFiles = useCallback(
    (incoming: File[]) => {
      if (!incoming.length) return;
      const maxFiles = tool.maxFiles ?? 20;
      setFiles((prev) => [...prev, ...incoming].slice(0, maxFiles));
      setResults([]);
      setStatus("idle");
    },
    [tool.maxFiles],
  );

  const onRemoveFile = useCallback((index: number) => {
    if (index < 0) {
      setFiles([]);
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }
    setResults([]);
    setStatus("idle");
  }, []);

  const moveFile = useCallback((from: number, to: number) => {
    setFiles((prev) => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length || from === to) {
        return prev;
      }
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item!);
      return next;
    });
    setResults([]);
    if (status === "completed" || status === "failed") {
      setStatus("idle");
    }
  }, [status]);

  function resetAfterSettingsChange() {
    if (status === "completed" || status === "failed") {
      setStatus("idle");
      setResults([]);
    }
  }

  async function process() {
    if (!files.length) return toast.error("Choose at least one image.");

    const marginMm = parseMarginInput(marginInput);
    setMarginInput(String(marginMm));

    setRunKey((key) => key + 1);
    setBusy(true);
    setStatus("processing");
    setResults([]);

    try {
      const result = (await processTool({
        tool,
        files,
        options: {
          pdfLayout: layout,
          pdfImagesPerPage: imagesPerPage,
          pdfMargin: marginMm,
          pdfPageSize: effectivePageSize,
        },
      })) as ToolResult;

      setResults([result]);
      setStatus("completed");
      toast.success("PDF created.");
    } catch (error) {
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium space-y-5 border-gold/15 p-5 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Images to PDF</p>
            <p className="text-sm text-muted-foreground">
              Upload images, arrange their order, and control page layout, margins, and fit.
            </p>
          </div>

          <UploadDropzone tool={tool} onFiles={onFiles} onError={(m) => toast.error(m)} hasFiles={files.length > 0} />
          <SelectedFilesPreview
            files={files}
            onRemove={onRemoveFile}
            reorderable={files.length > 1}
            onMoveUp={(index) => moveFile(index, index - 1)}
            onMoveDown={(index) => moveFile(index, index + 1)}
            orderHint="Top image appears first in the PDF."
          />

          <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="pdf-layout">Layout</Label>
              <Select
                value={layout}
                onValueChange={(value) => {
                  setLayout(value as ImagesToPdfLayout);
                  resetAfterSettingsChange();
                }}
              >
                <SelectTrigger id="pdf-layout" className="w-full">
                  <SelectValue placeholder="Choose layout" />
                </SelectTrigger>
                <SelectContent>
                  {LAYOUT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {LAYOUT_OPTIONS.find((option) => option.value === layout)?.description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf-page-size">Page size</Label>
              <Select
                value={effectivePageSize}
                onValueChange={(value) => {
                  setPageSize(value as ImagesToPdfPageSize);
                  resetAfterSettingsChange();
                }}
              >
                <SelectTrigger id="pdf-page-size" className="w-full">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4</SelectItem>
                  <SelectItem value="letter">Letter</SelectItem>
                  {layout === "one-per-page" ? (
                    <SelectItem value="image">Match image size</SelectItem>
                  ) : null}
                </SelectContent>
              </Select>
              {layout !== "one-per-page" && pageSize === "image" ? (
                <p className="text-xs text-muted-foreground">Multi-image layouts use A4 pages.</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdf-margin">Margin (mm)</Label>
              <Input
                id="pdf-margin"
                inputMode="decimal"
                value={marginInput}
                onChange={(e) => {
                  setMarginInput(sanitizeMarginInput(e.target.value));
                  resetAfterSettingsChange();
                }}
                onBlur={() => setMarginInput(String(parseMarginInput(marginInput)))}
                placeholder={String(DEFAULT_PDF_MARGIN_MM)}
              />
            </div>

            {layout === "custom" ? (
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="images-per-page">Images per page</Label>
                <Input
                  id="images-per-page"
                  inputMode="numeric"
                  value={imagesPerPageInput}
                  onChange={(e) => {
                    setImagesPerPageInput(e.target.value.replace(/\D/g, "").slice(0, 2));
                    resetAfterSettingsChange();
                  }}
                  onBlur={() => setImagesPerPageInput(String(imagesPerPage))}
                  placeholder={String(DEFAULT_IMAGES_PER_PAGE)}
                />
              </div>
            ) : null}

            {files.length > 0 ? (
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Estimated output: {estimatedPages} page{estimatedPages === 1 ? "" : "s"} from {files.length} image
                {files.length === 1 ? "" : "s"}.
              </p>
            ) : null}
          </div>

          <Button
            onClick={process}
            disabled={busy || !files.length}
            className={cn(
              "w-full transition-all duration-300 sm:w-auto",
              files.length > 0 && "btn-gold border-0 px-8",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            Create PDF
          </Button>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus status={status} runKey={runKey} />
          <BatchResultsPanel results={results} zipFileName={`${tool.slug}.zip`} />
        </div>
      </div>
    </div>
  );
}

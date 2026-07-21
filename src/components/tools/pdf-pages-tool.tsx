"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { formatPageRange, parsePageRange } from "@/lib/processing/pdf-pages";
import { processTool } from "@/lib/processing/router";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { UploadDropzone } from "./upload-dropzone";

async function loadPdfPageCount(file: File): Promise<number> {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  return doc.getPageCount();
}

export function PdfPagesTool({ tool }: { tool: ToolDefinition }) {
  const isDeleteMode = tool.slug === "delete-pages-pdf";
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [rangeInput, setRangeInput] = useState("");
  const [loadingPages, setLoadingPages] = useState(false);
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!file) {
      setPageCount(0);
      setSelectedPages([]);
      setRangeInput("");
      return;
    }

    let cancelled = false;
    setLoadingPages(true);

    loadPdfPageCount(file)
      .then((count) => {
        if (cancelled) return;
        setPageCount(count);
        setSelectedPages(isDeleteMode ? [] : count > 0 ? [1] : []);
        setRangeInput(isDeleteMode ? "" : count > 0 ? "1" : "");
      })
      .catch((error) => {
        if (cancelled) return;
        toast.error(error instanceof Error ? error.message : "Failed to read PDF pages.");
        setFile(null);
      })
      .finally(() => {
        if (!cancelled) setLoadingPages(false);
      });

    return () => {
      cancelled = true;
    };
  }, [file, isDeleteMode]);

  const onFiles = useCallback((incoming: File[]) => {
    if (!incoming.length) return;
    setFile(incoming[0]!);
    setResults([]);
    setStatus("idle");
  }, []);

  const onRemoveFile = useCallback(() => {
    setFile(null);
    setResults([]);
    setStatus("idle");
  }, []);

  function resetAfterSettingsChange() {
    if (status === "completed" || status === "failed") {
      setStatus("idle");
      setResults([]);
    }
  }

  function updateSelection(next: number[]) {
    const sorted = [...new Set(next)].sort((a, b) => a - b);
    setSelectedPages(sorted);
    setRangeInput(formatPageRange(sorted));
    resetAfterSettingsChange();
  }

  function togglePage(page: number) {
    updateSelection(
      selectedPages.includes(page)
        ? selectedPages.filter((value) => value !== page)
        : [...selectedPages, page],
    );
  }

  function selectAllPages() {
    if (!pageCount) return;
    updateSelection(Array.from({ length: pageCount }, (_, index) => index + 1));
  }

  function clearSelection() {
    updateSelection([]);
  }

  function onRangeInputChange(raw: string) {
    setRangeInput(raw);
    resetAfterSettingsChange();
  }

  function onRangeInputBlur() {
    if (!pageCount) return;
    updateSelection(parsePageRange(rangeInput, pageCount));
  }

  async function process() {
    if (!file) return toast.error("Choose a PDF first.");
    if (!pageCount) return toast.error("This PDF has no pages.");
    if (!selectedPages.length) {
      return toast.error(isDeleteMode ? "Select pages to delete." : "Select pages to extract.");
    }

    if (isDeleteMode && selectedPages.length >= pageCount) {
      return toast.error("Keep at least one page in the PDF.");
    }

    setRunKey((key) => key + 1);
    setBusy(true);
    setStatus("processing");
    setResults([]);

    try {
      const result = (await processTool({
        tool,
        files: [file],
        options: { pages: selectedPages },
      })) as ToolResult;

      setResults([result]);
      setStatus("completed");
      toast.success(isDeleteMode ? "Pages deleted." : "Pages extracted.");
    } catch (error) {
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Processing failed.");
    } finally {
      setBusy(false);
    }
  }

  const actionLabel = isDeleteMode ? "Delete pages" : "Extract pages";
  const selectionLabel = isDeleteMode ? "Pages to delete" : "Pages to extract";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium space-y-5 border-gold/15 p-5 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">PDF workspace</p>
            <p className="text-sm text-muted-foreground">
              {isDeleteMode
                ? "Upload a PDF, select the pages to remove, and download the edited file."
                : "Upload a PDF, select the pages to keep, and download the extracted file."}
            </p>
          </div>

          {!file ? (
            <UploadDropzone tool={tool} onFiles={onFiles} onError={(m) => toast.error(m)} hasFiles={false} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-background/30 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {loadingPages ? "Reading pages…" : `${pageCount} page${pageCount === 1 ? "" : "s"}`}
                  </p>
                </div>
                <Button type="button" variant="ghost" size="icon-sm" onClick={onRemoveFile} aria-label="Remove file">
                  <X className="size-4" />
                </Button>
              </div>

              {!loadingPages && pageCount > 0 ? (
                <div className="space-y-4 rounded-xl border border-gold/10 bg-background/30 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Label>{selectionLabel}</Label>
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" onClick={selectAllPages}>
                        Select all
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={clearSelection}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
                    {Array.from({ length: pageCount }, (_, index) => {
                      const page = index + 1;
                      const active = selectedPages.includes(page);
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => togglePage(page)}
                          className={cn(
                            "rounded-lg border px-2 py-2 text-sm font-medium transition-colors",
                            active
                              ? "border-gold bg-gold/15 text-gold"
                              : "border-gold/15 bg-background/50 text-foreground hover:border-gold/35",
                          )}
                          aria-pressed={active}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="page-range">Or enter page numbers</Label>
                    <Input
                      id="page-range"
                      value={rangeInput}
                      onChange={(e) => onRangeInputChange(e.target.value)}
                      onBlur={onRangeInputBlur}
                      placeholder="e.g. 1, 3, 5-8"
                    />
                    <p className="text-xs text-muted-foreground">
                      Use commas and ranges like <span className="font-mono">1, 3, 5-8</span>.
                      {isDeleteMode ? " Selected pages will be removed." : " Only selected pages stay in the output."}
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {selectedPages.length
                      ? `${selectedPages.length} page${selectedPages.length === 1 ? "" : "s"} selected`
                      : "No pages selected yet"}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <Button
            onClick={process}
            disabled={busy || !file || loadingPages || !pageCount || !selectedPages.length}
            className={cn(
              "w-full transition-all duration-300 sm:w-auto",
              file && "btn-gold border-0 px-8",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {actionLabel}
          </Button>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus status={status} runKey={runKey} />
          <BatchResultsPanel results={results} zipFileName={`${tool.slug}-output.zip`} />
        </div>
      </div>
    </div>
  );
}

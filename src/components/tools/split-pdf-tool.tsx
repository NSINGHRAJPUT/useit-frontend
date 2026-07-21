"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";
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
import { buildSplitGroups, type SplitMode } from "@/lib/processing/pdf-pages";
import { processTool } from "@/lib/processing/router";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { UploadDropzone } from "./upload-dropzone";

const SPLIT_MODES: { value: SplitMode; label: string; description: string }[] = [
  {
    value: "pages",
    label: "Every page",
    description: "Create one PDF file per page.",
  },
  {
    value: "ranges",
    label: "Custom ranges",
    description: "Split into groups like 1-3, 4-6.",
  },
  {
    value: "every",
    label: "Every N pages",
    description: "Split into fixed-size chunks.",
  },
];

async function loadPdfPageCount(file: File): Promise<number> {
  const doc = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
  return doc.getPageCount();
}

export function SplitPdfTool({ tool }: { tool: ToolDefinition }) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<SplitMode>("pages");
  const [splitRanges, setSplitRanges] = useState("");
  const [splitEveryInput, setSplitEveryInput] = useState("2");
  const [loadingPages, setLoadingPages] = useState(false);
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    if (!file) {
      setPageCount(0);
      return;
    }

    let cancelled = false;
    setLoadingPages(true);

    loadPdfPageCount(file)
      .then((count) => {
        if (cancelled) return;
        setPageCount(count);
        setSplitRanges(count > 1 ? `1-${Math.ceil(count / 2)}, ${Math.ceil(count / 2) + 1}-${count}` : "1");
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
  }, [file]);

  const splitEvery = Math.max(1, Math.round(Number(splitEveryInput.replace(/\D/g, "")) || 1));

  const previewGroups = useMemo(
    () => buildSplitGroups(splitMode, pageCount, splitRanges, splitEvery),
    [splitMode, pageCount, splitRanges, splitEvery],
  );

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

  async function process() {
    if (!file) return toast.error("Choose a PDF first.");
    if (!pageCount) return toast.error("This PDF has no pages to split.");
    if (!previewGroups.length) {
      return toast.error(splitMode === "ranges" ? "Enter valid page ranges." : "Unable to split this PDF.");
    }

    setRunKey((key) => key + 1);
    setBusy(true);
    setStatus("processing");
    setResults([]);

    try {
      const result = (await processTool({
        tool,
        files: [file],
        options: {
          splitMode,
          splitRanges: splitMode === "ranges" ? splitRanges : undefined,
          splitEvery: splitMode === "every" ? splitEvery : undefined,
        },
      })) as ToolResult;

      setResults([result]);
      setStatus("completed");
      toast.success(`Split into ${previewGroups.length} files.`);
    } catch (error) {
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Split failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium space-y-5 border-gold/15 p-5 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Split workspace</p>
            <p className="text-sm text-muted-foreground">
              Upload a PDF and choose how to split it. Output is downloaded as a ZIP of PDF files.
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
                  <div className="space-y-2">
                    <Label htmlFor="split-mode">Split method</Label>
                    <Select
                      value={splitMode}
                      onValueChange={(value) => {
                        setSplitMode(value as SplitMode);
                        resetAfterSettingsChange();
                      }}
                    >
                      <SelectTrigger id="split-mode" className="w-full">
                        <SelectValue placeholder="Choose split method" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPLIT_MODES.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {SPLIT_MODES.find((mode) => mode.value === splitMode)?.description}
                    </p>
                  </div>

                  {splitMode === "ranges" ? (
                    <div className="space-y-2">
                      <Label htmlFor="split-ranges">Page ranges</Label>
                      <Input
                        id="split-ranges"
                        value={splitRanges}
                        onChange={(e) => {
                          setSplitRanges(e.target.value);
                          resetAfterSettingsChange();
                        }}
                        placeholder="e.g. 1-3, 4-6, 7"
                      />
                      <p className="text-xs text-muted-foreground">
                        Each range becomes its own PDF file inside the ZIP.
                      </p>
                    </div>
                  ) : null}

                  {splitMode === "every" ? (
                    <div className="space-y-2">
                      <Label htmlFor="split-every">Pages per file</Label>
                      <Input
                        id="split-every"
                        inputMode="numeric"
                        value={splitEveryInput}
                        onChange={(e) => {
                          setSplitEveryInput(e.target.value.replace(/\D/g, "").slice(0, 3));
                          resetAfterSettingsChange();
                        }}
                        onBlur={() => setSplitEveryInput(String(splitEvery))}
                        placeholder="2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Example: 2 pages per file turns a 5-page PDF into 3 files.
                      </p>
                    </div>
                  ) : null}

                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-gold/10 bg-background/40 p-3">
                      {previewGroups.map((group, index) => (
                        <p key={`${index}-${group.join("-")}`} className="text-xs text-muted-foreground">
                          File {index + 1}: pages {group.join(", ")}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {previewGroups.length} PDF file{previewGroups.length === 1 ? "" : "s"} will be created.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <Button
            onClick={process}
            disabled={busy || !file || loadingPages || !pageCount || !previewGroups.length}
            className={cn(
              "w-full transition-all duration-300 sm:w-auto",
              file && "btn-gold border-0 px-8",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            Split PDF
          </Button>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus status={status} runKey={runKey} />
          <BatchResultsPanel results={results} zipFileName={`${tool.slug}-split.zip`} />
        </div>
      </div>
    </div>
  );
}

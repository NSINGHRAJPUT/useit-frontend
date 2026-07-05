"use client";

import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { SelectedFilesPreview } from "./selected-files-preview";
import { UploadDropzone } from "./upload-dropzone";

async function pollJob(jobId: string, tool: ToolDefinition): Promise<ToolResult> {
  const maxAttempts = tool.processingMode === "async" ? 120 : 60;
  for (let i = 0; i < maxAttempts; i++) {
    const { data } = await api.get<{
      data: {
        status: string;
        downloadUrl?: string;
        errorMessage?: string;
        conversionId?: string;
        fileName?: string;
        inputSize?: number;
        outputSize?: number;
        expiresAt?: string;
      };
    }>(`/conversions/jobs/${jobId}`);
    if (data.data.status === "completed" && data.data.downloadUrl) {
      return {
        id: data.data.conversionId ?? jobId,
        downloadUrl: data.data.downloadUrl,
        fileName: data.data.fileName ?? "processed-file",
        inputSize: data.data.inputSize ?? 0,
        outputSize: data.data.outputSize ?? 0,
        expiresAt: data.data.expiresAt,
      };
    }
    if (data.data.status === "failed") {
      throw new Error(data.data.errorMessage ?? "Processing failed.");
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Processing timed out. Try again later.");
}

export function UploadTool({ tool }: { tool: ToolDefinition }) {
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(82);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [batchProgress, setBatchProgress] = useState("");
  const [batchCurrent, setBatchCurrent] = useState<number | undefined>();
  const [batchTotal, setBatchTotal] = useState<number | undefined>();

  const allowsMultiple = tool.inputType === "multi-file" || tool.category === "image";
  const isBatchImageConversion = tool.category === "image" && tool.inputType === "file";

  const onFiles = useCallback(
    (incoming: File[]) => {
      if (!incoming.length) return;
      const maxFiles = tool.maxFiles ?? 20;
      setFiles((prev) => {
        const next = allowsMultiple ? [...prev, ...incoming] : [incoming[0]!];
        return next.slice(0, maxFiles);
      });
      setResults([]);
      setStatus("idle");
      setBatchProgress("");
      setBatchCurrent(undefined);
      setBatchTotal(undefined);
    },
    [allowsMultiple, tool.maxFiles],
  );

  const onRemoveFile = useCallback((index: number) => {
    if (index < 0) {
      setFiles([]);
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }
    setResults([]);
    setStatus("idle");
    setBatchProgress("");
    setBatchCurrent(undefined);
    setBatchTotal(undefined);
  }, []);

  async function convertOne(file: File): Promise<ToolResult> {
    const form = new FormData();
    form.append("file", file);
    form.set("quality", String(quality));
    if (width) form.set("width", width);
    if (height) form.set("height", height);

    const { data, status: httpStatus } = await api.post<{
      data: ToolResult & { jobId?: string; status?: string };
    }>(`/conversions/${tool.slug}`, form);

    if (httpStatus === 202 && data.data.jobId) {
      return pollJob(data.data.jobId, tool);
    }
    return data.data;
  }

  async function process() {
    const uploadFiles = files.length ? files : [];
    if (!uploadFiles.length) return toast.error("Choose a file first.");

    setBusy(true);
    setStatus("uploading");
    setResults([]);
    setBatchProgress("");

    try {
      if (isBatchImageConversion && uploadFiles.length > 1) {
        setStatus("processing");
        setBatchTotal(uploadFiles.length);
        const converted: ToolResult[] = [];

        for (let i = 0; i < uploadFiles.length; i++) {
          setBatchCurrent(i + 1);
          setBatchProgress(`Converting image ${i + 1} of ${uploadFiles.length}…`);
          converted.push(await convertOne(uploadFiles[i]!));
        }

        setResults(converted);
        setStatus("completed");
        setBatchCurrent(undefined);
        setBatchTotal(undefined);
        toast.success(`Converted ${converted.length} images.`);
        return;
      }

      if (tool.inputType === "multi-file") {
        const form = new FormData();
        for (const file of uploadFiles) form.append("file", file);
        form.set("quality", String(quality));
        if (width) form.set("width", width);
        if (height) form.set("height", height);

        const { data, status: httpStatus } = await api.post<{
          data: ToolResult & { jobId?: string; status?: string };
        }>(`/conversions/${tool.slug}`, form);

        if (httpStatus === 202 && data.data.jobId) {
          setStatus("processing");
          setResults([await pollJob(data.data.jobId, tool)]);
        } else {
          setResults([data.data]);
        }
      } else {
        setResults([await convertOne(uploadFiles[0]!)]);
      }

      setStatus("completed");
      toast.success("Conversion complete.");
    } catch (error) {
      setStatus("failed");
      const message =
        error instanceof AxiosError
          ? error.response?.data?.error?.message
          : error instanceof Error
            ? error.message
            : "Conversion failed.";
      toast.error(message ?? "Conversion failed.");
    } finally {
      setBusy(false);
      setBatchProgress("");
      setBatchCurrent(undefined);
      setBatchTotal(undefined);
    }
  }

  const convertLabel =
    isBatchImageConversion && files.length > 1
      ? `Convert ${files.length} images`
      : tool.processingMode === "async"
        ? "Start processing"
        : "Convert now";

  const readyResults = results.filter((result) => result.downloadUrl);
  const hasBatchResults = readyResults.length > 1;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium space-y-5 border-gold/15 p-5 sm:p-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Upload workspace</p>
          <p className="text-sm text-muted-foreground">Select files, review previews, then run the conversion.</p>
        </div>

        <UploadDropzone
          tool={tool}
          onFiles={onFiles}
          onError={(m) => toast.error(m)}
          hasFiles={files.length > 0}
        />
        <SelectedFilesPreview files={files} onRemove={onRemoveFile} />

        <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 backdrop-blur-sm sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="quality">Quality</Label>
            <Input id="quality" type="number" min={1} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} />
          </div>
          {tool.operation === "resize" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Auto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Auto" />
              </div>
            </>
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
          {convertLabel}
        </Button>
        {batchProgress ? (
          <p className="sr-only">{batchProgress}</p>
        ) : null}
        </div>
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus
            status={status}
            detail={batchProgress || undefined}
            batchCurrent={batchCurrent}
            batchTotal={batchTotal}
          />
          {!hasBatchResults ? (
            <BatchResultsPanel results={results} zipFileName={`${tool.slug}-converted.zip`} />
          ) : null}
        </div>
      </div>
      {hasBatchResults ? (
        <BatchResultsPanel results={results} zipFileName={`${tool.slug}-converted.zip`} />
      ) : null}
    </div>
  );
}

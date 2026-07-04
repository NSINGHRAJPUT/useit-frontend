"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { DownloadCard, type ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
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
  const [result, setResult] = useState<ToolResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");

  const onFile = useCallback((file: File) => {
    setFiles(tool.inputType === "multi-file" ? (prev) => [...prev, file] : [file]);
    setResult(null);
    setStatus("idle");
  }, [tool.inputType]);

  async function process() {
    const uploadFiles = files.length ? files : [];
    if (!uploadFiles.length) return toast.error("Choose a file first.");

    const form = new FormData();
    for (const file of uploadFiles) form.append("file", file);
    form.set("quality", String(quality));
    if (width) form.set("width", width);
    if (height) form.set("height", height);

    setBusy(true);
    setStatus("uploading");
    setResult(null);
    try {
      const { data, status: httpStatus } = await api.post<{
        data: ToolResult & { jobId?: string; status?: string };
      }>(`/conversions/${tool.slug}`, form);

      if (httpStatus === 202 && data.data.jobId) {
        setStatus("processing");
        const polled = await pollJob(data.data.jobId, tool);
        setResult(polled);
      } else {
        setResult(data.data);
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
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <UploadDropzone tool={tool} onFile={onFile} onError={(m) => toast.error(m)} />
        {files.length > 0 ? (
          <p className="text-sm text-muted-foreground">
            {files.length} file{files.length > 1 ? "s" : ""} selected: {files.map((f) => f.name).join(", ")}
          </p>
        ) : null}
        <div className="grid gap-4 rounded-lg border bg-card p-5 shadow-sm sm:grid-cols-3">
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
        <Button onClick={process} disabled={busy} className="w-full sm:w-auto">
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          {tool.processingMode === "async" ? "Start processing" : "Convert now"}
        </Button>
      </div>
      <div className="space-y-4">
        <ProcessingStatus status={status} />
        {result?.downloadUrl ? <DownloadCard result={result} /> : null}
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
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
import { processTool } from "@/lib/processing/router";
import {
  DEFAULT_IMAGE_QUALITY,
  imageQualityHint,
  imageToolSupportsQuality,
  parseQualityInput,
  sanitizeQualityInput,
} from "@/lib/processing/processors/image-quality";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { SelectedFilesPreview } from "./selected-files-preview";
import { UploadDropzone } from "./upload-dropzone";

const ROTATE_ANGLE_PRESETS = [
  { value: "90", label: "90° clockwise" },
  { value: "180", label: "180°" },
  { value: "270", label: "270° clockwise" },
  { value: "-90", label: "90° counter-clockwise" },
] as const;

const DEFAULT_ROTATE_ANGLE = 90;

const PDF_COMPRESS_PRESETS = [
  { value: "40", label: "Strong (40%)" },
  { value: "65", label: "Balanced (65%)" },
  { value: "85", label: "Light (85%)" },
] as const;

const DEFAULT_PDF_COMPRESS_QUALITY = 75;

function sanitizeAngleInput(value: string): string {
  const trimmed = value.trimStart();
  const sign = trimmed.startsWith("-") ? "-" : "";
  const digits = trimmed.replace(/-/g, "").replace(/\D/g, "").slice(0, 3);
  return sign + digits;
}

function parseAngleInput(value: string, fallback = DEFAULT_ROTATE_ANGLE): number {
  const trimmed = value.trim();
  if (!trimmed || !/^-?\d+$/.test(trimmed)) return fallback;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : fallback;
}

export function UploadTool({ tool }: { tool: ToolDefinition }) {
  const showCompressQuality = tool.slug === "compress-pdf";
  const [files, setFiles] = useState<File[]>([]);
  const [qualityInput, setQualityInput] = useState(
    () => (tool.slug === "compress-pdf" ? String(DEFAULT_PDF_COMPRESS_QUALITY) : String(DEFAULT_IMAGE_QUALITY)),
  );
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [angleInput, setAngleInput] = useState(String(DEFAULT_ROTATE_ANGLE));
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [runKey, setRunKey] = useState(0);
  const [batchProgress, setBatchProgress] = useState("");
  const [batchCurrent, setBatchCurrent] = useState<number | undefined>();
  const [batchTotal, setBatchTotal] = useState<number | undefined>();

  const allowsMultiple = tool.inputType === "multi-file" || tool.category === "image";
  const isBatchImageConversion = tool.category === "image" && tool.inputType === "file";
  const isServerTool = tool.processingLocation === "server";
  const showQuality = tool.category === "image" && imageToolSupportsQuality(tool);
  const showRotate = tool.operation === "rotate";
  const showMergeOrder = tool.operation === "merge";
  const qualityHint = showQuality ? imageQualityHint(tool) : undefined;

  function buildProcessOptions(resolvedQuality: number) {
    return {
      quality: showQuality || showCompressQuality ? resolvedQuality : undefined,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
      angle: showRotate ? parseAngleInput(angleInput) : undefined,
    };
  }

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

  const onMoveFileUp = useCallback((index: number) => {
    moveFile(index, index - 1);
  }, [moveFile]);

  const onMoveFileDown = useCallback((index: number) => {
    moveFile(index, index + 1);
  }, [moveFile]);

  function resetAfterSettingsChange() {
    if (status === "completed" || status === "failed") {
      setStatus("idle");
      setResults([]);
    }
  }

  function onQualityChange(raw: string) {
    setQualityInput(sanitizeQualityInput(raw));
    resetAfterSettingsChange();
  }

  function onQualityBlur() {
    setQualityInput(
      String(parseQualityInput(qualityInput, showCompressQuality ? DEFAULT_PDF_COMPRESS_QUALITY : DEFAULT_IMAGE_QUALITY)),
    );
  }

  function onCompressPreset(value: string) {
    setQualityInput(value);
    resetAfterSettingsChange();
  }

  function onAngleChange(raw: string) {
    setAngleInput(sanitizeAngleInput(raw));
    resetAfterSettingsChange();
  }

  function onAngleBlur() {
    setAngleInput(String(parseAngleInput(angleInput)));
  }

  function onAnglePreset(value: string) {
    setAngleInput(value);
    resetAfterSettingsChange();
  }

  async function process() {
    const uploadFiles = files.length ? files : [];
    if (!uploadFiles.length) return toast.error("Choose a file first.");

    const resolvedQuality = parseQualityInput(
      qualityInput,
      showCompressQuality ? DEFAULT_PDF_COMPRESS_QUALITY : DEFAULT_IMAGE_QUALITY,
    );
    setQualityInput(String(resolvedQuality));
    const processOptions = buildProcessOptions(resolvedQuality);
    if (showRotate) {
      setAngleInput(String(parseAngleInput(angleInput)));
    }

    setRunKey((k) => k + 1);
    setBusy(true);
    setStatus(isServerTool ? "uploading" : "processing");
    setResults([]);
    setBatchProgress("");

    try {
      if (isBatchImageConversion && uploadFiles.length > 1 && !isServerTool) {
        setBatchTotal(uploadFiles.length);
        const converted: ToolResult[] = [];

        for (let i = 0; i < uploadFiles.length; i++) {
          const file = uploadFiles[i]!;
          setBatchCurrent(i + 1);
          setBatchProgress(`Converting image ${i + 1} of ${uploadFiles.length}…`);
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

          const result = (await processTool({
            tool,
            files: [file],
            options: processOptions,
          })) as ToolResult;

          converted.push(result);
        }

        setResults(converted);
        setBatchProgress(`Finished ${converted.length} images.`);
        setStatus("completed");
        toast.success(`Converted ${converted.length} images.`);
        return;
      }

      if (tool.inputType === "multi-file") {
        if (showMergeOrder && uploadFiles.length < 2) {
          toast.error("Add at least 2 PDF files to merge.");
          return;
        }

        setStatus(isServerTool ? "uploading" : "processing");
        const result = await processTool({
          tool,
          files: uploadFiles,
          options: processOptions,
        });
        setResults(Array.isArray(result) ? result : [result]);
        if (isServerTool) setStatus("processing");
      } else {
        const result = await processTool({
          tool,
          files: [uploadFiles[0]!],
          options: processOptions,
        });
        setResults(Array.isArray(result) ? result : [result]);
      }

      setStatus("completed");
      toast.success("Conversion complete.");
    } catch (error) {
      setStatus("failed");
      setBatchProgress("");
      setBatchCurrent(undefined);
      setBatchTotal(undefined);
      toast.error(error instanceof Error ? error.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  const convertLabel =
    showMergeOrder
      ? files.length > 1
        ? `Merge ${files.length} PDFs`
        : "Merge PDFs"
      : showCompressQuality
        ? "Compress now"
        : showRotate
          ? "Rotate now"
          : isBatchImageConversion && files.length > 1
            ? `Convert ${files.length} images`
            : isServerTool
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
            <p className="text-sm text-muted-foreground">
              {isServerTool
                ? "Select files to upload for server-side conversion."
                : "Select files — processing happens locally in your browser."}
            </p>
          </div>

          <UploadDropzone
            tool={tool}
            onFiles={onFiles}
            onError={(m) => toast.error(m)}
            hasFiles={files.length > 0}
          />
          <SelectedFilesPreview
            files={files}
            onRemove={onRemoveFile}
            reorderable={showMergeOrder && files.length > 1}
            onMoveUp={onMoveFileUp}
            onMoveDown={onMoveFileDown}
            orderHint={
              showMergeOrder
                ? "Top file merges first. Use arrows to change order."
                : undefined
            }
          />

          {showRotate ? (
            <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 backdrop-blur-sm sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="angle-preset">Quick rotate</Label>
                <Select
                  value={ROTATE_ANGLE_PRESETS.some((preset) => preset.value === angleInput) ? angleInput : "custom"}
                  onValueChange={(value) => {
                    if (value !== "custom") onAnglePreset(value);
                  }}
                >
                  <SelectTrigger id="angle-preset" className="w-full">
                    <SelectValue placeholder="Choose angle" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROTATE_ANGLE_PRESETS.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom angle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="angle">Angle (degrees)</Label>
                <Input
                  id="angle"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={angleInput}
                  onChange={(e) => onAngleChange(e.target.value)}
                  onBlur={onAngleBlur}
                  placeholder={String(DEFAULT_ROTATE_ANGLE)}
                  maxLength={4}
                />
                <p className="text-xs text-muted-foreground">
                  Positive values rotate clockwise. Use 90, 180, 270, or any custom angle.
                </p>
              </div>
            </div>
          ) : null}

          {showCompressQuality ? (
            <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 backdrop-blur-sm sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="compress-preset">Compression preset</Label>
                <Select
                  value={PDF_COMPRESS_PRESETS.some((preset) => preset.value === qualityInput) ? qualityInput : "custom"}
                  onValueChange={(value) => {
                    if (value !== "custom") onCompressPreset(value);
                  }}
                >
                  <SelectTrigger id="compress-preset" className="w-full">
                    <SelectValue placeholder="Choose compression" />
                  </SelectTrigger>
                  <SelectContent>
                    {PDF_COMPRESS_PRESETS.map((preset) => (
                      <SelectItem key={preset.value} value={preset.value}>
                        {preset.label}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">Custom quality</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="compress-quality">Quality (%)</Label>
                <Input
                  id="compress-quality"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={qualityInput}
                  onChange={(e) => onQualityChange(e.target.value)}
                  onBlur={onQualityBlur}
                  placeholder={String(DEFAULT_PDF_COMPRESS_QUALITY)}
                  maxLength={3}
                />
                <p className="text-xs text-muted-foreground">
                  Lower values compress more (smaller file). Higher values keep more detail. Default is 75%.
                </p>
              </div>
            </div>
          ) : null}

          {showQuality ? (
            <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 backdrop-blur-sm sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-3 lg:col-span-1">
                <Label htmlFor="quality">Quality</Label>
                <Input
                  id="quality"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={qualityInput}
                  onChange={(e) => onQualityChange(e.target.value)}
                  onBlur={onQualityBlur}
                  placeholder={String(DEFAULT_IMAGE_QUALITY)}
                  maxLength={3}
                />
                {qualityHint ? (
                  <p className="text-xs text-muted-foreground">{qualityHint}</p>
                ) : null}
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
          ) : tool.operation === "resize" ? (
            <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 backdrop-blur-sm sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="width">Width</Label>
                <Input id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Auto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height</Label>
                <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Auto" />
              </div>
            </div>
          ) : null}
          <Button
            onClick={process}
            disabled={busy || !files.length || (showMergeOrder && files.length < 2)}
            className={cn(
              "w-full transition-all duration-300 sm:w-auto",
              files.length > 0 && "btn-gold border-0 px-8",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            {convertLabel}
          </Button>
          {batchProgress ? <p className="sr-only">{batchProgress}</p> : null}
        </div>
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus
            status={status}
            detail={batchProgress || undefined}
            batchCurrent={batchCurrent}
            batchTotal={batchTotal}
            runKey={runKey}
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

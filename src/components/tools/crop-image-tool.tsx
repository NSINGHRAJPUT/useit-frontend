"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
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
  parseQualityInput,
  sanitizeQualityInput,
} from "@/lib/processing/processors/image-quality";
import { BatchResultsPanel } from "./batch-results-panel";
import type { ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";
import { UploadDropzone } from "./upload-dropzone";
import {
  ASPECT_RATIO_PRESETS,
  type AspectRatioPreset,
  type CropArea,
  clampCrop,
  createInitialCrop,
  ImageCropEditor,
} from "./image-crop-editor";

function loadImageSize(url: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => reject(new Error("Failed to load image preview."));
    img.src = url;
  });
}

export function CropImageTool({ tool }: { tool: ToolDefinition }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number } | null>(null);
  const [aspectPreset, setAspectPreset] = useState<AspectRatioPreset>("free");
  const [crop, setCrop] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [qualityInput, setQualityInput] = useState(String(DEFAULT_IMAGE_QUALITY));
  const [results, setResults] = useState<ToolResult[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [runKey, setRunKey] = useState(0);
  const loadTokenRef = useRef(0);

  const aspectRatio = useMemo(
    () => ASPECT_RATIO_PRESETS.find((preset) => preset.value === aspectPreset)?.ratio ?? null,
    [aspectPreset],
  );

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      setNaturalSize(null);
      setCrop({ x: 0, y: 0, width: 0, height: 0 });
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const token = ++loadTokenRef.current;
    loadImageSize(url)
      .then((size) => {
        if (token !== loadTokenRef.current) return;
        setNaturalSize(size);
        setCrop(createInitialCrop(size.w, size.h, aspectRatio));
      })
      .catch((error) => {
        if (token !== loadTokenRef.current) return;
        toast.error(error instanceof Error ? error.message : "Failed to load image.");
      });

    return () => URL.revokeObjectURL(url);
    // aspectRatio is applied in a separate effect so a new upload always starts fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (!naturalSize) return;
    setCrop((prev) => {
      if (!prev.width || !prev.height) {
        return createInitialCrop(naturalSize.w, naturalSize.h, aspectRatio);
      }
      return clampCrop(prev, naturalSize.w, naturalSize.h, aspectRatio);
    });
  }, [aspectRatio]); // eslint-disable-line react-hooks/exhaustive-deps -- only refit when preset changes

  const onFiles = useCallback((incoming: File[]) => {
    if (!incoming.length) return;
    setFile(incoming[0]!);
    setResults([]);
    setStatus("idle");
  }, []);

  const onRemoveFile = useCallback(() => {
    loadTokenRef.current += 1;
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

  function onAspectChange(value: AspectRatioPreset) {
    setAspectPreset(value);
    resetAfterSettingsChange();
  }

  function onCropFieldChange(field: keyof CropArea, raw: string) {
    if (!naturalSize) return;
    const value = Math.max(0, Math.round(Number(raw.replace(/\D/g, "")) || 0));
    setCrop((prev) => {
      const next = { ...prev, [field]: value };
      return clampCrop(next, naturalSize.w, naturalSize.h, aspectRatio);
    });
    resetAfterSettingsChange();
  }

  function onQualityChange(raw: string) {
    setQualityInput(sanitizeQualityInput(raw));
    resetAfterSettingsChange();
  }

  function onQualityBlur() {
    setQualityInput(String(parseQualityInput(qualityInput)));
  }

  async function process() {
    if (!file || !naturalSize) return toast.error("Choose an image first.");
    if (crop.width < 1 || crop.height < 1) return toast.error("Draw a valid crop area.");

    const resolvedQuality = parseQualityInput(qualityInput);
    setQualityInput(String(resolvedQuality));

    setRunKey((k) => k + 1);
    setBusy(true);
    setStatus("processing");
    setResults([]);

    try {
      const result = (await processTool({
        tool,
        files: [file],
        options: {
          quality: resolvedQuality,
          left: crop.x,
          top: crop.y,
          cropWidth: crop.width,
          cropHeight: crop.height,
        },
      })) as ToolResult;

      setResults([result]);
      setStatus("completed");
      toast.success("Image cropped.");
    } catch (error) {
      setStatus("failed");
      toast.error(error instanceof Error ? error.message : "Crop failed.");
    } finally {
      setBusy(false);
    }
  }

  const qualityHint = imageQualityHint(tool);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card-premium space-y-5 border-gold/15 p-5 sm:p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Crop workspace</p>
            <p className="text-sm text-muted-foreground">
              Upload an image, drag the crop box, and resize from the handles. Processing stays in your browser.
            </p>
          </div>

          {!file ? (
            <UploadDropzone tool={tool} onFiles={onFiles} onError={(m) => toast.error(m)} hasFiles={false} />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/10 bg-background/30 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  {naturalSize ? (
                    <p className="text-xs text-muted-foreground">
                      Original: {naturalSize.w} × {naturalSize.h}px
                    </p>
                  ) : null}
                </div>
                <Button type="button" variant="ghost" size="icon-sm" onClick={onRemoveFile} aria-label="Remove file">
                  <X className="size-4" />
                </Button>
              </div>

              {previewUrl && naturalSize ? (
                <ImageCropEditor
                  src={previewUrl}
                  imageWidth={naturalSize.w}
                  imageHeight={naturalSize.h}
                  crop={crop}
                  aspectRatio={aspectRatio}
                  onCropChange={(next) => {
                    setCrop(next);
                    resetAfterSettingsChange();
                  }}
                />
              ) : (
                <div className="flex h-[min(480px,60vh)] items-center justify-center rounded-xl border border-gold/15 bg-black/20 text-sm text-muted-foreground">
                  Loading preview…
                </div>
              )}

              <div className="grid gap-4 rounded-xl border border-gold/10 bg-background/30 p-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="aspect-ratio">Aspect ratio</Label>
                  <Select value={aspectPreset} onValueChange={(value) => onAspectChange(value as AspectRatioPreset)}>
                    <SelectTrigger id="aspect-ratio" className="w-full">
                      <SelectValue placeholder="Aspect ratio" />
                    </SelectTrigger>
                    <SelectContent>
                      {ASPECT_RATIO_PRESETS.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-x">X</Label>
                  <Input
                    id="crop-x"
                    inputMode="numeric"
                    value={String(crop.x)}
                    onChange={(e) => onCropFieldChange("x", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-y">Y</Label>
                  <Input
                    id="crop-y"
                    inputMode="numeric"
                    value={String(crop.y)}
                    onChange={(e) => onCropFieldChange("y", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-width">Width</Label>
                  <Input
                    id="crop-width"
                    inputMode="numeric"
                    value={String(crop.width)}
                    onChange={(e) => onCropFieldChange("width", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-height">Height</Label>
                  <Input
                    id="crop-height"
                    inputMode="numeric"
                    value={String(crop.height)}
                    onChange={(e) => onCropFieldChange("height", e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
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
                  {qualityHint ? <p className="text-xs text-muted-foreground">{qualityHint}</p> : null}
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Output: {crop.width} × {crop.height}px
                {aspectRatio ? ` (${aspectPreset})` : ""}
              </p>
            </div>
          )}

          <Button
            onClick={process}
            disabled={busy || !file || !naturalSize || crop.width < 1 || crop.height < 1}
            className={cn(
              "w-full transition-all duration-300 sm:w-auto",
              file && "btn-gold border-0 px-8",
            )}
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : null}
            Crop image
          </Button>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <ProcessingStatus status={status} runKey={runKey} />
          <BatchResultsPanel results={results} zipFileName={`${tool.slug}-cropped.zip`} />
        </div>
      </div>
    </div>
  );
}

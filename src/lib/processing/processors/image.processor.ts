import UPNG from "upng-js";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import type { ProcessInput, ProcessOutput } from "../types";
import { DEFAULT_IMAGE_QUALITY } from "./image-quality";
export { imageToolSupportsQuality } from "./image-quality";

type OutputFormat = "jpg" | "jpeg" | "png" | "webp" | "gif" | "avif" | "tiff" | "bmp";

function clampQuality(quality: number): number {
  return Math.min(100, Math.max(1, Number.isFinite(quality) ? quality : DEFAULT_IMAGE_QUALITY));
}

function mimeToFormat(mime: string): OutputFormat {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  if (mime === "image/avif") return "avif";
  if (mime === "image/tiff") return "tiff";
  if (mime === "image/bmp") return "bmp";
  return "jpg";
}

function resolveOutputFormat(tool: ToolDefinition, fileMime: string): OutputFormat {
  if (tool.outputFormat !== "same") {
    return tool.outputFormat as OutputFormat;
  }
  const slug = tool.slug;
  if (slug.endsWith("-to-png") || slug === "compress-png" || slug === "bmp-to-png") return "png";
  if (slug.endsWith("-to-webp") || slug === "compress-webp") return "webp";
  if (slug.endsWith("-to-gif") || slug === "compress-gif") return "gif";
  if (slug.endsWith("-to-avif")) return "avif";
  if (slug.endsWith("-to-tiff")) return "tiff";
  if (slug.endsWith("-to-bmp")) return "bmp";
  if (slug.endsWith("-to-jpg") || slug.endsWith("-to-jpeg") || slug === "compress-jpg") return "jpg";
  return mimeToFormat(fileMime);
}

function shouldTargetInputSize(tool: ToolDefinition, inputMime: string, outputFormat: OutputFormat): boolean {
  if (tool.operation === "compress") return true;
  if (tool.outputFormat !== "same") return false;
  if (tool.slug.includes("-to-")) return false;
  return mimeToFormat(inputMime) === outputFormat;
}

function lossyQuality(quality: number): number {
  return clampQuality(quality) / 100;
}

function pngPaletteColors(quality: number): number {
  const q = clampQuality(quality);
  if (q >= 98) return 256;
  return Math.max(8, Math.round(220 * (q / 100) ** 1.35));
}

function canvasToLossyBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: string,
  quality: number,
): Promise<Blob> {
  const q = lossyQuality(quality);
  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type: mime, quality: q });
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Failed to encode image."))),
      mime,
      q,
    );
  });
}

async function canvasToPngBlob(
  width: number,
  height: number,
  rgba: Uint8Array,
  quality: number,
): Promise<Blob> {
  const colors = pngPaletteColors(quality);
  const copy = new Uint8Array(rgba);
  const encoded = UPNG.encode([copy.buffer], width, height, colors);
  return new Blob([encoded], { type: "image/png" });
}

async function encodeOnce(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  width: number,
  height: number,
  format: OutputFormat,
  quality: number,
): Promise<{ blob: Blob; mimeType: string; ext: string }> {
  const q = clampQuality(quality);
  const ctx =
    canvas instanceof OffscreenCanvas
      ? canvas.getContext("2d")
      : (canvas as HTMLCanvasElement).getContext("2d");
  if (!ctx) throw new Error("Failed to read image data.");

  if (format === "jpg" || format === "jpeg") {
    const blob = await canvasToLossyBlob(canvas, "image/jpeg", q);
    return { blob, mimeType: "image/jpeg", ext: "jpg" };
  }

  if (format === "webp") {
    const blob = await canvasToLossyBlob(canvas, "image/webp", q);
    return { blob, mimeType: "image/webp", ext: "webp" };
  }

  if (format === "png" || format === "gif" || format === "tiff" || format === "bmp") {
    const imageData = ctx.getImageData(0, 0, width, height);
    const blob = await canvasToPngBlob(width, height, new Uint8Array(imageData.data), q);
    return { blob, mimeType: "image/png", ext: "png" };
  }

  if (format === "avif") {
    try {
      const blob = await canvasToLossyBlob(canvas, "image/avif", q);
      return { blob, mimeType: "image/avif", ext: "avif" };
    } catch {
      const blob = await canvasToLossyBlob(canvas, "image/webp", q);
      return { blob, mimeType: "image/webp", ext: "webp" };
    }
  }

  const blob = await canvasToLossyBlob(canvas, "image/jpeg", q);
  return { blob, mimeType: "image/jpeg", ext: "jpg" };
}

async function encodeWithSizeTarget(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  width: number,
  height: number,
  format: OutputFormat,
  startQuality: number,
  inputSize: number,
  targetSize: boolean,
): Promise<{ blob: Blob; mimeType: string; ext: string }> {
  let quality = clampQuality(startQuality);
  let result = await encodeOnce(canvas, width, height, format, quality);

  if (!targetSize || inputSize <= 0) return result;

  const maxSize = inputSize * 1.03;
  let attempts = 0;

  while (result.blob.size > maxSize && attempts < 12) {
    const isPalette = format === "png" || format === "gif" || format === "tiff" || format === "bmp";
    quality = isPalette
      ? Math.max(5, Math.round(quality * 0.72))
      : Math.max(18, Math.round(quality * 0.82));

    const next = await encodeOnce(canvas, width, height, format, quality);
    if (next.blob.size >= result.blob.size && attempts >= 3) break;
    result = next;
    attempts++;
  }

  return result;
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

async function processImage(input: ProcessInput, file: File): Promise<ProcessOutput> {
  const { tool, options } = input;
  const quality = clampQuality(Number(options.quality ?? DEFAULT_IMAGE_QUALITY));
  const outputFormat = resolveOutputFormat(tool, file.type);
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const targetSize = shouldTargetInputSize(tool, file.type, outputFormat);

  const bitmap = await loadBitmap(file);
  let width = bitmap.width;
  let height = bitmap.height;

  if (tool.operation === "resize" && (options.width || options.height)) {
    const targetW = options.width ? Number(options.width) : width;
    const targetH = options.height ? Number(options.height) : height;
    if (options.width && !options.height) {
      height = Math.round((bitmap.height / bitmap.width) * targetW);
      width = targetW;
    } else if (options.height && !options.width) {
      width = Math.round((bitmap.width / bitmap.height) * targetH);
      height = targetH;
    } else {
      width = targetW;
      height = targetH;
    }
  }

  let canvas: OffscreenCanvas | HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

  if (typeof OffscreenCanvas !== "undefined") {
    canvas = new OffscreenCanvas(width, height);
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  } else {
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
  }

  const angle = tool.slug === "rotate-image" ? Number(options.angle ?? 90) : 0;
  const flip = tool.slug === "flip-image";

  if (angle % 360 !== 0) {
    const rad = (angle * Math.PI) / 180;
    const rotated = angle % 180 === 0 ? { w: width, h: height } : { w: height, h: width };
    if (canvas instanceof OffscreenCanvas) {
      canvas = new OffscreenCanvas(rotated.w, rotated.h);
    } else {
      canvas.width = rotated.w;
      canvas.height = rotated.h;
    }
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    ctx.translate(rotated.w / 2, rotated.h / 2);
    ctx.rotate(rad);
    ctx.drawImage(bitmap, -width / 2, -height / 2, width, height);
    width = rotated.w;
    height = rotated.h;
  } else if (flip) {
    ctx.translate(width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(bitmap, 0, 0, width, height);
  } else if (tool.operation === "crop") {
    const cropW = Math.max(1, Math.min(Number(options.cropWidth ?? width), width));
    const cropH = Math.max(1, Math.min(Number(options.cropHeight ?? height), height));
    const left = Math.max(0, Math.min(Number(options.left ?? 0), width - cropW));
    const top = Math.max(0, Math.min(Number(options.top ?? 0), height - cropH));
    if (canvas instanceof OffscreenCanvas) {
      canvas = new OffscreenCanvas(cropW, cropH);
    } else {
      canvas.width = cropW;
      canvas.height = cropH;
    }
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    ctx.drawImage(bitmap, left, top, cropW, cropH, 0, 0, cropW, cropH);
    width = cropW;
    height = cropH;
  } else {
    ctx.drawImage(bitmap, 0, 0, width, height);
  }

  bitmap.close();

  const { blob, mimeType, ext } = await encodeWithSizeTarget(
    canvas,
    width,
    height,
    outputFormat,
    quality,
    file.size,
    targetSize,
  );

  return {
    blob,
    fileName: `${baseName}.${ext}`,
    mimeType,
    inputSize: file.size,
    outputSize: blob.size,
  };
}

export async function processImageTool(input: ProcessInput): Promise<ProcessOutput> {
  const file = input.files[0];
  if (!file) throw new Error("Choose a file first.");
  return processImage(input, file);
}

export async function processImageBatch(input: ProcessInput): Promise<ProcessOutput[]> {
  const results: ProcessOutput[] = [];
  const total = input.files.length;

  for (let i = 0; i < total; i++) {
    const file = input.files[i]!;
    input.options.onProgress?.(i + 1, total, file.name);
    results.push(await processImage(input, file));
  }

  return results;
}

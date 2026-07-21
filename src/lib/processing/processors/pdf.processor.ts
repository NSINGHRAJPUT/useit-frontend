import { PDFDocument, degrees, type PDFImage, type PDFPage } from "pdf-lib";
import JSZip from "jszip";
import type { ProcessInput, ProcessOutput } from "../types";
import { buildSplitGroups, type SplitMode } from "../pdf-pages";
import {
  chunkItems,
  clampImagesPerPage,
  clampMarginMm,
  gridForCount,
  mmToPoints,
  PDF_PAGE_SIZES,
  type ImagesToPdfLayout,
  type ImagesToPdfPageSize,
} from "../images-to-pdf";

export const DEFAULT_PDF_COMPRESS_QUALITY = 75;

function clampPdfQuality(quality: number): number {
  return Math.min(100, Math.max(1, Number.isFinite(quality) ? quality : DEFAULT_PDF_COMPRESS_QUALITY));
}

function pdfCompressSettings(quality: number): { scale: number; jpegQuality: number } {
  const q = clampPdfQuality(quality);
  return {
    scale: 0.65 + (q / 100) * 1.35,
    jpegQuality: Math.max(0.28, q / 100),
  };
}

async function compressPdfWithQuality(buffer: ArrayBuffer, quality: number): Promise<Uint8Array> {
  const { scale, jpegQuality } = pdfCompressSettings(quality);
  const pdfjs = await loadPdfJs();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const out = await PDFDocument.create();

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(viewport.width));
    canvas.height = Math.max(1, Math.round(viewport.height));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to prepare PDF page for compression.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const jpegBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Failed to compress PDF page."))),
        "image/jpeg",
        jpegQuality,
      );
    });

    const jpegBytes = await jpegBlob.arrayBuffer();
    const embedded = await out.embedJpg(jpegBytes);
    const pdfPage = out.addPage([embedded.width, embedded.height]);
    pdfPage.drawImage(embedded, { x: 0, y: 0, width: embedded.width, height: embedded.height });
  }

  return out.save({ useObjectStreams: true });
}

async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  if (typeof window !== "undefined") {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
      import.meta.url,
    ).toString();
  }
  return pdfjs;
}

async function embedImageFile(pdf: PDFDocument, file: File): Promise<PDFImage> {
  const buffer = await file.arrayBuffer();
  if (file.type === "image/png") return pdf.embedPng(buffer);
  if (file.type === "image/jpeg" || file.type === "image/jpg") return pdf.embedJpg(buffer);

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error(`Failed to decode ${file.name}.`);
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const pngBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error(`Failed to decode ${file.name}.`));
        return;
      }
      resolve(await blob.arrayBuffer());
    }, "image/png");
  });

  return pdf.embedPng(pngBuffer);
}

function resolvePageDimensions(
  pageSize: ImagesToPdfPageSize,
  embedded: PDFImage,
  marginPt: number,
): { width: number; height: number } {
  if (pageSize === "image") {
    return {
      width: embedded.width + marginPt * 2,
      height: embedded.height + marginPt * 2,
    };
  }

  const size = PDF_PAGE_SIZES[pageSize];
  return { width: size.width, height: size.height };
}

function drawImageContained(
  page: PDFPage,
  embedded: PDFImage,
  x: number,
  y: number,
  boxWidth: number,
  boxHeight: number,
) {
  const scale = Math.min(boxWidth / embedded.width, boxHeight / embedded.height);
  const width = embedded.width * scale;
  const height = embedded.height * scale;
  page.drawImage(embedded, {
    x: x + (boxWidth - width) / 2,
    y: y + (boxHeight - height) / 2,
    width,
    height,
  });
}

function drawImagesOnPage(
  page: PDFPage,
  images: PDFImage[],
  marginPt: number,
) {
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  const availWidth = pageWidth - marginPt * 2;
  const availHeight = pageHeight - marginPt * 2;
  const { cols, rows } = gridForCount(images.length);
  const cellWidth = availWidth / cols;
  const cellHeight = availHeight / rows;

  images.forEach((embedded, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const cellX = marginPt + col * cellWidth;
    const cellY = pageHeight - marginPt - (row + 1) * cellHeight;
    drawImageContained(page, embedded, cellX, cellY, cellWidth, cellHeight);
  });
}

async function renderImagesToPdf(
  files: File[],
  layout: ImagesToPdfLayout,
  imagesPerPage: number,
  marginMm: number,
  pageSize: ImagesToPdfPageSize,
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const marginPt = mmToPoints(marginMm);
  const embeddedImages: PDFImage[] = [];

  for (const file of files) {
    embeddedImages.push(await embedImageFile(pdf, file));
  }

  const groups = chunkItems(embeddedImages, layout, imagesPerPage);

  for (const group of groups) {
    const first = group[0]!;
    const effectivePageSize =
      layout === "one-per-page" && group.length === 1 ? pageSize : pageSize === "image" ? "a4" : pageSize;
    const { width, height } =
      effectivePageSize === "image"
        ? resolvePageDimensions("image", first, marginPt)
        : resolvePageDimensions(effectivePageSize, first, marginPt);

    const page = pdf.addPage([width, height]);

    if (group.length === 1) {
      drawImageContained(page, first, marginPt, marginPt, width - marginPt * 2, height - marginPt * 2);
    } else {
      drawImagesOnPage(page, group, marginPt);
    }
  }

  return pdf.save();
}

async function renderPdfPages(file: File, format: "jpeg" | "png"): Promise<{ pages: Blob[]; pageCount: number }> {
  const pdfjs = await loadPdfJs();
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buffer }).promise;
  const pages: Blob[] = [];
  const mime = format === "jpeg" ? "image/jpeg" : "image/png";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d")!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Failed to render page."))), mime, 0.92);
    });
    pages.push(blob);
  }

  return { pages, pageCount: pdf.numPages };
}

export async function processPdfTool(input: ProcessInput): Promise<ProcessOutput> {
  const { tool, files, options } = input;
  const slug = tool.slug;

  if (slug === "merge-pdf") {
    const merged = await PDFDocument.create();
    for (const file of files) {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pages = await merged.copyPages(doc, doc.getPageIndices());
      pages.forEach((p) => merged.addPage(p));
    }
    const bytes = await merged.save();
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    const inputSize = files.reduce((s, f) => s + f.size, 0);
    return { blob, fileName: "merged.pdf", mimeType: "application/pdf", inputSize, outputSize: blob.size };
  }

  const file = files[0]!;
  const buffer = await file.arrayBuffer();
  const baseName = file.name.replace(/\.[^.]+$/, "");

  if (slug === "split-pdf") {
    const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const totalPages = doc.getPageCount();
    const splitMode = (options.splitMode ?? "pages") as SplitMode;
    const splitEvery = Math.max(1, Number(options.splitEvery ?? 1));
    const groups = buildSplitGroups(splitMode, totalPages, options.splitRanges ?? "", splitEvery);

    if (!groups.length) {
      throw new Error(
        splitMode === "ranges"
          ? "Enter valid page ranges to split."
          : "This PDF has no pages to split.",
      );
    }

    const zip = new JSZip();
    for (let i = 0; i < groups.length; i++) {
      const group = groups[i]!;
      const out = await PDFDocument.create();
      const indices = group.map((page) => page - 1);
      const pages = await out.copyPages(doc, indices);
      pages.forEach((page) => out.addPage(page));
      const bytes = await out.save();

      const label =
        group.length === 1
          ? `page-${group[0]}`
          : `pages-${group[0]}-${group[group.length - 1]}`;
      zip.file(`${baseName}-${label}.pdf`, bytes);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      blob: zipBlob,
      fileName: `${baseName}-split.zip`,
      mimeType: "application/zip",
      inputSize: file.size,
      outputSize: zipBlob.size,
    };
  }

  if (slug === "rotate-pdf") {
    const doc = await PDFDocument.load(buffer);
    const angle = Number(options.angle ?? 90);
    doc.getPages().forEach((page) => page.setRotation(degrees(angle)));
    const bytes = await doc.save();
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    return {
      blob,
      fileName: `rotated-${file.name}`,
      mimeType: "application/pdf",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "delete-pages-pdf" || slug === "extract-pages-pdf") {
    const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const totalPages = doc.getPageCount();
    const selected = [...new Set((options.pages ?? []).map((page) => Number(page)))]
      .filter((page) => Number.isFinite(page) && page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    if (!selected.length) {
      throw new Error(slug === "delete-pages-pdf" ? "Select pages to delete." : "Select pages to extract.");
    }

    const out = await PDFDocument.create();
    let indices: number[];

    if (slug === "delete-pages-pdf") {
      const deleteSet = new Set(selected);
      indices = doc.getPageIndices().filter((index) => !deleteSet.has(index + 1));
      if (!indices.length) throw new Error("Keep at least one page in the PDF.");
    } else {
      indices = selected.map((page) => page - 1);
    }

    const pages = await out.copyPages(doc, indices);
    pages.forEach((page) => out.addPage(page));
    const bytes = await out.save();
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    return {
      blob,
      fileName: slug === "delete-pages-pdf" ? `${baseName}-deleted.pdf` : `${baseName}-extracted.pdf`,
      mimeType: "application/pdf",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "compress-pdf") {
    const quality = clampPdfQuality(Number(options.quality ?? DEFAULT_PDF_COMPRESS_QUALITY));
    const bytes = await compressPdfWithQuality(buffer, quality);
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    return {
      blob,
      fileName: `compressed-${file.name}`,
      mimeType: "application/pdf",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "pdf-to-text") {
    const pdfjs = await loadPdfJs();
    const pdf = await pdfjs.getDocument({ data: buffer }).promise;
    const parts: string[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      parts.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
    }
    const text = parts.join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    return {
      blob,
      fileName: `${baseName}.txt`,
      mimeType: "text/plain",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "pdf-to-jpg" || slug === "pdf-to-png") {
    const format = slug === "pdf-to-png" ? "png" : "jpeg";
    const ext = format === "jpeg" ? "jpg" : "png";
    const { pages, pageCount } = await renderPdfPages(file, format);
    const zip = new JSZip();
    pages.forEach((pageBlob, i) => zip.file(`${baseName}-page-${i + 1}.${ext}`, pageBlob));
    const zipBlob = await zip.generateAsync({ type: "blob" });
    return {
      blob: zipBlob,
      fileName: `${baseName}-${pageCount}-pages.zip`,
      mimeType: "application/zip",
      inputSize: file.size,
      outputSize: zipBlob.size,
    };
  }

  if (slug === "images-to-pdf") {
    const layout = (options.pdfLayout ?? "one-per-page") as ImagesToPdfLayout;
    const imagesPerPage = clampImagesPerPage(Number(options.pdfImagesPerPage ?? 2));
    const marginMm = clampMarginMm(Number(options.pdfMargin ?? 10));
    const pageSize = (options.pdfPageSize ?? "a4") as ImagesToPdfPageSize;
    const bytes = await renderImagesToPdf(files, layout, imagesPerPage, marginMm, pageSize);
    const blob = new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
    const inputSize = files.reduce((s, f) => s + f.size, 0);
    return { blob, fileName: "images.pdf", mimeType: "application/pdf", inputSize, outputSize: blob.size };
  }

  throw new Error(`PDF tool "${slug}" is not implemented.`);
}

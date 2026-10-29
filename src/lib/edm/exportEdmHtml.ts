import { getPublicApiUrl } from "@/lib/public-env";
import { renderHtml, type HtmlRenderFormat } from "@/lib/processing/html-render";

export type EdmExportFormat = HtmlRenderFormat;

export type ExportEdmHtmlInput = {
  html: string;
  format: EdmExportFormat;
  width: number;
  signal?: AbortSignal;
  fileName?: string;
};

export class EdmExportError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "EdmExportError";
    this.status = status;
  }
}

/**
 * PNG/JPG: render in the browser (no backend).
 * PDF: POST to useit-backend `POST /api/export/html-to-pdf` (Chromium, selectable text).
 */
export async function exportEdmHtml(input: ExportEdmHtmlInput): Promise<Blob> {
  if (input.format === "png" || input.format === "jpg") {
    try {
      return await renderHtml(input.html, {
        width: input.width,
        format: input.format,
        signal: input.signal,
        pixelRatio: 2,
      });
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") throw err;
      const message = err instanceof Error ? err.message : "Export failed.";
      const status = /too large|1 MB|12,000|Width must/i.test(message) ? 413 : 400;
      throw new EdmExportError(message, status);
    }
  }

  // PDF via conversion API (not Next.js)
  const response = await fetch(`${getPublicApiUrl()}/export/html-to-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      html: input.html,
      width: input.width,
    }),
    signal: input.signal,
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as {
      error?: string | { message?: string; code?: string };
      message?: string;
    };
    const nested =
      typeof result.error === "object" && result.error
        ? result.error.message
        : undefined;
    const flat = typeof result.error === "string" ? result.error : undefined;
    throw new EdmExportError(
      nested || flat || result.message || `PDF export failed (${response.status})`,
      response.status,
    );
  }

  return response.blob();
}

export function downloadBlob(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

export async function exportAndDownloadEdmHtml(input: ExportEdmHtmlInput) {
  const blob = await exportEdmHtml(input);
  const fileName = input.fileName ?? `toolpin-export-${Date.now()}.${input.format}`;
  downloadBlob(blob, fileName);
  return blob;
}

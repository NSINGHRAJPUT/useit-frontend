import { toCanvas } from "html-to-image";
import { PDFDocument } from "pdf-lib";

export type HtmlRenderFormat = "png" | "jpg" | "pdf";

export type RenderHtmlOptions = {
  width: number;
  format: HtmlRenderFormat;
  /** When true (EDM exports), PDF is one tall page matching content height. */
  singlePagePdf?: boolean;
  signal?: AbortSignal;
  pixelRatio?: number;
};

const MAX_HTML_CHARS = 1_000_000;
const MAX_HEIGHT_PX = 12_000;
const MIN_WIDTH = 360;
const MAX_WIDTH = 1440;
const A4_RATIO = 841.89 / 595.28;

const DOCUMENT_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 24px;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    color: #111;
    background: #fff;
  }
  img { max-width: 100%; height: auto; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #d4d4d8; padding: 6px 10px; text-align: left; }
  th { background: #f4f4f5; }
  pre, code { font-family: ui-monospace, Consolas, monospace; }
  pre { background: #f4f4f5; padding: 12px; overflow-x: auto; border-radius: 6px; }
  h1, h2, h3 { line-height: 1.25; }
`;

function assertNotAborted(signal?: AbortSignal) {
  if (signal?.aborted) {
    const err = new Error("Export cancelled.");
    err.name = "AbortError";
    throw err;
  }
}

function wrapHtml(html: string, width: number): string {
  const isFullDoc = /<html[\s>]/i.test(html);
  if (isFullDoc) return html;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${DOCUMENT_CSS}</style></head><body style="width:${width}px">${html}</body></html>`;
}

async function waitForAssets(root: HTMLElement) {
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined);
  }
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
    ),
  );
}

function canvasToBlob(canvas: HTMLCanvasElement, format: "png" | "jpg"): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode image."));
        else resolve(blob);
      },
      format === "jpg" ? "image/jpeg" : "image/png",
      format === "jpg" ? 0.92 : undefined,
    );
  });
}

async function canvasToPdf(
  canvas: HTMLCanvasElement,
  options: { singlePage: boolean; cssWidth: number },
): Promise<Blob> {
  const pdf = await PDFDocument.create();
  const pngBlob = await canvasToBlob(canvas, "png");
  const pngBytes = await pngBlob.arrayBuffer();
  const embedded = await pdf.embedPng(pngBytes);

  if (options.singlePage) {
    const pageWidth = options.cssWidth;
    const pageHeight = Math.max(1, (embedded.height / embedded.width) * pageWidth);
    const page = pdf.addPage([pageWidth, pageHeight]);
    page.drawImage(embedded, { x: 0, y: 0, width: pageWidth, height: pageHeight });
  } else {
    const pageWidth = 595.28;
    const pageHeight = pageWidth * A4_RATIO;
    const scale = pageWidth / embedded.width;
    const scaledFullHeight = embedded.height * scale;
    const pageCount = Math.max(1, Math.ceil(scaledFullHeight / pageHeight));

    for (let i = 0; i < pageCount; i++) {
      const page = pdf.addPage([pageWidth, pageHeight]);
      const yOffset = scaledFullHeight - (i + 1) * pageHeight;
      page.drawImage(embedded, {
        x: 0,
        y: yOffset,
        width: pageWidth,
        height: scaledFullHeight,
      });
    }
  }

  const bytes = await pdf.save({ useObjectStreams: true });
  return new Blob([Uint8Array.from(bytes)], { type: "application/pdf" });
}

/**
 * Render HTML to PNG, JPG, or PDF entirely in the browser (no server Chromium).
 * Remote images need CORS-friendly hosts or they appear blank on the canvas.
 */
export async function renderHtml(html: string, options: RenderHtmlOptions): Promise<Blob> {
  assertNotAborted(options.signal);

  if (typeof window === "undefined") {
    throw new Error("HTML rendering only works in the browser.");
  }
  if (!html.trim()) throw new Error("HTML is required.");
  if (html.length > MAX_HTML_CHARS) {
    throw new Error("HTML is too large (maximum 1 MB).");
  }

  const width = Math.round(options.width);
  if (!Number.isFinite(width) || width < MIN_WIDTH || width > MAX_WIDTH) {
    throw new Error(`Width must be an integer from ${MIN_WIDTH} to ${MAX_WIDTH}.`);
  }

  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = [
    "position:fixed",
    "left:-100000px",
    "top:0",
    "overflow:visible",
    `width:${width}px`,
    "background:#fff",
    "pointer-events:none",
    "z-index:-1",
  ].join(";");

  const iframe = document.createElement("iframe");
  iframe.setAttribute("sandbox", "allow-same-origin");
  iframe.style.cssText = `border:0;width:${width}px;height:100px;display:block;background:#fff;`;
  host.appendChild(iframe);
  document.body.appendChild(host);

  try {
    assertNotAborted(options.signal);
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Could not create render frame.");

    doc.open();
    doc.write(wrapHtml(html, width));
    doc.close();

    await new Promise<void>((resolve) => {
      if (doc.readyState === "complete") resolve();
      else iframe.addEventListener("load", () => resolve(), { once: true });
    });

    const body = doc.body;
    if (!body) throw new Error("Rendered document has no body.");

    await waitForAssets(body);
    assertNotAborted(options.signal);

    const height = Math.max(body.scrollHeight, doc.documentElement?.scrollHeight || 0, 1);
    if (height > MAX_HEIGHT_PX) {
      throw new Error("Rendered height must be between 1 and 12,000 CSS pixels.");
    }

    iframe.style.height = `${height}px`;
    // Force layout after resize
    void body.offsetHeight;

    const pixelRatio = options.pixelRatio ?? (options.format === "pdf" ? 1 : 2);
    const canvas = await toCanvas(body, {
      width,
      height,
      pixelRatio,
      backgroundColor: "#ffffff",
      cacheBust: true,
      // Skip scripts; sandbox already blocks them
    });

    assertNotAborted(options.signal);

    if (options.format === "pdf") {
      return canvasToPdf(canvas, {
        singlePage: options.singlePagePdf !== false,
        cssWidth: width,
      });
    }

    return canvasToBlob(canvas, options.format);
  } finally {
    host.remove();
  }
}

/** Convenience: wrap markdown/HTML body for document-style PDF export (A4 pages). */
export async function renderDocumentHtmlToPdf(
  htmlBody: string,
  options?: { width?: number; signal?: AbortSignal },
): Promise<Blob> {
  const width = options?.width ?? 794; // ~A4 at 96dpi
  return renderHtml(`<style>${DOCUMENT_CSS}</style>${htmlBody}`, {
    width,
    format: "pdf",
    singlePagePdf: false,
    signal: options?.signal,
    pixelRatio: 2,
  });
}

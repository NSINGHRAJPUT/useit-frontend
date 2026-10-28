export type EdmExportFormat = "png" | "jpg" | "pdf";

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

export async function exportEdmHtml(input: ExportEdmHtmlInput): Promise<Blob> {
  const response = await fetch("/api/export-edm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      html: input.html,
      format: input.format,
      width: input.width,
    }),
    signal: input.signal,
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    throw new EdmExportError(result.error || `Export failed (${response.status})`, response.status);
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

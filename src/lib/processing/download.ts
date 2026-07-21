import type { ProcessOutput } from "./types";

export function toDownloadUrl(output: ProcessOutput): string {
  return URL.createObjectURL(output.blob);
}

export function revokeDownloadUrl(url: string): void {
  if (url.startsWith("blob:")) URL.revokeObjectURL(url);
}

export function triggerDownload(url: string, fileName: string): void {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
}

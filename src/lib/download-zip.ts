import JSZip from "jszip";
import type { ToolResult } from "@/components/tools/download-card";

function uniqueZipName(fileName: string, used: Set<string>) {
  if (!used.has(fileName)) {
    used.add(fileName);
    return fileName;
  }

  const dot = fileName.lastIndexOf(".");
  const base = dot > 0 ? fileName.slice(0, dot) : fileName;
  const ext = dot > 0 ? fileName.slice(dot) : "";

  let index = 2;
  let candidate = `${base} (${index})${ext}`;
  while (used.has(candidate)) {
    index += 1;
    candidate = `${base} (${index})${ext}`;
  }

  used.add(candidate);
  return candidate;
}

export async function downloadResultsAsZip(results: ToolResult[], zipFileName: string) {
  const zip = new JSZip();
  const usedNames = new Set<string>();

  await Promise.all(
    results.map(async (result) => {
      const response = await fetch(result.downloadUrl, { credentials: "include" });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${result.fileName}`);
      }
      const buffer = await response.arrayBuffer();
      zip.file(uniqueZipName(result.fileName, usedNames), buffer);
    }),
  );

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = zipFileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

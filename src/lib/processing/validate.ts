import type { ToolDefinition } from "@toolkit-pro/shared-types";

const MAX_FILE_SIZE = 250 * 1024 * 1024;

const MAGIC: Array<{ mime: string; bytes: number[] }> = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/gif", bytes: [0x47, 0x49, 0x46] },
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
  { mime: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] },
  { mime: "application/zip", bytes: [0x50, 0x4b, 0x03, 0x04] },
];

async function readHeader(file: File, length = 8): Promise<Uint8Array> {
  const slice = file.slice(0, length);
  const buffer = await slice.arrayBuffer();
  return new Uint8Array(buffer);
}

function matchesMagic(header: Uint8Array, bytes: number[]) {
  return bytes.every((b, i) => header[i] === b);
}

export async function validateFiles(files: File[], tool: ToolDefinition): Promise<void> {
  if (!files.length) throw new Error("Choose a file first.");

  const maxFiles = tool.maxFiles ?? 20;
  if (files.length > maxFiles) {
    throw new Error(`Maximum ${maxFiles} files allowed.`);
  }

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File "${file.name}" exceeds the 250 MB limit.`);
    }

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (tool.acceptedFormats.length && !tool.acceptedFormats.includes(ext) && ext !== "jpeg") {
      const allowed = tool.acceptedFormats.map((f) => f.toUpperCase()).join(", ");
      throw new Error(`"${file.name}" is not an accepted format. Allowed: ${allowed}.`);
    }

    if (tool.category !== "text") {
      const header = await readHeader(file);
      const known = MAGIC.find((m) => matchesMagic(header, m.bytes));
      if (known && !tool.acceptedMimeTypes.some((m) => m === known.mime || m.startsWith(known.mime.split("/")[0]!))) {
        if (!(known.mime === "application/zip" && ext === "xlsx")) {
          // xlsx is zip-based; skip strict mime mismatch
        }
      }
    }
  }
}

export function validateText(text: string): void {
  if (!text.trim()) throw new Error("Enter text to process.");
}

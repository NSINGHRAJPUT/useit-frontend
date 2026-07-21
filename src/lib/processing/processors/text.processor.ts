import { md5 } from "js-md5";
import { marked } from "marked";
import QRCode from "qrcode";
import type { ProcessInput, ProcessOutput } from "../types";

function textOutput(fileName: string, content: string, mimeType = "text/plain"): ProcessOutput {
  const blob = new Blob([content], { type: mimeType });
  return {
    blob,
    fileName,
    mimeType,
    inputSize: new TextEncoder().encode(content).length,
    outputSize: blob.size,
  };
}

async function md5Hash(text: string): Promise<string> {
  return md5(text);
}

export async function processTextTool(input: ProcessInput): Promise<ProcessOutput> {
  const text = input.options.text ?? "";
  if (!text.trim()) throw new Error("Enter text to process.");
  const slug = input.tool.slug;
  const inputSize = new TextEncoder().encode(text).length;

  if (slug === "json-formatter") {
    const parsed = JSON.parse(text);
    const out = JSON.stringify(parsed, null, 2);
    return { ...textOutput("formatted.json", out, "application/json"), inputSize };
  }
  if (slug === "json-minify") {
    const parsed = JSON.parse(text);
    const out = JSON.stringify(parsed);
    return { ...textOutput("minified.json", out, "application/json"), inputSize };
  }
  if (slug === "json-to-csv") {
    const rows = JSON.parse(text);
    if (!Array.isArray(rows)) throw new Error("JSON must be an array of objects.");
    const keys = Object.keys(rows[0] ?? {});
    const csv = [keys.join(","), ...rows.map((r: Record<string, unknown>) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
    return { ...textOutput("output.csv", csv, "text/csv"), inputSize };
  }
  if (slug === "csv-to-json") {
    const lines = text.trim().split("\n");
    const headers = lines[0]!.split(",").map((h) => h.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      return Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim() ?? ""]));
    });
    const out = JSON.stringify(data, null, 2);
    return { ...textOutput("output.json", out, "application/json"), inputSize };
  }
  if (slug === "base64-encode") {
    const out = btoa(unescape(encodeURIComponent(text)));
    return { ...textOutput("encoded.txt", out), inputSize };
  }
  if (slug === "base64-decode") {
    const out = decodeURIComponent(escape(atob(text)));
    return { ...textOutput("decoded.txt", out), inputSize };
  }
  if (slug === "url-encode") return { ...textOutput("encoded.txt", encodeURIComponent(text)), inputSize };
  if (slug === "url-decode") return { ...textOutput("decoded.txt", decodeURIComponent(text)), inputSize };
  if (slug === "md5-hash") return { ...textOutput("hash.txt", await md5Hash(text)), inputSize };
  if (slug === "sha256-hash") {
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    const out = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return { ...textOutput("hash.txt", out), inputSize };
  }
  if (slug === "qr-code-generator") {
    const dataUrl = await QRCode.toDataURL(text, { width: 512, margin: 2 });
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return { blob, fileName: "qrcode.png", mimeType: "image/png", inputSize, outputSize: blob.size };
  }
  if (slug === "word-counter") {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const out = `Words: ${words}\nCharacters: ${text.length}\nLines: ${text.split("\n").length}`;
    return { ...textOutput("word-count.txt", out), inputSize };
  }
  if (slug === "case-converter") {
    const mode = String(input.options.case ?? "upper");
    const converted =
      mode === "lower"
        ? text.toLowerCase()
        : mode === "title"
          ? text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          : mode === "sentence"
            ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
            : text.toUpperCase();
    return { ...textOutput("converted.txt", converted), inputSize };
  }
  if (slug === "markdown-to-html") {
    const html = marked.parse(text, { async: false }) as string;
    const out = `<!DOCTYPE html><html><body>${html}</body></html>`;
    return { ...textOutput("output.html", out, "text/html"), inputSize };
  }
  if (slug === "html-to-text") {
    const stripped = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return { ...textOutput("output.txt", stripped), inputSize };
  }

  throw new Error(`Text tool "${slug}" is not implemented.`);
}

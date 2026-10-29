import mammoth from "mammoth";
import { marked } from "marked";
import * as XLSX from "xlsx";
import type { ProcessInput, ProcessOutput } from "../types";
import { renderDocumentHtmlToPdf } from "../html-render";
import { buildDocxFromParagraphs, extractPdfParagraphs } from "../pdf-to-docx";

function outputFromBlob(
  blob: Blob,
  fileName: string,
  mimeType: string,
  inputSize: number,
): ProcessOutput {
  return { blob, fileName, mimeType, inputSize, outputSize: blob.size };
}

async function markdownToHtml(markdown: string): Promise<string> {
  const html = await marked.parse(markdown, { async: true });
  return typeof html === "string" ? html : String(html);
}

export async function processDocumentTool(input: ProcessInput): Promise<ProcessOutput> {
  const slug = input.tool.slug;

  // md-to-pdf can be driven by uploaded .md or pasted text in options.text
  if (slug === "md-to-pdf") {
    let markdown = input.options.text?.trim() ?? "";
    let inputSize = markdown.length;
    if (!markdown) {
      const file = input.files[0];
      if (!file) throw new Error("Choose a Markdown file first.");
      markdown = await file.text();
      inputSize = file.size;
    }
    if (!markdown.trim()) throw new Error("Markdown is empty.");
    const bodyHtml = await markdownToHtml(markdown);
    const blob = await renderDocumentHtmlToPdf(bodyHtml);
    const baseName = input.files[0]?.name.replace(/\.[^.]+$/, "") || "markdown";
    return outputFromBlob(blob, `${baseName}.pdf`, "application/pdf", inputSize);
  }

  const file = input.files[0];
  if (!file) throw new Error("Choose a file first.");
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const buffer = await file.arrayBuffer();

  if (slug === "docx-to-text") {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    const blob = new Blob([result.value], { type: "text/plain" });
    return outputFromBlob(blob, `${baseName}.txt`, "text/plain", file.size);
  }

  if (slug === "docx-to-pdf") {
    const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
    const blob = await renderDocumentHtmlToPdf(result.value || "<p></p>");
    return outputFromBlob(blob, `${baseName}.pdf`, "application/pdf", file.size);
  }

  if (slug === "xlsx-to-csv") {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]!]!;
    const csv = XLSX.utils.sheet_to_csv(sheet);
    const blob = new Blob([csv], { type: "text/csv" });
    return outputFromBlob(blob, `${baseName}.csv`, "text/csv", file.size);
  }

  if (slug === "xlsx-to-pdf") {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sections = workbook.SheetNames.map((name) => {
      const sheet = workbook.Sheets[name]!;
      const table = XLSX.utils.sheet_to_html(sheet, { id: `sheet-${name}`, editable: false });
      return `<h2>${name}</h2>${table}`;
    });
    const blob = await renderDocumentHtmlToPdf(sections.join("\n") || "<p>Empty workbook</p>");
    return outputFromBlob(blob, `${baseName}.pdf`, "application/pdf", file.size);
  }

  if (slug === "csv-to-xlsx") {
    const text = await file.text();
    const workbook = XLSX.read(text, { type: "string" });
    const out = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return outputFromBlob(
      blob,
      `${baseName}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      file.size,
    );
  }

  if (slug === "pdf-to-docx") {
    const paragraphs = await extractPdfParagraphs(file);
    const blob = await buildDocxFromParagraphs(paragraphs);
    return outputFromBlob(
      blob,
      `${baseName}.docx`,
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      file.size,
    );
  }

  throw new Error(`Document tool "${slug}" requires server processing.`);
}

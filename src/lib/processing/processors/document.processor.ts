import mammoth from "mammoth";
import * as XLSX from "xlsx";
import type { ProcessInput, ProcessOutput } from "../types";

export async function processDocumentTool(input: ProcessInput): Promise<ProcessOutput> {
  const file = input.files[0];
  if (!file) throw new Error("Choose a file first.");
  const slug = input.tool.slug;
  const baseName = file.name.replace(/\.[^.]+$/, "");
  const buffer = await file.arrayBuffer();

  if (slug === "docx-to-text") {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    const text = result.value;
    const blob = new Blob([text], { type: "text/plain" });
    return {
      blob,
      fileName: `${baseName}.txt`,
      mimeType: "text/plain",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "xlsx-to-csv") {
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]!]!;
    const csv = XLSX.utils.sheet_to_csv(sheet);
    const blob = new Blob([csv], { type: "text/csv" });
    return {
      blob,
      fileName: `${baseName}.csv`,
      mimeType: "text/csv",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  if (slug === "csv-to-xlsx") {
    const text = await file.text();
    const workbook = XLSX.read(text, { type: "string" });
    const out = XLSX.write(workbook, { type: "array", bookType: "xlsx" });
    const blob = new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    return {
      blob,
      fileName: `${baseName}.xlsx`,
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      inputSize: file.size,
      outputSize: blob.size,
    };
  }

  throw new Error(`Document tool "${slug}" requires server processing.`);
}

#!/usr/bin/env node
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as XLSX from "xlsx";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "test-fixtures");
mkdirSync(dir, { recursive: true });

writeFileSync(
  join(dir, "sample.png"),
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "base64",
  ),
);

const png = readFileSync(join(dir, "sample.png"));
writeFileSync(join(dir, "sample.jpg"), png);
writeFileSync(join(dir, "sample.webp"), png);
writeFileSync(join(dir, "sample.gif"), png);
writeFileSync(join(dir, "sample.bmp"), png);

const pdf = await PDFDocument.create();
const page = pdf.addPage([200, 200]);
const font = await pdf.embedFont(StandardFonts.Helvetica);
page.drawText("ToolKit Pro test PDF", { x: 20, y: 160, size: 12, font });
writeFileSync(join(dir, "sample.pdf"), await pdf.save());

const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([
  ["name", "score"],
  ["Alice", 90],
  ["Bob", 85],
]);
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
writeFileSync(join(dir, "sample.xlsx"), XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));

console.log("Generated test fixtures in", dir);

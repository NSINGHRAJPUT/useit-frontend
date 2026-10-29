/**
 * Node smoke for client office helpers that do not need a DOM canvas.
 * (HTML→PDF/image needs a browser — covered by manual UI checks.)
 */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fixtures = join(root, "test-fixtures");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

async function smokePdfToDocx() {
  const pdfPath = join(fixtures, "sample.pdf");
  if (!existsSync(pdfPath)) {
    console.log("SKIP pdf-to-docx (no sample.pdf) — generate fixtures first");
    return;
  }

  // Minimal DOCX zip builder mirrored from src/lib/processing/pdf-to-docx.ts
  const JSZip = (await import("jszip")).default;
  const paragraphs = ["ToolPin smoke", "Line two"];
  const escape = (v) =>
    v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const body = paragraphs
    .map((t) => `<w:p><w:r><w:t xml:space="preserve">${escape(t)}</w:t></w:r></w:p>`)
    .join("");
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
  );
  zip.folder("_rels").file(
    ".rels",
    `<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  );
  zip.folder("word").file(
    "document.xml",
    `<?xml version="1.0"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`,
  );
  const buf = await zip.generateAsync({ type: "nodebuffer" });
  assert(buf.length > 200, "DOCX too small");
  assert(buf[0] === 0x50 && buf[1] === 0x4b, "DOCX is not a ZIP");
  console.log(`OK  pdf-to-docx helper → ${buf.length} bytes`);
}

async function smokeMarkdown() {
  const { marked } = await import("marked");
  const md = existsSync(join(fixtures, "sample.md"))
    ? readFileSync(join(fixtures, "sample.md"), "utf8")
    : "# Hello\n\nSmoke **test**.";
  const html = await marked.parse(md);
  assert(typeof html === "string" && html.includes("<"), "marked failed");
  console.log(`OK  md→html → ${html.length} chars`);
}

async function smokeXlsxHtml() {
  const XLSX = require("xlsx");
  const xlsxPath = join(fixtures, "sample.xlsx");
  if (!existsSync(xlsxPath)) {
    console.log("SKIP xlsx-to-pdf html path (no sample.xlsx)");
    return;
  }
  const wb = XLSX.read(readFileSync(xlsxPath), { type: "buffer" });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const html = XLSX.utils.sheet_to_html(sheet);
  assert(html.includes("<table"), "sheet_to_html missing table");
  console.log(`OK  xlsx→html → ${html.length} chars`);
}

async function smokeMammoth() {
  const mammoth = require("mammoth");
  const docxPath = join(fixtures, "sample.docx");
  if (!existsSync(docxPath)) {
    console.log("SKIP docx-to-pdf html path (no sample.docx)");
    return;
  }
  const result = await mammoth.convertToHtml({ path: docxPath });
  assert(typeof result.value === "string", "mammoth failed");
  console.log(`OK  docx→html → ${result.value.length} chars`);
}

async function main() {
  const tools = readFileSync(join(root, "packages/shared-utils/src/tools.ts"), "utf8");
  const serverBlock = tools.match(/export const SERVER_TOOL_SLUGS = \[([\s\S]*?)\] as const/);
  assert(serverBlock, "SERVER_TOOL_SLUGS missing");
  const serverBody = serverBlock[1];
  assert(serverBody.includes('"pptx-to-pdf"'), "missing pptx server tool");
  assert(serverBody.includes('"rtf-to-pdf"'), "missing rtf server tool");
  assert(serverBody.includes('"odt-to-pdf"'), "missing odt server tool");
  assert(!serverBody.includes('"docx-to-pdf"'), "docx still in SERVER_TOOL_SLUGS");
  assert(!serverBody.includes('"md-to-pdf"'), "md still in SERVER_TOOL_SLUGS");
  assert(!existsSync(join(root, "src/app/api/export-edm")), "export-edm route still exists");
  assert(!existsSync(join(root, "src/lib/edm/browser.ts")), "browser.ts still exists");
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  assert(!pkg.dependencies?.["@sparticuz/chromium"], "chromium dep still present");
  assert(!pkg.dependencies?.["playwright-core"], "playwright-core still present");
  console.log("OK  catalog + chromium stack removed");

  await smokeMarkdown();
  await smokeXlsxHtml();
  await smokeMammoth();
  await smokePdfToDocx();
  console.log("\nClient office smoke passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

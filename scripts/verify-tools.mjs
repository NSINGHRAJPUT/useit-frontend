#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SERVER_SET = new Set(["pptx-to-pdf", "rtf-to-pdf", "odt-to-pdf"]);

function loadToolSlugs() {
  const content = readFileSync(join(root, "packages/shared-utils/src/tools.ts"), "utf8");
  const patterns = [
    /imageConvert\(\s*"([^"]+)"/g,
    /textTool\(\s*"([^"]+)"/g,
    /documentTool\(\s*\n?\s*"([^"]+)"/g,
    /slug: "([^"]+)"/g,
  ];
  const slugs = new Set();
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      slugs.add(match[1]);
    }
  }
  return [...slugs];
}

async function main() {
  const slugs = loadToolSlugs();
  console.log(`Found ${slugs.length} tool slugs in catalog`);

  if (slugs.length !== 64) {
    console.error(`Expected 64 tools, found ${slugs.length}`);
    process.exit(1);
  }

  const serverTools = slugs.filter((s) => SERVER_SET.has(s));
  const clientTools = slugs.filter((s) => !SERVER_SET.has(s));

  console.log(`Client tools: ${clientTools.length} (expected 61)`);
  console.log(`Server tools: ${serverTools.length} (expected 3)`);

  if (clientTools.length !== 61 || serverTools.length !== 3) {
    console.error("Tool routing split mismatch");
    process.exit(1);
  }

  const json = readFileSync(join(root, "test-fixtures/sample.json"), "utf8");
  JSON.parse(json);
  const formatted = JSON.stringify(JSON.parse(json), null, 2);
  if (!formatted.includes("\n")) throw new Error("JSON formatter check failed");

  const csv = readFileSync(join(root, "test-fixtures/sample.csv"), "utf8");
  if (csv.trim().split("\n").length < 2) throw new Error("CSV fixture invalid");

  console.log("✓ Tool catalog: 64 tools, 61 client / 3 server");
  console.log("✓ Text fixtures valid");
  console.log("All automated smoke checks passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

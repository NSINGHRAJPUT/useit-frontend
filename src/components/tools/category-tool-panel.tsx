"use client";

import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { CropImageTool } from "./crop-image-tool";
import { ImagesToPdfTool } from "./images-to-pdf-tool";
import { PdfPagesTool } from "./pdf-pages-tool";
import { SplitPdfTool } from "./split-pdf-tool";
import { TextTool } from "./text-tool";
import { UploadTool } from "./upload-tool";

export function CategoryToolPanel({ tool }: { tool: ToolDefinition }) {
  if (tool.inputType === "text") {
    return <TextTool tool={tool} />;
  }
  if (tool.slug === "crop-image") {
    return <CropImageTool tool={tool} />;
  }
  if (tool.slug === "images-to-pdf") {
    return <ImagesToPdfTool tool={tool} />;
  }
  if (tool.slug === "split-pdf") {
    return <SplitPdfTool tool={tool} />;
  }
  if (tool.slug === "delete-pages-pdf" || tool.slug === "extract-pages-pdf") {
    return <PdfPagesTool tool={tool} />;
  }
  return <UploadTool tool={tool} />;
}

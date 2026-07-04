"use client";

import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { TextTool } from "./text-tool";
import { UploadTool } from "./upload-tool";

export function CategoryToolPanel({ tool }: { tool: ToolDefinition }) {
  if (tool.inputType === "text") {
    return <TextTool tool={tool} />;
  }
  return <UploadTool tool={tool} />;
}

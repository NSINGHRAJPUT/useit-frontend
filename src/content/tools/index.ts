import { documentToolContent } from "./document";
import { imageToolContent } from "./image";
import { pdfToolContent } from "./pdf";
import { textToolContent } from "./text";
import type { ToolSeoMap } from "./types";

export const toolSeoContent: ToolSeoMap = {
  ...imageToolContent,
  ...pdfToolContent,
  ...documentToolContent,
  ...textToolContent,
};

export type { ToolSeoContent, ToolSeoMap } from "./types";

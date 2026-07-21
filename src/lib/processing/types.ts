import type { ToolDefinition } from "@toolkit-pro/shared-types";

export interface ProcessOptions {
  quality?: number;
  width?: number;
  height?: number;
  angle?: number;
  text?: string;
  case?: string;
  left?: number;
  top?: number;
  cropWidth?: number;
  cropHeight?: number;
  pages?: number[];
  splitMode?: "pages" | "ranges" | "every";
  splitRanges?: string;
  splitEvery?: number;
  pdfLayout?: "one-per-page" | "custom" | "auto";
  pdfImagesPerPage?: number;
  pdfMargin?: number;
  pdfPageSize?: "a4" | "letter" | "image";
  onProgress?: (current: number, total: number, label: string) => void;
}

export interface ProcessOutput {
  blob: Blob;
  fileName: string;
  mimeType: string;
  inputSize: number;
  outputSize: number;
}

export interface ProcessInput {
  tool: ToolDefinition;
  files: File[];
  options: ProcessOptions;
}

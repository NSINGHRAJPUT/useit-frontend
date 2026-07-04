import type { LucideIcon } from "lucide-react";
import type { ToolCategory, ToolDefinition, ToolOperation } from "@toolkit-pro/shared-types";
import {
  AlignLeft,
  BookOpen,
  Braces,
  Code2,
  Crop,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileType,
  FlipHorizontal,
  Hash,
  Image,
  Link2,
  Merge,
  Minimize2,
  Presentation,
  QrCode,
  RotateCw,
  ScanLine,
  Scissors,
  Sheet,
  Shrink,
  Split,
  Table,
  Type,
  WholeWord,
  Wand2,
} from "lucide-react";

const slugIcons: Record<string, LucideIcon> = {
  "jpg-to-png": Image,
  "png-to-jpg": FileImage,
  "jpg-to-webp": Image,
  "png-to-webp": FileImage,
  "webp-to-jpg": Image,
  "webp-to-png": Image,
  "jpg-to-gif": Image,
  "gif-to-jpg": FileImage,
  "png-to-gif": Image,
  "gif-to-png": FileImage,
  "webp-to-avif": Image,
  "avif-to-webp": Image,
  "jpg-to-tiff": Image,
  "tiff-to-jpg": FileImage,
  "bmp-to-png": Image,
  "png-to-avif": Image,
  "compress-jpg": Shrink,
  "compress-png": Shrink,
  "compress-webp": Shrink,
  "compress-gif": Shrink,
  "resize-image": ScanLine,
  "crop-image": Crop,
  "rotate-image": RotateCw,
  "flip-image": FlipHorizontal,
  "strip-metadata": Wand2,
  "merge-pdf": Merge,
  "split-pdf": Split,
  "compress-pdf": Shrink,
  "rotate-pdf": RotateCw,
  "delete-pages-pdf": Scissors,
  "pdf-to-jpg": FileImage,
  "pdf-to-png": FileImage,
  "images-to-pdf": FileType,
  "pdf-to-text": ScanLine,
  "extract-pages-pdf": Scissors,
  "docx-to-pdf": BookOpen,
  "pptx-to-pdf": Presentation,
  "xlsx-to-pdf": FileSpreadsheet,
  "pdf-to-docx": BookOpen,
  "xlsx-to-csv": Table,
  "csv-to-xlsx": Sheet,
  "docx-to-text": AlignLeft,
  "md-to-pdf": FileCode,
  "rtf-to-pdf": FileText,
  "odt-to-pdf": BookOpen,
  "json-formatter": Braces,
  "json-minify": Minimize2,
  "json-to-csv": Table,
  "csv-to-json": Braces,
  "base64-encode": Code2,
  "base64-decode": Code2,
  "url-encode": Link2,
  "url-decode": Link2,
  "md5-hash": Hash,
  "sha256-hash": Hash,
  "qr-code-generator": QrCode,
  "word-counter": WholeWord,
  "case-converter": Type,
  "markdown-to-html": FileCode,
  "html-to-text": Code2,
};

const operationIcons: Record<ToolOperation, LucideIcon> = {
  convert: Wand2,
  compress: Shrink,
  resize: ScanLine,
  crop: Crop,
  merge: Merge,
  split: Split,
  rotate: RotateCw,
  transform: Code2,
  extract: Scissors,
};

const categoryIcons: Record<ToolCategory, LucideIcon> = {
  image: Image,
  pdf: FileType,
  document: BookOpen,
  text: Braces,
};

export function getToolIcon(tool: Pick<ToolDefinition, "slug" | "category" | "operation">): LucideIcon {
  return slugIcons[tool.slug] ?? operationIcons[tool.operation] ?? categoryIcons[tool.category] ?? FileText;
}

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category as ToolCategory] ?? FileText;
}

export const categoryMeta: Record<
  string,
  { icon: LucideIcon; gradient: string }
> = {
  image: {
    icon: Image,
    gradient: "from-amber-500/20 via-gold/10 to-transparent",
  },
  pdf: {
    icon: FileType,
    gradient: "from-orange-500/15 via-gold/10 to-transparent",
  },
  document: {
    icon: BookOpen,
    gradient: "from-yellow-500/15 via-gold/10 to-transparent",
  },
  text: {
    icon: Braces,
    gradient: "from-lime-500/10 via-gold/10 to-transparent",
  },
};

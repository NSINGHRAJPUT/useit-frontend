import { allTools } from "@toolkit-pro/shared-utils";
import { getPublicApiUrl, getPublicContactEmail, getPublicSiteUrl } from "@/lib/public-env";

export const siteConfig = {
  name: "ToolPin",
  get url() {
    return getPublicSiteUrl();
  },
  get apiUrl() {
    return getPublicApiUrl();
  },
  get contactEmail() {
    return getPublicContactEmail();
  },
  description:
    "Free online image, PDF, document, and text tools. Convert, compress, merge, and format files in your browser on toolpin.online — no watermark, no signup.",
};

export const tools = allTools;

export const categories = [
  {
    name: "Image Tools",
    slug: "image",
    status: "live",
    description:
      "Convert JPG, PNG, WebP, GIF, AVIF, TIFF, and BMP, then compress, resize, crop, rotate, flip, or strip EXIF — all in the browser.",
    longDescription:
      "ToolPin image tools help you prepare photos and graphics for the web, print, WhatsApp, and email. Most conversions run locally so originals never leave your device. Use them to switch formats, shrink file size for faster pages, or remove camera metadata before you share a picture.",
  },
  {
    name: "PDF Tools",
    slug: "pdf",
    status: "live",
    description:
      "Merge, split, compress, rotate, extract, or delete PDF pages, turn pages into images, or build a PDF from photos.",
    longDescription:
      "The PDF suite covers everyday document chores without installing Adobe Acrobat. Combine scanned pages, pull a chapter out of a large file, compress a bulky report for email, or export pages as JPG/PNG. Processing stays in your browser except where noted on a specific tool.",
  },
  {
    name: "Document Tools",
    slug: "document",
    status: "live",
    description:
      "Convert Word, Excel, PowerPoint, Markdown, RTF, and ODT files, plus CSV and plain-text extraction.",
    longDescription:
      "Office conversions that need high-fidelity layout run on a temporary server and expire after download. Spreadsheet and text extractions (XLSX ↔ CSV, DOCX to text) stay on your device. Use these tools when you need a shareable PDF or editable data without installing Microsoft Office or LibreOffice.",
  },
  {
    name: "Text & Data Tools",
    slug: "text",
    status: "live",
    description:
      "Format JSON, convert CSV, encode Base64 and URLs, hash text, generate QR codes, and count words.",
    longDescription:
      "Developer and writing utilities run entirely in the browser. Pretty-print or minify JSON, turn tables into JSON, generate checksums, build a QR code for a link, or check essay length. Nothing you paste is stored on ToolPin servers.",
  },
];

export const faqs = [
  [
    "Are my files uploaded to a server?",
    "Most ToolPin tools process files entirely in your browser — they never leave your device. Only a handful of Office-to-PDF conversions (Word, PowerPoint, Excel, Markdown, RTF, ODT, and PDF-to-Word) need a short-lived server upload. Those files are deleted after the download link expires.",
  ],
  [
    "Is ToolPin free to use?",
    "Yes. Every tool on toolpin.online is free, with no account, watermark, or daily conversion cap for browser-based tools. Individual files up to 250 MB are supported for local processing.",
  ],
  [
    "Which file types are supported?",
    "Images (JPG, PNG, WebP, GIF, AVIF, TIFF, BMP), PDFs, Office documents (DOCX, PPTX, XLSX, ODT, RTF), Markdown, CSV, and text/data utilities such as JSON, Base64, and QR codes.",
  ],
  [
    "How does PDF processing work?",
    "PDF merge, split, compress, rotate, page extract/delete, and PDF-to-image tools run locally in your browser with modern web APIs. Results download instantly with no upload required.",
  ],
  [
    "Do I need to create an account?",
    "No. Open a tool, drop a file or paste text, and download the result. We do not require signup to convert, compress, or format files.",
  ],
  [
    "What are the file size limits?",
    "Browser-based tools support individual files up to 250 MB, depending on available memory on your device. Server-side Office conversions may use a lower limit shown on the tool page.",
  ],
  [
    "Does ToolPin show ads?",
    "Yes. Free tools are supported by Google AdSense. Ads use cookies as described in our Privacy Policy and Cookie Policy. You can control advertising cookies in your browser settings.",
  ],
  [
    "Is there a watermark on converted files?",
    "No. ToolPin never stamps a watermark on images, PDFs, or documents you process.",
  ],
];

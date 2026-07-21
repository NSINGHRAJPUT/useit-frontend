import { allTools } from "@toolkit-pro/shared-utils";
import { getPublicApiUrl, getPublicSiteUrl } from "@/lib/public-env";

export const siteConfig = {
  name: "ToolKit Pro",
  get url() {
    return getPublicSiteUrl();
  },
  get apiUrl() {
    return getPublicApiUrl();
  },
  description:
    "Free online conversion tools for images, PDFs, documents, and text — most processing happens locally in your browser.",
};

export const tools = allTools;

export const categories = [
  {
    name: "Image Tools",
    slug: "image",
    status: "live",
    description: "Convert, compress, resize, crop, and optimize images in your browser.",
  },
  {
    name: "PDF Tools",
    slug: "pdf",
    status: "live",
    description: "Merge, split, compress, and convert PDF files locally.",
  },
  {
    name: "Document Tools",
    slug: "document",
    status: "live",
    description: "Convert Word, Excel, PowerPoint, and other documents.",
  },
  {
    name: "Text & Data Tools",
    slug: "text",
    status: "live",
    description: "Format JSON, encode data, generate hashes, and more.",
  },
];

export const faqs = [
  [
    "Are my files uploaded to a server?",
    "Most tools process files entirely in your browser — files never leave your device. Only Office-to-PDF conversions require a server upload.",
  ],
  [
    "Which file types are supported?",
    "We support images (JPG, PNG, WebP, GIF, and more), PDFs, office documents, and text/data utilities.",
  ],
  [
    "How does PDF processing work?",
    "PDF tools run locally in your browser using modern web APIs. Results download instantly with no upload required.",
  ],
  [
    "What are the file size limits?",
    "Individual files up to 250 MB are supported for browser-based processing.",
  ],
];

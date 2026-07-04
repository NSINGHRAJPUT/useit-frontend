import { allTools, planLimits } from "@toolkit-pro/shared-utils";
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
    "Professional online conversion tools for images, PDFs, documents, and text — fast, secure, and free to start.",
};

export const tools = allTools;
export const plans = Object.values(planLimits);

export const categories = [
  {
    name: "Image Tools",
    slug: "image",
    status: "live",
    description: "Convert, compress, resize, crop, and optimize images.",
  },
  {
    name: "PDF Tools",
    slug: "pdf",
    status: "live",
    description: "Merge, split, compress, and convert PDF files.",
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
    "Are my files stored permanently?",
    "No. Processed files are stored temporarily and conversion records expire automatically.",
  ],
  [
    "Which file types are supported?",
    "We support images (JPG, PNG, WebP, GIF, and more), PDFs, office documents, and text/data utilities.",
  ],
  [
    "How does PDF processing work?",
    "PDF and document tools run in a background queue. You receive a download link when processing completes.",
  ],
  [
    "What are the upload limits?",
    "Free users can upload up to 25 MB, Pro up to 100 MB, and Business up to 250 MB per file.",
  ],
];

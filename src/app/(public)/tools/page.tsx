import type { Metadata } from "next";
import { Suspense } from "react";
import ToolsPageClient from "./tools-page-client";
import { buildPageMetadata } from "@/lib/seo";
import { tools } from "@/constants/site";

export const metadata: Metadata = buildPageMetadata({
  title: "All Conversion Tools",
  description: `Browse ${tools.length} free ApkaOS image, PDF, document, and text tools. Convert, compress, merge, and format files in your browser.`,
  path: "/tools",
  keywords: ["online conversion tools", "image converter", "pdf tools", "document converter", "apkaos tools"],
});

export default function ToolsPage() {
  return (
    <Suspense>
      <ToolsPageClient />
    </Suspense>
  );
}

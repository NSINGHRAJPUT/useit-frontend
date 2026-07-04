import type { Metadata } from "next";
import ToolsPageClient from "./tools-page-client";

export const metadata: Metadata = {
  title: "Conversion Tools Directory",
  description: "Browse ToolKit Pro image, PDF, document, and text conversion tools.",
};

export default function ToolsPage() {
  return <ToolsPageClient />;
}

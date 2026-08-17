import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ToolPin",
    short_name: "ToolPin",
    description: "Free online image, PDF, document, and text conversion tools.",
    start_url: "/",
    display: "standalone",
    background_color: "#120f22",
    theme_color: "#e4c36a",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

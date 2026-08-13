export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-4634994555998964";

export const ADSENSE_PUBLISHER = ADSENSE_CLIENT.replace(/^ca-/, "");

export const ADSENSE_SCRIPT_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export const ADSENSE_SLOTS = {
  header: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER?.trim() || "",
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR?.trim() || "",
  inArticle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_ARTICLE?.trim() || "",
  afterTool: process.env.NEXT_PUBLIC_ADSENSE_SLOT_AFTER_TOOL?.trim() || "",
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER?.trim() || "",
  inFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_FEED?.trim() || "",
} as const;

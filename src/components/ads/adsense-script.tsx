"use client";

import Script from "next/script";
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from "@/constants/adsense";

export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={ADSENSE_SCRIPT_SRC}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

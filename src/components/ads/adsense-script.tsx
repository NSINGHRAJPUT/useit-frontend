"use client";

import { useEffect } from "react";
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from "@/constants/adsense";

const SCRIPT_ID = "google-adsense";

/**
 * Loads AdSense with a plain DOM script tag.
 * Avoids next/script's data-nscript attribute, which AdSense rejects.
 */
export function AdSenseScript() {
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = ADSENSE_SCRIPT_SRC;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}

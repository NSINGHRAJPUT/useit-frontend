"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/constants/adsense";

type AdFormat = "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";

interface AdSlotProps {
  slot?: string;
  format?: AdFormat;
  className?: string;
  label?: string;
}

export function AdSlot({
  slot,
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || !slot || pushed.current) return;
    try {
      const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle ?? [];
      (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = adsbygoogle;
      adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // AdSense may be blocked by an extension.
    }
  }, [slot]);

  if (!ADSENSE_CLIENT || !slot) return null;

  return (
    <aside
      className={`ad-slot ${className}`.trim()}
      aria-label={label}
    >
      <p className="ad-slot-label">{label}</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

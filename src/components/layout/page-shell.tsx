import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "@/constants/adsense";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {ADSENSE_SLOTS.header ? (
        <div className="border-b border-gold/10 bg-background/40">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <AdSlot slot={ADSENSE_SLOTS.header} format="horizontal" />
          </div>
        </div>
      ) : null}
      <main className="min-h-screen">{children}</main>
      {ADSENSE_SLOTS.footer ? (
        <div className="border-t border-gold/10 bg-background/40">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <AdSlot slot={ADSENSE_SLOTS.footer} format="horizontal" />
          </div>
        </div>
      ) : null}
      <SiteFooter />
    </>
  );
}

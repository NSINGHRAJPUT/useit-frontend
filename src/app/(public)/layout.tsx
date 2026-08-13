import { PageShell } from "@/components/layout/page-shell";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { CookieBanner } from "@/components/ads/cookie-banner";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdSenseScript />
      <PageShell>{children}</PageShell>
      <CookieBanner />
    </>
  );
}

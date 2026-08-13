import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Refund Policy",
  description: "ApkaOS tools on apkaos.in are free. There are no paid plans or charges to refund.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" updated="13 August 2026">
      <p>
        ApkaOS file tools are free to use. We do not sell subscriptions, conversion credits, or paid downloads on
        apkaos.in at this time. There is nothing to charge and therefore nothing to refund.
      </p>
      <p>
        If a tool fails to convert a file, try a smaller file, another browser, or a different format. You can also
        write to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or use the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
      <p>
        If we introduce paid plans later, this page will be updated with refund rules before any payment is taken.
      </p>
    </LegalPage>
  );
}

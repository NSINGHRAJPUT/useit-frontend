import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "Terms for using free ToolPin file conversion tools on toolpin.online, including acceptable use and disclaimers.",
  path: "/terms-of-service",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="13 August 2026">
      <p>
        These terms govern your use of ToolPin at toolpin.online. By using a tool you agree to them. If you do not agree, do
        not use the site.
      </p>

      <h2>The service</h2>
      <p>
        ToolPin provides free browser and server utilities for converting, compressing, merging, and formatting files.
        Features may change. We do not guarantee that a conversion will be perfect for every file.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Only process files you have the right to use.</li>
        <li>Do not upload malware, illegal content, or material that infringes someone else’s rights.</li>
        <li>Do not attempt to disrupt the site, scrape in a way that harms service, or bypass security.</li>
        <li>Do not use the tools to violate applicable law in India or in your country.</li>
      </ul>

      <h2>No warranty</h2>
      <p>
        Tools are provided “as is”. We are not liable for lost files, conversion errors, or decisions you make based on
        a hash, QR code, or extracted text. Keep your own copies of important documents.
      </p>

      <h2>Intellectual property</h2>
      <p>
        ToolPin branding, layout, and original copy belong to us. You keep the rights to files you process. We do not
        claim ownership of your documents.
      </p>

      <h2>Advertising</h2>
      <p>
        The site displays Google AdSense ads. Ads are labeled. Clicking ads is optional. See the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> for advertising cookies.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, ToolPin is not liable for indirect, incidental, or consequential damages
        arising from use of the tools. Our total liability for any claim is limited to INR 0 because the service is
        free.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. Courts in India have exclusive jurisdiction, without prejudice
        to mandatory consumer protections that may apply where you live.
      </p>

      <h2>Contact</h2>
      <p>
        Questions: <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}

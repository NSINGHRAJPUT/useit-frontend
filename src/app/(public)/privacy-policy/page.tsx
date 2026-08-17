import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How ToolPin handles files, cookies, Google AdSense advertising, and your rights under Indian data protection law.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="13 August 2026">
      <p>
        This policy explains how ToolPin (“we”, “us”) treats information when you use toolpin.online. We designed the product
        so most files never reach our servers. Please also read the <Link href="/cookie-policy">Cookie Policy</Link>{" "}
        and <Link href="/terms-of-service">Terms of Service</Link>.
      </p>

      <h2>Who we are</h2>
      <p>
        ToolPin is operated from India and published at {siteConfig.url}. Contact:{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>

      <h2>Files you process</h2>
      <p>
        <strong>Browser-local tools</strong> (image conversion and compression, most PDF tools, CSV/Excel helpers, and
        all text utilities) run in your browser. Those files are not uploaded to ToolPin and are not stored by us.
      </p>
      <p>
        <strong>Server tools</strong> (DOCX/PPTX/XLSX/MD/RTF/ODT to PDF, and PDF to DOCX) upload a file so we can
        convert layout accurately. We keep the upload and result only long enough to let you download, then delete
        them automatically when the link expires. Do not upload content you are not allowed to process.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Technical logs such as IP address, browser type, and pages requested, used to keep the site running and debug errors.</li>
        <li>Optional messages you send to {siteConfig.contactEmail}.</li>
        <li>Theme preference stored in a first-party cookie or local storage on your device.</li>
        <li>Advertising and measurement data collected by Google AdSense, described below.</li>
      </ul>
      <p>We do not require an account. We do not sell personal information.</p>

      <h2>Google AdSense and advertising cookies</h2>
      <p>
        We use Google AdSense (publisher ID ca-pub-4634994555998964) to show ads that fund the free tools. Google may
        use cookies, including advertising cookies, to serve ads based on your visits to this site and other sites on
        the internet. Google’s use of advertising cookies enables it and its partners to serve ads based on your visit
        to toolpin.online and/or other sites.
      </p>
      <p>
        You may opt out of personalized advertising by visiting{" "}
        <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">
          Google Ads Settings
        </a>{" "}
        or{" "}
        <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
          www.aboutads.info
        </a>
        . Third parties, including Google, use cookies to serve ads based on a user’s prior visits.
      </p>
      <p>
        For more detail see{" "}
        <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer" target="_blank">
          Google advertising technologies
        </a>{" "}
        and our <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Legal bases and India DPDP</h2>
      <p>
        We process the limited data above to provide the website, keep it secure, respond to you, and show advertising
        that supports a free service. Under the Digital Personal Data Protection Act, 2023 you may request access,
        correction, or erasure of personal data we hold (for example an email you sent us) by writing to{" "}
        {siteConfig.contactEmail}.
      </p>

      <h2>Retention</h2>
      <p>
        Server conversion files are deleted after download links expire. Contact emails are kept only as long as needed
        to reply and for a reasonable record. Server logs rotate on a regular schedule.
      </p>

      <h2>Children</h2>
      <p>
        ToolPin is a general-audience tools site. We do not knowingly collect personal information from children. If you
        believe a child has sent us personal data, email us and we will delete it.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The “Last updated” date at the top will change. Continued use of toolpin.online after an
        update means you accept the revised policy.
      </p>
    </LegalPage>
  );
}

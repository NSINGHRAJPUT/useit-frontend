import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { siteConfig } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description:
    "How ApkaOS uses first-party cookies for theme preference and Google AdSense advertising cookies on apkaos.in.",
  path: "/cookie-policy",
});

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="13 August 2026">
      <p>
        Cookies are small files stored on your device. ApkaOS uses a small number of first-party cookies and allows
        Google AdSense to set advertising cookies. This page complements the{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>Cookies we set</h2>
      <ul>
        <li>
          <strong>Theme preference</strong> — remembers light or dark mode so the site does not flash the wrong theme.
        </li>
        <li>
          <strong>Cookie notice</strong> — stores that you accepted this banner so we do not show it on every visit.
        </li>
      </ul>

      <h2>Google AdSense cookies</h2>
      <p>
        Google and its partners may set cookies (including advertising cookies such as those historically associated
        with the DoubleClick / DART family) to serve and measure ads on apkaos.in. These cookies may be used to show
        ads based on your visits to this site and other sites.
      </p>
      <p>
        Opt out of personalized Google ads:{" "}
        <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">
          ads settings
        </a>
        . Industry opt-out:{" "}
        <a href="https://www.aboutads.info/choices/" rel="noopener noreferrer" target="_blank">
          aboutads.info
        </a>
        .
      </p>

      <h2>How to control cookies</h2>
      <p>
        You can delete or block cookies in your browser settings. Blocking all cookies may hide the theme preference
        and can affect how ads are shown, but the conversion tools will still run.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
      </p>
    </LegalPage>
  );
}

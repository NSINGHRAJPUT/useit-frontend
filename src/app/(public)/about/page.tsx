import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { categories, siteConfig, tools } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About ApkaOS",
  description:
    "ApkaOS is a free online file-tools site on apkaos.in. Convert images, PDFs, and documents in your browser — no signup, no watermark.",
  path: "/about",
  keywords: ["about apkaos", "free file converter", "online pdf tools india"],
});

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About ApkaOS",
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "ApkaOS",
      url: siteConfig.url,
      email: siteConfig.contactEmail,
    },
  };

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="blog-content mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold">About ApkaOS</h1>
        <p className="mt-6">
          ApkaOS is a free collection of online file tools at{" "}
          <a href={siteConfig.url}>apkaos.in</a>. We built it so you can convert a photo, merge a PDF, or format JSON
          without installing desktop software or creating an account.
        </p>
        <h2>What we offer</h2>
        <p>
          The catalog has {tools.length} utilities across {categories.length} categories: image conversion and
          compression, PDF merge/split/compress, Office document export, and text/data helpers. Each tool has its own
          page with a working widget, a how-to, and a written guide.
        </p>
        <h2>How processing works</h2>
        <p>
          Most tools run entirely in your browser using Web APIs, Canvas, pdf-lib, and similar libraries. Your file is
          not uploaded to ApkaOS for those workflows. A small set of Office conversions (Word, PowerPoint, Excel,
          Markdown, RTF, and ODT to PDF, plus PDF to Word) needs a short-lived server job so we can preserve layout.
          Those files are stored only until the download link expires, then deleted.
        </p>
        <h2>Who we are</h2>
        <p>
          ApkaOS is an independent product operated from India and published on the apkaos.in domain. We are not Adobe,
          Microsoft, or Google. The site is supported by Google AdSense so the tools can stay free.
        </p>
        <h2>What we do not do</h2>
        <p>
          We do not sell your files. We do not add watermarks. We do not require a login to convert. We do not claim
          OCR, video editing, or AI generation — those features are not part of ApkaOS today.
        </p>
        <p>
          Questions? Email{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> or use the{" "}
          <Link href="/contact">contact form</Link>.
        </p>
      </article>
    </Section>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/constants/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact ToolPin",
  description: `Contact ToolPin at ${siteConfig.contactEmail} for questions about free image, PDF, and document tools on toolpin.online.`,
  path: "/contact",
  keywords: ["contact toolpin", "toolpin support", "hello@toolpin.online"],
});

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ToolPin",
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "ToolPin",
      email: siteConfig.contactEmail,
      url: siteConfig.url,
    },
  };

  return (
    <Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="font-heading text-4xl font-semibold">Contact</h1>
      <p className="mt-4 max-w-2xl leading-8 text-muted-foreground">
        Email us at{" "}
        <a className="text-gold hover:underline" href={`mailto:${siteConfig.contactEmail}`}>
          {siteConfig.contactEmail}
        </a>
        . Use the form below to open a message in your mail app. We read every note about tools, privacy, or ads on
        toolpin.online.
      </p>
      <ContactForm />
    </Section>
  );
}

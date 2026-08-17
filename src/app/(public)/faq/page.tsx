import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section } from "@/components/layout/section";
import { faqs, siteConfig } from "@/constants/site";
import { buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

const extraFaqs: Array<[string, string]> = [
  [
    "Can I use ToolPin on a phone?",
    "Yes. The tools work in mobile Chrome, Safari, and Firefox. Very large PDFs or images may be limited by the memory on the device.",
  ],
  [
    "Do converted files include a watermark?",
    "No. ToolPin never stamps a logo or watermark on images, PDFs, or documents you process.",
  ],
  [
    "Why do some Office conversions upload my file?",
    "Word, PowerPoint, Excel, Markdown, RTF, and ODT to PDF (and PDF to Word) need server-side layout engines. Uploads are temporary and deleted after the download link expires. Image, PDF, CSV, and text tools stay in the browser.",
  ],
  [
    "How do I report a broken conversion?",
    `Email ${siteConfig.contactEmail} with the tool name, file type, and what you expected. Do not attach confidential files.`,
  ],
  [
    "Does ToolPin work without JavaScript?",
    "The marketing pages can be read, but converters need JavaScript. Keep JS enabled for the tool you want to run.",
  ],
  [
    "Where is ToolPin based?",
    "ToolPin is operated from India and published at toolpin.online. The privacy policy explains how we handle files, cookies, and advertising.",
  ],
];

const allFaqs = [...faqs, ...extraFaqs];

export const metadata: Metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about ToolPin privacy, file uploads, watermarks, file size limits, AdSense, and how browser-local conversion works.",
  path: "/faq",
  keywords: ["toolpin faq", "are files uploaded", "free pdf tools questions"],
});

export default function FaqPage() {
  const faqJsonLd = buildFaqJsonLd(allFaqs.map(([question, answer]) => ({ question, answer })));

  return (
    <Section>
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <h1 className="font-heading text-4xl font-semibold">FAQ</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Common questions about free converters on toolpin.online. For something else, write to {siteConfig.contactEmail}.
      </p>
      <Accordion type="single" collapsible className="mt-8">
        {allFaqs.map(([question, answer], index) => (
          <AccordionItem key={question} value={String(index)}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

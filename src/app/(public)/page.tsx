import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Lock,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AllToolsIconGrid, CategoryShowcase } from "@/components/home/category-showcase";
import { HeroVisual } from "@/components/home/hero-visual";
import { WorkflowShowcase } from "@/components/home/workflow-showcase";
import { ToolCard } from "@/components/tools/tool-card";
import { categories, faqs, siteConfig, tools } from "@/constants/site";
import { buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Online Image, PDF & Document Tools",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "free online converter",
    "image converter",
    "pdf tools",
    "merge pdf",
    "compress jpg",
    "word to pdf",
    "apkaos",
  ],
});

const proofPoints = [
  { label: "Free tools in the catalog", value: String(tools.length), icon: Zap },
  { label: "Browser-local processing", value: "Private", icon: Lock },
  { label: "Watermarks on results", value: "None", icon: ShieldCheck },
];

const trustBadges = [
  { label: "No account required", icon: Sparkles },
  { label: "Files stay on your device", icon: Lock },
  { label: "No watermark", icon: ShieldCheck },
  { label: "Instant downloads", icon: Zap },
  { label: "JPG, PNG, WebP, PDF", icon: Upload },
  { label: "Free on apkaos.in", icon: CheckCircle2 },
];

export default function HomePage() {
  const faqJsonLd = buildFaqJsonLd(faqs.map(([question, answer]) => ({ question, answer })));

  return (
    <>
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <section className="relative overflow-hidden border-b border-gold/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.12_82/0.12),transparent)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <Sparkles className="size-3.5" />
              Free on apkaos.in
            </div>
            <h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-metallic-gold">Free online image, PDF</span>
              <span className="text-foreground"> and document tools</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Convert JPG to PNG, merge PDFs, compress photos, and format JSON — {tools.length} utilities. Most
              processing happens in your browser, so files never leave your device.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild className="btn-gold border-0 font-semibold">
                <Link href="/tools/jpg-to-webp">
                  <Upload className="size-4" />
                  Start converting
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gold/25 hover:border-gold/40 hover:bg-gold/5">
                <Link href="/tools">
                  Browse all tools
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {["No watermark", "Browser-local processing", "Instant downloads", "Free to use"].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-gold/15 bg-card/50 px-3 py-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="size-3.5 text-gold" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <HeroVisual tools={tools} />
          </div>
        </div>
      </section>

      <Section className="pb-8 pt-10">
        <div className="grid gap-4 md:grid-cols-3">
          {proofPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.label} className="card-premium flex items-center gap-4 p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-gold/15 bg-gold/10">
                  <Icon className="size-5 text-gold" />
                </span>
                <div>
                  <p className="font-heading text-2xl font-semibold text-metallic-gold">{point.value}</p>
                  <p className="text-sm text-muted-foreground">{point.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold md:text-4xl">
            What you can do with <span className="text-metallic-gold">ApkaOS</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-8">
            ApkaOS is a free file-tools site for India and the web. Use it when you need a JPG converted to PNG or
            WebP, a PDF merged or split, a Word file turned into a PDF, or a JSON blob formatted. Image, PDF, and
            most text tools never upload your file. A small set of Office conversions uses a temporary server and
            deletes the file after you download the result.
          </p>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Categories</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            Four suites. <span className="text-metallic-gold">One website.</span>
          </h2>
        </div>
        <CategoryShowcase />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.slug} className="rounded-2xl border border-gold/15 bg-card/40 p-6">
              <h3 className="font-heading text-xl font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{category.longDescription}</p>
              <Link href={`/tools?category=${category.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm text-gold">
                Open {category.name} <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Complete catalog</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              <span className="text-metallic-gold">{tools.length} tools</span> at a glance
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Image converters, PDF editors, Office exports, and developer utilities — each with its own page and
              guide.
            </p>
          </div>
          <Button variant="outline" asChild className="border-gold/25">
            <Link href="/tools">Open tools directory</Link>
          </Button>
        </div>
        <AllToolsIconGrid />
      </Section>

      <Section className="pt-0">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Featured</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold text-metallic-gold">Popular tools</h2>
            <p className="mt-3 text-muted-foreground">Start with the conversions people search for most.</p>
          </div>
          <Button variant="outline" asChild className="border-gold/25">
            <Link href="/tools">View all</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <WorkflowShowcase />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="card-premium flex items-center gap-3 px-5 py-4">
                <span className="flex size-10 items-center justify-center rounded-xl border border-gold/15 bg-gold/5">
                  <Icon className="size-4 text-gold" />
                </span>
                <span className="font-medium">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="card-premium border-gold-glow overflow-hidden">
          <div className="grid gap-8 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Get started</p>
              <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
                Convert a file in <span className="text-metallic-gold">your browser</span>
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Pick a tool, drop a file, download the result. No signup. No watermark. Most tools never upload.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button size="lg" asChild className="btn-gold border-0 font-semibold">
                <Link href="/tools">Browse all tools</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gold/25">
                <Link href="/tools/jpg-to-webp">Try JPG to WebP</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="font-heading text-3xl font-semibold">FAQ</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map(([question, answer], index) => (
            <AccordionItem key={question} value={`item-${index}`}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </>
  );
}

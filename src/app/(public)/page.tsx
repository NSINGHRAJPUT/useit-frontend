import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Crown,
  Gauge,
  Globe2,
  Lock,
  Rocket,
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
import { ToolCard } from "@/components/tools/tool-card";
import { faqs, siteConfig, tools } from "@/constants/site";

const proofPoints = [
  { label: "Files processed", value: "1.2M+", icon: Gauge },
  { label: "Countries served", value: "120+", icon: Globe2 },
  { label: "Platform uptime", value: "99.9%", icon: Zap },
];

const workflow = [
  {
    title: "Upload",
    copy: "Validate MIME type, file signature, size, and plan limits before anything runs.",
    icon: Upload,
  },
  {
    title: "Process",
    copy: "Sharp, Poppler, LibreOffice, and custom pipelines handle each format professionally.",
    icon: Rocket,
  },
  {
    title: "Download",
    copy: "Secure delivery with signed links, ZIP bundles for multi-page jobs, and expiry controls.",
    icon: Cloud,
  },
];

const trustBadges = [
  { label: "Blazing fast", icon: Rocket },
  { label: "Enterprise secure", icon: Lock },
  { label: "No watermark", icon: ShieldCheck },
  { label: "Cloud powered", icon: Cloud },
  { label: "Premium UX", icon: Crown },
  { label: "Built for teams", icon: Sparkles },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/tools?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-gold/10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.55_0.12_82_/_0.12),transparent)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <Sparkles className="size-3.5" />
              Premium workspace
            </div>
            <h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-metallic-gold">Every file tool</span>
              <span className="text-foreground"> you need, beautifully built.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Convert images, PDFs, Word documents, and data — {tools.length} professional utilities in one golden-dark workspace.
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
              {["No watermark", "Signed downloads", "Async PDF & docs", "Free to start"].map((item) => (
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
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Categories</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
            Four suites. <span className="text-metallic-gold">One platform.</span>
          </h2>
        </div>
        <CategoryShowcase />
      </Section>

      <Section className="pt-0">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Complete catalog</p>
            <h2 className="mt-3 font-heading text-3xl font-semibold md:text-4xl">
              <span className="text-metallic-gold">{tools.length} tools</span> at a glance
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Every utility with its own icon — image, PDF, document, and text workflows in one premium grid.
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
            <p className="mt-3 text-muted-foreground">Jump straight into the workflows teams use most.</p>
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
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">How it works</p>
          <h2 className="mt-3 font-heading text-3xl font-semibold">Simple, secure, premium</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {workflow.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="card-premium border-gold-glow p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-gold/15 bg-gold/10">
                  <Icon className="size-6 text-gold" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex items-center gap-3 card-premium px-5 py-4">
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
                Ready for a <span className="text-metallic-gold">premium</span> conversion workflow?
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Start free, upgrade when you need higher limits, priority processing, and team-ready billing.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button size="lg" asChild className="btn-gold border-0 font-semibold">
                <Link href="/register">Create free account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-gold/25">
                <Link href="/pricing">View pricing</Link>
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

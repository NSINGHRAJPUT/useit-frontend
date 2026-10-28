import Link from "next/link";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { AdSlot } from "@/components/ads/ad-slot";
import { ADSENSE_SLOTS } from "@/constants/adsense";
import { categories } from "@/constants/site";
import { CategoryToolPanel } from "./category-tool-panel";
import { ToolBenefits } from "./tool-benefits";
import { ToolFAQ } from "./tool-faq";
import { ToolUseCases } from "./tool-use-cases";
import { RelatedTools } from "./related-tools";
import { ToolGuide, ToolHowTo, ToolTips } from "./tool-guide";

export function ToolLayout({ tool }: { tool: ToolDefinition }) {
  const inputLabel =
    tool.inputType === "text"
      ? "Text input"
      : tool.acceptedFormats.map((item) => item.toUpperCase()).join(", ");
  const category = categories.find((item) => item.slug === tool.category);

  return (
    <>
      <Section className="pb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
            </BreadcrumbItem>
            {category ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/categories/${category.slug}`}>{category.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            ) : null}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gold">
              {tool.category} · {tool.operation}
            </p>
            <h1 className="mt-2 font-heading text-4xl font-semibold">{tool.seoTitle.replace(/\s+\|\s+ToolPin$/i, "")}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              {tool.intro || tool.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="card-premium p-5 text-sm leading-6">
              <p className="font-semibold">Tool details</p>
              <p className="mt-3 text-muted-foreground">Input: {inputLabel}</p>
              <p className="text-muted-foreground">
                Output: {tool.outputFormat === "same" ? "Same format" : tool.outputFormat.toUpperCase()}
              </p>
              <p className="text-muted-foreground">
                Processing: {tool.processingLocation === "server" ? "Secure temporary server" : "In your browser"}
              </p>
              <p className="text-muted-foreground">Price: Free · No watermark</p>
            </div>
            <AdSlot slot={ADSENSE_SLOTS.sidebar} format="rectangle" />
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <CategoryToolPanel tool={tool} />
      </Section>
      <Section className="pt-0">
        <AdSlot slot={ADSENSE_SLOTS.afterTool} format="horizontal" />
      </Section>
      <Section className="pt-0">
        <ToolHowTo tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolBenefits tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolUseCases tool={tool} />
      </Section>
      <Section className="pt-0">
        <AdSlot slot={ADSENSE_SLOTS.inArticle} format="horizontal" />
      </Section>
      <Section className="pt-0">
        <ToolGuide tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolTips tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolFAQ tool={tool} />
      </Section>
      <Section className="pt-0">
        <RelatedTools tool={tool} />
      </Section>
      <Section className="pt-0">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Explore more tools</h2>
          <p className="mt-3 text-muted-foreground">
            Browse every free ToolPin converter, compressor, and formatter from one directory.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/tools">
              Browse tools <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

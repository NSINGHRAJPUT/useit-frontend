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
import { CategoryToolPanel } from "./category-tool-panel";
import { ToolBenefits } from "./tool-benefits";
import { ToolFAQ } from "./tool-faq";
import { ToolUseCases } from "./tool-use-cases";
import { RelatedTools } from "./related-tools";

export function ToolLayout({ tool }: { tool: ToolDefinition }) {
  const inputLabel =
    tool.inputType === "text"
      ? "Text input"
      : tool.acceptedFormats.map((item) => item.toUpperCase()).join(", ");

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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{tool.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gold">{tool.category} · {tool.operation}</p>
            <h1 className="mt-2 font-heading text-4xl font-semibold">{tool.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{tool.description}</p>
          </div>
          <div className="card-premium p-5 text-sm leading-6">
            <p className="font-semibold">Tool details</p>
            <p className="mt-3 text-muted-foreground">Input: {inputLabel}</p>
            <p className="text-muted-foreground">
              Output: {tool.outputFormat === "same" ? "Same format" : tool.outputFormat.toUpperCase()}
            </p>
            <p className="text-muted-foreground">
              Processing: {tool.processingMode === "async" ? "Background queue" : "Instant"}
            </p>
          </div>
        </div>
      </Section>
      <Section className="pt-0">
        <CategoryToolPanel tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolBenefits tool={tool} />
      </Section>
      <Section className="pt-0">
        <ToolUseCases tool={tool} />
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
          <p className="mt-3 text-muted-foreground">Browse every ToolKit Pro workflow from one directory.</p>
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

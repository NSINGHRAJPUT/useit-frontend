import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { ToolCard } from "@/components/tools/tool-card";
import { categories, tools } from "@/constants/site";
import { Badge } from "@/components/ui/badge";

export default function CategoriesPage() {
  return (
    <Section>
      <h1 className="text-4xl font-semibold">Tool categories</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Browse conversion tools by category. Each category uses the right processing engine for the job.
      </p>
      <div className="mt-8 grid gap-6">
        {categories.map((category) => {
          const categoryTools = tools.filter((t) => t.category === category.slug);
          return (
            <div key={category.slug} className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    <Badge variant="secondary">{category.status}</Badge>
                  </div>
                  <p className="mt-2 text-muted-foreground">{category.description}</p>
                </div>
                <Link
                  href={`/tools?category=${category.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold"
                >
                  View all <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {categoryTools.slice(0, 6).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

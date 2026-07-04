import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryMeta, getCategoryIcon } from "@/lib/tool-icons";
import { categories, tools } from "@/constants/site";
import { ToolIconTile } from "./tool-icon-tile";

export function CategoryShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => {
        const Icon = getCategoryIcon(category.slug);
        const meta = categoryMeta[category.slug];
        const count = tools.filter((t) => t.category === category.slug).length;

        return (
          <Link
            key={category.slug}
            href="/categories"
            className="card-premium group relative overflow-hidden p-6 transition hover:border-gold/30"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${meta?.gradient ?? "from-gold/10 to-transparent"} opacity-80`} />
            <div className="relative">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 shadow-inner">
                <Icon className="size-7 text-gold" />
              </span>
              <p className="mt-5 font-heading text-xl font-semibold">{category.name}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
              <p className="mt-4 text-sm font-medium text-gold">{count} tools</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground transition group-hover:text-gold">
                Browse category <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function AllToolsIconGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
      {tools.map((tool) => (
        <ToolIconTile key={tool.slug} tool={tool} compact />
      ))}
    </div>
  );
}

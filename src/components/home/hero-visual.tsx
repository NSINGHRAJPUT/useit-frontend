import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { getCategoryIcon, getToolIcon } from "@/lib/tool-icons";
import { categories } from "@/constants/site";

export function HeroVisual({ tools }: { tools: ToolDefinition[] }) {
  const ringTools = tools.slice(0, 12);
  const liveCategories = categories.filter((c) => c.status === "live");

  return (
    <div className="relative mx-auto h-[min(520px,70vw)] w-full max-w-xl">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,oklch(0.55_0.12_82_/_0.16),transparent_70%)]" />
      <div className="absolute left-1/2 top-1/2 size-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10" />
      <div className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/15" />

      {ringTools.map((tool, index) => {
        const Icon = getToolIcon(tool);
        const angle = (index / ringTools.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 46;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;

        return (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            title={tool.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className="icon-float-inner flex size-11 items-center justify-center rounded-2xl border border-gold/15 bg-card/90 shadow-lg backdrop-blur-sm transition group-hover:scale-110 group-hover:border-gold/35 group-hover:bg-gold/10"
              style={{ animationDelay: `${index * 0.25}s` }}
            >
              <Icon className="size-5 text-gold" />
            </span>
          </Link>
        );
      })}

      {liveCategories.map((category, index) => {
        const Icon = getCategoryIcon(category.slug);
        const angle = (index / liveCategories.length) * Math.PI * 2;
        const radius = 28;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;

        return (
          <Link
            key={category.slug}
            href="/tools"
            className="absolute flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-gold/20 bg-background/80 backdrop-blur-sm transition hover:border-gold/40"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <Icon className="size-4 text-gold" />
          </Link>
        );
      })}

      <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-3xl border border-gold/30 bg-card/95 shadow-[0_0_80px_oklch(0.5_0.12_80_/_0.28)] backdrop-blur-md">
        <Sparkles className="size-9 text-gold" />
        <span className="mt-1 font-heading text-2xl font-semibold text-metallic-gold">{tools.length}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Tools</span>
      </div>

      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-gold/20 bg-card/80 px-4 py-2 text-xs backdrop-blur-md">
        <span className="text-foreground/90">Explore the full suite</span>
        <ArrowRight className="size-3 text-gold" />
      </div>
    </div>
  );
}

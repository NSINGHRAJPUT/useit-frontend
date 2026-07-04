import Link from "next/link";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { getToolIcon } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";

export function ToolIconTile({
  tool,
  compact = false,
  className,
}: {
  tool: ToolDefinition;
  compact?: boolean;
  className?: string;
}) {
  const Icon = getToolIcon(tool);

  return (
    <Link
      href={`/tools/${tool.slug}`}
      title={tool.name}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-2xl border border-gold/10 bg-card/40 p-3 text-center transition hover:-translate-y-0.5 hover:border-gold/30 hover:bg-gold/5",
        compact ? "p-2" : "p-3",
        className,
      )}
    >
      <span className="flex size-11 items-center justify-center rounded-xl border border-gold/15 bg-gradient-to-br from-gold/15 to-gold/5 shadow-[0_8px_24px_oklch(0.5_0.1_80_/_0.12)] transition group-hover:shadow-[0_12px_32px_oklch(0.5_0.12_80_/_0.2)]">
        <Icon className="size-5 text-gold" />
      </span>
      <span className={cn("line-clamp-2 font-medium leading-tight text-foreground", compact ? "text-[10px]" : "text-xs")}>
        {tool.name}
      </span>
    </Link>
  );
}

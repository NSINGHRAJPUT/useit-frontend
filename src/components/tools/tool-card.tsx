import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getToolIcon } from "@/lib/tool-icons";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = getToolIcon(tool);

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <Card className="card-premium h-full transition hover:-translate-y-0.5 hover:border-gold/30">
        <CardContent className="flex h-full flex-col gap-5 p-5">
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-xl border border-gold/15 bg-gradient-to-br from-gold/15 to-gold/5">
              <Icon className="size-5 text-gold" />
            </span>
            <Badge variant="outline" className="capitalize border-gold/20 text-gold-muted">
              {tool.category}
            </Badge>
            <Badge variant="secondary">{tool.operation}</Badge>
          </div>
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-semibold">{tool.name}</h3>
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {tool.description}
            </p>
          </div>
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-gold">
            Open tool{" "}
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

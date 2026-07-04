import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { tools } from "@/constants/site";
import { ToolCard } from "./tool-card";

export function RelatedTools({ tool }: { tool: ToolDefinition }) {
  const related = tools.filter((item) => item.slug !== tool.slug && (item.operation === tool.operation || item.category === tool.category)).slice(0, 3);
  return (
    <section>
      <h2 className="text-2xl font-semibold">Related tools</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{related.map((item) => <ToolCard key={item.slug} tool={item} />)}</div>
    </section>
  );
}

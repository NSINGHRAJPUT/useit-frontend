import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { BlogContent } from "@/components/blog/blog-content";

export function ToolGuide({ tool }: { tool: ToolDefinition }) {
  if (!tool.longDescription) return null;

  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold">About this {tool.name} tool</h2>
      <div className="mt-4">
        <BlogContent content={tool.longDescription} />
      </div>
    </section>
  );
}

export function ToolHowTo({ tool }: { tool: ToolDefinition }) {
  if (!tool.howToSteps?.length) return null;

  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold">How to use {tool.name}</h2>
      <ol className="mt-6 grid gap-3">
        {tool.howToSteps.map((step, index) => (
          <li key={step} className="flex gap-4 rounded-lg border bg-card p-4 shadow-sm">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-sm font-semibold text-gold">
              {index + 1}
            </span>
            <p className="text-sm leading-6 text-muted-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ToolTips({ tool }: { tool: ToolDefinition }) {
  if (!tool.tips?.length) return null;

  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold">Tips</h2>
      <ul className="mt-6 grid gap-3">
        {tool.tips.map((tip) => (
          <li key={tip} className="rounded-lg border bg-card px-5 py-4 text-sm leading-6 text-muted-foreground">
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}

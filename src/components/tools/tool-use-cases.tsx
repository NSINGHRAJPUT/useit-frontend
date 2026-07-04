import type { ToolDefinition } from "@toolkit-pro/shared-types";

export function ToolUseCases({ tool }: { tool: ToolDefinition }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Use cases</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {tool.useCases.map((useCase) => (
          <div key={useCase} className="rounded-lg border bg-card p-5 text-sm leading-6 shadow-sm">{useCase}</div>
        ))}
      </div>
    </section>
  );
}

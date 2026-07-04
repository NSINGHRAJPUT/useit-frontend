import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { CheckCircle2 } from "lucide-react";

export function ToolBenefits({ tool }: { tool: ToolDefinition }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Benefits</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tool.benefits.map((benefit) => (
          <div key={benefit} className="flex gap-3 rounded-lg border bg-card p-5 shadow-sm">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" />
            <p className="text-sm leading-6">{benefit}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

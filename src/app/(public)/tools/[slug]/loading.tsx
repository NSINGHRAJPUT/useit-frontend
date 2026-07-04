import { Section } from "@/components/layout/section";

export default function ToolLoading() {
  return (
    <Section>
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-muted" />
        <div className="h-4 w-full max-w-xl rounded bg-muted" />
        <div className="mt-8 h-80 rounded-lg bg-muted" />
      </div>
    </Section>
  );
}

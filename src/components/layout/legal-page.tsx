import { Section } from "@/components/layout/section";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <article className="blog-content mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-8 space-y-4 text-base leading-8 text-foreground/90">{children}</div>
      </article>
    </Section>
  );
}

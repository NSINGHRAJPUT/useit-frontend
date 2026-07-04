import { Section } from "./section";

export function PageShell({
  children,
  eyebrow,
  title,
  description,
}: {
  children: React.ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.03),_transparent_35%)]">
      <Section className="py-16 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </Section>
      {children}
    </div>
  );
}

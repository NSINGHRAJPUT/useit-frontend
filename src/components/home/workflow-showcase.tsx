import { ArrowRight, Cloud, Rocket, Upload } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Upload",
    copy: "Validate MIME type, file signature, size, and plan limits before anything runs.",
    icon: Upload,
    gradient: "from-amber-500/25 via-gold/10 to-transparent",
  },
  {
    step: "02",
    title: "Process",
    copy: "Sharp, Poppler, LibreOffice, and custom pipelines handle each format professionally.",
    icon: Rocket,
    gradient: "from-orange-500/20 via-gold/12 to-transparent",
  },
  {
    step: "03",
    title: "Download",
    copy: "Secure delivery with signed links, ZIP bundles for multi-page jobs, and expiry controls.",
    icon: Cloud,
    gradient: "from-yellow-500/15 via-gold/10 to-transparent",
  },
];

export function WorkflowShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-gold/15 bg-card/40 p-6 sm:p-10 lg:p-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,oklch(0.55_0.12_82_/_0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/2 size-64 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-1/4 size-48 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          How it works
        </div>
        <h2 className="mt-5 font-heading text-3xl font-semibold md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Simple, secure,{" "}
          <span className="text-metallic-gold">premium</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
          From drop to download in seconds — validated, processed, and delivered with enterprise-grade security.
        </p>
      </div>

      <div className="relative mt-12 lg:mt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px lg:block"
        >
          <div className="h-full bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-5">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.title} className="relative flex flex-col">
                <div className="mb-5 flex items-center justify-center lg:mb-6">
                  <span className="relative z-10 flex size-14 items-center justify-center rounded-full border border-gold/30 bg-background/95 font-heading text-lg font-semibold text-metallic-gold shadow-[0_0_32px_oklch(0.5_0.12_80_/_0.22)] backdrop-blur-sm">
                    {step.step}
                  </span>
                </div>

                <div className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-gold/15 bg-card/80 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_20px_48px_oklch(0.05_0.02_265_/_0.35)]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-70 transition group-hover:opacity-100`}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-7xl font-semibold leading-none text-gold/[0.07]"
                  >
                    {step.step}
                  </span>

                  <div className="relative flex flex-1 flex-col">
                    <span className="flex size-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 shadow-inner">
                      <Icon className="size-6 text-gold" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                  </div>
                </div>

                {!isLast ? (
                  <div className="flex justify-center py-4 lg:hidden" aria-hidden>
                    <ArrowRight className="size-5 rotate-90 text-gold/50" />
                  </div>
                ) : null}

                {!isLast ? (
                  <div
                    className="pointer-events-none absolute -right-3 top-[4.5rem] z-20 hidden lg:flex"
                    aria-hidden
                  >
                    <span className="flex size-7 items-center justify-center rounded-full border border-gold/25 bg-background/90 shadow-sm">
                      <ArrowRight className="size-3.5 text-gold" />
                    </span>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

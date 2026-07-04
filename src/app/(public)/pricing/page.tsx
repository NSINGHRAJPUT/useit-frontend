import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PricingGrid } from "@/components/pricing/pricing-grid";

export default function PricingPage() {
  return (
    <Section className="space-y-8">
      <div className="card-premium border-gold-glow p-8 md:p-10">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-gold">
          <Sparkles className="size-4" />
          Pricing
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="font-heading text-4xl font-semibold tracking-tight">
              <span className="text-metallic-gold">Simple plans</span> for solo creators and growing teams.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Start free, upgrade when your conversion volume grows, and keep
              the workflow fast with secure delivery and premium support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/tools">
                Explore tools
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          [
            "Fast onboarding",
            "Launch your first conversion in minutes with guided tool flows and secure uploads.",
          ],
          [
            "Flexible usage",
            "Scale from everyday processing to high-volume production pipelines without rethinking the stack.",
          ],
          [
            "Priority support",
            "Get faster response times, account reviews, and expert help for enterprise needs.",
          ],
        ].map(([title, description]) => (
          <Card key={title} className="rounded-2xl border-border/70">
            <CardContent className="p-6">
              <CheckCircle2 className="size-5 text-gold" />
              <p className="mt-4 font-semibold">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <PricingGrid />
    </Section>
  );
}

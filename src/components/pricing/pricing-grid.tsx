"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/constants/site";
import { api } from "@/services/api";

const prices = { FREE: "$0", PRO: "$19", BUSINESS: "$59" };

export function PricingGrid() {
  const [busy, setBusy] = useState<string | null>(null);
  const router = useRouter();

  async function checkout(plan: "PRO" | "BUSINESS") {
    setBusy(plan);
    try {
      const { data } = await api.post<{ data: { url: string } }>("/payments/checkout", { plan });
      if (data.data.url) window.location.href = data.data.url;
    } catch {
      toast.error("Checkout failed. Sign in and ensure Stripe is configured.");
      router.push("/login?next=/pricing");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.plan}
          className={
            plan.plan === "PRO"
              ? "card-premium border-gold-glow"
              : "card-premium"
          }
        >
          <CardHeader>
            <CardTitle className={plan.plan === "PRO" ? "text-metallic-gold" : ""}>
              {plan.plan}
            </CardTitle>
            <p className="text-3xl font-semibold">
              {prices[plan.plan]}
              <span className="text-sm font-normal text-muted-foreground"> /mo</span>
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              `${plan.maxUploadMb} MB uploads`,
              plan.dailyConversions ? `${plan.dailyConversions} conversions per day` : "Unlimited conversions",
              plan.priorityProcessing ? "Priority processing" : "Standard processing",
            ].map((feature) => (
              <p key={feature} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-gold" />
                {feature}
              </p>
            ))}
            <Button
              className="w-full"
              variant={plan.plan === "FREE" ? "outline" : "default"}
              disabled={busy === plan.plan}
              onClick={() => {
                if (plan.plan === "FREE") router.push("/register");
                else checkout(plan.plan);
              }}
            >
              {busy === plan.plan ? <Loader2 className="size-4 animate-spin" /> : null}
              {plan.plan === "FREE" ? "Start free" : "Upgrade"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

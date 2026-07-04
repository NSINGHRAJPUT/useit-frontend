"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/services/api";

export default function BillingPageClient() {
  const [busy, setBusy] = useState(false);

  async function openPortal() {
    setBusy(true);
    try {
      const { data } = await api.post<{ data: { url: string } }>("/payments/portal");
      if (data.data.url) window.location.href = data.data.url;
    } catch {
      toast.error("Billing portal unavailable. Subscribe to a paid plan first.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-semibold">Billing</h1>
      <div className="mt-6 rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-muted-foreground">
          Manage invoices, payment methods, upgrades, downgrades, and cancellations through Stripe Billing Portal.
        </p>
        <Button className="mt-5" onClick={openPortal} disabled={busy}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          Open billing portal
        </Button>
      </div>
    </>
  );
}

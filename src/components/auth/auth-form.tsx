"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";

export function AuthForm({ mode }: { mode: "login" | "register" | "forgot" | "reset" }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    setBusy(true);
    try {
      const path =
        mode === "login"
          ? "/auth/login"
          : mode === "register"
            ? "/auth/register"
            : mode === "forgot"
              ? "/auth/forgot-password"
              : "/auth/reset-password";
      await api.post(path, form);
      if (mode === "login" || mode === "register") {
        toast.success("Signed in successfully.");
        router.push(next);
        router.refresh();
      } else {
        toast.success("Request sent.");
      }
    } catch {
      toast.error("Request failed. Check your details and API configuration.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border bg-card p-6 shadow-sm">
      {mode === "register" ? <Field name="name" label="Name" /> : null}
      {mode !== "reset" ? <Field name="email" label="Email" type="email" /> : <Field name="token" label="Reset token" />}
      {mode !== "forgot" ? <Field name="password" label="Password" type="password" /> : null}
      <Button disabled={busy}>
        {busy ? <Loader2 className="size-4 animate-spin" /> : null}
        {labelFor(mode)}
      </Button>
      {mode === "login" ? (
        <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
          Forgot password?
        </Link>
      ) : null}
    </form>
  );
}

function Field({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required />
    </div>
  );
}

function labelFor(mode: string) {
  if (mode === "register") return "Create account";
  if (mode === "forgot") return "Send reset email";
  if (mode === "reset") return "Reset password";
  return "Sign in";
}

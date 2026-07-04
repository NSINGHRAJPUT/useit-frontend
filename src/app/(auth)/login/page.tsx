import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <p className="mt-3 text-muted-foreground">Access your conversions, billing, and downloads.</p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        New here? <Link href="/register" className="text-foreground">Create an account</Link>
      </p>
    </main>
  );
}

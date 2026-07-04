import Link from "next/link";
import { AuthForm } from "@/components/auth/auth-form";

export default function RegisterPage() {
  return <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4"><h1 className="text-3xl font-semibold">Create account</h1><p className="mt-3 text-muted-foreground">Start with secure image processing and usage tracking.</p><div className="mt-6"><AuthForm mode="register" /></div><p className="mt-4 text-sm text-muted-foreground">Already have an account? <Link href="/login" className="text-foreground">Sign in</Link></p></main>;
}

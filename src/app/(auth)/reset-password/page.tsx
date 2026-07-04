import { AuthForm } from "@/components/auth/auth-form";

export default function ResetPasswordPage() {
  return <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4"><h1 className="text-3xl font-semibold">Set new password</h1><p className="mt-3 text-muted-foreground">Paste the reset token from your email and choose a new password.</p><div className="mt-6"><AuthForm mode="reset" /></div></main>;
}

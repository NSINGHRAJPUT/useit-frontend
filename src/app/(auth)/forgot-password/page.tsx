import { AuthForm } from "@/components/auth/auth-form";

export default function ForgotPasswordPage() {
  return <main className="mx-auto grid min-h-screen max-w-md place-content-center px-4"><h1 className="text-3xl font-semibold">Reset password</h1><p className="mt-3 text-muted-foreground">Send a password reset link to your account email.</p><div className="mt-6"><AuthForm mode="forgot" /></div></main>;
}

import Link from "next/link";
import {
  LayoutGrid,
  Palette,
  ReceiptText,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

const nav = [
  { label: "Profile", href: "/dashboard/profile", icon: UserCircle2 },
  { label: "History", href: "/dashboard/history", icon: LayoutGrid },
  { label: "Downloads", href: "/dashboard/downloads", icon: ShieldCheck },
  { label: "Subscription", href: "/dashboard/subscription", icon: ReceiptText },
  { label: "Billing", href: "/dashboard/billing", icon: Palette },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 md:grid-cols-[240px_1fr]">
      <aside className="card-premium p-6">
        <Link href="/" className="font-heading text-lg font-semibold text-metallic-gold">
          ToolKit Pro
        </Link>
        <p className="mt-3 text-sm text-muted-foreground">
          Your workspace for uploads, history, and billing.
        </p>
        <nav className="mt-8 grid gap-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm capitalize text-muted-foreground transition hover:bg-gold/10 hover:text-gold"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section>{children}</section>
    </main>
  );
}

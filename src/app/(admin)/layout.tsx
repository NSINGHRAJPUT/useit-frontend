import Link from "next/link";

const nav = ["users", "conversions", "tools", "blogs", "seo", "payments", "subscriptions", "analytics", "newsletter"];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 md:grid-cols-[220px_1fr]"><aside><Link href="/" className="font-semibold">Admin</Link><nav className="mt-8 grid gap-2">{nav.map((item) => <Link key={item} href={`/admin/${item}`} className="rounded-md px-3 py-2 text-sm capitalize text-muted-foreground hover:bg-muted hover:text-foreground">{item}</Link>)}</nav></aside><section>{children}</section></main>;
}

import { apiGet } from "@/services/api";

export default async function AdminAnalyticsPage() {
  const data: Record<string, unknown> = await apiGet<Record<string, unknown>>("/admin").catch(() => ({}));
  const metrics = ["registrations", "conversions", "downloads", "revenue", "subscriptions", "successRate", "failureRate"] as const;
  return <><h1 className="text-3xl font-semibold">Analytics</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{metrics.map((metric) => <div key={metric} className="rounded-lg border bg-card p-5 shadow-sm"><p className="text-sm capitalize text-muted-foreground">{metric}</p><p className="mt-2 text-2xl font-semibold">{String(data[metric] ?? 0)}</p></div>)}</div></>;
}

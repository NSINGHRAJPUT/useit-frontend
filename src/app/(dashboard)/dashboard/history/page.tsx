import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DataTable } from "@/components/dashboard/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { apiGet } from "@/services/api";

export default async function HistoryPage() {
  const rows = await apiGet<Record<string, unknown>[]>(
    "/conversions/history/me",
  ).catch(() => []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/70 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.02))] p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Conversion history
            </h1>
            <p className="mt-2 text-muted-foreground">
              Review recent processing jobs, downloads, and the tools you use
              most.
            </p>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold"
          >
            Open tools <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <Card className="rounded-3xl border-border/70">
        <CardContent className="p-0">
          <div className="border-b border-border/70 px-6 py-4">
            <p className="font-semibold">Recent jobs</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A live view of recent conversions made from your account.
            </p>
          </div>
          <div className="p-6">
            <DataTable
              rows={rows}
              columns={[
                "toolSlug",
                "status",
                "inputFileName",
                "outputFileName",
                "downloadCount",
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

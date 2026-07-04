import { DataTable } from "@/components/dashboard/data-table";
import { apiGet } from "@/services/api";

export default async function DownloadsPage() {
  const rows = await apiGet<Record<string, unknown>[]>("/conversions/history/me").catch(() => []);
  return <><h1 className="text-3xl font-semibold">Downloads</h1><div className="mt-6"><DataTable rows={rows} columns={["outputFileName", "outputSize", "downloadCount", "expiresAt"]} /></div></>;
}

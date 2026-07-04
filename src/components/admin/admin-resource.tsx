import { DataTable } from "@/components/dashboard/data-table";
import { apiGet } from "@/services/api";

export async function AdminResource({ title, endpoint, columns }: { title: string; endpoint: string; columns: string[] }) {
  const rows = await apiGet<Record<string, unknown>[]>(endpoint).catch(() => []);
  return <><h1 className="text-3xl font-semibold">{title}</h1><div className="mt-6"><DataTable rows={Array.isArray(rows) ? rows : []} columns={columns} /></div></>;
}

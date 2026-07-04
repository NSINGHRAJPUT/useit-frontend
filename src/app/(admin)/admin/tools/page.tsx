import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminToolsPage() {
  return <AdminResource title="Tools" endpoint="/admin/tools" columns={["name", "slug", "category", "operation", "usageCount", "isActive"]} />;
}

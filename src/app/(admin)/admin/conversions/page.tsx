import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminConversionsPage() {
  return <AdminResource title="Conversions" endpoint="/admin/conversions" columns={["toolSlug", "status", "inputFileName", "outputFileName", "downloadCount"]} />;
}

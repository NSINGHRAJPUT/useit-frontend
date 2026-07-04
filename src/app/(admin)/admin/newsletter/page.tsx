import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminNewsletterPage() {
  return <AdminResource title="Newsletter" endpoint="/admin/newsletter" columns={["email", "subscribedAt"]} />;
}

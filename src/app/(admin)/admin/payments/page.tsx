import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminPaymentsPage() {
  return <AdminResource title="Payments" endpoint="/admin/payments" columns={["amount", "currency", "status", "stripePaymentIntentId"]} />;
}

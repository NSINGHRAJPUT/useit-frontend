import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminSubscriptionsPage() {
  return <AdminResource title="Subscriptions" endpoint="/admin/subscriptions" columns={["userId", "plan", "status", "stripeCustomerId", "currentPeriodEnd"]} />;
}

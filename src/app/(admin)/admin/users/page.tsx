import { AdminResource } from "@/components/admin/admin-resource";

export default function AdminUsersPage() {
  return <AdminResource title="Users" endpoint="/admin/users" columns={["name", "email", "role", "emailVerified"]} />;
}

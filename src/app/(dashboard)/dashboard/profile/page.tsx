import { apiGet } from "@/services/api";

export default async function ProfilePage() {
  const me = await apiGet<{ user?: { name?: string; email?: string; role?: string } }>("/auth/me").catch(() => ({ user: undefined }));
  return <><h1 className="text-3xl font-semibold">Profile</h1><div className="mt-6 rounded-lg border bg-card p-6 shadow-sm"><p className="font-medium">{me.user?.name ?? "Signed-out user"}</p><p className="mt-2 text-muted-foreground">{me.user?.email ?? "Login required for profile data."}</p></div></>;
}

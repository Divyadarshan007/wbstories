import { cookies } from "next/headers";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { verifyAdminToken } from "@/utils/jwt.util";
import { AuthService } from "@/services/auth.service";
import { ADMIN_TOKEN_COOKIE } from "@/constants/cookie.constants";

// Reads the auth cookie for display only — middleware is what actually
// protects this route tree, so a verification failure here just falls back
// to a generic label instead of enforcing anything.
async function getAdminEmail(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
  if (!token) {
    return "Admin";
  }

  const payload = await verifyAdminToken(token);
  if (!payload) {
    return "Admin";
  }

  try {
    const admin = await AuthService.getCurrentAdmin(payload.sub);
    return admin.email;
  } catch {
    return "Admin";
  }
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminEmail = await getAdminEmail();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar adminEmail={adminEmail} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

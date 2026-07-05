import { redirect } from "next/navigation";
import { AdminAppFrame } from "@/components/admin/layout/admin-app-frame";
import { getSession } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <AdminAppFrame userEmail={session.email}>{children}</AdminAppFrame>;
}

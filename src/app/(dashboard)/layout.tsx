import { redirect } from "next/navigation";
import { AppFrame } from "@/components/dashboard/app-frame";
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

  return <AppFrame userEmail={session.email}>{children}</AppFrame>;
}

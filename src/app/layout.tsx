import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "@/components/dashboard/providers";

export const metadata: Metadata = {
  title: "MatWeb Dashboard Admin",
  description: "Dashboard personnel pour piloter notes, projets, API, IA et design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

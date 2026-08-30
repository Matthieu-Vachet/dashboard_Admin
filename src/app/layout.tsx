import type { Metadata } from "next";
import { Toaster } from "sonner";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "@/components/admin/layout/admin-providers";

export const metadata: Metadata = {
  title: {
    default: "Dashboard Pokémon GO",
    template: "%s | Dashboard Pokémon GO",
  },
  description: "Centre de commande privé pour les données, synchronisations et outils Pokémon GO.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

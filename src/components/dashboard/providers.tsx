"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="matweb-theme"
      value={{ dark: "dark", light: "light" }}
    >
      {children}
    </ThemeProvider>
  );
}

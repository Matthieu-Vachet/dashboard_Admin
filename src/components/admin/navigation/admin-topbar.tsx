"use client";

import {
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { DASHBOARD_VERSION } from "@/data/app-version";
import { AdminPaletteSelector } from "@/components/admin/navigation/admin-palette-selector";

type AdminTopbarProps = {
  activeLabel: string;
  collapsed: boolean;
  onOpenSidebar: () => void;
  onToggleCollapsed: () => void;
  onOpenVersionHistory: () => void;
};

export function AdminTopbar({
  activeLabel,
  collapsed,
  onOpenSidebar,
  onToggleCollapsed,
  onOpenVersionHistory,
}: AdminTopbarProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/72 px-4 py-3 backdrop-blur-2xl sm:px-6">
      <div className="mx-auto flex max-w-[1680px] items-center gap-3">
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface-control text-foreground lg:hidden"
          type="button"
          onClick={onOpenSidebar}
          aria-label="Ouvrir le menu"
        >
          <Menu size={18} />
        </button>
        <button
          className="hidden h-10 w-10 place-items-center rounded-lg border border-line bg-surface-control text-muted transition hover:text-foreground lg:grid"
          type="button"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? "Déplier la navigation" : "Replier la navigation"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            {activeLabel}
          </p>
          <h1 className="truncate text-base font-black sm:text-lg">
            Centre de commande personnel
          </h1>
        </div>

        <div className="hidden min-h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-surface-subtle px-3 text-sm font-bold text-muted md:flex">
          <Search size={16} />
          <span>Rechercher une note, tâche ou projet</span>
        </div>

        <button
          className="dashboard-accent-glow inline-flex min-h-10 shrink-0 items-center rounded-lg border border-brand-2/25 bg-brand-2/10 px-2 text-[11px] font-black text-brand-2 transition hover:border-brand-2/55 hover:bg-brand-2/15 sm:px-3 sm:text-xs"
          type="button"
          onClick={onOpenVersionHistory}
          aria-label="Ouvrir l'historique des versions du Dashboard"
        >
          {DASHBOARD_VERSION}
        </button>

        <AdminPaletteSelector />

        <Button
          variant="secondary"
          size="icon"
          type="button"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          aria-label="Changer le thème"
        >
          <Sun size={17} className="theme-icon-sun" />
          <Moon size={17} className="theme-icon-moon" />
        </Button>
      </div>
    </header>
  );
}

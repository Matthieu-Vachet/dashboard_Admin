"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LogOut,
  Menu,
  Moon,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { navItems } from "@/data/dashboard";
import { cn } from "@/lib/cn";

const navToneClasses = [
  { icon: "text-brand-2", glow: "bg-brand-2/12" },
  { icon: "text-sky-300", glow: "bg-sky-400/12" },
  { icon: "text-violet-300", glow: "bg-violet-400/12" },
  { icon: "text-emerald-300", glow: "bg-emerald-400/12" },
  { icon: "text-amber-300", glow: "bg-amber-400/12" },
  { icon: "text-lime-300", glow: "bg-lime-400/12" },
  { icon: "text-rose-300", glow: "bg-rose-400/12" },
  { icon: "text-cyan-300", glow: "bg-cyan-400/12" },
  { icon: "text-fuchsia-300", glow: "bg-fuchsia-400/12" },
  { icon: "text-orange-300", glow: "bg-orange-400/12" },
  { icon: "text-teal-300", glow: "bg-teal-400/12" },
] as const;

export function AppFrame({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const brandLogo = "/ui/matweb-innovation-letter-m3.png";

  const activeLabel = useMemo(
    () => navItems.find((item) => item.href === pathname)?.label || "Accueil",
    [pathname],
  );

  const SidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Retour à l’accueil">
          <span
            className={cn(
              "grid h-12 shrink-0 place-items-center rounded-lg p-0.5",
              collapsed ? "w-12" : "w-14",
            )}
          >
            <Image
              className="max-h-full max-w-full object-contain opacity-95 contrast-125 drop-shadow-[0_0_18px_rgba(32,211,255,0.22)]"
              src={brandLogo}
              width={96}
              height={107}
              alt=""
              priority
              unoptimized
            />
          </span>
          {!collapsed ? (
            <span className="min-w-0 leading-tight">
              <span className="block max-w-[8.1rem] text-[0.8rem] font-black leading-tight 2xl:max-w-none 2xl:text-sm">
                MatWeb Innovation
              </span>
              <span className="block truncate text-[0.68rem] font-bold text-muted 2xl:text-xs">
                Dashboard Admin
              </span>
            </span>
          ) : null}
        </Link>
        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-white/[0.07] hover:text-foreground lg:hidden"
          type="button"
          onClick={() => setSidebarOpen(false)}
          aria-label="Fermer le menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5" aria-label="Navigation dashboard">
        {navItems.map((item, index) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          const tone = navToneClasses[index % navToneClasses.length];

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              title={collapsed ? item.label : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "dashboard-sidebar-link group relative flex min-h-10 items-center gap-2.5 overflow-hidden rounded-lg border px-3 text-sm font-black transition",
                active
                  ? "border-brand-2/35 bg-brand-2/12 text-foreground shadow-[0_12px_36px_rgba(32,211,255,0.12)]"
                  : "border-transparent text-muted hover:border-line hover:bg-white/[0.055] hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <span
                className={cn(
                  "absolute inset-y-1 left-1 w-9 rounded-lg opacity-0 blur-sm transition duration-300 group-hover:opacity-70",
                  tone.glow,
                  active && "opacity-100",
                )}
              />
              <Icon
                size={17}
                className={cn(
                  "relative z-10 transition duration-300 group-hover:scale-125 group-hover:-rotate-6",
                  active ? "text-brand-2 drop-shadow-[0_0_14px_rgba(32,211,255,.55)]" : tone.icon,
                )}
              />
              {!collapsed ? <span className="truncate">{item.label}</span> : null}
              {active ? (
                <motion.span
                  layoutId="active-nav"
                  className="absolute inset-y-2 right-2 w-1 rounded-full bg-brand-2"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 p-3">
        {!collapsed ? (
          <div className="dashboard-sidebar-card rounded-lg border border-line p-3">
            <div className="flex items-center justify-between gap-3">
              <Badge tone="green">Admin</Badge>
              <span className="h-2.5 w-2.5 rounded-full bg-brand-3 shadow-[0_0_24px_rgba(88,242,169,0.7)]" />
            </div>
            <p className="mt-3 truncate text-xs font-bold text-muted">{userEmail}</p>
          </div>
        ) : null}
        <form action="/api/logout" method="post">
          <Button
            className={cn("w-full", collapsed && "px-0")}
            variant="ghost"
            icon={<LogOut size={16} />}
            type="submit"
            aria-label="Déconnexion"
          >
            {!collapsed ? "Déconnexion" : null}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-2 focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-slate-950"
      >
        Aller au contenu principal
      </a>
      <div className="studio-grid pointer-events-none fixed inset-0 opacity-70" />
      <div className="scanline-overlay pointer-events-none fixed inset-0" />
      <div className="energy-scan pointer-events-none fixed inset-y-0 -left-1/3 w-1/3" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2/70 to-transparent" />

      <aside
        className={cn(
          "dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden border-r border-line backdrop-blur-2xl transition-[width] duration-300 lg:block",
          collapsed ? "w-[84px]" : "w-[236px] 2xl:w-[286px]",
        )}
      >
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {sidebarOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              className="dashboard-sidebar-mobile h-full w-[286px] border-r border-line"
              initial={{ x: -286 }}
              animate={{ x: 0 }}
              exit={{ x: -286 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={(event) => event.stopPropagation()}
            >
              {SidebarContent}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 min-h-screen transition-[padding] duration-300",
          collapsed ? "lg:pl-[84px]" : "lg:pl-[236px] 2xl:pl-[286px]",
        )}
      >
        <header className="sticky top-0 z-30 border-b border-line bg-background/72 px-4 py-3 backdrop-blur-2xl sm:px-6">
          <div className="mx-auto flex max-w-[1680px] items-center gap-3">
            <button
              className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.06] text-foreground lg:hidden"
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={18} />
            </button>
            <button
              className="hidden h-10 w-10 place-items-center rounded-lg border border-line bg-white/[0.06] text-muted transition hover:text-foreground lg:grid"
              type="button"
              onClick={() => setCollapsed((value) => !value)}
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

            <div className="hidden min-h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-sm font-bold text-muted md:flex">
              <Search size={16} />
              <span>Rechercher une note, tâche ou projet</span>
            </div>

            <Button asChild variant="secondary" className="hidden sm:inline-flex">
              <a href="/storybook/index.html" target="_blank" rel="noreferrer">
                <BookOpen size={17} />
                Storybook
              </a>
            </Button>

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

        <main id="dashboard-content" tabIndex={-1} className="mx-auto max-w-[1680px] px-4 py-5 outline-none sm:px-6 lg:py-7">
          {children}
        </main>
      </div>
    </div>
  );
}

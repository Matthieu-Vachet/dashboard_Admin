"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DASHBOARD_VERSION } from "@/data/app-version";
import { dashboardVersionHistory } from "@/data/dashboard-version-history";
import { navGroups, navItems } from "@/data/dashboard";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

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
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [versionHistory, setVersionHistory, versionHistoryReady] = usePersistentState(
    "matweb.dashboard.versionHistory",
    dashboardVersionHistory,
  );
  const [openNavGroups, setOpenNavGroups] = usePersistentState(
    "matweb.dashboard.sidebarGroups",
    navGroups.map((group) => group.id),
  );
  const { resolvedTheme, setTheme } = useTheme();
  const brandLogo = "/ui/matweb-innovation-letter-m3.png";

  const activeLabel = useMemo(
    () => navItems.find((item) => item.href === pathname)?.label || "Accueil",
    [pathname],
  );
  const displayedVersionHistory = Array.isArray(versionHistory)
    ? versionHistory
    : dashboardVersionHistory;

  function toggleNavGroup(groupId: string) {
    setOpenNavGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  }

  useEffect(() => {
    if (!versionHistoryReady || !Array.isArray(versionHistory)) return;
    const knownVersions = new Set(versionHistory.map((entry) => entry.version));
    const missingEntries = dashboardVersionHistory.filter(
      (entry) => !knownVersions.has(entry.version),
    );
    if (!missingEntries.length) return;
    setVersionHistory([...missingEntries, ...versionHistory]);
  }, [setVersionHistory, versionHistory, versionHistoryReady]);

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

      <nav className="flex-1 space-y-2 overflow-y-auto px-2.5" aria-label="Navigation dashboard">
        {navGroups.map((group) => {
          const groupActive = group.items.some((item) => item.href === pathname);
          const groupOpen = collapsed || groupActive || openNavGroups.includes(group.id);

          return (
            <div key={group.id} className="dashboard-sidebar-group rounded-lg border border-transparent">
              {!collapsed ? (
                <button
                  type="button"
                  onClick={() => toggleNavGroup(group.id)}
                  className={cn(
                    "flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-[0.68rem] font-black uppercase tracking-[0.18em] transition",
                    groupActive ? "text-brand-2" : "text-muted hover:bg-white/[0.045] hover:text-foreground",
                  )}
                  aria-expanded={groupOpen}
                >
                  <span className="truncate">{group.label}</span>
                  <ChevronDown
                    size={15}
                    className={cn("transition", groupOpen && "rotate-180")}
                  />
                </button>
              ) : (
                <div className="mx-auto my-1 h-px w-8 bg-line" />
              )}

              {groupOpen ? (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;
                    const index = Math.max(navItems.findIndex((navItem) => navItem.href === item.href), 0);
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
                        {typeof Icon === "string" ? (
                          <img
                            className="relative z-10 h-[22px] w-[22px] object-contain drop-shadow-[0_0_12px_rgba(32,211,255,.3)] transition duration-300 group-hover:scale-125 group-hover:-rotate-6"
                            src={Icon}
                            alt=""
                            loading="lazy"
                          />
                        ) : (
                          <Icon
                            size={17}
                            className={cn(
                              "relative z-10 transition duration-300 group-hover:scale-125 group-hover:-rotate-6",
                              active ? "text-brand-2 drop-shadow-[0_0_14px_rgba(32,211,255,.55)]" : tone.icon,
                            )}
                          />
                        )}
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
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="space-y-3 p-3">
        {!collapsed ? (
          <div className="dashboard-account-zone rounded-lg border border-line p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="mb-2 flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-muted">
                  <UserRound size={13} className="text-brand-2" />
                  Compte
                </span>
                <Badge tone="green">Admin</Badge>
              </div>
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-3 shadow-[0_0_24px_rgba(88,242,169,0.7)]" />
            </div>
            <p className="mt-3 truncate text-xs font-bold text-muted">{userEmail}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.055] px-2 text-[0.68rem] font-black text-foreground transition hover:border-cyan-200/35 hover:bg-cyan-400/10"
                type="button"
                title="Préférences du compte"
              >
                <Settings size={13} /> Réglages
              </button>
              <button
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-300/18 bg-emerald-400/10 px-2 text-[0.68rem] font-black text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-400/16"
                type="button"
                title="Session admin protégée"
              >
                <ShieldCheck size={13} /> Session
              </button>
            </div>
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

            <button
              className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-brand-2/25 bg-brand-2/10 px-2 text-[11px] font-black text-brand-2 shadow-[0_0_30px_rgba(32,211,255,0.10)] transition hover:border-brand-2/55 hover:bg-brand-2/15 sm:px-3 sm:text-xs"
              type="button"
              onClick={() => setVersionHistoryOpen(true)}
              aria-label="Ouvrir l'historique des versions du Dashboard"
            >
              {DASHBOARD_VERSION}
            </button>

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

      <AnimatePresence>
        {versionHistoryOpen ? (
          <motion.div
            className="fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
            role="dialog"
            aria-modal="true"
            aria-label="Historique des versions du Dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVersionHistoryOpen(false)}
          >
            <motion.section
              className="relative z-[1110] max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-card shadow-[0_24px_120px_rgba(0,0,0,.55)]"
              initial={{ y: 18, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 18, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              onClick={(event) => event.stopPropagation()}
            >
              <header className="flex items-start justify-between gap-4 border-b border-line bg-white/[0.04] p-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-2">
                    Dashboard version history
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Historique des versions</h2>
                  <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-muted">
                    Chaque increment de version du Dashboard est note ici pour suivre les
                    corrections, refontes et changements de donnees.
                  </p>
                </div>
                <button
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-white/[0.06] text-foreground transition hover:bg-white/10"
                  type="button"
                  onClick={() => setVersionHistoryOpen(false)}
                  aria-label="Fermer l'historique des versions"
                >
                  <X size={18} />
                </button>
              </header>
              <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5">
                <div className="grid gap-3">
                  {displayedVersionHistory.map((entry) => (
                    <article
                      className="rounded-2xl border border-line bg-white/[0.045] p-4"
                      key={entry.version}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="inline-flex rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-xs font-black text-brand-2">
                            {entry.version}
                          </span>
                          <h3 className="mt-3 text-lg font-black">{entry.title}</h3>
                        </div>
                        <time className="text-xs font-black text-muted">{entry.date}</time>
                      </div>
                      <ul className="mt-4 grid gap-2 text-sm font-bold leading-6 text-muted">
                        {entry.changes.map((change) => (
                          <li className="rounded-xl border border-line bg-slate-950/20 px-3 py-2" key={change}>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

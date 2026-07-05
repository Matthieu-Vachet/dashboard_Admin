"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChevronDown,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { NavGroup, NavItem } from "@/constants/admin/navigation";
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

type AdminSidebarProps = {
  brandLogo: string;
  collapsed: boolean;
  navGroups: NavGroup[];
  navItems: NavItem[];
  openNavGroups: string[];
  pathname: string;
  userEmail: string;
  onCloseMobile: () => void;
  onToggleNavGroup: (groupId: string) => void;
};

export function AdminSidebar({
  brandLogo,
  collapsed,
  navGroups,
  navItems,
  openNavGroups,
  pathname,
  userEmail,
  onCloseMobile,
  onToggleNavGroup,
}: AdminSidebarProps) {
  return (
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
          onClick={onCloseMobile}
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
                  onClick={() => onToggleNavGroup(group.id)}
                  className={cn(
                    "flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-[0.68rem] font-black uppercase tracking-[0.18em] transition",
                    groupActive
                      ? "text-brand-2"
                      : "text-muted hover:bg-white/[0.045] hover:text-foreground",
                  )}
                  aria-expanded={groupOpen}
                >
                  <span className="truncate">{group.label}</span>
                  <ChevronDown size={15} className={cn("transition", groupOpen && "rotate-180")} />
                </button>
              ) : (
                <div className="mx-auto my-1 h-px w-8 bg-line" />
              )}

              {groupOpen ? (
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <AdminSidebarLink
                      key={item.href}
                      collapsed={collapsed}
                      item={item}
                      navItems={navItems}
                      pathname={pathname}
                      onNavigate={onCloseMobile}
                    />
                  ))}
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
              <Link
                href="/account"
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.055] px-2 text-[0.68rem] font-black text-foreground transition hover:border-cyan-200/35 hover:bg-cyan-400/10"
                title="Préférences du compte"
              >
                <Settings size={13} /> Réglages
              </Link>
              <Link
                href="/account#session"
                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-300/18 bg-emerald-400/10 px-2 text-[0.68rem] font-black text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-400/16"
                title="Session admin protégée"
              >
                <ShieldCheck size={13} /> Session
              </Link>
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
}

function AdminSidebarLink({
  collapsed,
  item,
  navItems,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  item: NavItem;
  navItems: NavItem[];
  pathname: string;
  onNavigate: () => void;
}) {
  const active = pathname === item.href;
  const Icon = item.icon;
  const index = Math.max(navItems.findIndex((navItem) => navItem.href === item.href), 0);
  const tone = navToneClasses[index % navToneClasses.length];

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
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
}

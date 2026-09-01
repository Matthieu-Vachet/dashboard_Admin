"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DashboardFooter } from "@/components/admin/shared/dashboard-footer";
import { DASHBOARD_VERSION } from "@/data/app-version";
import { navGroups, navItems } from "@/constants/admin/navigation";
import { AdminVersionHistoryDialog } from "@/components/admin/layout/admin-version-history-dialog";
import { AdminSidebar } from "@/components/admin/navigation/admin-sidebar";
import { AdminTopbar } from "@/components/admin/navigation/admin-topbar";
import { useDashboardVersionHistory } from "@/hooks/admin/use-dashboard-version-history";
import { usePersistentState } from "@/lib/use-persistent-state";
import { cn } from "@/lib/cn";
import { MOTION_TRANSITION } from "@/lib/motion";
import type { AdminFrameProps } from "@/types/admin/dashboard";

export function AdminAppFrame({
  children,
  userEmail,
}: AdminFrameProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [sourceWatchUnreadCount, setSourceWatchUnreadCount] = useState(0);
  const mobileSidebarRef = useRef<HTMLElement>(null);
  const mobileSidebarTriggerRef = useRef<HTMLElement | null>(null);
  const [openNavGroups, setOpenNavGroups] = usePersistentState(
    "matweb.dashboard.sidebarGroups",
    navGroups.map((group) => group.id),
  );
  const versionHistory = useDashboardVersionHistory();
  const brandLogo = "/assets/ui/branding/zygardDexLogo.png";

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/pokemon-admin?action=source-watch-alerts", { cache: "no-store" })
      .then(async (response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (!cancelled) setSourceWatchUnreadCount(Math.max(0, Number(payload?.data?.unreadCount || 0)));
      })
      .catch(() => undefined);

    function handleSourceWatchUpdate(event: Event) {
      const detail = (event as CustomEvent<{ unreadCount?: number }>).detail;
      setSourceWatchUnreadCount(Math.max(0, Number(detail?.unreadCount || 0)));
    }

    window.addEventListener("source-watch-alerts-updated", handleSourceWatchUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener("source-watch-alerts-updated", handleSourceWatchUpdate);
    };
  }, []);

  const activeNavigation = useMemo(
    () => {
      const group = navGroups.find((candidate) => candidate.items.some((item) => item.href === pathname));
      const item = navItems.find((candidate) => candidate.href === pathname);
      return { groupLabel: group?.label || "Accueil", itemLabel: item?.label || "Accueil" };
    },
    [pathname],
  );

  function toggleNavGroup(groupId: string) {
    setOpenNavGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  }

  function openMobileSidebar() {
    mobileSidebarTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSidebarOpen(true);
  }

  useEffect(() => {
    if (!sidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    const focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";
    const frame = window.requestAnimationFrame(() => mobileSidebarRef.current?.focus());
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSidebarOpen(false);
        return;
      }
      if (event.key !== "Tab" || !mobileSidebarRef.current) return;
      const focusable = [...mobileSidebarRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        mobileSidebarRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!mobileSidebarRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      mobileSidebarTriggerRef.current?.focus();
    };
  }, [sidebarOpen]);

  const renderSidebar = (isCollapsed: boolean, mobile = false) => (
    <AdminSidebar
      brandLogo={brandLogo}
      collapsed={isCollapsed}
      navGroups={navGroups}
      navItems={navItems}
      openNavGroups={openNavGroups}
      pathname={pathname}
      sourceWatchUnreadCount={sourceWatchUnreadCount}
      userEmail={userEmail}
      mobile={mobile}
      onCloseMobile={() => setSidebarOpen(false)}
      onToggleNavGroup={toggleNavGroup}
    />
  );

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-2 focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-on-accent"
      >
        Aller au contenu principal
      </a>
      <div className="studio-grid pointer-events-none fixed inset-0 opacity-70" />
      <div className="scanline-overlay pointer-events-none fixed inset-0" />
      <div className="energy-scan pointer-events-none fixed inset-y-0 -left-1/3 w-1/3" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2/70 to-transparent" />

      <aside
        className={cn(
          "dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden border-r border-line backdrop-blur-2xl transition-[width] duration-motion-slow lg:block",
          collapsed ? "w-[84px]" : "w-[236px] 2xl:w-[286px]",
        )}
      >
        {renderSidebar(collapsed)}
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
              ref={mobileSidebarRef}
              className="dashboard-sidebar-mobile h-full w-[286px] max-w-[calc(100vw-1rem)] border-r border-line"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation principale"
              tabIndex={-1}
              initial={{ x: -286 }}
              animate={{ x: 0 }}
              exit={{ x: -286 }}
              transition={MOTION_TRANSITION.drawer}
              onClick={(event) => event.stopPropagation()}
            >
              {renderSidebar(false, true)}
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 min-h-dvh min-w-0 transition-[padding] duration-motion-slow",
          collapsed ? "lg:pl-[84px]" : "lg:pl-[236px] 2xl:pl-[286px]",
        )}
      >
        <AdminTopbar
          activeGroupLabel={activeNavigation.groupLabel}
          activeLabel={activeNavigation.itemLabel}
          collapsed={collapsed}
          onOpenSidebar={openMobileSidebar}
          onToggleCollapsed={() => setCollapsed((value) => !value)}
          onOpenVersionHistory={() => setVersionHistoryOpen(true)}
        />

        <main
          id="dashboard-content"
          tabIndex={-1}
          className="mx-auto min-w-0 max-w-[1680px] px-4 py-5 outline-none sm:px-6 lg:py-7"
        >
          {children}
          <DashboardFooter
            version={DASHBOARD_VERSION}
            onVersionClick={() => setVersionHistoryOpen(true)}
          />
        </main>
      </div>

      <AdminVersionHistoryDialog
        entries={versionHistory}
        open={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
      />
    </div>
  );
}

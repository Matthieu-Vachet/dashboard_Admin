"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { DashboardFooter } from "@/components/admin/shared/dashboard-footer";
import { DASHBOARD_VERSION } from "@/data/app-version";
import { navGroups, navItems } from "@/constants/admin/navigation";
import { AdminVersionHistoryDialog } from "@/components/admin/layout/admin-version-history-dialog";
import { AdminSidebar } from "@/components/admin/navigation/admin-sidebar";
import { AdminTopbar } from "@/components/admin/navigation/admin-topbar";
import { useDashboardVersionHistory } from "@/hooks/admin/use-dashboard-version-history";
import { usePersistentState } from "@/lib/use-persistent-state";
import { cn } from "@/lib/cn";
import type { AdminFrameProps } from "@/types/admin/dashboard";

export function AdminAppFrame({
  children,
  userEmail,
}: AdminFrameProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openNavGroups, setOpenNavGroups] = usePersistentState(
    "matweb.dashboard.sidebarGroups",
    navGroups.map((group) => group.id),
  );
  const versionHistory = useDashboardVersionHistory();
  const brandLogo = "/ui/zygardDexLogo.png";

  const activeLabel = useMemo(
    () => navItems.find((item) => item.href === pathname)?.label || "Accueil",
    [pathname],
  );

  function toggleNavGroup(groupId: string) {
    setOpenNavGroups((current) =>
      current.includes(groupId)
        ? current.filter((id) => id !== groupId)
        : [...current, groupId],
    );
  }

  const sidebar = (
    <AdminSidebar
      brandLogo={brandLogo}
      collapsed={collapsed}
      navGroups={navGroups}
      navItems={navItems}
      openNavGroups={openNavGroups}
      pathname={pathname}
      userEmail={userEmail}
      onCloseMobile={() => setSidebarOpen(false)}
      onToggleNavGroup={toggleNavGroup}
    />
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
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
          "dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden border-r border-line backdrop-blur-2xl transition-[width] duration-300 lg:block",
          collapsed ? "w-[84px]" : "w-[236px] 2xl:w-[286px]",
        )}
      >
        {sidebar}
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
              {sidebar}
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
        <AdminTopbar
          activeLabel={activeLabel}
          collapsed={collapsed}
          onOpenSidebar={() => setSidebarOpen(true)}
          onToggleCollapsed={() => setCollapsed((value) => !value)}
          onOpenVersionHistory={() => setVersionHistoryOpen(true)}
        />

        <main
          id="dashboard-content"
          tabIndex={-1}
          className="mx-auto max-w-[1680px] px-4 py-5 outline-none sm:px-6 lg:py-7"
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

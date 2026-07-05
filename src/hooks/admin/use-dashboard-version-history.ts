"use client";

import { useEffect } from "react";
import {
  dashboardVersionHistory,
  type DashboardVersionEntry,
} from "@/data/dashboard-version-history";
import { usePersistentState } from "@/lib/use-persistent-state";

export function useDashboardVersionHistory() {
  const [versionHistory, setVersionHistory, versionHistoryReady] = usePersistentState<
    DashboardVersionEntry[]
  >("matweb.dashboard.versionHistory", dashboardVersionHistory);

  useEffect(() => {
    if (!versionHistoryReady || !Array.isArray(versionHistory)) return;

    const knownVersions = new Set(versionHistory.map((entry) => entry.version));
    const missingEntries = dashboardVersionHistory.filter(
      (entry) => !knownVersions.has(entry.version),
    );
    if (!missingEntries.length) return;

    setVersionHistory([...missingEntries, ...versionHistory]);
  }, [setVersionHistory, versionHistory, versionHistoryReady]);

  return Array.isArray(versionHistory) ? versionHistory : dashboardVersionHistory;
}

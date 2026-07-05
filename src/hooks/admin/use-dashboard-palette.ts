"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import {
  dashboardPaletteMap,
  defaultDashboardPaletteId,
  type DashboardPalette,
  type DashboardPaletteId,
} from "@/constants/admin/dashboard-palettes";
import { usePersistentState } from "@/lib/use-persistent-state";

type DashboardPaletteHook = {
  activePalette: DashboardPalette;
  paletteId: DashboardPaletteId;
  setPaletteId: (paletteId: DashboardPaletteId) => void;
};

export function useDashboardPalette(): DashboardPaletteHook {
  const [paletteId, setPaletteId] = usePersistentState<DashboardPaletteId>(
    "matweb.dashboard.palette",
    defaultDashboardPaletteId,
  );
  const { resolvedTheme } = useTheme();
  const activePalette = dashboardPaletteMap[paletteId] || dashboardPaletteMap[defaultDashboardPaletteId];

  useEffect(() => {
    const root = document.documentElement;
    const mode = resolvedTheme === "light" ? "light" : "dark";
    const palette = activePalette || dashboardPaletteMap[defaultDashboardPaletteId];

    root.dataset.dashboardPalette = palette.id;
    Object.entries(palette.modes[mode]).forEach(([token, value]) => {
      root.style.setProperty(token, value);
    });
  }, [activePalette, resolvedTheme]);

  return { activePalette, paletteId, setPaletteId };
}

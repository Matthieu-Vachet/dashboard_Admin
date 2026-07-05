"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dashboardPalettes } from "@/constants/admin/dashboard-palettes";
import { useDashboardPalette } from "@/hooks/admin/use-dashboard-palette";

export function AdminPaletteSelector() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { activePalette, setPaletteId } = useDashboardPalette();

  return (
    <div className="relative">
      <Button
        className="dashboard-palette-trigger"
        variant="secondary"
        size="icon"
        type="button"
        onClick={() => setPaletteOpen((open) => !open)}
        aria-label={`Palette dominante : ${activePalette.label}`}
        aria-expanded={paletteOpen}
      >
        <Image
          className="h-5 w-5 object-contain"
          src={activePalette.icon}
          width={22}
          height={22}
          alt=""
          unoptimized
        />
      </Button>

      <AnimatePresence>
        {paletteOpen ? (
          <motion.div
            className="dashboard-palette-menu absolute right-0 top-12 z-[90] w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line p-2 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            <div className="flex items-center gap-2 px-2 pb-2 pt-1">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-white/[0.06] text-brand-2">
                <Palette size={15} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-2">
                  Dominance
                </p>
                <p className="truncate text-xs font-bold text-muted">Palette globale</p>
              </div>
            </div>

            <div className="grid gap-1">
              {dashboardPalettes.map((palette) => {
                const active = palette.id === activePalette.id;

                return (
                  <button
                    key={palette.id}
                    className="dashboard-palette-option grid min-h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border border-line px-2.5 text-left transition"
                    data-active={active}
                    type="button"
                    onClick={() => {
                      setPaletteId(palette.id);
                      setPaletteOpen(false);
                    }}
                  >
                    <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-line bg-background/70">
                      <Image
                        className="h-5 w-5 object-contain"
                        src={palette.icon}
                        width={22}
                        height={22}
                        alt=""
                        unoptimized
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-foreground">
                        {palette.label}
                      </span>
                      <span className="block truncate text-[11px] font-bold text-muted">
                        {palette.description}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {palette.swatches.map((swatch) => (
                        <span
                          key={swatch}
                          className="h-3 w-3 rounded-full border border-white/30 shadow-sm"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                      {active ? <Check size={16} className="ml-1 text-brand-2" /> : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

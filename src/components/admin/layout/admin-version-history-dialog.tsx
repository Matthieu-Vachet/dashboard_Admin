"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { DashboardVersionEntry } from "@/data/dashboard-version-history";

type AdminVersionHistoryDialogProps = {
  entries: DashboardVersionEntry[];
  open: boolean;
  onClose: () => void;
};

export function AdminVersionHistoryDialog({
  entries,
  open,
  onClose,
}: AdminVersionHistoryDialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Historique des versions du Dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                onClick={onClose}
                aria-label="Fermer l'historique des versions"
              >
                <X size={18} />
              </button>
            </header>
            <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5">
              <div className="grid gap-3">
                {entries.map((entry) => (
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
                        <li
                          className="rounded-xl border border-line bg-slate-950/20 px-3 py-2"
                          key={change}
                        >
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
  );
}

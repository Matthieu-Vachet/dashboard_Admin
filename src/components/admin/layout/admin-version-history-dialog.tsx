"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
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
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";
    const frame = window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      (dialog.querySelector<HTMLElement>(focusableSelector) || dialog).focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      const dialog = dialogRef.current;
      if (event.key === "Escape") onCloseRef.current();
      if (event.key !== "Tab" || !dialog) return;
      const focusable = [...dialog.querySelectorAll<HTMLElement>(focusableSelector)];
      if (!focusable.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialog.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[1100] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl sm:p-5"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : undefined}
          onClick={onClose}
        >
          <motion.section
            ref={dialogRef}
            className="relative z-[1110] max-h-[calc(100dvh-2rem)] w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-card shadow-[0_24px_120px_rgba(0,0,0,.55)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={reduceMotion ? false : { y: 18, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={reduceMotion ? { y: 0, scale: 1 } : { y: 18, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 border-b border-line bg-surface-minimal p-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-2">
                  Dashboard version history
                </p>
                <h2 id={titleId} className="mt-2 text-2xl font-black">Historique des versions</h2>
                <p id={descriptionId} className="mt-2 max-w-2xl text-sm font-bold leading-6 text-muted">
                  Chaque increment de version du Dashboard est note ici pour suivre les
                  corrections, refontes et changements de donnees.
                </p>
              </div>
              <button
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-surface-control text-foreground transition hover:bg-surface-emphasis"
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
                    className="rounded-2xl border border-line bg-surface-flat p-4"
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

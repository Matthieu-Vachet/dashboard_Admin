"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

export function Modal({
  open,
  title,
  description,
  children,
  footer,
  className,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const onCloseRef = useRef(onClose);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";

    const focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";
    window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const firstFocusable = dialog.querySelector<HTMLElement>(focusableSelector);
      (firstFocusable || dialog).focus();
    });

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
        if (!focusable.length) {
          event.preventDefault();
          dialogRef.current.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!dialogRef.current.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
        else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
      previouslyFocusedRef.current?.focus();
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[1100] grid place-items-center bg-overlay p-3 backdrop-blur-xl sm:p-5">
      <div className="absolute inset-0 cursor-default" aria-hidden="true" onClick={onClose} />
      <section
        ref={dialogRef}
        className={cn(
          "relative max-h-[92dvh] w-full max-w-2xl overflow-hidden rounded-lg border border-line-strong bg-panel-strong shadow-[0_30px_120px_rgba(0,0,0,0.46)]",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line p-4 sm:p-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-xl font-black leading-tight text-foreground">{title}</h2>
            {description ? (
              <p id={descriptionId} className="mt-1 text-sm font-semibold leading-6 text-muted">{description}</p>
            ) : null}
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface-control text-muted transition hover:text-foreground"
            type="button"
            onClick={onClose}
            aria-label="Fermer la fenêtre"
          >
            <X size={18} />
          </button>
        </header>
        <div className="max-h-[calc(92dvh-9rem)] overflow-auto p-4 sm:p-5">{children}</div>
        {footer ? <footer className="border-t border-line p-4 sm:p-5">{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  );
}

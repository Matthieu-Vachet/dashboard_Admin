"use client";

import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
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
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[1100] grid place-items-center bg-black/65 p-3 backdrop-blur-xl sm:p-5">
      <button className="absolute inset-0 cursor-default" type="button" aria-label="Fermer" onClick={onClose} />
      <section
        className={cn(
          "relative max-h-[92dvh] w-full max-w-2xl overflow-hidden rounded-lg border border-line-strong bg-panel-strong shadow-[0_30px_120px_rgba(0,0,0,0.46)]",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <header className="flex items-start justify-between gap-4 border-b border-line p-4 sm:p-5">
          <div className="min-w-0">
            <h2 className="text-xl font-black leading-tight text-foreground">{title}</h2>
            {description ? (
              <p className="mt-1 text-sm font-semibold leading-6 text-muted">{description}</p>
            ) : null}
          </div>
          <button
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/[0.06] text-muted transition hover:text-foreground"
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

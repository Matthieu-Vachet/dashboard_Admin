import { Copyright, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";

const COPYRIGHT_START_YEAR = 2024;

function getCopyrightYears() {
  const currentYear = new Date().getFullYear();
  return currentYear === COPYRIGHT_START_YEAR
    ? `${COPYRIGHT_START_YEAR}`
    : `${COPYRIGHT_START_YEAR}–${currentYear}`;
}

export function DashboardFooter({
  version,
  onVersionClick,
  className,
}: {
  version: string;
  onVersionClick?: () => void;
  className?: string;
}) {
  return (
    <footer className={cn("mt-8 border-t border-line pt-4", className)}>
      <div className="flex flex-col gap-3 rounded-lg border border-line bg-white/[0.035] px-3 py-3 text-[0.68rem] font-bold leading-5 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:flex-row sm:items-center sm:justify-between">
        <p className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <Copyright size={13} className="shrink-0 text-brand-2/85" aria-hidden="true" />
          <span>© {getCopyrightYears()} MatWeb Innovation. Tous droits réservés.</span>
          <span className="hidden text-muted/55 sm:inline">•</span>
          <span className="inline-flex items-center gap-1 text-muted/80">
            <ShieldCheck size={13} className="shrink-0 text-brand-3/85" aria-hidden="true" />
            Protected by MatWeb Innovation
          </span>
        </p>

        {onVersionClick ? (
          <button
            type="button"
            onClick={onVersionClick}
            className="inline-flex w-fit items-center rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-brand-2 transition hover:border-brand-2/55 hover:bg-brand-2/15"
            aria-label="Ouvrir l'historique des versions du Dashboard"
          >
            {version}
          </button>
        ) : (
          <span className="inline-flex w-fit rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-brand-2">
            {version}
          </span>
        )}
      </div>
    </footer>
  );
}

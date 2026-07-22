"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Activity, ArrowUpRight, BookOpen, FileJson2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type ApiHealth = {
  connected: boolean;
  api: string;
  database: string;
  statusCode: number | null;
  uptimeSeconds: number | null;
  timestamp: string | null;
  label: string;
  docsUrl: string;
  swaggerUrl: string;
  detail?: string;
};

const fallbackHealth: ApiHealth = {
  connected: false,
  api: "sync",
  database: "unknown",
  statusCode: null,
  uptimeSeconds: null,
  timestamp: null,
  label: "Vérification API...",
  docsUrl: "https://pokemon-go-api.vercel.app/api-docs",
  swaggerUrl: "https://pokemon-go-api.vercel.app/swagger",
};

export function PokemonApiStatus({ compact = false }: { compact?: boolean }) {
  const [health, setHealth] = useState<ApiHealth>(fallbackHealth);

  useEffect(() => {
    let active = true;

    fetch("/api/pokemon-api-health", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        if (active) setHealth(payload.data || fallbackHealth);
      })
      .catch((error) => {
        if (active) {
          setHealth({
            ...fallbackHealth,
            label: "API indisponible",
            detail: error instanceof Error ? error.message : "Erreur réseau.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={cn("rounded-lg border border-line bg-surface-subtle p-3", compact ? "space-y-3" : "space-y-4")}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className={cn(
            "inline-flex min-h-14 w-fit items-center gap-3 rounded-lg border px-4 text-base font-black",
            health.connected
              ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-100"
              : "border-amber-300/25 bg-amber-400/10 text-amber-100",
          )}
        >
          <span
            className={cn(
              "h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_24px_currentColor]",
              health.connected ? "bg-emerald-400 text-emerald-400" : "bg-amber-300 text-amber-300",
            )}
          />
          {health.label}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm">
            <a href={health.docsUrl} target="_blank" rel="noreferrer">
              <BookOpen size={15} />
              Redoc
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={health.swaggerUrl} target="_blank" rel="noreferrer">
              <FileJson2 size={15} />
              Swagger
            </a>
          </Button>
        </div>
      </div>

      {!compact ? (
        <div className="grid gap-2 sm:grid-cols-3">
          <MiniStatus icon={<Activity size={15} />} label="API" value={health.api.toUpperCase()} />
          <MiniStatus label="DB" value={health.database} />
          <MiniStatus
            label="Uptime"
            value={health.uptimeSeconds ? `${Math.floor(health.uptimeSeconds / 60)} min` : "?"}
          />
        </div>
      ) : null}

      {health.detail ? (
        <p className="text-xs font-bold text-amber-100">{health.detail}</p>
      ) : null}
    </div>
  );
}

function MiniStatus({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface-recessed px-3 py-2">
      <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
        {icon}
        {label}
      </span>
      <span className="inline-flex items-center gap-1 text-xs font-black text-foreground">
        {value}
        <ArrowUpRight size={13} className="text-brand-2" />
      </span>
    </div>
  );
}

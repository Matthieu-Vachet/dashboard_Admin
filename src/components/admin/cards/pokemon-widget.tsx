"use client";

import { useEffect, useState } from "react";
import { Activity, Database, ShieldCheck } from "lucide-react";
import { FetchLoadingState } from "@/components/admin/shared/state-system";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PokemonMetrics } from "@/lib/pokemon";

export function PokemonWidget() {
  const [metrics, setMetrics] = useState<PokemonMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/pokemon-stats")
      .then((response) => response.json())
      .then((data: PokemonMetrics) => {
        if (active) {
          setMetrics(data);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Card className="p-4">
      <CardHeader
        eyebrow="Pokemon GO API"
        action={
          <Badge tone={metrics?.source === "live" ? "green" : "amber"}>
            {metrics?.status || "sync"}
          </Badge>
        }
      >
        <CardTitle>Statistiques connectées</CardTitle>
        <CardDescription>
          {metrics?.detail || "Vue reliée à ton endpoint public `/api/checklist-v3`."}
        </CardDescription>
      </CardHeader>

      {loading ? (
        <FetchLoadingState className="mt-6 min-h-44" title="Synchronisation des statistiques…" />
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric icon={Database} label="Entrées" value={metrics?.total.toLocaleString("fr-FR") || "0"} />
          <Metric icon={ShieldCheck} label="Qualité" value={`${metrics?.quality || 0}%`} />
          <Metric icon={Activity} label="Issues" value={String(metrics?.issues || 0)} />
          <div className="sm:col-span-3">
            <div className="grid grid-cols-3 gap-2">
              {metrics?.generations.slice(0, 9).map((item) => (
                <Card tone="flat" key={item.name} className="p-2">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span>{item.name}</span>
                    <span className="text-brand-3">{item.completion}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-emphasis">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-3 to-brand-2"
                      style={{ width: `${item.completion}%` }}
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Database;
  label: string;
  value: string;
}) {
  return (
    <Card tone="flat" className="p-3">
      <Icon size={17} className="text-brand-2" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-black">{value}</p>
    </Card>
  );
}

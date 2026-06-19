"use client";

import { useEffect, useState } from "react";
import { Activity, Database, ShieldCheck } from "lucide-react";
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
        action={<Badge tone={metrics?.source === "live" ? "green" : "amber"}>{metrics?.source || "sync"}</Badge>}
      >
        <CardTitle>Statistiques connectées</CardTitle>
        <CardDescription>
          Vue reliée à ton endpoint public `/api/checklist-v3`.
        </CardDescription>
      </CardHeader>

      {loading ? (
        <div className="mt-6 grid h-44 place-items-center rounded-lg border border-line bg-white/[0.04] text-sm font-bold text-muted">
          Synchronisation...
        </div>
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Metric icon={Database} label="Entrées" value={metrics?.total.toLocaleString("fr-FR") || "0"} />
          <Metric icon={ShieldCheck} label="Qualité" value={`${metrics?.quality || 0}%`} />
          <Metric icon={Activity} label="Issues" value={String(metrics?.issues || 0)} />
          <div className="sm:col-span-3">
            <div className="grid grid-cols-3 gap-2">
              {metrics?.generations.slice(0, 9).map((item) => (
                <div key={item.name} className="rounded-lg border border-line bg-white/[0.045] p-2">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span>{item.name}</span>
                    <span className="text-brand-3">{item.completion}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-3 to-brand-2"
                      style={{ width: `${item.completion}%` }}
                    />
                  </div>
                </div>
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
    <div className="rounded-lg border border-line bg-white/[0.045] p-3">
      <Icon size={17} className="text-brand-2" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-mono text-2xl font-black">{value}</p>
    </div>
  );
}

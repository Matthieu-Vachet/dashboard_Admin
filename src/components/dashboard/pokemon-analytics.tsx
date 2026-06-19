"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PokemonMetrics } from "@/lib/pokemon";

const colors = ["#20d3ff", "#905bf4", "#58f2a9", "#ffd166", "#ff5f7d"];

export function PokemonAnalytics() {
  const [metrics, setMetrics] = useState<PokemonMetrics | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    fetch("/api/pokemon-stats")
      .then((response) => response.json())
      .then((data: PokemonMetrics) => setMetrics(data));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-4">
      <Card tone="strong" className="p-5">
        <Badge tone={metrics?.source === "live" ? "green" : "amber"}>
          {metrics?.source === "live" ? "Connecté live" : metrics?.status || "Fallback prêt"}
        </Badge>
        <h2 className="mt-3 text-3xl font-black">Statistiques Pokémon GO API</h2>
        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted">
          {metrics?.detail ||
            "Cette page consomme ton endpoint `checklist-v3` et transforme le résumé en widgets de pilotage."}
        </p>
      </Card>

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Entrées" value={metrics?.total.toLocaleString("fr-FR") || "..."} />
        <Metric label="Complètes" value={metrics?.complete.toLocaleString("fr-FR") || "..."} />
        <Metric label="Qualité" value={metrics ? `${metrics.quality}%` : "..."} />
        <Metric label="Moves" value={metrics?.catalog.moves.toLocaleString("fr-FR") || "..."} />
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="min-w-0 p-4">
          <CardHeader eyebrow="Générations">
            <CardTitle>Complétion par génération</CardTitle>
            <CardDescription>Volume et taux qualité de la checklist.</CardDescription>
          </CardHeader>
          <div className="mt-6 h-80 min-h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <BarChart data={metrics?.generations || []} margin={{ left: -20 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 13, 24, 0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    color: "#eef3ff",
                  }}
                />
                <Bar dataKey="entries" radius={[8, 8, 0, 0]} fill="#20d3ff" />
              </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg border border-line bg-white/[0.035]" />
            )}
          </div>
        </Card>

        <Card className="min-w-0 p-4">
          <CardHeader eyebrow="Types">
            <CardTitle>Répartition des fiches</CardTitle>
            <CardDescription>Pokémon, formes, dynamax, mega et gigantamax.</CardDescription>
          </CardHeader>
          <div className="mt-6 h-80 min-h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(10, 13, 24, 0.95)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 8,
                    color: "#eef3ff",
                  }}
                />
                <Pie
                  data={metrics?.kinds || []}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={112}
                  paddingAngle={3}
                >
                  {(metrics?.kinds || []).map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg border border-line bg-white/[0.035]" />
            )}
          </div>
        </Card>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-3 font-mono text-3xl font-black">{value}</p>
    </Card>
  );
}

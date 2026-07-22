"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  CloudSun,
  Database,
  ShieldCheck,
  Sparkles,
  Sticker,
  Swords,
  Tags,
  type LucideIcon,
} from "lucide-react";
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

const colors = ["var(--brand-2)", "var(--brand)", "var(--brand-3)", "var(--warning)", "var(--danger)"];
const tooltipStyle = {
  background: "var(--panel-strong)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  color: "var(--foreground)",
};
const tooltipCursor = { fill: "var(--accent-muted)" };

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

  const catalogData = metrics
    ? [
        { name: "Types", value: metrics.catalog.types, color: "var(--brand-2)" },
        { name: "Météo", value: metrics.catalog.weather, color: "var(--brand-3)" },
        { name: "Stickers", value: metrics.catalog.stickers, color: "var(--brand)" },
        { name: "Moves", value: metrics.catalog.moves, color: "var(--warning)" },
      ]
    : [];
  const largestGeneration = metrics?.generations.length
    ? metrics.generations.reduce((largest, item) => (item.entries > largest.entries ? item : largest))
    : null;
  const kindTotal = metrics?.kinds.reduce((total, item) => total + item.value, 0) || 0;

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

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Database} label="Entrées" value={metrics?.total.toLocaleString("fr-FR") || "..."} tone="cyan" />
        <Metric icon={ShieldCheck} label="Complètes" value={metrics?.complete.toLocaleString("fr-FR") || "..."} tone="green" />
        <Metric icon={Sparkles} label="Qualité" value={metrics ? `${metrics.quality}%` : "..."} tone="violet" />
        <Metric icon={Swords} label="Moves" value={metrics?.catalog.moves.toLocaleString("fr-FR") || "..."} tone="amber" />
        <Metric icon={Tags} label="Types" value={metrics?.catalog.types.toLocaleString("fr-FR") || "..."} tone="cyan" />
        <Metric icon={CloudSun} label="Météos" value={metrics?.catalog.weather.toLocaleString("fr-FR") || "..."} tone="green" />
        <Metric icon={Sticker} label="Stickers" value={metrics?.catalog.stickers.toLocaleString("fr-FR") || "..."} tone="violet" />
        <Metric icon={BarChart3} label="Top génération" value={largestGeneration ? `${largestGeneration.name} · ${largestGeneration.entries}` : "..."} tone="amber" />
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
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted)" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={tooltipCursor} />
                <Bar dataKey="entries" radius={[8, 8, 0, 0]} fill="var(--brand-2)" activeBar={{ fill: "var(--brand-3)" }} />
              </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg border border-line bg-surface-faint" />
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
                <Tooltip contentStyle={tooltipStyle} />
                <Pie
                  data={metrics?.kinds || []}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={112}
                  paddingAngle={3}
                  stroke="var(--background)"
                  strokeWidth={3}
                >
                  {(metrics?.kinds || []).map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
              </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg border border-line bg-surface-faint" />
            )}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card className="min-w-0 p-4">
          <CardHeader eyebrow="Catalogues">
            <CardTitle>Inventaire API</CardTitle>
            <CardDescription>Types, météo, stickers et attaques indexés.</CardDescription>
          </CardHeader>
          <div className="mt-6 h-72 min-h-72 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                <BarChart data={catalogData} layout="vertical" margin={{ left: 6, right: 20 }}>
                  <CartesianGrid stroke="var(--line)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted)" tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--muted)" tickLine={false} axisLine={false} width={72} />
                  <Tooltip contentStyle={tooltipStyle} cursor={tooltipCursor} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} activeBar={{ fill: "var(--brand-3)" }}>
                    {catalogData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </Card>

        <Card className="p-4">
          <CardHeader eyebrow="Lecture rapide">
            <CardTitle>Répartition exploitable</CardTitle>
            <CardDescription>Volumes par famille de données Pokémon.</CardDescription>
          </CardHeader>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(metrics?.kinds || []).map((kind, index) => (
              <Card tone="flat" key={kind.name} className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-black capitalize">{kind.name}</p>
                  <span className="font-mono text-sm font-black text-brand-2">
                    {kindTotal ? Math.round((kind.value / kindTotal) * 100) : 0}%
                  </span>
                </div>
                <p className="mt-2 font-mono text-2xl font-black">{kind.value.toLocaleString("fr-FR")}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-emphasis">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: `${kindTotal ? (kind.value / kindTotal) * 100 : 0}%`,
                      backgroundColor: colors[index % colors.length],
                    }}
                  />
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: "cyan" | "green" | "violet" | "amber";
}) {
  const toneClass = {
    cyan: "text-brand-2 bg-brand-2/10 border-brand-2/20",
    green: "text-brand-3 bg-brand-3/10 border-brand-3/20",
    violet: "text-brand bg-brand/10 border-brand/20",
    amber: "text-warning bg-warning/10 border-warning/20",
  }[tone];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
          <p className="mt-3 font-mono text-3xl font-black">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded-lg border ${toneClass}`}>
          <Icon size={19} />
        </span>
      </div>
    </Card>
  );
}

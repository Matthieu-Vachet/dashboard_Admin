"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Activity, BarChart3, Database, HardDrive, KeyRound, RefreshCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SortableWidgetGrid, type SortableWidgetItem } from "@/components/admin/shared/sortable-widget-grid";

type DatabaseStatsPayload = {
  configured: boolean;
  database: string;
  collection: string;
  ownerDocuments: number;
  totalDocuments: number;
  approxOwnerBytes: number;
  storageSize: number;
  indexSize: number;
  keys: Array<{ key: string; approxBytes: number; updatedAt: string; createdAt: string }>;
  usage: {
    total: number;
    days: number;
    perDay: Array<{ day: string; count: number }>;
    endpoints: Array<{ endpoint: string; count: number }>;
  };
  updatedAt: string;
};

const fallbackStats: DatabaseStatsPayload = {
  configured: false,
  database: "matweb-dashboard-admin",
  collection: "dashboard_store",
  ownerDocuments: 0,
  totalDocuments: 0,
  approxOwnerBytes: 0,
  storageSize: 0,
  indexSize: 0,
  keys: [],
  usage: { total: 0, days: 14, perDay: [], endpoints: [] },
  updatedAt: "",
};

/** Convertit un poids MongoDB en texte lisible pour éviter les nombres bruts. */
function formatBytes(value: number) {
  if (!value) return "0 o";
  const units = ["o", "Ko", "Mo", "Go"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

/** Formate une date stable côté client sans créer de mismatch d'hydratation. */
function formatDateTime(value: string) {
  if (!value) return "Jamais";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Jamais";
  return date.toLocaleString("fr-FR");
}

export function DatabaseStats() {
  const [stats, setStats] = useState<DatabaseStatsPayload>(fallbackStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** Recharge les métriques Mongo sans cache pour afficher les appels API récents. */
  async function loadStats() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/database-stats", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Stats MongoDB indisponibles.");
      setStats(payload.data || fallbackStats);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Stats MongoDB indisponibles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadStats();
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const maxKeySize = useMemo(
    () => Math.max(...stats.keys.map((item) => item.approxBytes), 1),
    [stats.keys],
  );
  const databaseWidgets: SortableWidgetItem[] = [
    {
      id: "activity",
      node: (
        <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
          <CardHeader eyebrow="Appels API">
            <CardTitle>Activité dashboard stockée dans Mongo</CardTitle>
            <CardDescription>
              Les compteurs suivent les routes dashboard par jour, sans étirer le graphe sur mobile.
            </CardDescription>
          </CardHeader>
          <div className="mt-5 grid min-w-0 gap-4 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
            <ApiTimeline items={stats.usage.perDay} />
            <EndpointBars items={stats.usage.endpoints} />
          </div>
        </Card>
      ),
    },
    {
      id: "keys",
      node: (
        <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
          <CardHeader eyebrow="Clés stockées">
            <CardTitle>Documents utilisés par le dashboard</CardTitle>
            <CardDescription>Chaque ligne correspond à un module persistant, avec taille approximative côté JSON.</CardDescription>
          </CardHeader>
          <div className="mt-5 space-y-3">
            {stats.keys.length ? (
              stats.keys.map((item, index) => (
                <motion.div
                  className="min-w-0 rounded-lg border border-line bg-white/[0.045] p-3"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.025 }}
                  key={item.key}
                >
                  <div className="mb-2 flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                    <span className="min-w-0 break-all text-sm font-black sm:truncate">{item.key}</span>
                    <span className="shrink-0 font-mono text-xs font-black text-muted">{formatBytes(item.approxBytes)}</span>
                  </div>
                  <span className="block h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-brand-2 via-brand to-brand-3"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(5, (item.approxBytes / maxKeySize) * 100)}%` }}
                      transition={{ duration: 0.5, delay: index * 0.025 }}
                    />
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted">
                Aucun document stocké pour ce compte.
              </p>
            )}
          </div>
        </Card>
      ),
    },
    {
      id: "collection",
      node: (
        <Card className="min-w-0 overflow-hidden p-4 sm:p-5">
          <CardHeader eyebrow="Collection">
            <CardTitle>{stats.collection}</CardTitle>
            <CardDescription>Base: {stats.database}</CardDescription>
          </CardHeader>
          <div className="mt-5 grid gap-3">
            <MiniRow label="Stockage collection" value={formatBytes(stats.storageSize)} />
            <MiniRow label="Index MongoDB" value={formatBytes(stats.indexSize)} />
            <MiniRow label="Documents total" value={stats.totalDocuments.toLocaleString("fr-FR")} />
            <MiniRow label="Dernière lecture" value={formatDateTime(stats.updatedAt)} />
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(32,211,255,.18),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(88,242,169,.14),transparent_30%)]" />
        <CardHeader
          className="relative z-10"
          eyebrow="MongoDB"
          action={
            <Button onClick={loadStats} disabled={loading}>
              <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
              Actualiser
            </Button>
          }
        >
          <CardTitle className="text-2xl sm:text-3xl">Utilisation de la base dashboard</CardTitle>
          <CardDescription>
            Suivi du stockage personnel utilisé par les modules, règles JSON et pages dashboard.
          </CardDescription>
        </CardHeader>
      </Card>

      {error ? (
        <Card className="border-amber-300/25 bg-amber-400/10 p-4 text-sm font-bold text-amber-100">
          {error}
        </Card>
      ) : null}

      <section className="grid min-w-0 items-start gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ShieldCheck} label="Connexion" value={stats.configured ? "Active" : "Non configurée"} tone="green" />
        <StatCard icon={Database} label="Documents compte" value={stats.ownerDocuments.toLocaleString("fr-FR")} tone="cyan" />
        <StatCard icon={Activity} label="Appels API suivis" value={stats.usage.total.toLocaleString("fr-FR")} tone="violet" />
        <StatCard icon={HardDrive} label="Volume compte" value={formatBytes(stats.approxOwnerBytes)} tone="amber" />
      </section>

      <SortableWidgetGrid
        columnsClassName="columns-1 xl:columns-2"
        items={databaseWidgets}
        storageKey="matweb.mongo.widgetOrder"
      />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Database;
  label: string;
  value: string;
  tone: "cyan" | "green" | "violet" | "amber";
}) {
  const toneClass = {
    cyan: "border-brand-2/25 bg-brand-2/10 text-brand-2",
    green: "border-brand-3/25 bg-brand-3/10 text-brand-3",
    violet: "border-brand/25 bg-brand/10 text-brand",
    amber: "border-warning/25 bg-warning/10 text-warning",
  }[tone];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="min-w-0 overflow-hidden p-4">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_2.75rem] items-start gap-3">
          <span className="min-w-0 overflow-hidden">
            <span className="block break-words text-[11px] font-black uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.16em]">{label}</span>
            <strong className="mt-3 block max-w-full break-words text-xl font-black leading-tight sm:text-2xl">{value}</strong>
          </span>
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg border ${toneClass}`}>
            <Icon size={20} />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

/** Dessine les appels par jour avec des barres visibles même après animation. */
function ApiTimeline({ items }: { items: Array<{ day: string; count: number }> }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-line bg-black/15 p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <strong className="inline-flex items-center gap-2 text-sm font-black">
          <BarChart3 size={16} className="text-brand-2" />
          14 derniers jours
        </strong>
        <span className="text-xs font-black text-muted">
          {items.reduce((sum, item) => sum + item.count, 0).toLocaleString("fr-FR")} appels
        </span>
      </div>
      <div className="flex h-32 items-end gap-1 sm:h-40 sm:gap-2">
        {items.length ? (
          items.map((item, index) => (
            <div className="flex min-w-0 flex-1 basis-0 flex-col items-center gap-2 self-stretch" key={item.day}>
              <span className="flex min-h-0 w-full flex-1 items-end">
                <motion.span
                  className="block w-full rounded-t-lg bg-gradient-to-t from-brand via-brand-2 to-brand-3 shadow-[0_0_22px_rgba(32,211,255,.22)]"
                  initial={{ height: 0 }}
                  animate={{ height: item.count ? `${Math.max(8, (item.count / max) * 100)}%` : "0%" }}
                  transition={{ duration: 0.48, delay: index * 0.025 }}
                  title={`${item.day}: ${item.count}`}
                />
              </span>
              <span className="max-w-full truncate text-[9px] font-black text-muted sm:text-[10px]">{item.day.slice(5)}</span>
            </div>
          ))
        ) : (
          <p className="m-auto text-sm font-semibold text-muted">Aucun appel suivi pour le moment.</p>
        )}
      </div>
    </div>
  );
}

/** Affiche les routes les plus utilisées sans laisser les noms longs déborder sur mobile. */
function EndpointBars({ items }: { items: Array<{ endpoint: string; count: number }> }) {
  const max = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-line bg-black/15 p-3 sm:p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <strong className="text-sm font-black">Top endpoints</strong>
        <span className="text-xs font-black text-muted">{items.length} routes</span>
      </div>
      <div className="space-y-3">
        {items.length ? (
          items.map((item, index) => (
            <div className="min-w-0" key={item.endpoint}>
              <div className="mb-1 flex min-w-0 items-start justify-between gap-3">
                <span className="min-w-0 break-all text-xs font-black leading-5 sm:truncate">{item.endpoint}</span>
                <span className="font-mono text-xs font-black text-muted">{item.count}</span>
              </div>
              <span className="block h-2.5 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  className="block h-full rounded-full bg-gradient-to-r from-brand-2 via-brand to-brand-3"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(5, (item.count / max) * 100)}%` }}
                  transition={{ duration: 0.45, delay: index * 0.035 }}
                />
              </span>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted">
            Les endpoints apparaîtront après les prochains appels API.
          </p>
        )}
      </div>
    </div>
  );
}

function MiniRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-lg border border-line bg-white/[0.045] p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      <span className="inline-flex min-w-0 items-center gap-2 break-words text-[11px] font-black uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.16em]">
        <KeyRound size={14} />
        {label}
      </span>
      <strong className="min-w-0 break-words text-sm font-black sm:text-right">{value}</strong>
    </div>
  );
}

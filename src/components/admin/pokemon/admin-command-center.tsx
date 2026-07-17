"use client";

import {
  Activity,
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  Fingerprint,
  History,
  Image as ImageIcon,
  Radar,
  RefreshCcw,
  Search,
  ShieldAlert,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Summary = {
  total?: number;
  complete?: number;
  issues?: number;
};

type SourceItem = {
  id?: string;
  name?: string;
  repo?: string;
  status?: string;
  message?: string | null;
  updatedAt?: string | null;
};

type SourceWatch = {
  loading?: boolean;
  error?: string;
  sources?: SourceItem[];
  changedSources?: SourceItem[];
} | null;

type EventItem = {
  id?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
  eventType?: string;
};

type RemoteOverview = {
  loading: boolean;
  aliasesUnresolved: number | null;
  conflicts: number | null;
  variantsUnmatched: number | null;
  activeEvents: number | null;
  upcomingEvents: number | null;
  activeItems: EventItem[];
  upcomingItems: EventItem[];
  unavailableServices: number;
};

type HistoryItem = {
  hash?: string;
  date?: string;
  iso?: string;
  subject?: string;
  message?: string;
};

type Freshness = {
  data?: { iso?: string; date?: string; subject?: string } | null;
  repo?: { date?: string; subject?: string; hash?: string } | null;
} | null;

type CommandCenterProps = {
  summary: Summary;
  assetCheckedCount: number;
  assetsToVerify: number;
  filteredCount: number;
  sourceWatch: SourceWatch;
  history: HistoryItem[];
  freshness: Freshness;
  search: string;
  refreshing?: boolean;
  onSearchChange: (value: string) => void;
  onNavigate: (section: string) => void;
  onRefresh: () => void;
};

const emptyRemote: RemoteOverview = {
  loading: true,
  aliasesUnresolved: null,
  conflicts: null,
  variantsUnmatched: null,
  activeEvents: null,
  upcomingEvents: null,
  activeItems: [],
  upcomingItems: [],
  unavailableServices: 0,
};

function formatDate(value?: string | null) {
  if (!value) return "Jamais";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Paris" }).format(date);
}

function numberLabel(value: number | null) {
  return value === null ? "—" : value.toLocaleString("fr-FR");
}

async function readJson(url: string) {
  const response = await fetch(url, { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) throw new Error(payload.error || `HTTP ${response.status}`);
  return payload.data;
}

function resultValue<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === "fulfilled" ? result.value : null;
}

function countConflicts(resource: Record<string, unknown> | null) {
  const data = resource?.data && typeof resource.data === "object" ? resource.data as Record<string, unknown> : resource;
  const aliases = Array.isArray(data?.aliasConflicts) ? data.aliasConflicts.length : 0;
  return Number(data?.explicitConflicts || 0) + aliases;
}

function providerHasError(source: SourceItem) {
  return ["failed", "error", "unavailable", "blocked"].includes(String(source.status || "").toLowerCase());
}

function StatCard({ icon: Icon, label, value, detail, tone, onClick }: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "green" | "amber" | "red" | "violet";
  onClick?: () => void;
}) {
  const tones = {
    cyan: "border-cyan-300/20 bg-cyan-400/10 text-cyan-100",
    green: "border-emerald-300/20 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-300/20 bg-amber-400/10 text-amber-100",
    red: "border-rose-300/20 bg-rose-400/10 text-rose-100",
    violet: "border-violet-300/20 bg-violet-400/10 text-violet-100",
  };
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-lg border ${tones[tone]}`}><Icon size={19} /></span>
        {onClick ? <ArrowRight className="text-muted transition-transform group-hover:translate-x-1 motion-reduce:transition-none" size={16} /> : null}
      </div>
      <span className="mt-4 block text-[10px] font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <strong className="mt-1 block text-3xl font-black text-foreground">{value}</strong>
      <small className="mt-1 block text-xs font-semibold text-muted">{detail}</small>
    </>
  );

  return onClick ? (
    <button className="group min-w-0 rounded-lg border border-line bg-white/[0.045] p-4 text-left transition hover:border-brand-2/35 hover:bg-white/[0.075]" type="button" onClick={onClick}>
      {content}
    </button>
  ) : <Card className="min-w-0 border border-line p-4">{content}</Card>;
}

function EventLine({ event, label }: { event?: EventItem; label: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.035] p-3">
      <CalendarClock className="mt-0.5 shrink-0 text-brand-2" size={17} />
      <div className="min-w-0">
        <span className="text-[9px] font-black uppercase tracking-[0.14em] text-muted">{label}</span>
        <strong className="mt-1 block truncate text-sm text-foreground">{event?.title || "Aucun événement"}</strong>
        <small className="mt-1 block text-xs text-muted">{event?.startDate ? formatDate(event.startDate) : "Aucune date disponible"}</small>
      </div>
    </div>
  );
}

export function AdminCommandCenter({
  summary,
  assetCheckedCount,
  assetsToVerify,
  filteredCount,
  sourceWatch,
  history,
  freshness,
  search,
  refreshing = false,
  onSearchChange,
  onNavigate,
  onRefresh,
}: CommandCenterProps) {
  const [remote, setRemote] = useState<RemoteOverview>(emptyRemote);

  const loadRemoteOverview = useCallback(async () => {
    const results = await Promise.allSettled([
      readJson("/api/pokemon-admin?action=identity-manager-diagnostics&status=open&page=1&limit=1"),
      readJson("/api/pokemon-admin?action=identity-manager-conflicts"),
      readJson("/api/pokemon-admin?action=pokemon-identity-mappings&page=1&limit=1"),
      readJson("/api/admin/events/archive?status=active&activeInCurrentFeed=true&page=1&limit=4"),
      readJson("/api/admin/events/archive?status=upcoming&activeInCurrentFeed=true&page=1&limit=4"),
    ]);
    const diagnostics = resultValue(results[0]) as Record<string, unknown> | null;
    const conflicts = resultValue(results[1]) as Record<string, unknown> | null;
    const mappings = resultValue(results[2]) as Record<string, unknown> | null;
    const active = resultValue(results[3]) as { items?: EventItem[]; meta?: { total?: number } } | null;
    const upcoming = resultValue(results[4]) as { items?: EventItem[]; meta?: { total?: number } } | null;
    const mappingData = mappings?.data && typeof mappings.data === "object"
      ? mappings.data as { metadata?: { total?: number; statusCounts?: Record<string, number> } }
      : {};
    const metadata = mappingData.metadata;
    const mappingTotal = Number(metadata?.total || 0);
    const matched = Number(metadata?.statusCounts?.matched || 0);
    setRemote({
      loading: false,
      aliasesUnresolved: diagnostics ? Number((diagnostics.meta as { total?: number } | undefined)?.total || 0) : null,
      conflicts: conflicts ? countConflicts(conflicts) : null,
      variantsUnmatched: mappings ? Math.max(0, mappingTotal - matched) : null,
      activeEvents: active ? Number(active.meta?.total || 0) : null,
      upcomingEvents: upcoming ? Number(upcoming.meta?.total || 0) : null,
      activeItems: active?.items || [],
      upcomingItems: upcoming?.items || [],
      unavailableServices: results.filter((result) => result.status === "rejected").length,
    });
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadRemoteOverview(), 0);
    return () => window.clearTimeout(timer);
  }, [loadRemoteOverview]);

  const providerErrors = useMemo(() => {
    const explicit = sourceWatch?.sources?.filter(providerHasError).length || 0;
    return explicit + (sourceWatch?.error ? 1 : 0) + remote.unavailableServices;
  }, [remote.unavailableServices, sourceWatch]);
  const changedSources = sourceWatch?.changedSources || [];
  const complete = Number(summary.complete || 0);
  const total = Number(summary.total || 0);
  const quality = Math.round((complete / Math.max(1, total)) * 100);
  const hour = Number(new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", hour12: false, timeZone: "Europe/Paris" }).format(new Date()));
  const greeting = hour < 12 ? "Bonjour" : hour < 18 ? "Bon après-midi" : "Bonsoir";
  const attentionCount = Number(summary.issues || 0) + Number(remote.aliasesUnresolved || 0) + Number(remote.conflicts || 0) + providerErrors;
  const lastSync = freshness?.data?.iso || freshness?.data?.date || history[0]?.iso || history[0]?.date;
  const recentHistory = history.slice(0, 3);

  function refreshAll() {
    onRefresh();
    setRemote((current) => ({ ...current, loading: true }));
    void loadRemoteOverview();
  }

  return (
    <section className="space-y-4" aria-label="Centre de commande Admin Pokémon">
      <Card tone="strong" className="relative overflow-hidden border border-brand-2/20 p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(34,211,238,.17),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(139,92,246,.14),transparent_30%)]" />
        <div className="relative grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,.75fr)] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={attentionCount ? "amber" : "green"}>{attentionCount ? "Attention requise" : "Tous les systèmes sont opérationnels"}</Badge>
              <Badge tone={providerErrors ? "red" : "cyan"}>{providerErrors ? `${providerErrors} service(s) indisponible(s)` : "Providers disponibles"}</Badge>
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-brand-2">{greeting}, Admin Pokémon</p>
            <h2 className="mt-2 max-w-3xl text-2xl font-black leading-tight text-foreground sm:text-3xl">Voici ce qui demande votre attention aujourd’hui.</h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm font-semibold text-muted"><Clock3 size={15} /> Dernière synchronisation : <strong className="text-foreground">{formatDate(lastSync)}</strong></p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button variant="primary" icon={<RefreshCcw className={refreshing || remote.loading ? "animate-spin" : ""} size={16} />} onClick={refreshAll} disabled={refreshing || remote.loading}>Actualiser le centre</Button>
              <Button variant="secondary" icon={<Fingerprint size={16} />} onClick={() => onNavigate("identity-manager")}>Ouvrir l’Identity Manager</Button>
              <Button variant="secondary" icon={<ShieldAlert size={16} />} onClick={() => onNavigate("checks")}>Ouvrir les diagnostics</Button>
            </div>
          </div>
          <div>
            <label className="text-xs font-black uppercase tracking-[0.14em] text-muted" htmlFor="pokemon-admin-command-search">Recherche Admin Pokémon</label>
            <span className="relative mt-2 block"><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={17} /><Input id="pokemon-admin-command-search" className="pl-10" value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Pokémon, forme, costume, diagnostic…" /></span>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button size="sm" variant="ghost" icon={<CalendarDays size={15} />} onClick={() => onNavigate("events")}>Événements</Button>
              <Button size="sm" variant="ghost" icon={<ImageIcon size={15} />} onClick={() => onNavigate("assets")}>Vérifier les assets</Button>
              <Button size="sm" variant="ghost" icon={<Radar size={15} />} onClick={() => onNavigate("pokemon-identity-mappings")}>Variantes</Button>
              <Button size="sm" variant="ghost" icon={<History size={15} />} onClick={() => onNavigate("logs")}>Historique</Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-6">
        <StatCard icon={CalendarDays} label="Événements actifs" value={numberLabel(remote.activeEvents)} detail="présents dans le flux" tone="green" onClick={() => onNavigate("events")} />
        <StatCard icon={CalendarClock} label="Prochains événements" value={numberLabel(remote.upcomingEvents)} detail="planifiés à venir" tone="cyan" onClick={() => onNavigate("events")} />
        <StatCard icon={ShieldAlert} label="Aliases non résolus" value={numberLabel(remote.aliasesUnresolved)} detail="diagnostics ouverts" tone="amber" onClick={() => onNavigate("identity-manager")} />
        <StatCard icon={Radar} label="Variantes non matchées" value={numberLabel(remote.variantsUnmatched)} detail="Game Master à examiner" tone="violet" onClick={() => onNavigate("pokemon-identity-mappings")} />
        <StatCard icon={Fingerprint} label="Conflits d’identités" value={numberLabel(remote.conflicts)} detail="résolutions nécessaires" tone={remote.conflicts ? "red" : "green"} onClick={() => onNavigate("identity-manager")} />
        <StatCard icon={ImageIcon} label="Assets à vérifier" value={assetsToVerify.toLocaleString("fr-FR")} detail={`${assetCheckedCount.toLocaleString("fr-FR")} déjà validés`} tone="violet" onClick={() => onNavigate("assets")} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_.9fr]">
        <Card className="border border-line p-4 sm:p-5">
          <CardHeader eyebrow="Événements prioritaires" action={<Button size="sm" variant="ghost" onClick={() => onNavigate("events")}>Tout voir</Button>}>
            <CardTitle>Actifs et prochains</CardTitle>
            <CardDescription>Les deux échéances les plus utiles sans quitter la Home.</CardDescription>
          </CardHeader>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <EventLine event={remote.activeItems[0]} label="En cours" />
            <EventLine event={remote.upcomingItems[0]} label="À venir" />
          </div>
        </Card>

        <Card className="border border-line p-4 sm:p-5">
          <CardHeader eyebrow="Santé des données" action={<Badge tone={providerErrors ? "red" : "green"}>{providerErrors ? `${providerErrors} erreur(s)` : "Opérationnel"}</Badge>}>
            <CardTitle>Qualité et providers</CardTitle>
            <CardDescription>{filteredCount.toLocaleString("fr-FR")} fiches dans la vue courante · {changedSources.length} source(s) modifiée(s).</CardDescription>
          </CardHeader>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm font-black"><span>Progression globale</span><span>{quality}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-950/60"><div className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-brand" style={{ width: `${quality}%` }} /></div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border border-line bg-white/[.035] p-2"><strong className="block text-lg">{total.toLocaleString("fr-FR")}</strong><small className="text-muted">analysées</small></div>
              <div className="rounded-lg border border-line bg-white/[.035] p-2"><strong className="block text-lg text-emerald-200">{complete.toLocaleString("fr-FR")}</strong><small className="text-muted">complètes</small></div>
              <div className="rounded-lg border border-line bg-white/[.035] p-2"><strong className="block text-lg text-amber-200">{Number(summary.issues || 0).toLocaleString("fr-FR")}</strong><small className="text-muted">problèmes</small></div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border border-line p-4 sm:p-5">
        <CardHeader eyebrow="Activité récente" action={<Button size="sm" variant="ghost" icon={<Activity size={15} />} onClick={() => onNavigate("logs")}>Historique complet</Button>}>
          <CardTitle>Synchronisations et nouvelles données</CardTitle>
          <CardDescription>Les changements de sources et les derniers commits visibles au même endroit.</CardDescription>
        </CardHeader>
        <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {changedSources.slice(0, 3).map((source, index) => (
            <div className="flex items-start gap-3 rounded-lg border border-amber-300/20 bg-amber-400/[.07] p-3" key={source.id || source.name || index}>
              <DatabaseZap className="mt-0.5 shrink-0 text-amber-200" size={17} />
              <div className="min-w-0"><strong className="block truncate text-sm">{source.name || source.repo || "Source modifiée"}</strong><small className="mt-1 block text-xs text-muted">{source.message || source.status || "Nouvelles données détectées"}</small></div>
            </div>
          ))}
          {recentHistory.map((item, index) => (
            <div className="flex items-start gap-3 rounded-lg border border-line bg-white/[.035] p-3" key={item.hash || `${item.date}-${index}`}>
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-200" size={17} />
              <div className="min-w-0"><strong className="block truncate text-sm">{item.subject || item.message || "Mise à jour du référentiel"}</strong><small className="mt-1 block text-xs text-muted">{formatDate(item.iso || item.date)}{item.hash ? ` · ${item.hash}` : ""}</small></div>
            </div>
          ))}
          {!changedSources.length && !recentHistory.length ? <p className="rounded-lg border border-dashed border-line p-5 text-sm font-semibold text-muted">Aucune activité récente détectée.</p> : null}
        </div>
      </Card>
    </section>
  );
}

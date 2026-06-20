"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckSquare2,
  Columns3,
  Database,
  FolderKanban,
  Gauge,
  Link2,
  NotebookPen,
  ScrollText,
  ShieldCheck,
  WalletCards,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PokemonApiStatus } from "@/components/dashboard/pokemon-api-status";
import {
  initialBoard,
  initialContacts,
  initialEvents,
  initialFocusMinutes,
  initialJournal,
  initialLinks,
  initialNotes,
  initialProjects,
  initialSnippets,
  initialSubscriptions,
  initialTodos,
  kanbanColumns,
} from "@/data/personal-dashboard-defaults";
import type { PokemonMetrics } from "@/lib/pokemon";
import { usePersistentState } from "@/lib/use-persistent-state";

const tooltipStyle = {
  background: "rgba(10, 13, 24, 0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#eef3ff",
};

const quickLinks = [
  { href: "/notes", label: "Notes", detail: "Capturer une idée", icon: NotebookPen },
  { href: "/kanban", label: "Kanban", detail: "Piloter les cartes", icon: Columns3 },
  { href: "/projects", label: "Projets", detail: "Ouvrir le portfolio", icon: FolderKanban },
  { href: "/calendar", label: "Calendrier", detail: "Voir les prochains blocs", icon: CalendarDays },
  { href: "/tools", label: "Outils", detail: "Liens, snippets, budget", icon: Wrench },
  { href: "/pokemon-admin", label: "Admin Pokémon", detail: "Contrôler les données", icon: ShieldCheck },
  { href: "/pokemon-docs", label: "Docs JSON", detail: "Structures PokemonGo-Data", icon: ScrollText },
];

const chartColors = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166"];

export function DashboardHomeLive() {
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState<PokemonMetrics | null>(null);
  const [notes, , notesReady] = usePersistentState("matweb.notes", initialNotes);
  const [todos, , todosReady] = usePersistentState("matweb.todos", initialTodos);
  const [board, , boardReady] = usePersistentState("matweb.kanban", initialBoard);
  const [projects, , projectsReady] = usePersistentState("matweb.projects", initialProjects);
  const [events, , eventsReady] = usePersistentState("matweb.calendar", initialEvents);
  const [links] = usePersistentState("matweb.tools.links", initialLinks);
  const [snippets] = usePersistentState("matweb.tools.snippets", initialSnippets);
  const [subscriptions] = usePersistentState("matweb.tools.subscriptions", initialSubscriptions);
  const [contacts] = usePersistentState("matweb.tools.contacts", initialContacts);
  const [journal] = usePersistentState("matweb.tools.journal", initialJournal);
  const [focusMinutes] = usePersistentState("matweb.tools.focusMinutes", initialFocusMinutes);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    let active = true;

    fetch("/api/pokemon-stats")
      .then((response) => response.json())
      .then((data: PokemonMetrics) => {
        if (active) setMetrics(data);
      })
      .catch(() => {
        if (active) setMetrics(null);
      });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const openTodos = todos.filter((todo) => !todo.done);
  const doneTodos = todos.length - openTodos.length;
  const kanbanData = kanbanColumns.map((column) => ({
    name: column.title,
    count: board[column.id]?.length || 0,
  }));
  const kanbanTotal = kanbanData.reduce((sum, item) => sum + item.count, 0);
  const activeProjects = projects.filter((project) => project.status !== "Archive");
  const liveProjects = projects.filter((project) => project.status === "Live").length;
  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((left, right) => `${left.date} ${left.time}`.localeCompare(`${right.date} ${right.time}`));
  const monthlyBudget = subscriptions.reduce(
    (total, item) => total + (item.billing === "Annuel" ? item.price / 12 : item.price),
    0,
  );
  const ready = notesReady && todosReady && boardReady && projectsReady && eventsReady;
  const pokemonQuality = metrics?.quality ?? 0;

  const realStats = [
    {
      label: "Notes",
      value: notes.length,
      detail: `${notes.filter((note) => note.category === "Projet").length} notes projet`,
      icon: NotebookPen,
      accent: "cyan",
    },
    {
      label: "Todo ouvertes",
      value: openTodos.length,
      detail: `${doneTodos}/${todos.length} terminées`,
      icon: CheckSquare2,
      accent: "green",
    },
    {
      label: "Cartes kanban",
      value: kanbanTotal,
      detail: `${board.doing.length} en cours`,
      icon: Columns3,
      accent: "violet",
    },
    {
      label: "Projets actifs",
      value: activeProjects.length,
      detail: `${liveProjects} live`,
      icon: FolderKanban,
      accent: "amber",
    },
    {
      label: "Échéances",
      value: upcomingEvents.length,
      detail: upcomingEvents[0]?.title || "Rien à venir",
      icon: CalendarDays,
      accent: "cyan",
    },
    {
      label: "Données Pokémon",
      value: metrics?.total || 0,
      detail: `${pokemonQuality}% qualité`,
      icon: Database,
      accent: "green",
    },
  ] as const;

  return (
    <div className="space-y-5">
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <AnimatedCard tone="strong" className="relative overflow-hidden p-5 sm:p-6">
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2 to-transparent"
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <Badge tone={ready ? "green" : "amber"}>{ready ? "Dashboard live" : "Synchronisation"}</Badge>
              <h2 className="mt-4 max-w-4xl text-2xl font-black leading-tight sm:text-4xl">
                Accueil utile: tes modules, tes données, tes prochains mouvements.
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-muted">
                Les compteurs viennent des outils du dashboard et les stats Pokémon lisent la base intégrée. Plus de chiffres décoratifs.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary">
                <Link href="/pokemon-admin">
                  <ShieldCheck size={17} />
                  Admin Pokémon
                </Link>
              </Button>
              <Button asChild>
                <Link href="/tools">
                  <Wrench size={17} />
                  Outils
                </Link>
              </Button>
              <Button asChild>
                <a href="/storybook/index.html" target="_blank" rel="noreferrer">
                  <BookOpen size={17} />
                  Storybook
                </a>
              </Button>
            </div>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-4" delay={0.08}>
          <CardHeader eyebrow="Accès direct" action={<Badge tone="cyan">{quickLinks.length} modules</Badge>}>
            <CardTitle>Lancement rapide</CardTitle>
            <CardDescription>Ouvre directement les zones qui servent au quotidien.</CardDescription>
          </CardHeader>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {quickLinks.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + index * 0.04 }}
              >
                <Link
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45 hover:bg-brand-2/10"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.07] text-brand-2">
                    <item.icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <strong className="block truncate text-sm font-black">{item.label}</strong>
                    <small className="mt-1 block truncate text-xs font-bold text-muted">{item.detail}</small>
                  </span>
                  <ArrowUpRight size={16} className="text-muted transition group-hover:text-brand-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatedCard>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {realStats.map((stat, index) => (
          <LiveStat key={stat.label} {...stat} delay={0.08 + index * 0.04} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
        <AnimatedCard className="min-w-0 p-4" delay={0.12}>
          <CardHeader eyebrow="Pilotage réel">
            <CardTitle>Kanban et qualité Pokémon</CardTitle>
            <CardDescription>Cartes par colonne et complétion par génération.</CardDescription>
          </CardHeader>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <ChartBox title="Kanban">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                  <BarChart data={kanbanData} margin={{ left: -18, right: 8, top: 16 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]} isAnimationActive>
                      {kanbanData.map((entry, index) => (
                        <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : null}
            </ChartBox>
            <ChartBox title="Pokémon">
              {mounted && metrics ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={1}>
                  <BarChart data={metrics.generations.slice(0, 9)} margin={{ left: -18, right: 8, top: 16 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="completion" fill="#58f2a9" radius={[8, 8, 0, 0]} isAnimationActive />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="grid h-full place-items-center text-sm font-bold text-muted">Chargement stats...</div>
              )}
            </ChartBox>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-4" delay={0.16}>
          <CardHeader eyebrow="Maintenant" action={<Badge tone="green">{focusMinutes} min focus</Badge>}>
            <CardTitle>Ce qui demande ton attention</CardTitle>
            <CardDescription>Récap vivant des prochaines actions.</CardDescription>
          </CardHeader>
          <div className="mt-5 space-y-3">
            <SignalRow icon={CheckSquare2} label="Tâches ouvertes" value={openTodos.slice(0, 2).map((todo) => todo.title).join(" · ") || "Aucune"} />
            <SignalRow icon={CalendarDays} label="Prochain calendrier" value={upcomingEvents[0] ? `${upcomingEvents[0].date} · ${upcomingEvents[0].title}` : "Rien à venir"} />
            <SignalRow icon={FolderKanban} label="Projet prioritaire" value={activeProjects[0]?.nextStep || "Aucun projet actif"} />
            <SignalRow icon={NotebookPen} label="Journal" value={String(journal).slice(0, 110)} />
          </div>
        </AnimatedCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <AnimatedCard className="p-4" delay={0.2}>
          <CardHeader eyebrow="Outils">
            <CardTitle>Inventaire quotidien</CardTitle>
            <CardDescription>Liens, snippets, contacts et budget mensuel réel.</CardDescription>
          </CardHeader>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MiniMetric icon={Link2} label="Liens" value={links.length} />
            <MiniMetric icon={BookOpen} label="Snippets" value={snippets.length} />
            <MiniMetric icon={Activity} label="Contacts" value={contacts.length} />
            <MiniMetric icon={WalletCards} label="Budget" value={`${Math.round(monthlyBudget)}€`} />
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-4" delay={0.24}>
          <CardHeader eyebrow="Pokémon API" action={<Badge tone={metrics?.source === "live" ? "green" : "amber"}>{metrics?.status || "sync"}</Badge>}>
            <CardTitle>Base intégrée</CardTitle>
            <CardDescription>{metrics?.detail || "Lecture des données Pokémon du dashboard."}</CardDescription>
          </CardHeader>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <MiniMetric icon={Database} label="Fiches" value={metrics?.total || 0} />
            <MiniMetric icon={Gauge} label="Qualité" value={`${pokemonQuality}%`} />
            <MiniMetric icon={ShieldCheck} label="Issues" value={metrics?.issues || 0} />
          </div>
          <div className="mt-4">
            <PokemonApiStatus compact />
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-4" delay={0.28}>
          <CardHeader eyebrow="Stockage">
            <CardTitle>Persistance dashboard</CardTitle>
            <CardDescription>Les modules passent par Mongo quand la variable est configurée.</CardDescription>
          </CardHeader>
          <div className="mt-5 rounded-lg border border-brand-3/25 bg-brand-3/10 p-4">
            <p className="text-sm font-black text-emerald-100">Collections séparées</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Notes, todos, kanban, projets, calendrier et outils utilisent les clés `matweb.*`, dans une base dashboard dédiée.
            </p>
          </div>
        </AnimatedCard>
      </section>
    </div>
  );
}

function AnimatedCard({
  children,
  className,
  delay = 0,
  tone,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tone?: "soft" | "strong";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.48, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card tone={tone} className={className}>
        {children}
      </Card>
    </motion.div>
  );
}

function LiveStat({
  label,
  value,
  detail,
  icon: Icon,
  accent,
  delay,
}: {
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
  accent: "cyan" | "green" | "violet" | "amber";
  delay: number;
}) {
  const accentClass = {
    cyan: "from-brand-2/24 text-brand-2",
    green: "from-brand-3/24 text-brand-3",
    violet: "from-brand/24 text-brand",
    amber: "from-warning/24 text-warning",
  }[accent];

  return (
    <AnimatedCard className="motion-border p-4" delay={delay}>
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
          <motion.p
            className="mt-3 font-mono text-3xl font-black leading-none"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.12 }}
          >
            {value.toLocaleString("fr-FR")}
          </motion.p>
        </div>
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04] ${accentClass}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="relative z-10 mt-5 truncate text-xs font-black text-muted">{detail}</p>
    </AnimatedCard>
  );
}

function ChartBox({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-lg border border-line bg-white/[0.035] p-3">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-muted">{title}</p>
      <div className="h-64 min-h-64 min-w-0">{children}</div>
    </div>
  );
}

function SignalRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 rounded-lg border border-line bg-white/[0.045] p-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-2/10 text-brand-2">
        <Icon size={17} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
        <strong className="mt-1 block truncate text-sm font-black text-foreground">{value}</strong>
      </span>
    </div>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: number | string }) {
  return (
    <div className="rounded-lg border border-line bg-white/[0.045] p-3">
      <Icon size={17} className="text-brand-2" />
      <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-mono text-xl font-black">{typeof value === "number" ? value.toLocaleString("fr-FR") : value}</p>
    </div>
  );
}

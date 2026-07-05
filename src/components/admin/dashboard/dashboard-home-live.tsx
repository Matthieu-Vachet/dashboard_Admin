"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckSquare2,
  Code2,
  Copy,
  Database,
  FileText,
  FolderKanban,
  Link2,
  NotebookPen,
  Palette,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PokemonApiStatus } from "@/components/admin/pokemon/pokemon-api-status";
import { SortableWidgetGrid, type SortableWidgetItem } from "@/components/admin/shared/sortable-widget-grid";
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
import { getDailyCodeTip } from "@/data/daily-code-tips";
import type { PokemonMetrics } from "@/lib/pokemon";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const chartColors = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166", "#ff5f7d"];
const fallbackMetrics: PokemonMetrics = {
  source: "fallback",
  status: "fallback",
  total: 1602,
  complete: 1602,
  issues: 0,
  quality: 100,
  catalog: {
    types: 18,
    weather: 7,
    stickers: 1667,
    moves: 467,
  },
  generations: [
    { name: "G1", completion: 100, entries: 222 },
    { name: "G2", completion: 100, entries: 143 },
    { name: "G3", completion: 100, entries: 203 },
    { name: "G4", completion: 100, entries: 172 },
    { name: "G5", completion: 100, entries: 206 },
    { name: "G6", completion: 100, entries: 181 },
    { name: "G7", completion: 100, entries: 152 },
    { name: "G8", completion: 100, entries: 171 },
    { name: "G9", completion: 100, entries: 152 },
  ],
  kinds: [
    { name: "pokemon", value: 1024 },
    { name: "form", value: 367 },
    { name: "dynamax", value: 127 },
    { name: "mega", value: 55 },
    { name: "gigantamax", value: 29 },
  ],
};

const defaultWidgetOrder = [
  "today",
  "codeTip",
  "pokemon",
  "kanban",
  "calendar",
  "projects",
  "tools",
  "docs",
  "system",
] as const;
type WidgetId = (typeof defaultWidgetOrder)[number];

export function DashboardHomeLive() {
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
    };
  }, []);

  const today = new Date().toISOString().slice(0, 10);
  const dailyCodeTip = getDailyCodeTip(today);
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
  const displayMetrics = metrics ?? fallbackMetrics;
  const pokemonQuality = displayMetrics.quality;

  const realStats = [
    {
      label: "Notes",
      value: notes.length,
      detail: `${notes.filter((note) => note.category === "Projet").length} projet`,
      icon: NotebookPen,
      accent: "cyan",
    },
    {
      label: "Todo",
      value: openTodos.length,
      detail: `${doneTodos}/${todos.length} terminées`,
      icon: CheckSquare2,
      accent: "green",
    },
    {
      label: "Kanban",
      value: kanbanTotal,
      detail: `${board.doing.length} en cours`,
      icon: FolderKanban,
      accent: "violet",
    },
    {
      label: "Projets",
      value: activeProjects.length,
      detail: `${liveProjects} live`,
      icon: FolderKanban,
      accent: "amber",
    },
    {
      label: "Agenda",
      value: upcomingEvents.length,
      detail: upcomingEvents[0]?.title || "Rien à venir",
      icon: CalendarDays,
      accent: "cyan",
    },
    {
      label: "Pokémon",
      value: displayMetrics.total,
      detail: `${pokemonQuality}% qualité`,
      icon: Database,
      accent: "green",
    },
  ] as const;

  const widgets: Record<WidgetId, ReactNode> = {
    today: (
      <WidgetContent title="Maintenant" eyebrow="Priorités réelles" icon={Sparkles}>
        <div className="space-y-3">
          <SignalRow icon={CheckSquare2} label="Todo ouverte" value={openTodos[0]?.title || "Aucune tâche bloquante"} />
          <SignalRow icon={CalendarDays} label="Prochain bloc" value={upcomingEvents[0] ? `${upcomingEvents[0].date} · ${upcomingEvents[0].title}` : "Rien à venir"} />
          <SignalRow icon={FolderKanban} label="Projet prioritaire" value={activeProjects[0]?.nextStep || "Aucun projet actif"} />
          <SignalRow icon={NotebookPen} label="Journal" value={String(journal).slice(0, 110)} />
        </div>
      </WidgetContent>
    ),
    codeTip: (
      <DailyCodePost tip={dailyCodeTip} date={today} />
    ),
    pokemon: (
      <WidgetContent title="Pokémon API" eyebrow="Qualité data" icon={Database} action={<PokemonApiStatus compact />}>
        <div className="grid grid-cols-3 gap-3">
          <MiniMetric label="Fiches" value={displayMetrics.total} tone="cyan" />
          <MiniMetric label="Issues" value={displayMetrics.issues} tone="amber" />
          <MiniMetric label="Qualité" value={`${pokemonQuality}%`} tone="green" />
        </div>
        <GenerationBars items={displayMetrics.generations.slice(0, 9)} />
      </WidgetContent>
    ),
    kanban: (
      <WidgetContent title="Kanban" eyebrow="Cartes par colonne" icon={FolderKanban}>
        <KanbanBars items={kanbanData} />
      </WidgetContent>
    ),
    calendar: (
      <WidgetContent title="Calendrier" eyebrow="À venir" icon={CalendarDays}>
        <div className="space-y-2">
          {upcomingEvents.slice(0, 4).map((event) => (
            <Link key={event.id} href="/calendar" className="grid grid-cols-[74px_1fr] rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45">
              <span className="font-mono text-xs font-black text-brand-2">{event.date.slice(5)}</span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black">{event.title}</strong>
                <small className="text-xs font-bold text-muted">{event.time}</small>
              </span>
            </Link>
          ))}
          {!upcomingEvents.length ? <EmptyLine>Aucun événement programmé.</EmptyLine> : null}
        </div>
      </WidgetContent>
    ),
    projects: (
      <WidgetContent title="Projets" eyebrow="Portfolio" icon={FolderKanban}>
        <div className="space-y-3">
          {activeProjects.slice(0, 4).map((project) => (
            <Link key={project.id} href="/projects" className="block rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45">
              <div className="flex items-center justify-between gap-3">
                <strong className="truncate text-sm font-black">{project.name}</strong>
                <Badge tone={project.status === "Live" ? "green" : "cyan"}>{project.status}</Badge>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                <span className="block h-full rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3" style={{ width: `${project.progress}%` }} />
              </div>
            </Link>
          ))}
        </div>
      </WidgetContent>
    ),
    tools: (
      <WidgetContent title="Outils" eyebrow="Inventaire" icon={Wrench}>
        <div className="grid grid-cols-2 gap-3">
          <MiniMetric label="Liens" value={links.length} tone="cyan" />
          <MiniMetric label="Snippets" value={snippets.length} tone="violet" />
          <MiniMetric label="Contacts" value={contacts.length} tone="green" />
          <MiniMetric label="Budget" value={`${Math.round(monthlyBudget)}€`} tone="amber" />
          <MiniMetric label="Focus" value={`${focusMinutes}m`} tone="violet" />
          <MiniMetric label="Docs" value="MD" tone="cyan" />
        </div>
      </WidgetContent>
    ),
    docs: (
      <WidgetContent title="Docs & API" eyebrow="Accès direct" icon={BookOpen}>
        <div className="grid gap-2">
          <ExternalButton href="https://pokemon-go-api.vercel.app/api-docs" label="Documentation" />
          <ExternalButton href="https://pokemon-go-api.vercel.app/swagger" label="Swagger" />
          <ExternalButton href="/pokemon-docs" label="Docs JSON dashboard" />
        </div>
      </WidgetContent>
    ),
    system: (
      <WidgetContent title="Création" eyebrow="Outils rapides" icon={Palette}>
        <div className="grid gap-2">
          <ActionLink href="/writer" icon={FileText} label="Nouveau texte" detail="Brief, spec, brouillon" />
          <ActionLink href="/snippets" icon={Code2} label="Snippet code" detail="Ajouter et copier" />
          <ActionLink href="/palette" icon={Palette} label="Palette couleur" detail="HEX, RGB, HSL" />
          <ActionLink href="/tools" icon={Link2} label="Liens utiles" detail="Budget, contacts, focus" />
        </div>
      </WidgetContent>
    ),
  };
  const widgetLabels: Record<WidgetId, string> = {
    today: "Maintenant",
    codeTip: "Astuce JS",
    pokemon: "Pokémon API",
    kanban: "Kanban",
    calendar: "Calendrier",
    projects: "Projets",
    tools: "Outils",
    docs: "Docs & API",
    system: "Création",
  };
  const sortableWidgets: SortableWidgetItem[] = defaultWidgetOrder.map((id) => ({
    id,
    label: widgetLabels[id],
    node: (
      <Card className="group flex h-auto flex-col overflow-hidden">
        <div className="p-4">{widgets[id]}</div>
      </Card>
    ),
  }));

  return (
    <div className="space-y-5">
      <section>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <Card tone="strong" className="relative overflow-hidden p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(32,211,255,.14),transparent_32%),linear-gradient(245deg,rgba(88,242,169,.12),transparent_30%)]" />
            <div className="relative z-10 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge tone={ready ? "green" : "amber"}>{ready ? "Dashboard live" : "Synchronisation"}</Badge>
                <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
                  MatWeb Innovation
                </h2>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
                  Cockpit de travail: modules, données live, widgets déplaçables et accès directs.
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
                  <Link href="/snippets">
                    <Code2 size={17} />
                    Snippets
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {realStats.map((stat, index) => (
          <LiveStat key={stat.label} {...stat} delay={0.04 + index * 0.03} />
        ))}
      </section>

      <SortableWidgetGrid
        columnsClassName="columns-1 lg:columns-2 2xl:columns-4"
        items={sortableWidgets}
        storageKey="matweb.home.widgetOrder"
      />
    </div>
  );
}

function DailyCodePost({
  tip,
  date,
}: {
  tip: ReturnType<typeof getDailyCodeTip>;
  date: string;
}) {
  const caption = `${tip.title}\n\n${tip.concept}\n\n${tip.snippet}\n\n${tip.takeaway}\n\n${tip.hashtags.join(" ")}`;

  async function copyCaption() {
    await navigator.clipboard.writeText(caption);
  }

  return (
    <div className="relative mx-auto w-full max-w-[720px] overflow-hidden rounded-xl border border-brand-2/20 bg-slate-950 text-white shadow-[0_24px_70px_rgba(32,211,255,0.12)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.28),transparent_34%),radial-gradient(circle_at_86%_22%,rgba(88,242,169,.22),transparent_30%),linear-gradient(145deg,rgba(144,91,244,.18),transparent_46%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative flex min-h-[min(760px,calc(100dvh-7rem))] flex-col p-5 pt-16 sm:aspect-[4/5] sm:min-h-[32rem] sm:p-8 sm:pt-20">
        <div className="flex min-w-0 items-start justify-between gap-3 pr-24 sm:pr-20">
          <div className="min-w-0">
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-brand-2">Code du jour</p>
            <p className="mt-1 text-xs font-bold text-muted">{date}</p>
          </div>
          <button
            className="absolute right-5 top-16 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:border-brand-2/45 hover:bg-brand-2/20 sm:right-8 sm:top-20"
            type="button"
            onClick={copyCaption}
            aria-label="Copier la légende Instagram"
            title="Copier la légende"
          >
            <Copy size={16} />
          </button>
        </div>
        <div className="mt-7 min-w-0 sm:mt-10">
          <h3 className="max-w-[12ch] break-words text-[clamp(2.1rem,9vw,4.8rem)] font-black leading-[0.95] sm:max-w-[11ch]">
            {tip.title}
          </h3>
          <p className="mt-5 max-w-[34rem] text-sm font-bold leading-7 text-slate-200 sm:text-base">
            {tip.concept}
          </p>
        </div>
        <pre className="mt-6 max-w-full overflow-x-auto whitespace-pre rounded-xl border border-white/10 bg-[#050816]/85 p-4 font-mono text-[clamp(.68rem,2.2vw,1rem)] font-bold leading-6 text-cyan-100 shadow-inner">
          <code>{tip.snippet}</code>
        </pre>
        <p className="mt-5 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm font-black leading-6 text-emerald-100 sm:text-base">
          {tip.takeaway}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {tip.hashtags.map((hashtag) => (
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.68rem] font-black text-slate-100" key={hashtag}>
              {hashtag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WidgetContent({
  title,
  eyebrow,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  eyebrow: string;
  icon: LucideIcon;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative z-0">
      <div className="mb-5 flex items-start justify-between gap-12">
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">{eyebrow}</p>
          <h3 className="mt-1 text-xl font-black">{title}</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2">
          <Icon size={19} />
        </span>
      </div>
      {action ? <div className="mb-4">{action}</div> : null}
      {children}
    </div>
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
    cyan: "from-brand-2/20 text-brand-2",
    green: "from-brand-3/20 text-brand-3",
    violet: "from-brand/20 text-brand",
    amber: "from-warning/20 text-warning",
  }[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay }}
    >
      <Card className="motion-border p-4">
        <div className="relative z-10 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
            <p className="mt-3 font-mono text-3xl font-black leading-none">
              {value.toLocaleString("fr-FR")}
            </p>
          </div>
          <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04] ${accentClass}`}>
            <Icon size={20} />
          </div>
        </div>
        <p className="relative z-10 mt-5 truncate text-xs font-black text-muted">{detail}</p>
      </Card>
    </motion.div>
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

function MiniMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number | string;
  tone: "cyan" | "green" | "violet" | "amber";
}) {
  const color = {
    cyan: "text-brand-2 bg-brand-2/10 border-brand-2/20",
    green: "text-brand-3 bg-brand-3/10 border-brand-3/20",
    violet: "text-brand bg-brand/10 border-brand/20",
    amber: "text-warning bg-warning/10 border-warning/20",
  }[tone];
  return (
    <div className={cn("rounded-lg border p-3", color)}>
      <p className="text-xs font-black uppercase tracking-[0.14em] opacity-75">{label}</p>
      <p className="mt-2 font-mono text-xl font-black">
        {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
      </p>
    </div>
  );
}

function GenerationBars({ items }: { items: Array<{ name: string; entries: number }> }) {
  const max = Math.max(...items.map((item) => item.entries || 0), 1);

  return (
    <div className="mt-4 space-y-2">
      {items.map((item, index) => {
        const width = Math.max(4, ((item.entries || 0) / max) * 100);
        return (
          <div
            className="grid grid-cols-[3rem_minmax(0,1fr)_4rem] items-center gap-2 text-xs font-black"
            key={item.name}
          >
            <span className="truncate text-muted">{item.name}</span>
            <span className="h-2 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${width}%`,
                  background: chartColors[index % chartColors.length],
                }}
              />
            </span>
            <span className="text-right font-mono text-muted">
              {item.entries.toLocaleString("fr-FR")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function KanbanBars({ items }: { items: Array<{ name: string; count: number }> }) {
  const max = Math.max(...items.map((item) => item.count || 0), 1);

  if (!items.some((item) => item.count > 0)) {
    return <EmptyLine>Aucune carte kanban pour le moment.</EmptyLine>;
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const width = Math.max(4, ((item.count || 0) / max) * 100);
        return (
          <div className="rounded-lg border border-line bg-white/[0.045] p-3" key={item.name}>
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-black">
              <span className="truncate text-foreground">{item.name}</span>
              <span className="font-mono text-muted">{item.count}</span>
            </div>
            <span className="block h-2 overflow-hidden rounded-full bg-white/10">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${width}%`,
                  background: chartColors[index % chartColors.length],
                }}
              />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ActionLink({
  href,
  icon: Icon,
  label,
  detail,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-line bg-white/[0.045] p-3 transition hover:border-brand-2/45 hover:bg-brand-2/10"
    >
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.07] text-brand-2">
        <Icon size={18} />
      </span>
      <span className="min-w-0">
        <strong className="block truncate text-sm font-black">{label}</strong>
        <small className="mt-1 block truncate text-xs font-bold text-muted">{detail}</small>
      </span>
      <ArrowUpRight size={16} className="text-muted transition group-hover:text-brand-2" />
    </Link>
  );
}

function ExternalButton({ href, label }: { href: string; label: string }) {
  const internal = href.startsWith("/");
  const className =
    "group flex min-h-11 items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.045] px-3 text-sm font-black transition hover:border-brand-2/45 hover:bg-brand-2/10";

  if (internal) {
    return (
      <Link href={href} className={className}>
        {label}
        <ArrowUpRight size={16} className="text-muted group-hover:text-brand-2" />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {label}
      <ArrowUpRight size={16} className="text-muted group-hover:text-brand-2" />
    </a>
  );
}

function EmptyLine({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted">
      {children}
    </p>
  );
}

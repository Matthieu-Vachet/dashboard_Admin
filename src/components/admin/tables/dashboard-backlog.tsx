"use client";

import {
  Archive,
  ClipboardCopy,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/admin/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/cn";

type BacklogType = "bug" | "feature" | "refactor" | "ui" | "data";
type BacklogStatus = "todo" | "in_progress" | "blocked" | "done" | "archived" | "ignored";
type BacklogPriority = "low" | "medium" | "high" | "critical";

type BacklogTicket = {
  id: string;
  title: string;
  description: string;
  type: BacklogType;
  status: BacklogStatus;
  priority: BacklogPriority;
  project: string;
  page: string;
  component: string;
  stepsToReproduce: string;
  actualBehavior: string;
  expectedBehavior: string;
  screenshots: string[];
  notes: string;
  codexPrompt: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  history: Array<{ at: string; action: string; changes?: Record<string, unknown> }>;
};

type TicketDraft = Omit<
  BacklogTicket,
  "id" | "codexPrompt" | "createdAt" | "updatedAt" | "resolvedAt" | "history"
>;

const ticketTypes: BacklogType[] = ["bug", "feature", "refactor", "ui", "data"];
const statuses: BacklogStatus[] = ["todo", "in_progress", "blocked", "done", "archived", "ignored"];
const priorities: BacklogPriority[] = ["low", "medium", "high", "critical"];
const openStatuses: BacklogStatus[] = ["todo", "in_progress", "blocked"];
const workspaceProjects = [
  "Dashboard Admin",
  "PokemonGo-API",
  "PokemonGo-Data",
  "PokemonGo-Assets-API",
  "Landing-Page-PogoApi",
];

const emptyDraft: TicketDraft = {
  title: "",
  description: "",
  type: "bug",
  status: "todo",
  priority: "medium",
  project: "Dashboard Admin",
  page: "",
  component: "",
  stepsToReproduce: "",
  actualBehavior: "",
  expectedBehavior: "",
  screenshots: [],
  notes: "",
};

const typeLabel: Record<BacklogType, string> = {
  bug: "Bug",
  feature: "Feature",
  refactor: "Refactor",
  ui: "UI",
  data: "Data",
};

const statusLabel: Record<BacklogStatus, string> = {
  todo: "Todo",
  in_progress: "In progress",
  blocked: "Blocked",
  done: "Done",
  archived: "Archived",
  ignored: "Ignored",
};

const priorityLabel: Record<BacklogPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const typeClasses: Record<BacklogType, string> = {
  bug: "border-danger/40 bg-danger/12 text-danger",
  feature: "border-brand-2/40 bg-brand-2/12 text-brand-2",
  refactor: "border-brand/40 bg-brand/12 text-violet-200",
  ui: "border-warning/40 bg-warning/12 text-warning",
  data: "border-brand-3/40 bg-brand-3/12 text-brand-3",
};

const statusClasses: Record<BacklogStatus, string> = {
  todo: "border-slate-400/35 bg-slate-400/10 text-slate-200",
  in_progress: "border-brand-2/50 bg-brand-2/16 text-brand-2 shadow-[0_0_24px_rgba(34,211,238,.12)]",
  blocked: "border-danger/55 bg-danger/16 text-danger shadow-[0_0_24px_rgba(248,113,113,.12)]",
  done: "border-brand-3/60 bg-brand-3/18 text-brand-3 shadow-[0_0_28px_rgba(52,211,153,.14)]",
  archived: "border-slate-400/25 bg-slate-400/10 text-muted",
  ignored: "border-warning/40 bg-warning/12 text-warning",
};

const statusCardClasses: Record<BacklogStatus, string> = {
  todo: "border-l-4 border-l-slate-400/80 bg-slate-400/[0.035]",
  in_progress: "border-l-4 border-l-brand-2 bg-brand-2/[0.07] shadow-[inset_0_0_28px_rgba(34,211,238,.07)]",
  blocked: "border-l-4 border-l-danger bg-danger/[0.08] shadow-[inset_0_0_28px_rgba(248,113,113,.08)]",
  done: "border-l-4 border-l-brand-3 bg-brand-3/[0.09] shadow-[inset_0_0_28px_rgba(52,211,153,.08)]",
  archived: "border-l-4 border-l-slate-500/50 bg-slate-500/[0.035] opacity-70",
  ignored: "border-l-4 border-l-warning bg-warning/[0.065]",
};

const priorityClasses: Record<BacklogPriority, string> = {
  low: "border-brand-3/35 bg-brand-3/10 text-brand-3",
  medium: "border-brand-2/35 bg-brand-2/10 text-brand-2",
  high: "border-warning/45 bg-warning/12 text-warning",
  critical: "border-danger/45 bg-danger/14 text-danger",
};

const priorityRank: Record<BacklogPriority, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
};

const statusRank: Record<BacklogStatus, number> = {
  blocked: 0,
  in_progress: 1,
  todo: 2,
  done: 3,
  archived: 4,
  ignored: 5,
};

function formatDate(value: string | null) {
  if (!value) return "Non défini";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function screenshotsText(value: string[]) {
  return value.join("\n");
}

function parseScreenshots(value: string) {
  return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
}

function ticketCodexContext(ticket: BacklogTicket | TicketDraft) {
  return [
    "# TICKET DASHBOARD",
    `Type: ${ticket.type}`,
    `Priority: ${ticket.priority}`,
    `Status: ${ticket.status}`,
    `Project: ${ticket.project || ""}`,
    `Page: ${ticket.page}`,
    `Component: ${ticket.component}`,
    "",
    "## Description",
    ticket.description,
    "",
    "## Steps to reproduce",
    ticket.stepsToReproduce,
    "",
    "## Actual behavior",
    ticket.actualBehavior,
    "",
    "## Expected behavior",
    ticket.expectedBehavior,
    "",
    "## Notes",
    ticket.notes,
  ].join("\n");
}

function inferProject(page = "") {
  const value = page.toLowerCase();
  if (value.includes("pokemon") || value.includes("pokémon")) return "PokemonGo-API";
  if (value.includes("data")) return "PokemonGo-Data";
  if (value.includes("asset")) return "PokemonGo-Assets-API";
  if (value.includes("landing")) return "Landing-Page-PogoApi";
  return "Dashboard Admin";
}

function ticketToDraft(ticket: BacklogTicket): TicketDraft {
  return {
    title: ticket.title,
    description: ticket.description,
    type: ticket.type,
    status: ticket.status,
    priority: ticket.priority,
    project: ticket.project || inferProject(ticket.page),
    page: ticket.page,
    component: ticket.component,
    stepsToReproduce: ticket.stepsToReproduce,
    actualBehavior: ticket.actualBehavior,
    expectedBehavior: ticket.expectedBehavior,
    screenshots: ticket.screenshots,
    notes: ticket.notes,
  };
}

async function copyText(value: string) {
  await navigator.clipboard.writeText(value);
}

export function DashboardBacklog() {
  const [tickets, setTickets] = useState<BacklogTicket[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<TicketDraft>(emptyDraft);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<BacklogType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<BacklogStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<BacklogPriority | "all">("all");
  const [pageFilter, setPageFilter] = useState("all");
  const [componentFilter, setComponentFilter] = useState("all");
  const [sortKey, setSortKey] = useState<"recent" | "priority" | "status">("recent");

  const editingTicket = useMemo(
    () => tickets.find((ticket) => ticket.id === editingId) || null,
    [editingId, tickets],
  );

  const components = useMemo(
    () => Array.from(new Set(tickets.map((ticket) => ticket.component).filter(Boolean))).sort(),
    [tickets],
  );
  const projects = useMemo(
    () =>
      Array.from(
        new Set([
          ...workspaceProjects,
          ...tickets.map((ticket) => ticket.project || inferProject(ticket.page)).filter(Boolean),
        ]),
      ).sort(),
    [tickets],
  );

  const filteredTickets = useMemo(() => {
    const search = query.toLowerCase().trim();
    return tickets
      .filter((ticket) => typeFilter === "all" || ticket.type === typeFilter)
      .filter((ticket) => statusFilter === "all" || ticket.status === statusFilter)
      .filter((ticket) => priorityFilter === "all" || ticket.priority === priorityFilter)
      .filter((ticket) => pageFilter === "all" || (ticket.project || inferProject(ticket.page)) === pageFilter)
      .filter((ticket) => componentFilter === "all" || ticket.component === componentFilter)
      .filter((ticket) => {
        if (!search) return true;
        return [
          ticket.title,
          ticket.description,
          ticket.project || inferProject(ticket.page),
          ticket.page,
          ticket.component,
          ticket.notes,
          ticket.actualBehavior,
          ticket.expectedBehavior,
        ].some((value) => value.toLowerCase().includes(search));
      })
      .sort((left, right) => {
        if (sortKey === "priority") {
          return priorityRank[left.priority] - priorityRank[right.priority];
        }
        if (sortKey === "status") {
          return statusRank[left.status] - statusRank[right.status];
        }
        return right.updatedAt.localeCompare(left.updatedAt);
      });
  }, [componentFilter, pageFilter, priorityFilter, query, sortKey, statusFilter, tickets, typeFilter]);

  const stats = useMemo(() => {
    const openTickets = tickets.filter((ticket) => openStatuses.includes(ticket.status));
    return {
      total: tickets.length,
      bugs: openTickets.filter((ticket) => ticket.type === "bug").length,
      features: openTickets.filter((ticket) => ticket.type === "feature").length,
      critical: openTickets.filter((ticket) => ticket.priority === "critical").length,
      done: tickets.filter((ticket) => ticket.status === "done").length,
      blocked: tickets.filter((ticket) => ticket.status === "blocked").length,
    };
  }, [tickets]);

  async function loadTickets() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/dashboard-backlog", { cache: "no-store" });
      const payload = (await response.json()) as {
        data?: { configured?: boolean; tickets?: BacklogTicket[] };
        error?: string;
      };
      if (!response.ok) throw new Error(payload.error || "Backlog indisponible.");
      setConfigured(Boolean(payload.data?.configured));
      setTickets(payload.data?.tickets || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Backlog indisponible.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/dashboard-backlog", { cache: "no-store" })
      .then(async (response) => {
        const payload = (await response.json()) as {
          data?: { configured?: boolean; tickets?: BacklogTicket[] };
          error?: string;
        };
        if (!response.ok) throw new Error(payload.error || "Backlog indisponible.");
        if (!active) return;
        setConfigured(Boolean(payload.data?.configured));
        setTickets(payload.data?.tickets || []);
      })
      .catch((loadError) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Backlog indisponible.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function openCreate() {
    setEditingId(null);
    setDraft(emptyDraft);
    setConfirmDelete(false);
    setModalOpen(true);
  }

  function openEdit(ticket: BacklogTicket) {
    setEditingId(ticket.id);
    setDraft(ticketToDraft(ticket));
    setConfirmDelete(false);
    setModalOpen(true);
  }

  function updateDraft(patch: Partial<TicketDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
    setConfirmDelete(false);
  }

  async function saveTicket() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editingId ? `/api/dashboard-backlog/${editingId}` : "/api/dashboard-backlog",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      const payload = (await response.json()) as { data?: { ticket?: BacklogTicket }; error?: string };
      if (!response.ok || !payload.data?.ticket) throw new Error(payload.error || "Sauvegarde impossible.");
      setTickets((current) => {
        if (!editingId) return [payload.data!.ticket!, ...current];
        return current.map((ticket) => (ticket.id === editingId ? payload.data!.ticket! : ticket));
      });
      setModalOpen(false);
      setEditingId(null);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Sauvegarde impossible.");
    } finally {
      setSaving(false);
    }
  }

  async function patchTicket(ticket: BacklogTicket, patch: Partial<TicketDraft>) {
    const response = await fetch(`/api/dashboard-backlog/${ticket.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const payload = (await response.json()) as { data?: { ticket?: BacklogTicket }; error?: string };
    if (!response.ok || !payload.data?.ticket) throw new Error(payload.error || "Mise à jour impossible.");
    setTickets((current) => current.map((item) => (item.id === ticket.id ? payload.data!.ticket! : item)));
  }

  async function deleteTicket() {
    if (!editingId) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/dashboard-backlog/${editingId}`, { method: "DELETE" });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Suppression impossible.");
      setTickets((current) => current.filter((ticket) => ticket.id !== editingId));
      setModalOpen(false);
      setEditingId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Suppression impossible.");
    } finally {
      setSaving(false);
    }
  }

  async function copyTicket(ticket: BacklogTicket) {
    await copyText(ticket.codexPrompt || ticketCodexContext(ticket));
    setCopied(ticket.id);
    window.setTimeout(() => setCopied(""), 1400);
  }

  async function copyOpenTickets() {
    const markdown = tickets
      .filter((ticket) => openStatuses.includes(ticket.status))
      .sort((left, right) => priorityRank[left.priority] - priorityRank[right.priority])
      .map((ticket) => ticket.codexPrompt || ticketCodexContext(ticket))
      .join("\n\n---\n\n");
    await copyText(markdown || "# DASHBOARD BACKLOG\nAucun ticket ouvert.");
    setCopied("all-open");
    window.setTimeout(() => setCopied(""), 1400);
  }

  if (loading) return <DashboardLoadingState title="Dashboard Backlog" />;

  return (
    <div className="space-y-4">
      <Card tone="strong" className="p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge tone="cyan">Issue tracker</Badge>
            <h2 className="mt-3 text-3xl font-black">Dashboard Backlog</h2>
            <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-muted">
              Source de vérité interne pour bugs, features, refactors, UI et prompts techniques Codex.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button icon={<RefreshCcw size={16} />} type="button" onClick={loadTickets}>
              Rafraîchir
            </Button>
            <Button icon={<ClipboardCopy size={16} />} type="button" onClick={copyOpenTickets}>
              {copied === "all-open" ? "Copié" : "Copier tickets ouverts"}
            </Button>
            <Button variant="primary" icon={<Plus size={16} />} type="button" onClick={openCreate}>
              Nouveau ticket
            </Button>
          </div>
        </div>
        {!configured ? (
          <div className="mt-4 rounded-lg border border-warning/35 bg-warning/10 p-3 text-sm font-bold text-warning">
            MongoDB dashboard n&apos;est pas configuré. La lecture reste disponible, mais la création nécessite une URI Mongo.
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 rounded-lg border border-danger/35 bg-danger/10 p-3 text-sm font-bold text-danger">
            {error}
          </div>
        ) : null}
      </Card>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <BacklogStat label="Total tickets" value={stats.total} tone="cyan" />
        <BacklogStat label="Bugs ouverts" value={stats.bugs} tone="red" />
        <BacklogStat label="Features ouvertes" value={stats.features} tone="cyan" />
        <BacklogStat label="Critiques" value={stats.critical} tone="red" />
        <BacklogStat label="Terminés" value={stats.done} tone="green" />
        <BacklogStat label="Bloqués" value={stats.blocked} tone="amber" />
      </section>

      <Card className="p-4">
        <div className="grid gap-3 xl:grid-cols-[1.3fr_repeat(6,minmax(130px,1fr))]">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted">
            <Search size={16} />
            <Input
              className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher titre, page, composant..."
            />
          </label>
          <FilterSelect label="Type" value={typeFilter} onChange={(value) => setTypeFilter(value as BacklogType | "all")} values={ticketTypes} labels={typeLabel} />
          <FilterSelect label="Statut" value={statusFilter} onChange={(value) => setStatusFilter(value as BacklogStatus | "all")} values={statuses} labels={statusLabel} />
          <FilterSelect label="Priorité" value={priorityFilter} onChange={(value) => setPriorityFilter(value as BacklogPriority | "all")} values={priorities} labels={priorityLabel} />
          <FilterSelect label="Projet" value={pageFilter} onChange={setPageFilter} values={projects} />
          <FilterSelect label="Composant" value={componentFilter} onChange={setComponentFilter} values={components} />
          <FilterSelect label="Tri" value={sortKey} onChange={(value) => setSortKey(value as "recent" | "priority" | "status")} values={["recent", "priority", "status"]} labels={{ recent: "Plus récent", priority: "Priorité", status: "Statut" }} includeAll={false} />
        </div>
      </Card>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid min-w-0 gap-3">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              copied={copied === ticket.id}
              onArchive={() => void patchTicket(ticket, { status: "archived" }).catch((archiveError) => setError(archiveError.message))}
              onCopy={() => void copyTicket(ticket)}
              onEdit={() => openEdit(ticket)}
              onMarkDone={() => void patchTicket(ticket, { status: "done" }).catch((doneError) => setError(doneError.message))}
            />
          ))}
          {!filteredTickets.length ? (
            <Card className="grid min-h-56 place-items-center p-6 text-center">
              <div>
                <p className="text-lg font-black">Aucun ticket dans cette vue.</p>
                <p className="mt-2 text-sm font-semibold text-muted">Ajuste les filtres ou crée le premier ticket.</p>
              </div>
            </Card>
          ) : null}
        </div>

        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">Colonnes</p>
          <div className="mt-4 space-y-3">
            {(["todo", "in_progress", "blocked", "done"] as BacklogStatus[]).map((status) => {
              const count = tickets.filter((ticket) => ticket.status === status).length;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border p-3 text-left transition hover:border-brand-2/45",
                    statusClasses[status],
                  )}
                >
                  <span className="text-sm font-black">{statusLabel[status]}</span>
                  <span className="font-mono text-sm font-black">{count}</span>
                </button>
              );
            })}
          </div>
        </Card>
      </section>

      <Modal
        open={modalOpen}
        title={editingTicket ? `Ticket: ${editingTicket.title}` : "Nouveau ticket"}
        description="Tous les champs sont sauvegardés dans MongoDB et réutilisables comme contexte Codex."
        className="max-w-5xl"
        onClose={() => setModalOpen(false)}
      >
        <TicketForm
          confirmDelete={confirmDelete}
          draft={draft}
          editing={Boolean(editingTicket)}
          saving={saving}
          onDelete={deleteTicket}
          onSave={saveTicket}
          onUpdate={updateDraft}
        />
        {editingTicket?.history.length ? (
          <div className="mt-5 rounded-lg border border-line bg-white/[0.04] p-3">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Historique</p>
            <div className="mt-3 grid gap-2">
              {editingTicket.history.slice(-5).reverse().map((entry) => (
                <div key={`${entry.at}-${entry.action}`} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white/[0.035] p-2 text-xs font-bold text-muted">
                  <span>{entry.action}</span>
                  <span>{formatDate(entry.at)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function BacklogStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "cyan" | "green" | "amber" | "red";
}) {
  const toneClass = {
    cyan: "border-brand-2/30 bg-brand-2/10 text-brand-2",
    green: "border-brand-3/30 bg-brand-3/10 text-brand-3",
    amber: "border-warning/35 bg-warning/10 text-warning",
    red: "border-danger/35 bg-danger/10 text-danger",
  }[tone];

  return (
    <Card className="p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className={cn("mt-3 inline-flex rounded-lg border px-3 py-2 font-mono text-3xl font-black", toneClass)}>
        {value}
      </p>
    </Card>
  );
}

function FilterSelect<T extends string>({
  label,
  value,
  values,
  labels,
  includeAll = true,
  onChange,
}: {
  label: string;
  value: string;
  values: T[];
  labels?: Partial<Record<T | "all" | "recent" | "priority" | "status", string>>;
  includeAll?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <select
        className="min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {includeAll ? <option value="all">Tous</option> : null}
        {values.map((item) => (
          <option key={item} value={item}>
            {labels?.[item] || item || label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TicketCard({
  ticket,
  copied,
  onArchive,
  onCopy,
  onEdit,
  onMarkDone,
}: {
  ticket: BacklogTicket;
  copied: boolean;
  onArchive: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onMarkDone: () => void;
}) {
  return (
    <Card className={cn("min-w-0 p-4 transition hover:border-brand-2/45", statusCardClasses[ticket.status])}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <button type="button" className="min-w-0 text-left" onClick={onEdit}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full border px-2.5 py-1 text-xs font-black", typeClasses[ticket.type])}>
              {typeLabel[ticket.type]}
            </span>
            <span className={cn("rounded-full border px-2.5 py-1 text-xs font-black", priorityClasses[ticket.priority])}>
              {priorityLabel[ticket.priority]}
            </span>
            <span className={cn("rounded-full border px-2.5 py-1 text-xs font-black", statusClasses[ticket.status])}>
              {ticket.status === "done" ? "✓ " : ""}
              {statusLabel[ticket.status]}
            </span>
          </div>
          <h3 className={cn("mt-3 text-xl font-black", ticket.status === "done" && "text-brand-3")}>
            {ticket.title || "Sans titre"}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-muted">
            {ticket.description || ticket.expectedBehavior || "Aucune description."}
          </p>
        </button>
        <div className="grid w-full gap-2 sm:flex sm:w-auto sm:flex-wrap">
          <Button className="w-full sm:w-auto" size="sm" icon={<ClipboardCopy size={15} />} type="button" onClick={onCopy}>
            {copied ? "Copié" : "Contexte Codex"}
          </Button>
          <Button className="w-full sm:w-auto" size="sm" type="button" onClick={onMarkDone}>
            Done
          </Button>
          <Button className="w-full sm:w-auto" size="sm" icon={<Archive size={15} />} type="button" onClick={onArchive}>
            Archive
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-3 text-xs font-bold text-muted sm:grid-cols-2 lg:grid-cols-4">
        <span className="rounded-lg border border-line bg-white/[0.04] p-2">Page: {ticket.page || "Non renseignée"}</span>
        <span className="rounded-lg border border-line bg-white/[0.04] p-2">Composant: {ticket.component || "Non renseigné"}</span>
        <span className="rounded-lg border border-line bg-white/[0.04] p-2">Créé: {formatDate(ticket.createdAt)}</span>
        <span className="rounded-lg border border-line bg-white/[0.04] p-2">MAJ: {formatDate(ticket.updatedAt)}</span>
      </div>
    </Card>
  );
}

function TicketForm({
  confirmDelete,
  draft,
  editing,
  saving,
  onDelete,
  onSave,
  onUpdate,
}: {
  confirmDelete: boolean;
  draft: TicketDraft;
  editing: boolean;
  saving: boolean;
  onDelete: () => void;
  onSave: () => void;
  onUpdate: (patch: Partial<TicketDraft>) => void;
}) {
  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Titre</span>
        <Input className="mt-2 text-lg font-black" value={draft.title} onChange={(event) => onUpdate({ title: event.target.value })} />
      </label>
      <div className="grid gap-3 md:grid-cols-3">
        <SelectField label="Type" value={draft.type} values={ticketTypes} labels={typeLabel} onChange={(value) => onUpdate({ type: value as BacklogType })} />
        <SelectField label="Statut" value={draft.status} values={statuses} labels={statusLabel} onChange={(value) => onUpdate({ status: value as BacklogStatus })} />
        <SelectField label="Priorité" value={draft.priority} values={priorities} labels={priorityLabel} onChange={(value) => onUpdate({ priority: value as BacklogPriority })} />
      </div>
      <SelectField
        label="Projet workspace"
        value={draft.project || "Dashboard Admin"}
        values={workspaceProjects}
        onChange={(value) => onUpdate({ project: value })}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Page" value={draft.page} onChange={(value) => onUpdate({ page: value })} placeholder="/tools/dashboard-backlog" />
        <Field label="Composant" value={draft.component} onChange={(value) => onUpdate({ component: value })} placeholder="DashboardBacklog" />
      </div>
      <Area label="Description" value={draft.description} onChange={(value) => onUpdate({ description: value })} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Area label="Étapes reproduction" value={draft.stepsToReproduce} onChange={(value) => onUpdate({ stepsToReproduce: value })} />
        <Area label="Comportement actuel" value={draft.actualBehavior} onChange={(value) => onUpdate({ actualBehavior: value })} />
        <Area label="Comportement attendu" value={draft.expectedBehavior} onChange={(value) => onUpdate({ expectedBehavior: value })} />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <Area label="Notes" value={draft.notes} onChange={(value) => onUpdate({ notes: value })} />
        <Area label="Screenshots / références" value={screenshotsText(draft.screenshots)} onChange={(value) => onUpdate({ screenshots: parseScreenshots(value) })} placeholder="Une URL par ligne" />
      </div>
      <div className="rounded-lg border border-line bg-white/[0.04] p-3">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Aperçu contexte Codex</p>
        <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap rounded-lg border border-line bg-slate-950/45 p-3 font-mono text-xs leading-6 text-brand-3">
          {ticketCodexContext(draft)}
        </pre>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {editing ? (
          <Button variant="danger" icon={<Trash2 size={16} />} type="button" disabled={saving} onClick={onDelete}>
            {confirmDelete ? "Confirmer suppression définitive" : "Suppression définitive"}
          </Button>
        ) : null}
        <Button variant="primary" icon={<Save size={16} />} type="button" disabled={saving || !draft.title.trim()} onClick={onSave}>
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </div>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  values,
  labels,
  onChange,
}: {
  label: string;
  value: T;
  values: T[];
  labels?: Record<T, string>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <select
        className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {values.map((item) => (
          <option key={item} value={item}>
            {labels?.[item] || item}
          </option>
        ))}
      </select>
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <Input className="mt-2" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <Textarea className="mt-2 min-h-28 resize-y" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

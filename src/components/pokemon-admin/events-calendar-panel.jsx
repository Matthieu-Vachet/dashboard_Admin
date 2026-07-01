"use client";

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  Archive,
  CalendarDays,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  FileJson,
  Filter,
  List,
  Pencil,
  RefreshCcw,
  Save,
  Search,
  Sparkles,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  defaultPokemonEvents,
  POKEMON_EVENT_STATUS_LABELS,
  POKEMON_EVENT_TYPES,
  POKEMON_EVENT_TIMEZONE,
} from "@/data/pokemon-events";
import { fieldClass, Panel, primaryButtonClass, buttonClass } from "./admin-ui";

const eventsApiPath = "/api/events";
const adminEventsApiPath = "/api/admin/events";
const monthFormat = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});
const dayNames = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const statusOptions = [
  ["all", "Tous statuts"],
  ["current", "En cours"],
  ["upcoming", "À venir"],
  ["past", "Passés"],
  ["draft", "Brouillons"],
  ["archived", "Archivés"],
];

const eventTypeMap = Object.fromEntries(POKEMON_EVENT_TYPES.map((type) => [type.id, type]));

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function localInputValue(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function inputToIso(value) {
  if (!value) return new Date().toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function dayKey(value) {
  return format(value instanceof Date ? value : new Date(value), "yyyy-MM-dd");
}

function monthDays(cursor) {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 }),
  });
}

function eventOnDay(event, date) {
  const key = typeof date === "string" ? date : dayKey(date);
  return dayKey(event.startDate) <= key && dayKey(event.endDate) >= key;
}

function eventSort(left, right) {
  return `${left.startDate}${left.title}`.localeCompare(`${right.startDate}${right.title}`);
}

function eventType(event) {
  return eventTypeMap[event.type] || eventTypeMap.other;
}

function eventStatus(event) {
  if (event.status === "draft" || event.status === "archived") return event.status;
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (end < now) return "past";
  if (start <= now && end >= now) return "current";
  return "upcoming";
}

function dateRangeLabel(event) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (dayKey(start) === dayKey(end)) {
    return `${dateTimeFormat.format(start)} → ${format(end, "HH:mm", { locale: fr })}`;
  }
  return `${dateTimeFormat.format(start)} → ${dateTimeFormat.format(end)}`;
}

function splitLines(value) {
  return String(value || "")
    .split(/\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function emptyDraft(date = new Date()) {
  const start = new Date(date);
  start.setHours(10, 0, 0, 0);
  const end = new Date(date);
  end.setHours(18, 0, 0, 0);
  return {
    originalId: "",
    id: "",
    title: "",
    type: "event",
    status: "upcoming",
    startDate: localInputValue(start.toISOString()),
    endDate: localInputValue(end.toISOString()),
    timezone: POKEMON_EVENT_TIMEZONE,
    source: "manual",
    banner: "",
    icon: "",
    description: "",
    featuredPokemonText: "",
    bonusesText: "",
    linksText: "",
  };
}

function eventToDraft(event) {
  return {
    originalId: event.id,
    id: event.id,
    title: event.title || "",
    type: event.type || "event",
    status: event.status || "upcoming",
    startDate: localInputValue(event.startDate),
    endDate: localInputValue(event.endDate),
    timezone: event.timezone || POKEMON_EVENT_TIMEZONE,
    source: event.source || "manual",
    banner: event.assets?.banner || "",
    icon: event.assets?.icon || "",
    description: event.description || "",
    featuredPokemonText: (event.featuredPokemon || []).map((pokemon) => pokemon.name || pokemon.id).filter(Boolean).join("\n"),
    bonusesText: (event.bonuses || []).join("\n"),
    linksText: (event.links || []).map((link) => `${link.label || "Source"} | ${link.url}`).join("\n"),
  };
}

function draftPayload(draft) {
  return {
    id: draft.id,
    title: draft.title,
    type: draft.type,
    status: draft.status,
    startDate: inputToIso(draft.startDate),
    endDate: inputToIso(draft.endDate),
    timezone: draft.timezone || POKEMON_EVENT_TIMEZONE,
    source: draft.source || "manual",
    description: draft.description || "",
    assets: {
      banner: draft.banner || null,
      icon: draft.icon || null,
    },
    featuredPokemon: splitLines(draft.featuredPokemonText).map((name) => ({ name })),
    bonuses: splitLines(draft.bonusesText),
    links: splitLines(draft.linksText).map((line) => {
      const [label, ...urlParts] = line.split("|").map((part) => part.trim());
      const url = urlParts.join("|").trim() || label;
      return { label: urlParts.length ? label || "Source" : "Source", url };
    }),
  };
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function EventsCalendarPanel({ globalSearch = "" }) {
  const [events, setEvents] = useState(defaultPokemonEvents);
  const [meta, setMeta] = useState({ configured: false, seeded: true, collection: "events" });
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState("");
  const [view, setView] = useState("calendar");
  const [cursor, setCursor] = useState(new Date());
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [draft, setDraft] = useState(() => emptyDraft());
  const [importOpen, setImportOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents({ notify = false } = {}) {
    setLoading(true);
    try {
      const response = await fetch(`${eventsApiPath}?includeArchived=1`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Impossible de charger les events.");
      setEvents(Array.isArray(payload.data?.events) ? payload.data.events : []);
      setMeta({
        configured: Boolean(payload.data?.configured),
        seeded: Boolean(payload.data?.seeded),
        collection: payload.data?.collection || "events",
      });
      if (notify) toast.success("Calendrier events actualisé.");
    } catch (error) {
      toast.error(error.message || "Erreur de chargement events.");
    } finally {
      setLoading(false);
    }
  }

  const filteredEvents = useMemo(() => {
    const localNeedle = query.trim().toLowerCase();
    const globalNeedle = globalSearch.trim().toLowerCase();
    return events
      .map((event) => ({ ...event, status: eventStatus(event) }))
      .filter((event) => typeFilter === "all" || event.type === typeFilter)
      .filter((event) => statusFilter === "all" || event.status === statusFilter)
      .filter((event) => !dateFilter || eventOnDay(event, dateFilter))
      .filter((event) => {
        const haystack = [
          event.title,
          event.description,
          event.type,
          event.status,
          event.source,
          ...(event.bonuses || []),
          ...(event.featuredPokemon || []).map((pokemon) => pokemon.name || pokemon.id),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return (!localNeedle || haystack.includes(localNeedle)) && (!globalNeedle || haystack.includes(globalNeedle));
      })
      .sort(eventSort);
  }, [dateFilter, events, globalSearch, query, statusFilter, typeFilter]);

  const days = useMemo(() => monthDays(cursor), [cursor]);
  const todayKey = dayKey(new Date());
  const todayEvents = filteredEvents.filter((event) => eventOnDay(event, todayKey)).sort(eventSort);
  const currentEvents = filteredEvents.filter((event) => event.status === "current").sort(eventSort);
  const upcomingEvents = filteredEvents.filter((event) => event.status === "upcoming").sort(eventSort);
  const pastEvents = filteredEvents.filter((event) => event.status === "past").sort(eventSort).reverse();
  const activeCount = events.filter((event) => eventStatus(event) === "current").length;
  const upcomingCount = events.filter((event) => eventStatus(event) === "upcoming").length;
  const archivedCount = events.filter((event) => event.status === "archived").length;

  function openCreate(date) {
    setDraft(emptyDraft(date || new Date()));
    setEditorOpen(true);
  }

  function openEdit(event) {
    setDraft(eventToDraft(event));
    setEditorOpen(true);
  }

  async function saveDraft() {
    const payload = draftPayload(draft);
    if (!payload.title.trim()) {
      toast.error("Le titre de l'event est obligatoire.");
      return;
    }
    setBusy("save");
    try {
      const editing = Boolean(draft.originalId);
      const response = await fetch(
        editing ? `${adminEventsApiPath}/${encodeURIComponent(draft.originalId)}` : adminEventsApiPath,
        {
          method: editing ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Impossible d'enregistrer l'event.");
      const nextEvent = result.data?.event;
      if (nextEvent) {
        setEvents((current) => {
          const withoutPrevious = current.filter((event) => event.id !== draft.originalId && event.id !== nextEvent.id);
          return [...withoutPrevious, nextEvent].sort(eventSort);
        });
        setSelectedEvent(nextEvent);
      }
      setEditorOpen(false);
      toast.success(editing ? "Event modifié." : "Event ajouté.");
    } catch (error) {
      toast.error(error.message || "Impossible d'enregistrer l'event.");
    } finally {
      setBusy("");
    }
  }

  async function patchEvent(event, patch, label) {
    setBusy(event.id);
    try {
      const response = await fetch(`${adminEventsApiPath}/${encodeURIComponent(event.id)}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...event, ...patch }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Action event impossible.");
      const updated = payload.data?.event;
      if (updated) {
        setEvents((current) => current.map((item) => (item.id === event.id ? updated : item)));
        setSelectedEvent(updated);
      }
      toast.success(label);
    } catch (error) {
      toast.error(error.message || "Action event impossible.");
    } finally {
      setBusy("");
    }
  }

  async function deleteEvent(event) {
    if (!window.confirm(`Supprimer ${event.title} ?`)) return;
    setBusy(event.id);
    try {
      const response = await fetch(`${adminEventsApiPath}/${encodeURIComponent(event.id)}`, {
        method: "DELETE",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Suppression impossible.");
      setEvents((current) => current.filter((item) => item.id !== event.id));
      setSelectedEvent(null);
      toast.success("Event supprimé.");
    } catch (error) {
      toast.error(error.message || "Suppression impossible.");
    } finally {
      setBusy("");
    }
  }

  function duplicateEvent(event) {
    const copy = eventToDraft(event);
    copy.originalId = "";
    copy.id = `${event.id}-copie-${Date.now()}`;
    copy.title = `${event.title} copie`;
    setDraft(copy);
    setEditorOpen(true);
  }

  async function importEvents() {
    setBusy("import");
    try {
      const parsed = JSON.parse(importText);
      const response = await fetch(`${adminEventsApiPath}/import`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Array.isArray(parsed) ? { events: parsed } : parsed),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Import impossible.");
      if (Array.isArray(payload.data?.events)) setEvents(payload.data.events);
      setImportOpen(false);
      setImportText("");
      toast.success(`Import terminé: ${payload.data?.total || 0} event(s).`);
    } catch (error) {
      toast.error(error.message || "JSON invalide ou import impossible.");
    } finally {
      setBusy("");
    }
  }

  function exportEvents() {
    downloadJson("pokemon-go-events.json", {
      generatedAt: new Date().toISOString(),
      collection: meta.collection,
      events: filteredEvents,
    });
  }

  return (
    <section className="space-y-5">
      <Panel
        title="Calendrier Events Pokémon GO"
        eyebrow={`Mongo ${meta.collection}${meta.seeded ? " · données seed" : ""}`}
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={() => loadEvents({ notify: true })} disabled={loading}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={() => setImportOpen(true)}>
              <Upload size={17} /> Import JSON
            </button>
            <button className={buttonClass} type="button" onClick={exportEvents}>
              <Download size={17} /> Export JSON
            </button>
            <button className={primaryButtonClass} type="button" onClick={() => openCreate(new Date())}>
              <CalendarPlus size={17} /> Ajouter
            </button>
          </div>
        }
      >
        <div className="grid gap-3 md:grid-cols-4">
          <StatTile icon={<CalendarDays size={19} />} label="Events visibles" value={filteredEvents.length} />
          <StatTile icon={<Sparkles size={19} />} label="En cours" value={activeCount} tone="green" />
          <StatTile icon={<Clock3 size={19} />} label="À venir" value={upcomingCount} tone="cyan" />
          <StatTile icon={<Archive size={19} />} label="Archivés" value={archivedCount} tone="amber" />
        </div>
        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_180px_170px_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
            <input
              className={`${fieldClass} pl-11`}
              placeholder="Rechercher event, bonus, Pokémon..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <select className={fieldClass} value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="all">Tous types</option>
            {POKEMON_EVENT_TYPES.map((type) => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
          <select className={fieldClass} value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {statusOptions.map(([id, label]) => (
              <option key={id} value={id}>{label}</option>
            ))}
          </select>
          <input className={fieldClass} type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
          <button className={buttonClass} type="button" onClick={() => setCompact((value) => !value)}>
            <Filter size={17} /> {compact ? "Détaillé" : "Compact"}
          </button>
        </div>
        {!meta.configured ? (
          <p className="mt-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 text-sm font-bold text-amber-100">
            MongoDB dashboard n&apos;est pas configuré: la lecture utilise les seeds, les actions admin nécessitent la collection Mongo `events`.
          </p>
        ) : null}
      </Panel>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_22px_90px_rgba(0,0,0,.22)] sm:p-4">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <button className={buttonClass} type="button" onClick={() => setCursor(subMonths(cursor, 1))} aria-label="Mois précédent">
                <ChevronLeft size={17} />
              </button>
              <button className={buttonClass} type="button" onClick={() => setCursor(new Date())}>
                Aujourd&apos;hui
              </button>
              <button className={buttonClass} type="button" onClick={() => setCursor(addMonths(cursor, 1))} aria-label="Mois suivant">
                <ChevronRight size={17} />
              </button>
            </div>
            <h3 className="text-2xl font-black capitalize text-white">{monthFormat.format(cursor)}</h3>
            <div className="flex rounded-2xl border border-white/10 bg-slate-950/45 p-1">
              {[
                ["calendar", CalendarDays, "Mois"],
                ["list", List, "Liste"],
              ].map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition ${
                    view === id ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          </div>

          {view === "calendar" ? (
            <div className="overflow-x-auto pb-1">
              <div className="min-w-[820px]">
                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map((day) => (
                    <span key={day} className="rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-center text-xs font-black uppercase tracking-[0.14em] text-cyan-100/70">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-7 gap-2">
                  {days.map((day) => {
                    const key = dayKey(day);
                    const dayEvents = filteredEvents.filter((event) => eventOnDay(event, key));
                    const today = key === todayKey;
                    return (
                      <article
                        key={key}
                        className={`min-h-[145px] rounded-2xl border p-2 transition ${
                          isSameMonth(day, cursor)
                            ? "border-white/10 bg-white/[0.04]"
                            : "border-white/5 bg-slate-950/30 opacity-55"
                        } ${today ? "ring-2 ring-cyan-300/60" : ""}`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <button
                            className="rounded-full px-2 py-1 text-left text-xs font-black text-white hover:bg-white/10"
                            type="button"
                            onClick={() => {
                              setDateFilter(key);
                              setView("list");
                            }}
                          >
                            {format(day, "d", { locale: fr })}
                          </button>
                          <button
                            className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-cyan-100 hover:bg-cyan-300/15"
                            type="button"
                            onClick={() => openCreate(day)}
                            aria-label={`Ajouter un event le ${key}`}
                          >
                            <CalendarPlus size={14} />
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {dayEvents.slice(0, compact ? 2 : 4).map((event) => (
                            <EventChip key={`${key}-${event.id}`} event={event} onOpen={setSelectedEvent} compact={compact} />
                          ))}
                          {dayEvents.length > (compact ? 2 : 4) ? (
                            <button className="w-full rounded-xl border border-white/10 bg-slate-950/45 px-2 py-1 text-xs font-black text-slate-300" type="button" onClick={() => setView("list")}>
                              +{dayEvents.length - (compact ? 2 : 4)} autres
                            </button>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <EventGroup title="Aujourd'hui" events={todayEvents} onOpen={setSelectedEvent} empty="Aucun event aujourd'hui." />
              <EventGroup title="En cours" events={currentEvents} onOpen={setSelectedEvent} empty="Aucun event en cours." />
              <EventGroup title="À venir" events={upcomingEvents.slice(0, 80)} onOpen={setSelectedEvent} empty="Aucun event à venir." />
              <EventGroup title="Passés" events={pastEvents.slice(0, 40)} onOpen={setSelectedEvent} empty="Aucun event passé dans ce filtre." />
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <EventGroup title="Aujourd'hui" events={todayEvents.slice(0, 5)} onOpen={setSelectedEvent} empty="Journée libre." />
          <EventGroup title="À surveiller" events={[...currentEvents, ...upcomingEvents].slice(0, 8)} onOpen={setSelectedEvent} empty="Rien à surveiller." />
        </aside>
      </section>

      {selectedEvent ? (
        <EventDetailModal
          event={selectedEvent}
          busy={busy === selectedEvent.id}
          onClose={() => setSelectedEvent(null)}
          onEdit={() => openEdit(selectedEvent)}
          onDuplicate={() => duplicateEvent(selectedEvent)}
          onArchive={() => patchEvent(selectedEvent, { status: "archived" }, "Event archivé.")}
          onRestore={() => patchEvent(selectedEvent, { status: eventStatus(selectedEvent) === "past" ? "past" : "upcoming" }, "Event restauré.")}
          onDelete={() => deleteEvent(selectedEvent)}
        />
      ) : null}

      {editorOpen ? (
        <EventEditorModal
          draft={draft}
          busy={busy === "save"}
          onChange={setDraft}
          onClose={() => setEditorOpen(false)}
          onSave={saveDraft}
        />
      ) : null}

      {importOpen ? (
        <ImportModal
          value={importText}
          busy={busy === "import"}
          onChange={setImportText}
          onClose={() => setImportOpen(false)}
          onImport={importEvents}
        />
      ) : null}
    </section>
  );
}

function StatTile({ icon, label, value, tone = "cyan" }) {
  const toneClass = {
    cyan: "border-cyan-200/20 bg-cyan-400/10 text-cyan-100",
    green: "border-emerald-200/20 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-200/20 bg-amber-400/10 text-amber-100",
  }[tone];
  return (
    <article className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-slate-950/35">
        {icon}
      </div>
      <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/60">{label}</span>
      <strong className="mt-1 block text-3xl font-black text-white">{value}</strong>
    </article>
  );
}

function EventChip({ event, onOpen, compact }) {
  const type = eventType(event);
  return (
    <button
      className="group relative w-full overflow-hidden rounded-xl border px-2 py-2 text-left transition hover:-translate-y-0.5"
      style={{
        borderColor: hexToRgba(type.color, 0.38),
        background: `linear-gradient(135deg, ${hexToRgba(type.color, 0.20)}, rgba(15,23,42,.72))`,
      }}
      type="button"
      onClick={() => onOpen(event)}
    >
      <span className="absolute inset-y-0 left-0 w-1" style={{ backgroundColor: type.color }} />
      <span className="flex min-w-0 items-center gap-2 pl-1">
        {type.icon ? <img className="h-5 w-5 shrink-0 object-contain" src={type.icon} alt="" loading="lazy" /> : null}
        <span className="min-w-0">
          <strong className="block truncate text-[11px] font-black text-white">{event.title}</strong>
          {!compact ? (
            <small className="block truncate text-[10px] font-bold text-slate-300">
              {format(new Date(event.startDate), "HH:mm", { locale: fr })} · {POKEMON_EVENT_STATUS_LABELS[event.status] || event.status}
            </small>
          ) : null}
        </span>
      </span>
    </button>
  );
}

function EventGroup({ title, events, onOpen, empty }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-lg font-black text-white">{title}</h3>
        <span className="rounded-full border border-white/10 bg-slate-950/45 px-2.5 py-1 font-mono text-xs font-black text-cyan-100">
          {events.length}
        </span>
      </div>
      <div className="space-y-2">
        {events.length ? (
          events.map((event) => <EventRow key={`${title}-${event.id}`} event={event} onOpen={onOpen} />)
        ) : (
          <p className="rounded-2xl border border-dashed border-white/10 p-4 text-sm font-bold text-slate-400">{empty}</p>
        )}
      </div>
    </section>
  );
}

function EventRow({ event, onOpen }) {
  const type = eventType(event);
  return (
    <button
      className="group grid w-full grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5"
      style={{
        borderColor: hexToRgba(type.color, 0.30),
        background: `linear-gradient(135deg, ${hexToRgba(type.color, 0.14)}, rgba(2,6,23,.42))`,
      }}
      type="button"
      onClick={() => onOpen(event)}
    >
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/45">
        {type.icon ? <img className="max-h-8 max-w-8 object-contain" src={type.icon} alt="" loading="lazy" /> : <CalendarDays size={20} />}
      </span>
      <span className="min-w-0">
        <span className="mb-1 flex flex-wrap items-center gap-2">
          <strong className="min-w-0 truncate text-sm font-black text-white">{event.title}</strong>
          <small className="rounded-full px-2 py-0.5 text-[10px] font-black text-slate-950" style={{ backgroundColor: type.color }}>
            {type.label}
          </small>
        </span>
        <small className="block truncate text-xs font-bold text-slate-300">{dateRangeLabel(event)}</small>
        {event.description ? <small className="mt-1 block truncate text-xs font-semibold text-slate-500">{event.description}</small> : null}
      </span>
    </button>
  );
}

function EventDetailModal({ event, busy, onClose, onEdit, onDuplicate, onArchive, onRestore, onDelete }) {
  const type = eventType(event);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl" onClick={onClose}>
      <article className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#07111f] shadow-[0_30px_120px_rgba(0,0,0,.5)]" onClick={(clickEvent) => clickEvent.stopPropagation()}>
        <header
          className="relative overflow-hidden rounded-t-[2rem] border-b border-white/10 p-5 sm:p-7"
          style={{
            backgroundImage: `linear-gradient(135deg, ${hexToRgba(type.color, 0.34)}, rgba(2,6,23,.86)), url("/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/35" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-3 py-1 text-xs font-black text-cyan-50">
                {type.icon ? <img className="h-5 w-5 object-contain" src={type.icon} alt="" /> : null}
                {type.label}
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">{event.title}</h2>
              <p className="mt-2 text-sm font-bold text-slate-200">{dateRangeLabel(event)}</p>
            </div>
            <button className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/20" type="button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="space-y-4 p-4 sm:p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <InfoPill label="Statut" value={POKEMON_EVENT_STATUS_LABELS[event.status] || event.status} />
            <InfoPill label="Source" value={event.source || "manual"} />
            <InfoPill label="Timezone" value={event.timezone || POKEMON_EVENT_TIMEZONE} />
          </div>
          {event.description ? (
            <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <h3 className="mb-2 text-lg font-black text-white">Description</h3>
              <p className="text-sm font-semibold leading-6 text-slate-300">{event.description}</p>
            </section>
          ) : null}
          <div className="grid gap-4 lg:grid-cols-2">
            <DetailList title="Bonus" items={event.bonuses || []} empty="Aucun bonus renseigné." />
            <DetailList title="Pokémon liés" items={(event.featuredPokemon || []).map((pokemon) => pokemon.name || pokemon.id)} empty="Aucun Pokémon lié." />
          </div>
          <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <h3 className="mb-3 text-lg font-black text-white">Liens sources</h3>
            <div className="grid gap-2">
              {(event.links || []).length ? (
                event.links.map((link) => (
                  <a className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10" key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} /> <span className="truncate">{link.label || link.url}</span>
                  </a>
                ))
              ) : (
                <p className="text-sm font-bold text-slate-500">Aucun lien source.</p>
              )}
            </div>
          </section>
          <div className="flex flex-wrap justify-end gap-2">
            <button className={buttonClass} type="button" onClick={onDuplicate}>
              <Copy size={17} /> Dupliquer
            </button>
            {event.status === "archived" ? (
              <button className={buttonClass} type="button" onClick={onRestore} disabled={busy}>
                <Archive size={17} /> Restaurer
              </button>
            ) : (
              <button className={buttonClass} type="button" onClick={onArchive} disabled={busy}>
                <Archive size={17} /> Archiver
              </button>
            )}
            <button className={buttonClass} type="button" onClick={onDelete} disabled={busy}>
              <Trash2 size={17} /> Supprimer
            </button>
            <button className={primaryButtonClass} type="button" onClick={onEdit}>
              <Pencil size={17} /> Modifier
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
      <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <strong className="mt-1 block break-words text-sm font-black text-white">{value}</strong>
    </div>
  );
}

function DetailList({ title, items, empty }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <h3 className="mb-3 text-lg font-black text-white">{title}</h3>
      <div className="grid gap-2">
        {items.length ? (
          items.map((item) => (
            <span className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-slate-200" key={item}>
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm font-bold text-slate-500">{empty}</p>
        )}
      </div>
    </section>
  );
}

function EventEditorModal({ draft, busy, onChange, onClose, onSave }) {
  const update = (patch) => onChange((current) => ({ ...current, ...patch }));
  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl" onClick={onClose}>
      <article className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#07111f] p-4 shadow-[0_30px_120px_rgba(0,0,0,.5)] sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">CRUD admin</p>
            <h2 className="mt-1 text-2xl font-black text-white">{draft.originalId ? "Modifier l'event" : "Ajouter un event"}</h2>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white" type="button" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <Field label="Titre" value={draft.title} onChange={(value) => update({ title: value })} />
          <Field label="Identifiant" value={draft.id} placeholder="auto si vide" onChange={(value) => update({ id: value })} />
          <SelectField label="Type" value={draft.type} onChange={(value) => update({ type: value })} options={POKEMON_EVENT_TYPES.map((type) => [type.id, type.label])} />
          <SelectField label="Statut" value={draft.status} onChange={(value) => update({ status: value })} options={statusOptions.filter(([id]) => id !== "all")} />
          <Field label="Début" type="datetime-local" value={draft.startDate} onChange={(value) => update({ startDate: value })} />
          <Field label="Fin" type="datetime-local" value={draft.endDate} onChange={(value) => update({ endDate: value })} />
          <Field label="Timezone" value={draft.timezone} onChange={(value) => update({ timezone: value })} />
          <Field label="Source" value={draft.source} onChange={(value) => update({ source: value })} />
          <Field label="Icon URL" value={draft.icon} onChange={(value) => update({ icon: value })} />
          <Field label="Banner URL" value={draft.banner} onChange={(value) => update({ banner: value })} />
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <Area label="Description" value={draft.description} onChange={(value) => update({ description: value })} />
          <Area label="Pokémon liés (un par ligne)" value={draft.featuredPokemonText} onChange={(value) => update({ featuredPokemonText: value })} />
          <Area label="Bonus (un par ligne)" value={draft.bonusesText} onChange={(value) => update({ bonusesText: value })} />
          <Area label="Liens sources: Label | URL" value={draft.linksText} onChange={(value) => update({ linksText: value })} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button className={buttonClass} type="button" onClick={onClose}>Annuler</button>
          <button className={primaryButtonClass} type="button" onClick={onSave} disabled={busy}>
            <Save size={17} /> {busy ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </article>
    </div>
  );
}

function ImportModal({ value, busy, onChange, onClose, onImport }) {
  return (
    <div className="fixed inset-0 z-[95] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl" onClick={onClose}>
      <article className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-[#07111f] p-4 shadow-[0_30px_120px_rgba(0,0,0,.5)] sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Import JSON</p>
            <h2 className="mt-1 text-2xl font-black text-white">Importer des events</h2>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white" type="button" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <textarea
          className={`${fieldClass} min-h-[360px] font-mono text-xs leading-5`}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder='{"events":[{"id":"community-day-example","title":"Community Day","type":"community_day","startDate":"2026-07-01T10:00:00.000Z","endDate":"2026-07-01T17:00:00.000Z"}]}'
        />
        <div className="mt-5 flex justify-end gap-2">
          <button className={buttonClass} type="button" onClick={onClose}>Annuler</button>
          <button className={primaryButtonClass} type="button" onClick={onImport} disabled={busy}>
            <FileJson size={17} /> {busy ? "Import..." : "Importer"}
          </button>
        </div>
      </article>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <input className={fieldClass} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([id, labelText]) => (
          <option key={id} value={id}>{labelText}</option>
        ))}
      </select>
    </label>
  );
}

function Area({ label, value, onChange }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <textarea className={`${fieldClass} min-h-36 py-3 leading-6`} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

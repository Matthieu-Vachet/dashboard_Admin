"use client";

/* eslint-disable @next/next/no-img-element */
import {
  addDays,
  addMonths,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  formatDistanceToNowStrict,
  isSameMonth,
  startOfMonth,
  startOfDay,
  startOfWeek,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  Archive,
  CalendarDays,
  CalendarPlus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock3,
  Copy,
  Download,
  Egg,
  ExternalLink,
  FileJson,
  Filter,
  FlaskConical,
  List,
  Pencil,
  RefreshCcw,
  Search,
  Sparkles,
  Swords,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EventEditorModal, ImportModal } from "@/components/admin/events/event-editor-modal";
import { ModalPortal } from "@/components/admin/shared/modal-portal";
import {
  defaultPokemonEvents,
  POKEMON_EVENT_STATUS_LABELS,
  POKEMON_EVENT_TYPES,
  POKEMON_EVENT_TIMEZONE,
} from "@/data/pokemon-events";
import {
  adminEventsApiPath,
  adminEventsScrapePath,
  eventsApiPath,
} from "@/services/admin/events-api";
import { fieldClass, Panel, primaryButtonClass, buttonClass } from "@/components/admin/pokemon/admin-ui";
import { DatasetSourceHeader } from "@/components/admin/pokemon/dataset-source-header";
import { PokemonArtwork } from "@/components/admin/pokemon/pokemon-artwork";
import { resolvePokemonVariant } from "@/lib/pokemon-variant-resolver";

const monthFormat = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" });
const dateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});
const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
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

function uniqueBy(items, keyFn) {
  const seen = new Set();
  return items.filter((item) => {
    const key = keyFn(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
    start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 }),
  });
}

function eventOnDay(event, date) {
  const key = typeof date === "string" ? date : dayKey(date);
  return dayKey(event.startDate) <= key && dayKey(event.endDate) >= key;
}

function eventSort(left, right) {
  return `${left.startDate}${left.title}`.localeCompare(`${right.startDate}${right.title}`);
}

function chunkWeeks(days) {
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }
  return weeks;
}

function eventDurationDays(event) {
  return Math.max(1, differenceInCalendarDays(new Date(event.endDate), new Date(event.startDate)) + 1);
}

function isMultiDayEvent(event) {
  return eventDurationDays(event) > 1;
}

function eventTimeLabel(event) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (dayKey(start) === dayKey(end)) {
    return `${format(start, "HH:mm", { locale: fr })} - ${format(end, "HH:mm", { locale: fr })}`;
  }
  return `${format(start, "d MMM HH:mm", { locale: fr })} - ${format(end, "d MMM HH:mm", { locale: fr })}`;
}

function eventRemainingLabel(event) {
  const now = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  if (end < now) return `termine depuis ${formatDistanceToNowStrict(end, { locale: fr })}`;
  if (start > now) return `commence dans ${formatDistanceToNowStrict(start, { locale: fr })}`;
  return `se termine dans ${formatDistanceToNowStrict(end, { locale: fr })}`;
}

function normalizeEventImageUrl(src) {
  const value = String(src || "").trim();
  if (!value) return null;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/ui/") || value.startsWith("/_next/")) return value;
  if (value.startsWith("/")) return `https://leekduck.com${value}`;
  return `https://leekduck.com/${value.replace(/^\.?\//, "")}`;
}

function normalizedImagePath(src) {
  const normalized = normalizeEventImageUrl(src);
  if (!normalized) return "";
  try {
    return new URL(normalized, "https://leekduck.com").pathname.toLowerCase();
  } catch {
    return normalized.toLowerCase();
  }
}

function isLeekDuckLogoImage(src) {
  const value = normalizedImagePath(src);
  return /(^|\/)leekduck\.(jpg|jpeg|png|webp|svg)$/.test(value) || value.includes("/leekduck-logo");
}

function isGenericEventImage(src) {
  const value = normalizedImagePath(src);
  return (
    isLeekDuckLogoImage(src) ||
    value.includes("/assets/img/events/events-default-img") ||
    value.includes("/assets/img/events/icons/")
  );
}

function usefulEventImage(src) {
  const normalized = normalizeEventImageUrl(src);
  if (!normalized || isGenericEventImage(normalized)) return null;
  return normalized;
}

function rewardImageUrl(src) {
  const normalized = normalizeEventImageUrl(src);
  if (!normalized || isLeekDuckLogoImage(normalized) || normalizedImagePath(normalized).includes("/assets/img/events/events-default-img")) {
    return null;
  }
  return normalized;
}

function sectionUsefulImages(section, limit = 6) {
  return uniqueBy((section?.images || []).map(usefulEventImage).filter(Boolean), (src) => src).slice(0, limit);
}

function eventImages(event, limit = 4) {
  return (event.featuredPokemon || [])
    .map((pokemon) => ({
      src: usefulEventImage(resolvePokemonVariant(pokemon).image),
      name: pokemon.name || pokemon.id,
    }))
    .filter((pokemon) => pokemon.src)
    .slice(0, limit);
}

function eventBanner(event) {
  return usefulEventImage(event.assets?.banner || event.assets?.icon || event.images?.banner || event.images?.thumbnail);
}

function EventBannerImage({ src, className }) {
  const normalized = usefulEventImage(src);
  const [failed, setFailed] = useState(false);
  if (!normalized || failed) return null;
  return <img className={className} src={normalized} alt="" loading="lazy" onError={() => setFailed(true)} />;
}

function eventRewards(event, limit = 16) {
  return (event.rewards || [])
    .map((reward) => ({
      ...reward,
      src: rewardImageUrl(reward.image),
      text: reward.text || reward.name || reward.sourceName,
    }))
    .filter((reward) => reward.src || reward.text)
    .slice(0, limit);
}

function buildWeekSegments(weekDays, events) {
  const weekStart = startOfDay(weekDays[0]);
  const weekEnd = startOfDay(weekDays[6]);
  const lanes = [];
  const segments = events
    .filter(isMultiDayEvent)
    .filter((event) => startOfDay(new Date(event.startDate)) <= weekEnd && startOfDay(new Date(event.endDate)) >= weekStart)
    .sort((left, right) => {
      const leftStart = new Date(left.startDate).getTime();
      const rightStart = new Date(right.startDate).getTime();
      if (leftStart !== rightStart) return leftStart - rightStart;
      return eventDurationDays(right) - eventDurationDays(left);
    })
    .map((event) => {
      const eventStart = startOfDay(new Date(event.startDate));
      const eventEnd = startOfDay(new Date(event.endDate));
      const startIndex = Math.max(0, differenceInCalendarDays(eventStart, weekStart));
      const endIndex = Math.min(6, differenceInCalendarDays(eventEnd, weekStart));
      let lane = lanes.findIndex((lastEnd) => lastEnd < startIndex);
      if (lane < 0) {
        lane = lanes.length;
        lanes.push(endIndex);
      } else {
        lanes[lane] = endIndex;
      }
      return { event, startIndex, endIndex, lane };
    });
  return { segments, laneCount: Math.min(Math.max(lanes.length, 1), 5) };
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

export function EventsCalendarPanel({ globalSearch = "", onOpenPokemon }) {
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
  const weeks = useMemo(() => chunkWeeks(days), [days]);
  const todayKey = dayKey(new Date());
  const todayEvents = filteredEvents.filter((event) => eventOnDay(event, todayKey)).sort(eventSort);
  const currentEvents = filteredEvents.filter((event) => event.status === "current").sort(eventSort);
  const upcomingEvents = filteredEvents.filter((event) => event.status === "upcoming").sort(eventSort);
  const pastEvents = filteredEvents.filter((event) => event.status === "past").sort(eventSort).reverse();
  const activeCount = events.filter((event) => eventStatus(event) === "current").length;
  const upcomingCount = events.filter((event) => eventStatus(event) === "upcoming").length;
  const archivedCount = events.filter((event) => event.status === "archived").length;
  const coverage = useMemo(() => filteredEvents.reduce((total, event) => ({
    pokemon: total.pokemon + (event.featuredPokemon?.length || 0),
    raids: total.raids + (event.raids?.length || 0),
    research: total.research + (event.research?.length || event.researchTasks?.length || 0),
    eggs: total.eggs + (event.eggs?.length || 0),
  }), { pokemon: 0, raids: 0, research: 0, eggs: 0 }), [filteredEvents]);

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

  async function importLoadedEvents() {
    setBusy("import-loaded");
    try {
      const response = await fetch(`${adminEventsApiPath}/import`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ events }),
      });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Import MongoDB impossible.");
      if (Array.isArray(payload.data?.events)) setEvents(payload.data.events);
      setMeta((current) => ({ ...current, configured: true, seeded: false }));
      toast.success(`MongoDB mis à jour: ${payload.data?.total || events.length} event(s).`);
    } catch (error) {
      toast.error(error.message || "Import MongoDB impossible.");
    } finally {
      setBusy("");
    }
  }

  async function scrapeEvents() {
    setBusy("scrape");
    try {
      const response = await fetch(adminEventsScrapePath, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Scrape LeekDuck impossible.");
      const nextEvents = Array.isArray(payload.data?.events) ? payload.data.events : [];
      if (!nextEvents.length) throw new Error("Aucun event récupéré depuis LeekDuck.");
      setEvents(nextEvents);
      setMeta((current) => ({ ...current, configured: true, seeded: false }));
      toast.success(
        `LeekDuck rescrapé: ${payload.data?.eventsParsed || nextEvents.length} events, ${payload.data?.pokemonMatched || 0} Pokémon matchés.`,
      );
    } catch (error) {
      toast.error(error.message || "Scrape LeekDuck impossible.");
    } finally {
      setBusy("");
    }
  }

  function exportEvents() {
    downloadJson("pokemon-go-events.json", {
      generatedAt: new Date().toISOString(),
      collection: meta.collection,
      events,
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
            <button className={primaryButtonClass} type="button" onClick={scrapeEvents} disabled={busy === "scrape"}>
              <Sparkles size={17} /> {busy === "scrape" ? "Scrape..." : "Rescraper Events"}
            </button>
            <button className={buttonClass} type="button" onClick={importLoadedEvents} disabled={busy === "import-loaded" || !events.length}>
              <Upload size={17} /> {busy === "import-loaded" ? "Envoi..." : "Envoyer MongoDB"}
            </button>
            <button className={buttonClass} type="button" onClick={() => setImportOpen(true)}>
              <Upload size={17} /> Import JSON
            </button>
            <button className={buttonClass} type="button" onClick={exportEvents}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={buttonClass} type="button" onClick={() => openCreate(new Date())}>
              <CalendarPlus size={17} /> Ajouter
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7">
          <StatTile icon={<CalendarDays size={16} />} label="Events visibles" value={filteredEvents.length} />
          <StatTile icon={<Sparkles size={16} />} label="En cours" value={activeCount} tone="green" />
          <StatTile icon={<Clock3 size={16} />} label="À venir" value={upcomingCount} tone="cyan" />
          <StatTile icon={<Archive size={16} />} label="Archivés" value={archivedCount} tone="amber" />
          <StatTile icon={<Swords size={16} />} label="Raids liés" value={coverage.raids} tone="violet" />
          <StatTile icon={<FlaskConical size={16} />} label="Research liées" value={coverage.research} tone="green" />
          <StatTile icon={<Egg size={16} />} label="Pokémon illustrés" value={coverage.pokemon} tone="amber" />
        </div>
        <DatasetSourceHeader
          dataset={{
            meta: {
              source: meta.configured ? "mongodb" : "seed",
              provider: "leekduck-events",
              mode: meta.seeded ? "seed" : "scraped",
              visibility: "public",
              status: meta.configured ? "success" : "warning",
              count: events.length,
              url: "https://leekduck.com/events/",
            },
            current: { visibility: "public", diagnostics: { warnings: meta.seeded ? ["Lecture sur données seed : MongoDB non configuré."] : [] } },
          }}
          total={events.length}
        />
        <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_180px_170px_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
            <input
              aria-label="Rechercher event, bonus, Pokémon..."
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

      <section className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_420px]">
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
            <h3 className="text-2xl font-black capitalize text-foreground">{monthFormat.format(cursor)}</h3>
            <div className="flex rounded-2xl border border-white/10 bg-slate-950/45 p-1">
              {[
                ["calendar", CalendarDays, "Mois"],
                ["list", List, "Liste"],
              ].map(([id, Icon, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setView(id)}
                  className={`${id === "calendar" ? "hidden sm:inline-flex" : "inline-flex"} items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition ${
                    view === id ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground"
                  }`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </div>
          </div>

          {view === "calendar" ? (
            <div className="min-w-0">
              <div className="grid gap-4 sm:hidden" aria-label="Agenda mobile">
                <EventGroup title="Aujourd'hui" events={todayEvents} onOpen={setSelectedEvent} empty="Aucun event aujourd'hui." />
                <EventGroup title="En cours" events={currentEvents} onOpen={setSelectedEvent} empty="Aucun event en cours." />
                <EventGroup title="À venir" events={upcomingEvents.slice(0, 40)} onOpen={setSelectedEvent} empty="Aucun event à venir." />
              </div>
              <div className="hidden sm:block">
                <div className="grid grid-cols-7 gap-2">
                  {dayNames.map((day) => (
                    <span key={day} className="rounded-xl border border-white/10 bg-white/[0.045] px-1 py-2 text-center text-xs font-black uppercase tracking-[0.12em] text-muted">
                      {day}
                    </span>
                  ))}
                </div>
                <div className="mt-2 space-y-2">
                  {weeks.map((week) => (
                    <CalendarWeek
                      key={week.map(dayKey).join("-")}
                      week={week}
                      cursor={cursor}
                      events={filteredEvents}
                      todayKey={todayKey}
                      compact={compact}
                      onOpen={setSelectedEvent}
                      onCreate={openCreate}
                      onOpenDay={(key) => {
                        setDateFilter(key);
                        setView("list");
                      }}
                    />
                  ))}
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

        <aside className="min-w-0 space-y-3">
          <TimelineSection title="Today Only" count={todayEvents.length} events={todayEvents.slice(0, 8)} onOpen={setSelectedEvent} empty="Aucun event aujourd'hui." />
          <TimelineSection title="Ongoing Events" count={currentEvents.length} events={currentEvents.slice(0, 14)} onOpen={setSelectedEvent} empty="Aucun event en cours." />
          <TimelineSection
            title="Upcoming Events (Next 2 Weeks)"
            count={upcomingEvents.filter((event) => new Date(event.startDate) <= addDays(new Date(), 14)).length}
            events={upcomingEvents.filter((event) => new Date(event.startDate) <= addDays(new Date(), 14)).slice(0, 24)}
            onOpen={setSelectedEvent}
            empty="Aucun event dans les 2 semaines."
          />
          <TimelineSection title="Past Events" count={pastEvents.length} events={pastEvents.slice(0, 10)} onOpen={setSelectedEvent} empty="Aucun event passé." />
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
          onOpenPokemon={onOpenPokemon}
        />
      ) : null}

      {editorOpen ? (
        <EventEditorModal
          draft={draft}
          busy={busy === "save"}
          statusOptions={statusOptions}
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
    violet: "border-violet-200/20 bg-violet-400/10 text-violet-100",
  }[tone];
  return (
    <article className={`min-w-0 rounded-xl border p-2.5 ${toneClass}`}>
      <div className="mb-1.5 inline-grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-slate-950/35">
        {icon}
      </div>
      <span className="block text-[10px] font-black uppercase leading-tight tracking-[0.14em] text-white/65">{label}</span>
      <strong className="mt-0.5 block text-2xl font-black leading-none text-white">{value}</strong>
    </article>
  );
}

function CalendarWeek({ week, cursor, events, todayKey, compact, onOpen, onCreate, onOpenDay }) {
  const { segments, laneCount } = buildWeekSegments(week, events);
  const visibleSegments = segments.filter((segment) => segment.lane < laneCount);
  const singleDayByKey = new Map(
    week.map((day) => {
      const key = dayKey(day);
      return [
        key,
        events
          .filter((event) => !isMultiDayEvent(event) && eventOnDay(event, key))
          .sort(eventSort),
      ];
    }),
  );

  return (
    <div className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/25">
      <div className="grid grid-cols-7">
        {week.map((day) => (
          <CalendarDayCell
            key={dayKey(day)}
            day={day}
            cursor={cursor}
            events={singleDayByKey.get(dayKey(day)) || []}
            today={dayKey(day) === todayKey}
            compact={compact}
            laneCount={laneCount}
            onOpen={onOpen}
            onCreate={onCreate}
            onOpenDay={onOpenDay}
          />
        ))}
      </div>
      <div
        className="absolute inset-x-1 top-11 z-20 grid grid-cols-7 gap-x-1"
        style={{
          gridTemplateRows: `repeat(${laneCount}, 1.55rem)`,
        }}
      >
        {visibleSegments.map((segment) => (
          <MultiDaySegment key={`${segment.event.id}-${segment.startIndex}-${segment.lane}`} segment={segment} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

function CalendarDayCell({ day, cursor, events, today, compact, laneCount, onOpen, onCreate, onOpenDay }) {
  const key = dayKey(day);
  return (
    <article
      className={`relative min-h-[166px] min-w-0 border-r border-white/10 p-1.5 last:border-r-0 sm:min-h-[188px] sm:p-2 ${
        isSameMonth(day, cursor) ? "bg-white/[0.035]" : "bg-slate-950/45 opacity-55"
      } ${today ? "bg-cyan-300/10 ring-1 ring-inset ring-cyan-300/55" : ""}`}
      style={{ paddingTop: `${3.25 + laneCount * 1.7}rem` }}
    >
      <div className="absolute left-1.5 right-1.5 top-1.5 flex items-center justify-between gap-1">
        <button
          className={`grid h-7 min-w-7 place-items-center rounded-full px-1 text-xs font-black ${
            today ? "bg-brand-2 text-slate-950" : "text-muted hover:bg-white/10 hover:text-foreground"
          }`}
          type="button"
          onClick={() => onOpenDay(key)}
        >
          {format(day, "d", { locale: fr })}
        </button>
        <button
          className="hidden h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-brand-2 hover:bg-brand-2/15 sm:grid"
          type="button"
          onClick={() => onCreate(day)}
          aria-label={`Ajouter un event le ${key}`}
        >
          <CalendarPlus size={13} />
        </button>
      </div>
      <div className="space-y-2">
        {events.slice(0, compact ? 2 : 5).map((event) => (
          <SingleDayEvent key={`${key}-${event.id}`} event={event} onOpen={onOpen} compact={compact} />
        ))}
        {events.length > (compact ? 2 : 5) ? (
          <button className="w-full rounded-lg border border-white/10 bg-slate-950/45 px-2 py-1 text-[10px] font-black text-slate-300" type="button" onClick={() => onOpenDay(key)}>
            +{events.length - (compact ? 2 : 5)} autres
          </button>
        ) : null}
      </div>
    </article>
  );
}

function MultiDaySegment({ segment, onOpen }) {
  const type = eventType(segment.event);
  return (
    <button
      className="min-w-0 truncate rounded-md border px-2 text-left text-xs font-black text-white shadow-[0_5px_18px_rgba(0,0,0,.16)] transition hover:border-white/35 hover:brightness-110"
      style={{
        gridColumn: `${segment.startIndex + 1} / ${segment.endIndex + 2}`,
        gridRow: `${segment.lane + 1}`,
        borderColor: hexToRgba(type.color, 0.52),
        background: `linear-gradient(90deg, ${hexToRgba(type.color, 0.34)}, ${hexToRgba(type.color, 0.18)} 55%, rgba(2,6,23,.54))`,
        boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.18)}, 0 0 18px ${hexToRgba(type.color, 0.14)}`,
      }}
      type="button"
      onClick={() => onOpen(segment.event)}
      title={segment.event.title}
    >
      {segment.startIndex === 0 ? "" : "… "}
      {segment.event.title}
      {segment.endIndex === 6 ? " …" : ""}
    </button>
  );
}

function SingleDayEvent({ event, onOpen, compact }) {
  const type = eventType(event);
  const images = eventImages(event, compact ? 2 : 4);
  return (
    <button
      className="w-full min-w-0 rounded-xl border p-1.5 text-left transition hover:-translate-y-0.5 hover:bg-white/10"
      style={{
        borderColor: hexToRgba(type.color, 0.22),
        background: `linear-gradient(135deg, ${hexToRgba(type.color, 0.08)}, rgba(2,6,23,.18))`,
      }}
      type="button"
      onClick={() => onOpen(event)}
    >
      <span className="block min-w-0 truncate text-xs font-black text-white">{event.title}</span>
      <span className="mt-0.5 flex items-center gap-1 text-[11px] font-bold text-slate-300">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: type.color }} />
        {format(new Date(event.startDate), "HH:mm", { locale: fr })}
      </span>
      {images.length ? (
        <span className="mt-1.5 flex flex-wrap items-center gap-1">
          {images.map((image) => (
            <img key={`${event.id}-${image.name}-${image.src}`} className="h-8 w-8 object-contain sm:h-10 sm:w-10" src={image.src} alt={image.name || ""} loading="lazy" />
          ))}
        </span>
      ) : null}
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

function TimelineSection({ title, count, events, onOpen, empty, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
      <button
        className="flex w-full items-center justify-between gap-3 bg-white/[0.055] px-4 py-3 text-left"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-7 min-w-7 place-items-center rounded-full bg-slate-200/85 px-2 font-mono text-xs font-black text-slate-700">{count}</span>
          <strong className="truncate text-sm font-black text-white sm:text-base">{title}</strong>
        </span>
        {open ? <ChevronUp size={18} className="shrink-0 text-slate-300" /> : <ChevronDown size={18} className="shrink-0 text-slate-300" />}
      </button>
      {open ? (
        <div className="space-y-2 p-2">
          {events.length ? (
            events.map((event) => <TimelineCard key={`${title}-${event.id}`} event={event} onOpen={onOpen} />)
          ) : (
            <p className="rounded-xl border border-dashed border-white/10 p-4 text-sm font-bold text-slate-400">{empty}</p>
          )}
        </div>
      ) : null}
    </section>
  );
}

function TimelineCard({ event, onOpen }) {
  const type = eventType(event);
  const images = eventImages(event, 8);
  const banner = eventBanner(event);
  return (
    <button
      className="group w-full overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5"
      style={{
        borderColor: hexToRgba(type.color, 0.34),
        background: `linear-gradient(135deg, ${hexToRgba(type.color, 0.10)}, rgba(2,6,23,.32))`,
        boxShadow: `inset 0 1px 0 ${hexToRgba("#ffffff", 0.08)}, 0 16px 44px rgba(0,0,0,.12)`,
      }}
      type="button"
      onClick={() => onOpen(event)}
    >
      <span
        className="inline-flex rounded-md border px-2 py-1 text-[11px] font-black text-white"
        style={{ borderColor: hexToRgba(type.color, 0.48), backgroundColor: hexToRgba(type.color, 0.52) }}
      >
        {event.category || type.label}
      </span>
      <strong className="mt-2 block text-lg font-black leading-tight text-white">{event.title}</strong>
      <span className="mt-2 block text-sm font-bold text-slate-300">{eventTimeLabel(event)}</span>
      <span className="mt-1 block text-xs font-bold italic text-emerald-200">{eventRemainingLabel(event)}</span>
      {images.length ? (
        <span className="mt-3 flex flex-wrap gap-1.5">
          {images.map((image) => (
            <img key={`${event.id}-${image.name}-${image.src}`} className="h-9 w-9 object-contain" src={image.src} alt={image.name || ""} loading="lazy" title={image.name} />
          ))}
        </span>
      ) : banner ? (
        <EventBannerImage className="mt-3 max-h-36 w-full rounded-xl border border-white/10 object-contain p-2" src={banner} />
      ) : null}
    </button>
  );
}

function EventRow({ event, onOpen }) {
  const type = eventType(event);
  return (
    <button
      className="group grid w-full grid-cols-[3rem_minmax(0,1fr)] gap-3 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5"
      style={{
        borderColor: hexToRgba(type.color, 0.30),
        background: `linear-gradient(135deg, ${hexToRgba(type.color, 0.10)}, rgba(2,6,23,.42))`,
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

const typeIconMap = {
  normal: "/ui/Types/ico_0_normal.png",
  fighting: "/ui/Types/ico_1_fighting.png",
  flying: "/ui/Types/ico_2_flying.png",
  poison: "/ui/Types/ico_3_poison.png",
  ground: "/ui/Types/ico_4_ground.png",
  rock: "/ui/Types/ico_5_rock.png",
  bug: "/ui/Types/ico_6_bug.png",
  ghost: "/ui/Types/ico_7_ghost.png",
  steel: "/ui/Types/ico_8_steel.png",
  fire: "/ui/Types/ico_9_fire.png",
  water: "/ui/Types/ico_10_water.png",
  grass: "/ui/Types/ico_11_grass.png",
  electric: "/ui/Types/ico_12_electric.png",
  psychic: "/ui/Types/ico_13_psychic.png",
  ice: "/ui/Types/ico_14_ice.png",
  dragon: "/ui/Types/ico_15_dragon.png",
  dark: "/ui/Types/ico_16_dark.png",
  fairy: "/ui/Types/ico_17_fairy.png",
};

function pokemonKey(entry) {
  return `${entry?.id || ""}:${entry?.image || ""}:${String(entry?.name || "").toLowerCase()}`;
}

function uniquePokemon(items) {
  const seen = new Set();
  return (items || []).filter((entry) => {
    if (!entry?.name && !entry?.id) return false;
    const key = pokemonKey(entry);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function eventPokemonGroups(event) {
  const sectionPokemon = (event.sections || []).flatMap((section) => section.pokemon || []);
  const allPokemon = uniquePokemon([
    ...(event.featuredPokemon || []),
    ...(event.wildSpawns || []),
    ...(event.raids || []),
    ...(event.eggs || []),
    ...(event.researchRewards || []),
    ...sectionPokemon,
  ]);
  return [
    ["Tous les Pokémon détectés", allPokemon],
    ["Spawns sauvages", event.wildSpawns || []],
    ["Raids", event.raids || []],
    ["Œufs", event.eggs || []],
    ["Research rewards", event.researchRewards || []],
  ]
    .map(([title, pokemon]) => ({ title, pokemon: uniquePokemon(pokemon) }))
    .filter((group) => group.pokemon.length);
}

function typeIconUrl(type) {
  return typeIconMap[String(type || "").toLowerCase()] || null;
}

function TypePills({ types, id }) {
  if (!Array.isArray(types) || !types.length) return null;
  return (
    <span className="mt-1 flex flex-wrap gap-1">
      {types.map((type) => {
        const icon = typeIconUrl(type);
        return (
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-black text-cyan-50" key={`${id}-${type}`}>
            {icon ? <img className="h-3.5 w-3.5 object-contain" src={icon} alt="" loading="lazy" /> : null}
            {String(type).toLowerCase()}
          </span>
        );
      })}
    </span>
  );
}

const modalToneMap = {
  dates: { color: "#22d3ee", icon: CalendarDays },
  summary: { color: "#38bdf8", icon: Sparkles },
  pokemon: { color: "#38bdf8", icon: Sparkles },
  bonus: { color: "#22c55e", icon: Sparkles },
  rewards: { color: "#f59e0b", icon: Download },
  raids: { color: "#ef4444", icon: Archive },
  research: { color: "#a855f7", icon: Search },
  source: { color: "#94a3b8", icon: ExternalLink },
  neutral: { color: "#64748b", icon: FileJson },
};

const sectionGroupConfig = [
  { title: "Raids / Battles / Max Battles", tone: "raids", categories: ["raids"] },
  { title: "Research / Tasks", tone: "research", categories: ["researchRewards"] },
  { title: "Bonus LeekDuck", tone: "bonus", categories: ["bonuses"] },
  { title: "Pokémon, spawns et œufs", tone: "pokemon", categories: ["featured", "wildSpawns", "eggs"] },
  { title: "Détails LeekDuck utiles", tone: "source", categories: ["tickets", "other"] },
];

function sectionHasUsefulContent(section) {
  return Boolean(
    section?.text?.length ||
      section?.pokemon?.length ||
      section?.rewards?.length ||
      sectionUsefulImages(section).length,
  );
}

function visibleScrapedSections(sections) {
  return (sections || [])
    .map((section) => ({ ...section, usefulImages: sectionUsefulImages(section) }))
    .filter(sectionHasUsefulContent);
}

function EventBadge({ label, value, tone = "neutral" }) {
  const theme = modalToneMap[tone] || modalToneMap.neutral;
  return (
    <span
      className="inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-1 text-xs font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.09)]"
      style={{
        borderColor: hexToRgba(theme.color, 0.34),
        background: `linear-gradient(135deg, ${hexToRgba(theme.color, 0.18)}, rgba(2,6,23,.42))`,
        boxShadow: `0 0 22px ${hexToRgba(theme.color, 0.10)}`,
      }}
    >
      <span className="text-[10px] uppercase tracking-[0.16em] text-white/55">{label}</span>
      <span>{value}</span>
    </span>
  );
}

function DetailSection({ title, eyebrow, count, tone = "neutral", children, className = "" }) {
  const theme = modalToneMap[tone] || modalToneMap.neutral;
  const Icon = theme.icon;
  return (
    <section
      className={`rounded-2xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}
      style={{
        borderColor: hexToRgba(theme.color, 0.26),
        background: `linear-gradient(135deg, ${hexToRgba(theme.color, 0.10)}, rgba(2,6,23,.44) 46%, rgba(2,6,23,.66))`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,.055), 0 0 34px ${hexToRgba(theme.color, 0.08)}`,
      }}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <span className="flex min-w-0 items-start gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
            style={{
              borderColor: hexToRgba(theme.color, 0.28),
              backgroundColor: hexToRgba(theme.color, 0.14),
            }}
          >
            <Icon size={18} className="text-white" />
          </span>
          <span className="min-w-0">
            {eyebrow ? (
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                {eyebrow}
              </span>
            ) : null}
            <h3 className="text-xl font-black leading-tight text-white">{title}</h3>
          </span>
        </span>
        {typeof count === "number" ? (
          <span
            className="rounded-full border px-3 py-1 font-mono text-xs font-black text-white"
            style={{
              borderColor: hexToRgba(theme.color, 0.28),
              backgroundColor: hexToRgba(theme.color, 0.13),
            }}
          >
            {count}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function EventDetailModal({ event, busy, onClose, onEdit, onDuplicate, onArchive, onRestore, onDelete, onOpenPokemon }) {
  const type = eventType(event);
  const rewards = eventRewards(event, 120);
  const pokemonGroups = eventPokemonGroups(event);
  const pokemonCount = pokemonGroups[0]?.pokemon.length || 0;
  const scrapedSections = visibleScrapedSections(event.sections || []);
  const sectionGroups = sectionGroupConfig
    .map((group) => ({
      ...group,
      sections: scrapedSections.filter((section) => group.categories.includes(section.category)),
    }))
    .filter((group) => group.sections.length);
  const usefulSectionCount = sectionGroups.reduce((total, group) => total + group.sections.length, 0);
  const sectionRewardCount = scrapedSections.reduce((total, section) => total + (section.rewards?.length || 0), 0);
  const bonusCount = (event.bonuses || []).length + (sectionGroups.find((group) => group.tone === "bonus")?.sections.length || 0);
  const itemCount = rewards.filter((reward) => reward.id || reward.matched || reward.src).length + sectionRewardCount;
  const status = eventStatus(event);
  const banner = eventBanner(event);
  const sourceLinks = uniqueBy([...(event.links || []), event.sourceUrl ? { label: "Page LeekDuck", url: event.sourceUrl } : null].filter(Boolean), (link) => link.url);
  return (
    <ModalPortal>
      <div className="event-detail-overlay fixed inset-0 z-[1200] grid place-items-center overflow-y-auto bg-slate-950/84 p-3 backdrop-blur-xl sm:p-5" onClick={onClose}>
      <article className="event-detail-modal flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] shadow-[0_30px_120px_rgba(0,0,0,.58)]" role="dialog" aria-modal="true" aria-label={`Détail event ${event.title}`} onClick={(clickEvent) => clickEvent.stopPropagation()}>
        <header
          className="relative shrink-0 overflow-hidden rounded-t-[2rem] border-b border-cyan-200/20 p-5 sm:p-7"
          style={{
            backgroundImage: `linear-gradient(135deg, ${hexToRgba(type.color, 0.24)}, rgba(2,6,23,.90)), url("/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-1 text-xs font-black text-cyan-50">
                {type.icon ? <img className="h-5 w-5 object-contain" src={type.icon} alt="" /> : null}
                {event.category || type.label}
              </span>
              <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">{event.title}</h2>
              <p className="mt-3 text-sm font-bold text-slate-200 sm:text-base">{dateRangeLabel(event)}</p>
              <p className="mt-1 text-sm font-black italic text-emerald-200">{eventRemainingLabel(event)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <EventBadge label="Statut" value={POKEMON_EVENT_STATUS_LABELS[status] || status} tone="dates" />
                <EventBadge label="Type" value={type.label} tone="summary" />
                <EventBadge label="Source" value={event.source || "manual"} tone="source" />
              </div>
            </div>
            <button className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/20" type="button" onClick={onClose}>
              <X size={22} />
            </button>
          </div>
        </header>

        <div className="event-detail-modal-body min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap gap-2">
            <EventBadge label="Durée" value={`${eventDurationDays(event)} jour(s)`} tone="dates" />
            <EventBadge label="Pokémon" value={pokemonCount} tone="pokemon" />
            <EventBadge label="Sections utiles" value={usefulSectionCount} tone="source" />
            <EventBadge label="Items" value={itemCount} tone="rewards" />
            <EventBadge label="Bonus" value={bonusCount} tone="bonus" />
          </div>

          {(event.description || banner) ? (
            <DetailSection title="Résumé" eyebrow="Infos importantes" tone="summary">
              <div className={`grid gap-4 ${banner ? "lg:grid-cols-[minmax(0,1fr)_260px]" : ""}`}>
                {event.description ? (
                  <p className="rounded-xl border border-white/10 bg-slate-950/42 px-4 py-3 text-sm font-semibold leading-7 text-slate-300">
                    {event.description}
                  </p>
                ) : null}
                {banner ? (
                  <EventBannerImage className="max-h-44 w-full rounded-xl border border-white/10 bg-slate-950/35 object-cover" src={banner} />
                ) : null}
              </div>
            </DetailSection>
          ) : null}

          <EventPokemonGroups groups={pokemonGroups} onOpenPokemon={onOpenPokemon} />

          {(event.bonuses || []).length || rewards.length ? (
            <div className="grid gap-4 lg:grid-cols-2">
              {(event.bonuses || []).length ? <DetailList title="Bonus" items={event.bonuses || []} tone="bonus" /> : null}
              {rewards.length ? <RewardGrid rewards={rewards} tone="rewards" /> : null}
            </div>
          ) : null}

          {sectionGroups.map((group) => (
            <EventScrapedSectionGroup
              key={group.title}
              title={group.title}
              tone={group.tone}
              sections={group.sections}
              onOpenPokemon={onOpenPokemon}
            />
          ))}

          {event.raw ? <RawEventInfo raw={event.raw} /> : null}

          <DetailSection title="Liens sources" eyebrow="Source officielle" tone="source" count={sourceLinks.length}>
            <div className="grid gap-2 sm:grid-cols-2">
              {sourceLinks.length ? (
                sourceLinks.map((link) => (
                  <a className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10" key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={15} /> <span className="truncate">{link.label || link.url}</span>
                  </a>
                ))
              ) : (
                <p className="text-sm font-bold text-slate-500">Aucun lien source.</p>
              )}
            </div>
          </DetailSection>

          <div className="flex flex-wrap justify-end gap-2 rounded-2xl border border-white/10 bg-slate-950/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
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
    </ModalPortal>
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

function EventPokemonGroups({ groups, onOpenPokemon }) {
  if (!groups.length) return null;

  return (
    <DetailSection title="Pokémon liés" eyebrow="Featured, spawns, raids et rewards" tone="pokemon" count={groups[0].pokemon.length}>
      <div className="space-y-3">
      {groups.map((group) => (
        <details key={group.title} className="rounded-xl border border-cyan-200/12 bg-slate-950/32 p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
            <span className="text-sm font-black text-white">{group.title}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] font-black text-cyan-100">{group.pokemon.length}</span>
          </summary>
          <PokemonCardGrid pokemon={group.pokemon} onOpenPokemon={onOpenPokemon} />
        </details>
      ))}
      </div>
    </DetailSection>
  );
}

function PokemonCardGrid({ pokemon, onOpenPokemon, compact = false }) {
  if (!pokemon?.length) return null;
  return (
    <div className={`mt-3 grid gap-2 ${compact ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"}`}>
      {pokemon.map((entry) => {
        const clickable = Boolean(onOpenPokemon && entry.id);
        const content = (
          <>
            <PokemonArtwork pokemon={entry} alt={entry.name || entry.id} className={`${compact ? "h-11 w-11" : "h-14 w-14"} drop-shadow-[0_0_16px_rgba(56,189,248,.12)]`} />
            <span className="min-w-0">
              <strong className="block whitespace-normal break-words text-sm font-black leading-tight text-white">{entry.name || entry.id}</strong>
              <small className="block truncate text-xs font-bold text-slate-400">{entry.form || entry.dexId || "Pokemon"}</small>
              <TypePills types={entry.types} id={entry.id || entry.name} />
              {entry.shiny ? <small className="mt-1 inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-2 py-0.5 text-[10px] font-black text-amber-100">Shiny</small> : null}
            </span>
          </>
        );
        const className = `${compact ? "grid-cols-[3.25rem_minmax(0,1fr)] p-2.5" : "grid-cols-[3.8rem_minmax(0,1fr)] p-3"} grid min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/35 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/10`;
        return clickable ? (
          <button key={pokemonKey(entry)} className={className} type="button" onClick={() => onOpenPokemon(entry)}>
            {content}
          </button>
        ) : (
          <div key={pokemonKey(entry)} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

function EventScrapedSectionGroup({ title, tone, sections, onOpenPokemon }) {
  if (!sections.length) return null;
  return (
    <DetailSection title={title} eyebrow="Sections LeekDuck enrichies" tone={tone} count={sections.length}>
      <div className="space-y-3">
        {sections.map((section, index) => (
          <ScrapedSectionCard
            key={`${section.id || section.title}-${index}`}
            section={section}
            tone={tone}
            open={index < 2}
            onOpenPokemon={onOpenPokemon}
          />
        ))}
      </div>
    </DetailSection>
  );
}

function ScrapedSectionCard({ section, tone, open, onOpenPokemon }) {
  const images = section.usefulImages || sectionUsefulImages(section);
  const showImages = images.length && !(section.rewards || []).length;
  return (
    <details className="rounded-xl border border-white/10 bg-slate-950/32 p-3" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="min-w-0">
          <strong className="block whitespace-normal break-words text-sm font-black text-white">{section.title}</strong>
          <small className="text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60">{section.category}</small>
        </span>
        <span className="flex shrink-0 flex-wrap justify-end gap-2 text-[11px] font-black text-slate-300">
          {section.pokemon?.length ? <span>{section.pokemon.length} Pokémon</span> : null}
          {section.rewards?.length ? <span>{section.rewards.length} items</span> : null}
          {showImages ? <span>{images.length} images</span> : null}
        </span>
      </summary>
      {section.text?.length ? (
        <div className="mt-3 grid gap-2">
          {section.text.slice(0, 10).map((text) => (
            <p className="rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm font-semibold leading-6 text-slate-300" key={`${section.id}-${text}`}>
              {text}
            </p>
          ))}
        </div>
      ) : null}
      <PokemonCardGrid pokemon={section.pokemon || []} onOpenPokemon={onOpenPokemon} compact />
      {section.rewards?.length ? <RewardGrid rewards={section.rewards} compact title="Rewards section" tone={tone === "bonus" ? "bonus" : "rewards"} /> : null}
      {showImages ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <EventBannerImage key={`${section.id}-${image}`} className="max-h-40 w-full rounded-xl border border-white/10 bg-slate-950/40 object-contain p-2" src={image} />
          ))}
        </div>
      ) : null}
    </details>
  );
}

function RewardGrid({ rewards, compact = false, title = "Rewards", tone = "rewards" }) {
  return (
    <DetailSection className={compact ? "mt-3 !p-3" : ""} title={title} tone={tone} count={rewards.length}>
      {rewards.length ? (
        <div className={`grid gap-2 ${compact ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"}`}>
          {rewards.map((reward) => {
            const src = reward.src || rewardImageUrl(reward.image);
            return (
              <span className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-slate-200" key={`${reward.id || reward.text}-${src || ""}`}>
                {src ? <img className="h-10 w-10 object-contain" src={src} alt="" loading="lazy" /> : <span className="h-10 w-10 rounded-xl bg-white/5" />}
                <span className="min-w-0">
                  <span className="block truncate">{reward.text}</span>
                  {reward.id || reward.sourceName ? (
                    <small className="block truncate text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      {reward.id || reward.sourceName}
                    </small>
                  ) : null}
                </span>
              </span>
            );
          })}
        </div>
      ) : (
        <p className="text-sm font-bold text-slate-500">Aucune reward scrapée.</p>
      )}
    </DetailSection>
  );
}

function RawEventInfo({ raw }) {
  const entries = [
    ["LeekDuck ID", raw.eventID],
    ["Type externe", raw.eventType],
    ["Heading", raw.heading],
    ["Extra data", raw.extraData ? Object.keys(raw.extraData).join(", ") : ""],
  ].filter(([, value]) => value);
  return entries.length ? (
    <DetailSection title="Infos scrapées" eyebrow="Métadonnées LeekDuck" tone="source">
      <div className="grid gap-2 sm:grid-cols-2">
        {entries.map(([label, value]) => (
          <InfoPill key={label} label={label} value={String(value)} />
        ))}
      </div>
    </DetailSection>
  ) : null;
}

function DetailList({ title, items, empty = "", tone = "neutral" }) {
  if (!items.length && !empty) return null;
  return (
    <DetailSection title={title} tone={tone} count={items.length}>
      <div className="grid gap-2">
        {items.length ? (
          items.map((item) => (
            <span className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold leading-6 text-slate-200" key={item}>
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm font-bold text-slate-500">{empty}</p>
        )}
      </div>
    </DetailSection>
  );
}

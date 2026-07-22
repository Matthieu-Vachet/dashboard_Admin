"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarPlus, ChevronLeft, ChevronRight, Filter, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/admin/shared/loading-state";
import { EmptyState } from "@/components/admin/shared/state-system";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import {
  initialEvents,
  type CalendarEvent,
  type CalendarEventCategory,
  type CalendarEventStatus,
  type EventTone,
} from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const tones: EventTone[] = ["cyan", "green", "violet", "amber", "red"];
const categories: CalendarEventCategory[] = [
  "Community Day",
  "Raid Day",
  "Spotlight Hour",
  "Go Fest",
  "Event saisonnier",
  "Événement spécial",
  "Autre",
];
const statuses: CalendarEventStatus[] = ["À venir", "En cours", "Terminé"];
const views = ["jour", "mois", "semestre", "année"] as const;
type CalendarView = (typeof views)[number];
type StatusFilter = CalendarEventStatus | "Tous";
type CategoryFilter = CalendarEventCategory | "Toutes";

const toneClasses: Record<EventTone, string> = {
  cyan: "bg-brand-2",
  green: "bg-brand-3",
  violet: "bg-brand",
  amber: "bg-warning",
  red: "bg-danger",
};

const toneBadge: Record<EventTone, string> = {
  cyan: "cyan",
  green: "green",
  violet: "violet",
  amber: "amber",
  red: "red",
};

const statusTone: Record<CalendarEventStatus, "cyan" | "green" | "amber"> = {
  "À venir": "cyan",
  "En cours": "green",
  Terminé: "amber",
};

function dateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

function dateFromKey(key: string) {
  return new Date(`${key}T12:00:00`);
}

function monthDays(month: Date) {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 1 }),
  });
}

function deriveStatus(startDate: string, endDate: string): CalendarEventStatus {
  const today = dateKey(new Date());
  if (endDate < today) return "Terminé";
  if (startDate <= today && endDate >= today) return "En cours";
  return "À venir";
}

function normalizeEvent(event: CalendarEvent): CalendarEvent {
  const startDate = event.startDate || event.date || dateKey(new Date());
  const endDate = event.endDate || startDate;
  const color = tones.includes(event.color) ? event.color : event.tone && tones.includes(event.tone) ? event.tone : "cyan";
  const category = categories.includes(event.category) ? event.category : "Autre";
  const status = statuses.includes(event.status) ? event.status : deriveStatus(startDate, endDate);
  const description = event.description || event.note || "";

  return {
    ...event,
    date: event.date || startDate,
    time: event.time || "09:00",
    tone: event.tone || color,
    note: event.note || description,
    startDate,
    endDate: endDate < startDate ? startDate : endDate,
    description,
    category,
    status,
    color,
  };
}

function eventStartsSort(a: CalendarEvent, b: CalendarEvent) {
  return `${a.startDate}${a.time}`.localeCompare(`${b.startDate}${b.time}`);
}

function isEventOnDay(event: CalendarEvent, key: string) {
  return event.startDate <= key && event.endDate >= key;
}

export function CalendarPlanner() {
  const [events, setEvents, ready] = usePersistentState("matweb.calendar", initialEvents);
  const [cursor, setCursor] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEvents[0]?.id);
  const [view, setView] = useState<CalendarView>("mois");
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Tous");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Toutes");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const normalizedEvents = useMemo(() => events.map(normalizeEvent), [events]);
  const filteredEvents = useMemo(
    () =>
      normalizedEvents
        .filter((event) => statusFilter === "Tous" || event.status === statusFilter)
        .filter((event) => categoryFilter === "Toutes" || event.category === categoryFilter)
        .sort(eventStartsSort),
    [categoryFilter, normalizedEvents, statusFilter],
  );
  const days = useMemo(() => monthDays(cursor), [cursor]);
  const selectedKey = dateKey(selectedDate);
  const selectedEvents = filteredEvents.filter((event) => isEventOnDay(event, selectedKey)).sort(eventStartsSort);
  const selectedEvent =
    normalizedEvents.find((event) => event.id === selectedEventId) || selectedEvents[0] || null;
  const currentEvents = filteredEvents.filter((event) => event.status === "En cours").slice(0, 5);
  const upcomingEvents = filteredEvents.filter((event) => event.status === "À venir").slice(0, 5);
  const semesterStart = Math.floor(cursor.getMonth() / 6) * 6;
  const semesterMonths = Array.from(
    { length: 6 },
    (_, index) => new Date(cursor.getFullYear(), semesterStart + index, 1),
  );
  const yearMonths = Array.from({ length: 12 }, (_, index) => new Date(cursor.getFullYear(), index, 1));

  if (!ready) {
    return <DashboardLoadingState title="Calendrier" />;
  }

  function addEvent() {
    const event: CalendarEvent = {
      id: `e${Date.now()}`,
      date: selectedKey,
      title: "Nouvel event Pokémon GO",
      time: "09:00",
      tone: "cyan",
      note: "",
      startDate: selectedKey,
      endDate: selectedKey,
      description: "Décris l'event, les bonus, raids ou actions à préparer.",
      category: "Autre",
      status: deriveStatus(selectedKey, selectedKey),
      color: "cyan",
    };
    setEvents((current) => [event, ...current.map(normalizeEvent)]);
    setSelectedEventId(event.id);
    setModalOpen(true);
    setConfirmDelete(false);
  }

  function updateEvent(id: string, patch: Partial<CalendarEvent>) {
    setEvents((current) =>
      current.map((event) => {
        const normalized = normalizeEvent(event);
        if (normalized.id !== id) return normalized;
        const next = normalizeEvent({ ...normalized, ...patch });
        return {
          ...next,
          date: next.startDate,
          tone: next.color,
          note: next.description,
        };
      }),
    );
    setConfirmDelete(false);
  }

  function deleteEvent(id: string) {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setEvents((current) => current.map(normalizeEvent).filter((event) => event.id !== id));
    setSelectedEventId(null);
    setModalOpen(false);
    setConfirmDelete(false);
  }

  function selectDay(day: Date) {
    const key = dateKey(day);
    setSelectedDate(day);
    const firstEvent = filteredEvents.find((event) => isEventOnDay(event, key));
    setSelectedEventId(firstEvent?.id || null);
  }

  function openEvent(event: CalendarEvent) {
    setSelectedDate(dateFromKey(event.startDate));
    setSelectedEventId(event.id);
    setModalOpen(true);
    setConfirmDelete(false);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
      <Card tone="strong" className="min-w-0 p-4 sm:p-5">
        <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <div>
            <Badge tone="cyan">Events Pokémon GO</Badge>
            <h2 className="mt-3 text-3xl font-black capitalize">
              {view === "année"
                ? cursor.getFullYear()
                : view === "semestre"
                  ? `Semestre ${semesterStart === 0 ? 1 : 2} ${cursor.getFullYear()}`
                  : format(cursor, "MMMM yyyy", { locale: fr })}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegarde active" : "Chargement"}</Badge>
            <div className="flex rounded-lg border border-line bg-surface-flat p-1">
              {views.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item)}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs font-black capitalize transition",
                    view === item ? "bg-brand-2 text-on-accent" : "text-muted hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button
              className="grid place-items-center [&>svg]:mx-auto [&>svg]:block"
              size="icon"
              type="button"
              onClick={() =>
                setCursor((date) =>
                  view === "année"
                    ? new Date(date.getFullYear() - 1, date.getMonth(), 1)
                    : new Date(date.getFullYear(), date.getMonth() - 1, 1),
                )
              }
              aria-label="Période précédente"
            >
              <ChevronLeft size={17} />
            </Button>
            <Button
              className="grid place-items-center [&>svg]:mx-auto [&>svg]:block"
              size="icon"
              type="button"
              onClick={() =>
                setCursor((date) =>
                  view === "année"
                    ? new Date(date.getFullYear() + 1, date.getMonth(), 1)
                    : new Date(date.getFullYear(), date.getMonth() + 1, 1),
                )
              }
              aria-label="Période suivante"
            >
              <ChevronRight size={17} />
            </Button>
            <Button variant="primary" icon={<CalendarPlus size={17} />} type="button" onClick={addEvent}>
              Ajouter
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 rounded-lg border border-line bg-surface-faint p-3 md:grid-cols-[auto_1fr_1fr]">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-brand-2">
            <Filter size={15} />
            Filtres
          </span>
          <Select
            aria-label="Filtrer par statut"
            className="min-h-11 rounded-lg border border-line bg-surface-control px-3 text-sm font-black outline-none"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          >
            <option value="Tous">Tous les statuts</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Select
            aria-label="Filtrer par catégorie"
            className="min-h-11 rounded-lg border border-line bg-surface-control px-3 text-sm font-black outline-none"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value as CategoryFilter)}
          >
            <option value="Toutes">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        {view === "jour" ? (
          <DayView date={selectedDate} events={selectedEvents} onOpen={openEvent} />
        ) : null}

        {view === "mois" ? (
          <MonthGrid
            days={days}
            cursor={cursor}
            events={filteredEvents}
            selectedKey={selectedKey}
            onSelect={selectDay}
          />
        ) : null}

        {view === "semestre" ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {semesterMonths.map((month) => (
              <MiniMonth key={month.toISOString()} month={month} events={filteredEvents} onSelect={selectDay} />
            ))}
          </div>
        ) : null}

        {view === "année" ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {yearMonths.map((month) => (
              <MiniMonth key={month.toISOString()} month={month} events={filteredEvents} onSelect={selectDay} />
            ))}
          </div>
        ) : null}
      </Card>

      <aside className="space-y-4">
        <EventList title="En cours" events={currentEvents} empty="Aucun event en cours." onOpen={openEvent} />
        <EventList title="À venir" events={upcomingEvents} empty="Aucun event à venir dans ce filtre." onOpen={openEvent} />
        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            Jour sélectionné
          </p>
          <h3 className="mt-2 text-2xl font-black capitalize">
            {format(selectedDate, "EEEE d MMMM", { locale: fr })}
          </h3>
          <div className="mt-5 space-y-3">
            {selectedEvents.length ? (
              selectedEvents.map((event) => (
                <EventButton
                  key={event.id}
                  event={event}
                  selected={selectedEvent?.id === event.id}
                  onOpen={openEvent}
                />
              ))
            ) : (
              <p className="rounded-lg border border-line bg-surface-flat p-3 text-sm font-semibold text-muted">
                Aucun event sur cette journée.
              </p>
            )}
          </div>
        </Card>
      </aside>

      <Modal
        open={modalOpen && Boolean(selectedEvent)}
        title={selectedEvent?.title || "Événement"}
        description="Création et édition complète d'un événement Pokémon GO."
        onClose={() => {
          setModalOpen(false);
          setConfirmDelete(false);
        }}
      >
        {selectedEvent ? (
          <div className="space-y-4">
            <Field label="Titre">
              <Input
                className="mt-2"
                value={selectedEvent.title}
                onChange={(event) => updateEvent(selectedEvent.id, { title: event.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Début">
                <Input
                  className="mt-2"
                  type="date"
                  value={selectedEvent.startDate}
                  onChange={(event) => {
                    updateEvent(selectedEvent.id, {
                      startDate: event.target.value,
                      endDate: selectedEvent.endDate < event.target.value ? event.target.value : selectedEvent.endDate,
                    });
                    setSelectedDate(dateFromKey(event.target.value));
                  }}
                />
              </Field>
              <Field label="Fin">
                <Input
                  className="mt-2"
                  type="date"
                  value={selectedEvent.endDate}
                  onChange={(event) => updateEvent(selectedEvent.id, { endDate: event.target.value })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Heure">
                <Input
                  className="mt-2"
                  type="time"
                  value={selectedEvent.time}
                  onChange={(event) => updateEvent(selectedEvent.id, { time: event.target.value })}
                />
              </Field>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Statut</span>
                <Select
                  className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface-control px-3 text-sm font-black outline-none"
                  value={selectedEvent.status}
                  onChange={(event) => updateEvent(selectedEvent.id, { status: event.target.value as CalendarEventStatus })}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Catégorie</span>
              <Select
                className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface-control px-3 text-sm font-black outline-none"
                value={selectedEvent.category}
                onChange={(event) => updateEvent(selectedEvent.id, { category: event.target.value as CalendarEventCategory })}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </label>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Couleur</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => updateEvent(selectedEvent.id, { color: tone, tone })}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-black transition",
                      selectedEvent.color === tone
                        ? "border-brand-2/45 bg-white/[0.1]"
                        : "border-line bg-surface-minimal",
                    )}
                  >
                    <span className={cn("mr-2 inline-block h-2 w-4 rounded-full", toneClasses[tone])} />
                    {toneBadge[tone]}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Description">
              <Textarea
                className="mt-2 min-h-32"
                value={selectedEvent.description}
                onChange={(event) => updateEvent(selectedEvent.id, { description: event.target.value, note: event.target.value })}
                placeholder="Bonus, Pokémon mis en avant, tâches à préparer, liens utiles..."
              />
            </Field>
            <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button" onClick={() => setModalOpen(false)}>
              Sauvegarde locale active
            </Button>
            <Button className="w-full" variant="danger" icon={<Trash2 size={17} />} type="button" onClick={() => deleteEvent(selectedEvent.id)}>
              {confirmDelete ? "Confirmer la suppression" : "Supprimer l'événement"}
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function MonthGrid({
  days,
  cursor,
  events,
  selectedKey,
  onSelect,
}: {
  days: Date[];
  cursor: Date;
  events: CalendarEvent[];
  selectedKey: string;
  onSelect: (day: Date) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-7 gap-2">
      {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
        <div key={day} className="py-2 text-center text-xs font-black uppercase tracking-[0.14em] text-muted">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const key = dateKey(day);
        const dayEvents = events.filter((event) => isEventOnDay(event, key));
        const selected = key === selectedKey;

        return (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onSelect(day)}
            className={cn(
              "min-h-24 rounded-lg border p-2 text-center transition sm:aspect-square sm:min-h-0",
              isSameMonth(day, cursor)
                ? "border-line bg-surface-flat"
                : "border-line/60 bg-white/[0.02] text-muted/60",
              selected && "border-brand-2/60 bg-brand-2/12 text-foreground",
            )}
          >
            <span className="mx-auto block font-mono text-sm font-black">{format(day, "d")}</span>
            <span className="mt-2 flex flex-col items-center gap-1">
              {dayEvents.slice(0, 3).map((event) => (
                <span
                  key={event.id}
                  className="flex max-w-full items-center gap-1.5 rounded-full bg-white/[0.05] px-2 py-1"
                >
                  <span className={cn("h-1.5 w-3 rounded-full", toneClasses[event.color])} />
                  <span className="truncate text-[10px] font-black">{event.title}</span>
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MiniMonth({
  month,
  events,
  onSelect,
}: {
  month: Date;
  events: CalendarEvent[];
  onSelect: (day: Date) => void;
}) {
  return (
    <div className="rounded-lg border border-line bg-surface-faint p-3">
      <h3 className="text-center text-sm font-black capitalize">{format(month, "MMMM", { locale: fr })}</h3>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {monthDays(month).map((day) => {
          const key = dateKey(day);
          const count = events.filter((event) => isEventOnDay(event, key)).length;
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                "grid aspect-square place-items-center rounded-md text-[11px] font-black transition",
                isSameMonth(day, month) ? "bg-surface-subtle hover:bg-brand-2/16" : "text-muted/45",
                count && "border border-brand-2/45 text-brand-2",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DayView({
  date,
  events,
  onOpen,
}: {
  date: Date;
  events: CalendarEvent[];
  onOpen: (event: CalendarEvent) => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-line bg-surface-faint p-4">
      <h3 className="text-xl font-black capitalize">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</h3>
      <div className="mt-4 grid gap-3">
        {events.length ? (
          events.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => onOpen(event)}
              className="grid gap-3 rounded-lg border border-line bg-surface-flat p-4 text-left transition hover:border-brand-2/45 sm:grid-cols-[90px_1fr]"
            >
              <span className="font-mono text-sm font-black text-brand-2">{event.time}</span>
              <span>
                <strong className="block text-sm font-black">{event.title}</strong>
                <small className="mt-1 block text-xs font-semibold text-muted">
                  {event.category} · {event.startDate} → {event.endDate}
                </small>
                <small className="mt-1 block text-xs font-semibold text-muted">{event.description}</small>
              </span>
            </button>
          ))
        ) : (
          <EmptyState title="Aucun événement prévu sur cette journée" />
        )}
      </div>
    </div>
  );
}

function EventList({
  title,
  events,
  empty,
  onOpen,
}: {
  title: string;
  events: CalendarEvent[];
  empty: string;
  onOpen: (event: CalendarEvent) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">{title}</p>
        <Badge tone="neutral">{events.length}</Badge>
      </div>
      <div className="mt-4 space-y-3">
        {events.length ? (
          events.map((event) => <EventButton key={event.id} event={event} onOpen={onOpen} />)
        ) : (
          <p className="rounded-lg border border-line bg-surface-flat p-3 text-sm font-semibold text-muted">
            {empty}
          </p>
        )}
      </div>
    </Card>
  );
}

function EventButton({
  event,
  selected,
  onOpen,
}: {
  event: CalendarEvent;
  selected?: boolean;
  onOpen: (event: CalendarEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(event)}
      className={cn(
        "w-full rounded-lg border p-3 text-left transition",
        selected
          ? "border-brand-2/55 bg-brand-2/12"
          : "border-line bg-surface-flat hover:bg-white/[0.075]",
      )}
    >
      <span className={cn("block h-1.5 w-12 rounded-full", toneClasses[event.color])} />
      <p className="mt-3 text-sm font-black">{event.title}</p>
      <p className="mt-1 font-mono text-xs font-bold text-muted">
        {event.startDate}
        {event.endDate !== event.startDate ? ` → ${event.endDate}` : ""} · {event.time}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge tone={statusTone[event.status]}>{event.status}</Badge>
        <Badge tone="neutral">{event.category}</Badge>
      </div>
    </button>
  );
}

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
import { CalendarPlus, ChevronLeft, ChevronRight, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { initialEvents, type CalendarEvent, type EventTone } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const tones: EventTone[] = ["cyan", "green", "violet", "amber", "red"];
const views = ["jour", "mois", "semestre", "année"] as const;
type CalendarView = (typeof views)[number];

const toneClasses = {
  cyan: "bg-brand-2",
  green: "bg-brand-3",
  violet: "bg-brand",
  amber: "bg-warning",
  red: "bg-danger",
};

const toneBadge = {
  cyan: "cyan",
  green: "green",
  violet: "violet",
  amber: "amber",
  red: "red",
} as const;

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

export function CalendarPlanner() {
  const [events, setEvents, ready] = usePersistentState("matweb.calendar", initialEvents);
  const [cursor, setCursor] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEvents[0]?.id);
  const [view, setView] = useState<CalendarView>("mois");
  const [modalOpen, setModalOpen] = useState(false);

  const days = useMemo(() => monthDays(cursor), [cursor]);
  const selectedKey = dateKey(selectedDate);
  const selectedEvents = events
    .filter((event) => event.date === selectedKey)
    .sort((a, b) => a.time.localeCompare(b.time));
  const selectedEvent =
    events.find((event) => event.id === selectedEventId) || selectedEvents[0] || null;
  const semesterStart = Math.floor(cursor.getMonth() / 6) * 6;
  const semesterMonths = Array.from(
    { length: 6 },
    (_, index) => new Date(cursor.getFullYear(), semesterStart + index, 1),
  );
  const yearMonths = Array.from({ length: 12 }, (_, index) => new Date(cursor.getFullYear(), index, 1));

  function addEvent() {
    const event: CalendarEvent = {
      id: `e${Date.now()}`,
      date: selectedKey,
      title: "Nouvel événement",
      time: "09:00",
      tone: "cyan",
      note: "Décris ce rendez-vous ou bloc de travail.",
    };
    setEvents((current) => [event, ...current]);
    setSelectedEventId(event.id);
    setModalOpen(true);
  }

  function updateEvent(id: string, patch: Partial<CalendarEvent>) {
    setEvents((current) =>
      current.map((event) => (event.id === id ? { ...event, ...patch } : event)),
    );
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
    setSelectedEventId(null);
    setModalOpen(false);
  }

  function selectDay(day: Date) {
    setSelectedDate(day);
    const firstEvent = events.find((event) => event.date === dateKey(day));
    setSelectedEventId(firstEvent?.id || null);
  }

  function openEvent(event: CalendarEvent) {
    setSelectedDate(dateFromKey(event.date));
    setSelectedEventId(event.id);
    setModalOpen(true);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
      <Card tone="strong" className="min-w-0 p-4 sm:p-5">
        <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <div>
            <Badge tone="cyan">Calendrier</Badge>
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
            <div className="flex rounded-lg border border-line bg-white/[0.045] p-1">
              {views.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item)}
                  className={cn(
                    "rounded-md px-3 py-2 text-xs font-black capitalize transition",
                    view === item ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button
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

        {view === "jour" ? (
          <DayView date={selectedDate} events={selectedEvents} onOpen={openEvent} />
        ) : null}

        {view === "mois" ? (
          <MonthGrid
            days={days}
            cursor={cursor}
            events={events}
            selectedKey={selectedKey}
            onSelect={selectDay}
          />
        ) : null}

        {view === "semestre" ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
            {semesterMonths.map((month) => (
              <MiniMonth key={month.toISOString()} month={month} events={events} onSelect={selectDay} />
            ))}
          </div>
        ) : null}

        {view === "année" ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {yearMonths.map((month) => (
              <MiniMonth key={month.toISOString()} month={month} events={events} onSelect={selectDay} />
            ))}
          </div>
        ) : null}
      </Card>

      <aside className="space-y-4">
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
                <button
                  key={event.id}
                  type="button"
                  onClick={() => openEvent(event)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition",
                    selectedEvent?.id === event.id
                      ? "border-brand-2/55 bg-brand-2/12"
                      : "border-line bg-white/[0.045] hover:bg-white/[0.075]",
                  )}
                >
                  <span className={cn("block h-1.5 w-12 rounded-full", toneClasses[event.tone])} />
                  <p className="mt-3 text-sm font-black">{event.title}</p>
                  <p className="mt-1 font-mono text-xs font-bold text-muted">{event.time}</p>
                </button>
              ))
            ) : (
              <p className="rounded-lg border border-line bg-white/[0.045] p-3 text-sm font-semibold text-muted">
                Aucun événement. Clique sur Ajouter pour créer un bloc.
              </p>
            )}
          </div>
        </Card>
      </aside>

      <Modal
        open={modalOpen && Boolean(selectedEvent)}
        title={selectedEvent?.title || "Événement"}
        description="Création et édition d'un bloc calendrier."
        onClose={() => setModalOpen(false)}
      >
        {selectedEvent ? (
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Titre</span>
              <Input
                className="mt-2"
                value={selectedEvent.title}
                onChange={(event) => updateEvent(selectedEvent.id, { title: event.target.value })}
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Date</span>
                <Input
                  className="mt-2"
                  type="date"
                  value={selectedEvent.date}
                  onChange={(event) => {
                    updateEvent(selectedEvent.id, { date: event.target.value });
                    setSelectedDate(dateFromKey(event.target.value));
                  }}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Heure</span>
                <Input
                  className="mt-2"
                  type="time"
                  value={selectedEvent.time}
                  onChange={(event) => updateEvent(selectedEvent.id, { time: event.target.value })}
                />
              </label>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Couleur</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => updateEvent(selectedEvent.id, { tone })}
                    className={cn(
                      "rounded-full border px-3 py-2 text-xs font-black transition",
                      selectedEvent.tone === tone
                        ? "border-brand-2/45 bg-white/[0.1]"
                        : "border-line bg-white/[0.04]",
                    )}
                  >
                    <span className={cn("mr-2 inline-block h-2 w-4 rounded-full", toneClasses[tone])} />
                    {toneBadge[tone]}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Note</span>
              <Textarea
                className="mt-2 min-h-28"
                value={selectedEvent.note}
                onChange={(event) => updateEvent(selectedEvent.id, { note: event.target.value })}
              />
            </label>
            <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button" onClick={() => setModalOpen(false)}>
              Sauvegarde automatique
            </Button>
            <Button className="w-full" variant="danger" icon={<Trash2 size={17} />} type="button" onClick={() => deleteEvent(selectedEvent.id)}>
              Supprimer l&apos;événement
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
        const dayEvents = events.filter((event) => event.date === key);
        const selected = key === selectedKey;

        return (
          <button
            key={day.toISOString()}
            type="button"
            onClick={() => onSelect(day)}
            className={cn(
              "min-h-24 rounded-lg border p-2 text-center transition sm:aspect-square sm:min-h-0",
              isSameMonth(day, cursor)
                ? "border-line bg-white/[0.045]"
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
                  <span className={cn("h-1.5 w-3 rounded-full", toneClasses[event.tone])} />
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
    <div className="rounded-lg border border-line bg-white/[0.035] p-3">
      <h3 className="text-center text-sm font-black capitalize">{format(month, "MMMM", { locale: fr })}</h3>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {monthDays(month).map((day) => {
          const key = dateKey(day);
          const count = events.filter((event) => event.date === key).length;
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                "grid aspect-square place-items-center rounded-md text-[11px] font-black transition",
                isSameMonth(day, month) ? "bg-white/[0.055] hover:bg-brand-2/16" : "text-muted/45",
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
    <div className="mt-6 rounded-lg border border-line bg-white/[0.035] p-4">
      <h3 className="text-xl font-black capitalize">{format(date, "EEEE d MMMM yyyy", { locale: fr })}</h3>
      <div className="mt-4 grid gap-3">
        {events.length ? (
          events.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => onOpen(event)}
              className="grid gap-3 rounded-lg border border-line bg-white/[0.045] p-4 text-left transition hover:border-brand-2/45 sm:grid-cols-[90px_1fr]"
            >
              <span className="font-mono text-sm font-black text-brand-2">{event.time}</span>
              <span>
                <strong className="block text-sm font-black">{event.title}</strong>
                <small className="mt-1 block text-xs font-semibold text-muted">{event.note}</small>
              </span>
            </button>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-line p-4 text-sm font-semibold text-muted">
            Aucun bloc prévu sur cette journée.
          </p>
        )}
      </div>
    </div>
  );
}

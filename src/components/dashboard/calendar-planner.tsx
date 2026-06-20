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
import { initialEvents, type CalendarEvent, type EventTone } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const tones: EventTone[] = ["cyan", "green", "violet", "amber", "red"];

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

export function CalendarPlanner() {
  const [events, setEvents, ready] = usePersistentState("matweb.calendar", initialEvents);
  const [cursor, setCursor] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(initialEvents[0]?.id);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const selectedKey = dateKey(selectedDate);
  const selectedEvents = events
    .filter((event) => event.date === selectedKey)
    .sort((a, b) => a.time.localeCompare(b.time));
  const selectedEvent =
    events.find((event) => event.id === selectedEventId) || selectedEvents[0] || null;

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
  }

  function updateEvent(id: string, patch: Partial<CalendarEvent>) {
    setEvents((current) =>
      current.map((event) => (event.id === id ? { ...event, ...patch } : event)),
    );
  }

  function deleteEvent(id: string) {
    setEvents((current) => current.filter((event) => event.id !== id));
    setSelectedEventId(null);
  }

  function selectDay(day: Date) {
    setSelectedDate(day);
    const firstEvent = events.find((event) => event.date === dateKey(day));
    setSelectedEventId(firstEvent?.id || null);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_380px]">
      <Card tone="strong" className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge tone="cyan">Calendrier</Badge>
            <h2 className="mt-3 text-3xl font-black capitalize">
              {format(cursor, "MMMM yyyy", { locale: fr })}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegarde active" : "Chargement"}</Badge>
            <Button
              size="icon"
              type="button"
              onClick={() => setCursor((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
              aria-label="Mois précédent"
            >
              <ChevronLeft size={17} />
            </Button>
            <Button
              size="icon"
              type="button"
              onClick={() => setCursor((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
              aria-label="Mois suivant"
            >
              <ChevronRight size={17} />
            </Button>
            <Button variant="primary" icon={<CalendarPlus size={17} />} type="button" onClick={addEvent}>
              Ajouter
            </Button>
          </div>
        </div>

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
                onClick={() => selectDay(day)}
                className={cn(
                  "min-h-24 rounded-lg border p-2 text-left transition sm:aspect-square sm:min-h-0",
                  isSameMonth(day, cursor)
                    ? "border-line bg-white/[0.045]"
                    : "border-line/60 bg-white/[0.02] text-muted/60",
                  selected && "border-brand-2/60 bg-brand-2/12 text-foreground",
                )}
              >
                <span className="font-mono text-sm font-black">{format(day, "d")}</span>
                <div className="mt-2 space-y-1">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span key={event.id} className="flex items-center gap-1.5">
                      <span className={cn("h-1.5 w-3 rounded-full", toneClasses[event.tone])} />
                      <span className="truncate text-[10px] font-black">{event.title}</span>
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
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
                  onClick={() => setSelectedEventId(event.id)}
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

        <Card className="p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            Édition événement
          </p>
          {selectedEvent ? (
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Titre
                </span>
                <Input
                  className="mt-2"
                  value={selectedEvent.title}
                  onChange={(event) => updateEvent(selectedEvent.id, { title: event.target.value })}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Date
                  </span>
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
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Heure
                  </span>
                  <Input
                    className="mt-2"
                    type="time"
                    value={selectedEvent.time}
                    onChange={(event) => updateEvent(selectedEvent.id, { time: event.target.value })}
                  />
                </label>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Couleur
                </p>
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
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Note
                </span>
                <Textarea
                  className="mt-2 min-h-28"
                  value={selectedEvent.note}
                  onChange={(event) => updateEvent(selectedEvent.id, { note: event.target.value })}
                />
              </label>
              <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button">
                Sauvegarde automatique
              </Button>
              <Button
                className="w-full"
                variant="danger"
                icon={<Trash2 size={17} />}
                type="button"
                onClick={() => deleteEvent(selectedEvent.id)}
              >
                Supprimer l&apos;événement
              </Button>
            </div>
          ) : (
            <p className="mt-4 rounded-lg border border-line bg-white/[0.04] p-3 text-sm font-semibold text-muted">
              Sélectionne un événement ou clique sur Ajouter.
            </p>
          )}
        </Card>
      </aside>
    </div>
  );
}

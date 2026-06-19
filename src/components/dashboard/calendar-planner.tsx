"use client";

import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

const events = [
  { dateOffset: 1, title: "Review Dashboard", tone: "cyan" },
  { dateOffset: 3, title: "Sprint Pokemon API", tone: "green" },
  { dateOffset: 8, title: "Storybook session", tone: "violet" },
  { dateOffset: 12, title: "Client discovery", tone: "amber" },
  { dateOffset: 18, title: "Deploy checkpoint", tone: "cyan" },
] as const;

const toneClasses = {
  cyan: "bg-brand-2",
  green: "bg-brand-3",
  violet: "bg-brand",
  amber: "bg-warning",
};

export function CalendarPlanner() {
  const [cursor, setCursor] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const plannedEvents = useMemo(
    () =>
      events.map((event) => ({
        ...event,
        date: addDays(startOfMonth(cursor), event.dateOffset),
      })),
    [cursor],
  );

  const selectedEvents = plannedEvents.filter((event) => isSameDay(event.date, selectedDate));

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Card tone="strong" className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge tone="cyan">Calendrier</Badge>
            <h2 className="mt-3 text-3xl font-black capitalize">
              {format(cursor, "MMMM yyyy", { locale: fr })}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              type="button"
              onClick={() => setCursor((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))}
            >
              <ChevronLeft size={17} />
            </Button>
            <Button
              size="icon"
              type="button"
              onClick={() => setCursor((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))}
            >
              <ChevronRight size={17} />
            </Button>
            <Button variant="primary" icon={<CalendarPlus size={17} />}>Ajouter</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-2">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="py-2 text-center text-xs font-black uppercase tracking-[0.14em] text-muted">
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayEvents = plannedEvents.filter((event) => isSameDay(event.date, day));
            const selected = isSameDay(day, selectedDate);

            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelectedDate(day)}
                className={cn(
                  "aspect-square rounded-lg border p-2 text-left transition",
                  isSameMonth(day, cursor) ? "border-line bg-white/[0.045]" : "border-line/60 bg-white/[0.02] text-muted/60",
                  selected && "border-brand-2/60 bg-brand-2/12 text-foreground",
                )}
              >
                <span className="font-mono text-sm font-black">{format(day, "d")}</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dayEvents.map((event) => (
                    <span
                      key={event.title}
                      className={cn("h-1.5 w-5 rounded-full", toneClasses[event.tone])}
                    />
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
                <div key={event.title} className="rounded-lg border border-line bg-white/[0.045] p-3">
                  <span className={cn("block h-1.5 w-12 rounded-full", toneClasses[event.tone])} />
                  <p className="mt-3 text-sm font-black">{event.title}</p>
                </div>
              ))
            ) : (
              <p className="rounded-lg border border-line bg-white/[0.045] p-3 text-sm font-semibold text-muted">
                Aucun événement. Bon créneau pour du deep work.
              </p>
            )}
          </div>
        </Card>
      </aside>
    </div>
  );
}

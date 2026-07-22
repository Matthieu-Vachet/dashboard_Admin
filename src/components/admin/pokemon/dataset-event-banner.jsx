"use client";

import { CalendarDays, Clock3, ExternalLink, Layers3, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { eventsApiPath } from "@/services/admin/events-api";
import { PokemonArtwork } from "./pokemon-artwork";

function eventName(event) {
  return typeof event === "string" ? event : event?.name || event?.title || "";
}

function normalized(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function formatDate(value) {
  if (!value) return "Indisponible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(date);
}

function statusTone(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("ongoing") || value.includes("current") || value.includes("cours")) {
    return "border-emerald-200/30 bg-emerald-300/16 text-emerald-50";
  }
  if (value.includes("upcoming") || value.includes("venir")) {
    return "border-violet-200/30 bg-violet-300/16 text-violet-50";
  }
  return "border-slate-200/20 bg-slate-300/10 text-foreground";
}

function findCalendarEvent(events, sourceEvent) {
  const sourceName = normalized(eventName(sourceEvent));
  const sourceStart = new Date(sourceEvent?.startsAt || sourceEvent?.startDate || 0).getTime();
  return events.find((event) => {
    const calendarName = normalized(event.title);
    const titleMatch = sourceName && calendarName
      && (sourceName.includes(calendarName) || calendarName.includes(sourceName));
    if (titleMatch) return true;
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    return Number.isFinite(sourceStart) && sourceStart >= start && sourceStart <= end
      && sourceName.split(" ").filter((word) => word.length > 3).some((word) => calendarName.includes(word));
  }) || null;
}

export function DatasetEventBanner({ event, relatedEvent = null }) {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const name = eventName(event);

  useEffect(() => {
    if (!name) return undefined;
    const controller = new AbortController();
    fetch(eventsApiPath, { cache: "no-store", signal: controller.signal })
      .then((response) => response.json())
      .then((payload) => setCalendarEvents(Array.isArray(payload.data?.events) ? payload.data.events : []))
      .catch(() => {});
    return () => controller.abort();
  }, [name]);

  const calendarEvent = useMemo(
    () => relatedEvent || findCalendarEvent(calendarEvents, event),
    [calendarEvents, event, relatedEvent],
  );
  if (!name) return null;
  const status = event?.status || calendarEvent?.status || "event";
  const startsAt = event?.startsAt || calendarEvent?.startDate;
  const endsAt = event?.endsAt || calendarEvent?.endDate;
  const pokemon = (calendarEvent?.featuredPokemon || []).slice(0, 8);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-200/24 bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,.24),transparent_34%),linear-gradient(135deg,rgba(76,29,149,.34),rgba(8,47,73,.38),rgba(2,6,23,.72))] p-4 shadow-[0_24px_90px_rgba(76,29,149,.18)] sm:p-5">
      <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${statusTone(status)}`}>{status}</span>
            {calendarEvent ? <span className="rounded-full border border-cyan-200/25 bg-cyan-300/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-cyan-50">Calendrier lié</span> : null}
          </div>
          <h3 className="mt-3 text-xl font-black text-domain-foreground sm:text-2xl">{name}</h3>
          {event?.description || calendarEvent?.description ? (
            <p className="mt-2 max-w-4xl text-sm font-bold leading-6 text-violet-50/78">{event?.description || calendarEvent?.description}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-black text-foreground">
            <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-black/20 px-3 py-2"><Clock3 size={15} /> {formatDate(startsAt)} → {formatDate(endsAt)}</span>
            {event?.timezone ? <span className="rounded-xl border border-line bg-black/20 px-3 py-2">{event.timezone}</span> : null}
            {calendarEvent ? <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-black/20 px-3 py-2"><Layers3 size={15} /> {calendarEvent.raids?.length || 0} raids · {calendarEvent.sections?.length || 0} sections</span> : null}
          </div>
        </div>
        <div className="relative flex flex-col items-start gap-3 xl:items-end">
          {pokemon.length ? (
            <div className="flex -space-x-2">
              {pokemon.map((entry) => (
                <PokemonArtwork key={`${entry.id}-${entry.form}-${entry.name}`} pokemon={entry} alt={entry.name || entry.id} className="h-12 w-12 shadow-lg" />
              ))}
            </div>
          ) : <Sparkles className="text-violet-100/70" size={26} />}
          <div className="flex flex-wrap gap-2">
            <a className="inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/[0.08] px-3 py-2 text-xs font-black text-domain-foreground hover:bg-white/[0.13]" href="/pokemon-admin?section=events">
              <CalendarDays size={15} /> Calendrier Events
            </a>
            {calendarEvent?.sourceUrl ? (
              <a className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-xs font-black text-cyan-50" href={calendarEvent.sourceUrl} target="_blank" rel="noreferrer">
                Source event <ExternalLink size={14} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

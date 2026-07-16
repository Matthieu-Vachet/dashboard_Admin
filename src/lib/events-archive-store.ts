import { createHash } from "node:crypto";
import type { Db, Filter } from "mongodb";
import type { PokemonCalendarEvent } from "@/data/pokemon-events";
import { getDashboardDatabase } from "./dashboard-store";

export type EventArchiveDocument = {
  id: string;
  sourceId: string;
  canonicalKey: string;
  title: string;
  slug: string;
  eventType: string;
  startDate: Date;
  endDate: Date;
  status: "past" | "active" | "upcoming";
  description: string;
  bonuses: string[];
  pokemon: unknown[];
  raids: unknown[];
  research: unknown[];
  images: unknown[];
  provider: string;
  sourceUrl: string | null;
  sourcePayload: Record<string, unknown>;
  firstSeenAt: Date;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
  sourceHash: string;
  revision: number;
  revisionHistory: Array<Record<string, unknown>>;
  activeInCurrentFeed: boolean;
  archived: boolean;
};

let indexesReady = false;

function text(value: unknown) {
  return String(value ?? "").trim();
}

function slug(value: unknown) {
  return text(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "event";
}

function stable(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value as Record<string, unknown>).sort(([left], [right]) => left.localeCompare(right)).map(([key, item]) => [key, stable(item)]));
  return value;
}

function hash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(stable(value))).digest("hex");
}

function eventStatus(startDate: Date, endDate: Date, now = new Date()) {
  if (endDate.getTime() < now.getTime()) return "past" as const;
  if (startDate.getTime() <= now.getTime()) return "active" as const;
  return "upcoming" as const;
}

function identityFor(event: PokemonCalendarEvent) {
  const sourceId = text(event.id);
  const sourceUrl = text(event.sourceUrl);
  const canonicalKey = sourceId
    ? `${text(event.source || "leekduck")}:${sourceId}`
    : sourceUrl
      ? `url:${sourceUrl}`
      : `identity:${slug(event.title)}:${event.startDate}:${event.endDate}`;
  return { sourceId: sourceId || hash(canonicalKey).slice(0, 20), canonicalKey };
}

export function normalizeArchivedEvent(event: PokemonCalendarEvent, now = new Date()) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  if (!event.title || Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) throw new Error("Événement source invalide.");
  const identity = identityFor(event);
  const sourceContent = {
    title: event.title,
    eventType: event.type,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    description: event.description || "",
    bonuses: event.bonuses || [],
    pokemon: event.featuredPokemon || [],
    raids: event.raids || [],
    research: event.researchRewards || [],
    images: [event.images?.banner, event.images?.thumbnail, event.assets?.banner, event.assets?.icon].filter(Boolean),
    sourceUrl: event.sourceUrl || null,
    sourcePayload: event.raw || {},
  };
  return {
    id: identity.sourceId,
    sourceId: identity.sourceId,
    canonicalKey: identity.canonicalKey,
    title: event.title,
    slug: slug(event.title),
    eventType: event.type,
    startDate,
    endDate,
    status: eventStatus(startDate, endDate, now),
    description: event.description || "",
    bonuses: event.bonuses || [],
    pokemon: event.featuredPokemon || [],
    raids: event.raids || [],
    research: event.researchRewards || [],
    images: sourceContent.images,
    provider: "leekduck-events",
    sourceUrl: event.sourceUrl || null,
    sourcePayload: event.raw || {},
    sourceHash: hash(sourceContent),
  };
}

function changedFields(previous: EventArchiveDocument, next: ReturnType<typeof normalizeArchivedEvent>) {
  const comparable = ["title", "eventType", "startDate", "endDate", "description", "bonuses", "pokemon", "raids", "research", "images", "sourceUrl", "sourcePayload"];
  return comparable.filter((field) => hash(previous[field as keyof EventArchiveDocument]) !== hash(next[field as keyof typeof next]));
}

async function archiveCollection(db: Db) {
  const collection = db.collection<EventArchiveDocument>("events_archive");
  if (!indexesReady) {
    await Promise.all([
      collection.createIndex({ canonicalKey: 1 }, { unique: true }),
      collection.createIndex({ id: 1 }),
      collection.createIndex({ sourceId: 1 }),
      collection.createIndex({ startDate: 1 }),
      collection.createIndex({ endDate: 1 }),
      collection.createIndex({ status: 1, activeInCurrentFeed: 1 }),
      collection.createIndex({ eventType: 1, provider: 1 }),
      collection.createIndex({ "pokemon.name": 1 }),
      collection.createIndex({ sourceHash: 1 }),
      collection.createIndex({ updatedAt: -1 }),
    ]);
    indexesReady = true;
  }
  return collection;
}

export async function synchronizeEventsArchive(events: PokemonCalendarEvent[], dbOverride?: Db) {
  const db = dbOverride || await getDashboardDatabase();
  const collection = await archiveCollection(db);
  const candidates = events.map((event) => normalizeArchivedEvent(event));
  const normalized: ReturnType<typeof normalizeArchivedEvent>[] = [];
  const seenKeys = new Map<string, string>();
  const ambiguities: Array<Record<string, unknown>> = [];
  for (const event of candidates) {
    const firstHash = seenKeys.get(event.canonicalKey);
    if (!firstHash) {
      seenKeys.set(event.canonicalKey, event.sourceHash);
      normalized.push(event);
      continue;
    }
    if (firstHash === event.sourceHash) continue;
    const originalKey = event.canonicalKey;
    const suffix = event.sourceHash.slice(0, 8);
    event.canonicalKey = `${originalKey}:ambiguous:${suffix}`;
    event.id = `${event.id}-${suffix}`;
    ambiguities.push({ sourceId: event.sourceId, sourceName: event.title, reason: "ambiguous", candidates: [originalKey, event.canonicalKey], sourcePayload: event.sourcePayload });
    normalized.push(event);
  }
  const keys = normalized.map((event) => event.canonicalKey);
  const existing = await collection.find({}).toArray();
  const byKey = new Map(existing.map((event) => [event.canonicalKey, event]));
  const now = new Date();
  let added = 0;
  let modified = 0;
  let revisionsCreated = 0;
  for (const event of normalized) {
    const previous = byKey.get(event.canonicalKey);
    if (!previous) {
      await collection.insertOne({ ...event, firstSeenAt: now, lastSeenAt: now, createdAt: now, updatedAt: now, revision: 1, revisionHistory: [], activeInCurrentFeed: true, archived: false });
      added += 1;
      continue;
    }
    const changed = previous.sourceHash !== event.sourceHash;
    const fields = changed ? changedFields(previous, event) : [];
    const previousValues = Object.fromEntries(fields.filter((field) => field !== "sourcePayload").map((field) => [field, previous[field as keyof EventArchiveDocument]]));
    await collection.updateOne({ canonicalKey: event.canonicalKey }, {
      $set: { ...event, lastSeenAt: now, updatedAt: now, activeInCurrentFeed: true, archived: false },
      ...(changed ? {
        $inc: { revision: 1 },
        $push: { revisionHistory: { revision: previous.revision + 1, changedAt: now, hashBefore: previous.sourceHash, hashAfter: event.sourceHash, changedFields: fields, previousValues, provider: "leekduck-events" } },
      } : {}),
    });
    if (changed) {
      modified += 1;
      revisionsCreated += 1;
    }
  }
  const absent = existing.filter((event) => !keys.includes(event.canonicalKey));
  for (const event of absent) {
    await collection.updateOne(
      { canonicalKey: event.canonicalKey },
      { $set: { activeInCurrentFeed: false, archived: true, updatedAt: now, status: eventStatus(event.startDate, event.endDate, now) } },
    );
  }
  return { added, modified, removedFromFeed: absent.length, revisionsCreated, ambiguities, total: await collection.countDocuments({}) };
}

export async function listEventsArchiveAdmin(query: Record<string, string | undefined> = {}) {
  const db = await getDashboardDatabase();
  const collection = await archiveCollection(db);
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(query.limit) || 50));
  const filter: Filter<EventArchiveDocument> = {};
  if (query.year) {
    const year = Number(query.year);
    const month = query.month ? Number(query.month) : 1;
    const start = new Date(Date.UTC(year, month - 1, 1));
    const end = query.month ? new Date(Date.UTC(year, month, 1)) : new Date(Date.UTC(year + 1, 0, 1));
    if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) filter.startDate = { $gte: start, $lt: end };
  }
  if (query.status && ["past", "active", "upcoming"].includes(query.status)) filter.status = query.status as EventArchiveDocument["status"];
  if (query.type) filter.eventType = query.type;
  if (query.provider) filter.provider = query.provider;
  if (query.pokemon) filter["pokemon.name"] = new RegExp(query.pokemon.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") as never;
  if (query.activeInCurrentFeed === "true" || query.activeInCurrentFeed === "false") filter.activeInCurrentFeed = query.activeInCurrentFeed === "true";
  if (query.modified === "true") filter.revision = { $gt: 1 };
  if (query.modified === "false") filter.revision = 1;
  if (query.search) filter.title = new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  const [items, total, revisionSummary] = await Promise.all([
    collection.find(filter).sort({ startDate: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    collection.countDocuments(filter),
    collection.aggregate<{ total: number }>([{ $group: { _id: null, total: { $sum: { $subtract: ["$revision", 1] } } } }]).next(),
  ]);
  return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit), revisions: revisionSummary?.total || 0 } };
}

export async function getEventArchiveAdmin(id: string) {
  const collection = await archiveCollection(await getDashboardDatabase());
  return collection.findOne({ $or: [{ id }, { sourceId: id }, { canonicalKey: id }] });
}

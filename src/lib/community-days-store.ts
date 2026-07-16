import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { Db, Filter } from "mongodb";
import { completeDatasetRun, getDashboardDatabase, hashDataset, listDatasetRuns, startDatasetRun } from "./dashboard-store";
import { resolvePokemonVariant } from "./pokemon-variant-resolver";

export const COMMUNITY_DAYS_SOURCE = "https://pogoapi.net/api/v1/community_days.json";

type RawCommunityDay = {
  bonuses?: unknown;
  boosted_pokemon?: unknown;
  community_day_number?: unknown;
  end_date?: unknown;
  event_moves?: unknown;
  start_date?: unknown;
};

export type CommunityDayDocument = {
  id: string;
  sourceId: string;
  title: string;
  eventType: "community-day";
  startDate: Date;
  endDate: Date;
  year: number;
  month: number;
  status: "past" | "active" | "upcoming";
  featuredPokemon: Array<Record<string, unknown>>;
  exclusiveMoves: Array<Record<string, unknown>>;
  bonuses: string[];
  shinyAvailable: boolean;
  sourceUrl: string;
  sourcePayload: RawCommunityDay;
  firstSeenAt: Date;
  lastSeenAt: Date;
  createdAt: Date;
  updatedAt: Date;
  sourceHash: string;
  revision: number;
};

let indexesReady = false;
let pokemonIndex: Map<string, Record<string, unknown>> | null = null;

function text(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeName(value: unknown) {
  return text(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function slug(value: unknown) {
  return normalizeName(value).replace(/\s+/g, "-") || "unknown";
}

function stableHash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.map(text).filter(Boolean) : [];
}

function sourceDate(value: unknown, field: string) {
  const raw = text(value);
  const match = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) throw new Error(`invalid-source-entry: ${field}`);
  const normalized = `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
  const date = new Date(`${normalized}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== normalized) throw new Error(`invalid-source-entry: ${field}`);
  return date;
}

function statusFor(startDate: Date, endDate: Date, now = new Date()) {
  const endOfDay = endDate.getTime() + 86_400_000 - 1;
  if (now.getTime() < startDate.getTime()) return "upcoming" as const;
  if (now.getTime() <= endOfDay) return "active" as const;
  return "past" as const;
}

function jsonFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return jsonFiles(target);
    return entry.isFile() && entry.name.endsWith(".json") ? [target] : [];
  });
}

function localPokemonIndex() {
  if (pokemonIndex) return pokemonIndex;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { dataPath } = require("@/server/pokemon-go/src/lib/data-repository");
  const index = new Map<string, Record<string, unknown>>();
  for (const file of [...jsonFiles(dataPath("pokemon")), ...jsonFiles(dataPath("pokemon-forms"))]) {
    try {
      const candidate = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
      const names = candidate.names && typeof candidate.names === "object" ? candidate.names as Record<string, unknown> : {};
      for (const alias of [candidate.id, candidate.slug, names.English, names.French]) {
        const key = normalizeName(alias);
        if (key && !index.has(key)) index.set(key, candidate);
      }
    } catch {
      // A malformed local file becomes an unmatched source entry, never a sync blocker.
    }
  }
  pokemonIndex = index;
  return index;
}

function resolveFeaturedPokemon(name: string) {
  const local = localPokemonIndex().get(normalizeName(name));
  if (!local) {
    return {
      value: { dexNr: null, pokemonId: null, form: null, costume: null, isFemale: false, image: null, shinyImage: null, resolutionStatus: "unmatched" },
      diagnostic: { sourceId: null, sourceName: name, sourceForm: null, sourceCostume: null, sourceImage: null, reason: "missing-local-pokemon", candidates: [], sourcePayload: { name } },
    };
  }
  const normal = resolvePokemonVariant(local);
  const shiny = resolvePokemonVariant(local, { shiny: true });
  const dexNr = Number(local.dexNr || local.dexId || 0) || null;
  const pokemonId = text(local.id || local.pokemonId) || null;
  let reason = "";
  if (!normal.image) reason = "missing-normal-asset";
  else if (!shiny.image) reason = "missing-shiny-asset";
  return {
    value: {
      dexNr,
      pokemonId,
      form: text(local.form) || null,
      costume: null,
      isFemale: false,
      image: normal.image,
      shinyImage: shiny.image,
      resolutionStatus: reason ? "partial" : "matched",
    },
    diagnostic: reason ? { sourceId: pokemonId, sourceName: name, sourceForm: null, sourceCostume: null, sourceImage: null, reason, candidates: [], sourcePayload: { name } } : null,
  };
}

export function normalizeCommunityDay(raw: RawCommunityDay, now = new Date()) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("invalid-source-entry");
  const sourceId = text(raw.community_day_number);
  const pokemonNames = stringArray(raw.boosted_pokemon);
  if (!sourceId || !pokemonNames.length) throw new Error("invalid-source-entry: identity");
  const startDate = sourceDate(raw.start_date, "start_date");
  const diagnostics: Array<Record<string, unknown>> = [];
  let endDate: Date;
  try {
    endDate = sourceDate(raw.end_date, "end_date");
  } catch {
    endDate = new Date(startDate);
    diagnostics.push({ sourceId, sourceName: pokemonNames.join(", "), sourceForm: null, sourceCostume: null, sourceImage: null, reason: "invalid-source-entry", candidates: [], sourcePayload: raw });
  }
  const resolved = pokemonNames.map(resolveFeaturedPokemon);
  const exclusiveMoves = Array.isArray(raw.event_moves) ? raw.event_moves.map((item) => {
    const move = item && typeof item === "object" ? item as Record<string, unknown> : {};
    return { pokemon: text(move.pokemon), move: text(move.move), moveType: text(move.move_type) || null };
  }).filter((move) => move.pokemon && move.move) : [];
  const identity = `community-day-${startDate.getUTCFullYear()}-${String(startDate.getUTCMonth() + 1).padStart(2, "0")}-${slug(pokemonNames[0])}`;
  const canonical = {
    sourceId,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    pokemonNames,
    bonuses: stringArray(raw.bonuses),
    exclusiveMoves,
  };
  return {
    document: {
      id: identity,
      sourceId,
      title: `Community Day: ${pokemonNames.join(", ")}`,
      eventType: "community-day" as const,
      startDate,
      endDate,
      year: startDate.getUTCFullYear(),
      month: startDate.getUTCMonth() + 1,
      status: statusFor(startDate, endDate, now),
      featuredPokemon: resolved.map((entry) => entry.value),
      exclusiveMoves,
      bonuses: stringArray(raw.bonuses),
      shinyAvailable: resolved.every((entry) => Boolean(entry.value.shinyImage)),
      sourceUrl: COMMUNITY_DAYS_SOURCE,
      sourcePayload: raw,
      sourceHash: stableHash(canonical),
    },
    diagnostics: [...diagnostics, ...resolved.map((entry) => entry.diagnostic).filter(Boolean) as Array<Record<string, unknown>>],
  };
}

async function communityCollection(db: Db) {
  const collection = db.collection<CommunityDayDocument>("community_days");
  if (!indexesReady) {
    await Promise.all([
      collection.createIndex({ id: 1 }, { unique: true }),
      collection.createIndex({ sourceId: 1 }, { unique: true }),
      collection.createIndex({ startDate: 1 }),
      collection.createIndex({ endDate: 1 }),
      collection.createIndex({ year: 1, month: 1, status: 1 }),
      collection.createIndex({ "featuredPokemon.pokemonId": 1 }),
      collection.createIndex({ sourceHash: 1 }),
      collection.createIndex({ updatedAt: -1 }),
    ]);
    indexesReady = true;
  }
  return collection;
}

export async function synchronizeCommunityDays(fetchImpl: typeof fetch = fetch) {
  const started = Date.now();
  const db = await getDashboardDatabase();
  const collection = await communityCollection(db);
  const existing = await collection.find({}).toArray();
  const run = await startDatasetRun({
    datasetKey: "community-days",
    provider: "pogoapi",
    sourceUrl: COMMUNITY_DAYS_SOURCE,
    totalBefore: existing.length,
    hashBefore: existing.length ? hashDataset(existing.map((item) => [item.id, item.sourceHash]).sort()) : null,
  });
  try {
    const response = await fetchImpl(COMMUNITY_DAYS_SOURCE, { headers: { accept: "application/json", "user-agent": "DashboardAdminPokemonGO/1.0" }, signal: AbortSignal.timeout(20_000), cache: "no-store" });
    if (!response.ok) throw new Error(`PogoAPI Community Days HTTP ${response.status}`);
    const payload = await response.json();
    if (!Array.isArray(payload)) throw new Error("Structure Community Days invalide.");
    const normalized = payload.map((entry) => normalizeCommunityDay(entry));
    const beforeBySourceId = new Map(existing.map((item) => [item.sourceId, item]));
    const currentSourceIds = new Set(normalized.map((item) => item.document.sourceId));
    const absentFromSource = existing.filter((item) => !currentSourceIds.has(item.sourceId));
    const now = new Date();
    let added = 0;
    let modified = 0;
    let unchanged = 0;
    for (const item of normalized) {
      const previous = beforeBySourceId.get(item.document.sourceId);
      if (!previous) added += 1;
      else if (previous.sourceHash !== item.document.sourceHash) modified += 1;
      else unchanged += 1;
      await collection.updateOne(
        { sourceId: item.document.sourceId },
        {
          $set: { ...item.document, lastSeenAt: now, updatedAt: now },
          $setOnInsert: { firstSeenAt: now, createdAt: now },
          ...(previous && previous.sourceHash !== item.document.sourceHash ? { $inc: { revision: 1 } } : { $setOnInsert: { firstSeenAt: now, createdAt: now, revision: 1 } }),
        },
        { upsert: true },
      );
    }
    for (const previous of absentFromSource) {
      await collection.updateOne(
        { sourceId: previous.sourceId },
        { $set: { status: statusFor(previous.startDate, previous.endDate, now), updatedAt: now } },
      );
    }
    const unmatchedEntries = normalized.flatMap((item) => item.diagnostics);
    const after = await collection.find({}).toArray();
    const completedAt = new Date();
    const changed = Boolean(added || modified);
    const sourceRun = await completeDatasetRun(run._id!, {
      status: changed ? (unmatchedEntries.length ? "partial" : "success") : "unchanged",
      completedAt,
      durationMs: Date.now() - started,
      retrievedAt: completedAt,
      savedAt: completedAt,
      hashAfter: hashDataset(after.map((item) => [item.id, item.sourceHash]).sort()),
      changed,
      totalAfter: after.length,
      added,
      removed: absentFromSource.length,
      modified,
      matchedCount: normalized.reduce((total, item) => total + item.document.featuredPokemon.length, 0) - unmatchedEntries.length,
      unmatchedCount: unmatchedEntries.length,
      warningsCount: 0,
      errorsCount: 0,
      unmatchedEntries,
      warnings: [],
      errors: [],
    });
    return { total: after.length, sourceTotal: normalized.length, added, modified, unchanged, unmatched: unmatchedEntries.length, sourceRun };
  } catch (error) {
    await completeDatasetRun(run._id!, { status: "failed", completedAt: new Date(), durationMs: Date.now() - started, errorsCount: 1, errors: [{ message: error instanceof Error ? error.message : String(error) }] });
    throw error;
  }
}

export async function listCommunityDaysAdmin(query: Record<string, string | undefined> = {}) {
  const db = await getDashboardDatabase();
  const collection = await communityCollection(db);
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(query.limit) || 100));
  const filter: Filter<CommunityDayDocument> = {};
  if (query.status && ["past", "active", "upcoming"].includes(query.status)) filter.status = query.status as CommunityDayDocument["status"];
  if (query.year) filter.year = Number(query.year);
  if (query.month) filter.month = Number(query.month);
  if (query.unresolved === "true") filter["featuredPokemon.resolutionStatus"] = { $ne: "matched" } as never;
  if (query.search) filter.$or = [{ title: new RegExp(query.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i") }, { "featuredPokemon.pokemonId": new RegExp(query.search, "i") }] as never;
  const [items, total, history] = await Promise.all([
    collection.find(filter).sort({ startDate: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    collection.countDocuments(filter),
    listDatasetRuns("community-days", { page: 1, limit: 20 }),
  ]);
  return { items, meta: { page, limit, total, totalPages: Math.ceil(total / limit), sourceRun: history.runs[0] || null }, history: history.runs };
}

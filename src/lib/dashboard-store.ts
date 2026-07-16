import { createHash } from "node:crypto";
import { MongoClient, ObjectId, type Collection, type Filter } from "mongodb";
import {
  defaultPokemonEvents,
  POKEMON_EVENT_STATUSES,
  POKEMON_EVENT_TYPES,
  POKEMON_EVENT_TIMEZONE,
  type PokemonCalendarEvent,
  type PokemonEventStatus,
  type PokemonEventType,
  type PokemonFeaturedPokemon,
  type PokemonEventReward,
  type PokemonEventSection,
} from "@/data/pokemon-events";

export type DashboardStoreDocument = {
  owner: string;
  key: string;
  value: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type DashboardApiMetricDocument = {
  owner: string;
  day: string;
  endpoint: string;
  method: string;
  count: number;
  createdAt: Date;
  updatedAt: Date;
};

export type DashboardBacklogType = "bug" | "feature" | "refactor" | "ui" | "data";
export type DashboardBacklogStatus =
  | "todo"
  | "in_progress"
  | "blocked"
  | "done"
  | "archived"
  | "ignored";
export type DashboardBacklogPriority = "low" | "medium" | "high" | "critical";

export type DashboardBacklogHistoryEntry = {
  at: Date;
  action: string;
  changes?: Partial<DashboardBacklogDocument>;
};

export type DashboardBacklogDocument = {
  _id?: ObjectId;
  owner: string;
  title: string;
  description: string;
  type: DashboardBacklogType;
  status: DashboardBacklogStatus;
  priority: DashboardBacklogPriority;
  project: string;
  page: string;
  component: string;
  stepsToReproduce: string;
  actualBehavior: string;
  expectedBehavior: string;
  screenshots: string[];
  notes: string;
  codexPrompt: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt: Date | null;
  history: DashboardBacklogHistoryEntry[];
};

export type DashboardPokemonEventDocument = {
  _id?: ObjectId;
  id: string;
  title: string;
  description: string;
  type: PokemonEventType;
  category?: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  status: PokemonEventStatus;
  source: string;
  sourceUrl?: string;
  images?: {
    banner?: string | null;
    thumbnail?: string | null;
  };
  assets: {
    banner: string | null;
    icon: string | null;
  };
  featuredPokemon: PokemonFeaturedPokemon[];
  wildSpawns?: PokemonFeaturedPokemon[];
  raids?: PokemonFeaturedPokemon[];
  eggs?: PokemonFeaturedPokemon[];
  researchRewards?: PokemonFeaturedPokemon[];
  sections?: PokemonEventSection[];
  bonuses: string[];
  rewards?: PokemonEventReward[];
  links: Array<{ label: string; url: string }>;
  raw?: Record<string, unknown>;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
};

export type DashboardDatasetRunDocument = {
  _id?: ObjectId;
  datasetKey: string;
  provider: string;
  sourceUrl: string | null;
  status: "running" | "success" | "partial" | "failed" | "unchanged";
  startedAt: Date;
  completedAt: Date | null;
  durationMs: number;
  retrievedAt: Date | null;
  savedAt: Date | null;
  hashBefore: string | null;
  hashAfter: string | null;
  changed: boolean;
  totalBefore: number;
  totalAfter: number;
  added: number;
  removed: number;
  modified: number;
  matchedCount: number;
  unmatchedCount: number;
  warningsCount: number;
  errorsCount: number;
  unmatchedEntries: Array<Record<string, unknown>>;
  warnings: unknown[];
  errors: unknown[];
  diffUnavailableReason: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const dashboardDbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
const collectionName = "dashboard_store";
const apiMetricsCollectionName = "dashboard_api_metrics";
const backlogCollectionName = "dashboard_backlog";
const eventsCollectionName = "events";
const datasetRunsCollectionName = "dataset_runs";

let clientPromise: Promise<MongoClient> | null = null;
let indexReady = false;
let metricsIndexReady = false;
let backlogIndexReady = false;
let eventsIndexReady = false;
let datasetRunsIndexReady = false;

function mongoUri() {
  return process.env.DASHBOARD_MONGODB_URI || process.env.MONGODB_URI || "";
}

export function dashboardStoreConfigured() {
  return Boolean(mongoUri());
}

export function normalizeDashboardStoreKey(value: unknown) {
  const key = String(value || "").trim();

  if (!/^matweb\.[a-z0-9_.-]+$/i.test(key)) {
    const error = new Error("Clé de stockage dashboard invalide.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  return key;
}

async function getClient() {
  const uri = mongoUri();
  if (!uri) {
    const error = new Error("MongoDB dashboard non configuré.");
    (error as Error & { status?: number }).status = 503;
    throw error;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      appName: "matweb-dashboard-admin",
      serverSelectionTimeoutMS: 7000,
    }).connect();
  }

  return clientPromise;
}

export async function getDashboardDatabase() {
  const client = await getClient();
  return client.db(dashboardDbName);
}

async function getCollection(): Promise<Collection<DashboardStoreDocument>> {
  const client = await getClient();
  const collection = client.db(dashboardDbName).collection<DashboardStoreDocument>(collectionName);

  if (!indexReady) {
    await collection.createIndex({ owner: 1, key: 1 }, { unique: true });
    indexReady = true;
  }

  return collection;
}

async function getApiMetricsCollection(): Promise<Collection<DashboardApiMetricDocument>> {
  const client = await getClient();
  const collection = client
    .db(dashboardDbName)
    .collection<DashboardApiMetricDocument>(apiMetricsCollectionName);

  if (!metricsIndexReady) {
    await collection.createIndex({ owner: 1, day: 1, endpoint: 1, method: 1 }, { unique: true });
    metricsIndexReady = true;
  }

  return collection;
}

async function getBacklogCollection(): Promise<Collection<DashboardBacklogDocument>> {
  const client = await getClient();
  const collection = client
    .db(dashboardDbName)
    .collection<DashboardBacklogDocument>(backlogCollectionName);

  if (!backlogIndexReady) {
    await Promise.all([
      collection.createIndex({ owner: 1, updatedAt: -1 }),
      collection.createIndex({ owner: 1, status: 1, priority: 1 }),
      collection.createIndex({ owner: 1, type: 1, page: 1, component: 1 }),
    ]);
    backlogIndexReady = true;
  }

  return collection;
}

async function getPokemonEventsCollection(): Promise<Collection<DashboardPokemonEventDocument>> {
  const client = await getClient();
  const collection = client
    .db(dashboardDbName)
    .collection<DashboardPokemonEventDocument>(eventsCollectionName);

  if (!eventsIndexReady) {
    await Promise.all([
      collection.createIndex({ id: 1 }, { unique: true }),
      collection.createIndex({ status: 1, startDate: 1 }),
      collection.createIndex({ type: 1, startDate: 1 }),
      collection.createIndex({ updatedAt: -1 }),
    ]);
    eventsIndexReady = true;
  }

  return collection;
}

async function getDatasetRunsCollection(): Promise<Collection<DashboardDatasetRunDocument>> {
  const client = await getClient();
  const collection = client.db(dashboardDbName).collection<DashboardDatasetRunDocument>(datasetRunsCollectionName);
  if (!datasetRunsIndexReady) {
    await Promise.all([
      collection.createIndex({ datasetKey: 1, startedAt: -1 }),
      collection.createIndex({ status: 1, startedAt: -1 }),
    ]);
    datasetRunsIndexReady = true;
  }
  return collection;
}

function datasetHash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function serializeDatasetRun(run: DashboardDatasetRunDocument | null) {
  if (!run) return null;
  return {
    ...run,
    id: run._id?.toString() || "",
    _id: undefined,
    startedAt: run.startedAt?.toISOString?.() || run.startedAt,
    completedAt: run.completedAt?.toISOString?.() || run.completedAt,
    retrievedAt: run.retrievedAt?.toISOString?.() || run.retrievedAt,
    savedAt: run.savedAt?.toISOString?.() || run.savedAt,
    createdAt: run.createdAt?.toISOString?.() || run.createdAt,
    updatedAt: run.updatedAt?.toISOString?.() || run.updatedAt,
  };
}

export async function startDatasetRun(input: Pick<DashboardDatasetRunDocument, "datasetKey" | "provider" | "sourceUrl"> & Partial<DashboardDatasetRunDocument>) {
  const collection = await getDatasetRunsCollection();
  const now = new Date();
  const document: DashboardDatasetRunDocument = {
    datasetKey: input.datasetKey,
    provider: input.provider,
    sourceUrl: input.sourceUrl || null,
    status: "running",
    startedAt: input.startedAt || now,
    completedAt: null,
    durationMs: 0,
    retrievedAt: null,
    savedAt: null,
    hashBefore: input.hashBefore || null,
    hashAfter: null,
    changed: false,
    totalBefore: Number(input.totalBefore || 0),
    totalAfter: 0,
    added: 0,
    removed: 0,
    modified: 0,
    matchedCount: 0,
    unmatchedCount: 0,
    warningsCount: 0,
    errorsCount: 0,
    unmatchedEntries: [],
    warnings: [],
    errors: [],
    diffUnavailableReason: input.diffUnavailableReason || null,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(document);
  return { ...document, _id: result.insertedId };
}

export async function completeDatasetRun(id: ObjectId, update: Partial<DashboardDatasetRunDocument>) {
  const collection = await getDatasetRunsCollection();
  const completedAt = update.completedAt || new Date();
  await collection.updateOne({ _id: id }, { $set: { ...update, completedAt, updatedAt: completedAt } });
  return serializeDatasetRun(await collection.findOne({ _id: id }));
}

export async function failDatasetRun(id: ObjectId, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return completeDatasetRun(id, { status: "failed", errorsCount: 1, errors: [{ message }] });
}

export async function listDatasetRuns(datasetKey: string, options: { page?: number; limit?: number; status?: string } = {}) {
  const collection = await getDatasetRunsCollection();
  const page = Math.max(1, Number(options.page || 1));
  const limit = Math.min(100, Math.max(1, Number(options.limit || 20)));
  const filter: Filter<DashboardDatasetRunDocument> = { datasetKey };
  if (options.status) filter.status = options.status as DashboardDatasetRunDocument["status"];
  const [runs, total] = await Promise.all([
    collection.find(filter).sort({ startedAt: -1 }).skip((page - 1) * limit).limit(limit).toArray(),
    collection.countDocuments(filter),
  ]);
  return { runs: runs.map(serializeDatasetRun), page, limit, total, pages: Math.ceil(total / limit) };
}

async function latestDatasetRun(datasetKey: string) {
  if (!dashboardStoreConfigured()) return null;
  const collection = await getDatasetRunsCollection();
  return serializeDatasetRun(await collection.findOne({ datasetKey, status: { $ne: "running" } }, { sort: { startedAt: -1 } }));
}

export function hashDataset(value: unknown) {
  return datasetHash(value);
}

function metricDay(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export async function recordDashboardApiCall(owner: string, endpoint: string, method = "GET") {
  if (!dashboardStoreConfigured() || !owner) return;

  try {
    const collection = await getApiMetricsCollection();
    const now = new Date();
    await collection.updateOne(
      {
        owner,
        day: metricDay(now),
        endpoint,
        method: method.toUpperCase(),
      },
      {
        $inc: { count: 1 },
        $set: { updatedAt: now },
        $setOnInsert: {
          owner,
          day: metricDay(now),
          endpoint,
          method: method.toUpperCase(),
          createdAt: now,
        },
      },
      { upsert: true },
    );
  } catch {
    // Les métriques ne doivent jamais bloquer une route métier.
  }
}

async function readDashboardApiUsage(owner: string, days = 14) {
  if (!dashboardStoreConfigured()) {
    return { total: 0, days, perDay: [], endpoints: [] };
  }

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - (days - 1));
  const sinceDay = metricDay(since);
  const collection = await getApiMetricsCollection();
  const documents = await collection
    .find({ owner, day: { $gte: sinceDay } }, { projection: { _id: 0 } })
    .sort({ day: 1 })
    .toArray();

  const perDayMap = new Map<string, number>();
  for (let index = days - 1; index >= 0; index -= 1) {
    const day = new Date();
    day.setUTCDate(day.getUTCDate() - index);
    perDayMap.set(metricDay(day), 0);
  }

  const endpointMap = new Map<string, number>();
  for (const document of documents) {
    perDayMap.set(document.day, (perDayMap.get(document.day) || 0) + document.count);
    endpointMap.set(document.endpoint, (endpointMap.get(document.endpoint) || 0) + document.count);
  }

  const endpoints = [...endpointMap.entries()]
    .map(([endpoint, count]) => ({ endpoint, count }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 12);

  const perDay = [...perDayMap.entries()].map(([day, count]) => ({ day, count }));
  const total = perDay.reduce((sum, item) => sum + item.count, 0);

  return { total, days, perDay, endpoints };
}

export async function readDashboardStoreValue(owner: string, key: string) {
  if (!dashboardStoreConfigured()) return null;

  const collection = await getCollection();
  return collection.findOne(
    { owner, key },
    { projection: { _id: 0, owner: 1, key: 1, value: 1, updatedAt: 1 } },
  );
}

export async function writeDashboardStoreValue(owner: string, key: string, value: unknown) {
  const collection = await getCollection();
  const now = new Date();

  await collection.updateOne(
    { owner, key },
    {
      $set: { value, updatedAt: now },
      $setOnInsert: { owner, key, createdAt: now },
    },
    { upsert: true },
  );

  return { owner, key, updatedAt: now.toISOString() };
}

export async function getDashboardStoreStats(owner: string) {
  if (!dashboardStoreConfigured()) {
    return {
      configured: false,
      database: dashboardDbName,
      collection: collectionName,
      ownerDocuments: 0,
      totalDocuments: 0,
      approxOwnerBytes: 0,
      storageSize: 0,
      indexSize: 0,
      keys: [],
      usage: { total: 0, days: 14, perDay: [], endpoints: [] },
      updatedAt: new Date().toISOString(),
    };
  }

  const collection = await getCollection();
  const client = await getClient();
  const [ownerDocuments, totalDocuments, documents] = await Promise.all([
    collection.countDocuments({ owner }),
    collection.countDocuments({}),
    collection
      .find(
        { owner },
        { projection: { _id: 0, key: 1, value: 1, updatedAt: 1, createdAt: 1 } },
      )
      .sort({ updatedAt: -1 })
      .limit(80)
      .toArray(),
  ]);

  let collectionStats: { storageSize?: number; totalIndexSize?: number } = {
    storageSize: 0,
    totalIndexSize: 0,
  };
  try {
    collectionStats = await client
      .db(dashboardDbName)
      .command({ collStats: collectionName }) as { storageSize?: number; totalIndexSize?: number };
  } catch {
    collectionStats = { storageSize: 0, totalIndexSize: 0 };
  }

  const keys = documents.map((document) => ({
    key: document.key,
    approxBytes: Buffer.byteLength(JSON.stringify(document.value ?? null), "utf8"),
    updatedAt: document.updatedAt instanceof Date ? document.updatedAt.toISOString() : String(document.updatedAt || ""),
    createdAt: document.createdAt instanceof Date ? document.createdAt.toISOString() : String(document.createdAt || ""),
  }));

  const usage = await readDashboardApiUsage(owner);

  return {
    configured: true,
    database: dashboardDbName,
    collection: collectionName,
    apiMetricsCollection: apiMetricsCollectionName,
    ownerDocuments,
    totalDocuments,
    approxOwnerBytes: keys.reduce((sum, item) => sum + item.approxBytes, 0),
    storageSize: collectionStats.storageSize || 0,
    indexSize: collectionStats.totalIndexSize || 0,
    keys,
    usage,
    updatedAt: new Date().toISOString(),
  };
}

const backlogTypes: DashboardBacklogType[] = ["bug", "feature", "refactor", "ui", "data"];
const backlogStatuses: DashboardBacklogStatus[] = [
  "todo",
  "in_progress",
  "blocked",
  "done",
  "archived",
  "ignored",
];
const backlogPriorities: DashboardBacklogPriority[] = ["low", "medium", "high", "critical"];
const pokemonEventTypes = POKEMON_EVENT_TYPES.map((eventType) => eventType.id) as PokemonEventType[];
const pokemonEventStatuses = [...POKEMON_EVENT_STATUSES] as PokemonEventStatus[];

function textValue(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function enumValue<T extends string>(value: unknown, allowed: T[], fallback: T) {
  const normalized = textValue(value) as T;
  return allowed.includes(normalized) ? normalized : fallback;
}

function screenshotsValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => textValue(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function slugValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90);
}

function dateValue(value: unknown, fallback: Date) {
  const raw = value instanceof Date ? value : new Date(textValue(value, fallback.toISOString()));
  if (Number.isNaN(raw.getTime())) {
    const error = new Error("Date d'event invalide.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }
  return raw;
}

function nullableUrlValue(value: unknown) {
  const url = textValue(value);
  return url || null;
}

function stringListValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => textValue(item)).filter(Boolean).slice(0, 80);
  }
  if (typeof value === "string") {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 80);
  }
  return [];
}

function linksValue(value: unknown) {
  const items = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value
          .split(/\n/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return items
    .map((item) => {
      if (typeof item === "string") {
        const [label, url] = item.includes("|")
          ? item.split("|").map((part) => part.trim())
          : ["Source", item.trim()];
        return { label: label || "Source", url: url || "" };
      }
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return {
          label: textValue(record.label || record.title || record.name, "Source"),
          url: textValue(record.url || record.href),
        };
      }
      return { label: "", url: "" };
    })
    .filter((item) => item.url)
    .slice(0, 20);
}

function featuredPokemonValue(value: unknown) {
  const items = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value
          .split(/\n|,/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return items
    .map((item): PokemonFeaturedPokemon => {
      if (typeof item === "string") return { name: item };
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        const name = textValue(record.name || record.title || record.id);
        return {
          id: textValue(record.id) || undefined,
          name,
          image: textValue(record.image || record.icon) || undefined,
          dexId: textValue(record.dexId || record.dex) || undefined,
          form: textValue(record.form) || undefined,
          types: Array.isArray(record.types) ? record.types.map((type) => textValue(type)).filter(Boolean) : undefined,
          shiny: typeof record.shiny === "boolean" ? record.shiny : undefined,
        };
      }
      return { name: "" };
    })
    .filter((item) => Boolean(item.name))
    .slice(0, 240);
}

function rewardsValue(value: unknown) {
  const items = Array.isArray(value) ? value : [];
  return items
    .map((item): PokemonEventReward => {
      if (typeof item === "string") return { text: item };
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return {
          text: textValue(record.text || record.name || record.label || record.title),
          id: textValue(record.id || record.itemId) || undefined,
          name: textValue(record.name || record.label || record.title) || undefined,
          sourceName: textValue(record.sourceName || record.leekduckName) || undefined,
          image: nullableUrlValue(record.image || record.icon),
          type: textValue(record.type) || undefined,
          quantity: textValue(record.quantity || record.amount) || undefined,
          matched: typeof record.matched === "boolean" ? record.matched : undefined,
        };
      }
      return { text: "" };
    })
    .filter((item) => Boolean(item.text))
    .slice(0, 240);
}

function eventSectionsValue(value: unknown) {
  const items = Array.isArray(value) ? value : [];
  return items
    .map((item, index): PokemonEventSection => {
      const record = item && typeof item === "object" ? item as Record<string, unknown> : {};
      const title = textValue(record.title || record.label || record.id);
      const category = enumValue(
        record.category,
        ["featured", "wildSpawns", "raids", "eggs", "researchRewards", "bonuses", "tickets", "other"],
        "other",
      ) as PokemonEventSection["category"];

      return {
        id: slugValue(textValue(record.id, title || `section-${index}`)),
        title,
        category,
        text: stringListValue(record.text).slice(0, 80),
        pokemon: featuredPokemonValue(record.pokemon),
        rewards: rewardsValue(record.rewards),
        images: Array.isArray(record.images)
          ? record.images.map((image) => nullableUrlValue(image)).filter(Boolean) as string[]
          : [],
      };
    })
    .filter((section) => Boolean(section.title || section.pokemon?.length || section.text?.length || section.rewards?.length))
    .slice(0, 120);
}

function rawValue(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as Record<string, unknown>;
}

function computedPokemonEventStatus(
  status: PokemonEventStatus,
  startDate: Date | string,
  endDate: Date | string,
): PokemonEventStatus {
  if (status === "draft" || status === "archived") return status;
  const now = Date.now();
  const start = startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();
  const end = endDate instanceof Date ? endDate.getTime() : new Date(endDate).getTime();
  if (end < now) return "past";
  if (start <= now && end >= now) return "current";
  return "upcoming";
}

function serializePokemonEventRecord(
  event: DashboardPokemonEventDocument | PokemonCalendarEvent,
): PokemonCalendarEvent {
  const startDate = event.startDate instanceof Date ? event.startDate : new Date(event.startDate);
  const endDate = event.endDate instanceof Date ? event.endDate : new Date(event.endDate);
  const status = computedPokemonEventStatus(event.status, startDate, endDate);

  return {
    id: event.id,
    title: event.title,
    description: event.description || "",
    type: event.type,
    category: event.category || undefined,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    timezone: event.timezone || POKEMON_EVENT_TIMEZONE,
    status,
    source: event.source || "manual",
    sourceUrl: "sourceUrl" in event ? event.sourceUrl : undefined,
    images: "images" in event ? event.images : undefined,
    assets: {
      banner: event.assets?.banner || null,
      icon: event.assets?.icon || null,
    },
    featuredPokemon: Array.isArray(event.featuredPokemon) ? event.featuredPokemon : [],
    wildSpawns: "wildSpawns" in event && Array.isArray(event.wildSpawns) ? event.wildSpawns : [],
    raids: "raids" in event && Array.isArray(event.raids) ? event.raids : [],
    eggs: "eggs" in event && Array.isArray(event.eggs) ? event.eggs : [],
    researchRewards: "researchRewards" in event && Array.isArray(event.researchRewards) ? event.researchRewards : [],
    sections: "sections" in event && Array.isArray(event.sections) ? event.sections : [],
    bonuses: Array.isArray(event.bonuses) ? event.bonuses : [],
    rewards: Array.isArray(event.rewards) ? event.rewards : [],
    links: Array.isArray(event.links) ? event.links : [],
    raw: event.raw,
    createdAt:
      "createdAt" in event && event.createdAt
        ? event.createdAt instanceof Date
          ? event.createdAt.toISOString()
          : String(event.createdAt)
        : undefined,
    updatedAt:
      "updatedAt" in event && event.updatedAt
        ? event.updatedAt instanceof Date
          ? event.updatedAt.toISOString()
          : String(event.updatedAt)
        : undefined,
    archivedAt:
      "archivedAt" in event && event.archivedAt
        ? event.archivedAt instanceof Date
          ? event.archivedAt.toISOString()
          : String(event.archivedAt)
        : null,
  };
}

function eventIdentifierFilter(identifier: unknown): Filter<DashboardPokemonEventDocument> {
  const id = textValue(identifier);
  if (!id) {
    const error = new Error("Event introuvable.");
    (error as Error & { status?: number }).status = 404;
    throw error;
  }

  if (ObjectId.isValid(id)) {
    return { $or: [{ id }, { _id: new ObjectId(id) }] };
  }

  return { id };
}

function normalizePokemonEventInput(
  owner: string,
  input: Record<string, unknown>,
  existing?: DashboardPokemonEventDocument | null,
) {
  const now = new Date();
  const title = textValue(input.title, existing?.title || "Nouvel event Pokémon GO");
  const id = slugValue(textValue(input.id, existing?.id || title || `event-${now.getTime()}`));
  const startDate = dateValue(input.startDate ?? input.date, existing?.startDate || now);
  const endDate = dateValue(input.endDate, existing?.endDate || startDate);
  if (endDate.getTime() < startDate.getTime()) {
    const error = new Error("La date de fin doit être postérieure à la date de début.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  const status = enumValue(
    input.status,
    pokemonEventStatuses,
    computedPokemonEventStatus(existing?.status || "upcoming", startDate, endDate),
  );
  const archivedAt =
    status === "archived"
      ? existing?.archivedAt || now
      : null;
  const inputAssets = input.assets && typeof input.assets === "object"
    ? (input.assets as Record<string, unknown>)
    : {};
  const inputImages = input.images && typeof input.images === "object"
    ? (input.images as Record<string, unknown>)
    : {};

  return {
    id,
    title,
    description: textValue(input.description, existing?.description || ""),
    type: enumValue(input.type, pokemonEventTypes, existing?.type || "event"),
    category: textValue(input.category, existing?.category || ""),
    startDate,
    endDate,
    timezone: textValue(input.timezone, existing?.timezone || POKEMON_EVENT_TIMEZONE),
    status,
    source: textValue(input.source, existing?.source || "manual"),
    sourceUrl: nullableUrlValue(input.sourceUrl ?? input.url ?? existing?.sourceUrl) || undefined,
    images: {
      banner: nullableUrlValue(inputImages.banner ?? inputAssets.banner ?? input.banner ?? existing?.images?.banner),
      thumbnail: nullableUrlValue(inputImages.thumbnail ?? inputImages.icon ?? inputAssets.icon ?? input.icon ?? existing?.images?.thumbnail),
    },
    assets: {
      banner: nullableUrlValue(inputAssets.banner ?? input.banner ?? existing?.assets?.banner),
      icon: nullableUrlValue(inputAssets.icon ?? input.icon ?? existing?.assets?.icon),
    },
    featuredPokemon: "featuredPokemon" in input
      ? featuredPokemonValue(input.featuredPokemon)
      : existing?.featuredPokemon || [],
    wildSpawns: "wildSpawns" in input ? featuredPokemonValue(input.wildSpawns) : existing?.wildSpawns || [],
    raids: "raids" in input ? featuredPokemonValue(input.raids) : existing?.raids || [],
    eggs: "eggs" in input ? featuredPokemonValue(input.eggs) : existing?.eggs || [],
    researchRewards: "researchRewards" in input ? featuredPokemonValue(input.researchRewards) : existing?.researchRewards || [],
    sections: "sections" in input ? eventSectionsValue(input.sections) : existing?.sections || [],
    bonuses: "bonuses" in input ? stringListValue(input.bonuses) : existing?.bonuses || [],
    rewards: "rewards" in input ? rewardsValue(input.rewards) : existing?.rewards || [],
    links: "links" in input ? linksValue(input.links) : existing?.links || [],
    raw: "raw" in input ? rawValue(input.raw) : existing?.raw,
    owner: existing?.owner || owner,
    archivedAt,
  };
}

export async function listPokemonEvents(options: { includeArchived?: boolean } = {}) {
  const includeArchived = options.includeArchived === true;
  const seeded = defaultPokemonEvents.map(serializePokemonEventRecord);

  if (!dashboardStoreConfigured()) {
    return {
      configured: false,
      collection: eventsCollectionName,
      seeded: true,
      events: includeArchived ? seeded : seeded.filter((event) => event.status !== "archived"),
      sourceRun: null,
    };
  }

  const collection = await getPokemonEventsCollection();
  const query: Filter<DashboardPokemonEventDocument> = includeArchived
    ? {}
    : { status: { $ne: "archived" } };
  const documents = await collection
    .find(query)
    .sort({ startDate: 1, title: 1 })
    .limit(2000)
    .toArray();
  const events = documents.map(serializePokemonEventRecord);

  const sourceRun = await latestDatasetRun("events-calendar");
  return {
    configured: true,
    collection: eventsCollectionName,
    seeded: events.length === 0,
    events: events.length ? events : includeArchived ? seeded : seeded.filter((event) => event.status !== "archived"),
    sourceRun,
  };
}

export async function createPokemonEvent(owner: string, input: Record<string, unknown>) {
  const collection = await getPokemonEventsCollection();
  const now = new Date();
  const document: DashboardPokemonEventDocument = {
    ...normalizePokemonEventInput(owner, input),
    createdAt: now,
    updatedAt: now,
  };

  if (!document.title) {
    const error = new Error("Le titre de l'event est obligatoire.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  try {
    const result = await collection.insertOne(document);
    return serializePokemonEventRecord({ ...document, _id: result.insertedId });
  } catch (error) {
    const duplicate = error instanceof Error && error.message.includes("E11000");
    if (duplicate) {
      const conflict = new Error("Un event avec cet identifiant existe déjà.");
      (conflict as Error & { status?: number }).status = 409;
      throw conflict;
    }
    throw error;
  }
}

export async function updatePokemonEvent(
  owner: string,
  id: string,
  input: Record<string, unknown>,
) {
  const collection = await getPokemonEventsCollection();
  const filter = eventIdentifierFilter(id);
  const existing = await collection.findOne(filter);
  const now = new Date();
  const normalized = normalizePokemonEventInput(owner, { ...input, id: input.id || existing?.id || id }, existing);

  if (!existing) {
    const result = await collection.insertOne({
      ...normalized,
      createdAt: now,
      updatedAt: now,
    });
    return serializePokemonEventRecord({ ...normalized, _id: result.insertedId, createdAt: now, updatedAt: now });
  }

  await collection.updateOne(filter, {
    $set: {
      ...normalized,
      updatedAt: now,
    },
  });

  const updated = await collection.findOne(eventIdentifierFilter(normalized.id));
  if (!updated) throw new Error("Event introuvable après mise à jour.");
  return serializePokemonEventRecord(updated);
}

export async function deletePokemonEvent(id: string) {
  const collection = await getPokemonEventsCollection();
  const result = await collection.deleteOne(eventIdentifierFilter(id));
  if (!result.deletedCount) {
    const error = new Error("Event introuvable.");
    (error as Error & { status?: number }).status = 404;
    throw error;
  }
  return { id };
}

export async function importPokemonEvents(owner: string, input: Record<string, unknown> | unknown[]) {
  const events = Array.isArray(input)
    ? input
    : Array.isArray(input.events)
      ? input.events
      : Array.isArray(input.data)
        ? input.data
        : [];

  if (!events.length) {
    const error = new Error("Aucun event à importer.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  const collection = await getPokemonEventsCollection();
  const now = new Date();
  const normalizedEvents = events.map((event) => normalizePokemonEventInput(owner, event as Record<string, unknown>));
  const operations = normalizedEvents.map((normalized) => ({
    updateOne: {
      filter: { id: normalized.id },
      update: {
        $set: {
          ...normalized,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      upsert: true,
    },
  }));

  const result = await collection.bulkWrite(operations, { ordered: false });
  const replaceSource = !Array.isArray(input) ? textValue(input.replaceSource) : "";
  const deleted = replaceSource
    ? await collection.deleteMany({
        source: replaceSource,
        id: { $nin: normalizedEvents.map((event) => event.id) },
      })
    : { deletedCount: 0 };
  const list = await listPokemonEvents({ includeArchived: true });

  return {
    matched: result.matchedCount,
    modified: result.modifiedCount,
    inserted: result.upsertedCount,
    deleted: deleted.deletedCount || 0,
    total: events.length,
    events: list.events,
  };
}

function backlogCodexPrompt(
  ticket: Omit<DashboardBacklogDocument, "_id" | "owner" | "history" | "codexPrompt">,
) {
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

function serializeBacklogTicket(ticket: DashboardBacklogDocument) {
  return {
    id: ticket._id?.toString() || "",
    title: ticket.title,
    description: ticket.description,
    type: ticket.type,
    status: ticket.status,
    priority: ticket.priority,
    project: ticket.project || "",
    page: ticket.page,
    component: ticket.component,
    stepsToReproduce: ticket.stepsToReproduce,
    actualBehavior: ticket.actualBehavior,
    expectedBehavior: ticket.expectedBehavior,
    screenshots: ticket.screenshots,
    notes: ticket.notes,
    codexPrompt: ticket.codexPrompt,
    createdAt: ticket.createdAt instanceof Date ? ticket.createdAt.toISOString() : String(ticket.createdAt),
    updatedAt: ticket.updatedAt instanceof Date ? ticket.updatedAt.toISOString() : String(ticket.updatedAt),
    resolvedAt: ticket.resolvedAt instanceof Date ? ticket.resolvedAt.toISOString() : null,
    history: ticket.history.map((entry) => ({
      at: entry.at instanceof Date ? entry.at.toISOString() : String(entry.at),
      action: entry.action,
      changes: entry.changes || {},
    })),
  };
}

function objectIdFromString(id: unknown) {
  const value = textValue(id);
  if (!ObjectId.isValid(value)) {
    const error = new Error("Ticket backlog introuvable.");
    (error as Error & { status?: number }).status = 404;
    throw error;
  }
  return new ObjectId(value);
}

function normalizeBacklogPatch(input: Record<string, unknown>) {
  const patch: Partial<DashboardBacklogDocument> = {};
  if ("title" in input) patch.title = textValue(input.title);
  if ("description" in input) patch.description = textValue(input.description);
  if ("type" in input) patch.type = enumValue(input.type, backlogTypes, "bug");
  if ("status" in input) patch.status = enumValue(input.status, backlogStatuses, "todo");
  if ("priority" in input) patch.priority = enumValue(input.priority, backlogPriorities, "medium");
  if ("project" in input) patch.project = textValue(input.project);
  if ("page" in input) patch.page = textValue(input.page);
  if ("component" in input) patch.component = textValue(input.component);
  if ("stepsToReproduce" in input) patch.stepsToReproduce = textValue(input.stepsToReproduce);
  if ("actualBehavior" in input) patch.actualBehavior = textValue(input.actualBehavior);
  if ("expectedBehavior" in input) patch.expectedBehavior = textValue(input.expectedBehavior);
  if ("screenshots" in input) patch.screenshots = screenshotsValue(input.screenshots);
  if ("notes" in input) patch.notes = textValue(input.notes);
  return patch;
}

export async function listDashboardBacklogTickets(owner: string) {
  if (!dashboardStoreConfigured()) {
    return { configured: false, collection: backlogCollectionName, tickets: [] };
  }

  const collection = await getBacklogCollection();
  const tickets = await collection
    .find({ owner })
    .sort({ updatedAt: -1 })
    .limit(500)
    .toArray();

  return {
    configured: true,
    collection: backlogCollectionName,
    tickets: tickets.map(serializeBacklogTicket),
  };
}

export async function createDashboardBacklogTicket(
  owner: string,
  input: Record<string, unknown>,
) {
  const collection = await getBacklogCollection();
  const now = new Date();
  const base = {
    title: textValue(input.title, "Nouveau ticket"),
    description: textValue(input.description),
    type: enumValue(input.type, backlogTypes, "bug"),
    status: enumValue(input.status, backlogStatuses, "todo"),
    priority: enumValue(input.priority, backlogPriorities, "medium"),
    project: textValue(input.project, "Dashboard Admin"),
    page: textValue(input.page),
    component: textValue(input.component),
    stepsToReproduce: textValue(input.stepsToReproduce),
    actualBehavior: textValue(input.actualBehavior),
    expectedBehavior: textValue(input.expectedBehavior),
    screenshots: screenshotsValue(input.screenshots),
    notes: textValue(input.notes),
    createdAt: now,
    updatedAt: now,
    resolvedAt: null,
  };
  const document: DashboardBacklogDocument = {
    owner,
    ...base,
    codexPrompt: backlogCodexPrompt(base),
    history: [{ at: now, action: "created" }],
  };

  if (!document.title) {
    const error = new Error("Le titre du ticket est obligatoire.");
    (error as Error & { status?: number }).status = 400;
    throw error;
  }

  const result = await collection.insertOne(document);
  return serializeBacklogTicket({ ...document, _id: result.insertedId });
}

export async function updateDashboardBacklogTicket(
  owner: string,
  id: string,
  input: Record<string, unknown>,
) {
  const collection = await getBacklogCollection();
  const _id = objectIdFromString(id);
  const existing = await collection.findOne({ _id, owner });
  if (!existing) {
    const error = new Error("Ticket backlog introuvable.");
    (error as Error & { status?: number }).status = 404;
    throw error;
  }

  const now = new Date();
  const patch = normalizeBacklogPatch(input);
  const next = { ...existing, ...patch, updatedAt: now };
  next.resolvedAt =
    next.status === "done" || next.status === "archived" || next.status === "ignored"
      ? existing.resolvedAt || now
      : null;
  next.codexPrompt = backlogCodexPrompt(next);

  await collection.updateOne(
    { _id, owner },
    {
      $set: {
        ...patch,
        updatedAt: next.updatedAt,
        resolvedAt: next.resolvedAt,
        codexPrompt: next.codexPrompt,
      },
      $push: {
        history: {
          at: now,
          action: "updated",
          changes: patch,
        },
      },
    },
  );

  const updated = await collection.findOne({ _id, owner });
  if (!updated) throw new Error("Ticket backlog introuvable après mise à jour.");
  return serializeBacklogTicket(updated);
}

export async function deleteDashboardBacklogTicket(owner: string, id: string) {
  const collection = await getBacklogCollection();
  const _id = objectIdFromString(id);
  const result = await collection.deleteOne({ _id, owner });
  if (!result.deletedCount) {
    const error = new Error("Ticket backlog introuvable.");
    (error as Error & { status?: number }).status = 404;
    throw error;
  }
  return { id };
}

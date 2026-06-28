import { MongoClient, ObjectId, type Collection } from "mongodb";

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

const dashboardDbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
const collectionName = "dashboard_store";
const apiMetricsCollectionName = "dashboard_api_metrics";
const backlogCollectionName = "dashboard_backlog";

let clientPromise: Promise<MongoClient> | null = null;
let indexReady = false;
let metricsIndexReady = false;
let backlogIndexReady = false;

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

function backlogCodexPrompt(
  ticket: Omit<DashboardBacklogDocument, "_id" | "owner" | "history" | "codexPrompt">,
) {
  return [
    "# TICKET DASHBOARD",
    `Type: ${ticket.type}`,
    `Priority: ${ticket.priority}`,
    `Status: ${ticket.status}`,
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

import { MongoClient, type Collection } from "mongodb";

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

const dashboardDbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
const collectionName = "dashboard_store";
const apiMetricsCollectionName = "dashboard_api_metrics";

let clientPromise: Promise<MongoClient> | null = null;
let indexReady = false;
let metricsIndexReady = false;

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

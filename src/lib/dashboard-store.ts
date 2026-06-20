import { MongoClient, type Collection } from "mongodb";

export type DashboardStoreDocument = {
  owner: string;
  key: string;
  value: unknown;
  createdAt: Date;
  updatedAt: Date;
};

const dashboardDbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
const collectionName = "dashboard_store";

let clientPromise: Promise<MongoClient> | null = null;
let indexReady = false;

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

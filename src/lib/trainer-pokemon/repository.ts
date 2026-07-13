import { MongoClient, ObjectId, type Db, type Filter, type Sort } from "mongodb";
import { executeAtomicSnapshotImport, executeAtomicSnapshotRollback, trainerPokemonEntryChecksum } from "@/lib/trainer-pokemon/atomic";
import { enrichTrainerPokemonEntries, normalizeTrainerPokemonImport, normalizeSearchValue, emptyTrainerPokemonStats } from "@/lib/trainer-pokemon/normalize";
import { fetchTrainerPokemonReferences, type TrainerPokemonReferences } from "@/lib/trainer-pokemon/references";
import { validateTrainerPokemonImport } from "@/lib/trainer-pokemon/schema";
import type {
  TrainerPokemon,
  TrainerPokemonListResponse,
  TrainerPokemonSnapshotSummary,
  TrainerPokemonSortField,
  TrainerPokemonStats,
} from "@/types/admin/trainer-pokemon";

type SnapshotStatus = "staging" | "active" | "archived" | "failed";
type OwnerDocument = {
  owner: string;
  activeSnapshotId: ObjectId;
  previousSnapshotId: ObjectId | null;
  updatedAt: Date;
  updatedBy: string;
};
type SnapshotDocument = {
  _id?: ObjectId;
  owner: string;
  sourceFileName: string;
  sourceExportTime: string | null;
  sourceExportTimestamp: string | null;
  sourceVersion: string | null;
  declaredPokemonCount: number;
  actualPokemonCount: number;
  importedAt: Date;
  importedBy: string;
  checksum: string;
  entryChecksum: string;
  status: SnapshotStatus;
  diagnostics: { warnings: number; errors: number };
  diagnosticCounts: Record<string, number>;
  diagnosticSamples: unknown[];
  stats: TrainerPokemonStats;
  references: { fetchedAt: string; source: string };
  activatedAt: Date | null;
  archivedAt: Date | null;
  failedAt: Date | null;
  failureCode: string | null;
};
type EntryDocument = TrainerPokemon & { _id?: ObjectId; owner: string; snapshotId: ObjectId };

export type TrainerPokemonQuery = {
  page?: number;
  limit?: number;
  search?: string;
  shiny?: "all" | "yes" | "no";
  lucky?: "all" | "yes" | "no";
  gender?: string;
  alignment?: string;
  costume?: "all" | "yes" | "no";
  specialForm?: "all" | "yes" | "no";
  perfect?: boolean;
  ivMin?: number;
  ivMax?: number;
  cpMin?: number;
  cpMax?: number;
  weightMin?: number;
  weightMax?: number;
  heightMin?: number;
  heightMax?: number;
  sort?: TrainerPokemonSortField;
  order?: "asc" | "desc";
};

const dbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
const ownersName = "trainer_pokemon_owners";
const snapshotsName = "trainer_pokemon_snapshots";
const entriesName = "trainer_pokemon_entries";
let clientPromise: Promise<MongoClient> | null = null;
let indexesPromise: Promise<void> | null = null;

function mongoUri() {
  return process.env.DASHBOARD_MONGODB_URI || process.env.MONGODB_URI || "";
}

function repositoryError(message: string, status: number, code: string) {
  const error = new Error(message);
  (error as Error & { status?: number; code?: string }).status = status;
  (error as Error & { status?: number; code?: string }).code = code;
  return error;
}

async function getDb() {
  const uri = mongoUri();
  if (!uri) throw repositoryError("MongoDB Dashboard non configuré.", 503, "TRAINER_POKEMON_DATABASE_UNAVAILABLE");
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      appName: "matweb-dashboard-trainer-pokemon",
      serverSelectionTimeoutMS: 7_000,
    }).connect();
  }
  const db = (await clientPromise).db(dbName);
  if (!indexesPromise) indexesPromise = ensureIndexes(db);
  await indexesPromise;
  return db;
}

async function ensureIndexes(db: Db) {
  await Promise.all([
    db.collection(ownersName).createIndex({ owner: 1 }, { unique: true }),
    db.collection(snapshotsName).createIndex({ owner: 1, importedAt: -1 }),
    db.collection(snapshotsName).createIndex({ owner: 1, status: 1, importedAt: -1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, sourceId: 1 }, { unique: true }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, dexNumber: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, frenchName: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, cp: -1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, ivPercent: -1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, weightKg: 1, heightM: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, shiny: 1, lucky: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, gender: 1, alignment: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, form: 1, costume: 1 }),
    db.collection(entriesName).createIndex({ owner: 1, snapshotId: 1, specialForm: 1 }),
  ]);
}

function owners(db: Db) {
  return db.collection<OwnerDocument>(ownersName);
}

function snapshots(db: Db) {
  return db.collection<SnapshotDocument>(snapshotsName);
}

function entries(db: Db) {
  return db.collection<EntryDocument>(entriesName);
}

function snapshotSummary(document: SnapshotDocument, activeId?: ObjectId | null): TrainerPokemonSnapshotSummary {
  const id = document._id!.toHexString();
  return {
    id,
    sourceFileName: document.sourceFileName,
    sourceExportTime: document.sourceExportTime,
    sourceExportTimestamp: document.sourceExportTimestamp,
    sourceVersion: document.sourceVersion,
    declaredPokemonCount: document.declaredPokemonCount,
    actualPokemonCount: document.actualPokemonCount,
    importedAt: document.importedAt.toISOString(),
    importedBy: document.importedBy,
    checksum: document.checksum,
    status: activeId?.equals(document._id) ? "active" : document.status,
    diagnostics: document.diagnostics,
    stats: document.stats,
    canRollback: document.status !== "failed" && !activeId?.equals(document._id),
  };
}

export async function prepareTrainerPokemonImport(raw: unknown, references?: TrainerPokemonReferences) {
  const file = validateTrainerPokemonImport(raw);
  const canonical = references || await fetchTrainerPokemonReferences();
  return normalizeTrainerPokemonImport(file, canonical);
}

export async function importTrainerPokemon(owner: string, raw: unknown, references?: TrainerPokemonReferences) {
  const canonical = references || await fetchTrainerPokemonReferences();
  const { entries: normalizedEntries, preview } = await prepareTrainerPokemonImport(raw, canonical);
  const db = await getDb();
  const now = new Date();
  const idsChecksum = trainerPokemonEntryChecksum(normalizedEntries);
  const snapshot: SnapshotDocument = {
    owner,
    sourceFileName: preview.sourceFileName,
    sourceExportTime: preview.sourceExportTime,
    sourceExportTimestamp: preview.sourceExportTimestamp,
    sourceVersion: preview.sourceVersion,
    declaredPokemonCount: preview.declaredPokemonCount,
    actualPokemonCount: preview.actualPokemonCount,
    importedAt: now,
    importedBy: owner,
    checksum: preview.checksum,
    entryChecksum: idsChecksum,
    status: "staging",
    diagnostics: { warnings: Object.values(preview.diagnosticCounts).reduce((sum, count) => sum + count, 0), errors: 0 },
    diagnosticCounts: preview.diagnosticCounts,
    diagnosticSamples: preview.diagnostics,
    stats: preview.stats,
    references: { fetchedAt: canonical.fetchedAt, source: canonical.source },
    activatedAt: null,
    archivedAt: null,
    failedAt: null,
    failureCode: null,
  };
  const result = await executeAtomicSnapshotImport({
    createStagingSnapshot: async () => (await snapshots(db).insertOne(snapshot)).insertedId.toHexString(),
    writeEntries: async (snapshotIdValue, nextEntries) => {
      const snapshotId = new ObjectId(snapshotIdValue);
      for (let index = 0; index < nextEntries.length; index += 750) {
        const batch = nextEntries.slice(index, index + 750).map((entry) => ({ ...entry, owner, snapshotId }));
        if (batch.length) await entries(db).insertMany(batch, { ordered: true });
      }
    },
    readSourceIds: async (snapshotIdValue) => (await entries(db)
      .find({ owner, snapshotId: new ObjectId(snapshotIdValue) }, { projection: { _id: 0, sourceId: 1 } })
      .sort({ sourceId: 1 })
      .toArray()).map((entry) => entry.sourceId),
    readActiveSnapshotId: async () => (await owners(db).findOne({ owner }))?.activeSnapshotId.toHexString() || null,
    swapActiveSnapshot: async (snapshotIdValue, previousSnapshotIdValue) => {
      await owners(db).updateOne(
        { owner },
        { $set: { activeSnapshotId: new ObjectId(snapshotIdValue), previousSnapshotId: previousSnapshotIdValue ? new ObjectId(previousSnapshotIdValue) : null, updatedAt: now, updatedBy: owner } },
        { upsert: true },
      );
    },
    markSnapshotActive: async (snapshotIdValue) => { await snapshots(db).updateOne({ _id: new ObjectId(snapshotIdValue), owner }, { $set: { status: "active", activatedAt: now } }); },
    markSnapshotArchived: async (snapshotIdValue) => { await snapshots(db).updateOne({ _id: new ObjectId(snapshotIdValue), owner }, { $set: { status: "archived", archivedAt: now } }); },
    markSnapshotFailed: async (snapshotIdValue, error) => {
      await snapshots(db).updateOne(
        { _id: new ObjectId(snapshotIdValue), owner },
        { $set: { status: "failed", failedAt: new Date(), failureCode: error && typeof error === "object" && "code" in error ? String(error.code) : "TRAINER_POKEMON_IMPORT_FAILED" } },
      );
      console.error("[trainer-pokemon] import failed before activation", { owner, snapshotId: snapshotIdValue, count: normalizedEntries.length });
    },
    reportBookkeepingFailure: (error) => console.error("[trainer-pokemon] post-activation bookkeeping failed", { owner, error: error instanceof Error ? error.message : "unknown" }),
  }, normalizedEntries);
  console.info("[trainer-pokemon] import activated", { owner, snapshotId: result.snapshotId, count: normalizedEntries.length, checksum: preview.checksum.slice(0, 12) });
  return { preview, snapshotId: result.snapshotId, importedAt: now.toISOString() };
}

function booleanFilter(value: "all" | "yes" | "no" | undefined) {
  return value === "yes" ? true : value === "no" ? false : undefined;
}

function finiteRange(min: number | undefined, max: number | undefined) {
  const range: { $gte?: number; $lte?: number } = {};
  if (Number.isFinite(min)) range.$gte = min;
  if (Number.isFinite(max)) range.$lte = max;
  return Object.keys(range).length ? range : undefined;
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const allowedSortFields = new Set<TrainerPokemonSortField>([
  "dexNumber", "frenchName", "nickname", "cp", "ivPercent", "attackIv", "defenseIv",
  "staminaIv", "weightKg", "heightM", "shiny", "lucky",
]);

function queryFilter(owner: string, snapshotId: ObjectId, query: TrainerPokemonQuery): Filter<EntryDocument> {
  const filter: Filter<EntryDocument> = { owner, snapshotId };
  const search = normalizeSearchValue(query.search);
  if (search) filter.searchText = { $regex: escapeRegex(search), $options: "i" };
  const shiny = booleanFilter(query.shiny);
  const lucky = booleanFilter(query.lucky);
  if (shiny !== undefined) filter.shiny = shiny;
  if (lucky !== undefined) filter.lucky = lucky;
  if (query.gender) filter.gender = query.gender as TrainerPokemon["gender"];
  if (query.alignment) filter.alignment = query.alignment as TrainerPokemon["alignment"];
  if (query.costume === "yes") filter.costume = { $ne: null };
  if (query.costume === "no") filter.costume = null;
  if (query.specialForm === "yes") filter.specialForm = true;
  if (query.specialForm === "no") filter.specialForm = false;
  if (query.perfect) filter.ivTotal = 45;
  const ivRange = finiteRange(query.ivMin, query.ivMax);
  if (ivRange) filter.ivPercent = ivRange;
  const cpRange = finiteRange(query.cpMin, query.cpMax);
  if (cpRange) filter.cp = cpRange;
  const weightRange = finiteRange(query.weightMin, query.weightMax);
  if (weightRange) filter.weightKg = weightRange;
  const heightRange = finiteRange(query.heightMin, query.heightMax);
  if (heightRange) filter.heightM = heightRange;
  return filter;
}

export async function readTrainerPokemon(owner: string, query: TrainerPokemonQuery): Promise<TrainerPokemonListResponse> {
  const db = await getDb();
  const ownerDocument = await owners(db).findOne({ owner });
  if (!ownerDocument?.activeSnapshotId) {
    return {
      items: [], snapshot: null, stats: emptyTrainerPokemonStats(),
      filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 100 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } },
      pagination: { page: 1, limit: 50, total: 0, pages: 0 },
    };
  }
  const snapshot = await snapshots(db).findOne({ _id: ownerDocument.activeSnapshotId, owner });
  if (!snapshot) throw repositoryError("Le pointeur actif référence un snapshot introuvable.", 500, "TRAINER_POKEMON_ACTIVE_SNAPSHOT_MISSING");
  const page = Math.max(1, Math.floor(query.page || 1));
  const limit = Math.min(100, Math.max(10, Math.floor(query.limit || 50)));
  const filter = queryFilter(owner, ownerDocument.activeSnapshotId, query);
  const sortField = query.sort && allowedSortFields.has(query.sort) ? query.sort : "dexNumber";
  const direction = query.order === "desc" ? -1 : 1;
  const sort: Sort = { [sortField]: direction, sourceId: 1 };
  const baseFilter = { owner, snapshotId: ownerDocument.activeSnapshotId };
  const [documents, total, genders, alignments, forms, costumes, ranges] = await Promise.all([
    entries(db).find(filter, { projection: { _id: 0, owner: 0, snapshotId: 0, searchText: 0 } }).sort(sort).skip((page - 1) * limit).limit(limit).toArray(),
    entries(db).countDocuments(filter),
    entries(db).distinct("gender", baseFilter),
    entries(db).distinct("alignment", baseFilter),
    entries(db).distinct("form", { ...baseFilter, form: { $ne: null } }),
    entries(db).distinct("costume", { ...baseFilter, costume: { $ne: null } }),
    entries(db).aggregate<{ cpMin: number; cpMax: number; ivMin: number; ivMax: number; weightMin: number; weightMax: number; heightMin: number; heightMax: number }>([
      { $match: baseFilter },
      { $group: { _id: null, cpMin: { $min: "$cp" }, cpMax: { $max: "$cp" }, ivMin: { $min: "$ivPercent" }, ivMax: { $max: "$ivPercent" }, weightMin: { $min: "$weightKg" }, weightMax: { $max: "$weightKg" }, heightMin: { $min: "$heightM" }, heightMax: { $max: "$heightM" } } },
      { $project: { _id: 0 } },
    ]).next(),
  ]);
  let presentedDocuments = documents as TrainerPokemon[];
  try {
    presentedDocuments = enrichTrainerPokemonEntries(presentedDocuments, await fetchTrainerPokemonReferences());
  } catch (error) {
    console.error("[trainer-pokemon] presentation enrichment unavailable", {
      owner,
      message: error instanceof Error ? error.message : "unknown",
    });
  }
  return {
    items: presentedDocuments,
    snapshot: snapshotSummary(snapshot, ownerDocument.activeSnapshotId),
    stats: snapshot.stats,
    filters: {
      genders: genders.sort() as TrainerPokemon["gender"][],
      alignments: alignments.sort() as TrainerPokemon["alignment"][],
      forms: forms.filter((value): value is string => typeof value === "string").sort(),
      costumes: costumes.filter((value): value is string => typeof value === "string").sort(),
      cp: { min: ranges?.cpMin || 0, max: ranges?.cpMax || 0 },
      ivPercent: { min: ranges?.ivMin || 0, max: ranges?.ivMax || 100 },
      weightKg: { min: ranges?.weightMin || 0, max: ranges?.weightMax || 0 },
      heightM: { min: ranges?.heightMin || 0, max: ranges?.heightMax || 0 },
    },
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function readTrainerPokemonImports(owner: string) {
  const db = await getDb();
  const [ownerDocument, documents] = await Promise.all([
    owners(db).findOne({ owner }),
    snapshots(db).find({ owner }).sort({ importedAt: -1 }).limit(50).toArray(),
  ]);
  return documents.map((document) => snapshotSummary(document, ownerDocument?.activeSnapshotId));
}

export async function rollbackTrainerPokemon(owner: string, snapshotIdValue: string) {
  if (!ObjectId.isValid(snapshotIdValue)) throw repositoryError("Identifiant de snapshot invalide.", 400, "TRAINER_POKEMON_INVALID_SNAPSHOT_ID");
  const db = await getDb();
  const snapshotId = new ObjectId(snapshotIdValue);
  const [target, currentOwner] = await Promise.all([
    snapshots(db).findOne({ _id: snapshotId, owner, status: { $ne: "failed" } }),
    owners(db).findOne({ owner }),
  ]);
  if (!target) throw repositoryError("Snapshot introuvable.", 404, "TRAINER_POKEMON_SNAPSHOT_NOT_FOUND");
  if (currentOwner?.activeSnapshotId.equals(snapshotId)) throw repositoryError("Ce snapshot est déjà actif.", 409, "TRAINER_POKEMON_SNAPSHOT_ALREADY_ACTIVE");
  const now = new Date();
  const result = await executeAtomicSnapshotRollback({
    readActiveSnapshotId: async () => currentOwner?.activeSnapshotId.toHexString() || null,
    countSnapshotEntries: async (snapshotIdInput) => entries(db).countDocuments({ owner, snapshotId: new ObjectId(snapshotIdInput) }),
    swapActiveSnapshot: async (snapshotIdInput, previousSnapshotIdInput) => {
      await owners(db).updateOne(
        { owner },
        { $set: { activeSnapshotId: new ObjectId(snapshotIdInput), previousSnapshotId: previousSnapshotIdInput ? new ObjectId(previousSnapshotIdInput) : null, updatedAt: now, updatedBy: owner } },
        { upsert: true },
      );
    },
    markSnapshotActive: async (snapshotIdInput) => { await snapshots(db).updateOne({ _id: new ObjectId(snapshotIdInput), owner }, { $set: { status: "active", activatedAt: now, archivedAt: null } }); },
    markSnapshotArchived: async (snapshotIdInput) => { await snapshots(db).updateOne({ _id: new ObjectId(snapshotIdInput), owner }, { $set: { status: "archived", archivedAt: now } }); },
    reportBookkeepingFailure: (error) => console.error("[trainer-pokemon] rollback bookkeeping failed", { owner, error: error instanceof Error ? error.message : "unknown" }),
  }, snapshotIdValue, target.actualPokemonCount);
  console.info("[trainer-pokemon] rollback activated", { owner, snapshotId: snapshotIdValue, count: result.count });
  return { snapshotId: snapshotIdValue, restored: result.count, activatedAt: now.toISOString() };
}

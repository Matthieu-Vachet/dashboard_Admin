import { MongoClient, ObjectId, type Db } from "mongodb";
import { javascriptLearningTopics, learningCurriculum, findLearningItem } from "@/lib/learning/javascript";
import { validateLearningCatalog, validateLearningTopic } from "@/lib/learning/schema";
import type {
  LearningActivity,
  LearningAdvancedStats,
  LearningCurriculum,
  LearningImportStrategy,
  LearningProgressRecord,
  LearningProgressState,
  LearningStatus,
  LearningTopic,
  LearningValidationIssue,
} from "@/types/admin/learning";

type LearningTopicDocument = LearningTopic & {
  createdAt: Date;
  updatedAt: Date;
  importedBy: string;
};

type LearningCurriculumDocument = LearningCurriculum & {
  createdAt: Date;
  updatedAt: Date;
  importedBy: string;
};

type LearningProgressDocument = Omit<LearningProgressRecord, "startedAt" | "completedAt" | "updatedAt"> & {
  owner: string;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type LearningActivityDocument = Omit<LearningActivity, "id" | "occurredAt"> & {
  _id?: ObjectId;
  owner: string;
  occurredAt: Date;
};

type LearningImportDocument = {
  _id?: ObjectId;
  owner: string;
  fileName: string;
  topicId: string;
  schemaVersion: number;
  strategy: LearningImportStrategy;
  createdAt: Date;
  added: number;
  updated: number;
  warnings: LearningValidationIssue[];
  previousVersionId: ObjectId | null;
  rolledBackAt: Date | null;
  rollbackVersionId: ObjectId | null;
};

type LearningTopicVersionDocument = {
  _id?: ObjectId;
  topicId: string;
  topic: LearningTopic;
  createdAt: Date;
  createdBy: string;
  reason: "import" | "rollback" | "delete" | "update";
};

const dbName = process.env.DASHBOARD_MONGODB_DB || "matweb-dashboard-admin";
let clientPromise: Promise<MongoClient> | null = null;
let indexesPromise: Promise<void> | null = null;

function mongoUri() {
  return process.env.DASHBOARD_MONGODB_URI || process.env.MONGODB_URI || "";
}

export function learningDatabaseConfigured() {
  return Boolean(mongoUri());
}

function errorWithStatus(message: string, status: number) {
  const error = new Error(message);
  (error as Error & { status?: number }).status = status;
  return error;
}

async function getDb() {
  const uri = mongoUri();
  if (!uri) throw errorWithStatus("MongoDB dashboard non configuré.", 503);
  if (!clientPromise) {
    clientPromise = new MongoClient(uri, {
      appName: "matweb-dashboard-learning",
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
    db.collection("learning_topics").createIndex({ id: 1 }, { unique: true }),
    db.collection("learning_curricula").createIndex({ id: 1 }, { unique: true }),
    db.collection("learning_progress").createIndex({ owner: 1, itemId: 1 }, { unique: true }),
    db.collection("learning_progress").createIndex({ owner: 1, completedAt: -1 }),
    db.collection("learning_activity").createIndex({ owner: 1, occurredAt: -1 }),
    db.collection("learning_imports").createIndex({ owner: 1, createdAt: -1 }),
    db.collection("learning_topic_versions").createIndex({ topicId: 1, createdAt: -1 }),
  ]);
}

function topicsCollection(db: Db) {
  return db.collection<LearningTopicDocument>("learning_topics");
}

function curriculaCollection(db: Db) {
  return db.collection<LearningCurriculumDocument>("learning_curricula");
}

function progressCollection(db: Db) {
  return db.collection<LearningProgressDocument>("learning_progress");
}

function activityCollection(db: Db) {
  return db.collection<LearningActivityDocument>("learning_activity");
}

function importsCollection(db: Db) {
  return db.collection<LearningImportDocument>("learning_imports");
}

function versionsCollection(db: Db) {
  return db.collection<LearningTopicVersionDocument>("learning_topic_versions");
}

function stripTopicMetadata(document: LearningTopicDocument): LearningTopic {
  const topic = { ...document } as Partial<LearningTopicDocument> & { _id?: ObjectId };
  delete topic._id;
  delete topic.createdAt;
  delete topic.updatedAt;
  delete topic.importedBy;
  return topic as LearningTopic;
}

function stripCurriculumMetadata(document: LearningCurriculumDocument): LearningCurriculum {
  const curriculum = { ...document } as Partial<LearningCurriculumDocument> & { _id?: ObjectId };
  delete curriculum._id;
  delete curriculum.createdAt;
  delete curriculum.updatedAt;
  delete curriculum.importedBy;
  return curriculum as LearningCurriculum;
}

export async function readLearningCatalog() {
  if (!learningDatabaseConfigured()) {
    return { topics: javascriptLearningTopics, curriculum: learningCurriculum, source: "local" as const, warning: null };
  }

  try {
    const db = await getDb();
    const [topicDocuments, curriculumDocument] = await Promise.all([
      topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray(),
      curriculaCollection(db).findOne({ id: learningCurriculum.id }, { projection: { _id: 0 } }),
    ]);
    if (!topicDocuments.length) {
      return {
        topics: javascriptLearningTopics,
        curriculum: learningCurriculum,
        source: "local" as const,
        warning: "MongoDB est vide : les fichiers locaux sont utilisés comme seed de secours.",
      };
    }
    const curriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
    const validation = validateLearningCatalog(topicDocuments.map(stripTopicMetadata), curriculum);
    if (!validation.topics.length || !validation.curriculum) {
      return {
        topics: javascriptLearningTopics,
        curriculum: learningCurriculum,
        source: "local" as const,
        warning: "Le catalogue MongoDB est invalide : les fichiers locaux sont utilisés sans interrompre le dashboard.",
      };
    }
    const order = new Map(curriculum.levels.flatMap((level) => level.topics).map((id, index) => [id, index]));
    const topics = validation.topics.sort(
      (left, right) => (order.get(left.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(right.id) ?? Number.MAX_SAFE_INTEGER),
    );
    const issueCount = validation.issues.length;
    return {
      topics,
      curriculum: validation.curriculum,
      source: "mongodb" as const,
      warning: issueCount ? `${issueCount} anomalie(s) de catalogue MongoDB ont été ignorées ou signalées.` : null,
    };
  } catch (error) {
    return {
      topics: javascriptLearningTopics,
      curriculum: learningCurriculum,
      source: "local" as const,
      warning: error instanceof Error ? `MongoDB indisponible : ${error.message}` : "MongoDB indisponible.",
    };
  }
}

async function ensureLocalSeed(db: Db, owner: string) {
  const count = await topicsCollection(db).estimatedDocumentCount();
  const now = new Date();
  if (!count) {
    await topicsCollection(db).insertMany(
      javascriptLearningTopics.map((topic) => ({ ...topic, createdAt: now, updatedAt: now, importedBy: owner })),
    );
  }
  await curriculaCollection(db).updateOne(
    { id: learningCurriculum.id },
    {
      $setOnInsert: { ...learningCurriculum, createdAt: now, updatedAt: now, importedBy: owner },
    },
    { upsert: true },
  );
}

function curriculumWithTopic(current: LearningCurriculum, topic: LearningTopic, topics: LearningTopic[]) {
  if (!current.levels.some((level) => level.id === topic.curriculum.levelId)) {
    throw errorWithStatus(`Niveau de curriculum introuvable : ${topic.curriculum.levelId}.`, 400);
  }
  const order = new Map(topics.map((item) => [item.id, item.curriculum.order]));
  order.set(topic.id, topic.curriculum.order);
  const levels = current.levels.map((level) => {
    const withoutTopic = level.topics.filter((id) => id !== topic.id);
    const topics = level.id === topic.curriculum.levelId
      ? [...withoutTopic, topic.id].sort((left, right) => (order.get(left) ?? Number.MAX_SAFE_INTEGER) - (order.get(right) ?? Number.MAX_SAFE_INTEGER))
      : withoutTopic;
    return {
      ...level,
      topics,
      plannedTopics: level.plannedTopics.filter((planned) => planned.id !== topic.id),
    };
  });
  return { ...current, levels };
}

async function placeTopicInCurriculum(db: Db, topic: LearningTopic, owner: string) {
  const document = await curriculaCollection(db).findOne({ id: learningCurriculum.id });
  const current = document ? stripCurriculumMetadata(document) : learningCurriculum;
  const topicDocuments = await topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray();
  const next = curriculumWithTopic(current, topic, topicDocuments.map(stripTopicMetadata));
  await curriculaCollection(db).replaceOne(
    { id: current.id },
    { ...next, createdAt: document?.createdAt || new Date(), updatedAt: new Date(), importedBy: owner },
    { upsert: true },
  );
}

function curriculumWithoutTopic(current: LearningCurriculum, topicId: string) {
  return {
    ...current,
    levels: current.levels.map((level) => ({ ...level, topics: level.topics.filter((id) => id !== topicId) })),
  };
}

async function removeTopicFromCurriculum(db: Db, topicId: string, owner: string) {
  const document = await curriculaCollection(db).findOne({ id: learningCurriculum.id });
  if (!document) return;
  const current = stripCurriculumMetadata(document);
  const next = curriculumWithoutTopic(current, topicId);
  await curriculaCollection(db).replaceOne(
    { id: current.id },
    {
      ...next,
      createdAt: document.createdAt,
      updatedAt: new Date(),
      importedBy: owner,
    },
  );
}

function serializeProgress(document: LearningProgressDocument): LearningProgressRecord {
  return {
    itemId: document.itemId,
    topicId: document.topicId,
    itemType: document.itemType,
    status: document.status,
    startedAt: document.startedAt?.toISOString() || null,
    completedAt: document.completedAt?.toISOString() || null,
    attempts: document.attempts,
    earnedXp: document.earnedXp,
    studySeconds: document.studySeconds,
    answer: document.answer,
    updatedAt: document.updatedAt.toISOString(),
    migratedFrom: document.migratedFrom,
  };
}

function progressMap(documents: LearningProgressDocument[]): LearningProgressState {
  return Object.fromEntries(documents.map((document) => [document.itemId, serializeProgress(document)]));
}

async function migrateLegacyDashboardProgress(db: Db, owner: string, topics: LearningTopic[]) {
  const legacy = await db.collection<{ owner: string; key: string; value?: unknown; updatedAt?: Date }>("dashboard_store")
    .findOne({ owner, key: "matweb.js.learning.progress" });
  if (!legacy?.value || typeof legacy.value !== "object" || Array.isArray(legacy.value)) return 0;

  const now = legacy.updatedAt instanceof Date ? legacy.updatedAt : new Date();
  const operations = Object.entries(legacy.value as Record<string, unknown>).flatMap(([itemId, statusValue]) => {
    if (!["not_started", "in_progress", "completed"].includes(String(statusValue))) return [];
    const found = findLearningItem(topics, itemId === "javascript:theory" ? "javascript-theory" : itemId.replace(":theory", "-theory"));
    if (!found) return [];
    const status = statusValue as LearningStatus;
    return [{
      updateOne: {
        filter: { owner, itemId: found.item.id },
        update: {
          $setOnInsert: {
            owner,
            itemId: found.item.id,
            topicId: found.topic.id,
            itemType: found.itemType,
            status,
            startedAt: status === "not_started" ? null : now,
            completedAt: null,
            attempts: status === "not_started" ? 0 : 1,
            earnedXp: status === "completed" ? found.item.xp : 0,
            studySeconds: 0,
            createdAt: now,
            updatedAt: now,
            migratedFrom: "dashboard_store:matweb.js.learning.progress",
          },
        },
        upsert: true,
      },
    }];
  });
  if (operations.length) await progressCollection(db).bulkWrite(operations);
  return operations.length;
}

export async function readLearningProgress(owner: string, topics?: LearningTopic[]) {
  if (!learningDatabaseConfigured()) return { progress: {} as LearningProgressState, migrated: 0, configured: false };
  try {
    const db = await getDb();
    const catalogTopics = topics || (await readLearningCatalog()).topics;
    const migrated = await migrateLegacyDashboardProgress(db, owner, catalogTopics);
    const documents = await progressCollection(db).find({ owner }, { projection: { _id: 0 } }).toArray();
    return { progress: progressMap(documents), migrated, configured: true };
  } catch {
    return { progress: {} as LearningProgressState, migrated: 0, configured: false };
  }
}

export async function migrateLearningStatusMap(owner: string, value: unknown, topics: LearningTopic[]) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw errorWithStatus("Progression historique invalide.", 400);
  const db = await getDb();
  const now = new Date();
  const operations = Object.entries(value as Record<string, unknown>).flatMap(([legacyId, statusValue]) => {
    const saved = statusValue && typeof statusValue === "object" && !Array.isArray(statusValue)
      ? statusValue as Partial<LearningProgressRecord>
      : null;
    const rawStatus = saved?.status || statusValue;
    if (!["not_started", "in_progress", "completed"].includes(String(rawStatus))) return [];
    const normalizedId = legacyId.replace(":theory", "-theory");
    const found = findLearningItem(topics, normalizedId);
    if (!found) return [];
    const status = rawStatus as LearningStatus;
    const savedStartedAt = saved?.startedAt ? new Date(saved.startedAt) : null;
    const savedCompletedAt = saved?.completedAt ? new Date(saved.completedAt) : null;
    const startedAt = savedStartedAt && !Number.isNaN(savedStartedAt.getTime()) ? savedStartedAt : status === "not_started" ? null : now;
    const completedAt = savedCompletedAt && !Number.isNaN(savedCompletedAt.getTime()) ? savedCompletedAt : null;
    return [{ updateOne: {
      filter: { owner, itemId: found.item.id },
      update: { $setOnInsert: {
        owner, itemId: found.item.id, topicId: found.topic.id, itemType: found.itemType, status,
        startedAt, completedAt,
        attempts: Math.max(0, Math.min(10_000, saved?.attempts ?? (status === "not_started" ? 0 : 1))),
        earnedXp: status === "completed" ? Math.min(found.item.xp, Math.max(0, saved?.earnedXp || found.item.xp)) : 0,
        studySeconds: Math.max(0, Math.min(10_000_000, saved?.studySeconds || 0)),
        ...(typeof saved?.answer === "string" ? { answer: saved.answer.slice(0, 100_000) } : {}),
        createdAt: now, updatedAt: now, migratedFrom: "browser:matweb.js.learning.progress",
      } },
      upsert: true,
    } }];
  });
  if (operations.length) await progressCollection(db).bulkWrite(operations);
  return operations.length;
}

export async function updateLearningProgress(
  owner: string,
  input: { itemId: string; status?: LearningStatus; answer?: string },
) {
  const db = await getDb();
  const catalog = await readLearningCatalog();
  const found = findLearningItem(catalog.topics, input.itemId);
  if (!found) throw errorWithStatus("Unité pédagogique introuvable.", 404);

  const collection = progressCollection(db);
  const current = await collection.findOne({ owner, itemId: input.itemId });
  const now = new Date();
  const nextStatus = input.status || current?.status || "not_started";
  const firstStart = nextStatus === "in_progress" && current?.status !== "in_progress" && current?.status !== "completed";
  const firstCompletion = nextStatus === "completed" && current?.status !== "completed";
  const startedAt = current?.startedAt || (nextStatus !== "not_started" ? now : null);
  const elapsed = firstCompletion && startedAt
    ? Math.max(0, Math.min(6 * 60 * 60, Math.floor((now.getTime() - startedAt.getTime()) / 1_000)))
    : 0;
  const earnedXp = current?.earnedXp || (firstCompletion ? found.item.xp : 0);

  await collection.updateOne(
    { owner, itemId: input.itemId },
    {
      $set: {
        topicId: found.topic.id,
        itemType: found.itemType,
        status: current?.status === "completed" ? "completed" : nextStatus,
        startedAt,
        completedAt: current?.completedAt || (firstCompletion ? now : null),
        attempts: (current?.attempts || 0) + (firstStart ? 1 : 0),
        earnedXp,
        studySeconds: (current?.studySeconds || 0) + elapsed,
        ...(input.answer !== undefined ? { answer: input.answer.slice(0, 100_000) } : {}),
        updatedAt: now,
      },
      $setOnInsert: { owner, itemId: input.itemId, createdAt: now },
    },
    { upsert: true },
  );

  const action = firstCompletion ? "completed" : firstStart ? "started" : input.answer !== undefined ? "answer_saved" : null;
  if (action) {
    await activityCollection(db).insertOne({
      owner,
      itemId: input.itemId,
      topicId: found.topic.id,
      itemType: found.itemType,
      action,
      title: found.item.title,
      xp: firstCompletion ? found.item.xp : 0,
      studySeconds: elapsed,
      occurredAt: now,
    });
  }

  const updated = await collection.findOne({ owner, itemId: input.itemId });
  if (!updated) throw errorWithStatus("Progression non enregistrée.", 500);
  return serializeProgress(updated);
}

function localDay(date: Date, timezone = "Europe/Paris") {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function calculateStreak(days: string[]) {
  const unique = [...new Set(days)].sort().reverse();
  if (!unique.length) return { current: 0, best: 0 };
  const dayMs = 86_400_000;
  let best = 1;
  let run = 1;
  for (let index = 1; index < unique.length; index += 1) {
    const previous = new Date(`${unique[index - 1]}T12:00:00Z`).getTime();
    const current = new Date(`${unique[index]}T12:00:00Z`).getTime();
    if (Math.round((previous - current) / dayMs) === 1) run += 1;
    else run = 1;
    best = Math.max(best, run);
  }
  const today = localDay(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const startsNow = unique[0] === today || unique[0] === localDay(yesterdayDate);
  let current = startsNow ? 1 : 0;
  for (let index = 1; startsNow && index < unique.length; index += 1) {
    const previous = new Date(`${unique[index - 1]}T12:00:00Z`).getTime();
    const next = new Date(`${unique[index]}T12:00:00Z`).getTime();
    if (Math.round((previous - next) / dayMs) !== 1) break;
    current += 1;
  }
  return { current, best };
}

export async function readLearningActivity(owner: string, limit = 120) {
  if (!learningDatabaseConfigured()) {
    return { activity: [] as LearningActivity[], stats: emptyAdvancedStats(), configured: false };
  }
  try {
    const db = await getDb();
    const [activities, progress] = await Promise.all([
      activityCollection(db).find({ owner }).sort({ occurredAt: -1 }).limit(Math.min(Math.max(limit, 1), 365)).toArray(),
      progressCollection(db).find({ owner }).toArray(),
    ]);
    const serialized = activities.map((activity) => ({
      id: activity._id!.toHexString(),
      itemId: activity.itemId,
      topicId: activity.topicId,
      itemType: activity.itemType,
      action: activity.action,
      title: activity.title,
      xp: activity.xp,
      studySeconds: activity.studySeconds,
      occurredAt: activity.occurredAt.toISOString(),
    }));
    return { activity: serialized, stats: buildAdvancedStats(activities, progress), configured: true };
  } catch {
    return { activity: [] as LearningActivity[], stats: emptyAdvancedStats(), configured: false };
  }
}

function emptyAdvancedStats(): LearningAdvancedStats {
  return {
    totalStudySeconds: 0, weekStudySeconds: 0, todayStudySeconds: 0,
    xpToday: 0, xpWeek: 0, xpMonth: 0,
    completedExercises: 0, completedChallenges: 0, completedProjects: 0,
    currentStreak: 0, bestStreak: 0, lastActivity: null,
  };
}

function buildAdvancedStats(activities: LearningActivityDocument[], progress: LearningProgressDocument[]): LearningAdvancedStats {
  const now = new Date();
  const today = localDay(now);
  const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6); weekStart.setHours(0, 0, 0, 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const completed = activities.filter((item) => item.action === "completed");
  const streak = calculateStreak(completed.map((item) => localDay(item.occurredAt)));
  return {
    totalStudySeconds: progress.reduce((sum, item) => sum + item.studySeconds, 0),
    weekStudySeconds: completed.filter((item) => item.occurredAt >= weekStart).reduce((sum, item) => sum + item.studySeconds, 0),
    todayStudySeconds: completed.filter((item) => localDay(item.occurredAt) === today).reduce((sum, item) => sum + item.studySeconds, 0),
    xpToday: completed.filter((item) => localDay(item.occurredAt) === today).reduce((sum, item) => sum + item.xp, 0),
    xpWeek: completed.filter((item) => item.occurredAt >= weekStart).reduce((sum, item) => sum + item.xp, 0),
    xpMonth: completed.filter((item) => item.occurredAt >= monthStart).reduce((sum, item) => sum + item.xp, 0),
    completedExercises: progress.filter((item) => item.itemType === "exercise" && item.status === "completed").length,
    completedChallenges: progress.filter((item) => item.itemType === "challenge" && item.status === "completed").length,
    completedProjects: progress.filter((item) => item.itemType === "project" && item.status === "completed").length,
    currentStreak: streak.current,
    bestStreak: streak.best,
    lastActivity: activities[0]?.occurredAt.toISOString() || null,
  };
}

function mergeById<T extends { id: string }>(current: T[], incoming: T[]) {
  const merged = new Map(current.map((item) => [item.id, item]));
  incoming.forEach((item) => merged.set(item.id, item));
  return [...merged.values()];
}

function mergeTopics(current: LearningTopic, incoming: LearningTopic): LearningTopic {
  const references = new Map(current.book.references.map((item) => [`${item.chapter}:${item.pages}`, item]));
  incoming.book.references.forEach((item) => references.set(`${item.chapter}:${item.pages}`, item));
  return {
    ...current,
    ...incoming,
    book: { references: [...references.values()] },
    resources: mergeById(current.resources, incoming.resources),
    exercises: mergeById(current.exercises, incoming.exercises),
    pseudocode: mergeById(current.pseudocode, incoming.pseudocode),
    challenges: mergeById(current.challenges, incoming.challenges),
    projects: mergeById(current.projects, incoming.projects),
    achievements: mergeById(current.achievements, incoming.achievements),
  };
}

function itemCounts(topic: LearningTopic) {
  return 1 + topic.exercises.length + topic.pseudocode.length + topic.challenges.length + topic.projects.length + topic.resources.length + topic.achievements.length;
}

async function saveVersion(db: Db, topic: LearningTopic, owner: string, reason: LearningTopicVersionDocument["reason"]) {
  const result = await versionsCollection(db).insertOne({ topicId: topic.id, topic, createdAt: new Date(), createdBy: owner, reason });
  const obsolete = await versionsCollection(db).find({ topicId: topic.id }).sort({ createdAt: -1 }).skip(10).project({ _id: 1 }).toArray();
  if (obsolete.length) await versionsCollection(db).deleteMany({ _id: { $in: obsolete.map((item) => item._id) } });
  return result.insertedId;
}

export async function importLearningTopic(
  owner: string,
  input: { topic: unknown; strategy: LearningImportStrategy; fileName: string },
) {
  const validation = validateLearningTopic(input.topic);
  if (!validation.success) throw Object.assign(errorWithStatus("Le fichier pédagogique est invalide.", 400), { issues: validation.issues });
  const db = await getDb();
  await ensureLocalSeed(db, owner);
  const topic = validation.data;
  const catalogDocuments = await topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray();
  const catalogTopics = catalogDocuments.map(stripTopicMetadata);
  const knownTopicIds = new Set(catalogTopics.map((item) => item.id));
  knownTopicIds.add(topic.id);
  for (const reference of [...topic.prerequisites, ...topic.relatedTopics]) {
    if (!knownTopicIds.has(reference)) throw errorWithStatus(`Thème référencé introuvable : ${reference}.`, 400);
  }
  const currentDocument = await topicsCollection(db).findOne({ id: topic.id });
  const current = currentDocument ? stripTopicMetadata(currentDocument) : null;
  if (input.strategy === "create" && current) throw errorWithStatus("Ce thème existe déjà. Choisis Fusionner ou Remplacer.", 409);
  if (input.strategy !== "create" && !current) throw errorWithStatus("Ce thème n’existe pas encore. Choisis Créer.", 409);
  const nextTopic = input.strategy === "merge" && current ? mergeTopics(current, topic) : topic;
  const revalidation = validateLearningTopic(nextTopic);
  if (!revalidation.success) throw Object.assign(errorWithStatus("La fusion produit un thème invalide.", 400), { issues: revalidation.issues });
  const curriculumDocument = await curriculaCollection(db).findOne({ id: learningCurriculum.id });
  const currentCurriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
  const prospectiveTopics = [...catalogTopics.filter((item) => item.id !== nextTopic.id), nextTopic];
  const prospectiveCurriculum = curriculumWithTopic(currentCurriculum, nextTopic, prospectiveTopics);
  const catalogValidation = validateLearningCatalog(prospectiveTopics, prospectiveCurriculum);
  if (!catalogValidation.success) {
    throw Object.assign(errorWithStatus("L’import rendrait le catalogue incohérent.", 400), { issues: catalogValidation.issues });
  }

  const previousVersionId = current ? await saveVersion(db, current, owner, "import") : null;
  const now = new Date();
  await topicsCollection(db).replaceOne(
    { id: topic.id },
    { ...nextTopic, createdAt: currentDocument?.createdAt || now, updatedAt: now, importedBy: owner },
    { upsert: true },
  );
  await placeTopicInCurriculum(db, nextTopic, owner);
  const added = current ? Math.max(0, itemCounts(nextTopic) - itemCounts(current)) : itemCounts(nextTopic);
  const updated = current ? Math.min(itemCounts(current), itemCounts(nextTopic)) : 0;
  const importResult = await importsCollection(db).insertOne({
    owner,
    fileName: input.fileName.slice(0, 255),
    topicId: topic.id,
    schemaVersion: topic.schemaVersion,
    strategy: input.strategy,
    createdAt: now,
    added,
    updated,
    warnings: validation.issues.filter((issue) => issue.severity === "warning"),
    previousVersionId,
    rolledBackAt: null,
    rollbackVersionId: null,
  });
  return { importId: importResult.insertedId.toHexString(), topic: nextTopic, added, updated, warnings: validation.issues };
}

export async function readLearningImports(owner: string) {
  if (!learningDatabaseConfigured()) return [];
  const db = await getDb();
  const documents = await importsCollection(db).find({ owner }).sort({ createdAt: -1 }).limit(100).toArray();
  return documents.map((item) => ({
    id: item._id!.toHexString(), fileName: item.fileName, topicId: item.topicId,
    schemaVersion: item.schemaVersion, strategy: item.strategy, createdAt: item.createdAt.toISOString(),
    added: item.added, updated: item.updated, warnings: item.warnings,
    canRollback: !item.rolledBackAt,
    rolledBackAt: item.rolledBackAt?.toISOString() || null,
  }));
}

export async function rollbackLearningImport(owner: string, importId: string) {
  if (!ObjectId.isValid(importId)) throw errorWithStatus("Identifiant d’import invalide.", 400);
  const db = await getDb();
  const importDocument = await importsCollection(db).findOne({ _id: new ObjectId(importId), owner });
  if (!importDocument) throw errorWithStatus("Import introuvable.", 404);
  if (importDocument.rolledBackAt) throw errorWithStatus("Cet import a déjà été restauré.", 409);
  const currentDocument = await topicsCollection(db).findOne({ id: importDocument.topicId });
  const current = currentDocument ? stripTopicMetadata(currentDocument) : null;
  const rollbackVersionId = current ? await saveVersion(db, current, owner, "rollback") : null;
  const now = new Date();
  if (importDocument.previousVersionId) {
    const previous = await versionsCollection(db).findOne({ _id: importDocument.previousVersionId });
    if (!previous) throw errorWithStatus("Version précédente introuvable.", 410);
    const [topicDocuments, curriculumDocument] = await Promise.all([
      topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray(),
      curriculaCollection(db).findOne({ id: learningCurriculum.id }),
    ]);
    const prospectiveTopics = [...topicDocuments.map(stripTopicMetadata).filter((item) => item.id !== previous.topic.id), previous.topic];
    const currentCurriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
    const prospectiveCurriculum = curriculumWithTopic(currentCurriculum, previous.topic, prospectiveTopics);
    const validation = validateLearningCatalog(prospectiveTopics, prospectiveCurriculum);
    if (!validation.success) throw Object.assign(errorWithStatus("Le rollback rendrait le catalogue incohérent.", 409), { issues: validation.issues });
    await topicsCollection(db).replaceOne(
      { id: previous.topic.id },
      { ...previous.topic, createdAt: currentDocument?.createdAt || now, updatedAt: now, importedBy: owner },
      { upsert: true },
    );
    await placeTopicInCurriculum(db, previous.topic, owner);
  } else {
    const [topicDocuments, curriculumDocument] = await Promise.all([
      topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray(),
      curriculaCollection(db).findOne({ id: learningCurriculum.id }),
    ]);
    const prospectiveTopics = topicDocuments.map(stripTopicMetadata).filter((item) => item.id !== importDocument.topicId);
    const currentCurriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
    const validation = validateLearningCatalog(prospectiveTopics, curriculumWithoutTopic(currentCurriculum, importDocument.topicId));
    if (!validation.success) throw Object.assign(errorWithStatus("Le rollback supprimerait un contenu encore référencé.", 409), { issues: validation.issues });
    await topicsCollection(db).deleteOne({ id: importDocument.topicId });
    await removeTopicFromCurriculum(db, importDocument.topicId, owner);
  }
  await importsCollection(db).updateOne(
    { _id: importDocument._id },
    { $set: { rolledBackAt: now, rollbackVersionId } },
  );
  return { topicId: importDocument.topicId, restored: Boolean(importDocument.previousVersionId) };
}

export async function readLearningTopicById(id: string) {
  const catalog = await readLearningCatalog();
  return catalog.topics.find((topic) => topic.id === id) || null;
}

export async function updateLearningTopic(owner: string, id: string, value: unknown) {
  const validation = validateLearningTopic(value);
  if (!validation.success) throw Object.assign(errorWithStatus("Thème invalide.", 400), { issues: validation.issues });
  if (validation.data.id !== id) throw errorWithStatus("L’identifiant du thème ne peut pas être modifié.", 400);
  const db = await getDb();
  const currentDocument = await topicsCollection(db).findOne({ id });
  if (!currentDocument) throw errorWithStatus("Thème introuvable.", 404);
  const [topicDocuments, curriculumDocument] = await Promise.all([
    topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray(),
    curriculaCollection(db).findOne({ id: learningCurriculum.id }),
  ]);
  const prospectiveTopics = [...topicDocuments.map(stripTopicMetadata).filter((item) => item.id !== id), validation.data];
  const currentCurriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
  const prospectiveCurriculum = curriculumWithTopic(currentCurriculum, validation.data, prospectiveTopics);
  const catalogValidation = validateLearningCatalog(prospectiveTopics, prospectiveCurriculum);
  if (!catalogValidation.success) throw Object.assign(errorWithStatus("La mise à jour rendrait le catalogue incohérent.", 400), { issues: catalogValidation.issues });
  await saveVersion(db, stripTopicMetadata(currentDocument), owner, "update");
  await topicsCollection(db).replaceOne({ id }, { ...validation.data, createdAt: currentDocument.createdAt, updatedAt: new Date(), importedBy: owner });
  await placeTopicInCurriculum(db, validation.data, owner);
  return validation.data;
}

export async function deleteLearningTopic(owner: string, id: string) {
  const db = await getDb();
  const currentDocument = await topicsCollection(db).findOne({ id });
  if (!currentDocument) throw errorWithStatus("Thème introuvable.", 404);
  const [topicDocuments, curriculumDocument] = await Promise.all([
    topicsCollection(db).find({}, { projection: { _id: 0 } }).toArray(),
    curriculaCollection(db).findOne({ id: learningCurriculum.id }),
  ]);
  const prospectiveTopics = topicDocuments.map(stripTopicMetadata).filter((item) => item.id !== id);
  const currentCurriculum = curriculumDocument ? stripCurriculumMetadata(curriculumDocument) : learningCurriculum;
  const catalogValidation = validateLearningCatalog(prospectiveTopics, curriculumWithoutTopic(currentCurriculum, id));
  if (!catalogValidation.success) throw Object.assign(errorWithStatus("Ce thème est encore référencé par le parcours.", 409), { issues: catalogValidation.issues });
  const versionId = await saveVersion(db, stripTopicMetadata(currentDocument), owner, "delete");
  await topicsCollection(db).deleteOne({ id });
  await removeTopicFromCurriculum(db, id, owner);
  return { id, backupVersionId: versionId.toHexString() };
}

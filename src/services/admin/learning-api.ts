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

export type LearningCatalogPayload = {
  topics: LearningTopic[];
  curriculum: LearningCurriculum;
  source: "local" | "mongodb";
  warning: string | null;
  progress: LearningProgressState;
  migrated: number;
  activity: LearningActivity[];
  stats: LearningAdvancedStats;
  databaseConfigured: boolean;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({})) as { data?: T; error?: string; issues?: LearningValidationIssue[] };
  if (!response.ok || !payload.data) {
    const error = new Error(payload.error || "Requête d’apprentissage impossible.");
    Object.assign(error, { status: response.status, issues: payload.issues });
    throw error;
  }
  return payload.data;
}

export async function fetchLearningCatalog() {
  const response = await fetch("/api/learning/topics", { cache: "no-store" });
  return parseResponse<LearningCatalogPayload>(response);
}

export async function saveLearningProgress(input: { itemId: string; status?: LearningStatus; answer?: string }) {
  const response = await fetch("/api/learning/progress", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseResponse<{ progress: LearningProgressRecord }>(response);
}

export async function migrateBrowserLearningProgress(progress: unknown) {
  const response = await fetch("/api/learning/progress/migrate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ progress }),
  });
  return parseResponse<{ migrated: number; progress: LearningProgressState }>(response);
}

export async function fetchLearningActivity() {
  const response = await fetch("/api/learning/activity", { cache: "no-store" });
  return parseResponse<{ activity: LearningActivity[]; stats: LearningAdvancedStats; configured: boolean }>(response);
}

export async function importLearningTopic(input: { topic: LearningTopic; strategy: LearningImportStrategy; fileName: string }) {
  const response = await fetch("/api/learning/import", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseResponse<{ importId: string; topic: LearningTopic; added: number; updated: number; warnings: LearningValidationIssue[] }>(response);
}

export type LearningImportHistoryItem = {
  id: string;
  fileName: string;
  topicId: string;
  schemaVersion: number;
  strategy: LearningImportStrategy;
  createdAt: string;
  added: number;
  updated: number;
  warnings: LearningValidationIssue[];
  canRollback: boolean;
  rolledBackAt: string | null;
};

export async function fetchLearningImports() {
  const response = await fetch("/api/learning/imports", { cache: "no-store" });
  return parseResponse<{ imports: LearningImportHistoryItem[] }>(response);
}

export async function rollbackLearningImport(id: string) {
  const response = await fetch(`/api/learning/imports/${encodeURIComponent(id)}/rollback`, { method: "POST" });
  return parseResponse<{ topicId: string; restored: boolean }>(response);
}

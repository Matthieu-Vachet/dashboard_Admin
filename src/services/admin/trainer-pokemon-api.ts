import type {
  TrainerPokemonImportPreview,
  TrainerPokemonListResponse,
  TrainerPokemonSnapshotSummary,
} from "@/types/admin/trainer-pokemon";

export const trainerPokemonApiPath = "/api/trainer-pokemon";

type ApiErrorPayload = {
  error?: string | { message?: string; issues?: Array<{ path: string; message: string }> };
};

async function readPayload<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => null) as ({ success?: boolean; data?: T } & ApiErrorPayload) | null;
  if (!response.ok || !payload?.success || payload.data === undefined) {
    const message = typeof payload?.error === "string" ? payload.error : payload?.error?.message;
    const issues = typeof payload?.error === "object" ? payload.error.issues : undefined;
    const error = new Error(message || "La collection Pokémon GO est indisponible.");
    (error as Error & { issues?: typeof issues }).issues = issues;
    throw error;
  }
  return payload.data;
}

export async function readTrainerPokemonCollection(params: URLSearchParams, signal?: AbortSignal) {
  const response = await fetch(`${trainerPokemonApiPath}?${params}`, { cache: "no-store", signal });
  return readPayload<TrainerPokemonListResponse>(response);
}

export async function previewTrainerPokemonImport(payload: unknown) {
  const response = await fetch(`${trainerPokemonApiPath}/import`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ mode: "preview", payload }),
  });
  return readPayload<TrainerPokemonImportPreview>(response);
}

export async function commitTrainerPokemonImport(payload: unknown) {
  const response = await fetch(`${trainerPokemonApiPath}/import`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ mode: "commit", payload }),
  });
  return readPayload<{ preview: TrainerPokemonImportPreview; snapshotId: string; importedAt: string }>(response);
}

export async function readTrainerPokemonImports() {
  const response = await fetch(`${trainerPokemonApiPath}/imports`, { cache: "no-store" });
  return readPayload<{ imports: TrainerPokemonSnapshotSummary[] }>(response);
}

export async function rollbackTrainerPokemonImport(snapshotId: string) {
  const response = await fetch(`${trainerPokemonApiPath}/imports/${encodeURIComponent(snapshotId)}/rollback`, { method: "POST" });
  return readPayload<{ snapshotId: string; restored: number; activatedAt: string }>(response);
}

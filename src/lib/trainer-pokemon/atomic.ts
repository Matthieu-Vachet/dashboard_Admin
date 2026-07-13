import { createHash } from "node:crypto";

export type AtomicEntry = { sourceId: string };

export type AtomicSnapshotStore<TEntry extends AtomicEntry> = {
  createStagingSnapshot: () => Promise<string>;
  writeEntries: (snapshotId: string, entries: TEntry[]) => Promise<void>;
  readSourceIds: (snapshotId: string) => Promise<string[]>;
  readActiveSnapshotId: () => Promise<string | null>;
  swapActiveSnapshot: (snapshotId: string, previousSnapshotId: string | null) => Promise<void>;
  markSnapshotActive: (snapshotId: string) => Promise<void>;
  markSnapshotArchived: (snapshotId: string) => Promise<void>;
  markSnapshotFailed: (snapshotId: string, error: unknown) => Promise<void>;
  reportBookkeepingFailure?: (error: unknown) => void;
};

export function trainerPokemonEntryChecksum(items: AtomicEntry[]) {
  const hash = createHash("sha256");
  for (const item of [...items].sort((left, right) => left.sourceId.localeCompare(right.sourceId))) hash.update(`${item.sourceId}\n`);
  return hash.digest("hex");
}

function readBackError() {
  const error = new Error("La vérification read-back du snapshot a échoué.");
  (error as Error & { status?: number; code?: string }).status = 500;
  (error as Error & { status?: number; code?: string }).code = "TRAINER_POKEMON_READ_BACK_FAILED";
  return error;
}

export async function executeAtomicSnapshotImport<TEntry extends AtomicEntry>(
  store: AtomicSnapshotStore<TEntry>,
  entries: TEntry[],
) {
  let snapshotId: string | null = null;
  let pointerSwapped = false;
  try {
    snapshotId = await store.createStagingSnapshot();
    await store.writeEntries(snapshotId, entries);
    const storedIds = await store.readSourceIds(snapshotId);
    if (
      storedIds.length !== entries.length
      || trainerPokemonEntryChecksum(storedIds.map((sourceId) => ({ sourceId }))) !== trainerPokemonEntryChecksum(entries)
    ) {
      throw readBackError();
    }
    const previousSnapshotId = await store.readActiveSnapshotId();
    await store.swapActiveSnapshot(snapshotId, previousSnapshotId);
    pointerSwapped = true;

    const bookkeeping = await Promise.allSettled([
      store.markSnapshotActive(snapshotId),
      ...(previousSnapshotId ? [store.markSnapshotArchived(previousSnapshotId)] : []),
    ]);
    for (const result of bookkeeping) if (result.status === "rejected") store.reportBookkeepingFailure?.(result.reason);
    return { snapshotId, previousSnapshotId };
  } catch (error) {
    if (snapshotId && !pointerSwapped) await store.markSnapshotFailed(snapshotId, error).catch(() => undefined);
    throw error;
  }
}

export type AtomicRollbackStore = {
  readActiveSnapshotId: () => Promise<string | null>;
  countSnapshotEntries: (snapshotId: string) => Promise<number>;
  swapActiveSnapshot: (snapshotId: string, previousSnapshotId: string | null) => Promise<void>;
  markSnapshotActive: (snapshotId: string) => Promise<void>;
  markSnapshotArchived: (snapshotId: string) => Promise<void>;
  reportBookkeepingFailure?: (error: unknown) => void;
};

export async function executeAtomicSnapshotRollback(
  store: AtomicRollbackStore,
  snapshotId: string,
  expectedCount: number,
) {
  const count = await store.countSnapshotEntries(snapshotId);
  if (count !== expectedCount) {
    const error = new Error("Le snapshot ne passe pas la vérification read-back.");
    (error as Error & { status?: number; code?: string }).status = 409;
    (error as Error & { status?: number; code?: string }).code = "TRAINER_POKEMON_ROLLBACK_READ_BACK_FAILED";
    throw error;
  }
  const previousSnapshotId = await store.readActiveSnapshotId();
  await store.swapActiveSnapshot(snapshotId, previousSnapshotId);
  const bookkeeping = await Promise.allSettled([
    store.markSnapshotActive(snapshotId),
    ...(previousSnapshotId ? [store.markSnapshotArchived(previousSnapshotId)] : []),
  ]);
  for (const result of bookkeeping) if (result.status === "rejected") store.reportBookkeepingFailure?.(result.reason);
  return { snapshotId, previousSnapshotId, count };
}

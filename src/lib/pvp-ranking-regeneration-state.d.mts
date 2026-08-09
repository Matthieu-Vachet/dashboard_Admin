export type PvpRankingRegenerationStatus =
  | "idle"
  | "running"
  | "success"
  | "partial"
  | "failed"
  | "cancelled";

export type PvpRankingRegenerationState = {
  status: PvpRankingRegenerationStatus;
  generatedCount: number;
  ignoredCount: number;
  mappingMissingCount: number;
  warningCount: number;
  unchanged: boolean;
  message: string;
  reportAvailable: boolean;
};

export function createPvpRankingRegenerationState(
  status?: PvpRankingRegenerationStatus,
  overrides?: Partial<PvpRankingRegenerationState>,
): PvpRankingRegenerationState;

export function normalizePvpRankingRegeneration(value: unknown): PvpRankingRegenerationState;
export function pvpRankingRegenerationMessage(state: PvpRankingRegenerationState): string;
export function pvpRankingRegenerationToast(
  state: PvpRankingRegenerationState,
): { kind: "success" | "warning" | "error"; message: string } | null;

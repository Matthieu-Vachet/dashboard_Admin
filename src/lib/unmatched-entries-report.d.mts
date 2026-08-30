export const UNMATCHED_REASON_CODES: readonly string[];
export const unmatchedReasonLabels: Readonly<Record<string, string>>;

export type UnmatchedEntry = Record<string, unknown> & {
  provider: string;
  sourceId: unknown;
  name: unknown;
  sourceValue: unknown;
  reason: string;
  reasonDetails: unknown;
  candidates: unknown[];
  confidence: number;
  destination: unknown;
  status: string;
};

export function normalizeUnmatchedEntry(entry?: Record<string, unknown>, options?: { provider?: string }): UnmatchedEntry;
export function createUnmatchedEntriesReport(entries?: Array<Record<string, unknown>>, options?: { provider?: string; expectedCount?: number }): {
  schema: "UnmatchedEntriesReport@1";
  total: number;
  detailedCount: number;
  missingDetailCount: number;
  complete: boolean;
  entries: UnmatchedEntry[];
};

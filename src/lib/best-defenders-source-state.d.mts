export type BestDefendersSourceIssue = {
  code: "SOURCE_PROTECTED" | "SOURCE_TEMPORARILY_UNAVAILABLE" | "SOURCE_UNAVAILABLE" | "SOURCE_SCHEMA_CHANGED" | "VALIDATION_FAILED";
  title: string;
  message: string;
  preservation: string;
  retryable: boolean;
};

export function bestDefendersSourceIssue(value: unknown): BestDefendersSourceIssue | null;
export const sourceAvailabilityCodes: ReadonlySet<BestDefendersSourceIssue["code"]>;

export type BestDefendersSourceIssue = {
  code: "SOURCE_PROTECTED" | "SOURCE_TEMPORARILY_UNAVAILABLE";
  title: string;
  message: string;
  preservation: string;
  retryable: boolean;
};

export function bestDefendersSourceIssue(value: unknown): BestDefendersSourceIssue | null;
export const sourceAvailabilityCodes: ReadonlySet<BestDefendersSourceIssue["code"]>;

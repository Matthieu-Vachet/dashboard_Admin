import {
  actionError,
  readAdminActionResponse,
  type AdminActionErrorContract,
} from "@/lib/admin-action-errors";
import { createAdminOperationId } from "@/lib/admin-action-observability";

export type AdminActionStatus = "idle" | "running" | "success" | "partial" | "warning" | "failed";

export type AdminActionState<T = unknown> = {
  status: AdminActionStatus;
  operationId: string | null;
  data?: T;
  error?: AdminActionErrorContract;
};

type ExecuteAdminActionOptions<T> = {
  action: string;
  operation: (context: { signal: AbortSignal; operationId: string }) => Promise<T>;
  timeoutMs?: number;
  onState?: (state: AdminActionState<T>) => void;
  classify?: (value: T) => Exclude<AdminActionStatus, "idle" | "running" | "failed">;
  fallbackError?: string;
};

function candidateStatus(value: unknown) {
  if (!value || typeof value !== "object") return "";
  const record = value as Record<string, unknown>;
  const direct = String(record.status || "").toLowerCase();
  if (direct) return direct;
  return candidateStatus(record.data);
}

function defaultClassification(value: unknown): "success" | "partial" | "warning" {
  const status = candidateStatus(value);
  if (status.includes("partial")) return "partial";
  if (status.includes("warning") || status === "unchanged") return "warning";
  return "success";
}

export async function executeAdminAction<T>({
  action,
  operation,
  timeoutMs = 8 * 60_000,
  onState,
  classify = defaultClassification,
  fallbackError,
}: ExecuteAdminActionOptions<T>) {
  const operationId = createAdminOperationId(action);
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);
  onState?.({ status: "running", operationId });
  try {
    const data = await operation({ signal: controller.signal, operationId });
    const status = classify(data);
    onState?.({ status, operationId, data });
    return { data, operationId, status };
  } catch (error) {
    const normalized = actionError(
      controller.signal.aborted
        ? { code: "ADMIN_ACTION_TIMEOUT", message: "L’action a dépassé son délai d’attente.", cause: error }
        : error,
      fallbackError,
    );
    onState?.({ status: "failed", operationId, error: normalized.toJSON() });
    throw normalized;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}

export async function fetchAdminAction<T = unknown>(
  url: string,
  context: { signal: AbortSignal; operationId: string },
  init: RequestInit = {},
  fallback?: string,
) {
  const response = await fetch(url, {
    cache: "no-store",
    ...init,
    signal: context.signal,
    headers: {
      ...(init.headers || {}),
      "x-operation-id": context.operationId,
    },
  });
  return readAdminActionResponse<T>(response, fallback);
}

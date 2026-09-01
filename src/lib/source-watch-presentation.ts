export type SourceWatchPresentationItem = {
  name?: string;
  provider?: string | null;
  repo?: string;
  url?: string;
  remoteUrl?: string;
  checkedUrl?: string | null;
  status?: string;
  httpStatus?: number | null;
  metadataHttpStatus?: number | null;
  signature?: string | null;
  version?: string | null;
  commit?: string | null;
  contentHash?: string | null;
  snapshotCommit?: string | null;
  snapshotHash?: string | null;
  checkedAt?: string | null;
  message?: string | null;
  description?: string | null;
  category?: string;
  type?: string;
  monitoringState?: string;
  unreadChange?: boolean;
  lastChangedAt?: string | null;
};

export type SourceStatusFilter = "all" | "ok" | "warning" | "error";
export type SourceMonitoringFilter = "all" | "up-to-date" | "changed" | "error" | "never-checked";

function searchable(value: unknown) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr-FR");
}

export function sourceStatusKind(status: unknown): Exclude<SourceStatusFilter, "all"> {
  if (status === "ok") return "ok";
  if (status === "warning") return "warning";
  return "error";
}

export function sourceStatusLabel(status: unknown) {
  const kind = sourceStatusKind(status);
  if (kind === "ok") return "Opérationnelle";
  if (kind === "warning") return "À surveiller";
  return "Indisponible";
}

export function sourceCause(source: SourceWatchPresentationItem) {
  const message = String(source.message || source.description || "").trim();
  if (sourceStatusKind(source.status) === "ok") return message || "Source distante accessible.";
  if (/HTTP 403/i.test(message)) return "Accès distant refusé (HTTP 403). La source reste enregistrée et sera contrôlée au prochain passage.";
  if (/HTTP 429/i.test(message)) return "Quota distant temporairement atteint (HTTP 429). Nouvelle vérification recommandée plus tard.";
  if (/HTTP 5\d\d/i.test(message)) return "Service distant temporairement indisponible. La source reste sous surveillance.";
  if (/timeout|aborted/i.test(message)) return "Le contrôle distant a dépassé le délai autorisé. La source reste sous surveillance.";
  return message || "Le contrôle distant n’a pas fourni de diagnostic exploitable.";
}

export function sourceSignature(source: SourceWatchPresentationItem) {
  return String(source.signature || source.version || "").trim();
}

export function sourceMatchesQuery(source: SourceWatchPresentationItem, query: string) {
  const needle = searchable(query).trim();
  if (!needle) return true;
  return [
    source.name,
    source.provider,
    source.repo,
    source.url,
    source.remoteUrl,
    source.checkedUrl,
    source.message,
    source.description,
    source.category,
    source.type,
    source.signature,
    source.version,
    source.commit,
    source.contentHash,
    source.snapshotCommit,
    source.snapshotHash,
  ].some((value) => searchable(value).includes(needle));
}

export function sourceMatchesStatus(source: SourceWatchPresentationItem, status: SourceStatusFilter) {
  return status === "all" || sourceStatusKind(source.status) === status;
}

export function sourceMonitoringKind(source: SourceWatchPresentationItem): Exclude<SourceMonitoringFilter, "all"> {
  if (source.monitoringState === "error") return "error";
  if (source.monitoringState === "never-checked") return "never-checked";
  if (source.monitoringState === "changed" || source.unreadChange) return "changed";
  if (source.monitoringState === "up-to-date") return "up-to-date";
  if (source.status === "ok") return "up-to-date";
  if (source.status) return "error";
  return "never-checked";
}

export function sourceMonitoringLabel(source: SourceWatchPresentationItem) {
  const kind = sourceMonitoringKind(source);
  if (kind === "changed") return "Changement détecté";
  if (kind === "error") return "Erreur";
  if (kind === "never-checked") return "Jamais vérifiée";
  return "À jour";
}

export function sourceMatchesMonitoring(source: SourceWatchPresentationItem, status: SourceMonitoringFilter) {
  if (status === "all") return true;
  if (status === "changed") return source.unreadChange === true || sourceMonitoringKind(source) === "changed";
  return sourceMonitoringKind(source) === status;
}

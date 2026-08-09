const sourceAvailabilityCodes = new Set([
  "SOURCE_PROTECTED",
  "SOURCE_TEMPORARILY_UNAVAILABLE",
]);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function candidates(value) {
  const roots = [];
  let current = value;
  for (let depth = 0; depth < 4 && isRecord(current); depth += 1) {
    roots.push(current);
    current = current.data;
  }
  return roots.flatMap((root) => [
    root,
    isRecord(root.run) ? root.run : null,
    isRecord(root.sourceAvailability) ? root.sourceAvailability : null,
    isRecord(root.meta?.diagnostics?.sourceAvailability) ? root.meta.diagnostics.sourceAvailability : null,
    isRecord(root.current?.diagnostics?.sourceAvailability) ? root.current.diagnostics.sourceAvailability : null,
    ...(Array.isArray(root.errors) ? root.errors.filter(isRecord) : []),
    ...(Array.isArray(root.run?.errors) ? root.run.errors.filter(isRecord) : []),
  ].filter(Boolean));
}

export function bestDefendersSourceIssue(value) {
  const issue = candidates(value).find((candidate) => sourceAvailabilityCodes.has(
    String(candidate.code || "").trim().toUpperCase(),
  ));
  if (!issue) return null;
  const code = String(issue.code).trim().toUpperCase();
  const protectedSource = code === "SOURCE_PROTECTED";
  return {
    code,
    title: protectedSource
      ? "Source protégée par le fournisseur"
      : "Source temporairement indisponible",
    message: String(issue.message || (protectedSource
      ? "Pokémon GO Hub exige actuellement un challenge Cloudflare."
      : "Pokémon GO Hub ne fournit pas actuellement une page exploitable.")),
    preservation: String(issue.preservation || issue.details?.preservation || "La dernière version MongoDB validée reste active."),
    retryable: Boolean(issue.retryable ?? issue.details?.retryable),
  };
}

export { sourceAvailabilityCodes };

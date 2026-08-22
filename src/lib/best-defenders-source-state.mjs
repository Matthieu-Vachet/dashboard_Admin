const sourceAvailabilityCodes = new Set([
  "SOURCE_PROTECTED",
  "SOURCE_TEMPORARILY_UNAVAILABLE",
  "SOURCE_UNAVAILABLE",
  "SOURCE_SCHEMA_CHANGED",
  "VALIDATION_FAILED",
]);

const issueCopy = {
  SOURCE_PROTECTED: {
    title: "Source protégée par le fournisseur",
    message: "Pokémon GO Hub exige actuellement un challenge Cloudflare.",
  },
  SOURCE_TEMPORARILY_UNAVAILABLE: {
    title: "Source temporairement indisponible",
    message: "Pokémon GO Hub ne fournit pas actuellement une page exploitable.",
  },
  SOURCE_UNAVAILABLE: {
    title: "Source indisponible",
    message: "Pokémon GO Hub ne répond pas actuellement.",
  },
  SOURCE_SCHEMA_CHANGED: {
    title: "Structure de la source modifiée",
    message: "La page Pokémon GO Hub ne respecte plus le contrat analysé.",
  },
  VALIDATION_FAILED: {
    title: "Capture fournisseur rejetée",
    message: "La nouvelle capture n'a pas passé les contrôles qualité.",
  },
};

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
  const copy = issueCopy[code];
  return {
    code,
    title: copy.title,
    message: String(issue.message || copy.message),
    preservation: String(issue.preservation || issue.details?.preservation || "La dernière version MongoDB validée reste active."),
    retryable: Boolean(issue.retryable ?? issue.details?.retryable),
  };
}

export { sourceAvailabilityCodes };

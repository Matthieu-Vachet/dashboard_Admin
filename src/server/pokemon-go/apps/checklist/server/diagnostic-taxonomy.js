const DIAGNOSTIC_CATEGORIES = Object.freeze([
  "schema",
  "pokemon-pvpoke-mapping",
  "move-mapping",
  "movepool",
  "source",
  "release-metadata",
  "type",
  "reference",
  "architecture",
]);
const DIAGNOSTIC_SEVERITIES = Object.freeze(["error", "warning", "info"]);

function diagnosticCategory(diagnostic = {}) {
  const code = String(diagnostic.issue || "").toLowerCase();
  const path = String(diagnostic.path || "").toLowerCase();
  if (code.startsWith("release_") || path.includes("shinyavailability")) return "release-metadata";
  if (code === "type") return "type";
  if (/pvp_(?:pokemon_)?mapping|pokemon.*mapping|provider_collision/.test(code) && !code.includes("move")) return "pokemon-pvpoke-mapping";
  if (/pvp_move_mapping|move_metrics|move_category/.test(code)) return "move-mapping";
  if (/provider_source|snapshot|freshness|license|source_mismatch/.test(code)) return "source";
  if (/moveset|movepool|elite_move/.test(code)) return "movepool";
  if (/ref_|reference|orphan/.test(code) || /(?:^|\.)pvpref$/.test(path)) return "reference";
  if (["missing", "unexpected", "value"].includes(code) || code.includes("schema")) return "schema";
  if (/architecture|manifest|collision|category|identity_mismatch|hash_mismatch|bytes_mismatch/.test(code)) return "architecture";
  return diagnostic.category === "custom" ? "schema" : "architecture";
}

function diagnosticSeverity(diagnostic = {}) {
  const explicit = String(diagnostic.severity || "").toLowerCase();
  if (DIAGNOSTIC_SEVERITIES.includes(explicit)) return explicit;
  const code = String(diagnostic.issue || "").toLowerCase();
  if (/mapping_missing|movepool|source|release_/.test(code)) return "warning";
  if (["missing", "type", "unexpected", "value"].includes(code)) return "error";
  return "warning";
}

function enrichDiagnostic(diagnostic = {}) {
  return {
    ...diagnostic,
    diagnosticCategory: diagnostic.diagnosticCategory || diagnosticCategory(diagnostic),
    severity: diagnosticSeverity(diagnostic),
  };
}

function categoryCounts(diagnostics = []) {
  const counts = Object.fromEntries(DIAGNOSTIC_CATEGORIES.map((category) => [category, { error: 0, warning: 0, info: 0, total: 0 }]));
  for (const raw of diagnostics) {
    const diagnostic = enrichDiagnostic(raw);
    const target = counts[diagnostic.diagnosticCategory] || counts.architecture;
    target[diagnostic.severity] += 1;
    target.total += 1;
  }
  return counts;
}

module.exports = {
  DIAGNOSTIC_CATEGORIES,
  DIAGNOSTIC_SEVERITIES,
  categoryCounts,
  diagnosticCategory,
  diagnosticSeverity,
  enrichDiagnostic,
};

const { z } = require("zod");

const auditKindSchema = z.enum(["available", "shiny", "costume", "shadow"]);
const auditStatusSchema = z.enum([
  "up-to-date",
  "divergence",
  "external-only",
  "local-only",
  "identity-ambiguous",
  "identity-unresolved",
  "parse-error",
  "source-unavailable",
  "not-verified",
  "ignored",
  "false-positive",
  "manual-match",
]);
const comparisonSchema = z.object({
  field: z.string().min(1),
  externalValue: z.unknown(),
  localValue: z.unknown(),
  matches: z.boolean(),
  reason: z.string().min(1),
});
const candidateSchema = z.object({
  canonicalId: z.string().nullable().optional(),
  dexId: z.string().nullable().optional(),
  displayName: z.string().nullable().optional(),
  form: z.string().nullable().optional(),
  costume: z.string().nullable().optional(),
  file: z.string().nullable().optional(),
}).passthrough();
const auditRowSchema = z.object({
  sourceKey: z.string().nullable().optional(),
  localKey: z.string().nullable().optional(),
  dexId: z.string().nullable().optional(),
  effectiveDexId: z.string().nullable().optional(),
  canonicalId: z.string().nullable().optional(),
  sourceName: z.string().nullable().optional(),
  sourceNormalizedName: z.string().nullable().optional(),
  sourceForm: z.string().nullable().optional(),
  sourceCostume: z.string().nullable().optional(),
  normalizationStatus: z.enum(["normalized", "failed"]).optional(),
  status: auditStatusSchema,
  businessStatus: z.string().optional(),
  resolutionStatus: z.string().optional(),
  resolutionStrategy: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  diagnostics: z.array(z.string()).default([]),
  comparisons: z.array(comparisonSchema).default([]),
  candidates: z.array(candidateSchema).default([]),
}).passthrough();
const auditPayloadSchema = z.object({
  kind: auditKindSchema,
  source: z.object({ status: z.enum(["success", "source-unavailable"]), fetchedAt: z.string().datetime() }).passthrough(),
  provenance: z.object({ rawSha256: z.string().length(64).nullable(), parser: z.string().min(1), writePolicy: z.literal("read-only"), identityAuthority: z.string().min(1) }),
  definitions: z.object({ statuses: z.record(z.string(), z.string()), counters: z.record(z.string(), z.string()) }),
  stats: z.object({
    externalEntries: z.number().int().nonnegative(),
    resolvedIdentities: z.number().int().nonnegative(),
    uniqueResolvedIdentities: z.number().int().nonnegative(),
    upToDate: z.number().int().nonnegative(),
    divergences: z.number().int().nonnegative(),
    ambiguous: z.number().int().nonnegative(),
    unresolved: z.number().int().nonnegative(),
    parseErrors: z.number().int().nonnegative(),
    externalOnly: z.number().int().nonnegative(),
    localOnly: z.number().int().nonnegative(),
    notVerified: z.number().int().nonnegative(),
    sourceUnavailable: z.number().int().nonnegative(),
    totalResults: z.number().int().nonnegative(),
    byStatus: z.record(z.string(), z.number().int().nonnegative()),
  }),
  parsing: z.object({ accepted: z.number().int().nonnegative(), errors: z.number().int().nonnegative() }),
  rows: z.array(auditRowSchema),
});

function validateAuditPayload(payload) {
  return auditPayloadSchema.parse(payload);
}

module.exports = { auditKindSchema, auditPayloadSchema, auditRowSchema, auditStatusSchema, validateAuditPayload };

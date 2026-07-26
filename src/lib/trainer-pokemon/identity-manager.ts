import "server-only";
import type { TrainerPokemon, TrainerPokemonDiagnostic } from "@/types/admin/trainer-pokemon";

type Resolution = {
  status?: string;
  reason?: string | null;
  identityResolution?: {
    status?: string;
    reason?: string | null;
    confidence?: number;
    strategy?: string;
    candidates?: unknown[];
    identity?: { identityId?: string; canonicalId?: string; pokemonId?: number; form?: string | null; costume?: string | null };
  };
  assetResolution?: { status?: string; reason?: string | null; resolvedImage?: string | null; image?: string | null; shinyImage?: string | null; assetBundle?: string | null };
};

const defaultPokemonApiUrl = "https://pokemon-go-api.vercel.app";

function apiConfiguration() {
  const baseUrl = process.env.POKEMON_API_PUBLIC_URL || process.env.POKEMON_API_URL || defaultPokemonApiUrl;
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET || "";
  return { baseUrl, secret };
}

function rawAlias(entry: TrainerPokemon) {
  return entry.costume || entry.form || entry.sourceName || String(entry.dexNumber);
}

function diagnosticSourceId(entry: TrainerPokemon) {
  return [
    `pokemon:${String(entry.dexNumber).padStart(4, "0")}`,
    `form:${entry.form || "none"}`,
    `costume:${entry.costume || "none"}`,
    `gender:${entry.gender || "unknown"}`,
    `shiny:${entry.shiny ? 1 : 0}`,
  ].join("|");
}

function requests(entries: TrainerPokemon[]) {
  return entries.map((entry) => ({
    provider: "ma-collection",
    rawAlias: rawAlias(entry),
    pokemonId: entry.dexNumber,
    form: entry.form,
    costume: entry.costume,
    isFemale: entry.gender === "FEMALE",
    isShiny: entry.shiny,
    alignment: entry.alignment,
  }));
}

async function apiRequest(path: string, body: unknown) {
  const { baseUrl, secret } = apiConfiguration();
  if (!secret) throw new Error("POKEMON_API_ADMIN_SECRET absent");
  const response = await fetch(new URL(path, baseUrl), {
    method: "POST",
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
    headers: { accept: "application/json", "content-type": "application/json", "x-api-admin-secret": secret },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `Identity Manager HTTP ${response.status}`);
  return payload;
}

function diagnosticCode(resolution: Resolution) {
  if (resolution.identityResolution?.status === "ambiguous") return "IDENTITY_AMBIGUOUS" as const;
  if (resolution.identityResolution?.status !== "matched") return "IDENTITY_UNMATCHED" as const;
  return "CANONICAL_ASSET_MISSING" as const;
}

function diagnosticReason(entry: TrainerPokemon, resolution: Resolution) {
  if (resolution.identityResolution?.status === "ambiguous") return "multiple-candidates";
  if (entry.costume) return "unknown-costume";
  if (entry.form) return "unknown-form";
  if (resolution.identityResolution?.status !== "matched") return "unknown-alias";
  return "missing-local-match";
}

async function recordDiagnostics(entries: TrainerPokemon[], resolutions: Resolution[]) {
  const groups = new Map<string, Record<string, unknown>>();
  resolutions.forEach((resolution, index) => {
    if (resolution.status === "matched") return;
    const entry = entries[index];
    const alias = rawAlias(entry);
    const reason = diagnosticReason(entry, resolution);
    const key = [alias, entry.dexNumber, entry.form, entry.costume, entry.gender, entry.shiny, reason].join("|");
    const previous = groups.get(key);
    groups.set(key, {
      provider: "ma-collection",
      sourceId: diagnosticSourceId(entry),
      rawAlias: alias,
      pokemonId: entry.dexNumber,
      pokemon: entry.sourceName,
      form: entry.form,
      costume: entry.costume,
      reason,
      confidence: resolution.identityResolution?.confidence || 0,
      candidates: resolution.identityResolution?.candidates || [],
      occurrences: Number(previous?.occurrences || 0) + 1,
      proposedAction: resolution.identityResolution?.status === "ambiguous" ? "review-candidates" : "associate",
      sourcePayload: { provider: "ma-collection", rawAlias: alias, gender: entry.gender, shiny: entry.shiny, reason: resolution.reason || resolution.identityResolution?.reason || null },
    });
  });
  const diagnostics = [...groups.values()];
  for (let index = 0; index < diagnostics.length; index += 500) {
    await apiRequest("/api/v1/admin/pokemon-identities/diagnostics/batch", { entries: diagnostics.slice(index, index + 500) });
  }
}

export async function resolveTrainerPokemonIdentities(entries: TrainerPokemon[], { persistDiagnostics = false } = {}) {
  const input = requests(entries);
  const chunks = Array.from({ length: Math.ceil(input.length / 500) }, (_value, index) => input.slice(index * 500, index * 500 + 500));
  const responses = await Promise.all(chunks.map((chunk) => apiRequest("/api/v1/admin/pokemon-identities/resolve-assets", { requests: chunk })));
  const resolutions = responses.flatMap((response) => Array.isArray(response.data) ? response.data : []) as Resolution[];
  if (resolutions.length !== entries.length) throw new Error(`Identity Manager a retourné ${resolutions.length}/${entries.length} résolutions.`);
  if (persistDiagnostics) await recordDiagnostics(entries, resolutions);
  const diagnostics: TrainerPokemonDiagnostic[] = [];
  const resolvedEntries = entries.map((entry, index) => {
    const resolution = resolutions[index];
    const identity = resolution.identityResolution?.identity;
    const asset = resolution.assetResolution;
    if (resolution.status !== "matched") diagnostics.push({
      code: diagnosticCode(resolution),
      path: `$.fileData[${JSON.stringify(entry.sourceId)}].${entry.costume ? "mon_costume" : "mon_form"}`,
      sourceId: entry.sourceId,
      provider: "ma-collection",
      rawAlias: rawAlias(entry),
      reason: diagnosticReason(entry, resolution),
      occurrences: 1,
      message: resolution.identityResolution?.status !== "matched"
        ? `Identity Manager : ${resolution.identityResolution?.reason || resolution.identityResolution?.status || "alias non résolu"}.`
        : `Asset canonique exact absent : ${asset?.reason || resolution.reason || "missing-local-match"}.`,
    });
    return {
      ...entry,
      identityProvider: "ma-collection" as const,
      rawAlias: rawAlias(entry),
      canonicalId: identity?.canonicalId || null,
      identityId: identity?.identityId || null,
      identityStatus: resolution.status || resolution.identityResolution?.status || "unmatched",
      identityReason: resolution.reason || resolution.identityResolution?.reason || asset?.reason || null,
      identityConfidence: Number(resolution.identityResolution?.confidence || 0),
      image: resolution.status === "matched" ? asset?.resolvedImage || null : null,
      imageMatch: resolution.status === "matched" ? "exact" as const : "missing" as const,
      matchedForm: identity?.form || entry.matchedForm || null,
      matchedCostume: identity?.costume || entry.matchedCostume || null,
      matchedSource: resolution.status === "matched" ? "identity-manager" : entry.matchedSource,
      resolutionStatus: resolution.status === "matched" ? "matched" as const : "missing-asset" as const,
    };
  });
  return { entries: resolvedEntries, diagnostics };
}

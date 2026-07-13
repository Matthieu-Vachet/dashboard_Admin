import type {
  NormalizedTrainerPokemonMove,
  TrainerPokemon,
  TrainerPokemonAlignment,
  TrainerPokemonDiagnostic,
  TrainerPokemonDiagnosticCode,
  TrainerPokemonGender,
  TrainerPokemonImportFile,
  TrainerPokemonImportPreview,
  TrainerPokemonStats,
} from "@/types/admin/trainer-pokemon";
import type {
  TrainerPokemonMoveReference,
  TrainerPokemonReferences,
  TrainerPokemonSpeciesReference,
  TrainerPokemonTypeReference,
} from "@/lib/trainer-pokemon/references";
import { stableTrainerPokemonChecksum } from "./schema.ts";

const diagnosticLimit = 2_000;

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

export function normalizeSearchValue(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("fr")
    .trim();
}

function referenceNames(reference: { names?: { French?: string; English?: string }; data?: { names?: { French?: string; English?: string } } }) {
  return reference.names || reference.data?.names || {};
}

function referenceAssets(reference: TrainerPokemonSpeciesReference) {
  return reference.data?.assets || {};
}

function referenceTypes(reference?: TrainerPokemonSpeciesReference) {
  return {
    primaryType: reference?.data?.primaryType ? String(reference.data.primaryType).toUpperCase() : null,
    secondaryType: reference?.data?.secondaryType ? String(reference.data.secondaryType).toUpperCase() : null,
  };
}

function normalizedAssetToken(value: unknown) {
  return String(value || "").trim().toUpperCase();
}

function assetUrl(reference: TrainerPokemonSpeciesReference | undefined, shiny: boolean) {
  if (!reference) return null;
  const assets = referenceAssets(reference);
  return shiny ? assets.shinyImage || null : assets.image || null;
}

function costumeAsset(
  reference: TrainerPokemonSpeciesReference | undefined,
  rawForm: string | null,
  costume: string,
  gender: TrainerPokemonGender,
  shiny: boolean,
) {
  const costumeToken = normalizedAssetToken(costume);
  const formToken = normalizedAssetToken(rawForm).replace(/_NORMAL$/, "");
  const variants = (reference?.data?.assetForms || []).filter((asset) => {
    if (normalizedAssetToken(asset.costume) !== costumeToken) return false;
    const assetForm = normalizedAssetToken(asset.form);
    return !assetForm || !formToken || assetForm === formToken || formToken.endsWith(`_${assetForm}`);
  });
  const ordered = [...variants].sort((left, right) => {
    const leftGender = gender === "FEMALE" ? left.isFemale === true : left.isFemale !== true;
    const rightGender = gender === "FEMALE" ? right.isFemale === true : right.isFemale !== true;
    return Number(rightGender) - Number(leftGender);
  });
  const selected = ordered.find((asset) => shiny ? Boolean(asset.shinyImage) : Boolean(asset.image));
  return shiny ? selected?.shinyImage || null : selected?.image || null;
}

function resolvePokemonAsset(
  candidates: TrainerPokemonSpeciesReference[],
  reference: TrainerPokemonSpeciesReference | undefined,
  exactReference: boolean,
  rawForm: string | null,
  costume: string | null,
  gender: TrainerPokemonGender,
  shiny: boolean,
) {
  if (costume && reference) {
    const exact = costumeAsset(reference, rawForm, costume, gender, shiny);
    if (exact) return { image: exact, imageMatch: "exact" as const };
  }

  const formImage = assetUrl(reference, shiny);
  if (formImage) {
    return {
      image: formImage,
      imageMatch: exactReference && !costume ? "exact" as const : "form" as const,
    };
  }

  const normal = candidates.find((candidate) => String(candidate.form || "").toLowerCase() === "normal");
  const normalImage = assetUrl(normal, shiny);
  if (normalImage) return { image: normalImage, imageMatch: "normal" as const };

  const base = candidates.find((candidate) => candidate.id && candidate.formId === candidate.id) || candidates[0];
  const baseImage = assetUrl(base, shiny);
  if (baseImage) return { image: baseImage, imageMatch: "base" as const };

  return { image: null, imageMatch: "missing" as const };
}

function typeData(reference: TrainerPokemonTypeReference) {
  return {
    names: reference.names || reference.data?.names || {},
    assets: reference.assets || reference.data?.assets || {},
  };
}

function buildReferenceIndexes(references: TrainerPokemonReferences) {
  const pokemonByDex = new Map<number, TrainerPokemonSpeciesReference[]>();
  for (const pokemon of references.pokemon) {
    if (!Number.isInteger(pokemon.dexNr)) continue;
    const list = pokemonByDex.get(pokemon.dexNr!) || [];
    list.push(pokemon);
    pokemonByDex.set(pokemon.dexNr!, list);
  }

  const moves = new Map<string, TrainerPokemonMoveReference>();
  for (const move of references.moves) {
    const names = referenceNames(move);
    const keys = [move.id, move.slug, names.French, names.English, ...(move.legacySlugs || [])];
    for (const key of keys) if (key) moves.set(normalizeSearchValue(key), move);
  }

  const types = new Map<string, TrainerPokemonTypeReference>();
  for (const type of references.types) if (type.id) types.set(type.id.toUpperCase(), type);
  return { pokemonByDex, moves, types };
}

function exactPokemonReference(candidates: TrainerPokemonSpeciesReference[], rawForm: string | null) {
  const normalizedForm = rawForm?.toUpperCase() || null;
  if (normalizedForm) {
    const exact = candidates.find((candidate) => {
      const keys = [
        candidate.key,
        candidate.formId,
        candidate.id,
        candidate.id && candidate.form ? `${candidate.id}_${candidate.form}` : null,
      ].filter(Boolean).map((value) => String(value).toUpperCase());
      return keys.includes(normalizedForm) || (normalizedForm.endsWith("_NORMAL") && keys.includes(normalizedForm.slice(0, -7)));
    });
    if (exact) return { reference: exact, exact: true };
  }
  const normal = candidates.find((candidate) => candidate.form === "normal") || candidates[0];
  return { reference: normal, exact: !rawForm || rawForm.endsWith("_NORMAL") };
}

function normalizeGender(value: unknown): TrainerPokemonGender {
  return value === "MALE" || value === "FEMALE" || value === "GENDERLESS" ? value : "UNKNOWN";
}

function normalizeAlignment(value: unknown): TrainerPokemonAlignment {
  if (value === undefined || value === null || value === "" || value === "NORMAL") return "NORMAL";
  return value === "SHADOW" || value === "PURIFIED" ? value : "UNKNOWN";
}

function normalizeMove(
  sourceName: string,
  fallbackCategory: "fast" | "charged",
  indexes: ReturnType<typeof buildReferenceIndexes>,
  path: string,
  sourceId: string,
  addDiagnostic: (diagnostic: TrainerPokemonDiagnostic) => void,
): NormalizedTrainerPokemonMove {
  const reference = indexes.moves.get(normalizeSearchValue(sourceName));
  if (!reference) {
    addDiagnostic({ code: "UNKNOWN_MOVE", path, sourceId, message: `Attaque introuvable : ${sourceName}.` });
    return { sourceName, name: sourceName, type: null, typeName: null, typeIcon: null, category: "unknown", resolved: false };
  }
  const type = String(reference.type || reference.data?.type || "").toUpperCase() || null;
  const typeReference = type ? indexes.types.get(type) : null;
  const typeReferenceData = typeReference ? typeData(typeReference) : null;
  const kind = reference.kind || reference.data?.kind;
  return {
    sourceName,
    name: referenceNames(reference).French || sourceName,
    type,
    typeName: typeReferenceData?.names.French || type,
    typeIcon: typeReferenceData?.assets.icon || null,
    category: kind === "fast" || kind === "charged" ? kind : fallbackCategory,
    resolved: true,
  };
}

export function emptyTrainerPokemonStats(): TrainerPokemonStats {
  return { total: 0, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 0 };
}

export function normalizeTrainerPokemonImport(
  file: TrainerPokemonImportFile,
  references: TrainerPokemonReferences,
): { entries: TrainerPokemon[]; preview: TrainerPokemonImportPreview } {
  const indexes = buildReferenceIndexes(references);
  const diagnostics: TrainerPokemonDiagnostic[] = [];
  const diagnosticCounts = {
    UNKNOWN_GENDER: 0,
    UNKNOWN_ALIGNMENT: 0,
    PARTIAL_FORM_MATCH: 0,
    ASSET_FALLBACK: 0,
    UNKNOWN_MOVE: 0,
    MISSING_ASSET: 0,
  } satisfies Record<TrainerPokemonDiagnosticCode, number>;
  const addDiagnostic = (diagnostic: TrainerPokemonDiagnostic) => {
    diagnosticCounts[diagnostic.code] += 1;
    if (diagnostics.length < diagnosticLimit) diagnostics.push(diagnostic);
  };

  const entries = Object.entries(file.fileData).map(([sourceId, unknownEntry]) => {
    const raw = asRecord(unknownEntry);
    const basePath = `$.fileData[${JSON.stringify(sourceId)}]`;
    const dexNumber = Number(raw.mon_number);
    const form = typeof raw.mon_form === "string" && raw.mon_form.trim() ? raw.mon_form.trim() : null;
    const costume = typeof raw.mon_costume === "string" && raw.mon_costume.trim() ? raw.mon_costume.trim() : null;
    const candidates = indexes.pokemonByDex.get(dexNumber) || [];
    const match = exactPokemonReference(candidates, form);
    if (!match.reference || !match.exact) {
      addDiagnostic({
        code: "PARTIAL_FORM_MATCH",
        path: `${basePath}.mon_form`,
        sourceId,
        message: match.reference
          ? `Forme exacte introuvable (${form}); le nom français de l’espèce est conservé.`
          : `Pokémon #${dexNumber} introuvable dans le référentiel canonique; le nom source est conservé.`,
      });
    }

    const sourceName = String(raw.mon_name);
    const specialForm = Boolean(form && !form.toUpperCase().endsWith("_NORMAL"));
    const frenchName = match.reference ? referenceNames(match.reference).French || sourceName : sourceName;
    const gender = normalizeGender(raw.mon_gender);
    if (gender === "UNKNOWN") addDiagnostic({ code: "UNKNOWN_GENDER", path: `${basePath}.mon_gender`, sourceId, message: "Genre absent ou inconnu." });
    const alignment = normalizeAlignment(raw.mon_alignment);
    if (alignment === "UNKNOWN") addDiagnostic({ code: "UNKNOWN_ALIGNMENT", path: `${basePath}.mon_alignment`, sourceId, message: `Alignement inconnu : ${String(raw.mon_alignment)}.` });

    const shiny = raw.mon_isShiny === "YES";
    const resolvedAsset = resolvePokemonAsset(candidates, match.reference, match.exact, form, costume, gender, shiny);
    if (resolvedAsset.image && resolvedAsset.imageMatch !== "exact") {
      addDiagnostic({
        code: "ASSET_FALLBACK",
        path: `${basePath}.${costume ? "mon_costume" : "mon_form"}`,
        sourceId,
        message: `Asset exact introuvable; fallback ${resolvedAsset.imageMatch} utilisé pour ${shiny ? "la variante chromatique" : "la variante normale"}.`,
      });
    }
    if (!resolvedAsset.image) {
      addDiagnostic({
        code: "MISSING_ASSET",
        path: `${basePath}.${costume ? "mon_costume" : "mon_form"}`,
        sourceId,
        message: costume
          ? `Asset exact du costume ${costume} non résolu; placeholder officiel utilisé.`
          : `Asset ${shiny ? "chromatique" : "normal"} exact introuvable; placeholder officiel utilisé.`,
      });
    }

    const fastMove = normalizeMove(String(raw.mon_move_1), "fast", indexes, `${basePath}.mon_move_1`, sourceId, addDiagnostic);
    const chargedMoves = [raw.mon_move_2, raw.mon_move_3]
      .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))
      .map((value, index) => normalizeMove(value, "charged", indexes, `${basePath}.mon_move_${index + 2}`, sourceId, addDiagnostic));
    const attackIv = Number(raw.mon_attack);
    const defenseIv = Number(raw.mon_defence);
    const staminaIv = Number(raw.mon_stamina);
    const ivTotal = attackIv + defenseIv + staminaIv;
    const nickname = typeof raw.mon_nickname === "string" && raw.mon_nickname.length ? raw.mon_nickname : null;
    const searchText = normalizeSearchValue([
      frenchName, nickname, dexNumber, sourceName, form, costume, fastMove.name,
      ...chargedMoves.flatMap((move) => [move.name, move.sourceName]),
    ].filter(Boolean).join(" "));

    return {
      sourceId,
      dexNumber,
      sourceName,
      frenchName,
      nickname,
      form,
      specialForm,
      costume,
      alignment,
      gender,
      shiny,
      lucky: raw.mon_isLucky === "YES",
      cp: Number(raw.mon_cp),
      attackIv,
      defenseIv,
      staminaIv,
      ivTotal,
      ivPercent: Math.round((ivTotal / 45) * 10_000) / 100,
      weightKg: Number(raw.mon_weight),
      heightM: Number(raw.mon_height),
      fastMove,
      chargedMoves,
      ...referenceTypes(match.reference),
      image: resolvedAsset.image,
      imageMatch: resolvedAsset.imageMatch,
      searchText,
    } satisfies TrainerPokemon;
  });

  const stats = entries.reduce((result, entry) => {
    result.total += 1;
    if (entry.shiny) result.shiny += 1;
    if (entry.lucky) result.lucky += 1;
    if (entry.ivTotal === 45) result.perfect += 1;
    if (entry.alignment === "SHADOW") result.shadow += 1;
    if (entry.alignment === "PURIFIED") result.purified += 1;
    if (entry.costume) result.costume += 1;
    return result;
  }, emptyTrainerPokemonStats());

  return {
    entries,
    preview: {
      sourceFileName: file.fileName,
      sourceExportTime: file.exportTime,
      sourceExportTimestamp: file.exportTimestamp,
      sourceVersion: file.version,
      declaredPokemonCount: file.pokemonCount,
      actualPokemonCount: entries.length,
      validPokemonCount: entries.length,
      checksum: stableTrainerPokemonChecksum(file),
      diagnostics,
      diagnosticCounts,
      stats,
    },
  };
}

export function enrichTrainerPokemonEntries(
  entries: TrainerPokemon[],
  references: TrainerPokemonReferences,
) {
  const indexes = buildReferenceIndexes(references);
  return entries.map((entry) => {
    const candidates = indexes.pokemonByDex.get(entry.dexNumber) || [];
    const match = exactPokemonReference(candidates, entry.form);
    const resolvedAsset = resolvePokemonAsset(
      candidates,
      match.reference,
      match.exact,
      entry.form,
      entry.costume,
      entry.gender,
      entry.shiny,
    );
    return {
      ...entry,
      ...referenceTypes(match.reference),
      image: resolvedAsset.image,
      imageMatch: resolvedAsset.imageMatch,
    };
  });
}

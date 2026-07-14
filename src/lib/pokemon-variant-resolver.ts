export type PokemonVariantAsset = {
  form?: string | null;
  costume?: string | null;
  isFemale?: boolean | null;
  image?: string | null;
  shinyImage?: string | null;
};

export type PokemonVariantRequest = {
  id?: string | number | null;
  form?: string | null;
  costume?: string | null;
  isFemale?: boolean | null;
  shiny?: boolean | null;
  shadow?: boolean | null;
  purified?: boolean | null;
  mega?: boolean | null;
  gigantamax?: boolean | null;
  dynamax?: boolean | null;
};

export type PokemonVariantResolution = {
  image: string | null;
  shinyImage: string | null;
  assetVariant: PokemonVariantAsset | null;
  status: "matched" | "missing-asset";
  source: "asset-form" | "primary-assets" | "pre-resolved" | "missing";
  explicitVariant: boolean;
  request: Required<PokemonVariantRequest>;
};

type UnknownRecord = Record<string, unknown>;

const baseFormTokens = new Set(["", "NORMAL", "BASE", "STANDARD", "DEFAULT"]);

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as UnknownRecord
    : {};
}

function text(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  return normalized || null;
}

function image(value: unknown): string | null {
  return text(value);
}

export function normalizePokemonVariantToken(value: unknown): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
}

function uniqueTokens(values: unknown[]): string[] {
  return [...new Set(values.map(normalizePokemonVariantToken).filter(Boolean))];
}

function speciesTokens(pokemon: UnknownRecord, requestId: unknown): string[] {
  const identity = record(pokemon.identity);
  const names = record(pokemon.names);
  const data = record(pokemon.data);
  const dataNames = record(data.names);
  const canonical = uniqueTokens([
    pokemon.baseFormId,
    identity.pokemon,
    data.baseFormId,
  ]);
  const identifiers = canonical.length
    ? canonical
    : uniqueTokens([requestId, pokemon.id, pokemon.pokemonId]);
  return uniqueTokens([
    ...identifiers,
    names.English,
    names.French,
    dataNames.English,
    dataNames.French,
  ]);
}

function withoutSpeciesPrefix(value: string, species: string[]): string {
  for (const prefix of species.sort((left, right) => right.length - left.length)) {
    if (value === prefix) return "";
    if (value.startsWith(`${prefix}_`)) return value.slice(prefix.length + 1);
  }
  return value;
}

function tokensMatch(leftValue: unknown, rightValue: unknown, species: string[]): boolean {
  const left = normalizePokemonVariantToken(leftValue);
  const right = normalizePokemonVariantToken(rightValue);
  if (!left || !right) return false;
  if (left === right) return true;
  return withoutSpeciesPrefix(left, species) === withoutSpeciesPrefix(right, species);
}

function boolean(value: unknown): boolean {
  return value === true || String(value || "").toUpperCase() === "FEMALE";
}

function firstDefined<T>(...values: Array<T | undefined | null>): T | null {
  return values.find((value) => value !== undefined && value !== null) ?? null;
}

function normalizedRequest(pokemon: UnknownRecord, overrides: PokemonVariantRequest): Required<PokemonVariantRequest> {
  const identity = record(pokemon.identity);
  const raw = record(identity.raw);
  const attributes = record(raw.rawAttributes);
  const gender = firstDefined(overrides.isFemale, pokemon.isFemale, identity.isFemale, attributes.isFemale, pokemon.gender);
  return {
    id: text(firstDefined(overrides.id, pokemon.id, pokemon.pokemonId, pokemon.baseFormId, identity.pokemon)) ?? "",
    form: text(firstDefined(overrides.form, pokemon.form, pokemon.formId, identity.form, raw.rawForm)) ?? "",
    costume: text(firstDefined(overrides.costume, pokemon.costume, identity.costume, raw.rawCostume)) ?? "",
    isFemale: boolean(gender),
    shiny: boolean(firstDefined(overrides.shiny, false)),
    shadow: boolean(firstDefined(overrides.shadow, pokemon.shadow, identity.isShadow, attributes.shadow, false)),
    purified: boolean(firstDefined(overrides.purified, pokemon.purified, attributes.purified, false)),
    mega: boolean(firstDefined(overrides.mega, pokemon.mega, identity.isMega, attributes.mega, false)),
    gigantamax: boolean(firstDefined(overrides.gigantamax, pokemon.gigantamax, identity.isGigantamax, attributes.gigantamax, false)),
    dynamax: boolean(firstDefined(overrides.dynamax, pokemon.dynamax, identity.isDynamax, attributes.dynamax, false)),
  };
}

function ownFormTokens(pokemon: UnknownRecord, species: string[]): string[] {
  const identity = record(pokemon.identity);
  const data = record(pokemon.data);
  const stable = uniqueTokens([
    pokemon.formId,
    pokemon.baseFormId,
    identity.form,
    data.formId,
    data.baseFormId,
    pokemon.id,
    pokemon.pokemonId,
  ]);
  return uniqueTokens([
    ...stable,
    ...stable.map((value) => withoutSpeciesPrefix(value, species)),
  ]);
}

function requestOwnsPrimaryAssets(pokemon: UnknownRecord, request: Required<PokemonVariantRequest>, species: string[]): boolean {
  const requestedForm = normalizePokemonVariantToken(request.form);
  if (!requestedForm || baseFormTokens.has(requestedForm)) return true;
  const compactForm = withoutSpeciesPrefix(requestedForm, species);
  if (!compactForm || baseFormTokens.has(compactForm) || compactForm === "NORMAL") return true;
  return ownFormTokens(pokemon, species).some((candidate) =>
    tokensMatch(candidate, requestedForm, species),
  );
}

function assetVariantList(pokemon: UnknownRecord): PokemonVariantAsset[] {
  const assets = record(pokemon.assets);
  const data = record(pokemon.data);
  const dataAssets = record(data.assets);
  const sourceData = record(pokemon.sourceData);
  const sourceAssets = record(sourceData.assets);
  const candidates = [
    assets.assetForms,
    pokemon.assetForms,
    pokemon.eventAssets,
    data.assetForms,
    dataAssets.assetForms,
    sourceData.assetForms,
    sourceAssets.assetForms,
  ];
  const variants = candidates.flatMap((candidate) => Array.isArray(candidate) ? candidate : []);
  const selectedEvent = record(pokemon.eventAsset);
  if (Object.keys(selectedEvent).length) variants.unshift(selectedEvent);
  const seen = new Set<string>();
  return variants.flatMap((candidate) => {
    const variant = record(candidate);
    const normalized: PokemonVariantAsset = {
      form: text(variant.form),
      costume: text(variant.costume),
      isFemale: boolean(variant.isFemale),
      image: image(variant.image),
      shinyImage: image(variant.shinyImage),
    };
    const key = JSON.stringify(normalized);
    if (seen.has(key)) return [];
    seen.add(key);
    return [normalized];
  });
}

function explicitFormRequested(pokemon: UnknownRecord, request: Required<PokemonVariantRequest>, species: string[]): boolean {
  const requested = normalizePokemonVariantToken(request.form);
  if (!requested || baseFormTokens.has(requested)) return false;
  const compact = withoutSpeciesPrefix(requested, species);
  if (!compact || baseFormTokens.has(compact) || compact === "NORMAL") return false;
  return !requestOwnsPrimaryAssets(pokemon, request, species);
}

function exactAssetVariant(
  variants: PokemonVariantAsset[],
  request: Required<PokemonVariantRequest>,
  species: string[],
  requireForm: boolean,
): PokemonVariantAsset | null {
  const requestedCostume = normalizePokemonVariantToken(request.costume);
  const requestedForm = requireForm ? normalizePokemonVariantToken(request.form) : "";
  const matches = variants.filter((variant) => {
    if (boolean(variant.isFemale) !== request.isFemale) return false;
    if (requestedCostume) {
      const costumeMatches = tokensMatch(variant.costume, requestedCostume, species)
        || tokensMatch(variant.form, requestedCostume, species);
      if (!costumeMatches) return false;
    }
    if (requestedForm) {
      const formMatches = tokensMatch(variant.form, requestedForm, species)
        || tokensMatch(variant.costume, requestedForm, species);
      if (!formMatches) return false;
    }
    if (!requestedCostume && !requestedForm && request.isFemale) {
      return !variant.costume && !variant.form;
    }
    return true;
  });
  return matches.length === 1 ? matches[0] : null;
}

function primaryAssetPair(pokemon: UnknownRecord) {
  const assets = record(pokemon.assets);
  const data = record(pokemon.data);
  const dataAssets = record(data.assets);
  return {
    image: image(firstDefined(assets.image, dataAssets.image, pokemon.image)),
    shinyImage: image(firstDefined(assets.shinyImage, dataAssets.shinyImage, pokemon.shinyImage)),
  };
}

function preResolvedAssetPair(
  pokemon: UnknownRecord,
  request: Required<PokemonVariantRequest>,
  species: string[],
  requireForm = false,
) {
  const assets = record(pokemon.assets);
  const identity = record(pokemon.identity);
  const raw = record(identity.raw);
  const resolution = record(identity.resolution);
  const selected = image(assets.selected);
  const matchedIdentityStatus = resolution.status === "matched" || pokemon.resolutionStatus === "matched";
  const identityMatchesCostume = !request.costume
    || tokensMatch(identity.costume ?? raw.rawCostume, request.costume, species);
  const identityMatchesForm = !requireForm
    || tokensMatch(identity.form ?? raw.rawForm, request.form, species);
  const identityMatchesFemale = !request.isFemale || boolean(identity.isFemale);
  const matchedIdentity = matchedIdentityStatus && identityMatchesCostume && identityMatchesForm && identityMatchesFemale;
  const exactNormalizedAsset = pokemon.imageMatch === "exact"
    && identityMatchesCostume
    && identityMatchesForm
    && identityMatchesFemale;
  return {
    image: (matchedIdentity ? selected : null) || (matchedIdentity ? image(identity.image) : null) || (exactNormalizedAsset ? image(pokemon.image) : null),
    shinyImage: (matchedIdentity ? image(assets.selectedShiny) : null) || (matchedIdentity ? image(identity.shinyImage) : null) || (exactNormalizedAsset && pokemon.shiny ? image(pokemon.image) : null),
  };
}

export function resolvePokemonVariant(
  pokemonValue: unknown,
  overrides: PokemonVariantRequest = {},
): PokemonVariantResolution {
  const pokemon = record(pokemonValue);
  const request = normalizedRequest(pokemon, overrides);
  const species = speciesTokens(pokemon, request.id);
  const requireForm = explicitFormRequested(pokemon, request, species);
  const explicitVariant = Boolean(normalizePokemonVariantToken(request.costume) || request.isFemale || requireForm);

  if (explicitVariant) {
    const assetVariant = exactAssetVariant(assetVariantList(pokemon), request, species, requireForm);
    if (assetVariant) {
      const requestedImage = request.shiny ? assetVariant.shinyImage : assetVariant.image;
      return {
        image: requestedImage || null,
        shinyImage: assetVariant.shinyImage || null,
        assetVariant,
        status: requestedImage ? "matched" : "missing-asset",
        source: requestedImage ? "asset-form" : "missing",
        explicitVariant,
        request,
      };
    }

    const preResolved = preResolvedAssetPair(pokemon, request, species, requireForm);
    const preResolvedImage = request.shiny ? preResolved.shinyImage : preResolved.image;
    if (preResolvedImage) {
      return {
        image: preResolvedImage,
        shinyImage: preResolved.shinyImage,
        assetVariant: null,
        status: "matched",
        source: "pre-resolved",
        explicitVariant,
        request,
      };
    }

    return {
      image: null,
      shinyImage: null,
      assetVariant: null,
      status: "missing-asset",
      source: "missing",
      explicitVariant,
      request,
    };
  }

  const primary = primaryAssetPair(pokemon);
  const requestedImage = request.shiny ? primary.shinyImage : primary.image;
  const preResolved = requestedImage ? null : preResolvedAssetPair(pokemon, request, species);
  const resolvedImage = requestedImage || (request.shiny ? preResolved?.shinyImage : preResolved?.image) || null;
  return {
    image: resolvedImage,
    shinyImage: primary.shinyImage || preResolved?.shinyImage || null,
    assetVariant: null,
    status: resolvedImage ? "matched" : "missing-asset",
    source: requestedImage ? "primary-assets" : resolvedImage ? "pre-resolved" : "missing",
    explicitVariant,
    request,
  };
}

export function pokemonVariantBadges(pokemonValue: unknown, overrides: PokemonVariantRequest = {}): string[] {
  const pokemon = record(pokemonValue);
  const resolution = resolvePokemonVariant(pokemon, overrides);
  const { request } = resolution;
  const species = speciesTokens(pokemon, request.id);
  const form = normalizePokemonVariantToken(request.form);
  const compactForm = withoutSpeciesPrefix(form, species);
  const visibleForm = Boolean(
    form
    && !baseFormTokens.has(form)
    && compactForm
    && !baseFormTokens.has(compactForm)
    && !species.includes(form),
  );
  const badges: string[] = [];
  if (request.costume) badges.push(`Costume : ${request.costume}`);
  if (visibleForm && !request.costume) badges.push(`Forme : ${request.form}`);
  if (request.isFemale) badges.push("Forme femelle");
  if (request.shadow) badges.push("Obscur");
  if (request.purified) badges.push("Purifié");
  if (request.mega) badges.push("Méga / Primo");
  if (request.gigantamax) badges.push("Gigamax");
  else if (request.dynamax) badges.push("Dynamax");
  if (request.shiny) badges.push("Chromatique");
  return [...new Set(badges)];
}

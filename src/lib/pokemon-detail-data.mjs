function detailPayload(value) {
  return value?.detail || value || {};
}

function firstDeclaredField(field, ...sources) {
  for (const source of sources) {
    if (source && Object.prototype.hasOwnProperty.call(source, field)) {
      return source[field];
    }
  }
  return null;
}

export function pokemonDetailKey(entry = {}) {
  return entry.baseKey || entry.key || "";
}

export function resolveMegaEvolutionTargets(
  megaEvolutions = [],
  entries = [],
) {
  const targets = new Map();
  for (const entry of entries || []) {
    for (const value of [entry?.formId, entry?.id]) {
      if (value) targets.set(String(value).toUpperCase(), entry);
    }
  }

  return (megaEvolutions || [])
    .filter((formId) => typeof formId === "string" && formId.trim())
    .map((formId) => {
      const target = targets.get(formId.toUpperCase()) || null;
      return {
        formId,
        target,
        initialEnergyCost:
          typeof target?.megaEnergyCost === "number"
            ? target.megaEnergyCost
            : null,
        released:
          typeof target?.availability?.released === "boolean"
            ? target.availability.released
            : null,
      };
    });
}

export function assemblePokemonDetail(entry = {}, value = {}) {
  const summary = entry && typeof entry === "object" ? entry : {};
  const remote = detailPayload(value);
  const source = remote.sourceData || {};
  const availability =
    remote.availability || source.availability || summary.availability || {};

  return {
    ...summary,
    ...source,
    ...remote,
    availability,
    shinyAvailability: firstDeclaredField(
      "shinyAvailability",
      remote,
      source,
      summary,
    ),
    shadowShinyAvailability: firstDeclaredField(
      "shadowShinyAvailability",
      remote,
      source,
      summary,
    ),
  };
}

export async function loadPokemonDetail({
  fetcher,
  adminApiPath,
  entry,
  signal,
}) {
  const key = pokemonDetailKey(entry);
  if (!key) throw new Error("Identifiant de fiche Pokémon absent.");
  const response = await fetcher(
    `${adminApiPath}?action=detail&key=${encodeURIComponent(key)}`,
    { signal },
  );
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || "Erreur de chargement.");
  }
  return assemblePokemonDetail(entry, payload.data);
}

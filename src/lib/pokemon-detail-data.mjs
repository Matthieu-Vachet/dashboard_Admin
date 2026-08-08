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

export function assemblePokemonDetail(entry = {}, value = {}) {
  const remote = detailPayload(value);
  const source = remote.sourceData || {};
  const availability =
    remote.availability || source.availability || entry.availability || {};

  return {
    ...entry,
    ...source,
    ...remote,
    availability,
    shinyAvailability: firstDeclaredField(
      "shinyAvailability",
      remote,
      source,
      entry,
    ),
    shadowShinyAvailability: firstDeclaredField(
      "shadowShinyAvailability",
      remote,
      source,
      entry,
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

const RELEASE_FIELDS = ["releaseDate", "event", "source", "matchedName"];

function normalizedMetadata(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return Object.fromEntries(
    RELEASE_FIELDS.map((field) => [
      field,
      typeof value[field] === "string" && value[field].trim()
        ? value[field].trim()
        : null,
    ]),
  );
}

export function resolveShinyReleaseStatus(
  availability,
  metadata,
  kind = "shiny",
) {
  const flagName =
    kind === "shadow" ? "shadowShinyReleased" : "shinyReleased";
  const released = availability?.[flagName] === true;

  return {
    kind,
    flagName,
    released,
    // Les métadonnées décrivent une sortie, mais ne décident jamais de son statut.
    details: released ? normalizedMetadata(metadata) : null,
  };
}

export function resolvePokemonShinyReleases(payload = {}) {
  const availability = payload.availability || {};
  return {
    shiny: resolveShinyReleaseStatus(
      availability,
      payload.shinyAvailability,
      "shiny",
    ),
    shadow: resolveShinyReleaseStatus(
      availability,
      payload.shadowShinyAvailability,
      "shadow",
    ),
  };
}

export function hasReleaseMetadata(value) {
  const metadata = normalizedMetadata(value);
  return metadata
    ? RELEASE_FIELDS.some((field) => metadata[field] !== null)
    : false;
}

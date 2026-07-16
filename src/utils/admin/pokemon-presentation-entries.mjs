const costumeIdentitySeparator = "::";

function normalizedToken(value) {
  return String(value || "").trim().toUpperCase();
}

function costumeIdentity(entry, asset) {
  return [
    normalizedToken(entry.id || entry.baseFormId || entry.formId || entry.dexId),
    normalizedToken(asset.form),
    normalizedToken(asset.costume),
  ].join(costumeIdentitySeparator);
}

function assetFingerprint(asset) {
  return [
    normalizedToken(asset.form),
    normalizedToken(asset.costume),
    asset.isFemale === true ? "female" : "male",
    String(asset.image || ""),
    String(asset.shinyImage || ""),
  ].join(costumeIdentitySeparator);
}

function uniqueAssets(assets) {
  const seen = new Set();
  return assets.filter((asset) => {
    const fingerprint = assetFingerprint(asset);
    if (seen.has(fingerprint)) return false;
    seen.add(fingerprint);
    return true;
  });
}

function defaultGenderAsset(genderVariants) {
  return genderVariants.find((asset) => asset.isFemale !== true) || genderVariants[0] || null;
}

function costumePresentationEntry(entry, identity, assets) {
  const genderVariants = uniqueAssets(assets);
  const selectedAsset = defaultGenderAsset(genderVariants);
  if (!selectedAsset) return null;
  const form = selectedAsset.form || null;
  const costume = selectedAsset.costume || null;
  const suffix = [form || "normal", costume || "costume"].map(normalizedToken).join(":");
  return {
    ...entry,
    key: `${entry.key}:costume:${suffix}`,
    baseKey: entry.key,
    kind: "event",
    form: form || entry.form || "normal",
    costume,
    isFemale: selectedAsset.isFemale === true,
    eventAsset: selectedAsset,
    eventAssets: genderVariants,
    genderVariants,
    presentationVariant: {
      identity,
      mode: "costume",
      shiny: false,
      requestedGender: null,
      selectedGender: selectedAsset.isFemale === true ? "female" : "male",
    },
    availability: {
      ...(entry.availability || {}),
      shinyReleased: genderVariants.some((asset) => Boolean(asset.shinyImage)),
    },
  };
}

export function costumePresentationEntries(entries = []) {
  return entries.flatMap((entry) => {
    const groups = new Map();
    for (const asset of Array.isArray(entry.eventAssets) ? entry.eventAssets : []) {
      if (!asset?.costume) continue;
      const identity = costumeIdentity(entry, asset);
      const current = groups.get(identity) || [];
      current.push(asset);
      groups.set(identity, current);
    }
    return [...groups.entries()]
      .map(([identity, assets]) => costumePresentationEntry(entry, identity, assets))
      .filter(Boolean);
  });
}

export function shinyPresentationEntries(entries = []) {
  return entries
    .filter((entry) => entry?.availability?.shinyReleased === true)
    .map((entry) => ({
      ...entry,
      presentationVariant: {
        ...(entry.presentationVariant || {}),
        mode: "shiny",
        shiny: true,
      },
    }));
}

export function pokemonPresentationEntries(entries = [], filter = "all") {
  if (filter === "costume") return costumePresentationEntries(entries);
  if (filter === "chromatic") return shinyPresentationEntries(entries);
  return entries;
}

export function pokemonPresentationSearchText(entry = {}) {
  return [
    entry.name,
    entry.dexId,
    entry.id,
    entry.baseFormId,
    entry.formId,
    entry.form,
    entry.costume,
    entry.kind,
    entry.file,
    entry.primaryType,
    ...(entry.genderVariants || []).flatMap((asset) => [asset.form, asset.costume]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

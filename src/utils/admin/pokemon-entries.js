export function entryMatchesFicheFilter(entry, filter) {
  if (filter === "all") return true;
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "").toLowerCase();
  const availability = entry.availability || {};
  if (filter === "chromatic") return availability.shinyReleased === true;
  if (filter === "costume") return Array.isArray(entry.eventAssets) && entry.eventAssets.length > 0;
  if (filter === "mega") return kind === "mega" || form.startsWith("mega") || form === "primal";
  if (filter === "regional") return ["alola", "galar", "hisui", "paldea"].some((region) => form.includes(region));
  return true;
}

function dexSortValue(entry) {
  const value = Number.parseInt(String(entry.dexId || "").replace(/\D/g, ""), 10);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

function variantSortRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["form", "alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}

export function sortPokemonEntries(entries) {
  return [...entries].sort((left, right) => {
    const dexDiff = dexSortValue(left) - dexSortValue(right);
    if (dexDiff) return dexDiff;
    const rankDiff = variantSortRank(left) - variantSortRank(right);
    if (rankDiff) return rankDiff;
    return String(left.form || left.name || left.key || "").localeCompare(
      String(right.form || right.name || right.key || ""),
      "fr",
    );
  });
}

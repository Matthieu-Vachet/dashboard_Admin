export const POKEMON_GO_SUPER_EFFECTIVE_MULTIPLIER = 1.6;
export const POKEMON_GO_DOUBLE_WEAKNESS_MULTIPLIER = 2.56;

export function canonicalPokemonType(value) {
  const type = String(value || "").trim().toLowerCase();
  return type ? `${type.charAt(0).toUpperCase()}${type.slice(1)}` : "";
}

function uniqueTypes(values = []) {
  return [...new Set((Array.isArray(values) ? values : []).map(canonicalPokemonType).filter(Boolean))];
}

export function rocketWeaknessGroups(weaknesses = {}) {
  const double = uniqueTypes(weaknesses.double);
  const doubleKeys = new Set(double.map((type) => type.toUpperCase()));
  const single = uniqueTypes(weaknesses.single).filter((type) => !doubleKeys.has(type.toUpperCase()));
  return [
    ...(double.length ? [{ kind: "double", label: "Double faiblesse", multiplier: POKEMON_GO_DOUBLE_WEAKNESS_MULTIPLIER, types: double }] : []),
    ...(single.length ? [{ kind: "single", label: single.length === 1 ? "Faiblesse" : "Faiblesses", multiplier: POKEMON_GO_SUPER_EFFECTIVE_MULTIPLIER, types: single }] : []),
  ];
}

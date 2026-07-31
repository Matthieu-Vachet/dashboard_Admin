export function xlCandyRequirement(entry = {}) {
  const level = Number(entry?.pvp?.level);
  if (!Number.isFinite(level)) return { status: "unknown", quantity: null, label: "Indisponible" };
  if (level <= 40) return { status: "not-required", quantity: 0, label: "Aucun requis" };
  const sourceQuantity = entry?.pvp?.xlCandyRequired;
  const quantity = sourceQuantity === null || sourceQuantity === undefined || sourceQuantity === ""
    ? null
    : Number(sourceQuantity);
  if (!Number.isFinite(quantity)) {
    return { status: "required-unknown-quantity", quantity: null, label: "Requis · quantité non renseignée" };
  }
  return { status: "required", quantity, label: `${quantity.toLocaleString("fr-FR")} requis` };
}

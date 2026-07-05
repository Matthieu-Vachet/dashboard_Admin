import { readLocalJson } from "@/services/admin/dashboard-store";

function sourceSignature(source) {
  return [
    source.signature,
    source.version,
    source.updatedAt,
    source.status,
    source.message,
  ]
    .filter(Boolean)
    .join("|");
}

export function persistSourceSignatures(sourceWatch, storageKey) {
  if (typeof localStorage === "undefined" || !sourceWatch?.sources?.length) return undefined;
  const previous = readLocalJson(storageKey, {});
  const current = {};
  const changed = [];
  const blocked = [];
  const changedIds = new Set();

  for (const source of sourceWatch.sources) {
    const id = source.id || source.name || source.url;
    const signature = sourceSignature(source);
    if (!id || !signature) continue;
    current[id] = signature;
    if (previous[id] && previous[id] !== signature) {
      changed.push(source);
      changedIds.add(id);
    }
    if (source.status === "warning") blocked.push(source);
  }

  localStorage.setItem(storageKey, JSON.stringify(current));
  return {
    changed,
    blocked,
    known: Object.keys(previous).length,
    sources: sourceWatch.sources.map((source) => {
      const id = source.id || source.name || source.url;
      return {
        ...source,
        changedSinceLastCheck: changedIds.has(id),
        previousSignature: previous[id] || null,
      };
    }),
  };
}

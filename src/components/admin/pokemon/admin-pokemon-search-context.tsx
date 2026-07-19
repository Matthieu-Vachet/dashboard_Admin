"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

type AdminPokemonSearchContextValue = {
  query: string;
  normalizedQuery: string;
  active: boolean;
  combineWith: (localQuery?: string) => string;
  setQuery: (value: string) => void;
};

const emptySearchContext: AdminPokemonSearchContextValue = {
  query: "",
  normalizedQuery: "",
  active: false,
  combineWith: (localQuery = "") => localQuery.trim(),
  setQuery: () => undefined,
};

const AdminPokemonSearchContext = createContext<AdminPokemonSearchContextValue>(emptySearchContext);

export function combineAdminPokemonSearch(...values: Array<string | null | undefined>) {
  const unique = new Map<string, string>();
  for (const value of values) {
    const trimmed = String(value || "").trim();
    if (!trimmed) continue;
    const key = trimmed.toLocaleLowerCase("fr");
    if (!unique.has(key)) unique.set(key, trimmed);
  }
  return [...unique.values()].join(" ");
}

export function AdminPokemonSearchProvider({
  children,
  query,
  onQueryChange,
}: {
  children: ReactNode;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  const value = useMemo<AdminPokemonSearchContextValue>(() => ({
    query,
    normalizedQuery: query.trim().toLocaleLowerCase("fr"),
    active: Boolean(query.trim()),
    combineWith: (localQuery = "") => combineAdminPokemonSearch(query, localQuery),
    setQuery: onQueryChange,
  }), [onQueryChange, query]);

  return <AdminPokemonSearchContext.Provider value={value}>{children}</AdminPokemonSearchContext.Provider>;
}

export function useAdminPokemonSearch() {
  return useContext(AdminPokemonSearchContext);
}

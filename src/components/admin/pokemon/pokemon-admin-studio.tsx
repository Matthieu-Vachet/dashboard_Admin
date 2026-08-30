"use client";

import { AdminApp } from "@/components/admin/pokemon/admin-app";
import type { PokemonSectionId } from "@/data/pokemon-routes";

export function PokemonAdminStudio({ initialSection = "overview" }: { initialSection?: PokemonSectionId }) {
  return <AdminApp initialSection={initialSection} />;
}

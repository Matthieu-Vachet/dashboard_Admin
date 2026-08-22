import type { Metadata } from "next";
import { PokemonAdminStudio } from "@/components/admin/pokemon/pokemon-admin-studio";

export const metadata: Metadata = {
  title: "Accueil Pokémon GO",
  description: "Santé des datasets, Engine, synchronisations et outils Pokémon GO.",
};

export default function DashboardHome() {
  return <PokemonAdminStudio initialSection="overview" />;
}

import { permanentRedirect } from "next/navigation";
import { pokemonSectionPath } from "@/data/pokemon-routes";

export const metadata = {
  title: "Redirection Dashboard Pokémon",
};

export default async function PokemonAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string; q?: string }>;
}) {
  const params = await searchParams;
  const path = pokemonSectionPath(params.section);
  const query = params.q ? `?q=${encodeURIComponent(params.q)}` : "";
  permanentRedirect(`${path}${query}`);
}

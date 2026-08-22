import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PokemonAdminStudio } from "@/components/admin/pokemon/pokemon-admin-studio";
import { pokemonSectionBySlug, pokemonSectionRoutes } from "@/data/pokemon-routes";

type PageProps = {
  params: Promise<{ pokemonSection: string }>;
};

export function generateStaticParams() {
  return pokemonSectionRoutes
    .filter((section) => section.slug)
    .map((section) => ({ pokemonSection: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pokemonSection } = await params;
  const section = pokemonSectionBySlug(pokemonSection);
  if (!section) return { title: "Page introuvable" };
  return {
    title: section.label,
    description: section.description,
  };
}

export default async function PokemonSectionPage({ params }: PageProps) {
  const { pokemonSection } = await params;
  const section = pokemonSectionBySlug(pokemonSection);
  if (!section) notFound();
  return <PokemonAdminStudio initialSection={section.id} />;
}

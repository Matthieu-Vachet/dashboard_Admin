"use client";

import { ImageOff } from "lucide-react";
import { pokemonVariantBadges, resolvePokemonVariant } from "@/lib/pokemon-variant-resolver";

export function PokemonArtwork({
  pokemon,
  alt,
  className = "h-16 w-16",
  shiny = false,
  priority = false,
  variant = {},
}) {
  const resolution = resolvePokemonVariant(pokemon, { ...variant, shiny });
  const source = resolution.image;
  const badges = pokemonVariantBadges(pokemon, { ...variant, shiny });
  const variantLabel = badges.find((badge) => badge.startsWith("Costume :") || badge.startsWith("Forme :") || badge === "Forme femelle");
  const name = alt || pokemon?.names?.French || pokemon?.names?.English || pokemon?.formId || "Pokémon";
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-line bg-surface-inset-strong p-1 ${className}`}
      data-asset-status={resolution.status}
      data-asset-source={resolution.source}
      data-asset-reason={resolution.reason || undefined}
      title={variantLabel || (resolution.status === "missing-asset" ? `Asset exact absent${resolution.reason ? ` · ${resolution.reason}` : ""}` : undefined)}
    >
      {source ? (
        <img className="h-full w-full object-contain" src={source} alt={name} loading={priority ? "eager" : "lazy"} />
      ) : (
        <span className="grid place-items-center gap-1 text-center text-[8px] font-black uppercase text-amber-200">
          <ImageOff size={18} aria-hidden="true" />Asset absent
        </span>
      )}
      {resolution.status !== "matched" ? (
        <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border border-slate-950 bg-amber-300" title={`Résolution : ${resolution.reason || "missing-asset"}`} />
      ) : null}
    </span>
  );
}

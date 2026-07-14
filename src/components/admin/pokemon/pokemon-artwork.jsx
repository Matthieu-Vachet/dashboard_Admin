"use client";

import { ImageOff } from "lucide-react";

function imageFor(pokemon, shiny = false) {
  const assets = pokemon?.assets || pokemon?.identity?.assets || {};
  if (shiny) return assets.shinyImage || assets.shiny || null;
  return assets.selected || assets.image || assets.portrait || null;
}

export function PokemonArtwork({ pokemon, alt, className = "h-16 w-16", shiny = false, priority = false }) {
  const source = imageFor(pokemon, shiny);
  const name = alt || pokemon?.names?.French || pokemon?.names?.English || pokemon?.formId || "Pokémon";
  return (
    <span className={`relative grid shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-1 ${className}`}>
      {source ? (
        <img className="h-full w-full object-contain" src={source} alt={name} loading={priority ? "eager" : "lazy"} />
      ) : (
        <span className="grid place-items-center gap-1 text-center text-[8px] font-black uppercase text-amber-200">
          <ImageOff size={18} aria-hidden="true" />Asset absent
        </span>
      )}
      {pokemon?.identity?.resolutionStatus && pokemon.identity.resolutionStatus !== "matched" ? (
        <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full border border-slate-950 bg-amber-300" title={`Résolution : ${pokemon.identity.resolutionStatus}`} />
      ) : null}
    </span>
  );
}

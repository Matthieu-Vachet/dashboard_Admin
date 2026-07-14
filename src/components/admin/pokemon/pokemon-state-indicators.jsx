"use client";

import { BadgeCheck, Shield, Sparkles, Tag, UserRound, Zap } from "lucide-react";
import { pokemonVariantBadges } from "@/lib/pokemon-variant-resolver";

export function PokemonStateIndicators({ pokemon, compact = false }) {
  const variantBadges = pokemonVariantBadges(pokemon);
  const costume = variantBadges.find((label) => label.startsWith("Costume :"));
  const form = variantBadges.find((label) => label.startsWith("Forme :"));
  const items = [
    [pokemon?.shadow, "Obscur", Shield, "border-violet-200/25 bg-violet-300/14 text-violet-100"],
    [pokemon?.purified, "Purifié", BadgeCheck, "border-cyan-200/25 bg-cyan-300/14 text-cyan-100"],
    [pokemon?.mega, "Méga / Primo", Zap, "border-amber-200/25 bg-amber-300/14 text-amber-100"],
    [pokemon?.gigantamax, "Gigamax", Zap, "border-fuchsia-200/25 bg-fuchsia-300/14 text-fuchsia-100"],
    [pokemon?.dynamax && !pokemon?.gigantamax, "Dynamax", Zap, "border-red-200/25 bg-red-300/14 text-red-100"],
    [pokemon?.shiny, "Chromatique", Sparkles, "border-emerald-200/25 bg-emerald-300/14 text-emerald-100"],
    [pokemon?.isFemale || pokemon?.identity?.isFemale, "Forme femelle", UserRound, "border-pink-200/25 bg-pink-300/14 text-pink-100"],
    [costume, costume, Tag, "border-fuchsia-200/25 bg-fuchsia-300/14 text-fuchsia-100"],
    [form, form, Tag, "border-cyan-200/25 bg-cyan-300/14 text-cyan-100"],
  ].filter(([active]) => Boolean(active));
  if (!items.length) return null;
  return (
    <span className="flex flex-wrap gap-1.5" aria-label="États Pokémon">
      {items.map(([, label, Icon, className]) => (
        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-black uppercase ${className}`} key={label} title={label}>
          <Icon size={11} aria-hidden="true" />{compact ? null : label}
        </span>
      ))}
    </span>
  );
}

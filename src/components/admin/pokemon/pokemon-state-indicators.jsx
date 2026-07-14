"use client";

import { Shield, Sparkles, Zap } from "lucide-react";

export function PokemonStateIndicators({ pokemon, compact = false }) {
  const items = [
    [pokemon?.shadow, "Obscur", Shield, "border-violet-200/25 bg-violet-300/14 text-violet-100"],
    [pokemon?.mega, "Méga / Primo", Zap, "border-amber-200/25 bg-amber-300/14 text-amber-100"],
    [pokemon?.shiny, "Chromatique", Sparkles, "border-emerald-200/25 bg-emerald-300/14 text-emerald-100"],
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

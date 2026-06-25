"use client";

import { useMemo } from "react";
import { CircleDot } from "lucide-react";
import { formatCount, Panel } from "./admin-ui";
import { pokemonVariantLabel, preferredPokemonImage } from "../site/pokemon-style";

function colorChannel(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(255, Math.round(numeric <= 1 ? numeric * 255 : numeric)));
}

function normalizeColor(color) {
  if (!color || typeof color === "string") return null;
  return {
    r: colorChannel(color.r ?? color.red),
    g: colorChannel(color.g ?? color.green),
    b: colorChannel(color.b ?? color.blue),
    a: Math.max(0, Math.min(1, Number(color.a ?? color.alpha ?? 1))),
  };
}

function colorToCss(color) {
  if (!color) return "rgba(148,163,184,.35)";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function colorToLabel(color) {
  if (!color) return "-";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function colorToHex(color) {
  const normalized = normalizeColor(color);
  if (!normalized) return "";
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

function variantTone(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  if (kind === "dynamax") return "border-sky-300/35 bg-sky-400/15 text-sky-100";
  if (kind === "gigantamax") return "border-violet-300/35 bg-violet-400/15 text-violet-100";
  if (kind === "mega") return "border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100";
  if (kind === "form") return "border-amber-300/35 bg-amber-400/15 text-amber-100";
  return "border-emerald-300/35 bg-emerald-400/15 text-emerald-100";
}

export function CandyPanel({ entries = [], search = "", onOpen }) {
  const groups = useMemo(() => {
    const byFamily = new Map();
    for (const entry of entries) {
      const candy = entry.assets?.candy;
      if (!candy?.familyId && candy?.familyId !== 0) continue;
      const key = String(candy.familyId);
      const current =
        byFamily.get(key) || {
          familyId: candy.familyId,
          image: candy.image,
          primaryColor: candy.primaryColor,
          secondaryColor: candy.secondaryColor,
          pokemon: [],
        };
      current.image ||= candy.image;
      current.primaryColor ||= candy.primaryColor;
      current.secondaryColor ||= candy.secondaryColor;
      current.pokemon.push(entry);
      byFamily.set(key, current);
    }
    return [...byFamily.values()].sort((left, right) => Number(left.familyId) - Number(right.familyId));
  }, [entries]);
  const needle = search.trim().toLowerCase();
  const filteredGroups = groups.filter((group) => {
    if (!needle) return true;
    return [
      group.familyId,
      colorToLabel(group.primaryColor),
      colorToLabel(group.secondaryColor),
      ...group.pokemon.flatMap((entry) => [entry.name, entry.dexId, entry.form, entry.file]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <Panel
      title="Bonbons par famille"
      eyebrow="candy assets"
      action={
        <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-100">
          {formatCount(filteredGroups.length)} famille(s)
        </span>
      }
    >
      <p className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/85">
        Chaque carte utilise la donnée ajoutée dans les JSON Pokémon: image de candy, familyId,
        couleurs principales et toutes les fiches Pokémon/formes reliées à cette famille.
      </p>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredGroups.map((group) => {
          const primary = colorToCss(group.primaryColor);
          const secondary = colorToCss(group.secondaryColor);
          return (
            <article
              className="min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 shadow-[0_22px_70px_rgba(0,0,0,.22)]"
              key={group.familyId}
            >
              <div
                className="relative grid gap-4 overflow-hidden p-4 sm:grid-cols-[5rem_minmax(0,1fr)]"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, ${primary} 84%, #ffffff 6%), color-mix(in srgb, ${secondary} 72%, #020617 18%)), radial-gradient(circle at 88% 0%, rgba(255,255,255,.42), transparent 32%)`,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] opacity-25 [background-size:24px_24px]" />
                <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/40 bg-white/88 p-3 shadow-2xl">
                  {group.image ? (
                    <img className="max-h-full object-contain drop-shadow-xl" src={group.image} alt="" />
                  ) : (
                    <CircleDot size={30} className="text-slate-500" />
                  )}
                </span>
                <div className="relative min-w-0 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.38)]">
                  <p className="text-xs font-black uppercase tracking-[0.18em] opacity-80">FamilyId</p>
                  <strong className="mt-1 block text-3xl font-black">{group.familyId}</strong>
                  <p className="mt-2 text-sm font-black">
                    {formatCount(group.pokemon.length)} fiche(s) associée(s)
                  </p>
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    ["primaryColor", group.primaryColor],
                    ["secondaryColor", group.secondaryColor],
                  ].map(([label, color]) => (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3" key={label}>
                      <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                        {label}
                      </span>
                      <span className="mt-2 flex items-center gap-2">
                        <i className="h-6 w-6 rounded-full border border-white/30" style={{ background: colorToCss(color) }} />
                        <span className="min-w-0">
                          <strong className="block break-all text-xs text-slate-100">{colorToLabel(color)}</strong>
                          {colorToHex(color) ? (
                            <small className="mt-1 block font-mono text-[11px] font-black text-cyan-100/75">{colorToHex(color)}</small>
                          ) : null}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    Pokémon associés
                  </span>
                  <div className="flex max-h-52 flex-wrap gap-2 overflow-auto pr-1">
                    {group.pokemon.map((entry) => {
                      const image = preferredPokemonImage(entry);
                      return (
                        <button
                          className={`inline-flex min-w-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-black transition hover:border-cyan-200/45 hover:bg-cyan-400/15 ${variantTone(entry)}`}
                          key={entry.key}
                          type="button"
                          onClick={() => onOpen(entry)}
                        >
                          {image ? (
                            <img className="h-6 w-6 object-contain" src={image} alt="" />
                          ) : null}
                          <span className="max-w-[11rem] truncate">
                            {entry.dexId} · {entry.name}
                          </span>
                          <small className="rounded-full bg-slate-950/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                            {pokemonVariantLabel(entry)}
                          </small>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {!filteredGroups.length ? (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun candy ne correspond à la recherche actuelle.
        </p>
      ) : null}
    </Panel>
  );
}

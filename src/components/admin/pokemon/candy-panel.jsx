"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatCount, Panel } from "./admin-ui";
import { pokemonVariantLabel, preferredPokemonImage } from "@/components/site/pokemon-style";
import { EmptyState } from "@/components/admin/shared/state-system";
import { CandyAssetImage } from "./candy-asset-image";
import {
  CANDY_FAMILY_PAGE_SIZE,
  paginateCandyFamilies,
} from "@/lib/candy-family-pagination.mjs";
import {
  candyColorToCss,
  candyColorToHex,
  candyColorToLabel,
  candyFamilyContrast,
} from "@/lib/candy-family-contrast.mjs";

function variantTone(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  if (kind === "dynamax") return "border-sky-300/35 bg-sky-400/15 text-sky-100";
  if (kind === "gigantamax") return "border-violet-300/35 bg-violet-400/15 text-violet-100";
  if (kind === "mega") return "border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100";
  if (kind === "form") return "border-amber-300/35 bg-amber-400/15 text-amber-100";
  return "border-emerald-300/35 bg-emerald-400/15 text-emerald-100";
}

function CandyPagination({ pagination, onPageChange, placement }) {
  const {
    currentPage,
    rangeEnd,
    rangeStart,
    totalItems,
    totalPages,
  } = pagination;

  if (!totalItems) return null;

  return (
    <nav
      className="flex flex-col gap-3 rounded-2xl border border-line bg-surface-inset p-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label={`Pagination des familles de bonbons · ${placement}`}
    >
      <button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-surface-control px-4 py-2 text-sm font-black text-domain-foreground transition enabled:hover:border-cyan-200/50 enabled:hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-45"
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft aria-hidden="true" size={17} />
        Précédent
      </button>
      <div className="text-center">
        <p
          className="text-sm font-black text-domain-foreground"
          aria-live={placement === "haut" ? "polite" : undefined}
        >
          Page {formatCount(currentPage)} sur {formatCount(totalPages)}
        </p>
        <p className="mt-1 text-xs font-bold text-muted">
          {formatCount(rangeStart)}–{formatCount(rangeEnd)} sur {formatCount(totalItems)} famille(s)
        </p>
      </div>
      <button
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-line bg-surface-control px-4 py-2 text-sm font-black text-domain-foreground transition enabled:hover:border-cyan-200/50 enabled:hover:bg-cyan-400/15 disabled:cursor-not-allowed disabled:opacity-45"
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Suivant
        <ChevronRight aria-hidden="true" size={17} />
      </button>
    </nav>
  );
}

export function CandyPanel({ entries = [], search = "", onOpen }) {
  const [pageState, setPageState] = useState({
    entries,
    page: 1,
    search,
  });
  const pageStartRef = useRef(null);
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
          xlImage: candy.xlImage,
          primaryColor: candy.primaryColor,
          secondaryColor: candy.secondaryColor,
          pokemon: [],
        };
      current.image ||= candy.image;
      current.xlImage ||= candy.xlImage;
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
      candyColorToLabel(group.primaryColor),
      candyColorToLabel(group.secondaryColor),
      ...group.pokemon.flatMap((entry) => [entry.name, entry.dexId, entry.form, entry.file]),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
  const requestedPage =
    pageState.search === search && pageState.entries === entries
      ? pageState.page
      : 1;
  const pagination = paginateCandyFamilies(
    filteredGroups,
    requestedPage,
    CANDY_FAMILY_PAGE_SIZE,
  );

  function changePage(nextPage) {
    const next = paginateCandyFamilies(
      filteredGroups,
      nextPage,
      CANDY_FAMILY_PAGE_SIZE,
    ).currentPage;
    setPageState({ entries, page: next, search });
    requestAnimationFrame(() => {
      pageStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <Panel
      title="Bonbons par famille"
      eyebrow="candy assets"
      action={
        <span className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 type-label text-emerald-100">
          {formatCount(filteredGroups.length)} famille(s)
        </span>
      }
    >
      <p className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 type-body-strong text-cyan-50/85">
        Chaque carte utilise la donnée ajoutée dans les JSON Pokémon: image de candy, familyId,
        couleurs principales et toutes les fiches Pokémon/formes reliées à cette famille.
      </p>
      <div className="mb-4 scroll-mt-24" ref={pageStartRef}>
        <CandyPagination
          pagination={pagination}
          onPageChange={changePage}
          placement="haut"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {pagination.items.map((group) => {
          const primary = candyColorToCss(group.primaryColor);
          const secondary = candyColorToCss(group.secondaryColor);
          const contrast = candyFamilyContrast(group.primaryColor, group.secondaryColor);
          return (
            <article
              className="min-w-0 overflow-hidden rounded-surface border border-line bg-slate-950/55 shadow-raised"
              key={group.familyId}
            >
              <div
                className="relative grid gap-4 overflow-hidden p-4 sm:grid-cols-[10rem_minmax(0,1fr)]"
                style={{
                  background: `linear-gradient(135deg, color-mix(in srgb, ${primary} 84%, #ffffff 6%), color-mix(in srgb, ${secondary} 72%, #020617 18%)), radial-gradient(circle at 88% 0%, rgba(255,255,255,.42), transparent 32%)`,
                  color: contrast.foreground,
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] opacity-25 [background-size:24px_24px]" />
                <div className="pointer-events-none absolute inset-0" style={{ background: contrast.overlay }} />
                <span
                  className="relative z-10 flex items-start gap-2 rounded-3xl border p-3 drop-shadow-2xl backdrop-blur-[2px]"
                  style={{ background: contrast.surface, borderColor: contrast.border }}
                >
                  <CandyAssetImage familyId={group.familyId} normalUrl={group.image} xlUrl={group.xlImage} kind="normal" className="h-14 w-14" showLabel highContrast />
                  <CandyAssetImage familyId={group.familyId} normalUrl={group.image} xlUrl={group.xlImage} kind="xl" className="h-14 w-14" showLabel highContrast />
                </span>
                <div className="relative z-10 min-w-0 drop-shadow-[0_2px_12px_rgba(0,0,0,.24)]">
                  <p className="type-overline opacity-80">FamilyId</p>
                  <strong className="mt-1 block type-title-page">{group.familyId}</strong>
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
                    <div className="rounded-2xl border border-line bg-surface-subtle p-3" key={label}>
                      <span className="block type-overline-compact text-disabled">
                        {label}
                      </span>
                      <span className="mt-2 flex items-center gap-2">
                        <i className="h-6 w-6 rounded-full border border-white/30" style={{ background: candyColorToCss(color) }} />
                        <span className="min-w-0">
                          <strong className="block break-all text-xs text-foreground">{candyColorToLabel(color)}</strong>
                          {candyColorToHex(color) ? (
                            <small className="mt-1 block font-mono text-[11px] font-black text-cyan-100/75">{candyColorToHex(color)}</small>
                          ) : null}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="mb-2 block type-overline text-disabled">
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
                          <small className="rounded-full bg-surface-inset-subtle px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
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
      {filteredGroups.length ? (
        <div className="mt-4">
          <CandyPagination
            pagination={pagination}
            onPageChange={changePage}
            placement="bas"
          />
        </div>
      ) : null}
      {!filteredGroups.length ? (
        <EmptyState title="Aucun candy ne correspond à la recherche actuelle" />
      ) : null}
    </Panel>
  );
}

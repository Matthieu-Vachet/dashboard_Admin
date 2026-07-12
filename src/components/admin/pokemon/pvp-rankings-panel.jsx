"use client";

import { Download, RefreshCcw, RotateCcw, Shield, Swords } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Modal } from "@/components/ui/modal";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { CurrentDatasetDiagnostics } from "./current-dataset-diagnostics";
import { DatasetFilterBar } from "./dataset-filter-bar";

const roles = ["lead", "closer", "switch", "charger", "attacker", "consistency"];
const roleLabels = {
  lead: "Ouverture",
  closer: "Fermeur",
  switch: "Changement",
  charger: "Chargeur",
  attacker: "Attaquant",
  consistency: "Cohérence",
};

function pokemonName(entry) {
  return entry?.pokemon?.names?.French
    || entry?.pokemon?.names?.English
    || entry?.sourceIdentity?.speciesName
    || entry?.sourceIdentity?.speciesId
    || "Pokémon";
}

function MetricGrid({ entry }) {
  const metrics = [
    ["Score", entry.score],
    ["Rating", entry.rating],
    ["Produit", entry.stats?.product],
    ["Attaque", entry.stats?.attack],
    ["Défense", entry.stats?.defense],
    ["Endurance", entry.stats?.stamina],
  ];

  return (
    <dl className="grid gap-2 sm:grid-cols-2">
      {metrics.map(([label, value]) => (
        <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3" key={label}>
          <dt className="text-[10px] font-black uppercase tracking-wider text-slate-500">{label}</dt>
          <dd className="mt-1 font-mono font-black text-white">{value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function MatchupList({ label, values }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
      <h3 className="font-black text-white">{label}</h3>
      <ul className="mt-3 space-y-2">
        {(values || []).map((item) => (
          <li
            className="flex justify-between gap-3 text-sm font-bold text-slate-300"
            key={`${item.sourceId}-${item.rating}`}
          >
            <span>{item.formId || item.pokemonId || item.sourceId}</span>
            <strong className="font-mono text-cyan-100">{item.rating}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PvpDetail({ entry, onOpenPokemon }) {
  if (!entry) return null;

  const chart = roles.map((role) => ({
    role: roleLabels[role],
    score: entry.roleScores?.[role] || 0,
  }));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
        <div className="grid min-h-32 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-300/10">
          <img
            className="max-h-28 object-contain"
            src={entry.pokemon?.assets?.image}
            alt={pokemonName(entry)}
          />
        </div>
        <MetricGrid entry={entry} />
      </div>

      <section className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
        <h3 className="font-black text-white">Performance par rôle</h3>
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chart}>
              <CartesianGrid stroke="rgba(148,163,184,.15)" />
              <XAxis dataKey="role" stroke="#94a3b8" />
              <YAxis domain={[0, 100]} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="score" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="font-black text-white">Attaques locales</h3>
          <p className="mt-2 font-mono text-sm text-cyan-100">{entry.moveset?.fast || "—"}</p>
          <p className="mt-1 font-mono text-sm text-violet-100">
            {entry.moveset?.charged?.join(" · ") || "—"}
          </p>
        </section>
        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="font-black text-white">Statut</h3>
          <p className="mt-2 text-sm font-bold text-slate-300">
            {entry.variant === "shadow" ? "Obscur" : "Normal"} · {entry.pokemon?.formId || "Non matché"}
          </p>
        </section>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <MatchupList label="Gagne contre" values={entry.matchups} />
        <MatchupList label="Perd contre" values={entry.counters} />
      </div>

      {entry.editor?.notes?.English ? (
        <section className="rounded-2xl border border-violet-200/20 bg-violet-300/8 p-4">
          <h3 className="font-black text-violet-50">Note PvPoke · {entry.editor.score || "—"}</h3>
          <p className="mt-2 whitespace-pre-line text-sm font-semibold leading-6 text-slate-300">
            {entry.editor.notes.English}
          </p>
        </section>
      ) : null}

      {onOpenPokemon && !entry.pokemon?.unmatched ? (
        <button className={buttonClass} type="button" onClick={() => onOpenPokemon(entry.pokemon)}>
          Ouvrir la fiche Pokémon locale
        </button>
      ) : null}
    </div>
  );
}

function PanelActions({ dataset, loading, regenerating, onDownload, onRefresh, onRegenerate }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button className={buttonClass} type="button" onClick={onDownload} disabled={!dataset}>
        <Download size={16} /> JSON
      </button>
      <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}>
        <RefreshCcw className={loading ? "animate-spin" : ""} size={16} /> Actualiser
      </button>
      <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={regenerating}>
        <RotateCcw className={regenerating ? "animate-spin" : ""} size={16} /> Régénérer
      </button>
    </div>
  );
}

function Pagination({ meta, options, onOptionsChange }) {
  const page = meta.page || options.page;
  const pages = meta.pages || 1;

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        className={buttonClass}
        type="button"
        disabled={options.page <= 1}
        onClick={() => onOptionsChange({ ...options, page: options.page - 1 })}
      >
        Précédent
      </button>
      <span className="font-mono text-sm font-black text-slate-300">Page {page} / {pages}</span>
      <button
        className={buttonClass}
        type="button"
        disabled={page >= pages}
        onClick={() => onOptionsChange({ ...options, page: options.page + 1 })}
      >
        Suivant
      </button>
    </div>
  );
}

export function PvpRankingsPanel({
  dataset,
  loading,
  regenerating,
  options,
  onOptionsChange,
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
}) {
  const [selected, setSelected] = useState(null);
  const entries = dataset?.data?.rankings || [];
  const formats = dataset?.data?.formats || [];
  const meta = dataset?.meta || {};

  return (
    <div className="space-y-5">
      <Panel
        eyebrow="Source officielle · dépôt MIT PvPoke"
        title="Classements PvP"
        action={(
          <PanelActions
            dataset={dataset}
            loading={loading}
            regenerating={regenerating}
            onDownload={onDownload}
            onRefresh={onRefresh}
            onRegenerate={onRegenerate}
          />
        )}
      >
        <CurrentDatasetDiagnostics dataset={dataset} total={meta.total || entries.length} />
      </Panel>

      <DatasetFilterBar
        query={options.search}
        onQueryChange={(search) => onOptionsChange({ ...options, search, page: 1 })}
        resultCount={entries.length}
        totalCount={meta.total || entries.length}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          className={fieldClass}
          value={options.league}
          onChange={(event) => onOptionsChange({ ...options, league: event.target.value, page: 1 })}
          aria-label="Ligue"
        >
          {formats.map((format) => (
            <option value={format.id} key={format.id}>{format.label} · {format.cp} CP</option>
          ))}
        </select>
        <select
          className={fieldClass}
          value={options.role}
          onChange={(event) => onOptionsChange({ ...options, role: event.target.value, page: 1 })}
          aria-label="Rôle"
        >
          <option value="">Classement total</option>
          {roles.map((role) => <option value={role} key={role}>{roleLabels[role]}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/30">
        {entries.map((entry) => (
          <button
            className="grid w-full grid-cols-[3rem_3.5rem_minmax(0,1fr)_5rem] items-center gap-3 border-b border-white/8 p-3 text-left transition last:border-0 hover:bg-cyan-400/8"
            type="button"
            key={`${entry.rank}-${entry.sourceIdentity?.speciesId}`}
            onClick={() => setSelected(entry)}
          >
            <span className="font-mono text-sm font-black text-slate-500">#{entry.rank}</span>
            <img
              className="h-12 w-12 object-contain"
              src={entry.pokemon?.assets?.image}
              alt=""
              loading="lazy"
            />
            <span className="min-w-0">
              <strong className="block truncate text-sm text-white">{pokemonName(entry)}</strong>
              <small className="block truncate font-mono text-xs text-slate-500">
                {entry.moveset?.fast || entry.sourceIdentity?.speciesId}
              </small>
            </span>
            <span className="inline-flex items-center justify-end gap-1 rounded-full bg-cyan-300/12 px-3 py-2 font-mono text-sm font-black text-cyan-50">
              {entry.variant === "shadow" ? <Shield size={14} /> : <Swords size={14} />}
              {entry.score}
            </span>
          </button>
        ))}
        {!entries.length ? (
          <p className="p-8 text-center font-bold text-slate-400">Aucun classement PvP.</p>
        ) : null}
      </div>

      <Pagination meta={meta} options={options} onOptionsChange={onOptionsChange} />

      <Modal
        open={Boolean(selected)}
        title={selected ? pokemonName(selected) : "PvP"}
        description={selected ? `#${selected.rank} · score ${selected.score}` : ""}
        onClose={() => setSelected(null)}
        className="max-w-5xl"
      >
        <PvpDetail entry={selected} onOpenPokemon={onOpenPokemon} />
      </Modal>
    </div>
  );
}

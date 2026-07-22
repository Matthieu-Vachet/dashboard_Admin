"use client";

import { Check, ChevronDown, ChevronRight, Clipboard, Copy, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { buttonClass, fieldClass } from "./admin-ui";

function valueLabel(value) {
  if (value === null) return "null";
  if (Array.isArray(value)) return `Array(${value.length})`;
  if (typeof value === "object") return `Object(${Object.keys(value).length})`;
  return JSON.stringify(value);
}

function valueTone(value) {
  if (value === null) return "text-rose-300";
  if (typeof value === "string") return "text-emerald-200";
  if (typeof value === "number") return "text-cyan-200";
  if (typeof value === "boolean") return "text-violet-200";
  return "text-muted";
}

function childPath(parent, key, array) {
  if (!parent || parent === "$") return array ? `$[${key}]` : `$.${key}`;
  return array ? `${parent}[${key}]` : `${parent}.${key}`;
}

function searchPaths(value, query, path = "$", output = [], depth = 0) {
  if (!query || output.length >= 500 || depth > 40) return output;
  const needle = query.toLocaleLowerCase("fr");
  if (`${path} ${valueLabel(value)}`.toLocaleLowerCase("fr").includes(needle)) output.push(path);
  if (value && typeof value === "object") {
    const array = Array.isArray(value);
    for (const [key, child] of Object.entries(value)) {
      searchPaths(child, query, childPath(path, key, array), output, depth + 1);
      if (output.length >= 500) break;
    }
  }
  return output;
}

async function copy(value, label) {
  try {
    await navigator.clipboard.writeText(typeof value === "string" ? value : JSON.stringify(value, null, 2));
    toast.success(label);
  } catch {
    toast.error("Copie impossible.");
  }
}

function JsonNode({ name, value, path, depth, expandSignal, expandAll, matches, activePath }) {
  const compound = Boolean(value && typeof value === "object");
  const [open, setOpen] = useState(() => expandSignal > 0 ? expandAll : depth < 2);
  const descendantMatch = matches.some((match) => match === path || match.startsWith(`${path}.`) || match.startsWith(`${path}[`));
  const visibleOpen = open || Boolean(matches.length && descendantMatch);
  const active = activePath === path;
  const entries = compound ? Object.entries(value) : [];
  const isArray = Array.isArray(value);

  function onKeyDown(event) {
    if (!compound) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((current) => !current);
    } else if (event.key === "ArrowRight") setOpen(true);
    else if (event.key === "ArrowLeft") setOpen(false);
  }

  return (
    <div className={depth ? "border-l border-line-subtle pl-3" : ""} data-json-path={path}>
      <div className={`group flex min-h-7 min-w-0 items-center gap-1 rounded-md px-1 font-mono text-xs ${active ? "bg-amber-300/18 ring-1 ring-amber-200/35" : descendantMatch ? "bg-cyan-300/[.06]" : "hover:bg-surface-minimal"}`}>
        {compound ? (
          <button className="grid h-6 w-6 shrink-0 place-items-center rounded text-muted hover:text-domain-foreground" type="button" onClick={() => setOpen((current) => !current)} onKeyDown={onKeyDown} aria-expanded={visibleOpen} aria-label={`${visibleOpen ? "Replier" : "Déplier"} ${path}`}>
            {visibleOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : <span className="w-6 shrink-0" />}
        <button className="min-w-0 truncate text-left text-sky-200" type="button" onClick={() => copy(path, "Chemin JSON copié")} title={`Copier ${path}`}>{name}</button>
        <span className="text-slate-600">:</span>
        <span className={`min-w-0 flex-1 truncate ${valueTone(value)}`} title={compound ? `${entries.length} propriété(s)` : valueLabel(value)}>{compound ? valueLabel(value) : valueLabel(value)}</span>
        <button className="invisible grid h-6 w-6 shrink-0 place-items-center rounded text-disabled hover:bg-surface-emphasis hover:text-domain-foreground group-hover:visible focus:visible" type="button" onClick={() => copy(value, `Valeur de ${path} copiée`)} aria-label={`Copier la valeur ${path}`}><Copy size={12} /></button>
      </div>
      {compound && visibleOpen ? (
        <div>
          {entries.map(([key, child]) => <JsonNode key={key} name={isArray ? `[${key}]` : key} value={child} path={childPath(path, key, isArray)} depth={depth + 1} expandSignal={expandSignal} expandAll={expandAll} matches={matches} activePath={activePath} />)}
          {!entries.length ? <span className="ml-8 font-mono text-xs text-slate-600">{isArray ? "[]" : "{}"}</span> : null}
        </div>
      ) : null}
    </div>
  );
}

export function GameMasterJsonViewer({ value, title = "JSON brut" }) {
  const [query, setQuery] = useState("");
  const [matchIndex, setMatchIndex] = useState(0);
  const [expandSignal, setExpandSignal] = useState(0);
  const [expandAll, setExpandAll] = useState(false);
  const matches = useMemo(() => searchPaths(value, query.trim()), [query, value]);
  const activePath = matches.length ? matches[Math.min(matchIndex, matches.length - 1)] : null;

  function moveMatch(direction) {
    if (!matches.length) return;
    const next = (matchIndex + direction + matches.length) % matches.length;
    setMatchIndex(next);
    requestAnimationFrame(() => [...document.querySelectorAll("[data-json-path]")].find((node) => node.dataset.jsonPath === matches[next])?.scrollIntoView({ block: "center", behavior: "smooth" }));
  }

  function toggleAll(next) {
    setExpandAll(next);
    setExpandSignal((current) => current + 1);
  }

  return (
    <section className="min-w-0 rounded-2xl border border-line bg-slate-950/60" aria-label={title}>
      <header className="flex flex-col gap-2 border-b border-line-subtle p-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Search className="shrink-0 text-disabled" size={15} />
          <input className={`${fieldClass} min-h-9 py-1.5`} value={query} onChange={(event) => { setQuery(event.target.value); setMatchIndex(0); }} placeholder="Clé, chemin ou valeur…" aria-label="Rechercher dans le JSON" />
          <span className="shrink-0 font-mono text-[10px] font-black text-disabled">{matches.length ? `${matchIndex + 1}/${matches.length}` : "0"}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button className={`${buttonClass} min-h-9 px-3 py-1.5 text-xs`} type="button" onClick={() => moveMatch(-1)} disabled={!matches.length}>Préc.</button>
          <button className={`${buttonClass} min-h-9 px-3 py-1.5 text-xs`} type="button" onClick={() => moveMatch(1)} disabled={!matches.length}>Suiv.</button>
          <button className={`${buttonClass} min-h-9 px-3 py-1.5 text-xs`} type="button" onClick={() => toggleAll(true)}>Tout ouvrir</button>
          <button className={`${buttonClass} min-h-9 px-3 py-1.5 text-xs`} type="button" onClick={() => toggleAll(false)}>Replier</button>
          <button className={`${buttonClass} min-h-9 px-3 py-1.5 text-xs`} type="button" onClick={() => copy(value, "JSON complet copié")}><Clipboard size={13} /> Copier</button>
        </div>
      </header>
      <div className="max-h-[62vh] overflow-auto p-3" tabIndex={0}>
        <JsonNode key={expandSignal} name="$" value={value} path="$" depth={0} expandSignal={expandSignal} expandAll={expandAll} matches={matches} activePath={activePath} />
      </div>
      <footer className="flex items-center gap-2 border-t border-line-subtle px-3 py-2 text-[10px] font-bold text-disabled"><Check size={12} /> Une seule entrée brute est chargée à la fois; le Game Master complet reste côté serveur.</footer>
    </section>
  );
}

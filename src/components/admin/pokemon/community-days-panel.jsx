"use client";

import { FileJson, History, RefreshCcw, Search, Sparkles, Unlink } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { buttonClass, fieldClass, Panel, primaryButtonClass } from "./admin-ui";
import { PokemonArtwork } from "./pokemon-artwork";

const statusTabs = [["", "Tous"], ["upcoming", "À venir"], ["active", "En cours"], ["past", "Passés"], ["unresolved", "Non résolus"]];
const generationRanges = { 1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493], 5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 905], 9: [906, 1025] };

export function CommunityDaysPanel() {
  const [resource, setResource] = useState({ items: [], meta: {}, history: [] });
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [pokemon, setPokemon] = useState("");
  const [attack, setAttack] = useState("");
  const [shiny, setShiny] = useState("");
  const [generation, setGeneration] = useState("");
  const [busy, setBusy] = useState("");
  const [inspect, setInspect] = useState(null);

  const load = useCallback(async (notify = false) => {
    setBusy("load");
    try {
      const params = new URLSearchParams({ limit: "200" });
      if (status && status !== "unresolved") params.set("status", status);
      if (status === "unresolved") params.set("unresolved", "true");
      if (year) params.set("year", year);
      if (month) params.set("month", month);
      if (query) params.set("search", query);
      const response = await fetch(`/api/admin/community-days?${params}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Community Days indisponibles.");
      setResource(payload.data);
      if (notify) toast.success("Community Days actualisés.");
    } catch (error) {
      toast.error(error.message || "Community Days indisponibles.");
    } finally { setBusy(""); }
  }, [status, year, month, query]);

  useEffect(() => { const timer = setTimeout(() => load(false), 180); return () => clearTimeout(timer); }, [load]);

  async function sync() {
    setBusy("sync");
    try {
      const response = await fetch("/api/admin/community-days/sync", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Synchronisation impossible.");
      toast.success(`${payload.data.total} Community Day(s) conservé(s), ${payload.data.added} ajouté(s), ${payload.data.modified} modifié(s).`);
      await load(false);
    } catch (error) { toast.error(error.message || "Synchronisation impossible."); }
    finally { setBusy(""); }
  }

  const visible = useMemo(() => resource.items.filter((item) => {
    const featured = item.featuredPokemon || [];
    if (pokemon && !JSON.stringify(featured).toLowerCase().includes(pokemon.toLowerCase())) return false;
    if (attack && !JSON.stringify(item.exclusiveMoves || []).toLowerCase().includes(attack.toLowerCase())) return false;
    if (shiny === "yes" && !item.shinyAvailable) return false;
    if (shiny === "no" && item.shinyAvailable) return false;
    if (generation) {
      const [min, max] = generationRanges[generation] || [1, 1025];
      if (!featured.some((entry) => Number(entry.dexNr) >= min && Number(entry.dexNr) <= max)) return false;
    }
    return true;
  }), [resource.items, pokemon, attack, shiny, generation]);
  const latest = resource.meta?.sourceRun;

  return <section className="space-y-5">
    <Panel title="Community Days" eyebrow="Événements · référentiel permanent" action={<div className="flex flex-wrap gap-2"><button className={primaryButtonClass} type="button" onClick={sync} disabled={busy === "sync"}><Sparkles size={17} />{busy === "sync" ? "Synchronisation…" : "Synchroniser les Community Days"}</button><button className={buttonClass} type="button" onClick={() => load(true)}><RefreshCcw size={17} />Actualiser</button><button className={buttonClass} type="button" onClick={() => setInspect({ title: "JSON Community Days", value: visible })}><FileJson size={17} />Voir JSON</button><button className={buttonClass} type="button" onClick={() => setInspect({ title: "Historique des synchronisations", value: resource.history })}><History size={17} />Voir historique</button><button className={buttonClass} type="button" onClick={() => setStatus("unresolved")}><Unlink size={17} />Voir non résolus</button></div>}>
      <div className="flex flex-wrap gap-2">{statusTabs.map(([id, label]) => <button className={`${buttonClass} ${status === id ? "border-cyan-200/50 bg-cyan-300/15" : ""}`} type="button" key={id} onClick={() => setStatus(id)}>{label}</button>)}</div>
      <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-4"><label className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} /><input className={`${fieldClass} pl-11`} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Recherche" /></label><input className={fieldClass} value={year} onChange={(event) => setYear(event.target.value)} placeholder="Année" inputMode="numeric" /><select className={fieldClass} value={month} onChange={(event) => setMonth(event.target.value)}><option value="">Tous les mois</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{new Date(2020, index).toLocaleString("fr-FR", { month: "long" })}</option>)}</select><input className={fieldClass} value={pokemon} onChange={(event) => setPokemon(event.target.value)} placeholder="Pokémon" /><input className={fieldClass} value={attack} onChange={(event) => setAttack(event.target.value)} placeholder="Attaque exclusive" /><select className={fieldClass} value={shiny} onChange={(event) => setShiny(event.target.value)}><option value="">Shiny : tous</option><option value="yes">Shiny disponible</option><option value="no">Shiny incomplet</option></select><select className={fieldClass} value={generation} onChange={(event) => setGeneration(event.target.value)}><option value="">Toutes générations</option>{Array.from({ length: 9 }, (_, index) => <option key={index + 1} value={index + 1}>Génération {index + 1}</option>)}</select><div className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-xs font-bold text-slate-300">{visible.length} résultat(s) · Sync {latest?.savedAt ? new Date(latest.savedAt).toLocaleString("fr-FR") : "jamais"}</div></div>
    </Panel>
    <section className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">{visible.map((item) => {
      const featured = item.featuredPokemon?.[0] || null;
      return <article className="rounded-2xl border border-white/10 bg-slate-950/35 p-4" key={item.id}><div className="flex gap-3"><div className="grid grid-cols-2 gap-2"><PokemonArtwork pokemon={featured} alt={item.title} className="h-20 w-20" /><PokemonArtwork pokemon={featured} shiny alt={`${item.title} shiny`} className="h-20 w-20" /></div><div className="min-w-0"><h3 className="font-black text-white">{item.title}</h3><p className="mt-1 text-xs font-bold text-slate-400">{new Date(item.startDate).toLocaleDateString("fr-FR")} · {item.status}</p><p className="mt-2 text-xs font-bold text-cyan-100">{(item.exclusiveMoves || []).map((move) => `${move.move} (${move.pokemon})`).join(" · ") || "Aucune attaque source"}</p></div></div><ul className="mt-3 space-y-1 text-xs font-bold text-slate-300">{(item.bonuses || []).map((bonus) => <li key={bonus}>• {bonus}</li>)}</ul><div className="mt-3 flex items-center justify-between gap-2"><span className={`rounded-full border px-2 py-1 text-[10px] font-black ${item.featuredPokemon?.every((entry) => entry.resolutionStatus === "matched") ? "border-emerald-200/20 text-emerald-100" : "border-amber-200/20 text-amber-100"}`}>{item.featuredPokemon?.every((entry) => entry.resolutionStatus === "matched") ? "Résolution locale complète" : `Résolution à vérifier${featured?.resolutionReason ? ` · ${featured.resolutionReason}` : ""}`}</span><Button size="sm" variant="secondary" type="button" onClick={() => setInspect({ title: item.title, value: item })}>Détail JSON</Button></div></article>;
    })}</section>
    <Modal open={Boolean(inspect)} onClose={() => setInspect(null)} title={inspect?.title || "Détail Community Day"} description="Données archivées et payload source conservés sans modification." className="max-w-5xl">
      <pre className="max-h-[68dvh] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950/70 p-4 text-xs text-cyan-50">{JSON.stringify(inspect?.value || {}, null, 2)}</pre>
    </Modal>
  </section>;
}

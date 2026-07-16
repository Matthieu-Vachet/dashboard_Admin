"use client";

/* eslint-disable @next/next/no-img-element */
import { Archive, Download, Eraser, Image as ImageIcon, RefreshCcw, ScanSearch } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { buttonClass, Panel, primaryButtonClass } from "./admin-ui";

function Stat({ label, value }) {
  return <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"><span className="text-xs font-black uppercase tracking-[.14em] text-slate-400">{label}</span><strong className="mt-2 block text-3xl font-black text-white">{Number(value) || 0}</strong></div>;
}

export function DynamaxImagesPanel() {
  const [state, setState] = useState(null);
  const [busy, setBusy] = useState("");

  const load = useCallback(async (notify = false) => {
    setBusy("load");
    try {
      const response = await fetch("/api/admin/dynamax-images", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Images Dynamax indisponibles.");
      setState(payload.data || null);
      if (notify) toast.success("Galerie Dynamax actualisée.");
    } catch (error) {
      toast.error(error.message || "Images Dynamax indisponibles.");
    } finally {
      setBusy("");
    }
  }, []);

  useEffect(() => { const timer = setTimeout(() => load(false), 0); return () => clearTimeout(timer); }, [load]);

  async function scan() {
    setBusy("scan");
    try {
      const response = await fetch("/api/admin/dynamax-images/scan", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Scan Dynamax impossible.");
      setState(payload.data);
      toast.success(`${payload.data?.counts?.downloaded || 0} image(s) Dynamax téléchargée(s).`);
    } catch (error) {
      toast.error(error.message || "Scan Dynamax impossible.");
    } finally {
      setBusy("");
    }
  }

  async function clearCache() {
    setBusy("clear");
    try {
      const response = await fetch("/api/admin/dynamax-images", { method: "DELETE" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Suppression du cache impossible.");
      setState(null);
      toast.success("Cache Dynamax vidé.");
    } catch (error) {
      toast.error(error.message || "Suppression du cache impossible.");
    } finally {
      setBusy("");
    }
  }

  const counts = state?.counts || {};
  return <section className="space-y-5">
    <Panel title="Images Dynamax" eyebrow="Assets · privé Admin" action={<div className="flex flex-wrap gap-2">
      <button className={primaryButtonClass} type="button" onClick={scan} disabled={busy === "scan"}><ScanSearch size={17} />{busy === "scan" ? "Scan en cours…" : "Scanner les images Dynamax"}</button>
      <a className={`${buttonClass} ${!state ? "pointer-events-none opacity-50" : ""}`} href="/api/admin/dynamax-images/export.zip"><Download size={17} />Télécharger le ZIP</a>
      <button className={buttonClass} type="button" onClick={() => load(true)} disabled={busy === "load"}><RefreshCcw className={busy === "load" ? "animate-spin" : ""} size={17} />Actualiser</button>
      <button className={buttonClass} type="button" onClick={clearCache} disabled={!state || busy === "clear"}><Eraser size={17} />Vider le cache temporaire</button>
    </div>}>
      <p className="rounded-2xl border border-violet-200/15 bg-violet-300/[.07] p-4 text-sm font-bold leading-6 text-violet-50">Le scan et les téléchargements sont exécutés côté serveur. Une consultation de cette page ne déclenche jamais de scraping et aucune donnée Pokémon n’est créée.</p>
      <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <Stat label="Images détectées" value={counts.detected} /><Stat label="Images téléchargées" value={counts.downloaded} /><Stat label="Doublons ignorés" value={counts.duplicatesIgnored} /><Stat label="Échecs" value={counts.failed} />
      </div>
      {state?.lastScanAt ? <p className="mt-3 text-xs font-bold text-slate-400">Dernier scan : {new Date(state.lastScanAt).toLocaleString("fr-FR")}</p> : null}
    </Panel>
    {state?.images?.length ? <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      {state.images.map((item) => <article className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-3" key={`${item.sourceImageUrl}-${item.filename}`}>
        <div className="grid aspect-square place-items-center rounded-xl bg-white/[.045]">{item.downloadStatus === "success" ? <img className="h-full w-full object-contain p-3" src={`/api/admin/dynamax-images/image?file=${encodeURIComponent(item.filename)}`} alt={item.name} loading="lazy" /> : <ImageIcon className="text-slate-600" size={38} />}</div>
        <h3 className="mt-3 truncate font-black text-white">{item.name}</h3>
        <p className="text-xs font-bold text-slate-400">{item.dexNr ? `Pokédex #${String(item.dexNr).padStart(4, "0")}` : "Numéro Pokédex indisponible"}</p>
        <p className="mt-2 break-all font-mono text-[10px] text-cyan-100">{item.filename}</p>
        <span className={`mt-2 inline-flex rounded-full border px-2 py-1 text-[10px] font-black uppercase ${item.downloadStatus === "success" ? "border-emerald-200/20 bg-emerald-300/10 text-emerald-100" : "border-red-200/20 bg-red-300/10 text-red-100"}`}>{item.downloadStatus}</span>
        {item.error ? <p className="mt-2 text-xs font-bold text-red-100">{item.error}</p> : null}
      </article>)}
    </section> : <div className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm font-bold text-slate-400"><Archive className="mx-auto mb-3" />Aucun scan en cache.</div>}
  </section>;
}

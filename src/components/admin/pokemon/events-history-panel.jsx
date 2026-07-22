"use client";

/* eslint-disable @next/next/no-img-element */
import { FileDiff, RefreshCcw, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { fieldClass, Panel } from "./admin-ui";

export function EventsHistoryPanel() {
  const [resource, setResource] = useState({ items: [], meta: {} });
  const [filters, setFilters] = useState({ search: "", year: "", month: "", type: "", status: "", provider: "", pokemon: "", activeInCurrentFeed: "", modified: "" });
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (notify = false) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100", ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)) });
      const response = await fetch(`/api/admin/events/archive?${params}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok || payload.success === false) throw new Error(payload.error || "Archive Events indisponible.");
      setResource(payload.data);
      if (notify) toast.success("Archive Events actualisée.");
    } catch (error) { toast.error(error.message || "Archive Events indisponible."); }
    finally { setLoading(false); }
  }, [filters]);
  useEffect(() => { const timer = setTimeout(() => load(false), 180); return () => clearTimeout(timer); }, [load]);

  function update(key) { return (event) => setFilters((current) => ({ ...current, [key]: event.target.value })); }

  async function openDetail(item) {
    try {
      const response = await fetch(`/api/admin/events/archive/${encodeURIComponent(item.id)}`, { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Détail indisponible.");
      setSelected(payload.data);
    } catch (error) { toast.error(error.message || "Détail indisponible."); }
  }

  return <section className="space-y-5"><Panel title="Historique des événements" eyebrow="Archive permanente MongoDB" action={<Button type="button" icon={<RefreshCcw size={17} />} loading={loading} loadingText="Actualisation…" onClick={() => load(true)}>Actualiser</Button>}>
    <p className="rounded-2xl border border-emerald-200/15 bg-emerald-300/[.07] p-4 text-sm font-bold text-emerald-50">Aucun événement n’est supprimé de cette archive. « Absent du flux » signifie uniquement qu’il n’est plus présent dans le flux courant LeekDuck.</p>
    <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-5"><label className="relative xl:col-span-2"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-disabled" size={16} /><input className={`${fieldClass} pl-11`} value={filters.search} onChange={update("search")} placeholder="Recherche" /></label><input className={fieldClass} value={filters.year} onChange={update("year")} placeholder="Année" /><Select aria-label="Mois" className={fieldClass} value={filters.month} onChange={update("month")}><option value="">Tous les mois</option>{Array.from({ length: 12 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</Select><input className={fieldClass} value={filters.type} onChange={update("type")} placeholder="Type" /><Select aria-label="Statut" className={fieldClass} value={filters.status} onChange={update("status")}><option value="">Tous statuts</option><option value="past">Passés</option><option value="active">Actifs</option><option value="upcoming">À venir</option></Select><input className={fieldClass} value={filters.provider} onChange={update("provider")} placeholder="Provider" /><input className={fieldClass} value={filters.pokemon} onChange={update("pokemon")} placeholder="Pokémon" /><Select aria-label="Présence dans le flux actuel" className={fieldClass} value={filters.activeInCurrentFeed} onChange={update("activeInCurrentFeed")}><option value="">Présence flux : toutes</option><option value="true">Actif dans le flux</option><option value="false">Disparu du flux</option></Select><Select aria-label="Révision" className={fieldClass} value={filters.modified} onChange={update("modified")}><option value="">Révisions : toutes</option><option value="true">Modifiés</option><option value="false">Jamais modifiés</option></Select></div>
    <div className="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4"><div className="rounded-2xl bg-surface-inset p-4"><strong className="text-3xl text-domain-foreground">{resource.meta?.total || 0}</strong><span className="block text-xs font-bold text-muted">événements archivés</span></div><div className="rounded-2xl bg-surface-inset p-4"><strong className="text-3xl text-domain-foreground">{resource.meta?.revisions || 0}</strong><span className="block text-xs font-bold text-muted">révisions</span></div><div className="rounded-2xl bg-surface-inset p-4"><strong className="text-3xl text-domain-foreground">{resource.items?.filter((item) => item.activeInCurrentFeed).length || 0}</strong><span className="block text-xs font-bold text-muted">présents dans cette page</span></div><div className="rounded-2xl bg-surface-inset p-4"><strong className="text-3xl text-domain-foreground">{resource.items?.filter((item) => !item.activeInCurrentFeed).length || 0}</strong><span className="block text-xs font-bold text-muted">absents du flux</span></div></div>
  </Panel><section className="grid gap-3 lg:grid-cols-2 2xl:grid-cols-3">{resource.items?.map((item) => <article className="rounded-2xl border border-line bg-surface-inset p-4" key={item.canonicalKey}><div className="flex gap-3">{item.images?.[0] ? <img className="h-20 w-20 rounded-xl object-cover" src={item.images[0]} alt="" loading="lazy" /> : <div className="h-20 w-20 rounded-xl bg-surface-minimal" />}<div className="min-w-0"><h3 className="font-black text-domain-foreground">{item.title}</h3><p className="mt-1 text-xs font-bold text-muted">{new Date(item.startDate).toLocaleString("fr-FR")} → {new Date(item.endDate).toLocaleString("fr-FR")}</p><p className="mt-2 text-xs font-bold text-cyan-100">{item.eventType} · {item.provider}</p></div></div><dl className="mt-3 grid grid-cols-2 gap-2 text-xs"><div><dt className="text-disabled">Première détection</dt><dd className="font-bold text-foreground">{new Date(item.firstSeenAt).toLocaleString("fr-FR")}</dd></div><div><dt className="text-disabled">Dernière détection</dt><dd className="font-bold text-foreground">{new Date(item.lastSeenAt).toLocaleString("fr-FR")}</dd></div></dl><div className="mt-3 flex flex-wrap items-center gap-2"><span className="rounded-full border border-line px-2 py-1 text-[10px] font-black text-domain-foreground">{item.status}</span><span className={`rounded-full border px-2 py-1 text-[10px] font-black ${item.activeInCurrentFeed ? "border-emerald-200/20 text-emerald-100" : "border-amber-200/20 text-amber-100"}`}>{item.activeInCurrentFeed ? "Actif dans le flux" : "Absent du flux"}</span><span className="rounded-full border border-violet-200/20 px-2 py-1 text-[10px] font-black text-violet-100">{Math.max(0, item.revision - 1)} révision(s)</span><Button size="sm" variant="secondary" type="button" onClick={() => openDetail(item)}>Détail</Button></div></article>)}</section>
  <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title={selected?.title || "Détail de l’événement"} description="Archive permanente, payload source et révisions conservées." className="max-w-6xl">
    <div className="mb-4 flex items-center gap-2 font-black text-cyan-100"><FileDiff size={19} />Comparaison de l’événement</div>
    <div className="grid gap-4 lg:grid-cols-2"><section className="min-w-0"><h4 className="font-black text-cyan-100">JSON courant et payload source</h4><pre className="mt-2 max-h-[58dvh] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950/70 p-4 text-xs text-cyan-50">{JSON.stringify(selected || {}, null, 2)}</pre></section><section className="min-w-0"><h4 className="font-black text-violet-100">Historique des révisions et diff</h4><pre className="mt-2 max-h-[58dvh] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950/70 p-4 text-xs text-violet-50">{JSON.stringify(selected?.revisionHistory || [], null, 2)}</pre></section></div>
  </Modal>
  </section>;
}

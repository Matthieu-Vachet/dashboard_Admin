"use client";

import { FileJson, Save, X } from "lucide-react";
import { useId } from "react";
import { POKEMON_EVENT_TYPES } from "@/data/pokemon-events";
import { fieldClass } from "@/components/admin/pokemon/admin-ui";
import { ModalPortal } from "@/components/admin/shared/modal-portal";
import { Button } from "@/components/ui/button";
import { Field as FieldRoot } from "@/components/ui/field";
import { Select } from "@/components/ui/select";

export function EventEditorModal({ draft, busy, statusOptions, onChange, onClose, onSave }) {
  const titleId = useId();
  const update = (patch) => onChange((current) => ({ ...current, ...patch }));
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[1200] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl" onClick={onClose}>
        <article className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-line bg-[#07111f] p-4 shadow-[0_30px_120px_rgba(0,0,0,.5)] sm:p-6" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">CRUD admin</p>
              <h2 id={titleId} className="mt-1 text-2xl font-black text-domain-foreground">{draft.originalId ? "Modifier l'event" : "Ajouter un event"}</h2>
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-emphasis text-domain-foreground" type="button" onClick={onClose} aria-label="Fermer l’éditeur d’event">
              <X size={19} />
            </button>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            <Field label="Titre" value={draft.title} onChange={(value) => update({ title: value })} />
            <Field label="Identifiant" value={draft.id} placeholder="auto si vide" onChange={(value) => update({ id: value })} />
            <SelectField label="Type" value={draft.type} onChange={(value) => update({ type: value })} options={POKEMON_EVENT_TYPES.map((type) => [type.id, type.label])} />
            <SelectField label="Statut" value={draft.status} onChange={(value) => update({ status: value })} options={statusOptions.filter(([id]) => id !== "all")} />
            <Field label="Début" type="datetime-local" value={draft.startDate} onChange={(value) => update({ startDate: value })} />
            <Field label="Fin" type="datetime-local" value={draft.endDate} onChange={(value) => update({ endDate: value })} />
            <Field label="Timezone" value={draft.timezone} onChange={(value) => update({ timezone: value })} />
            <Field label="Source" value={draft.source} onChange={(value) => update({ source: value })} />
            <Field label="Icon URL" value={draft.icon} onChange={(value) => update({ icon: value })} />
            <Field label="Banner URL" value={draft.banner} onChange={(value) => update({ banner: value })} />
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-2">
            <Area label="Description" value={draft.description} onChange={(value) => update({ description: value })} />
            <Area label="Pokémon liés (un par ligne)" value={draft.featuredPokemonText} onChange={(value) => update({ featuredPokemonText: value })} />
            <Area label="Bonus (un par ligne)" value={draft.bonusesText} onChange={(value) => update({ bonusesText: value })} />
            <Area label="Liens sources: Label | URL" value={draft.linksText} onChange={(value) => update({ linksText: value })} />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" onClick={onClose} disabled={busy}>Annuler</Button>
            <Button variant="primary" type="button" icon={<Save size={17} />} loading={busy} loadingText="Enregistrement…" onClick={onSave}>Enregistrer</Button>
          </div>
        </article>
      </div>
    </ModalPortal>
  );
}

export function ImportModal({ value, busy, onChange, onClose, onImport }) {
  const titleId = useId();
  return (
    <ModalPortal>
      <div className="fixed inset-0 z-[1200] grid place-items-center bg-slate-950/82 p-3 backdrop-blur-xl" onClick={onClose}>
        <article className="w-full max-w-4xl rounded-[2rem] border border-line bg-[#07111f] p-4 shadow-[0_30px_120px_rgba(0,0,0,.5)] sm:p-6" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={(event) => event.stopPropagation()}>
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">Import JSON</p>
              <h2 id={titleId} className="mt-1 text-2xl font-black text-domain-foreground">Importer des events</h2>
            </div>
            <button className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface-emphasis text-domain-foreground" type="button" onClick={onClose} aria-label="Fermer l’import des events">
              <X size={19} />
            </button>
          </div>
          <textarea
            aria-label="Import JSON"
            className={`${fieldClass} min-h-[360px] font-mono text-xs leading-5`}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder='{"events":[{"id":"community-day-example","title":"Community Day","type":"community_day","startDate":"2026-07-01T10:00:00.000Z","endDate":"2026-07-01T17:00:00.000Z"}]}'
          />
          <div className="mt-5 flex justify-end gap-2">
            <Button type="button" onClick={onClose} disabled={busy}>Annuler</Button>
            <Button variant="primary" type="button" icon={<FileJson size={17} />} loading={busy} loadingText="Import…" onClick={onImport}>Importer</Button>
          </div>
        </article>
      </div>
    </ModalPortal>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <FieldRoot
      className="grid gap-1.5"
      label={label}
      labelClassName="text-xs font-black uppercase tracking-[0.16em] text-disabled"
    >
      <input className={fieldClass} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </FieldRoot>
  );
}

function SelectField({ label, value, options, onChange }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-black uppercase tracking-[0.16em] text-disabled">{label}</span>
      <Select className={fieldClass} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([id, labelText]) => (
          <option key={id} value={id}>{labelText}</option>
        ))}
      </Select>
    </label>
  );
}

function Area({ label, value, onChange }) {
  return (
    <FieldRoot
      className="grid gap-1.5"
      label={label}
      labelClassName="text-xs font-black uppercase tracking-[0.16em] text-disabled"
    >
      <textarea className={`${fieldClass} min-h-36 py-3 leading-6`} value={value} onChange={(event) => onChange(event.target.value)} />
    </FieldRoot>
  );
}

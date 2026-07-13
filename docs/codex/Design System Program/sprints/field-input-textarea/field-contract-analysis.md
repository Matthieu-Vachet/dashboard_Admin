# Analyse de contrat — Field / Input / Textarea

## Contrats courants

| Contrat | Input | Textarea | Risque | Décision |
|---|---|---|---|---|
| Élément HTML | `<input>` | `<textarea>` | faible | conserver |
| Ref forwarding | `forwardRef<HTMLInputElement>` | `forwardRef<HTMLTextAreaElement>` | faible | conserver |
| Props natives | `InputHTMLAttributes` | `TextareaHTMLAttributes` | faible | conserver sans API métier |
| Base | `min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3` | `min-h-32 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3` | moyen | ne pas modifier les primitives |
| Typographie | `text-sm font-semibold` | `text-sm font-medium leading-6` | moyen | préserver par contrôle |
| Focus | `outline-none`, bordure `brand-2/55`, fond blanc 9 % | identique | moyen | comparer default/focus en navigateur |
| Disabled | aucune classe contractuelle dédiée | aucune classe contractuelle dédiée | moyen | comportement natif, cas Learning mesuré |
| Required | attribut natif transmis, aucun indicateur visuel | idem | moyen | formulaire Login mesuré ; ne pas inventer d’astérisque |
| Invalid | attribut natif transmis, aucun style dédié, 0 usage ARIA | idem | élevé | ne pas créer d’état invalid sans usage relié |
| ReadOnly | attribut natif transmis | attribut natif transmis | moyen | deux textareas legacy restent hors migration |
| Placeholder | `placeholder:text-muted/70` | identique | moyen | ne jamais assimiler placeholder et label |
| Controlled | 45/47 sites | 12/12 sites | faible | handlers inchangés |
| Uncontrolled | 2/47 sites, Login | 0/12 | faible | contrat natif conservé |
| Resize | sans règle | `resize-none` par défaut | moyen | `resize-y` local continue à gagner via `tailwind-merge` |
| Taille/largeur | `min-h-11`, `w-full` | `min-h-32`, `w-full` | moyen | les overrides locaux restent après les classes de base |
| Border/background | tokens `line`, blanc 6 % | identique | moyen | dark/light obligatoires |
| `className` | fusionné en dernier par `cn` | fusionné en dernier par `cn` | élevé | caractériser les conflits `min-h`, `p`, `font`, `resize`, focus |
| file | aucun usage de primitive ; 2 natifs | sans objet | élevé | exclu |
| checkbox | aucun usage de primitive ; 8 natifs | sans objet | élevé | exclu |
| radio | 1 natif `sr-only` | sans objet | élevé | exclu |
| range | aucun usage réel | sans objet | élevé | exclu |
| number | 6 sites, dont la paire `RangeFields` | sans objet | moyen | champs simples conservés ; paire métier non migrée |
| search | réalisé avec `type=text` et icône | sans objet | élevé | aucune primitive SearchField créée |

`cn` applique `clsx`, puis `tailwind-merge`. Une classe consommateur placée en dernier peut donc remplacer `min-h-11`, `min-h-32`, `p-3`, `px-3`, la graisse, le fond, la bordure ou `resize-none`. Cette propriété rend possibles les overrides actuels, mais interdit de conclure à l’équivalence sur les seules chaînes de classes.

## Décision Field

La création est justifiée par 27 sites ayant exactement cette anatomie :

```tsx
<label className="block">
  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Libellé</span>
  <Input className="mt-2" />
</label>
```

Ces sites partagent structure, association implicite, accessibilité, responsive et absence de description/erreur. Deux wrappers Events possèdent la même anatomie logique avec des classes legacy différentes et peuvent composer la même racine sans changer leur contrôle.

### Option A retenue

```tsx
<Field label="Nom">
  <Input />
</Field>
```

API initiale retenue : props natives de `<label>`, `label: ReactNode`, `labelClassName?: string`, `children`, `className`, ref de label. Les valeurs par défaut reproduisent exactement les 27 sites répétés. `htmlFor` reste disponible comme prop native ; les migrations du sprint conservent l’association implicite en imbriquant le contrôle.

### Option B refusée pour ce sprint

`FieldLabel`, `FieldDescription` et `FieldError` ajouteraient plusieurs exports alors qu’aucun usage courant n’a de description ou d’erreur reliée. L’option B n’est pas interdite à terme, mais elle n’est pas prouvée aujourd’hui.

### Bornes volontaires

`Field` ne clone pas l’enfant, ne génère pas d’ID, ne gère ni valeur, ni `onChange`, ni validation, ni soumission. Il n’expose pas encore `description`, `error`, `required` ou `disabled` : ces états ne possèdent pas d’anatomie commune suffisante. Cette retenue évite d’inventer une API inaccessible ou visuellement nouvelle.

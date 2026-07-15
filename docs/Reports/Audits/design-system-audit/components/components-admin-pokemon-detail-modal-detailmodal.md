---
id: MWI-COMP-178
component: "DetailModal"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 1018-1388
figma_priority: 34
evidence: static_code
---

# DetailModal

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-178`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:1018.
- File range: lines 1018–1388.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useMemo, useState | external package |
| react-dom | createPortal | external package |
| @/components/site/pokemon-style | preferredPokemonImage, typeColors | internal |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-156 | [Section](../components/components-admin-pokemon-detail-modal-section.md) (MWI-COMP-156) | JSX/import relation |
| MWI-COMP-158 | [TypeBadgeList](../components/components-admin-pokemon-detail-modal-typebadgelist.md) (MWI-COMP-158) | JSX/import relation |
| MWI-COMP-159 | [DataGrid](../components/components-admin-pokemon-detail-modal-datagrid.md) (MWI-COMP-159) | JSX/import relation |
| MWI-COMP-160 | [TranslationGrid](../components/components-admin-pokemon-detail-modal-translationgrid.md) (MWI-COMP-160) | JSX/import relation |
| MWI-COMP-161 | [EmptyInline](../components/components-admin-pokemon-detail-modal-emptyinline.md) (MWI-COMP-161) | JSX/import relation |
| MWI-COMP-162 | [CandyAmount](../components/components-admin-pokemon-detail-modal-candyamount.md) (MWI-COMP-162) | JSX/import relation |
| MWI-COMP-163 | [RewardValue](../components/components-admin-pokemon-detail-modal-rewardvalue.md) (MWI-COMP-163) | JSX/import relation |
| MWI-COMP-166 | [ReleaseStatusGrid](../components/components-admin-pokemon-detail-modal-releasestatusgrid.md) (MWI-COMP-166) | JSX/import relation |
| MWI-COMP-167 | [MoveList](../components/components-admin-pokemon-detail-modal-movelist.md) (MWI-COMP-167) | JSX/import relation |
| MWI-COMP-169 | [CandyFamilyPanel](../components/components-admin-pokemon-detail-modal-candyfamilypanel.md) (MWI-COMP-169) | JSX/import relation |
| MWI-COMP-170 | [EvolutionPanel](../components/components-admin-pokemon-detail-modal-evolutionpanel.md) (MWI-COMP-170) | JSX/import relation |
| MWI-COMP-171 | [DetailNavigation](../components/components-admin-pokemon-detail-modal-detailnavigation.md) (MWI-COMP-171) | JSX/import relation |
| MWI-COMP-172 | [AssetGallery](../components/components-admin-pokemon-detail-modal-assetgallery.md) (MWI-COMP-172) | JSX/import relation |
| MWI-COMP-174 | [IssuesPanel](../components/components-admin-pokemon-detail-modal-issuespanel.md) (MWI-COMP-174) | JSX/import relation |
| MWI-COMP-175 | [PvpPanel](../components/components-admin-pokemon-detail-modal-pvppanel.md) (MWI-COMP-175) | JSX/import relation |
| MWI-COMP-176 | [JsonBlock](../components/components-admin-pokemon-detail-modal-jsonblock.md) (MWI-COMP-176) | JSX/import relation |
| MWI-COMP-177 | [AdminActions](../components/components-admin-pokemon-detail-modal-adminactions.md) (MWI-COMP-177) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-260 | [DetailModal](../components/components-checklist-detail-modal-detailmodal.md) (MWI-COMP-260) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div role="presentation">
  - <div role="dialog" aria-modal="true">
    - <div>
      - <div />
      - <div>
        - <div>
          - <img />
          - <span />
        - <div>
          - <span>
          - <h2>
          - <div>
            - <TypeBadgeList />
            - <span>
            - <span>
              - <img />
          - <p>
        - <button aria-label="Fermer">
    - <div>
      - <DetailNavigation />
      - <nav aria-label="Onglets de fiche">
        - <button>
          - <img />
          - <span>
      - <div>
      - <div>
        - <Fragment>
          - <AdminActions />
          - <TranslationGrid />
          - <Section>
            - <DataGrid />
          - <Section>
            - <DataGrid />
          - <CandyFamilyPanel />
          - <EvolutionPanel />
          - <Section>
            - <div>
              - <span>
                - <span>
                - <span />
          - <ReleaseStatusGrid />
        - <Fragment>
          - <Section>
            - <DataGrid />
          - <Section>
            - <DataGrid />
          - <Section>
            - <div>
              - <div>
                - <span>
                - <strong>
            - <EmptyInline>
        - <Fragment>
          - <MoveList />
          - <MoveList />
          - <MoveList />
          - <MoveList />
          - <MoveList />
        - <PvpPanel />
        - <Section>
          - <DataGrid />
        - <AssetGallery />
        - <IssuesPanel />
        - <div>
          - <Section>
            - <JsonBlock />
          - <Section>
            - <JsonBlock />
            - <EmptyInline>

Unique HTML/React tags: `AdminActions`, `AssetGallery`, `button`, `CandyAmount`, `CandyFamilyPanel`, `DataGrid`, `DetailNavigation`, `div`, `EmptyInline`, `EvolutionPanel`, `h2`, `img`, `IssuesPanel`, `JsonBlock`, `MoveList`, `nav`, `p`, `PvpPanel`, `ReleaseStatusGrid`, `RewardValue`, `Section`, `span`, `strong`, `TranslationGrid`, `TypeBadgeList`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `activeTab = "overview"`.
- Event handlers exposed in JSX: `onAssetAudit`, `onAssetChecked`, `onAuditUrls`, `onClick`, `onCopyPatch`, `onNext`, `onOpenRelated`, `onPrevious`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| allEntries | allEntries = [] | See exact signature/contract below |
| assetChecked | assetChecked = false | See exact signature/contract below |
| detail | Not found | See exact signature/contract below |
| entry | Not found | See exact signature/contract below |
| extraPanel | Not found | See exact signature/contract below |
| mode | mode = "public" | See exact signature/contract below |
| nextEntry | Not found | See exact signature/contract below |
| onAssetAudit | Not found | See exact signature/contract below |
| onAssetChecked | Not found | See exact signature/contract below |
| onAuditUrls | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| onCopyPatch | Not found | See exact signature/contract below |
| onNext | Not found | See exact signature/contract below |
| onOpenRelated | Not found | See exact signature/contract below |
| onPrevious | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |
| previousEntry | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |
| weatherCatalog | weatherCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  open,
  entry,
  detail,
  mode = "public",
  onClose,
  onCopyPatch,
  onAuditUrls,
  onAssetAudit,
  assetChecked = false,
  onAssetChecked,
  extraPanel,
  onPrevious,
  onNext,
  previousEntry,
  nextEntry,
  allEntries = [],
  onOpenRelated,
  typeCatalog = [],
  weatherCatalog = [],
}
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Checked, Unchecked, Error, Warning, Success, Empty, Collapsed, Expanded, Scrollable.
- Text properties: `allEntries`, `assetChecked`, `detail`, `entry`, `extraPanel`, `mode`, `nextEntry`, `onAssetAudit`, `onAssetChecked`, `onAuditUrls`, `onClose`, `onCopyPatch`, `onNext`, `onOpenRelated`, `onPrevious`, `open`, `previousEntry`, `typeCatalog`, `weatherCatalog`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Not found | Not found |
| Selected | Not found | Not found |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-end, justify-between, justify-center, place-items-center, sm:items-center`.
- Positioning utilities: `absolute, fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow`, `--accent-muted`, `--foreground`, `--line`, `--line-strong`, `--muted` |
| Literal colors | `#0b6dc3`, `#38bdf8`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `color-mix(in srgb, ${mainTypeColor} 13%, rgba(4,10,22,.82))), url("${catchBackground}")`, `color-mix(in srgb, ${mainTypeColor} 24%, #0d1a2b), #08111f 72%)`, `color-mix(in srgb, ${mainTypeColor} 28%, transparent), transparent 28%)`, `rgba(${channel(color.r)`, `rgba(0,0,0,.42)`, `rgba(0,0,0,.65)`, `rgba(14,165,233,.25)`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.7)`, `rgba(15,23,42,.89)`, `rgba(2,6,23,.58)`, `rgba(2,6,23,.68)`, `rgba(2,6,23,.93)`, `rgba(248,113,113,.24)`, `rgba(248,250,252,.82)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.035)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.08)`, `rgba(255,255,255,.18)`, `rgba(255,255,255,.9)`, `rgba(4,10,22,.86)`, `rgba(8,13,25,.52)` |
| Spacing | `gap-2`, `gap-4`, `inset-0`, `mt-1`, `mt-2`, `mt-4`, `p-0`, `p-4`, `pb-2`, `pr-1`, `pr-12`, `px-3`, `px-4`, `py-1.5`, `py-2`, `py-3`, `right-0`, `sm:gap-6`, `sm:p-6`, `sm:px-4`, `sm:px-6`, `sm:py-4`, `space-y-4`, `top-0` |
| Sizing | `h-10`, `h-16`, `h-2.5`, `h-24`, `h-4`, `h-5`, `lg:h-36`, `lg:w-36`, `max-h-[48dvh]`, `max-h-[96dvh]`, `max-h-full`, `max-w-6xl`, `min-h-0`, `min-h-9`, `min-w-0`, `sm:h-32`, `sm:max-h-[92dvh]`, `sm:w-32`, `w-10`, `w-16`, `w-2.5`, `w-24`, `w-4`, `w-5`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-light`, `font-mono`, `sm:text-4xl`, `sm:text-sm`, `text-2xl`, `text-3xl`, `text-amber-100`, `text-cyan-100`, `text-cyan-100/80`, `text-cyan-50`, `text-emerald-100`, `text-fuchsia-100`, `text-indigo-100`, `text-orange-100`, `text-red-100`, `text-rose-100`, `text-sky-100`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-stone-100`, `text-violet-100`, `text-white`, `text-xs`, `text-yellow-100`, `tracking-[0.22em]`, `tracking-tight`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-t-[2rem]`, `sm:rounded-[2rem]` |
| Borders/strokes | `border`, `border-[10px]`, `border-amber-200/16`, `border-amber-200/20`, `border-amber-300/45`, `border-b`, `border-cyan-100/35`, `border-cyan-200/16`, `border-cyan-200/20`, `border-cyan-200/45`, `border-cyan-200/50`, `border-emerald-200/16`, `border-emerald-200/20`, `border-emerald-300/35`, `border-fuchsia-300/45`, `border-indigo-300/45`, `border-orange-300/45`, `border-red-200/60`, `border-red-300/30`, `border-red-300/35`, `border-red-300/45`, `border-rose-200/20`, `border-rose-300/45`, `border-sky-300/45`, `border-stone-200/45`, `border-violet-200/16`, `border-violet-200/20`, `border-violet-300/45`, `border-white/10`, `border-white/20`, `border-white/25`, `border-white/30`, `border-yellow-200/45` |
| Shadows/elevation | `drop-shadow-[0_22px_42px_rgba(0,0,0,.42)]`, `shadow-[0_12px_35px_rgba(14,165,233,.25)]`, `shadow-[0_12px_35px_rgba(248,113,113,.24)]`, `shadow-[0_30px_120px_rgba(0,0,0,.65)]` |
| Opacity | `opacity-16` |
| Background | `backdrop-blur-md`, `bg-amber-400/[0.075]`, `bg-amber-400/10`, `bg-amber-500/18`, `bg-center`, `bg-cover`, `bg-cyan-300/16`, `bg-cyan-400/[0.075]`, `bg-cyan-400/10`, `bg-cyan-400/18`, `bg-emerald-300`, `bg-emerald-400/[0.075]`, `bg-emerald-400/10`, `bg-emerald-400/15`, `bg-fuchsia-500/18`, `bg-gradient-to-r`, `bg-indigo-500/18`, `bg-orange-500/18`, `bg-red-500/10`, `bg-red-500/18`, `bg-rose-400/10`, `bg-rose-500/18`, `bg-sky-500/18`, `bg-slate-600`, `bg-slate-950/75`, `bg-stone-400/18`, `bg-violet-400/[0.075]`, `bg-violet-400/10`, `bg-violet-500/18`, `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/10`, `bg-yellow-400/18`, `from-amber-400/15`, `from-cyan-400`, `from-cyan-400/15`, `from-emerald-400/15`, `from-red-500`, `from-rose-400/15`, `from-violet-400/15`, `hover:bg-red-500/20`, `hover:bg-white/10`, `hover:bg-white/20`, `to-amber-400`, `to-blue-500` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:34px_34px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `backdrop-blur-md` | base | static occurrence |
| `bg-amber-400/[0.075]` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-amber-500/18` | base | static occurrence |
| `bg-center` | base | static occurrence |
| `bg-cover` | base | static occurrence |
| `bg-cyan-300/16` | base | static occurrence |
| `bg-cyan-400/[0.075]` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/18` | base | static occurrence |
| `bg-emerald-300` | base | conditional or expression-derived |
| `bg-emerald-400/[0.075]` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/15` | base | conditional or expression-derived |
| `bg-fuchsia-500/18` | base | static occurrence |
| `bg-gradient-to-r` | base | conditional or expression-derived |
| `bg-indigo-500/18` | base | static occurrence |
| `bg-orange-500/18` | base | static occurrence |
| `bg-red-500/10` | base | conditional or expression-derived |
| `bg-red-500/18` | base | static occurrence |
| `bg-rose-400/10` | base | static occurrence |
| `bg-rose-500/18` | base | static occurrence |
| `bg-sky-500/18` | base | static occurrence |
| `bg-slate-600` | base | conditional or expression-derived |
| `bg-slate-950/75` | base | static occurrence |
| `bg-stone-400/18` | base | static occurrence |
| `bg-violet-400/[0.075]` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-violet-500/18` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `bg-white/10` | base | conditional or expression-derived |
| `bg-yellow-400/18` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-[10px]` | base | static occurrence |
| `border-amber-200/16` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-amber-300/45` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-cyan-100/35` | base | static occurrence |
| `border-cyan-200/16` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/45` | base | static occurrence |
| `border-cyan-200/50` | base | conditional or expression-derived |
| `border-emerald-200/16` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-300/35` | base | conditional or expression-derived |
| `border-fuchsia-300/45` | base | static occurrence |
| `border-indigo-300/45` | base | static occurrence |
| `border-orange-300/45` | base | static occurrence |
| `border-red-200/60` | base | conditional or expression-derived |
| `border-red-300/30` | base | static occurrence |
| `border-red-300/35` | base | conditional or expression-derived |
| `border-red-300/45` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-rose-300/45` | base | static occurrence |
| `border-sky-300/45` | base | static occurrence |
| `border-stone-200/45` | base | static occurrence |
| `border-violet-200/16` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-violet-300/45` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/20` | base | static occurrence |
| `border-white/25` | base | static occurrence |
| `border-white/30` | base | static occurrence |
| `border-yellow-200/45` | base | static occurrence |
| `drop-shadow-[0_22px_42px_rgba(0,0,0,.42)]` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-light` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-amber-400/15` | base | static occurrence |
| `from-cyan-400` | base | conditional or expression-derived |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-red-500` | base | conditional or expression-derived |
| `from-rose-400/15` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-16` | base | static occurrence |
| `h-2.5` | base | conditional or expression-derived |
| `h-24` | base | static occurrence |
| `h-4` | base | static occurrence |
| `h-5` | base | static occurrence |
| `hover:bg-red-500/20` | hover | conditional or expression-derived |
| `hover:bg-white/10` | hover | conditional or expression-derived |
| `hover:bg-white/20` | hover | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `inset-0` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `items-end` | base | static occurrence |
| `justify-between` | base | conditional or expression-derived |
| `justify-center` | base | static occurrence |
| `lg:grid-cols-4` | lg | static occurrence |
| `lg:h-36` | lg | static occurrence |
| `lg:w-36` | lg | static occurrence |
| `max-h-[48dvh]` | base | static occurrence |
| `max-h-[96dvh]` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-6xl` | base | static occurrence |
| `min-h-0` | base | static occurrence |
| `min-h-9` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-16` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pb-2` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pokemon-detail-modal` | base | static occurrence |
| `pokemon-detail-modal-body` | base | static occurrence |
| `pokemon-detail-modal-header` | base | static occurrence |
| `pokemon-modal-overlay` | base | static occurrence |
| `pr-1` | base | static occurrence |
| `pr-12` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | conditional or expression-derived |
| `py-1.5` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `py-3` | base | static occurrence |
| `relative` | base | static occurrence |
| `right-0` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-t-[2rem]` | base | static occurrence |
| `shadow-[0_12px_35px_rgba(14,165,233,.25)]` | base | conditional or expression-derived |
| `shadow-[0_12px_35px_rgba(248,113,113,.24)]` | base | conditional or expression-derived |
| `shadow-[0_30px_120px_rgba(0,0,0,.65)]` | base | static occurrence |
| `shrink-0` | base | conditional or expression-derived |
| `sm:gap-6` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:grid-cols-4` | sm | static occurrence |
| `sm:h-32` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:max-h-[92dvh]` | sm | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `sm:px-4` | sm | conditional or expression-derived |
| `sm:px-6` | sm | static occurrence |
| `sm:py-4` | sm | static occurrence |
| `sm:rounded-[2rem]` | sm | static occurrence |
| `sm:text-4xl` | sm | static occurrence |
| `sm:text-sm` | sm | static occurrence |
| `sm:w-32` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/80` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-100` | base | conditional or expression-derived |
| `text-fuchsia-100` | base | static occurrence |
| `text-indigo-100` | base | static occurrence |
| `text-orange-100` | base | static occurrence |
| `text-red-100` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-slate-200` | base | conditional or expression-derived |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | conditional or expression-derived |
| `text-sm` | base | conditional or expression-derived |
| `text-stone-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | conditional or expression-derived |
| `text-xs` | base | conditional or expression-derived |
| `text-yellow-100` | base | static occurrence |
| `to-amber-400` | base | conditional or expression-derived |
| `to-blue-500` | base | conditional or expression-derived |
| `top-0` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-16` | base | static occurrence |
| `w-2.5` | base | conditional or expression-derived |
| `w-24` | base | static occurrence |
| `w-4` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1100]` | base | static occurrence |

Exact className combinations:

- `absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]`
- `absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl font-light text-white transition hover:bg-white/20`
- `bg-emerald-300`
- `bg-slate-600`
- `border-amber-200/16 bg-amber-400/[0.075]`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-amber-300/45 bg-amber-500/18 text-amber-100`
- `border-cyan-200/16 bg-cyan-400/[0.075]`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-cyan-200/45 bg-cyan-400/18 text-cyan-100`
- `border-cyan-200/50 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_12px_35px_rgba(14,165,233,.25)]`
- `border-emerald-200/16 bg-emerald-400/[0.075]`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-emerald-300/35 bg-emerald-400/15 text-emerald-100`
- `border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100`
- `border-indigo-300/45 bg-indigo-500/18 text-indigo-100`
- `border-orange-300/45 bg-orange-500/18 text-orange-100`
- `border-red-200/60 bg-gradient-to-r from-red-500 to-amber-400 text-white shadow-[0_12px_35px_rgba(248,113,113,.24)]`
- `border-red-300/35 bg-red-500/10 text-red-100 hover:bg-red-500/20`
- `border-red-300/45 bg-red-500/18 text-red-100`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-rose-300/45 bg-rose-500/18 text-rose-100`
- `border-sky-300/45 bg-sky-500/18 text-sky-100`
- `border-stone-200/45 bg-stone-400/18 text-stone-100`
- `border-violet-200/16 bg-violet-400/[0.075]`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `border-violet-300/45 bg-violet-500/18 text-violet-100`
- `border-white/10 bg-white/[0.045] text-slate-400`
- `border-white/10 bg-white/[0.055] text-slate-200 hover:bg-white/10`
- `border-yellow-200/45 bg-yellow-400/18 text-yellow-100`
- `flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3`
- `font-black text-white`
- `font-bold text-slate-300`
- `font-mono text-xs font-black uppercase tracking-[0.22em] text-cyan-100/80 sm:text-sm`
- `grid grid-cols-2 gap-2 sm:grid-cols-4`
- `grid h-24 w-24 shrink-0 place-items-center sm:h-32 sm:w-32 lg:h-36 lg:w-36`
- `grid max-h-[48dvh] gap-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-4`
- `h-16 w-16 rounded-full border-[10px] border-white/25`
- `h-2.5 w-2.5 shrink-0 rounded-full`
- `h-4 w-4 object-contain`
- `h-5 w-5 shrink-0 object-contain`
- `inline-flex items-center gap-2 rounded-full border border-cyan-100/35 bg-cyan-300/16 px-3 py-1.5 text-sm font-black text-cyan-50`
- `inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black transition sm:px-4`
- `inline-flex min-h-9 items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-xs font-black`
- `max-h-full object-contain drop-shadow-[0_22px_42px_rgba(0,0,0,.42)]`
- `min-w-0`
- `mt-1 truncate text-3xl font-black tracking-tight text-white sm:text-4xl`
- `mt-2 flex flex-wrap items-center gap-2`
- `mt-2 text-sm font-bold text-slate-200`
- `mt-4 flex flex-wrap gap-2 pb-2`
- `mt-4 rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100`
- `mt-4 space-y-4`
- `pokemon-detail-modal flex max-h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] border border-white/10 text-white shadow-[0_30px_120px_rgba(0,0,0,.65)] sm:max-h-[92dvh] sm:rounded-[2rem]`
- `pokemon-detail-modal-body min-h-0 flex-1 overflow-auto p-4 sm:p-6`
- `pokemon-detail-modal-header relative shrink-0 overflow-hidden border-b border-white/10 bg-cover bg-center px-4 py-3 sm:px-6 sm:py-4`
- `pokemon-modal-overlay fixed inset-0 z-[1100] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-md sm:items-center sm:p-6`
- `relative flex items-center gap-4 pr-12 sm:gap-6`
- `rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-black text-white`
- `space-y-4`
- `truncate`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`h-2.5 w-2.5 shrink-0 rounded-full ${value ? "bg-emerald-300" : "bg-slate-600"}\``
- `\`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black transition sm:px-4 ${ activeTab === tab ? tab === "checks" ? "border-red-200/60 bg-gradient-to-r from-red-500 to-amber-400 text-white shadow-[0_12px_35px_rgba(248,113,113,.24)]" : "border-cyan-200/50 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_12px_35px_rgba(14,165,233,.25)]" : tab === "checks" ? "border-red-300/35 bg-red-500/10 text-red-100 hover:bg-red-500/20" : "border-white/10 bg-white/[0.055] text-slate-200 hover:bg-white/10" }\``
- `\`inline-flex min-h-9 items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-xs font-black ${ value ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-100" : "border-white/10 bg-white/[0.045] text-slate-400" }\``

### CSS variables

`--accent-glow`, `--accent-muted`, `--foreground`, `--line`, `--line-strong`, `--muted`

### Inline style expressions

- `{{ background: \`linear-gradient(180deg, color-mix(in srgb, ${mainTypeColor} 24%, #0d1a2b), #08111f 72%)\`, }}`
- `{{ backgroundImage: \`${ catchBackground ? \`linear-gradient(135deg, rgba(4,10,22,.86), color-mix(in srgb, ${mainTypeColor} 13%, rgba(4,10,22,.82))), url("${catchBackground}"), \` : "" }${typePanelBackground(mainType, typeCatalog)}, radial-gradient(circle_at_8%_0%,${mainTypeColor}88,transparent_36%), radial-gradient(circle_at_92%_15%,rgba(255,255,255,.18),transparent_34%)\`, }}`
- `{{ backgroundImage: \`linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), radial-gradient(circle at 8% 0%, ${mainTypeColor}3d, transparent 30%), radial-gradient(circle at 92% 10%, color-mix(in srgb, ${mainTypeColor} 28%, transparent), transparent 28%)\`, backgroundSize: "30px 30px, 30px 30px, auto, auto", }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadgeConfig
assetBadgeConfig = {
  female: ["♀", "Femelle", "border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100"],
  male: ["♂", "Mâle", "border-sky-300/45 bg-sky-500/18 text-sky-100"],
  event: ["✦", "Event", "border-amber-300/45 bg-amber-500/18 text-amber-100"],
  mega: ["Μ", "Méga", "border-violet-300/45 bg-violet-500/18 text-violet-100"],
  primal: ["Ω", "Primo", "border-orange-300/45 bg-orange-500/18 text-orange-100"],
  alola: ["A", "Alola", "border-yellow-200/45 bg-yellow-400/18 text-yellow-100"],
  galar: ["G", "Galar", "border-indigo-300/45 bg-indigo-500/18 text-indigo-100"],
  hisui: ["H", "Hisui", "border-stone-200/45 bg-stone-400/18 text-stone-100"],
  paldea: ["P", "Paldea", "border-rose-300/45 bg-rose-500/18 text-rose-100"],
  dynamax: ["D", "Dyna", "border-red-300/45 bg-red-500/18 text-red-100"],
  gigantamax: ["G", "Giga", "border-red-300/45 bg-red-500/18 text-red-100"],
  shiny: ["✦", "Shiny", "border-cyan-200/45 bg-cyan-400/18 text-cyan-100"],
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadges
function assetBadges(asset = {}) {
  const form = String(asset.form || asset.detail || "").toLowerCase();
  const costume = String(asset.costume || "").trim();
  const badges = [];
  if (isFemaleAsset(asset)) badges.push("female");
  if (isMaleAsset(asset)) badges.push("male");
  if (costume || (form && !["normal", "standard"].includes(form) && !variantBadgeForForm(form))) badges.push("event");
  if (asset.gigantamax || form.includes("gigantamax")) badges.push("gigantamax");
  const formBadge = variantBadgeForForm(form);
  if (formBadge) badges.push(formBadge);
  return uniqueBadges(badges);
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#cardTones
cardTones = [
  "border-cyan-200/16 bg-cyan-400/[0.075]",
  "border-emerald-200/16 bg-emerald-400/[0.075]",
  "border-violet-200/16 bg-violet-400/[0.075]",
  "border-amber-200/16 bg-amber-400/[0.075]",
]
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardBackground
function catchCardBackground(type) {
  const name = typeBackgroundNames[String(type || "").toUpperCase()];
  return name ? `/ui/backgrounds/catchCards/CatchCard_TypeBG_${name}.png` : "";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardStyle
function catchCardStyle(index = 0, preferredType = "NORMAL", opacity = "dark") {
  const background = catchCardForIndex(index, preferredType);
  const overlay =
    opacity === "soft"
      ? "linear-gradient(135deg, rgba(255,255,255,.9), rgba(248,250,252,.82)), linear-gradient(180deg, rgba(15,23,42,.18), rgba(15,23,42,.24))"
      : "linear-gradient(135deg, rgba(2,6,23,.93), rgba(15,23,42,.89)), linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))";
  return {
    backgroundImage: background ? `${overlay}, url("${background}")` : overlay,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#rgbaColor
function rgbaColor(color, alpha = 1) {
  if (!color || typeof color !== "object") return "";
  const channel = (value) => Math.max(0, Math.min(255, Math.round(Number(value || 0) * 255)));
  return `rgba(${channel(color.r)}, ${channel(color.g)}, ${channel(color.b)}, ${color.a ?? alpha})`;
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#sectionTones
sectionTones = {
  cyan: "border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15",
  emerald: "border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15",
  violet: "border-violet-200/20 bg-violet-400/10 from-violet-400/15",
  amber: "border-amber-200/20 bg-amber-400/10 from-amber-400/15",
  rose: "border-rose-200/20 bg-rose-400/10 from-rose-400/15",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typeBackgroundNames
typeBackgroundNames = {
  BUG: "Bug",
  DARK: "Dark",
  DRAGON: "Dragon",
  ELECTRIC: "Electric",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  FIRE: "Fire",
  FLYING: "Flying",
  GHOST: "Ghost",
  GRASS: "Grass",
  GROUND: "Ground",
  ICE: "Ice",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  ROCK: "Rock",
  STEEL: "Steel",
  WATER: "Water",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.68), rgba(8,13,25,.52)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.7), rgba(2,6,23,.58))";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#uniqueBadges
function uniqueBadges(badges) {
  return [...new Set(badges.filter(Boolean))];
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#variantBadgeForForm
function variantBadgeForForm(form) {
  if (form.includes("mega")) return "mega";
  if (form.includes("primal")) return "primal";
  if (form.includes("alola")) return "alola";
  if (form.includes("galar")) return "galar";
  if (form.includes("hisui")) return "hisui";
  if (form.includes("paldea")) return "paldea";
  if (form.includes("dynamax")) return "dynamax";
  if (form.includes("gigantamax")) return "gigantamax";
  return "";
}
```

```tsx
src/components/site/pokemon-style.js#typeBackground
export function typeBackground(type, catalog = []) {
  return catalogItem(catalog, type)?.assets?.background || null;
}
```

```tsx
src/components/site/pokemon-style.js#typeColors
typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
}
```

### Referenced global custom CSS rules

```css
.light .event-detail-modal-body [class*="bg-slate-950/"], .light .event-detail-modal-body [class*="bg-white/["], .light .pokemon-detail-modal-body [class*="bg-slate-950/"], .light .pokemon-detail-modal-body [class*="bg-white/["] {
background-color: rgba(255, 255, 255, 0.82) !important;
}
```

```css
.light .event-detail-modal-body [class*="border-white/"], .light .pokemon-detail-modal-body [class*="border-white/"] {
border-color: var(--line) !important;
}
```

```css
.light .event-detail-modal-body [class*="text-white"], .light .event-detail-modal-body [class*="text-slate-100"], .light .event-detail-modal-body [class*="text-slate-200"], .light .event-detail-modal-body [class*="text-cyan-50"], .light .event-detail-modal-body [class*="text-cyan-100"], .light .event-detail-modal-body [class*="text-emerald-100"], .light .event-detail-modal-body [class*="text-violet-100"], .light .event-detail-modal-body [class*="text-amber-100"], .light .event-detail-modal-body [class*="text-rose-100"], .light .pokemon-detail-modal-body [class*="text-white"], .light .pokemon-detail-modal-body [class*="text-slate-100"], .light .pokemon-detail-modal-body [class*="text-slate-200"], .light .pokemon-detail-modal-body [class*="text-cyan-50"], .light .pokemon-detail-modal-body [class*="text-cyan-100"], .light .pokemon-detail-modal-body [class*="text-emerald-100"], .light .pokemon-detail-modal-body [class*="text-violet-100"], .light .pokemon-detail-modal-body [class*="text-amber-100"], .light .pokemon-detail-modal-body [class*="text-rose-100"] {
color: var(--foreground) !important;
}
```

```css
.light .event-detail-modal-body [class*="text-white/"], .light .event-detail-modal-body [class*="text-slate-300"], .light .event-detail-modal-body [class*="text-slate-400"], .light .event-detail-modal-body [class*="text-slate-500"], .light .pokemon-detail-modal-body [class*="text-white/"], .light .pokemon-detail-modal-body [class*="text-slate-300"], .light .pokemon-detail-modal-body [class*="text-slate-400"], .light .pokemon-detail-modal-body [class*="text-slate-500"] {
color: var(--muted) !important;
}
```

```css
.light .event-detail-modal-body, .light .pokemon-detail-modal-body {
background:
    linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    radial-gradient(circle at 8% 0%, var(--accent-muted), transparent 32%),
    rgba(248, 252, 255, 0.94) !important;
  color: var(--foreground);
}
```

```css
.light .event-detail-modal, .light .pokemon-detail-modal {
border-color: var(--line-strong) !important;
  background:
    radial-gradient(circle at 12% 0%, var(--accent-glow), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(236, 246, 255, 0.96)) !important;
  color: var(--foreground) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    0 30px 110px rgba(15, 23, 42, 0.26) !important;
}
```

```css
.light .event-detail-overlay, .light .pokemon-modal-overlay {
background: rgba(15, 23, 42, 0.3) !important;
}
```

```css
.light .pokemon-detail-modal .pokemon-detail-modal-header [class*="text-slate-200"] {
color: rgba(238, 243, 255, 0.84) !important;
}
```

```css
.light .pokemon-detail-modal .pokemon-detail-modal-header {
background-color: #0b1628 !important;
  background-image:
    linear-gradient(135deg, rgba(7, 16, 30, 0.9), rgba(15, 23, 42, 0.74)),
    radial-gradient(circle at 14% 0%, var(--accent-glow), transparent 34%) !important;
}
```

```css
.light .pokemon-detail-modal-body .pokemon-detail-section {
border-color: var(--line) !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  background-image:
    radial-gradient(circle at 10% 0%, var(--accent-muted), transparent 38%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(244, 249, 255, 0.88)) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.86),
    0 18px 54px rgba(15, 23, 42, 0.09) !important;
}
```

```css
.light .pokemon-detail-modal-body .pokemon-detail-section > div:first-child {
background: transparent !important;
}
```

```css
.light .pokemon-detail-modal-header [class*="text-slate-200"] {
color: rgba(238, 243, 255, 0.84) !important;
}
```

```css
.light .pokemon-detail-modal-header {
background:
    linear-gradient(135deg, rgba(7, 16, 30, 0.86), rgba(15, 23, 42, 0.72)),
    radial-gradient(circle at 14% 0%, var(--accent-glow), transparent 34%) !important;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-4`, `lg:h-36`, `lg:w-36`, `sm:gap-6`, `sm:grid-cols-2`, `sm:grid-cols-4`, `sm:h-32`, `sm:items-center`, `sm:max-h-[92dvh]`, `sm:p-6`, `sm:px-4`, `sm:px-6`, `sm:py-4`, `sm:rounded-[2rem]`, `sm:text-4xl`, `sm:text-sm`, `sm:w-32`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Fermer"`, `aria-label="Onglets de fiche"`, `aria-modal="true"`.
- Roles: `role="dialog"`, `role="presentation"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Checked, Unchecked, Error, Warning, Success, Empty, Collapsed, Expanded, Scrollable.
- Instance swaps: Not found.
- Text properties: expose each textual prop from the props contract; when text is hardcoded, preserve it in the default instance.
- Variables: bind CSS variables and semantic token references listed in this document. Literal utilities remain documented implementation values.
- Constraints: infer from width/min/max and responsive utilities; any value not encoded is marked Estimated from implementation.
- Nested components: use the child component links below as true instances rather than detached groups.
- Interactive components: create prototype states only for interactions detected in the state/event tables.

## 18. Screenshot capture checklist

| Capture | State / variant | Evidence |
|---|---|---|
| □ | Default | Base render path |
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| — | Focused | Not found |
| — | Selected | Not found |
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| □ | Collapsed | collapsed/closed signal |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: sm | Tailwind sm: utilities |

## 19. Rebuild acceptance criteria

- DOM hierarchy matches section 4.
- Props, defaults, variants and states match sections 6–9.
- Every class/token and conditional expression in sections 10–12 has a Figma or CSS equivalent.
- Responsive behavior matches each encoded breakpoint.
- ARIA, keyboard, focus and native semantics match section 15.
- Child components remain true nested instances.
- No undocumented redesign, optimization or normalization is introduced.

## 20. Unknowns

- Runtime-computed dimensions, line wrapping and browser font metrics: Estimated from implementation.
- Visual output without an authenticated rendered screenshot: Not found.
- Product rationale not encoded in code or naming: Not found.

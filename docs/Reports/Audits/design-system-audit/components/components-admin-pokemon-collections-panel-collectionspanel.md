---
id: MWI-COMP-150
component: "CollectionsPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/collections-panel.jsx"
lines: 359-794
figma_priority: 34
evidence: static_code
---

# CollectionsPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/collections-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-150`.
- Location: `Dashboard Admin/src/components/admin/pokemon/collections-panel.jsx`:359.
- File range: lines 359–794.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useMemo, useState | external package |
| react-dom | createPortal | external package |
| lucide-react | ImageIcon, LayoutDashboard, Sparkles | icons |
| sonner | toast | external package |
| @/components/site/pokemon-style | pokemonVariantLabel, typeColors | internal |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-149 | [CollectionStatCard](../components/components-admin-pokemon-collections-panel-collectionstatcard.md) (MWI-COMP-149) | JSX/import relation |

Unresolved/external JSX tags: `ImageIcon`, `LayoutDashboard`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-303 | [CollectionsPanel](../components/components-pokemon-admin-collections-panel-collectionspanel.md) (MWI-COMP-303) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div>
    - <div>
      - <p>
      - <h2>
    - <button>
      - <Sparkles />
  - <div>
    - <CollectionStatCard />
  - <div>
    - <div>
      - <div>
        - <strong>
        - <span>
      - <div>
        - <button>
          - <span>
            - <strong>
            - <small>
          - <small>
        - <p>
    - <div>
      - <Fragment>
        - <div>
          - <div>
            - <p>
            - <h3>
            - <p>
          - <div>
            - <button>
            - <button>
        - <div>
          - <input />
          - <div>
            - <button>
      - <div>
        - <div>
          - <Sparkles />
          - <h3>
          - <p>
  - <Fragment>
    - <div>
      - <button>
        - <img />
        - <LayoutDashboard />
        - <small>
        - <strong>
    - <div>
      - <section>
        - <div>
          - <div>
            - <p>
            - <h3>
          - <div>
            - <button>
            - <span>
        - <div>
          - <button>
            - <span />
            - <span>
            - <span>
              - <img />
              - <ImageIcon />
            - <span>
              - <strong>
              - <small>
              - <small>
    - <div>
      - <button>
    - <p>
  - <div role="dialog" aria-modal="true">
    - <section>
      - <div>
        - <h3>
        - <button>
      - <div>
        - <div>
          - <h4>
          - <div>
            - <button>
              - <img />
              - <strong>
        - <div>
          - <h4>
          - <div>
            - <button>
          - <p>
        - <div>
          - <h4>
          - <div>
            - <label>
              - <input />
        - <label>
          - <span>
          - <input />
      - <div>
        - <button>

Unique HTML/React tags: `button`, `CollectionStatCard`, `div`, `h2`, `h3`, `h4`, `ImageIcon`, `img`, `input`, `label`, `LayoutDashboard`, `p`, `section`, `small`, `span`, `Sparkles`, `strong`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `activeId = collections[0]?.id || ""`, `collectionView = { key: "", limit: initialCollectionLimit }`, `draft = {
    name: "",
    type: "normal",
    variantMode: "multi",
    shiny: false,
    hundo: false,
  }`, `modalOpen = false`, `query = ""`, `region = "all"`, `status = "all"`.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onDoubleClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| collections | collections = [] | See exact signature/contract below |
| entries | entries = [] | See exact signature/contract below |
| globalSearch | globalSearch = "" | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| onSave | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entries = [], collections = [], onSave, onOpen, globalSearch = "" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Checked, Unchecked, Error, Warning, Success, Empty, Active, Inactive, Scrollable, Sticky.
- Text properties: `collections`, `entries`, `globalSearch`, `onOpen`, `onSave`.
- Instance swaps: `ImageIcon`, `LayoutDashboard`, `Sparkles`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
| Visible | Detected | Rendered state |
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Detected | sticky utility |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-end, justify-between, justify-center, place-items-center, sm:items-start, sm:justify-between`.
- Positioning utilities: `absolute, fixed, relative, sticky`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#38bdf8`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(0,0,0,.24)`, `rgba(0,0,0,.5)`, `rgba(14,165,233,.26)`, `rgba(244,114,182,.18)`, `rgba(255,255,255,.08)` |
| Spacing | `bottom-0`, `bottom-1`, `bottom-3`, `gap-2`, `gap-3`, `gap-4`, `inset-0`, `inset-x-3`, `mb-1`, `mb-2`, `mb-3`, `mb-4`, `mb-5`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mt-5`, `mx-auto`, `my-3`, `p-2`, `p-3`, `p-4`, `p-5`, `pb-5`, `px-2`, `px-3`, `px-4`, `px-5`, `py-1`, `py-1.5`, `py-2`, `right-1`, `right-3`, `sm:my-0`, `sm:p-4`, `sm:p-5`, `sm:p-6`, `space-y-5`, `space-y-6`, `top-0`, `top-3` |
| Sizing | `h-10`, `h-12`, `h-16`, `h-28`, `h-6`, `h-7`, `max-h-[calc(100dvh-1.5rem)]`, `max-h-full`, `max-w-[56%]`, `max-w-3xl`, `min-h-[13rem]`, `min-h-[72px]`, `min-h-0`, `min-h-11`, `min-h-12`, `min-h-20`, `min-h-48`, `sm:max-h-[calc(100dvh-3rem)]`, `sm:min-h-24`, `w-10`, `w-6`, `w-7`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-mono`, `leading-6`, `placeholder:text-slate-500`, `sm:text-2xl`, `text-[10px]`, `text-[11px]`, `text-2xl`, `text-amber-100`, `text-base`, `text-center`, `text-cyan-100`, `text-cyan-100/50`, `text-cyan-100/55`, `text-cyan-100/65`, `text-cyan-100/70`, `text-cyan-200/70`, `text-cyan-50`, `text-emerald-100`, `text-left`, `text-rose-100`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-950`, `text-sm`, `text-violet-100`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.16em]`, `tracking-[0.18em]`, `tracking-[0.22em]`, `tracking-tight`, `uppercase` |
| Radius | `rounded-[1.5rem]`, `rounded-2xl`, `rounded-3xl`, `rounded-full`, `sm:rounded-[2rem]` |
| Borders/strokes | `border`, `border-amber-200/25`, `border-b`, `border-cyan-200/25`, `border-cyan-200/30`, `border-cyan-200/55`, `border-cyan-200/60`, `border-dashed`, `border-emerald-200/25`, `border-emerald-200/65`, `border-emerald-300/25`, `border-pink-200/70`, `border-rose-300/25`, `border-t`, `border-violet-200/25`, `border-white/10`, `border-white/15`, `border-white/20`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/35`, `hover:border-cyan-200/45`, `hover:border-cyan-200/55`, `outline-none` |
| Shadows/elevation | `drop-shadow-[0_18px_28px_rgba(0,0,0,.5)]`, `drop-shadow-xl`, `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_18px_55px_rgba(244,114,182,.18)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]`, `shadow-[0_32px_120px_rgba(0,0,0,.5)]` |
| Opacity | `opacity-60`, `opacity-70` |
| Background | `backdrop-blur`, `backdrop-blur-xl`, `bg-cyan-400/10`, `bg-cyan-400/12`, `bg-cyan-400/18`, `bg-cyan-400/20`, `bg-emerald-400/10`, `bg-emerald-400/22`, `bg-gradient-to-br`, `bg-gradient-to-r`, `bg-pink-400/16`, `bg-rose-500/10`, `bg-slate-950/35`, `bg-slate-950/42`, `bg-slate-950/45`, `bg-slate-950/70`, `bg-slate-950/78`, `bg-white`, `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/10`, `bg-zinc-900`, `bg-zinc-900/95`, `from-amber-400/24`, `from-emerald-400/24`, `from-sky-500`, `from-sky-500/12`, `from-sky-500/24`, `from-violet-500/24`, `hover:bg-cyan-400/20`, `to-cyan-400`, `to-emerald-400/12`, `to-slate-900/20`, `via-cyan-300/12`, `via-cyan-400/8`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-teal-300/10` |
| Animation | `hover:-translate-y-0.5`, `hover:-translate-y-1`, `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `2xl:grid-cols-8` | 2xl | static occurrence |
| `absolute` | base | static occurrence |
| `accent-cyan-400` | base | static occurrence |
| `backdrop-blur` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/18` | base | conditional or expression-derived |
| `bg-cyan-400/20` | base | conditional or expression-derived |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/22` | base | conditional or expression-derived |
| `bg-gradient-to-br` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-pink-400/16` | base | conditional or expression-derived |
| `bg-rose-500/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/42` | base | conditional or expression-derived |
| `bg-slate-950/45` | base | static occurrence |
| `bg-slate-950/70` | base | static occurrence |
| `bg-slate-950/78` | base | static occurrence |
| `bg-white` | base | conditional or expression-derived |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `bg-zinc-900` | base | static occurrence |
| `bg-zinc-900/95` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/25` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-cyan-200/55` | base | conditional or expression-derived |
| `border-cyan-200/60` | base | conditional or expression-derived |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-emerald-200/65` | base | conditional or expression-derived |
| `border-emerald-300/25` | base | static occurrence |
| `border-pink-200/70` | base | conditional or expression-derived |
| `border-rose-300/25` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/15` | base | static occurrence |
| `border-white/20` | base | conditional or expression-derived |
| `bottom-0` | base | static occurrence |
| `bottom-1` | base | static occurrence |
| `bottom-3` | base | static occurrence |
| `collection-` | base | static occurrence |
| `drop-shadow-[0_18px_28px_rgba(0,0,0,.5)]` | base | static occurrence |
| `drop-shadow-xl` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `fr-FR` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `from-sky-500/12` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))]` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `grid-cols-3` | base | static occurrence |
| `group-hover:scale-110` | group-hover | static occurrence |
| `h-10` | base | static occurrence |
| `h-12` | base | static occurrence |
| `h-16` | base | static occurrence |
| `h-28` | base | static occurrence |
| `h-6` | base | static occurrence |
| `h-7` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | conditional or expression-derived |
| `hover:-translate-y-1` | hover | conditional or expression-derived |
| `hover:bg-cyan-400/20` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | conditional or expression-derived |
| `hover:border-cyan-200/45` | hover | conditional or expression-derived |
| `hover:border-cyan-200/55` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `inset-x-3` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-end` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `lg:grid-cols-4` | lg | static occurrence |
| `max-h-[calc(100dvh-1.5rem)]` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-[56%]` | base | static occurrence |
| `max-w-3xl` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `mb-5` | base | static occurrence |
| `md:grid-cols-[minmax(0,1fr)_auto]` | md | static occurrence |
| `md:grid-cols-3` | md | static occurrence |
| `min-h-[13rem]` | base | conditional or expression-derived |
| `min-h-[72px]` | base | conditional or expression-derived |
| `min-h-0` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-20` | base | conditional or expression-derived |
| `min-h-48` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `my-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-60` | base | static occurrence |
| `opacity-70` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `overflow-y-auto` | base | static occurrence |
| `overscroll-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | conditional or expression-derived |
| `p-5` | base | conditional or expression-derived |
| `pb-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `pokemon-forms` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | conditional or expression-derived |
| `px-5` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | conditional or expression-derived |
| `right-1` | base | static occurrence |
| `right-3` | base | static occurrence |
| `rounded-[1.5rem]` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-3xl` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_18px_55px_rgba(244,114,182,.18)]` | base | conditional or expression-derived |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shadow-[0_32px_120px_rgba(0,0,0,.5)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:items-start` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:max-h-[calc(100dvh-3rem)]` | sm | static occurrence |
| `sm:min-h-24` | sm | conditional or expression-derived |
| `sm:my-0` | sm | static occurrence |
| `sm:p-4` | sm | conditional or expression-derived |
| `sm:p-5` | sm | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `sm:rounded-[2rem]` | sm | static occurrence |
| `sm:text-2xl` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `space-y-6` | base | static occurrence |
| `sticky` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-base` | base | static occurrence |
| `text-center` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/50` | base | static occurrence |
| `text-cyan-100/55` | base | static occurrence |
| `text-cyan-100/65` | base | static occurrence |
| `text-cyan-100/70` | base | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-cyan-50` | base | conditional or expression-derived |
| `text-emerald-100` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-rose-100` | base | static occurrence |
| `text-slate-200` | base | conditional or expression-derived |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-950` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | conditional or expression-derived |
| `text-xl` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-cyan-400` | base | static occurrence |
| `to-emerald-400/12` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `top-0` | base | static occurrence |
| `top-3` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | conditional or expression-derived |
| `via-cyan-300/12` | base | static occurrence |
| `via-cyan-400/8` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-6` | base | static occurrence |
| `w-7` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |
| `xl:grid-cols-6` | xl | static occurrence |
| `z-[1100]` | base | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `- Hundo`
- `absolute bottom-1 right-1 h-12 max-w-[56%] object-contain opacity-60 drop-shadow-xl`
- `absolute bottom-3 right-3 text-cyan-100/50`
- `absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-white/20 bg-slate-950/70 text-xs font-black text-white`
- `block`
- `block truncate text-sm font-black text-white`
- `border-cyan-200/55 bg-cyan-400/18`
- `border-cyan-200/55 bg-cyan-400/20`
- `border-cyan-200/55 bg-cyan-400/20 text-cyan-50`
- `border-cyan-200/60 bg-cyan-400/18 text-white`
- `border-emerald-200/65 bg-emerald-400/22`
- `border-pink-200/70 bg-pink-400/16 shadow-[0_18px_55px_rgba(244,114,182,.18)]`
- `border-white/10 bg-slate-950/42 hover:border-cyan-200/45`
- `border-white/10 bg-white/[0.045]`
- `border-white/10 bg-white/[0.045] hover:border-cyan-200/35`
- `border-white/10 bg-white/[0.055] text-slate-300`
- `border-white/20 bg-white/[0.055] hover:border-cyan-200/45`
- `border-white/20 bg-white/[0.055] text-slate-200`
- `collection-`
- `Fiches du dossier pokemon-forms`
- `fixed inset-0 z-[1100] overflow-y-auto bg-slate-950/78 p-3 backdrop-blur-xl sm:p-6`
- `flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-center gap-2`
- `flex items-center justify-between gap-3`
- `flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.055] p-4 text-sm font-black text-white`
- `font-black text-white`
- `fr-FR`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid gap-2`
- `grid gap-3`
- `grid gap-3 sm:grid-cols-2`
- `grid grid-cols-2 gap-3 md:grid-cols-3`
- `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8`
- `grid grid-cols-3 gap-2`
- `grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-xl font-black text-white`
- `grid min-h-48 place-items-center text-center`
- `group relative min-h-[13rem] overflow-hidden rounded-3xl border p-3 text-left transition hover:-translate-y-1`
- `h-6 w-6 accent-cyan-400`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-200/30 bg-cyan-400/12 px-5 py-2 text-sm font-black text-cyan-50 transition hover:border-cyan-200/55 hover:bg-cyan-400/20`
- `max-h-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,.5)] transition group-hover:scale-110`
- `mb-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70`
- `mb-2 block text-sm font-black uppercase tracking-[0.18em] text-slate-300`
- `mb-3 flex flex-wrap items-end justify-between gap-3`
- `mb-3 flex items-center justify-between gap-3`
- `mb-3 text-sm font-black uppercase tracking-[0.18em] text-slate-300`
- `mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between`
- `mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `mb-5 grid gap-3 xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]`
- `mb-5 grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-2`
- `min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 pb-5 sm:p-5`
- `min-h-12 w-full rounded-2xl bg-white px-5 text-base font-black text-slate-950 transition hover:scale-[1.01]`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-h-20 rounded-2xl border p-3 text-center transition sm:min-h-24 sm:p-4`
- `mt-1 block truncate font-mono text-xs font-black text-slate-300`
- `mt-1 block truncate text-[11px] font-bold text-slate-400`
- `mt-1 text-2xl font-black text-white`
- `mt-1 text-sm font-bold text-slate-300`
- `mt-2 block truncate text-xs font-bold text-slate-400`
- `mt-2 text-sm font-bold text-slate-400`
- `mt-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm font-bold leading-6 text-slate-300`
- `mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]`
- `mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `mt-5 flex justify-center`
- `mx-auto mb-2 h-10 w-10 object-contain`
- `mx-auto mb-3 text-cyan-100`
- `mx-auto my-3 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-900 shadow-[0_32px_120px_rgba(0,0,0,.5)] sm:my-0 sm:max-h-[calc(100dvh-3rem)] sm:rounded-[2rem]`
- `pointer-events-none absolute inset-x-3 bottom-3 h-16 rounded-2xl opacity-70`
- `relative block text-[10px] font-black uppercase tracking-[0.16em] text-slate-400`
- `relative grid h-28 place-items-center p-2`
- `relative min-h-[72px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5`
- `relative mt-1 block text-sm font-black text-white`
- `relative mt-2 block`
- `rounded-2xl border border-cyan-200/25 bg-cyan-400/10 px-3 py-2 text-xs font-black text-cyan-50`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-2xl border border-rose-300/25 bg-rose-500/10 px-3 py-2 text-xs font-black text-rose-100`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-2xl border p-3 text-left transition`
- `rounded-2xl border p-5 text-center font-black transition`
- `rounded-2xl border px-4 py-2 text-xs font-black uppercase`
- `rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/12 via-cyan-400/8 to-emerald-400/12 p-4`
- `rounded-3xl border border-white/10 bg-slate-950/35 p-4`
- `rounded-full border border-cyan-200/25 bg-cyan-400/12 px-3 py-1.5 text-xs font-black text-cyan-50`
- `rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-100`
- `shrink-0 rounded-full bg-white/10 px-2 py-1 text-[10px] font-black uppercase text-slate-200`
- `space-y-6`
- `sticky bottom-0 border-t border-white/10 bg-zinc-900/95 p-4 backdrop-blur sm:p-5`
- `sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/95 p-4 backdrop-blur sm:p-5`
- `text-2xl font-black text-white`
- `text-cyan-100/55`
- `text-xl font-black text-white`
- `text-xl font-black tracking-tight text-white sm:text-2xl`
- `text-xs font-black uppercase tracking-[0.18em] text-cyan-100/65`
- `text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70`
- `truncate text-sm font-black text-white`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`group relative min-h-[13rem] overflow-hidden rounded-3xl border p-3 text-left transition hover:-translate-y-1 ${ selected ? "border-pink-200/70 bg-pink-400/16 shadow-[0_18px_55px_rgba(244,114,182,.18)]" : "border-white/10 bg-slate-950/42 hover:border-cyan-200/45" }\``
- `\`min-h-20 rounded-2xl border p-3 text-center transition sm:min-h-24 sm:p-4 ${ draft.type === id ? "border-emerald-200/65 bg-emerald-400/22" : "border-white/20 bg-white/[0.055] hover:border-cyan-200/45" }\``
- `\`relative min-h-[72px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${ region === id ? "border-cyan-200/55 bg-cyan-400/20" : "border-white/10 bg-white/[0.045]" }\``
- `\`rounded-2xl border p-3 text-left transition ${ activeCollection?.id === collection.id ? "border-cyan-200/55 bg-cyan-400/18" : "border-white/10 bg-white/[0.045] hover:border-cyan-200/35" }\``
- `\`rounded-2xl border p-5 text-center font-black transition ${ draft.variantMode === id ? "border-cyan-200/60 bg-cyan-400/18 text-white" : "border-white/20 bg-white/[0.055] text-slate-200" }\``
- `\`rounded-2xl border px-4 py-2 text-xs font-black uppercase ${ status === id ? "border-cyan-200/55 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300" }\``
- `fieldClass`
- `panelClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

- `{{ background: \`linear-gradient(135deg, ${color}55, rgba(255,255,255,.08))\` }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/collections-panel.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantModes
collectionVariantModes = [
  ["multi", "Multi variante"],
  ["single", "Non variante"],
]
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantRank
function collectionVariantRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "form") return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#entryMatchesVariantMode
function entryMatchesVariantMode(entry, variantMode) {
  if (entry.collectionType === "event") return true;
  if (variantMode !== "single") return true;
  return String(entry.kind || "").toLowerCase() === "pokemon" && String(entry.form || "normal").toLowerCase() === "normal";
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

```tsx
src/components/site/pokemon-style.js#pokemonVariantLabel
export function pokemonVariantLabel(entry = {}) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "event") return "Évènement";
  if (kind === "mega") return "Méga";
  if (kind === "dynamax") return "Dynamax";
  if (kind === "gigantamax") return "Gigamax";
  if (kind === "form" && form !== "normal") return form.charAt(0).toUpperCase() + form.slice(1);
  return "Normal";
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

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `md`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-8`, `lg:grid-cols-4`, `md:grid-cols-[minmax(0,1fr)_auto]`, `md:grid-cols-3`, `sm:flex-row`, `sm:grid-cols-2`, `sm:grid-cols-3`, `sm:items-start`, `sm:justify-between`, `sm:max-h-[calc(100dvh-3rem)]`, `sm:min-h-24`, `sm:my-0`, `sm:p-4`, `sm:p-5`, `sm:p-6`, `sm:rounded-[2rem]`, `sm:text-2xl`, `xl:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]`, `xl:grid-cols-4`, `xl:grid-cols-6`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `hover:-translate-y-1`, `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-modal="true"`.
- Roles: `role="dialog"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ImageIcon`, `LayoutDashboard`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Checked, Unchecked, Error, Warning, Success, Empty, Active, Inactive, Scrollable, Sticky.
- Instance swaps: `ImageIcon`, `LayoutDashboard`, `Sparkles`.
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
| □ | Focused | focus styling or handler |
| □ | Selected | selected/state signal |
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| □ | Sticky | sticky utility |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: md | Tailwind md: utilities |
| □ | Responsive: sm | Tailwind sm: utilities |
| □ | Responsive: xl | Tailwind xl: utilities |

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

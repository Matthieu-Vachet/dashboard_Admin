---
id: MWI-COMP-126
component: "RulesPanel"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/admin-app.jsx"
lines: 535-917
figma_priority: 18
evidence: static_code
---

# RulesPanel

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/admin-app.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-126`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-app.jsx`:535.
- File range: lines 535–917.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Cloud, Copy, Sparkles | icons |
| ./admin-ui | fieldClass, JsonIssueList, MiniCardList, Panel, primaryButtonClass, buttonClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-137 | [MiniCardList](../components/components-admin-pokemon-admin-ui-minicardlist.md) (MWI-COMP-137) | JSX/import relation |
| MWI-COMP-139 | [JsonIssueList](../components/components-admin-pokemon-admin-ui-jsonissuelist.md) (MWI-COMP-139) | JSX/import relation |

Unresolved/external JSX tags: `Cloud`, `Copy`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <div>
  - <div>
    - <section>
      - <p>
      - <div>
        - <span>
        - <div>
          - <button>
            - <strong>
            - <span>
      - <label>
        - <span>
        - <input />
      - <label>
        - <input />
      - <div>
        - <span>
        - <div>
          - <button>
            - <span>
      - <div>
        - <span>
        - <div>
          - <button>
            - <span>
      - <div>
        - <div>
          - <span>
          - <button>
        - <p>
        - <input />
        - <div>
          - <button>
            - <span>
      - <label>
        - <input />
      - <label>
        - <span>
        - <textarea />
      - <div>
        - <label>
          - <span>
          - <input />
        - <label>
          - <span>
          - <select>
            - <option>
      - <div>
        - <button>
        - <button>
        - <button>
          - <Copy />
      - <div>
        - <strong>
        - <pre>
    - <section>
      - <h3>
      - <div>
        - <article>
          - <div>
            - <div>
              - <strong>
              - <small>
            - <span>
          - <div>
            - <button>
            - <button>
            - <button>
        - <p>
  - <section>
    - <div>
      - <div>
        - <h3>
        - <p>
      - <span>
    - <MiniCardList />
    - <p>
  - <section>
    - <div>
      - <div>
        - <h3>
        - <p>
      - <span>
    - <JsonIssueList />
    - <p>

Unique HTML/React tags: `article`, `button`, `Cloud`, `Copy`, `div`, `h3`, `input`, `JsonIssueList`, `label`, `MiniCardList`, `option`, `p`, `Panel`, `pre`, `section`, `select`, `small`, `span`, `Sparkles`, `strong`, `textarea`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onClick`, `onOpen`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entries | entries = [] | See exact signature/contract below |
| form | Not found | See exact signature/contract below |
| jsonEntries | jsonEntries = [] | See exact signature/contract below |
| message | Not found | See exact signature/contract below |
| onDelete | Not found | See exact signature/contract below |
| onEdit | Not found | See exact signature/contract below |
| onFormChange | Not found | See exact signature/contract below |
| onOpenEntry | Not found | See exact signature/contract below |
| onPreview | Not found | See exact signature/contract below |
| onSave | Not found | See exact signature/contract below |
| onSyncGithub | Not found | See exact signature/contract below |
| onToggle | Not found | See exact signature/contract below |
| preview | Not found | See exact signature/contract below |
| rules | Not found | See exact signature/contract below |
| syncingGithub | syncingGithub = false | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  rules,
  entries = [],
  jsonEntries = [],
  form,
  preview,
  message,
  onFormChange,
  onPreview,
  onSave,
  onEdit,
  onToggle,
  onDelete,
  onOpenEntry,
  onSyncGithub,
  syncingGithub = false,
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

- Boolean properties for Figma: Hover, Focused, Checked, Unchecked, Disabled, Warning, Success, Empty, Active, Inactive, Scrollable.
- Text properties: `entries`, `form`, `jsonEntries`, `message`, `onDelete`, `onEdit`, `onFormChange`, `onOpenEntry`, `onPreview`, `onSave`, `onSyncGithub`, `onToggle`, `preview`, `rules`, `syncingGithub`.
- Instance swaps: `Cloud`, `Copy`, `Sparkles`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Not found | Not found |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Not found | Not found |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
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
| Sticky | Not found | Not found |

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
- Alignment utilities: `items-center, items-start, justify-between, justify-center, sm:items-end, sm:items-start, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-5`, `mb-2`, `mb-4`, `mb-5`, `mt-1`, `mt-3`, `mt-4`, `mt-5`, `p-3`, `p-4`, `px-3`, `px-4`, `py-1`, `py-2`, `py-3`, `sm:p-5`, `space-y-3`, `space-y-4` |
| Sizing | `h-5`, `max-h-72`, `max-w-full`, `min-h-[260px]`, `min-h-11`, `min-h-12`, `min-w-0`, `w-5`, `w-fit`, `w-full` |
| Typography | `break-words`, `font-black`, `font-bold`, `font-mono`, `leading-5`, `leading-6`, `placeholder:text-slate-500`, `text-amber-100`, `text-cyan-100`, `text-cyan-50`, `text-emerald-100`, `text-emerald-50`, `text-left`, `text-lg`, `text-red-100`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-300/25`, `border-cyan-200/50`, `border-cyan-300/15`, `border-cyan-300/20`, `border-dashed`, `border-emerald-200/50`, `border-emerald-300/20`, `border-red-300/25`, `border-white/10`, `border-white/15`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/45`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/10`, `bg-cyan-400/10`, `bg-cyan-400/20`, `bg-emerald-400/10`, `bg-emerald-400/15`, `bg-emerald-400/20`, `bg-gradient-to-r`, `bg-red-500/10`, `bg-slate-950/25`, `bg-slate-950/30`, `bg-slate-950/35`, `bg-slate-950/45`, `bg-slate-950/55`, `bg-white/[0.055]`, `bg-white/[0.075]`, `bg-white/10`, `from-sky-500`, `hover:bg-cyan-400/10`, `hover:bg-cyan-400/15`, `to-cyan-400` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `accent-cyan-400` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/20` | base | conditional or expression-derived |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/15` | base | conditional or expression-derived |
| `bg-emerald-400/20` | base | conditional or expression-derived |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-red-500/10` | base | static occurrence |
| `bg-slate-950/25` | base | static occurrence |
| `bg-slate-950/30` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-slate-950/55` | base | static occurrence |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/25` | base | static occurrence |
| `border-cyan-200/50` | base | conditional or expression-derived |
| `border-cyan-300/15` | base | static occurrence |
| `border-cyan-300/20` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/50` | base | conditional or expression-derived |
| `border-emerald-300/20` | base | static occurrence |
| `border-red-300/25` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/15` | base | static occurrence |
| `break-words` | base | static occurrence |
| `ex:` | ex | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | conditional or expression-derived |
| `from-sky-500` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-5` | base | static occurrence |
| `hover:bg-cyan-400/10` | hover | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/45` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `hover:underline` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-5` | base | conditional or expression-derived |
| `leading-6` | base | conditional or expression-derived |
| `lg:grid-cols-4` | lg | static occurrence |
| `max-h-72` | base | static occurrence |
| `max-w-full` | base | conditional or expression-derived |
| `mb-2` | base | conditional or expression-derived |
| `mb-4` | base | static occurrence |
| `mb-5` | base | static occurrence |
| `md:grid-cols-[minmax(0,1fr)_220px]` | md | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-[480px]:grid-cols-2` | min-[480px] | static occurrence |
| `min-h-[260px]` | base | conditional or expression-derived |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | conditional or expression-derived |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `py-1` | base | conditional or expression-derived |
| `py-2` | base | conditional or expression-derived |
| `py-3` | base | conditional or expression-derived |
| `resize-y` | base | conditional or expression-derived |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:items-end` | sm | static occurrence |
| `sm:items-start` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-50` | base | conditional or expression-derived |
| `text-emerald-100` | base | conditional or expression-derived |
| `text-emerald-50` | base | conditional or expression-derived |
| `text-left` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-cyan-400` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `underline-offset-4` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-fit` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |

Exact className combinations:

- `bg-emerald-400/15 text-emerald-100`
- `bg-white/10 text-slate-300`
- `block`
- `block text-sm font-black text-white`
- `block text-xs font-black uppercase tracking-[0.18em] text-slate-500`
- `block truncate text-white`
- `border-cyan-200/50 bg-cyan-400/20 text-cyan-50`
- `border-emerald-200/50 bg-emerald-400/20 text-emerald-50`
- `border-white/10 bg-white/[0.055] text-slate-300`
- `break-words`
- `ex: description.French`
- `ex: types/fire, moves/charged, weather, kanto`
- `flex flex-wrap gap-2`
- `flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-black text-white`
- `flex items-start justify-between gap-3`
- `grid gap-3 md:grid-cols-[minmax(0,1fr)_220px]`
- `grid min-w-0 gap-2 md:grid-cols-2`
- `grid min-w-0 gap-2 min-[480px]:grid-cols-2`
- `grid min-w-0 gap-2 sm:grid-cols-3`
- `grid min-w-0 gap-5`
- `grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4`
- `h-5 w-5 accent-cyan-400`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-red-300/25 bg-red-500/10 px-4 py-2 text-sm font-black text-red-100`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `mb-2`
- `mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500`
- `mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between`
- `mb-2 text-xs font-bold leading-5 text-slate-500`
- `mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between`
- `mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50`
- `min-h-[260px] max-w-full resize-y font-mono text-xs leading-6`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0`
- `min-w-0 rounded-2xl border border-white/10 bg-slate-950/25 p-4`
- `min-w-0 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-left transition hover:border-cyan-200/45 hover:bg-cyan-400/10`
- `min-w-0 rounded-2xl border px-3 py-2 text-xs font-black leading-5`
- `min-w-0 rounded-2xl border px-3 py-3 text-sm font-black leading-5`
- `min-w-0 space-y-4 overflow-hidden`
- `mt-1 block text-xs font-bold leading-5 text-slate-400`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `mt-1 text-sm font-bold leading-6 text-slate-400`
- `mt-3 max-h-72 overflow-auto rounded-2xl bg-slate-950/55 p-3 font-mono text-xs leading-6 text-emerald-50`
- `mt-4 grid gap-2 sm:grid-cols-3`
- `mt-4 space-y-3`
- `mt-5 rounded-2xl border border-white/10 bg-slate-950/30 p-4`
- `rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-3 text-sm font-bold text-cyan-100`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4`
- `rounded-2xl border border-white/10 bg-slate-950/35 p-4`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100`
- `rounded-full px-3 py-1 text-xs font-black`
- `text-lg font-black text-white`
- `text-sm font-black text-emerald-100`
- `w-fit text-xs font-black text-cyan-100 underline-offset-4 hover:underline`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} mb-2\``
- `\`${fieldClass} min-h-[260px] max-w-full resize-y font-mono text-xs leading-6\``
- `\`min-w-0 rounded-2xl border px-3 py-2 text-xs font-black leading-5 ${ form.appliesTo?.includes(id) ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300" }\``
- `\`min-w-0 rounded-2xl border px-3 py-2 text-xs font-black leading-5 ${ form.formFilters?.includes(id) ? "border-emerald-200/50 bg-emerald-400/20 text-emerald-50" : "border-white/10 bg-white/[0.055] text-slate-300" }\``
- `\`min-w-0 rounded-2xl border px-3 py-3 text-sm font-black leading-5 ${ mode === id ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300" }\``
- `\`rounded-full px-3 py-1 text-xs font-black ${rule.enabled !== false ? "bg-emerald-400/15 text-emerald-100" : "bg-white/10 text-slate-300"}\``
- `buttonClass`
- `fieldClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `md`, `sm`.
- Responsive utilities: `lg:grid-cols-4`, `md:grid-cols-[minmax(0,1fr)_220px]`, `md:grid-cols-2`, `sm:flex-row`, `sm:grid-cols-3`, `sm:items-end`, `sm:items-start`, `sm:justify-between`, `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Cloud`, `Copy`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Checked, Unchecked, Disabled, Warning, Success, Empty, Active, Inactive, Scrollable.
- Instance swaps: `Cloud`, `Copy`, `Sparkles`.
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
| — | Selected | Not found |
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| — | Loading | Not found |
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
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
| — | Sticky | Not found |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: md | Tailwind md: utilities |
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

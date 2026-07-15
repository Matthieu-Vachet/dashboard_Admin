---
id: MWI-COMP-198
component: "PokemonCard"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/pokemon-card.jsx"
lines: 70-247
figma_priority: 34
evidence: static_code
---

# PokemonCard

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/pokemon-card.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-198`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pokemon-card.jsx`:70.
- File range: lines 70–247.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/pokemon-style | pokemonVariantLabel, preferredPokemonImage, typeBackground, typeColors | internal |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-195 | [TypeBadge](../components/components-admin-pokemon-pokemon-card-typebadge.md) (MWI-COMP-195) | JSX/import relation |
| MWI-COMP-196 | [WeatherBadge](../components/components-admin-pokemon-pokemon-card-weatherbadge.md) (MWI-COMP-196) | JSX/import relation |
| MWI-COMP-197 | [MiniInfo](../components/components-admin-pokemon-pokemon-card-miniinfo.md) (MWI-COMP-197) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-261 | [PokemonCard](../components/components-checklist-pokemon-card-pokemoncard.md) (MWI-COMP-261) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <div />
  - <div>
    - <div>
      - <img />
      - <span />
    - <div>
      - <span>
      - <h3>
      - <p>
      - <span>
    - <div>
  - <div>
    - <TypeBadge />
  - <div>
    - <MiniInfo>
    - <MiniInfo>
  - <div>
    - <WeatherBadge />
    - <MiniInfo>
    - <MiniInfo>
    - <MiniInfo>
  - <div>
    - <span>
    - <span>
  - <div>
    - <div>
      - <span>
      - <span>
    - <div>
      - <span>
      - <span>
  - <div>
    - <label>
      - <input />
      - <span>
    - <button>

Unique HTML/React tags: `article`, `button`, `div`, `h3`, `img`, `input`, `label`, `MiniInfo`, `p`, `span`, `TypeBadge`, `WeatherBadge`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| actionLabel | actionLabel = "Voir la fiche" | See exact signature/contract below |
| admin | admin = false | See exact signature/contract below |
| assetChecked | assetChecked = false | See exact signature/contract below |
| compact | compact = false | See exact signature/contract below |
| entry | Not found | See exact signature/contract below |
| onAssetChecked | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |
| weatherCatalog | weatherCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  entry,
  onOpen,
  actionLabel = "Voir la fiche",
  compact = false,
  admin = false,
  assetChecked = false,
  onAssetChecked,
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

- Boolean properties for Figma: Hover, Checked, Unchecked, Loading, Warning, Success, Hidden.
- Text properties: `actionLabel`, `admin`, `assetChecked`, `compact`, `entry`, `onAssetChecked`, `onOpen`, `typeCatalog`, `weatherCatalog`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
| Visible | Detected | Rendered state |
| Scrollable | Not found | Not found |
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
- Alignment utilities: `content-start, items-center, justify-between, justify-center, place-items-center`.
- Positioning utilities: `absolute, max-[520px]:absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#08090d`, `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#7aa7ff`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `color-mix(in srgb, ${typeColors[mainType] \|\| "#7aa7ff"} 42%, rgba(255,255,255,.12))`, `color-mix(in srgb, ${typeColors[mainType] \|\| "#7aa7ff"} 45%, transparent)`, `rgba(0,0,0,0.24)`, `rgba(14,165,233,.25)`, `rgba(24,28,36,.76)`, `rgba(24,28,36,.84)`, `rgba(255,255,255,.16)`, `rgba(8,10,13,.88)`, `rgba(8,10,13,.92)` |
| Spacing | `bottom-[-38%]`, `gap-1.5`, `gap-2`, `gap-3`, `inset-x-[-20%]`, `max-[520px]:right-4`, `max-[520px]:top-4`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `mt-auto`, `p-3`, `p-4`, `pt-4`, `px-2`, `px-2.5`, `px-3`, `px-4`, `py-1` |
| Sizing | `h-[105%]`, `h-[58px]`, `h-[86px]`, `h-2/3`, `h-5`, `h-6`, `h-full`, `max-[520px]:h-[54px]`, `max-[520px]:h-[74px]`, `max-[520px]:w-[54px]`, `max-[520px]:w-[74px]`, `max-w-full`, `min-h-[430px]`, `min-h-[5.5rem]`, `min-h-10`, `min-h-12`, `min-h-8`, `min-h-9`, `min-w-0`, `w-[105%]`, `w-[58px]`, `w-[86px]`, `w-5`, `w-6` |
| Typography | `break-words`, `font-black`, `font-bold`, `font-medium`, `font-mono`, `leading-tight`, `text-[11px]`, `text-amber-100`, `text-amber-200`, `text-emerald-200`, `text-slate-100`, `text-slate-200`, `text-slate-300`, `text-sm`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.12em]`, `tracking-[0.16em]`, `tracking-widest`, `uppercase` |
| Radius | `rounded-[1.65rem]`, `rounded-2xl`, `rounded-full`, `rounded-lg`, `rounded-xl` |
| Borders/strokes | `border`, `border-[5px]`, `border-amber-300/25`, `border-amber-300/30`, `border-emerald-300/25`, `border-emerald-300/30`, `border-white/10`, `border-white/15`, `border-white/75`, `ring-2`, `ring-emerald-300/50` |
| Shadows/elevation | `drop-shadow-lg`, `shadow-[0_16px_45px_rgba(14,165,233,.25)]`, `shadow-[0_18px_50px_rgba(0,0,0,0.24)]` |
| Opacity | Not found |
| Background | `bg-[linear-gradient(#fff_0_48%,#1f2937_49%_52%,#ff4f5e_53%_100%)]`, `bg-amber-300/10`, `bg-amber-300/15`, `bg-emerald-300/10`, `bg-gradient-to-r`, `bg-slate-900`, `bg-slate-950/45`, `bg-white/10`, `bg-white/12`, `from-cyan-400`, `to-emerald-400`, `via-sky-500` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-z-10` | base | static occurrence |
| `absolute` | base | static occurrence |
| `accent-emerald-400` | base | static occurrence |
| `bg-[linear-gradient(#fff_0_48%,#1f2937_49%_52%,#ff4f5e_53%_100%)]` | base | static occurrence |
| `bg-amber-300/10` | base | conditional or expression-derived |
| `bg-amber-300/15` | base | static occurrence |
| `bg-emerald-300/10` | base | conditional or expression-derived |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-900` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `bg-white/12` | base | static occurrence |
| `blur-3xl` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-[5px]` | base | static occurrence |
| `border-amber-300/25` | base | static occurrence |
| `border-amber-300/30` | base | conditional or expression-derived |
| `border-emerald-300/25` | base | conditional or expression-derived |
| `border-emerald-300/30` | base | conditional or expression-derived |
| `border-white/10` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `border-white/75` | base | static occurrence |
| `bottom-[-38%]` | base | static occurrence |
| `break-words` | base | static occurrence |
| `content-start` | base | static occurrence |
| `drop-shadow-lg` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | conditional or expression-derived |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-medium` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-cyan-400` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[86px_minmax(0,1fr)_58px]` | base | static occurrence |
| `grid-cols-2` | base | conditional or expression-derived |
| `h-[105%]` | base | static occurrence |
| `h-[58px]` | base | static occurrence |
| `h-[86px]` | base | static occurrence |
| `h-2/3` | base | static occurrence |
| `h-5` | base | static occurrence |
| `h-6` | base | static occurrence |
| `h-full` | base | conditional or expression-derived |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `inset-x-[-20%]` | base | static occurrence |
| `isolate` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | static occurrence |
| `justify-center` | base | conditional or expression-derived |
| `leading-tight` | base | static occurrence |
| `max-[520px]:absolute` | max-[520px] | static occurrence |
| `max-[520px]:grid-cols-[74px_minmax(0,1fr)]` | max-[520px] | static occurrence |
| `max-[520px]:h-[54px]` | max-[520px] | static occurrence |
| `max-[520px]:h-[74px]` | max-[520px] | static occurrence |
| `max-[520px]:hidden` | max-[520px] | static occurrence |
| `max-[520px]:right-4` | max-[520px] | static occurrence |
| `max-[520px]:top-4` | max-[520px] | static occurrence |
| `max-[520px]:w-[54px]` | max-[520px] | static occurrence |
| `max-[520px]:w-[74px]` | max-[520px] | static occurrence |
| `max-w-full` | base | static occurrence |
| `min-[521px]:hidden` | min-[521px] | static occurrence |
| `min-h-[430px]` | base | conditional or expression-derived |
| `min-h-[5.5rem]` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-8` | base | conditional or expression-derived |
| `min-h-9` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | conditional or expression-derived |
| `mt-auto` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pt-4` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `ring-2` | base | conditional or expression-derived |
| `ring-emerald-300/50` | base | conditional or expression-derived |
| `rounded-[1.65rem]` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_16px_45px_rgba(14,165,233,.25)]` | base | static occurrence |
| `shadow-[0_18px_50px_rgba(0,0,0,0.24)]` | base | conditional or expression-derived |
| `text-[11px]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-200` | base | conditional or expression-derived |
| `text-emerald-200` | base | conditional or expression-derived |
| `text-slate-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-emerald-400` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `tracking-widest` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-sky-500` | base | static occurrence |
| `w-[105%]` | base | static occurrence |
| `w-[58px]` | base | static occurrence |
| `w-[86px]` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-6` | base | static occurrence |

Exact className combinations:

- `absolute inset-x-[-20%] bottom-[-38%] -z-10 h-2/3 rounded-full blur-3xl`
- `border-amber-300/30`
- `border-amber-300/30 bg-amber-300/10 text-amber-200`
- `border-emerald-300/25`
- `border-emerald-300/30 bg-emerald-300/10 text-emerald-200`
- `flex items-center justify-between gap-3`
- `flex min-h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 text-sm font-black text-white`
- `font-black tracking-widest text-slate-200`
- `grid grid-cols-[86px_minmax(0,1fr)_58px] items-center gap-3 max-[520px]:grid-cols-[74px_minmax(0,1fr)]`
- `grid h-[58px] w-[58px] place-items-center rounded-full text-sm font-black text-white max-[520px]:absolute max-[520px]:right-4 max-[520px]:top-4 max-[520px]:h-[54px] max-[520px]:w-[54px]`
- `grid h-[86px] w-[86px] place-items-center overflow-hidden rounded-full border-[5px] border-white/75 bg-[linear-gradient(#fff_0_48%,#1f2937_49%_52%,#ff4f5e_53%_100%)] max-[520px]:h-[74px] max-[520px]:w-[74px]`
- `grid-cols-2`
- `h-[105%] w-[105%] object-contain drop-shadow-lg`
- `h-5 w-5 accent-emerald-400`
- `h-6 w-6 rounded-full bg-slate-900`
- `inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-black`
- `max-w-full truncate rounded-lg border border-white/10 bg-white/10 px-2 py-1 font-mono text-[11px] font-bold text-slate-100`
- `min-h-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 font-black text-white shadow-[0_16px_45px_rgba(14,165,233,.25)] transition hover:scale-[1.01]`
- `min-w-0`
- `mt-1 break-words text-xl font-black leading-tight text-white`
- `mt-1 truncate text-sm font-medium text-slate-300`
- `mt-2 flex flex-wrap gap-1.5`
- `mt-2 inline-flex rounded-full border border-white/15 bg-white/12 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-white`
- `mt-3 grid grid-cols-2 gap-2`
- `mt-3 grid grid-cols-2 gap-2 min-[521px]:hidden`
- `mt-3 grid min-h-[5.5rem] grid-cols-2 content-start gap-2 max-[520px]:hidden`
- `mt-3 rounded-xl border border-amber-300/25 bg-slate-950/45 p-3`
- `mt-4 grid min-h-9 gap-2`
- `mt-auto grid gap-2 pt-4`
- `relative isolate flex h-full min-h-[430px] flex-col overflow-hidden rounded-[1.65rem] border p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)]`
- `ring-2 ring-emerald-300/50`
- `rounded-full bg-amber-300/15 px-2 py-1 text-[11px] font-black text-amber-100`
- `rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-[11px] font-black text-slate-200`
- `text-xs font-black uppercase tracking-[0.16em] text-amber-100`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-black ${ assetsPresent ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200" : "border-amber-300/30 bg-amber-300/10 text-amber-200" }\``
- `\`inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-black ${ entry.complete ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200" : "border-amber-300/30 bg-amber-300/10 text-amber-200" }\``
- `\`mt-4 grid min-h-9 gap-2 ${types.length > 1 ? "grid-cols-2" : ""}\``
- `\`relative isolate flex h-full min-h-[430px] flex-col overflow-hidden rounded-[1.65rem] border p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ${ entry.complete ? "border-emerald-300/25" : "border-amber-300/30" } ${assetChecked ? "ring-2 ring-emerald-300/50" : ""}\``

### CSS variables

Not found

### Inline style expressions

- `{{ background: \`color-mix(in srgb, ${typeColors[mainType] || "#7aa7ff"} 45%, transparent)\` }}`
- `{{ background: \`radial-gradient(circle at center, #08090d 54%, transparent 56%), conic-gradient(${typeColors[mainType] || "#7aa7ff"} ${score}%, rgba(255,255,255,.16) 0)\`, }}`
- `{{ borderColor: \`color-mix(in srgb, ${typeColors[mainType] || "#7aa7ff"} 42%, rgba(255,255,255,.12))\`, backgroundImage: \`${ background ? \`linear-gradient(120deg, rgba(8,10,13,.88), rgba(24,28,36,.76)), url("${background}")\` : "linear-gradient(120deg, rgba(8,10,13,.92), rgba(24,28,36,.84))" }\`, backgroundSize: "cover", backgroundPosition: "center", }}`

### Referenced local/imported style declarations

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

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Checked, Unchecked, Loading, Warning, Success, Hidden.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| — | Responsive variants | Not found |

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

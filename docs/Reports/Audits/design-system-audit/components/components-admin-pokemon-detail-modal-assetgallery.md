---
id: MWI-COMP-172
component: "AssetGallery"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 691-777
figma_priority: 18
evidence: static_code
---

# AssetGallery

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-172`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:691.
- File range: lines 691–777.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-156 | [Section](../components/components-admin-pokemon-detail-modal-section.md) (MWI-COMP-156) | JSX/import relation |
| MWI-COMP-161 | [EmptyInline](../components/components-admin-pokemon-detail-modal-emptyinline.md) (MWI-COMP-161) | JSX/import relation |
| MWI-COMP-173 | [AssetBadges](../components/components-admin-pokemon-detail-modal-assetbadges.md) (MWI-COMP-173) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Section>
  - <div>
    - <div>
      - <div>
        - <h4>
        - <span>
      - <div>
        - <button>
          - <div>
            - <AssetBadges />
            - <img />
          - <div>
            - <strong>
            - <span>
    - <div role="presentation">
      - <div>
        - <div>
          - <strong>
          - <button>
        - <div>
          - <img />
  - <EmptyInline>

Unique HTML/React tags: `AssetBadges`, `button`, `div`, `EmptyInline`, `h4`, `img`, `Section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `preview = null`.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entry | Not found | See exact signature/contract below |
| payload | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entry, payload }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Warning, Success, Empty, Scrollable.
- Text properties: `entry`, `payload`.
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
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
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
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, justify-center, place-items-center`.
- Positioning utilities: `absolute, fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#07111f`, `rgba(125,211,252,.2)`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.89)`, `rgba(2,6,23,.93)`, `rgba(248,250,252,.82)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.04)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.9)` |
| Spacing | `gap-3`, `inset-0`, `left-2`, `mb-3`, `mt-1`, `p-3`, `p-4`, `p-5`, `px-3`, `py-1`, `sm:left-3`, `sm:top-3`, `space-y-5`, `top-2` |
| Sizing | `h-10`, `max-h-[70dvh]`, `max-h-[78dvh]`, `max-h-full`, `max-w-5xl`, `w-10`, `w-full` |
| Typography | `font-black`, `font-bold`, `text-2xl`, `text-amber-100`, `text-cyan-100`, `text-fuchsia-100`, `text-indigo-100`, `text-left`, `text-orange-100`, `text-red-100`, `text-rose-100`, `text-sky-100`, `text-slate-300`, `text-slate-400`, `text-sm`, `text-stone-100`, `text-violet-100`, `text-white`, `text-xl`, `text-xs`, `text-yellow-100` |
| Radius | `rounded-[2rem]`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/20`, `border-amber-300/45`, `border-b`, `border-cyan-200/20`, `border-cyan-200/45`, `border-emerald-200/20`, `border-fuchsia-300/45`, `border-indigo-300/45`, `border-orange-300/45`, `border-red-300/45`, `border-rose-200/20`, `border-rose-300/45`, `border-sky-300/45`, `border-stone-200/45`, `border-t`, `border-violet-200/20`, `border-violet-300/45`, `border-white/10`, `border-yellow-200/45`, `hover:border-cyan-200/40` |
| Shadows/elevation | `drop-shadow-2xl` |
| Opacity | Not found |
| Background | `backdrop-blur-md`, `bg-[#07111f]`, `bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.2),transparent_38%),rgba(255,255,255,.04)]`, `bg-amber-400/10`, `bg-amber-500/18`, `bg-cyan-400/10`, `bg-cyan-400/18`, `bg-emerald-400/10`, `bg-fuchsia-500/18`, `bg-indigo-500/18`, `bg-orange-500/18`, `bg-red-500/18`, `bg-rose-400/10`, `bg-rose-500/18`, `bg-sky-500/18`, `bg-slate-950/45`, `bg-slate-950/86`, `bg-stone-400/18`, `bg-violet-400/10`, `bg-violet-500/18`, `bg-white/[0.06]`, `bg-white/10`, `bg-yellow-400/18`, `from-amber-400/15`, `from-cyan-400/15`, `from-emerald-400/15`, `from-rose-400/15`, `from-violet-400/15`, `hover:bg-cyan-400/10` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `aspect-square` | base | static occurrence |
| `backdrop-blur-md` | base | static occurrence |
| `bg-[#07111f]` | base | static occurrence |
| `bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.2),transparent_38%),rgba(255,255,255,.04)]` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-amber-500/18` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/18` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-fuchsia-500/18` | base | static occurrence |
| `bg-indigo-500/18` | base | static occurrence |
| `bg-orange-500/18` | base | static occurrence |
| `bg-red-500/18` | base | static occurrence |
| `bg-rose-400/10` | base | static occurrence |
| `bg-rose-500/18` | base | static occurrence |
| `bg-sky-500/18` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-slate-950/86` | base | static occurrence |
| `bg-stone-400/18` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-violet-500/18` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `bg-yellow-400/18` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-amber-300/45` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/45` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-fuchsia-300/45` | base | static occurrence |
| `border-indigo-300/45` | base | static occurrence |
| `border-orange-300/45` | base | static occurrence |
| `border-red-300/45` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-rose-300/45` | base | static occurrence |
| `border-sky-300/45` | base | static occurrence |
| `border-stone-200/45` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-violet-300/45` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-yellow-200/45` | base | static occurrence |
| `drop-shadow-2xl` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `from-amber-400/15` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:bg-cyan-400/10` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `left-2` | base | static occurrence |
| `lg:grid-cols-4` | lg | static occurrence |
| `max-h-[70dvh]` | base | static occurrence |
| `max-h-[78dvh]` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-5xl` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-auto` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-[2rem]` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:left-3` | sm | static occurrence |
| `sm:top-3` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-fuchsia-100` | base | static occurrence |
| `text-indigo-100` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-orange-100` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-stone-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `text-yellow-100` | base | static occurrence |
| `top-2` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1120]` | base | static occurrence |

Exact className combinations:

- `absolute left-2 top-2 sm:left-3 sm:top-3`
- `block truncate text-sm font-black text-white`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-amber-300/45 bg-amber-500/18 text-amber-100`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-cyan-200/45 bg-cyan-400/18 text-cyan-100`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100`
- `border-indigo-300/45 bg-indigo-500/18 text-indigo-100`
- `border-orange-300/45 bg-orange-500/18 text-orange-100`
- `border-red-300/45 bg-red-500/18 text-red-100`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-rose-300/45 bg-rose-500/18 text-rose-100`
- `border-sky-300/45 bg-sky-500/18 text-sky-100`
- `border-stone-200/45 bg-stone-400/18 text-stone-100`
- `border-t border-white/10 p-3`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `border-violet-300/45 bg-violet-500/18 text-violet-100`
- `border-yellow-200/45 bg-yellow-400/18 text-yellow-100`
- `fixed inset-0 z-[1120] grid place-items-center bg-slate-950/86 p-4 backdrop-blur-md`
- `flex items-center justify-between gap-3 border-b border-white/10 p-4`
- `font-black text-white`
- `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4`
- `grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl`
- `grid max-h-[78dvh] place-items-center overflow-auto p-5`
- `max-h-[70dvh] object-contain`
- `max-h-full object-contain drop-shadow-2xl`
- `mb-3 flex items-center justify-between gap-3`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-400/10`
- `relative flex aspect-square items-center justify-center bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.2),transparent_38%),rgba(255,255,255,.04)] p-4`
- `rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-300`
- `space-y-5`
- `truncate text-xl font-black text-white`
- `w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-4`, `sm:grid-cols-3`, `sm:left-3`, `sm:top-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: `role="presentation"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Warning, Success, Empty, Scrollable.
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
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
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

---
id: MWI-COMP-137
component: "MiniCardList"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 254-294
figma_priority: 40
evidence: static_code
---

# MiniCardList

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-137`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:254.
- File range: lines 254–294.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **40/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ImageIcon | icons |
| @/components/site/pokemon-style | pokemonVariantLabel, preferredPokemonImage | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `ImageIcon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-126 | [RulesPanel](../components/components-admin-pokemon-admin-app-rulespanel.md) (MWI-COMP-126) | Renders/imports this component |
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-138 | [ControlCardsPanel](../components/components-admin-pokemon-admin-ui-controlcardspanel.md) (MWI-COMP-138) | Renders/imports this component |
| MWI-COMP-297 | [MiniCardList](../components/components-pokemon-admin-admin-ui-minicardlist.md) (MWI-COMP-297) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <button>
    - <span>
      - <img />
      - <ImageIcon />
    - <span>
      - <strong>
      - <small>
    - <span>
  - <p>

Unique HTML/React tags: `button`, `div`, `ImageIcon`, `img`, `p`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entries | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entries, onOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Warning.
- Text properties: `entries`, `onOpen`.
- Instance swaps: `ImageIcon`.
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
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Not found | Not found |
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

- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.4)` |
| Spacing | `gap-3`, `mt-1`, `p-1.5`, `p-3`, `p-4`, `px-3`, `py-1` |
| Sizing | `h-[3.25rem]`, `max-h-full`, `min-w-0`, `w-[3.25rem]` |
| Typography | `font-black`, `font-bold`, `text-amber-100`, `text-cyan-100/60`, `text-left`, `text-slate-400`, `text-sm`, `text-white`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-300/30`, `border-dashed`, `border-white/10`, `border-white/15`, `hover:border-cyan-200/40` |
| Shadows/elevation | `drop-shadow-[0_12px_20px_rgba(0,0,0,.4)]`, `shadow-inner` |
| Opacity | Not found |
| Background | `bg-amber-400/10`, `bg-slate-950/35`, `bg-white/[0.055]`, `hover:bg-cyan-400/10` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-300/30` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `drop-shadow-[0_12px_20px_rgba(0,0,0,.4)]` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[3.25rem_minmax(0,1fr)_auto]` | base | static occurrence |
| `group-hover:scale-110` | group-hover | static occurrence |
| `h-[3.25rem]` | base | static occurrence |
| `hover:bg-cyan-400/10` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `items-center` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-1.5` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-inner` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100/60` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-[3.25rem]` | base | static occurrence |

Exact className combinations:

- `block truncate font-black text-white`
- `grid gap-3`
- `grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl border border-white/10 bg-white/[0.055] p-1.5 shadow-inner`
- `group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/10`
- `max-h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,.4)] transition group-hover:scale-110`
- `min-w-0`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-100`
- `text-cyan-100/60`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

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

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
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

- Lucide icons: `ImageIcon`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Warning.
- Instance swaps: `ImageIcon`.
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
| — | Success | Not found |
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| — | Hidden | Not found |
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

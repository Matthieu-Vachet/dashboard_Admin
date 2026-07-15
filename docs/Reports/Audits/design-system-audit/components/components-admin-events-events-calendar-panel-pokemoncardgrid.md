---
id: MWI-COMP-067
component: "PokemonCardGrid"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1476-1506
figma_priority: 21
evidence: static_code
---

# PokemonCardGrid

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-067`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1476.
- File range: lines 1476–1506.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **21/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-061 | [TypePills](../components/components-admin-events-events-calendar-panel-typepills.md) (MWI-COMP-061) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-066 | [EventPokemonGroups](../components/components-admin-events-events-calendar-panel-eventpokemongroups.md) (MWI-COMP-066) | Renders/imports this component |
| MWI-COMP-069 | [ScrapedSectionCard](../components/components-admin-events-events-calendar-panel-scrapedsectioncard.md) (MWI-COMP-069) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Fragment>
    - <img />
    - <span>
    - <span>
      - <strong>
      - <small>
      - <TypePills id={entry.id || entry.name} />
      - <small>
  - <button>
  - <div>

Unique HTML/React tags: `button`, `div`, `img`, `small`, `span`, `strong`, `TypePills`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | compact = false | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| pokemon | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ pokemon, onOpenPokemon, compact = false }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Warning.
- Text properties: `compact`, `onOpenPokemon`, `pokemon`.
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
| Loading | Detected | loading/pending signal |
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
| Literal colors | `rgba(56,189,248,.12)` |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-3`, `p-2.5`, `p-3`, `px-2`, `py-0.5` |
| Sizing | `h-11`, `h-14`, `min-w-0`, `w-11`, `w-14` |
| Typography | `break-words`, `font-black`, `font-bold`, `leading-tight`, `text-[10px]`, `text-amber-100`, `text-left`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `whitespace-normal` |
| Radius | `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-200/20`, `border-white/10`, `hover:border-cyan-200/40` |
| Shadows/elevation | `drop-shadow-[0_0_16px_rgba(56,189,248,.12)]` |
| Opacity | Not found |
| Background | `bg-amber-300/10`, `bg-slate-950/35`, `bg-slate-950/40`, `hover:bg-cyan-300/10` |
| Animation | `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-300/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `drop-shadow-[0_0_16px_rgba(56,189,248,.12)]` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[3.25rem_minmax(0,1fr)]` | base | static occurrence |
| `grid-cols-[3.8rem_minmax(0,1fr)]` | base | static occurrence |
| `grid-cols-1` | base | conditional or expression-derived |
| `h-11` | base | conditional or expression-derived |
| `h-14` | base | conditional or expression-derived |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:bg-cyan-300/10` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `leading-tight` | base | static occurrence |
| `lg:grid-cols-3` | lg | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | conditional or expression-derived |
| `object-contain` | base | conditional or expression-derived |
| `p-2.5` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `px-2` | base | static occurrence |
| `py-0.5` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `sm:grid-cols-2` | sm | conditional or expression-derived |
| `text-[10px]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-11` | base | conditional or expression-derived |
| `w-14` | base | conditional or expression-derived |
| `whitespace-normal` | base | static occurrence |
| `xl:grid-cols-3` | xl | conditional or expression-derived |
| `xl:grid-cols-4` | xl | conditional or expression-derived |

Exact className combinations:

- `block truncate text-xs font-bold text-slate-400`
- `block whitespace-normal break-words text-sm font-black leading-tight text-white`
- `grid min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-slate-950/35 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/10`
- `grid place-items-center rounded-xl bg-slate-950/40 text-xs font-black text-slate-500`
- `grid-cols-[3.25rem_minmax(0,1fr)] p-2.5`
- `grid-cols-[3.8rem_minmax(0,1fr)] p-3`
- `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `h-11 w-11`
- `h-14 w-14`
- `min-w-0`
- `mt-1 inline-flex rounded-full border border-amber-200/20 bg-amber-300/10 px-2 py-0.5 text-[10px] font-black text-amber-100`
- `mt-3 grid gap-2`
- `object-contain drop-shadow-[0_0_16px_rgba(56,189,248,.12)]`
- `sm:grid-cols-2 xl:grid-cols-3`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${compact ? "h-11 w-11" : "h-14 w-14"} grid place-items-center rounded-xl bg-slate-950/40 text-xs font-black text-slate-500\``
- `\`${compact ? "h-11 w-11" : "h-14 w-14"} object-contain drop-shadow-[0_0_16px_rgba(56,189,248,.12)]\``
- `\`mt-3 grid gap-2 ${compact ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3"}\``
- `className`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`, `xl`.
- Responsive utilities: `lg:grid-cols-3`, `sm:grid-cols-2`, `xl:grid-cols-3`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:-translate-y-0.5`, `transition`.
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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Warning.
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
| □ | Loading | loading/pending signal |
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
| □ | Responsive: lg | Tailwind lg: utilities |
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

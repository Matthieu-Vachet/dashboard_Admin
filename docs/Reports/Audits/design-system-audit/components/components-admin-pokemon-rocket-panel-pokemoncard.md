---
id: MWI-COMP-221
component: "PokemonCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/rocket-panel.jsx"
lines: 196-242
figma_priority: 21
evidence: static_code
---

# PokemonCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/rocket-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-221`.
- Location: `Dashboard Admin/src/components/admin/pokemon/rocket-panel.jsx`:196.
- File range: lines 196–242.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **21/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-219 | [TypeIcons](../components/components-admin-pokemon-rocket-panel-typeicons.md) (MWI-COMP-219) | JSX/import relation |
| MWI-COMP-220 | [StatusIcons](../components/components-admin-pokemon-rocket-panel-statusicons.md) (MWI-COMP-220) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-222 | [SlotBlock](../components/components-admin-pokemon-rocket-panel-slotblock.md) (MWI-COMP-222) | Renders/imports this component |
| MWI-COMP-223 | [TrainerCard](../components/components-admin-pokemon-rocket-panel-trainercard.md) (MWI-COMP-223) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <span>
    - <img />
  - <span>
    - <span>
      - <span>
        - <strong>
        - <span>
        - <span>
      - <StatusIcons />
    - <span>
      - <TypeIcons />
      - <span>
    - <span>
      - <span>
      - <span>
      - <span>
      - <span>

Unique HTML/React tags: `button`, `img`, `span`, `StatusIcons`, `strong`, `TypeIcons`.

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

- Boolean properties for Figma: Hover, Loading, Disabled, Success.
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
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
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
- Pointer/cursor behavior: `disabled:cursor-default`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, items-start, justify-between, place-items-center`.
- Positioning utilities: `relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.16)`, `rgba(0,0,0,.4)` |
| Spacing | `gap-1.5`, `gap-2`, `gap-3`, `p-2`, `p-3`, `px-2`, `py-1`, `space-y-2` |
| Sizing | `h-[72px]`, `max-h-full`, `min-w-0`, `w-[72px]` |
| Typography | `font-black`, `font-bold`, `text-[10px]`, `text-[11px]`, `text-cyan-100/60`, `text-cyan-100/65`, `text-cyan-50`, `text-emerald-50`, `text-left`, `text-slate-400`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.14em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-cyan-200/20`, `border-emerald-200/20`, `border-white/10`, `enabled:hover:border-cyan-200/35` |
| Shadows/elevation | `drop-shadow-[0_12px_22px_rgba(0,0,0,.4)]`, `shadow-[0_14px_40px_rgba(0,0,0,.16)]` |
| Opacity | Not found |
| Background | `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-slate-950/34`, `bg-slate-950/48`, `enabled:hover:bg-cyan-400/8` |
| Animation | `duration-300`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-slate-950/34` | base | static occurrence |
| `bg-slate-950/48` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `disabled:cursor-default` | disabled | static occurrence |
| `drop-shadow-[0_12px_22px_rgba(0,0,0,.4)]` | base | static occurrence |
| `duration-300` | base | static occurrence |
| `enabled:hover:-translate-y-0.5` | enabled:hover | static occurrence |
| `enabled:hover:bg-cyan-400/8` | enabled:hover | static occurrence |
| `enabled:hover:border-cyan-200/35` | enabled:hover | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[72px_minmax(0,1fr)]` | base | static occurrence |
| `group-hover:scale-105` | group-hover | static occurrence |
| `h-[72px]` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_14px_40px_rgba(0,0,0,.16)]` | base | static occurrence |
| `space-y-2` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-cyan-100/60` | base | static occurrence |
| `text-cyan-100/65` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-[72px]` | base | static occurrence |

Exact className combinations:

- `block truncate text-[11px] font-bold text-cyan-100/65`
- `block truncate text-sm font-black text-white`
- `block truncate text-xs font-bold text-slate-400`
- `flex flex-wrap items-center gap-1.5 text-[10px] font-black text-slate-400`
- `flex min-w-0 items-center justify-between gap-2`
- `flex min-w-0 items-start justify-between gap-2`
- `group grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-slate-950/34 p-3 text-left shadow-[0_14px_40px_rgba(0,0,0,.16)] transition enabled:hover:-translate-y-0.5 enabled:hover:border-cyan-200/35 enabled:hover:bg-cyan-400/8 disabled:cursor-default`
- `max-h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,.4)] transition duration-300 group-hover:scale-105`
- `min-w-0`
- `min-w-0 space-y-2`
- `relative grid h-[72px] w-[72px] place-items-center rounded-2xl border border-white/10 bg-slate-950/48 p-2`
- `rounded-full border border-cyan-200/20 bg-cyan-400/10 px-2 py-1 text-cyan-50`
- `rounded-full border border-emerald-200/20 bg-emerald-400/10 px-2 py-1 text-emerald-50`
- `text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100/60`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

`disabled:`, `group-hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-300`, `transition`.
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

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Disabled, Success.
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
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
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

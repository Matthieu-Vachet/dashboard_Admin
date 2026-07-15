---
id: MWI-COMP-159
component: "DataGrid"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 211-238
figma_priority: 18
evidence: static_code
---

# DataGrid

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-159`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:211.
- File range: lines 211–238.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <span>
      - <img />
      - <span />
    - <span>
      - <span>
      - <strong>

Unique HTML/React tags: `div`, `img`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| items | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ items }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Success.
- Text properties: `items`.
- Instance swaps: Not found.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Not found | Not found |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow` |
| Literal colors | `rgba(0,0,0,.18)` |
| Spacing | `gap-3`, `mt-2`, `p-4` |
| Sizing | `h-10`, `h-3`, `h-6`, `min-h-24`, `min-w-0`, `w-10`, `w-3`, `w-6` |
| Typography | `font-black`, `font-bold`, `leading-snug`, `text-base`, `text-left`, `text-slate-400`, `text-white`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/16`, `border-cyan-200/16`, `border-emerald-200/16`, `border-violet-200/16`, `border-white/10` |
| Shadows/elevation | `shadow-[0_12px_38px_rgba(0,0,0,.18)]` |
| Opacity | Not found |
| Background | `bg-amber-400/[0.075]`, `bg-cyan-300`, `bg-cyan-400/[0.075]`, `bg-emerald-400/[0.075]`, `bg-violet-400/[0.075]`, `bg-white/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[overflow-wrap:anywhere]` | [overflow-wrap | static occurrence |
| `bg-amber-400/[0.075]` | base | static occurrence |
| `bg-cyan-300` | base | static occurrence |
| `bg-cyan-400/[0.075]` | base | static occurrence |
| `bg-emerald-400/[0.075]` | base | static occurrence |
| `bg-violet-400/[0.075]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/16` | base | static occurrence |
| `border-cyan-200/16` | base | static occurrence |
| `border-emerald-200/16` | base | static occurrence |
| `border-violet-200/16` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[2.45rem_minmax(0,1fr)]` | base | conditional or expression-derived |
| `h-10` | base | static occurrence |
| `h-3` | base | static occurrence |
| `h-6` | base | static occurrence |
| `leading-snug` | base | static occurrence |
| `min-h-24` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `overflow-wrap-anywhere` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pokemon-interface-icon` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `shadow-[0_12px_38px_rgba(0,0,0,.18)]` | base | conditional or expression-derived |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-base` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-3` | base | static occurrence |
| `w-6` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `block text-xs font-bold uppercase tracking-[0.16em] text-slate-400`
- `border-amber-200/16 bg-amber-400/[0.075]`
- `border-cyan-200/16 bg-cyan-400/[0.075]`
- `border-emerald-200/16 bg-emerald-400/[0.075]`
- `border-violet-200/16 bg-violet-400/[0.075]`
- `grid gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]`
- `grid min-h-24 grid-cols-[2.45rem_minmax(0,1fr)] gap-3 rounded-2xl border p-4 text-left shadow-[0_12px_38px_rgba(0,0,0,.18)]`
- `h-3 w-3 rounded-full bg-cyan-300`
- `min-w-0`
- `mt-2 block overflow-wrap-anywhere text-base font-black leading-snug text-white [overflow-wrap:anywhere]`
- `pokemon-interface-icon h-6 w-6 object-contain`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid min-h-24 grid-cols-[2.45rem_minmax(0,1fr)] gap-3 rounded-2xl border p-4 text-left shadow-[0_12px_38px_rgba(0,0,0,.18)] ${cardTones[index % cardTones.length]}\``

### CSS variables

`--accent-glow`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/detail-modal.jsx#cardTones
cardTones = [
  "border-cyan-200/16 bg-cyan-400/[0.075]",
  "border-emerald-200/16 bg-emerald-400/[0.075]",
  "border-violet-200/16 bg-violet-400/[0.075]",
  "border-amber-200/16 bg-amber-400/[0.075]",
]
```

### Referenced global custom CSS rules

```css
.pokemon-interface-icon {
filter: drop-shadow(0 0 10px var(--accent-glow));
  opacity: 0.98;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

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
- Boolean properties: Warning, Success.
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
| — | Hover | Not found |
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

---
id: MWI-COMP-202
component: "MatchupCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/pvp-rankings-panel.jsx"
lines: 57-67
figma_priority: 18
evidence: static_code
---

# MatchupCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/pvp-rankings-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-202`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pvp-rankings-panel.jsx`:57.
- File range: lines 57–67.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| ./asset-icons | TypeIcons | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-204 | [PvpDetail](../components/components-admin-pokemon-pvp-rankings-panel-pvpdetail.md) (MWI-COMP-204) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <span>
    - <img />
    - <span>
  - <span>
    - <strong>
    - <span>
      - <TypeIcons />
      - <small>
  - <span>
    - <small>
    - <strong>

Unique HTML/React tags: `article`, `img`, `small`, `span`, `strong`, `TypeIcons`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| good | Not found | See exact signature/contract below |
| item | Not found | See exact signature/contract below |
| pokemonReferences | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ item, good, pokemonReferences }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Warning, Success.
- Text properties: `good`, `item`, `pokemonReferences`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `p-1`, `p-3` |
| Sizing | `h-12`, `h-full`, `min-w-0`, `w-12`, `w-full` |
| Typography | `font-black`, `font-mono`, `text-[9px]`, `text-amber-200`, `text-emerald-200`, `text-lg`, `text-right`, `text-rose-200`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `uppercase` |
| Radius | `rounded-xl` |
| Borders/strokes | `border`, `border-emerald-200/16`, `border-rose-200/16` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/20`, `bg-emerald-400/[0.07]`, `bg-rose-400/[0.07]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/20` | base | static occurrence |
| `bg-emerald-400/[0.07]` | base | conditional or expression-derived |
| `bg-rose-400/[0.07]` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-emerald-200/16` | base | conditional or expression-derived |
| `border-rose-200/16` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | conditional or expression-derived |
| `gap-2` | base | static occurrence |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[3rem_minmax(0,1fr)_auto]` | base | conditional or expression-derived |
| `h-12` | base | static occurrence |
| `h-full` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `text-[9px]` | base | static occurrence |
| `text-amber-200` | base | static occurrence |
| `text-emerald-200` | base | conditional or expression-derived |
| `text-lg` | base | conditional or expression-derived |
| `text-right` | base | static occurrence |
| `text-rose-200` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-12` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `block text-[9px] font-black uppercase text-slate-500`
- `block truncate text-sm text-white`
- `border-emerald-200/16 bg-emerald-400/[0.07]`
- `border-rose-200/16 bg-rose-400/[0.07]`
- `font-mono text-lg`
- `grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3`
- `grid h-12 w-12 place-items-center rounded-xl bg-black/20 p-1`
- `h-full w-full object-contain`
- `min-w-0`
- `mt-1 flex items-center gap-2`
- `text-[9px] font-black text-amber-200`
- `text-emerald-200`
- `text-right`
- `text-rose-200`
- `text-slate-400`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`font-mono text-lg ${good ? "text-emerald-200" : "text-rose-200"}\``
- `\`grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-3 ${good ? "border-emerald-200/16 bg-emerald-400/[0.07]" : "border-rose-200/16 bg-rose-400/[0.07]"}\``

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

Not found

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
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

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Warning, Success.
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

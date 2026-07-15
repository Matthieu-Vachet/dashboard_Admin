---
id: MWI-COMP-134
component: "GenerationFilterBar"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 146-194
figma_priority: 34
evidence: static_code
---

# GenerationFilterBar

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-134`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:146.
- File range: lines 146–194.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Filter, Layers | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Filter`, `Layers`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-294 | [GenerationFilterBar](../components/components-pokemon-admin-admin-ui-generationfilterbar.md) (MWI-COMP-294) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div>
    - <span>
      - <Filter />
    - <button>
  - <div>
    - <button>
      - <div />
      - <img />
      - <Layers />
      - <span>
      - <strong>

Unique HTML/React tags: `button`, `div`, `Filter`, `img`, `Layers`, `section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onChange | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ value, onChange }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Active, Inactive, Hidden.
- Text properties: `onChange`, `value`.
- Instance swaps: `Filter`, `Layers`.
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
| Warning | Not found | Not found |
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
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
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.2)`, `rgba(0,0,0,.35)`, `rgba(34,211,238,.16)`, `rgba(34,211,238,.22)` |
| Spacing | `bottom-1`, `bottom-3`, `gap-2`, `inset-0`, `mb-3`, `mt-1`, `p-3`, `px-3`, `py-2`, `right-1`, `right-3` |
| Sizing | `h-14`, `max-w-[68%]`, `min-h-[74px]` |
| Typography | `font-black`, `text-[10px]`, `text-cyan-100`, `text-cyan-100/60`, `text-cyan-100/75`, `text-left`, `text-slate-400`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.14em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-cyan-200/50`, `border-white/10`, `hover:border-cyan-200/45` |
| Shadows/elevation | `drop-shadow-[0_10px_24px_rgba(0,0,0,.35)]`, `shadow-[0_14px_45px_rgba(34,211,238,.16)]`, `shadow-[0_18px_70px_rgba(0,0,0,.2)]` |
| Opacity | `group-hover:opacity-100`, `opacity-0`, `opacity-100`, `opacity-45` |
| Background | `bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.22),transparent_38%)]`, `bg-cyan-400/15`, `bg-slate-950/30`, `bg-white/[0.045]` |
| Animation | `duration-300`, `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:grid-cols-11` | 2xl | static occurrence |
| `absolute` | base | conditional or expression-derived |
| `bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.22),transparent_38%)]` | base | static occurrence |
| `bg-cyan-400/15` | base | conditional or expression-derived |
| `bg-slate-950/30` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/50` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `bottom-1` | base | conditional or expression-derived |
| `bottom-3` | base | static occurrence |
| `drop-shadow-[0_10px_24px_rgba(0,0,0,.35)]` | base | conditional or expression-derived |
| `duration-300` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `group-hover:opacity-100` | group-hover | conditional or expression-derived |
| `group-hover:scale-105` | group-hover | conditional or expression-derived |
| `h-14` | base | conditional or expression-derived |
| `hover:-translate-y-0.5` | hover | conditional or expression-derived |
| `hover:border-cyan-200/45` | hover | conditional or expression-derived |
| `hover:underline` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `lg:grid-cols-5` | lg | static occurrence |
| `max-w-[68%]` | base | conditional or expression-derived |
| `mb-3` | base | static occurrence |
| `min-h-[74px]` | base | conditional or expression-derived |
| `mt-1` | base | static occurrence |
| `object-contain` | base | conditional or expression-derived |
| `opacity-0` | base | static occurrence |
| `opacity-100` | base | conditional or expression-derived |
| `opacity-45` | base | conditional or expression-derived |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | conditional or expression-derived |
| `right-1` | base | conditional or expression-derived |
| `right-3` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `saturate-125` | base | conditional or expression-derived |
| `saturate-75` | base | conditional or expression-derived |
| `shadow-[0_14px_45px_rgba(34,211,238,.16)]` | base | conditional or expression-derived |
| `shadow-[0_18px_70px_rgba(0,0,0,.2)]` | base | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/60` | base | static occurrence |
| `text-cyan-100/75` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `underline-offset-4` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `absolute bottom-1 right-1 h-14 max-w-[68%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)] transition duration-300 group-hover:scale-105 group-hover:opacity-100`
- `absolute bottom-3 right-3 text-cyan-100/60`
- `absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.22),transparent_38%)] opacity-0 transition group-hover:opacity-100`
- `border-cyan-200/50 bg-cyan-400/15 shadow-[0_14px_45px_rgba(34,211,238,.16)]`
- `border-white/10 bg-white/[0.045]`
- `grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-11`
- `group relative min-h-[74px] overflow-hidden rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/45`
- `inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100/75`
- `mb-3 flex flex-wrap items-center justify-between gap-2`
- `opacity-100 saturate-125`
- `opacity-45 saturate-75`
- `relative block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400`
- `relative mt-1 block text-sm font-black text-white`
- `rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_18px_70px_rgba(0,0,0,.2)]`
- `text-xs font-black text-cyan-100 underline-offset-4 hover:underline`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`absolute bottom-1 right-1 h-14 max-w-[68%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 ${ active ? "opacity-100 saturate-125" : "opacity-45 saturate-75" }\``
- `\`group relative min-h-[74px] overflow-hidden rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/45 ${ active ? "border-cyan-200/50 bg-cyan-400/15 shadow-[0_14px_45px_rgba(34,211,238,.16)]" : "border-white/10 bg-white/[0.045]" }\``

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

`group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `sm`.
- Responsive utilities: `2xl:grid-cols-11`, `lg:grid-cols-5`, `sm:grid-cols-3`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-300`, `hover:-translate-y-0.5`, `transition`.
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

- Lucide icons: `Filter`, `Layers`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Active, Inactive, Hidden.
- Instance swaps: `Filter`, `Layers`.
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
| — | Warning | Not found |
| — | Success | Not found |
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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

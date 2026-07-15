---
id: MWI-COMP-187
component: "MaxBattleCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/max-battles-panel.jsx"
lines: 45-101
figma_priority: 18
evidence: static_code
---

# MaxBattleCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/max-battles-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-187`.
- Location: `Dashboard Admin/src/components/admin/pokemon/max-battles-panel.jsx`:45.
- File range: lines 45–101.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Sparkles, Zap | icons |
| ./asset-icons | TypeIcons | internal |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |
| MWI-COMP-186 | [MaxPill](../components/components-admin-pokemon-max-battles-panel-maxpill.md) (MWI-COMP-186) | JSX/import relation |

Unresolved/external JSX tags: `Sparkles`, `Zap`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-188 | [MaxBattleSection](../components/components-admin-pokemon-max-battles-panel-maxbattlesection.md) (MWI-COMP-188) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <button>
  - <div>
    - <div />
    - <span>
      - <Zap />
    - <span>
      - <Sparkles />
    - <span>
    - <img />
  - <div>
    - <div>
      - <h3>
      - <p>
      - <p>
    - <div>
      - <TypeIcons />
      - <MaxPill>
      - <MaxPill>
      - <MaxPill>
      - <MaxPill>
    - <p>
      - <small>

Unique HTML/React tags: `button`, `div`, `h3`, `img`, `MaxPill`, `p`, `small`, `span`, `Sparkles`, `TypeIcons`, `Zap`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onOpenPokemon | Not found | See exact signature/contract below |
| pokemon | Not found | See exact signature/contract below |
| typeCatalog | typeCatalog = [] | See exact signature/contract below |

Exact parameter signature:

```tsx
{ pokemon, onOpenPokemon, typeCatalog = [] }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Disabled, Warning, Success.
- Text properties: `onOpenPokemon`, `pokemon`, `typeCatalog`.
- Instance swaps: `Sparkles`, `Zap`.
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: `disabled:cursor-default`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.2)`, `rgba(0,0,0,.38)`, `rgba(14,165,233,.2)`, `rgba(15,23,42,.9)`, `rgba(255,255,255,.1)`, `rgba(255,255,255,.12)`, `rgba(30,64,175,.58)` |
| Spacing | `bottom-3`, `gap-1`, `gap-1.5`, `inset-0`, `left-3`, `mt-1`, `p-3`, `p-4`, `px-2.5`, `py-1`, `right-3`, `space-y-3`, `top-3` |
| Sizing | `max-h-28`, `min-h-[152px]`, `min-w-0` |
| Typography | `font-black`, `font-bold`, `text-[10px]`, `text-[11px]`, `text-amber-50`, `text-cyan-100/65`, `text-left`, `text-lg`, `text-red-50`, `text-sky-50`, `text-slate-200`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.12em]`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-100/25`, `border-red-200/30`, `border-sky-100/25`, `border-t`, `border-white/10`, `hover:border-cyan-200/35` |
| Shadows/elevation | `drop-shadow-[0_18px_34px_rgba(0,0,0,.38)]`, `shadow-[0_18px_70px_rgba(0,0,0,.2)]` |
| Opacity | `opacity-20` |
| Background | `bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.9),rgba(30,64,175,.58))]`, `bg-amber-300/18`, `bg-red-400/16`, `bg-sky-300/16`, `bg-slate-950/38`, `bg-white/[0.055]` |
| Animation | `duration-300`, `hover:-translate-y-0.5`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:24px_24px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.9),rgba(30,64,175,.58))]` | base | static occurrence |
| `bg-amber-300/18` | base | static occurrence |
| `bg-red-400/16` | base | static occurrence |
| `bg-sky-300/16` | base | static occurrence |
| `bg-slate-950/38` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-100/25` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-sky-100/25` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `bottom-3` | base | static occurrence |
| `disabled:cursor-default` | disabled | static occurrence |
| `drop-shadow-[0_18px_34px_rgba(0,0,0,.38)]` | base | static occurrence |
| `duration-300` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `grid` | base | static occurrence |
| `group-hover:scale-105` | group-hover | static occurrence |
| `hover:-translate-y-0.5` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `left-3` | base | static occurrence |
| `max-h-28` | base | static occurrence |
| `min-h-[152px]` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-20` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | static occurrence |
| `right-3` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_18px_70px_rgba(0,0,0,.2)]` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100/65` | base | static occurrence |
| `text-left` | base | static occurrence |
| `text-lg` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `top-3` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `absolute bottom-3 right-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50`
- `absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]`
- `absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-sky-100/25 bg-sky-300/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-50`
- `absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50`
- `block text-[10px] uppercase tracking-[0.16em] text-slate-500`
- `flex flex-wrap gap-1.5`
- `group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 text-left shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35 disabled:cursor-default`
- `min-w-0`
- `mt-1 truncate text-[11px] font-bold text-cyan-100/65`
- `relative grid min-h-[152px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.9),rgba(30,64,175,.58))] p-4`
- `relative z-10 max-h-28 object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,.38)] transition duration-300 group-hover:scale-105`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-sm font-black text-slate-200`
- `space-y-3 border-t border-white/10 p-4`
- `truncate text-lg font-black text-white`
- `truncate text-xs font-bold text-slate-400`

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

`disabled:`, `group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
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

- Lucide icons: `Sparkles`, `Zap`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Disabled, Warning, Success.
- Instance swaps: `Sparkles`, `Zap`.
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

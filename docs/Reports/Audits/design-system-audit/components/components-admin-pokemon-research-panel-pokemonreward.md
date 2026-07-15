---
id: MWI-COMP-213
component: "PokemonReward"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/research-panel.jsx"
lines: 148-182
figma_priority: 18
evidence: static_code
---

# PokemonReward

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/research-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-213`.
- Location: `Dashboard Admin/src/components/admin/pokemon/research-panel.jsx`:148.
- File range: lines 148–182.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Sparkles | icons |
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-211 | [TypeIcons](../components/components-admin-pokemon-research-panel-typeicons.md) (MWI-COMP-211) | JSX/import relation |
| MWI-COMP-212 | [Badge](../components/components-admin-pokemon-research-panel-badge.md) (MWI-COMP-212) | JSX/import relation |

Unresolved/external JSX tags: `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-215 | [RewardCard](../components/components-admin-pokemon-research-panel-rewardcard.md) (MWI-COMP-215) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <span>
    - <img />
  - <span>
    - <span>
      - <strong>
      - <Badge>
        - <Sparkles />
    - <span>
    - <span>
      - <TypeIcons />
      - <Badge>
      - <Badge>
      - <Badge>

Unique HTML/React tags: `article`, `Badge`, `img`, `span`, `Sparkles`, `strong`, `TypeIcons`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| reward | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ reward }
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
- Text properties: `reward`.
- Instance swaps: `Sparkles`.
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
| Literal colors | `rgba(0,0,0,.36)` |
| Spacing | `gap-2`, `gap-3`, `p-2`, `p-3`, `space-y-2` |
| Sizing | `h-[72px]`, `max-h-full`, `min-w-0`, `w-[72px]` |
| Typography | `font-black`, `font-bold`, `text-[11px]`, `text-cyan-100/65`, `text-sm`, `text-white` |
| Radius | `rounded-2xl` |
| Borders/strokes | `border`, `border-cyan-200/14`, `border-white/10` |
| Shadows/elevation | `drop-shadow-[0_12px_24px_rgba(0,0,0,.36)]` |
| Opacity | Not found |
| Background | `bg-cyan-400/8`, `bg-slate-950/38` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-cyan-400/8` | base | static occurrence |
| `bg-slate-950/38` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-cyan-200/14` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `drop-shadow-[0_12px_24px_rgba(0,0,0,.36)]` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-[72px_minmax(0,1fr)]` | base | static occurrence |
| `h-[72px]` | base | static occurrence |
| `items-center` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `space-y-2` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-cyan-100/65` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-[72px]` | base | static occurrence |

Exact className combinations:

- `block truncate text-[11px] font-bold text-cyan-100/65`
- `flex flex-wrap items-center gap-2`
- `flex min-w-0 flex-wrap items-center gap-2`
- `grid h-[72px] w-[72px] place-items-center rounded-2xl border border-white/10 bg-slate-950/38 p-2`
- `grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border border-cyan-200/14 bg-cyan-400/8 p-3`
- `max-h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,.36)]`
- `min-w-0 space-y-2`
- `truncate text-sm font-black text-white`

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

- Lucide icons: `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Warning, Success.
- Instance swaps: `Sparkles`.
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

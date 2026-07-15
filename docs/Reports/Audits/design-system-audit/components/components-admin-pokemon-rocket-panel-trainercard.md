---
id: MWI-COMP-223
component: "TrainerCard"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/rocket-panel.jsx"
lines: 266-342
figma_priority: 18
evidence: static_code
---

# TrainerCard

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/rocket-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-223`.
- Location: `Dashboard Admin/src/components/admin/pokemon/rocket-panel.jsx`:266.
- File range: lines 266–342.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useState | external package |
| lucide-react | ChevronDown | icons |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-219 | [TypeIcons](../components/components-admin-pokemon-rocket-panel-typeicons.md) (MWI-COMP-219) | JSX/import relation |
| MWI-COMP-221 | [PokemonCard](../components/components-admin-pokemon-rocket-panel-pokemoncard.md) (MWI-COMP-221) | JSX/import relation |
| MWI-COMP-222 | [SlotBlock](../components/components-admin-pokemon-rocket-panel-slotblock.md) (MWI-COMP-222) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-224 | [RocketPanel](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) (MWI-COMP-224) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <details>
  - <summary>
    - <div />
    - <span>
      - <span>
        - <img />
      - <span>
        - <span>
        - <span>
        - <span>
        - <span>
    - <span>
      - <TypeIcons />
      - <span>
      - <ChevronDown />
  - <div>
    - <div>
      - <SlotBlock />
      - <SlotBlock />
      - <SlotBlock />
    - <section>
      - <div>
        - <h4>
        - <span>
      - <div>
        - <PokemonCard />

Unique HTML/React tags: `ChevronDown`, `details`, `div`, `h4`, `img`, `PokemonCard`, `section`, `SlotBlock`, `span`, `summary`, `TypeIcons`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `open = Boolean(defaultOpen`.
- Event handlers exposed in JSX: `onOpenPokemon`, `onToggle`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| defaultOpen | defaultOpen = false | See exact signature/contract below |
| group | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| profile | Not found | See exact signature/contract below |
| rocketText | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ profile, group, rocketText, onOpenPokemon, defaultOpen = false }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Success, Expanded, Hidden.
- Text properties: `defaultOpen`, `group`, `onOpenPokemon`, `profile`, `rocketText`.
- Instance swaps: `ChevronDown`.
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
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, place-items-end, sm:items-center, sm:justify-end`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)`, `rgba(0,0,0,.4)`, `rgba(15,23,42,.78)`, `rgba(255,255,255,.12)`, `rgba(255,255,255,.16)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mb-3`, `mt-1`, `p-1`, `p-3`, `p-4`, `px-2`, `px-3`, `py-1`, `py-1.5`, `sm:p-5`, `space-y-4` |
| Sizing | `h-24`, `max-h-full`, `min-w-0`, `w-20`, `w-24` |
| Typography | `font-black`, `font-bold`, `sm:text-2xl`, `text-[10px]`, `text-emerald-100/75`, `text-emerald-50`, `text-red-50`, `text-sm`, `text-white`, `text-white/45`, `text-white/62`, `text-white/70`, `text-white/78`, `text-xl`, `text-xs`, `tracking-[0.14em]`, `tracking-[0.18em]`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-emerald-200/18`, `border-red-200/25`, `border-white/18` |
| Shadows/elevation | `drop-shadow-[0_16px_28px_rgba(0,0,0,.4)]`, `shadow-[0_20px_80px_rgba(0,0,0,.24)]` |
| Opacity | `opacity-[0.18]` |
| Background | `bg-emerald-300/14`, `bg-emerald-400/8`, `bg-red-400/16`, `bg-slate-950/34`, `bg-slate-950/35` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:24px_24px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `bg-emerald-300/14` | base | static occurrence |
| `bg-emerald-400/8` | base | static occurrence |
| `bg-red-400/16` | base | static occurrence |
| `bg-slate-950/34` | base | static occurrence |
| `bg-slate-950/35` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-emerald-200/18` | base | static occurrence |
| `border-red-200/25` | base | static occurrence |
| `border-white/18` | base | conditional or expression-derived |
| `cursor-pointer` | base | static occurrence |
| `drop-shadow-[0_16px_28px_rgba(0,0,0,.4)]` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `group-open:rotate-180` | group-open | static occurrence |
| `h-24` | base | conditional or expression-derived |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `line-clamp-1` | base | static occurrence |
| `line-clamp-2` | base | static occurrence |
| `list-none` | base | static occurrence |
| `marker:hidden` | marker | static occurrence |
| `max-h-full` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-[0.18]` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-1` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-end` | base | conditional or expression-derived |
| `px-2` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `shadow-[0_20px_80px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shrink-0` | base | conditional or expression-derived |
| `sm:grid-cols-[minmax(0,1fr)_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-end` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-2xl` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-emerald-100/75` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-red-50` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-white/45` | base | static occurrence |
| `text-white/62` | base | static occurrence |
| `text-white/70` | base | static occurrence |
| `text-white/78` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-20` | base | conditional or expression-derived |
| `w-24` | base | conditional or expression-derived |
| `xl:grid-cols-3` | xl | static occurrence |

Exact className combinations:

- `absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:24px_24px]`
- `block truncate text-xl font-black text-white sm:text-2xl`
- `grid gap-3 md:grid-cols-2 xl:grid-cols-3`
- `grid gap-4`
- `grid shrink-0 place-items-end overflow-hidden rounded-3xl border border-white/18 bg-slate-950/35 p-1`
- `group min-w-0 overflow-hidden rounded-3xl border bg-slate-950/34 shadow-[0_20px_80px_rgba(0,0,0,.24)]`
- `h-24 w-20`
- `h-24 w-24`
- `max-h-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.4)]`
- `mb-3 flex items-center justify-between gap-2`
- `min-w-0`
- `mt-1 block line-clamp-1 text-xs font-bold text-white/45`
- `mt-1 line-clamp-2 text-sm font-bold text-white/78`
- `relative flex flex-wrap items-center gap-2 sm:justify-end`
- `relative flex min-w-0 items-center gap-4`
- `relative grid cursor-pointer list-none gap-4 overflow-hidden p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5`
- `rounded-2xl border border-emerald-200/18 bg-emerald-400/8 p-3`
- `rounded-full bg-emerald-300/14 px-2 py-1 text-[10px] font-black text-emerald-50`
- `rounded-full border border-red-200/25 bg-red-400/16 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-red-50`
- `space-y-4 p-4 sm:p-5`
- `text-[10px] font-black uppercase tracking-[0.22em] text-white/62`
- `text-white/70 transition group-open:rotate-180`
- `text-xs font-black uppercase tracking-[0.18em] text-emerald-100/75`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${isGrunt ? "h-24 w-20" : "h-24 w-24"} grid shrink-0 place-items-end overflow-hidden rounded-3xl border border-white/18 bg-slate-950/35 p-1\``

### CSS variables

Not found

### Inline style expressions

- `{{ background: \`linear-gradient(135deg, ${alpha(accent, isGrunt ? 0.28 : 0.36)}, rgba(15,23,42,.78))\`, }}`
- `{{ borderColor: alpha(accent, 0.42), boxShadow: \`0 20px 90px ${alpha(accent, 0.14)}\`, }}`

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `md`, `sm`, `xl`.
- Responsive utilities: `md:grid-cols-2`, `sm:grid-cols-[minmax(0,1fr)_auto]`, `sm:items-center`, `sm:justify-end`, `sm:p-5`, `sm:text-2xl`, `xl:grid-cols-3`.
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

- Lucide icons: `ChevronDown`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Success, Expanded, Hidden.
- Instance swaps: `ChevronDown`.
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
| — | Warning | Not found |
| □ | Success | success/green signal |
| — | Empty | Not found |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: md | Tailwind md: utilities |
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

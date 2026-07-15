---
id: MWI-COMP-166
component: "ReleaseStatusGrid"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 443-489
figma_priority: 18
evidence: static_code
---

# ReleaseStatusGrid

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-166`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:443.
- File range: lines 443–489.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| @/components/site/ui-assets | uiAssets | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-156 | [Section](../components/components-admin-pokemon-detail-modal-section.md) (MWI-COMP-156) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Section>
  - <div>
    - <article>
      - <div>
        - <span>
          - <img />
        - <span>
          - <strong>
          - <span>
      - <div>
        - <span>
          - <small>
          - <strong>
        - <span>
          - <small>
          - <strong>

Unique HTML/React tags: `article`, `div`, `img`, `Section`, `small`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| shadowShinyAvailability | Not found | See exact signature/contract below |
| shinyAvailability | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ shinyAvailability, shadowShinyAvailability }
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
- Text properties: `shadowShinyAvailability`, `shinyAvailability`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-start, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow` |
| Literal colors | `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.89)`, `rgba(2,6,23,.93)`, `rgba(248,250,252,.82)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.9)` |
| Spacing | `gap-2`, `gap-3`, `mt-1`, `mt-4`, `p-2`, `p-4`, `px-3`, `py-2` |
| Sizing | `h-10`, `max-h-full`, `min-w-0`, `w-10` |
| Typography | `break-words`, `font-black`, `font-bold`, `text-[10px]`, `text-emerald-100`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-200/20`, `border-cyan-200/20`, `border-emerald-200/20`, `border-emerald-300/25`, `border-rose-200/20`, `border-violet-200/20`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-amber-400/10`, `bg-cyan-400/10`, `bg-emerald-400/10`, `bg-rose-400/10`, `bg-slate-950/35`, `bg-slate-950/40`, `bg-violet-400/10`, `bg-white/[0.045]`, `from-amber-400/15`, `from-cyan-400/15`, `from-emerald-400/15`, `from-rose-400/15`, `from-violet-400/15` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-400/10` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-emerald-400/10` | base | conditional or expression-derived |
| `bg-rose-400/10` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `block` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-amber-200/20` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-300/25` | base | conditional or expression-derived |
| `border-rose-200/20` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `break-words` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | conditional or expression-derived |
| `from-amber-400/15` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `items-start` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `max-h-full` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | conditional or expression-derived |
| `mt-4` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pokemon-interface-icon` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-emerald-100` | base | conditional or expression-derived |
| `text-slate-400` | base | conditional or expression-derived |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-white` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `block font-black text-white`
- `block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-emerald-300/25 bg-emerald-400/10`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `border-white/10 bg-white/[0.045]`
- `flex items-start gap-3`
- `grid gap-3 lg:grid-cols-2`
- `grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/40 p-2`
- `min-w-0`
- `mt-1 block break-words text-white`
- `mt-1 block text-sm font-bold text-emerald-100`
- `mt-1 block text-sm font-bold text-slate-400`
- `mt-1 block text-white`
- `mt-4 grid gap-2 sm:grid-cols-2`
- `pokemon-interface-icon max-h-full object-contain`
- `rounded-2xl border p-4`
- `rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`rounded-2xl border p-4 ${ released ? "border-emerald-300/25 bg-emerald-400/10" : "border-white/10 bg-white/[0.045]" }\``
- `released ? "mt-1 block text-sm font-bold text-emerald-100" : "mt-1 block text-sm font-bold text-slate-400"`

### CSS variables

`--accent-glow`

### Inline style expressions

Not found

### Referenced local/imported style declarations

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

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-2`, `sm:grid-cols-2`.
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

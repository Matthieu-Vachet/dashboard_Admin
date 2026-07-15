---
id: MWI-COMP-204
component: "PvpDetail"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/pvp-rankings-panel.jsx"
lines: 84-109
figma_priority: 18
evidence: static_code
---

# PvpDetail

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/pvp-rankings-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-204`.
- Location: `Dashboard Admin/src/components/admin/pokemon/pvp-rankings-panel.jsx`:84.
- File range: lines 84–109.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ExternalLink | icons |
| @/components/site/pokemon-style | typeLabels | internal |
| ./asset-icons | TypeIcons | internal |
| ./admin-ui | buttonClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-140 | [TypeIcons](../components/components-admin-pokemon-asset-icons-typeicons.md) (MWI-COMP-140) | JSX/import relation |
| MWI-COMP-201 | [MoveBadge](../components/components-admin-pokemon-pvp-rankings-panel-movebadge.md) (MWI-COMP-201) | JSX/import relation |
| MWI-COMP-202 | [MatchupCard](../components/components-admin-pokemon-pvp-rankings-panel-matchupcard.md) (MWI-COMP-202) | JSX/import relation |
| MWI-COMP-203 | [PerformanceBars](../components/components-admin-pokemon-pvp-rankings-panel-performancebars.md) (MWI-COMP-203) | JSX/import relation |

Unresolved/external JSX tags: `ExternalLink`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-206 | [PvpRankingsPanel](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) (MWI-COMP-206) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <section>
      - <h3>
      - <div>
        - <MatchupCard />
    - <section>
      - <h3>
      - <div>
        - <MatchupCard />
  - <div>
    - <PerformanceBars />
    - <section>
      - <h3>
      - <dl>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
        - <div>
          - <dt>
          - <dd>
  - <section>
    - <div>
      - <h3>
      - <span>
    - <p>
  - <div>
    - <section>
      - <h3>
      - <div>
        - <MoveBadge />
        - <p>
    - <section>
      - <h3>
      - <div>
        - <MoveBadge />
        - <p>
  - <section>
    - <div>
      - <h3>
      - <div>
        - <TypeIcons />
        - <span>
    - <div>
      - <h3>
      - <p>
      - <p>
  - <div>
    - <section>
      - <h3>
      - <div>
        - <span>
          - <TypeIcons />
    - <section>
      - <h3>
      - <div>
        - <span>
          - <TypeIcons />
  - <section>
    - <div>
      - <h3>
      - <p>
    - <div>
      - <h3>
      - <p>
  - <div>
    - <button>
      - <ExternalLink />
    - <span>

Unique HTML/React tags: `button`, `dd`, `div`, `dl`, `dt`, `ExternalLink`, `h3`, `MatchupCard`, `MoveBadge`, `p`, `PerformanceBars`, `section`, `span`, `TypeIcons`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| entry | Not found | See exact signature/contract below |
| format | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| references | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ entry, references, format, onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Warning, Empty.
- Text properties: `entry`, `format`, `onOpenPokemon`, `references`.
- Instance swaps: `ExternalLink`.
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
| Empty | Detected | empty collection branch |
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-4`, `mb-3`, `mt-1`, `mt-2`, `mt-3`, `mt-4`, `p-3`, `p-4`, `px-2`, `px-3`, `px-4`, `py-0.5`, `py-1`, `py-2`, `sm:p-5`, `space-y-2`, `space-y-4` |
| Sizing | `min-h-11` |
| Typography | `font-black`, `font-bold`, `font-mono`, `font-semibold`, `leading-6`, `text-[9px]`, `text-amber-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-violet-100`, `text-violet-50`, `text-white`, `text-xs`, `whitespace-pre-line` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-dashed`, `border-t`, `border-violet-200/20`, `border-white/10`, `border-white/12`, `hover:border-cyan-200/50` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-violet-300/[0.07]`, `bg-violet-300/14`, `bg-white/[0.035]`, `bg-white/[0.04]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-cyan-400/15` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-violet-300/[0.07]` | base | static occurrence |
| `bg-violet-300/14` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/12` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-0.5` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-[9px]` | base | static occurrence |
| `text-amber-200` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `transition` | base | static occurrence |
| `whitespace-pre-line` | base | static occurrence |
| `xl:grid-cols-2` | xl | static occurrence |

Exact className combinations:

- `flex flex-wrap gap-2`
- `flex flex-wrap items-center gap-2`
- `font-black`
- `font-black text-violet-50`
- `font-black text-white`
- `font-mono font-black`
- `grid gap-3 sm:grid-cols-2`
- `grid gap-4 xl:grid-cols-2`
- `inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-black`
- `inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-400`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `mb-3 font-black text-white`
- `mt-1 text-sm font-bold text-slate-300`
- `mt-2 text-sm font-bold text-slate-400`
- `mt-3 flex flex-wrap gap-2`
- `mt-3 flex flex-wrap items-center gap-2`
- `mt-3 space-y-2`
- `mt-3 text-sm font-bold text-slate-300`
- `mt-3 whitespace-pre-line text-sm font-semibold leading-6 text-slate-300`
- `mt-4 grid grid-cols-2 gap-3 text-sm`
- `rounded-2xl border border-dashed border-white/12 p-4`
- `rounded-2xl border border-violet-200/20 bg-violet-300/[0.07] p-4`
- `rounded-2xl border border-white/10 bg-white/[0.035] p-4`
- `rounded-full border border-violet-200/20 bg-violet-300/14 px-2 py-0.5 text-[9px] font-black text-violet-100`
- `rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm font-black`
- `space-y-2`
- `space-y-4 border-t border-white/10 p-3 sm:p-5`
- `text-slate-500`
- `text-sm font-bold text-amber-200`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `buttonClass`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

```tsx
src/components/site/pokemon-style.js#typeColors
typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `sm:p-5`, `xl:grid-cols-2`.
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

- Lucide icons: `ExternalLink`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Warning, Empty.
- Instance swaps: `ExternalLink`.
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
| □ | Empty | empty collection branch |
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

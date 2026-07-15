---
id: MWI-COMP-316
component: "MetricCard"
category: "Component"
status: exported
source: "src/components/site/metric-card.jsx"
lines: 9-35
figma_priority: 31
evidence: static_code
---

# MetricCard

## 1. Purpose

Component component implemented in src/components/site/metric-card.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-316`.
- Location: `Dashboard Admin/src/components/site/metric-card.jsx`:9.
- File range: lines 9–35.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

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
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <article>
  - <span>
    - <img />
  - <span>
    - <span>
    - <strong>

Unique HTML/React tags: `article`, `img`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| accent | accent = "blue" | See exact signature/contract below |
| icon | Not found | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ label, value, accent = "blue", icon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Not found.
- Text properties: `accent`, `icon`, `label`, `value`.
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
| Warning | Not found | Not found |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow` |
| Literal colors | `rgba(0,0,0,0.22)` |
| Spacing | `gap-3`, `mt-2`, `p-2`, `p-4` |
| Sizing | `h-12`, `max-h-full`, `min-w-0`, `w-12` |
| Typography | `font-black`, `font-bold`, `font-mono`, `leading-none`, `md:text-[2.5rem]`, `text-3xl`, `text-slate-300`, `text-xs`, `tracking-tight`, `tracking-wide`, `uppercase`, `whitespace-nowrap` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | `shadow-[0_18px_60px_rgba(0,0,0,0.22)]` |
| Opacity | Not found |
| Background | `backdrop-blur`, `bg-slate-950/35`, `bg-white/[0.055]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur` | base | conditional or expression-derived |
| `bg-slate-950/35` | base | static occurrence |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `block` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | conditional or expression-derived |
| `gap-3` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[3rem_minmax(0,1fr)]` | base | conditional or expression-derived |
| `h-12` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `leading-none` | base | conditional or expression-derived |
| `max-h-full` | base | static occurrence |
| `md:text-[2.5rem]` | md | conditional or expression-derived |
| `min-w-0` | base | conditional or expression-derived |
| `mt-2` | base | conditional or expression-derived |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `pokemon-interface-icon` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_18px_60px_rgba(0,0,0,0.22)]` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `text-3xl` | base | conditional or expression-derived |
| `text-slate-300` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-tight` | base | conditional or expression-derived |
| `tracking-wide` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-12` | base | static occurrence |
| `whitespace-nowrap` | base | conditional or expression-derived |

Exact className combinations:

- `block truncate text-xs font-bold uppercase tracking-wide text-slate-300`
- `grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-slate-950/35 p-2`
- `grid min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur`
- `grid-cols-[3rem_minmax(0,1fr)]`
- `min-w-0`
- `mt-2 block whitespace-nowrap font-mono text-3xl font-black leading-none tracking-tight md:text-[2.5rem]`
- `pokemon-interface-icon max-h-full object-contain`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur ${ icon ? "grid-cols-[3rem_minmax(0,1fr)]" : "" }\``
- `\`mt-2 block whitespace-nowrap font-mono text-3xl font-black leading-none tracking-tight md:text-[2.5rem] ${ accents[accent] || accents.blue }\``

### CSS variables

`--accent-glow`

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

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

- Breakpoints used: `md`.
- Responsive utilities: `md:text-[2.5rem]`.
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
- Boolean properties: Not found.
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
| — | Warning | Not found |
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
| □ | Responsive: md | Tailwind md: utilities |

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

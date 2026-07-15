---
id: MWI-COMP-173
component: "AssetBadges"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/detail-modal.jsx"
lines: 835-855
figma_priority: 18
evidence: static_code
---

# AssetBadges

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/detail-modal.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-173`.
- Location: `Dashboard Admin/src/components/admin/pokemon/detail-modal.jsx`:835.
- File range: lines 835–855.
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
| MWI-COMP-172 | [AssetGallery](../components/components-admin-pokemon-detail-modal-assetgallery.md) (MWI-COMP-172) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <span>
    - <span aria-hidden="true">
    - <span>

Unique HTML/React tags: `div`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| badges | badges = [] | See exact signature/contract below |
| className | className = "" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ badges = [], className = "" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Empty, Hidden.
- Text properties: `badges`, `className`.
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
| Success | Not found | Not found |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
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
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(255,255,255,.1)` |
| Spacing | `gap-1`, `gap-1.5`, `px-2`, `py-1` |
| Sizing | `max-w-[calc(100%-1rem)]` |
| Typography | `font-black`, `leading-none`, `sm:text-[10px]`, `text-[9px]`, `text-amber-100`, `text-cyan-100`, `text-fuchsia-100`, `text-indigo-100`, `text-orange-100`, `text-red-100`, `text-rose-100`, `text-sky-100`, `text-stone-100`, `text-violet-100`, `text-yellow-100`, `tracking-[0.08em]`, `uppercase` |
| Radius | `rounded-full` |
| Borders/strokes | `border`, `border-amber-300/45`, `border-cyan-200/45`, `border-fuchsia-300/45`, `border-indigo-300/45`, `border-orange-300/45`, `border-red-300/45`, `border-rose-300/45`, `border-sky-300/45`, `border-stone-200/45`, `border-violet-300/45`, `border-yellow-200/45` |
| Shadows/elevation | `shadow-[0_0_18px_rgba(255,255,255,.1)]` |
| Opacity | Not found |
| Background | `bg-amber-500/18`, `bg-cyan-400/18`, `bg-fuchsia-500/18`, `bg-indigo-500/18`, `bg-orange-500/18`, `bg-red-500/18`, `bg-rose-500/18`, `bg-sky-500/18`, `bg-stone-400/18`, `bg-violet-500/18`, `bg-yellow-400/18` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-amber-500/18` | base | static occurrence |
| `bg-cyan-400/18` | base | static occurrence |
| `bg-fuchsia-500/18` | base | static occurrence |
| `bg-indigo-500/18` | base | static occurrence |
| `bg-orange-500/18` | base | static occurrence |
| `bg-red-500/18` | base | static occurrence |
| `bg-rose-500/18` | base | static occurrence |
| `bg-sky-500/18` | base | static occurrence |
| `bg-stone-400/18` | base | static occurrence |
| `bg-violet-500/18` | base | static occurrence |
| `bg-yellow-400/18` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-300/45` | base | static occurrence |
| `border-cyan-200/45` | base | static occurrence |
| `border-fuchsia-300/45` | base | static occurrence |
| `border-indigo-300/45` | base | static occurrence |
| `border-orange-300/45` | base | static occurrence |
| `border-red-300/45` | base | static occurrence |
| `border-rose-300/45` | base | static occurrence |
| `border-sky-300/45` | base | static occurrence |
| `border-stone-200/45` | base | static occurrence |
| `border-violet-300/45` | base | static occurrence |
| `border-yellow-200/45` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-wrap` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `gap-1` | base | conditional or expression-derived |
| `gap-1.5` | base | conditional or expression-derived |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `leading-none` | base | conditional or expression-derived |
| `max-w-[calc(100%-1rem)]` | base | conditional or expression-derived |
| `px-2` | base | conditional or expression-derived |
| `py-1` | base | conditional or expression-derived |
| `rounded-full` | base | conditional or expression-derived |
| `shadow-[0_0_18px_rgba(255,255,255,.1)]` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `sm:text-[10px]` | sm | conditional or expression-derived |
| `text-[9px]` | base | conditional or expression-derived |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-fuchsia-100` | base | static occurrence |
| `text-indigo-100` | base | static occurrence |
| `text-orange-100` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-stone-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-yellow-100` | base | static occurrence |
| `tracking-[0.08em]` | base | conditional or expression-derived |
| `uppercase` | base | conditional or expression-derived |

Exact className combinations:

- `border-amber-300/45 bg-amber-500/18 text-amber-100`
- `border-cyan-200/45 bg-cyan-400/18 text-cyan-100`
- `border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100`
- `border-indigo-300/45 bg-indigo-500/18 text-indigo-100`
- `border-orange-300/45 bg-orange-500/18 text-orange-100`
- `border-red-300/45 bg-red-500/18 text-red-100`
- `border-rose-300/45 bg-rose-500/18 text-rose-100`
- `border-sky-300/45 bg-sky-500/18 text-sky-100`
- `border-stone-200/45 bg-stone-400/18 text-stone-100`
- `border-violet-300/45 bg-violet-500/18 text-violet-100`
- `border-yellow-200/45 bg-yellow-400/18 text-yellow-100`
- `flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5`
- `inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-black uppercase leading-none tracking-[0.08em] shadow-[0_0_18px_rgba(255,255,255,.1)] sm:text-[10px]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5 ${className}\``
- `\`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-black uppercase leading-none tracking-[0.08em] shadow-[0_0_18px_rgba(255,255,255,.1)] sm:text-[10px] ${tone}\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadgeConfig
assetBadgeConfig = {
  female: ["♀", "Femelle", "border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100"],
  male: ["♂", "Mâle", "border-sky-300/45 bg-sky-500/18 text-sky-100"],
  event: ["✦", "Event", "border-amber-300/45 bg-amber-500/18 text-amber-100"],
  mega: ["Μ", "Méga", "border-violet-300/45 bg-violet-500/18 text-violet-100"],
  primal: ["Ω", "Primo", "border-orange-300/45 bg-orange-500/18 text-orange-100"],
  alola: ["A", "Alola", "border-yellow-200/45 bg-yellow-400/18 text-yellow-100"],
  galar: ["G", "Galar", "border-indigo-300/45 bg-indigo-500/18 text-indigo-100"],
  hisui: ["H", "Hisui", "border-stone-200/45 bg-stone-400/18 text-stone-100"],
  paldea: ["P", "Paldea", "border-rose-300/45 bg-rose-500/18 text-rose-100"],
  dynamax: ["D", "Dyna", "border-red-300/45 bg-red-500/18 text-red-100"],
  gigantamax: ["G", "Giga", "border-red-300/45 bg-red-500/18 text-red-100"],
  shiny: ["✦", "Shiny", "border-cyan-200/45 bg-cyan-400/18 text-cyan-100"],
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:text-[10px]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-hidden="true"`.
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
- Boolean properties: Warning, Empty, Hidden.
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
| — | Success | Not found |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
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

---
id: MWI-COMP-138
component: "ControlCardsPanel"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-ui.jsx"
lines: 296-315
figma_priority: 34
evidence: static_code
---

# ControlCardsPanel

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-ui.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-138`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-ui.jsx`:296.
- File range: lines 296–315.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-137 | [MiniCardList](../components/components-admin-pokemon-admin-ui-minicardlist.md) (MWI-COMP-137) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |
| MWI-COMP-293 | [ControlCardsPanel](../components/components-pokemon-admin-admin-ui-controlcardspanel.md) (MWI-COMP-293) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <p>
  - <MiniCardList />

Unique HTML/React tags: `MiniCardList`, `p`, `Panel`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onOpen`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| description | Not found | See exact signature/contract below |
| entries | Not found | See exact signature/contract below |
| onOpen | Not found | See exact signature/contract below |
| title | title = "Fiches à contrôler" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title = "Fiches à contrôler", entries, onOpen, description }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Warning, Active, Inactive.
- Text properties: `description`, `entries`, `onOpen`, `title`.
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
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
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
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Explicit layout behavior beyond the JSX structure: Not found.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(0,0,0,.24)` |
| Spacing | `mb-4`, `p-4`, `px-3`, `py-2`, `sm:p-5` |
| Sizing | Not found |
| Typography | `font-black`, `font-bold`, `leading-6`, `text-amber-100`, `text-amber-50/85`, `text-sm`, `text-xs` |
| Radius | `rounded-2xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/15`, `border-amber-300/25`, `border-white/10` |
| Shadows/elevation | `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/10`, `bg-white/[0.055]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-200/15` | base | static occurrence |
| `border-amber-300/25` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `p-4` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-50/85` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |

Exact className combinations:

- `mb-4 rounded-2xl border border-amber-200/15 bg-amber-400/10 p-4 text-sm font-bold leading-6 text-amber-50/85`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/site/pokemon-style.js#pokemonVariantLabel
export function pokemonVariantLabel(entry = {}) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "event") return "Évènement";
  if (kind === "mega") return "Méga";
  if (kind === "dynamax") return "Dynamax";
  if (kind === "gigantamax") return "Gigamax";
  if (kind === "form" && form !== "normal") return form.charAt(0).toUpperCase() + form.slice(1);
  return "Normal";
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
- Responsive utilities: `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
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

- Lucide icons: Not found.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Active, Inactive.
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
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
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

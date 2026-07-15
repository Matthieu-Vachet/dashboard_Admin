---
id: MWI-COMP-128
component: "SectionIcon"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/admin-section-navigation.jsx"
lines: 15-29
figma_priority: 18
evidence: static_code
---

# SectionIcon

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/admin-section-navigation.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-128`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-section-navigation.jsx`:15.
- File range: lines 15–29.
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

Unresolved/external JSX tags: `Icon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-129 | [AdminSectionNavigation](../components/components-admin-pokemon-admin-section-navigation-adminsectionnavigation.md) (MWI-COMP-129) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <span>
  - <img />
- <span>
  - <Icon aria-hidden="true" />

Unique HTML/React tags: `Icon`, `img`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| active | Not found | See exact signature/contract below |
| icon | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ icon, active }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Active, Inactive, Hidden.
- Text properties: `active`, `icon`.
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(34,211,238,.24)` |
| Spacing | `p-1.5` |
| Sizing | `h-8`, `h-full`, `w-8`, `w-full` |
| Typography | `text-cyan-100`, `text-slate-400` |
| Radius | `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/35`, `border-white/8` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(34,211,238,.24)]` |
| Opacity | Not found |
| Background | `bg-black/20`, `bg-cyan-300/15` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/20` | base | conditional or expression-derived |
| `bg-cyan-300/15` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/35` | base | conditional or expression-derived |
| `border-white/8` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `h-8` | base | conditional or expression-derived |
| `h-full` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-1.5` | base | conditional or expression-derived |
| `place-items-center` | base | conditional or expression-derived |
| `rounded-xl` | base | conditional or expression-derived |
| `shadow-[0_0_22px_rgba(34,211,238,.24)]` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `text-cyan-100` | base | conditional or expression-derived |
| `text-slate-400` | base | conditional or expression-derived |
| `w-8` | base | conditional or expression-derived |
| `w-full` | base | static occurrence |

Exact className combinations:

- `border-cyan-200/35 bg-cyan-300/15 shadow-[0_0_22px_rgba(34,211,238,.24)]`
- `border-cyan-200/35 bg-cyan-300/15 text-cyan-100`
- `border-white/8 bg-black/20`
- `border-white/8 bg-black/20 text-slate-400`
- `grid h-8 w-8 shrink-0 place-items-center rounded-xl border`
- `grid h-8 w-8 shrink-0 place-items-center rounded-xl border p-1.5`
- `h-full w-full object-contain`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid h-8 w-8 shrink-0 place-items-center rounded-xl border ${active ? "border-cyan-200/35 bg-cyan-300/15 text-cyan-100" : "border-white/8 bg-black/20 text-slate-400"}\``
- `\`grid h-8 w-8 shrink-0 place-items-center rounded-xl border p-1.5 ${active ? "border-cyan-200/35 bg-cyan-300/15 shadow-[0_0_22px_rgba(34,211,238,.24)]" : "border-white/8 bg-black/20"}\``

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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Loading, Active, Inactive, Hidden.
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

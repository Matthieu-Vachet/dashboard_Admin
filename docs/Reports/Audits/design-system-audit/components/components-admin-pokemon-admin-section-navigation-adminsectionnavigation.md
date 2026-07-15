---
id: MWI-COMP-129
component: "AdminSectionNavigation"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-section-navigation.jsx"
lines: 31-104
figma_priority: 31
evidence: static_code
---

# AdminSectionNavigation

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-section-navigation.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-129`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-section-navigation.jsx`:31.
- File range: lines 31–104.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | ChevronDown, Search | icons |
| react | useMemo, useState | external package |
| ./admin-ui | fieldClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-128 | [SectionIcon](../components/components-admin-pokemon-admin-section-navigation-sectionicon.md) (MWI-COMP-128) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`, `Search`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-127 | [AdminApp](../components/components-admin-pokemon-admin-app-adminapp.md) (MWI-COMP-127) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <nav aria-label="Sections Admin Pokémon">
  - <label>
    - <Search />
    - <input aria-label="Rechercher une section Admin Pokémon" />
  - <div>
    - <section>
      - <button aria-expanded={isOpen}>
        - <span>
        - <ChevronDown />
      - <div>
        - <button aria-current={selected ? "page" : undefined}>
          - <SectionIcon />
          - <span>
  - <p>

Unique HTML/React tags: `button`, `ChevronDown`, `div`, `input`, `label`, `nav`, `p`, `Search`, `section`, `SectionIcon`, `span`.

## 5. React structure and state management

- Hooks: `useMemo`, `useState`.
- Local state initializers: `openGroups = [activeGroup]`, `query = ""`.
- Event handlers exposed in JSX: `onChange`, `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| active | Not found | See exact signature/contract below |
| items | Not found | See exact signature/contract below |
| onSelect | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ items, active, onSelect }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Empty, Expanded, Active, Inactive.
- Text properties: `active`, `items`, `onSelect`.
- Instance swaps: `ChevronDown`, `Search`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Not found | Not found |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1`, `gap-2`, `left-4`, `mb-3`, `mt-4`, `p-1.5`, `p-3`, `p-4`, `pl-11`, `px-2.5`, `px-3`, `px-4`, `py-2`, `top-1/2` |
| Sizing | `min-h-10`, `min-h-11`, `min-h-12`, `min-w-0`, `w-full` |
| Typography | `font-black`, `font-bold`, `hover:text-white`, `placeholder:text-slate-500`, `text-center`, `text-left`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.12em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/25`, `border-cyan-200/40`, `border-t`, `border-transparent`, `border-white/10`, `border-white/8`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-white/10`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-cyan-300/15`, `bg-cyan-400/[0.07]`, `bg-slate-950/38`, `bg-slate-950/45`, `bg-white/[0.035]`, `hover:bg-white/[0.06]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-translate-y-1/2` | base | static occurrence |
| `2xl:grid-cols-5` | 2xl | static occurrence |
| `absolute` | base | static occurrence |
| `bg-cyan-300/15` | base | conditional or expression-derived |
| `bg-cyan-400/[0.07]` | base | conditional or expression-derived |
| `bg-slate-950/38` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.035]` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/25` | base | conditional or expression-derived |
| `border-cyan-200/40` | base | conditional or expression-derived |
| `border-t` | base | conditional or expression-derived |
| `border-transparent` | base | conditional or expression-derived |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/8` | base | conditional or expression-derived |
| `flex` | base | conditional or expression-derived |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `grid` | base | static occurrence |
| `hover:bg-white/[0.06]` | hover | conditional or expression-derived |
| `hover:border-white/10` | hover | conditional or expression-derived |
| `hover:text-white` | hover | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | static occurrence |
| `left-4` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `mb-3` | base | static occurrence |
| `min-h-10` | base | conditional or expression-derived |
| `min-h-11` | base | conditional or expression-derived |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | conditional or expression-derived |
| `mt-4` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-1.5` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pl-11` | base | conditional or expression-derived |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-2.5` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | static occurrence |
| `rotate-180` | base | conditional or expression-derived |
| `rounded-2xl` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `text-center` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | conditional or expression-derived |
| `text-xs` | base | conditional or expression-derived |
| `top-1/2` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-full` | base | static occurrence |

Exact className combinations:

- `border-cyan-200/25 bg-cyan-400/[0.07]`
- `border-cyan-200/40 bg-cyan-300/15 text-white`
- `border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white`
- `border-white/8 bg-white/[0.035]`
- `flex min-h-11 min-w-0 items-center gap-2 rounded-xl border px-2.5 text-left text-xs font-black transition`
- `flex min-h-11 w-full items-center justify-between gap-2 px-3 text-left text-xs font-black uppercase tracking-[0.12em] text-slate-200`
- `grid gap-1 border-t border-white/8 p-1.5`
- `grid gap-2 lg:grid-cols-2 2xl:grid-cols-5`
- `min-h-10 py-2 pl-11`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0 truncate`
- `mt-4 rounded-2xl border border-white/10 bg-slate-950/38 p-3`
- `overflow-hidden rounded-xl border`
- `p-4 text-center text-sm font-bold text-slate-400`
- `pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500`
- `relative mb-3 block`
- `rotate-180`
- `shrink-0 transition`
- `truncate`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} min-h-10 py-2 pl-11\``
- `\`flex min-h-11 min-w-0 items-center gap-2 rounded-xl border px-2.5 text-left text-xs font-black transition ${selected ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"}\``
- `\`overflow-hidden rounded-xl border ${containsActive ? "border-cyan-200/25 bg-cyan-400/[0.07]" : "border-white/8 bg-white/[0.035]"}\``
- `\`shrink-0 transition ${isOpen ? "rotate-180" : ""}\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`.
- Responsive utilities: `2xl:grid-cols-5`, `lg:grid-cols-2`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-current={selected ? "page" : undefined}`, `aria-expanded={isOpen}`, `aria-label="Rechercher une section Admin Pokémon"`, `aria-label="Sections Admin Pokémon"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ChevronDown`, `Search`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Empty, Expanded, Active, Inactive.
- Instance swaps: `ChevronDown`, `Search`.
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
| □ | Focused | focus styling or handler |
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| — | Success | Not found |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |

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

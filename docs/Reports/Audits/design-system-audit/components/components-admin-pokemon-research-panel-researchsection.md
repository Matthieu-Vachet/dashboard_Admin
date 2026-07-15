---
id: MWI-COMP-217
component: "ResearchSection"
category: "Pokémon internal"
status: internal
source: "src/components/admin/pokemon/research-panel.jsx"
lines: 249-278
figma_priority: 18
evidence: static_code
---

# ResearchSection

## 1. Purpose

Pokémon internal component implemented in src/components/admin/pokemon/research-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-217`.
- Location: `Dashboard Admin/src/components/admin/pokemon/research-panel.jsx`:249.
- File range: lines 249–278.
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
| MWI-COMP-216 | [ResearchTask](../components/components-admin-pokemon-research-panel-researchtask.md) (MWI-COMP-216) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <details>
  - <summary>
    - <span>
      - <span>
      - <span>
    - <span>
      - <span>
      - <ChevronDown />
  - <div>
    - <ResearchTask />
    - <p>

Unique HTML/React tags: `ChevronDown`, `details`, `div`, `p`, `ResearchTask`, `span`, `summary`.

## 5. React structure and state management

- Hooks: `useState`.
- Local state initializers: `open = Boolean(defaultOpen`.
- Event handlers exposed in JSX: `onToggle`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| defaultOpen | Not found | See exact signature/contract below |
| id | Not found | See exact signature/contract below |
| items | Not found | See exact signature/contract below |
| tasks | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ id, title, tasks, items, defaultOpen }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Success, Empty, Expanded, Hidden.
- Text properties: `defaultOpen`, `id`, `items`, `tasks`, `title`.
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
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
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

- CSS Grid layout is present.
- Alignment utilities: `items-center, sm:items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(103,232,249,.16)`, `rgba(110,231,183,.15)`, `rgba(167,139,250,.1)`, `rgba(196,181,253,.15)`, `rgba(251,146,60,.1)`, `rgba(253,186,116,.16)`, `rgba(34,211,238,.1)`, `rgba(52,211,153,.1)` |
| Spacing | `gap-3`, `mt-1`, `p-3`, `p-4`, `px-3`, `py-1.5`, `sm:p-4` |
| Sizing | Not found |
| Typography | `font-black`, `font-bold`, `text-[10px]`, `text-2xl`, `text-cyan-100/62`, `text-cyan-50`, `text-emerald-50`, `text-orange-50`, `text-slate-400`, `text-sm`, `text-violet-50`, `text-white`, `tracking-[0.22em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-cyan-200/24`, `border-cyan-200/30`, `border-dashed`, `border-emerald-200/24`, `border-emerald-200/30`, `border-orange-200/28`, `border-orange-200/32`, `border-t`, `border-violet-200/26`, `border-violet-200/30`, `border-white/10`, `border-white/12`, `border-white/15` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(167,139,250,.1)]`, `shadow-[0_0_22px_rgba(251,146,60,.1)]`, `shadow-[0_0_22px_rgba(34,211,238,.1)]`, `shadow-[0_0_22px_rgba(52,211,153,.1)]`, `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`, `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`, `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`, `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` |
| Opacity | Not found |
| Background | `bg-cyan-400/[0.075]`, `bg-cyan-400/16`, `bg-emerald-400/[0.075]`, `bg-emerald-400/16`, `bg-orange-400/[0.085]`, `bg-orange-400/18`, `bg-violet-400/[0.08]`, `bg-violet-400/16`, `bg-white/[0.04]`, `bg-white/[0.08]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-cyan-400/[0.075]` | base | static occurrence |
| `bg-cyan-400/16` | base | static occurrence |
| `bg-emerald-400/[0.075]` | base | static occurrence |
| `bg-emerald-400/16` | base | static occurrence |
| `bg-orange-400/[0.085]` | base | static occurrence |
| `bg-orange-400/18` | base | static occurrence |
| `bg-violet-400/[0.08]` | base | static occurrence |
| `bg-violet-400/16` | base | static occurrence |
| `bg-white/[0.04]` | base | conditional or expression-derived |
| `bg-white/[0.08]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/24` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/24` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-orange-200/28` | base | static occurrence |
| `border-orange-200/32` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/26` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/12` | base | static occurrence |
| `border-white/15` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `group-open:rotate-180` | group-open | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `list-none` | base | static occurrence |
| `marker:hidden` | marker | static occurrence |
| `mt-1` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1.5` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `shadow-[0_0_22px_rgba(167,139,250,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(251,146,60,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(34,211,238,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(52,211,153,.1)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` | base | static occurrence |
| `sm:grid-cols-[minmax(0,1fr)_auto]` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:p-4` | sm | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-cyan-100/62` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-orange-50` | base | static occurrence |
| `text-slate-400` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `tracking-[0.22em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |

Exact className combinations:

- `border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`
- `border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]`
- `border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`
- `border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]`
- `border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]`
- `border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]`
- `border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`
- `border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]`
- `border-white/10 bg-white/[0.04]`
- `grid cursor-pointer list-none gap-3 p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center`
- `grid gap-3 border-t border-white/10 p-3 sm:p-4`
- `group overflow-hidden rounded-3xl border`
- `inline-flex items-center gap-3 text-sm font-black text-white`
- `mt-1 block text-2xl font-black text-white`
- `rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400`
- `rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5`
- `text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/62`
- `transition group-open:rotate-180`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`group overflow-hidden rounded-3xl border ${sectionTones[id] || "border-white/10 bg-white/[0.04]"}\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/research-panel.jsx#sectionTones
sectionTones = {
  fieldResearch: "border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]",
  eventResearch: "border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]",
  timedResearch: "border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]",
  specialResearch: "border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]",
}
```

```tsx
src/components/admin/pokemon/research-panel.jsx#taskCategoryTones
taskCategoryTones = {
  fieldResearch: "border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]",
  eventResearch: "border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]",
  timedResearch: "border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]",
  specialResearch: "border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]",
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
- Responsive utilities: `sm:grid-cols-[minmax(0,1fr)_auto]`, `sm:items-center`, `sm:p-4`.
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

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Success, Empty, Expanded, Hidden.
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
| — | Loading | Not found |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
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

---
id: MWI-COMP-070
component: "RewardGrid"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1565-1592
figma_priority: 21
evidence: static_code
---

# RewardGrid

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-070`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1565.
- File range: lines 1565–1592.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **21/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| Not found | Not found | Not found |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-063 | [DetailSection](../components/components-admin-events-events-calendar-panel-detailsection.md) (MWI-COMP-063) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-064 | [EventDetailModal](../components/components-admin-events-events-calendar-panel-eventdetailmodal.md) (MWI-COMP-064) | Renders/imports this component |
| MWI-COMP-069 | [ScrapedSectionCard](../components/components-admin-events-events-calendar-panel-scrapedsectioncard.md) (MWI-COMP-069) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <DetailSection>
  - <div>
    - <span>
      - <img />
      - <span />
      - <span>
        - <span>
        - <small>
  - <p>

Unique HTML/React tags: `DetailSection`, `div`, `img`, `p`, `small`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| compact | compact = false | See exact signature/contract below |
| rewards | Not found | See exact signature/contract below |
| title | title = "Rewards" | See exact signature/contract below |
| tone | tone = "rewards" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ rewards, compact = false, title = "Rewards", tone = "rewards" }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Loading, Empty.
- Text properties: `compact`, `rewards`, `title`, `tone`.
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#22c55e`, `#22d3ee`, `#38bdf8`, `#64748b`, `#94a3b8`, `#a855f7`, `#ef4444`, `#f59e0b` |
| Spacing | `gap-2`, `mt-3`, `px-3`, `py-2` |
| Sizing | `h-10`, `min-w-0`, `w-10` |
| Typography | `font-black`, `font-bold`, `text-[10px]`, `text-slate-200`, `text-slate-500`, `text-sm`, `tracking-[0.12em]`, `uppercase` |
| Radius | `rounded-xl` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-slate-950/40`, `bg-white/5` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `!p-3` | base | conditional or expression-derived |
| `bg-slate-950/40` | base | static occurrence |
| `bg-white/5` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `grid` | base | conditional or expression-derived |
| `grid-cols-[2.5rem_minmax(0,1fr)]` | base | static occurrence |
| `h-10` | base | static occurrence |
| `items-center` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-3` | base | conditional or expression-derived |
| `object-contain` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `sm:grid-cols-2` | sm | conditional or expression-derived |
| `text-[10px]` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `xl:grid-cols-3` | xl | conditional or expression-derived |

Exact className combinations:

- `block truncate`
- `block truncate text-[10px] font-black uppercase tracking-[0.12em] text-slate-500`
- `grid gap-2`
- `grid grid-cols-[2.5rem_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-slate-200`
- `h-10 w-10 object-contain`
- `h-10 w-10 rounded-xl bg-white/5`
- `min-w-0`
- `mt-3 !p-3`
- `sm:grid-cols-2`
- `sm:grid-cols-2 xl:grid-cols-3`
- `text-sm font-bold text-slate-500`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid gap-2 ${compact ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2"}\``
- `compact ? "mt-3 !p-3" : ""`

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/events/events-calendar-panel.jsx#modalToneMap
modalToneMap = {
  dates: { color: "#22d3ee", icon: CalendarDays },
  summary: { color: "#38bdf8", icon: Sparkles },
  pokemon: { color: "#38bdf8", icon: Sparkles },
  bonus: { color: "#22c55e", icon: Sparkles },
  rewards: { color: "#f59e0b", icon: Download },
  raids: { color: "#ef4444", icon: Archive },
  research: { color: "#a855f7", icon: Search },
  source: { color: "#94a3b8", icon: ExternalLink },
  neutral: { color: "#64748b", icon: FileJson },
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

Not found

## 13. Responsive behavior

- Breakpoints used: `sm`, `xl`.
- Responsive utilities: `sm:grid-cols-2`, `xl:grid-cols-3`.
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
- Boolean properties: Loading, Empty.
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

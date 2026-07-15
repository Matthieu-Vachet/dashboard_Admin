---
id: MWI-COMP-069
component: "ScrapedSectionCard"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1527-1563
figma_priority: 18
evidence: static_code
---

# ScrapedSectionCard

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-069`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1527.
- File range: lines 1527–1563.
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
| MWI-COMP-050 | [EventBannerImage](../components/components-admin-events-events-calendar-panel-eventbannerimage.md) (MWI-COMP-050) | JSX/import relation |
| MWI-COMP-067 | [PokemonCardGrid](../components/components-admin-events-events-calendar-panel-pokemoncardgrid.md) (MWI-COMP-067) | JSX/import relation |
| MWI-COMP-070 | [RewardGrid](../components/components-admin-events-events-calendar-panel-rewardgrid.md) (MWI-COMP-070) | JSX/import relation |

Unresolved/external JSX tags: Not found.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-068 | [EventScrapedSectionGroup](../components/components-admin-events-events-calendar-panel-eventscrapedsectiongroup.md) (MWI-COMP-068) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <details>
  - <summary>
    - <span>
      - <strong>
      - <small>
    - <span>
      - <span>
      - <span>
      - <span>
  - <div>
    - <p>
  - <PokemonCardGrid />
  - <RewardGrid />
  - <div>
    - <EventBannerImage />

Unique HTML/React tags: `details`, `div`, `EventBannerImage`, `p`, `PokemonCardGrid`, `RewardGrid`, `small`, `span`, `strong`, `summary`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onOpenPokemon`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| onOpenPokemon | Not found | See exact signature/contract below |
| open | Not found | See exact signature/contract below |
| section | Not found | See exact signature/contract below |
| tone | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ section, tone, open, onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Expanded.
- Text properties: `onOpenPokemon`, `open`, `section`, `tone`.
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
| Expanded | Detected | expanded/open signal |
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
- Pointer/cursor behavior: `cursor-pointer`.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-center, justify-between, justify-end`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#22c55e`, `#22d3ee`, `#38bdf8`, `#64748b`, `#94a3b8`, `#a855f7`, `#ef4444`, `#f59e0b` |
| Spacing | `gap-2`, `gap-3`, `mt-3`, `p-2`, `p-3`, `px-3`, `py-2` |
| Sizing | `max-h-40`, `min-w-0`, `w-full` |
| Typography | `break-words`, `font-black`, `font-semibold`, `leading-6`, `text-[11px]`, `text-cyan-100/60`, `text-slate-300`, `text-sm`, `text-white`, `tracking-[0.14em]`, `uppercase`, `whitespace-normal` |
| Radius | `rounded-xl` |
| Borders/strokes | `border`, `border-white/10` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-slate-950/32`, `bg-slate-950/40`, `bg-slate-950/45` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-slate-950/32` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `cursor-pointer` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `list-none` | base | static occurrence |
| `max-h-40` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `p-2` | base | static occurrence |
| `p-3` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-2` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-cyan-100/60` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-full` | base | static occurrence |
| `whitespace-normal` | base | static occurrence |

Exact className combinations:

- `block whitespace-normal break-words text-sm font-black text-white`
- `flex cursor-pointer list-none items-center justify-between gap-3`
- `flex shrink-0 flex-wrap justify-end gap-2 text-[11px] font-black text-slate-300`
- `max-h-40 w-full rounded-xl border border-white/10 bg-slate-950/40 object-contain p-2`
- `min-w-0`
- `mt-3 grid gap-2`
- `mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3`
- `rounded-xl border border-white/10 bg-slate-950/32 p-3`
- `rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2 text-sm font-semibold leading-6 text-slate-300`
- `text-[11px] font-black uppercase tracking-[0.14em] text-cyan-100/60`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-3`, `sm:grid-cols-2`.
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

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Expanded.
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
| □ | Expanded | expanded/open signal |
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

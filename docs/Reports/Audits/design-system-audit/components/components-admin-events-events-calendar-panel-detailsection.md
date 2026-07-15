---
id: MWI-COMP-063
component: "DetailSection"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1259-1306
figma_priority: 33
evidence: static_code
---

# DetailSection

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-063`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1259.
- File range: lines 1259–1306.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **33/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

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
| MWI-COMP-064 | [EventDetailModal](../components/components-admin-events-events-calendar-panel-eventdetailmodal.md) (MWI-COMP-064) | Renders/imports this component |
| MWI-COMP-066 | [EventPokemonGroups](../components/components-admin-events-events-calendar-panel-eventpokemongroups.md) (MWI-COMP-066) | Renders/imports this component |
| MWI-COMP-068 | [EventScrapedSectionGroup](../components/components-admin-events-events-calendar-panel-eventscrapedsectiongroup.md) (MWI-COMP-068) | Renders/imports this component |
| MWI-COMP-070 | [RewardGrid](../components/components-admin-events-events-calendar-panel-rewardgrid.md) (MWI-COMP-070) | Renders/imports this component |
| MWI-COMP-071 | [RawEventInfo](../components/components-admin-events-events-calendar-panel-raweventinfo.md) (MWI-COMP-071) | Renders/imports this component |
| MWI-COMP-072 | [DetailList](../components/components-admin-events-events-calendar-panel-detaillist.md) (MWI-COMP-072) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div>
    - <span>
      - <span>
        - <Icon />
      - <span>
        - <span>
        - <h3>
    - <span>

Unique HTML/React tags: `div`, `h3`, `Icon`, `section`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |
| className | className = "" | See exact signature/contract below |
| count | Not found | See exact signature/contract below |
| eyebrow | Not found | See exact signature/contract below |
| title | Not found | See exact signature/contract below |
| tone | tone = "neutral" | See exact signature/contract below |

Exact parameter signature:

```tsx
{ title, eyebrow, count, tone = "neutral", children, className = "" }
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
- Text properties: `children`, `className`, `count`, `eyebrow`, `title`, `tone`.
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

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-start, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#22c55e`, `#22d3ee`, `#38bdf8`, `#64748b`, `#94a3b8`, `#a855f7`, `#ef4444`, `#f59e0b`, `rgba(2,6,23,.44)`, `rgba(2,6,23,.66)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,0.06)` |
| Spacing | `gap-3`, `mb-4`, `p-4`, `px-3`, `py-1` |
| Sizing | `h-10`, `min-w-0`, `w-10` |
| Typography | `font-black`, `font-mono`, `leading-tight`, `text-[10px]`, `text-white`, `text-white/45`, `text-xl`, `text-xs`, `tracking-[0.2em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border` |
| Shadows/elevation | `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` |
| Opacity | Not found |
| Background | Not found |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-10` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]` | base | conditional or expression-derived |
| `shrink-0` | base | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-white/45` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.2em]` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |

Exact className combinations:

- `block text-[10px] font-black uppercase tracking-[0.2em] text-white/45`
- `flex min-w-0 items-start gap-3`
- `grid h-10 w-10 shrink-0 place-items-center rounded-xl border`
- `mb-4 flex flex-wrap items-start justify-between gap-3`
- `min-w-0`
- `rounded-2xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`
- `rounded-full border px-3 py-1 font-mono text-xs font-black text-white`
- `text-white`
- `text-xl font-black leading-tight text-white`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`rounded-2xl border p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}\``

### CSS variables

Not found

### Inline style expressions

- `{{ borderColor: hexToRgba(theme.color, 0.26), background: \`linear-gradient(135deg, ${hexToRgba(theme.color, 0.10)}, rgba(2,6,23,.44) 46%, rgba(2,6,23,.66))\`, boxShadow: \`inset 0 1px 0 rgba(255,255,255,.055), 0 0 34px ${hexToRgba(theme.color, 0.08)}\`, }}`
- `{{ borderColor: hexToRgba(theme.color, 0.28), backgroundColor: hexToRgba(theme.color, 0.13), }}`
- `{{ borderColor: hexToRgba(theme.color, 0.28), backgroundColor: hexToRgba(theme.color, 0.14), }}`

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

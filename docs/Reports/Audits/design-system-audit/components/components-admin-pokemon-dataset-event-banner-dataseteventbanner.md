---
id: MWI-COMP-153
component: "DatasetEventBanner"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/dataset-event-banner.jsx"
lines: 58-125
figma_priority: 34
evidence: static_code
---

# DatasetEventBanner

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/dataset-event-banner.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-153`.
- Location: `Dashboard Admin/src/components/admin/pokemon/dataset-event-banner.jsx`:58.
- File range: lines 58–125.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | CalendarDays, Clock3, ExternalLink, Layers3, Sparkles | icons |
| react | useEffect, useMemo, useState | external package |
| @/services/admin/events-api | eventsApiPath | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `CalendarDays`, `Clock3`, `ExternalLink`, `Layers3`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | Renders/imports this component |
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <div />
  - <div>
    - <div>
      - <div>
        - <span>
        - <span>
      - <h3>
      - <p>
      - <div>
        - <span>
          - <Clock3 />
        - <span>
        - <span>
          - <Layers3 />
    - <div>
      - <div>
        - <span>
          - <img />
      - <Sparkles />
      - <div>
        - <a>
          - <CalendarDays />
        - <a>
          - <ExternalLink />

Unique HTML/React tags: `a`, `CalendarDays`, `Clock3`, `div`, `ExternalLink`, `h3`, `img`, `Layers3`, `p`, `section`, `span`, `Sparkles`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `calendarEvents = []`.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| event | Not found | See exact signature/contract below |
| relatedEvent | relatedEvent = null | See exact signature/contract below |

Exact parameter signature:

```tsx
{ event, relatedEvent = null }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Success.
- Text properties: `event`, `relatedEvent`.
- Instance swaps: `CalendarDays`, `Clock3`, `ExternalLink`, `Layers3`, `Sparkles`.
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
| Loading | Detected | loading/pending signal |
| Disabled | Not found | Not found |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-start, place-items-center, xl:items-center, xl:items-end`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(167,139,250,.24)`, `rgba(2,6,23,.72)`, `rgba(255,255,255,.12)`, `rgba(255,255,255,.14)`, `rgba(76,29,149,.18)`, `rgba(76,29,149,.34)`, `rgba(8,47,73,.38)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `inset-0`, `mt-2`, `mt-3`, `p-1.5`, `p-4`, `px-2.5`, `px-3`, `py-1`, `py-2`, `sm:p-5` |
| Sizing | `h-12`, `max-h-full`, `max-w-4xl`, `min-w-0`, `w-12` |
| Typography | `font-black`, `font-bold`, `leading-6`, `sm:text-2xl`, `text-[10px]`, `text-cyan-50`, `text-emerald-50`, `text-slate-200`, `text-sm`, `text-violet-100/70`, `text-violet-50`, `text-violet-50/78`, `text-white`, `text-xl`, `text-xs`, `tracking-[0.15em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-3xl`, `rounded-full`, `rounded-xl` |
| Borders/strokes | `border`, `border-cyan-200/20`, `border-cyan-200/25`, `border-emerald-200/30`, `border-slate-200/20`, `border-violet-200/24`, `border-violet-200/30`, `border-white/10`, `border-white/14`, `border-white/18` |
| Shadows/elevation | `shadow-[0_24px_90px_rgba(76,29,149,.18)]`, `shadow-lg` |
| Opacity | `opacity-[0.14]` |
| Background | `bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,.24),transparent_34%),linear-gradient(135deg,rgba(76,29,149,.34),rgba(8,47,73,.38),rgba(2,6,23,.72))]`, `bg-black/20`, `bg-cyan-300/10`, `bg-cyan-300/12`, `bg-emerald-300/16`, `bg-slate-300/10`, `bg-slate-950/65`, `bg-violet-300/16`, `bg-white/[0.08]`, `hover:bg-white/[0.13]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-space-x-2` | base | static occurrence |
| `[background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:26px_26px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,.24),transparent_34%),linear-gradient(135deg,rgba(76,29,149,.34),rgba(8,47,73,.38),rgba(2,6,23,.72))]` | base | static occurrence |
| `bg-black/20` | base | static occurrence |
| `bg-cyan-300/10` | base | static occurrence |
| `bg-cyan-300/12` | base | static occurrence |
| `bg-emerald-300/16` | base | static occurrence |
| `bg-slate-300/10` | base | static occurrence |
| `bg-slate-950/65` | base | static occurrence |
| `bg-violet-300/16` | base | static occurrence |
| `bg-white/[0.08]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-slate-200/20` | base | static occurrence |
| `border-violet-200/24` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `border-white/14` | base | static occurrence |
| `border-white/18` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-12` | base | static occurrence |
| `hover:bg-white/[0.13]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-4xl` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-[0.14]` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-1.5` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-2.5` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-1` | base | conditional or expression-derived |
| `py-2` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_24px_90px_rgba(76,29,149,.18)]` | base | static occurrence |
| `shadow-lg` | base | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-2xl` | sm | static occurrence |
| `text-[10px]` | base | conditional or expression-derived |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-50` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100/70` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-violet-50/78` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.15em]` | base | conditional or expression-derived |
| `uppercase` | base | conditional or expression-derived |
| `w-12` | base | static occurrence |
| `xl:grid-cols-[minmax(0,1fr)_auto]` | xl | static occurrence |
| `xl:items-center` | xl | static occurrence |
| `xl:items-end` | xl | static occurrence |

Exact className combinations:

- `absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:26px_26px]`
- `border-emerald-200/30 bg-emerald-300/16 text-emerald-50`
- `border-slate-200/20 bg-slate-300/10 text-slate-200`
- `border-violet-200/30 bg-violet-300/16 text-violet-50`
- `flex -space-x-2`
- `flex flex-wrap gap-2`
- `flex flex-wrap items-center gap-2`
- `grid h-12 w-12 place-items-center rounded-2xl border border-white/18 bg-slate-950/65 p-1.5 shadow-lg`
- `inline-flex items-center gap-2 rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-xs font-black text-cyan-50`
- `inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2`
- `inline-flex items-center gap-2 rounded-xl border border-white/14 bg-white/[0.08] px-3 py-2 text-xs font-black text-white hover:bg-white/[0.13]`
- `max-h-full object-contain`
- `min-w-0`
- `mt-2 max-w-4xl text-sm font-bold leading-6 text-violet-50/78`
- `mt-3 flex flex-wrap gap-2 text-xs font-black text-slate-200`
- `mt-3 text-xl font-black text-white sm:text-2xl`
- `relative flex flex-col items-start gap-3 xl:items-end`
- `relative grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center`
- `relative overflow-hidden rounded-3xl border border-violet-200/24 bg-[radial-gradient(circle_at_8%_0%,rgba(167,139,250,.24),transparent_34%),linear-gradient(135deg,rgba(76,29,149,.34),rgba(8,47,73,.38),rgba(2,6,23,.72))] p-4 shadow-[0_24px_90px_rgba(76,29,149,.18)] sm:p-5`
- `rounded-full border border-cyan-200/25 bg-cyan-300/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-cyan-50`
- `rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em]`
- `rounded-xl border border-white/10 bg-black/20 px-3 py-2`
- `text-violet-100/70`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${statusTone(status)}\``

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/dataset-event-banner.jsx#statusTone
function statusTone(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("ongoing") || value.includes("current") || value.includes("cours")) {
    return "border-emerald-200/30 bg-emerald-300/16 text-emerald-50";
  }
  if (value.includes("upcoming") || value.includes("venir")) {
    return "border-violet-200/30 bg-violet-300/16 text-violet-50";
  }
  return "border-slate-200/20 bg-slate-300/10 text-slate-200";
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
- Responsive utilities: `sm:p-5`, `sm:text-2xl`, `xl:grid-cols-[minmax(0,1fr)_auto]`, `xl:items-center`, `xl:items-end`.
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

- Lucide icons: `CalendarDays`, `Clock3`, `ExternalLink`, `Layers3`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Loading, Success.
- Instance swaps: `CalendarDays`, `Clock3`, `ExternalLink`, `Layers3`, `Sparkles`.
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
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
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

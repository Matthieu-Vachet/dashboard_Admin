---
id: MWI-COMP-096
component: "LearningActivityTimeline"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-activity.tsx"
lines: 7-59
figma_priority: 31
evidence: static_code
---

# LearningActivityTimeline

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-activity.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-096`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-activity.tsx`:7.
- File range: lines 7–59.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | CheckCircle2, Clock3, Play, Sparkles | icons |
| @/components/ui/card | Card | internal |
| @/types/admin/learning | LearningActivity | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `CheckCircle2`, `Clock3`, `Play`, `Sparkles`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section aria-labelledby="learning-activity-title">
  - <div>
    - <p>
    - <h2 id="learning-activity-title">
  - <Card>
    - <div aria-label="Activité des 12 dernières semaines">
      - <span />
    - <div>
      - <div>
        - <div>
          - <span>
            - <CheckCircle2 />
            - <Play />
          - <div>
            - <strong>
            - <span>
        - <div>
          - <span>
            - <Clock3 />
          - <span>
            - <Sparkles />
      - <p>

Unique HTML/React tags: `Card`, `CheckCircle2`, `Clock3`, `div`, `h2`, `p`, `Play`, `section`, `span`, `Sparkles`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| activity | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ activity }: { activity: LearningActivity[] }
```

Exact local props contract when statically resolvable:

```tsx
{ activity: LearningActivity[] }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Empty, Scrollable.
- Text properties: `activity`.
- Instance swaps: `CheckCircle2`, `Clock3`, `Play`, `Sparkles`.
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
| Scrollable | Detected | overflow scrolling utility |
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
- Alignment utilities: `items-center, justify-between, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | Not found |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `mt-1`, `mt-4`, `p-3`, `p-4`, `pb-2`, `py-6`, `sm:p-5`, `space-y-3` |
| Sizing | `h-3`, `h-9`, `min-w-0`, `w-3`, `w-9` |
| Typography | `font-black`, `font-semibold`, `text-2xl`, `text-brand-2`, `text-brand-3`, `text-center`, `text-muted`, `text-sm`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-lg`, `rounded-sm` |
| Borders/strokes | `border`, `border-line` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-black/15`, `bg-brand-2/10`, `bg-brand-3`, `bg-brand-3/10`, `bg-brand-3/45`, `bg-brand-3/70`, `bg-white/[0.06]` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-black/15` | base | static occurrence |
| `bg-brand-2/10` | base | conditional or expression-derived |
| `bg-brand-3` | base | conditional or expression-derived |
| `bg-brand-3/10` | base | conditional or expression-derived |
| `bg-brand-3/45` | base | conditional or expression-derived |
| `bg-brand-3/70` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | conditional or expression-derived |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-line` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-flow-col` | base | static occurrence |
| `grid-rows-7` | base | static occurrence |
| `h-3` | base | conditional or expression-derived |
| `h-9` | base | conditional or expression-derived |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `justify-between` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-x-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pb-2` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `py-6` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `rounded-sm` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `sm:p-5` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-brand-2` | base | conditional or expression-derived |
| `text-brand-3` | base | conditional or expression-derived |
| `text-center` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-3` | base | conditional or expression-derived |
| `w-9` | base | conditional or expression-derived |

Exact className combinations:

- `block truncate text-sm font-black`
- `flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-black/15 p-3`
- `flex items-center gap-3 text-xs font-black`
- `flex min-w-0 items-center gap-3`
- `grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto pb-2`
- `grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-2/10 text-brand-2`
- `grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-3/10 text-brand-3`
- `h-3 w-3 rounded-sm bg-brand-3`
- `h-3 w-3 rounded-sm bg-brand-3/45`
- `h-3 w-3 rounded-sm bg-brand-3/70`
- `h-3 w-3 rounded-sm bg-white/[0.06]`
- `inline-flex items-center gap-1 text-brand-3`
- `inline-flex items-center gap-1 text-muted`
- `min-w-0`
- `mt-1 text-2xl font-black`
- `mt-4 grid gap-2`
- `overflow-hidden p-4 sm:p-5`
- `py-6 text-center text-sm font-semibold text-muted`
- `space-y-3`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`
- `text-xs font-semibold text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `day.count === 0 ? "h-3 w-3 rounded-sm bg-white/[0.06]" : day.count === 1 ? "h-3 w-3 rounded-sm bg-brand-3/45" : day.count === 2 ? "h-3 w-3 rounded-sm bg-brand-3/70" : "h-3 w-3 rounded-sm bg-brand-3"`
- `item.action === "completed" ? "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-3/10 text-brand-3" : "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-2/10 text-brand-2"`

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

- Breakpoints used: `sm`.
- Responsive utilities: `sm:p-5`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Activité des 12 dernières semaines"`, `aria-labelledby="learning-activity-title"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CheckCircle2`, `Clock3`, `Play`, `Sparkles`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Empty, Scrollable.
- Instance swaps: `CheckCircle2`, `Clock3`, `Play`, `Sparkles`.
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
| □ | Scrollable | overflow scrolling utility |
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

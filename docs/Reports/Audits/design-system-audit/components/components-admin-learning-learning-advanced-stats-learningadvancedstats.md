---
id: MWI-COMP-097
component: "LearningAdvancedStats"
category: "Learning feature"
status: exported
source: "src/components/admin/learning/learning-advanced-stats.tsx"
lines: 12-49
figma_priority: 31
evidence: static_code
---

# LearningAdvancedStats

## 1. Purpose

Learning feature component implemented in src/components/admin/learning/learning-advanced-stats.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-097`.
- Location: `Dashboard Admin/src/components/admin/learning/learning-advanced-stats.tsx`:12.
- File range: lines 12–49.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **31/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | CalendarClock, CalendarDays, CheckCircle2, Clock3, Flame, History, Rocket, Sparkles, Target, Trophy | icons |
| @/components/ui/card | Card | internal |
| @/types/admin/learning | LearningAdvancedStats | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `Icon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-081 | [JsProgress](../components/components-admin-forms-js-progress-jsprogress.md) (MWI-COMP-081) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section aria-labelledby="learning-stats-title">
  - <div>
    - <p>
    - <h2 id="learning-stats-title">
  - <div>
    - <Card>
      - <div>
        - <div>
          - <span>
          - <strong>
        - <span>
          - <Icon />

Unique HTML/React tags: `Card`, `div`, `h2`, `Icon`, `p`, `section`, `span`, `strong`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| stats | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ stats }: { stats: LearningAdvancedStats }
```

Exact local props contract when statically resolvable:

```tsx
{ stats: LearningAdvancedStats }
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Empty.
- Text properties: `stats`.
- Instance swaps: `CalendarClock`, `CalendarDays`, `CheckCircle2`, `Clock3`, `Flame`, `History`, `Rocket`, `Sparkles`, `Target`, `Trophy`.
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
| Literal colors | Not found |
| Spacing | `gap-3`, `mt-1`, `mt-2`, `p-4`, `space-y-3` |
| Sizing | `h-9`, `min-w-0`, `w-9` |
| Typography | `font-black`, `text-[11px]`, `text-2xl`, `text-brand-2`, `text-muted`, `text-xl`, `text-xs`, `tracking-[0.14em]`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/20` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-brand-2/10` |
| Animation | Not found |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/20` | base | static occurrence |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-9` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-9` | base | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `block text-[11px] font-black uppercase tracking-[0.14em] text-muted`
- `flex items-start justify-between gap-3`
- `grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- `grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-2/20 bg-brand-2/10 text-brand-2`
- `min-w-0`
- `mt-1 text-2xl font-black`
- `mt-2 block truncate text-xl font-black`
- `p-4`
- `space-y-3`
- `text-xs font-black uppercase tracking-[0.18em] text-brand-2`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

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

- Breakpoints used: `lg`, `sm`, `xl`.
- Responsive utilities: `lg:grid-cols-3`, `sm:grid-cols-2`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: Not found.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-labelledby="learning-stats-title"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `CalendarClock`, `CalendarDays`, `CheckCircle2`, `Clock3`, `Flame`, `History`, `Rocket`, `Sparkles`, `Target`, `Trophy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Empty.
- Instance swaps: `CalendarClock`, `CalendarDays`, `CheckCircle2`, `Clock3`, `Flame`, `History`, `Rocket`, `Sparkles`, `Target`, `Trophy`.
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
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: lg | Tailwind lg: utilities |
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

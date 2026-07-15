---
id: MWI-COMP-001
component: "AccountPage"
category: "Page"
status: exported
source: "src/app/(dashboard)/account/page.tsx"
lines: 7-64
figma_priority: 40
evidence: static_code
---

# AccountPage

## 1. Purpose

App Router page component for /account. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-001`.
- Location: `Dashboard Admin/src/app/(dashboard)/account/page.tsx`:7.
- File range: lines 7–64.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **40/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/link | Link | external package |
| lucide-react | ArrowLeft, MonitorCog, ShieldCheck, UserRound | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/card | Card, CardDescription, CardHeader, CardTitle | internal |
| @/lib/auth | getSession | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |
| MWI-COMP-320 | [CardHeader](../components/components-ui-card-cardheader.md) (MWI-COMP-320) | JSX/import relation |
| MWI-COMP-321 | [CardTitle](../components/components-ui-card-cardtitle.md) (MWI-COMP-321) | JSX/import relation |
| MWI-COMP-322 | [CardDescription](../components/components-ui-card-carddescription.md) (MWI-COMP-322) | JSX/import relation |

Unresolved/external JSX tags: `ArrowLeft`, `Link`, `MonitorCog`, `ShieldCheck`, `UserRound`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No component parent detected; may be route entry or unused |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <Card>
    - <div />
    - <CardHeader>
      - <CardTitle>
      - <CardDescription>
  - <section>
    - <Card>
      - <span>
        - <UserRound />
      - <p>
      - <h2>
      - <Badge>
    - <Card id="session">
      - <span>
        - <ShieldCheck />
      - <p>
      - <h2>
      - <p>
    - <Card>
      - <span>
        - <MonitorCog />
      - <p>
      - <h2>
      - <p>

Unique HTML/React tags: `ArrowLeft`, `Badge`, `Card`, `CardDescription`, `CardHeader`, `CardTitle`, `div`, `h2`, `Link`, `MonitorCog`, `p`, `section`, `ShieldCheck`, `span`, `UserRound`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| Not found | Not found | Not found |

Exact parameter signature:

```tsx
Not found
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Warning, Success, Active, Inactive.
- Text properties: Not found.
- Instance swaps: `ArrowLeft`, `MonitorCog`, `ShieldCheck`, `UserRound`.
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
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- CSS Grid layout is present.
- Alignment utilities: `items-center, place-items-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(32,211,255,.18)` |
| Spacing | `gap-2`, `gap-4`, `inset-0`, `mt-2`, `mt-4`, `p-4`, `p-5`, `px-3`, `sm:p-6`, `space-y-4` |
| Sizing | `h-12`, `min-h-10`, `w-12` |
| Typography | `break-words`, `font-black`, `font-semibold`, `leading-6`, `sm:text-3xl`, `text-2xl`, `text-amber-100`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-rose-100`, `text-slate-100`, `text-sm`, `text-violet-100`, `text-xl`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-cyan-300/25`, `border-danger/35`, `border-emerald-300/25`, `border-line`, `border-violet-300/25`, `border-warning/35`, `border-white/10`, `hover:border-cyan-200/40` |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-[radial-gradient(circle_at_12%_0%,rgba(32,211,255,.18),transparent_42%)]`, `bg-brand-2/10`, `bg-brand-3/10`, `bg-brand/12`, `bg-cyan-400/10`, `bg-danger/12`, `bg-emerald-400/10`, `bg-violet-400/10`, `bg-warning/12`, `bg-white/[0.06]`, `hover:bg-cyan-400/12` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `bg-[radial-gradient(circle_at_12%_0%,rgba(32,211,255,.18),transparent_42%)]` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-cyan-300/25` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-emerald-300/25` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-violet-300/25` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `grid` | base | static occurrence |
| `h-12` | base | static occurrence |
| `hover:bg-cyan-400/12` | hover | static occurrence |
| `hover:border-cyan-200/40` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `min-h-10` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `sm:text-3xl` | sm | static occurrence |
| `space-y-4` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-slate-100` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `tracking-[0.16em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-12` | base | static occurrence |
| `z-10` | base | static occurrence |

Exact className combinations:

- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-warning/35 bg-warning/12 text-amber-100`
- `grid gap-4 lg:grid-cols-3`
- `grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-400/10 text-cyan-100`
- `grid h-12 w-12 place-items-center rounded-lg border border-emerald-300/25 bg-emerald-400/10 text-emerald-100`
- `grid h-12 w-12 place-items-center rounded-lg border border-violet-300/25 bg-violet-400/10 text-violet-100`
- `inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-sm font-black text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/12`
- `mt-2 break-words text-xl font-black`
- `mt-2 text-sm font-semibold leading-6 text-muted`
- `mt-2 text-xl font-black`
- `mt-4`
- `mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted`
- `p-4`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(32,211,255,.18),transparent_42%)]`
- `relative overflow-hidden p-5 sm:p-6`
- `relative z-10`
- `space-y-4`
- `text-2xl sm:text-3xl`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

Not found

### CSS variables

Not found

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/ui/badge.tsx#tones
tones: Record<BadgeTone, string> = {
  cyan: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  violet: "border-brand/30 bg-brand/12 text-violet-100",
  green: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  amber: "border-warning/35 bg-warning/12 text-amber-100",
  red: "border-danger/35 bg-danger/12 text-rose-100",
  neutral: "border-line bg-white/[0.06] text-muted",
}
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:grid-cols-3`, `sm:p-6`, `sm:text-3xl`.
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

- Lucide icons: `ArrowLeft`, `MonitorCog`, `ShieldCheck`, `UserRound`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: grid translated into nested Auto Layout frames. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success, Active, Inactive.
- Instance swaps: `ArrowLeft`, `MonitorCog`, `ShieldCheck`, `UserRound`.
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
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
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

---
id: MWI-COMP-031
component: "DailyCodePost"
category: "Dashboard internal"
status: internal
source: "src/components/admin/dashboard/dashboard-home-live.tsx"
lines: 362-419
figma_priority: 18
evidence: static_code
---

# DailyCodePost

## 1. Purpose

Dashboard internal component implemented in src/components/admin/dashboard/dashboard-home-live.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-031`.
- Location: `Dashboard Admin/src/components/admin/dashboard/dashboard-home-live.tsx`:362.
- File range: lines 362–419.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Copy | icons |
| @/data/daily-code-tips | getDailyCodeTip | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Copy`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div />
  - <div />
  - <div>
    - <div>
      - <div>
        - <p>
        - <p>
      - <button aria-label="Copier la légende Instagram">
        - <Copy />
    - <div>
      - <h3>
      - <p>
    - <pre>
      - <code>
    - <p>
    - <div>
      - <span>

Unique HTML/React tags: `button`, `code`, `Copy`, `div`, `h3`, `p`, `pre`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| date | Not found | See exact signature/contract below |
| tip | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  tip,
  date,
}: {
  tip: ReturnType<typeof getDailyCodeTip>;
  date: string;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  tip: ReturnType<typeof getDailyCodeTip>;
  date: string;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Success, Scrollable.
- Text properties: `date`, `tip`.
- Instance swaps: `Copy`.
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
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-start, justify-between, justify-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#050816`, `rgba(144,91,244,.18)`, `rgba(255,255,255,.18)`, `rgba(32,211,255,.28)`, `rgba(32,211,255,0.12)`, `rgba(88,242,169,.22)` |
| Spacing | `gap-2`, `gap-3`, `inset-0`, `mt-1`, `mt-5`, `mt-6`, `mt-7`, `mt-auto`, `mx-auto`, `p-3`, `p-4`, `p-5`, `pr-24`, `pt-16`, `pt-4`, `px-2.5`, `py-1`, `right-5`, `sm:mt-10`, `sm:p-8`, `sm:pr-20`, `sm:pt-20`, `sm:right-8`, `sm:top-20`, `top-16` |
| Sizing | `h-10`, `max-w-[12ch]`, `max-w-[34rem]`, `max-w-[720px]`, `max-w-full`, `min-h-[min(760px,calc(100dvh-7rem))]`, `min-w-0`, `sm:max-w-[11ch]`, `sm:min-h-[32rem]`, `w-10`, `w-full` |
| Typography | `break-words`, `font-black`, `font-bold`, `font-mono`, `leading-[0.95]`, `leading-6`, `leading-7`, `sm:text-base`, `text-[0.68rem]`, `text-[clamp(.68rem,2.2vw,1rem)]`, `text-[clamp(2.1rem,9vw,4.8rem)]`, `text-brand-2`, `text-cyan-100`, `text-emerald-100`, `text-muted`, `text-slate-100`, `text-slate-200`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.2em]`, `uppercase`, `whitespace-pre` |
| Radius | `rounded-full`, `rounded-lg`, `rounded-xl` |
| Borders/strokes | `border`, `border-brand-2/20`, `border-emerald-300/20`, `border-white/10`, `hover:border-brand-2/45` |
| Shadows/elevation | `shadow-[0_24px_70px_rgba(32,211,255,0.12)]`, `shadow-inner` |
| Opacity | `opacity-20` |
| Background | `bg-[#050816]/85`, `bg-emerald-400/10`, `bg-slate-950`, `bg-white/10`, `hover:bg-brand-2/20` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `[background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:28px_28px]` | [background-size | static occurrence |
| `absolute` | base | static occurrence |
| `bg-[#050816]/85` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-slate-950` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/20` | base | static occurrence |
| `border-emerald-300/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `break-words` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `h-10` | base | static occurrence |
| `hover:bg-brand-2/20` | hover | static occurrence |
| `hover:border-brand-2/45` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-[0.95]` | base | static occurrence |
| `leading-6` | base | static occurrence |
| `leading-7` | base | static occurrence |
| `max-w-[12ch]` | base | static occurrence |
| `max-w-[34rem]` | base | static occurrence |
| `max-w-[720px]` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `min-h-[min(760px,calc(100dvh-7rem))]` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `mt-6` | base | static occurrence |
| `mt-7` | base | static occurrence |
| `mt-auto` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `opacity-20` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-x-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `pr-24` | base | static occurrence |
| `pt-16` | base | static occurrence |
| `pt-4` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `py-1` | base | static occurrence |
| `relative` | base | static occurrence |
| `right-5` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_24px_70px_rgba(32,211,255,0.12)]` | base | static occurrence |
| `shadow-inner` | base | static occurrence |
| `sm:aspect-[4/5]` | sm | static occurrence |
| `sm:max-w-[11ch]` | sm | static occurrence |
| `sm:min-h-[32rem]` | sm | static occurrence |
| `sm:mt-10` | sm | static occurrence |
| `sm:p-8` | sm | static occurrence |
| `sm:pr-20` | sm | static occurrence |
| `sm:pt-20` | sm | static occurrence |
| `sm:right-8` | sm | static occurrence |
| `sm:text-base` | sm | static occurrence |
| `sm:top-20` | sm | static occurrence |
| `text-[0.68rem]` | base | static occurrence |
| `text-[clamp(.68rem,2.2vw,1rem)]` | base | static occurrence |
| `text-[clamp(2.1rem,9vw,4.8rem)]` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-slate-100` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `top-16` | base | static occurrence |
| `tracking-[0.2em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-10` | base | static occurrence |
| `w-full` | base | static occurrence |
| `whitespace-pre` | base | static occurrence |

Exact className combinations:

- `absolute right-5 top-16 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/10 text-white transition hover:border-brand-2/45 hover:bg-brand-2/20 sm:right-8 sm:top-20`
- `flex min-w-0 items-start justify-between gap-3 pr-24 sm:pr-20`
- `font-mono text-xs font-black uppercase tracking-[0.2em] text-brand-2`
- `max-w-[12ch] break-words text-[clamp(2.1rem,9vw,4.8rem)] font-black leading-[0.95] sm:max-w-[11ch]`
- `min-w-0`
- `mt-1 text-xs font-bold text-muted`
- `mt-5 max-w-[34rem] text-sm font-bold leading-7 text-slate-200 sm:text-base`
- `mt-5 rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm font-black leading-6 text-emerald-100 sm:text-base`
- `mt-6 max-w-full overflow-x-auto whitespace-pre rounded-xl border border-white/10 bg-[#050816]/85 p-4 font-mono text-[clamp(.68rem,2.2vw,1rem)] font-bold leading-6 text-cyan-100 shadow-inner`
- `mt-7 min-w-0 sm:mt-10`
- `mt-auto flex flex-wrap gap-2 pt-4`
- `pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(32,211,255,.28),transparent_34%),radial-gradient(circle_at_86%_22%,rgba(88,242,169,.22),transparent_30%),linear-gradient(145deg,rgba(144,91,244,.18),transparent_46%)]`
- `pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:28px_28px]`
- `relative flex min-h-[min(760px,calc(100dvh-7rem))] flex-col p-5 pt-16 sm:aspect-[4/5] sm:min-h-[32rem] sm:p-8 sm:pt-20`
- `relative mx-auto w-full max-w-[720px] overflow-hidden rounded-xl border border-brand-2/20 bg-slate-950 text-white shadow-[0_24px_70px_rgba(32,211,255,0.12)]`
- `rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.68rem] font-black text-slate-100`

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

`hover:`

## 13. Responsive behavior

- Breakpoints used: `sm`.
- Responsive utilities: `sm:aspect-[4/5]`, `sm:max-w-[11ch]`, `sm:min-h-[32rem]`, `sm:mt-10`, `sm:p-8`, `sm:pr-20`, `sm:pt-20`, `sm:right-8`, `sm:text-base`, `sm:top-20`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Copier la légende Instagram"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Copy`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Success, Scrollable.
- Instance swaps: `Copy`.
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

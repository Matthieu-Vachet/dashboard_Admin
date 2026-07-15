---
id: MWI-COMP-236
component: "DashboardFooter"
category: "Shared pattern"
status: exported
source: "src/components/admin/shared/dashboard-footer.tsx"
lines: 13-52
figma_priority: 34
evidence: static_code
---

# DashboardFooter

## 1. Purpose

Shared pattern component implemented in src/components/admin/shared/dashboard-footer.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-236`.
- Location: `Dashboard Admin/src/components/admin/shared/dashboard-footer.tsx`:13.
- File range: lines 13–52.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Copyright, ShieldCheck | icons |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Copyright`, `ShieldCheck`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-092 | [AdminAppFrame](../components/components-admin-layout-admin-app-frame-adminappframe.md) (MWI-COMP-092) | Renders/imports this component |
| MWI-COMP-268 | [DashboardFooter](../components/components-dashboard-dashboard-footer-dashboardfooter.md) (MWI-COMP-268) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <footer>
  - <div>
    - <p>
      - <Copyright aria-hidden="true" />
      - <span>
      - <span>
      - <span>
        - <ShieldCheck aria-hidden="true" />
    - <button aria-label="Ouvrir l'historique des versions du Dashboard">
    - <span>

Unique HTML/React tags: `button`, `Copyright`, `div`, `footer`, `p`, `ShieldCheck`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| className | Not found | See exact signature/contract below |
| onVersionClick | Not found | See exact signature/contract below |
| version | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  version,
  onVersionClick,
  className,
}: {
  version: string;
  onVersionClick?: () => void;
  className?: string;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  version: string;
  onVersionClick?: () => void;
  className?: string;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Hidden.
- Text properties: `className`, `onVersionClick`, `version`.
- Instance swaps: `Copyright`, `ShieldCheck`.
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
| Success | Not found | Not found |
| Empty | Not found | Not found |
| Collapsed | Not found | Not found |
| Expanded | Not found | Not found |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, sm:items-center, sm:justify-between`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `rgba(255,255,255,0.045)` |
| Spacing | `gap-1`, `gap-3`, `gap-x-2`, `gap-y-1`, `mt-8`, `pt-4`, `px-3`, `py-1`, `py-3` |
| Sizing | `min-w-0`, `w-fit` |
| Typography | `font-black`, `font-bold`, `leading-5`, `text-[0.66rem]`, `text-[0.68rem]`, `text-brand-2`, `text-brand-2/85`, `text-brand-3/85`, `text-muted`, `text-muted/55`, `text-muted/80`, `tracking-[0.14em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/25`, `border-line`, `border-t`, `hover:border-brand-2/55` |
| Shadows/elevation | `shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]` |
| Opacity | Not found |
| Background | `bg-brand-2/10`, `bg-white/[0.035]`, `hover:bg-brand-2/15` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-brand-2/10` | base | static occurrence |
| `bg-white/[0.035]` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-brand-2/25` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-t` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-x-2` | base | static occurrence |
| `gap-y-1` | base | static occurrence |
| `hidden` | base | static occurrence |
| `hover:bg-brand-2/15` | hover | static occurrence |
| `hover:border-brand-2/55` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `items-center` | base | static occurrence |
| `leading-5` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-8` | base | conditional or expression-derived |
| `pt-4` | base | conditional or expression-derived |
| `px-3` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-3` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:flex-row` | sm | static occurrence |
| `sm:inline` | sm | static occurrence |
| `sm:items-center` | sm | static occurrence |
| `sm:justify-between` | sm | static occurrence |
| `text-[0.66rem]` | base | static occurrence |
| `text-[0.68rem]` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-2/85` | base | static occurrence |
| `text-brand-3/85` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-muted/55` | base | static occurrence |
| `text-muted/80` | base | static occurrence |
| `tracking-[0.14em]` | base | static occurrence |
| `transition` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-fit` | base | static occurrence |

Exact className combinations:

- `flex flex-col gap-3 rounded-lg border border-line bg-white/[0.035] px-3 py-3 text-[0.68rem] font-bold leading-5 text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] sm:flex-row sm:items-center sm:justify-between`
- `flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1`
- `hidden text-muted/55 sm:inline`
- `inline-flex items-center gap-1 text-muted/80`
- `inline-flex w-fit items-center rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-brand-2 transition hover:border-brand-2/55 hover:bg-brand-2/15`
- `inline-flex w-fit rounded-full border border-brand-2/25 bg-brand-2/10 px-3 py-1 text-[0.66rem] font-black uppercase tracking-[0.14em] text-brand-2`
- `mt-8 border-t border-line pt-4`
- `shrink-0 text-brand-2/85`
- `shrink-0 text-brand-3/85`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn("mt-8 border-t border-line pt-4", className)`

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
- Responsive utilities: `sm:flex-row`, `sm:inline`, `sm:items-center`, `sm:justify-between`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-hidden="true"`, `aria-label="Ouvrir l'historique des versions du Dashboard"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Copyright`, `ShieldCheck`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Hidden.
- Instance swaps: `Copyright`, `ShieldCheck`.
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
| — | Success | Not found |
| — | Empty | Not found |
| — | Collapsed | Not found |
| — | Expanded | Not found |
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

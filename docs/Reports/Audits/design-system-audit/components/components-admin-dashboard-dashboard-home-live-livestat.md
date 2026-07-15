---
id: MWI-COMP-033
component: "LiveStat"
category: "Dashboard internal"
status: internal
source: "src/components/admin/dashboard/dashboard-home-live.tsx"
lines: 451-495
figma_priority: 18
evidence: static_code
---

# LiveStat

## 1. Purpose

Dashboard internal component implemented in src/components/admin/dashboard/dashboard-home-live.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-033`.
- Location: `Dashboard Admin/src/components/admin/dashboard/dashboard-home-live.tsx`:451.
- File range: lines 451–495.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| framer-motion | motion | external package |
| lucide-react | LucideIcon | icons |
| @/components/ui/card | Card | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-319 | [Card](../components/components-ui-card-card.md) (MWI-COMP-319) | JSX/import relation |

Unresolved/external JSX tags: `Icon`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-030 | [DashboardHomeLive](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) (MWI-COMP-030) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <motion.div>
  - <Card>
    - <div>
      - <div>
        - <p>
        - <p>
      - <div>
        - <Icon />
    - <p>

Unique HTML/React tags: `Card`, `div`, `Icon`, `motion.div`, `p`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: Not found.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| accent | Not found | See exact signature/contract below |
| delay | Not found | See exact signature/contract below |
| detail | Not found | See exact signature/contract below |
| Icon | Not found | See exact signature/contract below |
| label | Not found | See exact signature/contract below |
| value | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  label,
  value,
  detail,
  icon: Icon,
  accent,
  delay,
}: {
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
  accent: "cyan" | "green" | "violet" | "amber";
  delay: number;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  label: string;
  value: number;
  detail: string;
  icon: LucideIcon;
  accent: "cyan" | "green" | "violet" | "amber";
  delay: number;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| accent | amber | Explicit string literal in props contract |
| accent | cyan | Explicit string literal in props contract |
| accent | green | Explicit string literal in props contract |
| accent | violet | Explicit string literal in props contract |

- Boolean properties for Figma: Warning, Success.
- Text properties: `accent`, `delay`, `detail`, `Icon`, `label`, `value`.
- Instance swaps: `LucideIcon`.
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
| Warning | Detected | warning/amber/yellow signal |
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

- Hover behavior: Not found.
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Not found.
- Expand/collapse behavior: Not found.

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- Alignment utilities: `items-start, justify-between, place-items-center`.
- Positioning utilities: `relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-border` |
| Literal colors | Not found |
| Spacing | `gap-3`, `mt-3`, `mt-5`, `p-4` |
| Sizing | `h-11`, `min-w-0`, `w-11` |
| Typography | `font-black`, `font-mono`, `leading-none`, `text-3xl`, `text-brand`, `text-brand-2`, `text-brand-3`, `text-muted`, `text-warning`, `text-xs`, `tracking-[0.16em]`, `uppercase` |
| Radius | `rounded-lg` |
| Borders/strokes | Not found |
| Shadows/elevation | Not found |
| Opacity | Not found |
| Background | `bg-gradient-to-br`, `from-brand-2/20`, `from-brand-3/20`, `from-brand/20`, `from-warning/20`, `to-white/[0.04]` |
| Animation | `motion-border` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `bg-gradient-to-br` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-mono` | base | static occurrence |
| `from-brand-2/20` | base | static occurrence |
| `from-brand-3/20` | base | static occurrence |
| `from-brand/20` | base | static occurrence |
| `from-warning/20` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-11` | base | conditional or expression-derived |
| `items-start` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `leading-none` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `motion-border` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `p-4` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `relative` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shrink-0` | base | conditional or expression-derived |
| `text-3xl` | base | static occurrence |
| `text-brand` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-brand-3` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-warning` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-white/[0.04]` | base | conditional or expression-derived |
| `tracking-[0.16em]` | base | static occurrence |
| `truncate` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `w-11` | base | conditional or expression-derived |
| `z-10` | base | static occurrence |

Exact className combinations:

- `from-brand-2/20 text-brand-2`
- `from-brand-3/20 text-brand-3`
- `from-brand/20 text-brand`
- `from-warning/20 text-warning`
- `grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04]`
- `min-w-0`
- `motion-border p-4`
- `mt-3 font-mono text-3xl font-black leading-none`
- `relative z-10 flex items-start justify-between gap-3`
- `relative z-10 mt-5 truncate text-xs font-black text-muted`
- `truncate text-xs font-black uppercase tracking-[0.16em] text-muted`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04] ${accentClass}\``

### CSS variables

`--accent-border`

### Inline style expressions

Not found

### Referenced local/imported style declarations

Not found

### Referenced global custom CSS rules

```css
.motion-border {
position: relative;
  overflow: hidden;
}
```

```css
.motion-border::after {
position: absolute;
  inset: 1px;
  content: "";
  pointer-events: none;
  border-radius: inherit;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent) 0 0 / 220% 100%;
  opacity: 0;
  transition: opacity 220ms ease;
}
```

```css
.motion-border::before {
position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
  background:
    linear-gradient(90deg, transparent, var(--accent-border), transparent),
    linear-gradient(180deg, transparent, rgba(144, 91, 244, 0.28), transparent);
  opacity: 0;
  transition: opacity 220ms ease;
}
```

```css
.motion-border:hover::before, .motion-border:hover::after {
opacity: 1;
}
```

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

- Animation/transition tokens: `motion-border`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Not found.

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `LucideIcon`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: horizontal or mixed; verify each nested frame. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Warning, Success.
- Instance swaps: `LucideIcon`.
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
| □ | Warning | warning/amber/yellow signal |
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
| □ | Variant: accent=amber | Explicit props contract |
| □ | Variant: accent=cyan | Explicit props contract |
| □ | Variant: accent=green | Explicit props contract |
| □ | Variant: accent=violet | Explicit props contract |
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

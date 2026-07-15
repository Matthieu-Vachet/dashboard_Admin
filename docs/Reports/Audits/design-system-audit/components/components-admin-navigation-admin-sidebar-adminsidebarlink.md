---
id: MWI-COMP-123
component: "AdminSidebarLink"
category: "Layout / navigation"
status: internal
source: "src/components/admin/navigation/admin-sidebar.tsx"
lines: 190-254
figma_priority: 41
evidence: static_code
---

# AdminSidebarLink

## 1. Purpose

Layout / navigation component implemented in src/components/admin/navigation/admin-sidebar.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-123`.
- Location: `Dashboard Admin/src/components/admin/navigation/admin-sidebar.tsx`:190.
- File range: lines 190–254.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **41/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/link | Link | external package |
| framer-motion | motion | external package |
| @/constants/admin/navigation | NavItem | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| Not found | Not found | No resolved local child component |

Unresolved/external JSX tags: `Icon`, `Link`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-122 | [AdminSidebar](../components/components-admin-navigation-admin-sidebar-adminsidebar.md) (MWI-COMP-122) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Link aria-current={active ? "page" : undefined}>
  - <span />
  - <img />
  - <Icon />
  - <span>
  - <motion.span />

Unique HTML/React tags: `Icon`, `img`, `Link`, `motion.span`, `span`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| collapsed | Not found | See exact signature/contract below |
| item | Not found | See exact signature/contract below |
| navItems | Not found | See exact signature/contract below |
| onNavigate | Not found | See exact signature/contract below |
| pathname | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  collapsed,
  item,
  navItems,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  item: NavItem;
  navItems: NavItem[];
  pathname: string;
  onNavigate: () => void;
}
```

Exact local props contract when statically resolvable:

```tsx
{
  collapsed: boolean;
  item: NavItem;
  navItems: NavItem[];
  pathname: string;
  onNavigate: () => void;
}
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Loading, Warning, Success, Collapsed, Active, Inactive, Hidden.
- Text properties: `collapsed`, `item`, `navItems`, `onNavigate`, `pathname`.
- Instance swaps: Not found.
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
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Not found | Not found |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
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
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- Alignment utilities: `items-center, justify-center`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-bg` |
| Literal colors | `rgba(32,211,255,.3)`, `rgba(32,211,255,.55)`, `rgba(32,211,255,0.12)` |
| Spacing | `gap-2.5`, `inset-y-1`, `inset-y-2`, `left-1`, `px-0`, `px-3`, `right-2` |
| Sizing | `h-[22px]`, `min-h-10`, `w-[22px]`, `w-1`, `w-9` |
| Typography | `font-black`, `hover:text-foreground`, `text-amber-300`, `text-brand-2`, `text-cyan-300`, `text-emerald-300`, `text-foreground`, `text-fuchsia-300`, `text-lime-300`, `text-muted`, `text-orange-300`, `text-rose-300`, `text-sky-300`, `text-sm`, `text-teal-300`, `text-violet-300` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/35`, `border-transparent`, `hover:border-line` |
| Shadows/elevation | `drop-shadow-[0_0_12px_rgba(32,211,255,.3)]`, `drop-shadow-[0_0_14px_rgba(32,211,255,.55)]`, `shadow-[0_12px_36px_rgba(32,211,255,0.12)]` |
| Opacity | `group-hover:opacity-70`, `opacity-0`, `opacity-100` |
| Background | `bg-amber-400/12`, `bg-brand-2`, `bg-brand-2/12`, `bg-cyan-400/12`, `bg-emerald-400/12`, `bg-fuchsia-400/12`, `bg-lime-400/12`, `bg-orange-400/12`, `bg-rose-400/12`, `bg-sky-400/12`, `bg-teal-400/12`, `bg-violet-400/12`, `hover:bg-white/[0.055]` |
| Animation | `duration-300`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | conditional or expression-derived |
| `bg-amber-400/12` | base | static occurrence |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-brand-2/12` | base | conditional or expression-derived |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-fuchsia-400/12` | base | static occurrence |
| `bg-lime-400/12` | base | static occurrence |
| `bg-orange-400/12` | base | static occurrence |
| `bg-rose-400/12` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-teal-400/12` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `blur-sm` | base | conditional or expression-derived |
| `border` | base | conditional or expression-derived |
| `border-brand-2/35` | base | conditional or expression-derived |
| `border-transparent` | base | conditional or expression-derived |
| `dashboard-sidebar-link` | base | conditional or expression-derived |
| `drop-shadow-[0_0_12px_rgba(32,211,255,.3)]` | base | static occurrence |
| `drop-shadow-[0_0_14px_rgba(32,211,255,.55)]` | base | conditional or expression-derived |
| `duration-300` | base | conditional or expression-derived |
| `flex` | base | conditional or expression-derived |
| `font-black` | base | conditional or expression-derived |
| `gap-2.5` | base | conditional or expression-derived |
| `group-hover:-rotate-6` | group-hover | conditional or expression-derived |
| `group-hover:opacity-70` | group-hover | conditional or expression-derived |
| `group-hover:scale-125` | group-hover | conditional or expression-derived |
| `h-[22px]` | base | static occurrence |
| `hover:bg-white/[0.055]` | hover | conditional or expression-derived |
| `hover:border-line` | hover | conditional or expression-derived |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `inset-y-1` | base | conditional or expression-derived |
| `inset-y-2` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `justify-center` | base | conditional or expression-derived |
| `left-1` | base | conditional or expression-derived |
| `min-h-10` | base | conditional or expression-derived |
| `object-contain` | base | static occurrence |
| `opacity-0` | base | conditional or expression-derived |
| `opacity-100` | base | conditional or expression-derived |
| `overflow-hidden` | base | conditional or expression-derived |
| `px-0` | base | conditional or expression-derived |
| `px-3` | base | conditional or expression-derived |
| `relative` | base | conditional or expression-derived |
| `right-2` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_12px_36px_rgba(32,211,255,0.12)]` | base | conditional or expression-derived |
| `text-amber-300` | base | static occurrence |
| `text-brand-2` | base | conditional or expression-derived |
| `text-cyan-300` | base | static occurrence |
| `text-emerald-300` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-fuchsia-300` | base | static occurrence |
| `text-lime-300` | base | static occurrence |
| `text-muted` | base | conditional or expression-derived |
| `text-orange-300` | base | static occurrence |
| `text-rose-300` | base | static occurrence |
| `text-sky-300` | base | static occurrence |
| `text-sm` | base | conditional or expression-derived |
| `text-teal-300` | base | static occurrence |
| `text-violet-300` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `w-[22px]` | base | static occurrence |
| `w-1` | base | static occurrence |
| `w-9` | base | conditional or expression-derived |
| `z-10` | base | conditional or expression-derived |

Exact className combinations:

- `absolute inset-y-1 left-1 w-9 rounded-lg opacity-0 blur-sm transition duration-300 group-hover:opacity-70`
- `absolute inset-y-2 right-2 w-1 rounded-full bg-brand-2`
- `bg-amber-400/12`
- `bg-brand-2/12`
- `bg-cyan-400/12`
- `bg-emerald-400/12`
- `bg-fuchsia-400/12`
- `bg-lime-400/12`
- `bg-orange-400/12`
- `bg-rose-400/12`
- `bg-sky-400/12`
- `bg-teal-400/12`
- `bg-violet-400/12`
- `border-brand-2/35 bg-brand-2/12 text-foreground shadow-[0_12px_36px_rgba(32,211,255,0.12)]`
- `border-transparent text-muted hover:border-line hover:bg-white/[0.055] hover:text-foreground`
- `dashboard-sidebar-link group relative flex min-h-10 items-center gap-2.5 overflow-hidden rounded-lg border px-3 text-sm font-black transition`
- `justify-center px-0`
- `opacity-100`
- `relative z-10 h-[22px] w-[22px] object-contain drop-shadow-[0_0_12px_rgba(32,211,255,.3)] transition duration-300 group-hover:scale-125 group-hover:-rotate-6`
- `relative z-10 transition duration-300 group-hover:scale-125 group-hover:-rotate-6`
- `text-amber-300`
- `text-brand-2`
- `text-brand-2 drop-shadow-[0_0_14px_rgba(32,211,255,.55)]`
- `text-cyan-300`
- `text-emerald-300`
- `text-fuchsia-300`
- `text-lime-300`
- `text-orange-300`
- `text-rose-300`
- `text-sky-300`
- `text-teal-300`
- `text-violet-300`
- `truncate`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "absolute inset-y-1 left-1 w-9 rounded-lg opacity-0 blur-sm transition duration-300 group-hover:opacity-70", tone.glow, active && "opacity-100", )`
- `cn( "dashboard-sidebar-link group relative flex min-h-10 items-center gap-2.5 overflow-hidden rounded-lg border px-3 text-sm font-black transition", active ? "border-brand-2/35 bg-brand-2/12 text-foreground shadow-[0_12px_36px_rgba(32,211,255,0.12)]" : "border-transparent text-muted hover:border-line hover:bg-white/[0.055] hover:text-foreground", collapsed && "justify-center px-0", )`
- `cn( "relative z-10 transition duration-300 group-hover:scale-125 group-hover:-rotate-6", active ? "text-brand-2 drop-shadow-[0_0_14px_rgba(32,211,255,.55)]" : tone.icon, )`

### CSS variables

`--accent-bg`

### Inline style expressions

Not found

### Referenced local/imported style declarations

```tsx
src/components/admin/navigation/admin-sidebar.tsx#navToneClasses
navToneClasses = [
  { icon: "text-brand-2", glow: "bg-brand-2/12" },
  { icon: "text-sky-300", glow: "bg-sky-400/12" },
  { icon: "text-violet-300", glow: "bg-violet-400/12" },
  { icon: "text-emerald-300", glow: "bg-emerald-400/12" },
  { icon: "text-amber-300", glow: "bg-amber-400/12" },
  { icon: "text-lime-300", glow: "bg-lime-400/12" },
  { icon: "text-rose-300", glow: "bg-rose-400/12" },
  { icon: "text-cyan-300", glow: "bg-cyan-400/12" },
  { icon: "text-fuchsia-300", glow: "bg-fuchsia-400/12" },
  { icon: "text-orange-300", glow: "bg-orange-400/12" },
  { icon: "text-teal-300", glow: "bg-teal-400/12" },
] as const
```

### Referenced global custom CSS rules

```css
.light .dashboard-sidebar-link:hover {
background: var(--accent-bg);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: Not found.
- Responsive utilities: Not found.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-300`, `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-current={active ? "page" : undefined}`.
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
- Boolean properties: Hover, Loading, Warning, Success, Collapsed, Active, Inactive, Hidden.
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
| □ | Hover | hover utility or mouse-enter handler |
| — | Pressed | Not found |
| — | Focused | Not found |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| — | Disabled | Not found |
| — | Error | Not found |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
| □ | Collapsed | collapsed/closed signal |
| — | Expanded | Not found |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
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

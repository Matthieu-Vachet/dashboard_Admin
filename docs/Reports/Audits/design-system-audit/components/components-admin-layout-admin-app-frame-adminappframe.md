---
id: MWI-COMP-092
component: "AdminAppFrame"
category: "Layout / navigation"
status: exported
source: "src/components/admin/layout/admin-app-frame.tsx"
lines: 17-138
figma_priority: 52
evidence: static_code
---

# AdminAppFrame

## 1. Purpose

Layout / navigation component implemented in src/components/admin/layout/admin-app-frame.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-092`.
- Location: `Dashboard Admin/src/components/admin/layout/admin-app-frame.tsx`:17.
- File range: lines 17–138.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **52/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| framer-motion | AnimatePresence, motion | external package |
| next/navigation | usePathname | external package |
| react | useMemo, useState | external package |
| @/components/admin/shared/dashboard-footer | DashboardFooter | internal |
| @/data/app-version | DASHBOARD_VERSION | internal |
| @/constants/admin/navigation | navGroups, navItems | internal |
| @/components/admin/layout/admin-version-history-dialog | AdminVersionHistoryDialog | internal |
| @/components/admin/navigation/admin-sidebar | AdminSidebar | internal |
| @/components/admin/navigation/admin-topbar | AdminTopbar | internal |
| @/hooks/admin/use-dashboard-version-history | useDashboardVersionHistory | internal |
| @/lib/use-persistent-state | usePersistentState | internal |
| @/lib/cn | cn | internal |
| @/types/admin/dashboard | AdminFrameProps | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-094 | [AdminVersionHistoryDialog](../components/components-admin-layout-admin-version-history-dialog-adminversionhistorydialog.md) (MWI-COMP-094) | JSX/import relation |
| MWI-COMP-122 | [AdminSidebar](../components/components-admin-navigation-admin-sidebar-adminsidebar.md) (MWI-COMP-122) | JSX/import relation |
| MWI-COMP-124 | [AdminTopbar](../components/components-admin-navigation-admin-topbar-admintopbar.md) (MWI-COMP-124) | JSX/import relation |
| MWI-COMP-236 | [DashboardFooter](../components/components-admin-shared-dashboard-footer-dashboardfooter.md) (MWI-COMP-236) | JSX/import relation |

Unresolved/external JSX tags: `AnimatePresence`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-008 | [DashboardLayout](../components/app-dashboard-layout-dashboardlayout.md) (MWI-COMP-008) | Renders/imports this component |
| MWI-COMP-262 | [AppFrame](../components/components-dashboard-app-frame-appframe.md) (MWI-COMP-262) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <AdminSidebar />
- <div>
  - <a>
  - <div />
  - <div />
  - <div />
  - <div />
  - <aside>
  - <AnimatePresence>
    - <motion.div>
      - <motion.aside>
  - <div>
    - <AdminTopbar />
    - <main id="dashboard-content">
      - <DashboardFooter />
  - <AdminVersionHistoryDialog />

Unique HTML/React tags: `a`, `AdminSidebar`, `AdminTopbar`, `AdminVersionHistoryDialog`, `AnimatePresence`, `aside`, `DashboardFooter`, `div`, `main`, `motion.aside`, `motion.div`.

## 5. React structure and state management

- Hooks: `useDashboardVersionHistory`, `useMemo`, `usePathname`, `usePersistentState`, `useState`.
- Local state initializers: `collapsed = false`, `sidebarOpen = false`, `versionHistoryOpen = false`.
- Event handlers exposed in JSX: `onClick`, `onClose`, `onCloseMobile`, `onOpenSidebar`, `onOpenVersionHistory`, `onToggleCollapsed`, `onToggleNavGroup`, `onVersionClick`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| children | Not found | See exact signature/contract below |
| userEmail | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  children,
  userEmail,
}: AdminFrameProps
```

Exact local props contract when statically resolvable:

```tsx
AdminFrameProps
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Error, Warning, Success, Collapsed, Expanded, Hidden.
- Text properties: `children`, `userEmail`.
- Instance swaps: `/ui/matweb-innovation-letter-m3.png`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Not found | Not found |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Not found | Not found |
| Disabled | Not found | Not found |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Not found | Not found |
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Detected | expanded/open signal |
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
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Positioning utilities: `fixed, focus:fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`, `--foreground` |
| Literal colors | Not found |
| Spacing | `2xl:pl-[286px]`, `focus:left-4`, `focus:px-4`, `focus:py-2`, `focus:top-4`, `inset-0`, `inset-x-0`, `inset-y-0`, `left-0`, `lg:pl-[236px]`, `lg:pl-[84px]`, `lg:py-7`, `mx-auto`, `p-0`, `px-3`, `px-4`, `px-5`, `py-5`, `sm:px-6`, `top-0` |
| Sizing | `2xl:w-[286px]`, `h-10`, `h-full`, `h-px`, `max-w-[1680px]`, `min-h-10`, `min-h-12`, `min-h-9`, `min-h-screen`, `w-[236px]`, `w-[286px]`, `w-[84px]`, `w-1/3`, `w-10` |
| Typography | `focus:font-black`, `focus:text-slate-950`, `focus:text-sm`, `hover:text-foreground`, `text-amber-100`, `text-amber-300`, `text-brand-2`, `text-cyan-100`, `text-cyan-300`, `text-danger`, `text-emerald-100`, `text-emerald-300`, `text-foreground`, `text-fuchsia-300`, `text-lime-300`, `text-muted`, `text-orange-300`, `text-rose-100`, `text-rose-300`, `text-sky-300`, `text-sm`, `text-teal-300`, `text-violet-100`, `text-violet-300`, `text-white`, `text-xs` |
| Radius | `focus:rounded-lg` |
| Borders/strokes | `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-line`, `border-r`, `border-transparent`, `border-warning/35`, `hover:border-danger/50`, `hover:border-line-strong`, `outline-none` |
| Shadows/elevation | Not found |
| Opacity | `opacity-70` |
| Background | `backdrop-blur-2xl`, `backdrop-blur-sm`, `bg-amber-400/12`, `bg-black/60`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3/10`, `bg-brand/12`, `bg-cyan-400/12`, `bg-danger/12`, `bg-danger/15`, `bg-emerald-400/12`, `bg-fuchsia-400/12`, `bg-gradient-to-r`, `bg-lime-400/12`, `bg-orange-400/12`, `bg-rose-400/12`, `bg-sky-400/12`, `bg-teal-400/12`, `bg-transparent`, `bg-violet-400/12`, `bg-warning/12`, `bg-white/[0.06]`, `bg-white/[0.075]`, `focus:bg-brand-2`, `from-transparent`, `hover:bg-danger/20`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]`, `to-transparent`, `via-brand-2/70` |
| Animation | `duration-300`, `transition-[padding]`, `transition-[width]` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-left-1/3` | base | static occurrence |
| `2xl:pl-[286px]` | 2xl | conditional or expression-derived |
| `2xl:w-[286px]` | 2xl | conditional or expression-derived |
| `backdrop-blur-2xl` | base | conditional or expression-derived |
| `backdrop-blur-sm` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-black/60` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-fuchsia-400/12` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-lime-400/12` | base | static occurrence |
| `bg-orange-400/12` | base | static occurrence |
| `bg-rose-400/12` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-teal-400/12` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-line` | base | conditional or expression-derived |
| `border-r` | base | conditional or expression-derived |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `dashboard-sidebar` | base | conditional or expression-derived |
| `dashboard-sidebar-mobile` | base | static occurrence |
| `duration-300` | base | conditional or expression-derived |
| `energy-scan` | base | static occurrence |
| `fixed` | base | conditional or expression-derived |
| `focus:bg-brand-2` | focus | static occurrence |
| `focus:fixed` | focus | static occurrence |
| `focus:font-black` | focus | static occurrence |
| `focus:left-4` | focus | static occurrence |
| `focus:not-sr-only` | focus | static occurrence |
| `focus:px-4` | focus | static occurrence |
| `focus:py-2` | focus | static occurrence |
| `focus:rounded-lg` | focus | static occurrence |
| `focus:text-slate-950` | focus | static occurrence |
| `focus:text-sm` | focus | static occurrence |
| `focus:top-4` | focus | static occurrence |
| `focus:z-[200]` | focus | static occurrence |
| `from-transparent` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-full` | base | static occurrence |
| `h-px` | base | static occurrence |
| `hidden` | base | conditional or expression-derived |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | static occurrence |
| `inset-0` | base | static occurrence |
| `inset-x-0` | base | static occurrence |
| `inset-y-0` | base | conditional or expression-derived |
| `left-0` | base | conditional or expression-derived |
| `lg:block` | lg | conditional or expression-derived |
| `lg:hidden` | lg | static occurrence |
| `lg:pl-[236px]` | lg | conditional or expression-derived |
| `lg:pl-[84px]` | lg | conditional or expression-derived |
| `lg:py-7` | lg | static occurrence |
| `max-w-[1680px]` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-h-screen` | base | conditional or expression-derived |
| `mx-auto` | base | static occurrence |
| `opacity-70` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `p-0` | base | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `py-5` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `scanline-overlay` | base | static occurrence |
| `sm:px-6` | sm | static occurrence |
| `sr-only` | base | static occurrence |
| `studio-grid` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-300` | base | static occurrence |
| `text-brand-2` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-300` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-300` | base | static occurrence |
| `text-foreground` | base | static occurrence |
| `text-fuchsia-300` | base | static occurrence |
| `text-lime-300` | base | static occurrence |
| `text-muted` | base | static occurrence |
| `text-orange-300` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-rose-300` | base | static occurrence |
| `text-sky-300` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-teal-300` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-300` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-transparent` | base | static occurrence |
| `top-0` | base | static occurrence |
| `transition-[padding]` | base | conditional or expression-derived |
| `transition-[width]` | base | conditional or expression-derived |
| `via-brand-2/70` | base | static occurrence |
| `w-[236px]` | base | conditional or expression-derived |
| `w-[286px]` | base | conditional or expression-derived |
| `w-[84px]` | base | conditional or expression-derived |
| `w-1/3` | base | static occurrence |
| `w-10` | base | static occurrence |
| `z-10` | base | conditional or expression-derived |
| `z-40` | base | conditional or expression-derived |
| `z-50` | base | static occurrence |

Exact className combinations:

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
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden border-r border-line backdrop-blur-2xl transition-[width] duration-300 lg:block`
- `dashboard-sidebar-mobile h-full w-[286px] border-r border-line`
- `energy-scan pointer-events-none fixed inset-y-0 -left-1/3 w-1/3`
- `fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden`
- `h-10 w-10 p-0`
- `lg:pl-[236px] 2xl:pl-[286px]`
- `lg:pl-[84px]`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `mx-auto max-w-[1680px] px-4 py-5 outline-none sm:px-6 lg:py-7`
- `pointer-events-none fixed inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2/70 to-transparent`
- `relative min-h-screen overflow-hidden`
- `relative z-10 min-h-screen transition-[padding] duration-300`
- `scanline-overlay pointer-events-none fixed inset-0`
- `sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-brand-2 focus:px-4 focus:py-2 focus:text-sm focus:font-black focus:text-slate-950`
- `studio-grid pointer-events-none fixed inset-0 opacity-70`
- `text-amber-300`
- `text-brand-2`
- `text-cyan-300`
- `text-emerald-300`
- `text-fuchsia-300`
- `text-lime-300`
- `text-orange-300`
- `text-rose-300`
- `text-sky-300`
- `text-teal-300`
- `text-violet-300`
- `w-[236px] 2xl:w-[286px]`
- `w-[84px]`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "dashboard-sidebar fixed inset-y-0 left-0 z-40 hidden border-r border-line backdrop-blur-2xl transition-[width] duration-300 lg:block", collapsed ? "w-[84px]" : "w-[236px] 2xl:w-[286px]", )`
- `cn( "relative z-10 min-h-screen transition-[padding] duration-300", collapsed ? "lg:pl-[84px]" : "lg:pl-[236px] 2xl:pl-[286px]", )`

### CSS variables

`--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`, `--foreground`

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

```tsx
src/components/ui/button.tsx#sizes
sizes: Record<ButtonSize, string> = {
  sm: "min-h-9 px-3 text-xs",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-12 px-5 text-sm",
  icon: "h-10 w-10 p-0",
}
```

```tsx
src/components/ui/button.tsx#variants
variants: Record<ButtonVariant, string> = {
  primary:
    "dashboard-primary-button border-transparent text-white hover:brightness-110",
  secondary:
    "border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]",
  ghost: "border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground",
  danger:
    "border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20",
}
```

### Referenced global custom CSS rules

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

```css
.dashboard-sidebar {
background: rgba(6, 8, 18, 0.78);
  color: var(--foreground);
}
```

```css
.dashboard-sidebar-mobile {
background: rgba(6, 8, 18, 0.94);
  color: var(--foreground);
}
```

```css
.energy-scan {
animation: none;
}
```

```css
.energy-scan {
z-index: 0;
  background: linear-gradient(90deg, transparent, var(--accent-muted), transparent);
  transform: skewX(-14deg);
  mix-blend-mode: screen;
  animation: energy-scan 5.5s linear infinite;
  will-change: transform;
}
```

```css
.light .dashboard-sidebar {
background: linear-gradient(180deg, rgba(248, 252, 255, 0.96), rgba(239, 247, 255, 0.92));
  color: #0f172a;
  box-shadow: 18px 0 70px rgba(15, 23, 42, 0.08);
}
```

```css
.light .dashboard-sidebar-mobile {
background: rgba(246, 250, 255, 0.96);
  color: #0f172a;
  box-shadow: 18px 0 70px rgba(15, 23, 42, 0.14);
}
```

```css
.light .energy-scan {
background: linear-gradient(90deg, transparent, var(--accent-muted), transparent);
  mix-blend-mode: multiply;
  opacity: 0.5;
}
```

```css
.light .scanline-overlay {
background:
    repeating-linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.022) 0,
      rgba(15, 23, 42, 0.022) 1px,
      transparent 1px,
      transparent 6px
    );
  opacity: 0.2;
}
```

```css
.light .studio-grid {
background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 48%, var(--accent-muted) 49%, transparent 50% 100%);
  opacity: 0.46;
}
```

```css
.scanline-overlay {
z-index: 0;
  background:
    repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.025) 0,
      rgba(255, 255, 255, 0.025) 1px,
      transparent 1px,
      transparent 5px
    );
  opacity: 0.28;
}
```

```css
.studio-grid {
background-image:
    linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(120deg, transparent 0 48%, var(--accent-muted) 49%, transparent 50% 100%);
  background-size: 42px 42px;
  mask-image: linear-gradient(to bottom, black, transparent 78%);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `sm`.
- Responsive utilities: `2xl:pl-[286px]`, `2xl:w-[286px]`, `lg:block`, `lg:hidden`, `lg:pl-[236px]`, `lg:pl-[84px]`, `lg:py-7`, `sm:px-6`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-300`, `transition-[padding]`, `transition-[width]`.
- Animation libraries imported by file: framer-motion.
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
- Asset references: `/ui/matweb-innovation-letter-m3.png`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: Estimated from implementation. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Error, Warning, Success, Collapsed, Expanded, Hidden.
- Instance swaps: `/ui/matweb-innovation-letter-m3.png`.
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
| □ | Focused | focus styling or handler |
| — | Selected | Not found |
| — | Checked | Not found |
| — | Unchecked | Not found |
| — | Loading | Not found |
| — | Disabled | Not found |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| — | Empty | Not found |
| □ | Collapsed | collapsed/closed signal |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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

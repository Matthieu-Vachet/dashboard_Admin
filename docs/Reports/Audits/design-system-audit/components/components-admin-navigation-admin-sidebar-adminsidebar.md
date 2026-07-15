---
id: MWI-COMP-122
component: "AdminSidebar"
category: "Layout / navigation"
status: exported
source: "src/components/admin/navigation/admin-sidebar.tsx"
lines: 45-188
figma_priority: 49
evidence: static_code
---

# AdminSidebar

## 1. Purpose

Layout / navigation component implemented in src/components/admin/navigation/admin-sidebar.tsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-122`.
- Location: `Dashboard Admin/src/components/admin/navigation/admin-sidebar.tsx`:45.
- File range: lines 45–188.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **49/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| next/image | Image | external package |
| next/link | Link | external package |
| lucide-react | ChevronDown, LogOut, Settings, ShieldCheck, UserRound, X | icons |
| @/components/ui/badge | Badge | internal |
| @/components/ui/button | Button | internal |
| @/lib/cn | cn | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-123 | [AdminSidebarLink](../components/components-admin-navigation-admin-sidebar-adminsidebarlink.md) (MWI-COMP-123) | JSX/import relation |
| MWI-COMP-317 | [Badge](../components/components-ui-badge-badge.md) (MWI-COMP-317) | JSX/import relation |
| MWI-COMP-318 | [Button](../components/components-ui-button-button.md) (MWI-COMP-318) | JSX/import relation |

Unresolved/external JSX tags: `ChevronDown`, `Image`, `Link`, `LogOut`, `Settings`, `ShieldCheck`, `UserRound`, `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-092 | [AdminAppFrame](../components/components-admin-layout-admin-app-frame-adminappframe.md) (MWI-COMP-092) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <div>
  - <div>
    - <Link aria-label="Retour à l’accueil">
      - <span>
        - <Image />
      - <span>
        - <span>
        - <span>
    - <button aria-label="Fermer le menu">
      - <X />
  - <nav aria-label="Navigation dashboard">
    - <div>
      - <button aria-expanded={groupOpen}>
        - <span>
        - <ChevronDown />
      - <div />
      - <div>
        - <AdminSidebarLink />
  - <div>
    - <div>
      - <div>
        - <div>
          - <span>
            - <UserRound />
          - <Badge>
        - <span />
      - <p>
      - <div>
        - <Link>
          - <Settings />
        - <Link>
          - <ShieldCheck />
    - <form>
      - <Button aria-label="Déconnexion">

Unique HTML/React tags: `AdminSidebarLink`, `Badge`, `button`, `Button`, `ChevronDown`, `div`, `form`, `Image`, `Link`, `LogOut`, `nav`, `p`, `Settings`, `ShieldCheck`, `span`, `UserRound`, `X`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`, `onNavigate`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| brandLogo | Not found | See exact signature/contract below |
| collapsed | Not found | See exact signature/contract below |
| navGroups | Not found | See exact signature/contract below |
| navItems | Not found | See exact signature/contract below |
| onCloseMobile | Not found | See exact signature/contract below |
| onToggleNavGroup | Not found | See exact signature/contract below |
| openNavGroups | Not found | See exact signature/contract below |
| pathname | Not found | See exact signature/contract below |
| userEmail | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{
  brandLogo,
  collapsed,
  navGroups,
  navItems,
  openNavGroups,
  pathname,
  userEmail,
  onCloseMobile,
  onToggleNavGroup,
}: AdminSidebarProps
```

Exact local props contract when statically resolvable:

```tsx
type AdminSidebarProps = {
  brandLogo: string;
  collapsed: boolean;
  navGroups: NavGroup[];
  navItems: NavItem[];
  openNavGroups: string[];
  pathname: string;
  userEmail: string;
  onCloseMobile: () => void;
  onToggleNavGroup: (groupId: string) => void;
};
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Error, Warning, Success, Collapsed, Expanded, Hidden, Scrollable.
- Text properties: `brandLogo`, `collapsed`, `navGroups`, `navItems`, `onCloseMobile`, `onToggleNavGroup`, `openNavGroups`, `pathname`, `userEmail`.
- Instance swaps: `ChevronDown`, `LogOut`, `Settings`, `ShieldCheck`, `UserRound`, `X`.
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
| Collapsed | Detected | collapsed/closed signal |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Not found | Not found |
| Inactive | Not found | Not found |
| Read Only | Not found | Not found |
| Hidden | Detected | hidden/invisible signal |
| Visible | Detected | Rendered state |
| Scrollable | Detected | overflow scrolling utility |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, items-start, justify-between, justify-center, place-items-center`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary` |
| Literal colors | `rgba(32,211,255,0.22)`, `rgba(88,242,169,0.7)` |
| Spacing | `gap-1.5`, `gap-2`, `gap-3`, `mb-2`, `mt-1`, `mt-3`, `mx-auto`, `my-1`, `p-0`, `p-0.5`, `p-3`, `px-0`, `px-2`, `px-2.5`, `px-3`, `px-4`, `px-5`, `space-y-0.5`, `space-y-2`, `space-y-3` |
| Sizing | `2xl:max-w-none`, `h-10`, `h-12`, `h-2.5`, `h-20`, `h-9`, `h-full`, `h-px`, `max-h-full`, `max-w-[8.1rem]`, `max-w-full`, `min-h-10`, `min-h-12`, `min-h-9`, `min-w-0`, `w-10`, `w-12`, `w-14`, `w-2.5`, `w-8`, `w-9`, `w-full` |
| Typography | `2xl:text-sm`, `2xl:text-xs`, `font-black`, `font-bold`, `hover:text-foreground`, `leading-tight`, `text-[0.65rem]`, `text-[0.68rem]`, `text-[0.8rem]`, `text-amber-100`, `text-amber-300`, `text-brand-2`, `text-cyan-100`, `text-cyan-300`, `text-danger`, `text-emerald-100`, `text-emerald-300`, `text-foreground`, `text-fuchsia-300`, `text-left`, `text-lime-300`, `text-muted`, `text-orange-300`, `text-rose-100`, `text-rose-300`, `text-sky-300`, `text-sm`, `text-teal-300`, `text-violet-100`, `text-violet-300`, `text-white`, `text-xs`, `tracking-[0.18em]`, `uppercase` |
| Radius | `rounded-full`, `rounded-lg` |
| Borders/strokes | `border`, `border-brand-2/30`, `border-brand-3/30`, `border-brand/30`, `border-danger/30`, `border-danger/35`, `border-emerald-300/18`, `border-line`, `border-transparent`, `border-warning/35`, `border-white/10`, `hover:border-cyan-200/35`, `hover:border-danger/50`, `hover:border-emerald-200/35`, `hover:border-line-strong` |
| Shadows/elevation | `drop-shadow-[0_0_18px_rgba(32,211,255,0.22)]`, `shadow-[0_0_24px_rgba(88,242,169,0.7)]` |
| Opacity | `opacity-95` |
| Background | `bg-amber-400/12`, `bg-brand-2/10`, `bg-brand-2/12`, `bg-brand-3`, `bg-brand-3/10`, `bg-brand/12`, `bg-cyan-400/12`, `bg-danger/12`, `bg-danger/15`, `bg-emerald-400/10`, `bg-emerald-400/12`, `bg-fuchsia-400/12`, `bg-lime-400/12`, `bg-line`, `bg-orange-400/12`, `bg-rose-400/12`, `bg-sky-400/12`, `bg-teal-400/12`, `bg-transparent`, `bg-violet-400/12`, `bg-warning/12`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `hover:bg-cyan-400/10`, `hover:bg-danger/20`, `hover:bg-emerald-400/16`, `hover:bg-white/[0.045]`, `hover:bg-white/[0.07]`, `hover:bg-white/[0.08]`, `hover:bg-white/[0.11]` |
| Animation | `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `2xl:max-w-none` | 2xl | static occurrence |
| `2xl:text-sm` | 2xl | static occurrence |
| `2xl:text-xs` | 2xl | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-brand-2/10` | base | static occurrence |
| `bg-brand-2/12` | base | static occurrence |
| `bg-brand-3` | base | static occurrence |
| `bg-brand-3/10` | base | static occurrence |
| `bg-brand/12` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-danger/12` | base | static occurrence |
| `bg-danger/15` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-fuchsia-400/12` | base | static occurrence |
| `bg-lime-400/12` | base | static occurrence |
| `bg-line` | base | static occurrence |
| `bg-orange-400/12` | base | static occurrence |
| `bg-rose-400/12` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-teal-400/12` | base | static occurrence |
| `bg-transparent` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-warning/12` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-brand-2/30` | base | static occurrence |
| `border-brand-3/30` | base | static occurrence |
| `border-brand/30` | base | static occurrence |
| `border-danger/30` | base | static occurrence |
| `border-danger/35` | base | static occurrence |
| `border-emerald-300/18` | base | static occurrence |
| `border-line` | base | static occurrence |
| `border-transparent` | base | static occurrence |
| `border-warning/35` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `contrast-125` | base | static occurrence |
| `dashboard-account-zone` | base | static occurrence |
| `dashboard-primary-button` | base | static occurrence |
| `dashboard-sidebar-group` | base | static occurrence |
| `drop-shadow-[0_0_18px_rgba(32,211,255,0.22)]` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `gap-1.5` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `grid-cols-2` | base | static occurrence |
| `h-10` | base | static occurrence |
| `h-12` | base | conditional or expression-derived |
| `h-2.5` | base | static occurrence |
| `h-20` | base | static occurrence |
| `h-9` | base | conditional or expression-derived |
| `h-full` | base | static occurrence |
| `h-px` | base | static occurrence |
| `hover:bg-cyan-400/10` | hover | static occurrence |
| `hover:bg-danger/20` | hover | static occurrence |
| `hover:bg-emerald-400/16` | hover | static occurrence |
| `hover:bg-white/[0.045]` | hover | conditional or expression-derived |
| `hover:bg-white/[0.07]` | hover | static occurrence |
| `hover:bg-white/[0.08]` | hover | static occurrence |
| `hover:bg-white/[0.11]` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | static occurrence |
| `hover:border-danger/50` | hover | static occurrence |
| `hover:border-emerald-200/35` | hover | static occurrence |
| `hover:border-line-strong` | hover | static occurrence |
| `hover:brightness-110` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `inline-flex` | base | static occurrence |
| `items-center` | base | conditional or expression-derived |
| `items-start` | base | static occurrence |
| `justify-between` | base | conditional or expression-derived |
| `justify-center` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `lg:hidden` | lg | static occurrence |
| `max-h-full` | base | static occurrence |
| `max-w-[8.1rem]` | base | static occurrence |
| `max-w-full` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `min-h-10` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | conditional or expression-derived |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mx-auto` | base | static occurrence |
| `my-1` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `opacity-95` | base | static occurrence |
| `overflow-y-auto` | base | static occurrence |
| `p-0` | base | conditional or expression-derived |
| `p-0.5` | base | conditional or expression-derived |
| `p-3` | base | static occurrence |
| `place-items-center` | base | conditional or expression-derived |
| `px-0` | base | conditional or expression-derived |
| `px-2` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `px-5` | base | static occurrence |
| `rotate-180` | base | conditional or expression-derived |
| `rounded-full` | base | static occurrence |
| `rounded-lg` | base | conditional or expression-derived |
| `shadow-[0_0_24px_rgba(88,242,169,0.7)]` | base | static occurrence |
| `shrink-0` | base | conditional or expression-derived |
| `space-y-0.5` | base | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `text-[0.65rem]` | base | static occurrence |
| `text-[0.68rem]` | base | conditional or expression-derived |
| `text-[0.8rem]` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-300` | base | static occurrence |
| `text-brand-2` | base | conditional or expression-derived |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-300` | base | static occurrence |
| `text-danger` | base | static occurrence |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-300` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-fuchsia-300` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-lime-300` | base | static occurrence |
| `text-muted` | base | conditional or expression-derived |
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
| `tracking-[0.18em]` | base | conditional or expression-derived |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `uppercase` | base | conditional or expression-derived |
| `w-10` | base | static occurrence |
| `w-12` | base | conditional or expression-derived |
| `w-14` | base | conditional or expression-derived |
| `w-2.5` | base | static occurrence |
| `w-8` | base | static occurrence |
| `w-9` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |

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
- `block max-w-[8.1rem] text-[0.8rem] font-black leading-tight 2xl:max-w-none 2xl:text-sm`
- `block truncate text-[0.68rem] font-bold text-muted 2xl:text-xs`
- `border-brand-2/30 bg-brand-2/10 text-cyan-100`
- `border-brand-3/30 bg-brand-3/10 text-emerald-100`
- `border-brand/30 bg-brand/12 text-violet-100`
- `border-danger/30 bg-danger/15 text-danger hover:border-danger/50 hover:bg-danger/20`
- `border-danger/35 bg-danger/12 text-rose-100`
- `border-line bg-white/[0.06] text-muted`
- `border-line bg-white/[0.075] text-foreground hover:border-line-strong hover:bg-white/[0.11]`
- `border-transparent bg-transparent text-muted hover:bg-white/[0.08] hover:text-foreground`
- `border-warning/35 bg-warning/12 text-amber-100`
- `dashboard-account-zone rounded-lg border border-line p-3`
- `dashboard-primary-button border-transparent text-white hover:brightness-110`
- `dashboard-sidebar-group rounded-lg border border-transparent`
- `flex h-20 items-center justify-between px-4`
- `flex h-full flex-col`
- `flex items-start justify-between gap-3`
- `flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-[0.68rem] font-black uppercase tracking-[0.18em] transition`
- `flex min-w-0 items-center gap-3`
- `flex-1 space-y-2 overflow-y-auto px-2.5`
- `grid h-12 shrink-0 place-items-center rounded-lg p-0.5`
- `grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-white/[0.07] hover:text-foreground lg:hidden`
- `h-10 w-10 p-0`
- `inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-300/18 bg-emerald-400/10 px-2 text-[0.68rem] font-black text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-400/16`
- `inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.055] px-2 text-[0.68rem] font-black text-foreground transition hover:border-cyan-200/35 hover:bg-cyan-400/10`
- `max-h-full max-w-full object-contain opacity-95 contrast-125 drop-shadow-[0_0_18px_rgba(32,211,255,0.22)]`
- `mb-2 flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-muted`
- `min-h-10 px-4 text-sm`
- `min-h-12 px-5 text-sm`
- `min-h-9 px-3 text-xs`
- `min-w-0`
- `min-w-0 leading-tight`
- `mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-3 shadow-[0_0_24px_rgba(88,242,169,0.7)]`
- `mt-3 grid grid-cols-2 gap-2`
- `mt-3 truncate text-xs font-bold text-muted`
- `mx-auto my-1 h-px w-8 bg-line`
- `px-0`
- `rotate-180`
- `space-y-0.5`
- `space-y-3 p-3`
- `text-amber-300`
- `text-brand-2`
- `text-cyan-300`
- `text-emerald-300`
- `text-fuchsia-300`
- `text-lime-300`
- `text-muted hover:bg-white/[0.045] hover:text-foreground`
- `text-orange-300`
- `text-rose-300`
- `text-sky-300`
- `text-teal-300`
- `text-violet-300`
- `transition`
- `truncate`
- `w-12`
- `w-14`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `cn( "flex min-h-9 w-full items-center justify-between gap-2 rounded-lg px-3 text-left text-[0.68rem] font-black uppercase tracking-[0.18em] transition", groupActive ? "text-brand-2" : "text-muted hover:bg-white/[0.045] hover:text-foreground", )`
- `cn( "grid h-12 shrink-0 place-items-center rounded-lg p-0.5", collapsed ? "w-12" : "w-14", )`
- `cn("transition", groupOpen && "rotate-180")`
- `cn("w-full", collapsed && "px-0")`

### CSS variables

`--accent-muted`, `--accent-primary`, `--accent-rgb`, `--accent-secondary`, `--accent-tertiary`

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
.dashboard-account-zone {
background:
    radial-gradient(circle at 12% 0%, var(--accent-muted), transparent 42%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.065), rgba(15, 23, 42, 0.3));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 16px 46px rgba(0, 0, 0, 0.18);
}
```

```css
.dashboard-primary-button {
background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary));
  box-shadow: 0 16px 42px rgb(var(--accent-rgb) / 0.2);
}
```

```css
.light .dashboard-account-zone {
background:
    radial-gradient(circle at 12% 0%, var(--accent-muted), transparent 42%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(240, 247, 255, 0.72));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 16px 46px rgba(15, 23, 42, 0.09);
}
```

```css
.light .dashboard-sidebar-group {
background: rgba(255, 255, 255, 0.24);
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`.
- Responsive utilities: `2xl:max-w-none`, `2xl:text-sm`, `2xl:text-xs`, `lg:hidden`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `transition`.
- Animation libraries imported by file: framer-motion.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-expanded={groupOpen}`, `aria-label="Déconnexion"`, `aria-label="Fermer le menu"`, `aria-label="Navigation dashboard"`, `aria-label="Retour à l’accueil"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `ChevronDown`, `LogOut`, `Settings`, `ShieldCheck`, `UserRound`, `X`.
- Asset references: Not found.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Error, Warning, Success, Collapsed, Expanded, Hidden, Scrollable.
- Instance swaps: `ChevronDown`, `LogOut`, `Settings`, `ShieldCheck`, `UserRound`, `X`.
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
| □ | Collapsed | collapsed/closed signal |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| — | Active | Not found |
| — | Inactive | Not found |
| — | Read Only | Not found |
| □ | Hidden | hidden/invisible signal |
| □ | Visible | Rendered state |
| □ | Scrollable | overflow scrolling utility |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |

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

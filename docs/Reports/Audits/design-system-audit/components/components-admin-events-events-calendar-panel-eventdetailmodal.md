---
id: MWI-COMP-064
component: "EventDetailModal"
category: "Events internal"
status: internal
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 1308-1445
figma_priority: 18
evidence: static_code
---

# EventDetailModal

## 1. Purpose

Events internal component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-064`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:1308.
- File range: lines 1308–1445.
- Definition kind: function.
- Export status: internal to the source module.
- Compatibility target: Not found.
- Figma recreation priority: **18/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| lucide-react | Archive, Copy, ExternalLink, Pencil, Trash2, X | icons |
| @/components/admin/shared/modal-portal | ModalPortal | internal |
| @/data/pokemon-events | POKEMON_EVENT_STATUS_LABELS | internal |
| @/components/admin/pokemon/admin-ui | primaryButtonClass, buttonClass | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-050 | [EventBannerImage](../components/components-admin-events-events-calendar-panel-eventbannerimage.md) (MWI-COMP-050) | JSX/import relation |
| MWI-COMP-062 | [EventBadge](../components/components-admin-events-events-calendar-panel-eventbadge.md) (MWI-COMP-062) | JSX/import relation |
| MWI-COMP-063 | [DetailSection](../components/components-admin-events-events-calendar-panel-detailsection.md) (MWI-COMP-063) | JSX/import relation |
| MWI-COMP-066 | [EventPokemonGroups](../components/components-admin-events-events-calendar-panel-eventpokemongroups.md) (MWI-COMP-066) | JSX/import relation |
| MWI-COMP-068 | [EventScrapedSectionGroup](../components/components-admin-events-events-calendar-panel-eventscrapedsectiongroup.md) (MWI-COMP-068) | JSX/import relation |
| MWI-COMP-070 | [RewardGrid](../components/components-admin-events-events-calendar-panel-rewardgrid.md) (MWI-COMP-070) | JSX/import relation |
| MWI-COMP-071 | [RawEventInfo](../components/components-admin-events-events-calendar-panel-raweventinfo.md) (MWI-COMP-071) | JSX/import relation |
| MWI-COMP-072 | [DetailList](../components/components-admin-events-events-calendar-panel-detaillist.md) (MWI-COMP-072) | JSX/import relation |

Unresolved/external JSX tags: `Archive`, `Copy`, `ExternalLink`, `ModalPortal`, `Pencil`, `Trash2`, `X`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-051 | [EventsCalendarPanel](../components/components-admin-events-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-051) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <ModalPortal>
  - <div>
    - <article role="dialog" aria-modal="true" aria-label={`Détail event ${event.title}`}>
      - <header>
        - <div />
        - <div>
          - <div>
            - <span>
              - <img />
            - <h2>
            - <p>
            - <p>
            - <div>
              - <EventBadge />
              - <EventBadge />
              - <EventBadge />
          - <button>
            - <X />
      - <div>
        - <div>
          - <EventBadge />
          - <EventBadge />
          - <EventBadge />
          - <EventBadge />
          - <EventBadge />
        - <DetailSection>
          - <div>
            - <p>
            - <EventBannerImage />
        - <EventPokemonGroups />
        - <div>
          - <DetailList />
          - <RewardGrid />
        - <EventScrapedSectionGroup />
        - <RawEventInfo />
        - <DetailSection>
          - <div>
            - <a>
              - <ExternalLink />
              - <span>
            - <p>
        - <div>
          - <button>
            - <Copy />
          - <button>
            - <Archive />
          - <button>
            - <Archive />
          - <button>
            - <Trash2 />
          - <button>
            - <Pencil />

Unique HTML/React tags: `a`, `Archive`, `article`, `button`, `Copy`, `DetailList`, `DetailSection`, `div`, `EventBadge`, `EventBannerImage`, `EventPokemonGroups`, `EventScrapedSectionGroup`, `ExternalLink`, `h2`, `header`, `img`, `ModalPortal`, `p`, `Pencil`, `RawEventInfo`, `RewardGrid`, `span`, `Trash2`, `X`.

## 5. React structure and state management

- Hooks: Not found.
- Local state initializers: Not found.
- Event handlers exposed in JSX: `onClick`, `onOpenPokemon`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| busy | Not found | See exact signature/contract below |
| event | Not found | See exact signature/contract below |
| onArchive | Not found | See exact signature/contract below |
| onClose | Not found | See exact signature/contract below |
| onDelete | Not found | See exact signature/contract below |
| onDuplicate | Not found | See exact signature/contract below |
| onEdit | Not found | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |
| onRestore | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ event, busy, onClose, onEdit, onDuplicate, onArchive, onRestore, onDelete, onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Disabled, Success, Empty, Scrollable.
- Text properties: `busy`, `event`, `onArchive`, `onClose`, `onDelete`, `onDuplicate`, `onEdit`, `onOpenPokemon`, `onRestore`.
- Instance swaps: `Archive`, `Copy`, `ExternalLink`, `Pencil`, `Trash2`, `X`, `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
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
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Not found | Not found |
| Warning | Not found | Not found |
| Success | Detected | success/green signal |
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

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Not found.
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `items-center, justify-center, justify-end, lg:items-start, lg:justify-between, place-items-center`.
- Positioning utilities: `absolute, fixed, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow`, `--accent-muted`, `--foreground`, `--line`, `--line-strong`, `--muted` |
| Literal colors | `#07111f`, `#22c55e`, `#22d3ee`, `#38bdf8`, `#64748b`, `#94a3b8`, `#a855f7`, `#ef4444`, `#f59e0b`, `rgba(0,0,0,.58)`, `rgba(14,165,233,.26)`, `rgba(2,6,23,.90)`, `rgba(255,255,255,0.05)` |
| Spacing | `gap-2`, `gap-4`, `gap-5`, `inset-0`, `mt-1`, `mt-3`, `mt-4`, `p-3`, `p-4`, `p-5`, `px-3`, `px-4`, `py-1`, `py-2`, `py-3`, `sm:p-5`, `sm:p-6`, `sm:p-7`, `space-y-5` |
| Sizing | `h-12`, `h-5`, `max-h-[94dvh]`, `max-h-44`, `max-w-4xl`, `max-w-6xl`, `min-h-0`, `min-h-11`, `min-w-0`, `w-12`, `w-5`, `w-full` |
| Typography | `font-black`, `font-bold`, `font-semibold`, `leading-7`, `leading-tight`, `sm:text-5xl`, `sm:text-base`, `text-3xl`, `text-cyan-100`, `text-cyan-50`, `text-emerald-200`, `text-slate-200`, `text-slate-300`, `text-slate-500`, `text-sm`, `text-white`, `text-xs`, `tracking-tight` |
| Radius | `rounded-[2rem]`, `rounded-2xl`, `rounded-full`, `rounded-t-[2rem]`, `rounded-xl` |
| Borders/strokes | `border`, `border-b`, `border-cyan-200/20`, `border-white/10`, `hover:border-cyan-200/50` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_30px_120px_rgba(0,0,0,.58)]`, `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-[#07111f]`, `bg-gradient-to-r`, `bg-slate-950/35`, `bg-slate-950/40`, `bg-slate-950/42`, `bg-slate-950/45`, `bg-slate-950/55`, `bg-slate-950/84`, `bg-white/[0.075]`, `bg-white/10`, `from-sky-500`, `hover:bg-cyan-300/10`, `hover:bg-cyan-400/15`, `hover:bg-white/20`, `to-cyan-400` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `absolute` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-[#07111f]` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/42` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-slate-950/55` | base | static occurrence |
| `bg-slate-950/84` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `border` | base | static occurrence |
| `border-b` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `event-detail-modal` | base | static occurrence |
| `event-detail-modal-body` | base | static occurrence |
| `event-detail-overlay` | base | static occurrence |
| `fixed` | base | static occurrence |
| `flex` | base | static occurrence |
| `flex-1` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `font-black` | base | static occurrence |
| `font-bold` | base | static occurrence |
| `font-semibold` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-4` | base | conditional or expression-derived |
| `gap-5` | base | static occurrence |
| `grid` | base | conditional or expression-derived |
| `h-12` | base | static occurrence |
| `h-5` | base | static occurrence |
| `hover:bg-cyan-300/10` | hover | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:bg-white/20` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | static occurrence |
| `italic` | base | static occurrence |
| `items-center` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `justify-end` | base | static occurrence |
| `leading-7` | base | static occurrence |
| `leading-tight` | base | static occurrence |
| `lg:flex-row` | lg | static occurrence |
| `lg:grid-cols-[minmax(0,1fr)_260px]` | lg | conditional or expression-derived |
| `lg:grid-cols-2` | lg | static occurrence |
| `lg:items-start` | lg | static occurrence |
| `lg:justify-between` | lg | static occurrence |
| `max-h-[94dvh]` | base | static occurrence |
| `max-h-44` | base | static occurrence |
| `max-w-4xl` | base | static occurrence |
| `max-w-6xl` | base | static occurrence |
| `min-h-0` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `object-cover` | base | static occurrence |
| `overflow-hidden` | base | static occurrence |
| `overflow-y-auto` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | conditional or expression-derived |
| `p-5` | base | static occurrence |
| `place-items-center` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | static occurrence |
| `py-1` | base | static occurrence |
| `py-2` | base | static occurrence |
| `py-3` | base | static occurrence |
| `relative` | base | static occurrence |
| `rounded-[2rem]` | base | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-full` | base | static occurrence |
| `rounded-t-[2rem]` | base | static occurrence |
| `rounded-xl` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_30px_120px_rgba(0,0,0,.58)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]` | base | static occurrence |
| `shrink-0` | base | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:p-6` | sm | static occurrence |
| `sm:p-7` | sm | static occurrence |
| `sm:text-5xl` | sm | static occurrence |
| `sm:text-base` | sm | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-50` | base | static occurrence |
| `text-emerald-200` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `transition` | base | static occurrence |
| `truncate` | base | static occurrence |
| `w-12` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-full` | base | static occurrence |
| `z-[1200]` | base | static occurrence |

Exact className combinations:

- `absolute inset-0 bg-slate-950/45`
- `event-detail-modal flex max-h-[94dvh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f] shadow-[0_30px_120px_rgba(0,0,0,.58)]`
- `event-detail-modal-body min-h-0 flex-1 space-y-5 overflow-y-auto p-4 sm:p-6`
- `event-detail-overlay fixed inset-0 z-[1200] grid place-items-center overflow-y-auto bg-slate-950/84 p-3 backdrop-blur-xl sm:p-5`
- `flex flex-wrap gap-2`
- `flex flex-wrap justify-end gap-2 rounded-2xl border border-white/10 bg-slate-950/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]`
- `grid gap-2 sm:grid-cols-2`
- `grid gap-4`
- `grid gap-4 lg:grid-cols-2`
- `grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-white/10 text-white hover:bg-white/20`
- `h-5 w-5 object-contain`
- `inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/55 px-3 py-1 text-xs font-black text-cyan-50`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-bold text-cyan-100 hover:bg-cyan-300/10`
- `lg:grid-cols-[minmax(0,1fr)_260px]`
- `max-h-44 w-full rounded-xl border border-white/10 bg-slate-950/35 object-cover`
- `min-w-0`
- `mt-1 text-sm font-black italic text-emerald-200`
- `mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl`
- `mt-3 text-sm font-bold text-slate-200 sm:text-base`
- `mt-4 flex flex-wrap gap-2`
- `relative flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between`
- `relative shrink-0 overflow-hidden rounded-t-[2rem] border-b border-cyan-200/20 p-5 sm:p-7`
- `rounded-xl border border-white/10 bg-slate-950/42 px-4 py-3 text-sm font-semibold leading-7 text-slate-300`
- `text-sm font-bold text-slate-500`
- `truncate`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`grid gap-4 ${banner ? "lg:grid-cols-[minmax(0,1fr)_260px]" : ""}\``
- `buttonClass`
- `primaryButtonClass`

### CSS variables

`--accent-glow`, `--accent-muted`, `--foreground`, `--line`, `--line-strong`, `--muted`

### Inline style expressions

- `{{ backgroundImage: \`linear-gradient(135deg, ${hexToRgba(type.color, 0.24)}, rgba(2,6,23,.90)), url("/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png")\`, backgroundSize: "cover", backgroundPosition: "center", }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/events/events-calendar-panel.jsx#modalToneMap
modalToneMap = {
  dates: { color: "#22d3ee", icon: CalendarDays },
  summary: { color: "#38bdf8", icon: Sparkles },
  pokemon: { color: "#38bdf8", icon: Sparkles },
  bonus: { color: "#22c55e", icon: Sparkles },
  rewards: { color: "#f59e0b", icon: Download },
  raids: { color: "#ef4444", icon: Archive },
  research: { color: "#a855f7", icon: Search },
  source: { color: "#94a3b8", icon: ExternalLink },
  neutral: { color: "#64748b", icon: FileJson },
}
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#buttonClass
buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

### Referenced global custom CSS rules

```css
.light .event-detail-modal-body [class*="bg-slate-950/"], .light .event-detail-modal-body [class*="bg-white/["], .light .pokemon-detail-modal-body [class*="bg-slate-950/"], .light .pokemon-detail-modal-body [class*="bg-white/["] {
background-color: rgba(255, 255, 255, 0.82) !important;
}
```

```css
.light .event-detail-modal-body [class*="border-white/"], .light .pokemon-detail-modal-body [class*="border-white/"] {
border-color: var(--line) !important;
}
```

```css
.light .event-detail-modal-body [class*="text-white"], .light .event-detail-modal-body [class*="text-slate-100"], .light .event-detail-modal-body [class*="text-slate-200"], .light .event-detail-modal-body [class*="text-cyan-50"], .light .event-detail-modal-body [class*="text-cyan-100"], .light .event-detail-modal-body [class*="text-emerald-100"], .light .event-detail-modal-body [class*="text-violet-100"], .light .event-detail-modal-body [class*="text-amber-100"], .light .event-detail-modal-body [class*="text-rose-100"], .light .pokemon-detail-modal-body [class*="text-white"], .light .pokemon-detail-modal-body [class*="text-slate-100"], .light .pokemon-detail-modal-body [class*="text-slate-200"], .light .pokemon-detail-modal-body [class*="text-cyan-50"], .light .pokemon-detail-modal-body [class*="text-cyan-100"], .light .pokemon-detail-modal-body [class*="text-emerald-100"], .light .pokemon-detail-modal-body [class*="text-violet-100"], .light .pokemon-detail-modal-body [class*="text-amber-100"], .light .pokemon-detail-modal-body [class*="text-rose-100"] {
color: var(--foreground) !important;
}
```

```css
.light .event-detail-modal-body [class*="text-white/"], .light .event-detail-modal-body [class*="text-slate-300"], .light .event-detail-modal-body [class*="text-slate-400"], .light .event-detail-modal-body [class*="text-slate-500"], .light .pokemon-detail-modal-body [class*="text-white/"], .light .pokemon-detail-modal-body [class*="text-slate-300"], .light .pokemon-detail-modal-body [class*="text-slate-400"], .light .pokemon-detail-modal-body [class*="text-slate-500"] {
color: var(--muted) !important;
}
```

```css
.light .event-detail-modal-body, .light .pokemon-detail-modal-body {
background:
    linear-gradient(rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.035) 1px, transparent 1px),
    radial-gradient(circle at 8% 0%, var(--accent-muted), transparent 32%),
    rgba(248, 252, 255, 0.94) !important;
  color: var(--foreground);
}
```

```css
.light .event-detail-modal, .light .pokemon-detail-modal {
border-color: var(--line-strong) !important;
  background:
    radial-gradient(circle at 12% 0%, var(--accent-glow), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(236, 246, 255, 0.96)) !important;
  color: var(--foreground) !important;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.92),
    0 30px 110px rgba(15, 23, 42, 0.26) !important;
}
```

```css
.light .event-detail-overlay, .light .pokemon-modal-overlay {
background: rgba(15, 23, 42, 0.3) !important;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`hover:`

## 13. Responsive behavior

- Breakpoints used: `lg`, `sm`.
- Responsive utilities: `lg:flex-row`, `lg:grid-cols-[minmax(0,1fr)_260px]`, `lg:grid-cols-2`, `lg:items-start`, `lg:justify-between`, `sm:grid-cols-2`, `sm:p-5`, `sm:p-6`, `sm:p-7`, `sm:text-5xl`, `sm:text-base`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label={\`Détail event ${event.title}\`}`, `aria-modal="true"`.
- Roles: `role="dialog"`.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Archive`, `Copy`, `ExternalLink`, `Pencil`, `Trash2`, `X`.
- Asset references: `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Disabled, Success, Empty, Scrollable.
- Instance swaps: `Archive`, `Copy`, `ExternalLink`, `Pencil`, `Trash2`, `X`, `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
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
| □ | Disabled | disabled prop, attribute, or class |
| — | Error | Not found |
| — | Warning | Not found |
| □ | Success | success/green signal |
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

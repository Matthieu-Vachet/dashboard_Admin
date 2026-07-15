---
id: MWI-COMP-051
component: "EventsCalendarPanel"
category: "Events feature"
status: exported
source: "src/components/admin/events/events-calendar-panel.jsx"
lines: 391-854
figma_priority: 34
evidence: static_code
---

# EventsCalendarPanel

## 1. Purpose

Events feature component implemented in src/components/admin/events/events-calendar-panel.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-051`.
- Location: `Dashboard Admin/src/components/admin/events/events-calendar-panel.jsx`:391.
- File range: lines 391–854.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| date-fns | addDays, addMonths, format, subMonths | external package |
| lucide-react | Archive, CalendarDays, CalendarPlus, ChevronLeft, ChevronRight, Clock3, Download, Egg, Filter, FlaskConical, List, RefreshCcw, Search, Sparkles, Swords, Upload | icons |
| react | useEffect, useMemo, useState | external package |
| sonner | toast | external package |
| @/components/admin/events/event-editor-modal | EventEditorModal, ImportModal | internal |
| @/data/pokemon-events | defaultPokemonEvents, POKEMON_EVENT_TYPES | internal |
| @/services/admin/events-api | adminEventsApiPath, adminEventsScrapePath, eventsApiPath | internal |
| @/components/admin/pokemon/admin-ui | fieldClass, Panel, primaryButtonClass, buttonClass | internal |
| @/components/admin/pokemon/dataset-source-header | DatasetSourceHeader | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-045 | [EventEditorModal](../components/components-admin-events-event-editor-modal-eventeditormodal.md) (MWI-COMP-045) | JSX/import relation |
| MWI-COMP-046 | [ImportModal](../components/components-admin-events-event-editor-modal-importmodal.md) (MWI-COMP-046) | JSX/import relation |
| MWI-COMP-052 | [StatTile](../components/components-admin-events-events-calendar-panel-stattile.md) (MWI-COMP-052) | JSX/import relation |
| MWI-COMP-053 | [CalendarWeek](../components/components-admin-events-events-calendar-panel-calendarweek.md) (MWI-COMP-053) | JSX/import relation |
| MWI-COMP-057 | [EventGroup](../components/components-admin-events-events-calendar-panel-eventgroup.md) (MWI-COMP-057) | JSX/import relation |
| MWI-COMP-058 | [TimelineSection](../components/components-admin-events-events-calendar-panel-timelinesection.md) (MWI-COMP-058) | JSX/import relation |
| MWI-COMP-064 | [EventDetailModal](../components/components-admin-events-events-calendar-panel-eventdetailmodal.md) (MWI-COMP-064) | JSX/import relation |
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-155 | [DatasetSourceHeader](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) (MWI-COMP-155) | JSX/import relation |

Unresolved/external JSX tags: `Archive`, `CalendarDays`, `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Clock3`, `Download`, `Egg`, `Filter`, `FlaskConical`, `Icon`, `RefreshCcw`, `Search`, `Sparkles`, `Swords`, `Upload`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-184 | [EventsCalendarPanel](../components/components-admin-pokemon-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-184) | Renders/imports this component |
| MWI-COMP-305 | [EventsCalendarPanel](../components/components-pokemon-admin-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-305) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <section>
  - <Panel>
    - <div>
      - <StatTile />
      - <StatTile />
      - <StatTile />
      - <StatTile />
      - <StatTile />
      - <StatTile />
      - <StatTile />
    - <DatasetSourceHeader />
    - <div>
      - <label>
        - <Search />
        - <input />
      - <select>
        - <option>
        - <option>
      - <select>
        - <option>
      - <input />
      - <button>
        - <Filter />
    - <p>
  - <section>
    - <div>
      - <div>
        - <div>
          - <button aria-label="Mois précédent">
            - <ChevronLeft />
          - <button>
          - <button aria-label="Mois suivant">
            - <ChevronRight />
        - <h3>
        - <div>
          - <button>
            - <Icon />
      - <div>
        - <div>
          - <span>
        - <div>
          - <CalendarWeek />
      - <div>
        - <EventGroup />
        - <EventGroup />
        - <EventGroup />
        - <EventGroup />
    - <aside>
      - <TimelineSection />
      - <TimelineSection />
      - <TimelineSection />
      - <TimelineSection />
  - <EventDetailModal />
  - <EventEditorModal />
  - <ImportModal />

Unique HTML/React tags: `Archive`, `aside`, `button`, `CalendarDays`, `CalendarPlus`, `CalendarWeek`, `ChevronLeft`, `ChevronRight`, `Clock3`, `DatasetSourceHeader`, `div`, `Download`, `Egg`, `EventDetailModal`, `EventEditorModal`, `EventGroup`, `Filter`, `FlaskConical`, `h3`, `Icon`, `ImportModal`, `input`, `label`, `option`, `p`, `Panel`, `RefreshCcw`, `Search`, `section`, `select`, `span`, `Sparkles`, `StatTile`, `Swords`, `TimelineSection`, `Upload`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `busy = ""`, `compact = false`, `cursor = new Date(`, `dateFilter = ""`, `draft = (`, `editorOpen = false`, `events = defaultPokemonEvents`, `importOpen = false`, `importText = ""`, `loading = false`, `meta = { configured: false, seeded: true, collection: "events" }`, `query = ""`, `selectedEvent = null`, `statusFilter = "all"`, `typeFilter = "all"`, `view = "calendar"`.
- Event handlers exposed in JSX: `onArchive`, `onChange`, `onClick`, `onClose`, `onCreate`, `onDelete`, `onDuplicate`, `onEdit`, `onImport`, `onOpen`, `onOpenDay`, `onOpenPokemon`, `onRestore`, `onSave`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| globalSearch | globalSearch = "" | See exact signature/contract below |
| onOpenPokemon | Not found | See exact signature/contract below |

Exact parameter signature:

```tsx
{ globalSearch = "", onOpenPokemon }
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Loading, Disabled, Error, Warning, Success, Empty.
- Text properties: `globalSearch`, `onOpenPokemon`.
- Instance swaps: `Archive`, `CalendarDays`, `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Clock3`, `Download`, `Egg`, `Filter`, `FlaskConical`, `List`, `RefreshCcw`, `Search`, `Sparkles`, `Swords`, `Upload`, `https://leekduck.com/events/`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Not found | Not found |
| Unchecked | Not found | Not found |
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
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
| Scrollable | Not found | Not found |
| Sticky | Not found | Not found |

## 9. Interactions

- Hover behavior: Defined by the exact hover utilities in section 11..
- Pressed behavior: Not found.
- Focus behavior: Defined by focus/focus-visible utilities or handlers..
- Pointer/cursor behavior: Browser/element click behavior; explicit cursor token Not found.
- Expand/collapse behavior: Detected; see state and attribute tables..

## 10. Layout, spacing, sizing and constraints

- Flex layout is present.
- CSS Grid layout is present.
- At least one flex container uses vertical direction.
- Alignment utilities: `content-type, items-center, justify-center, lg:items-center, lg:justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | Not found |
| Literal colors | `#22c55e`, `#22d3ee`, `#38bdf8`, `#64748b`, `#94a3b8`, `#a855f7`, `#ef4444`, `#f59e0b`, `rgba(0,0,0,.22)`, `rgba(0,0,0,.24)`, `rgba(14,165,233,.26)` |
| Spacing | `gap-1`, `gap-2`, `gap-3`, `gap-4`, `gap-5`, `left-4`, `mb-4`, `mt-2`, `mt-4`, `p-1`, `p-3`, `p-4`, `pl-11`, `px-1`, `px-3`, `px-4`, `py-2`, `sm:gap-2`, `sm:p-4`, `sm:p-5`, `space-y-2`, `space-y-3`, `space-y-5`, `top-1/2` |
| Sizing | `min-h-11`, `min-h-12`, `min-w-0`, `w-full` |
| Typography | `capitalize`, `font-black`, `font-bold`, `hover:text-foreground`, `placeholder:text-slate-500`, `sm:text-xs`, `text-[10px]`, `text-2xl`, `text-amber-100`, `text-center`, `text-foreground`, `text-muted`, `text-slate-500`, `text-slate-950`, `text-sm`, `text-white`, `text-xs`, `tracking-[0.12em]`, `uppercase` |
| Radius | `rounded-2xl`, `rounded-xl` |
| Borders/strokes | `border`, `border-amber-300/20`, `border-white/10`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_22px_90px_rgba(0,0,0,.22)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]` |
| Opacity | Not found |
| Background | `backdrop-blur-xl`, `bg-amber-400/10`, `bg-brand-2`, `bg-gradient-to-r`, `bg-slate-950/30`, `bg-slate-950/45`, `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/[0.075]`, `from-sky-500`, `hover:bg-cyan-400/15`, `to-cyan-400` |
| Animation | `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `-copie-` | base | static occurrence |
| `-translate-y-1/2` | base | static occurrence |
| `:` |  | conditional or expression-derived |
| `2xl:grid-cols-[minmax(0,1fr)_420px]` | 2xl | static occurrence |
| `2xl:grid-cols-7` | 2xl | static occurrence |
| `absolute` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-brand-2` | base | conditional or expression-derived |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-slate-950/30` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-white/[0.045]` | base | static occurrence |
| `bg-white/[0.055]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | static occurrence |
| `border-amber-300/20` | base | static occurrence |
| `border-white/10` | base | static occurrence |
| `capitalize` | base | static occurrence |
| `content-type` | base | static occurrence |
| `flex` | base | conditional or expression-derived |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `gap-1` | base | static occurrence |
| `gap-2` | base | conditional or expression-derived |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-7` | base | static occurrence |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `hover:text-foreground` | hover | conditional or expression-derived |
| `import-loaded` | base | static occurrence |
| `inline-flex` | base | conditional or expression-derived |
| `items-center` | base | conditional or expression-derived |
| `jour:` | jour | static occurrence |
| `justify-center` | base | static occurrence |
| `leekduck-events` | base | static occurrence |
| `left-4` | base | static occurrence |
| `lg:flex-row` | lg | static occurrence |
| `lg:items-center` | lg | static occurrence |
| `lg:justify-between` | lg | static occurrence |
| `mb-4` | base | static occurrence |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-2` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `no-store` | base | static occurrence |
| `outline-none` | base | static occurrence |
| `p-1` | base | static occurrence |
| `p-3` | base | static occurrence |
| `p-4` | base | static occurrence |
| `pl-11` | base | conditional or expression-derived |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `pokemon-go-events.json` | base | static occurrence |
| `px-1` | base | static occurrence |
| `px-3` | base | conditional or expression-derived |
| `px-4` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `relative` | base | static occurrence |
| `rescrapé:` | rescrapé | static occurrence |
| `rounded-2xl` | base | static occurrence |
| `rounded-xl` | base | conditional or expression-derived |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.22)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `sm:gap-2` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:p-4` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-xs` | sm | static occurrence |
| `space-y-2` | base | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `terminé:` | terminé | static occurrence |
| `text-[10px]` | base | static occurrence |
| `text-2xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-center` | base | static occurrence |
| `text-foreground` | base | conditional or expression-derived |
| `text-muted` | base | conditional or expression-derived |
| `text-slate-500` | base | static occurrence |
| `text-slate-950` | base | conditional or expression-derived |
| `text-sm` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `to-cyan-400` | base | static occurrence |
| `top-1/2` | base | static occurrence |
| `tracking-[0.12em]` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `uppercase` | base | static occurrence |
| `w-full` | base | static occurrence |
| `xl:grid-cols-[minmax(0,1.4fr)_180px_180px_170px_auto]` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |

Exact className combinations:

- `-`
- `-copie-`
- `bg-brand-2 text-slate-950`
- `content-type`
- `flex flex-wrap gap-2`
- `flex items-center gap-2`
- `flex rounded-2xl border border-white/10 bg-slate-950/45 p-1`
- `grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7`
- `grid gap-4`
- `grid grid-cols-7 gap-1 sm:gap-2`
- `grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_420px]`
- `Import terminé:`
- `import-loaded`
- `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `Lecture sur données seed : MongoDB non configuré.`
- `LeekDuck rescrapé:`
- `leekduck-events`
- `mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0`
- `min-w-0 rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_22px_90px_rgba(0,0,0,.22)] sm:p-4`
- `min-w-0 space-y-3`
- `MongoDB mis à jour:`
- `mt-2 space-y-2`
- `mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.4fr)_180px_180px_170px_auto]`
- `mt-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 p-3 text-sm font-bold text-amber-100`
- `no-store`
- `pl-11`
- `pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500`
- `pokemon-go-events.json`
- `relative block`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-xl border border-white/10 bg-white/[0.045] px-1 py-2 text-center text-[10px] font-black uppercase tracking-[0.12em] text-muted sm:text-xs`
- `space-y-5`
- `text-2xl font-black capitalize text-foreground`
- `text-muted hover:text-foreground`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} pl-11\``
- `\`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black transition ${ view === id ? "bg-brand-2 text-slate-950" : "text-muted hover:text-foreground" }\``
- `buttonClass`
- `fieldClass`
- `primaryButtonClass`

### CSS variables

Not found

### Inline style expressions

Not found

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
src/components/admin/pokemon/admin-ui.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/admin-ui.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

### Referenced global custom CSS rules

Not found

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-[minmax(0,1fr)_420px]`, `2xl:grid-cols-7`, `lg:flex-row`, `lg:items-center`, `lg:justify-between`, `sm:gap-2`, `sm:grid-cols-2`, `sm:p-4`, `sm:p-5`, `sm:text-xs`, `xl:grid-cols-[minmax(0,1.4fr)_180px_180px_170px_auto]`, `xl:grid-cols-4`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: `aria-label="Mois précédent"`, `aria-label="Mois suivant"`.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `Archive`, `CalendarDays`, `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Clock3`, `Download`, `Egg`, `Filter`, `FlaskConical`, `List`, `RefreshCcw`, `Search`, `Sparkles`, `Swords`, `Upload`.
- Asset references: `https://leekduck.com/events/`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Loading, Disabled, Error, Warning, Success, Empty.
- Instance swaps: `Archive`, `CalendarDays`, `CalendarPlus`, `ChevronLeft`, `ChevronRight`, `Clock3`, `Download`, `Egg`, `Filter`, `FlaskConical`, `List`, `RefreshCcw`, `Search`, `Sparkles`, `Swords`, `Upload`, `https://leekduck.com/events/`.
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
| □ | Selected | selected/state signal |
| — | Checked | Not found |
| — | Unchecked | Not found |
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
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
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
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

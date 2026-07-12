# Phase 4A-PREP - Template Architecture

Project: Dashboard Admin Pokemon GO  
Target Figma page: `06 Page Templates`  
Status: Ready for visual rendering in Phase 4B  
Mode: DARK MODE ONLY  

## Scope

This document defines the page template architecture for the Pokemon GO Admin Design System. It is documentation only and becomes the source of truth for future Figma rendering.

Rules:
- No Figma MCP call in this prep phase.
- No code implementation.
- No production dashboard modification.
- Templates must reuse Phase 3C atomic components, Phase 3D composite components and Phase 3E complex components.
- Templates define layout, density, scroll ownership, responsive behavior and information hierarchy.
- Templates must not introduce local arbitrary styles.
- Templates must not duplicate component behavior already defined at atomic, composite or complex level.

The target product is not a generic SaaS dashboard. It is a Pokemon GO admin workload with high-density data inspection, event scheduling, source monitoring, JSON validation, asset verification, Pokedex browsing and operational control.

## Source Audit Summary

Architecture reviewed in read-only mode:
- Current shell: global dashboard layout, fixed sidebar, sticky topbar, max content width around 1680.
- Current route groups: Dashboard, Pokemon Data, Organisation, Studio JS, Systeme.
- Current critical routes: Home, Analytics, Mongo DB, Kanban, Pokemon Admin.
- Current Pokemon Admin sections: Accueil, Fiches, Candies, Collections, Raids, Oeufs, Max Battles, Rocket, Research, Calendrier Events, Assets, Controles, Veille, Logs & MAJ, Catalogues, Comparaison, Regles JSON, Corrections, Export, Todo-list, Editeur.
- Current screenshot evidence: Home, Analytics, Admin Pokemon, Fiche modal, Calendar Events, Event detail modal, Veille, Regles JSON, Mongo DB.
- Existing design-system layers: 401 atomic variants, 520 composite variants, 895 complex variants.

Primary observed risks:
- Double navigation risk on Pokemon Admin: global sidebar plus internal section switcher.
- High-density calendar risk: month grid, event bars, day cells, timeline side panel and event modals can overload scan.
- Data-heavy risk: tables, JSON blocks, source histories and long logs can create nested scroll traps.
- Modal risk: Pokemon and event detail modals are not simple dialogs; they are deep inspection workspaces.
- Visual saturation risk: Pokemon identity and glow should support orientation, not compete with data.

## Template Inventory

| Template | Primary workload | Density budget | Complexity score |
|---|---|---:|---:|
| Home Template | Command cockpit, quick scanning, widget overview | Medium | 5/10 |
| Admin Template | Pokemon admin workspace and domain section switching | High | 9/10 |
| Modal Template | Deep inspection, editing, history and import workflows | High | 8/10 |
| Calendar Template | Pokemon GO event scheduling, dense temporal layout | Extreme | 10/10 |
| Data Heavy Template | Tables, JSON, source logs, Mongo, diagnostics | Extreme | 9/10 |
| Analytics Template | KPI, charts, progression and comparative reading | Medium-High | 6/10 |

## Global Layout Contract

### Shell

Every page template sits inside the same app shell:
- Global sidebar.
- Global topbar.
- Main content container.
- Footer when page content is not a fullscreen operational workspace.
- Overlay layer for modals, command surfaces and mobile navigation.

Future Figma naming:
- `Template/Home`
- `Template/Admin`
- `Template/Modal`
- `Template/Calendar`
- `Template/Data Heavy`
- `Template/Analytics`

### Sidebar Contract

Target sidebar:
- Expanded width: 280px.
- Collapsed width: 84px.
- Mobile: off-canvas drawer.

Sidebar responsibilities:
- Global product navigation only.
- It must not expose every internal Pokemon Admin section as top-level global navigation.
- It must preserve the user's location through active group and active item state.

Double navigation rule:
- The global sidebar owns cross-page navigation.
- A template may use one secondary navigation surface only when the page is a multi-section workspace.
- Secondary navigation must be visually lower hierarchy than the page title and global sidebar.

### Topbar Contract

Topbar responsibilities:
- Current page breadcrumb or active label.
- Global search.
- Version/status control.
- Account or theme controls.
- Optional global command trigger.

Topbar behavior:
- Sticky at top.
- Topbar must remain visually quiet; page-level actions belong in the page header or toolbar.
- On mobile, topbar reduces to menu trigger, page label, and essential actions.

### Content Width System

Base grid:
- 8px.

Breakpoints:
- Mobile: 360.
- Tablet: 768.
- Laptop: 1024.
- Desktop: 1440.
- Wide: 1680.
- Ultra: 1920.

Main content width:
- Default max width: 1680px.
- Ultra screens: retain max width for reading pages; allow full content width only for operational canvases such as Calendar and Kanban.
- Mobile gutter: 16px.
- Tablet gutter: 24px.
- Laptop and above gutter: 32px.

Template width rules:
- Home, Analytics and Data Heavy default to constrained max width.
- Admin and Calendar may use the full shell content width because their workload benefits from lateral space.
- Modals own their own width independent of page max width.

### Scroll Ownership

Global rule:
- One primary vertical scroll owner per screen.
- Nested vertical scroll is allowed only where the component cannot function otherwise.
- Internal scroll zones must be visually bounded and keyboard reachable.

Allowed internal scroll:
- Modal body.
- Table body with sticky header.
- Dense code or JSON panel.
- Calendar agenda side panel when paired with a fixed-height calendar canvas.
- Kanban columns only when the board is viewport-bounded.
- Source/deploy history modal body.

Disallowed scroll:
- Scrollable cards inside scrollable panels inside page scroll.
- Independent scroll inside every widget.
- Sidebar plus page plus panel plus card all scrolling at once.
- Hidden overflow that cuts off focus rings, dropdowns or tooltips.

Nested scroll limit:
- Page templates: maximum one internal vertical scroll region visible at a time.
- Modal template: maximum one modal body scroll plus optional horizontal code/table scroll.
- Calendar template: calendar canvas may use horizontal pan on small screens, but vertical scroll must stay predictable.

### Information Hierarchy

Every template must use this ordering:
1. Current location.
2. Page objective.
3. Primary action or status.
4. Filters/search.
5. Core content.
6. Secondary evidence.
7. Footer or metadata.

Pokemon identity rule:
- Pokemon media, type chips and official asset cues may be used as domain signals.
- They must not replace labels, dates, status, counts or admin actions.

Glow rule:
- Glow is reserved for active, focus, selected, critical status or primary accent.
- No template may use glow as a general section background.

## Density And Cognitive Load Model

Density budget scale:
- Low: 1 to 8 visible information objects.
- Medium: 9 to 24 visible information objects.
- High: 25 to 60 visible information objects.
- Extreme: 60+ visible information objects, allowed only for calendars, tables, data panels and code/log views.

Information object definition:
- A KPI card counts as 1 object.
- A chart counts as 2 to 4 objects depending on labels and legend.
- A calendar cell counts as 1 object before events.
- A calendar event bar counts as 1 object.
- A table row counts as 1 object.
- A Pokemon card counts as 2 objects when it includes image plus status metadata.
- A modal tab counts as 1 navigational object.

Cognitive load rule:
- The page may show more data only when it creates better scanning.
- Data density is acceptable when grouping, alignment and hierarchy reduce interpretation cost.
- Decorative density is not acceptable.

## Template Mapping

| Current or future page | Template |
|---|---|
| Dashboard Home | Home Template |
| Pokemon Admin Accueil | Admin Template |
| Pokemon Admin Fiches | Admin Template plus Modal Template |
| Pokemon Admin Raids/Oeufs/Rocket/Research | Admin Template |
| Pokemon Admin Calendrier Events | Admin Template plus Calendar Template plus Modal Template |
| Pokemon Admin Veille/Logs/Regles JSON/Export/Comparaison | Admin Template plus Data Heavy Template plus Modal Template |
| Mongo DB | Data Heavy Template |
| Docs JSON | Data Heavy Template |
| Analytics | Analytics Template |
| Kanban | Data Heavy Template or Admin-adjacent board layout, depending on future scope |
| Dashboard Backlog | Data Heavy Template plus Modal Template |

---

## 1. Home Template

### Role

Home Template is the command cockpit for fast orientation. It answers: what matters now, what is healthy, what needs action, and where should the admin go next.

It exists for:
- Dashboard overview.
- Quick entry into Pokemon Admin.
- Personal work status: notes, todo, projects, calendar, snippets.
- Compact Pokemon API health and quality summary.
- Drag-reorderable widget overview.

It must feel calm, premium and scannable. It should not attempt to expose the full Pokemon Admin workload.

### Layout Zones

Sidebar:
- Global sidebar only.
- Active item: Accueil.
- No Home-specific secondary navigation.

Topbar:
- Breadcrumb or active label.
- Global search.
- Version/status badge.
- Account/theme controls.

Header:
- One strong command header.
- Contains dashboard state badge, page title, short support copy and 1 to 2 primary actions.
- Primary action: Admin Pokemon.
- Secondary action: context-dependent shortcut such as Snippets or Docs.

Toolbars:
- Optional widget management toolbar.
- Must be below KPI row, not above page identity.
- Controls: hidden widget count, reset layout.

Content:
- KPI row.
- Widget masonry/grid.
- Compact data cards.
- Quick links.

Footer:
- Standard dashboard footer allowed.
- Footer should not compete with widgets.

Side panels:
- Not allowed in default Home.
- If a future assistant panel exists, it must open as overlay, not permanent side rail.

Overlays:
- Widget settings modal.
- Version history modal.
- Palette/account overlays from shell.

### Width Constraints

Max width:
- 1680px.

Gutters:
- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

Header:
- Full content width.
- Max text width: 720px.
- Action group wraps after the title block on small widths.

KPI grid:
- Mobile: 1 column.
- Tablet: 2 columns.
- Laptop: 3 columns.
- Desktop: 3 to 4 columns.
- Wide: 6 columns only if each KPI keeps readable labels.

Widget grid:
- Mobile: 1 column.
- Laptop: 2 columns.
- Wide: 3 to 4 columns.
- Masonry allowed only if card order remains keyboard and screen-reader coherent.

### Scroll Strategy

Page scroll:
- Primary and only vertical scroll.

Internal scroll:
- Not allowed for normal widgets.
- A widget may truncate and link to full page instead of scrolling internally.

Nested scroll:
- Not allowed.

Horizontal scroll:
- Not needed.
- Avoid carousel behavior on Home.

### Responsive Rules

Mobile:
- Header actions stack below copy.
- KPI cards use single column.
- Widget management toolbar becomes a compact action row.
- Widget content must prefer summaries over dense lists.

Tablet:
- KPI cards 2 columns.
- Widgets 1 to 2 columns.
- Header actions align right only when space allows.

Laptop:
- KPI row can use 3 columns.
- Widget grid supports 2 columns.

Desktop:
- Header + actions use two-column alignment.
- KPI row can use 3 or 6 depending on text length.

Ultrawide:
- Keep content centered at 1680px.
- Do not stretch individual widget text lines across the viewport.

### Allowed Components

Complex components:
- Sidebar.
- Widgets.
- Dense Data Panels only as compact read-only summary.
- Event Cards only in compact upcoming-event form.
- Backlog Cards only in compact summary.
- Kanban Cards only in compact summary.

Composite components:
- KPI Blocks.
- Card Headers.
- Action Rows.
- Toolbar Groups.
- Search Bars only if scoped to widgets.

Atomic components:
- Buttons.
- Icon Buttons.
- Badges.
- Chips.
- Progress Bars.
- Tooltips.

Disallowed:
- Full Tables.
- Full Calendar Cells.
- Pokemon Detail Modal as inline content.
- Large JSON/code panels.

### Density Budget

Budget: Medium.

Recommended visible object count:
- Mobile: 8 to 14.
- Tablet: 12 to 20.
- Desktop: 18 to 30.
- Ultrawide: max 36.

The Home Template may show many widgets, but each widget must summarize one decision or one signal.

### Cognitive Load Budget

The user should understand the screen in under 10 seconds:
- 1 page objective.
- 4 to 6 major status signals.
- 2 direct actions.
- 4 to 9 optional widgets below the fold.

Avoid showing raw data that requires interpretation. Home is for orientation, not investigation.

### Do / Don't

Do:
- Use one strong command header.
- Keep the Pokemon Admin action prominent.
- Use KPI cards for live operational signals.
- Keep widgets resumable and reorderable.
- Let the page breathe.

Don't:
- Turn Home into a full data table.
- Add secondary navigation.
- Put scrollable lists inside widgets.
- Show full Pokemon card grids.
- Use glow on every card.

### Complexity Score

Score: 5/10.

Reason:
- Moderate layout complexity.
- Low interaction risk.
- High value as entry point.
- Main challenge is avoiding visual overload from too many widgets.

---

## 2. Admin Template - P0 Critical

### Role

Admin Template is the main Pokemon GO operations workspace. It exists to let the admin navigate between dense domain sections and perform repeated actions across Pokemon data, assets, checks, events, rules, sources and exports.

It must support:
- Pokedex browsing and detail inspection.
- Pokemon cards with status and asset health.
- Raids, eggs, Rocket, Research and event workflows.
- JSON rules, source monitoring and update logs.
- Data corrections, exports and editor/todo utilities.

This template is not a CRUD page. It is a multi-mode operational cockpit.

### Layout Zones

Sidebar:
- Global navigation only.
- Active item: Admin Pokemon.
- Must not duplicate every internal admin section in the global sidebar.

Topbar:
- Global topbar remains sticky.
- Page label: Admin Pokemon.
- Global search remains present, but page search inside Admin has higher local relevance.

Header:
- Admin command header.
- Contains:
  - Eyebrow/status: Dashboard securise or Admin Pokemon.
  - Active section title.
  - Local search for fiche, type, file, source or section.
  - Primary actions: Actualiser, Redeployer.
  - Optional status feedback: protected/admin/live.

Secondary navigation:
- Admin section switcher.
- Represents section modes, not global pages.
- Must be lower hierarchy than title.
- Current visual grid is acceptable as a desktop section launcher, but it must not become a permanent second sidebar.

Toolbars:
- Section-specific toolbar below secondary navigation or inside active panel.
- Examples:
  - Generation filters.
  - Type filters.
  - Source verification actions.
  - JSON sync/new rule actions.
  - Calendar import/export actions.

Content:
- Active section content only.
- The active section can use cards, tables, dense panels or calendar surfaces.
- Inactive sections must not occupy layout space.

Footer:
- Standard dashboard footer allowed only after the active section.
- For extremely dense admin sections, footer may be visually minimized.

Side panels:
- Allowed only for contextual inspector or preview.
- Must not compete with secondary navigation.
- Desktop only by default.

Overlays:
- Pokemon Detail Modal.
- Event Detail Modal.
- Source History Modal.
- Data Deploy History Modal.
- Import/create/edit modals.
- Confirm destructive action modals.

### Width Constraints

Max width:
- Default: 1680px.
- Admin active content may use full available shell width up to 1680.

Gutters:
- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

Header:
- Desktop: grid with title block, search, action group.
- Search preferred width: 520 to 720px.
- Action group must not exceed two primary actions plus one overflow menu.

Secondary navigation:
- Desktop: 4 columns minimum, up to 6 columns on wide screens.
- Laptop: 3 to 4 columns.
- Tablet: 2 to 3 columns.
- Mobile: horizontal segmented list or collapsible section picker.

Active section:
- Card grids: 1/2/3/4 columns depending on card family.
- Pokemon Cards: mobile 1, tablet 2, desktop 3, ultrawide 4.
- Raid/Egg/Rocket/Research Cards: mobile 1, tablet 2, desktop 3, ultrawide 4.
- Source rows: mobile 1, desktop 2.
- Dense Data Panels: mobile 1, desktop 2, wide 2 to 3 only if line length remains usable.

### Scroll Strategy

Page scroll:
- Primary vertical scroll owner.
- Header and section switcher can scroll away after the user enters section content.

Sticky behavior:
- Global topbar remains sticky.
- A compact section toolbar may become sticky only for data-heavy or calendar sections.
- Do not make the full section switcher sticky; it is too large.

Internal scroll:
- Allowed for:
  - Table bodies.
  - JSON editors or export textareas.
  - Long history modals.
  - Calendar side agenda.
  - Dense code panels.

Nested scroll:
- Not allowed inside cards.
- Not allowed inside the secondary navigation.
- Allowed inside modal body only.

Horizontal scroll:
- Allowed for:
  - Dense tables.
  - JSON/code panels.
  - Very wide comparison matrices.
- Must be visually signaled and not hidden.

### Responsive Rules

Mobile:
- Global sidebar becomes drawer.
- Admin header stacks:
  - title,
  - local search,
  - primary actions,
  - section picker.
- Section switcher becomes compact, searchable, or horizontal.
- Cards become single column.
- Tables transform into row cards when possible.
- Large data/code surfaces can use horizontal scroll.
- Pokemon Detail Modal becomes near-fullscreen.

Tablet:
- Section switcher 2 to 3 columns.
- Active content 2 columns for card sections.
- Dense data surfaces stay single column with internal horizontal scroll.
- Toolbar wraps into two rows maximum.

Laptop:
- Header can use title + search + actions in one row if space allows.
- Section switcher 3 to 4 columns.
- Active content 2 to 3 columns.

Desktop:
- Section switcher may use 4 columns.
- Operational panels can use 2-column layout.
- Status/KPI row may use 4 columns.

Ultrawide:
- Section switcher may use 5 to 6 columns, but no tile may stretch too wide.
- Active content may use 4 columns for media-heavy cards.
- Dense panels should stay 2 columns unless each panel remains legible.

### Allowed Components

Complex components:
- Sidebar.
- Widgets.
- Tables.
- Pokemon Cards.
- Raid Cards.
- Egg Cards.
- Rocket Cards.
- Research Cards.
- Event Cards.
- Calendar Cells only inside calendar section.
- Calendar Event Bars only inside calendar section.
- Pokemon Detail Modal.
- Backlog Cards when admin todo/backlog is active.
- Kanban Cards only if planning mode is active.
- Dense Data Panels.

Composite components:
- Search Bars.
- Filter Bars.
- Toolbar Groups.
- Pokemon Type Chips.
- KPI Blocks.
- Stat Rows.
- Card Headers.
- Modal Headers.
- Pagination.
- Action Rows.

Atomic components:
- All Phase 3C atoms.

Disallowed:
- Independent secondary sidebar for Admin sections.
- Multiple simultaneous detail panels.
- Floating action clusters detached from the active section.
- Decorative-only widgets in operational sections.

### Density Budget

Budget: High.

Recommended visible object count:
- Mobile: 12 to 24.
- Tablet: 20 to 36.
- Desktop: 30 to 60.
- Ultrawide: 40 to 72 only for grid sections.

Section-specific density:
- Accueil: Medium-High.
- Fiches: High.
- Raids/Oeufs/Rocket/Research: High.
- Calendar Events: Extreme, delegated to Calendar Template.
- Veille/Logs/Regles JSON/Export/Comparaison: Extreme, delegated to Data Heavy Template.

### Cognitive Load Budget

Admin Template may show a lot, but each screen must answer one active task.

Visible information target:
- 1 active section.
- 1 local search/filter zone.
- 1 primary action group.
- 3 to 5 KPI/status cards.
- 1 active content system.
- 0 to 1 contextual side panel.

The user should never have to decide between two navigation systems with equal visual weight.

### Do / Don't

Do:
- Treat the section switcher as a mode selector.
- Keep section title and current mode obvious.
- Move dense workflows into dedicated active sections.
- Use component families from Phase 3E instead of new card styles.
- Preserve Pokemon identity through type chips, sprites and official assets.
- Keep destructive actions close to the item they affect.
- Use compact density only for repeated scanning.

Don't:
- Add a second persistent sidebar inside Admin.
- Show multiple section contents at once.
- Put every action in the header.
- Make all cards neon or equally loud.
- Let JSON, source logs or event history scroll inside small cards.
- Mix table, card grid and code editor in the same viewport without hierarchy.

### Complexity Score

Score: 9/10.

Reason:
- Highest breadth of workflows.
- Many data families and component families.
- Strong double-navigation risk.
- Requires careful density management.
- Depends heavily on Modal, Calendar and Data Heavy templates.

### P0 Admin Template Rules

1. The active admin section is the only work context.
2. The secondary section switcher is not a navigation replacement for the global sidebar.
3. Section-level actions must stay near section content.
4. Local search must search the active admin domain first.
5. Dense sections must use either table/data template rules or calendar template rules.
6. Pokemon identity must increase recognition, not reduce admin readability.

---

## 3. Modal Template

### Role

Modal Template defines focused overlay workspaces. It exists for detailed inspection, editing, creation, import/export and historical review without losing the underlying page context.

It must support:
- Pokemon Detail Modal.
- Event Detail Modal.
- Event create/edit modal.
- Kanban card edit modal.
- Project create/edit modal.
- Source History Modal.
- Data Deploy History Modal.
- Import JSON modal.
- Version history modal.
- Destructive confirmations.

This template is a workspace modal, not just an alert box.

### Layout Zones

Sidebar:
- Hidden behind overlay.
- Underlying sidebar remains inert.

Topbar:
- Hidden behind overlay.
- Underlying topbar remains inert.

Header:
- Required.
- Contains:
  - Title.
  - Context metadata.
  - Status badges.
  - Close action.
  - Optional primary entity identity: Pokemon number, sprite, type chips, event type, source status.

Toolbars:
- Optional.
- Used for tabs, edit actions, duplicate/archive/delete, import/export.
- Must be inside modal, below header.

Content:
- Main modal body.
- Can be:
  - tabbed details,
  - form,
  - history list,
  - JSON/code panel,
  - event detail content,
  - Pokemon stats/details.

Footer:
- Optional sticky footer for forms and destructive confirmations.
- Not required for read-only detail modals when actions sit in header.

Side panels:
- Optional only on desktop and only for contextual metadata.
- Example: Pokemon media/summary rail beside tabbed details.

Overlays:
- Modal overlay is the top-level overlay.
- A modal must not open another full modal except for confirmation. Prefer inline confirmation or popover.

### Width Constraints

Modal sizes:
- Confirmation: max width 480 to 560px.
- Form: max width 720 to 960px.
- Data/history: max width 960 to 1120px.
- Pokemon Detail: max width 1180 to 1280px.
- Event Detail: max width 1120 to 1280px.

Height:
- Max height: 92dvh to 94dvh.
- Header and footer fixed inside modal.
- Body owns vertical scroll.

Gutters:
- Mobile overlay padding: 12 to 16px.
- Tablet overlay padding: 20px.
- Desktop overlay padding: 24px.

Internal padding:
- Mobile: 16px.
- Tablet/Desktop: 24px to 32px depending on density.

### Scroll Strategy

Page scroll:
- Locked behind modal.

Overlay scroll:
- Allowed only to keep modal reachable on very small screens.

Modal body scroll:
- Primary scroll owner while modal is open.
- Header and close action remain visible.

Internal scroll:
- Allowed for:
  - JSON/code block horizontal scroll.
  - Table horizontal scroll.
  - Long textarea in edit mode.

Nested vertical scroll:
- Avoid.
- If a JSON panel is very long, choose either modal body scroll or code panel scroll, not both.

Focus scroll:
- Focused fields must scroll into view without hiding behind sticky header/footer.

### Responsive Rules

Mobile:
- Modal becomes near-fullscreen.
- Radius may reduce.
- Header compresses identity and actions.
- Tab bar becomes horizontal scroll or segmented control.
- Footer actions stack.
- Side panels are not allowed.

Tablet:
- Modal can use two-column content for Pokemon/event summaries.
- Tab bar remains visible.
- Body scroll remains single owner.

Laptop:
- Detail modals use broad layout with identity header and content sections.
- Form modals keep max width around 960px.

Desktop:
- Pokemon/event detail may use large workspace width.
- Optional side metadata panel allowed if it does not create a second scroll trap.

Ultrawide:
- Do not exceed 1280px for most modals.
- Wider than 1280px only for dense comparison or source history, capped around 1440px.

### Allowed Components

Complex components:
- Pokemon Detail Modal.
- Dense Data Panels.
- Tables.
- Pokemon Cards only as related/preview rows.
- Event Cards only as related event rows.
- Calendar Event Bars only as event context preview.
- Backlog Cards.
- Kanban Cards.

Composite components:
- Modal Headers.
- Tabs Primitives.
- Action Rows.
- Toolbar Groups.
- Search Bars inside import/history modals.
- Filter Bars for history/search modals.
- Pokemon Type Chips.
- Stat Rows.

Atomic components:
- Buttons.
- Icon Buttons.
- Inputs.
- Textareas.
- Selects.
- Checkboxes.
- Switches.
- Badges.
- Chips.
- Labels.
- Tooltips.
- Dividers.
- Progress Bars.

Disallowed:
- Full page sidebar inside modal.
- Full duplicate topbar inside modal.
- Multiple independent vertical scroll panes unless using a dedicated split inspector pattern.
- Large decorative hero imagery that pushes content below the fold.

### Density Budget

Budget: High.

Recommended visible object count:
- Confirmation: 3 to 8.
- Form: 12 to 30.
- Detail modal: 24 to 60.
- Pokemon Detail JSON tab: Extreme, but inside one clearly bounded data panel.
- Source history modal: High to Extreme, but list grouping must reduce scan cost.

### Cognitive Load Budget

Modal must answer:
- What am I viewing or editing?
- What state is it in?
- What changed or needs attention?
- What is the safe next action?

Visible information target:
- 1 entity identity.
- 1 status cluster.
- 1 active tab/content group.
- 1 primary action cluster.
- 0 to 1 warning/error message.

Pokemon Detail Modal:
- Must keep Pokemon identity visible.
- Tabs must separate conceptual loads: overview, stats, moves, PvP, assets, checks, JSON.
- JSON is an expert mode, not the default reading mode.

### Do / Don't

Do:
- Keep close action visible.
- Use explicit scroll boundaries.
- Keep primary entity identity visible near the top.
- Use tabs for deep detail.
- Use sticky footer only for forms with save/cancel.
- Use monospaced Dense Data Panels for JSON and diffs.

Don't:
- Let modal content scroll the background page.
- Put a full navigation system inside the modal.
- Mix read-only and edit modes without clear state.
- Make destructive actions visually equal to save actions.
- Hide important status below a long hero/header.

### Complexity Score

Score: 8/10.

Reason:
- Modals support several critical workflows.
- Scroll and focus management are high risk.
- Pokemon/event detail content is dense.
- Good modal architecture prevents the main templates from becoming overloaded.

---

## 4. Calendar Template - P0 Critical

### Role

Calendar Template is the temporal workload surface for Pokemon GO events. It exists to let the admin read, filter, compare, create and inspect events across days, weeks and months.

It must support:
- Pokemon GO event month grid.
- Multi-day event bars.
- Single-day event cards.
- Event type/status colors.
- Today/current/upcoming/past groups.
- Import/export/scrape/sync actions.
- Event detail and edit modals.

This is the densest visual template. Its job is to make time readable under heavy event overlap.

### Layout Zones

Sidebar:
- Global sidebar only.
- Active global item may be Admin Pokemon or Calendar, depending on route.

Topbar:
- Global topbar sticky.
- Should not contain calendar-specific filters beyond global search.

Header:
- Calendar command header.
- Contains:
  - Title.
  - Event source/status.
  - Primary actions: Actualiser, Ajouter, Import JSON, Envoyer MongoDB, Rescraper.
  - Optional sync/config warning.

Toolbars:
- Calendar controls:
  - Previous/next period.
  - Today.
  - View mode.
  - Search.
  - Type filter.
  - Status filter.
  - Date filter.
- Toolbar must be grouped and wrap predictably.

Content:
- Calendar canvas.
- Day/week/month grid.
- Calendar Cells.
- Calendar Event Bars.
- Single-day event cards inside cells.

Side panels:
- Desktop allowed:
  - Today group.
  - Ongoing group.
  - Upcoming group.
  - Past group.
  - Timeline/agenda.
- Side panel width target: 360 to 420px.

Footer:
- Optional only if page has secondary information below calendar.
- Avoid footer immediately after a very tall calendar unless separated.

Overlays:
- Event Detail Modal.
- Event Create/Edit Modal.
- Import JSON Modal.
- Pokemon Detail Modal when opening featured Pokemon from event.

### Width Constraints

Max width:
- 1680px by default.
- Calendar canvas may occupy all available shell content width.

Gutters:
- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

Calendar grid:
- Desktop minimum useful width: 980px.
- Desktop preferred width with agenda side panel: content width minus 380 to 420px.
- Day cell min width:
  - Desktop: 132px.
  - Tablet: 112px.
  - Mobile month grid should not attempt full fidelity under 768px.

Side panel:
- Desktop: 380 to 420px.
- Wide: max 440px.
- Mobile: side panel becomes stacked agenda below controls or default first view.

Event bars:
- Max visible lanes per week before overflow:
  - Mobile: 1 to 2.
  - Tablet: 2 to 3.
  - Desktop: 4 to 5.
- Overflow count is required.

### Scroll Strategy

Page scroll:
- Primary vertical scroll on default calendar pages.

Calendar canvas:
- Month grid should not create its own vertical scroll on desktop unless the page is intentionally viewport-bounded.
- On mobile/tablet, horizontal scroll is allowed for the grid only if the alternative agenda view remains available.

Agenda side panel:
- May scroll internally only when the calendar canvas is viewport-bounded.
- Otherwise it should flow with page scroll.

Nested scroll:
- Calendar grid inside page scroll plus side panel scroll is allowed only on desktop and only when the side panel has explicit height.
- Calendar cell internal scroll is not allowed.
- Event lists inside cells must use overflow count, not scroll.

Modal scroll:
- Event modals follow Modal Template.

### Responsive Rules

Mobile:
- Default to agenda/list-first view.
- Month grid becomes optional compact overview or horizontal canvas.
- Day cells show date, today/selected state and max 1 to 2 event indicators.
- Multi-day bars should simplify to stacked labels or agenda rows.
- Actions collapse into toolbar overflow.
- Create action remains accessible.

Tablet:
- Month grid can render with compact event bars.
- Side panel stacks below calendar.
- Filters may wrap into two rows.
- Event cards inside cells show title and time only.

Laptop:
- Month grid full width.
- Side panel optional below or right depending on width.
- Toolbar one to two rows.

Desktop:
- Two-column layout recommended: calendar canvas plus agenda side panel.
- Full event bars with truncation and overflow.
- Calendar controls stay above grid.

Ultrawide:
- Calendar plus side panel remains max readable.
- Do not stretch day cells so far that event bars become disconnected from day labels.
- Additional timeline panel allowed only if it replaces, not duplicates, agenda.

### Allowed Components

Complex components:
- Calendar Cells.
- Calendar Event Bars.
- Event Cards.
- Pokemon Cards as compact featured Pokemon previews.
- Pokemon Detail Modal.
- Dense Data Panels for raw event/source sections inside modals.
- Tables only for alternate event list view.

Composite components:
- Filter Bars.
- Toolbar Groups.
- Search Bars.
- KPI Blocks.
- Stat Rows.
- Card Headers.
- Modal Headers.
- Action Rows.
- Pokemon Type Chips.

Atomic components:
- Buttons.
- Icon Buttons.
- Inputs.
- Selects.
- Badges.
- Chips.
- Tooltips.
- Tabs.

Disallowed:
- Scrollable event lists inside calendar cells.
- Full Pokemon card grids inside the calendar canvas.
- Multiple legends competing with event bars.
- Secondary navigation unrelated to time.

### Density Budget

Budget: Extreme.

Recommended visible object count:
- Mobile agenda: 10 to 24.
- Tablet grid: 35 to 70.
- Desktop month grid: 60 to 140.
- Ultrawide: 80 to 160 only if event bars remain grouped by week and lane.

The extreme budget is acceptable because the calendar is spatial. The grid itself reduces cognitive cost when alignment is precise.

### Cognitive Load Budget

The user should be able to answer:
- What is today?
- Which events are current?
- Which events overlap?
- Which events are coming soon?
- Which items need admin action?

Visible information target:
- 1 active date range.
- 1 view mode.
- 1 filter state.
- 7 day columns.
- Max 5 event lanes per week.
- 1 agenda side panel or timeline summary.

Event colors must be meaningful and restrained:
- Event type.
- Event status.
- Urgency/current state.
- Selected/focused state.

### Do / Don't

Do:
- Preserve alignment across weeks.
- Use consistent lane logic for multi-day bars.
- Keep today and selected date unmistakable.
- Use overflow counts instead of cell scrolling.
- Provide agenda fallback for mobile.
- Use event detail modal for deep content.

Don't:
- Put images inside every event bar.
- Let every event type use equally saturated color.
- Allow text to overlap across cells.
- Hide multi-day continuation logic.
- Show both a huge timeline and huge month grid with equal priority.
- Make the whole page depend on horizontal scroll without an agenda fallback.

### Complexity Score

Score: 10/10.

Reason:
- Highest visual density.
- Requires spatial consistency.
- Multi-day events and single-day events compete for limited cell space.
- Needs responsive transformation, not simple stacking.
- Requires strict scroll and overflow rules.

### P0 Calendar Template Rules

1. Calendar Cells and Calendar Event Bars must be designed before the full page frame.
2. Day cell internal scroll is forbidden.
3. Overflow is shown with count and accessible label.
4. Agenda view is mandatory for mobile.
5. Event modals own detailed content.
6. Color must encode event meaning, not decoration.
7. Calendar toolbar must never wrap beyond two rows on desktop.

---

## 5. Data Heavy Template - P0 Critical

### Role

Data Heavy Template is for technical, tabular and diagnostic workloads. It exists when the user must inspect many rows, read structured values, compare states, understand logs or operate on JSON/source data.

It must support:
- Mongo DB page.
- Source monitoring.
- Source history and deploy history.
- Logs & MAJ.
- JSON rules.
- Export JSON.
- Comparison tools.
- Docs JSON.
- Backlog lists.
- Dense admin tables.

This template prioritizes scan, comparison and technical trust.

### Layout Zones

Sidebar:
- Global sidebar only.

Topbar:
- Global topbar sticky.
- Global search remains available but local data search is more important.

Header:
- Data command header.
- Contains:
  - Eyebrow/domain.
  - Page title.
  - Short description.
  - Primary data action: refresh, sync, import, export, verify.

Toolbars:
- Required for most data-heavy pages.
- May include:
  - Search.
  - Filters.
  - Sort.
  - View density toggle.
  - Export/import actions.
  - Reset/refresh.

Content:
- KPI/status row.
- Main data surface:
  - table,
  - dense panel,
  - log list,
  - JSON panel,
  - comparison matrix,
  - source cards.
- Secondary detail or evidence block.

Footer:
- Optional.
- For paginated pages, pagination belongs near table, not global footer.

Side panels:
- Allowed for inspector/detail on desktop.
- Must be collapsible.
- Width target: 360 to 480px.

Overlays:
- History modals.
- Import/export modals.
- Detail modals.
- Confirmation modals.

### Width Constraints

Max width:
- 1680px.

Gutters:
- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

Data surface widths:
- Tables: full available width.
- JSON/code panels: full width, with line-length controls and horizontal scroll.
- Two-column dashboard panels:
  - Desktop: 1fr / 1fr or 1.1fr / .9fr.
  - Wide: keep max text line length readable.
- Inspector side panel:
  - Desktop: 360 to 480px.
  - Ultrawide: max 520px.

Table min widths:
- Simple table: 720px.
- Admin table: 960px.
- Comparison matrix: 1120px+ with horizontal scroll.

### Scroll Strategy

Page scroll:
- Default primary vertical scroll.

Internal scroll:
- Allowed for:
  - Table body when table is viewport-bounded.
  - Code/JSON panel.
  - Log panel.
  - History modal body.
  - Inspector panel when fixed beside table.

Nested scroll:
- Do not put scrollable logs inside scrollable cards inside a scrollable page.
- If a data panel scrolls, its parent should not also impose a competing max-height unless it is a modal.

Horizontal scroll:
- Explicitly allowed and expected for:
  - Tables.
  - JSON/code.
  - Diffs.
  - Comparison matrices.
- Must show clear edge affordance or allow touch/pointer panning.

Sticky:
- Table header may be sticky.
- Data toolbar may be sticky below topbar for long tables.
- KPI row should not be sticky.

### Responsive Rules

Mobile:
- Convert simple tables to stacked rows when possible.
- Keep technical code panels horizontally scrollable.
- Toolbar becomes stacked filter group.
- Inspector side panel becomes modal/drawer.
- Hide low-priority columns behind row expansion.

Tablet:
- Tables may remain horizontal with scroll.
- KPI row 2 columns.
- Dense panels single column.
- Toolbar wraps into two rows maximum.

Laptop:
- Table plus optional inspector when width allows.
- Dense panels 1 to 2 columns.
- KPI row 3 to 4 columns.

Desktop:
- Main data surface can use full width.
- Inspector side panel allowed.
- Sticky toolbar allowed for long workflows.

Ultrawide:
- Do not add columns only because space exists.
- Use extra space for inspector or comparison, not for stretching text.
- Tables may show more columns if those columns are operationally useful.

### Allowed Components

Complex components:
- Tables.
- Dense Data Panels.
- Widgets.
- Event Cards only as compact list evidence.
- Pokemon Cards only as compact row/card hybrid.
- Backlog Cards.
- Kanban Cards.
- Pokemon Detail Modal.

Composite components:
- Search Bars.
- Filter Bars.
- Toolbar Groups.
- KPI Blocks.
- Stat Rows.
- Card Headers.
- Pagination.
- Action Rows.
- Modal Headers.

Atomic components:
- All Phase 3C atoms, especially inputs, textareas, badges, tabs and progress bars.

Disallowed:
- Decorative media-heavy cards as primary data view.
- Full calendar grid.
- Large Pokemon sprite grids unless the page is specifically asset review.
- Scrollable cards nested inside scrollable data panels.

### Density Budget

Budget: Extreme.

Recommended visible object count:
- Mobile: 10 to 24.
- Tablet: 20 to 50.
- Desktop: 40 to 100.
- Ultrawide: 60 to 140 for tables/logs only.

The Data Heavy Template may show extreme density if:
- columns are aligned,
- filters are visible,
- statuses are color-coded consistently,
- rows can be scanned in repeated patterns,
- raw JSON/code is visually separated from human summaries.

### Cognitive Load Budget

Visible information target:
- 1 page purpose.
- 1 action toolbar.
- 3 to 5 global metrics.
- 1 primary data surface.
- 0 to 1 detail inspector.
- 1 pagination or row count.

The template should separate:
- Summary: what happened?
- Evidence: where is it visible?
- Action: what can the admin do?

### Do / Don't

Do:
- Use tables or dense panels for repeated technical data.
- Keep table headers visible on long datasets.
- Use monospace only for technical values, code, keys and IDs.
- Preserve row alignment.
- Provide row count, filter count or result count.
- Use inspector side panel only for selected row detail.

Don't:
- Replace tables with decorative cards when comparison is needed.
- Put long JSON inside small cards.
- Use equal visual weight for summary and raw payload.
- Hide filters below the fold.
- Make every panel scroll independently.
- Stretch code lines without horizontal control.

### Complexity Score

Score: 9/10.

Reason:
- High data volume.
- High risk of scroll traps.
- Technical readability is critical.
- Needs responsive table/data transformations.
- Used by source monitoring, JSON rules and Mongo diagnostics.

### P0 Data Heavy Template Rules

1. The main data surface must be obvious.
2. Search and filters stay above the data they affect.
3. Tables and code panels may scroll horizontally.
4. Vertical nested scroll is the exception, not the default.
5. Summary and raw data must be visually separated.
6. Inspector side panel must not duplicate the table.
7. Dense Data Panels are the preferred shell for JSON, logs, diffs and payload previews.

---

## 6. Analytics Template

### Role

Analytics Template is for comparative reading and progression interpretation. It exists to turn metrics into quick understanding without requiring raw inspection.

It must support:
- Personal progression analytics.
- Pokemon API analytics.
- KPI clusters.
- Charts.
- Progress bars.
- Insight cards.
- Reorderable analytics widgets.

It should feel calmer than Admin and Data Heavy templates.

### Layout Zones

Sidebar:
- Global sidebar only.
- Active item: Analytics.

Topbar:
- Global topbar sticky.
- Global search remains available.

Header:
- Analytics header.
- Contains:
  - Eyebrow.
  - Page title.
  - Description.
  - Optional refresh or date range action.

Toolbars:
- Optional widget management toolbar.
- Optional date range/filter toolbar.
- Should not dominate the page.

Content:
- KPI grid.
- Chart grid.
- Insight cards.
- Progress panels.
- Optional sortable widget layout.

Footer:
- Standard footer allowed.

Side panels:
- Not default.
- Optional insight panel on desktop only if it adds interpretation.

Overlays:
- Chart detail modal optional.
- Widget settings modal optional.

### Width Constraints

Max width:
- 1680px.

Gutters:
- Mobile: 16px.
- Tablet: 24px.
- Desktop: 32px.

KPI grid:
- Mobile: 1 column.
- Tablet: 2 columns.
- Desktop: 4 columns.
- Wide: 4 columns preferred; 8 only for very compact metrics.

Chart grid:
- Mobile: 1 column.
- Tablet: 1 column.
- Laptop/Desktop: 2 columns.
- Wide: 2 columns with asymmetric widths allowed.

Chart cards:
- Minimum chart height: 280px.
- Preferred desktop chart height: 320 to 360px.
- Avoid tiny charts inside narrow cards.

### Scroll Strategy

Page scroll:
- Primary and usually only vertical scroll.

Internal scroll:
- Not allowed for charts.
- Allowed only for a long supporting list if capped and clearly secondary.

Nested scroll:
- Not allowed.

Horizontal scroll:
- Avoid except for very dense legends.

### Responsive Rules

Mobile:
- KPI cards stack.
- Charts become full-width.
- Legends wrap below charts.
- Tooltips must not cover core data.

Tablet:
- KPI cards 2 columns.
- Charts remain mostly single column unless width is generous.

Laptop:
- KPI grid 4 columns.
- Charts 2 columns where readable.

Desktop:
- Header full width.
- KPI grid compact.
- Charts use balanced 2-column layout.

Ultrawide:
- Keep charts from becoming too wide.
- Use extra width for side-by-side comparison, not single stretched charts.

### Allowed Components

Complex components:
- Widgets.
- Dense Data Panels only for compact supporting evidence.
- Tables only for secondary detail below charts.

Composite components:
- KPI Blocks.
- Stat Rows.
- Card Headers.
- Toolbar Groups.
- Filter Bars.
- Action Rows.

Atomic components:
- Badges.
- Buttons.
- Icon Buttons.
- Chips.
- Progress Bars.
- Tooltips.
- Tabs when analytics has multiple views.

Disallowed:
- Full Pokemon card grids.
- Full calendar grids.
- Large raw JSON/code panels.
- Deep modal-driven editing workflows as primary experience.

### Density Budget

Budget: Medium-High.

Recommended visible object count:
- Mobile: 8 to 16.
- Tablet: 12 to 24.
- Desktop: 20 to 40.
- Ultrawide: max 48 unless dashboard is explicitly a wallboard.

Analytics can show multiple numbers, but it must avoid asking the user to compare too many unrelated metrics at once.

### Cognitive Load Budget

The user should be able to answer:
- What improved?
- What regressed?
- What is the current level?
- What should I inspect next?

Visible information target:
- 1 narrative header.
- 4 to 8 KPIs.
- 2 to 4 charts.
- 1 to 3 interpretation panels.

Charts must include:
- clear title,
- context,
- visible axis or legend,
- restrained palette,
- readable values.

### Do / Don't

Do:
- Use charts when comparison matters.
- Use KPI blocks for headline values.
- Keep chart cards readable and stable.
- Separate personal analytics from Pokemon API analytics when needed.
- Use concise labels.

Don't:
- Mix unrelated metrics without grouping.
- Put too many charts in one viewport.
- Use raw tables as first screen.
- Overuse animated chart entrances.
- Make chart colors louder than status semantics.

### Complexity Score

Score: 6/10.

Reason:
- Moderate responsive complexity.
- Chart readability matters.
- Lower operational risk than Admin/Calendar/Data Heavy.
- Needs good hierarchy more than advanced interaction.

---

## Cross-Template Navigation Rules

### Global Navigation

Global sidebar groups:
- Dashboard.
- Pokemon Data.
- Organisation.
- Studio JS.
- Systeme.

Only top-level destinations belong here. The Pokemon Admin internal sections remain inside Admin Template.

### Secondary Navigation

Allowed templates:
- Admin Template.
- Calendar Template only for view mode, not section navigation.
- Data Heavy Template only for tabs when data categories are mutually exclusive.

Not allowed:
- Home Template.
- Analytics Template by default.
- Modal Template except tabs inside entity detail.

### Breadcrumbs

Breadcrumb depth:
- Level 1: global group.
- Level 2: page.
- Level 3: active admin section or selected entity, only when useful.

Examples:
- Pokemon Data / Admin Pokemon / Regles JSON.
- Pokemon Data / Admin Pokemon / Calendrier Events / Forever Forward.
- Systeme / Mongo DB.

## Cross-Template Scroll Rules

| Template | Primary scroll | Internal scroll allowed | Nested vertical scroll |
|---|---|---|---|
| Home | Page | Rare, discouraged | No |
| Admin | Page | Tables, code, calendar side panel, modals | Only modal or bounded data surface |
| Modal | Modal body | Code/table horizontal, textarea | Avoid vertical nesting |
| Calendar | Page or bounded calendar canvas | Agenda side panel, modal body | Desktop-only exception |
| Data Heavy | Page | Table body, code/log panel, inspector, modal body | Limited and explicit |
| Analytics | Page | Rare supporting list | No |

## Cross-Template Component Rules

Do:
- Reuse complex components from Phase 3E.
- Use composite toolbars/search/filter groups before inventing local control rows.
- Use atomic states consistently.
- Bind all future Figma frames to `Dashboard Admin Tokens`.

Don't:
- Create a new visual style per template.
- Mix many border radii inside one page.
- Add page-specific colors outside semantic/component tokens.
- Use Pokemon assets as generic decoration.
- Turn every section into a floating card if it is a full page region.

## Phase 4B Figma Readiness

Figma generation order:
1. Global template frame and shell boundaries.
2. Home Template.
3. Analytics Template.
4. Data Heavy Template.
5. Admin Template.
6. Calendar Template.
7. Modal Template variants.

Reason:
- Home and Analytics validate base page rhythm.
- Data Heavy defines technical density.
- Admin composes the broadest workspace.
- Calendar needs the mature density rules from Data Heavy.
- Modal variants depend on Pokemon Detail, Event Detail and history patterns.

Required Phase 4B frames:
- `Template/Home/Desktop`
- `Template/Home/Mobile`
- `Template/Admin/Desktop`
- `Template/Admin/Mobile`
- `Template/Modal/Pokemon Detail`
- `Template/Modal/Event Detail`
- `Template/Modal/Data History`
- `Template/Calendar/Desktop`
- `Template/Calendar/Mobile Agenda`
- `Template/Data Heavy/Desktop`
- `Template/Data Heavy/Mobile`
- `Template/Analytics/Desktop`
- `Template/Analytics/Mobile`

## Validation Checklist

- Six templates documented: yes.
- Admin Template documented deeply: yes.
- Calendar Template documented deeply: yes.
- Data Heavy Template documented deeply: yes.
- Layout zones defined for every template: yes.
- Width constraints defined for every template: yes.
- Scroll strategy defined for every template: yes.
- Responsive rules defined for every template: yes.
- Allowed complex components defined for every template: yes.
- Density budgets defined for every template: yes.
- Cognitive load budgets defined for every template: yes.
- Do / Don't defined for every template: yes.
- Complexity scores defined for every template: yes.
- No Figma call required: yes.
- No code implementation: yes.
- No production dashboard modification: yes.

## Architecture Status

Phase 4A Template Architecture is validated for Phase 4B visual rendering.


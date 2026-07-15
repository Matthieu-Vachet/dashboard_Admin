# Phase 3E-PREP - Complex Component Spec

Project: Dashboard Admin Pokemon GO  
Target Figma page: `05 Complex Components`  
Status: Ready for future Figma generation when MCP quota resets  
Mode: DARK MODE ONLY  

## Scope

This document prepares the Complex Components layer of the Pokemon GO Admin Design System. It is documentation only and must be used as the source of truth for the next Figma rendering pass.

Rules:
- No Figma MCP call in this prep phase.
- No code implementation.
- No production dashboard modification.
- Every complex component must reuse Phase 3C atomic components and Phase 3D composite components.
- No local arbitrary styling.
- No duplicated visual logic.
- Scrollable zones, visual hierarchy, density budget and cognitive load must be explicit.
- P0 critical components receive deeper documentation:
  - Pokemon Detail Modal
  - Calendar Cells
  - Calendar Event Bars
  - Dense Data Panels

## Source Dependencies

Composite component source:
- `Composite/Search Bars`
- `Composite/Filter Bars`
- `Composite/Toolbar Groups`
- `Composite/Pokemon Type Chips`
- `Composite/KPI Blocks`
- `Composite/Stat Rows`
- `Composite/Card Headers`
- `Composite/Modal Headers`
- `Composite/Pagination`
- `Composite/Action Rows`

Atomic component source:
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Input`
- `Atomic/Textarea`
- `Atomic/Select`
- `Atomic/Checkbox`
- `Atomic/Switch`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Label`
- `Atomic/Divider`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`
- `Atomic/Tabs Primitive`

Token collection:
- `Dashboard Admin Tokens`

Mode:
- `Dark Mode`

## Generation Rules

Naming:
- Component sets: `Complex/<Family>`
- Variant properties use `Property=Value` format.
- Use public token names in documentation and Figma slash names during generation.

Hierarchy rule:
- Complex components may define information architecture, layout, scrolling and composition.
- Complex components must not invent visual primitives.
- Any interactive control must come from an atomic or composite dependency.

Density rule:
- Compact variants prioritize scanning and repeated admin work.
- Comfortable variants prioritize comprehension.
- Expanded variants expose secondary data only when the user intentionally asks for it.

Performance rule:
- Large grids, tables, calendar surfaces and media-heavy cards must be designed for lazy loading or virtualization.
- Modal content must have explicit scroll boundaries.
- Heavy image assets must have thumbnail, loading and error states.

## Variant Count Summary

| Family | Formula | Estimated future Figma variants |
|---|---:|---:|
| Sidebar | 2 modes x 2 densities x 2 permissions x 5 states | 40 |
| Widgets | 4 types x 3 layouts x 5 states | 60 |
| Tables | 4 table modes x 3 sizes x 6 states | 72 |
| Pokemon Cards | 4 variants x 3 sizes x 5 states | 60 |
| Raid Cards | 3 variants x 3 urgency tones x 5 states | 45 |
| Egg Cards | 3 egg distances x 2 layouts x 5 states | 30 |
| Rocket Cards | 4 variants x 2 densities x 5 states | 40 |
| Research Cards | 4 variants x 2 modes x 5 states | 40 |
| Event Cards | 4 variants x 2 densities x 5 states | 40 |
| Calendar Cells | 4 views x 4 day types x 6 states | 96 |
| Calendar Event Bars | 5 event types x 3 densities x 6 states | 90 |
| Pokemon Detail Modal | 5 content views x 3 modes x 6 states | 90 |
| Backlog Cards | 4 priority tones x 3 densities x 5 states | 60 |
| Kanban Cards | 4 card types x 3 densities x 5 states | 60 |
| Dense Data Panels | 4 panel types x 3 densities x 6 states | 72 |

Total estimated future Figma variants: **895**

---

## 1. Sidebar

### Role

The Sidebar is the persistent navigation anchor for the admin dashboard. It gives fast access to Pokemon data, events, assets, monitoring, tools, backlog, settings and system sections.

### Composite Dependencies

- `Composite/Toolbar Groups` for collapse/settings actions.
- `Composite/Pokemon Type Chips` only for domain shortcuts if needed.
- `Composite/Action Rows` for footer account/admin actions.

### Atomic Dependencies

- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Label`

### Anatomy

- Root sidebar shell.
- Brand/product zone.
- Primary navigation list.
- Section headings.
- Navigation item.
- Optional badge/count per item.
- Optional status chip.
- Collapse/expand control.
- Footer account/admin zone.
- Scrollable navigation body.

### Variants

Mode:
- `expanded`
- `collapsed`

Density:
- `compact`
- `comfortable`

Permission:
- `readonly`
- `admin`

### States

Generated states:
- `default`
- `hover`
- `focus`
- `selected`
- `disabled`

Documented states:
- `loading`: skeleton nav or shimmer for permissions.
- `empty`: not applicable; fallback to minimum nav.
- `error`: show system badge in footer.

### Responsive Behavior

- Mobile: transforms into drawer navigation; body locks behind overlay.
- Tablet: collapsible rail by default, expanded on demand.
- Desktop: expanded default.
- Ultrawide: remains fixed width; content area grows.

### Token Bindings

- Surface: `semantic.color.surface.strong`
- Background: `semantic.color.background`
- Active item: `component.sidebar.active.background`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.md`, `primitive.radius.lg`
- Padding/gap: `primitive.spacing.2`, `primitive.spacing.3`, `primitive.spacing.4`
- Z-index: `primitive.z.sidebar`
- Motion: `primitive.motion.normal`

### Performance Considerations

- Keep navigation data static or memoized.
- Badge counts should update independently from full sidebar render.
- Collapse animation should transform width only, not trigger heavy layout recalculation.

### Accessibility Rules

- Use navigation landmark.
- Current page exposes `aria-current=page`.
- Collapse button exposes expanded/collapsed state.
- Keyboard order follows visual order.
- Collapsed icon-only items require tooltips and accessible labels.

### Scrollable Zones

- Only the navigation body scrolls.
- Brand zone and footer zone remain pinned.
- Scrollbar must be low contrast but visible on hover/focus.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: brand, active nav item, section labels.
- Density budget: max 8 primary sections visible without scrolling on 1440px height.
- Cognitive load: collapsed mode must not require memorizing obscure icons; tooltips are mandatory.

### Do / Don't

Do:
- Keep active location obvious.
- Group domain areas consistently.
- Surface critical system badges sparingly.

Don't:
- Do not place page-specific filters in the sidebar.
- Do not rely on color alone for active nav.
- Do not animate every item independently.

### Estimated Variant Count

2 modes x 2 densities x 2 permissions x 5 states = **40**

---

## 2. Widgets

### Role

Widgets are reusable dashboard modules for metrics, alerts, source status, sync activity, recent updates and compact operational summaries.

### Composite Dependencies

- `Composite/KPI Blocks`
- `Composite/Stat Rows`
- `Composite/Card Headers`
- `Composite/Toolbar Groups`
- `Composite/Action Rows`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Progress Bar`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Label`

### Anatomy

- Widget surface.
- Card header.
- Optional toolbar/actions.
- Primary content region.
- Optional KPI/stat list.
- Optional chart placeholder.
- Footer metadata/action row.
- Loading/empty/error surface.

### Variants

Type:
- `metric`
- `chart`
- `list`
- `activity`

Layout:
- `compact`
- `comfortable`
- `expanded`

### States

Generated states:
- `default`
- `loading`
- `empty`
- `error`
- `selected`

Documented states:
- `hover` and `focus` apply when widget is interactive.
- `disabled` is rare and should be represented by muted content.

### Responsive Behavior

- Mobile: widgets stack vertically.
- Tablet: 2-column grid.
- Desktop: 3-4 column responsive grid.
- Ultrawide: max content width; avoid stretching chart widgets beyond readable range.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Border: `semantic.color.border.default`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Status: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`, `primitive.spacing.6`
- Shadow: `primitive.shadow.card`

### Performance Considerations

- Defer expensive chart rendering until visible.
- Data refresh should not re-render entire dashboard grid.
- Use skeleton dimensions matching final layout.
- Activity lists should cap visible rows.

### Accessibility Rules

- Each widget needs a heading.
- Error/empty states must be text-readable.
- Dynamic updates use polite live regions only for important changes.
- Action controls remain keyboard reachable.

### Scrollable Zones

- Widget body may scroll only in expanded layout.
- Compact widgets should not contain nested scroll.
- Activity lists can scroll after 5 visible rows.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: header title and primary metric.
- Density budget: compact widget max 3 data points; comfortable max 6; expanded max 12.
- Cognitive load: avoid mixing chart, table and narrative in one widget.

### Do / Don't

Do:
- Use widgets for self-contained summaries.
- Keep actions close to their module.

Don't:
- Do not use widgets as generic card decoration.
- Do not put full tables inside compact widgets.

### Estimated Variant Count

4 types x 3 layouts x 5 states = **60**

---

## 3. Tables

### Role

Tables power dense admin workflows: Pokemon lists, raids, eggs, research, assets, logs, JSON rules, source monitoring and backlog views.

### Composite Dependencies

- `Composite/Search Bars`
- `Composite/Filter Bars`
- `Composite/Toolbar Groups`
- `Composite/Pagination`
- `Composite/Stat Rows`
- `Composite/Action Rows`

### Atomic Dependencies

- `Atomic/Checkbox`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Progress Bar`

### Anatomy

- Table container.
- Header toolbar.
- Search/filter zone.
- Column header row.
- Sort controls.
- Data rows.
- Selection checkboxes.
- Row action cells.
- Empty/loading/error states.
- Footer pagination.
- Horizontal and vertical scroll regions.

### Variants

Table mode:
- `standard`
- `dense`
- `selectable`
- `virtualized`

Size:
- `sm`
- `md`
- `lg`

### States

Generated states:
- `default`
- `loading`
- `empty`
- `error`
- `selected`
- `disabled`

Documented states:
- `hover` applies to rows.
- `focus` applies to cells/actions.

### Responsive Behavior

- Mobile: table becomes stacked list/card rows or horizontal scroll if data integrity requires columns.
- Tablet: hide low-priority columns behind row expansion.
- Desktop: full column set with sticky header.
- Ultrawide: do not over-stretch text columns; cap readable widths.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Row surface: `semantic.color.surface.strong`
- Header surface: `semantic.color.surface.strong`
- Border/divider: `semantic.color.border.default`
- Focus/selected: `semantic.color.border.active`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.2`, `primitive.spacing.3`, `primitive.spacing.4`
- Z-index header: `primitive.z.topbar`

### Performance Considerations

- Use virtualization for more than 100 rows.
- Sticky headers should not re-render row cells.
- Row action menus should lazy mount.
- Heavy cells with images use thumbnails and lazy loading.
- Keep column resize and sorting calculations memoized.

### Accessibility Rules

- Use semantic table where possible.
- Sortable headers expose sort direction.
- Selection state is announced.
- Keyboard cell navigation must be predictable.
- Row actions require clear accessible names.

### Scrollable Zones

- Table body is the main vertical scroll zone.
- Horizontal scroll only in table viewport, not whole page.
- Toolbar and pagination remain outside row scroll.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: toolbar, column headers, selected rows, error states.
- Density budget: dense rows min 36px, standard rows min 44px.
- Cognitive load: group row actions, do not show more than 4 inline actions.

### Do / Don't

Do:
- Use tables for comparison and high-density scanning.
- Keep selection and row actions stable.

Don't:
- Do not put variable-height rich cards inside table rows.
- Do not hide critical row status in tooltips.

### Estimated Variant Count

4 table modes x 3 sizes x 6 states = **72**

---

## 4. Pokemon Cards

### Role

Pokemon Cards summarize Pokemon entities for lists, collections, search results and detail previews.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Pokemon Type Chips`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/Toolbar Groups`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Tooltip`
- `Atomic/Progress Bar`

### Anatomy

- Card surface.
- Pokemon image/sprite zone.
- Name and number.
- Type chips.
- Stat row group.
- Evolution/availability badges.
- Action row.
- Optional admin metadata.
- Loading image placeholder.

### Variants

- `compact`
- `comfortable`
- `expanded`
- `admin`

Sizes:
- `sm`
- `md`
- `lg`

### States

Generated states:
- `default`
- `hover`
- `focus`
- `selected`
- `loading`

Documented states:
- `empty`: missing Pokemon data.
- `error`: image/data load failure.
- `disabled`: unavailable archived Pokemon.

### Responsive Behavior

- Mobile: image left, metadata stacked; action row collapses.
- Tablet: two-column internal layout.
- Desktop: grid card layout.
- Ultrawide: max card width to avoid sparse cards.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Selected border: `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Type fallback: `primitive.color.violet.500`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`
- Shadow: `primitive.shadow.card`

### Performance Considerations

- Lazy load sprites/images.
- Use fixed image aspect ratio to prevent layout shift.
- Defer admin metadata rendering in compact cards.
- Use virtualization in large Pokemon grids.

### Accessibility Rules

- Pokemon name is the card heading.
- Image alt text includes Pokemon name or is decorative when name is adjacent.
- Type chips must expose type names.
- Card actions are individually focusable.

### Scrollable Zones

- Card itself should not scroll.
- Expanded metadata may use collapsed sections, not nested scroll.
- Parent grid owns scrolling.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: Pokemon image, name, type chips.
- Density budget: compact max 4 stats; comfortable max 8; expanded max 14.
- Cognitive load: hide advanced JSON/admin fields unless admin variant is active.

### Do / Don't

Do:
- Use cards for visual Pokemon recognition.
- Keep type chips near name.

Don't:
- Do not overload compact cards with all stats.
- Do not crop sprites unpredictably.

### Estimated Variant Count

4 variants x 3 sizes x 5 states = **60**

---

## 5. Raid Cards

### Role

Raid Cards summarize raid bosses, tier, timing, counters and admin status for Pokemon GO raid management.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Pokemon Type Chips`
- `Composite/Stat Rows`
- `Composite/KPI Blocks`
- `Composite/Action Rows`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`

### Anatomy

- Raid card surface.
- Boss image/name.
- Raid tier badge.
- Type chips.
- Time/status row.
- CP/weakness stat rows.
- Counter summary.
- Action row.

### Variants

- `compact`
- `comfortable`
- `expanded`

Urgency tone:
- `normal`
- `soon`
- `expired`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `error`

Documented states:
- `focus`: if card is clickable.
- `empty`: no raid data.
- `disabled`: archived raid.

### Responsive Behavior

- Mobile: boss and tier first, counters hidden.
- Tablet: compact stats visible.
- Desktop: counters and actions visible.
- Ultrawide: keep card max width.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Urgency warning: `semantic.color.state.warning`
- Error/expired: `semantic.color.state.error`
- Active: `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Lazy load boss art.
- Counter lists should cap visible entries.
- Time updates should not rerender full card grid.

### Accessibility Rules

- Tier and time status must be text readable.
- Countdown updates should not spam live regions.
- Actions are separately labelled.

### Scrollable Zones

- No internal scroll.
- Expanded counter list can use show more instead of nested scroll.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: boss, tier, urgency.
- Density budget: compact max 3 stats; expanded max 10.
- Cognitive load: avoid showing all counters by default.

### Do / Don't

Do:
- Use urgency tone consistently.
- Keep tier visible.

Don't:
- Do not use red for non-expired normal raids.
- Do not display dense counter tables inside compact cards.

### Estimated Variant Count

3 variants x 3 urgency tones x 5 states = **45**

---

## 6. Egg Cards

### Role

Egg Cards summarize egg pools, hatch distance, rarity and Pokemon availability.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Pokemon Type Chips`
- `Composite/Stat Rows`
- `Composite/Action Rows`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Tooltip`
- `Atomic/Progress Bar`

### Anatomy

- Egg card surface.
- Egg distance badge.
- Pokemon preview/sprite cluster.
- Rarity labels.
- Availability stat row.
- Action row.

### Variants

Egg distance:
- `2km`
- `5km`
- `10km`

Layout:
- `compact`
- `expanded`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `empty`

Documented states:
- `focus`: interactive cards.
- `error`: missing pool data.
- `disabled`: archived pool.

### Responsive Behavior

- Mobile: list-style card.
- Tablet: compact grid.
- Desktop: card grid.
- Ultrawide: cap preview cluster width.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Border: `semantic.color.border.default`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`
- Status: `semantic.color.state.warning`

### Performance Considerations

- Lazy load sprite cluster.
- Limit visible Pokemon previews.
- Use fixed thumbnail sizes.

### Accessibility Rules

- Egg distance and rarity must be textual.
- Sprite cluster should not duplicate all names if labels exist elsewhere.
- Card actions need labels.

### Scrollable Zones

- No internal scroll.
- Expanded pool preview uses show more or modal.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: distance badge, pool status.
- Density budget: compact max 5 preview sprites; expanded max 12.
- Cognitive load: do not show full hatch table inside card.

### Do / Don't

Do:
- Use consistent distance labels.
- Keep availability status prominent.

Don't:
- Do not rely on egg color only.
- Do not show rare pool details without labels.

### Estimated Variant Count

3 egg distances x 2 layouts x 5 states = **30**

---

## 7. Rocket Cards

### Role

Rocket Cards summarize Team GO Rocket encounters: grunt/leader/Giovanni data, rewards, lineups, counters and admin edits.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Pokemon Type Chips`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/KPI Blocks`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Tooltip`

### Anatomy

- Encounter header.
- Rocket role badge.
- Lineup preview.
- Reward/shadow Pokemon zone.
- Counter/type chips.
- Difficulty/status rows.
- Action row.

### Variants

- `grunt`
- `leader`
- `giovanni`
- `reward`

Density:
- `compact`
- `comfortable`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `error`

Documented states:
- `focus`: card or action focus.
- `empty`: no lineup.
- `disabled`: archived encounter.

### Responsive Behavior

- Mobile: lineup stacks.
- Tablet: lineup horizontal.
- Desktop: full counter summary visible.
- Ultrawide: avoid over-wide lineup gaps.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Danger/rocket tone: `semantic.color.state.error`
- Warning: `semantic.color.state.warning`
- Border: `semantic.color.border.default`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Lazy load lineup sprites.
- Cap counter lists.
- Avoid re-rendering all cards on live source updates.

### Accessibility Rules

- Encounter type must be text.
- Lineup order must be readable.
- Actions require labels.

### Scrollable Zones

- No internal scroll in compact.
- Comfortable can horizontally scroll lineup only if there are many entries.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: role, lineup, reward.
- Density budget: compact max 3 lineup slots; comfortable max 6.
- Cognitive load: counters hidden behind expanded state where needed.

### Do / Don't

Do:
- Separate role and reward clearly.
- Use type chips for counter scanning.

Don't:
- Do not overload card with full battle guide.
- Do not use danger tone for every Rocket item equally.

### Estimated Variant Count

4 variants x 2 densities x 5 states = **40**

---

## 8. Research Cards

### Role

Research Cards display field, special, timed and masterwork research tasks with rewards, progress and admin controls.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/KPI Blocks`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Progress Bar`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Tooltip`

### Anatomy

- Research header.
- Task description.
- Reward zone.
- Progress bar.
- Expiry/status badge.
- Admin action row.
- Optional source metadata.

### Variants

Research type:
- `field`
- `special`
- `timed`
- `masterwork`

Mode:
- `readonly`
- `admin`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `empty`

Documented states:
- `focus`: interactive card/action.
- `error`: invalid source/reward.
- `disabled`: expired/archive.

### Responsive Behavior

- Mobile: reward and progress stack.
- Tablet: compact two-column.
- Desktop: reward row visible.
- Ultrawide: cap text width.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Status: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Border: `semantic.color.border.default`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Reward assets lazy load.
- Progress changes should update localized subtree only.
- Long task text should clamp in compact cards.

### Accessibility Rules

- Task and reward must be text readable.
- Progress bar exposes value when determinate.
- Expiry status uses text and color.

### Scrollable Zones

- No internal scroll.
- Long text clamps with expanded variant or modal.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: task, reward, progress.
- Density budget: compact max one reward row; admin mode may add source metadata.
- Cognitive load: avoid showing raw JSON in cards.

### Do / Don't

Do:
- Keep progress clear.
- Surface expiry for timed research.

Don't:
- Do not hide reward names behind images.
- Do not mix multiple research chains in one card.

### Estimated Variant Count

4 variants x 2 modes x 5 states = **40**

---

## 9. Event Cards

### Role

Event Cards summarize Pokemon GO events: title, timing, bonuses, featured Pokemon, source status and admin actions.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Pokemon Type Chips`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/KPI Blocks`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`

### Anatomy

- Event surface.
- Title and event type.
- Date range.
- Status badge.
- Bonus list.
- Featured Pokemon/type chips.
- Source/update metadata.
- Action row.

### Variants

- `compact`
- `standard`
- `featured`
- `admin`

Density:
- `compact`
- `comfortable`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `error`

Documented states:
- `focus`: interactive card/actions.
- `empty`: no events.
- `disabled`: archived event.

### Responsive Behavior

- Mobile: stacked timeline card.
- Tablet: date/status beside title.
- Desktop: full bonus and action row visible.
- Ultrawide: keep readable line lengths.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Active/selected: `component.card.selected.border`
- Event status: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Lazy load featured Pokemon media.
- Bonus lists should clamp.
- Date calculations should be memoized.

### Accessibility Rules

- Event title is heading.
- Date range must be machine and human readable in implementation.
- Status not color-only.
- Actions labelled.

### Scrollable Zones

- No internal scroll in cards.
- Bonus overflow opens detail modal or expanded card.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: title, date, status.
- Density budget: compact max 3 bonuses; featured max 6.
- Cognitive load: keep source/admin metadata separate from user-facing event info.

### Do / Don't

Do:
- Make event dates immediately visible.
- Use featured variant sparingly.

Don't:
- Do not bury expired status.
- Do not put full event detail in compact card.

### Estimated Variant Count

4 variants x 2 densities x 5 states = **40**

---

## 10. Calendar Cells - P0 Critical

### Role

Calendar Cells are the base unit of scheduling views. They show day/week/resource context, event density, today/selection state and drop targets for event operations.

### Composite Dependencies

- `Composite/Card Headers` for mini day headers if needed.
- `Composite/Toolbar Groups` for cell-level quick actions in expanded views.
- `Composite/Stat Rows` for dense day metrics.
- `Composite/Action Rows` only in popover/detail contexts.

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Divider`
- `Atomic/Tooltip`
- `Atomic/Progress Bar`
- `Atomic/Label`

### Anatomy

- Cell root.
- Date number.
- Day label.
- Today marker.
- Outside-month marker.
- Selection/focus border.
- Event stack preview.
- Overflow count.
- Density indicator.
- Drop target state.
- Optional loading skeleton.
- Optional error marker.

### Variants

View:
- `month`
- `week`
- `day`
- `resource`

Day type:
- `normal`
- `today`
- `outside-range`
- `blocked`

### States

Generated states:
- `default`
- `hover`
- `focus`
- `selected`
- `loading`
- `error`

Documented states:
- `empty`: no event bars inside cell.
- `disabled`: blocked/outside-range behavior.

### Responsive Behavior

- Mobile: cells become agenda list rows; month grid uses minimal event dots.
- Tablet: cells show 1-2 event bars.
- Desktop: cells show stacked event bars with overflow count.
- Ultrawide: maintain max cell content density; do not show unlimited event bars.

### Token Bindings

- Cell surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Today/active: `semantic.color.border.active`
- Selected border: `component.card.selected.border`
- Disabled/outside text: `semantic.color.text.secondary`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`
- Error: `semantic.color.state.error`
- Radius: `primitive.radius.md`
- Padding/gap: `primitive.spacing.1`, `primitive.spacing.2`
- Motion: `primitive.motion.fast`

### Performance Considerations

- Calendar cells must be lightweight; avoid heavy images.
- Event bars inside cells should render from precomputed layout data.
- Month grid must avoid measuring each cell on every update.
- Drag/drop states should update only affected cells.
- Virtualize long resource/day columns.

### Accessibility Rules

- Calendar grid semantics required in implementation.
- Date must be announced with full date.
- Today and selected states must be announced.
- Keyboard navigation supports arrow keys.
- Event overflow button must expose hidden count.
- Drop target behavior must not be mouse-only.

### Scrollable Zones

- Month view: page or calendar viewport scrolls, cells do not.
- Week/day/resource: vertical time/resource grid scrolls; headers remain sticky.
- Cell event stack clips after allowed count and exposes overflow.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: selected cell, today marker, event bars.
- Density budget:
  - Mobile: max 1 visual event marker per cell.
  - Tablet: max 2 bars.
  - Desktop: max 3 bars plus overflow count.
  - Ultrawide: still max 4 bars; use detail panels for more.
- Cognitive load: keep cells scannable; event detail belongs to bars/popovers/modals.

### P0 Critical Notes

- Calendar Cells must be designed before full calendar screens.
- They define event density, interaction model and keyboard navigation.
- They must never contain uncontrolled nested scroll.
- Overflow is mandatory for high-event days.
- Cell layout must preserve equal grid sizing in month view.

### Do / Don't

Do:
- Keep day number visible at all times.
- Use today and selected states distinctly.
- Show overflow count when events exceed density budget.

Don't:
- Do not render full event descriptions inside month cells.
- Do not let event bars resize the calendar grid row unpredictably.
- Do not use color-only blocked/outside states.

### Estimated Variant Count

4 views x 4 day types x 6 states = **96**

---

## 11. Calendar Event Bars - P0 Critical

### Role

Calendar Event Bars visualize event blocks inside calendar cells, timelines and agenda rows. They communicate event type, timing, status, duration and interaction state in a tiny footprint.

### Composite Dependencies

- `Composite/Pokemon Type Chips` for event domain tags in expanded bars.
- `Composite/Stat Rows` for detail popover metadata.
- `Composite/Action Rows` in event popovers.

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Tooltip`
- `Atomic/Label`

### Anatomy

- Bar root.
- Leading event type marker.
- Event title.
- Time range.
- Status/alert marker.
- Optional Pokemon type marker.
- Resize/drag affordance in edit mode.
- Tooltip/popover trigger.

### Variants

Event type:
- `community-day`
- `raid-hour`
- `spotlight-hour`
- `season`
- `custom`

Density:
- `dot`
- `compact`
- `expanded`

### States

Generated states:
- `default`
- `hover`
- `focus`
- `selected`
- `loading`
- `error`

Documented states:
- `empty`: not applicable.
- `disabled`: readonly/archived event.

### Responsive Behavior

- Mobile: event bars become agenda list items or dots.
- Tablet: compact title and time.
- Desktop: compact/expanded bars depending on view.
- Ultrawide: use expanded only in week/day views, not month grid.

### Token Bindings

- Surface: `semantic.color.surface.strong`
- Active/selected: `component.card.selected.border`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Type accent fallback: `primitive.color.cyan.500`, `primitive.color.violet.500`
- Error: `semantic.color.state.error`
- Warning: `semantic.color.state.warning`
- Radius: `primitive.radius.sm`, `primitive.radius.md`
- Padding/gap: `primitive.spacing.1`, `primitive.spacing.2`
- Motion: `primitive.motion.fast`

### Performance Considerations

- Bars must be cheap to render; no heavy images in month/week grid.
- Use precomputed positions for overlapping events.
- Avoid measuring text for every render; clamp title.
- Drag state updates only active bar and affected cell.
- Tooltips/popovers lazy mount.

### Accessibility Rules

- Event title and time must be available to screen readers.
- Selected/focused bars must be keyboard reachable.
- Drag/edit affordances need keyboard equivalent.
- Error state must include textual reason in tooltip/popover.

### Scrollable Zones

- Bars do not scroll internally.
- Parent calendar viewport owns scroll.
- Expanded details open in popover/modal, not inside the bar.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: event title, type marker, selected state.
- Density budget:
  - Dot: marker only.
  - Compact: marker + truncated title.
  - Expanded: marker + title + time + status.
- Cognitive load: do not encode more than one status marker in compact bar.

### P0 Critical Notes

- Calendar Event Bars define the entire calendar readability system.
- Must support overlap, truncation, drag/edit and readonly states.
- Event type colors need future domain token expansion.
- Bars must remain legible at 120px width.

### Do / Don't

Do:
- Clamp titles predictably.
- Preserve event type marker.
- Show selected/focus state clearly.

Don't:
- Do not display full descriptions in bars.
- Do not use more than one bright glow per bar.
- Do not depend on event color without text/tooltip.

### Estimated Variant Count

5 event types x 3 densities x 6 states = **90**

---

## 12. Pokemon Detail Modal - P0 Critical

### Role

Pokemon Detail Modal is the central deep-inspection and editing surface for Pokemon data. It must support read-only review, admin editing, assets, stats, moves, PVP, JSON, validation and source metadata without overwhelming the user.

### Composite Dependencies

- `Composite/Modal Headers`
- `Composite/Action Rows`
- `Composite/Toolbar Groups`
- `Composite/Search Bars`
- `Composite/Filter Bars`
- `Composite/Pokemon Type Chips`
- `Composite/KPI Blocks`
- `Composite/Stat Rows`
- `Composite/Card Headers`
- `Composite/Dense Data Panels` once generated from this spec

### Atomic Dependencies

- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Input`
- `Atomic/Textarea`
- `Atomic/Select`
- `Atomic/Checkbox`
- `Atomic/Switch`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Label`
- `Atomic/Divider`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`
- `Atomic/Tabs Primitive`

### Anatomy

- Modal shell.
- Modal header with title, number, type chips and close action.
- Optional admin toolbar.
- Tab navigation.
- Primary content scroll region.
- Sticky action footer.
- Pokemon media panel.
- KPI/stat summary.
- Moves/attacks section.
- PVP section.
- Assets section.
- JSON/source panel.
- Validation/error region.
- Loading and empty state blocks.

### Variants

Content view:
- `overview`
- `stats`
- `moves`
- `assets`
- `json`

Mode:
- `readonly`
- `edit`
- `admin`

### States

Generated states:
- `default`
- `focus`
- `selected`
- `loading`
- `empty`
- `error`

Documented states:
- `hover`: delegated to child controls.
- `disabled`: readonly or locked fields.

### Responsive Behavior

- Mobile: full-screen modal, single-column, sticky header/footer, tabs horizontally scroll.
- Tablet: two-column where media/summary can sit beside content.
- Desktop: modal max width 1120-1280, content split into side rail + main panel.
- Ultrawide: modal stays capped; do not stretch text/code beyond readable width.

### Token Bindings

- Overlay: `component.modal.overlay`
- Modal surface: `semantic.color.surface.strong`
- Content surface: `semantic.color.surface.base`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Selected border: `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Error: `semantic.color.state.error`
- Warning: `semantic.color.state.warning`
- Success: `semantic.color.state.success`
- Radius: `primitive.radius.modal`, `primitive.radius.lg`, `primitive.radius.md`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`, `primitive.spacing.6`, `primitive.spacing.8`
- Z-index: `primitive.z.modal`
- Motion: `primitive.motion.modal`

### Performance Considerations

- Lazy mount tab content after first activation.
- Heavy media/assets load lazily and use fixed aspect placeholders.
- JSON view should use virtualized code/data rendering for large payloads.
- Validation results should stream into a bounded panel.
- Avoid recalculating all stat sections on simple field edits.
- Keep header/footer sticky without triggering repaint-heavy effects.

### Accessibility Rules

- Dialog semantics required.
- Header title labels the dialog.
- Focus trap required.
- Escape closes unless blocked by unsaved changes.
- Tabs use tablist semantics.
- Sticky footer actions remain keyboard reachable.
- Validation errors must be summarized and linked to fields.
- Readonly/edit/admin mode must be announced through visible text or badge.

### Scrollable Zones

- Overlay does not scroll.
- Modal shell controls viewport fit.
- Header and footer are sticky.
- Main content is the only primary vertical scroll zone.
- JSON/source panels can scroll internally only inside a clearly bounded dense data panel.
- Asset grids scroll inside main content, not nested if avoidable.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: Pokemon identity, active tab, validation status, primary action.
- Density budget:
  - Overview: max 3 KPI blocks + 8 stat rows above fold.
  - Stats: grouped sections, no more than 2 dense columns on desktop.
  - Moves: table/list with filters.
  - Assets: thumbnails with lazy load.
  - JSON: dense panel with search and copy actions.
- Cognitive load:
  - Use progressive disclosure for admin-only details.
  - Do not show JSON and visual form controls at equal hierarchy.
  - Keep destructive actions in footer or admin toolbar, visually separated.

### P0 Critical Notes

- This is the highest-risk component in the design system.
- It combines modal shell, tabs, forms, dense data, assets and validation.
- Scroll boundaries and keyboard behavior must be resolved before visual rendering.
- It is the bridge between Phase 3E complex components and future full-screen templates.

### Do / Don't

Do:
- Keep Pokemon identity visible while scrolling.
- Use tabs to separate mental models.
- Keep admin mode explicit.
- Show unsaved/validation state in header or footer.

Don't:
- Do not put every data field on the overview tab.
- Do not let modal width grow infinitely on ultrawide screens.
- Do not hide JSON validation errors below the fold without summary.

### Estimated Variant Count

5 content views x 3 modes x 6 states = **90**

---

## 13. Backlog Cards

### Role

Backlog Cards summarize work items, bugs, data tasks, design tasks and admin tickets.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/Toolbar Groups`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Checkbox`
- `Atomic/Tooltip`

### Anatomy

- Card surface.
- Title.
- Priority badge.
- Status chip.
- Owner/avatar placeholder.
- Due date or metadata row.
- Description snippet.
- Action row.

### Variants

Priority tone:
- `low`
- `medium`
- `high`
- `critical`

Density:
- `compact`
- `comfortable`
- `expanded`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `disabled`

Documented states:
- `focus`: card/action focus.
- `empty`: no tickets.
- `error`: failed task data.

### Responsive Behavior

- Mobile: list card.
- Tablet: two-column task grid.
- Desktop: backlog board/list.
- Ultrawide: cap line lengths.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Selected: `component.card.selected.border`
- Priority: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Border: `semantic.color.border.default`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Virtualize long backlog lists.
- Lazy load comments/details.
- Do not rerender all cards on drag/select.

### Accessibility Rules

- Card title is heading.
- Priority must be text.
- Drag/drop needs keyboard fallback if implemented.
- Checkbox selection uses proper semantics.

### Scrollable Zones

- Card itself does not scroll.
- Board/list parent owns scroll.
- Expanded card reveals sections instead of nested scroll.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: title, priority, status.
- Density budget: compact max 2 metadata rows; expanded max 6.
- Cognitive load: hide comments/history by default.

### Do / Don't

Do:
- Keep priority visible.
- Use status chip consistently.

Don't:
- Do not pack full ticket history into cards.
- Do not color priority without label.

### Estimated Variant Count

4 priority tones x 3 densities x 5 states = **60**

---

## 14. Kanban Cards

### Role

Kanban Cards support planning boards, workflow states and drag-based organization for project/admin tasks.

### Composite Dependencies

- `Composite/Card Headers`
- `Composite/Stat Rows`
- `Composite/Action Rows`
- `Composite/Toolbar Groups`

### Atomic Dependencies

- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Icon Button`
- `Atomic/Button`
- `Atomic/Checkbox`
- `Atomic/Tooltip`

### Anatomy

- Card root.
- Title.
- Type badge.
- Status/priority chips.
- Assignee/owner marker.
- Due date.
- Checklist/progress marker.
- Quick action row.
- Drag handle.

### Variants

Card type:
- `task`
- `bug`
- `research`
- `content`

Density:
- `compact`
- `comfortable`
- `expanded`

### States

Generated states:
- `default`
- `hover`
- `selected`
- `loading`
- `disabled`

Documented states:
- `focus`: keyboard selection.
- `empty`: empty column, not card state.
- `error`: invalid/missing card data.

### Responsive Behavior

- Mobile: board becomes lane list or stacked columns.
- Tablet: horizontal board scroll.
- Desktop: full kanban columns.
- Ultrawide: cap column width and increase columns, not card width.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Drag/selected: `component.card.selected.border`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Status tones: `semantic.color.state.success`, `semantic.color.state.warning`, `semantic.color.state.error`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.3`, `primitive.spacing.4`

### Performance Considerations

- Virtualize long columns.
- During drag, render lightweight preview.
- Avoid image-heavy content in cards.
- Update only affected columns on move.

### Accessibility Rules

- Drag/drop must have keyboard alternative.
- Card title readable as heading or labelled item.
- Status and priority text required.
- Focus state must be visible during keyboard navigation.

### Scrollable Zones

- Columns scroll vertically.
- Board scrolls horizontally on small screens.
- Cards do not scroll internally.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: title, status, priority.
- Density budget: compact max 4 visible data points; expanded max 9.
- Cognitive load: keep board cards scannable; details open in modal/drawer.

### Do / Don't

Do:
- Keep drag affordance clear.
- Preserve selected and focus states.

Don't:
- Do not put forms directly inside kanban cards.
- Do not allow variable card heights to become extreme.

### Estimated Variant Count

4 card types x 3 densities x 5 states = **60**

---

## 15. Dense Data Panels - P0 Critical

### Role

Dense Data Panels display high-information technical data: JSON rules, source logs, comparison outputs, stats matrices, validation traces, MongoDB payload previews and import/export diagnostics.

### Composite Dependencies

- `Composite/Search Bars`
- `Composite/Filter Bars`
- `Composite/Toolbar Groups`
- `Composite/Stat Rows`
- `Composite/Pagination`
- `Composite/Action Rows`
- `Composite/Card Headers`

### Atomic Dependencies

- `Atomic/Button`
- `Atomic/Icon Button`
- `Atomic/Input`
- `Atomic/Textarea`
- `Atomic/Select`
- `Atomic/Badge`
- `Atomic/Chip`
- `Atomic/Label`
- `Atomic/Divider`
- `Atomic/Progress Bar`
- `Atomic/Tooltip`
- `Atomic/Tabs Primitive`

### Anatomy

- Panel shell.
- Header with title/status/actions.
- Search/filter toolbar.
- Dense content viewport.
- Code/data rows.
- Optional line numbers.
- Optional sticky column/row headers.
- Selection/highlight layer.
- Empty/loading/error state.
- Pagination or virtual scroll marker.
- Footer action row.

### Variants

Panel type:
- `json`
- `metrics`
- `logs`
- `comparison`

Density:
- `compact`
- `comfortable`
- `expanded`

### States

Generated states:
- `default`
- `focus`
- `selected`
- `loading`
- `empty`
- `error`

Documented states:
- `hover`: row/cell hover.
- `disabled`: readonly locked panel.

### Responsive Behavior

- Mobile: summary-first view, raw dense data behind tabs or expandable rows.
- Tablet: single dense panel with horizontal scroll.
- Desktop: full dense viewport with sticky header/tooling.
- Ultrawide: split comparison panels side-by-side, cap readable text columns.

### Token Bindings

- Surface: `semantic.color.surface.base`
- Strong surface: `semantic.color.surface.strong`
- Border: `semantic.color.border.default`, `semantic.color.border.active`
- Selected: `component.sidebar.active.background`, `component.card.selected.border`
- Text: `semantic.color.text.primary`, `semantic.color.text.secondary`
- Error: `semantic.color.state.error`
- Warning: `semantic.color.state.warning`
- Success: `semantic.color.state.success`
- Radius: `primitive.radius.lg`
- Padding/gap: `primitive.spacing.2`, `primitive.spacing.3`, `primitive.spacing.4`
- Shadow: `primitive.shadow.card`
- Z-index: `primitive.z.dropdown` for sticky overlays/popovers

### Performance Considerations

- P0 performance critical.
- Virtualize rows for logs/JSON/comparison beyond 200 visible rows.
- Lazy parse and syntax-highlight only visible chunks.
- Use stable row heights in compact mode.
- Avoid rendering full JSON trees by default.
- Search should debounce and stream results.
- Copy/download actions should not block UI.
- Split panels should render independently.

### Accessibility Rules

- Panel heading required.
- Search/filter controls labelled.
- Code/log regions expose readable text.
- Keyboard navigation must move through rows/cells predictably.
- Selection must be announced.
- Error rows include text explanation.
- Copy actions expose success feedback.

### Scrollable Zones

- Dense content viewport is the primary scroll zone.
- Header toolbar stays sticky.
- Footer action row may stay sticky in modal context.
- Horizontal scroll stays inside dense viewport.
- Avoid nested scroll inside row details; use expansion panel or modal.

### Visual Hierarchy / Density / Cognitive Load

- Highest hierarchy: header, active search/filter, selected/error row, sticky column labels.
- Density budget:
  - Compact: max row height 28-32, technical scan mode.
  - Comfortable: row height 36-44, mixed scan/read mode.
  - Expanded: row height variable but capped with disclosure.
- Cognitive load:
  - Use progressive disclosure for nested JSON.
  - Do not show raw data and visual summary at equal priority.
  - Highlight deltas/errors more strongly than neutral values.
  - Keep toolbar actions grouped by read, filter, export, mutate.

### P0 Critical Notes

- Dense Data Panels are the foundation for JSON Rules, Source Monitoring, comparison tools and Pokemon Detail Modal technical tabs.
- They must solve virtualization, sticky tooling and horizontal overflow before Figma visual rendering.
- They are allowed to be information-dense, but not visually chaotic.
- All high-risk actions such as copy, export, delete and apply must be visibly separated.

### Do / Don't

Do:
- Use sticky headers/toolbars.
- Virtualize large datasets.
- Provide search and filter before dense content.
- Make error rows visually and textually explicit.

Don't:
- Do not render huge JSON trees expanded by default.
- Do not place destructive actions next to copy/export without separation.
- Do not let long lines break the page layout.
- Do not create nested scroll traps.

### Estimated Variant Count

4 panel types x 3 densities x 6 states = **72**

---

## Future Figma Generation Plan

When MCP quota resets:

1. Create page `05 Complex Components`.
2. Reuse Phase 3C atomic and Phase 3D composite component sets as nested instances.
3. Generate component sets in this order:
   - Sidebar
   - Widgets
   - Tables
   - Pokemon Cards
   - Raid Cards
   - Egg Cards
   - Rocket Cards
   - Research Cards
   - Event Cards
   - Calendar Cells
   - Calendar Event Bars
   - Pokemon Detail Modal
   - Backlog Cards
   - Kanban Cards
   - Dense Data Panels
4. Treat P0 components as first validation targets:
   - Calendar Cells
   - Calendar Event Bars
   - Pokemon Detail Modal
   - Dense Data Panels
5. Bind all surfaces, borders, text, radius, spacing and status tones to `Dashboard Admin Tokens`.
6. Document each component with role, anatomy, dependency map, responsive behavior, scroll zones and density budget.
7. Validate:
   - 15 complex families.
   - 895 estimated variants.
   - Atomic + composite dependency usage only.
   - No local hardcoded colors.
   - Scroll zones explicit.
   - P0 components visually reviewed first.

## Phase 3E Visual Relaunch Status

Architecture status: **ready**  
Figma quota dependency: **blocked until MCP reset or plan upgrade**  
Next step after reset: generate `05 Complex Components` from this spec.

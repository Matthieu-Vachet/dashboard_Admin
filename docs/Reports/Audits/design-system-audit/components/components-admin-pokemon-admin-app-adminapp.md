---
id: MWI-COMP-127
component: "AdminApp"
category: "Pokémon feature"
status: exported
source: "src/components/admin/pokemon/admin-app.jsx"
lines: 919-2493
figma_priority: 34
evidence: static_code
---

# AdminApp

## 1. Purpose

Pokémon feature component implemented in src/components/admin/pokemon/admin-app.jsx. Product intent not directly expressed by implementation: Not found.

## 2. Description and usage

- Component ID: `MWI-COMP-127`.
- Location: `Dashboard Admin/src/components/admin/pokemon/admin-app.jsx`:919.
- File range: lines 919–2493.
- Definition kind: function.
- Export status: exported.
- Compatibility target: Not found.
- Figma recreation priority: **34/100** (Estimated from implementation using reuse, primitive/layout role, route role and facade penalty).

## 3. Files and dependencies

| Dependency | Imported symbols | Role |
|---|---|---|
| react | useEffect, useMemo, useState | external package |
| lucide-react | BarChart3, Cloud, Copy, History, Radar, RefreshCcw, Search, ShieldCheck, Sparkles, Wand2 | icons |
| sonner | toast | external package |
| @/components/admin/pokemon/detail-modal | DetailModal | internal |
| @/components/admin/pokemon/pokemon-card | PokemonCard | internal |
| @/components/admin/shared/sortable-widget-grid | SortableWidgetGrid | internal |
| @/components/site/metric-card | MetricCard | internal |
| @/components/site/ui-assets | uiAssets | internal |
| ./admin-ui | AssetStatCard, BarList, CompletionList, ControlCardsPanel, fieldClass, GenerationFilterBar, HistoryList, MiniCardList, Panel, panelClass, primaryButtonClass, buttonClass | internal |
| ./candy-panel | CandyPanel | internal |
| ./background-panel | BackgroundPanel | internal |
| ./catalog-panel | CatalogPanel | internal |
| ./collections-panel | CollectionsPanel | internal |
| ./eggs-panel | EggsPanel | internal |
| ./events-calendar-panel | EventsCalendarPanel | internal |
| ./login-card | LoginCard | internal |
| ./max-battles-panel | MaxBattlesPanel | internal |
| ./pvp-rankings-panel | PvpRankingsPanel | internal |
| ./raids-panel | RaidsPanel | internal |
| ./research-panel | ResearchPanel | internal |
| ./rocket-panel | RocketPanel | internal |
| ./shiny-tracker-panel | ShinyTrackerPanel | internal |
| ./source-watch-panel | DataDeployHistoryModal, SourceHistoryModal, SourceRows | internal |
| ./update-log-panel | UpdateLogPanel | internal |
| ./admin-todo-panel | AdminTodoPanel | internal |
| ./admin-section-navigation | AdminSectionNavigation | internal |
| @/services/admin/dashboard-store | readDashboardStoreValue, readLocalJson, writeDashboardStoreValue | internal |
| @/services/admin/pokemon-admin-api | redeployApiPath, adminApiPath | internal |
| @/utils/admin/pokemon-entries | entryMatchesFicheFilter, sortPokemonEntries | internal |
| @/utils/admin/source-watch | persistSourceSignatures | internal |

### Child components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-125 | [LoadMoreButton](../components/components-admin-pokemon-admin-app-loadmorebutton.md) (MWI-COMP-125) | JSX/import relation |
| MWI-COMP-126 | [RulesPanel](../components/components-admin-pokemon-admin-app-rulespanel.md) (MWI-COMP-126) | JSX/import relation |
| MWI-COMP-129 | [AdminSectionNavigation](../components/components-admin-pokemon-admin-section-navigation-adminsectionnavigation.md) (MWI-COMP-129) | JSX/import relation |
| MWI-COMP-130 | [AdminTodoPanel](../components/components-admin-pokemon-admin-todo-panel-admintodopanel.md) (MWI-COMP-130) | JSX/import relation |
| MWI-COMP-131 | [Panel](../components/components-admin-pokemon-admin-ui-panel.md) (MWI-COMP-131) | JSX/import relation |
| MWI-COMP-132 | [BarList](../components/components-admin-pokemon-admin-ui-barlist.md) (MWI-COMP-132) | JSX/import relation |
| MWI-COMP-133 | [AssetStatCard](../components/components-admin-pokemon-admin-ui-assetstatcard.md) (MWI-COMP-133) | JSX/import relation |
| MWI-COMP-134 | [GenerationFilterBar](../components/components-admin-pokemon-admin-ui-generationfilterbar.md) (MWI-COMP-134) | JSX/import relation |
| MWI-COMP-135 | [CompletionList](../components/components-admin-pokemon-admin-ui-completionlist.md) (MWI-COMP-135) | JSX/import relation |
| MWI-COMP-136 | [HistoryList](../components/components-admin-pokemon-admin-ui-historylist.md) (MWI-COMP-136) | JSX/import relation |
| MWI-COMP-137 | [MiniCardList](../components/components-admin-pokemon-admin-ui-minicardlist.md) (MWI-COMP-137) | JSX/import relation |
| MWI-COMP-138 | [ControlCardsPanel](../components/components-admin-pokemon-admin-ui-controlcardspanel.md) (MWI-COMP-138) | JSX/import relation |
| MWI-COMP-143 | [BackgroundPanel](../components/components-admin-pokemon-background-panel-backgroundpanel.md) (MWI-COMP-143) | JSX/import relation |
| MWI-COMP-144 | [CandyPanel](../components/components-admin-pokemon-candy-panel-candypanel.md) (MWI-COMP-144) | JSX/import relation |
| MWI-COMP-148 | [CatalogPanel](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) (MWI-COMP-148) | JSX/import relation |
| MWI-COMP-150 | [CollectionsPanel](../components/components-admin-pokemon-collections-panel-collectionspanel.md) (MWI-COMP-150) | JSX/import relation |
| MWI-COMP-178 | [DetailModal](../components/components-admin-pokemon-detail-modal-detailmodal.md) (MWI-COMP-178) | JSX/import relation |
| MWI-COMP-183 | [EggsPanel](../components/components-admin-pokemon-eggs-panel-eggspanel.md) (MWI-COMP-183) | JSX/import relation |
| MWI-COMP-184 | [EventsCalendarPanel](../components/components-admin-pokemon-events-calendar-panel-eventscalendarpanel.md) (MWI-COMP-184) | JSX/import relation |
| MWI-COMP-185 | [LoginCard](../components/components-admin-pokemon-login-card-logincard.md) (MWI-COMP-185) | JSX/import relation |
| MWI-COMP-189 | [MaxBattlesPanel](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) (MWI-COMP-189) | JSX/import relation |
| MWI-COMP-198 | [PokemonCard](../components/components-admin-pokemon-pokemon-card-pokemoncard.md) (MWI-COMP-198) | JSX/import relation |
| MWI-COMP-206 | [PvpRankingsPanel](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) (MWI-COMP-206) | JSX/import relation |
| MWI-COMP-210 | [RaidsPanel](../components/components-admin-pokemon-raids-panel-raidspanel.md) (MWI-COMP-210) | JSX/import relation |
| MWI-COMP-218 | [ResearchPanel](../components/components-admin-pokemon-research-panel-researchpanel.md) (MWI-COMP-218) | JSX/import relation |
| MWI-COMP-224 | [RocketPanel](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) (MWI-COMP-224) | JSX/import relation |
| MWI-COMP-229 | [ShinyTrackerPanel](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) (MWI-COMP-229) | JSX/import relation |
| MWI-COMP-230 | [SourceHistoryModal](../components/components-admin-pokemon-source-watch-panel-sourcehistorymodal.md) (MWI-COMP-230) | JSX/import relation |
| MWI-COMP-231 | [DataDeployHistoryModal](../components/components-admin-pokemon-source-watch-panel-datadeployhistorymodal.md) (MWI-COMP-231) | JSX/import relation |
| MWI-COMP-232 | [SourceRows](../components/components-admin-pokemon-source-watch-panel-sourcerows.md) (MWI-COMP-232) | JSX/import relation |
| MWI-COMP-235 | [UpdateLogPanel](../components/components-admin-pokemon-update-log-panel-updatelogpanel.md) (MWI-COMP-235) | JSX/import relation |
| MWI-COMP-238 | [SortableWidgetGrid](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) (MWI-COMP-238) | JSX/import relation |
| MWI-COMP-316 | [MetricCard](../components/components-site-metric-card-metriccard.md) (MWI-COMP-316) | JSX/import relation |

Unresolved/external JSX tags: `BarChart3`, `Cloud`, `Copy`, `History`, `Radar`, `RefreshCcw`, `Search`, `ShieldCheck`, `Sparkles`, `Wand2`.

### Parent components

| ID | Component | Evidence |
|---|---|---|
| MWI-COMP-190 | [PokemonAdminStudio](../components/components-admin-pokemon-pokemon-admin-studio-pokemonadminstudio.md) (MWI-COMP-190) | Renders/imports this component |
| MWI-COMP-289 | [AdminApp](../components/components-pokemon-admin-admin-app-adminapp.md) (MWI-COMP-289) | Renders/imports this component |

## 4. HTML structure

The following outline preserves every JSX element occurrence detected inside this component definition. Conditional branches can therefore appear as sibling paths.

- <Panel>
  - <CompletionList />
- <Panel>
  - <BarList />
- <Panel>
  - <HistoryList />
- <Panel>
  - <MiniCardList />
- <main>
  - <section>
    - <h2>
- <main>
  - <LoginCard />
- <main>
  - <div>
    - <section>
      - <header>
        - <div />
        - <div />
        - <div>
          - <div>
            - <div>
              - <p>
              - <h1>
            - <div>
              - <label>
                - <Search />
                - <input />
              - <button>
                - <RefreshCcw />
              - <button>
                - <Cloud />
          - <AdminSectionNavigation />
      - <div>
        - <Panel>
          - <p>
        - <Panel>
          - <p>
        - <Fragment>
          - <section>
            - <MetricCard />
            - <MetricCard />
            - <MetricCard />
            - <MetricCard />
          - <section>
            - <article>
              - <Sparkles />
              - <span>
              - <strong>
            - <article>
              - <ShieldCheck />
              - <span>
              - <strong>
            - <article>
              - <BarChart3 />
              - <span>
              - <strong>
          - <SortableWidgetGrid />
        - <Fragment>
          - <GenerationFilterBar />
          - <section>
            - <div>
              - <span>
                - <Search />
              - <button>
            - <div>
              - <button>
                - <img />
                - <div />
                - <div />
                - <span>
                - <strong>
                - <small>
          - <section>
            - <PokemonCard />
          - <LoadMoreButton />
        - <CandyPanel />
        - <BackgroundPanel />
        - <CollectionsPanel />
        - <RaidsPanel />
        - <EggsPanel />
        - <MaxBattlesPanel />
        - <RocketPanel />
        - <ResearchPanel />
        - <ShinyTrackerPanel />
        - <PvpRankingsPanel />
        - <EventsCalendarPanel />
        - <section>
          - <Panel>
            - <div>
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
              - <AssetStatCard />
            - <p>
            - <div>
              - <button>
            - <div>
              - <article>
                - <div>
                  - <img />
                - <div>
                  - <strong>
                  - <span>
                  - <button>
                    - <Copy />
            - <LoadMoreButton />
          - <Panel>
            - <MiniCardList />
        - <section>
          - <ControlCardsPanel />
          - <Panel>
            - <MiniCardList />
        - <Panel>
          - <SourceRows />
        - <UpdateLogPanel />
        - <CatalogPanel />
        - <Panel>
          - <p>
          - <div>
            - <select>
              - <option>
              - <option>
            - <select>
              - <option>
              - <option>
          - <div>
            - <div>
              - <PokemonCard />
              - <p>
        - <RulesPanel />
        - <Panel>
          - <p>
          - <textarea />
        - <Panel>
          - <p>
          - <textarea />
        - <AdminTodoPanel />
  - <SourceHistoryModal />
  - <DataDeployHistoryModal />
  - <DetailModal />

Unique HTML/React tags: `AdminSectionNavigation`, `AdminTodoPanel`, `article`, `AssetStatCard`, `BackgroundPanel`, `BarChart3`, `BarList`, `button`, `CandyPanel`, `CatalogPanel`, `Cloud`, `CollectionsPanel`, `CompletionList`, `ControlCardsPanel`, `Copy`, `DataDeployHistoryModal`, `DetailModal`, `div`, `EggsPanel`, `EventsCalendarPanel`, `GenerationFilterBar`, `h1`, `h2`, `header`, `History`, `HistoryList`, `img`, `input`, `label`, `LoadMoreButton`, `LoginCard`, `main`, `MaxBattlesPanel`, `MetricCard`, `MiniCardList`, `option`, `p`, `Panel`, `PokemonCard`, `PvpRankingsPanel`, `Radar`, `RaidsPanel`, `RefreshCcw`, `ResearchPanel`, `RocketPanel`, `RulesPanel`, `Search`, `section`, `select`, `ShieldCheck`, `ShinyTrackerPanel`, `small`, `SortableWidgetGrid`, `SourceHistoryModal`, `SourceRows`, `span`, `Sparkles`, `strong`, `textarea`, `UpdateLogPanel`, `Wand2`.

## 5. React structure and state management

- Hooks: `useEffect`, `useMemo`, `useState`.
- Local state initializers: `active = "overview"`, `assetAudit = null`, `assetChecks = {}`, `assetLimit = initialAssetLimit`, `assetTab = "all"`, `authError = ""`, `bootstrap = { loading: false, payload: null, error: "" }`, `bulkOnlyIssues = true`, `catalog = null`, `collections = []`, `compareA = ""`, `compareB = ""`, `customRules = []`, `deployHistory = []`, `deployHistoryOpen = false`, `detail = null`, `eggs = null`, `eggsLoading = false`, `eggsRegenerating = false`, `extraPanel = null`, `ficheFilter = "all"`, `ficheLimit = initialFicheLimit`, `generationFilter = "all"`, `history = []`, `itemsReference = null`, `maxBattles = null`, `maxBattlesLoading = false`, `maxBattlesRegenerating = false`, `password = ""`, `pvpOptions = initialPvpOptions`, `pvpRankings = null`, `pvpRankingsLoading = false`, `pvpRankingsRegenerating = false`, `raids = null`, `raidsLoading = false`, `raidsRegenerating = false`, `redeployingDashboard = false`, `research = null`, `researchLoading = false`, `researchRegenerating = false`, `rocket = null`, `rocketLoading = false`, `rocketRegenerating = false`, `rocketTexts = null`, `ruleForm = { ...defaultRuleForm }`, `ruleMessage = ""`, `rulePreview = null`, `rulesSyncing = false`, `search = ""`, `selectedEntry = null`, `selectedIndex = -1`, `session = { loading: true, authenticated: false }`, `shiny = null`, `shinyLoading = false`, `shinyOptions = initialShinyOptions`, `shinyRegenerating = false`, `sourceHistory = []`, `sourceHistoryOpen = false`, `sourceWatch = null`.
- Event handlers exposed in JSX: `onAssetAudit`, `onAssetChecked`, `onAuditUrls`, `onChange`, `onClick`, `onClose`, `onCopyPatch`, `onDelete`, `onDownload`, `onEdit`, `onFormChange`, `onLoadHistory`, `onNext`, `onOpen`, `onOpenDeployHistory`, `onOpenEntry`, `onOpenPokemon`, `onOpenRelated`, `onOpenSourceHistory`, `onOptionsChange`, `onPasswordChange`, `onPreview`, `onPrevious`, `onRefresh`, `onRegenerate`, `onSave`, `onSelect`, `onSubmit`, `onSyncGithub`, `onToggle`.
- State/data behavior not statically expressible from this component body: Estimated from implementation.

## 6. Props and defaults

| Prop/binding | Default | Evidence |
|---|---|---|
| Not found | Not found | Not found |

Exact parameter signature:

```tsx
Not found
```

Exact local props contract when statically resolvable:

```tsx
Not found
```

## 7. Variants and component properties

| Property | Value | Source |
|---|---|---|
| Not found | Not found | No explicit variant union detected |

- Boolean properties for Figma: Hover, Focused, Selected, Checked, Unchecked, Loading, Disabled, Error, Warning, Success, Empty, Expanded, Active, Inactive, Read Only.
- Text properties: Not found.
- Instance swaps: `BarChart3`, `Cloud`, `Copy`, `History`, `Radar`, `RefreshCcw`, `Search`, `ShieldCheck`, `Sparkles`, `Wand2`, `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
- Additional conditional variants are preserved verbatim in section 12.

## 8. Complete state matrix

| State | Implementation status | Evidence |
|---|---|---|
| Default | Detected | Base render path |
| Hover | Detected | hover utility or mouse-enter handler |
| Pressed | Not found | Not found |
| Focused | Detected | focus styling or handler |
| Selected | Detected | selected/state signal |
| Checked | Detected | checked signal |
| Unchecked | Detected | inverse checked state |
| Loading | Detected | loading/pending signal |
| Disabled | Detected | disabled prop, attribute, or class |
| Error | Detected | error/danger signal |
| Warning | Detected | warning/amber/yellow signal |
| Success | Detected | success/green signal |
| Empty | Detected | empty collection branch |
| Collapsed | Not found | Not found |
| Expanded | Detected | expanded/open signal |
| Dragging | Not found | Not found |
| Drop Target | Not found | Not found |
| Active | Detected | active signal |
| Inactive | Detected | inactive inverse state |
| Read Only | Detected | read-only signal |
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
- Alignment utilities: `items-center, items-start, items-stretch, justify-between, justify-center, place-items-center, xl:items-center, xl:justify-between`.
- Positioning utilities: `absolute, relative`.

| Token family | Exact implementation references |
|---|---|
| CSS variables | `--accent-glow`, `--accent-tertiary`, `--foreground` |
| Literal colors | `#050815`, `#060914`, `#0b6dc3`, `#5090d6`, `#5269ad`, `#5a5465`, `#5a8ea2`, `#63bc5a`, `#73cec0`, `#89aae3`, `#919aa2`, `#91c12f`, `#aa6bc8`, `#c5b78c`, `#ce416b`, `#d97845`, `#ec8fe6`, `#f4d23c`, `#fa7179`, `#ff9d55`, `rgba(${channel(color.r)`, `rgba(${r}, ${g}, ${b}, ${a})`, `rgba(0,0,0,.2)`, `rgba(0,0,0,.24)`, `rgba(0,0,0,.25)`, `rgba(103,232,249,.16)`, `rgba(110,231,183,.15)`, `rgba(14,165,233,.18)`, `rgba(14,165,233,.26)`, `rgba(14,165,233,.28)`, `rgba(14,165,233,.32)`, `rgba(148,163,184,.35)`, `rgba(15,23,42,.18)`, `rgba(15,23,42,.24)`, `rgba(15,23,42,.7)`, `rgba(15,23,42,.76)`, `rgba(15,23,42,.86)`, `rgba(15,23,42,.88)`, `rgba(15,23,42,.89)`, `rgba(167,139,250,.1)`, `rgba(167,139,250,.15)`, `rgba(196,181,253,.15)`, `rgba(2,6,23,.58)`, `rgba(2,6,23,.68)`, `rgba(2,6,23,.78)`, `rgba(2,6,23,.86)`, `rgba(2,6,23,.93)`, `rgba(248,113,113,.15)`, `rgba(248,250,252,.82)`, `rgba(251,146,60,.1)`, `rgba(251,191,36,.14)`, `rgba(253,186,116,.16)`, `rgba(255,255,255,.015)`, `rgba(255,255,255,.055)`, `rgba(255,255,255,.08)`, `rgba(255,255,255,.9)`, `rgba(34,197,94,.22)`, `rgba(34,211,238,.1)`, `rgba(34,211,238,.16)`, `rgba(34,211,238,.18)`, `rgba(34,211,238,.25)`, `rgba(52,211,153,.1)`, `rgba(52,211,153,.14)`, `rgba(56,189,248,.16)`, `rgba(8,13,25,.52)` |
| Spacing | `gap-2`, `gap-3`, `gap-4`, `gap-5`, `inset-0`, `left-4`, `mb-1`, `mb-2`, `mb-3`, `mb-4`, `mb-5`, `mt-1`, `mt-3`, `mt-4`, `mt-5`, `p-2`, `p-3`, `p-4`, `p-5`, `pl-11`, `px-2`, `px-2.5`, `px-3`, `px-4`, `py-1`, `py-2`, `py-3`, `sm:p-5`, `space-y-3`, `space-y-4`, `space-y-5`, `top-1/2` |
| Sizing | `h-5`, `h-full`, `max-h-full`, `min-h-[520px]`, `min-h-[92px]`, `min-h-11`, `min-h-12`, `min-h-9`, `min-h-screen`, `min-w-0`, `w-5`, `w-full`, `xl:w-[780px]` |
| Typography | `break-all`, `font-black`, `font-bold`, `font-mono`, `leading-6`, `placeholder:text-slate-500`, `sm:text-4xl`, `text-[11px]`, `text-3xl`, `text-amber-100`, `text-amber-100/74`, `text-amber-50`, `text-cyan-100`, `text-cyan-100/72`, `text-cyan-100/75`, `text-cyan-100/80`, `text-cyan-200`, `text-cyan-200/70`, `text-cyan-50`, `text-emerald-100`, `text-emerald-100/72`, `text-emerald-100/80`, `text-emerald-200`, `text-emerald-50`, `text-fuchsia-100`, `text-indigo-100`, `text-left`, `text-orange-100`, `text-orange-50`, `text-red-100`, `text-red-100/74`, `text-red-200`, `text-red-50`, `text-rose-100`, `text-sky-100`, `text-sky-100/72`, `text-sky-50`, `text-slate-200`, `text-slate-300`, `text-slate-400`, `text-slate-500`, `text-sm`, `text-stone-100`, `text-violet-100`, `text-violet-100/72`, `text-violet-100/80`, `text-violet-200`, `text-violet-50`, `text-white`, `text-xl`, `text-xs`, `text-yellow-100`, `tracking-[0.18em]`, `tracking-[0.24em]`, `tracking-tight`, `uppercase` |
| Radius | `rounded-[2rem]`, `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| Borders/strokes | `border`, `border-amber-200/16`, `border-amber-200/20`, `border-amber-200/22`, `border-amber-200/25`, `border-amber-200/30`, `border-amber-300/35`, `border-amber-300/45`, `border-cyan-200/16`, `border-cyan-200/20`, `border-cyan-200/24`, `border-cyan-200/25`, `border-cyan-200/30`, `border-cyan-200/45`, `border-cyan-200/50`, `border-cyan-200/55`, `border-cyan-300/15`, `border-dashed`, `border-emerald-200/16`, `border-emerald-200/20`, `border-emerald-200/24`, `border-emerald-200/25`, `border-emerald-200/30`, `border-emerald-300/15`, `border-emerald-300/35`, `border-fuchsia-300/35`, `border-fuchsia-300/45`, `border-indigo-300/45`, `border-orange-200/28`, `border-orange-200/32`, `border-orange-300/45`, `border-red-200/22`, `border-red-200/30`, `border-red-300/45`, `border-rose-200/20`, `border-rose-300/45`, `border-sky-200/20`, `border-sky-200/30`, `border-sky-300/35`, `border-sky-300/45`, `border-slate-200/20`, `border-stone-200/45`, `border-t`, `border-violet-200/16`, `border-violet-200/20`, `border-violet-200/22`, `border-violet-200/25`, `border-violet-200/26`, `border-violet-200/30`, `border-violet-300/15`, `border-violet-300/35`, `border-violet-300/45`, `border-white/10`, `border-white/15`, `border-yellow-200/45`, `focus:border-cyan-300/60`, `focus:ring-4`, `focus:ring-cyan-400/10`, `hover:border-cyan-200/35`, `hover:border-cyan-200/45`, `hover:border-cyan-200/50`, `outline-none` |
| Shadows/elevation | `shadow-[0_0_22px_rgba(167,139,250,.1)]`, `shadow-[0_0_22px_rgba(251,146,60,.1)]`, `shadow-[0_0_22px_rgba(34,211,238,.1)]`, `shadow-[0_0_22px_rgba(52,211,153,.1)]`, `shadow-[0_14px_45px_rgba(14,165,233,.26)]`, `shadow-[0_16px_55px_rgba(34,211,238,.18)]`, `shadow-[0_18px_70px_rgba(0,0,0,.2)]`, `shadow-[0_22px_90px_rgba(0,0,0,.24)]`, `shadow-[0_24px_90px_rgba(0,0,0,.25)]`, `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`, `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`, `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`, `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` |
| Opacity | `group-hover:opacity-40`, `opacity-24`, `opacity-25`, `opacity-52` |
| Background | `backdrop-blur-2xl`, `backdrop-blur-xl`, `bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.22),transparent_28%),#050815]`, `bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,.28),transparent_35%),#060914]`, `bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.25),transparent_42%)]`, `bg-amber-400/[0.06]`, `bg-amber-400/[0.075]`, `bg-amber-400/10`, `bg-amber-400/12`, `bg-amber-400/14`, `bg-amber-400/15`, `bg-amber-500/18`, `bg-cyan-400/[0.055]`, `bg-cyan-400/[0.075]`, `bg-cyan-400/10`, `bg-cyan-400/12`, `bg-cyan-400/14`, `bg-cyan-400/16`, `bg-cyan-400/18`, `bg-cyan-400/20`, `bg-emerald-300/16`, `bg-emerald-400/[0.055]`, `bg-emerald-400/[0.075]`, `bg-emerald-400/10`, `bg-emerald-400/12`, `bg-emerald-400/14`, `bg-emerald-400/15`, `bg-emerald-400/16`, `bg-fuchsia-400/15`, `bg-fuchsia-500/18`, `bg-gradient-to-br`, `bg-gradient-to-r`, `bg-indigo-500/18`, `bg-orange-400/[0.085]`, `bg-orange-400/18`, `bg-orange-500/18`, `bg-red-400/[0.06]`, `bg-red-400/12`, `bg-red-400/14`, `bg-red-500/18`, `bg-rose-400/10`, `bg-rose-500/18`, `bg-sky-400/[0.055]`, `bg-sky-400/12`, `bg-sky-400/14`, `bg-sky-400/15`, `bg-sky-500/18`, `bg-slate-300/10`, `bg-slate-950/30`, `bg-slate-950/35`, `bg-slate-950/40`, `bg-slate-950/45`, `bg-stone-400/18`, `bg-violet-300/16`, `bg-violet-400/[0.06]`, `bg-violet-400/[0.075]`, `bg-violet-400/[0.08]`, `bg-violet-400/10`, `bg-violet-400/12`, `bg-violet-400/14`, `bg-violet-400/15`, `bg-violet-400/16`, `bg-violet-500/18`, `bg-white/[0.04]`, `bg-white/[0.045]`, `bg-white/[0.055]`, `bg-white/[0.06]`, `bg-white/[0.075]`, `bg-white/10`, `bg-yellow-400/18`, `from-amber-400/15`, `from-amber-400/24`, `from-cyan-400/15`, `from-emerald-400/15`, `from-emerald-400/24`, `from-rose-400/15`, `from-sky-500`, `from-sky-500/24`, `from-slate-950/76`, `from-violet-400/15`, `from-violet-500/24`, `hover:bg-cyan-400/15`, `hover:bg-cyan-400/18`, `to-cyan-400`, `to-slate-900/20`, `to-slate-950/70`, `via-cyan-300/12`, `via-fuchsia-300/10`, `via-orange-300/10`, `via-slate-950/52`, `via-teal-300/10` |
| Animation | `duration-300`, `hover:-translate-y-0.5`, `hover:scale-[1.01]`, `transition` |

- Margins/padding/gaps are represented by every spacing utility above; no values are normalized beyond the implementation.
- Auto Layout equivalent: Estimated from implementation from flex/grid direction, alignment, gap and padding utilities.

## 11. Every Tailwind utility / CSS class token

| Token | Variant/pseudo prefix | Condition |
|---|---|---|
| `-` | base | conditional or expression-derived |
| `-translate-y-1/2` | base | static occurrence |
| `[background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)]` | [background-image | static occurrence |
| `[background-size:28px_28px]` | [background-size | static occurrence |
| `2xl:grid-cols-4` | 2xl | static occurrence |
| `absolute` | base | conditional or expression-derived |
| `accent-cyan-400` | base | static occurrence |
| `aspect-square` | base | static occurrence |
| `backdrop-blur-2xl` | base | static occurrence |
| `backdrop-blur-xl` | base | static occurrence |
| `bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.22),transparent_28%),#050815]` | base | static occurrence |
| `bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,.28),transparent_35%),#060914]` | base | static occurrence |
| `bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.25),transparent_42%)]` | base | static occurrence |
| `bg-amber-400/[0.06]` | base | static occurrence |
| `bg-amber-400/[0.075]` | base | static occurrence |
| `bg-amber-400/10` | base | static occurrence |
| `bg-amber-400/12` | base | static occurrence |
| `bg-amber-400/14` | base | static occurrence |
| `bg-amber-400/15` | base | static occurrence |
| `bg-amber-500/18` | base | static occurrence |
| `bg-cyan-400/[0.055]` | base | static occurrence |
| `bg-cyan-400/[0.075]` | base | static occurrence |
| `bg-cyan-400/10` | base | static occurrence |
| `bg-cyan-400/12` | base | static occurrence |
| `bg-cyan-400/14` | base | static occurrence |
| `bg-cyan-400/16` | base | static occurrence |
| `bg-cyan-400/18` | base | conditional or expression-derived |
| `bg-cyan-400/20` | base | conditional or expression-derived |
| `bg-emerald-300/16` | base | static occurrence |
| `bg-emerald-400/[0.055]` | base | static occurrence |
| `bg-emerald-400/[0.075]` | base | static occurrence |
| `bg-emerald-400/10` | base | static occurrence |
| `bg-emerald-400/12` | base | static occurrence |
| `bg-emerald-400/14` | base | static occurrence |
| `bg-emerald-400/15` | base | static occurrence |
| `bg-emerald-400/16` | base | static occurrence |
| `bg-fuchsia-400/15` | base | static occurrence |
| `bg-fuchsia-500/18` | base | static occurrence |
| `bg-gradient-to-br` | base | static occurrence |
| `bg-gradient-to-r` | base | static occurrence |
| `bg-indigo-500/18` | base | static occurrence |
| `bg-orange-400/[0.085]` | base | static occurrence |
| `bg-orange-400/18` | base | static occurrence |
| `bg-orange-500/18` | base | static occurrence |
| `bg-red-400/[0.06]` | base | static occurrence |
| `bg-red-400/12` | base | static occurrence |
| `bg-red-400/14` | base | static occurrence |
| `bg-red-500/18` | base | static occurrence |
| `bg-rose-400/10` | base | static occurrence |
| `bg-rose-500/18` | base | static occurrence |
| `bg-sky-400/[0.055]` | base | static occurrence |
| `bg-sky-400/12` | base | static occurrence |
| `bg-sky-400/14` | base | static occurrence |
| `bg-sky-400/15` | base | static occurrence |
| `bg-sky-500/18` | base | static occurrence |
| `bg-slate-300/10` | base | static occurrence |
| `bg-slate-950/30` | base | static occurrence |
| `bg-slate-950/35` | base | static occurrence |
| `bg-slate-950/40` | base | static occurrence |
| `bg-slate-950/45` | base | static occurrence |
| `bg-stone-400/18` | base | static occurrence |
| `bg-violet-300/16` | base | static occurrence |
| `bg-violet-400/[0.06]` | base | static occurrence |
| `bg-violet-400/[0.075]` | base | static occurrence |
| `bg-violet-400/[0.08]` | base | static occurrence |
| `bg-violet-400/10` | base | static occurrence |
| `bg-violet-400/12` | base | static occurrence |
| `bg-violet-400/14` | base | static occurrence |
| `bg-violet-400/15` | base | static occurrence |
| `bg-violet-400/16` | base | static occurrence |
| `bg-violet-500/18` | base | static occurrence |
| `bg-white/[0.04]` | base | static occurrence |
| `bg-white/[0.045]` | base | conditional or expression-derived |
| `bg-white/[0.055]` | base | conditional or expression-derived |
| `bg-white/[0.06]` | base | static occurrence |
| `bg-white/[0.075]` | base | static occurrence |
| `bg-white/10` | base | static occurrence |
| `bg-yellow-400/18` | base | static occurrence |
| `block` | base | static occurrence |
| `border` | base | conditional or expression-derived |
| `border-amber-200/16` | base | static occurrence |
| `border-amber-200/20` | base | static occurrence |
| `border-amber-200/22` | base | static occurrence |
| `border-amber-200/25` | base | static occurrence |
| `border-amber-200/30` | base | static occurrence |
| `border-amber-300/35` | base | static occurrence |
| `border-amber-300/45` | base | static occurrence |
| `border-cyan-200/16` | base | static occurrence |
| `border-cyan-200/20` | base | static occurrence |
| `border-cyan-200/24` | base | static occurrence |
| `border-cyan-200/25` | base | static occurrence |
| `border-cyan-200/30` | base | static occurrence |
| `border-cyan-200/45` | base | static occurrence |
| `border-cyan-200/50` | base | conditional or expression-derived |
| `border-cyan-200/55` | base | conditional or expression-derived |
| `border-cyan-300/15` | base | static occurrence |
| `border-dashed` | base | static occurrence |
| `border-emerald-200/16` | base | static occurrence |
| `border-emerald-200/20` | base | static occurrence |
| `border-emerald-200/24` | base | static occurrence |
| `border-emerald-200/25` | base | static occurrence |
| `border-emerald-200/30` | base | static occurrence |
| `border-emerald-300/15` | base | static occurrence |
| `border-emerald-300/35` | base | static occurrence |
| `border-fuchsia-300/35` | base | static occurrence |
| `border-fuchsia-300/45` | base | static occurrence |
| `border-indigo-300/45` | base | static occurrence |
| `border-orange-200/28` | base | static occurrence |
| `border-orange-200/32` | base | static occurrence |
| `border-orange-300/45` | base | static occurrence |
| `border-red-200/22` | base | static occurrence |
| `border-red-200/30` | base | static occurrence |
| `border-red-300/45` | base | static occurrence |
| `border-rose-200/20` | base | static occurrence |
| `border-rose-300/45` | base | static occurrence |
| `border-sky-200/20` | base | static occurrence |
| `border-sky-200/30` | base | static occurrence |
| `border-sky-300/35` | base | static occurrence |
| `border-sky-300/45` | base | static occurrence |
| `border-slate-200/20` | base | static occurrence |
| `border-stone-200/45` | base | static occurrence |
| `border-t` | base | static occurrence |
| `border-violet-200/16` | base | static occurrence |
| `border-violet-200/20` | base | static occurrence |
| `border-violet-200/22` | base | static occurrence |
| `border-violet-200/25` | base | static occurrence |
| `border-violet-200/26` | base | static occurrence |
| `border-violet-200/30` | base | static occurrence |
| `border-violet-300/15` | base | static occurrence |
| `border-violet-300/35` | base | static occurrence |
| `border-violet-300/45` | base | static occurrence |
| `border-white/10` | base | conditional or expression-derived |
| `border-white/15` | base | static occurrence |
| `border-yellow-200/45` | base | static occurrence |
| `break-all` | base | static occurrence |
| `duration-300` | base | conditional or expression-derived |
| `flex` | base | static occurrence |
| `flex-col` | base | static occurrence |
| `flex-wrap` | base | static occurrence |
| `focus:border-cyan-300/60` | focus | static occurrence |
| `focus:ring-4` | focus | static occurrence |
| `focus:ring-cyan-400/10` | focus | static occurrence |
| `font-black` | base | conditional or expression-derived |
| `font-bold` | base | static occurrence |
| `font-mono` | base | conditional or expression-derived |
| `from-amber-400/15` | base | static occurrence |
| `from-amber-400/24` | base | static occurrence |
| `from-cyan-400/15` | base | static occurrence |
| `from-emerald-400/15` | base | static occurrence |
| `from-emerald-400/24` | base | static occurrence |
| `from-rose-400/15` | base | static occurrence |
| `from-sky-500` | base | static occurrence |
| `from-sky-500/24` | base | static occurrence |
| `from-slate-950/76` | base | static occurrence |
| `from-violet-400/15` | base | static occurrence |
| `from-violet-500/24` | base | static occurrence |
| `gap-2` | base | static occurrence |
| `gap-3` | base | static occurrence |
| `gap-4` | base | static occurrence |
| `gap-5` | base | static occurrence |
| `grid` | base | static occurrence |
| `grid-cols-2` | base | static occurrence |
| `group-hover:opacity-40` | group-hover | conditional or expression-derived |
| `h-5` | base | static occurrence |
| `h-full` | base | conditional or expression-derived |
| `hover:-translate-y-0.5` | hover | conditional or expression-derived |
| `hover:bg-cyan-400/15` | hover | static occurrence |
| `hover:bg-cyan-400/18` | hover | static occurrence |
| `hover:border-cyan-200/35` | hover | conditional or expression-derived |
| `hover:border-cyan-200/45` | hover | static occurrence |
| `hover:border-cyan-200/50` | hover | static occurrence |
| `hover:scale-[1.01]` | hover | static occurrence |
| `hover:underline` | hover | static occurrence |
| `inline-flex` | base | static occurrence |
| `inset-0` | base | conditional or expression-derived |
| `items-center` | base | static occurrence |
| `items-start` | base | static occurrence |
| `items-stretch` | base | static occurrence |
| `justify-between` | base | static occurrence |
| `justify-center` | base | static occurrence |
| `leading-6` | base | conditional or expression-derived |
| `left-4` | base | static occurrence |
| `lg:grid-cols-2` | lg | static occurrence |
| `lg:grid-cols-3` | lg | static occurrence |
| `max-h-full` | base | static occurrence |
| `mb-1` | base | static occurrence |
| `mb-2` | base | static occurrence |
| `mb-3` | base | static occurrence |
| `mb-4` | base | static occurrence |
| `mb-5` | base | static occurrence |
| `md:grid-cols-2` | md | static occurrence |
| `md:grid-cols-5` | md | static occurrence |
| `min-h-[520px]` | base | conditional or expression-derived |
| `min-h-[92px]` | base | conditional or expression-derived |
| `min-h-11` | base | static occurrence |
| `min-h-12` | base | static occurrence |
| `min-h-9` | base | static occurrence |
| `min-h-screen` | base | static occurrence |
| `min-w-0` | base | static occurrence |
| `mt-1` | base | static occurrence |
| `mt-3` | base | static occurrence |
| `mt-4` | base | static occurrence |
| `mt-5` | base | static occurrence |
| `object-contain` | base | static occurrence |
| `object-cover` | base | conditional or expression-derived |
| `opacity-24` | base | conditional or expression-derived |
| `opacity-25` | base | static occurrence |
| `opacity-52` | base | conditional or expression-derived |
| `outline-none` | base | static occurrence |
| `overflow-hidden` | base | conditional or expression-derived |
| `p-2` | base | static occurrence |
| `p-3` | base | conditional or expression-derived |
| `p-4` | base | static occurrence |
| `p-5` | base | static occurrence |
| `pl-11` | base | conditional or expression-derived |
| `place-items-center` | base | static occurrence |
| `placeholder:text-slate-500` | placeholder | static occurrence |
| `pointer-events-none` | base | static occurrence |
| `pokemon-admin-surface` | base | static occurrence |
| `px-2` | base | static occurrence |
| `px-2.5` | base | static occurrence |
| `px-3` | base | static occurrence |
| `px-4` | base | conditional or expression-derived |
| `py-1` | base | static occurrence |
| `py-2` | base | conditional or expression-derived |
| `py-3` | base | static occurrence |
| `relative` | base | conditional or expression-derived |
| `resize-y` | base | conditional or expression-derived |
| `rounded-[2rem]` | base | static occurrence |
| `rounded-2xl` | base | conditional or expression-derived |
| `rounded-3xl` | base | static occurrence |
| `rounded-full` | base | conditional or expression-derived |
| `saturate-125` | base | conditional or expression-derived |
| `saturate-75` | base | conditional or expression-derived |
| `shadow-[0_0_22px_rgba(167,139,250,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(251,146,60,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(34,211,238,.1)]` | base | static occurrence |
| `shadow-[0_0_22px_rgba(52,211,153,.1)]` | base | static occurrence |
| `shadow-[0_14px_45px_rgba(14,165,233,.26)]` | base | static occurrence |
| `shadow-[0_16px_55px_rgba(34,211,238,.18)]` | base | conditional or expression-derived |
| `shadow-[0_18px_70px_rgba(0,0,0,.2)]` | base | static occurrence |
| `shadow-[0_22px_90px_rgba(0,0,0,.24)]` | base | static occurrence |
| `shadow-[0_24px_90px_rgba(0,0,0,.25)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(103,232,249,.16)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(110,231,183,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(196,181,253,.15)]` | base | static occurrence |
| `shadow-[inset_0_1px_0_rgba(253,186,116,.16)]` | base | static occurrence |
| `sm:grid-cols-[minmax(0,1fr)_auto_auto]` | sm | static occurrence |
| `sm:grid-cols-2` | sm | static occurrence |
| `sm:grid-cols-3` | sm | static occurrence |
| `sm:p-5` | sm | static occurrence |
| `sm:text-4xl` | sm | static occurrence |
| `space-y-3` | base | static occurrence |
| `space-y-4` | base | static occurrence |
| `space-y-5` | base | static occurrence |
| `text-[11px]` | base | static occurrence |
| `text-3xl` | base | static occurrence |
| `text-amber-100` | base | static occurrence |
| `text-amber-100/74` | base | static occurrence |
| `text-amber-50` | base | static occurrence |
| `text-cyan-100` | base | static occurrence |
| `text-cyan-100/72` | base | static occurrence |
| `text-cyan-100/75` | base | static occurrence |
| `text-cyan-100/80` | base | static occurrence |
| `text-cyan-200` | base | static occurrence |
| `text-cyan-200/70` | base | static occurrence |
| `text-cyan-50` | base | conditional or expression-derived |
| `text-emerald-100` | base | static occurrence |
| `text-emerald-100/72` | base | static occurrence |
| `text-emerald-100/80` | base | static occurrence |
| `text-emerald-200` | base | conditional or expression-derived |
| `text-emerald-50` | base | static occurrence |
| `text-fuchsia-100` | base | static occurrence |
| `text-indigo-100` | base | static occurrence |
| `text-left` | base | conditional or expression-derived |
| `text-orange-100` | base | static occurrence |
| `text-orange-50` | base | static occurrence |
| `text-red-100` | base | static occurrence |
| `text-red-100/74` | base | static occurrence |
| `text-red-200` | base | conditional or expression-derived |
| `text-red-50` | base | static occurrence |
| `text-rose-100` | base | static occurrence |
| `text-sky-100` | base | static occurrence |
| `text-sky-100/72` | base | static occurrence |
| `text-sky-50` | base | static occurrence |
| `text-slate-200` | base | static occurrence |
| `text-slate-300` | base | conditional or expression-derived |
| `text-slate-400` | base | static occurrence |
| `text-slate-500` | base | static occurrence |
| `text-sm` | base | static occurrence |
| `text-stone-100` | base | static occurrence |
| `text-violet-100` | base | static occurrence |
| `text-violet-100/72` | base | static occurrence |
| `text-violet-100/80` | base | static occurrence |
| `text-violet-200` | base | static occurrence |
| `text-violet-50` | base | static occurrence |
| `text-white` | base | static occurrence |
| `text-xl` | base | static occurrence |
| `text-xs` | base | conditional or expression-derived |
| `text-yellow-100` | base | static occurrence |
| `to-cyan-400` | base | static occurrence |
| `to-slate-900/20` | base | static occurrence |
| `to-slate-950/70` | base | static occurrence |
| `top-1/2` | base | static occurrence |
| `tracking-[0.18em]` | base | static occurrence |
| `tracking-[0.24em]` | base | static occurrence |
| `tracking-tight` | base | static occurrence |
| `transition` | base | conditional or expression-derived |
| `truncate` | base | static occurrence |
| `underline-offset-4` | base | static occurrence |
| `uppercase` | base | static occurrence |
| `via-cyan-300/12` | base | static occurrence |
| `via-fuchsia-300/10` | base | static occurrence |
| `via-orange-300/10` | base | static occurrence |
| `via-slate-950/52` | base | static occurrence |
| `via-teal-300/10` | base | static occurrence |
| `w-5` | base | static occurrence |
| `w-full` | base | conditional or expression-derived |
| `xl:flex-row` | xl | static occurrence |
| `xl:grid-cols-[1.2fr_.8fr]` | xl | static occurrence |
| `xl:grid-cols-[1.4fr_.9fr]` | xl | static occurrence |
| `xl:grid-cols-3` | xl | static occurrence |
| `xl:grid-cols-4` | xl | static occurrence |
| `xl:items-center` | xl | static occurrence |
| `xl:justify-between` | xl | static occurrence |
| `xl:w-[780px]` | xl | static occurrence |

Exact className combinations:

- `-`
- `absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,.25),transparent_42%)]`
- `absolute inset-0 bg-gradient-to-br from-slate-950/76 via-slate-950/52 to-slate-950/70`
- `absolute inset-0 h-full w-full object-cover transition duration-300`
- `block truncate text-xs font-black text-white`
- `block truncate text-xs text-white`
- `border-amber-200/16 bg-amber-400/[0.075]`
- `border-amber-200/20 bg-amber-400/10 from-amber-400/15`
- `border-amber-200/22 bg-amber-400/[0.06]`
- `border-amber-200/22 bg-amber-400/12`
- `border-amber-200/30 bg-amber-400/14 text-amber-50`
- `border-amber-300/35 bg-amber-400/15 text-amber-100`
- `border-amber-300/45 bg-amber-500/18 text-amber-100`
- `border-cyan-200/16 bg-cyan-400/[0.075]`
- `border-cyan-200/20 bg-cyan-400/[0.055]`
- `border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15`
- `border-cyan-200/20 bg-cyan-400/12`
- `border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]`
- `border-cyan-200/30 bg-cyan-400/14 text-cyan-50`
- `border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]`
- `border-cyan-200/45 bg-cyan-400/18 text-cyan-100`
- `border-cyan-200/50 bg-cyan-400/20 text-cyan-50`
- `border-cyan-200/55 bg-cyan-400/18 shadow-[0_16px_55px_rgba(34,211,238,.18)]`
- `border-emerald-200/16 bg-emerald-400/[0.075]`
- `border-emerald-200/20 bg-emerald-400/[0.055]`
- `border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15`
- `border-emerald-200/20 bg-emerald-400/12`
- `border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]`
- `border-emerald-200/30 bg-emerald-300/16 text-emerald-50`
- `border-emerald-200/30 bg-emerald-400/14 text-emerald-50`
- `border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]`
- `border-emerald-300/35 bg-emerald-400/15 text-emerald-100`
- `border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100`
- `border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100`
- `border-indigo-300/45 bg-indigo-500/18 text-indigo-100`
- `border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]`
- `border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]`
- `border-orange-300/45 bg-orange-500/18 text-orange-100`
- `border-red-200/22 bg-red-400/[0.06]`
- `border-red-200/22 bg-red-400/12`
- `border-red-200/30 bg-red-400/14 text-red-50`
- `border-red-300/45 bg-red-500/18 text-red-100`
- `border-rose-200/20 bg-rose-400/10 from-rose-400/15`
- `border-rose-300/45 bg-rose-500/18 text-rose-100`
- `border-sky-200/20 bg-sky-400/[0.055]`
- `border-sky-200/20 bg-sky-400/12`
- `border-sky-200/30 bg-sky-400/14 text-sky-50`
- `border-sky-300/35 bg-sky-400/15 text-sky-100`
- `border-sky-300/45 bg-sky-500/18 text-sky-100`
- `border-slate-200/20 bg-slate-300/10 text-slate-200`
- `border-stone-200/45 bg-stone-400/18 text-stone-100`
- `border-t border-white/10 p-2`
- `border-t border-white/10 p-3`
- `border-violet-200/16 bg-violet-400/[0.075]`
- `border-violet-200/20 bg-violet-400/10 from-violet-400/15`
- `border-violet-200/22 bg-violet-400/[0.06]`
- `border-violet-200/22 bg-violet-400/12`
- `border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]`
- `border-violet-200/30 bg-violet-300/16 text-violet-50`
- `border-violet-200/30 bg-violet-400/14 text-violet-50`
- `border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]`
- `border-violet-300/35 bg-violet-400/15 text-violet-100`
- `border-violet-300/45 bg-violet-500/18 text-violet-100`
- `border-white/10 bg-white/[0.045] hover:border-cyan-200/35`
- `border-white/10 bg-white/[0.055] text-slate-300`
- `border-yellow-200/45 bg-yellow-400/18 text-yellow-100`
- `flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between`
- `flex flex-wrap gap-2`
- `font-bold text-red-100`
- `font-bold text-slate-300`
- `from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25`
- `from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25`
- `from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25`
- `from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25`
- `grid aspect-square place-items-center bg-white/[0.04] p-3`
- `grid aspect-square place-items-center p-3`
- `grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] xl:w-[780px]`
- `grid grid-cols-2 gap-2 md:grid-cols-5`
- `grid grid-cols-2 gap-3 sm:grid-cols-3`
- `grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4`
- `grid items-start gap-3 lg:grid-cols-3`
- `grid items-start gap-3 sm:grid-cols-2 xl:grid-cols-4`
- `grid items-start gap-4 lg:grid-cols-2`
- `grid items-start gap-5 xl:grid-cols-[1.2fr_.8fr]`
- `grid items-start gap-5 xl:grid-cols-[1.4fr_.9fr]`
- `grid min-h-screen place-items-center bg-[radial-gradient(circle_at_18%_0%,rgba(14,165,233,.32),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(34,197,94,.22),transparent_28%),#050815] p-4 text-white`
- `grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,.28),transparent_35%),#060914] p-4 text-white`
- `group relative min-h-[92px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5`
- `h-5 w-5 accent-cyan-400`
- `inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100/75`
- `inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-black text-white`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]`
- `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15`
- `max-h-full object-contain`
- `mb-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70`
- `mb-2 flex items-center justify-between`
- `mb-3 flex flex-wrap items-center justify-between gap-2`
- `mb-4 flex flex-wrap gap-2`
- `mb-4 grid min-w-0 items-start gap-3 sm:grid-cols-2 2xl:grid-cols-4`
- `mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm font-bold leading-6 text-slate-300`
- `mb-4 text-cyan-200`
- `mb-4 text-emerald-200`
- `mb-4 text-violet-200`
- `mb-5 grid gap-3 md:grid-cols-2`
- `min-h-[520px] resize-y font-mono text-xs leading-6`
- `min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10`
- `min-w-0`
- `mt-1 block break-all text-xs font-bold text-slate-300`
- `mt-1 block text-3xl font-black`
- `mt-1 block truncate text-xs font-bold text-slate-400`
- `mt-1 block truncate text-xs text-slate-400`
- `mt-3 inline-flex min-h-9 w-full items-center justify-center gap-2 rounded-2xl border border-cyan-200/20 bg-cyan-400/10 px-3 text-[11px] font-black text-cyan-50 transition hover:border-cyan-200/45 hover:bg-cyan-400/18`
- `mt-4 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`
- `mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_18px_70px_rgba(0,0,0,.2)]`
- `mt-5 space-y-5`
- `opacity-24 saturate-75 group-hover:opacity-40`
- `opacity-52 saturate-125`
- `overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40`
- `overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40`
- `pl-11`
- `pointer-events-none absolute inset-0 bg-slate-950/45`
- `pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:28px_28px]`
- `pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500`
- `pokemon-admin-surface text-white`
- `relative`
- `relative block`
- `relative inline-flex rounded-full border border-white/10 bg-slate-950/45 px-2.5 py-1 text-[11px] font-black text-cyan-50`
- `relative mt-1 block truncate text-[11px] font-bold text-slate-300`
- `relative mt-3 block text-sm font-black text-white`
- `relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_24px_90px_rgba(0,0,0,.25)] backdrop-blur-2xl sm:p-5`
- `rounded-[2rem] border border-cyan-300/15 bg-cyan-400/10 p-5`
- `rounded-[2rem] border border-emerald-300/15 bg-emerald-400/10 p-5`
- `rounded-[2rem] border border-violet-300/15 bg-violet-400/10 p-5`
- `rounded-[2rem] border border-white/10 bg-slate-950/30 p-3`
- `rounded-2xl border border-dashed border-white/15 p-3 text-sm font-bold text-slate-400`
- `rounded-2xl border border-dashed border-white/15 p-5 text-sm font-bold text-slate-400`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-3`
- `rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5`
- `rounded-full bg-white/10 px-2 py-1 text-xs font-black text-slate-300`
- `rounded-full border px-4 py-2 text-xs font-black`
- `space-y-3`
- `space-y-4`
- `text-3xl font-black tracking-tight sm:text-4xl`
- `text-amber-100`
- `text-amber-100/74`
- `text-cyan-100/72`
- `text-cyan-200`
- `text-emerald-100/72`
- `text-emerald-200`
- `text-red-100/74`
- `text-red-200`
- `text-sky-100/72`
- `text-sm font-bold text-cyan-100/80`
- `text-sm font-bold text-emerald-100/80`
- `text-sm font-bold text-violet-100/80`
- `text-violet-100/72`
- `text-white`
- `text-xl font-black`
- `text-xs font-black text-cyan-100 underline-offset-4 hover:underline`
- `w-full`

## 12. Conditional classes, variables and inline styles

### Conditional class expressions

- `\`${fieldClass} min-h-[520px] resize-y font-mono text-xs leading-6\``
- `\`${fieldClass} pl-11\``
- `\`absolute inset-0 h-full w-full object-cover transition duration-300 ${ activeFilter ? "opacity-52 saturate-125" : "opacity-24 saturate-75 group-hover:opacity-40" }\``
- `\`group relative min-h-[92px] overflow-hidden rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${ activeFilter ? "border-cyan-200/55 bg-cyan-400/18 shadow-[0_16px_55px_rgba(34,211,238,.18)]" : "border-white/10 bg-white/[0.045] hover:border-cyan-200/35" }\``
- `\`rounded-full border px-4 py-2 text-xs font-black ${ assetTab === id ? "border-cyan-200/50 bg-cyan-400/20 text-cyan-50" : "border-white/10 bg-white/[0.055] text-slate-300" }\``
- `buttonClass`
- `fieldClass`
- `item.ok ? "text-emerald-200" : "text-red-200"`
- `panelClass`
- `primaryButtonClass`

### CSS variables

`--accent-glow`, `--accent-tertiary`, `--foreground`

### Inline style expressions

- `{{ backgroundImage: 'linear-gradient(135deg, rgba(15,23,42,.88), rgba(14,165,233,.18)), url("/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png")', backgroundSize: "cover", backgroundPosition: "center", }}`

### Referenced local/imported style declarations

```tsx
src/components/admin/pokemon/admin-ui.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
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

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorChannel
function colorChannel(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(255, Math.round(numeric <= 1 ? numeric * 255 : numeric)));
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToCss
function colorToCss(color) {
  if (!color) return "rgba(148,163,184,.35)";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToHex
function colorToHex(color) {
  const normalized = normalizeColor(color);
  if (!normalized) return "";
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#colorToLabel
function colorToLabel(color) {
  if (!color) return "-";
  if (typeof color === "string") return color;
  const { r, g, b, a } = normalizeColor(color);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#normalizeColor
function normalizeColor(color) {
  if (!color || typeof color === "string") return null;
  return {
    r: colorChannel(color.r ?? color.red),
    g: colorChannel(color.g ?? color.green),
    b: colorChannel(color.b ?? color.blue),
    a: Math.max(0, Math.min(1, Number(color.a ?? color.alpha ?? 1))),
  };
}
```

```tsx
src/components/admin/pokemon/candy-panel.jsx#variantTone
function variantTone(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  if (kind === "dynamax") return "border-sky-300/35 bg-sky-400/15 text-sky-100";
  if (kind === "gigantamax") return "border-violet-300/35 bg-violet-400/15 text-violet-100";
  if (kind === "mega") return "border-fuchsia-300/35 bg-fuchsia-400/15 text-fuchsia-100";
  if (kind === "form") return "border-amber-300/35 bg-amber-400/15 text-amber-100";
  return "border-emerald-300/35 bg-emerald-400/15 text-emerald-100";
}
```

```tsx
src/components/admin/pokemon/catalog-panel.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.86), rgba(15,23,42,.76)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.86), rgba(2,6,23,.78))";
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#assetStatTone
assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantModes
collectionVariantModes = [
  ["multi", "Multi variante"],
  ["single", "Non variante"],
]
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#collectionVariantRank
function collectionVariantRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "form") return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#entryMatchesVariantMode
function entryMatchesVariantMode(entry, variantMode) {
  if (entry.collectionType === "event") return true;
  if (variantMode !== "single") return true;
  return String(entry.kind || "").toLowerCase() === "pokemon" && String(entry.form || "normal").toLowerCase() === "normal";
}
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#fieldClass
fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#panelClass
panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5"
```

```tsx
src/components/admin/pokemon/collections-panel.jsx#primaryButtonClass
primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]"
```

```tsx
src/components/admin/pokemon/dataset-event-banner.jsx#statusTone
function statusTone(status) {
  const value = String(status || "").toLowerCase();
  if (value.includes("ongoing") || value.includes("current") || value.includes("cours")) {
    return "border-emerald-200/30 bg-emerald-300/16 text-emerald-50";
  }
  if (value.includes("upcoming") || value.includes("venir")) {
    return "border-violet-200/30 bg-violet-300/16 text-violet-50";
  }
  return "border-slate-200/20 bg-slate-300/10 text-slate-200";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadgeConfig
assetBadgeConfig = {
  female: ["♀", "Femelle", "border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100"],
  male: ["♂", "Mâle", "border-sky-300/45 bg-sky-500/18 text-sky-100"],
  event: ["✦", "Event", "border-amber-300/45 bg-amber-500/18 text-amber-100"],
  mega: ["Μ", "Méga", "border-violet-300/45 bg-violet-500/18 text-violet-100"],
  primal: ["Ω", "Primo", "border-orange-300/45 bg-orange-500/18 text-orange-100"],
  alola: ["A", "Alola", "border-yellow-200/45 bg-yellow-400/18 text-yellow-100"],
  galar: ["G", "Galar", "border-indigo-300/45 bg-indigo-500/18 text-indigo-100"],
  hisui: ["H", "Hisui", "border-stone-200/45 bg-stone-400/18 text-stone-100"],
  paldea: ["P", "Paldea", "border-rose-300/45 bg-rose-500/18 text-rose-100"],
  dynamax: ["D", "Dyna", "border-red-300/45 bg-red-500/18 text-red-100"],
  gigantamax: ["G", "Giga", "border-red-300/45 bg-red-500/18 text-red-100"],
  shiny: ["✦", "Shiny", "border-cyan-200/45 bg-cyan-400/18 text-cyan-100"],
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#assetBadges
function assetBadges(asset = {}) {
  const form = String(asset.form || asset.detail || "").toLowerCase();
  const costume = String(asset.costume || "").trim();
  const badges = [];
  if (isFemaleAsset(asset)) badges.push("female");
  if (isMaleAsset(asset)) badges.push("male");
  if (costume || (form && !["normal", "standard"].includes(form) && !variantBadgeForForm(form))) badges.push("event");
  if (asset.gigantamax || form.includes("gigantamax")) badges.push("gigantamax");
  const formBadge = variantBadgeForForm(form);
  if (formBadge) badges.push(formBadge);
  return uniqueBadges(badges);
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#cardTones
cardTones = [
  "border-cyan-200/16 bg-cyan-400/[0.075]",
  "border-emerald-200/16 bg-emerald-400/[0.075]",
  "border-violet-200/16 bg-violet-400/[0.075]",
  "border-amber-200/16 bg-amber-400/[0.075]",
]
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardBackground
function catchCardBackground(type) {
  const name = typeBackgroundNames[String(type || "").toUpperCase()];
  return name ? `/ui/backgrounds/catchCards/CatchCard_TypeBG_${name}.png` : "";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#catchCardStyle
function catchCardStyle(index = 0, preferredType = "NORMAL", opacity = "dark") {
  const background = catchCardForIndex(index, preferredType);
  const overlay =
    opacity === "soft"
      ? "linear-gradient(135deg, rgba(255,255,255,.9), rgba(248,250,252,.82)), linear-gradient(180deg, rgba(15,23,42,.18), rgba(15,23,42,.24))"
      : "linear-gradient(135deg, rgba(2,6,23,.93), rgba(15,23,42,.89)), linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))";
  return {
    backgroundImage: background ? `${overlay}, url("${background}")` : overlay,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#rgbaColor
function rgbaColor(color, alpha = 1) {
  if (!color || typeof color !== "object") return "";
  const channel = (value) => Math.max(0, Math.min(255, Math.round(Number(value || 0) * 255)));
  return `rgba(${channel(color.r)}, ${channel(color.g)}, ${channel(color.b)}, ${color.a ?? alpha})`;
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#sectionTones
sectionTones = {
  cyan: "border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15",
  emerald: "border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15",
  violet: "border-violet-200/20 bg-violet-400/10 from-violet-400/15",
  amber: "border-amber-200/20 bg-amber-400/10 from-amber-400/15",
  rose: "border-rose-200/20 bg-rose-400/10 from-rose-400/15",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typeBackgroundNames
typeBackgroundNames = {
  BUG: "Bug",
  DARK: "Dark",
  DRAGON: "Dragon",
  ELECTRIC: "Electric",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  FIRE: "Fire",
  FLYING: "Flying",
  GHOST: "Ghost",
  GRASS: "Grass",
  GROUND: "Ground",
  ICE: "Ice",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  ROCK: "Rock",
  STEEL: "Steel",
  WATER: "Water",
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#typePanelBackground
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.68), rgba(8,13,25,.52)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.7), rgba(2,6,23,.58))";
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#uniqueBadges
function uniqueBadges(badges) {
  return [...new Set(badges.filter(Boolean))];
}
```

```tsx
src/components/admin/pokemon/detail-modal.jsx#variantBadgeForForm
function variantBadgeForForm(form) {
  if (form.includes("mega")) return "mega";
  if (form.includes("primal")) return "primal";
  if (form.includes("alola")) return "alola";
  if (form.includes("galar")) return "galar";
  if (form.includes("hisui")) return "hisui";
  if (form.includes("paldea")) return "paldea";
  if (form.includes("dynamax")) return "dynamax";
  if (form.includes("gigantamax")) return "gigantamax";
  return "";
}
```

```tsx
src/components/admin/pokemon/max-battles-panel.jsx#toneForTier
function toneForTier(id) {
  const tier = Number(String(id).match(/\d+/)?.[0] || 1);
  if (tier >= 5) return "red";
  if (tier === 4) return "violet";
  if (tier === 3) return "amber";
  if (tier === 2) return "green";
  return "cyan";
}
```

```tsx
src/components/admin/pokemon/research-panel.jsx#sectionTones
sectionTones = {
  fieldResearch: "border-cyan-200/24 bg-cyan-400/[0.075] shadow-[inset_0_1px_0_rgba(103,232,249,.16)]",
  eventResearch: "border-orange-200/28 bg-orange-400/[0.085] shadow-[inset_0_1px_0_rgba(253,186,116,.16)]",
  timedResearch: "border-emerald-200/24 bg-emerald-400/[0.075] shadow-[inset_0_1px_0_rgba(110,231,183,.15)]",
  specialResearch: "border-violet-200/26 bg-violet-400/[0.08] shadow-[inset_0_1px_0_rgba(196,181,253,.15)]",
}
```

```tsx
src/components/admin/pokemon/research-panel.jsx#taskCategoryTones
taskCategoryTones = {
  fieldResearch: "border-cyan-200/30 bg-cyan-400/16 text-cyan-50 shadow-[0_0_22px_rgba(34,211,238,.1)]",
  eventResearch: "border-orange-200/32 bg-orange-400/18 text-orange-50 shadow-[0_0_22px_rgba(251,146,60,.1)]",
  timedResearch: "border-emerald-200/30 bg-emerald-400/16 text-emerald-50 shadow-[0_0_22px_rgba(52,211,153,.1)]",
  specialResearch: "border-violet-200/30 bg-violet-400/16 text-violet-50 shadow-[0_0_22px_rgba(167,139,250,.1)]",
}
```

```tsx
src/components/admin/pokemon/tier-section.jsx#toneStyles
toneStyles = {
  cyan: {
    shell: "border-cyan-200/20 bg-cyan-400/[0.055]",
    icon: "border-cyan-200/20 bg-cyan-400/12",
    count: "border-cyan-200/30 bg-cyan-400/14 text-cyan-50",
    text: "text-cyan-100/72",
    glow: "rgba(34,211,238,.16)",
  },
  blue: {
    shell: "border-sky-200/20 bg-sky-400/[0.055]",
    icon: "border-sky-200/20 bg-sky-400/12",
    count: "border-sky-200/30 bg-sky-400/14 text-sky-50",
    text: "text-sky-100/72",
    glow: "rgba(56,189,248,.16)",
  },
  violet: {
    shell: "border-violet-200/22 bg-violet-400/[0.06]",
    icon: "border-violet-200/22 bg-violet-400/12",
    count: "border-violet-200/30 bg-violet-400/14 text-violet-50",
    text: "text-violet-100/72",
    glow: "rgba(167,139,250,.15)",
  },
  amber: {
    shell: "border-amber-200/22 bg-amber-400/[0.06]",
    icon: "border-amber-200/22 bg-amber-400/12",
    count: "border-amber-200/30 bg-amber-400/14 text-amber-50",
    text: "text-amber-100/74",
    glow: "rgba(251,191,36,.14)",
  },
  green: {
    shell: "border-emerald-200/20 bg-emerald-400/[0.055]",
    icon: "border-emerald-200/20 bg-emerald-400/12",
    count: "border-emerald-200/30 bg-emerald-400/14 text-emerald-50",
    text: "text-emerald-100/72",
    glow: "rgba(52,211,153,.14)",
  },
  red: {
    shell: "border-red-200/22 bg-red-400/[0.06]",
    icon: "border-red-200/22 bg-red-400/12",
    count: "border-red-200/30 bg-red-400/14 text-red-50",
    text: "text-red-100/74",
    glow: "rgba(248,113,113,.15)",
  },
}
```

```tsx
src/components/site/pokemon-style.js#pokemonVariantLabel
export function pokemonVariantLabel(entry = {}) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "event") return "Évènement";
  if (kind === "mega") return "Méga";
  if (kind === "dynamax") return "Dynamax";
  if (kind === "gigantamax") return "Gigamax";
  if (kind === "form" && form !== "normal") return form.charAt(0).toUpperCase() + form.slice(1);
  return "Normal";
}
```

```tsx
src/components/site/pokemon-style.js#typeBackground
export function typeBackground(type, catalog = []) {
  return catalogItem(catalog, type)?.assets?.background || null;
}
```

```tsx
src/components/site/pokemon-style.js#typeColors
typeColors = {
  BUG: "#91c12f",
  DARK: "#5a5465",
  DRAGON: "#0b6dc3",
  ELECTRIC: "#f4d23c",
  FAIRY: "#ec8fe6",
  FIGHTING: "#ce416b",
  FIRE: "#ff9d55",
  FLYING: "#89aae3",
  GHOST: "#5269ad",
  GRASS: "#63bc5a",
  GROUND: "#d97845",
  ICE: "#73cec0",
  NORMAL: "#919aa2",
  POISON: "#aa6bc8",
  PSYCHIC: "#fa7179",
  ROCK: "#c5b78c",
  STEEL: "#5a8ea2",
  WATER: "#5090d6",
}
```

```tsx
src/utils/admin/pokemon-entries.js#variantSortRank
function variantSortRank(entry) {
  const kind = String(entry.kind || "").toLowerCase();
  const form = String(entry.form || "normal").toLowerCase();
  if (kind === "pokemon" && ["normal", "base"].includes(form)) return 0;
  if (["form", "alola", "galar", "hisui", "paldea"].some((value) => kind === value || form.includes(value))) return 1;
  if (kind === "mega" || form.includes("mega") || form.includes("primal")) return 2;
  if (kind === "dynamax" || form.includes("dynamax")) return 3;
  if (kind === "gigantamax" || form.includes("gigantamax")) return 4;
  if (kind === "event") return 5;
  return 9;
}
```

### Referenced global custom CSS rules

```css
.light .pokemon-admin-surface {
min-height: calc(100dvh - 7rem);
  border-radius: 2rem;
  background:
    radial-gradient(circle at 12% 0%, var(--accent-glow), transparent 32%),
    radial-gradient(circle at 88% 12%, color-mix(in srgb, var(--accent-tertiary) 12%, transparent), transparent 28%),
    linear-gradient(135deg, rgba(248, 252, 255, 0.98), rgba(229, 242, 250, 0.96));
  color: var(--foreground);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.94),
    0 30px 110px rgba(15, 23, 42, 0.13);
}
```

```css
.pokemon-admin-surface {
color: #fff;
}
```

### Data attributes

Not found

### Pseudo selectors/variants

`focus:`, `group-hover:`, `hover:`

## 13. Responsive behavior

- Breakpoints used: `2xl`, `lg`, `md`, `sm`, `xl`.
- Responsive utilities: `2xl:grid-cols-4`, `lg:grid-cols-2`, `lg:grid-cols-3`, `md:grid-cols-2`, `md:grid-cols-5`, `sm:grid-cols-[minmax(0,1fr)_auto_auto]`, `sm:grid-cols-2`, `sm:grid-cols-3`, `sm:p-5`, `sm:text-4xl`, `xl:flex-row`, `xl:grid-cols-[1.2fr_.8fr]`, `xl:grid-cols-[1.4fr_.9fr]`, `xl:grid-cols-3`, `xl:grid-cols-4`, `xl:items-center`, `xl:justify-between`, `xl:w-[780px]`.
- Media queries defined locally: Not found. Global media queries are specified in the responsive foundation document.
- Behavior between encoded breakpoints: Estimated from implementation.

## 14. Motion and transition specification

- Animation/transition tokens: `duration-300`, `hover:-translate-y-0.5`, `hover:scale-[1.01]`, `transition`.
- Animation libraries imported by file: Not found.
- Timing/easing not encoded by listed utilities or source expressions: Not found.
- Motion trigger: Detected through event/state evidence; preserve exact trigger..

## 15. Accessibility, ARIA and keyboard support

- ARIA attributes: Not found.
- Roles: Not found.
- Keyboard events: Not found.
- Focus management hooks/refs: Not found.
- Native semantics derive from the exact tag outline; compliance level without runtime inspection: Not found.

## 16. Icons, images and decorative assets

- Lucide icons: `BarChart3`, `Cloud`, `Copy`, `History`, `Radar`, `RefreshCcw`, `Search`, `ShieldCheck`, `Sparkles`, `Wand2`.
- Asset references: `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
- SVG usage: Not found.
- Decorative/semantic intent for empty alt text must follow the exact source; intent beyond attributes: Estimated from implementation.

## 17. Figma reconstruction specification

- Auto Layout: vertical. Preserve every nested flex/grid boundary shown in the HTML outline.
- Component set: create one variant axis per explicit prop/value pair listed above; do not invent missing variants.
- Boolean properties: Hover, Focused, Selected, Checked, Unchecked, Loading, Disabled, Error, Warning, Success, Empty, Expanded, Active, Inactive, Read Only.
- Instance swaps: `BarChart3`, `Cloud`, `Copy`, `History`, `Radar`, `RefreshCcw`, `Search`, `ShieldCheck`, `Sparkles`, `Wand2`, `/ui/backgrounds/catchCards/CatchCard_TypeBG_Water.png`.
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
| □ | Checked | checked signal |
| □ | Unchecked | inverse checked state |
| □ | Loading | loading/pending signal |
| □ | Disabled | disabled prop, attribute, or class |
| □ | Error | error/danger signal |
| □ | Warning | warning/amber/yellow signal |
| □ | Success | success/green signal |
| □ | Empty | empty collection branch |
| — | Collapsed | Not found |
| □ | Expanded | expanded/open signal |
| — | Dragging | Not found |
| — | Drop Target | Not found |
| □ | Active | active signal |
| □ | Inactive | inactive inverse state |
| □ | Read Only | read-only signal |
| — | Hidden | Not found |
| □ | Visible | Rendered state |
| — | Scrollable | Not found |
| — | Sticky | Not found |
| □ | Responsive: 2xl | Tailwind 2xl: utilities |
| □ | Responsive: lg | Tailwind lg: utilities |
| □ | Responsive: md | Tailwind md: utilities |
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

# Figma reconstruction plan

## Build order

1. Create primitive and semantic variables from the token registry.
2. Recreate global effects/backgrounds and typography styles.
3. Build Primitive UI components in descending priority.
4. Build shared/layout/navigation components.
5. Build feature components and internal nested components.
6. Assemble layouts and routes.
7. Capture and compare every state/variant/breakpoint from the component checklists.

## Priority matrix

| Rank | ID | Component | Category | Score | Parents | Specification |
|---|---|---|---|---|---|---|
| 1 | MWI-COMP-319 | Card | Primitive UI | 88 | 39 | [open](../components/components-ui-card-card.md) |
| 2 | MWI-COMP-317 | Badge | Primitive UI | 88 | 31 | [open](../components/components-ui-badge-badge.md) |
| 3 | MWI-COMP-318 | Button | Primitive UI | 88 | 28 | [open](../components/components-ui-button-button.md) |
| 4 | MWI-COMP-323 | Input | Primitive UI | 88 | 15 | [open](../components/components-ui-input-input.md) |
| 5 | MWI-COMP-322 | CardDescription | Primitive UI | 88 | 11 | [open](../components/components-ui-card-carddescription.md) |
| 6 | MWI-COMP-320 | CardHeader | Primitive UI | 88 | 11 | [open](../components/components-ui-card-cardheader.md) |
| 7 | MWI-COMP-321 | CardTitle | Primitive UI | 88 | 11 | [open](../components/components-ui-card-cardtitle.md) |
| 8 | MWI-COMP-325 | Modal | Primitive UI | 85 | 9 | [open](../components/components-ui-modal-modal.md) |
| 9 | MWI-COMP-324 | Textarea | Primitive UI | 85 | 9 | [open](../components/components-ui-input-textarea.md) |
| 10 | MWI-COMP-131 | Panel | Pokémon feature | 58 | 16 | [open](../components/components-admin-pokemon-admin-ui-panel.md) |
| 11 | MWI-COMP-133 | AssetStatCard | Pokémon feature | 58 | 10 | [open](../components/components-admin-pokemon-admin-ui-assetstatcard.md) |
| 12 | MWI-COMP-140 | TypeIcons | Pokémon feature | 58 | 10 | [open](../components/components-admin-pokemon-asset-icons-typeicons.md) |
| 13 | MWI-COMP-092 | AdminAppFrame | Layout / navigation | 52 | 2 | [open](../components/components-admin-layout-admin-app-frame-adminappframe.md) |
| 14 | MWI-COMP-093 | Providers | Layout / navigation | 52 | 2 | [open](../components/components-admin-layout-admin-providers-providers.md) |
| 15 | MWI-COMP-237 | DashboardLoadingState | Shared pattern | 49 | 7 | [open](../components/components-admin-shared-loading-state-dashboardloadingstate.md) |
| 16 | MWI-COMP-154 | DatasetFilterBar | Pokémon feature | 49 | 7 | [open](../components/components-admin-pokemon-dataset-filter-bar-datasetfilterbar.md) |
| 17 | MWI-COMP-121 | AdminPaletteSelector | Layout / navigation | 49 | 1 | [open](../components/components-admin-navigation-admin-palette-selector-adminpaletteselector.md) |
| 18 | MWI-COMP-122 | AdminSidebar | Layout / navigation | 49 | 1 | [open](../components/components-admin-navigation-admin-sidebar-adminsidebar.md) |
| 19 | MWI-COMP-124 | AdminTopbar | Layout / navigation | 49 | 1 | [open](../components/components-admin-navigation-admin-topbar-admintopbar.md) |
| 20 | MWI-COMP-094 | AdminVersionHistoryDialog | Layout / navigation | 49 | 1 | [open](../components/components-admin-layout-admin-version-history-dialog-adminversionhistorydialog.md) |
| 21 | MWI-COMP-238 | SortableWidgetGrid | Shared pattern | 46 | 6 | [open](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) |
| 22 | MWI-COMP-008 | DashboardLayout | Layout | 46 | 0 | [open](../components/app-dashboard-layout-dashboardlayout.md) |
| 23 | MWI-COMP-021 | RootLayout | Layout | 46 | 0 | [open](../components/app-layout-rootlayout.md) |
| 24 | MWI-COMP-156 | Section | Pokémon internal | 45 | 10 | [open](../components/components-admin-pokemon-detail-modal-section.md) |
| 25 | MWI-COMP-123 | AdminSidebarLink | Layout / navigation | 41 | 1 | [open](../components/components-admin-navigation-admin-sidebar-adminsidebarlink.md) |
| 26 | MWI-COMP-137 | MiniCardList | Pokémon feature | 40 | 4 | [open](../components/components-admin-pokemon-admin-ui-minicardlist.md) |
| 27 | MWI-COMP-001 | AccountPage | Page | 40 | 0 | [open](../components/app-dashboard-account-page-accountpage.md) |
| 28 | MWI-COMP-002 | AnalyticsPage | Page | 40 | 0 | [open](../components/app-dashboard-analytics-page-analyticspage.md) |
| 29 | MWI-COMP-003 | CalendarPage | Page | 40 | 0 | [open](../components/app-dashboard-calendar-page-calendarpage.md) |
| 30 | MWI-COMP-018 | DashboardBacklogPage | Page | 40 | 0 | [open](../components/app-dashboard-tools-dashboard-backlog-page-dashboardbacklogpage.md) |
| 31 | MWI-COMP-010 | DashboardHome | Page | 40 | 0 | [open](../components/app-dashboard-page-dashboardhome.md) |
| 32 | MWI-COMP-004 | DatabasePage | Page | 40 | 0 | [open](../components/app-dashboard-database-page-databasepage.md) |
| 33 | MWI-COMP-005 | JavaScriptExercisesPage | Page | 40 | 0 | [open](../components/app-dashboard-exercices-javascript-page-javascriptexercisespage.md) |
| 34 | MWI-COMP-006 | JsProgressPage | Page | 40 | 0 | [open](../components/app-dashboard-js-progress-page-jsprogresspage.md) |
| 35 | MWI-COMP-007 | KanbanPage | Page | 40 | 0 | [open](../components/app-dashboard-kanban-page-kanbanpage.md) |
| 36 | MWI-COMP-022 | LoginPage | Page | 40 | 0 | [open](../components/app-login-page-loginpage.md) |
| 37 | MWI-COMP-009 | NotesPage | Page | 40 | 0 | [open](../components/app-dashboard-notes-page-notespage.md) |
| 38 | MWI-COMP-011 | PalettePage | Page | 40 | 0 | [open](../components/app-dashboard-palette-page-palettepage.md) |
| 39 | MWI-COMP-012 | PokemonAdminPage | Page | 40 | 0 | [open](../components/app-dashboard-pokemon-admin-page-pokemonadminpage.md) |
| 40 | MWI-COMP-013 | PokemonDocsPage | Page | 40 | 0 | [open](../components/app-dashboard-pokemon-docs-page-pokemondocspage.md) |
| 41 | MWI-COMP-014 | PomodoroPage | Page | 40 | 0 | [open](../components/app-dashboard-pomodoro-page-pomodoropage.md) |
| 42 | MWI-COMP-015 | ProjectsPage | Page | 40 | 0 | [open](../components/app-dashboard-projects-page-projectspage.md) |
| 43 | MWI-COMP-016 | SnippetsPage | Page | 40 | 0 | [open](../components/app-dashboard-snippets-page-snippetspage.md) |
| 44 | MWI-COMP-017 | TodoPage | Page | 40 | 0 | [open](../components/app-dashboard-todo-page-todopage.md) |
| 45 | MWI-COMP-019 | ToolsPage | Page | 40 | 0 | [open](../components/app-dashboard-tools-page-toolspage.md) |
| 46 | MWI-COMP-020 | WriterPage | Page | 40 | 0 | [open](../components/app-dashboard-writer-page-writerpage.md) |
| 47 | MWI-COMP-117 | LearningProgressBar | Learning feature | 37 | 3 | [open](../components/components-admin-learning-learning-progress-bar-learningprogressbar.md) |
| 48 | MWI-COMP-193 | PokemonApiStatus | Pokémon feature | 37 | 3 | [open](../components/components-admin-pokemon-pokemon-api-status-pokemonapistatus.md) |
| 49 | MWI-COMP-234 | TierSection | Pokémon feature | 37 | 3 | [open](../components/components-admin-pokemon-tier-section-tiersection.md) |
| 50 | MWI-COMP-127 | AdminApp | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-app-adminapp.md) |
| 51 | MWI-COMP-132 | BarList | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-barlist.md) |
| 52 | MWI-COMP-073 | CalendarPlanner | Form feature | 34 | 2 | [open](../components/components-admin-forms-calendar-planner-calendarplanner.md) |
| 53 | MWI-COMP-144 | CandyPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-candy-panel-candypanel.md) |
| 54 | MWI-COMP-148 | CatalogPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) |
| 55 | MWI-COMP-150 | CollectionsPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-collections-panel-collectionspanel.md) |
| 56 | MWI-COMP-026 | ColorLab | Dashboard feature | 34 | 2 | [open](../components/components-admin-dashboard-color-lab-colorlab.md) |
| 57 | MWI-COMP-135 | CompletionList | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-completionlist.md) |
| 58 | MWI-COMP-138 | ControlCardsPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-controlcardspanel.md) |
| 59 | MWI-COMP-028 | DailyTools | Dashboard feature | 34 | 2 | [open](../components/components-admin-dashboard-daily-tools-dailytools.md) |
| 60 | MWI-COMP-252 | DashboardBacklog | Component | 34 | 2 | [open](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) |
| 61 | MWI-COMP-236 | DashboardFooter | Shared pattern | 34 | 2 | [open](../components/components-admin-shared-dashboard-footer-dashboardfooter.md) |
| 62 | MWI-COMP-030 | DashboardHomeLive | Dashboard feature | 34 | 2 | [open](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) |
| 63 | MWI-COMP-241 | DatabaseStats | Analytics feature | 34 | 2 | [open](../components/components-admin-stats-database-stats-databasestats.md) |
| 64 | MWI-COMP-231 | DataDeployHistoryModal | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-source-watch-panel-datadeployhistorymodal.md) |
| 65 | MWI-COMP-153 | DatasetEventBanner | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-dataset-event-banner-dataseteventbanner.md) |
| 66 | MWI-COMP-178 | DetailModal | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-detail-modal-detailmodal.md) |
| 67 | MWI-COMP-183 | EggsPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-eggs-panel-eggspanel.md) |
| 68 | MWI-COMP-051 | EventsCalendarPanel | Events feature | 34 | 2 | [open](../components/components-admin-events-events-calendar-panel-eventscalendarpanel.md) |
| 69 | MWI-COMP-134 | GenerationFilterBar | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-generationfilterbar.md) |
| 70 | MWI-COMP-136 | HistoryList | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-historylist.md) |
| 71 | MWI-COMP-079 | JavaScriptExercises | Form feature | 34 | 2 | [open](../components/components-admin-forms-javascript-exercises-javascriptexercises.md) |
| 72 | MWI-COMP-139 | JsonIssueList | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-admin-ui-jsonissuelist.md) |
| 73 | MWI-COMP-081 | JsProgress | Form feature | 34 | 2 | [open](../components/components-admin-forms-js-progress-jsprogress.md) |
| 74 | MWI-COMP-082 | KanbanBoard | Form feature | 34 | 2 | [open](../components/components-admin-forms-kanban-board-kanbanboard.md) |
| 75 | MWI-COMP-246 | LearningAnalytics | Analytics feature | 34 | 2 | [open](../components/components-admin-stats-learning-analytics-learninganalytics.md) |
| 76 | MWI-COMP-185 | LoginCard | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-login-card-logincard.md) |
| 77 | MWI-COMP-189 | MaxBattlesPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) |
| 78 | MWI-COMP-086 | NotesBoard | Form feature | 34 | 2 | [open](../components/components-admin-forms-notes-board-notesboard.md) |
| 79 | MWI-COMP-190 | PokemonAdminStudio | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-pokemon-admin-studio-pokemonadminstudio.md) |
| 80 | MWI-COMP-191 | PokemonApiExplorer | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-pokemon-api-explorer-pokemonapiexplorer.md) |
| 81 | MWI-COMP-198 | PokemonCard | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-pokemon-card-pokemoncard.md) |
| 82 | MWI-COMP-199 | PokemonDocsViewer | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-pokemon-docs-viewer-pokemondocsviewer.md) |
| 83 | MWI-COMP-041 | Pomodoro | Dashboard feature | 34 | 2 | [open](../components/components-admin-dashboard-pomodoro-pomodoro.md) |
| 84 | MWI-COMP-210 | RaidsPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-raids-panel-raidspanel.md) |
| 85 | MWI-COMP-218 | ResearchPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-research-panel-researchpanel.md) |
| 86 | MWI-COMP-224 | RocketPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) |
| 87 | MWI-COMP-043 | SnippetVault | Dashboard feature | 34 | 2 | [open](../components/components-admin-dashboard-snippet-vault-snippetvault.md) |
| 88 | MWI-COMP-230 | SourceHistoryModal | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-source-watch-panel-sourcehistorymodal.md) |
| 89 | MWI-COMP-232 | SourceRows | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-source-watch-panel-sourcerows.md) |
| 90 | MWI-COMP-087 | TodoList | Form feature | 34 | 2 | [open](../components/components-admin-forms-todo-list-todolist.md) |
| 91 | MWI-COMP-235 | UpdateLogPanel | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-update-log-panel-updatelogpanel.md) |
| 92 | MWI-COMP-141 | WeatherIcons | Pokémon feature | 34 | 2 | [open](../components/components-admin-pokemon-asset-icons-weathericons.md) |
| 93 | MWI-COMP-088 | WriterStudio | Form feature | 34 | 2 | [open](../components/components-admin-forms-writer-studio-writerstudio.md) |
| 94 | MWI-COMP-063 | DetailSection | Events internal | 33 | 6 | [open](../components/components-admin-events-events-calendar-panel-detailsection.md) |
| 95 | MWI-COMP-161 | EmptyInline | Pokémon internal | 33 | 6 | [open](../components/components-admin-pokemon-detail-modal-emptyinline.md) |
| 96 | MWI-COMP-155 | DatasetSourceHeader | Compatibility facade | 32 | 8 | [open](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) |
| 97 | MWI-COMP-129 | AdminSectionNavigation | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-admin-section-navigation-adminsectionnavigation.md) |
| 98 | MWI-COMP-130 | AdminTodoPanel | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-admin-todo-panel-admintodopanel.md) |
| 99 | MWI-COMP-143 | BackgroundPanel | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-background-panel-backgroundpanel.md) |
| 100 | MWI-COMP-240 | DashboardCharts | Analytics feature | 31 | 1 | [open](../components/components-admin-stats-dashboard-charts-dashboardcharts.md) |
| 101 | MWI-COMP-152 | DatasetSourceHeader | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-current-dataset-diagnostics-datasetsourceheader.md) |
| 102 | MWI-COMP-045 | EventEditorModal | Events feature | 31 | 1 | [open](../components/components-admin-events-event-editor-modal-eventeditormodal.md) |
| 103 | MWI-COMP-046 | ImportModal | Events feature | 31 | 1 | [open](../components/components-admin-events-event-editor-modal-importmodal.md) |
| 104 | MWI-COMP-095 | LearningAchievementGrid | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-achievement-grid-learningachievementgrid.md) |
| 105 | MWI-COMP-096 | LearningActivityTimeline | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-activity-learningactivitytimeline.md) |
| 106 | MWI-COMP-097 | LearningAdvancedStats | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-advanced-stats-learningadvancedstats.md) |
| 107 | MWI-COMP-098 | LearningDetailModal | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-detail-modal-learningdetailmodal.md) |
| 108 | MWI-COMP-115 | LearningImportModal | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-import-modal-learningimportmodal.md) |
| 109 | MWI-COMP-118 | LearningSummary | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-summary-learningsummary.md) |
| 110 | MWI-COMP-119 | LearningTopicCard | Learning feature | 31 | 1 | [open](../components/components-admin-learning-learning-topic-card-learningtopiccard.md) |
| 111 | MWI-COMP-316 | MetricCard | Component | 31 | 1 | [open](../components/components-site-metric-card-metriccard.md) |
| 112 | MWI-COMP-250 | PokemonAnalytics | Analytics feature | 31 | 1 | [open](../components/components-admin-stats-pokemon-analytics-pokemonanalytics.md) |
| 113 | MWI-COMP-023 | PokemonWidget | Component | 31 | 1 | [open](../components/components-admin-cards-pokemon-widget-pokemonwidget.md) |
| 114 | MWI-COMP-206 | PvpRankingsPanel | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) |
| 115 | MWI-COMP-229 | ShinyTrackerPanel | Pokémon feature | 31 | 1 | [open](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) |
| 116 | MWI-COMP-025 | StatCard | Component | 31 | 1 | [open](../components/components-admin-cards-stat-card-statcard.md) |
| 117 | MWI-COMP-104 | CardHeader | Learning internal | 30 | 5 | [open](../components/components-admin-learning-learning-detail-modal-cardheader.md) |
| 118 | MWI-COMP-105 | ProgressButton | Learning internal | 30 | 5 | [open](../components/components-admin-learning-learning-detail-modal-progressbutton.md) |
| 119 | MWI-COMP-112 | ListBlock | Learning internal | 27 | 4 | [open](../components/components-admin-learning-learning-detail-modal-listblock.md) |
| 120 | MWI-COMP-110 | MetaBlock | Learning internal | 27 | 4 | [open](../components/components-admin-learning-learning-detail-modal-metablock.md) |
| 121 | MWI-COMP-109 | UnitCard | Learning internal | 27 | 4 | [open](../components/components-admin-learning-learning-detail-modal-unitcard.md) |
| 122 | MWI-COMP-113 | Validation | Learning internal | 27 | 4 | [open](../components/components-admin-learning-learning-detail-modal-validation.md) |
| 123 | MWI-COMP-212 | Badge | Pokémon internal | 24 | 3 | [open](../components/components-admin-pokemon-research-panel-badge.md) |
| 124 | MWI-COMP-050 | EventBannerImage | Events internal | 24 | 3 | [open](../components/components-admin-events-events-calendar-panel-eventbannerimage.md) |
| 125 | MWI-COMP-168 | PokemonMiniCard | Pokémon internal | 24 | 3 | [open](../components/components-admin-pokemon-detail-modal-pokemonminicard.md) |
| 126 | MWI-COMP-111 | TagRow | Learning internal | 24 | 3 | [open](../components/components-admin-learning-learning-detail-modal-tagrow.md) |
| 127 | MWI-COMP-259 | Area | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-area.md) |
| 128 | MWI-COMP-253 | BacklogStat | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-backlogstat.md) |
| 129 | MWI-COMP-258 | Field | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-field.md) |
| 130 | MWI-COMP-254 | FilterSelect | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-filterselect.md) |
| 131 | MWI-COMP-024 | Metric | Internal component | 23 | 1 | [open](../components/components-admin-cards-pokemon-widget-metric.md) |
| 132 | MWI-COMP-257 | SelectField | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-selectfield.md) |
| 133 | MWI-COMP-239 | SortableWidgetFrame | Shared pattern | 23 | 1 | [open](../components/components-admin-shared-sortable-widget-grid-sortablewidgetframe.md) |
| 134 | MWI-COMP-255 | TicketCard | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-ticketcard.md) |
| 135 | MWI-COMP-256 | TicketForm | Internal component | 23 | 1 | [open](../components/components-admin-tables-dashboard-backlog-ticketform.md) |
| 136 | MWI-COMP-162 | CandyAmount | Pokémon internal | 21 | 2 | [open](../components/components-admin-pokemon-detail-modal-candyamount.md) |
| 137 | MWI-COMP-040 | EmptyLine | Dashboard internal | 21 | 2 | [open](../components/components-admin-dashboard-dashboard-home-live-emptyline.md) |
| 138 | MWI-COMP-078 | EventButton | Form internal | 21 | 2 | [open](../components/components-admin-forms-calendar-planner-eventbutton.md) |
| 139 | MWI-COMP-221 | PokemonCard | Pokémon internal | 21 | 2 | [open](../components/components-admin-pokemon-rocket-panel-pokemoncard.md) |
| 140 | MWI-COMP-067 | PokemonCardGrid | Events internal | 21 | 2 | [open](../components/components-admin-events-events-calendar-panel-pokemoncardgrid.md) |
| 141 | MWI-COMP-070 | RewardGrid | Events internal | 21 | 2 | [open](../components/components-admin-events-events-calendar-panel-rewardgrid.md) |
| 142 | MWI-COMP-225 | Trend | Pokémon internal | 21 | 2 | [open](../components/components-admin-pokemon-shiny-tracker-panel-trend.md) |
| 143 | MWI-COMP-157 | TypeBadge | Pokémon internal | 21 | 2 | [open](../components/components-admin-pokemon-detail-modal-typebadge.md) |
| 144 | MWI-COMP-219 | TypeIcons | Pokémon internal | 21 | 2 | [open](../components/components-admin-pokemon-rocket-panel-typeicons.md) |
| 145 | MWI-COMP-038 | ActionLink | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-actionlink.md) |
| 146 | MWI-COMP-226 | ActivityBar | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-shiny-tracker-panel-activitybar.md) |
| 147 | MWI-COMP-177 | AdminActions | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-adminactions.md) |
| 148 | MWI-COMP-147 | AdminMoveCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-catalog-panel-adminmovecard.md) |
| 149 | MWI-COMP-243 | ApiTimeline | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-database-stats-apitimeline.md) |
| 150 | MWI-COMP-049 | Area | Events internal | 18 | 1 | [open](../components/components-admin-events-event-editor-modal-area.md) |
| 151 | MWI-COMP-173 | AssetBadges | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-assetbadges.md) |
| 152 | MWI-COMP-172 | AssetGallery | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-assetgallery.md) |
| 153 | MWI-COMP-142 | BackgroundPreview | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-background-panel-backgroundpreview.md) |
| 154 | MWI-COMP-165 | BuffGrid | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-buffgrid.md) |
| 155 | MWI-COMP-054 | CalendarDayCell | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-calendardaycell.md) |
| 156 | MWI-COMP-053 | CalendarWeek | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-calendarweek.md) |
| 157 | MWI-COMP-169 | CandyFamilyPanel | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-candyfamilypanel.md) |
| 158 | MWI-COMP-102 | ChallengeCard | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-challengecard.md) |
| 159 | MWI-COMP-149 | CollectionStatCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-collections-panel-collectionstatcard.md) |
| 160 | MWI-COMP-027 | ColorValue | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-color-lab-colorvalue.md) |
| 161 | MWI-COMP-031 | DailyCodePost | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-dailycodepost.md) |
| 162 | MWI-COMP-159 | DataGrid | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-datagrid.md) |
| 163 | MWI-COMP-076 | DayView | Form internal | 18 | 1 | [open](../components/components-admin-forms-calendar-planner-dayview.md) |
| 164 | MWI-COMP-072 | DetailList | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-detaillist.md) |
| 165 | MWI-COMP-171 | DetailNavigation | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-detailnavigation.md) |
| 166 | MWI-COMP-090 | DocumentPreview | Form internal | 18 | 1 | [open](../components/components-admin-forms-writer-studio-documentpreview.md) |
| 167 | MWI-COMP-181 | EggCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-eggs-panel-eggcard.md) |
| 168 | MWI-COMP-179 | EggPill | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-eggs-panel-eggpill.md) |
| 169 | MWI-COMP-182 | EggSection | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-eggs-panel-eggsection.md) |
| 170 | MWI-COMP-244 | EndpointBars | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-database-stats-endpointbars.md) |
| 171 | MWI-COMP-062 | EventBadge | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventbadge.md) |
| 172 | MWI-COMP-064 | EventDetailModal | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventdetailmodal.md) |
| 173 | MWI-COMP-057 | EventGroup | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventgroup.md) |
| 174 | MWI-COMP-077 | EventList | Form internal | 18 | 1 | [open](../components/components-admin-forms-calendar-planner-eventlist.md) |
| 175 | MWI-COMP-066 | EventPokemonGroups | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventpokemongroups.md) |
| 176 | MWI-COMP-060 | EventRow | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventrow.md) |
| 177 | MWI-COMP-068 | EventScrapedSectionGroup | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-eventscrapedsectiongroup.md) |
| 178 | MWI-COMP-170 | EvolutionPanel | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-evolutionpanel.md) |
| 179 | MWI-COMP-100 | ExerciseCard | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-exercisecard.md) |
| 180 | MWI-COMP-039 | ExternalButton | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-externalbutton.md) |
| 181 | MWI-COMP-047 | Field | Events internal | 18 | 1 | [open](../components/components-admin-events-event-editor-modal-field.md) |
| 182 | MWI-COMP-205 | FormatSelect | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-formatselect.md) |
| 183 | MWI-COMP-036 | GenerationBars | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-generationbars.md) |
| 184 | MWI-COMP-114 | Info | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-info.md) |
| 185 | MWI-COMP-065 | InfoPill | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-infopill.md) |
| 186 | MWI-COMP-174 | IssuesPanel | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-issuespanel.md) |
| 187 | MWI-COMP-214 | ItemReward | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-itemreward.md) |
| 188 | MWI-COMP-176 | JsonBlock | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-jsonblock.md) |
| 189 | MWI-COMP-037 | KanbanBars | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-kanbanbars.md) |
| 190 | MWI-COMP-083 | KanbanColumn | Form internal | 18 | 1 | [open](../components/components-admin-forms-kanban-board-kanbancolumn.md) |
| 191 | MWI-COMP-084 | KanbanTaskCard | Form internal | 18 | 1 | [open](../components/components-admin-forms-kanban-board-kanbantaskcard.md) |
| 192 | MWI-COMP-085 | KanbanTaskPreview | Form internal | 18 | 1 | [open](../components/components-admin-forms-kanban-board-kanbantaskpreview.md) |
| 193 | MWI-COMP-107 | LearningMarkdown | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-learningmarkdown.md) |
| 194 | MWI-COMP-247 | LevelProgressGrid | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-learning-analytics-levelprogressgrid.md) |
| 195 | MWI-COMP-033 | LiveStat | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-livestat.md) |
| 196 | MWI-COMP-125 | LoadMoreButton | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-admin-app-loadmorebutton.md) |
| 197 | MWI-COMP-200 | MarkdownBlocks | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-docs-viewer-markdownblocks.md) |
| 198 | MWI-COMP-202 | MatchupCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-matchupcard.md) |
| 199 | MWI-COMP-187 | MaxBattleCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlecard.md) |
| 200 | MWI-COMP-188 | MaxBattleSection | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlesection.md) |
| 201 | MWI-COMP-186 | MaxPill | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-max-battles-panel-maxpill.md) |
| 202 | MWI-COMP-151 | Metric | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-current-dataset-diagnostics-metric.md) |
| 203 | MWI-COMP-249 | Metric | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-learning-analytics-metric.md) |
| 204 | MWI-COMP-251 | Metric | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-pokemon-analytics-metric.md) |
| 205 | MWI-COMP-197 | MiniInfo | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-card-miniinfo.md) |
| 206 | MWI-COMP-035 | MiniMetric | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-minimetric.md) |
| 207 | MWI-COMP-075 | MiniMonth | Form internal | 18 | 1 | [open](../components/components-admin-forms-calendar-planner-minimonth.md) |
| 208 | MWI-COMP-245 | MiniRow | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-database-stats-minirow.md) |
| 209 | MWI-COMP-042 | MiniStat | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-pomodoro-ministat.md) |
| 210 | MWI-COMP-194 | MiniStatus | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-api-status-ministatus.md) |
| 211 | MWI-COMP-074 | MonthGrid | Form internal | 18 | 1 | [open](../components/components-admin-forms-calendar-planner-monthgrid.md) |
| 212 | MWI-COMP-201 | MoveBadge | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-movebadge.md) |
| 213 | MWI-COMP-167 | MoveList | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-movelist.md) |
| 214 | MWI-COMP-164 | MoveTypePill | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-movetypepill.md) |
| 215 | MWI-COMP-055 | MultiDaySegment | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-multidaysegment.md) |
| 216 | MWI-COMP-203 | PerformanceBars | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-performancebars.md) |
| 217 | MWI-COMP-228 | Podium | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-shiny-tracker-panel-podium.md) |
| 218 | MWI-COMP-213 | PokemonReward | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-pokemonreward.md) |
| 219 | MWI-COMP-091 | PreviewLine | Form internal | 18 | 1 | [open](../components/components-admin-forms-writer-studio-previewline.md) |
| 220 | MWI-COMP-103 | ProjectCard | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-projectcard.md) |
| 221 | MWI-COMP-101 | PseudocodeCard | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-pseudocodecard.md) |
| 222 | MWI-COMP-204 | PvpDetail | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pvp-rankings-panel-pvpdetail.md) |
| 223 | MWI-COMP-175 | PvpPanel | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-pvppanel.md) |
| 224 | MWI-COMP-208 | RaidCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-raids-panel-raidcard.md) |
| 225 | MWI-COMP-207 | RaidPill | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-raids-panel-raidpill.md) |
| 226 | MWI-COMP-209 | RaidSection | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-raids-panel-raidsection.md) |
| 227 | MWI-COMP-180 | Rarity | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-eggs-panel-rarity.md) |
| 228 | MWI-COMP-071 | RawEventInfo | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-raweventinfo.md) |
| 229 | MWI-COMP-166 | ReleaseStatusGrid | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-releasestatusgrid.md) |
| 230 | MWI-COMP-217 | ResearchSection | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-researchsection.md) |
| 231 | MWI-COMP-216 | ResearchTask | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-researchtask.md) |
| 232 | MWI-COMP-215 | RewardCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-rewardcard.md) |
| 233 | MWI-COMP-163 | RewardValue | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-rewardvalue.md) |
| 234 | MWI-COMP-126 | RulesPanel | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-admin-app-rulespanel.md) |
| 235 | MWI-COMP-069 | ScrapedSectionCard | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-scrapedsectioncard.md) |
| 236 | MWI-COMP-128 | SectionIcon | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-admin-section-navigation-sectionicon.md) |
| 237 | MWI-COMP-048 | SelectField | Events internal | 18 | 1 | [open](../components/components-admin-events-event-editor-modal-selectfield.md) |
| 238 | MWI-COMP-227 | ShinyDetail | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-shiny-tracker-panel-shinydetail.md) |
| 239 | MWI-COMP-034 | SignalRow | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-signalrow.md) |
| 240 | MWI-COMP-056 | SingleDayEvent | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-singledayevent.md) |
| 241 | MWI-COMP-222 | SlotBlock | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-rocket-panel-slotblock.md) |
| 242 | MWI-COMP-044 | SnippetModal | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-snippet-vault-snippetmodal.md) |
| 243 | MWI-COMP-233 | SourceStat | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-source-watch-panel-sourcestat.md) |
| 244 | MWI-COMP-080 | Stat | Form internal | 18 | 1 | [open](../components/components-admin-forms-javascript-exercises-stat.md) |
| 245 | MWI-COMP-242 | StatCard | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-database-stats-statcard.md) |
| 246 | MWI-COMP-052 | StatTile | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-stattile.md) |
| 247 | MWI-COMP-248 | StatusChart | Analytics internal | 18 | 1 | [open](../components/components-admin-stats-learning-analytics-statuschart.md) |
| 248 | MWI-COMP-220 | StatusIcons | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-rocket-panel-statusicons.md) |
| 249 | MWI-COMP-192 | StatusLine | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-api-explorer-statusline.md) |
| 250 | MWI-COMP-116 | Strategy | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-import-modal-strategy.md) |
| 251 | MWI-COMP-099 | TheoryCard | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-theorycard.md) |
| 252 | MWI-COMP-106 | TheorySections | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-theorysections.md) |
| 253 | MWI-COMP-059 | TimelineCard | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-timelinecard.md) |
| 254 | MWI-COMP-058 | TimelineSection | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-timelinesection.md) |
| 255 | MWI-COMP-089 | ToolbarButton | Form internal | 18 | 1 | [open](../components/components-admin-forms-writer-studio-toolbarbutton.md) |
| 256 | MWI-COMP-029 | ToolHeader | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-daily-tools-toolheader.md) |
| 257 | MWI-COMP-120 | TopicMetric | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-topic-card-topicmetric.md) |
| 258 | MWI-COMP-223 | TrainerCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-rocket-panel-trainercard.md) |
| 259 | MWI-COMP-160 | TranslationGrid | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-translationgrid.md) |
| 260 | MWI-COMP-195 | TypeBadge | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-card-typebadge.md) |
| 261 | MWI-COMP-158 | TypeBadgeList | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-detail-modal-typebadgelist.md) |
| 262 | MWI-COMP-146 | TypeCatalogCard | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-catalog-panel-typecatalogcard.md) |
| 263 | MWI-COMP-145 | TypeChip | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-catalog-panel-typechip.md) |
| 264 | MWI-COMP-211 | TypeIcons | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-research-panel-typeicons.md) |
| 265 | MWI-COMP-061 | TypePills | Events internal | 18 | 1 | [open](../components/components-admin-events-events-calendar-panel-typepills.md) |
| 266 | MWI-COMP-108 | UnitSection | Learning internal | 18 | 1 | [open](../components/components-admin-learning-learning-detail-modal-unitsection.md) |
| 267 | MWI-COMP-196 | WeatherBadge | Pokémon internal | 18 | 1 | [open](../components/components-admin-pokemon-pokemon-card-weatherbadge.md) |
| 268 | MWI-COMP-032 | WidgetContent | Dashboard internal | 18 | 1 | [open](../components/components-admin-dashboard-dashboard-home-live-widgetcontent.md) |
| 269 | MWI-COMP-184 | EventsCalendarPanel | Compatibility facade | 11 | 1 | [open](../components/components-admin-pokemon-events-calendar-panel-eventscalendarpanel.md) |
| 270 | MWI-COMP-289 | AdminApp | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-app-adminapp.md) |
| 271 | MWI-COMP-262 | AppFrame | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-app-frame-appframe.md) |
| 272 | MWI-COMP-290 | AssetStatCard | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-assetstatcard.md) |
| 273 | MWI-COMP-291 | BarList | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-barlist.md) |
| 274 | MWI-COMP-263 | CalendarPlanner | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-calendar-planner-calendarplanner.md) |
| 275 | MWI-COMP-301 | CandyPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-candy-panel-candypanel.md) |
| 276 | MWI-COMP-302 | CatalogPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-catalog-panel-catalogpanel.md) |
| 277 | MWI-COMP-303 | CollectionsPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-collections-panel-collectionspanel.md) |
| 278 | MWI-COMP-264 | ColorLab | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-color-lab-colorlab.md) |
| 279 | MWI-COMP-292 | CompletionList | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-completionlist.md) |
| 280 | MWI-COMP-293 | ControlCardsPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-controlcardspanel.md) |
| 281 | MWI-COMP-265 | DailyTools | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-daily-tools-dailytools.md) |
| 282 | MWI-COMP-266 | DashboardBacklog | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-dashboard-backlog-dashboardbacklog.md) |
| 283 | MWI-COMP-267 | DashboardCharts | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-dashboard-charts-dashboardcharts.md) |
| 284 | MWI-COMP-268 | DashboardFooter | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-dashboard-footer-dashboardfooter.md) |
| 285 | MWI-COMP-269 | DashboardHomeLive | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-dashboard-home-live-dashboardhomelive.md) |
| 286 | MWI-COMP-275 | DashboardLoadingState | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-loading-state-dashboardloadingstate.md) |
| 287 | MWI-COMP-270 | DatabaseStats | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-database-stats-databasestats.md) |
| 288 | MWI-COMP-312 | DataDeployHistoryModal | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-source-watch-panel-datadeployhistorymodal.md) |
| 289 | MWI-COMP-260 | DetailModal | Compatibility facade | 8 | 0 | [open](../components/components-checklist-detail-modal-detailmodal.md) |
| 290 | MWI-COMP-304 | EggsPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-eggs-panel-eggspanel.md) |
| 291 | MWI-COMP-305 | EventsCalendarPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-events-calendar-panel-eventscalendarpanel.md) |
| 292 | MWI-COMP-294 | GenerationFilterBar | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-generationfilterbar.md) |
| 293 | MWI-COMP-295 | HistoryList | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-historylist.md) |
| 294 | MWI-COMP-271 | JavaScriptExercises | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-javascript-exercises-javascriptexercises.md) |
| 295 | MWI-COMP-296 | JsonIssueList | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-jsonissuelist.md) |
| 296 | MWI-COMP-272 | JsProgress | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-js-progress-jsprogress.md) |
| 297 | MWI-COMP-273 | KanbanBoard | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-kanban-board-kanbanboard.md) |
| 298 | MWI-COMP-274 | LearningAnalytics | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-learning-analytics-learninganalytics.md) |
| 299 | MWI-COMP-306 | LoginCard | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-login-card-logincard.md) |
| 300 | MWI-COMP-307 | MaxBattlesPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-max-battles-panel-maxbattlespanel.md) |
| 301 | MWI-COMP-297 | MiniCardList | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-minicardlist.md) |
| 302 | MWI-COMP-276 | NotesBoard | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-notes-board-notesboard.md) |
| 303 | MWI-COMP-298 | Panel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-admin-ui-panel.md) |
| 304 | MWI-COMP-308 | PokemonAdminStudio | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-pokemon-admin-studio-pokemonadminstudio.md) |
| 305 | MWI-COMP-277 | PokemonAnalytics | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pokemon-analytics-pokemonanalytics.md) |
| 306 | MWI-COMP-278 | PokemonApiExplorer | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pokemon-api-explorer-pokemonapiexplorer.md) |
| 307 | MWI-COMP-279 | PokemonApiStatus | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pokemon-api-status-pokemonapistatus.md) |
| 308 | MWI-COMP-261 | PokemonCard | Compatibility facade | 8 | 0 | [open](../components/components-checklist-pokemon-card-pokemoncard.md) |
| 309 | MWI-COMP-280 | PokemonDocsViewer | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pokemon-docs-viewer-pokemondocsviewer.md) |
| 310 | MWI-COMP-281 | PokemonWidget | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pokemon-widget-pokemonwidget.md) |
| 311 | MWI-COMP-282 | Pomodoro | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-pomodoro-pomodoro.md) |
| 312 | MWI-COMP-283 | Providers | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-providers-providers.md) |
| 313 | MWI-COMP-309 | RaidsPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-raids-panel-raidspanel.md) |
| 314 | MWI-COMP-310 | ResearchPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-research-panel-researchpanel.md) |
| 315 | MWI-COMP-311 | RocketPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-rocket-panel-rocketpanel.md) |
| 316 | MWI-COMP-284 | SnippetVault | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-snippet-vault-snippetvault.md) |
| 317 | MWI-COMP-285 | SortableWidgetGrid | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-sortable-widget-grid-sortablewidgetgrid.md) |
| 318 | MWI-COMP-313 | SourceHistoryModal | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-source-watch-panel-sourcehistorymodal.md) |
| 319 | MWI-COMP-314 | SourceRows | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-source-watch-panel-sourcerows.md) |
| 320 | MWI-COMP-286 | StatCard | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-stat-card-statcard.md) |
| 321 | MWI-COMP-287 | TodoList | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-todo-list-todolist.md) |
| 322 | MWI-COMP-299 | TypeIcons | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-asset-icons-typeicons.md) |
| 323 | MWI-COMP-315 | UpdateLogPanel | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-update-log-panel-updatelogpanel.md) |
| 324 | MWI-COMP-300 | WeatherIcons | Compatibility facade | 8 | 0 | [open](../components/components-pokemon-admin-asset-icons-weathericons.md) |
| 325 | MWI-COMP-288 | WriterStudio | Compatibility facade | 8 | 0 | [open](../components/components-dashboard-writer-studio-writerstudio.md) |

The score is Estimated from implementation and is a reconstruction ordering aid, not a recommendation to redesign.

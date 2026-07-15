# Component hierarchy and dependency graph

## Full adjacency matrix

| ID | Name | Parents | Children | Specification |
|---|---|---|---|---|
| MWI-COMP-001 | AccountPage | Not found | MWI-COMP-317, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/app-dashboard-account-page-accountpage.md) |
| MWI-COMP-002 | AnalyticsPage | Not found | MWI-COMP-246 | [open](../components/app-dashboard-analytics-page-analyticspage.md) |
| MWI-COMP-003 | CalendarPage | Not found | MWI-COMP-073 | [open](../components/app-dashboard-calendar-page-calendarpage.md) |
| MWI-COMP-004 | DatabasePage | Not found | MWI-COMP-241 | [open](../components/app-dashboard-database-page-databasepage.md) |
| MWI-COMP-005 | JavaScriptExercisesPage | Not found | MWI-COMP-079 | [open](../components/app-dashboard-exercices-javascript-page-javascriptexercisespage.md) |
| MWI-COMP-006 | JsProgressPage | Not found | MWI-COMP-081 | [open](../components/app-dashboard-js-progress-page-jsprogresspage.md) |
| MWI-COMP-007 | KanbanPage | Not found | MWI-COMP-082 | [open](../components/app-dashboard-kanban-page-kanbanpage.md) |
| MWI-COMP-008 | DashboardLayout | Not found | MWI-COMP-092 | [open](../components/app-dashboard-layout-dashboardlayout.md) |
| MWI-COMP-009 | NotesPage | Not found | MWI-COMP-086 | [open](../components/app-dashboard-notes-page-notespage.md) |
| MWI-COMP-010 | DashboardHome | Not found | MWI-COMP-030 | [open](../components/app-dashboard-page-dashboardhome.md) |
| MWI-COMP-011 | PalettePage | Not found | MWI-COMP-026 | [open](../components/app-dashboard-palette-page-palettepage.md) |
| MWI-COMP-012 | PokemonAdminPage | Not found | MWI-COMP-190 | [open](../components/app-dashboard-pokemon-admin-page-pokemonadminpage.md) |
| MWI-COMP-013 | PokemonDocsPage | Not found | MWI-COMP-191, MWI-COMP-193, MWI-COMP-199 | [open](../components/app-dashboard-pokemon-docs-page-pokemondocspage.md) |
| MWI-COMP-014 | PomodoroPage | Not found | MWI-COMP-041 | [open](../components/app-dashboard-pomodoro-page-pomodoropage.md) |
| MWI-COMP-015 | ProjectsPage | Not found | MWI-COMP-237, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324, MWI-COMP-325 | [open](../components/app-dashboard-projects-page-projectspage.md) |
| MWI-COMP-016 | SnippetsPage | Not found | MWI-COMP-043 | [open](../components/app-dashboard-snippets-page-snippetspage.md) |
| MWI-COMP-017 | TodoPage | Not found | MWI-COMP-087 | [open](../components/app-dashboard-todo-page-todopage.md) |
| MWI-COMP-018 | DashboardBacklogPage | Not found | MWI-COMP-252 | [open](../components/app-dashboard-tools-dashboard-backlog-page-dashboardbacklogpage.md) |
| MWI-COMP-019 | ToolsPage | Not found | MWI-COMP-028 | [open](../components/app-dashboard-tools-page-toolspage.md) |
| MWI-COMP-020 | WriterPage | Not found | MWI-COMP-088 | [open](../components/app-dashboard-writer-page-writerpage.md) |
| MWI-COMP-021 | RootLayout | Not found | MWI-COMP-093 | [open](../components/app-layout-rootlayout.md) |
| MWI-COMP-022 | LoginPage | Not found | MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323 | [open](../components/app-login-page-loginpage.md) |
| MWI-COMP-023 | PokemonWidget | MWI-COMP-281 | MWI-COMP-024, MWI-COMP-317, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-cards-pokemon-widget-pokemonwidget.md) |
| MWI-COMP-024 | Metric | MWI-COMP-023 | Not found | [open](../components/components-admin-cards-pokemon-widget-metric.md) |
| MWI-COMP-025 | StatCard | MWI-COMP-286 | MWI-COMP-319 | [open](../components/components-admin-cards-stat-card-statcard.md) |
| MWI-COMP-026 | ColorLab | MWI-COMP-011, MWI-COMP-264 | MWI-COMP-027, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323 | [open](../components/components-admin-dashboard-color-lab-colorlab.md) |
| MWI-COMP-027 | ColorValue | MWI-COMP-026 | Not found | [open](../components/components-admin-dashboard-color-lab-colorvalue.md) |
| MWI-COMP-028 | DailyTools | MWI-COMP-019, MWI-COMP-265 | MWI-COMP-029, MWI-COMP-238, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324 | [open](../components/components-admin-dashboard-daily-tools-dailytools.md) |
| MWI-COMP-029 | ToolHeader | MWI-COMP-028 | Not found | [open](../components/components-admin-dashboard-daily-tools-toolheader.md) |
| MWI-COMP-030 | DashboardHomeLive | MWI-COMP-010, MWI-COMP-269 | MWI-COMP-031, MWI-COMP-032, MWI-COMP-033, MWI-COMP-034, MWI-COMP-035, MWI-COMP-036, MWI-COMP-037, MWI-COMP-038, MWI-COMP-039, MWI-COMP-040, MWI-COMP-193, MWI-COMP-238, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319 | [open](../components/components-admin-dashboard-dashboard-home-live-dashboardhomelive.md) |
| MWI-COMP-031 | DailyCodePost | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-dailycodepost.md) |
| MWI-COMP-032 | WidgetContent | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-widgetcontent.md) |
| MWI-COMP-033 | LiveStat | MWI-COMP-030 | MWI-COMP-319 | [open](../components/components-admin-dashboard-dashboard-home-live-livestat.md) |
| MWI-COMP-034 | SignalRow | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-signalrow.md) |
| MWI-COMP-035 | MiniMetric | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-minimetric.md) |
| MWI-COMP-036 | GenerationBars | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-generationbars.md) |
| MWI-COMP-037 | KanbanBars | MWI-COMP-030 | MWI-COMP-040 | [open](../components/components-admin-dashboard-dashboard-home-live-kanbanbars.md) |
| MWI-COMP-038 | ActionLink | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-actionlink.md) |
| MWI-COMP-039 | ExternalButton | MWI-COMP-030 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-externalbutton.md) |
| MWI-COMP-040 | EmptyLine | MWI-COMP-030, MWI-COMP-037 | Not found | [open](../components/components-admin-dashboard-dashboard-home-live-emptyline.md) |
| MWI-COMP-041 | Pomodoro | MWI-COMP-014, MWI-COMP-282 | MWI-COMP-042, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-dashboard-pomodoro-pomodoro.md) |
| MWI-COMP-042 | MiniStat | MWI-COMP-041 | Not found | [open](../components/components-admin-dashboard-pomodoro-ministat.md) |
| MWI-COMP-043 | SnippetVault | MWI-COMP-016, MWI-COMP-284 | MWI-COMP-044, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323 | [open](../components/components-admin-dashboard-snippet-vault-snippetvault.md) |
| MWI-COMP-044 | SnippetModal | MWI-COMP-043 | MWI-COMP-318, MWI-COMP-323, MWI-COMP-324, MWI-COMP-325 | [open](../components/components-admin-dashboard-snippet-vault-snippetmodal.md) |
| MWI-COMP-045 | EventEditorModal | MWI-COMP-051 | MWI-COMP-047, MWI-COMP-048, MWI-COMP-049 | [open](../components/components-admin-events-event-editor-modal-eventeditormodal.md) |
| MWI-COMP-046 | ImportModal | MWI-COMP-051 | Not found | [open](../components/components-admin-events-event-editor-modal-importmodal.md) |
| MWI-COMP-047 | Field | MWI-COMP-045 | Not found | [open](../components/components-admin-events-event-editor-modal-field.md) |
| MWI-COMP-048 | SelectField | MWI-COMP-045 | Not found | [open](../components/components-admin-events-event-editor-modal-selectfield.md) |
| MWI-COMP-049 | Area | MWI-COMP-045 | Not found | [open](../components/components-admin-events-event-editor-modal-area.md) |
| MWI-COMP-050 | EventBannerImage | MWI-COMP-059, MWI-COMP-064, MWI-COMP-069 | Not found | [open](../components/components-admin-events-events-calendar-panel-eventbannerimage.md) |
| MWI-COMP-051 | EventsCalendarPanel | MWI-COMP-184, MWI-COMP-305 | MWI-COMP-045, MWI-COMP-046, MWI-COMP-052, MWI-COMP-053, MWI-COMP-057, MWI-COMP-058, MWI-COMP-064, MWI-COMP-131, MWI-COMP-155 | [open](../components/components-admin-events-events-calendar-panel-eventscalendarpanel.md) |
| MWI-COMP-052 | StatTile | MWI-COMP-051 | Not found | [open](../components/components-admin-events-events-calendar-panel-stattile.md) |
| MWI-COMP-053 | CalendarWeek | MWI-COMP-051 | MWI-COMP-054, MWI-COMP-055 | [open](../components/components-admin-events-events-calendar-panel-calendarweek.md) |
| MWI-COMP-054 | CalendarDayCell | MWI-COMP-053 | MWI-COMP-056 | [open](../components/components-admin-events-events-calendar-panel-calendardaycell.md) |
| MWI-COMP-055 | MultiDaySegment | MWI-COMP-053 | Not found | [open](../components/components-admin-events-events-calendar-panel-multidaysegment.md) |
| MWI-COMP-056 | SingleDayEvent | MWI-COMP-054 | Not found | [open](../components/components-admin-events-events-calendar-panel-singledayevent.md) |
| MWI-COMP-057 | EventGroup | MWI-COMP-051 | MWI-COMP-060 | [open](../components/components-admin-events-events-calendar-panel-eventgroup.md) |
| MWI-COMP-058 | TimelineSection | MWI-COMP-051 | MWI-COMP-059 | [open](../components/components-admin-events-events-calendar-panel-timelinesection.md) |
| MWI-COMP-059 | TimelineCard | MWI-COMP-058 | MWI-COMP-050 | [open](../components/components-admin-events-events-calendar-panel-timelinecard.md) |
| MWI-COMP-060 | EventRow | MWI-COMP-057 | Not found | [open](../components/components-admin-events-events-calendar-panel-eventrow.md) |
| MWI-COMP-061 | TypePills | MWI-COMP-067 | Not found | [open](../components/components-admin-events-events-calendar-panel-typepills.md) |
| MWI-COMP-062 | EventBadge | MWI-COMP-064 | Not found | [open](../components/components-admin-events-events-calendar-panel-eventbadge.md) |
| MWI-COMP-063 | DetailSection | MWI-COMP-064, MWI-COMP-066, MWI-COMP-068, MWI-COMP-070, MWI-COMP-071, MWI-COMP-072 | Not found | [open](../components/components-admin-events-events-calendar-panel-detailsection.md) |
| MWI-COMP-064 | EventDetailModal | MWI-COMP-051 | MWI-COMP-050, MWI-COMP-062, MWI-COMP-063, MWI-COMP-066, MWI-COMP-068, MWI-COMP-070, MWI-COMP-071, MWI-COMP-072 | [open](../components/components-admin-events-events-calendar-panel-eventdetailmodal.md) |
| MWI-COMP-065 | InfoPill | MWI-COMP-071 | Not found | [open](../components/components-admin-events-events-calendar-panel-infopill.md) |
| MWI-COMP-066 | EventPokemonGroups | MWI-COMP-064 | MWI-COMP-063, MWI-COMP-067 | [open](../components/components-admin-events-events-calendar-panel-eventpokemongroups.md) |
| MWI-COMP-067 | PokemonCardGrid | MWI-COMP-066, MWI-COMP-069 | MWI-COMP-061 | [open](../components/components-admin-events-events-calendar-panel-pokemoncardgrid.md) |
| MWI-COMP-068 | EventScrapedSectionGroup | MWI-COMP-064 | MWI-COMP-063, MWI-COMP-069 | [open](../components/components-admin-events-events-calendar-panel-eventscrapedsectiongroup.md) |
| MWI-COMP-069 | ScrapedSectionCard | MWI-COMP-068 | MWI-COMP-050, MWI-COMP-067, MWI-COMP-070 | [open](../components/components-admin-events-events-calendar-panel-scrapedsectioncard.md) |
| MWI-COMP-070 | RewardGrid | MWI-COMP-064, MWI-COMP-069 | MWI-COMP-063 | [open](../components/components-admin-events-events-calendar-panel-rewardgrid.md) |
| MWI-COMP-071 | RawEventInfo | MWI-COMP-064 | MWI-COMP-063, MWI-COMP-065 | [open](../components/components-admin-events-events-calendar-panel-raweventinfo.md) |
| MWI-COMP-072 | DetailList | MWI-COMP-064 | MWI-COMP-063 | [open](../components/components-admin-events-events-calendar-panel-detaillist.md) |
| MWI-COMP-073 | CalendarPlanner | MWI-COMP-003, MWI-COMP-263 | MWI-COMP-074, MWI-COMP-075, MWI-COMP-076, MWI-COMP-077, MWI-COMP-078, MWI-COMP-237, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324, MWI-COMP-325 | [open](../components/components-admin-forms-calendar-planner-calendarplanner.md) |
| MWI-COMP-074 | MonthGrid | MWI-COMP-073 | Not found | [open](../components/components-admin-forms-calendar-planner-monthgrid.md) |
| MWI-COMP-075 | MiniMonth | MWI-COMP-073 | Not found | [open](../components/components-admin-forms-calendar-planner-minimonth.md) |
| MWI-COMP-076 | DayView | MWI-COMP-073 | Not found | [open](../components/components-admin-forms-calendar-planner-dayview.md) |
| MWI-COMP-077 | EventList | MWI-COMP-073 | MWI-COMP-078, MWI-COMP-317, MWI-COMP-319 | [open](../components/components-admin-forms-calendar-planner-eventlist.md) |
| MWI-COMP-078 | EventButton | MWI-COMP-073, MWI-COMP-077 | MWI-COMP-317 | [open](../components/components-admin-forms-calendar-planner-eventbutton.md) |
| MWI-COMP-079 | JavaScriptExercises | MWI-COMP-005, MWI-COMP-271 | MWI-COMP-080, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-forms-javascript-exercises-javascriptexercises.md) |
| MWI-COMP-080 | Stat | MWI-COMP-079 | MWI-COMP-319 | [open](../components/components-admin-forms-javascript-exercises-stat.md) |
| MWI-COMP-081 | JsProgress | MWI-COMP-006, MWI-COMP-272 | MWI-COMP-095, MWI-COMP-096, MWI-COMP-097, MWI-COMP-098, MWI-COMP-115, MWI-COMP-118, MWI-COMP-119, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-forms-js-progress-jsprogress.md) |
| MWI-COMP-082 | KanbanBoard | MWI-COMP-007, MWI-COMP-273 | MWI-COMP-083, MWI-COMP-085, MWI-COMP-237, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324, MWI-COMP-325 | [open](../components/components-admin-forms-kanban-board-kanbanboard.md) |
| MWI-COMP-083 | KanbanColumn | MWI-COMP-082 | MWI-COMP-084, MWI-COMP-317, MWI-COMP-319 | [open](../components/components-admin-forms-kanban-board-kanbancolumn.md) |
| MWI-COMP-084 | KanbanTaskCard | MWI-COMP-083 | Not found | [open](../components/components-admin-forms-kanban-board-kanbantaskcard.md) |
| MWI-COMP-085 | KanbanTaskPreview | MWI-COMP-082 | Not found | [open](../components/components-admin-forms-kanban-board-kanbantaskpreview.md) |
| MWI-COMP-086 | NotesBoard | MWI-COMP-009, MWI-COMP-276 | MWI-COMP-237, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324 | [open](../components/components-admin-forms-notes-board-notesboard.md) |
| MWI-COMP-087 | TodoList | MWI-COMP-017, MWI-COMP-287 | MWI-COMP-237, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323 | [open](../components/components-admin-forms-todo-list-todolist.md) |
| MWI-COMP-088 | WriterStudio | MWI-COMP-020, MWI-COMP-288 | MWI-COMP-089, MWI-COMP-090, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-324 | [open](../components/components-admin-forms-writer-studio-writerstudio.md) |
| MWI-COMP-089 | ToolbarButton | MWI-COMP-088 | MWI-COMP-318 | [open](../components/components-admin-forms-writer-studio-toolbarbutton.md) |
| MWI-COMP-090 | DocumentPreview | MWI-COMP-088 | MWI-COMP-091 | [open](../components/components-admin-forms-writer-studio-documentpreview.md) |
| MWI-COMP-091 | PreviewLine | MWI-COMP-090 | Not found | [open](../components/components-admin-forms-writer-studio-previewline.md) |
| MWI-COMP-092 | AdminAppFrame | MWI-COMP-008, MWI-COMP-262 | MWI-COMP-094, MWI-COMP-122, MWI-COMP-124, MWI-COMP-236 | [open](../components/components-admin-layout-admin-app-frame-adminappframe.md) |
| MWI-COMP-093 | Providers | MWI-COMP-021, MWI-COMP-283 | Not found | [open](../components/components-admin-layout-admin-providers-providers.md) |
| MWI-COMP-094 | AdminVersionHistoryDialog | MWI-COMP-092 | Not found | [open](../components/components-admin-layout-admin-version-history-dialog-adminversionhistorydialog.md) |
| MWI-COMP-095 | LearningAchievementGrid | MWI-COMP-081 | MWI-COMP-117, MWI-COMP-317, MWI-COMP-319 | [open](../components/components-admin-learning-learning-achievement-grid-learningachievementgrid.md) |
| MWI-COMP-096 | LearningActivityTimeline | MWI-COMP-081 | MWI-COMP-319 | [open](../components/components-admin-learning-learning-activity-learningactivitytimeline.md) |
| MWI-COMP-097 | LearningAdvancedStats | MWI-COMP-081 | MWI-COMP-319 | [open](../components/components-admin-learning-learning-advanced-stats-learningadvancedstats.md) |
| MWI-COMP-098 | LearningDetailModal | MWI-COMP-081 | MWI-COMP-099, MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103, MWI-COMP-108, MWI-COMP-114, MWI-COMP-317, MWI-COMP-325 | [open](../components/components-admin-learning-learning-detail-modal-learningdetailmodal.md) |
| MWI-COMP-099 | TheoryCard | MWI-COMP-098 | MWI-COMP-104, MWI-COMP-105, MWI-COMP-106, MWI-COMP-112 | [open](../components/components-admin-learning-learning-detail-modal-theorycard.md) |
| MWI-COMP-100 | ExerciseCard | MWI-COMP-098 | MWI-COMP-104, MWI-COMP-105, MWI-COMP-109, MWI-COMP-110, MWI-COMP-111, MWI-COMP-113 | [open](../components/components-admin-learning-learning-detail-modal-exercisecard.md) |
| MWI-COMP-101 | PseudocodeCard | MWI-COMP-098 | MWI-COMP-104, MWI-COMP-105, MWI-COMP-109, MWI-COMP-110, MWI-COMP-113, MWI-COMP-317, MWI-COMP-318, MWI-COMP-324 | [open](../components/components-admin-learning-learning-detail-modal-pseudocodecard.md) |
| MWI-COMP-102 | ChallengeCard | MWI-COMP-098 | MWI-COMP-104, MWI-COMP-105, MWI-COMP-109, MWI-COMP-110, MWI-COMP-111, MWI-COMP-112, MWI-COMP-113 | [open](../components/components-admin-learning-learning-detail-modal-challengecard.md) |
| MWI-COMP-103 | ProjectCard | MWI-COMP-098 | MWI-COMP-104, MWI-COMP-105, MWI-COMP-109, MWI-COMP-110, MWI-COMP-111, MWI-COMP-112, MWI-COMP-113 | [open](../components/components-admin-learning-learning-detail-modal-projectcard.md) |
| MWI-COMP-104 | CardHeader | MWI-COMP-099, MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103 | MWI-COMP-317 | [open](../components/components-admin-learning-learning-detail-modal-cardheader.md) |
| MWI-COMP-105 | ProgressButton | MWI-COMP-099, MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103 | MWI-COMP-318 | [open](../components/components-admin-learning-learning-detail-modal-progressbutton.md) |
| MWI-COMP-106 | TheorySections | MWI-COMP-099 | MWI-COMP-107, MWI-COMP-112 | [open](../components/components-admin-learning-learning-detail-modal-theorysections.md) |
| MWI-COMP-107 | LearningMarkdown | MWI-COMP-106 | Not found | [open](../components/components-admin-learning-learning-detail-modal-learningmarkdown.md) |
| MWI-COMP-108 | UnitSection | MWI-COMP-098 | Not found | [open](../components/components-admin-learning-learning-detail-modal-unitsection.md) |
| MWI-COMP-109 | UnitCard | MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103 | Not found | [open](../components/components-admin-learning-learning-detail-modal-unitcard.md) |
| MWI-COMP-110 | MetaBlock | MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103 | Not found | [open](../components/components-admin-learning-learning-detail-modal-metablock.md) |
| MWI-COMP-111 | TagRow | MWI-COMP-100, MWI-COMP-102, MWI-COMP-103 | MWI-COMP-317 | [open](../components/components-admin-learning-learning-detail-modal-tagrow.md) |
| MWI-COMP-112 | ListBlock | MWI-COMP-099, MWI-COMP-102, MWI-COMP-103, MWI-COMP-106 | Not found | [open](../components/components-admin-learning-learning-detail-modal-listblock.md) |
| MWI-COMP-113 | Validation | MWI-COMP-100, MWI-COMP-101, MWI-COMP-102, MWI-COMP-103 | Not found | [open](../components/components-admin-learning-learning-detail-modal-validation.md) |
| MWI-COMP-114 | Info | MWI-COMP-098 | Not found | [open](../components/components-admin-learning-learning-detail-modal-info.md) |
| MWI-COMP-115 | LearningImportModal | MWI-COMP-081 | MWI-COMP-116, MWI-COMP-317, MWI-COMP-318, MWI-COMP-325 | [open](../components/components-admin-learning-learning-import-modal-learningimportmodal.md) |
| MWI-COMP-116 | Strategy | MWI-COMP-115 | Not found | [open](../components/components-admin-learning-learning-import-modal-strategy.md) |
| MWI-COMP-117 | LearningProgressBar | MWI-COMP-095, MWI-COMP-118, MWI-COMP-119 | Not found | [open](../components/components-admin-learning-learning-progress-bar-learningprogressbar.md) |
| MWI-COMP-118 | LearningSummary | MWI-COMP-081 | MWI-COMP-117, MWI-COMP-319 | [open](../components/components-admin-learning-learning-summary-learningsummary.md) |
| MWI-COMP-119 | LearningTopicCard | MWI-COMP-081 | MWI-COMP-117, MWI-COMP-120, MWI-COMP-317, MWI-COMP-319 | [open](../components/components-admin-learning-learning-topic-card-learningtopiccard.md) |
| MWI-COMP-120 | TopicMetric | MWI-COMP-119 | Not found | [open](../components/components-admin-learning-learning-topic-card-topicmetric.md) |
| MWI-COMP-121 | AdminPaletteSelector | MWI-COMP-124 | MWI-COMP-318 | [open](../components/components-admin-navigation-admin-palette-selector-adminpaletteselector.md) |
| MWI-COMP-122 | AdminSidebar | MWI-COMP-092 | MWI-COMP-123, MWI-COMP-317, MWI-COMP-318 | [open](../components/components-admin-navigation-admin-sidebar-adminsidebar.md) |
| MWI-COMP-123 | AdminSidebarLink | MWI-COMP-122 | Not found | [open](../components/components-admin-navigation-admin-sidebar-adminsidebarlink.md) |
| MWI-COMP-124 | AdminTopbar | MWI-COMP-092 | MWI-COMP-121, MWI-COMP-318 | [open](../components/components-admin-navigation-admin-topbar-admintopbar.md) |
| MWI-COMP-125 | LoadMoreButton | MWI-COMP-127 | Not found | [open](../components/components-admin-pokemon-admin-app-loadmorebutton.md) |
| MWI-COMP-126 | RulesPanel | MWI-COMP-127 | MWI-COMP-131, MWI-COMP-137, MWI-COMP-139 | [open](../components/components-admin-pokemon-admin-app-rulespanel.md) |
| MWI-COMP-127 | AdminApp | MWI-COMP-190, MWI-COMP-289 | MWI-COMP-125, MWI-COMP-126, MWI-COMP-129, MWI-COMP-130, MWI-COMP-131, MWI-COMP-132, MWI-COMP-133, MWI-COMP-134, MWI-COMP-135, MWI-COMP-136, MWI-COMP-137, MWI-COMP-138, MWI-COMP-143, MWI-COMP-144, MWI-COMP-148, MWI-COMP-150, MWI-COMP-178, MWI-COMP-183, MWI-COMP-184, MWI-COMP-185, MWI-COMP-189, MWI-COMP-198, MWI-COMP-206, MWI-COMP-210, MWI-COMP-218, MWI-COMP-224, MWI-COMP-229, MWI-COMP-230, MWI-COMP-231, MWI-COMP-232, MWI-COMP-235, MWI-COMP-238, MWI-COMP-316 | [open](../components/components-admin-pokemon-admin-app-adminapp.md) |
| MWI-COMP-128 | SectionIcon | MWI-COMP-129 | Not found | [open](../components/components-admin-pokemon-admin-section-navigation-sectionicon.md) |
| MWI-COMP-129 | AdminSectionNavigation | MWI-COMP-127 | MWI-COMP-128 | [open](../components/components-admin-pokemon-admin-section-navigation-adminsectionnavigation.md) |
| MWI-COMP-130 | AdminTodoPanel | MWI-COMP-127 | MWI-COMP-131 | [open](../components/components-admin-pokemon-admin-todo-panel-admintodopanel.md) |
| MWI-COMP-131 | Panel | MWI-COMP-051, MWI-COMP-126, MWI-COMP-127, MWI-COMP-130, MWI-COMP-138, MWI-COMP-143, MWI-COMP-144, MWI-COMP-148, MWI-COMP-183, MWI-COMP-189, MWI-COMP-206, MWI-COMP-210, MWI-COMP-218, MWI-COMP-224, MWI-COMP-229, MWI-COMP-298 | Not found | [open](../components/components-admin-pokemon-admin-ui-panel.md) |
| MWI-COMP-132 | BarList | MWI-COMP-127, MWI-COMP-291 | Not found | [open](../components/components-admin-pokemon-admin-ui-barlist.md) |
| MWI-COMP-133 | AssetStatCard | MWI-COMP-127, MWI-COMP-143, MWI-COMP-183, MWI-COMP-189, MWI-COMP-210, MWI-COMP-218, MWI-COMP-224, MWI-COMP-227, MWI-COMP-229, MWI-COMP-290 | Not found | [open](../components/components-admin-pokemon-admin-ui-assetstatcard.md) |
| MWI-COMP-134 | GenerationFilterBar | MWI-COMP-127, MWI-COMP-294 | Not found | [open](../components/components-admin-pokemon-admin-ui-generationfilterbar.md) |
| MWI-COMP-135 | CompletionList | MWI-COMP-127, MWI-COMP-292 | Not found | [open](../components/components-admin-pokemon-admin-ui-completionlist.md) |
| MWI-COMP-136 | HistoryList | MWI-COMP-127, MWI-COMP-295 | Not found | [open](../components/components-admin-pokemon-admin-ui-historylist.md) |
| MWI-COMP-137 | MiniCardList | MWI-COMP-126, MWI-COMP-127, MWI-COMP-138, MWI-COMP-297 | Not found | [open](../components/components-admin-pokemon-admin-ui-minicardlist.md) |
| MWI-COMP-138 | ControlCardsPanel | MWI-COMP-127, MWI-COMP-293 | MWI-COMP-131, MWI-COMP-137 | [open](../components/components-admin-pokemon-admin-ui-controlcardspanel.md) |
| MWI-COMP-139 | JsonIssueList | MWI-COMP-126, MWI-COMP-296 | Not found | [open](../components/components-admin-pokemon-admin-ui-jsonissuelist.md) |
| MWI-COMP-140 | TypeIcons | MWI-COMP-181, MWI-COMP-187, MWI-COMP-201, MWI-COMP-202, MWI-COMP-204, MWI-COMP-206, MWI-COMP-208, MWI-COMP-227, MWI-COMP-229, MWI-COMP-299 | Not found | [open](../components/components-admin-pokemon-asset-icons-typeicons.md) |
| MWI-COMP-141 | WeatherIcons | MWI-COMP-208, MWI-COMP-300 | Not found | [open](../components/components-admin-pokemon-asset-icons-weathericons.md) |
| MWI-COMP-142 | BackgroundPreview | MWI-COMP-143 | Not found | [open](../components/components-admin-pokemon-background-panel-backgroundpreview.md) |
| MWI-COMP-143 | BackgroundPanel | MWI-COMP-127 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-142, MWI-COMP-325 | [open](../components/components-admin-pokemon-background-panel-backgroundpanel.md) |
| MWI-COMP-144 | CandyPanel | MWI-COMP-127, MWI-COMP-301 | MWI-COMP-131 | [open](../components/components-admin-pokemon-candy-panel-candypanel.md) |
| MWI-COMP-145 | TypeChip | MWI-COMP-146 | Not found | [open](../components/components-admin-pokemon-catalog-panel-typechip.md) |
| MWI-COMP-146 | TypeCatalogCard | MWI-COMP-148 | MWI-COMP-145 | [open](../components/components-admin-pokemon-catalog-panel-typecatalogcard.md) |
| MWI-COMP-147 | AdminMoveCard | MWI-COMP-148 | Not found | [open](../components/components-admin-pokemon-catalog-panel-adminmovecard.md) |
| MWI-COMP-148 | CatalogPanel | MWI-COMP-127, MWI-COMP-302 | MWI-COMP-131, MWI-COMP-146, MWI-COMP-147 | [open](../components/components-admin-pokemon-catalog-panel-catalogpanel.md) |
| MWI-COMP-149 | CollectionStatCard | MWI-COMP-150 | Not found | [open](../components/components-admin-pokemon-collections-panel-collectionstatcard.md) |
| MWI-COMP-150 | CollectionsPanel | MWI-COMP-127, MWI-COMP-303 | MWI-COMP-149 | [open](../components/components-admin-pokemon-collections-panel-collectionspanel.md) |
| MWI-COMP-151 | Metric | MWI-COMP-152 | Not found | [open](../components/components-admin-pokemon-current-dataset-diagnostics-metric.md) |
| MWI-COMP-152 | DatasetSourceHeader | MWI-COMP-155 | MWI-COMP-151 | [open](../components/components-admin-pokemon-current-dataset-diagnostics-datasetsourceheader.md) |
| MWI-COMP-153 | DatasetEventBanner | MWI-COMP-210, MWI-COMP-218 | Not found | [open](../components/components-admin-pokemon-dataset-event-banner-dataseteventbanner.md) |
| MWI-COMP-154 | DatasetFilterBar | MWI-COMP-183, MWI-COMP-189, MWI-COMP-206, MWI-COMP-210, MWI-COMP-218, MWI-COMP-224, MWI-COMP-229 | Not found | [open](../components/components-admin-pokemon-dataset-filter-bar-datasetfilterbar.md) |
| MWI-COMP-155 | DatasetSourceHeader | MWI-COMP-051, MWI-COMP-183, MWI-COMP-189, MWI-COMP-206, MWI-COMP-210, MWI-COMP-218, MWI-COMP-224, MWI-COMP-229 | MWI-COMP-152 | [open](../components/components-admin-pokemon-dataset-source-header-datasetsourceheader.md) |
| MWI-COMP-156 | Section | MWI-COMP-160, MWI-COMP-166, MWI-COMP-167, MWI-COMP-169, MWI-COMP-170, MWI-COMP-172, MWI-COMP-174, MWI-COMP-175, MWI-COMP-177, MWI-COMP-178 | Not found | [open](../components/components-admin-pokemon-detail-modal-section.md) |
| MWI-COMP-157 | TypeBadge | MWI-COMP-158, MWI-COMP-164 | Not found | [open](../components/components-admin-pokemon-detail-modal-typebadge.md) |
| MWI-COMP-158 | TypeBadgeList | MWI-COMP-178 | MWI-COMP-157 | [open](../components/components-admin-pokemon-detail-modal-typebadgelist.md) |
| MWI-COMP-159 | DataGrid | MWI-COMP-178 | Not found | [open](../components/components-admin-pokemon-detail-modal-datagrid.md) |
| MWI-COMP-160 | TranslationGrid | MWI-COMP-178 | MWI-COMP-156 | [open](../components/components-admin-pokemon-detail-modal-translationgrid.md) |
| MWI-COMP-161 | EmptyInline | MWI-COMP-167, MWI-COMP-169, MWI-COMP-170, MWI-COMP-172, MWI-COMP-174, MWI-COMP-178 | Not found | [open](../components/components-admin-pokemon-detail-modal-emptyinline.md) |
| MWI-COMP-162 | CandyAmount | MWI-COMP-163, MWI-COMP-178 | Not found | [open](../components/components-admin-pokemon-detail-modal-candyamount.md) |
| MWI-COMP-163 | RewardValue | MWI-COMP-178 | MWI-COMP-162 | [open](../components/components-admin-pokemon-detail-modal-rewardvalue.md) |
| MWI-COMP-164 | MoveTypePill | MWI-COMP-167 | MWI-COMP-157 | [open](../components/components-admin-pokemon-detail-modal-movetypepill.md) |
| MWI-COMP-165 | BuffGrid | MWI-COMP-167 | Not found | [open](../components/components-admin-pokemon-detail-modal-buffgrid.md) |
| MWI-COMP-166 | ReleaseStatusGrid | MWI-COMP-178 | MWI-COMP-156 | [open](../components/components-admin-pokemon-detail-modal-releasestatusgrid.md) |
| MWI-COMP-167 | MoveList | MWI-COMP-178 | MWI-COMP-156, MWI-COMP-161, MWI-COMP-164, MWI-COMP-165 | [open](../components/components-admin-pokemon-detail-modal-movelist.md) |
| MWI-COMP-168 | PokemonMiniCard | MWI-COMP-169, MWI-COMP-170, MWI-COMP-171 | Not found | [open](../components/components-admin-pokemon-detail-modal-pokemonminicard.md) |
| MWI-COMP-169 | CandyFamilyPanel | MWI-COMP-178 | MWI-COMP-156, MWI-COMP-161, MWI-COMP-168 | [open](../components/components-admin-pokemon-detail-modal-candyfamilypanel.md) |
| MWI-COMP-170 | EvolutionPanel | MWI-COMP-178 | MWI-COMP-156, MWI-COMP-161, MWI-COMP-168 | [open](../components/components-admin-pokemon-detail-modal-evolutionpanel.md) |
| MWI-COMP-171 | DetailNavigation | MWI-COMP-178 | MWI-COMP-168 | [open](../components/components-admin-pokemon-detail-modal-detailnavigation.md) |
| MWI-COMP-172 | AssetGallery | MWI-COMP-178 | MWI-COMP-156, MWI-COMP-161, MWI-COMP-173 | [open](../components/components-admin-pokemon-detail-modal-assetgallery.md) |
| MWI-COMP-173 | AssetBadges | MWI-COMP-172 | Not found | [open](../components/components-admin-pokemon-detail-modal-assetbadges.md) |
| MWI-COMP-174 | IssuesPanel | MWI-COMP-178 | MWI-COMP-156, MWI-COMP-161 | [open](../components/components-admin-pokemon-detail-modal-issuespanel.md) |
| MWI-COMP-175 | PvpPanel | MWI-COMP-178 | MWI-COMP-156 | [open](../components/components-admin-pokemon-detail-modal-pvppanel.md) |
| MWI-COMP-176 | JsonBlock | MWI-COMP-178 | Not found | [open](../components/components-admin-pokemon-detail-modal-jsonblock.md) |
| MWI-COMP-177 | AdminActions | MWI-COMP-178 | MWI-COMP-156 | [open](../components/components-admin-pokemon-detail-modal-adminactions.md) |
| MWI-COMP-178 | DetailModal | MWI-COMP-127, MWI-COMP-260 | MWI-COMP-156, MWI-COMP-158, MWI-COMP-159, MWI-COMP-160, MWI-COMP-161, MWI-COMP-162, MWI-COMP-163, MWI-COMP-166, MWI-COMP-167, MWI-COMP-169, MWI-COMP-170, MWI-COMP-171, MWI-COMP-172, MWI-COMP-174, MWI-COMP-175, MWI-COMP-176, MWI-COMP-177 | [open](../components/components-admin-pokemon-detail-modal-detailmodal.md) |
| MWI-COMP-179 | EggPill | MWI-COMP-181 | Not found | [open](../components/components-admin-pokemon-eggs-panel-eggpill.md) |
| MWI-COMP-180 | Rarity | MWI-COMP-181 | Not found | [open](../components/components-admin-pokemon-eggs-panel-rarity.md) |
| MWI-COMP-181 | EggCard | MWI-COMP-182 | MWI-COMP-140, MWI-COMP-179, MWI-COMP-180 | [open](../components/components-admin-pokemon-eggs-panel-eggcard.md) |
| MWI-COMP-182 | EggSection | MWI-COMP-183 | MWI-COMP-181, MWI-COMP-234 | [open](../components/components-admin-pokemon-eggs-panel-eggsection.md) |
| MWI-COMP-183 | EggsPanel | MWI-COMP-127, MWI-COMP-304 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-154, MWI-COMP-155, MWI-COMP-182 | [open](../components/components-admin-pokemon-eggs-panel-eggspanel.md) |
| MWI-COMP-184 | EventsCalendarPanel | MWI-COMP-127 | MWI-COMP-051 | [open](../components/components-admin-pokemon-events-calendar-panel-eventscalendarpanel.md) |
| MWI-COMP-185 | LoginCard | MWI-COMP-127, MWI-COMP-306 | Not found | [open](../components/components-admin-pokemon-login-card-logincard.md) |
| MWI-COMP-186 | MaxPill | MWI-COMP-187 | Not found | [open](../components/components-admin-pokemon-max-battles-panel-maxpill.md) |
| MWI-COMP-187 | MaxBattleCard | MWI-COMP-188 | MWI-COMP-140, MWI-COMP-186 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlecard.md) |
| MWI-COMP-188 | MaxBattleSection | MWI-COMP-189 | MWI-COMP-187, MWI-COMP-234 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlesection.md) |
| MWI-COMP-189 | MaxBattlesPanel | MWI-COMP-127, MWI-COMP-307 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-154, MWI-COMP-155, MWI-COMP-188 | [open](../components/components-admin-pokemon-max-battles-panel-maxbattlespanel.md) |
| MWI-COMP-190 | PokemonAdminStudio | MWI-COMP-012, MWI-COMP-308 | MWI-COMP-127 | [open](../components/components-admin-pokemon-pokemon-admin-studio-pokemonadminstudio.md) |
| MWI-COMP-191 | PokemonApiExplorer | MWI-COMP-013, MWI-COMP-278 | MWI-COMP-192, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-pokemon-pokemon-api-explorer-pokemonapiexplorer.md) |
| MWI-COMP-192 | StatusLine | MWI-COMP-191 | Not found | [open](../components/components-admin-pokemon-pokemon-api-explorer-statusline.md) |
| MWI-COMP-193 | PokemonApiStatus | MWI-COMP-013, MWI-COMP-030, MWI-COMP-279 | MWI-COMP-194, MWI-COMP-318 | [open](../components/components-admin-pokemon-pokemon-api-status-pokemonapistatus.md) |
| MWI-COMP-194 | MiniStatus | MWI-COMP-193 | Not found | [open](../components/components-admin-pokemon-pokemon-api-status-ministatus.md) |
| MWI-COMP-195 | TypeBadge | MWI-COMP-198 | Not found | [open](../components/components-admin-pokemon-pokemon-card-typebadge.md) |
| MWI-COMP-196 | WeatherBadge | MWI-COMP-198 | Not found | [open](../components/components-admin-pokemon-pokemon-card-weatherbadge.md) |
| MWI-COMP-197 | MiniInfo | MWI-COMP-198 | Not found | [open](../components/components-admin-pokemon-pokemon-card-miniinfo.md) |
| MWI-COMP-198 | PokemonCard | MWI-COMP-127, MWI-COMP-261 | MWI-COMP-195, MWI-COMP-196, MWI-COMP-197 | [open](../components/components-admin-pokemon-pokemon-card-pokemoncard.md) |
| MWI-COMP-199 | PokemonDocsViewer | MWI-COMP-013, MWI-COMP-280 | MWI-COMP-200, MWI-COMP-317, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322, MWI-COMP-323 | [open](../components/components-admin-pokemon-pokemon-docs-viewer-pokemondocsviewer.md) |
| MWI-COMP-200 | MarkdownBlocks | MWI-COMP-199 | Not found | [open](../components/components-admin-pokemon-pokemon-docs-viewer-markdownblocks.md) |
| MWI-COMP-201 | MoveBadge | MWI-COMP-204 | MWI-COMP-140 | [open](../components/components-admin-pokemon-pvp-rankings-panel-movebadge.md) |
| MWI-COMP-202 | MatchupCard | MWI-COMP-204 | MWI-COMP-140 | [open](../components/components-admin-pokemon-pvp-rankings-panel-matchupcard.md) |
| MWI-COMP-203 | PerformanceBars | MWI-COMP-204 | Not found | [open](../components/components-admin-pokemon-pvp-rankings-panel-performancebars.md) |
| MWI-COMP-204 | PvpDetail | MWI-COMP-206 | MWI-COMP-140, MWI-COMP-201, MWI-COMP-202, MWI-COMP-203 | [open](../components/components-admin-pokemon-pvp-rankings-panel-pvpdetail.md) |
| MWI-COMP-205 | FormatSelect | MWI-COMP-206 | Not found | [open](../components/components-admin-pokemon-pvp-rankings-panel-formatselect.md) |
| MWI-COMP-206 | PvpRankingsPanel | MWI-COMP-127 | MWI-COMP-131, MWI-COMP-140, MWI-COMP-154, MWI-COMP-155, MWI-COMP-204, MWI-COMP-205 | [open](../components/components-admin-pokemon-pvp-rankings-panel-pvprankingspanel.md) |
| MWI-COMP-207 | RaidPill | MWI-COMP-208 | Not found | [open](../components/components-admin-pokemon-raids-panel-raidpill.md) |
| MWI-COMP-208 | RaidCard | MWI-COMP-209 | MWI-COMP-140, MWI-COMP-141, MWI-COMP-207 | [open](../components/components-admin-pokemon-raids-panel-raidcard.md) |
| MWI-COMP-209 | RaidSection | MWI-COMP-210 | MWI-COMP-208, MWI-COMP-234 | [open](../components/components-admin-pokemon-raids-panel-raidsection.md) |
| MWI-COMP-210 | RaidsPanel | MWI-COMP-127, MWI-COMP-309 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-153, MWI-COMP-154, MWI-COMP-155, MWI-COMP-209 | [open](../components/components-admin-pokemon-raids-panel-raidspanel.md) |
| MWI-COMP-211 | TypeIcons | MWI-COMP-213 | Not found | [open](../components/components-admin-pokemon-research-panel-typeicons.md) |
| MWI-COMP-212 | Badge | MWI-COMP-213, MWI-COMP-214, MWI-COMP-216 | Not found | [open](../components/components-admin-pokemon-research-panel-badge.md) |
| MWI-COMP-213 | PokemonReward | MWI-COMP-215 | MWI-COMP-211, MWI-COMP-212 | [open](../components/components-admin-pokemon-research-panel-pokemonreward.md) |
| MWI-COMP-214 | ItemReward | MWI-COMP-215 | MWI-COMP-212 | [open](../components/components-admin-pokemon-research-panel-itemreward.md) |
| MWI-COMP-215 | RewardCard | MWI-COMP-216 | MWI-COMP-213, MWI-COMP-214 | [open](../components/components-admin-pokemon-research-panel-rewardcard.md) |
| MWI-COMP-216 | ResearchTask | MWI-COMP-217 | MWI-COMP-212, MWI-COMP-215 | [open](../components/components-admin-pokemon-research-panel-researchtask.md) |
| MWI-COMP-217 | ResearchSection | MWI-COMP-218 | MWI-COMP-216 | [open](../components/components-admin-pokemon-research-panel-researchsection.md) |
| MWI-COMP-218 | ResearchPanel | MWI-COMP-127, MWI-COMP-310 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-153, MWI-COMP-154, MWI-COMP-155, MWI-COMP-217 | [open](../components/components-admin-pokemon-research-panel-researchpanel.md) |
| MWI-COMP-219 | TypeIcons | MWI-COMP-221, MWI-COMP-223 | Not found | [open](../components/components-admin-pokemon-rocket-panel-typeicons.md) |
| MWI-COMP-220 | StatusIcons | MWI-COMP-221 | Not found | [open](../components/components-admin-pokemon-rocket-panel-statusicons.md) |
| MWI-COMP-221 | PokemonCard | MWI-COMP-222, MWI-COMP-223 | MWI-COMP-219, MWI-COMP-220 | [open](../components/components-admin-pokemon-rocket-panel-pokemoncard.md) |
| MWI-COMP-222 | SlotBlock | MWI-COMP-223 | MWI-COMP-221 | [open](../components/components-admin-pokemon-rocket-panel-slotblock.md) |
| MWI-COMP-223 | TrainerCard | MWI-COMP-224 | MWI-COMP-219, MWI-COMP-221, MWI-COMP-222 | [open](../components/components-admin-pokemon-rocket-panel-trainercard.md) |
| MWI-COMP-224 | RocketPanel | MWI-COMP-127, MWI-COMP-311 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-154, MWI-COMP-155, MWI-COMP-223 | [open](../components/components-admin-pokemon-rocket-panel-rocketpanel.md) |
| MWI-COMP-225 | Trend | MWI-COMP-227, MWI-COMP-229 | Not found | [open](../components/components-admin-pokemon-shiny-tracker-panel-trend.md) |
| MWI-COMP-226 | ActivityBar | MWI-COMP-227 | Not found | [open](../components/components-admin-pokemon-shiny-tracker-panel-activitybar.md) |
| MWI-COMP-227 | ShinyDetail | MWI-COMP-229 | MWI-COMP-133, MWI-COMP-140, MWI-COMP-225, MWI-COMP-226 | [open](../components/components-admin-pokemon-shiny-tracker-panel-shinydetail.md) |
| MWI-COMP-228 | Podium | MWI-COMP-229 | Not found | [open](../components/components-admin-pokemon-shiny-tracker-panel-podium.md) |
| MWI-COMP-229 | ShinyTrackerPanel | MWI-COMP-127 | MWI-COMP-131, MWI-COMP-133, MWI-COMP-140, MWI-COMP-154, MWI-COMP-155, MWI-COMP-225, MWI-COMP-227, MWI-COMP-228, MWI-COMP-325 | [open](../components/components-admin-pokemon-shiny-tracker-panel-shinytrackerpanel.md) |
| MWI-COMP-230 | SourceHistoryModal | MWI-COMP-127, MWI-COMP-313 | Not found | [open](../components/components-admin-pokemon-source-watch-panel-sourcehistorymodal.md) |
| MWI-COMP-231 | DataDeployHistoryModal | MWI-COMP-127, MWI-COMP-312 | Not found | [open](../components/components-admin-pokemon-source-watch-panel-datadeployhistorymodal.md) |
| MWI-COMP-232 | SourceRows | MWI-COMP-127, MWI-COMP-314 | MWI-COMP-233 | [open](../components/components-admin-pokemon-source-watch-panel-sourcerows.md) |
| MWI-COMP-233 | SourceStat | MWI-COMP-232 | Not found | [open](../components/components-admin-pokemon-source-watch-panel-sourcestat.md) |
| MWI-COMP-234 | TierSection | MWI-COMP-182, MWI-COMP-188, MWI-COMP-209 | Not found | [open](../components/components-admin-pokemon-tier-section-tiersection.md) |
| MWI-COMP-235 | UpdateLogPanel | MWI-COMP-127, MWI-COMP-315 | Not found | [open](../components/components-admin-pokemon-update-log-panel-updatelogpanel.md) |
| MWI-COMP-236 | DashboardFooter | MWI-COMP-092, MWI-COMP-268 | Not found | [open](../components/components-admin-shared-dashboard-footer-dashboardfooter.md) |
| MWI-COMP-237 | DashboardLoadingState | MWI-COMP-015, MWI-COMP-073, MWI-COMP-082, MWI-COMP-086, MWI-COMP-087, MWI-COMP-252, MWI-COMP-275 | MWI-COMP-319 | [open](../components/components-admin-shared-loading-state-dashboardloadingstate.md) |
| MWI-COMP-238 | SortableWidgetGrid | MWI-COMP-028, MWI-COMP-030, MWI-COMP-127, MWI-COMP-241, MWI-COMP-246, MWI-COMP-285 | MWI-COMP-239 | [open](../components/components-admin-shared-sortable-widget-grid-sortablewidgetgrid.md) |
| MWI-COMP-239 | SortableWidgetFrame | MWI-COMP-238 | Not found | [open](../components/components-admin-shared-sortable-widget-grid-sortablewidgetframe.md) |
| MWI-COMP-240 | DashboardCharts | MWI-COMP-267 | MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-stats-dashboard-charts-dashboardcharts.md) |
| MWI-COMP-241 | DatabaseStats | MWI-COMP-004, MWI-COMP-270 | MWI-COMP-238, MWI-COMP-242, MWI-COMP-243, MWI-COMP-244, MWI-COMP-245, MWI-COMP-318, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-stats-database-stats-databasestats.md) |
| MWI-COMP-242 | StatCard | MWI-COMP-241 | MWI-COMP-319 | [open](../components/components-admin-stats-database-stats-statcard.md) |
| MWI-COMP-243 | ApiTimeline | MWI-COMP-241 | Not found | [open](../components/components-admin-stats-database-stats-apitimeline.md) |
| MWI-COMP-244 | EndpointBars | MWI-COMP-241 | Not found | [open](../components/components-admin-stats-database-stats-endpointbars.md) |
| MWI-COMP-245 | MiniRow | MWI-COMP-241 | Not found | [open](../components/components-admin-stats-database-stats-minirow.md) |
| MWI-COMP-246 | LearningAnalytics | MWI-COMP-002, MWI-COMP-274 | MWI-COMP-238, MWI-COMP-247, MWI-COMP-248, MWI-COMP-249, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-stats-learning-analytics-learninganalytics.md) |
| MWI-COMP-247 | LevelProgressGrid | MWI-COMP-246 | Not found | [open](../components/components-admin-stats-learning-analytics-levelprogressgrid.md) |
| MWI-COMP-248 | StatusChart | MWI-COMP-246 | Not found | [open](../components/components-admin-stats-learning-analytics-statuschart.md) |
| MWI-COMP-249 | Metric | MWI-COMP-246 | MWI-COMP-319 | [open](../components/components-admin-stats-learning-analytics-metric.md) |
| MWI-COMP-250 | PokemonAnalytics | MWI-COMP-277 | MWI-COMP-251, MWI-COMP-317, MWI-COMP-319, MWI-COMP-320, MWI-COMP-321, MWI-COMP-322 | [open](../components/components-admin-stats-pokemon-analytics-pokemonanalytics.md) |
| MWI-COMP-251 | Metric | MWI-COMP-250 | MWI-COMP-319 | [open](../components/components-admin-stats-pokemon-analytics-metric.md) |
| MWI-COMP-252 | DashboardBacklog | MWI-COMP-018, MWI-COMP-266 | MWI-COMP-237, MWI-COMP-253, MWI-COMP-254, MWI-COMP-255, MWI-COMP-256, MWI-COMP-317, MWI-COMP-318, MWI-COMP-319, MWI-COMP-323, MWI-COMP-325 | [open](../components/components-admin-tables-dashboard-backlog-dashboardbacklog.md) |
| MWI-COMP-253 | BacklogStat | MWI-COMP-252 | MWI-COMP-319 | [open](../components/components-admin-tables-dashboard-backlog-backlogstat.md) |
| MWI-COMP-254 | FilterSelect | MWI-COMP-252 | Not found | [open](../components/components-admin-tables-dashboard-backlog-filterselect.md) |
| MWI-COMP-255 | TicketCard | MWI-COMP-252 | MWI-COMP-318, MWI-COMP-319 | [open](../components/components-admin-tables-dashboard-backlog-ticketcard.md) |
| MWI-COMP-256 | TicketForm | MWI-COMP-252 | MWI-COMP-257, MWI-COMP-258, MWI-COMP-259, MWI-COMP-318, MWI-COMP-323 | [open](../components/components-admin-tables-dashboard-backlog-ticketform.md) |
| MWI-COMP-257 | SelectField | MWI-COMP-256 | Not found | [open](../components/components-admin-tables-dashboard-backlog-selectfield.md) |
| MWI-COMP-258 | Field | MWI-COMP-256 | MWI-COMP-323 | [open](../components/components-admin-tables-dashboard-backlog-field.md) |
| MWI-COMP-259 | Area | MWI-COMP-256 | MWI-COMP-324 | [open](../components/components-admin-tables-dashboard-backlog-area.md) |
| MWI-COMP-260 | DetailModal | Not found | MWI-COMP-178 | [open](../components/components-checklist-detail-modal-detailmodal.md) |
| MWI-COMP-261 | PokemonCard | Not found | MWI-COMP-198 | [open](../components/components-checklist-pokemon-card-pokemoncard.md) |
| MWI-COMP-262 | AppFrame | Not found | MWI-COMP-092 | [open](../components/components-dashboard-app-frame-appframe.md) |
| MWI-COMP-263 | CalendarPlanner | Not found | MWI-COMP-073 | [open](../components/components-dashboard-calendar-planner-calendarplanner.md) |
| MWI-COMP-264 | ColorLab | Not found | MWI-COMP-026 | [open](../components/components-dashboard-color-lab-colorlab.md) |
| MWI-COMP-265 | DailyTools | Not found | MWI-COMP-028 | [open](../components/components-dashboard-daily-tools-dailytools.md) |
| MWI-COMP-266 | DashboardBacklog | Not found | MWI-COMP-252 | [open](../components/components-dashboard-dashboard-backlog-dashboardbacklog.md) |
| MWI-COMP-267 | DashboardCharts | Not found | MWI-COMP-240 | [open](../components/components-dashboard-dashboard-charts-dashboardcharts.md) |
| MWI-COMP-268 | DashboardFooter | Not found | MWI-COMP-236 | [open](../components/components-dashboard-dashboard-footer-dashboardfooter.md) |
| MWI-COMP-269 | DashboardHomeLive | Not found | MWI-COMP-030 | [open](../components/components-dashboard-dashboard-home-live-dashboardhomelive.md) |
| MWI-COMP-270 | DatabaseStats | Not found | MWI-COMP-241 | [open](../components/components-dashboard-database-stats-databasestats.md) |
| MWI-COMP-271 | JavaScriptExercises | Not found | MWI-COMP-079 | [open](../components/components-dashboard-javascript-exercises-javascriptexercises.md) |
| MWI-COMP-272 | JsProgress | Not found | MWI-COMP-081 | [open](../components/components-dashboard-js-progress-jsprogress.md) |
| MWI-COMP-273 | KanbanBoard | Not found | MWI-COMP-082 | [open](../components/components-dashboard-kanban-board-kanbanboard.md) |
| MWI-COMP-274 | LearningAnalytics | Not found | MWI-COMP-246 | [open](../components/components-dashboard-learning-analytics-learninganalytics.md) |
| MWI-COMP-275 | DashboardLoadingState | Not found | MWI-COMP-237 | [open](../components/components-dashboard-loading-state-dashboardloadingstate.md) |
| MWI-COMP-276 | NotesBoard | Not found | MWI-COMP-086 | [open](../components/components-dashboard-notes-board-notesboard.md) |
| MWI-COMP-277 | PokemonAnalytics | Not found | MWI-COMP-250 | [open](../components/components-dashboard-pokemon-analytics-pokemonanalytics.md) |
| MWI-COMP-278 | PokemonApiExplorer | Not found | MWI-COMP-191 | [open](../components/components-dashboard-pokemon-api-explorer-pokemonapiexplorer.md) |
| MWI-COMP-279 | PokemonApiStatus | Not found | MWI-COMP-193 | [open](../components/components-dashboard-pokemon-api-status-pokemonapistatus.md) |
| MWI-COMP-280 | PokemonDocsViewer | Not found | MWI-COMP-199 | [open](../components/components-dashboard-pokemon-docs-viewer-pokemondocsviewer.md) |
| MWI-COMP-281 | PokemonWidget | Not found | MWI-COMP-023 | [open](../components/components-dashboard-pokemon-widget-pokemonwidget.md) |
| MWI-COMP-282 | Pomodoro | Not found | MWI-COMP-041 | [open](../components/components-dashboard-pomodoro-pomodoro.md) |
| MWI-COMP-283 | Providers | Not found | MWI-COMP-093 | [open](../components/components-dashboard-providers-providers.md) |
| MWI-COMP-284 | SnippetVault | Not found | MWI-COMP-043 | [open](../components/components-dashboard-snippet-vault-snippetvault.md) |
| MWI-COMP-285 | SortableWidgetGrid | Not found | MWI-COMP-238 | [open](../components/components-dashboard-sortable-widget-grid-sortablewidgetgrid.md) |
| MWI-COMP-286 | StatCard | Not found | MWI-COMP-025 | [open](../components/components-dashboard-stat-card-statcard.md) |
| MWI-COMP-287 | TodoList | Not found | MWI-COMP-087 | [open](../components/components-dashboard-todo-list-todolist.md) |
| MWI-COMP-288 | WriterStudio | Not found | MWI-COMP-088 | [open](../components/components-dashboard-writer-studio-writerstudio.md) |
| MWI-COMP-289 | AdminApp | Not found | MWI-COMP-127 | [open](../components/components-pokemon-admin-admin-app-adminapp.md) |
| MWI-COMP-290 | AssetStatCard | Not found | MWI-COMP-133 | [open](../components/components-pokemon-admin-admin-ui-assetstatcard.md) |
| MWI-COMP-291 | BarList | Not found | MWI-COMP-132 | [open](../components/components-pokemon-admin-admin-ui-barlist.md) |
| MWI-COMP-292 | CompletionList | Not found | MWI-COMP-135 | [open](../components/components-pokemon-admin-admin-ui-completionlist.md) |
| MWI-COMP-293 | ControlCardsPanel | Not found | MWI-COMP-138 | [open](../components/components-pokemon-admin-admin-ui-controlcardspanel.md) |
| MWI-COMP-294 | GenerationFilterBar | Not found | MWI-COMP-134 | [open](../components/components-pokemon-admin-admin-ui-generationfilterbar.md) |
| MWI-COMP-295 | HistoryList | Not found | MWI-COMP-136 | [open](../components/components-pokemon-admin-admin-ui-historylist.md) |
| MWI-COMP-296 | JsonIssueList | Not found | MWI-COMP-139 | [open](../components/components-pokemon-admin-admin-ui-jsonissuelist.md) |
| MWI-COMP-297 | MiniCardList | Not found | MWI-COMP-137 | [open](../components/components-pokemon-admin-admin-ui-minicardlist.md) |
| MWI-COMP-298 | Panel | Not found | MWI-COMP-131 | [open](../components/components-pokemon-admin-admin-ui-panel.md) |
| MWI-COMP-299 | TypeIcons | Not found | MWI-COMP-140 | [open](../components/components-pokemon-admin-asset-icons-typeicons.md) |
| MWI-COMP-300 | WeatherIcons | Not found | MWI-COMP-141 | [open](../components/components-pokemon-admin-asset-icons-weathericons.md) |
| MWI-COMP-301 | CandyPanel | Not found | MWI-COMP-144 | [open](../components/components-pokemon-admin-candy-panel-candypanel.md) |
| MWI-COMP-302 | CatalogPanel | Not found | MWI-COMP-148 | [open](../components/components-pokemon-admin-catalog-panel-catalogpanel.md) |
| MWI-COMP-303 | CollectionsPanel | Not found | MWI-COMP-150 | [open](../components/components-pokemon-admin-collections-panel-collectionspanel.md) |
| MWI-COMP-304 | EggsPanel | Not found | MWI-COMP-183 | [open](../components/components-pokemon-admin-eggs-panel-eggspanel.md) |
| MWI-COMP-305 | EventsCalendarPanel | Not found | MWI-COMP-051 | [open](../components/components-pokemon-admin-events-calendar-panel-eventscalendarpanel.md) |
| MWI-COMP-306 | LoginCard | Not found | MWI-COMP-185 | [open](../components/components-pokemon-admin-login-card-logincard.md) |
| MWI-COMP-307 | MaxBattlesPanel | Not found | MWI-COMP-189 | [open](../components/components-pokemon-admin-max-battles-panel-maxbattlespanel.md) |
| MWI-COMP-308 | PokemonAdminStudio | Not found | MWI-COMP-190 | [open](../components/components-pokemon-admin-pokemon-admin-studio-pokemonadminstudio.md) |
| MWI-COMP-309 | RaidsPanel | Not found | MWI-COMP-210 | [open](../components/components-pokemon-admin-raids-panel-raidspanel.md) |
| MWI-COMP-310 | ResearchPanel | Not found | MWI-COMP-218 | [open](../components/components-pokemon-admin-research-panel-researchpanel.md) |
| MWI-COMP-311 | RocketPanel | Not found | MWI-COMP-224 | [open](../components/components-pokemon-admin-rocket-panel-rocketpanel.md) |
| MWI-COMP-312 | DataDeployHistoryModal | Not found | MWI-COMP-231 | [open](../components/components-pokemon-admin-source-watch-panel-datadeployhistorymodal.md) |
| MWI-COMP-313 | SourceHistoryModal | Not found | MWI-COMP-230 | [open](../components/components-pokemon-admin-source-watch-panel-sourcehistorymodal.md) |
| MWI-COMP-314 | SourceRows | Not found | MWI-COMP-232 | [open](../components/components-pokemon-admin-source-watch-panel-sourcerows.md) |
| MWI-COMP-315 | UpdateLogPanel | Not found | MWI-COMP-235 | [open](../components/components-pokemon-admin-update-log-panel-updatelogpanel.md) |
| MWI-COMP-316 | MetricCard | MWI-COMP-127 | Not found | [open](../components/components-site-metric-card-metriccard.md) |
| MWI-COMP-317 | Badge | MWI-COMP-001, MWI-COMP-015, MWI-COMP-022, MWI-COMP-023, MWI-COMP-026, MWI-COMP-028, MWI-COMP-030, MWI-COMP-041, MWI-COMP-043, MWI-COMP-073, MWI-COMP-077, MWI-COMP-078, MWI-COMP-079, MWI-COMP-081, MWI-COMP-082, MWI-COMP-083, MWI-COMP-086, MWI-COMP-087, MWI-COMP-088, MWI-COMP-095, MWI-COMP-098, MWI-COMP-101, MWI-COMP-104, MWI-COMP-111, MWI-COMP-115, MWI-COMP-119, MWI-COMP-122, MWI-COMP-191, MWI-COMP-199, MWI-COMP-250, MWI-COMP-252 | Not found | [open](../components/components-ui-badge-badge.md) |
| MWI-COMP-318 | Button | MWI-COMP-015, MWI-COMP-022, MWI-COMP-026, MWI-COMP-028, MWI-COMP-030, MWI-COMP-041, MWI-COMP-043, MWI-COMP-044, MWI-COMP-073, MWI-COMP-079, MWI-COMP-081, MWI-COMP-082, MWI-COMP-086, MWI-COMP-087, MWI-COMP-088, MWI-COMP-089, MWI-COMP-101, MWI-COMP-105, MWI-COMP-115, MWI-COMP-121, MWI-COMP-122, MWI-COMP-124, MWI-COMP-191, MWI-COMP-193, MWI-COMP-241, MWI-COMP-252, MWI-COMP-255, MWI-COMP-256 | Not found | [open](../components/components-ui-button-button.md) |
| MWI-COMP-319 | Card | MWI-COMP-001, MWI-COMP-015, MWI-COMP-022, MWI-COMP-023, MWI-COMP-025, MWI-COMP-026, MWI-COMP-028, MWI-COMP-030, MWI-COMP-033, MWI-COMP-041, MWI-COMP-043, MWI-COMP-073, MWI-COMP-077, MWI-COMP-079, MWI-COMP-080, MWI-COMP-081, MWI-COMP-082, MWI-COMP-083, MWI-COMP-086, MWI-COMP-087, MWI-COMP-088, MWI-COMP-095, MWI-COMP-096, MWI-COMP-097, MWI-COMP-118, MWI-COMP-119, MWI-COMP-191, MWI-COMP-199, MWI-COMP-237, MWI-COMP-240, MWI-COMP-241, MWI-COMP-242, MWI-COMP-246, MWI-COMP-249, MWI-COMP-250, MWI-COMP-251, MWI-COMP-252, MWI-COMP-253, MWI-COMP-255 | Not found | [open](../components/components-ui-card-card.md) |
| MWI-COMP-320 | CardHeader | MWI-COMP-001, MWI-COMP-023, MWI-COMP-041, MWI-COMP-079, MWI-COMP-081, MWI-COMP-191, MWI-COMP-199, MWI-COMP-240, MWI-COMP-241, MWI-COMP-246, MWI-COMP-250 | Not found | [open](../components/components-ui-card-cardheader.md) |
| MWI-COMP-321 | CardTitle | MWI-COMP-001, MWI-COMP-023, MWI-COMP-041, MWI-COMP-079, MWI-COMP-081, MWI-COMP-191, MWI-COMP-199, MWI-COMP-240, MWI-COMP-241, MWI-COMP-246, MWI-COMP-250 | Not found | [open](../components/components-ui-card-cardtitle.md) |
| MWI-COMP-322 | CardDescription | MWI-COMP-001, MWI-COMP-023, MWI-COMP-041, MWI-COMP-079, MWI-COMP-081, MWI-COMP-191, MWI-COMP-199, MWI-COMP-240, MWI-COMP-241, MWI-COMP-246, MWI-COMP-250 | Not found | [open](../components/components-ui-card-carddescription.md) |
| MWI-COMP-323 | Input | MWI-COMP-015, MWI-COMP-022, MWI-COMP-026, MWI-COMP-028, MWI-COMP-043, MWI-COMP-044, MWI-COMP-073, MWI-COMP-082, MWI-COMP-086, MWI-COMP-087, MWI-COMP-088, MWI-COMP-199, MWI-COMP-252, MWI-COMP-256, MWI-COMP-258 | Not found | [open](../components/components-ui-input-input.md) |
| MWI-COMP-324 | Textarea | MWI-COMP-015, MWI-COMP-028, MWI-COMP-044, MWI-COMP-073, MWI-COMP-082, MWI-COMP-086, MWI-COMP-088, MWI-COMP-101, MWI-COMP-259 | Not found | [open](../components/components-ui-input-textarea.md) |
| MWI-COMP-325 | Modal | MWI-COMP-015, MWI-COMP-044, MWI-COMP-073, MWI-COMP-082, MWI-COMP-098, MWI-COMP-115, MWI-COMP-143, MWI-COMP-229, MWI-COMP-252 | Not found | [open](../components/components-ui-modal-modal.md) |

## Full machine-generated Mermaid graph

```mermaid
flowchart LR
  MWI_COMP_001["MWI-COMP-001"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_001["MWI-COMP-001"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_001["MWI-COMP-001"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_001["MWI-COMP-001"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_001["MWI-COMP-001"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_002["MWI-COMP-002"] --> MWI_COMP_246["MWI-COMP-246"]
  MWI_COMP_003["MWI-COMP-003"] --> MWI_COMP_073["MWI-COMP-073"]
  MWI_COMP_004["MWI-COMP-004"] --> MWI_COMP_241["MWI-COMP-241"]
  MWI_COMP_005["MWI-COMP-005"] --> MWI_COMP_079["MWI-COMP-079"]
  MWI_COMP_006["MWI-COMP-006"] --> MWI_COMP_081["MWI-COMP-081"]
  MWI_COMP_007["MWI-COMP-007"] --> MWI_COMP_082["MWI-COMP-082"]
  MWI_COMP_008["MWI-COMP-008"] --> MWI_COMP_092["MWI-COMP-092"]
  MWI_COMP_009["MWI-COMP-009"] --> MWI_COMP_086["MWI-COMP-086"]
  MWI_COMP_010["MWI-COMP-010"] --> MWI_COMP_030["MWI-COMP-030"]
  MWI_COMP_011["MWI-COMP-011"] --> MWI_COMP_026["MWI-COMP-026"]
  MWI_COMP_012["MWI-COMP-012"] --> MWI_COMP_190["MWI-COMP-190"]
  MWI_COMP_013["MWI-COMP-013"] --> MWI_COMP_191["MWI-COMP-191"]
  MWI_COMP_013["MWI-COMP-013"] --> MWI_COMP_193["MWI-COMP-193"]
  MWI_COMP_013["MWI-COMP-013"] --> MWI_COMP_199["MWI-COMP-199"]
  MWI_COMP_014["MWI-COMP-014"] --> MWI_COMP_041["MWI-COMP-041"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_015["MWI-COMP-015"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_016["MWI-COMP-016"] --> MWI_COMP_043["MWI-COMP-043"]
  MWI_COMP_017["MWI-COMP-017"] --> MWI_COMP_087["MWI-COMP-087"]
  MWI_COMP_018["MWI-COMP-018"] --> MWI_COMP_252["MWI-COMP-252"]
  MWI_COMP_019["MWI-COMP-019"] --> MWI_COMP_028["MWI-COMP-028"]
  MWI_COMP_020["MWI-COMP-020"] --> MWI_COMP_088["MWI-COMP-088"]
  MWI_COMP_021["MWI-COMP-021"] --> MWI_COMP_093["MWI-COMP-093"]
  MWI_COMP_022["MWI-COMP-022"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_022["MWI-COMP-022"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_022["MWI-COMP-022"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_022["MWI-COMP-022"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_024["MWI-COMP-024"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_023["MWI-COMP-023"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_025["MWI-COMP-025"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_026["MWI-COMP-026"] --> MWI_COMP_027["MWI-COMP-027"]
  MWI_COMP_026["MWI-COMP-026"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_026["MWI-COMP-026"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_026["MWI-COMP-026"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_026["MWI-COMP-026"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_029["MWI-COMP-029"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_028["MWI-COMP-028"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_031["MWI-COMP-031"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_032["MWI-COMP-032"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_033["MWI-COMP-033"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_034["MWI-COMP-034"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_035["MWI-COMP-035"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_036["MWI-COMP-036"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_037["MWI-COMP-037"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_038["MWI-COMP-038"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_039["MWI-COMP-039"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_040["MWI-COMP-040"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_193["MWI-COMP-193"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_030["MWI-COMP-030"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_033["MWI-COMP-033"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_037["MWI-COMP-037"] --> MWI_COMP_040["MWI-COMP-040"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_042["MWI-COMP-042"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_041["MWI-COMP-041"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_043["MWI-COMP-043"] --> MWI_COMP_044["MWI-COMP-044"]
  MWI_COMP_043["MWI-COMP-043"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_043["MWI-COMP-043"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_043["MWI-COMP-043"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_043["MWI-COMP-043"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_044["MWI-COMP-044"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_044["MWI-COMP-044"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_044["MWI-COMP-044"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_044["MWI-COMP-044"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_045["MWI-COMP-045"] --> MWI_COMP_047["MWI-COMP-047"]
  MWI_COMP_045["MWI-COMP-045"] --> MWI_COMP_048["MWI-COMP-048"]
  MWI_COMP_045["MWI-COMP-045"] --> MWI_COMP_049["MWI-COMP-049"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_045["MWI-COMP-045"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_046["MWI-COMP-046"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_052["MWI-COMP-052"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_053["MWI-COMP-053"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_057["MWI-COMP-057"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_058["MWI-COMP-058"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_064["MWI-COMP-064"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_051["MWI-COMP-051"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_053["MWI-COMP-053"] --> MWI_COMP_054["MWI-COMP-054"]
  MWI_COMP_053["MWI-COMP-053"] --> MWI_COMP_055["MWI-COMP-055"]
  MWI_COMP_054["MWI-COMP-054"] --> MWI_COMP_056["MWI-COMP-056"]
  MWI_COMP_057["MWI-COMP-057"] --> MWI_COMP_060["MWI-COMP-060"]
  MWI_COMP_058["MWI-COMP-058"] --> MWI_COMP_059["MWI-COMP-059"]
  MWI_COMP_059["MWI-COMP-059"] --> MWI_COMP_050["MWI-COMP-050"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_050["MWI-COMP-050"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_062["MWI-COMP-062"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_066["MWI-COMP-066"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_068["MWI-COMP-068"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_070["MWI-COMP-070"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_071["MWI-COMP-071"]
  MWI_COMP_064["MWI-COMP-064"] --> MWI_COMP_072["MWI-COMP-072"]
  MWI_COMP_066["MWI-COMP-066"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_066["MWI-COMP-066"] --> MWI_COMP_067["MWI-COMP-067"]
  MWI_COMP_067["MWI-COMP-067"] --> MWI_COMP_061["MWI-COMP-061"]
  MWI_COMP_068["MWI-COMP-068"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_068["MWI-COMP-068"] --> MWI_COMP_069["MWI-COMP-069"]
  MWI_COMP_069["MWI-COMP-069"] --> MWI_COMP_050["MWI-COMP-050"]
  MWI_COMP_069["MWI-COMP-069"] --> MWI_COMP_067["MWI-COMP-067"]
  MWI_COMP_069["MWI-COMP-069"] --> MWI_COMP_070["MWI-COMP-070"]
  MWI_COMP_070["MWI-COMP-070"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_071["MWI-COMP-071"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_071["MWI-COMP-071"] --> MWI_COMP_065["MWI-COMP-065"]
  MWI_COMP_072["MWI-COMP-072"] --> MWI_COMP_063["MWI-COMP-063"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_074["MWI-COMP-074"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_075["MWI-COMP-075"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_076["MWI-COMP-076"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_077["MWI-COMP-077"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_078["MWI-COMP-078"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_073["MWI-COMP-073"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_077["MWI-COMP-077"] --> MWI_COMP_078["MWI-COMP-078"]
  MWI_COMP_077["MWI-COMP-077"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_077["MWI-COMP-077"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_078["MWI-COMP-078"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_080["MWI-COMP-080"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_079["MWI-COMP-079"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_080["MWI-COMP-080"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_095["MWI-COMP-095"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_096["MWI-COMP-096"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_097["MWI-COMP-097"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_098["MWI-COMP-098"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_115["MWI-COMP-115"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_118["MWI-COMP-118"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_119["MWI-COMP-119"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_081["MWI-COMP-081"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_083["MWI-COMP-083"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_085["MWI-COMP-085"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_082["MWI-COMP-082"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_083["MWI-COMP-083"] --> MWI_COMP_084["MWI-COMP-084"]
  MWI_COMP_083["MWI-COMP-083"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_083["MWI-COMP-083"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_086["MWI-COMP-086"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_087["MWI-COMP-087"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_087["MWI-COMP-087"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_087["MWI-COMP-087"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_087["MWI-COMP-087"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_087["MWI-COMP-087"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_089["MWI-COMP-089"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_090["MWI-COMP-090"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_088["MWI-COMP-088"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_089["MWI-COMP-089"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_090["MWI-COMP-090"] --> MWI_COMP_091["MWI-COMP-091"]
  MWI_COMP_092["MWI-COMP-092"] --> MWI_COMP_094["MWI-COMP-094"]
  MWI_COMP_092["MWI-COMP-092"] --> MWI_COMP_122["MWI-COMP-122"]
  MWI_COMP_092["MWI-COMP-092"] --> MWI_COMP_124["MWI-COMP-124"]
  MWI_COMP_092["MWI-COMP-092"] --> MWI_COMP_236["MWI-COMP-236"]
  MWI_COMP_095["MWI-COMP-095"] --> MWI_COMP_117["MWI-COMP-117"]
  MWI_COMP_095["MWI-COMP-095"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_095["MWI-COMP-095"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_096["MWI-COMP-096"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_097["MWI-COMP-097"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_099["MWI-COMP-099"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_100["MWI-COMP-100"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_101["MWI-COMP-101"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_102["MWI-COMP-102"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_103["MWI-COMP-103"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_108["MWI-COMP-108"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_114["MWI-COMP-114"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_098["MWI-COMP-098"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_099["MWI-COMP-099"] --> MWI_COMP_104["MWI-COMP-104"]
  MWI_COMP_099["MWI-COMP-099"] --> MWI_COMP_105["MWI-COMP-105"]
  MWI_COMP_099["MWI-COMP-099"] --> MWI_COMP_106["MWI-COMP-106"]
  MWI_COMP_099["MWI-COMP-099"] --> MWI_COMP_112["MWI-COMP-112"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_104["MWI-COMP-104"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_105["MWI-COMP-105"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_109["MWI-COMP-109"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_110["MWI-COMP-110"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_111["MWI-COMP-111"]
  MWI_COMP_100["MWI-COMP-100"] --> MWI_COMP_113["MWI-COMP-113"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_104["MWI-COMP-104"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_105["MWI-COMP-105"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_109["MWI-COMP-109"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_110["MWI-COMP-110"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_113["MWI-COMP-113"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_101["MWI-COMP-101"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_104["MWI-COMP-104"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_105["MWI-COMP-105"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_109["MWI-COMP-109"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_110["MWI-COMP-110"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_111["MWI-COMP-111"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_112["MWI-COMP-112"]
  MWI_COMP_102["MWI-COMP-102"] --> MWI_COMP_113["MWI-COMP-113"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_104["MWI-COMP-104"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_105["MWI-COMP-105"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_109["MWI-COMP-109"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_110["MWI-COMP-110"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_111["MWI-COMP-111"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_112["MWI-COMP-112"]
  MWI_COMP_103["MWI-COMP-103"] --> MWI_COMP_113["MWI-COMP-113"]
  MWI_COMP_104["MWI-COMP-104"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_105["MWI-COMP-105"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_106["MWI-COMP-106"] --> MWI_COMP_107["MWI-COMP-107"]
  MWI_COMP_106["MWI-COMP-106"] --> MWI_COMP_112["MWI-COMP-112"]
  MWI_COMP_111["MWI-COMP-111"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_115["MWI-COMP-115"] --> MWI_COMP_116["MWI-COMP-116"]
  MWI_COMP_115["MWI-COMP-115"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_115["MWI-COMP-115"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_115["MWI-COMP-115"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_118["MWI-COMP-118"] --> MWI_COMP_117["MWI-COMP-117"]
  MWI_COMP_118["MWI-COMP-118"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_119["MWI-COMP-119"] --> MWI_COMP_117["MWI-COMP-117"]
  MWI_COMP_119["MWI-COMP-119"] --> MWI_COMP_120["MWI-COMP-120"]
  MWI_COMP_119["MWI-COMP-119"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_119["MWI-COMP-119"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_121["MWI-COMP-121"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_122["MWI-COMP-122"] --> MWI_COMP_123["MWI-COMP-123"]
  MWI_COMP_122["MWI-COMP-122"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_122["MWI-COMP-122"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_124["MWI-COMP-124"] --> MWI_COMP_121["MWI-COMP-121"]
  MWI_COMP_124["MWI-COMP-124"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_126["MWI-COMP-126"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_126["MWI-COMP-126"] --> MWI_COMP_137["MWI-COMP-137"]
  MWI_COMP_126["MWI-COMP-126"] --> MWI_COMP_139["MWI-COMP-139"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_125["MWI-COMP-125"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_126["MWI-COMP-126"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_129["MWI-COMP-129"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_130["MWI-COMP-130"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_132["MWI-COMP-132"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_134["MWI-COMP-134"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_135["MWI-COMP-135"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_136["MWI-COMP-136"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_137["MWI-COMP-137"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_138["MWI-COMP-138"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_143["MWI-COMP-143"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_144["MWI-COMP-144"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_148["MWI-COMP-148"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_150["MWI-COMP-150"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_178["MWI-COMP-178"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_183["MWI-COMP-183"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_184["MWI-COMP-184"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_185["MWI-COMP-185"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_189["MWI-COMP-189"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_198["MWI-COMP-198"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_206["MWI-COMP-206"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_210["MWI-COMP-210"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_218["MWI-COMP-218"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_224["MWI-COMP-224"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_229["MWI-COMP-229"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_230["MWI-COMP-230"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_231["MWI-COMP-231"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_232["MWI-COMP-232"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_235["MWI-COMP-235"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_127["MWI-COMP-127"] --> MWI_COMP_316["MWI-COMP-316"]
  MWI_COMP_129["MWI-COMP-129"] --> MWI_COMP_128["MWI-COMP-128"]
  MWI_COMP_130["MWI-COMP-130"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_138["MWI-COMP-138"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_138["MWI-COMP-138"] --> MWI_COMP_137["MWI-COMP-137"]
  MWI_COMP_143["MWI-COMP-143"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_143["MWI-COMP-143"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_143["MWI-COMP-143"] --> MWI_COMP_142["MWI-COMP-142"]
  MWI_COMP_143["MWI-COMP-143"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_144["MWI-COMP-144"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_146["MWI-COMP-146"] --> MWI_COMP_145["MWI-COMP-145"]
  MWI_COMP_148["MWI-COMP-148"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_148["MWI-COMP-148"] --> MWI_COMP_146["MWI-COMP-146"]
  MWI_COMP_148["MWI-COMP-148"] --> MWI_COMP_147["MWI-COMP-147"]
  MWI_COMP_150["MWI-COMP-150"] --> MWI_COMP_149["MWI-COMP-149"]
  MWI_COMP_152["MWI-COMP-152"] --> MWI_COMP_151["MWI-COMP-151"]
  MWI_COMP_155["MWI-COMP-155"] --> MWI_COMP_152["MWI-COMP-152"]
  MWI_COMP_158["MWI-COMP-158"] --> MWI_COMP_157["MWI-COMP-157"]
  MWI_COMP_160["MWI-COMP-160"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_163["MWI-COMP-163"] --> MWI_COMP_162["MWI-COMP-162"]
  MWI_COMP_164["MWI-COMP-164"] --> MWI_COMP_157["MWI-COMP-157"]
  MWI_COMP_166["MWI-COMP-166"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_167["MWI-COMP-167"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_167["MWI-COMP-167"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_167["MWI-COMP-167"] --> MWI_COMP_164["MWI-COMP-164"]
  MWI_COMP_167["MWI-COMP-167"] --> MWI_COMP_165["MWI-COMP-165"]
  MWI_COMP_169["MWI-COMP-169"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_169["MWI-COMP-169"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_169["MWI-COMP-169"] --> MWI_COMP_168["MWI-COMP-168"]
  MWI_COMP_170["MWI-COMP-170"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_170["MWI-COMP-170"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_170["MWI-COMP-170"] --> MWI_COMP_168["MWI-COMP-168"]
  MWI_COMP_171["MWI-COMP-171"] --> MWI_COMP_168["MWI-COMP-168"]
  MWI_COMP_172["MWI-COMP-172"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_172["MWI-COMP-172"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_172["MWI-COMP-172"] --> MWI_COMP_173["MWI-COMP-173"]
  MWI_COMP_174["MWI-COMP-174"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_174["MWI-COMP-174"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_175["MWI-COMP-175"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_177["MWI-COMP-177"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_156["MWI-COMP-156"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_158["MWI-COMP-158"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_159["MWI-COMP-159"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_160["MWI-COMP-160"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_161["MWI-COMP-161"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_162["MWI-COMP-162"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_163["MWI-COMP-163"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_166["MWI-COMP-166"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_167["MWI-COMP-167"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_169["MWI-COMP-169"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_170["MWI-COMP-170"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_171["MWI-COMP-171"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_172["MWI-COMP-172"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_174["MWI-COMP-174"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_175["MWI-COMP-175"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_176["MWI-COMP-176"]
  MWI_COMP_178["MWI-COMP-178"] --> MWI_COMP_177["MWI-COMP-177"]
  MWI_COMP_181["MWI-COMP-181"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_181["MWI-COMP-181"] --> MWI_COMP_179["MWI-COMP-179"]
  MWI_COMP_181["MWI-COMP-181"] --> MWI_COMP_180["MWI-COMP-180"]
  MWI_COMP_182["MWI-COMP-182"] --> MWI_COMP_181["MWI-COMP-181"]
  MWI_COMP_182["MWI-COMP-182"] --> MWI_COMP_234["MWI-COMP-234"]
  MWI_COMP_183["MWI-COMP-183"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_183["MWI-COMP-183"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_183["MWI-COMP-183"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_183["MWI-COMP-183"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_183["MWI-COMP-183"] --> MWI_COMP_182["MWI-COMP-182"]
  MWI_COMP_184["MWI-COMP-184"] --> MWI_COMP_051["MWI-COMP-051"]
  MWI_COMP_187["MWI-COMP-187"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_187["MWI-COMP-187"] --> MWI_COMP_186["MWI-COMP-186"]
  MWI_COMP_188["MWI-COMP-188"] --> MWI_COMP_187["MWI-COMP-187"]
  MWI_COMP_188["MWI-COMP-188"] --> MWI_COMP_234["MWI-COMP-234"]
  MWI_COMP_189["MWI-COMP-189"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_189["MWI-COMP-189"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_189["MWI-COMP-189"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_189["MWI-COMP-189"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_189["MWI-COMP-189"] --> MWI_COMP_188["MWI-COMP-188"]
  MWI_COMP_190["MWI-COMP-190"] --> MWI_COMP_127["MWI-COMP-127"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_192["MWI-COMP-192"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_191["MWI-COMP-191"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_193["MWI-COMP-193"] --> MWI_COMP_194["MWI-COMP-194"]
  MWI_COMP_193["MWI-COMP-193"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_198["MWI-COMP-198"] --> MWI_COMP_195["MWI-COMP-195"]
  MWI_COMP_198["MWI-COMP-198"] --> MWI_COMP_196["MWI-COMP-196"]
  MWI_COMP_198["MWI-COMP-198"] --> MWI_COMP_197["MWI-COMP-197"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_200["MWI-COMP-200"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_199["MWI-COMP-199"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_201["MWI-COMP-201"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_202["MWI-COMP-202"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_204["MWI-COMP-204"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_204["MWI-COMP-204"] --> MWI_COMP_201["MWI-COMP-201"]
  MWI_COMP_204["MWI-COMP-204"] --> MWI_COMP_202["MWI-COMP-202"]
  MWI_COMP_204["MWI-COMP-204"] --> MWI_COMP_203["MWI-COMP-203"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_204["MWI-COMP-204"]
  MWI_COMP_206["MWI-COMP-206"] --> MWI_COMP_205["MWI-COMP-205"]
  MWI_COMP_208["MWI-COMP-208"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_208["MWI-COMP-208"] --> MWI_COMP_141["MWI-COMP-141"]
  MWI_COMP_208["MWI-COMP-208"] --> MWI_COMP_207["MWI-COMP-207"]
  MWI_COMP_209["MWI-COMP-209"] --> MWI_COMP_208["MWI-COMP-208"]
  MWI_COMP_209["MWI-COMP-209"] --> MWI_COMP_234["MWI-COMP-234"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_153["MWI-COMP-153"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_210["MWI-COMP-210"] --> MWI_COMP_209["MWI-COMP-209"]
  MWI_COMP_213["MWI-COMP-213"] --> MWI_COMP_211["MWI-COMP-211"]
  MWI_COMP_213["MWI-COMP-213"] --> MWI_COMP_212["MWI-COMP-212"]
  MWI_COMP_214["MWI-COMP-214"] --> MWI_COMP_212["MWI-COMP-212"]
  MWI_COMP_215["MWI-COMP-215"] --> MWI_COMP_213["MWI-COMP-213"]
  MWI_COMP_215["MWI-COMP-215"] --> MWI_COMP_214["MWI-COMP-214"]
  MWI_COMP_216["MWI-COMP-216"] --> MWI_COMP_212["MWI-COMP-212"]
  MWI_COMP_216["MWI-COMP-216"] --> MWI_COMP_215["MWI-COMP-215"]
  MWI_COMP_217["MWI-COMP-217"] --> MWI_COMP_216["MWI-COMP-216"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_153["MWI-COMP-153"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_218["MWI-COMP-218"] --> MWI_COMP_217["MWI-COMP-217"]
  MWI_COMP_221["MWI-COMP-221"] --> MWI_COMP_219["MWI-COMP-219"]
  MWI_COMP_221["MWI-COMP-221"] --> MWI_COMP_220["MWI-COMP-220"]
  MWI_COMP_222["MWI-COMP-222"] --> MWI_COMP_221["MWI-COMP-221"]
  MWI_COMP_223["MWI-COMP-223"] --> MWI_COMP_219["MWI-COMP-219"]
  MWI_COMP_223["MWI-COMP-223"] --> MWI_COMP_221["MWI-COMP-221"]
  MWI_COMP_223["MWI-COMP-223"] --> MWI_COMP_222["MWI-COMP-222"]
  MWI_COMP_224["MWI-COMP-224"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_224["MWI-COMP-224"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_224["MWI-COMP-224"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_224["MWI-COMP-224"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_224["MWI-COMP-224"] --> MWI_COMP_223["MWI-COMP-223"]
  MWI_COMP_227["MWI-COMP-227"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_227["MWI-COMP-227"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_227["MWI-COMP-227"] --> MWI_COMP_225["MWI-COMP-225"]
  MWI_COMP_227["MWI-COMP-227"] --> MWI_COMP_226["MWI-COMP-226"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_154["MWI-COMP-154"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_155["MWI-COMP-155"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_225["MWI-COMP-225"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_227["MWI-COMP-227"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_228["MWI-COMP-228"]
  MWI_COMP_229["MWI-COMP-229"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_232["MWI-COMP-232"] --> MWI_COMP_233["MWI-COMP-233"]
  MWI_COMP_237["MWI-COMP-237"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_238["MWI-COMP-238"] --> MWI_COMP_239["MWI-COMP-239"]
  MWI_COMP_240["MWI-COMP-240"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_240["MWI-COMP-240"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_240["MWI-COMP-240"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_240["MWI-COMP-240"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_242["MWI-COMP-242"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_243["MWI-COMP-243"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_244["MWI-COMP-244"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_245["MWI-COMP-245"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_241["MWI-COMP-241"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_242["MWI-COMP-242"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_247["MWI-COMP-247"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_248["MWI-COMP-248"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_249["MWI-COMP-249"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_246["MWI-COMP-246"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_249["MWI-COMP-249"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_251["MWI-COMP-251"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_320["MWI-COMP-320"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_321["MWI-COMP-321"]
  MWI_COMP_250["MWI-COMP-250"] --> MWI_COMP_322["MWI-COMP-322"]
  MWI_COMP_251["MWI-COMP-251"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_253["MWI-COMP-253"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_254["MWI-COMP-254"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_255["MWI-COMP-255"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_256["MWI-COMP-256"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_317["MWI-COMP-317"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_252["MWI-COMP-252"] --> MWI_COMP_325["MWI-COMP-325"]
  MWI_COMP_253["MWI-COMP-253"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_255["MWI-COMP-255"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_255["MWI-COMP-255"] --> MWI_COMP_319["MWI-COMP-319"]
  MWI_COMP_256["MWI-COMP-256"] --> MWI_COMP_257["MWI-COMP-257"]
  MWI_COMP_256["MWI-COMP-256"] --> MWI_COMP_258["MWI-COMP-258"]
  MWI_COMP_256["MWI-COMP-256"] --> MWI_COMP_259["MWI-COMP-259"]
  MWI_COMP_256["MWI-COMP-256"] --> MWI_COMP_318["MWI-COMP-318"]
  MWI_COMP_256["MWI-COMP-256"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_258["MWI-COMP-258"] --> MWI_COMP_323["MWI-COMP-323"]
  MWI_COMP_259["MWI-COMP-259"] --> MWI_COMP_324["MWI-COMP-324"]
  MWI_COMP_260["MWI-COMP-260"] --> MWI_COMP_178["MWI-COMP-178"]
  MWI_COMP_261["MWI-COMP-261"] --> MWI_COMP_198["MWI-COMP-198"]
  MWI_COMP_262["MWI-COMP-262"] --> MWI_COMP_092["MWI-COMP-092"]
  MWI_COMP_263["MWI-COMP-263"] --> MWI_COMP_073["MWI-COMP-073"]
  MWI_COMP_264["MWI-COMP-264"] --> MWI_COMP_026["MWI-COMP-026"]
  MWI_COMP_265["MWI-COMP-265"] --> MWI_COMP_028["MWI-COMP-028"]
  MWI_COMP_266["MWI-COMP-266"] --> MWI_COMP_252["MWI-COMP-252"]
  MWI_COMP_267["MWI-COMP-267"] --> MWI_COMP_240["MWI-COMP-240"]
  MWI_COMP_268["MWI-COMP-268"] --> MWI_COMP_236["MWI-COMP-236"]
  MWI_COMP_269["MWI-COMP-269"] --> MWI_COMP_030["MWI-COMP-030"]
  MWI_COMP_270["MWI-COMP-270"] --> MWI_COMP_241["MWI-COMP-241"]
  MWI_COMP_271["MWI-COMP-271"] --> MWI_COMP_079["MWI-COMP-079"]
  MWI_COMP_272["MWI-COMP-272"] --> MWI_COMP_081["MWI-COMP-081"]
  MWI_COMP_273["MWI-COMP-273"] --> MWI_COMP_082["MWI-COMP-082"]
  MWI_COMP_274["MWI-COMP-274"] --> MWI_COMP_246["MWI-COMP-246"]
  MWI_COMP_275["MWI-COMP-275"] --> MWI_COMP_237["MWI-COMP-237"]
  MWI_COMP_276["MWI-COMP-276"] --> MWI_COMP_086["MWI-COMP-086"]
  MWI_COMP_277["MWI-COMP-277"] --> MWI_COMP_250["MWI-COMP-250"]
  MWI_COMP_278["MWI-COMP-278"] --> MWI_COMP_191["MWI-COMP-191"]
  MWI_COMP_279["MWI-COMP-279"] --> MWI_COMP_193["MWI-COMP-193"]
  MWI_COMP_280["MWI-COMP-280"] --> MWI_COMP_199["MWI-COMP-199"]
  MWI_COMP_281["MWI-COMP-281"] --> MWI_COMP_023["MWI-COMP-023"]
  MWI_COMP_282["MWI-COMP-282"] --> MWI_COMP_041["MWI-COMP-041"]
  MWI_COMP_283["MWI-COMP-283"] --> MWI_COMP_093["MWI-COMP-093"]
  MWI_COMP_284["MWI-COMP-284"] --> MWI_COMP_043["MWI-COMP-043"]
  MWI_COMP_285["MWI-COMP-285"] --> MWI_COMP_238["MWI-COMP-238"]
  MWI_COMP_286["MWI-COMP-286"] --> MWI_COMP_025["MWI-COMP-025"]
  MWI_COMP_287["MWI-COMP-287"] --> MWI_COMP_087["MWI-COMP-087"]
  MWI_COMP_288["MWI-COMP-288"] --> MWI_COMP_088["MWI-COMP-088"]
  MWI_COMP_289["MWI-COMP-289"] --> MWI_COMP_127["MWI-COMP-127"]
  MWI_COMP_290["MWI-COMP-290"] --> MWI_COMP_133["MWI-COMP-133"]
  MWI_COMP_291["MWI-COMP-291"] --> MWI_COMP_132["MWI-COMP-132"]
  MWI_COMP_292["MWI-COMP-292"] --> MWI_COMP_135["MWI-COMP-135"]
  MWI_COMP_293["MWI-COMP-293"] --> MWI_COMP_138["MWI-COMP-138"]
  MWI_COMP_294["MWI-COMP-294"] --> MWI_COMP_134["MWI-COMP-134"]
  MWI_COMP_295["MWI-COMP-295"] --> MWI_COMP_136["MWI-COMP-136"]
  MWI_COMP_296["MWI-COMP-296"] --> MWI_COMP_139["MWI-COMP-139"]
  MWI_COMP_297["MWI-COMP-297"] --> MWI_COMP_137["MWI-COMP-137"]
  MWI_COMP_298["MWI-COMP-298"] --> MWI_COMP_131["MWI-COMP-131"]
  MWI_COMP_299["MWI-COMP-299"] --> MWI_COMP_140["MWI-COMP-140"]
  MWI_COMP_300["MWI-COMP-300"] --> MWI_COMP_141["MWI-COMP-141"]
  MWI_COMP_301["MWI-COMP-301"] --> MWI_COMP_144["MWI-COMP-144"]
  MWI_COMP_302["MWI-COMP-302"] --> MWI_COMP_148["MWI-COMP-148"]
  MWI_COMP_303["MWI-COMP-303"] --> MWI_COMP_150["MWI-COMP-150"]
  MWI_COMP_304["MWI-COMP-304"] --> MWI_COMP_183["MWI-COMP-183"]
  MWI_COMP_305["MWI-COMP-305"] --> MWI_COMP_051["MWI-COMP-051"]
  MWI_COMP_306["MWI-COMP-306"] --> MWI_COMP_185["MWI-COMP-185"]
  MWI_COMP_307["MWI-COMP-307"] --> MWI_COMP_189["MWI-COMP-189"]
  MWI_COMP_308["MWI-COMP-308"] --> MWI_COMP_190["MWI-COMP-190"]
  MWI_COMP_309["MWI-COMP-309"] --> MWI_COMP_210["MWI-COMP-210"]
  MWI_COMP_310["MWI-COMP-310"] --> MWI_COMP_218["MWI-COMP-218"]
  MWI_COMP_311["MWI-COMP-311"] --> MWI_COMP_224["MWI-COMP-224"]
  MWI_COMP_312["MWI-COMP-312"] --> MWI_COMP_231["MWI-COMP-231"]
  MWI_COMP_313["MWI-COMP-313"] --> MWI_COMP_230["MWI-COMP-230"]
  MWI_COMP_314["MWI-COMP-314"] --> MWI_COMP_232["MWI-COMP-232"]
  MWI_COMP_315["MWI-COMP-315"] --> MWI_COMP_235["MWI-COMP-235"]
```

Unresolved external tags remain listed in individual component documents and are not falsely connected.

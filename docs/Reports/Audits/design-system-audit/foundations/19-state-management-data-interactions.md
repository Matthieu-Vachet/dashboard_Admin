# State management, data dependencies and interaction triggers

## Hooks

- `useCallback`
- `useDashboardPalette`
- `useDashboardVersionHistory`
- `useDroppable`
- `useEffect`
- `useJavascriptLearning`
- `useMemo`
- `usePathname`
- `usePersistentState`
- `useSensor`
- `useSensors`
- `useSortable`
- `useState`
- `useTheme`

## localStorage keys

- `matweb-theme`
- `matweb.analytics.widgets`
- `matweb.home.widgetOrder`
- `matweb.mongo.widgetOrder`
- `matweb.pokemonAdmin.widgetOrder`
- `matweb.tools.widgets`

## API references

- `/api/admin/events`
- `/api/admin/events/import`
- `/api/admin/events/scrape`
- `/api/checklist-v3`
- `/api/dashboard-backlog`
- `/api/dashboard-backlog/${editingId}`
- `/api/dashboard-backlog/${ticket.id}`
- `/api/dashboard-redeploy`
- `/api/dashboard-store`
- `/api/data`
- `/api/database-stats`
- `/api/events`
- `/api/learning`
- `/api/learning/activity`
- `/api/learning/export?scope=achievements`
- `/api/learning/export?scope=all`
- `/api/learning/export?scope=curriculum`
- `/api/learning/export?scope=projects`
- `/api/learning/import`
- `/api/learning/imports`
- `/api/learning/progress`
- `/api/learning/progress/migrate`
- `/api/learning/topics`
- `/api/logout`
- `/api/moves`
- `/api/pokemon`
- `/api/pokemon-admin`
- `/api/pokemon-api-health`
- `/api/pokemon-api-proxy`
- `/api/pokemon-stats`
- `/api/session`
- `/api/types`
- `/api/v1`
- `/api/v1/admin/`
- `/api/v1/admin/${domain}/regenerate`
- `/api/v1/admin/eggs/regenerate`
- `/api/v1/admin/max-battles/regenerate`
- `/api/v1/admin/pvp-rankings/regenerate`
- `/api/v1/admin/raids/regenerate`
- `/api/v1/admin/research/regenerate`
- `/api/v1/admin/rocket/regenerate`
- `/api/v1/admin/shiny/regenerate`
- `/api/v1/eggs`
- `/api/v1/max-battles`
- `/api/v1/raids`
- `/api/v1/research`
- `/api/v1/rocket`
- `/api/v1/shiny`

## Per-component state

| Component | Local state initializers | Events |
|---|---|---|
| MWI-COMP-015 | selectedId = null | onChange, onClick, onClose |
| MWI-COMP-023 | loading = true, metrics = null | Not found |
| MWI-COMP-026 | color = "#20d3ff", copied = "" | onChange, onClick, onCopy |
| MWI-COMP-027 | Not found | onClick |
| MWI-COMP-028 | copiedId = null, running = false, secondsLeft = focusMinutes * 60 | onChange, onClick |
| MWI-COMP-030 | metrics = null | Not found |
| MWI-COMP-031 | Not found | onClick |
| MWI-COMP-041 | mode = "focus", running = false, secondsLeft = durations.focus | onClick |
| MWI-COMP-043 | copiedId = null, editing = null, query = "" | onChange, onClick, onClose, onSave |
| MWI-COMP-044 | Not found | onChange, onClick, onClose |
| MWI-COMP-045 | Not found | onChange, onClick |
| MWI-COMP-046 | Not found | onChange, onClick |
| MWI-COMP-047 | Not found | onChange |
| MWI-COMP-048 | Not found | onChange |
| MWI-COMP-049 | Not found | onChange |
| MWI-COMP-050 | failed = false | onError |
| MWI-COMP-051 | busy = "", compact = false, cursor = new Date(, dateFilter = "", draft = (, editorOpen = false, events = defaultPokemonEvents, importOpen = false, importText = "", loading = false, meta = { configured: false, seeded: true, collection: "events" }, query = "", selectedEvent = null, statusFilter = "all", typeFilter = "all", view = "calendar" | onArchive, onChange, onClick, onClose, onCreate, onDelete, onDuplicate, onEdit, onImport, onOpen, onOpenDay, onOpenPokemon, onRestore, onSave |
| MWI-COMP-053 | Not found | onCreate, onOpen, onOpenDay |
| MWI-COMP-054 | Not found | onClick, onOpen |
| MWI-COMP-055 | Not found | onClick |
| MWI-COMP-056 | Not found | onClick |
| MWI-COMP-057 | Not found | onOpen |
| MWI-COMP-058 | open = defaultOpen | onClick, onOpen |
| MWI-COMP-059 | Not found | onClick |
| MWI-COMP-060 | Not found | onClick |
| MWI-COMP-064 | Not found | onClick, onOpenPokemon |
| MWI-COMP-066 | Not found | onOpenPokemon |
| MWI-COMP-067 | Not found | onClick |
| MWI-COMP-068 | Not found | onOpenPokemon |
| MWI-COMP-069 | Not found | onOpenPokemon |
| MWI-COMP-073 | categoryFilter = "Toutes", confirmDelete = false, cursor = new Date(, modalOpen = false, selectedDate = new Date(, selectedEventId = initialEvents[0]?.id, statusFilter = "Tous", view = "mois" | onChange, onClick, onClose, onOpen, onSelect |
| MWI-COMP-074 | Not found | onClick |
| MWI-COMP-075 | Not found | onClick |
| MWI-COMP-076 | Not found | onClick |
| MWI-COMP-077 | Not found | onOpen |
| MWI-COMP-078 | Not found | onClick |
| MWI-COMP-079 | activeLevel = "Tous" | onChange, onClick |
| MWI-COMP-081 | importOpen = false, selectedTopicId = null | onChanged, onClick, onClose, onNotify, onOpen, onSetProgress |
| MWI-COMP-082 | activeTaskId = null, confirmDelete = false, selectedTaskId = null | onChange, onClick, onClose, onDelete, onDragCancel, onDragEnd, onDragStart, onSelect |
| MWI-COMP-083 | Not found | onDelete, onSelect |
| MWI-COMP-084 | Not found | onClick |
| MWI-COMP-086 | confirmDelete = false, query = "", selectedId = initialNotes[0]?.id, sortKey = "updated" | onChange, onClick |
| MWI-COMP-087 | filter = "all", title = "" | onChange, onClick, onKeyDown |
| MWI-COMP-088 | confirmDelete = false, preview = true, selectedId = initialWriterDocuments[0]?.id \|\| "" | onChange, onClick |
| MWI-COMP-089 | Not found | onClick |
| MWI-COMP-092 | collapsed = false, sidebarOpen = false, versionHistoryOpen = false | onClick, onClose, onCloseMobile, onOpenSidebar, onOpenVersionHistory, onToggleCollapsed, onToggleNavGroup, onVersionClick |
| MWI-COMP-094 | Not found | onClick |
| MWI-COMP-098 | Not found | onClose, onNotify, onSetProgress |
| MWI-COMP-099 | Not found | onSetProgress |
| MWI-COMP-100 | Not found | onSetProgress |
| MWI-COMP-101 | answer = item.answer \|\| "", correctionVisible = false | onChange, onClick, onSetProgress |
| MWI-COMP-102 | Not found | onSetProgress |
| MWI-COMP-103 | Not found | onSetProgress |
| MWI-COMP-105 | Not found | onClick |
| MWI-COMP-115 | file = null, history = [], issues = [], loading = false, message = null, raw = "", strategy = "create", topic = null | onChange, onClick, onClose, onDragOver, onDrop |
| MWI-COMP-116 | Not found | onChange |
| MWI-COMP-119 | Not found | onClick |
| MWI-COMP-121 | paletteOpen = false | onClick |
| MWI-COMP-122 | Not found | onClick, onNavigate |
| MWI-COMP-123 | Not found | onClick |
| MWI-COMP-124 | Not found | onClick |
| MWI-COMP-125 | Not found | onClick |
| MWI-COMP-126 | Not found | onChange, onClick, onOpen |
| MWI-COMP-127 | active = "overview", assetAudit = null, assetChecks = {}, assetLimit = initialAssetLimit, assetTab = "all", authError = "", bootstrap = { loading: false, payload: null, error: "" }, bulkOnlyIssues = true, catalog = null, collections = [], compareA = "", compareB = "", customRules = [], deployHistory = [], deployHistoryOpen = false, detail = null, eggs = null, eggsLoading = false, eggsRegenerating = false, extraPanel = null, ficheFilter = "all", ficheLimit = initialFicheLimit, generationFilter = "all", history = [], itemsReference = null, maxBattles = null, maxBattlesLoading = false, maxBattlesRegenerating = false, password = "", pvpOptions = initialPvpOptions, pvpRankings = null, pvpRankingsLoading = false, pvpRankingsRegenerating = false, raids = null, raidsLoading = false, raidsRegenerating = false, redeployingDashboard = false, research = null, researchLoading = false, researchRegenerating = false, rocket = null, rocketLoading = false, rocketRegenerating = false, rocketTexts = null, ruleForm = { ...defaultRuleForm }, ruleMessage = "", rulePreview = null, rulesSyncing = false, search = "", selectedEntry = null, selectedIndex = -1, session = { loading: true, authenticated: false }, shiny = null, shinyLoading = false, shinyOptions = initialShinyOptions, shinyRegenerating = false, sourceHistory = [], sourceHistoryOpen = false, sourceWatch = null | onAssetAudit, onAssetChecked, onAuditUrls, onChange, onClick, onClose, onCopyPatch, onDelete, onDownload, onEdit, onFormChange, onLoadHistory, onNext, onOpen, onOpenDeployHistory, onOpenEntry, onOpenPokemon, onOpenRelated, onOpenSourceHistory, onOptionsChange, onPasswordChange, onPreview, onPrevious, onRefresh, onRegenerate, onSave, onSelect, onSubmit, onSyncGithub, onToggle |
| MWI-COMP-129 | openGroups = [activeGroup], query = "" | onChange, onClick |
| MWI-COMP-130 | editingId = null, editingText = "", newTodo = "", storageState = "loading", todos = [] | onChange, onClick, onKeyDown |
| MWI-COMP-134 | Not found | onClick |
| MWI-COMP-137 | Not found | onClick |
| MWI-COMP-138 | Not found | onOpen |
| MWI-COMP-142 | Not found | onClick |
| MWI-COMP-143 | preview = null | onClose, onOpen, onPreview |
| MWI-COMP-144 | Not found | onClick |
| MWI-COMP-147 | open = false | onClick |
| MWI-COMP-148 | catalogSearch = "", tab = "moves" | onChange, onClick, onOpen |
| MWI-COMP-150 | activeId = collections[0]?.id \|\| "", collectionView = { key: "", limit: initialCollectionLimit }, draft = {     name: "",     type: "normal",     variantMode: "multi",     shiny: false,     hundo: false,   }, modalOpen = false, query = "", region = "all", status = "all" | onChange, onClick, onDoubleClick |
| MWI-COMP-153 | calendarEvents = [] | Not found |
| MWI-COMP-154 | Not found | onChange, onClick |
| MWI-COMP-168 | Not found | onClick |
| MWI-COMP-169 | Not found | onClick |
| MWI-COMP-170 | Not found | onClick |
| MWI-COMP-171 | Not found | onClick |
| MWI-COMP-172 | preview = null | onClick |
| MWI-COMP-177 | Not found | onChange, onClick |
| MWI-COMP-178 | activeTab = "overview" | onAssetAudit, onAssetChecked, onAuditUrls, onClick, onCopyPatch, onNext, onOpenRelated, onPrevious |
| MWI-COMP-181 | Not found | onClick |
| MWI-COMP-182 | Not found | onOpenPokemon |
| MWI-COMP-183 | query = "", rareOnly = false, shinyOnly = false | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-185 | Not found | onChange, onSubmit |
| MWI-COMP-187 | Not found | onClick |
| MWI-COMP-188 | Not found | onOpenPokemon |
| MWI-COMP-189 | gigantamaxOnly = false, query = "", shinyOnly = false | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-191 | body = "{}", endpoints = adminEndpoints, error = "", loading = false, method = "GET", path = "/health", registryError = "", result = null, selectedId = "" | onChange, onClick |
| MWI-COMP-193 | health = fallbackHealth | Not found |
| MWI-COMP-198 | Not found | onChange, onClick |
| MWI-COMP-199 | query = "", selectedSlug = docs[0]?.slug \|\| "" | onChange, onClick |
| MWI-COMP-204 | Not found | onClick |
| MWI-COMP-205 | Not found | onChange |
| MWI-COMP-206 | expanded = "" | onChange, onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-208 | Not found | onClick |
| MWI-COMP-209 | Not found | onOpenPokemon |
| MWI-COMP-210 | query = "", shinyOnly = false, unmatchedOnly = false | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-217 | open = Boolean(defaultOpen | onToggle |
| MWI-COMP-218 | eventOnly = false, pokemonOnly = false, query = "", unmatchedOnly = false | onClick, onQueryChange |
| MWI-COMP-221 | Not found | onClick |
| MWI-COMP-222 | Not found | onOpenPokemon |
| MWI-COMP-223 | open = Boolean(defaultOpen | onOpenPokemon, onToggle |
| MWI-COMP-224 | bossOnly = false, query = "", shinyOnly = false | onClick, onOpenPokemon, onQueryChange |
| MWI-COMP-227 | Not found | onClick |
| MWI-COMP-228 | Not found | onClick |
| MWI-COMP-229 | history = { points: [], statistics: null }, selected = null | onChange, onClick, onClose, onOpen, onOpenPokemon, onQueryChange |
| MWI-COMP-230 | Not found | onClick |
| MWI-COMP-231 | Not found | onClick |
| MWI-COMP-234 | open = defaultOpen | onClick |
| MWI-COMP-235 | Not found | onClick |
| MWI-COMP-236 | Not found | onClick |
| MWI-COMP-238 | Not found | onClick, onDragEnd, onHide |
| MWI-COMP-239 | Not found | onClick |
| MWI-COMP-240 | mounted = false | Not found |
| MWI-COMP-241 | error = "", loading = true, stats = fallbackStats | onClick |
| MWI-COMP-250 | metrics = null, mounted = false | Not found |
| MWI-COMP-252 | componentFilter = "all", configured = true, confirmDelete = false, copied = "", draft = emptyDraft, editingId = null, error = "", loading = true, modalOpen = false, pageFilter = "all", priorityFilter = "all", query = "", saving = false, sortKey = "recent", statusFilter = "all", tickets = [], typeFilter = "all" | onArchive, onChange, onClick, onClose, onCopy, onDelete, onEdit, onMarkDone, onSave, onUpdate |
| MWI-COMP-254 | Not found | onChange |
| MWI-COMP-255 | Not found | onClick |
| MWI-COMP-256 | Not found | onChange, onClick |
| MWI-COMP-257 | Not found | onChange |
| MWI-COMP-258 | Not found | onChange |
| MWI-COMP-259 | Not found | onChange |
| MWI-COMP-325 | Not found | onClick |

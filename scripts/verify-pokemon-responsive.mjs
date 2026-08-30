import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = process.env.POKEMON_RESPONSIVE_BASE_URL || "http://localhost:3100";
const artifactRoot = path.join(root, "test-results/pokemon-responsive");
const widths = [320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920];
const themes = ["dark", "light"];
mkdirSync(artifactRoot, { recursive: true });

function readEnvironment() {
  const file = path.join(root, ".env.local");
  if (!existsSync(file)) return {};
  return Object.fromEntries(readFileSync(file, "utf8").split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) return [];
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    return [[match[1], value]];
  }));
}

const artwork = "/assets/ui/branding/zygardDexLogo.png";
const pokemon = (dexNr, name, type = "NORMAL") => ({
  id: name.toUpperCase(), formId: name.toUpperCase(), dexNr, names: { French: name, English: name }, types: [type],
  assets: { image: artwork, shinyImage: artwork }, canonicalId: `${name.toUpperCase()}_NORMAL`, resolutionStatus: "matched",
});
const shinyEntries = [
  [1, 498, "Gruikui", "FIRE", 1_220_000, "1 in 510"],
  [2, 650, "Marisson", "GRASS", 1_180_000, "1 in 243"],
  [3, 656, "Grenousse", "WATER", 1_120_000, "1 in 236"],
  [4, 495, "Vipélierre", "GRASS", 1_020_000, "1 in 508"],
].map(([rank, dexNr, name, type, daily, odds]) => ({
  rank, rankTotal: 381, sourceIdentity: { id: String(dexNr), name, variantKey: `${dexNr}-normal` }, pokemon: pokemon(dexNr, name, type),
  stats: { daily, dailyAverage: daily / 5, weekly: daily * 7, monthly: daily * 20, allTime: daily * 80 },
  shiny: { odds: { raw: odds, denominator: Number(String(odds).split(" ").at(-1)) }, seen: 1_000, ratePercent: 0.4, rarity: "Fixture" },
  source: { trend: "flat" }, lastSeenAt: "2026-07-25T04:05:00.000Z",
}));
const eventNow = Date.now();
const event = {
  id: "fixture-shadow-palkia", sourceId: "fixture-shadow-palkia", title: "Shadow Palkia in Shadow Raids", category: "Raid Battles", source: "leekduck",
  startDate: new Date(eventNow - 24 * 60 * 60 * 1_000).toISOString(), endDate: new Date(eventNow + 24 * 60 * 60 * 1_000).toISOString(), description: "Raid Battles – Shadow Palkia in Shadow Raids",
  featuredPokemon: [{ name: "Palkia", src: artwork }], bonuses: [], rewards: [], sections: [], links: [], status: "active",
};
const pvpMimikyu = {
  rank: 1,
  pokemonRef: "MIMIKYU_BUSTED",
  sourceIdentity: { speciesId: "mimikyu", speciesName: "Mimikyu (Busted)" },
  pokemon: { ...pokemon(778, "Mimiqui", "GHOST"), types: ["GHOST", "FAIRY"], identity: { canonicalId: "MIMIKYU_BUSTED" } },
  score: 95.9,
  rating: 778,
  roleScores: { lead: 100, switch: 100, charger: 97.7, closer: 100, consistency: 94.2, attacker: 92.5 },
  rank1: { statProduct: 1863, stats: { attack: 120.076, defense: 143.686, stamina: 108 } },
  pvp: { cpTarget: 1500, level: 25.5, cp: 1500, ivs: { attack: 1, defense: 14, stamina: 15 }, buddyDistanceKm: 5, secondChargedMoveCost: { stardust: 75_000, candy: 75 }, allMoves: { fast: ["SHADOW_CLAW_FAST"], charged: ["SHADOW_SNEAK", "DRAIN_PUNCH"] } },
  moveset: { fast: "SHADOW_CLAW_FAST", charged: ["SHADOW_SNEAK"] },
  matchups: [], counters: [], editor: { score: 95, notes: { English: "Fixture PvP responsive." } },
};
const pvpDataset = {
  league: "great",
  formats: [{ id: "great", label: "Ligue Super", category: "standards", cp: 1500 }],
  roles: [{ id: "overall", label: "Classement total" }],
  references: {
    pokemon: {},
    types: {},
    moves: {
      SHADOW_CLAW_FAST: { id: "SHADOW_CLAW_FAST", names: { French: "Griffe Ombre" }, type: "GHOST", combat: { power: 6, energy: 8, turns: 2, buffs: null } },
      SHADOW_SNEAK: { id: "SHADOW_SNEAK", names: { French: "Ombre Portée" }, type: "GHOST", combat: { power: 50, energy: -50, turns: 1, buffs: null } },
      DRAIN_PUNCH: { id: "DRAIN_PUNCH", names: { French: "Vampi-Poing" }, type: "FIGHTING", combat: { power: 40, energy: -40, turns: 1, buffs: { activationChance: 100, attackerDefenseStatsChange: 1 } } },
    },
  },
  rankings: [pvpMimikyu],
};
const gblDataset = {
  season: { name: "Toujours en avant", start: "2026-06-02T20:00:00.000Z", end: "2026-09-08T20:00:00.000Z" },
  periods: [{ id: "fixture-current", dateLabel: "21 juil. – 28 juil.", start: "2026-07-21T20:00:00.000Z", end: "2026-07-28T20:00:00.000Z", status: "current", bonuses: [{ id: "stardust", label: "Poussière bonus" }], competitions: [{ order: 1, sourceName: "Ligue Super", tier: "great", cup: "great", cpCap: 1500, eligibleTypes: [], restrictions: [], iconUrl: artwork }, { order: 2, sourceName: "Ligue Master", tier: "master", cup: "master", cpCap: 10000, eligibleTypes: [], restrictions: ["Sans Mythiques/Légendaires"], iconUrl: artwork }] }],
};

async function json(route, body, status = 200) {
  await route.fulfill({ status, contentType: "application/json", body: JSON.stringify(body) });
}

function datasetEnvelope(data, total) {
  return { data: { data, meta: { page: 1, limit: 100, total, pages: total ? 1 : 0 }, current: { key: "current", generatedAt: "2026-07-26T10:00:00.000Z" } } };
}

async function installRoutes(page) {
  await page.route("**/api/dashboard-store**", async (route) => route.request().method() === "GET"
    ? json(route, { data: { configured: false, value: null } })
    : json(route, { data: { configured: false, saved: false } }));
  await page.route("**/api/dashboard-redeploy**", (route) => json(route, { data: { history: [] } }));
  await page.route("**/api/pokemon-stats", (route) => json(route, { source: "fixture", status: "ok", total: 1605, complete: 1605, issues: 0, quality: 100, catalog: { types: 18, weather: 7, stickers: 0, moves: 0 }, generations: [], kinds: [] }));
  await page.route("**/api/pokemon-api-health", (route) => json(route, { data: { connected: true, api: "ok", database: "fixture", statusCode: 200, uptimeSeconds: 600, timestamp: "2026-07-26T10:00:00.000Z", label: "API stable" } }));
  await page.route("**/api/admin/community-days/sync", (route) => json(route, { data: { imported: 1, warnings: [] } }));
  await page.route("**/api/admin/events**", (route) => json(route, { data: { events: [event], configured: true, seeded: false, collection: "events" } }));
  await page.route("**/api/events**", (route) => json(route, { data: { events: [event], configured: true } }));
  await page.route("**/api/pokemon-admin**", async (route) => {
    const url = new URL(route.request().url());
    const action = url.searchParams.get("action") || "bootstrap";
    if (action === "session") return json(route, { data: { authenticated: true } });
    if (["history", "custom-rules", "source-history", "data-deploy-history"].includes(action)) return json(route, { data: [] });
    if (action === "assets") return json(route, { data: { goAssets: [], proposals: [], shuffleAssets: [], unused: [], totals: {} } });
    if (action === "catalog") return json(route, { data: { types: [], weather: [] } });
    if (action === "source-watch") return json(route, { data: { sources: [], history: [] } });
    if (action === "items") return json(route, { data: { data: { items: [] } } });
    if (action === "best-defenders") return json(route, datasetEnvelope({ metadata: { total: 3, sourceUrl: "https://db.pokemongohub.net/fr/best/gym-defenders" }, tiers: [{ id: "S", total: 2 }, { id: "A+", total: 1 }], rankings: [
      { rank: 1, tier: "S", score: 83_800, scoreLabel: "83.8k", source: { name: "Leuphorie", slug: "242", url: "https://example.test/242" }, pokemon: pokemon(242, "Leuphorie", "NORMAL") },
      { rank: 2, tier: "S", score: 62_300, scoreLabel: "62.3k", source: { name: "Leveinard", slug: "113", url: "https://example.test/113" }, pokemon: pokemon(113, "Leveinard", "NORMAL") },
      { rank: 1, tier: "A+", score: 55_800, scoreLabel: "55.8k", source: { name: "Ronflex", slug: "143", url: "https://example.test/143" }, pokemon: pokemon(143, "Ronflex", "NORMAL") },
    ] }, 3));
    if (action === "shiny") return json(route, datasetEnvelope({ rankings: shinyEntries, podium: shinyEntries.slice(0, 3), summary: { today: 381, total: 381, rare: 50 } }, shinyEntries.length));
    if (action === "pvp-rankings") return json(route, datasetEnvelope(pvpDataset, 1));
    if (action === "pvp-teammates") return json(route, { data: { data: [{ rankOrOrder: 1, rawName: "Forgelina", providerAlias: "tinkaton", canonicalId: "TINKATON_NORMAL", resolutionStatus: "matched", pokemon: pokemon(959, "Forgelina", "FAIRY") }] } });
    if (action === "gbl-calendar") return json(route, datasetEnvelope(gblDataset, 1));
    if (action === "identity-manager-providers") return json(route, { data: [
      { id: "pokemon-go-hub", label: "Pokémon GO Hub", domains: ["best-defenders"], visibility: "public", status: "active", aliases: 2, activeAliases: 2, openDiagnostics: 1, occurrences: 2 },
      { id: "margxt", label: "Margxt", domains: ["pokemon-availability", "pokemon-shiny-availability", "pokemon-shadow-availability"], visibility: "private", status: "active", aliases: 4, activeAliases: 4, openDiagnostics: 193, occurrences: 193 },
    ] });
    if (action === "identity-manager-sync-preview") return json(route, { data: {
      mode: "dry-run", inventory: { schemaVersion: 1, fingerprint: "fixture-catalog-fingerprint", total: 1605, issues: 0 },
      before: { identities: 1605, aliases: 7 }, after: { identities: 1605, aliases: 7 },
      create: 0, update: 0, unchanged: 1605, orphan: 0, conflict: 0, aliasesPreserved: 7, conflicts: [], mewtwoArmored: "present",
    } });
    if (action === "identity-manager-conflicts") return json(route, { data: { data: { explicitConflicts: 0, aliasConflicts: [] } } });
    if (action.startsWith("identity-manager")) return json(route, { data: { data: [], meta: { page: 1, limit: 24, total: 0, pages: 1, stats: { providers: [], statuses: {} } } } });
    if (action === "pokemon-identity-mappings") return json(route, datasetEnvelope({ mappings: [] }, 0));
    if (["raids", "eggs", "max-battles", "rocket", "research", "best-attackers"].includes(action)) return json(route, datasetEnvelope({ entries: [], rankings: [], raids: [], eggs: [], battles: [], profiles: [], research: [] }, 0));
    return json(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {}, sourceWatch: { sources: [] } } });
  });
}

async function authenticate(browser) {
  const credentials = readEnvironment();
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page = await context.newPage();
  await installRoutes(page);
  await page.goto(`${baseUrl}/login?next=/`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/", { timeout: 20_000 }),
    page.locator('button[type="submit"]').click(),
  ]);
  const cookies = await context.cookies();
  await context.close();
  return cookies;
}

async function assertNoOverflow(page, label) {
  const measurement = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll("body *")].flatMap((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return rect.right > viewport + 1 && style.position !== "fixed" && style.position !== "absolute"
        ? [{ tag: element.tagName, text: element.textContent?.replace(/\s+/g, " ").trim().slice(0, 60), right: Math.round(rect.right), width: Math.round(rect.width) }]
        : [];
    }).slice(0, 5);
    return { viewport, root: document.documentElement.scrollWidth, body: document.body.scrollWidth, offenders };
  });
  assert.ok(measurement.root <= measurement.viewport + 1, `${label}: overflow racine ${JSON.stringify(measurement)}`);
  assert.ok(measurement.body <= measurement.viewport + 1, `${label}: overflow body ${JSON.stringify(measurement)}`);
  return measurement;
}

const scenarios = [
  { id: "overview", path: "/", ready: /Voici ce qui demande votre attention aujourd’hui/ },
  { id: "best-defenders", path: "/best-defenders", ready: /Best Defenders/ },
  { id: "removed-costume-audit", path: "/pokemon-admin?section=costume-audit", ready: /Voici ce qui demande votre attention aujourd’hui/ },
  { id: "shiny", path: "/shiny-tracker", ready: /Shiny Tracker/ },
  { id: "pvp-rankings", path: "/pvp-rankings", ready: /Classements PvP/, pvpDetail: true },
  { id: "pvp-simulator", path: "/pvp-simulator", ready: /POKÉMON GO · MOTEUR NATIF/, battleLab: true },
  { id: "gbl-calendar", path: "/gbl-calendar", ready: /Saison Toujours en avant/ },
  { id: "identity-manager", path: "/identity-manager", ready: /Identity Manager/ },
  { id: "variants", path: "/pokemon-identity-mappings", ready: /Résolution/ },
  { id: "events", path: "/events", ready: /Calendrier Events Pokémon GO/, eventModal: true },
];

const browser = await chromium.launch();
const results = [];
try {
  const cookies = await authenticate(browser);
  for (const theme of themes) {
    for (const width of widths) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 932 : 1000 }, colorScheme: theme, storageState: { cookies, origins: [] } });
      await context.addInitScript((selectedTheme) => {
        localStorage.setItem("matweb-theme", selectedTheme);
        localStorage.setItem("pokedex-v4-admin-collections", "[]");
      }, theme);
      for (const scenario of scenarios) {
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        const failedRequests = [];
        const failedResponses = [];
        const pokemonAdminActions = [];
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        page.on("pageerror", (error) => pageErrors.push(error.message));
        page.on("requestfailed", (request) => {
          const errorText = request.failure()?.errorText || "échec inconnu";
          const requestUrl = new URL(request.url());
          const isCancelledRscPrefetch = request.method() === "GET"
            && errorText === "net::ERR_ABORTED"
            && requestUrl.searchParams.has("_rsc");
          if (!isCancelledRscPrefetch) {
            failedRequests.push(`${request.method()} ${request.url()} · ${errorText}`);
          }
        });
        page.on("response", (response) => {
          if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.request().method()} ${response.url()}`);
        });
        page.on("request", (request) => {
          if (request.method() !== "POST" || new URL(request.url()).pathname !== "/api/pokemon-admin") return;
          try {
            const action = JSON.parse(request.postData() || "{}").action;
            if (action) pokemonAdminActions.push(action);
          } catch {}
        });
        await installRoutes(page);
        await page.goto(`${baseUrl}${scenario.path}`, { waitUntil: "domcontentloaded" });
        await page.getByText(scenario.ready).filter({ visible: true }).first().waitFor({ timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(200);
        const overlayLocator = page.locator('[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay');
        const overlay = await overlayLocator.count();
        const overlayDetails = overlay ? await overlayLocator.allTextContents() : [];
        assert.equal(overlay, 0, `${scenario.id}-${theme}-${width}: overlay framework ${JSON.stringify(overlayDetails)}`);
        const overflow = await assertNoOverflow(page, `${scenario.id}-${theme}-${width}`);
        if (scenario.id === "overview") {
          const attentionGeometry = await page.evaluate(() => {
            const rect = (selector) => {
              const bounds = document.querySelector(selector)?.getBoundingClientRect();
              return bounds ? { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height } : null;
            };
            const buttons = [...document.querySelectorAll('[data-testid="home-attention-actions"] > button')]
              .map((button) => { const bounds = button.getBoundingClientRect(); return { x: bounds.x, y: bounds.y, width: bounds.width, height: bounds.height }; });
            return {
              panel: rect('[data-testid="home-attention-panel"]'),
              summary: rect('[data-testid="home-attention-summary"]'),
              tools: rect('[data-testid="home-attention-tools"]'),
              buttons,
            };
          });
          assert.ok(attentionGeometry.panel && attentionGeometry.summary && attentionGeometry.tools, `overview-${theme}-${width}: structure attention absente`);
          assert.equal(attentionGeometry.buttons.length, 4, `overview-${theme}-${width}: actions attention incomplètes`);
          const buttonWidths = attentionGeometry.buttons.map((button) => Math.round(button.width));
          assert.ok(Math.max(...buttonWidths) - Math.min(...buttonWidths) <= 1, `overview-${theme}-${width}: largeurs CTA déséquilibrées ${buttonWidths}`);
          if (width >= 640) {
            const rows = new Set(attentionGeometry.buttons.map((button) => Math.round(button.y)));
            assert.equal(rows.size, 2, `overview-${theme}-${width}: les CTA doivent former deux rangées équilibrées`);
          } else {
            const columns = new Set(attentionGeometry.buttons.map((button) => Math.round(button.x)));
            assert.equal(columns.size, 1, `overview-${theme}-${width}: les CTA mobiles doivent rester sur une colonne`);
          }
          if (width >= 1280) {
            assert.ok(Math.abs(attentionGeometry.summary.height - attentionGeometry.tools.height) <= 1, `overview-${theme}-${width}: colonnes MacBook non alignées ${JSON.stringify(attentionGeometry)}`);
            assert.ok(attentionGeometry.summary.x < attentionGeometry.tools.x, `overview-${theme}-${width}: hiérarchie MacBook inversée`);
          }
        }
        if (width >= 1024) {
          await page.getByRole("button", { name: "Déplier la navigation" }).waitFor({ state: "visible" });
          const sidebarWidth = await page.locator(".dashboard-sidebar").evaluate((element) => Math.round(element.getBoundingClientRect().width));
          assert.equal(sidebarWidth, 84, `${scenario.id}-${theme}-${width}: navigation initiale non repliée`);
        } else {
          assert.equal(await page.locator(".dashboard-sidebar-mobile").count(), 0, `${scenario.id}-${theme}-${width}: menu mobile ouvert initialement`);
          if (scenario.id === "overview") {
            await page.getByRole("button", { name: "Ouvrir le menu" }).click();
            const mobileSidebar = page.locator(".dashboard-sidebar-mobile");
            await mobileSidebar.waitFor({ state: "visible" });
            assert.ok(await mobileSidebar.getByText("Accueil", { exact: true }).filter({ visible: true }).count() >= 1, `overview-${theme}-${width}: libellé Accueil absent du burger`);
            assert.equal(await mobileSidebar.getByText("Dashboard Pokémon GO", { exact: true }).filter({ visible: true }).count(), 1, `overview-${theme}-${width}: identité du menu absente`);
            const accountToggle = mobileSidebar.getByRole("button", { name: "Déplier les détails du compte Admin" });
            await accountToggle.waitFor({ state: "visible" });
            assert.equal(await mobileSidebar.getByRole("link", { name: "Réglages" }).filter({ visible: true }).count(), 0, `overview-${theme}-${width}: détails du compte ouverts par défaut`);
            await accountToggle.click();
            await mobileSidebar.getByRole("link", { name: "Réglages" }).waitFor({ state: "visible" });
            await mobileSidebar.getByRole("button", { name: "Fermer le menu" }).click();
            if (width === 375 && theme === "dark") {
              await page.getByRole("button", { name: "Tout régénérer" }).click();
              await page.getByText("Terminé avec succès", { exact: true }).waitFor({ state: "visible", timeout: 60_000 });
              assert.equal(pokemonAdminActions.filter((action) => action === "regenerate-pvp-rankings").length, 1, "overview-dark-375: la régénération globale doit appeler une seule fois le moteur PvP partagé");
            }
          }
        }
        if (scenario.id === "removed-costume-audit") {
          assert.equal(new URL(page.url()).pathname, "/");
          assert.equal(new URL(page.url()).searchParams.get("section"), null);
          assert.equal(await page.getByText("Costumes / Event", { exact: true }).count(), 0);
          assert.equal(pokemonAdminActions.includes("costume-audit"), false);
        }
        if (scenario.id === "shiny" && width < 640) {
          const podiumCards = page.locator('[aria-label="Podium Shiny"] > button');
          await podiumCards.first().waitFor({ state: "visible", timeout: 30_000 });
          const visualOrder = await podiumCards.evaluateAll((buttons) => buttons
            .map((button) => ({ y: button.getBoundingClientRect().y, rank: button.querySelector("span")?.textContent?.trim() }))
            .sort((left, right) => left.y - right.y).map((entry) => entry.rank));
          assert.deepEqual(visualOrder, ["1", "2", "3"], `shiny-${theme}-${width}: ordre podium mobile`);
        }
        if (scenario.pvpDetail) {
          await page.locator('section[aria-label="Classement PvP"] button').first().click();
          await page.getByText("Coéquipiers suggérés", { exact: true }).waitFor({ state: "visible" });
          await page.getByText("Forgelina", { exact: true }).waitFor({ state: "visible" });
          await assertNoOverflow(page, `pvp-detail-${theme}-${width}`);
          await page.getByRole("tab", { name: "Ma Checklist" }).click();
          await page.getByText("Ma checklist PvP", { exact: true }).waitFor({ state: "visible" });
          await assertNoOverflow(page, `pvp-checklist-${theme}-${width}`);
          if (width === 375 && theme === "dark") {
            const regenerationRequest = page.waitForRequest((request) => {
              if (request.method() !== "POST" || new URL(request.url()).pathname !== "/api/pokemon-admin") return false;
              try { return JSON.parse(request.postData() || "{}").action === "regenerate-pvp-rankings"; } catch { return false; }
            });
            await page.getByRole("button", { name: "Régénérer", exact: true }).click();
            await regenerationRequest;
            assert.equal(pokemonAdminActions.filter((action) => action === "regenerate-pvp-rankings").length, 1, "pvp-rankings-dark-375: la page dédiée doit appeler une seule fois le moteur PvP partagé");
          }
        }
        if (scenario.battleLab) {
          const selectors = page.locator('input[role="combobox"][placeholder="Nom FR/EN, dex, forme, ID…"]');
          assert.equal(await selectors.count(), 2, `pvp-simulator-${theme}-${width}: les deux sélecteurs doivent rester disponibles`);
          assert.equal(await page.getByRole("button", { name: "SIMULER LE COMBAT" }).isDisabled(), true, `pvp-simulator-${theme}-${width}: la simulation doit rester désactivée à vide`);
          await selectors.first().click();
          const listbox = page.getByRole("listbox").filter({ visible: true });
          await listbox.waitFor({ state: "visible" });
          if (width < 640) {
            const geometry = await listbox.evaluate((element) => { const rect = element.getBoundingClientRect(); return { bottom: Math.round(rect.bottom), viewport: window.innerHeight, position: getComputedStyle(element.parentElement).position }; });
            assert.ok(geometry.bottom <= geometry.viewport, `pvp-selector-mobile-${theme}-${width}: bottom sheet hors viewport`);
            assert.equal(geometry.position, "fixed", `pvp-selector-mobile-${theme}-${width}: sélecteur plein écran non dédié`);
          } else {
            const stacking = await listbox.evaluate((element) => { const rect = element.getBoundingClientRect(); const topElement = document.elementFromPoint(rect.left + Math.min(30, rect.width / 2), rect.top + Math.min(30, rect.height / 2)); return { parentPosition: getComputedStyle(element.parentElement).position, ownsTopPoint: element.contains(topElement) || element === topElement }; });
            assert.equal(stacking.parentPosition, "fixed", `pvp-selector-desktop-${theme}-${width}: selector non porté`);
            assert.equal(stacking.ownsTopPoint, true, `pvp-selector-desktop-${theme}-${width}: selector sous le contenu`);
          }
          const focusedBatchScenario = width === 375 && theme === "dark";
          if (focusedBatchScenario) {
            await page.getByLabel("Recherche Pokémon mobile").fill("Bulbizarre");
            await listbox.locator('[role="option"]:not([aria-disabled="true"])').filter({ hasText: "#0001 · Normal" }).first().click();
            await page.waitForFunction(() => {
              const input = document.querySelector('input[role="combobox"][placeholder="Nom FR/EN, dex, forme, ID…"]');
              return input instanceof HTMLInputElement && input.value.trim().length > 0
                && !document.querySelector('[role="dialog"][aria-label="Choisir un Pokémon"]');
            }, { timeout: 30_000 });
            await selectors.first().click();
            await listbox.waitFor({ state: "visible" });
          }
          await page.getByRole("button", { name: "Méga" }).click();
          await page.getByText("MEGA_X", { exact: false }).first().waitFor({ state: "visible" });
          await page.keyboard.press("Escape");
          if (focusedBatchScenario) {
            await selectors.nth(1).click();
            const opponentListbox = page.getByRole("listbox").filter({ visible: true });
            await page.getByLabel("Recherche Pokémon mobile").fill("Bulbizarre");
            await opponentListbox.locator('[role="option"]:not([aria-disabled="true"])').filter({ hasText: "SHADOW · OBSCUR" }).first().click();
            await page.waitForFunction(() => {
              const inputs = document.querySelectorAll('input[role="combobox"][placeholder="Nom FR/EN, dex, forme, ID…"]');
              return inputs[1] instanceof HTMLInputElement && inputs[1].value.includes("Obscur");
            }, { timeout: 30_000 });
            await page.getByRole("button", { name: "IV personnalisés" }).first().click();
            await page.getByLabel("Atk IV").first().fill("0");
            await page.getByLabel("Def IV").first().fill("15");
            await page.getByLabel("HP IV").first().fill("14");
            const fastMove = page.getByLabel("Fast Move").first();
            if (await fastMove.locator("option").count() > 1) await fastMove.selectOption({ index: 1 });
            const chargedMove = page.getByLabel("Charged Move 1").first();
            if (await chargedMove.locator("option").count() > 1) await chargedMove.selectOption({ index: 1 });
            for (const shieldName of ["Aucun bouclier de départ", "Un bouclier de départ", "Deux boucliers de départ", "Un bouclier de départ"]) {
              await page.getByRole("button", { name: shieldName }).first().click();
            }
            await page.getByRole("button", { name: "SIMULER LE COMBAT" }).click();
            const timelineTab = page.getByRole("tab", { name: "Timeline" });
            await timelineTab.waitFor({ state: "visible", timeout: 60_000 });
            await timelineTab.click();
            const timeline = page.locator("section").filter({ hasText: "Timeline complète" }).filter({ visible: true }).first();
            await timeline.waitFor({ state: "visible" });
            for (const asset of ["TodayView_Icon_AttackMove.webp", "shield-0.png"]) {
              assert.ok(await timeline.locator(`img[src$="/${asset}"]`).count() > 0, `pvp-single-${theme}-${width}: asset timeline ${asset} absent`);
            }
            await assertNoOverflow(page, `pvp-single-${theme}-${width}`);
            await page.getByRole("tab", { name: "Multi" }).click();
            await page.getByText("Multi Battle", { exact: true }).waitFor({ state: "visible" });
            await page.getByRole("button", { name: "Lancer Multi" }).click();
            await page.getByText("Taux de victoire", { exact: true }).waitFor({ state: "visible", timeout: 60_000 });
            await assertNoOverflow(page, `pvp-multi-${theme}-${width}`);
            await page.getByRole("tab", { name: "Matrix" }).click();
            await page.getByText("Matrix Battle", { exact: true }).waitFor({ state: "visible" });
            await page.getByRole("button", { name: "Calculer la Matrix" }).click();
            await page.getByText(/^Rating \d+ ·/).first().waitFor({ state: "visible", timeout: 60_000 });
            await assertNoOverflow(page, `pvp-matrix-${theme}-${width}`);
            await page.getByText(/^Rating \d+ ·/).first().click();
            const detailDialog = page.getByRole("dialog").filter({ visible: true });
            await detailDialog.getByText("Timeline complète", { exact: true }).waitFor({ state: "visible" });
            await detailDialog.getByRole("button", { name: "Fermer la fenêtre" }).click();
          }
        }
        if (scenario.eventModal) {
          await page.getByRole("button", { name: new RegExp(event.title) }).filter({ visible: true }).first().click();
          const modal = page.locator(".event-detail-modal");
          await modal.waitFor({ state: "visible" });
          await assertNoOverflow(page, `events-modal-${theme}-${width}`);
          if (width < 640) {
            const positions = await modal.evaluate((element) => {
              const header = element.querySelector("header").getBoundingClientRect();
              const close = element.querySelector('button[aria-label="Fermer le détail de l’event"]').getBoundingClientRect();
              return { headerHeight: header.height, headerTop: header.top, closeTop: close.top };
            });
            assert.ok(positions.headerHeight < 500, `events-modal-${theme}-${width}: header trop haut (${positions.headerHeight})`);
            assert.ok(positions.closeTop <= positions.headerTop + 22, `events-modal-${theme}-${width}: fermeture trop basse`);
          }
        }
        const filteredConsole = consoleErrors.filter((entry) => !/favicon|Failed to load resource.*404/i.test(entry));
        const brokenImages = await page.locator("img:visible").evaluateAll((images) => images
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.getAttribute("src") || "image sans src"));
        assert.deepEqual(filteredConsole, [], `${scenario.id}-${theme}-${width}: erreurs console`);
        assert.deepEqual(pageErrors, [], `${scenario.id}-${theme}-${width}: erreurs page`);
        assert.deepEqual(failedRequests, [], `${scenario.id}-${theme}-${width}: requêtes réseau échouées`);
        assert.deepEqual(failedResponses, [], `${scenario.id}-${theme}-${width}: réponses HTTP en erreur`);
        assert.deepEqual(brokenImages, [], `${scenario.id}-${theme}-${width}: images visibles cassées`);
        if ((width === 375 && theme === "dark" && ["overview", "best-defenders", "shiny", "pvp-simulator", "events", "notes"].includes(scenario.id)) || (width === 1440 && theme === "light" && ["best-defenders"].includes(scenario.id))) {
          await page.screenshot({ path: path.join(artifactRoot, `${scenario.id}-${theme}-${width}.png`), fullPage: true });
        }
        results.push({ scenario: scenario.id, theme, width, overflow });
        await page.close();
      }
      await context.close();
    }
  }
  writeFileSync(path.join(artifactRoot, "report.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), checks: results.length, results }, null, 2)}\n`);
  console.log(`Vérification responsive réussie : ${results.length} pages, ${widths.length} largeurs, ${themes.length} thèmes.`);
} finally {
  await browser.close();
}

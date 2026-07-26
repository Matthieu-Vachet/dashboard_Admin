import assert from "node:assert/strict";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const baseUrl = process.env.POKEMON_RESPONSIVE_BASE_URL || "http://localhost:3100";
const artifactRoot = path.join(root, "test-results/pokemon-responsive");
const widths = [375, 390, 430, 768, 1024, 1440, 1920];
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

const artwork = "/ui/zygardDexLogo.png";
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
const event = {
  id: "fixture-shadow-palkia", sourceId: "fixture-shadow-palkia", title: "Shadow Palkia in Shadow Raids", category: "Raid Battles", source: "leekduck",
  startDate: "2026-07-01T04:00:00.000Z", endDate: "2026-08-04T20:00:00.000Z", description: "Raid Battles – Shadow Palkia in Shadow Raids",
  featuredPokemon: [{ name: "Palkia", src: artwork }], bonuses: [], rewards: [], sections: [], links: [], status: "active",
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
  await page.route("**/api/admin/events**", (route) => json(route, { data: { events: [event], configured: true, seeded: false, collection: "events" } }));
  await page.route("**/api/events**", (route) => json(route, { data: { events: [event], configured: true } }));
  await page.route("**/api/trainer-pokemon/diagnostics**", (route) => json(route, { success: true, data: {
    snapshot: { id: "fixture-snapshot", sourceFileName: "collection.json", importedAt: "2026-07-26T10:00:00.000Z", identityResolvedAt: "2026-07-26T12:00:00.000Z", active: true },
    items: [
      { key: "pikachu-costume", dexNumber: 25, pokemonName: "Pikachu", rawAlias: "COSTUME_2", form: "PIKACHU_NORMAL", costume: "COSTUME_2", gender: "MALE", shiny: false, canonicalId: null, identityStatus: "unmatched", reason: "ALIAS_UNKNOWN", occurrences: 2, sourceIds: ["collection-25-a", "collection-25-b"] },
    ],
    summary: { totalEntries: 2, totalGroups: 1, filteredEntries: 2, filteredGroups: 1, reasons: { ALIAS_UNKNOWN: 2 } },
    pagination: { page: 1, limit: 50, total: 1, pages: 1 },
  } }));
  await page.route("**/api/trainer-pokemon/imports**", (route) => json(route, { success: true, data: { imports: [] } }));
  await page.route("**/api/trainer-pokemon?**", (route) => json(route, { success: true, data: { items: [], snapshot: { id: "fixture-snapshot", sourceFileName: "collection.json", sourceExportTime: "2026-07-26T10:00:00.000Z", sourceExportTimestamp: "2026-07-26T10:00:00.000Z", sourceVersion: "1", declaredPokemonCount: 2, actualPokemonCount: 2, importedAt: "2026-07-26T10:00:00.000Z", importedBy: "fixture", checksum: "fixture-checksum", status: "active", diagnostics: { warnings: 2, errors: 0, counts: { IDENTITY_UNMATCHED: 2 }, samples: [] }, stats: { total: 2, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 2 }, canRollback: false }, stats: { total: 2, shiny: 0, lucky: 0, perfect: 0, shadow: 0, purified: 0, costume: 2 }, filters: { genders: [], alignments: [], forms: [], costumes: [], cp: { min: 0, max: 0 }, ivPercent: { min: 0, max: 0 }, weightKg: { min: 0, max: 0 }, heightM: { min: 0, max: 0 } }, pagination: { page: 1, limit: 50, total: 0, pages: 0 } } }));
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
    if (action === "costume-audit") return json(route, datasetEnvelope({ metadata: { total: 2, sourceUrl: "https://www.margxt.fr/guide-les-pokemon-deguises-dans-pokemon-go/", statusCounts: { present: 1, missing: 1, shinyAvailable: 2 } }, items: [
      { id: "costume-1", source: { pokemonName: "Pikachu", costumeName: "Assistant du Professeur Willow" }, shinyAvailable: true, events: ["Ultra Bonus 2026"], notes: [], identity: { pokemonId: 25, form: "NORMAL", costume: "WILLOW", resolution: {} }, pokemonGoData: { status: "present", canonicalId: "PIKACHU_WILLOW", exactNormalAsset: artwork, exactShinyAsset: artwork } },
      { id: "costume-2", source: { pokemonName: "Évoli", costumeName: "Chapeau explorateur" }, shinyAvailable: true, events: ["City Safari"], notes: [], identity: { pokemonId: 133, resolution: { reason: "ALIAS_UNKNOWN" } }, pokemonGoData: { status: "unresolved", canonicalId: null, exactNormalAsset: null, exactShinyAsset: null } },
    ] }, 2));
    if (action === "shiny") return json(route, datasetEnvelope({ rankings: shinyEntries, podium: shinyEntries.slice(0, 3), summary: { today: 381, total: 381, rare: 50 } }, shinyEntries.length));
    if (action === "identity-manager-providers") return json(route, { data: [
      { id: "pokemon-go-hub", label: "Pokémon GO Hub", domains: ["best-defenders"], visibility: "public", status: "active", aliases: 2, activeAliases: 2, openDiagnostics: 1, occurrences: 2 },
      { id: "margxt", label: "Margxt", domains: ["costume-audit"], visibility: "private", status: "active", aliases: 4, activeAliases: 4, openDiagnostics: 193, occurrences: 193 },
      { id: "ma-collection", label: "Ma Collection", domains: ["trainer-pokemon"], visibility: "private", status: "active", aliases: 1, activeAliases: 1, openDiagnostics: 3, occurrences: 12 },
    ] });
    if (action === "identity-manager-sync-preview") return json(route, { data: {
      mode: "dry-run", inventory: { schemaVersion: 1, fingerprint: "fixture-catalog-fingerprint", total: 1605, issues: 0 },
      before: { identities: 1605, aliases: 7 }, after: { identities: 1605, aliases: 7 },
      create: 0, update: 0, unchanged: 1605, orphan: 0, conflict: 0, aliasesPreserved: 7, conflicts: [], mewtwoArmored: "present",
    } });
    if (action === "identity-manager-conflicts") return json(route, { data: { data: { explicitConflicts: 0, aliasConflicts: [] } } });
    if (action.startsWith("identity-manager")) return json(route, { data: { data: [], meta: { page: 1, limit: 24, total: 0, pages: 1, stats: { providers: [], statuses: {} } } } });
    if (action === "pokemon-identity-mappings") return json(route, datasetEnvelope({ mappings: [] }, 0));
    if (["raids", "eggs", "max-battles", "rocket", "research", "pvp-rankings", "best-attackers"].includes(action)) return json(route, datasetEnvelope({ entries: [], rankings: [], raids: [], eggs: [], battles: [], profiles: [], research: [] }, 0));
    return json(route, { data: { entries: [], customRuleEntries: [], customRules: [], summary: {}, sourceWatch: { sources: [] } } });
  });
}

async function authenticate(browser) {
  const credentials = readEnvironment();
  const context = await browser.newContext({ viewport: { width: 1024, height: 900 } });
  const page = await context.newPage();
  await installRoutes(page);
  await page.goto(`${baseUrl}/login?next=/pokemon-admin`, { waitUntil: "domcontentloaded" });
  await page.locator('input[name="email"]').fill(credentials.ADMIN_EMAIL || "matthieu@example.com");
  await page.locator('input[name="password"]').fill(credentials.ADMIN_PASSWORD || "change-moi");
  await Promise.all([
    page.waitForURL((url) => url.pathname === "/pokemon-admin", { timeout: 20_000 }),
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
  { id: "overview", path: "/pokemon-admin?section=overview", ready: /Voici ce qui demande votre attention aujourd’hui/ },
  { id: "best-defenders", path: "/pokemon-admin?section=best-defenders", ready: /Best Defenders/ },
  { id: "costume-audit", path: "/pokemon-admin?section=costume-audit", ready: /Costumes \/ Event Pokémon/ },
  { id: "collection", path: "/pokemon-admin?section=my-collection", ready: /Ma collection Pokémon GO/, collectionDiagnostics: true },
  { id: "shiny", path: "/pokemon-admin?section=shiny", ready: /Shiny Tracker/ },
  { id: "identity-manager", path: "/pokemon-admin?section=identity-manager", ready: /Identity Manager/ },
  { id: "variants", path: "/pokemon-admin?section=pokemon-identity-mappings", ready: /Résolution/ },
  { id: "events", path: "/pokemon-admin?section=events", ready: /Calendrier Events Pokémon GO/, eventModal: true },
  { id: "notes", path: "/notes", ready: /Notes/ },
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
        page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
        page.on("pageerror", (error) => pageErrors.push(error.message));
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
        if (width >= 1024) {
          await page.getByRole("button", { name: "Déplier la navigation" }).waitFor({ state: "visible" });
          const sidebarWidth = await page.locator(".dashboard-sidebar").evaluate((element) => Math.round(element.getBoundingClientRect().width));
          assert.equal(sidebarWidth, 84, `${scenario.id}-${theme}-${width}: navigation initiale non repliée`);
        } else {
          assert.equal(await page.locator(".dashboard-sidebar-mobile").count(), 0, `${scenario.id}-${theme}-${width}: menu mobile ouvert initialement`);
        }
        if (scenario.id === "shiny" && width < 640) {
          const visualOrder = await page.locator('[aria-label="Podium Shiny"] > button').evaluateAll((buttons) => buttons
            .map((button) => ({ y: button.getBoundingClientRect().y, rank: button.querySelector("span")?.textContent?.trim() }))
            .sort((left, right) => left.y - right.y).map((entry) => entry.rank));
          assert.deepEqual(visualOrder, ["1", "2", "3"], `shiny-${theme}-${width}: ordre podium mobile`);
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
        if (scenario.collectionDiagnostics) {
          await page.getByRole("button", { name: /Voir tous les IDs non reconnus/ }).click();
          await page.getByRole("heading", { name: "IDs non reconnus par les assets" }).waitFor({ state: "visible" });
          await page.getByText("collection-25-a", { exact: true }).waitFor({ state: "visible" });
          await assertNoOverflow(page, `collection-diagnostics-${theme}-${width}`);
        }
        const filteredConsole = consoleErrors.filter((entry) => !/favicon|Failed to load resource.*404/i.test(entry));
        assert.deepEqual(filteredConsole, [], `${scenario.id}-${theme}-${width}: erreurs console`);
        assert.deepEqual(pageErrors, [], `${scenario.id}-${theme}-${width}: erreurs page`);
        if ((width === 375 && theme === "dark" && ["overview", "best-defenders", "costume-audit", "collection", "shiny", "events", "notes"].includes(scenario.id)) || (width === 1440 && theme === "light" && ["best-defenders", "costume-audit", "collection"].includes(scenario.id))) {
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

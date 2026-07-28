import { chromium } from "playwright";

const pokemon = {
  mimikyu: ["mimikyu", 25.5, 1, 14, 15, ["SHADOW_CLAW", "SHADOW_SNEAK", "PLAY_ROUGH"]],
  lickilicky: ["lickilicky", 23.5, 0, 15, 10, ["ROLLOUT", "BODY_SLAM", "SHADOW_BALL"]],
  tinkaton: ["tinkaton", 25.5, 1, 14, 14, ["FAIRY_WIND", "GIGATON_HAMMER", "PLAY_ROUGH"]],
  azumarill: ["azumarill", 43, 4, 15, 13, ["BUBBLE", "ICE_BEAM", "PLAY_ROUGH"]],
  registeel: ["registeel", 22.5, 8, 15, 14, ["LOCK_ON", "FOCUS_BLAST", "ZAP_CANNON"]],
  medicham: ["medicham", 49, 7, 15, 14, ["COUNTER", "ICE_PUNCH", "PSYCHIC"]],
  swampert: ["swampert", 18.5, 6, 15, 12, ["MUD_SHOT", "HYDRO_CANNON", "EARTHQUAKE"]],
  skarmory: ["skarmory", 27, 4, 14, 12, ["STEEL_WING", "SKY_ATTACK", "BRAVE_BIRD"]],
  umbreon: ["umbreon", 27, 4, 15, 9, ["SNARL", "FOUL_PLAY", "LAST_RESORT"]],
  machamp: ["machamp", 18, 5, 15, 12, ["KARATE_CHOP", "CROSS_CHOP", "STONE_EDGE"]],
  charizard: ["charizard", 19, 5, 14, 15, ["WING_ATTACK", "DRAGON_CLAW", "BLAST_BURN"]],
  venusaur: ["venusaur", 20.5, 4, 13, 14, ["VINE_WHIP", "FRENZY_PLANT", "SLUDGE_BOMB"]],
  lanturn: ["lanturn", 27, 5, 15, 12, ["SPARK", "SURF", "THUNDERBOLT"]],
  trevenant: ["trevenant", 22, 3, 13, 12, ["SHADOW_CLAW", "SEED_BOMB", "SHADOW_BALL"]],
  sableye: ["sableye", 47, 4, 15, 15, ["SHADOW_CLAW", "FOUL_PLAY", "POWER_GEM"]],
  walrein: ["walrein", 20.5, 4, 14, 14, ["POWDER_SNOW", "ICICLE_SPEAR", "EARTHQUAKE"]],
  gligar: ["gligar", 31, 4, 13, 15, ["WING_ATTACK", "DIG", "NIGHT_SLASH"]],
  froslass: ["froslass", 27.5, 4, 14, 14, ["POWDER_SNOW", "AVALANCHE", "SHADOW_BALL"]],
  dragonair: ["dragonair", 33, 4, 15, 14, ["DRAGON_BREATH", "AQUA_TAIL", "BODY_SLAM"]],
  abomasnow: ["abomasnow", 23.5, 4, 15, 15, ["POWDER_SNOW", "WEATHER_BALL_ICE", "ICY_WIND"]],
  abomasnowShadow: ["abomasnow_shadow", 23.5, 4, 15, 15, ["POWDER_SNOW", "WEATHER_BALL_ICE", "ICY_WIND"]],
  mandibuzz: ["mandibuzz", 26.5, 5, 15, 13, ["SNARL", "FOUL_PLAY", "AERIAL_ACE"]],
};

const cases = [
  ["mimikyu-disguise", "mimikyu", "lickilicky", 1, 1],
  ["tinkaton-lickilicky", "tinkaton", "lickilicky", 1, 1],
  ["azumarill-registeel", "azumarill", "registeel", 1, 1],
  ["medicham-registeel", "medicham", "registeel", 1, 1],
  ["swampert-skarmory-11", "swampert", "skarmory", 1, 1],
  ["swampert-skarmory-01", "swampert", "skarmory", 0, 1],
  ["swampert-skarmory-10", "swampert", "skarmory", 1, 0],
  ["charizard-venusaur-00", "charizard", "venusaur", 0, 0],
  ["charizard-venusaur-11", "charizard", "venusaur", 1, 1],
  ["charizard-venusaur-22", "charizard", "venusaur", 2, 2],
  ["lanturn-skarmory", "lanturn", "skarmory", 1, 1],
  ["umbreon-trevenant", "umbreon", "trevenant", 1, 1],
  ["sableye-froslass", "sableye", "froslass", 1, 1],
  ["walrein-gligar", "walrein", "gligar", 1, 1],
  ["dragonair-abomasnow", "dragonair", "abomasnow", 1, 1],
  ["shadow-abomasnow-mandibuzz", "abomasnowShadow", "mandibuzz", 1, 1],
  ["machamp-umbreon", "machamp", "umbreon", 1, 1],
  ["registeel-lanturn-10", "registeel", "lanturn", 1, 0],
  ["trevenant-azumarill-21", "trevenant", "azumarill", 2, 1],
  ["tinkaton-mimikyu-12", "tinkaton", "mimikyu", 1, 2],
];

function descriptor(entry) {
  const [species, level, attack, defense, stamina] = entry;
  return `${species}-${level}-${attack}-${defense}-${stamina}-4-4-1-1`;
}

function battleUrl(left, right, leftShields, rightShields) {
  return `https://pvpoke.com/battle/1500/${descriptor(left)}/${descriptor(right)}/${leftShields}${rightShields}/${left[5].join("-")}/${right[5].join("-")}/`;
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ locale: "en-US" });
const results = [];

for (const [id, leftId, rightId, leftShields, rightShields] of cases) {
  const left = pokemon[leftId];
  const right = pokemon[rightId];
  const url = battleUrl(left, right, leftShields, rightShields);
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForSelector(".battle-results.single .summary", { timeout: 45_000 });
    const captured = await page.evaluate(() => {
      const summary = document.querySelector(".battle-results.single .summary")?.textContent?.replace(/\s+/g, " ").trim() || "";
      const continuation = document.querySelector(".continue-container")?.textContent?.replace(/\s+/g, " ").trim() || "";
      const rating = Number(summary.match(/battle rating of\s*(\d+)/i)?.[1] || NaN);
      const durationSeconds = Number(summary.match(/(?:in|for)\s*([\d.]+)s/i)?.[1] || NaN);
      const winner = summary.includes(" wins ") ? 0 : summary.includes(" loses ") ? 1 : null;
      const remaining = continuation.match(/\((\d+)\s*HP,\s*(\d+)\s*energy\)/i);
      const actions = [...document.querySelectorAll(".timeline .item.fast, .timeline .item.charged")].map((item) => ({
        actor: Number(item.getAttribute("actor")),
        turn: Number(item.getAttribute("turn")),
        move: item.getAttribute("name"),
        values: item.getAttribute("values"),
        className: item.classList.contains("charged") ? "charged" : "fast",
      }));
      const firstDamage = (actor, className) => {
        const value = actions.find((action) => action.actor === actor && action.className === className)?.values;
        return value ? Number(value.split(",")[0]) : null;
      };
      return {
        summary,
        continuation,
        winner,
        rating,
        durationSeconds,
        remainingHp: remaining ? Number(remaining[1]) : null,
        remainingEnergy: remaining ? Number(remaining[2]) : null,
        firstDamage: {
          leftFast: firstDamage(0, "fast"),
          rightFast: firstDamage(1, "fast"),
          leftCharged: firstDamage(0, "charged"),
          rightCharged: firstDamage(1, "charged"),
        },
      };
    });
    results.push({
      id,
      source: { repositoryCommit: "5e1e3d971369a47aaf3e7247f50710d80205d570", capturedAt: "2026-07-28" },
      input: { leftId, rightId, leftShields, rightShields, left, right },
      reference: captured,
      url,
    });
  } catch (error) {
    results.push({ id, url, error: error instanceof Error ? error.message : String(error) });
  } finally {
    await page.close();
  }
}

await browser.close();
process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);

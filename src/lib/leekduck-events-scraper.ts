/* eslint-disable @typescript-eslint/no-require-imports */
import { load, type Cheerio, type CheerioAPI } from "cheerio";
import type { AnyNode } from "domhandler";
import fs from "node:fs";
import path from "node:path";
import {
  POKEMON_EVENT_TIMEZONE,
  POKEMON_EVENT_TYPES,
  type PokemonCalendarEvent,
  type PokemonEventReward,
  type PokemonEventSection,
  type PokemonEventType,
  type PokemonFeaturedPokemon,
} from "@/data/pokemon-events";
import { resolveCanonicalPokemonAssets, type CanonicalAssetResolution } from "./pokemon-canonical-assets-api";

const leekDuckEventsFeedUrl = "https://leekduck.com/feeds/events.json";
const leekDuckEventsUrl = "https://leekduck.com/events/";
const scrapedDuckEventsUrl = "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json";
const typeIds = new Set<string>(POKEMON_EVENT_TYPES.map((type) => type.id));

type RawLeekDuckEvent = {
  eventID?: string;
  name?: string;
  eventType?: string;
  heading?: string;
  link?: string;
  image?: string;
  start?: string;
  end?: string;
  extraData?: Record<string, unknown> | null;
};

type PokemonIndexEntry = {
  id?: string;
  name: string;
  englishName?: string;
  image?: string;
  dexId?: string;
  form?: string;
  types?: string[];
  shiny?: boolean;
};

type ItemIndexEntry = {
  id: string;
  name: string;
  englishName?: string;
  image?: string;
  category?: string;
  aliases: string[];
};

type PokemonCandidate = {
  name: string;
  image?: string;
  shiny?: boolean;
  category?: PokemonEventSection["category"];
};

type ScrapedDetailSection = {
  id: string;
  title: string;
  category: PokemonEventSection["category"];
  text: string[];
  pokemon: PokemonCandidate[];
  rewards: PokemonEventReward[];
  images: string[];
};

function normalizeText(value: unknown) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugify(value: unknown) {
  return normalizeText(value).replace(/\s+/g, "-");
}

function normalizeImageUrl(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  if (/^(https?:|data:|blob:)/i.test(raw)) return raw;
  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return `https://leekduck.com${raw}`;
  return `https://leekduck.com/${raw.replace(/^\.?\//, "")}`;
}

function uniqueBy<T>(items: T[], key: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const id = key(item);
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

function timezoneOffsetMs(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(values.year),
    Number(values.month) - 1,
    Number(values.day),
    Number(values.hour),
    Number(values.minute),
    Number(values.second),
  );
  return asUtc - date.getTime();
}

function safeDate(value: unknown) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  if (/[zZ]|[+-]\d{2}:?\d{2}$/.test(raw)) {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?$/);
  if (!match) {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }
  const [, year, month, day, hour, minute, second = "0", millisecond = "0"] = match;
  const utcGuess = new Date(Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond.padEnd(3, "0")),
  ));
  return new Date(utcGuess.getTime() - timezoneOffsetMs(utcGuess, POKEMON_EVENT_TIMEZONE)).toISOString();
}

async function fetchJson<T>(url: string, optional = false): Promise<T | null> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { accept: "application/json", "user-agent": "DashboardAdminPokemonGO/1.0" },
    signal: AbortSignal.timeout(18_000),
  });
  if (!response.ok) {
    if (optional) return null;
    throw new Error(`LeekDuck events HTTP ${response.status}`);
  }
  return (await response.json()) as T;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { accept: "text/html", "user-agent": "DashboardAdminPokemonGO/1.0" },
    signal: AbortSignal.timeout(22_000),
  });
  if (!response.ok) throw new Error(`LeekDuck detail HTTP ${response.status}`);
  return response.text();
}

function cleanHtmlText(value: unknown) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function sectionCategory(title: string, current: PokemonEventSection["category"] = "other") {
  const key = normalizeText(title);
  if (/raid|boss/.test(key)) return "raids";
  if (/egg|hatch/.test(key)) return "eggs";
  if (/research|task|field research|timed research/.test(key)) return "researchRewards";
  if (/spawn|wild|incense|habitat|costumed|encounter|rotation/.test(key)) return "wildSpawns";
  if (/bonus|feature|attack|mega evolution/.test(key)) return "bonuses";
  if (/ticket|sales|shop|paid/.test(key)) return "tickets";
  if (/shiny|pokemon/.test(key)) return "featured";
  return current;
}

function pokemonNameMatchCandidates(name: string) {
  const raw = cleanHtmlText(name);
  const withoutCostume = raw
    .replace(/\s+wearing\s+.*$/i, "")
    .replace(/\s+with\s+.*$/i, "")
    .replace(/\s+in\s+a\s+.*$/i, "");
  const withoutParen = raw.replace(/\s*\([^)]*\)\s*/g, " ").trim();
  const origin = raw.replace(/^Origin Forme\s+/i, "");
  const altered = raw.replace(/\s*\((Altered|Origin|White|Black)\)\s*/i, " $1 ").trim();
  const megaBase = raw.replace(/^Mega\s+/i, "");
  return uniqueBy([raw, withoutCostume, withoutParen, origin, altered, megaBase], normalizeText).filter(Boolean);
}

function itemNameMatchCandidates(name: string) {
  const raw = cleanHtmlText(name)
    .replace(/^x\s*\d+\s+/i, "")
    .replace(/\s+x\s*\d+$/i, "")
    .replace(/\s*\(\s*x\s*\d+\s*\)$/i, "")
    .replace(/\b\d+\s*(x|×)\s*/i, "")
    .trim();
  const withoutQuantity = raw.replace(/\s*(x|×)\s*\d+\s*$/i, "").trim();
  const withoutCp = raw.replace(/\bcp\s+\d+\s*-\s*\d+\b/gi, "").trim();
  return uniqueBy([raw, withoutQuantity, withoutCp], normalizeText).filter(Boolean);
}

function enrichPokemonCandidate(
  candidate: PokemonCandidate,
  index: ReturnType<typeof loadPokemonIndex>,
) {
  const candidates = pokemonNameMatchCandidates(candidate.name);
  const local = candidates.map((name) => index.lookup.get(normalizeText(name))).find(Boolean);
  if (!local) {
    return {
      pokemon: {
        name: candidate.name,
        rawAlias: candidate.name,
        sourceImage: candidate.image || null,
        image: candidate.image,
        shiny: candidate.shiny,
      } satisfies PokemonFeaturedPokemon,
      matched: false,
    };
  }

  return {
    pokemon: {
      ...local,
      rawAlias: candidate.name,
      sourceImage: candidate.image || null,
      image: local.image || candidate.image,
      shiny: candidate.shiny || local.shiny,
    } satisfies PokemonFeaturedPokemon,
    matched: true,
  };
}

function enrichReward(
  reward: PokemonEventReward,
  index: ReturnType<typeof loadItemIndex>,
) {
  const candidates = itemNameMatchCandidates(reward.sourceName || reward.text || reward.name || "");
  const exact = candidates.map((name) => index.lookup.get(normalizeText(name))).find(Boolean);
  const fuzzy = exact || (() => {
    const haystack = normalizeText(reward.sourceName || reward.text || reward.name || "");
    if (!haystack) return undefined;
    return index.entries.find((entry) =>
      entry.aliases.some((alias) => {
        const key = normalizeText(alias);
        return key.length >= 4 && haystack.includes(key);
      }),
    );
  })();

  if (!fuzzy) {
    return {
      reward: {
        ...reward,
        sourceName: reward.sourceName || reward.text,
        matched: false,
      },
      matched: false,
    };
  }

  return {
    reward: {
      ...reward,
      id: fuzzy.id,
      name: fuzzy.name,
      sourceName: reward.sourceName || reward.text,
      text: fuzzy.name || reward.text,
      image: fuzzy.image || reward.image,
      type: reward.type || fuzzy.category || "item",
      matched: true,
    },
    matched: true,
  };
}

function shouldReportUnmatchedReward(reward: PokemonEventReward) {
  const text = normalizeText(reward.sourceName || reward.text || reward.name || "");
  if (!text || text.length < 3) return false;
  if (reward.image) return true;
  return /\b(ball|berry|candy|stardust|tm|pass|incubator|module|stone|energy|poffin|component)\b/.test(text);
}

function collectJsonFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return collectJsonFiles(file);
    return entry.isFile() && entry.name.endsWith(".json") ? [file] : [];
  });
}

function loadPokemonIndex() {
  const { dataPath } = require("@/server/pokemon-go/src/lib/data-repository");
  const files = [
    ...collectJsonFiles(dataPath("pokemon")),
    ...collectJsonFiles(dataPath("pokemon-forms")),
  ];
  const entries: PokemonIndexEntry[] = [];
  const lookup = new Map<string, PokemonIndexEntry>();

  for (const file of files) {
    try {
      const data = JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, unknown>;
      const names = data.names && typeof data.names === "object" ? data.names as Record<string, unknown> : {};
      const displayName = String(names.French || names.English || data.slug || data.id || "").trim();
      const englishName = String(names.English || displayName).trim();
      if (!displayName) continue;
      const entry: PokemonIndexEntry = {
        id: String(data.id || ""),
        name: displayName,
        englishName,
        image: typeof (data.assets as Record<string, unknown> | undefined)?.image === "string"
          ? String((data.assets as Record<string, unknown>).image)
          : undefined,
        dexId: String(data.dexId || data.dexNr || ""),
        form: String(data.form || ""),
        types: [data.primaryType, data.secondaryType].map((type) => String(type || "")).filter(Boolean),
        shiny: Boolean(data.shinyAvailability || data.availability && (data.availability as Record<string, unknown>).shiny),
      };
      entries.push(entry);
      [
        data.id,
        data.slug,
        displayName,
        englishName,
        names.English,
        names.French,
        names.German,
        names.Spanish,
        names.Italian,
      ].forEach((name) => {
        const key = normalizeText(name);
        if (key && !lookup.has(key)) lookup.set(key, entry);
      });
    } catch {
      // Ignore a malformed local Pokemon file rather than blocking the event scrape.
    }
  }

  entries.sort((left, right) => normalizeText(right.name).length - normalizeText(left.name).length);
  return { entries, lookup };
}

function loadItemIndex() {
  const { dataPath } = require("@/server/pokemon-go/src/lib/data-repository");
  const entries: ItemIndexEntry[] = [];
  const lookup = new Map<string, ItemIndexEntry>();

  const itemsFile = dataPath("items", "items.json");
  const aliasesFile = dataPath("items", "itemAliases.json");
  const aliasRecords = new Map<string, string[]>();

  try {
    const aliases = JSON.parse(fs.readFileSync(aliasesFile, "utf8")) as Record<string, unknown>;
    for (const alias of Array.isArray(aliases.aliases) ? aliases.aliases : []) {
      if (!alias || typeof alias !== "object") continue;
      const record = alias as Record<string, unknown>;
      const itemId = String(record.itemId || "").trim();
      const leekduckName = String(record.leekduckName || record.leekduckId || "").trim();
      if (!itemId || !leekduckName) continue;
      const list = aliasRecords.get(itemId) || [];
      list.push(leekduckName);
      aliasRecords.set(itemId, list);
    }
  } catch {
    // Item aliases are helpful but optional; the scraper can still match local item names.
  }

  try {
    const data = JSON.parse(fs.readFileSync(itemsFile, "utf8")) as Record<string, unknown>;
    const items = Array.isArray(data.items) ? data.items : [];
    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      const record = item as Record<string, unknown>;
      const names = record.names && typeof record.names === "object" ? record.names as Record<string, unknown> : {};
      const id = String(record.id || record.itemId || record.templateId || "").trim();
      const englishName = String(names.English || record.name || id).trim();
      const displayName = String(names.French || names.English || record.name || id).trim();
      if (!id || !displayName) continue;

      const aliases = uniqueBy(
        [
          id,
          record.itemId,
          record.templateId,
          record.assetKey,
          displayName,
          englishName,
          names.English,
          names.French,
          names.German,
          names.Spanish,
          names.Italian,
          ...(aliasRecords.get(id) || []),
        ].map((value) => String(value || "").trim()).filter(Boolean),
        normalizeText,
      );
      const entry: ItemIndexEntry = {
        id,
        name: displayName,
        englishName,
        image: typeof record.asset === "string" ? String(record.asset) : undefined,
        category: String(record.category || record.itemType || "").trim() || undefined,
        aliases,
      };
      entries.push(entry);
      aliases.forEach((alias) => {
        const key = normalizeText(alias);
        if (key && !lookup.has(key)) lookup.set(key, entry);
      });
    }
  } catch {
    // A missing item index should not block event scraping; unmatched rewards are reported.
  }

  entries.sort((left, right) => Math.max(...right.aliases.map((alias) => normalizeText(alias).length)) - Math.max(...left.aliases.map((alias) => normalizeText(alias).length)));
  return { entries, lookup };
}

function normalizeLeekDuckType(eventType: unknown, heading: unknown): PokemonEventType {
  const raw = slugify(eventType || heading);
  const mapped: Record<string, PokemonEventType> = {
    "raid-battles": "raid_battles",
    "raid-hour": "raid_hour",
    "raid-day": "raid_day",
    "community-day": "community_day",
    "pokemon-spotlight-hour": "spotlight_hour",
    "spotlight-hour": "spotlight_hour",
    "go-battle-league": "go_battle_league",
    "pokemon-go-fest": "go_fest",
    "go-fest": "go_fest",
    "go-pass": "go_pass",
    "choose-your-path": "choose_your_path",
    "max-mondays": "max_monday",
    "max-monday": "max_monday",
    "max-battle": "max_battle",
    "max-battles": "max_battle",
    "research": "research_day",
    "research-day": "research_day",
    "hatch-day": "egg_event",
    "rocket": "rocket_event",
    "team-go-rocket": "rocket_event",
    "season": "season",
    "event": "event",
  };
  const type = mapped[raw] || (typeIds.has(raw) ? raw : "event");
  return type as PokemonEventType;
}

function collectPokemonCandidates(event: RawLeekDuckEvent) {
  const extra = event.extraData || {};
  const candidates: Array<{ name: string; image?: string; shiny?: boolean }> = [];
  const raidBattles = extra.raidbattles as Record<string, unknown> | undefined;
  const spotlight = extra.spotlight as Record<string, unknown> | undefined;
  const communityDay = extra.communityday as Record<string, unknown> | undefined;

  for (const boss of Array.isArray(raidBattles?.bosses) ? raidBattles.bosses : []) {
    if (boss && typeof boss === "object") {
      const record = boss as Record<string, unknown>;
      candidates.push({ name: String(record.name || ""), image: normalizeImageUrl(record.image) || undefined, shiny: Boolean(record.canBeShiny) });
    }
  }
  for (const spawn of Array.isArray(communityDay?.spawns) ? communityDay.spawns : []) {
    if (spawn && typeof spawn === "object") {
      const record = spawn as Record<string, unknown>;
      candidates.push({ name: String(record.name || ""), image: normalizeImageUrl(record.image) || undefined });
    }
  }
  for (const item of Array.isArray(spotlight?.list) ? spotlight.list : []) {
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      candidates.push({ name: String(record.name || ""), image: normalizeImageUrl(record.image) || undefined, shiny: Boolean(record.canBeShiny) });
    }
  }
  if (spotlight?.name) {
    candidates.push({ name: String(spotlight.name), image: normalizeImageUrl(spotlight.image) || undefined, shiny: Boolean(spotlight.canBeShiny) });
  }

  return candidates.filter((pokemon) => pokemon.name);
}

function parsePokemonItems($: CheerioAPI, scope: Cheerio<AnyNode>, category: PokemonEventSection["category"]) {
  return scope
    .find(".pkmn-list-item")
    .toArray()
    .map((item): PokemonCandidate => {
      const node = $(item);
      return {
        name: cleanHtmlText(node.find(".pkmn-name").first().text()),
        image: normalizeImageUrl(node.find(".pkmn-list-img img").first().attr("src")) || undefined,
        shiny: node.find(".shiny-icon").length > 0,
        category,
      };
    })
    .filter((pokemon) => pokemon.name);
}

function parseRewardItems($: CheerioAPI, scope: Cheerio<AnyNode>) {
  return scope
    .find(".bonus-item, .reward-item")
    .toArray()
    .map((item): PokemonEventReward => {
      const node = $(item);
      const text = cleanHtmlText(node.find(".bonus-text, .reward-text, .name").first().text() || node.text());
      const quantity = text.match(/(?:^|\s)(?:x|×)\s*(\d+)\b/i)?.[1] || text.match(/\b(\d+)\s*(?:x|×)\b/i)?.[1];
      return {
        text,
        sourceName: text,
        image: normalizeImageUrl(node.find("img").first().attr("src")),
        type: "detail",
        quantity,
      };
    })
    .filter((reward) => reward.text);
}

function detailSectionId(title: string, index: number) {
  const slug = slugify(title || "section") || "section";
  return `${slug}-${index}`;
}

async function scrapeEventDetail(event: RawLeekDuckEvent): Promise<{
  sourceUrl: string;
  sections: ScrapedDetailSection[];
  pokemon: PokemonCandidate[];
  rewards: PokemonEventReward[];
  images: string[];
} | null> {
  const sourceUrl = String(event.link || "").trim();
  if (!sourceUrl || !sourceUrl.includes("leekduck.com/events/")) return null;

  const html = await fetchText(sourceUrl);
  const $ = load(html);
  const page = $(".page-content").first().length ? $(".page-content").first() : $("main").first();
  const sections: ScrapedDetailSection[] = [];
  let currentCategory: PokemonEventSection["category"] = "other";
  let current: ScrapedDetailSection | null = null;

  function ensureSection(title = "Résumé", category = currentCategory) {
    if (!current || current.title !== title) {
      current = {
        id: detailSectionId(title, sections.length),
        title,
        category,
        text: [],
        pokemon: [],
        rewards: [],
        images: [],
      };
      sections.push(current);
    }
    return current;
  }

  page.children().each((_, element) => {
    const node = $(element);
    const tag = String(element.type === "tag" && "name" in element ? element.name : "").toLowerCase();

    if (/^h[2-4]$/.test(tag)) {
      const title = cleanHtmlText(node.text());
      if (!title || /^(menu|resources|leek duck)$/i.test(title)) return;
      const category = sectionCategory(title, currentCategory);
      if (tag === "h2") currentCategory = category;
      current = ensureSection(title, category);
      return;
    }

    const section = current || ensureSection("Résumé", currentCategory);
    const pokemon = parsePokemonItems($, node, section.category);
    if (pokemon.length) {
      section.pokemon.push(...pokemon);
      return;
    }

    const rewards = parseRewardItems($, node);
    if (rewards.length) section.rewards.push(...rewards);

    const images = node
      .find("img")
      .toArray()
      .map((image) => normalizeImageUrl($(image).attr("src")))
      .filter(Boolean) as string[];
    if (images.length && !node.find(".shiny-icon").length) section.images.push(...images);

    if (["p", "ul", "ol", "table"].includes(tag) && !node.find(".pkmn-list-item").length) {
      const text = cleanHtmlText(node.text());
      if (text && text.length > 2) section.text.push(text.slice(0, 800));
    }
  });

  const normalizedSections = sections
    .map((section) => ({
      ...section,
      text: uniqueBy(section.text, (text) => text).slice(0, 24),
      pokemon: uniqueBy(section.pokemon, (pokemon) => `${normalizeText(pokemon.name)}:${pokemon.image || ""}`).slice(0, 240),
      rewards: uniqueBy(section.rewards, (reward) => `${reward.text}:${reward.image || ""}`).slice(0, 120),
      images: uniqueBy(section.images, (image) => image).slice(0, 24),
    }))
    .filter((section) => section.text.length || section.pokemon.length || section.rewards.length || section.images.length);

  return {
    sourceUrl,
    sections: normalizedSections,
    pokemon: uniqueBy(normalizedSections.flatMap((section) => section.pokemon), (pokemon) => `${normalizeText(pokemon.name)}:${pokemon.image || ""}`).slice(0, 320),
    rewards: uniqueBy(normalizedSections.flatMap((section) => section.rewards), (reward) => `${reward.text}:${reward.image || ""}`).slice(0, 240),
    images: uniqueBy(normalizedSections.flatMap((section) => section.images), (image) => image).slice(0, 80),
  };
}

function matchPokemonCandidates(
  candidates: PokemonCandidate[],
  event: RawLeekDuckEvent,
  index: ReturnType<typeof loadPokemonIndex>,
) {
  const matched: PokemonFeaturedPokemon[] = [];
  const unmatched = new Set<string>();

  for (const candidate of candidates) {
    const result = enrichPokemonCandidate(candidate, index);
    matched.push(result.pokemon);
    if (!result.matched) unmatched.add(candidate.name);
  }

  const haystack = normalizeText(`${event.name || ""} ${event.heading || ""}`);
  if (haystack) {
    for (const local of index.entries) {
      const key = normalizeText(local.name);
      if (key && key.length > 2 && haystack.includes(key)) {
        matched.push({ ...local, rawAlias: local.englishName || local.name, sourceImage: null });
      }
      if (matched.length >= 24) break;
    }
  }

  return {
    featuredPokemon: uniqueBy(matched, (pokemon) => `${pokemon.id || normalizeText(pokemon.name)}:${pokemon.image || ""}`).slice(0, 240),
    unmatchedPokemon: [...unmatched],
  };
}

function enrichSections(
  sections: ScrapedDetailSection[],
  pokemonIndex: ReturnType<typeof loadPokemonIndex>,
  itemIndex: ReturnType<typeof loadItemIndex>,
  unmatchedPokemon: Set<string>,
  unmatchedItems: Set<string>,
) {
  let matchedCount = 0;
  let itemMatchedCount = 0;
  const enriched = sections.map((section): PokemonEventSection => {
    const pokemon: PokemonFeaturedPokemon[] = section.pokemon.map((candidate) => {
      const result = enrichPokemonCandidate(candidate, pokemonIndex);
      if (result.matched) matchedCount += 1;
      else unmatchedPokemon.add(candidate.name);
      return result.pokemon;
    });
    const rewards = section.rewards.map((reward) => {
      const result = enrichReward(reward, itemIndex);
      if (result.matched) itemMatchedCount += 1;
      else if (shouldReportUnmatchedReward(reward)) unmatchedItems.add(reward.sourceName || reward.text);
      return result.reward;
    });

    return {
      id: section.id,
      title: section.title,
      category: section.category,
      text: section.text,
      pokemon: uniqueBy(pokemon, (entry) => `${entry.id || normalizeText(entry.name)}:${entry.image || ""}`).slice(0, 240),
      rewards,
      images: section.images,
    };
  });

  return { sections: enriched, matchedCount, itemMatchedCount };
}

function collectBonuses(event: RawLeekDuckEvent) {
  const extra = event.extraData || {};
  const bonuses: string[] = [];
  const spotlight = extra.spotlight as Record<string, unknown> | undefined;
  const communityDay = extra.communityday as Record<string, unknown> | undefined;

  if (spotlight?.bonus) bonuses.push(String(spotlight.bonus));
  for (const bonus of Array.isArray(communityDay?.bonuses) ? communityDay.bonuses : []) {
    if (bonus && typeof bonus === "object") bonuses.push(String((bonus as Record<string, unknown>).text || ""));
  }
  for (const disclaimer of Array.isArray(communityDay?.bonusDisclaimers) ? communityDay.bonusDisclaimers : []) {
    bonuses.push(String(disclaimer || ""));
  }
  const generic = extra.generic as Record<string, unknown> | undefined;
  if (generic?.hasSpawns) bonuses.push("Spawns detailles disponibles sur LeekDuck.");
  if (generic?.hasFieldResearchTasks) bonuses.push("Field Research disponible sur LeekDuck.");

  return uniqueBy(bonuses.map((bonus) => bonus.trim()).filter(Boolean), (bonus) => bonus).slice(0, 80);
}

function collectRewards(event: RawLeekDuckEvent) {
  const rewards: PokemonEventReward[] = [];
  const visit = (value: unknown) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    if (record.reward && typeof record.reward === "object") {
      const reward = record.reward as Record<string, unknown>;
      const text = String(reward.text || "");
      rewards.push({ text, sourceName: text, image: normalizeImageUrl(reward.image), type: "task" });
    }
    if (record.text && record.image) {
      const text = String(record.text);
      rewards.push({ text, sourceName: text, image: normalizeImageUrl(record.image), type: "reward" });
    }
    Object.values(record).forEach(visit);
  };
  visit(event.extraData);
  return uniqueBy(rewards.filter((reward) => reward.text), (reward) => `${reward.text}:${reward.image || ""}`).slice(0, 160);
}

function describeEvent(event: RawLeekDuckEvent) {
  const parts = [event.heading, event.name].filter(Boolean).map(String);
  const extra = event.extraData || {};
  if ((extra.generic as Record<string, unknown> | undefined)?.hasSpawns) parts.push("Spawns detailles detectes.");
  if ((extra.generic as Record<string, unknown> | undefined)?.hasFieldResearchTasks) parts.push("Taches Field Research detectees.");
  return uniqueBy(parts, (part) => part).join(" - ");
}

async function mapLimit<T, R>(items: T[], limit: number, mapper: (item: T, index: number) => Promise<R>) {
  const results: R[] = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

type CanonicalRequest = Parameters<typeof resolveCanonicalPokemonAssets>[0][number];

function canonicalRequest(entry: PokemonFeaturedPokemon): CanonicalRequest {
  return {
    provider: "leekduck",
    rawAlias: String(entry.rawAlias || entry.name || entry.id || "").trim(),
    ...(Number(entry.dexId) > 0 ? { pokemonId: Number(entry.dexId) } : {}),
    ...(entry.form ? { form: entry.form } : {}),
    ...(entry.costume ? { costume: entry.costume } : {}),
  };
}

function canonicalRequestKey(request: CanonicalRequest) {
  return JSON.stringify([request.provider, request.rawAlias, request.pokemonId || null, request.form || null, request.costume || null]);
}

function canonicalPokemon(entry: PokemonFeaturedPokemon, resolution?: CanonicalAssetResolution): PokemonFeaturedPokemon {
  const identity = resolution?.identityResolution?.identity || null;
  const asset = resolution?.assetResolution || null;
  const sourceImage = entry.sourceImage || entry.image || null;
  if (resolution?.status !== "matched" || !identity || !asset || asset.status !== "matched") {
    return {
      ...entry,
      rawAlias: String(entry.rawAlias || entry.name || ""),
      sourceImage,
      image: null,
      shinyImage: null,
      canonicalId: typeof identity?.canonicalId === "string" ? identity.canonicalId : null,
      identityId: typeof identity?.identityId === "string" ? identity.identityId : null,
      resolutionStatus: resolution?.status || "unmatched",
      resolutionReason: resolution?.reason || resolution?.identityResolution?.reason || "CANONICAL_ID_NOT_FOUND",
      identity: identity ? { ...identity, provider: "leekduck", rawAlias: entry.rawAlias || entry.name, assetResolution: asset } : null,
    };
  }
  return {
    ...entry,
    id: String(identity.canonicalId || entry.id || ""),
    rawAlias: String(entry.rawAlias || entry.name || ""),
    sourceImage,
    image: typeof asset.image === "string" ? asset.image : null,
    shinyImage: typeof asset.shinyImage === "string" ? asset.shinyImage : null,
    canonicalId: String(identity.canonicalId),
    identityId: String(identity.identityId || ""),
    dexId: String(identity.pokemonId || entry.dexId || ""),
    form: typeof identity.form === "string" ? identity.form : undefined,
    costume: typeof identity.costume === "string" ? identity.costume : null,
    resolutionStatus: "matched",
    resolutionReason: null,
    identity: { ...identity, provider: "leekduck", rawAlias: entry.rawAlias || entry.name, assetResolution: asset },
  };
}

export async function canonicalizeLeekDuckPokemonEvents(
  events: PokemonCalendarEvent[],
  resolver: typeof resolveCanonicalPokemonAssets = resolveCanonicalPokemonAssets,
) {
  const lists = events.flatMap((event) => [
    event.featuredPokemon,
    event.wildSpawns || [],
    event.raids || [],
    event.eggs || [],
    event.researchRewards || [],
    ...(event.sections || []).map((section) => section.pokemon || []),
  ]);
  const requests = uniqueBy(
    lists.flat().map(canonicalRequest).filter((request) => request.rawAlias),
    canonicalRequestKey,
  );
  const resolutions = requests.length ? await resolver(requests) : [];
  const byRequest = new Map(resolutions.map((resolution) => [canonicalRequestKey(resolution.request), resolution]));
  const transform = (entry: PokemonFeaturedPokemon) => canonicalPokemon(entry, byRequest.get(canonicalRequestKey(canonicalRequest(entry))));
  const canonicalEvents = events.map((event) => ({
    ...event,
    featuredPokemon: event.featuredPokemon.map(transform),
    wildSpawns: event.wildSpawns?.map(transform),
    raids: event.raids?.map(transform),
    eggs: event.eggs?.map(transform),
    researchRewards: event.researchRewards?.map(transform),
    sections: event.sections?.map((section) => ({ ...section, pokemon: section.pokemon?.map(transform) })),
  }));
  const canonicalPokemonEntries = canonicalEvents.flatMap((event) => [
    ...event.featuredPokemon,
    ...(event.wildSpawns || []),
    ...(event.raids || []),
    ...(event.eggs || []),
    ...(event.researchRewards || []),
  ]);
  return {
    events: canonicalEvents,
    matched: canonicalPokemonEntries.filter((entry) => entry.resolutionStatus === "matched").length,
    unmatched: uniqueBy(
      canonicalPokemonEntries.filter((entry) => entry.resolutionStatus !== "matched"),
      (entry) => `${entry.rawAlias || entry.name}:${entry.resolutionReason || "unknown"}`,
    ),
  };
}

export async function scrapeLeekDuckEvents() {
  const [feed, scrapedDuck] = await Promise.all([
    fetchJson<RawLeekDuckEvent[]>(leekDuckEventsFeedUrl),
    fetchJson<RawLeekDuckEvent[]>(scrapedDuckEventsUrl, true),
  ]);
  const sourceEvents = Array.isArray(feed) ? feed : [];
  if (!sourceEvents.length) throw new Error("No events parsed from LeekDuck feed");

  const scrapedDuckById = new Map((Array.isArray(scrapedDuck) ? scrapedDuck : []).map((event) => [event.eventID, event]));
  const pokemonIndex = loadPokemonIndex();
  const itemIndex = loadItemIndex();
  const unmatchedPokemon = new Set<string>();
  const unmatchedItems = new Set<string>();
  let pokemonMatched = 0;
  let itemMatched = 0;
  let eventsSkipped = 0;
  let imagesRecovered = 0;
  let detailPagesVisited = 0;
  let detailErrors = 0;
  let detailPokemonExtracted = 0;
  let sectionsExtracted = 0;

  const eventResults = await mapLimit(sourceEvents, 5, async (feedEvent) => {
    const id = String(feedEvent.eventID || "");
    const scrapedDuckEvent = scrapedDuckById.get(id);
    const enriched = {
      ...(scrapedDuckEvent || {}),
      ...feedEvent,
      extraData: scrapedDuckEvent?.extraData || feedEvent.extraData || null,
    };
    const startDate = safeDate(enriched.start);
    const endDate = safeDate(enriched.end);
    if (!id || !enriched.name || !startDate || !endDate) {
      eventsSkipped += 1;
      return null;
    }

    let detail: Awaited<ReturnType<typeof scrapeEventDetail>> = null;
    try {
      detail = await scrapeEventDetail(enriched);
      if (detail) {
        detailPagesVisited += 1;
        detailPokemonExtracted += detail.pokemon.length;
        sectionsExtracted += detail.sections.length;
      }
    } catch (error) {
      detailErrors += 1;
      console.warn("[events-calendar] Detail scrape failed", {
        id,
        url: enriched.link,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    const detailEnriched = detail
      ? enrichSections(detail.sections, pokemonIndex, itemIndex, unmatchedPokemon, unmatchedItems)
      : { sections: [] as PokemonEventSection[], matchedCount: 0, itemMatchedCount: 0 };
    pokemonMatched += detailEnriched.matchedCount;
    itemMatched += detailEnriched.itemMatchedCount;

    const explicitCandidates = collectPokemonCandidates(enriched);
    const allCandidates = uniqueBy(
      [...explicitCandidates, ...(detail?.pokemon || [])],
      (pokemon) => `${normalizeText(pokemon.name)}:${pokemon.image || ""}`,
    );
    const matched = matchPokemonCandidates(allCandidates, enriched, pokemonIndex);
    matched.unmatchedPokemon.forEach((name) => unmatchedPokemon.add(name));
    pokemonMatched += matched.featuredPokemon.filter((pokemon) => pokemon.id).length;
    imagesRecovered += matched.featuredPokemon.filter((pokemon) => pokemon.image).length;
    if (enriched.image) imagesRecovered += 1;
    if (detail?.images?.length) imagesRecovered += detail.images.length;

    const type = normalizeLeekDuckType(enriched.eventType, enriched.heading);
    const categoryPokemon = (category: PokemonEventSection["category"]) =>
      uniqueBy(
        detailEnriched.sections
          .filter((section) => section.category === category)
          .flatMap((section) => section.pokemon || []),
        (pokemon) => `${pokemon.id || normalizeText(pokemon.name)}:${pokemon.image || ""}`,
      ).slice(0, 240);
    const feedRewards = collectRewards(enriched).map((reward) => {
      const result = enrichReward(reward, itemIndex);
      if (result.matched) itemMatched += 1;
      else if (shouldReportUnmatchedReward(reward)) unmatchedItems.add(reward.sourceName || reward.text);
      return result.reward;
    });
    const detailRewards = detailEnriched.sections.flatMap((section) => section.rewards || []);
    const detailBonuses = detailEnriched.sections
      .filter((section) => section.category === "bonuses" || section.category === "tickets")
      .flatMap((section) => section.text || [])
      .slice(0, 80);
    const description = uniqueBy(
      [
        describeEvent(enriched),
        ...(detailEnriched.sections.find((section) => section.id === "resume")?.text || []),
      ].filter(Boolean),
      (part) => part,
    ).join(" - ");

    const event: PokemonCalendarEvent = {
      id,
      title: String(enriched.name),
      description,
      type,
      category: String(enriched.heading || enriched.eventType || ""),
      startDate,
      endDate,
      timezone: POKEMON_EVENT_TIMEZONE,
      status: "upcoming",
      source: "leekduck",
      sourceUrl: String(enriched.link || detail?.sourceUrl || leekDuckEventsUrl),
      images: {
        banner: normalizeImageUrl(enriched.image),
        thumbnail: normalizeImageUrl(enriched.image),
      },
      assets: {
        banner: normalizeImageUrl(enriched.image),
        icon: null,
      },
      featuredPokemon: matched.featuredPokemon,
      wildSpawns: categoryPokemon("wildSpawns"),
      raids: categoryPokemon("raids"),
      eggs: categoryPokemon("eggs"),
      researchRewards: categoryPokemon("researchRewards"),
      sections: detailEnriched.sections,
      bonuses: uniqueBy([...collectBonuses(enriched), ...detailBonuses], (bonus) => bonus).slice(0, 120),
      rewards: uniqueBy([...feedRewards, ...detailRewards], (reward) => `${reward.id || reward.text}:${reward.image || ""}`).slice(0, 240),
      links: [{ label: "LeekDuck", url: String(enriched.link || leekDuckEventsUrl) }],
      raw: {
        eventID: id,
        eventType: enriched.eventType,
        heading: enriched.heading,
        link: enriched.link,
        image: normalizeImageUrl(enriched.image),
        extraData: enriched.extraData || null,
        detail: detail ? {
          sections: detail.sections.length,
          pokemonExtracted: detail.pokemon.length,
          rewardsExtracted: detail.rewards.length,
          imagesExtracted: detail.images.length,
        } : null,
      },
    };
    return event;
  });
  const parsedEvents = eventResults.filter(Boolean) as PokemonCalendarEvent[];
  const canonical = await canonicalizeLeekDuckPokemonEvents(parsedEvents);
  const events = canonical.events;
  unmatchedPokemon.clear();
  canonical.unmatched.forEach((entry) => unmatchedPokemon.add(entry.rawAlias || entry.name));
  pokemonMatched = canonical.matched;

  const report = {
    success: true,
    source: "leekduck-events",
    sourceUrl: leekDuckEventsFeedUrl,
    pageUrl: leekDuckEventsUrl,
    referenceUrl: "https://github.com/bigfoott/ScrapedDuck",
    jsonFilename: "pokemon-go-events.json",
    eventsParsed: events.length,
    eventsSkipped,
    detailPagesVisited,
    detailErrors,
    detailPokemonExtracted,
    sectionsExtracted,
    pokemonMatched,
    pokemonUnmatched: unmatchedPokemon.size,
    unmatchedPokemon: [...unmatchedPokemon].sort(),
    itemMatched,
    itemUnmatched: unmatchedItems.size,
    unmatchedItems: [...unmatchedItems].sort(),
    imagesRecovered,
    scrapedDuckEvents: Array.isArray(scrapedDuck) ? scrapedDuck.length : 0,
    updatedAt: new Date().toISOString(),
  };

  console.info("[events-calendar] LeekDuck scrape report", report);
  return { events, report };
}

/* eslint-disable @typescript-eslint/no-require-imports */
import fs from "node:fs";
import path from "node:path";
import {
  POKEMON_EVENT_TIMEZONE,
  POKEMON_EVENT_TYPES,
  type PokemonCalendarEvent,
  type PokemonEventReward,
  type PokemonEventType,
  type PokemonFeaturedPokemon,
} from "@/data/pokemon-events";

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
  image?: string;
  dexId?: string;
  form?: string;
  types?: string[];
  shiny?: boolean;
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
      const displayName = String(names.English || names.French || data.slug || data.id || "").trim();
      if (!displayName) continue;
      const entry: PokemonIndexEntry = {
        id: String(data.id || ""),
        name: displayName,
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
      candidates.push({ name: String(record.name || ""), image: String(record.image || ""), shiny: Boolean(record.canBeShiny) });
    }
  }
  for (const spawn of Array.isArray(communityDay?.spawns) ? communityDay.spawns : []) {
    if (spawn && typeof spawn === "object") {
      const record = spawn as Record<string, unknown>;
      candidates.push({ name: String(record.name || ""), image: String(record.image || "") });
    }
  }
  for (const item of Array.isArray(spotlight?.list) ? spotlight.list : []) {
    if (item && typeof item === "object") {
      const record = item as Record<string, unknown>;
      candidates.push({ name: String(record.name || ""), image: String(record.image || ""), shiny: Boolean(record.canBeShiny) });
    }
  }
  if (spotlight?.name) {
    candidates.push({ name: String(spotlight.name), image: String(spotlight.image || ""), shiny: Boolean(spotlight.canBeShiny) });
  }

  return candidates.filter((pokemon) => pokemon.name);
}

function matchPokemon(
  event: RawLeekDuckEvent,
  index: ReturnType<typeof loadPokemonIndex>,
) {
  const explicit = collectPokemonCandidates(event);
  const matched: PokemonFeaturedPokemon[] = [];
  const unmatched = new Set<string>();

  for (const candidate of explicit) {
    const local = index.lookup.get(normalizeText(candidate.name));
    if (local) {
      matched.push({ ...local, shiny: candidate.shiny || local.shiny });
    } else {
      matched.push({ name: candidate.name, image: candidate.image, shiny: candidate.shiny });
      unmatched.add(candidate.name);
    }
  }

  const haystack = normalizeText(`${event.name || ""} ${event.heading || ""}`);
  if (haystack) {
    for (const local of index.entries) {
      const key = normalizeText(local.name);
      if (key && key.length > 2 && haystack.includes(key)) matched.push(local);
      if (matched.length >= 24) break;
    }
  }

  return {
    featuredPokemon: uniqueBy(matched, (pokemon) => pokemon.id || pokemon.name).slice(0, 80),
    unmatchedPokemon: [...unmatched],
  };
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
      rewards.push({ text: String(reward.text || ""), image: typeof reward.image === "string" ? reward.image : null, type: "task" });
    }
    if (record.text && record.image) {
      rewards.push({ text: String(record.text), image: typeof record.image === "string" ? record.image : null, type: "reward" });
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

export async function scrapeLeekDuckEvents() {
  const [feed, scrapedDuck] = await Promise.all([
    fetchJson<RawLeekDuckEvent[]>(leekDuckEventsFeedUrl),
    fetchJson<RawLeekDuckEvent[]>(scrapedDuckEventsUrl, true),
  ]);
  const sourceEvents = Array.isArray(feed) ? feed : [];
  if (!sourceEvents.length) throw new Error("No events parsed from LeekDuck feed");

  const scrapedDuckById = new Map((Array.isArray(scrapedDuck) ? scrapedDuck : []).map((event) => [event.eventID, event]));
  const pokemonIndex = loadPokemonIndex();
  const unmatchedPokemon = new Set<string>();
  let pokemonMatched = 0;
  let eventsSkipped = 0;
  let imagesRecovered = 0;

  const events = sourceEvents.flatMap((feedEvent) => {
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
      return [];
    }

    const matched = matchPokemon(enriched, pokemonIndex);
    matched.unmatchedPokemon.forEach((name) => unmatchedPokemon.add(name));
    pokemonMatched += matched.featuredPokemon.filter((pokemon) => pokemon.id).length;
    imagesRecovered += matched.featuredPokemon.filter((pokemon) => pokemon.image).length;
    if (enriched.image) imagesRecovered += 1;

    const type = normalizeLeekDuckType(enriched.eventType, enriched.heading);
    const event: PokemonCalendarEvent = {
      id,
      title: String(enriched.name),
      description: describeEvent(enriched),
      type,
      category: String(enriched.heading || enriched.eventType || ""),
      startDate,
      endDate,
      timezone: POKEMON_EVENT_TIMEZONE,
      status: "upcoming",
      source: "leekduck",
      assets: {
        banner: typeof enriched.image === "string" ? enriched.image : null,
        icon: null,
      },
      featuredPokemon: matched.featuredPokemon,
      bonuses: collectBonuses(enriched),
      rewards: collectRewards(enriched),
      links: [{ label: "LeekDuck", url: String(enriched.link || leekDuckEventsUrl) }],
      raw: {
        eventID: id,
        eventType: enriched.eventType,
        heading: enriched.heading,
        link: enriched.link,
        image: enriched.image,
        extraData: enriched.extraData || null,
      },
    };
    return [event];
  });

  const report = {
    success: true,
    source: "leekduck-events",
    sourceUrl: leekDuckEventsFeedUrl,
    pageUrl: leekDuckEventsUrl,
    referenceUrl: "https://github.com/bigfoott/ScrapedDuck",
    jsonFilename: "pokemon-go-events.json",
    eventsParsed: events.length,
    eventsSkipped,
    pokemonMatched,
    pokemonUnmatched: unmatchedPokemon.size,
    unmatchedPokemon: [...unmatchedPokemon].sort(),
    imagesRecovered,
    scrapedDuckEvents: Array.isArray(scrapedDuck) ? scrapedDuck.length : 0,
    updatedAt: new Date().toISOString(),
  };

  console.info("[events-calendar] LeekDuck scrape report", report);
  return { events, report };
}

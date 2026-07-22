import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import communityStore from "../src/lib/community-days-store.ts";
import archiveStore from "../src/lib/events-archive-store.ts";
import leekDuckStore from "../src/lib/leekduck-events-scraper.ts";
import type { PokemonCalendarEvent } from "../src/data/pokemon-events.ts";

const { normalizeCommunityDay } = communityStore;
const { normalizeArchivedEvent, synchronizeEventsArchive } = archiveStore;
const { canonicalizeLeekDuckPokemonEvents } = leekDuckStore;

class MemoryCursor<T extends Record<string, unknown>> {
  constructor(private documents: T[]) {}
  sort() { return this; }
  skip() { return this; }
  limit() { return this; }
  async toArray() { return this.documents.map((item) => structuredClone(item)); }
}

class MemoryCollection<T extends Record<string, unknown>> {
  documents: T[] = [];
  async createIndex() { return "index"; }
  find() { return new MemoryCursor(this.documents); }
  async insertOne(document: T) { this.documents.push(structuredClone(document)); return { insertedId: String(this.documents.length) }; }
  async updateOne(filter: Record<string, unknown>, update: Record<string, Record<string, unknown>>) {
    const key = Object.keys(filter)[0];
    const document = this.documents.find((item) => item[key] === filter[key]);
    if (!document) return { matchedCount: 0 };
    Object.assign(document, structuredClone(update.$set || {}));
    for (const [field, amount] of Object.entries(update.$inc || {})) document[field] = Number(document[field] || 0) + Number(amount);
    for (const [field, value] of Object.entries(update.$push || {})) {
      const list = Array.isArray(document[field]) ? document[field] as unknown[] : [];
      list.push(structuredClone(value));
      document[field] = list as T[string];
    }
    return { matchedCount: 1 };
  }
  async updateMany(filter: Record<string, { $in: unknown[] }>, update: Record<string, Record<string, unknown>>) {
    const key = Object.keys(filter)[0];
    for (const document of this.documents) if (filter[key].$in.includes(document[key])) Object.assign(document, structuredClone(update.$set || {}));
  }
  async countDocuments() { return this.documents.length; }
}

class MemoryDb {
  archive = new MemoryCollection<Record<string, unknown>>();
  collection() { return this.archive; }
}

function event(overrides: Partial<PokemonCalendarEvent> = {}): PokemonCalendarEvent {
  return {
    id: "event-1",
    title: "Événement test",
    description: "Description",
    type: "event",
    startDate: "2026-07-16T10:00:00.000Z",
    endDate: "2026-07-17T10:00:00.000Z",
    timezone: "Europe/Paris",
    status: "current",
    source: "leekduck",
    sourceUrl: "https://leekduck.com/events/test/",
    assets: { banner: "https://leekduck.com/test.webp", icon: null },
    featuredPokemon: [{ id: "PIKACHU", name: "Pikachu" }],
    bonuses: ["Bonus initial"],
    links: [],
    ...overrides,
  };
}

function canonicalPikachu() {
  return new Map([["Pikachu", {
    request: { provider: "pogoapi", rawAlias: "Pikachu" },
    status: "matched",
    reason: null,
    identityResolution: {
      status: "matched",
      strategy: "provider-exact",
      confidence: 1,
      identity: { identityId: "identity-25", canonicalId: "PIKACHU_NORMAL", pokemonId: 25, form: null, costume: null },
    },
    assetResolution: {
      status: "matched",
      reason: null,
      image: "https://assets.example/pm25.icon.png",
      shinyImage: "https://assets.example/pm25.s.icon.png",
      selectedIsFemale: false,
      trace: { canonicalId: "PIKACHU_NORMAL" },
    },
  }]]) as never;
}

test("normalise un Community Day avec identité stable, assets normaux/shiny et aucun champ de stats", () => {
  const normalized = normalizeCommunityDay({
    bonuses: ["Double XP"],
    boosted_pokemon: ["Pikachu"],
    community_day_number: 1,
    end_date: "2018-01-20",
    event_moves: [{ move: "Surf", move_type: "charged", pokemon: "Pikachu" }],
    start_date: "2018-01-20",
  }, new Date("2026-07-16T00:00:00.000Z"), canonicalPikachu());
  assert.equal(normalized.document.id, "community-day-2018-01-pikachu");
  assert.equal(normalized.document.featuredPokemon[0].pokemonId, "PIKACHU_NORMAL");
  assert.equal(normalized.document.featuredPokemon[0].canonicalId, "PIKACHU_NORMAL");
  assert.ok(normalized.document.featuredPokemon[0].image);
  assert.ok(normalized.document.featuredPokemon[0].shinyImage);
  assert.equal(normalized.document.exclusiveMoves[0].move, "Surf");
  assert.equal("stats" in normalized.document, false);
  assert.equal("cp" in normalized.document, false);
});

test("un Community Day sans résolution Identity Manager reste diagnostiqué sans fallback local", () => {
  const normalized = normalizeCommunityDay({
    boosted_pokemon: ["Pikachu"],
    community_day_number: 1,
    start_date: "2018-01-20",
    end_date: "2018-01-20",
  });
  assert.equal(normalized.document.featuredPokemon[0].image, null);
  assert.equal(normalized.document.featuredPokemon[0].resolutionReason, "CANONICAL_ID_NOT_FOUND");
  assert.equal(normalized.document.featuredPokemon[0].rawAlias, "Pikachu");
  assert.equal((normalized.document.featuredPokemon[0].resolutionDiagnostic as Record<string, unknown>).normalizedAlias, "pikachu");
  assert.equal(normalized.diagnostics[0].provider, "pogoapi");
});

test("LeekDuck remplace l'image source par l'asset canonique et conserve la source pour l'audit", async () => {
  const source = event({
    featuredPokemon: [{ name: "Pikachu (Flying)", rawAlias: "Pikachu (Flying)", image: "https://leekduck.com/pikachu.png" }],
  });
  const result = await canonicalizeLeekDuckPokemonEvents([source], async (requests) => requests.map((request) => ({
    request,
    status: "matched",
    reason: null,
    identityResolution: {
      status: "matched",
      identity: { identityId: "identity-flying", canonicalId: "PIKACHU_COSTUME_2020", pokemonId: 25, form: null, costume: "COSTUME_2020" },
    },
    assetResolution: {
      status: "matched",
      image: "https://assets.example/pm25.fCOSTUME_2020.icon.png",
      shinyImage: "https://assets.example/pm25.fCOSTUME_2020.s.icon.png",
    },
  })) as never);
  const pokemon = result.events[0].featuredPokemon[0];
  assert.equal(pokemon.canonicalId, "PIKACHU_COSTUME_2020");
  assert.equal(pokemon.image, "https://assets.example/pm25.fCOSTUME_2020.icon.png");
  assert.equal(pokemon.sourceImage, "https://leekduck.com/pikachu.png");
  assert.equal(result.unmatched.length, 0);
});

test("refuse une entrée Community Day invalide", () => {
  assert.throws(() => normalizeCommunityDay({ boosted_pokemon: [], community_day_number: 2, start_date: "bad", end_date: "bad" }), /invalid-source-entry/);
});

test("normalise une date sans zéro et diagnostique une date de fin source corrompue", () => {
  const shortDate = normalizeCommunityDay({ boosted_pokemon: ["Pikachu"], community_day_number: 12, start_date: "2018-11-30", end_date: "2018-12-2" });
  const corruptDate = normalizeCommunityDay({ boosted_pokemon: ["Chansey"], community_day_number: 74, start_date: "2024-02-04", end_date: "204-02-04" });
  assert.equal(shortDate.document.endDate.toISOString().slice(0, 10), "2018-12-02");
  assert.equal(corruptDate.document.endDate.toISOString(), corruptDate.document.startDate.toISOString());
  assert.equal(corruptDate.diagnostics[0].reason, "invalid-source-entry");
});

test("l'identité archive ne change pas lors d'une correction légère du titre", () => {
  const first = normalizeArchivedEvent(event());
  const renamed = normalizeArchivedEvent(event({ title: "Événement test corrigé" }));
  assert.equal(first.canonicalKey, renamed.canonicalKey);
  assert.notEqual(first.sourceHash, renamed.sourceHash);
});

test("l'archive insère, évite les doublons, crée une révision et conserve un absent du flux", async () => {
  const db = new MemoryDb();
  const initial = await synchronizeEventsArchive([event()], db as never);
  const identical = await synchronizeEventsArchive([event()], db as never);
  const modified = await synchronizeEventsArchive([event({ bonuses: ["Bonus corrigé"] })], db as never);
  const absent = await synchronizeEventsArchive([], db as never);
  assert.deepEqual([initial.added, identical.added, identical.modified], [1, 0, 0]);
  assert.equal(modified.modified, 1);
  assert.equal(modified.revisionsCreated, 1);
  assert.equal(absent.removedFromFeed, 1);
  assert.equal(db.archive.documents.length, 1);
  assert.equal(db.archive.documents[0].revision, 2);
  assert.equal((db.archive.documents[0].revisionHistory as unknown[]).length, 1);
  assert.equal(db.archive.documents[0].activeInCurrentFeed, false);
  assert.equal(db.archive.documents[0].archived, true);
});

test("deux identités source distinctes sont conservées même si titre et dates sont identiques", async () => {
  const db = new MemoryDb();
  const result = await synchronizeEventsArchive([event({ id: "source-a" }), event({ id: "source-b" })], db as never);
  assert.equal(result.added, 2);
  assert.equal(result.total, 2);
});

test("une entrée source strictement dupliquée est ignorée", async () => {
  const db = new MemoryDb();
  const result = await synchronizeEventsArchive([event(), event()], db as never);
  assert.equal(result.added, 1);
  assert.equal(result.total, 1);
});

test("une collision ambiguë de sourceId est conservée sous deux clés et diagnostiquée", async () => {
  const db = new MemoryDb();
  const result = await synchronizeEventsArchive([event({ title: "Version A" }), event({ title: "Version B" })], db as never);
  assert.equal(result.added, 2);
  assert.equal(result.ambiguities.length, 1);
  assert.equal(db.archive.documents.length, 2);
});

test("les routes de synchronisation restent privées et aucune consultation ne lance un scrape", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const communityRoute = fs.readFileSync(path.join(root, "src/app/api/admin/community-days/sync/route.ts"), "utf8");
  const dynamaxReadRoute = fs.readFileSync(path.join(root, "src/app/api/admin/dynamax-images/route.ts"), "utf8");
  const archiveSource = fs.readFileSync(path.join(root, "src/lib/events-archive-store.ts"), "utf8");
  assert.match(communityRoute, /getSession\(\)/);
  assert.match(communityRoute, /assertSameOrigin/);
  assert.doesNotMatch(dynamaxReadRoute.match(/export async function GET[\s\S]*?export async function DELETE/)?.[0] || "", /scan|scrape/i);
  assert.doesNotMatch(archiveSource, /deleteOne|deleteMany/);
});

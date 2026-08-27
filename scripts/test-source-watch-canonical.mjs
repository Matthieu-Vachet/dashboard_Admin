import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const directory = path.dirname(fileURLToPath(import.meta.url));
process.env.POKEMON_GO_DATA_DIR = path.resolve(directory, "../../PokemonGo-Data");

const require = createRequire(import.meta.url);
const { inspectSource, readSources } = require("../src/server/pokemon-go/apps/checklist/server/source-watch");

test("la veille PvPoke ne référence que les distributions canoniques du pipeline", () => {
  const sources = readSources().filter((source) => source.provider === "PvPoke");
  assert.deepEqual(sources.map((source) => source.id).sort(), [
    "pvpoke-gamemaster",
    "pvpoke-rankings-repository",
  ]);
  for (const source of sources) {
    assert.equal(source.type, "pvpoke-pipeline");
    assert.match(source.url, /^https:\/\/cdn\.jsdelivr\.net\/gh\/pvpoke\/pvpoke@master\//);
    assert.doesNotMatch(source.url, /^https:\/\/pvpoke\.com\//);
  }
});

test("le contrôle PvPoke expose HTTP, commit, hash, snapshot et date de vérification", async () => {
  const source = readSources().find((entry) => entry.id === "pvpoke-rankings-repository");
  const content = JSON.stringify([{ speciesId: "bulbasaur" }]);
  const commit = "a".repeat(40);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const value = String(url);
    if (value === source.url) return new Response(content, { status: 200 });
    if (value === source.metadataUrl) return Response.json({ tree: [{ path: "src/data/rankings/all/overall/rankings-1500.json" }] });
    if (value.includes("/commits/master")) {
      return Response.json({
        sha: commit,
        html_url: `https://github.com/pvpoke/pvpoke/commit/${commit}`,
        commit: { committer: { date: "2026-08-27T00:00:00.000Z" } },
      });
    }
    throw new Error(`URL inattendue: ${value}`);
  };

  try {
    const checkedAt = "2026-08-27T06:00:00.000Z";
    const result = await inspectSource(source, checkedAt);
    assert.equal(result.status, "ok");
    assert.equal(result.provider, "PvPoke");
    assert.equal(result.checkedUrl, source.url);
    assert.equal(result.httpStatus, 200);
    assert.equal(result.metadataHttpStatus, 200);
    assert.equal(result.commit, commit);
    assert.equal(result.contentHash, createHash("sha256").update(content).digest("hex"));
    assert.equal(result.checkedAt, checkedAt);
    assert.match(result.snapshotCommit, /^[a-f0-9]{40}$/);
    assert.match(result.snapshotHash, /^[a-f0-9]{64}$/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

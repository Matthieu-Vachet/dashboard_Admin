import assert from "node:assert/strict";
import test from "node:test";
import {
  sourceCause,
  sourceMatchesQuery,
  sourceMatchesStatus,
  sourceSignature,
  sourceStatusKind,
  sourceStatusLabel,
} from "../src/lib/source-watch-presentation.ts";

test("un HTTP 403 reste un warning lisible et surveillé", () => {
  const source = {
    name: "Pokémon GO Hub Best Gym Defenders",
    status: "warning",
    message: "Source distante temporairement indisponible (HTTP 403).",
  };
  assert.equal(sourceStatusKind(source.status), "warning");
  assert.equal(sourceStatusLabel(source.status), "À surveiller");
  assert.match(sourceCause(source), /Accès distant refusé \(HTTP 403\)/);
  assert.match(sourceCause(source), /reste enregistrée/);
});

test("une source OK conserve sa cause et son empreinte complète", () => {
  const source = {
    status: "ok",
    message: "Site accessible.",
    signature: "8cce7e668b12a1d5d7e09977f562705230000000",
    version: "8cce7e668b12",
  };
  assert.equal(sourceStatusKind(source.status), "ok");
  assert.equal(sourceStatusLabel(source.status), "Opérationnelle");
  assert.equal(sourceCause(source), "Site accessible.");
  assert.equal(sourceSignature(source), source.signature);
});

test("la recherche accepte accents, URL, catégorie, hash et libellés longs", () => {
  const source = {
    name: "LeekDuck Current Research Tasks — libellé volontairement très long pour le contrôle responsive",
    url: "https://leekduck.com/research/",
    category: "research-tasks",
    signature: "long-source-hash-123",
  };
  for (const query of ["libelle", "leekduck.com", "research-tasks", "hash-123"]) {
    assert.equal(sourceMatchesQuery(source, query), true);
  }
  assert.equal(sourceMatchesQuery(source, "PvPoke"), false);
});

test("la recherche couvre les preuves techniques du contrôle canonique", () => {
  const source = {
    name: "PvPoke Rankings",
    provider: "PvPoke",
    checkedUrl: "https://cdn.jsdelivr.net/gh/pvpoke/pvpoke@master/src/data/rankings/all/overall/rankings-1500.json",
    commit: "cb78be32371e6f4789680a83c89d085e3fb37954",
    contentHash: "645a6725597bfe68e13d9c87199bd2c08890dfcb860505d080d85fb63b32c60f",
    snapshotCommit: "78c64048aebeb9265e1a090137c5463880fb6fa2",
  };
  for (const query of ["PvPoke", "jsdelivr", "cb78be32371e", "645a6725597b", "78c64048aebe"]) {
    assert.equal(sourceMatchesQuery(source, query), true);
  }
});

test("les filtres de statut regroupent les états inconnus avec les erreurs", () => {
  assert.equal(sourceMatchesStatus({ status: "ok" }, "ok"), true);
  assert.equal(sourceMatchesStatus({ status: "warning" }, "warning"), true);
  assert.equal(sourceMatchesStatus({ status: "unsupported" }, "error"), true);
  assert.equal(sourceMatchesStatus({ status: "warning" }, "error"), false);
  assert.equal(sourceMatchesStatus({ status: "warning" }, "all"), true);
});

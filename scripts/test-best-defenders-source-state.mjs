import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { bestDefendersSourceIssue } from "../src/lib/best-defenders-source-state.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("un run Cloudflare devient un warning SOURCE_PROTECTED non retryable", () => {
  const issue = bestDefendersSourceIssue({
    run: {
      status: "failed",
      errors: [{
        code: "SOURCE_PROTECTED",
        message: "HTTP 403 · protection Cloudflare active",
        details: { retryable: false, preservation: "Conserver le current MongoDB." },
      }],
    },
  });
  assert.deepEqual(issue, {
    code: "SOURCE_PROTECTED",
    title: "Source protégée par le fournisseur",
    message: "HTTP 403 · protection Cloudflare active",
    preservation: "Conserver le current MongoDB.",
    retryable: false,
  });
});

test("une erreur de run Cloudflare conserve son diagnostic structure", () => {
  const error = new Error("La régénération de fond a échoué.");
  error.run = {
    status: "failed",
    errors: [{
      code: "SOURCE_PROTECTED",
      message: "Cloudflare protège la source.",
      details: { preservation: "Conserver le snapshot." },
    }],
  };
  const issue = bestDefendersSourceIssue(error);
  assert.equal(issue?.code, "SOURCE_PROTECTED");
  assert.equal(issue?.preservation, "Conserver le snapshot.");
});

test("le diagnostic MongoDB persistant expose SOURCE_TEMPORARILY_UNAVAILABLE", () => {
  const issue = bestDefendersSourceIssue({
    data: {
      meta: {
        diagnostics: {
          sourceAvailability: {
            code: "SOURCE_TEMPORARILY_UNAVAILABLE",
            message: "Page HTML inattendue",
            retryable: true,
            preservation: "Le dernier snapshot reste actif.",
          },
        },
      },
    },
  });
  assert.equal(issue.code, "SOURCE_TEMPORARILY_UNAVAILABLE");
  assert.equal(issue.retryable, true);
  assert.equal(issue.preservation, "Le dernier snapshot reste actif.");
});

test("les erreurs de schéma et de validation conservent le snapshot", () => {
  const schema = bestDefendersSourceIssue({ errors: [{ code: "SOURCE_SCHEMA_CHANGED" }] });
  const validation = bestDefendersSourceIssue({ errors: [{ code: "VALIDATION_FAILED" }] });
  assert.equal(schema?.title, "Structure de la source modifiée");
  assert.equal(validation?.title, "Capture fournisseur rejetée");
});

test("une erreur étrangère au provider n'est pas présentée comme une disponibilité source", () => {
  assert.equal(bestDefendersSourceIssue({ errors: [{ code: "MONGO_WRITE_FAILED" }] }), null);
});

test("le panneau conserve le dataset et rend un warning de disponibilité explicite", () => {
  const panel = fs.readFileSync(path.join(rootDir, "src", "components", "admin", "pokemon", "best-defenders-panel.jsx"), "utf8");
  assert.match(panel, /data-source-availability=\{sourceIssue\.code\}/);
  assert.match(panel, /La dernière version MongoDB validée reste affichée/);
  assert.match(panel, /setDataset\(payload\.data\)/);
  assert.match(panel, /bestDefendersSourceIssue\(caught\) \|\| await load\(\)/);
  assert.match(panel, /https:\/\/db\.pokemongohub\.net\/best\/gym-defenders/);
});

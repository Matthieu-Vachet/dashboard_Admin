import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import {
  CANDY_FAMILY_PAGE_SIZE,
  paginateCandyFamilies,
} from "../src/lib/candy-family-pagination.mjs";

const root = process.cwd();

test("la pagination conserve une densité de neuf familles et expose les totaux", () => {
  const families = Array.from({ length: 22 }, (_, index) => ({ familyId: index + 1 }));
  const first = paginateCandyFamilies(families, 1);
  const last = paginateCandyFamilies(families, 3);

  assert.equal(CANDY_FAMILY_PAGE_SIZE, 9);
  assert.deepEqual(first.items.map(({ familyId }) => familyId), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.deepEqual(
    {
      currentPage: first.currentPage,
      totalItems: first.totalItems,
      totalPages: first.totalPages,
      rangeStart: first.rangeStart,
      rangeEnd: first.rangeEnd,
    },
    { currentPage: 1, totalItems: 22, totalPages: 3, rangeStart: 1, rangeEnd: 9 },
  );
  assert.deepEqual(last.items.map(({ familyId }) => familyId), [19, 20, 21, 22]);
  assert.equal(last.rangeStart, 19);
  assert.equal(last.rangeEnd, 22);
});

test("les pages hors limites sont ramenées dans la plage valide", () => {
  const families = Array.from({ length: 10 }, (_, index) => index);
  assert.equal(paginateCandyFamilies(families, -4).currentPage, 1);
  assert.equal(paginateCandyFamilies(families, 99).currentPage, 2);
  assert.deepEqual(paginateCandyFamilies([], 8), {
    items: [],
    currentPage: 1,
    pageSize: 9,
    totalItems: 0,
    totalPages: 1,
    rangeStart: 0,
    rangeEnd: 0,
  });
});

test("Candies réinitialise la page sur recherche ou changement d'entrées sans toucher Collections", () => {
  const candySource = fs.readFileSync(
    path.join(root, "src/components/admin/pokemon/candy-panel.jsx"),
    "utf8",
  );
  const collectionsSource = fs.readFileSync(
    path.join(root, "src/components/admin/pokemon/collections-panel.jsx"),
    "utf8",
  );

  assert.match(candySource, /pageState\.search === search && pageState\.entries === entries/);
  assert.match(candySource, /setPageState\(\{ entries, page: next, search \}\)/);
  assert.match(candySource, /Précédent/);
  assert.match(candySource, /Suivant/);
  assert.match(candySource, /Page \{formatCount\(currentPage\)\} sur/);
  assert.doesNotMatch(collectionsSource, /candy-family-pagination|CandyPagination/);
});

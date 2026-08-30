# Baseline — polish du Dashboard Pokémon

- Date : 23 août 2026
- Branche : `develop`
- SHA initial : `186adb2b99de3be49535b06f7d6b35609ff59caf`
- `origin/develop` initial : `186adb2b99de3be49535b06f7d6b35609ff59caf`
- `origin/main` initial et référence immuable de mission : `103a0f3bd2f59298760f8b6cd0e01767b4d8159b`

## Versions et runtime

- Dashboard : `1.50.0`.
- Next.js : `16.2.12`.
- Snapshot Data matérialisé par le `prebuild` : `PokemonGo-Data 1.28.0`, commit `2869aba4d19e9313db2055a13cf69dc9d0c3c3a5`.
- API publique déclarée par le dépôt voisin : `1.0.1` ; l'application consomme le domaine stable configuré par `POKEMON_API_PUBLIC_URL`.
- Generator Registry : 17 actions, dont 15 incluses dans la régénération globale.
- Dernière validation Preview connue : 17/17 actions dans `docs/migrations/dashboard-split/test-matrix.md`.

## Preview active avant modification

- URL : `https://dashboard-admin-8cmgkqi6x-matthieu-vachets-projects.vercel.app`.
- État Vercel : `READY`.
- Cible : Preview (`target: null`), branche `develop`.
- Commit déployé : `186adb2b99de3be49535b06f7d6b35609ff59caf`.
- Contrôle HTTP : `200`, redirection authentifiée vers `/login`, aucun overlay Next.js.

## Snapshot externe non versionné

Le snapshot est conservé hors du dépôt afin de ne pas dupliquer les archives existantes :

`/Users/matthieuvachet/Desktop/Workflow/archives/pokemon-dashboard-polish-before-2026-08-23-02-25-00`

Il contient l'archive complète du commit initial, les sept assets de menu non trackés et la capture de la page de connexion.

## Inventaire ciblé avant modification

| Domaine | Route | Entrée principale |
| --- | --- | --- |
| Navigation | toutes | `src/data/dashboard.ts`, `src/components/admin/navigation/admin-sidebar.tsx` |
| Homepage | `/` | `src/components/admin/pokemon/admin-app.jsx` |
| Fiches Pokémon | `/pokedex` | `src/components/admin/pokemon/admin-app.jsx`, `pokemon-card.jsx`, `detail-modal.jsx` |
| PvP Rankings | `/pvp-rankings` | `src/components/admin/pokemon/pvp-rankings-panel.jsx` |
| Identity Manager | `/identity-manager` | `src/components/admin/pokemon/identity-manager-panel.tsx` |
| Rocket | `/rocket` | `src/components/admin/pokemon/rocket-panel.jsx` |
| Shiny Tracker | `/shiny-tracker` | `src/components/admin/pokemon/shiny-tracker-panel.jsx` |
| Veille | `/source-watch` | `src/components/admin/pokemon/source-watch-panel.tsx` |
| Collections | `/collections` | `src/components/admin/pokemon/collections-panel.jsx` |
| Candies | `/candies` | `src/components/admin/pokemon/candy-panel.jsx` |
| Generator Registry | API privée | `src/server/pokemon-go/apps/checklist/server/generator-registry.js` et proxy Admin |
| Documentation | `docs/` | Tome 4 à Tome 12, rapports et matrices de migration |

## Résultats de baseline

- TypeScript : PASS.
- ESLint : PASS avec 70 warnings historiques, 0 erreur.
- Tests split : 5/5 PASS.
- Tests Admin Pokémon : 43/43 PASS.
- Tests Fiche : 6/6 PASS.
- Tests Collections : 12/12 PASS.
- Tests PvP local : 4/4 PASS.
- Tests état régénération PvP : 6/6 PASS.
- Tests Source Watch : 4/4 PASS.
- Tests Engine canonique : 6/6 PASS.
- Tests taxonomie diagnostics : 3/3 PASS.
- Tests repository Data : 9/9 PASS.
- Tests matrice régénérations : 6/6 PASS.
- Tests Best Defenders : 6/6 PASS.
- Version : PASS.
- Documentation : 171 documents valides, 0 warning.
- Build Next.js et postbuild Serverless : PASS.
- Navigateur local : contenu présent, aucun overlay Next.js, formulaire accessible.

## Écart de baseline corrigé dans le Lot 0

Le test responsive se connectait correctement mais attendait encore `/pokemon-admin` après la séparation du Dashboard. L'application redirige désormais vers `/` et expose des routes plates. Le harnais a été aligné sur ces routes sans modifier le comportement produit.

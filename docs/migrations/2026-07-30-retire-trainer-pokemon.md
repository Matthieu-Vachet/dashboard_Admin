# Retrait de « Ma collection » — migration achevée le 31 juillet 2026

La fonctionnalité, ses routes privées et ses composants avaient été retirés du Dashboard le 30 juillet. La phase MongoDB séparée a été exécutée le 31 juillet via `PokemonGo-API-/scripts/migrate/retire-ma-collection.js`.

## Avant migration

- `pokemon_identities` : 70 documents, 74 alias concernés ;
- `pokemon_identity_diagnostics` : 343 documents, dont 191 ouverts ;
- `pokemon_identity_history` : 109 documents ;
- `trainer_pokemon_entries` : 9 671 documents ;
- `trainer_pokemon_snapshots` : 2 documents ;
- `trainer_pokemon_owners` : 1 document ;
- `events_archive` : 1 document avec anciennes références.

## Sauvegarde et application

Chaque document a été copié dans `migration_retired_features_archive` avec base, collection, identifiant, empreinte SHA-256 et payload original avant la première modification. Au total, 10 197 documents ont été sauvegardés. Les alias ont été retirés des identités encore utiles, les diagnostics/historiques devenus inactifs ont été archivés, les trois collections Dresseur ont été vidées et l’événement utile a été conservé sans alias supprimé.

Le manifeste `2026-07-31-retire-ma-collection` est stocké dans `migration_manifests`. Le dry-run exécuté après application rapporte zéro référence active et zéro document dans les anciennes collections.

## Réversibilité

`npm run migrate:retire-ma-collection:restore` restaure les documents originaux par `_id`. Cette commande est réservée à une décision explicite de restauration ; les archives ne participent jamais au workflow actif.

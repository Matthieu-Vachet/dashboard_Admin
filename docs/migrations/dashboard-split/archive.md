# Archive de sécurité

- Chemin : `/Users/matthieuvachet/Desktop/Workflow/archives/dashboard-split-before-2026-08-22-15-04-14`
- Création : `2026-08-22T15:04:14+02:00`, Europe/Paris.
- Statut : `VALIDATED`.
- Volume logique : 7 678 066 688 octets, 78 fichiers d’archive ; volume disque affiché : 7,2 Go.
- Somme du registre de hashes : `1ec9be9348d947fce4bc8625649f41b24b67527b4d49ab85a3282c84f9022b68` (`sha256sums.txt`).
- Bundles Git : `PASS` pour les cinq repositories.
- Restauration : `PASS`.

La restauration bit à bit a vérifié une page Pokémon, une page JavaScript, Button partagé, une route API, le README et `next.config.ts`. Les bundles, snapshots Zstandard, manifests, références, tags, inventaires d’environnement sans valeurs et instructions RESTORE sont conservés hors Git avec permissions restrictives.

## Sauvegarde MongoDB avant libération du quota Atlas

- Base concernée : `sample_mflix`, base d'exemple MongoDB sans référence dans les applications du workspace.
- Archive : `/Users/matthieuvachet/Desktop/Workflow/archives/mongo-sample-mflix-before-quota-cleanup-2026-08-22-16-50-28`.
- Contenu : 6 collections, 67 661 documents, environ 44 Mo compressés.
- Validation : manifeste de hashes, comptages par collection, export Extended JSON Lines compressé et script de restauration contrôlés ; statut `PASS`.
- Restauration : procédure `RESTORE.md` et script `restore-sample-mflix.mjs` fournis dans l'archive.
- Suppression : effectuée après accord utilisateur explicite ; contrôle Atlas post-opération confirmant l'absence de `sample_mflix` et la présence intacte de `pokemon-go-api` et `matweb-dashboard-admin`.

Cette suppression a libéré le quota nécessaire aux écritures de preview. Les régénérations Community Days, Shiny, la réindexation Game Master et la synchronisation GitHub Data, auparavant refusées par Atlas, ont ensuite toutes terminé en HTTP 200.

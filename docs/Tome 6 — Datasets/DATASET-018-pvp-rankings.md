---
id: DATASET-018
title: PvP Rankings
version: 1.3.0
status: Public
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PAGE-058, ADR-006, RULE-048]
---

# DATASET-018 — PvP Rankings

Snapshot public issu des classements et du Game Master PvPoke, puis normalisé avec les identités, attaques et métadonnées locales. `pvp.secondChargedMoveCost` lit `secondChargeMoveCost`; `pvp.candyFamilyId` et `pokemon.assets.candy` transportent la famille et ses assets résolus.

Le dataset ne devine ni coût, ni distance, ni quantité XL. Chaque champ local publie une provenance ou un état absent. Les partenaires suggérés sont servis séparément par l'API privée et résolus vers l'identité canonique avant affichage.

Les fiches dédiées vivent sous `data/pvp/pokemon/<catégorie>/`, sont reliées par `pvpRef` et partagent le commit inscrit dans le manifeste PvP courant. Little, Great, Ultra et Master conservent un statut explicite; une ligue non classée n’est jamais supprimée du contrat. Fiches, manifeste, cache et rapports de mapping sont installés atomiquement. Le volume et le commit sont lus dans les métadonnées au lieu d’être figés dans la documentation.

La régénération Admin est asynchrone et terminale en `success`, `partial`, `unchanged` ou `failed`. `partial` signifie que MongoDB a été écrit et relu avec des diagnostics légitimes ; un HTTP 500 ou un job `running` périmé n’est jamais transformé en dataset vide.

Les warnings sont structurés en code, entité, raison, impact et action. Une sentinelle
provider `none` explicitement informative reste traçable sans dégrader seule le statut.
Les partenaires suggérés sont calculés côté API depuis le snapshot MongoDB de la ligue;
une espèce absente produit `RANKING_NOT_FOUND`, tandis qu’un snapshot invalide reste une
erreur.

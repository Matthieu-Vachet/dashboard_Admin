---
id: DATASET-018
title: PvP Rankings
version: 1.2.0
status: Public
last_update: 2026-08-15
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, PokemonGo-API-, Dashboard Admin]
references: [PAGE-058, ADR-006, RULE-048]
---

# DATASET-018 — PvP Rankings

Snapshot public issu des classements et du Game Master PvPoke, puis normalisé avec les identités, attaques et métadonnées locales. `pvp.secondChargedMoveCost` lit `secondChargeMoveCost`; `pvp.candyFamilyId` et `pokemon.assets.candy` transportent la famille et ses assets résolus.

Le dataset ne devine ni coût, ni distance, ni quantité XL. Chaque champ local publie une provenance ou un état absent. Les partenaires suggérés sont servis séparément par l'API privée et résolus vers l'identité canonique avant affichage.

Le snapshot dédié du 15 août 2026 contient 1 614 fiches sous `data/pvp/pokemon/<catégorie>/`, toutes reliées par `pvpRef`, et épingle le commit PvPoke `f754cd6fc819ad065f1f00df1036ade36c57c022`. Little, Great, Ultra et Master conservent un statut explicite ; une ligue non classée n’est jamais supprimée du contrat. Le manifeste et les rapports de mapping doivent rester atomiquement alignés avec ce commit.

La régénération Admin est asynchrone et terminale en `success`, `partial`, `unchanged` ou `failed`. `partial` signifie que MongoDB a été écrit et relu avec des diagnostics légitimes ; un HTTP 500 ou un job `running` périmé n’est jamais transformé en dataset vide.

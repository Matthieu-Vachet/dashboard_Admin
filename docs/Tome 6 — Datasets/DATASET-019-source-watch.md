---
id: DATASET-019
title: Source Watch
version: 2.2.0
status: Private
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [PokemonGo-Data, Dashboard Admin]
references: [PAGE-063, PROVIDER-021]
---

# DATASET-019 — Source Watch

Registre privé des sources GitHub et web suivies par le Dashboard. Chaque entrée définit un identifiant stable, une catégorie, une URL et, selon le provider, domaine, langue, sujet, fréquence, statut, parseur, consommateurs, confiance et notes de mapping.

Source Watch contrôle uniquement la joignabilité, les statuts et les signatures. Les contrôles structurels et référentiels des données canoniques restent dans l’Engine JSON afin de ne pas confondre transport et conformité.

L’autorité machine est `PokemonGo-Data/operations/audits/sources/current.json`. Tout dataset
régénérable déclare `regenerationDataset`; un identifiant historique ne peut survivre
que dans `aliases`. `leekduck-eggs`, `leekduck-research` et `leekduck-rocket` gardent
leur provenance distincte mais utilisent tous `identityProvider: leekduck`. Retirer une
source encore consommée ou créer un doublon est bloqué par le test de registre Data.

Les deux contrôles PvPoke reflètent le pipeline réel: Game Master et classement Great
League sont lus sur jsDelivr, tandis que l’arbre GitHub officiel sert à découvrir les
formats. Les pages `pvpoke.com` susceptibles de répondre 403 ne sont pas des sources
de régénération et ne sont plus sondées. Chaque contrôle expose HTTP, metadata HTTP,
commit distant, SHA-256 live, snapshot local et date. Un token éventuel n’est envoyé
qu’à `api.github.com`.

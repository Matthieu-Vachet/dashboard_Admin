# Sprint Famille Modal

Date d’exécution : 14 juillet 2026. Type : Sprint Famille.

Ce dossier documente l’inventaire courant de la famille Modal, le contrat réel de `src/components/ui/modal.tsx`, les écarts des overlays legacy et la décision de migration fondée sur la baseline runtime.

Documents :

- `modal-family-inventory.md` : 25 cas runtime, plus helpers, façades et faux positifs ;
- `modal-contract-analysis.md` : sémantique, clavier, focus, scroll, responsive, thèmes et motion ;
- `modal-family-migration-plan.md` : plan écrit avant toute décision source ;
- `modal-family-sprint-report.md` : preuves finales, validations, écarts et rollback.

Le code courant prime sur l’audit historique. La classification mesurée est A 11, B 0, C 10 et D 4. Aucun wrapper B n’est strictement équivalent à l’API et au rendu actuels de `Modal`; les sources applicatives restent donc inchangées.

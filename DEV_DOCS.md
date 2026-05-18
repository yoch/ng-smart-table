# Release

0. Pour une version majeure, chercher `@breaking-change` pour couvrir les changements cassants.

# Publication npm (`@yoch/ng-smart-table`)

1. Créer une branche `release/vX.Y.Z` si besoin.
2. `npm run build:lib` pour valider la compilation de la lib.
3. Mettre à jour la version dans [projects/ng2-smart-table/package.json](projects/ng2-smart-table/package.json) (le paquet publié). Le `package.json` racine est privé et sert au workspace.
4. `npm run changelog` (nécessite un tag git pour la version précédente).
5. Commit du style `release: vX.Y.Z`.
6. Première publication beta : `npm run publish:beta` (tag npm `next`, version `2.0.0-beta.0`).
7. Publication stable : `npm run publish:dist` (nécessite `npm login` et compte npm `@yoch` connecté).
8. Optionnel : `npm run docs:gh-pages` pour la démo GitHub Pages.
9. Tag git `vX.Y.Z` puis `git push --tags`.

## Vérifications locales

- `npm run build:ci` — build lib + démo + tests unitaires de la lib.
- `npm run pack:lib` — génère le tarball dans `dist-pack/` (copier `lib.tgz` pour `consumer-smoke`).
- `npm run consumer:smoke` — installe le paquet packagé dans la mini-app `consumer-smoke` et vérifie un build production.
- Le dossier `consumer-smoke` n’a pas de `package-lock.json` versionné : la dépendance `file:../dist-pack/lib.tgz` change d’empreinte à chaque `npm pack` ; en CI on utilise `npm install`, pas `npm ci`.
- `npm audit --omit=dev` — actuellement non vert sur le workspace Angular 18 : npm signale des vulnérabilités `@angular/* <=18.2.14` et propose une montée majeure vers Angular 21. Ne pas appliquer `npm audit fix --force` dans une release de durcissement ; le paquet publié garde Angular en `peerDependencies` et ne bundle pas Angular. Revoir ce point avec une validation consommateur Angular 20/21 avant d'élargir ou changer la toolchain.

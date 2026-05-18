# Angular Smart Table (`@yoch/ng-smart-table`)

Fork modernisé du composant **ng2-smart-table** (Akveo), compilé pour **Angular 18+** (Ivy partiel / Angular Package Format actuel).

## Prérequis

- Angular **18** ou supérieur (**>=18 <22** via `peerDependencies` du paquet ; la lib est compilée avec la toolchain Angular 18 du dépôt — valider toute cible majeure avec le job CI « consumer-smoke » ou `npm run consumer:smoke`).
- **RxJS** 7.8+ (aligné sur les `peerDependencies` du paquet).

## Installation

```bash
npm install @yoch/ng-smart-table
```

Dans votre module (ou imports standalone) :

```typescript
import { Ng2SmartTableModule } from '@yoch/ng-smart-table';

@NgModule({
  imports: [Ng2SmartTableModule, /* … */],
})
export class AppModule {}
```

Le sélecteur et les symboles historiques sont conservés : `Ng2SmartTableModule`, `Ng2SmartTableComponent`, `LocalDataSource`, `ServerDataSource`, etc.

### `ServerDataSource` et HTTP

Fournissez `HttpClient` dans l’application (`HttpClientModule` ou `provideHttpClient()` selon votre version).

## Depuis `ng2-smart-table` (npm historique)

1. Remplacer la dépendance : `npm uninstall ng2-smart-table && npm install @yoch/ng-smart-table`
2. Mettre à jour les imports : `from 'ng2-smart-table'` → `from '@yoch/ng-smart-table'`
3. Si vous utilisiez **`ng2-completer`** en direct : il n’est plus requis pour la table ; l’autocomplete « completer » des colonnes est géré en interne.
4. Vérifier les composants **custom** créés dynamiquement : ils doivent être déclarés dans un `NgModule` (ou être standalone et importés) — plus d’`entryComponents` sous Angular récent.

## Développement du dépôt

```bash
npm install
npm start                 # démo
npm run build:lib         # paquet dans dist/ng2-smart-table
npm run build:ci          # lib + démo + tests
npm run pack:lib          # build + tarball dans dist-pack/ (pour CI / inspection)
npm run consumer:smoke    # pack + mini-app qui installe le .tgz et build prod
npm run publish:dist      # publication (après npm login)
```

**Publication** : le scope npm `@yoch` doit exister et vous y avoir les droits ; sinon modifiez le champ `name` dans [projects/ng2-smart-table/package.json](projects/ng2-smart-table/package.json) avant `npm publish`.

### Avant publication npm

1. `npm ci`
2. `npm run lint`
3. `npm run build:ci`
4. `npm run pack:lib` — inspecter `dist-pack/*.tgz` (`LICENSE.txt`, `README.md`, pas de `.angular` / `coverage` / sources de démo)
5. `npm run consumer:smoke`
6. `npm audit --omit=dev` et `npm run audit:pack` — vulnérabilités workspace (outillage) et paquet publié

Publier d’abord une prérelease (`2.0.0-beta.x` / dist-tag `next`), puis promouvoir en stable après validation dans une app réelle.

Voir [DEV_DOCS.md](DEV_DOCS.md) pour le détail des releases.

## Licence

MIT (voir [LICENSE.txt](LICENSE.txt)).

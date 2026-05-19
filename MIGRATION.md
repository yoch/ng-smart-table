# Migration guide

## From `2.0.0-beta.x` to `2.0.0` (stable)

No breaking API changes compared to `2.0.0-beta.2`. Prefer installing the stable tag:

```bash
npm install @yoch/ng-smart-table@latest
```

Prereleases remain available under the `next` dist-tag:

```bash
npm install @yoch/ng-smart-table@next
```

### New in stable

- **`settings.rowIdentityKey`**: match rows by a field (e.g. `id`) for update/remove when object references change (common with server reloads).
- **Server multi-column sort**: multiple sort fields are sent as repeated query parameters (use `.append` semantics).
- **Clearer selection events**: clicking to deselect emits `rowDeselect` only; selecting emits `rowSelect` only (`userRowSelect` still reports the full selection state).

---

## From legacy `ng2-smart-table` (Akveo npm) to `@yoch/ng-smart-table` 2.x

1. Replace the dependency:

   ```bash
   npm uninstall ng2-smart-table
   npm install @yoch/ng-smart-table
   ```

2. Update imports:

   ```typescript
   // before
   import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
   // after
   import { Ng2SmartTableModule, LocalDataSource } from '@yoch/ng-smart-table';
   ```

3. **Angular 18+** is required (`peerDependencies`: `@angular/*` `>=18 <22`).

4. **`ng2-completer`** is no longer required. Column `completer` editor/filter autocomplete is built in.

5. **Custom components**: use `ViewContainerRef.createComponent()` (no `entryComponents`). Declare components in an `NgModule` or use standalone components and import them where needed.

6. **`ServerDataSource`**: provide `HttpClient` in your app (`provideHttpClient()` or `HttpClientModule`).

7. **Standalone apps**: import `Ng2SmartTableModule` in your component or route `imports` array (the table component is not standalone yet).

See [CHANGELOG.md](CHANGELOG.md) for the full 2.0.0 history.

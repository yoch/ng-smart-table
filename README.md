# Angular Smart Table (`@yoch/ng-smart-table`)

Modernized fork of **ng2-smart-table** (Akveo), built for **Angular 18+** (partial Ivy / current Angular Package Format).

## Prerequisites

- Angular **18** or newer (**>=18 <22** via package `peerDependencies`; the library is compiled with this repo's Angular 18 toolchain — validate other major versions with the CI `consumer-smoke` job or `npm run consumer:smoke`).
- **RxJS** 7.8+ (aligned with package `peerDependencies`).

## Installation

```bash
npm install @yoch/ng-smart-table
```

In your module (or standalone imports):

```typescript
import { Ng2SmartTableModule } from '@yoch/ng-smart-table';

@NgModule({
  imports: [Ng2SmartTableModule, /* … */],
})
export class AppModule {}
```

Historical selectors and symbols are unchanged: `Ng2SmartTableModule`, `Ng2SmartTableComponent`, `LocalDataSource`, `ServerDataSource`, etc.

### `ServerDataSource` and HTTP

Provide `HttpClient` in your application (`HttpClientModule` or `provideHttpClient()` depending on your Angular version).

## Migrating from `ng2-smart-table` (legacy npm)

1. Replace the dependency: `npm uninstall ng2-smart-table && npm install @yoch/ng-smart-table`
2. Update imports: `from 'ng2-smart-table'` → `from '@yoch/ng-smart-table'`
3. If you used **`ng2-completer`** directly: it is no longer required for the table; column `completer` autocomplete is handled internally.
4. Review **custom** dynamically created components: declare them in an `NgModule` (or use standalone components and import them) — no `entryComponents` on recent Angular versions.

## Repository development

```bash
npm install
npm start                 # demo app
npm run build:lib         # package output in dist/ng2-smart-table
npm run build:ci          # lib + demo + tests
npm run pack:lib          # build + tarball in dist-pack/ (CI / inspection)
npm run consumer:smoke    # pack + mini-app installs .tgz and runs prod build
npm run publish:dist      # publish (after npm login)
```

**Publishing**: the npm scope `@yoch` must exist and your account must have publish rights; otherwise change the `name` field in [projects/ng2-smart-table/package.json](projects/ng2-smart-table/package.json) before `npm publish`.

### Before publishing to npm

1. `npm ci`
2. `npm run lint`
3. `npm run build:ci`
4. `npm run pack:lib` — inspect `dist-pack/*.tgz` (`LICENSE.txt`, `README.md`, no `.angular` / `coverage` / demo sources)
5. `npm run consumer:smoke`
6. `npm audit --omit=dev` and `npm run audit:pack` — workspace tooling and published package vulnerabilities

Publish a prerelease first with `npm run publish:beta` (updates both `next` and `latest`), then promote to stable with `npm run publish:dist` after validating in a real app.

See [DEV_DOCS.md](DEV_DOCS.md) for release details.

## License

MIT (see [LICENSE.txt](LICENSE.txt)).

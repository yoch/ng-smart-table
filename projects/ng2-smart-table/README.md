# `@yoch/ng-smart-table`

Angular data table (modern fork of **ng2-smart-table**) for **Angular 18+**.

## Install

```bash
npm install @yoch/ng-smart-table
```

Peers: `@angular/common`, `@angular/core`, `@angular/forms` `>=18 <22`, `rxjs` `^7.8.0`.

## Quick start

```typescript
import { NgModule } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from '@yoch/ng-smart-table';

@NgModule({
  imports: [Ng2SmartTableModule],
})
export class AppModule {}
```

```html
<ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
```

```typescript
source = new LocalDataSource([{ id: 1, name: 'Alice' }]);
settings = {
  columns: {
    id: { title: 'ID' },
    name: { title: 'Name' },
  },
};
```

### Standalone component

```typescript
import { Component } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from '@yoch/ng-smart-table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [Ng2SmartTableModule],
  template: `<ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>`,
})
export class TableComponent {
  source = new LocalDataSource([]);
  settings = { columns: { id: { title: 'ID' } } };
}
```

### Server data

Provide HTTP in your app and use `ServerDataSource`:

```typescript
import { provideHttpClient } from '@angular/common/http';
import { ServerDataSource } from '@yoch/ng-smart-table';

// bootstrap: providers: [provideHttpClient()]
source = new ServerDataSource(http, { endPoint: '/api/items' });
```

### Row identity after reload

When rows are replaced (e.g. after `ServerDataSource` fetch), set:

```typescript
settings = {
  rowIdentityKey: 'id',
  columns: { /* ... */ },
};
```

## Migration

- From **beta**: see [MIGRATION.md](https://github.com/yoch/ng-smart-table/blob/main/MIGRATION.md#from-200-betax-to-200-stable)
- From **legacy `ng2-smart-table`**: same document, [Akveo → fork section](https://github.com/yoch/ng-smart-table/blob/main/MIGRATION.md#from-legacy-ng2-smart-table-akveo-npm-to-yochng-smart-table-2x)

## Documentation

Full examples and settings reference: [GitHub repository](https://github.com/yoch/ng-smart-table) and demo app (`npm start` in the monorepo).

## License

MIT

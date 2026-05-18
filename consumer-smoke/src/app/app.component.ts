import { Component } from '@angular/core';

import { LocalDataSource } from '@ng-smart-table/ng-smart-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly completerData = [
    { id: 1, name: 'Alice', email: 'a@example.test' },
    { id: 2, name: 'Bob', email: 'b@example.test' },
  ];

  source = new LocalDataSource(this.completerData.map((r) => ({ ...r })));

  settings = {
    columns: {
      id: { title: 'ID' },
      name: {
        title: 'Name',
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.completerData,
              searchFields: 'name,email',
              titleField: 'name',
              descriptionField: 'email',
            },
          },
        },
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: this.completerData,
              searchFields: ['name'],
              titleField: 'name',
            },
          },
        },
      },
    },
    pager: { display: true, page: 1, perPage: 10 },
  };
}

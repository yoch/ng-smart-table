export const FILTER_EXAMPLES_CODE_SAMPLES = {
  sourceRequire: "import { Ng2SmartTableModule, LocalDataSource } from '@yoch/ng-smart-table';",
  createSource: `source: LocalDataSource; // add a property to the component

constructor() {
  this.source = new LocalDataSource(this.data); // create the source
}`,
  sourceTemplate: `// ...

@Component({
  template: \`
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  \`
})
// ...`,
  search: `// ...

@Component({ 
  template: \`
    <input #search class="search" type="text" placeholder="Search..." (keydown.enter)="onSearch(search.value)">
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  \`
})
// ...`,
  searchTable: `onSearch(query: string = '') {
  this.source.setFilter([
    // fields we want to include in the search
    {
      field: 'id',
      search: query
    },
    {
      field: 'name',
      search: query
    },
    {
      field: 'username',
      search: query
    },
    {
      field: 'email',
      search: query
    }
  ], false); 
  // second parameter specifying whether to perform 'AND' or 'OR' search 
  // (meaning all columns should contain search query or at least one)
  // 'AND' by default, so changing to 'OR' by setting false here
}`,
  hideFilters: `settings = {
  columns: {
    id: {
      title: 'ID',
      filter: false
    },
    name: {
      title: 'Full Name',
      filter: false
    },
    username: {
      title: 'User Name',
      filter: false
    },
    email: {
      title: 'Email',
      filter: false
    }
  }
};`,
  sourceFull: `import { Component } from '@angular/core';

@Component({
  selector: 'basic-example-source',
  styles: [],
  template: \`
    <input #search class="search" type="text" placeholder="Search..." (keydown.enter)="onSearch(search.value)">
    <ng2-smart-table [settings]="settings" [source]="source"></ng2-smart-table>
  \`
})
export class BasicExampleSourceComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false
      },
      name: {
        title: 'Full Name',
        filter: false
      },
      username: {
        title: 'User Name',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      }
    }
  };
  
  data = [
    // ... our data here
  ];
  
  source: LocalDataSource;
  
  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'name',
        search: query
      },
      {
        field: 'username',
        search: query
      },
      {
        field: 'email',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
}`,
};

export const CUSTOM_EDIT_VIEW_CODE_SAMPLES = {
  customEditorModule: `@NgModule({
  imports: [
    Ng2SmartTableModule,
  ],
  declarations: [
    CustomEditorComponent,
    CustomRenderComponent,
  ],
})
// Angular 18+: declare components in declarations (no entryComponents needed).`,
};

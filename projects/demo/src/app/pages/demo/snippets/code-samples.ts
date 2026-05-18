/**
 * Extraits de documentation (anciennement chargés via raw-loader).
 */
export const DEMO_CODE_SAMPLES = {
  install: 'npm install @yoch/ng-smart-table',
  require: "import { Ng2SmartTableModule } from '@yoch/ng-smart-table';",
  directive: `// ...

@NgModule({
  imports: [
    // ...
    
    Ng2SmartTableModule,
    
    // ...
  ],
  declarations: [ ... ]
})
// ...`,
  settings: `settings = {
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Full Name'
    },
    username: {
      title: 'User Name'
    },
    email: {
      title: 'Email'
    }
  }
};`,
  template: `// ...

@Component({
  template: \`
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  \`
})
// ...`,
  array: `data = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },
  
  // ... list of items
  
  {
    id: 11,
    name: "Nicholas DuBuque",
    username: "Nicholas.Stanton",
    email: "Rey.Padberg@rosamond.biz"
  }
];`,
  dataTemplate: `// ...

@Component({
  template: \`
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  \`
})
// ...`,
  basicFull: `import { Component } from '@angular/core';

@Component({
  selector: 'basic-example-data',
  styles: [],
  template: \`
    <ng2-smart-table [settings]="settings" [source]="data"></ng2-smart-table>
  \`
})
export class BasicExampleDataComponent {

  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };
  
  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    // ... other rows here
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
}`,
};

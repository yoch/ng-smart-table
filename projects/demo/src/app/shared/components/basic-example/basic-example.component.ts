import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'basic-example',
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ng2-smart-table [settings]="settings"></ng2-smart-table>
  `,
})
export class BasicExampleComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
        width: '100px',
      },
      name: {
        title: 'Full Name',
        width: '40%',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

}

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}

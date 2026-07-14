import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor() {
  }

}

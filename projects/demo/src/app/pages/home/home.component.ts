import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'home',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor() {
  }

}

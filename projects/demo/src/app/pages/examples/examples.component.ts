import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'examples',
  styleUrls: ['./examples.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: 'examples.component.html',
})
export class ExamplesComponent {
}

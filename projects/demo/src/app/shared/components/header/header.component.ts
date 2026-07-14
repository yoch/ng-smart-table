import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: false,
  selector: 'header-component',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() tagline: string = '';

}

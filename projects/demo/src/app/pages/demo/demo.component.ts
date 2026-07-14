import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DEMO_CODE_SAMPLES } from './snippets/code-samples';

@Component({
  standalone: false,
  selector: 'demo',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './demo.component.html',
})
export class DemoComponent {

  snippets = DEMO_CODE_SAMPLES;

}

import { Component } from '@angular/core';

import { DEMO_CODE_SAMPLES } from './snippets/code-samples';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
})
export class DemoComponent {

  snippets = DEMO_CODE_SAMPLES;

}

import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FILTER_EXAMPLES_CODE_SAMPLES } from '../snippets/code-samples';

@Component({
  standalone: false,
  selector: 'filter-examples',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './filter-examples.component.html',
})
export class FilterExamplesComponent {

  snippets = FILTER_EXAMPLES_CODE_SAMPLES;

}

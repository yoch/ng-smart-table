import { Component } from '@angular/core';

import { FILTER_EXAMPLES_CODE_SAMPLES } from '../snippets/code-samples';

@Component({
  selector: 'filter-examples',
  templateUrl: './filter-examples.component.html',
})
export class FilterExamplesComponent {

  snippets = FILTER_EXAMPLES_CODE_SAMPLES;

}

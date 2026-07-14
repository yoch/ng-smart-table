import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CUSTOM_EDIT_VIEW_CODE_SAMPLES } from '../snippets/code-samples';

@Component({
  standalone: false,
  selector: 'custom-edit-view-examples',
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './custom-edit-view-examples.component.html',
})
export class CustomViewEditExamplesComponent {

  snippets = CUSTOM_EDIT_VIEW_CODE_SAMPLES;

}

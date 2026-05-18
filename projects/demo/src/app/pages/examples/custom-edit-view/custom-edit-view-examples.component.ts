import { Component } from '@angular/core';

import { CUSTOM_EDIT_VIEW_CODE_SAMPLES } from '../snippets/code-samples';

@Component({
  selector: 'custom-edit-view-examples',
  templateUrl: './custom-edit-view-examples.component.html',
})
export class CustomViewEditExamplesComponent {

  snippets = CUSTOM_EDIT_VIEW_CODE_SAMPLES;

}

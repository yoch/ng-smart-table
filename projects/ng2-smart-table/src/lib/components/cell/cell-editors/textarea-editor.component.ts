import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DefaultEditor } from './default-editor';

@Component({
  standalone: false,
  selector: 'textarea-editor',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <textarea [ngClass]="inputClass"
              class="form-control"
              [(ngModel)]="cell.newValue"
              [name]="cell.getId()"
              [disabled]="!cell.isEditable()"
              [placeholder]="cell.getTitle()"
              (click)="onClick.emit($event)"
              (keydown.enter)="onEdited.emit($event)"
              (keydown.esc)="onStopEditing.emit()">
    </textarea>
    `,
})
export class TextareaEditorComponent extends DefaultEditor {

  constructor() {
    super();
  }
}

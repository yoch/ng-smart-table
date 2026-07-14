import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EditCellDefault } from './edit-cell-default';

@Component({
  standalone: false,
  selector: 'table-cell-default-editor',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './default-edit.component.html',
})
export class DefaultEditComponent extends EditCellDefault {

  constructor() {
    super();
  }

  getEditorType(): string {
    return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
  }
}

import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

import { Cell } from '../../../lib/data-set/cell';

@Component({
  standalone: false,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: ''
})
export class EditCellDefault {

  @Input() cell: Cell;
  @Input() inputClass: string = '';

  @Output() edited = new EventEmitter<any>();

  onEdited(event: any): boolean {
    this.edited.next(event);
    return false;
  }

  onStopEditing(): boolean {
    this.cell.getRow().isInEditing = false;
    return false;
  }

  onClick(event: any) {
    event.stopPropagation();
  }
}

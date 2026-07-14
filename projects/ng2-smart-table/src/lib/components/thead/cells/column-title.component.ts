import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Column } from '../../../lib/data-set/column';
import { DataSource } from '../../../lib/data-source/data-source';

@Component({
  standalone: false,
  selector: 'ng2-st-column-title',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="ng2-smart-title">
      <ng2-smart-table-title [source]="source" [column]="column" (sort)="sort.emit($event)"></ng2-smart-table-title>
    </div>
  `,
})
export class ColumnTitleComponent {

  @Input() column: Column;
  @Input() source: DataSource;

  @Output() sort = new EventEmitter<any>();

}

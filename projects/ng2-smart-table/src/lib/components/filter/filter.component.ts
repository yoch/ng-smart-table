import { ChangeDetectorRef, Component, OnChanges, OnDestroy, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FilterDefault } from './filter-default';
import { Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'ng2-smart-table-filter',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
      <div class="ng2-smart-filter" *ngIf="column.isFilterable" [ngSwitch]="column.getFilterType()">
        <custom-table-filter *ngSwitchCase="'custom'"
                             [query]="query"
                             [column]="column"
                             [source]="source"
                             [inputClass]="inputClass"
                             (filter)="onFilter($event)">
        </custom-table-filter>
        <default-table-filter *ngSwitchDefault
                              [query]="query"
                              [column]="column"
                              [source]="source"
                              [inputClass]="inputClass"
                              (filter)="onFilter($event)">
        </default-table-filter>
      </div>
    `,
})
export class FilterComponent extends FilterDefault implements OnChanges, OnDestroy {
  protected dataChangedSub: Subscription;

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngOnDestroy(): void {
    if (this.dataChangedSub) {
      this.dataChangedSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.source) {
      if (!changes.source.firstChange) {
        this.dataChangedSub.unsubscribe();
      }
      this.dataChangedSub = this.source.onChanged().subscribe(() => {
        // Defer query sync so synchronous LocalDataSource emits do not trigger NG0100.
        queueMicrotask(() => {
          this.syncQueryFromFilterConf();
          this.cdr.markForCheck();
        });
      });
    }
  }

  private syncQueryFromFilterConf(): void {
    const filterConf = this.source.getFilter();
    if (filterConf?.filters?.length === 0) {
      this.query = '';
      return;
    }
    if (filterConf?.filters?.length > 0) {
      filterConf.filters.forEach((k: { field: string; search: string }) => {
        if (k.field === this.column.id) {
          this.query = k.search;
        }
      });
    }
  }
}

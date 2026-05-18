import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LocalDataSource } from '../../lib/data-source/local/local.data-source';
import { DataSet } from '../../lib/data-set/data-set';

import { FilterModule } from './filter.module';

@Component({
  standalone: true,
  imports: [FilterModule],
  template: `
    <ng2-smart-table-filter
      [column]="col"
      [source]="source"
      [query]="''"
      [inputClass]="''"
    ></ng2-smart-table-filter>
  `,
})
class FilterHostComponent {
  source = new LocalDataSource([{ id: 1 }]);
  col = new DataSet([{ id: 1 }], { id: { title: 'ID', filter: { type: 'text' } } }).getColumns()[0];
}

describe('FilterComponent', () => {
  it('should create and destroy without throwing when source emits', () => {
    TestBed.configureTestingModule({ imports: [FilterHostComponent] });
    const fixture = TestBed.createComponent(FilterHostComponent);
    fixture.detectChanges();
    const inner = fixture.debugElement.query(By.css('ng2-smart-table-filter'));
    expect(inner).toBeTruthy();
    fixture.destroy();
    expect(() => fixture.componentInstance.source.refresh()).not.toThrow();
  });
});

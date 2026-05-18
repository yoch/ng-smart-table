import { EventEmitter, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Cell } from '../../lib/data-set/cell';
import { DataSet } from '../../lib/data-set/data-set';
import { LocalDataSource } from '../../lib/data-source/local/local.data-source';

import { CustomEditComponent } from './cell-edit-mode/custom-edit.component';
import { CustomViewComponent } from './cell-view-mode/custom-view.component';
import { CustomFilterComponent } from '../filter/custom-filter.component';

@Component({
  template: '<span class="dyn-edit">e</span>',
})
class DynEditStub {
  cell!: Cell;
  inputClass = '';
  onStopEditing = new EventEmitter<void>();
  onEdited = new EventEmitter<string>();
  onClick = new EventEmitter<MouseEvent>();
}

@Component({
  template: '<span class="dyn-view">{{ value }}</span>',
})
class DynViewStub {
  value = '';
  rowData: any;
}

@Component({
  template: '<span>f</span>',
})
class DynFilterStubNoChanges {
  query = '';
  column: any;
  source: any;
  inputClass = '';
  filter = new EventEmitter<string>();
}

describe('Custom dynamic cell / filter components', () => {
  it('CustomEditComponent creates dynamic editor and destroys ComponentRef', async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomEditComponent, DynEditStub],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomEditComponent);
    const comp = fixture.componentInstance;
    const dataSet = new DataSet([{ id: 1 }], {
      id: { title: 'ID', editor: { type: 'custom', component: DynEditStub, config: {} } },
    });
    const row = dataSet.getRows()[0];
    const cell = row.getCell(dataSet.getColumns()[0]);
    fixture.componentRef.setInput('cell', cell);
    fixture.componentRef.setInput('inputClass', '');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dyn-edit')).toBeTruthy();

    const ref = comp.customComponent;
    spyOn(ref, 'destroy').and.callThrough();
    comp.ngOnDestroy();
    expect(ref.destroy).toHaveBeenCalled();
  });

  it('CustomViewComponent calls onComponentInitFunction and destroys', async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomViewComponent, DynViewStub],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomViewComponent);
    const comp = fixture.componentInstance;
    let inited: any;
    const dataSet = new DataSet([{ id: 7 }], {
      id: {
        title: 'ID',
        renderComponent: DynViewStub,
        onComponentInitFunction: (instance: DynViewStub) => {
          inited = instance;
          instance['fromInit'] = true;
        },
      },
    });
    const row = dataSet.getRows()[0];
    const cell = row.getCell(dataSet.getColumns()[0]);
    fixture.componentRef.setInput('cell', cell);
    fixture.detectChanges();
    expect(inited).toBeTruthy();
    expect(inited['fromInit']).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('7');

    spyOn(comp.customComponent, 'destroy').and.callThrough();
    comp.ngOnDestroy();
    expect(comp.customComponent.destroy).toHaveBeenCalled();
  });

  it('CustomFilterComponent does not require ngOnChanges on the dynamic filter', async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomFilterComponent, DynFilterStubNoChanges],
    }).compileComponents();

    const fixture = TestBed.createComponent(CustomFilterComponent);
    const column = {
      id: 'c1',
      filter: { component: DynFilterStubNoChanges },
      getFilterFunction: () => undefined,
    } as any;
    fixture.componentRef.setInput('column', column);
    fixture.componentRef.setInput('source', new LocalDataSource([]));
    fixture.componentRef.setInput('query', '');
    fixture.componentRef.setInput('inputClass', '');
    expect(() => fixture.detectChanges()).not.toThrow();
    const inner = fixture.debugElement.query(By.css('span'));
    expect(inner).toBeTruthy();
  });
});

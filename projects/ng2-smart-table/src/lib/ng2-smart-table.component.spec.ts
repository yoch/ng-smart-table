import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Ng2SmartTableModule } from './ng2-smart-table.module';
import { Ng2SmartTableComponent } from './ng2-smart-table.component';

describe('Ng2SmartTableComponent', () => {
  let fixture: ComponentFixture<Ng2SmartTableComponent>;
  let component: Ng2SmartTableComponent;

  const baseSettings = () => ({
    columns: {
      id: { title: 'ID' },
      name: { title: 'Name' },
    },
    pager: { display: false, page: 1, perPage: 10 },
    actions: { add: false, edit: false, delete: false, custom: [], position: 'left' as const },
    selectMode: 'single' as const,
    selectedRowIndex: 0,
    hideHeader: false,
    hideSubHeader: false,
  });

  async function renderTable(settings: Record<string, unknown>, source: LocalDataSource): Promise<void> {
    fixture.componentRef.setInput('settings', settings);
    fixture.componentRef.setInput('source', source);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ng2SmartTableModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Ng2SmartTableComponent);
    component = fixture.componentInstance;
  });

  it('should create with LocalDataSource', async () => {
    await renderTable(baseSettings(), new LocalDataSource([{ id: 1, name: 'a' }]));
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('tr.ng2-smart-row').length).toBe(1);
  });

  it('should emit rowSelect when selecting a row', async () => {
    await renderTable(
      baseSettings(),
      new LocalDataSource([
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ]),
    );
    const rowSelectSpy = jasmine.createSpy('rowSelect');
    const rowDeselectSpy = jasmine.createSpy('rowDeselect');
    component.rowSelect.subscribe(rowSelectSpy);
    component.rowDeselect.subscribe(rowDeselectSpy);

    const rows = fixture.nativeElement.querySelectorAll('tr.ng2-smart-row');
    rows[1].click();
    fixture.detectChanges();

    expect(rowSelectSpy).toHaveBeenCalled();
    expect(rowDeselectSpy).not.toHaveBeenCalled();
    expect(rowSelectSpy.calls.mostRecent().args[0].data.id).toBe(2);
    expect(rowSelectSpy.calls.mostRecent().args[0].isSelected).toBe(true);
  });

  it('should emit rowDeselect when clicking an already selected row', async () => {
    await renderTable(
      { ...baseSettings(), selectedRowIndex: -1 },
      new LocalDataSource([{ id: 1, name: 'a' }]),
    );
    const rowSelectSpy = jasmine.createSpy('rowSelect');
    const rowDeselectSpy = jasmine.createSpy('rowDeselect');
    component.rowSelect.subscribe(rowSelectSpy);
    component.rowDeselect.subscribe(rowDeselectSpy);

    const row = fixture.nativeElement.querySelector('tr.ng2-smart-row');
    row.click();
    fixture.detectChanges();
    expect(rowSelectSpy).toHaveBeenCalledTimes(1);

    row.click();
    fixture.detectChanges();
    expect(rowDeselectSpy).toHaveBeenCalledTimes(1);
    expect(rowDeselectSpy.calls.mostRecent().args[0].isSelected).toBe(false);
    expect(rowSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should emit rowDeselect for the default auto-selected first row', async () => {
    await renderTable(baseSettings(), new LocalDataSource([{ id: 1, name: 'a' }]));
    const rowDeselectSpy = jasmine.createSpy('rowDeselect');
    const rowSelectSpy = jasmine.createSpy('rowSelect');
    component.rowDeselect.subscribe(rowDeselectSpy);
    component.rowSelect.subscribe(rowSelectSpy);

    const row = fixture.nativeElement.querySelector('tr.ng2-smart-row');
    row.click();
    fixture.detectChanges();

    expect(rowDeselectSpy).toHaveBeenCalledTimes(1);
    expect(rowDeselectSpy.calls.mostRecent().args[0].data.id).toBe(1);
    expect(rowDeselectSpy.calls.mostRecent().args[0].isSelected).toBe(false);
    expect(rowSelectSpy).not.toHaveBeenCalled();
  });

  it('should apply rowIdentityKey from settings to LocalDataSource', async () => {
    const ds = new LocalDataSource([{ id: 1, name: 'a' }]);
    await renderTable({ ...baseSettings(), rowIdentityKey: 'id' }, ds);

    expect(component.grid.getSetting('rowIdentityKey')).toBe('id');
    expect(ds.getRowIdentityKey()).toBe('id');
    await ds.update({ id: 1, name: 'stale' }, { id: 1, name: 'updated' });
    const all = await ds.getAll();
    expect(all[0].name).toBe('updated');
  });

  it('should filter rows when source filter changes', async () => {
    const ds = new LocalDataSource([
      { id: 1, name: 'foo' },
      { id: 2, name: 'bar' },
    ]);
    await renderTable(
      {
        ...baseSettings(),
        columns: {
          id: { title: 'ID' },
          name: { title: 'Name', filter: true },
        },
      },
      ds,
    );
    expect(fixture.nativeElement.querySelectorAll('tr.ng2-smart-row').length).toBe(2);

    ds.setFilter([{ field: 'name', search: 'foo' }], true, true);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr.ng2-smart-row').length).toBe(1);
  });

  it('should paginate when pager is enabled', async () => {
    const rows = Array.from({ length: 15 }, (_, i) => ({ id: i, name: `n${i}` }));
    const ds = new LocalDataSource(rows);
    await renderTable(
      {
        ...baseSettings(),
        pager: { display: true, page: 1, perPage: 10 },
      },
      ds,
    );
    expect(fixture.nativeElement.querySelectorAll('tr.ng2-smart-row').length).toBe(10);

    ds.setPage(2);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('tr.ng2-smart-row').length).toBe(5);
  });

  it('should emit rowHover when hovering a row', async () => {
    await renderTable(baseSettings(), new LocalDataSource([{ id: 1, name: 'a' }]));
    const hoverSpy = jasmine.createSpy('rowHover');
    component.rowHover.subscribe(hoverSpy);

    const row = fixture.debugElement.query(By.css('tr.ng2-smart-row'));
    expect(row).toBeTruthy();
    row.triggerEventHandler('mouseover', {});
    expect(hoverSpy).toHaveBeenCalled();
  });
});

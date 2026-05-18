import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

import { LocalDataSource } from './data-source/local/local.data-source';
import { Grid } from './grid';

describe('Grid', () => {
  const baseSettings = () => ({
    columns: {
      id: { title: 'ID' },
    },
    pager: { display: false, page: 1, perPage: 10 },
    actions: { add: false, edit: false, delete: false, custom: [], position: 'left' },
    selectMode: 'single',
    selectedRowIndex: 0,
    switchPageToSelectedRowPage: false,
    hideHeader: false,
    hideSubHeader: false,
    filter: { inputClass: '' },
    edit: { inputClass: '', editButtonContent: '', saveButtonContent: '', cancelButtonContent: '', confirmSave: false },
    add: { inputClass: '', addButtonContent: '', createButtonContent: '', cancelButtonContent: '', confirmCreate: false },
    delete: { deleteButtonContent: '', confirmDelete: false },
    attr: { id: '', class: '' },
    noDataMessage: 'No data found',
    rowClassFunction: () => '',
  });

  it('setSource swaps source; processDataChange applies filter payload', async () => {
    const ds1 = new LocalDataSource([{ id: 1 }]);
    const grid = new Grid(ds1, baseSettings());
    await firstValueFrom(ds1.onChanged().pipe(take(1)));
    expect(grid.getRows().length).toBe(1);

    const ds2 = new LocalDataSource([{ id: 2 }, { id: 3 }]);
    grid.setSource(ds2);
    await firstValueFrom(ds2.onChanged().pipe(take(1)));
    expect((await ds2.getAll()).length).toBe(2);

    grid.processDataChange({
      action: 'filter',
      elements: [{ id: 3 }],
      paging: ds2.getPaging(),
      filter: ds2.getFilter(),
      sort: ds2.getSort(),
    });
    expect(grid.getRows().length).toBe(1);
    expect(grid.getRows()[0].getData().id).toBe(3);
  });

  it('should process add and update actions (pager on)', async () => {
    const ds = new LocalDataSource([{ id: 1 }]);
    const settings = { ...baseSettings(), pager: { display: true, page: 1, perPage: 10 } };
    const grid = new Grid(ds, settings);
    await firstValueFrom(ds.onChanged().pipe(take(1)));

    const added = firstValueFrom(ds.onChanged().pipe(take(1)));
    await ds.add({ id: 2 });
    await added;
    expect(grid.getRows().length).toBeGreaterThan(0);

    const all = await ds.getAll();
    const row2 = all.find((r: any) => r.id === 2)!;
    const updated = firstValueFrom(ds.onChanged().pipe(take(1)));
    await ds.update(row2, { id: 2, name: 'x' });
    await updated;
    const row = grid.getRows().find((r) => r.getData().id === 2);
    expect(row?.getData().name).toBe('x');
  });

  it('detach should unsubscribe from source onChanged', async () => {
    const ds = new LocalDataSource([{ id: 1 }]);
    const grid = new Grid(ds, baseSettings());
    await firstValueFrom(ds.onChanged().pipe(take(1)));
    grid.detach();
    await ds.add({ id: 99 });
    expect(grid.getRows().every((r) => r.getData().id !== 99)).toBe(true);
  });

  it('prepend with pager display still refreshes dataset', async () => {
    const ds = new LocalDataSource([{ id: 1 }]);
    const settings = { ...baseSettings(), pager: { display: true, page: 1, perPage: 10 } };
    const grid = new Grid(ds, settings);
    await firstValueFrom(ds.onChanged().pipe(take(1)));
    const afterPrepend = firstValueFrom(ds.onChanged().pipe(take(1)));
    await ds.prepend({ id: 0 });
    await afterPrepend;
    const ids = grid.getRows().map((r) => r.getData().id);
    expect(ids).toContain(0);
  });
});

import { LocalDataSource } from './local.data-source';

describe('LocalDataSource', () => {
  it('should load data and return elements via getElements', async () => {
    const rows = [{ id: 1, name: 'a' }, { id: 2, name: 'b' }];
    const ds = new LocalDataSource(rows);
    const elements = await ds.getElements();
    expect(elements.length).toBe(2);
    expect(elements[0].id).toBe(1);
  });

  it('should reflect count after load', async () => {
    const ds = new LocalDataSource([]);
    await ds.load([{ id: 1 }]);
    await ds.getElements();
    expect(ds.count()).toBe(1);
  });

  it('should sort ascending', async () => {
    const ds = new LocalDataSource([{ id: 2 }, { id: 1 }]);
    ds.setSort([{ field: 'id', direction: 'asc' }], false);
    const els = await ds.getElements();
    expect(els.map((e: any) => e.id)).toEqual([1, 2]);
  });

  it('should filter AND (default)', async () => {
    const ds = new LocalDataSource([
      { id: 1, name: 'foo', tag: 'a' },
      { id: 2, name: 'bar', tag: 'a' },
    ]);
    ds.setFilter(
      [
        { field: 'name', search: 'f' },
        { field: 'tag', search: 'a' },
      ],
      true,
      false,
    );
    const els = await ds.getElements();
    expect(els.length).toBe(1);
    expect(els[0].id).toBe(1);
  });

  it('should filter OR when andOperator false', async () => {
    const ds = new LocalDataSource([
      { id: 1, name: 'foo', tag: '' },
      { id: 2, name: 'bar', tag: 'xtra' },
    ]);
    ds.setFilter(
      [
        { field: 'name', search: 'foo' },
        { field: 'tag', search: 'x' },
      ],
      false,
      false,
    );
    const els = await ds.getElements();
    expect(els.length).toBe(2);
  });

  it('empty filter clears results to full list', async () => {
    const ds = new LocalDataSource([{ id: 1 }]);
    await ds.setFilter([{ field: 'id', search: '2' }], true, false);
    expect((await ds.getElements()).length).toBe(0);
    await ds.setFilter([], true, false);
    expect((await ds.getElements()).length).toBe(1);
  });

  it('pagination slices data', async () => {
    const rows = Array.from({ length: 25 }, (_, i) => ({ id: i }));
    const ds = new LocalDataSource(rows);
    ds.setPaging(2, 10, false);
    const els = await ds.getElements();
    expect(els.length).toBe(10);
    expect(els[0].id).toBe(10);
  });

  it('update and remove match by rowIdentityKey when references differ', async () => {
    const ds = new LocalDataSource([{ id: 1, name: 'a' }], 'id');
    const stale = { id: 1, name: 'a' };
    await ds.update(stale, { id: 1, name: 'b' });
    const all = await ds.getAll();
    expect(all[0].name).toBe('b');

    await ds.remove({ id: 1, name: 'b' });
    expect((await ds.getAll()).length).toBe(0);
  });

  it('add, append, prepend, update, remove, empty', async () => {
    const ds = new LocalDataSource([{ id: 1 }]);
    await ds.add({ id: 2 });
    expect(ds.count()).toBe(2);

    await ds.append({ id: 3 });
    let all = await ds.getAll();
    expect(all.map((r: any) => r.id)).toContain(3);

    await ds.prepend({ id: 0 });
    all = await ds.getAll();
    expect(all[0].id).toBe(0);

    const row2 = all.find((r: any) => r.id === 2)!;
    await ds.update(row2, { id: 2, name: 'x' });
    all = await ds.getAll();
    expect(all.find((r: any) => r.id === 2)!.name).toBe('x');

    const row1 = all.find((r: any) => r.id === 1)!;
    await ds.remove(row1);
    all = await ds.getAll();
    expect(all.every((r: any) => r.id !== 1)).toBe(true);

    await ds.empty();
    expect((await ds.getAll()).length).toBe(0);
  });
});

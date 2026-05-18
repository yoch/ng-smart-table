import { firstValueFrom } from 'rxjs';

import { SmartCompleterLocalDataSource } from './smart-completer-local.data-source';

describe('SmartCompleterLocalDataSource', () => {
  const users = [
    { user: { name: 'Alice', email: 'a@ex.com' } },
    { user: { name: 'Bob', email: 'bob@ex.com' } },
  ];

  it('normalizeSearchFields: string, CSV, array, nested path', () => {
    expect(SmartCompleterLocalDataSource.normalizeSearchFields('name')).toEqual(['name']);
    expect(SmartCompleterLocalDataSource.normalizeSearchFields('name, email')).toEqual(['name', 'email']);
    expect(SmartCompleterLocalDataSource.normalizeSearchFields(['name'])).toEqual(['name']);
    expect(SmartCompleterLocalDataSource.normalizeSearchFields(undefined)).toEqual([]);
    expect(SmartCompleterLocalDataSource.normalizeSearchFields(null as any)).toEqual([]);
  });

  it('search with string searchFields matches nested user.name', async () => {
    const ds = new SmartCompleterLocalDataSource(users, 'user.name', 'user.name');
    const r = await firstValueFrom(ds.search('ali'));
    expect(r.length).toBe(1);
    expect(ds.getTitle(r[0])).toBe('Alice');
  });

  it('search with CSV searchFields searches multiple fields', async () => {
    const flat = [
      { name: 'Zed', email: 'z@z.com' },
      { name: 'Ann', email: 'other@x.com' },
    ];
    const ds = new SmartCompleterLocalDataSource(flat, 'name,email', 'name');
    const byEmail = await firstValueFrom(ds.search('other'));
    expect(byEmail.length).toBe(1);
    expect(byEmail[0].name).toBe('Ann');
  });

  it('empty data or non-array is safe', async () => {
    const ds = new SmartCompleterLocalDataSource(null as any, ['a'], 'a');
    const r = await firstValueFrom(ds.search('x'));
    expect(r).toEqual([]);
  });

  it('minSearchLength behavior is handled by UI; empty term returns all rows', async () => {
    const ds = new SmartCompleterLocalDataSource([{ n: 'a' }], ['n'], 'n');
    const all = await firstValueFrom(ds.search(''));
    expect(all.length).toBe(1);
  });

  it('descriptionField optional', async () => {
    const ds = new SmartCompleterLocalDataSource([{ t: 'x', d: 'desc' }], ['t'], 't').descriptionField('d');
    const rows = await firstValueFrom(ds.search('x'));
    expect(ds.getDescription(rows[0])).toBe('desc');
  });
});

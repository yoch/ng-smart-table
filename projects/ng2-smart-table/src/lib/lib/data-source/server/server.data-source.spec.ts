import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ServerDataSource } from './server.data-source';

describe('ServerDataSource', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should throw when endPoint is missing', () => {
    expect(() => new ServerDataSource(http, {})).toThrowError(/endPoint/);
  });

  it('should fetch elements and set count from x-total-count header', async () => {
    const ds = new ServerDataSource(http, { endPoint: '/api/items' });
    const p = ds.getElements();
    const req = httpMock.expectOne((r) => r.url === '/api/items');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: 1 }], { headers: { 'x-total-count': '42' } });
    const data = await p;
    expect(data).toEqual([{ id: 1 }]);
    expect(ds.count()).toBe(42);
  });

  it('should use dataKey for nested body', async () => {
    const ds = new ServerDataSource(http, {
      endPoint: '/api/x',
      dataKey: 'data.items',
      totalKey: 'meta.total',
    });
    const p = ds.getElements();
    const req = httpMock.expectOne('/api/x');
    req.flush({
      data: { items: [{ id: 9 }] },
      meta: { total: 1 },
    });
    const data = await p;
    expect(data).toEqual([{ id: 9 }]);
    expect(ds.count()).toBe(1);
  });

  it('should send pager and filter params with #field# placeholder', async () => {
    const ds = new ServerDataSource(http, {
      endPoint: '/api/q',
      filterFieldKey: 'filter[#field#]',
    });
    ds.setPaging(2, 5, false);
    ds.addFilter({ field: 'name', search: 'bob' }, true, false);
    const p = ds.getElements();
    const req = httpMock.expectOne((r) => {
      return r.url === '/api/q' && r.params.get('filter[name]') === 'bob' && r.params.get('_page') === '2';
    });
    expect(req.request.params.get('_limit')).toBe('5');
    req.flush([], { headers: { 'x-total-count': '0' } });
    await p;
  });

  it('should propagate HTTP errors', async () => {
    const ds = new ServerDataSource(http, { endPoint: '/api/err' });
    const p = ds.getElements();
    const req = httpMock.expectOne('/api/err');
    req.flush('fail', { status: 500, statusText: 'Server Error' });
    await expectAsync(p).toBeRejected();
  });

  it('multi-column sort: last configured sort wins in query params (HttpParams single key)', async () => {
    const ds = new ServerDataSource(http, {
      endPoint: '/api/sort',
      sortFieldKey: '_sort',
      sortDirKey: '_order',
    });
    ds.setSort(
      [
        { field: 'a', direction: 'asc' },
        { field: 'b', direction: 'desc' },
      ],
      false,
    );
    const p = ds.getElements();
    const req = httpMock.expectOne((r) => r.url.startsWith('/api/sort'));
    expect(req.request.params.get('_sort')).toBe('b');
    expect(req.request.params.get('_order')).toBe('DESC');
    req.flush([], { headers: { 'x-total-count': '0' } });
    await p;
  });
});

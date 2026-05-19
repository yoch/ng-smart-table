import { findRowIndex, rowsMatch } from './row-identity';

describe('row-identity', () => {
  it('rowsMatch uses reference equality by default', () => {
    const a = { id: 1 };
    const b = { id: 1 };
    expect(rowsMatch(a, a, undefined)).toBe(true);
    expect(rowsMatch(a, b, undefined)).toBe(false);
  });

  it('rowsMatch uses rowIdentityKey when set', () => {
    const a = { id: 1, name: 'a' };
    const b = { id: 1, name: 'b' };
    expect(rowsMatch(a, b, 'id')).toBe(true);
  });

  it('findRowIndex locates element by identity key', () => {
    const data = [{ id: 1 }, { id: 2 }];
    expect(findRowIndex(data, { id: 2 }, 'id')).toBe(1);
  });
});

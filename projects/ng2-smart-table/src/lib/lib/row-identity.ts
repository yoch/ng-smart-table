/**
 * Matches two row data objects by reference or by a configured identity field.
 */
export function rowsMatch(
  a: unknown,
  b: unknown,
  rowIdentityKey?: string | null,
): boolean {
  if (a === b) {
    return true;
  }
  if (!rowIdentityKey || a == null || b == null) {
    return false;
  }
  const key = rowIdentityKey;
  const aRec = a as Record<string, unknown>;
  const bRec = b as Record<string, unknown>;
  const aVal = aRec[key];
  const bVal = bRec[key];
  return aVal !== undefined && aVal !== null && aVal === bVal;
}

export function findRowIndex<T>(
  data: T[],
  element: T,
  rowIdentityKey?: string | null,
): number {
  return data.findIndex((el) => rowsMatch(el, element, rowIdentityKey));
}

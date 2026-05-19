/**
 * Optional TypeScript helpers for @yoch/ng-smart-table settings and events.
 * Column keys remain open-ended; prefer explicit casts for advanced column options.
 */

export type Ng2SmartTableSelectMode = 'single' | 'multi';
export type Ng2SmartTableEditMode = 'inline' | 'external' | 'click-to-edit';
export type Ng2SmartTableActionsPosition = 'left' | 'right';

export interface Ng2SmartTablePagerSettings {
  display?: boolean;
  page?: number;
  perPage?: number;
  perPageSelect?: number[];
}

export interface Ng2SmartTableCustomAction {
  name: string;
  title?: string;
  [key: string]: unknown;
}

export interface Ng2SmartTableActionsSettings {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  custom?: Ng2SmartTableCustomAction[];
  position?: Ng2SmartTableActionsPosition;
}

export interface Ng2SmartTableColumnSettings {
  title?: string;
  type?: string;
  filter?: boolean | Record<string, unknown>;
  editor?: Record<string, unknown>;
  renderComponent?: unknown;
  valuePrepareFunction?: (value: unknown, row: unknown) => unknown;
  [key: string]: unknown;
}

export interface Ng2SmartTableSettings {
  mode?: Ng2SmartTableEditMode;
  selectMode?: Ng2SmartTableSelectMode;
  /** Index in full dataset; < 0 deselects all */
  selectedRowIndex?: number;
  switchPageToSelectedRowPage?: boolean;
  /** Field name used to match rows when object references change (e.g. after server reload) */
  rowIdentityKey?: string;
  hideHeader?: boolean;
  hideSubHeader?: boolean;
  actions?: Ng2SmartTableActionsSettings;
  filter?: { inputClass?: string };
  edit?: Record<string, unknown>;
  add?: Record<string, unknown>;
  delete?: Record<string, unknown>;
  attr?: { id?: string; class?: string };
  noDataMessage?: string;
  columns: Record<string, Ng2SmartTableColumnSettings>;
  pager?: Ng2SmartTablePagerSettings;
  rowClassFunction?: (row: unknown) => string;
}

export interface Ng2SmartTableRowEvent<T = unknown> {
  data: T | null;
  isSelected: boolean | null;
  source: unknown;
}

export interface Ng2SmartTableUserRowSelectEvent<T = unknown> extends Ng2SmartTableRowEvent<T> {
  selected: T[];
}

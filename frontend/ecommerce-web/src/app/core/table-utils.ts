import { RowData } from '../models/app.models';

export function toRows<T extends object>(items: T[]): RowData[] {
  return items.map(item => item as RowData);
}

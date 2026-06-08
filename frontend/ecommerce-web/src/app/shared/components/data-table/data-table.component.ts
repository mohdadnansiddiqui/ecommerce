import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RowData, TableColumn } from '../../../models/app.models';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() rows: RowData[] = [];
  @Input() loading = false;
  @Input() emptyTitle = 'No records found';
  @Input() emptyMessage = 'Try changing filters or refreshing this page.';
  @Input() showViewAction = true;
  @Output() rowSelected = new EventEmitter<RowData>();

  get displayedColumns(): string[] {
    const columns = this.columns.map(column => column.key);
    return this.showViewAction ? [...columns, 'actions'] : columns;
  }

  value(row: RowData, key: string): unknown {
    return row[key];
  }

  statusClass(value: unknown): string {
    const status = String(value).toUpperCase();
    if (['SUCCESS', 'PAID', 'DELIVERED', 'RESOLVED', 'CLOSED'].includes(status)) {
      return 'success';
    }
    if (['FAILED', 'CANCELLED', 'CRITICAL'].includes(status)) {
      return 'danger';
    }
    if (['PENDING', 'PENDING_PAYMENT', 'IN_PROGRESS', 'LOW'].includes(status)) {
      return 'warning';
    }
    return '';
  }

  asNumber(value: unknown): number {
    return typeof value === 'number' ? value : Number(value || 0);
  }

  asString(value: unknown): string {
    return value === null || value === undefined ? '-' : String(value);
  }

  asDate(value: unknown): string | number | Date | null {
    if (value instanceof Date || typeof value === 'string' || typeof value === 'number') {
      return value;
    }
    return null;
  }
}

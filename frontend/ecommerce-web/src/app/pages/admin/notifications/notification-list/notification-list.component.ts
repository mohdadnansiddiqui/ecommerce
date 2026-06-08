import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toRows } from '../../../../core/table-utils';
import { NotificationMessage, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss'
})
export class NotificationListComponent {
  protected readonly notifications = signal<NotificationMessage[]>([]);
  protected readonly form = this.fb.nonNullable.group({ customerId: [1, [Validators.required, Validators.min(1)]] });
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'notificationType', label: 'Type', type: 'status' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly router: Router, private readonly toast: ToastService) {}

  load() {
    const customerId = this.form.controls.customerId.value;
    this.api.get<NotificationMessage[]>('notifications', `/notifications/customers/${customerId}`).subscribe({
      next: notifications => this.notifications.set(notifications),
      error: () => this.toast.error('Unable to load notifications')
    });
  }

  rows() {
    return toRows(this.notifications());
  }

  view(row: Record<string, unknown>) {
    this.router.navigate(['/admin/notifications', this.form.controls.customerId.value, Number(row['id'])]);
  }
}

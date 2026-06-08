import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toRows } from '../../../core/table-utils';
import { NotificationMessage, TableColumn } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  protected readonly notifications = signal<NotificationMessage[]>([]);
  protected readonly form = this.fb.nonNullable.group({ customerId: [1, [Validators.required, Validators.min(1)]] });
  protected readonly columns: TableColumn[] = [
    { key: 'notificationType', label: 'Type', type: 'status' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService) {}

  load() {
    this.api.get<NotificationMessage[]>('notifications', `/notifications/customers/${this.form.controls.customerId.value}`).subscribe(items => this.notifications.set(items));
  }

  rows() {
    return toRows(this.notifications());
  }
}

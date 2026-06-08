import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toRows } from '../../../core/table-utils';
import { Order, TableColumn } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  protected readonly orders = signal<Order[]>([]);
  protected readonly form = this.fb.nonNullable.group({ customerId: [1, [Validators.required, Validators.min(1)]] });
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Order ID', type: 'number' },
    { key: 'totalAmount', label: 'Amount', type: 'currency' },
    { key: 'orderStatus', label: 'Status', type: 'status' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService) {}

  load() {
    this.api.get<Order[]>('orders', `/orders/customers/${this.form.controls.customerId.value}`).subscribe(orders => this.orders.set(orders));
  }

  rows() {
    return toRows(this.orders());
  }
}

import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { toRows } from '../../../../core/table-utils';
import { Payment, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.scss'
})
export class PaymentListComponent {
  protected readonly payments = signal<Payment[]>([]);
  protected readonly form = this.fb.nonNullable.group({ orderId: [1, [Validators.required, Validators.min(1)]] });
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Payment ID', type: 'number' },
    { key: 'orderId', label: 'Order', type: 'number' },
    { key: 'amount', label: 'Amount', type: 'currency' },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'paymentStatus', label: 'Status', type: 'status' },
    { key: 'paymentDate', label: 'Date', type: 'date' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly router: Router, private readonly toast: ToastService) {}

  load() {
    const orderId = this.form.controls.orderId.value;
    this.api.get<Payment[]>('payments', '/payments/history', { orderId }).subscribe({
      next: payments => this.payments.set(payments),
      error: () => this.toast.error('Unable to load payment history')
    });
  }

  rows() {
    return toRows(this.payments());
  }

  view(row: Record<string, unknown>) {
    this.router.navigate(['/admin/payments', Number(row['id'])]);
  }
}

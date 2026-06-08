import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.scss'
})
export class OrderStatusComponent {
  protected readonly backendStatuses = ['PLACED', 'PAID', 'CANCELLED'];
  protected readonly displayStatuses = ['CREATED', 'PENDING_PAYMENT', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
  protected readonly result = signal<Order | null>(null);
  protected readonly orderId = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly form = this.fb.nonNullable.group({
    status: ['CANCELLED', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly api: ApiService, private readonly toast: ToastService) {}

  submit() {
    if (this.form.controls.status.value !== 'CANCELLED') {
      this.toast.info('This backend exposes cancellation only. Other statuses are shown as workflow states.');
      return;
    }
    this.api.post<Order>('orders', `/orders/${this.orderId}/cancel`, {}).subscribe({
      next: order => {
        this.result.set(order);
        this.toast.success('Order cancelled');
      },
      error: () => this.toast.error('Unable to cancel order')
    });
  }
}

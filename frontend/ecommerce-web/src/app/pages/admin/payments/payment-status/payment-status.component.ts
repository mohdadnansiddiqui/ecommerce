import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Payment } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-payment-status',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './payment-status.component.html',
  styleUrl: './payment-status.component.scss'
})
export class PaymentStatusComponent {
  protected readonly payment = signal<Payment | null>(null);
  protected readonly form = this.fb.nonNullable.group({ paymentId: [1, [Validators.required, Validators.min(1)]] });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  load() {
    this.api.get<Payment>('payments', `/payments/${this.form.controls.paymentId.value}`).subscribe({
      next: payment => this.payment.set(payment),
      error: () => this.toast.error('Unable to load payment status')
    });
  }
}

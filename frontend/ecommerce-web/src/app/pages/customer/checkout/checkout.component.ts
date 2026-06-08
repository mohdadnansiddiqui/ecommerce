import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Order } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  protected readonly form = this.fb.group({
    customerId: [1, [Validators.required, Validators.min(1)]],
    items: this.fb.array([this.line()])
  });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  get items(): FormArray {
    return this.form.controls.items;
  }

  addLine() {
    this.items.push(this.line());
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.api.post<Order>('orders', '/orders', this.form.getRawValue()).subscribe({
      next: order => this.toast.success(`Order #${order.id} placed`),
      error: () => this.toast.error('Unable to place order')
    });
  }

  private line() {
    return this.fb.group({
      productId: [1, [Validators.required, Validators.min(1)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
}

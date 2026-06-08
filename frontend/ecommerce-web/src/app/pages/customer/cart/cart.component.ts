import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cart } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  protected readonly cart = signal<Cart | null>(null);
  protected readonly form = this.fb.nonNullable.group({ customerId: [1, [Validators.required, Validators.min(1)]] });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  load() {
    this.api.get<Cart>('carts', `/carts/${this.form.controls.customerId.value}`).subscribe({
      next: cart => this.cart.set(cart),
      error: () => this.toast.error('Unable to load cart')
    });
  }

  remove(itemId: number) {
    const customerId = this.form.controls.customerId.value;
    this.api.delete<Cart>('carts', `/carts/${customerId}/items/${itemId}`).subscribe(cart => this.cart.set(cart));
  }

  clear() {
    const customerId = this.form.controls.customerId.value;
    this.api.delete<void>('carts', `/carts/${customerId}`).subscribe(() => {
      this.cart.set(null);
      this.toast.success('Cart cleared');
    });
  }
}

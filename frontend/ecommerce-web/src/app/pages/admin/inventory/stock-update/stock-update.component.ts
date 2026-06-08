import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Inventory } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-stock-update',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './stock-update.component.html',
  styleUrl: './stock-update.component.scss'
})
export class StockUpdateComponent {
  protected readonly updated = signal<Inventory | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    productId: [1, [Validators.required, Validators.min(1)]],
    availableQuantity: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { productId, availableQuantity } = this.form.getRawValue();
    this.api.patch<Inventory>('inventory', `/inventory/products/${productId}/stock`, { availableQuantity }).subscribe({
      next: inventory => {
        this.updated.set(inventory);
        this.toast.success('Stock updated');
      },
      error: () => this.toast.error('Unable to update stock')
    });
  }
}

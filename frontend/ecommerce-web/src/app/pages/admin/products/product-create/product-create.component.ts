import { Component, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductPayload } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss'
})
export class ProductCreateComponent {
  protected readonly saving = signal(false);
  protected readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(160)]],
    description: [''],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
    imageUrl: ['']
  });
  protected readonly preview = computed(() => this.form.controls.imageUrl.value);

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.api.post<Product>('products', '/products', this.form.getRawValue() as ProductPayload).subscribe({
      next: product => {
        this.saving.set(false);
        this.toast.success('Product created');
        this.router.navigate(['/admin/products', product.id]);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error('Unable to create product');
      }
    });
  }
}

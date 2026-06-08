import { Component, OnInit, computed, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductPayload } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.scss'
})
export class ProductUpdateComponent implements OnInit {
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly productId = Number(this.route.snapshot.paramMap.get('id'));
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
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: ApiService,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.api.get<Product>('products', `/products/${this.productId}`).subscribe({
      next: product => {
        this.loading.set(false);
        this.form.patchValue(product);
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Unable to load product');
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    this.api.put<Product>('products', `/products/${this.productId}`, this.form.getRawValue() as ProductPayload).subscribe({
      next: product => {
        this.saving.set(false);
        this.toast.success('Product updated');
        this.router.navigate(['/admin/products', product.id]);
      },
      error: () => {
        this.saving.set(false);
        this.toast.error('Unable to update product');
      }
    });
  }
}

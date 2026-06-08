import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-product-details',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './customer-product-details.component.html',
  styleUrl: './customer-product-details.component.scss'
})
export class CustomerProductDetailsComponent implements OnInit {
  protected readonly product = signal<Product | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    customerId: [1, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.api.get<Product>('products', `/products/${this.route.snapshot.paramMap.get('id')}`).subscribe(product => this.product.set(product));
  }

  addToCart() {
    const product = this.product();
    if (!product) {
      return;
    }
    const payload = { ...this.form.getRawValue(), productId: product.id };
    this.api.post('carts', '/carts/items', payload).subscribe({
      next: () => this.toast.success('Added to cart'),
      error: () => this.toast.error('Unable to add item to cart')
    });
  }
}

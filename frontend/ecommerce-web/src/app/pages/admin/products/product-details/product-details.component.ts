import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  protected readonly loading = signal(false);
  protected readonly product = signal<Product | null>(null);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly api: ApiService,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.api.get<Product>('products', `/products/${this.route.snapshot.paramMap.get('id')}`)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: product => this.product.set(product),
        error: () => this.toast.error('Product not found')
      });
  }

  edit() {
    const product = this.product();
    if (product) {
      this.router.navigate(['/admin/products', product.id, 'edit']);
    }
  }
}

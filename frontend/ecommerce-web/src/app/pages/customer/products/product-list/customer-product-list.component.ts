import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-product-list',
  standalone: true,
  imports: [SharedUiModule, SearchBarComponent],
  templateUrl: './customer-product-list.component.html',
  styleUrl: './customer-product-list.component.scss'
})
export class CustomerProductListComponent implements OnInit {
  protected readonly products = signal<Product[]>([]);

  constructor(private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load(query = '') {
    const path = query ? '/products/search' : '/products';
    const params = query ? { query } : undefined;
    this.api.get<Product[]>('products', path, params).subscribe({
      next: products => this.products.set(products),
      error: () => this.toast.error('Unable to load products')
    });
  }
}

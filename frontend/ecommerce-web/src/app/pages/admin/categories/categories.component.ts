import { Component, OnInit, signal } from '@angular/core';
import { Product, TableColumn } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  protected readonly loading = signal(false);
  protected readonly rows = signal<Record<string, unknown>[]>([]);
  protected readonly columns: TableColumn[] = [
    { key: 'category', label: 'Category' },
    { key: 'products', label: 'Products', type: 'number' },
    { key: 'stock', label: 'Catalog Stock', type: 'number' }
  ];

  constructor(private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.loading.set(true);
    this.api.get<Product[]>('products', '/products').subscribe({
      next: products => {
        this.loading.set(false);
        const grouped = products.reduce<Record<string, { category: string; products: number; stock: number }>>((acc, product) => {
          const current = acc[product.category] ?? { category: product.category, products: 0, stock: 0 };
          current.products += 1;
          current.stock += product.stockQuantity;
          acc[product.category] = current;
          return acc;
        }, {});
        this.rows.set(Object.values(grouped));
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Unable to load categories');
      }
    });
  }
}

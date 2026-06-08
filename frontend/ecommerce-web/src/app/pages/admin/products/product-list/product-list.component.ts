import { Component, OnInit, computed, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Product } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [SharedUiModule, SearchBarComponent, PaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  protected readonly loading = signal(false);
  protected readonly products = signal<Product[]>([]);
  protected readonly query = signal('');
  protected readonly categoryFilter = signal('all');
  protected readonly page = signal(0);
  protected readonly pageSize = 8;
  protected readonly displayedColumns = ['id', 'name', 'category', 'price', 'stockQuantity', 'createdAt', 'actions'];
  protected readonly categories = computed(() =>
    [...new Set(this.products().map(product => product.category).filter(Boolean))].sort((left, right) => left.localeCompare(right))
  );
  protected readonly filteredProducts = computed(() => {
    const term = this.query().toLowerCase();
    const category = this.categoryFilter();
    return this.products().filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesTerm =
        !term ||
        [product.name, product.category, product.description, String(product.id)].some(value => value?.toLowerCase().includes(term));
      return matchesCategory && matchesTerm;
    });
  });
  protected readonly pagedProducts = computed(() => {
    const start = this.page() * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  constructor(
    private readonly api: ApiService,
    private readonly dialog: MatDialog,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.load();
  }

  load(searchTerm = this.query()) {
    const query = searchTerm.trim();
    this.loading.set(true);
    this.query.set(query);
    this.page.set(0);
    const path = query ? '/products/search' : '/products';
    const params = query ? { query } : undefined;

    this.api.get<Product[]>('products', path, params)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: products => this.products.set(products),
        error: () => this.toast.error('Unable to load products')
      });
  }

  filterCategory(category: string) {
    this.categoryFilter.set(category);
    this.page.set(0);
  }

  view(product: Product) {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: product,
      width: '720px',
      maxWidth: '92vw'
    });
  }

  confirmDelete(product: Product) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete product',
        message: `Delete ${product.name}? This removes the product through product-service.`,
        confirmLabel: 'Delete'
      }
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.delete(product);
      }
    });
  }

  private delete(product: Product) {
    this.loading.set(true);
    this.api.delete<void>('products', `/products/${product.id}`)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.products.update(products => products.filter(item => item.id !== product.id));
          this.toast.success('Product deleted');
        },
        error: () => this.toast.error('Unable to delete product')
      });
  }
}

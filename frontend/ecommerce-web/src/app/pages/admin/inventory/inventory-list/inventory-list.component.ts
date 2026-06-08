import { Component, OnInit, signal } from '@angular/core';
import { catchError, finalize, forkJoin, of, switchMap } from 'rxjs';
import { toRows } from '../../../../core/table-utils';
import { Inventory, Product, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.scss'
})
export class InventoryListComponent implements OnInit {
  protected readonly loading = signal(false);
  protected readonly inventory = signal<Inventory[]>([]);
  protected readonly columns: TableColumn[] = [
    { key: 'productId', label: 'Product ID', type: 'number' },
    { key: 'availableQuantity', label: 'Available', type: 'number' },
    { key: 'warehouseLocation', label: 'Warehouse' }
  ];

  constructor(private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.loading.set(true);
    this.api.get<Product[]>('products', '/products').pipe(
      switchMap(products => forkJoin(products.slice(0, 12).map(product =>
        this.api.get<Inventory>('inventory', `/inventory/products/${product.id}/stock`).pipe(catchError(() => of(null)))
      ))),
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: rows => this.inventory.set(rows.filter((row): row is Inventory => row !== null)),
      error: () => this.toast.error('Unable to load inventory')
    });
  }

  protected rows() {
    return toRows(this.inventory());
  }
}

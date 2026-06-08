import { Component, OnInit, signal } from '@angular/core';
import { toRows } from '../../../../core/table-utils';
import { Product, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-low-stock',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './low-stock.component.html',
  styleUrl: './low-stock.component.scss'
})
export class LowStockComponent implements OnInit {
  protected readonly products = signal<Product[]>([]);
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Product ID', type: 'number' },
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    { key: 'stockQuantity', label: 'Stock', type: 'number' }
  ];

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.api.get<Product[]>('products', '/products').subscribe(products => {
      this.products.set(products.filter(product => product.stockQuantity <= 10));
    });
  }

  protected rows() {
    return toRows(this.products());
  }
}

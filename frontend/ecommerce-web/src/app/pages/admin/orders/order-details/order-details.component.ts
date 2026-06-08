import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toRows } from '../../../../core/table-utils';
import { Order, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent, LoadingSpinnerComponent],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit {
  protected readonly order = signal<Order | null>(null);
  protected readonly columns: TableColumn[] = [
    { key: 'productId', label: 'Product ID', type: 'number' },
    { key: 'quantity', label: 'Quantity', type: 'number' },
    { key: 'price', label: 'Price', type: 'currency' }
  ];

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.api.get<Order>('orders', `/orders/${this.route.snapshot.paramMap.get('id')}`).subscribe({
      next: order => this.order.set(order),
      error: () => this.toast.error('Unable to load order')
    });
  }

  rows(order: Order) {
    return toRows(order.items);
  }
}

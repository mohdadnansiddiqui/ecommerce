import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toRows } from '../../../../core/table-utils';
import { Order, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent implements OnInit {
  protected readonly customerId = Number(this.route.snapshot.paramMap.get('id'));
  protected readonly orders = signal<Order[]>([]);
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Order ID', type: 'number' },
    { key: 'totalAmount', label: 'Amount', type: 'currency' },
    { key: 'orderStatus', label: 'Status', type: 'status' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit() {
    this.api.get<Order[]>('orders', `/orders/customers/${this.customerId}`).subscribe(orders => this.orders.set(orders));
  }

  rows() {
    return toRows(this.orders());
  }
}

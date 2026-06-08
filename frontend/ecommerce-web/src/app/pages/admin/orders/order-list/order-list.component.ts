import { Component, OnInit, computed, signal } from '@angular/core';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { Customer, Order } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [SharedUiModule, SearchBarComponent, PaginationComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  protected readonly orders = signal<Order[]>([]);
  protected readonly customers = signal<Customer[]>([]);
  protected readonly loading = signal(false);
  protected readonly query = signal('');
  protected readonly statusFilter = signal('all');
  protected readonly customerFilter = signal('all');
  protected readonly page = signal(0);
  protected readonly pageSize = 8;
  protected readonly displayedColumns = ['id', 'customerId', 'totalAmount', 'orderStatus', 'createdAt', 'items', 'actions'];
  protected readonly statuses = computed(() =>
    [...new Set(this.orders().map(order => order.orderStatus).filter(Boolean))].sort((left, right) => left.localeCompare(right))
  );
  protected readonly filteredOrders = computed(() => {
    const term = this.query().toLowerCase();
    const status = this.statusFilter();
    const customer = this.customerFilter();
    return this.orders().filter(order => {
      const matchesStatus = status === 'all' || order.orderStatus === status;
      const matchesCustomer = customer === 'all' || String(order.customerId) === customer;
      const matchesTerm =
        !term ||
        [String(order.id), String(order.customerId), String(order.totalAmount), order.orderStatus].some(value =>
          value.toLowerCase().includes(term)
        );
      return matchesStatus && matchesCustomer && matchesTerm;
    });
  });
  protected readonly pagedOrders = computed(() => {
    const start = this.page() * this.pageSize;
    return this.filteredOrders().slice(start, start + this.pageSize);
  });

  constructor(private readonly api: ApiService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.api.get<Customer[]>('customers', '/customers')
      .pipe(
        catchError(() => of([])),
        switchMap(customers => {
          const customerIds = customers.length ? customers.map(customer => customer.id) : [1];
          const requests = customerIds.map(id =>
            this.api.get<Order[]>('orders', `/orders/customers/${id}`).pipe(catchError(() => of([])))
          );
          return forkJoin(requests).pipe(map(orderGroups => ({ customers, orders: orderGroups.flat() })));
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: ({ customers, orders }) => {
          this.customers.set(customers);
          this.orders.set([...orders].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()));
          this.page.set(0);
        },
        error: () => this.toast.error('Unable to load orders')
      });
  }

  search(term: string) {
    this.query.set(term.trim());
    this.page.set(0);
  }

  filterStatus(status: string) {
    this.statusFilter.set(status);
    this.page.set(0);
  }

  filterCustomer(customerId: string) {
    this.customerFilter.set(customerId);
    this.page.set(0);
  }

  statusClass(status: string): string {
    const normalized = status.toUpperCase();
    if (['PAID', 'SUCCESS', 'DELIVERED'].includes(normalized)) {
      return 'success';
    }
    if (['CANCELLED', 'FAILED'].includes(normalized)) {
      return 'danger';
    }
    return 'warning';
  }
}

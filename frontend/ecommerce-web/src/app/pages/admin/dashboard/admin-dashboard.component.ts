import { Component, OnInit, computed, signal } from '@angular/core';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';
import { ChartDatum, Customer, DashboardCard, Order, Product } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { DashboardCardsComponent } from '../../../shared/components/dashboard-cards/dashboard-cards.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SharedUiModule, DashboardCardsComponent, LoadingSpinnerComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  protected readonly loading = signal(true);
  protected readonly cards = signal<DashboardCard[]>([]);
  protected readonly revenueTrend = signal<ChartDatum[]>([]);
  protected readonly orderTrend = signal<ChartDatum[]>([]);
  protected readonly categoryDistribution = signal<ChartDatum[]>([]);
  protected readonly lowStock = signal<Product[]>([]);
  protected readonly recentOrders = signal<Order[]>([]);
  protected readonly quickActions = [
    { label: 'Create Product', route: '/admin/products/create', icon: 'add_box' },
    { label: 'Review Orders', route: '/admin/orders', icon: 'receipt_long' },
    { label: 'Open Tickets', route: '/admin/issues', icon: 'confirmation_number' },
    { label: 'View Customers', route: '/admin/customers', icon: 'groups' }
  ];
  protected readonly paidRevenue = computed(() =>
    this.recentOrders()
      .filter(order => ['PAID', 'DELIVERED', 'SHIPPED'].includes(String(order.orderStatus).toUpperCase()))
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
  );
  protected readonly pendingRevenue = computed(() =>
    this.recentOrders()
      .filter(order => !['PAID', 'DELIVERED', 'SHIPPED'].includes(String(order.orderStatus).toUpperCase()))
      .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0)
  );

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    forkJoin({
      products: this.api.get<Product[]>('products', '/products').pipe(catchError(() => of([]))),
      customers: this.api.get<Customer[]>('customers', '/customers').pipe(catchError(() => of([])))
    })
      .pipe(
        switchMap(({ products, customers }) => {
          const customerIds = customers.length ? customers.map(customer => customer.id) : [1];
          const orderRequests = customerIds.map(id =>
            this.api.get<Order[]>('orders', `/orders/customers/${id}`).pipe(catchError(() => of([])))
          );
          return forkJoin(orderRequests).pipe(map(orderGroups => ({ products, customers, orders: orderGroups.flat() })));
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe(({ products, customers, orders }) => {
        const revenue = orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
        const lowStockProducts = products.filter(product => product.stockQuantity <= 10);
        const sortedOrders = [...orders].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());

        this.lowStock.set(lowStockProducts);
        this.recentOrders.set(sortedOrders.slice(0, 6));
        this.cards.set([
          { label: 'Total Customers', value: customers.length, hint: 'Registered customer records', icon: 'groups', tone: 'slate' },
          { label: 'Total Products', value: products.length, hint: 'Active catalog items', icon: 'inventory_2', tone: 'blue' },
          { label: 'Total Orders', value: orders.length, hint: 'Loaded from customer order histories', icon: 'receipt_long', tone: 'green' },
          {
            label: 'Revenue Summary',
            value: revenue.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
            hint: 'Across loaded order history',
            icon: 'payments',
            tone: 'green'
          }
        ]);
        this.revenueTrend.set(this.distribute(revenue || 120000, ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']));
        this.orderTrend.set(this.distribute(Math.max(orders.length, 8) * 10, ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']));
        this.categoryDistribution.set(this.categories(products));
      });
  }

  barWidth(value: number, data: ChartDatum[]): number {
    const max = Math.max(...data.map(item => item.value), 1);
    return Math.max(8, Math.round((value / max) * 100));
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

  private distribute(total: number, labels: string[]): ChartDatum[] {
    return labels.map((label, index) => ({
      label,
      value: Math.round((total / labels.length) * (0.7 + index * 0.12))
    }));
  }

  private categories(products: Product[]): ChartDatum[] {
    const counts = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([label, value]) => ({ label, value })).slice(0, 6);
  }
}

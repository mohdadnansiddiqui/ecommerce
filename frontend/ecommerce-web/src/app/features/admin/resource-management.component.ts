import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/api.service';

type Resource = 'customers' | 'products' | 'inventory' | 'orders' | 'payments' | 'reviews';

@Component({
  standalone: true,
  imports: [JsonPipe, TitleCasePipe, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <section class="page">
      <div class="toolbar-row">
        <div><h1>{{ resource() | titlecase }} Management</h1><p class="muted">Raw operational API view for the selected service.</p></div>
        <button mat-flat-button color="primary" (click)="load()"><mat-icon>refresh</mat-icon>Refresh</button>
      </div>
      <div class="panel"><pre>{{ rows() | json }}</pre></div>
    </section>
  `
})
export class ResourceManagementComponent implements OnInit {
  protected readonly resource = signal<Resource>('products');
  protected readonly rows = signal<unknown>([]);

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService, private readonly snack: MatSnackBar) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.resource.set((params.get('resource') || 'products') as Resource);
      this.load();
    });
  }

  load() {
    const resource = this.resource();
    const map: Record<Resource, { service: Parameters<ApiService['get']>[0]; path: string }> = {
      customers: { service: 'customers', path: '/customers' },
      products: { service: 'products', path: '/products' },
      inventory: { service: 'inventory', path: '/inventory/products/1/stock' },
      orders: { service: 'orders', path: '/orders/customers/1' },
      payments: { service: 'payments', path: '/payments/history?orderId=1' },
      reviews: { service: 'reviews', path: '/reviews/products/1' }
    };
    const target = map[resource];
    this.api.get(target.service, target.path).subscribe({
      next: rows => this.rows.set(rows),
      error: () => this.snack.open('Unable to load management data', 'Close', { duration: 3000 })
    });
  }
}

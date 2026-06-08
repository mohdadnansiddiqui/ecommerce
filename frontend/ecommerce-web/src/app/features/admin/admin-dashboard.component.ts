import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <section class="page">
      <div><h1>Admin Dashboard</h1><p class="muted">Operational views for every management surface.</p></div>
      <div class="grid">
        @for (item of resources; track item.route) {
          <a class="panel metric" [routerLink]="item.route">
            <mat-icon>{{ item.icon }}</mat-icon>
            <strong>{{ item.label }}</strong>
            <span class="muted">Open management table</span>
          </a>
        }
      </div>
    </section>
  `
})
export class AdminDashboardComponent {
  protected readonly resources = [
    { label: 'Customers', route: '/admin/customers', icon: 'groups' },
    { label: 'Products', route: '/admin/products', icon: 'inventory_2' },
    { label: 'Inventory', route: '/admin/inventory', icon: 'warehouse' },
    { label: 'Orders', route: '/admin/orders', icon: 'receipt_long' },
    { label: 'Payments', route: '/admin/payments', icon: 'credit_card' },
    { label: 'Reviews', route: '/admin/reviews', icon: 'reviews' }
  ];
}

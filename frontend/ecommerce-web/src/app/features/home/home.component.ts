import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../core/api.service';
import { Product } from '../../core/models';

@Component({
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <section class="page">
      <div class="toolbar-row">
        <div>
          <h1>Commerce Workspace</h1>
          <p class="muted">Products, carts, orders, payments, notifications, and reviews are wired across independent services.</p>
        </div>
        <a mat-flat-button color="primary" routerLink="/products"><mat-icon>search</mat-icon>Browse products</a>
      </div>
      <div class="grid">
        <div class="panel metric"><span class="muted">Products</span><strong>{{ products().length }}</strong><span>Live product-service catalog</span></div>
        <div class="panel metric"><span class="muted">Service Ports</span><strong>9</strong><span>Independent Spring Boot apps</span></div>
        <div class="panel metric"><span class="muted">Security</span><strong>JWT</strong><span>Bearer tokens and role-based UI</span></div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  protected readonly products = signal<Product[]>([]);
  constructor(private readonly api: ApiService) {}
  ngOnInit() {
    this.api.get<Product[]>('products', '/products').subscribe({ next: products => this.products.set(products), error: () => this.products.set([]) });
  }
}

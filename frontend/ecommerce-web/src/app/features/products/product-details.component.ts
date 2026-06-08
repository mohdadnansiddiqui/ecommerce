import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/api.service';
import { Product } from '../../core/models';

@Component({
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule],
  template: `
    <section class="page">
      <a mat-button routerLink="/products"><mat-icon>arrow_back</mat-icon>Products</a>
      @if (product(); as item) {
        <div class="panel product">
          <img [src]="item.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80'" [alt]="item.name">
          <div>
            <p class="muted">{{ item.category }}</p>
            <h1>{{ item.name }}</h1>
            <h2>{{ item.price | currency }}</h2>
            <p>{{ item.description }}</p>
            <p class="muted">{{ item.stockQuantity }} in stock</p>
            <form [formGroup]="form" (ngSubmit)="addToCart()" class="cart-form">
              <mat-form-field appearance="outline">
                <mat-label>Customer ID</mat-label>
                <input matInput type="number" formControlName="customerId">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Quantity</mat-label>
                <input matInput type="number" formControlName="quantity">
              </mat-form-field>
              <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid"><mat-icon>add_shopping_cart</mat-icon>Add to cart</button>
            </form>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .product { display: grid; grid-template-columns: minmax(260px, 420px) 1fr; gap: 24px; align-items: start; }
    img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 8px; border: 1px solid #d8dee8; }
    .cart-form { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 20px; align-items: start; }
    @media (max-width: 800px) { .product { grid-template-columns: 1fr; } }
  `]
})
export class ProductDetailsComponent implements OnInit {
  protected readonly product = signal<Product | null>(null);
  protected readonly form = this.fb.nonNullable.group({
    customerId: [1, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });
  constructor(private readonly route: ActivatedRoute, private readonly fb: FormBuilder, private readonly api: ApiService, private readonly snack: MatSnackBar) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get<Product>('products', `/products/${id}`).subscribe(product => this.product.set(product));
  }
  addToCart() {
    const item = this.product();
    if (!item) return;
    this.api.post('carts', '/carts/items', { ...this.form.getRawValue(), productId: item.id }).subscribe({
      next: () => this.snack.open('Added to cart', 'Close', { duration: 2500 }),
      error: () => this.snack.open('Could not add item', 'Close', { duration: 3000 })
    });
  }
}

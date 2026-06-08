import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/api.service';
import { Cart } from '../../core/models';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSnackBarModule],
  template: `
    <section class="page">
      <div class="toolbar-row">
        <div><h1>Cart</h1><p class="muted">View, update, remove, and clear customer carts.</p></div>
        <form [formGroup]="form" (ngSubmit)="load()" class="lookup">
          <mat-form-field appearance="outline"><mat-label>Customer ID</mat-label><input matInput type="number" formControlName="customerId"></mat-form-field>
          <button mat-flat-button color="primary" type="submit">View</button>
        </form>
      </div>
      <div class="panel">
        @if (cart(); as current) {
          <mat-list>
            @for (item of current.items; track item.id) {
              <mat-list-item>
                <mat-icon matListItemIcon>inventory_2</mat-icon>
                <span matListItemTitle>Product {{ item.productId }}</span>
                <span matListItemLine>Quantity {{ item.quantity }}</span>
                <button mat-icon-button (click)="remove(item.id)" aria-label="Remove"><mat-icon>delete</mat-icon></button>
              </mat-list-item>
            }
          </mat-list>
          <div class="toolbar-row">
            <button mat-stroked-button color="warn" (click)="clear()"><mat-icon>remove_shopping_cart</mat-icon>Clear</button>
            <a mat-flat-button color="primary" routerLink="/checkout"><mat-icon>payments</mat-icon>Checkout</a>
          </div>
        } @else {
          <p class="muted">Load a cart by customer ID.</p>
        }
      </div>
    </section>
  `,
  styles: [`.lookup { display: flex; gap: 12px; align-items: start; flex-wrap: wrap; }`]
})
export class CartComponent {
  protected readonly cart = signal<Cart | null>(null);
  protected readonly form = this.fb.nonNullable.group({ customerId: [1, [Validators.required, Validators.min(1)]] });
  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly snack: MatSnackBar) {}
  load() {
    const id = this.form.controls.customerId.value;
    this.api.get<Cart>('carts', `/carts/${id}`).subscribe({
      next: cart => this.cart.set(cart),
      error: () => this.snack.open('Cart not found', 'Close', { duration: 3000 })
    });
  }
  remove(itemId: number) {
    const customerId = this.form.controls.customerId.value;
    this.api.delete<Cart>('carts', `/carts/${customerId}/items/${itemId}`).subscribe(cart => this.cart.set(cart));
  }
  clear() {
    const customerId = this.form.controls.customerId.value;
    this.api.delete('carts', `/carts/${customerId}`).subscribe(() => this.cart.set(null));
  }
}

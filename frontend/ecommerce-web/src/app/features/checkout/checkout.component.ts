import { Component } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule],
  template: `
    <section class="page">
      <div><h1>Checkout</h1><p class="muted">Place an order by customer and product lines.</p></div>
      <form class="panel form-grid" [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline"><mat-label>Customer ID</mat-label><input matInput type="number" formControlName="customerId"></mat-form-field>
        <div formArrayName="items" class="lines">
          @for (group of items.controls; track $index) {
            <div [formGroupName]="$index" class="line">
              <mat-form-field appearance="outline"><mat-label>Product ID</mat-label><input matInput type="number" formControlName="productId"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Quantity</mat-label><input matInput type="number" formControlName="quantity"></mat-form-field>
            </div>
          }
        </div>
        <button mat-stroked-button type="button" (click)="addLine()"><mat-icon>add</mat-icon>Line</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Place order</button>
      </form>
    </section>
  `,
  styles: [`.lines { display: grid; gap: 12px; grid-column: 1 / -1; } .line { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; }`]
})
export class CheckoutComponent {
  protected readonly form = this.fb.group({
    customerId: [1, [Validators.required, Validators.min(1)]],
    items: this.fb.array([this.line()])
  });
  get items() { return this.form.controls.items as FormArray; }
  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly snack: MatSnackBar) {}
  addLine() { this.items.push(this.line()); }
  submit() {
    this.api.post('orders', '/orders', this.form.getRawValue()).subscribe({
      next: () => this.snack.open('Order placed', 'Close', { duration: 3000 }),
      error: () => this.snack.open('Order failed', 'Close', { duration: 3000 })
    });
  }
  private line() {
    return this.fb.group({ productId: [1, [Validators.required, Validators.min(1)]], quantity: [1, [Validators.required, Validators.min(1)]] });
  }
}

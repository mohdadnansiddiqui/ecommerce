import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiService } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [JsonPipe, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  template: `
    <section class="page">
      <div class="toolbar-row">
        <div><h1>Orders</h1><p class="muted">Lookup records from the orders-service.</p></div>
        <form [formGroup]="form" (ngSubmit)="load()" class="lookup">
          <mat-form-field appearance="outline"><mat-label>customerId</mat-label><input matInput type="number" formControlName="id"></mat-form-field>
          <button mat-flat-button color="primary" type="submit">Load</button>
        </form>
      </div>
      <div class="panel"><pre>{{ rows() | json }}</pre></div>
    </section>
  `,
  styles: [`.lookup { display: flex; gap: 12px; align-items: start; flex-wrap: wrap; }`]
})
export class OrdersComponent {
  protected readonly rows = signal<unknown[]>([]);
  protected readonly form = this.fb.nonNullable.group({ id: [1, [Validators.required, Validators.min(1)]] });
  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly snack: MatSnackBar) {}
  load() {
    this.api.get<unknown[]>('orders', `/orders/customers/${this.form.controls.id.value}`).subscribe({
      next: rows => this.rows.set(rows),
      error: () => this.snack.open('Unable to load records', 'Close', { duration: 3000 })
    });
  }
}

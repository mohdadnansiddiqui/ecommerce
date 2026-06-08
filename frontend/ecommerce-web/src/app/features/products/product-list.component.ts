import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Product } from '../../core/models';

@Component({
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatSortModule, MatTableModule],
  template: `
    <section class="page">
      <div class="toolbar-row">
        <div><h1>Products</h1><p class="muted">Search, sort, and inspect catalog items.</p></div>
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput [formControl]="search">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>
      <div class="panel">
        @if (loading()) {
          <mat-spinner diameter="36" />
        } @else {
          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th><td mat-cell *matCellDef="let row"><a [routerLink]="['/products', row.id]">{{ row.name }}</a></td></ng-container>
            <ng-container matColumnDef="category"><th mat-header-cell *matHeaderCellDef mat-sort-header>Category</th><td mat-cell *matCellDef="let row">{{ row.category }}</td></ng-container>
            <ng-container matColumnDef="price"><th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th><td mat-cell *matCellDef="let row">{{ row.price | currency }}</td></ng-container>
            <ng-container matColumnDef="stockQuantity"><th mat-header-cell *matHeaderCellDef mat-sort-header>Stock</th><td mat-cell *matCellDef="let row">{{ row.stockQuantity }}</td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let row"><a mat-icon-button [routerLink]="['/products', row.id]" aria-label="Open"><mat-icon>open_in_new</mat-icon></a></td></ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;"></tr>
          </table>
          <mat-paginator [pageSize]="10" [pageSizeOptions]="[5,10,25]" />
        }
      </div>
    </section>
  `
})
export class ProductListComponent implements OnInit {
  protected readonly loading = signal(true);
  protected readonly search = new FormControl('', { nonNullable: true });
  protected readonly columns = ['name', 'category', 'price', 'stockQuantity', 'actions'];
  protected readonly dataSource = new MatTableDataSource<Product>([]);
  @ViewChild(MatPaginator) set paginator(value: MatPaginator) { this.dataSource.paginator = value; }
  @ViewChild(MatSort) set sort(value: MatSort) { this.dataSource.sort = value; }
  constructor(private readonly api: ApiService, private readonly snack: MatSnackBar) {}
  ngOnInit() {
    this.load();
    this.search.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(query => this.load(query));
  }
  private load(query = '') {
    this.loading.set(true);
    const request = query ? this.api.get<Product[]>('products', '/products/search', { query }) : this.api.get<Product[]>('products', '/products');
    request.subscribe({
      next: products => { this.dataSource.data = products; this.loading.set(false); },
      error: () => { this.loading.set(false); this.snack.open('Unable to load products', 'Close', { duration: 3000 }); }
    });
  }
}

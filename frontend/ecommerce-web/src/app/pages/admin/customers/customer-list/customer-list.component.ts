import { Component, OnInit, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { toRows } from '../../../../core/table-utils';
import { Customer, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  protected readonly customers = signal<Customer[]>([]);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly query = signal('');
  protected readonly page = signal(0);
  protected readonly pageSize = 8;
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];
  protected readonly filteredCustomers = computed(() => {
    const term = this.query().toLowerCase();
    if (!term) {
      return this.customers();
    }
    return this.customers().filter(customer =>
      [
        String(customer.id),
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.phoneNumber,
        customer.address
      ].some(value => value.toLowerCase().includes(term))
    );
  });
  protected readonly pagedRows = computed(() => {
    const start = this.page() * this.pageSize;
    return toRows(this.filteredCustomers().slice(start, start + this.pageSize));
  });

  constructor(
    private readonly api: ApiService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set('');
    this.api.get<Customer[]>('customers', '/customers')
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: customers => {
          this.customers.set(customers);
          this.page.set(0);
        },
        error: () => {
          this.customers.set([]);
          this.error.set('Unable to load customers from customer-service. Confirm the service is running on port 8082 and try again.');
          this.toast.error('Unable to load customers');
        }
      });
  }

  search(term: string) {
    this.query.set(term.trim());
    this.page.set(0);
  }

  view(row: Record<string, unknown>) {
    this.router.navigate(['/admin/customers', Number(row['id'])]);
  }
}

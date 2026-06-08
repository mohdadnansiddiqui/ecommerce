import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Customer } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent implements OnInit {
  protected readonly customer = signal<Customer | null>(null);
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly api: ApiService,
    private readonly toast: ToastService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set('');
    this.customer.set(null);
    this.api.get<Customer>('customers', `/customers/${this.id}`)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: customer => this.customer.set(customer),
        error: () => {
          this.error.set(`Unable to load customer ${this.id}. Confirm the record exists and customer-service is available.`);
          this.toast.error('Unable to load customer');
        }
      });
  }
}

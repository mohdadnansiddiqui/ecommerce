import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { toRows } from '../../../../core/table-utils';
import { Review, TableColumn } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent {
  protected readonly reviews = signal<Review[]>([]);
  protected readonly form = this.fb.nonNullable.group({ productId: [1, [Validators.required, Validators.min(1)]] });
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Review ID', type: 'number' },
    { key: 'customerId', label: 'Customer', type: 'number' },
    { key: 'productId', label: 'Product', type: 'number' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviewText', label: 'Review' },
    { key: 'createdAt', label: 'Created', type: 'date' }
  ];

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  load() {
    this.api.get<Review[]>('reviews', `/reviews/products/${this.form.controls.productId.value}`).subscribe({
      next: reviews => this.reviews.set(reviews),
      error: () => this.toast.error('Unable to load reviews')
    });
  }

  rows() {
    return toRows(this.reviews());
  }
}

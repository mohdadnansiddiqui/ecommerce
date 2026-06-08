import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { ToastService } from '../../../services/toast.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  protected readonly reviews = signal<Review[]>([]);
  protected readonly form = this.fb.nonNullable.group({
    customerId: [1, [Validators.required, Validators.min(1)]],
    productId: [1, [Validators.required, Validators.min(1)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    reviewText: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  load() {
    this.api.get<Review[]>('reviews', `/reviews/products/${this.form.controls.productId.value}`).subscribe(reviews => this.reviews.set(reviews));
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.api.post<Review>('reviews', '/reviews', this.form.getRawValue()).subscribe({
      next: review => {
        this.reviews.update(reviews => [review, ...reviews]);
        this.toast.success('Review submitted');
      },
      error: () => this.toast.error('Unable to submit review')
    });
  }
}

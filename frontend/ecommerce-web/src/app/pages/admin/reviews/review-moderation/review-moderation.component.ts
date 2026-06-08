import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Review } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-review-moderation',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './review-moderation.component.html',
  styleUrl: './review-moderation.component.scss'
})
export class ReviewModerationComponent {
  protected readonly reviews = signal<Review[]>([]);
  protected readonly form = this.fb.nonNullable.group({ productId: [1, [Validators.required, Validators.min(1)]] });

  constructor(private readonly fb: FormBuilder, private readonly api: ApiService, private readonly toast: ToastService) {}

  load() {
    this.api.get<Review[]>('reviews', `/reviews/products/${this.form.controls.productId.value}`).subscribe(reviews => this.reviews.set(reviews));
  }

  remove(id: number) {
    this.api.delete<void>('reviews', `/reviews/${id}`).subscribe({
      next: () => {
        this.reviews.update(reviews => reviews.filter(review => review.id !== id));
        this.toast.success('Review removed');
      },
      error: () => this.toast.error('Unable to remove review')
    });
  }
}

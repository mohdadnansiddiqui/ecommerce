import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss'
})
export class PaymentDetailsComponent implements OnInit {
  protected readonly payment = signal<Payment | null>(null);

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit() {
    this.api.get<Payment>('payments', `/payments/${this.route.snapshot.paramMap.get('id')}`).subscribe(payment => this.payment.set(payment));
  }
}

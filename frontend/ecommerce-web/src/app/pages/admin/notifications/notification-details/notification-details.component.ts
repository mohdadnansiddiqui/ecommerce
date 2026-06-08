import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationMessage } from '../../../../models/app.models';
import { ApiService } from '../../../../services/api.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-notification-details',
  standalone: true,
  imports: [SharedUiModule, LoadingSpinnerComponent],
  templateUrl: './notification-details.component.html',
  styleUrl: './notification-details.component.scss'
})
export class NotificationDetailsComponent implements OnInit {
  protected readonly notification = signal<NotificationMessage | null>(null);

  constructor(private readonly route: ActivatedRoute, private readonly api: ApiService) {}

  ngOnInit() {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get<NotificationMessage[]>('notifications', `/notifications/customers/${customerId}`).subscribe(notifications => {
      this.notification.set(notifications.find(item => item.id === id) ?? null);
    });
  }
}

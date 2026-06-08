import { Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../../../models/app.models';
import { IssueService } from '../../../../services/issue.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss'
})
export class TicketDetailsComponent {
  protected readonly id = String(this.route.snapshot.paramMap.get('id'));
  protected readonly statuses: Array<Ticket['status']> = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  protected readonly ticket = computed(() => this.issues.getById(this.id));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly issues: IssueService,
    private readonly toast: ToastService
  ) {}

  updateStatus(status: Ticket['status']) {
    this.issues.update(this.id, { status });
    this.toast.success('Ticket status updated');
  }

  statusClass(status: Ticket['status'] | Ticket['priority']): string {
    const normalized = status.toUpperCase();
    if (['RESOLVED', 'CLOSED'].includes(normalized)) {
      return 'success';
    }
    if (['CRITICAL'].includes(normalized)) {
      return 'danger';
    }
    if (['IN_PROGRESS', 'HIGH', 'LOW'].includes(normalized)) {
      return 'warning';
    }
    return '';
  }
}

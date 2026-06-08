import { Component, computed } from '@angular/core';
import { DashboardCard } from '../../../../models/app.models';
import { IssueService } from '../../../../services/issue.service';
import { DashboardCardsComponent } from '../../../../shared/components/dashboard-cards/dashboard-cards.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  imports: [SharedUiModule, DashboardCardsComponent],
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.scss'
})
export class TicketDashboardComponent {
  protected readonly cards = computed<DashboardCard[]>(() => {
    const tickets = this.issues.tickets();
    return [
      { label: 'Open Tickets', value: tickets.filter(ticket => ticket.status === 'OPEN').length, hint: 'Awaiting triage', icon: 'confirmation_number', tone: 'blue' },
      { label: 'In Progress', value: tickets.filter(ticket => ticket.status === 'IN_PROGRESS').length, hint: 'Owned by support', icon: 'hourglass_top', tone: 'amber' },
      { label: 'Resolved', value: tickets.filter(ticket => ticket.status === 'RESOLVED').length, hint: 'Recently completed', icon: 'check_circle', tone: 'green' },
      { label: 'Critical', value: tickets.filter(ticket => ticket.priority === 'Critical').length, hint: 'High attention', icon: 'priority_high', tone: 'red' }
    ];
  });

  constructor(protected readonly issues: IssueService) {}
}

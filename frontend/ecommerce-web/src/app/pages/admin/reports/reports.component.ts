import { Component } from '@angular/core';
import { DashboardCard } from '../../../models/app.models';
import { DashboardCardsComponent } from '../../../shared/components/dashboard-cards/dashboard-cards.component';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedUiModule, DashboardCardsComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  protected readonly cards: DashboardCard[] = [
    { label: 'Revenue Exports', value: 'Ready', hint: 'Payment-service driven', icon: 'request_quote', tone: 'green' },
    { label: 'Catalog Health', value: 'Live', hint: 'Product and inventory signals', icon: 'monitor_heart', tone: 'blue' },
    { label: 'Support Quality', value: 'Tracked', hint: 'Ticket and review workflow', icon: 'support_agent', tone: 'amber' }
  ];
}

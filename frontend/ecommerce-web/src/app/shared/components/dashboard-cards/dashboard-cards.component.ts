import { Component, Input } from '@angular/core';
import { DashboardCard } from '../../../models/app.models';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-dashboard-cards',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent {
  @Input() cards: DashboardCard[] = [];
}

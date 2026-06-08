import { Component, Input } from '@angular/core';
import { NavItem } from '../../../models/app.models';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() title = 'CommerceOS';
  @Input() subtitle = 'Enterprise Suite';
  @Input() logo = 'EC';
  @Input() items: NavItem[] = [];
}

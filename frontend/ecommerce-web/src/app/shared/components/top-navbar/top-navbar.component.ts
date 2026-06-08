import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.scss'
})
export class TopNavbarComponent {
  @Input() title = 'Workspace';
  @Input() portalLink = '/portal/home';
  @Input() portalLabel = 'Customer Portal';
  @Output() menuClicked = new EventEmitter<void>();

  constructor(protected readonly auth: AuthService) {}
}

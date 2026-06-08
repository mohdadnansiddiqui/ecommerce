import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(protected readonly auth: AuthService) {}
}

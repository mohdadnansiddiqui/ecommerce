import { Component } from '@angular/core';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  protected readonly settings = [
    { label: 'API Mode', value: 'Local microservices' },
    { label: 'Authentication', value: 'JWT access token' },
    { label: 'Theme', value: 'Enterprise light' },
    { label: 'Notifications', value: 'Snackbar and portal inbox' }
  ];
}

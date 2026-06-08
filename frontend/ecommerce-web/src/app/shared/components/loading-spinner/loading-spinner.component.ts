import { Component, Input } from '@angular/core';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  @Input() label = 'Loading';
}

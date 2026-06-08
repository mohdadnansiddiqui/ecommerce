import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CUSTOMER_NAV } from '../../core/navigation';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ToastNotificationsComponent } from '../../shared/components/toast-notifications/toast-notifications.component';
import { TopNavbarComponent } from '../../shared/components/top-navbar/top-navbar.component';
import { SharedUiModule } from '../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [
    SharedUiModule,
    RouterOutlet,
    SidebarComponent,
    TopNavbarComponent,
    BreadcrumbComponent,
    FooterComponent,
    ToastNotificationsComponent
  ],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss'
})
export class CustomerLayoutComponent {
  protected readonly opened = signal(true);
  protected readonly nav = CUSTOMER_NAV;

  toggleMenu() {
    this.opened.update(value => !value);
  }
}

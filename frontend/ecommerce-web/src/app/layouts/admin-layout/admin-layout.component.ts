import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ADMIN_NAV } from '../../core/navigation';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { ToastNotificationsComponent } from '../../shared/components/toast-notifications/toast-notifications.component';
import { TopNavbarComponent } from '../../shared/components/top-navbar/top-navbar.component';
import { SharedUiModule } from '../../shared/shared-ui.module';

@Component({
  selector: 'app-admin-layout',
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
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  protected readonly opened = signal(true);
  protected readonly nav = ADMIN_NAV;

  toggleMenu() {
    this.opened.update(value => !value);
  }
}

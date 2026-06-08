import { Component, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SharedUiModule } from '../../shared-ui.module';

interface Crumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  protected readonly crumbs = signal<Crumb[]>([]);

  constructor(private readonly router: Router) {
    this.update(router.url);
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe(event => {
      this.update(event.urlAfterRedirects);
    });
  }

  private update(url: string) {
    const clean = url.split('?')[0] ?? '';
    const parts = clean.split('/').filter(Boolean);
    const crumbs = parts.map((part, index) => ({
      label: this.label(part),
      url: `/${parts.slice(0, index + 1).join('/')}`
    }));
    this.crumbs.set(crumbs);
  }

  private label(part: string): string {
    return part
      .replaceAll('-', ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
}

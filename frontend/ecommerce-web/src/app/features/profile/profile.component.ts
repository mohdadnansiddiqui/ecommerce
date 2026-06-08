import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [JsonPipe, MatIconModule],
  template: `
    <section class="page">
      <div><h1>Profile</h1><p class="muted">Authenticated user context stored by the frontend.</p></div>
      <div class="panel">
        <h2><mat-icon>person</mat-icon> {{ auth.currentUser()?.username }}</h2>
        <pre>{{ auth.currentUser() | json }}</pre>
      </div>
    </section>
  `
})
export class ProfileComponent {
  constructor(protected readonly auth: AuthService) {}
}

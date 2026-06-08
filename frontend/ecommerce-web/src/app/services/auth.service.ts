import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthResponse, User } from '../models/app.models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly currentUser = signal<User | null>(this.readUser());

  constructor(private readonly api: ApiService, private readonly router: Router) {}

  accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  login(usernameOrEmail: string, password: string) {
    return this.api.post<AuthResponse>('auth', '/auth/login', { usernameOrEmail, password }).pipe(
      tap(response => this.storeSession(response))
    );
  }

  register(username: string, email: string, password: string) {
    return this.api.post<User>('auth', '/auth/register', { username, email, password });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigateByUrl('/auth/login');
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

  private storeSession(response: AuthResponse) {
    localStorage.setItem('access_token', response.accessToken);
    localStorage.setItem('refresh_token', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUser.set(response.user);
  }

  private readUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? (JSON.parse(raw) as User) : null;
  }
}

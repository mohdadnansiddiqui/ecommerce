import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule],
  template: `
    <section class="auth-page">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
          <mat-card-subtitle>Use your customer or admin account</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()" class="auth-form">
            <mat-form-field appearance="outline">
              <mat-label>Username or email</mat-label>
              <input matInput formControlName="usernameOrEmail">
              <mat-icon matSuffix>alternate_email</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
              <mat-icon matSuffix>lock</mat-icon>
            </mat-form-field>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || loading()">
              @if (loading()) { <mat-spinner diameter="18" /> } @else { Login }
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <a mat-button routerLink="/register">Create account</a>
        </mat-card-actions>
      </mat-card>
    </section>
  `,
  styles: [`
    .auth-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: linear-gradient(135deg, #eef7ff, #f8fbf3); }
    mat-card { width: min(440px, 100%); border-radius: 8px; }
    .auth-form { display: grid; gap: 14px; margin-top: 18px; }
    button mat-spinner { display: inline-block; margin-right: 8px; }
  `]
})
export class LoginComponent {
  protected readonly loading = signal(false);
  protected readonly form = this.fb.nonNullable.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router, private readonly snack: MatSnackBar) {}

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.auth.login(this.form.controls.usernameOrEmail.value, this.form.controls.password.value).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.loading.set(false);
        this.snack.open('Login failed', 'Close', { duration: 3000 });
      }
    });
  }
}

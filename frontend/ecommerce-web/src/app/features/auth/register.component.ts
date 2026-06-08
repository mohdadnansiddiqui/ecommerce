import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  template: `
    <section class="auth-page">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Register</mat-card-title>
          <mat-card-subtitle>Create a customer account</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="submit()" class="auth-form">
            <mat-form-field appearance="outline"><mat-label>Username</mat-label><input matInput formControlName="username"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Email</mat-label><input matInput formControlName="email"></mat-form-field>
            <mat-form-field appearance="outline"><mat-label>Password</mat-label><input matInput type="password" formControlName="password"></mat-form-field>
            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || loading()">Register</button>
          </form>
        </mat-card-content>
        <mat-card-actions><a mat-button routerLink="/login">Back to login</a></mat-card-actions>
      </mat-card>
    </section>
  `,
  styles: [`
    .auth-page { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: linear-gradient(135deg, #eef7ff, #f8fbf3); }
    mat-card { width: min(460px, 100%); border-radius: 8px; }
    .auth-form { display: grid; gap: 14px; margin-top: 18px; }
  `]
})
export class RegisterComponent {
  protected readonly loading = signal(false);
  protected readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  constructor(private readonly fb: FormBuilder, private readonly auth: AuthService, private readonly router: Router, private readonly snack: MatSnackBar) {}
  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    const value = this.form.getRawValue();
    this.auth.register(value.username, value.email, value.password).subscribe({
      next: () => {
        this.snack.open('Account created', 'Close', { duration: 2500 });
        this.router.navigateByUrl('/login');
      },
      error: () => {
        this.loading.set(false);
        this.snack.open('Registration failed', 'Close', { duration: 3000 });
      }
    });
  }
}

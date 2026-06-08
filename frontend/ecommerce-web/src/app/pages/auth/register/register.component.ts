import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  protected readonly loading = signal(false);
  protected readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly toast: ToastService
  ) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const { username, email, password } = this.form.getRawValue();
    this.auth.register(username, email, password).subscribe({
      next: () => {
        this.loading.set(false);
        this.toast.success('Account created. Sign in to continue.');
        this.router.navigateByUrl('/auth/login');
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Registration failed');
      }
    });
  }
}

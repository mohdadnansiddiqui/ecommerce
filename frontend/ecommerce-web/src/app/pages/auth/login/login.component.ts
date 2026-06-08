import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected readonly loading = signal(false);
  protected readonly form = this.fb.nonNullable.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
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
    const { usernameOrEmail, password } = this.form.getRawValue();
    this.auth.login(usernameOrEmail, password).subscribe({
      next: response => {
        this.loading.set(false);
        this.toast.success('Signed in successfully');
        this.router.navigateByUrl(response.user.roles.includes('ADMIN') ? '/admin/dashboard' : '/portal/home');
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Invalid username or password');
      }
    });
  }
}

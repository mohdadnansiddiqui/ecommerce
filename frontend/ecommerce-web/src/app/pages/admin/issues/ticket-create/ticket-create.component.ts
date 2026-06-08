import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../../../../models/app.models';
import { IssueService } from '../../../../services/issue.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-ticket-create',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './ticket-create.component.html',
  styleUrl: './ticket-create.component.scss'
})
export class TicketCreateComponent {
  protected readonly priorities: Array<Ticket['priority']> = ['Low', 'Medium', 'High', 'Critical'];
  protected readonly statuses: Array<Ticket['status']> = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  protected readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    priority: ['Medium' as 'Low' | 'Medium' | 'High' | 'Critical', Validators.required],
    status: ['OPEN' as 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED', Validators.required],
    customer: ['', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly issues: IssueService, private readonly router: Router, private readonly toast: ToastService) {}

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const ticket = this.issues.create(this.form.getRawValue());
    this.toast.success('Ticket created');
    this.router.navigate(['/admin/issues', ticket.id]);
  }
}

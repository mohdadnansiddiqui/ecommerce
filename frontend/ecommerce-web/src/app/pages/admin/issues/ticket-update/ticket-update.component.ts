import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../../../models/app.models';
import { IssueService } from '../../../../services/issue.service';
import { ToastService } from '../../../../services/toast.service';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-ticket-update',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './ticket-update.component.html',
  styleUrl: './ticket-update.component.scss'
})
export class TicketUpdateComponent {
  protected readonly id = String(this.route.snapshot.paramMap.get('id'));
  protected readonly ticket = this.issues.getById(this.id);
  protected readonly priorities: Array<Ticket['priority']> = ['Low', 'Medium', 'High', 'Critical'];
  protected readonly statuses: Array<Ticket['status']> = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  protected readonly form = this.fb.nonNullable.group({
    title: [this.ticket?.title ?? '', Validators.required],
    description: [this.ticket?.description ?? '', Validators.required],
    priority: [(this.ticket?.priority ?? 'Medium') as Ticket['priority'], Validators.required],
    status: [(this.ticket?.status ?? 'OPEN') as Ticket['status'], Validators.required],
    customer: [this.ticket?.customer ?? '', Validators.required]
  });

  constructor(private readonly fb: FormBuilder, private readonly route: ActivatedRoute, private readonly issues: IssueService, private readonly router: Router, private readonly toast: ToastService) {}

  submit() {
    if (!this.ticket) {
      this.toast.error('Ticket not found');
      this.router.navigate(['/admin/issues']);
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.issues.update(this.id, this.form.getRawValue());
    this.toast.success('Ticket updated');
    this.router.navigate(['/admin/issues', this.id]);
  }
}

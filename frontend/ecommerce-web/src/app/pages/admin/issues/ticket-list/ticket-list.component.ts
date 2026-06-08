import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toRows } from '../../../../core/table-utils';
import { TableColumn, Ticket } from '../../../../models/app.models';
import { IssueService } from '../../../../services/issue.service';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { SearchBarComponent } from '../../../../shared/components/search-bar/search-bar.component';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [SharedUiModule, DataTableComponent, SearchBarComponent, PaginationComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent {
  protected readonly query = signal('');
  protected readonly statusFilter = signal<Ticket['status'] | 'all'>('all');
  protected readonly priorityFilter = signal<Ticket['priority'] | 'all'>('all');
  protected readonly page = signal(0);
  protected readonly pageSize = 8;
  protected readonly statuses: Array<Ticket['status']> = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  protected readonly priorities: Array<Ticket['priority']> = ['Low', 'Medium', 'High', 'Critical'];
  protected readonly columns: TableColumn[] = [
    { key: 'id', label: 'Ticket ID' },
    { key: 'title', label: 'Title' },
    { key: 'priority', label: 'Priority', type: 'status' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'customer', label: 'Customer' },
    { key: 'createdDate', label: 'Created', type: 'date' }
  ];
  protected readonly filteredTickets = computed(() => {
    const term = this.query().toLowerCase();
    const status = this.statusFilter();
    const priority = this.priorityFilter();

    return this.issues.tickets().filter(ticket => {
      const matchesStatus = status === 'all' || ticket.status === status;
      const matchesPriority = priority === 'all' || ticket.priority === priority;
      const matchesTerm =
        !term ||
        [ticket.id, ticket.title, ticket.description, ticket.customer, ticket.priority, ticket.status].some(value =>
          value.toLowerCase().includes(term)
        );

      return matchesStatus && matchesPriority && matchesTerm;
    });
  });
  protected readonly pagedRows = computed(() => {
    const start = this.page() * this.pageSize;
    return toRows(this.filteredTickets().slice(start, start + this.pageSize));
  });

  constructor(protected readonly issues: IssueService, private readonly router: Router) {}

  search(term: string) {
    this.query.set(term.trim());
    this.page.set(0);
  }

  filterStatus(status: Ticket['status'] | 'all') {
    this.statusFilter.set(status);
    this.page.set(0);
  }

  filterPriority(priority: Ticket['priority'] | 'all') {
    this.priorityFilter.set(priority);
    this.page.set(0);
  }

  view(row: Record<string, unknown>) {
    this.router.navigate(['/admin/issues', String(row['id'])]);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() page = 0;
  @Input() pageSize = 10;
  @Input() total = 0;
  @Output() pageChange = new EventEmitter<number>();

  get start(): number {
    return this.total === 0 ? 0 : this.page * this.pageSize + 1;
  }

  get end(): number {
    return Math.min(this.total, (this.page + 1) * this.pageSize);
  }

  get hasPrevious(): boolean {
    return this.page > 0;
  }

  get hasNext(): boolean {
    return this.end < this.total;
  }
}

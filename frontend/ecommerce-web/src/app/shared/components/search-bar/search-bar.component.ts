import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedUiModule } from '../../shared-ui.module';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() placeholder = 'Search';
  @Output() searched = new EventEmitter<string>();

  protected readonly query = new FormControl('', { nonNullable: true });

  submit() {
    this.searched.emit(this.query.value.trim());
  }

  clear() {
    this.query.setValue('');
    this.searched.emit('');
  }
}

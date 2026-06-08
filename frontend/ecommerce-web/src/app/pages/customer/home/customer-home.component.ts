import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../../models/app.models';
import { ApiService } from '../../../services/api.service';
import { SharedUiModule } from '../../../shared/shared-ui.module';

@Component({
  selector: 'app-customer-home',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './customer-home.component.html',
  styleUrl: './customer-home.component.scss'
})
export class CustomerHomeComponent implements OnInit {
  protected readonly products = signal<Product[]>([]);

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.api.get<Product[]>('products', '/products').subscribe(products => this.products.set(products.slice(0, 4)));
  }
}

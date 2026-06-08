import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/app.models';
import { SharedUiModule } from '../../../../shared/shared-ui.module';

@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './product-details-dialog.component.html',
  styleUrl: './product-details-dialog.component.scss'
})
export class ProductDetailsDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected readonly product: Product
  ) {}

  close() {
    this.dialogRef.close();
  }
}

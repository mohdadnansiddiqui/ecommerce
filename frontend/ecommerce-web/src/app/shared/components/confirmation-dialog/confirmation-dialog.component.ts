import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedUiModule } from '../../shared-ui.module';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmLabel: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [SharedUiModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) protected readonly data: ConfirmationDialogData
  ) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}

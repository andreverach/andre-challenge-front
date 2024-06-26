import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; }) {}
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmAction(): void {
    this.dialogRef.close(true);//aqui puedo enviar la data que quiero puede ser el data que entra o cualquier cosa
  }
}

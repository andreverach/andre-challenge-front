import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-confirm-dialog',
  templateUrl: './auth-confirm-dialog.component.html',
  styleUrls: ['./auth-confirm-dialog.component.scss']
})
export class AuthConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AuthConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; }) {}
  
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmAction(): void {
    this.dialogRef.close(true);//aqui puedo enviar la data que quiero puede ser el data que entra o cualquier cosa
  }
}

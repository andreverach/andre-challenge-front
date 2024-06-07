import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AuthConfirmDialogComponent } from './components/auth-confirm-dialog/auth-confirm-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AuthConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent,
    AuthConfirmDialogComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TaskListComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class TaskModule { }

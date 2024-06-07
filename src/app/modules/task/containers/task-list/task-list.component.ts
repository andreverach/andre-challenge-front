import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['title', 'description', 'createdAt', 'status', 'actions'];
  form!: FormGroup;
  currentId: string = "";
  tasksLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private matDialog: MatDialog,
  ) {
    this.buildForm();
  }
  ngOnInit(): void {
    this.getTasks();
  } 

  buildForm(){
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  addTask() {    
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }else{ 
      const newTask: Task = this.form.value;
      if(this.currentId === '') {
        this.taskService.addTask(newTask).subscribe(response => {
          this.getTasks();
        });
      } else {
        this.changeTaskInfo(this.form.value, this.currentId);
      }
    }
  }

  getTasks() {
    this.tasksLoading = true;
    this.dataSource = new MatTableDataSource<Task>([]);
    this.taskService.getTasks().subscribe(response => {
      this.dataSource = new MatTableDataSource<Task>(response);
      this.tasksLoading = false;
      this.resetFormFilter();
    });
  }

  changeTaskInfo(task:Task, id: string, event?: any) {
    //console.log(event);//evento
    //console.log(id);//id
    if(event) task.status = event.checked;
    this.taskService.updateTask(task, id).subscribe(response => {
      this.getTasks();
    });
  }

  updateTask(task: Task) {
    this.form.get('title')?.setValue(task.title);
    this.form.get('description')?.setValue(task.description);
    this.currentId = task.id || '';
  }

  deleteTask(id: string) {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        message: 'Desea eliminar la tarea?',
        title: 'Confirmar acción',
      }
    });
    dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
      if(dialogResult){
        this.taskService.deleteTask(id).subscribe(response => {
          this.getTasks();
        });         
      }
    });     
  }

  goToBack() {
    this.router.navigate(['/']);
  }

  resetFormFilter() {
    this.form.reset();
    this.currentId = "";
  } 
}

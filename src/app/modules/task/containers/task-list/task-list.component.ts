import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Task } from 'src/app/core/models/task';
import { TaskService } from 'src/app/core/services/task.service';

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
      console.log("agregar");
      const newTask: Task = this.form.value;
      if(this.currentId === '') {
        this.taskService.addTask(newTask).subscribe(response => {
          console.log(response)
          this.getTasks();
        });
      } else {
        this.changeTaskInfo(this.form.value, this.currentId);
      }
    }
  }

  getTasks() {
    this.dataSource = new MatTableDataSource<Task>([]);
    this.taskService.getTasks().subscribe(response => {
      this.dataSource = new MatTableDataSource<Task>(response);
    });
  }

  changeTaskInfo(task:Task, id: string, event?: any) {
    console.log(event);//evento
    console.log(id);//id
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
    this.taskService.deleteTask(id).subscribe(response => {
      this.getTasks();
    });
  }

  goToBack() {
    this.router.navigate(['/']);
  }
}

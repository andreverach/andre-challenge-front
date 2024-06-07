import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  getTasks(): Observable<Task[]> { 
    return this.httpClient.get<Task[]>(`${environment.apiBaseV1}tasks`)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),//para manejar errores
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  addTask(task: Task): Observable<string> { 
    return this.httpClient.post<string>(`${environment.apiBaseV1}tasks`, task)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  deleteTask(id: string): Observable<string> { 
    return this.httpClient.delete<string>(`${environment.apiBaseV1}tasks/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  updateTask(task: Task, id: string): Observable<string> { 
    return this.httpClient.put<string>(`${environment.apiBaseV1}tasks/${id}`, task)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),
      tap((response: any) => {
        console.log(response);
      })
    );
  }
}

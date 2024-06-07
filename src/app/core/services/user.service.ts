import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  signIn(user: User): Observable<UserResponse> { 
    return this.httpClient.get<UserResponse>(`${environment.apiBaseV1}users/${user.email}`)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),//para manejar errores
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  signUp(user: User): Observable<UserResponse> { 
    return this.httpClient.post<UserResponse>(`${environment.apiBaseV1}users`, user)
    .pipe(
      catchError((error: HttpErrorResponse) => 'Error'),
      tap((response: any) => {
        console.log(response);
      })
    );
  }
}

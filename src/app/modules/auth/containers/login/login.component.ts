import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User, UserResponse } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { AuthConfirmDialogComponent } from 'src/app/shared/components/auth-confirm-dialog/auth-confirm-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private matDialog: MatDialog,
  ) {
    this.buildForm();
  } 

  buildForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  signIn() {
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }else{            
      const user: User = this.form.value;
      this.userService.signIn(user)
      .subscribe({
        next: this.handleNext.bind(this),
        error: this.handleError.bind(this),
      });
    }    
  }
  handleNext(response: UserResponse) {
    //si existe, direcciona a tareas
    if(response.userExists){
      this.router.navigate(['/tasks/list']);
    } else {
      //en caso no exista. muestra el dialogo para confirmnar la creacion del correo
      const dialogRef = this.matDialog.open(AuthConfirmDialogComponent, {
        width: '450px',
        data: {
          message: 'Este correo no existe, ¿Desea crearlo?',
          title: 'Registrar correo',
        }
      });
      dialogRef.afterClosed().subscribe((dialogResult: boolean) => {
        if(dialogResult){
          const user: User = this.form.value;
          this.userService.signUp(user)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.router.navigate(['/tasks/list']);
            },
            error: (_response) => this.handleError.bind(this),
          });          
        }
      }); 
    }
  }
  handleError(_response: UserResponse) {
    this.router.navigate(['/']);
  }  
}

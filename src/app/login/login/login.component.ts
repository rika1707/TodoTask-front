import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ILoginResponse } from '../../interface/login.interface';
import { IUserRequest } from '../../interface/user.interface';
import { LoginServiceService } from './login-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalRegisterUserComponent } from '../../modals/modal-register-user/modal-register-user.component';
import { ModalServiceService } from '../../modals/modal-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  private readonly _fb=  inject(FormBuilder);
  private readonly _loginSvc = inject(LoginServiceService);
  private readonly _modalSvc = inject(ModalServiceService);
  private readonly _route = inject(Router);
  user!:ILoginResponse;
  errorMessage!: string;

  ngOnInit() {
    this._buildForm();
  }
  private _buildForm():void{
    this.loginForm = this._fb.nonNullable.group({
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  async loginSesion() {
    if(this.loginForm.valid){
      this._loginSvc.login(this.loginForm.value).subscribe({
        next: (response: ILoginResponse) => {
          this.user = response;
          localStorage.setItem('user', JSON.stringify(this.user))
          //resetear el form
          this.loginForm.reset();
          if(response.exito){
              this._route.navigate(['tasks'])
          }
        },
        error: (error) => {
          console.log(error.error.message)
          this.user = error.error;
        }
      })
    }
    this.loginForm.markAllAsTouched();

  }
  get userName() {
    return this.loginForm.get('userName');
  }
  get password() {
    return this.loginForm.get('password');
  }
//funcion que abre el modal para registrar un usuario
  registerUser():void{
    this._modalSvc.openModal<ModalRegisterUserComponent, IUserRequest>(ModalRegisterUserComponent)
  }
}

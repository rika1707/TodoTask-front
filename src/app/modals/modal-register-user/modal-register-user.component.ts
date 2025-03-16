import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { IUserResponse } from '../../interface/login.interface';
import { LoginServiceService } from '../../login/login/login-service.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ModalServiceService } from '../modal-service.service';

const MATERIAL_MODULES = [MatLabel, MatInputModule , MatFormFieldModule , MatDialogModule, MatButtonModule]

@Component({
  selector: 'app-modal-register-user',
  imports: [ReactiveFormsModule, CommonModule, MATERIAL_MODULES],
  templateUrl: './modal-register-user.component.html',
  styleUrl: './modal-register-user.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalRegisterUserComponent implements OnInit {
  private readonly _modalSvc = inject(ModalServiceService)
  private readonly _fb = inject(FormBuilder);
  private readonly _loginSvc = inject(LoginServiceService)
  userForm!: FormGroup;
  private readonly _mat_dialog = inject(MAT_DIALOG_DATA)
  message!:IUserResponse
  private _snackBar = inject(MatSnackBar);


    //creando formulario de usuario
    private _buildForm():void{
    this.userForm = this._fb.nonNullable.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      confirmPassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    },
    { validators: this.passwordsMatch });
  }


  ngOnInit() {
    this._buildForm();
  }

  async onSubmitUser() {
    this._loginSvc.createUser(this.userForm.value).subscribe({
      next: (response: IUserResponse) => {
        this.message = response;
        this._snackBar.open(this.message.message,'', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.userForm.reset();
      },
      error: (error) => {
        console.error(error);
      }
    })
    this.userForm.markAllAsTouched();
    this._modalSvc.closeModal();
  }

  getTitle():string{
    return this._mat_dialog.data ? 'Editar' : 'Agregar'
  }

  onNoClick():void {
    this._modalSvc.closeModal();
  }

   //capturar todos los campos para validacion de formulario
  get userFormControls(): any {
    return this.userForm.controls;
  }

   //validacion de contraseñas para coincidir
   passwordsMatch(control: AbstractControl) {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    console.log(confirmPassword)
    return password === confirmPassword ? null : { mismatch: true };
  }
}

import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';

import { CommonModule } from '@angular/common';
import { ITodoResponse } from '../../interface/todo.interface';
import { IUserResponse } from '../../interface/login.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalServiceService } from '../modal-service.service';
import { ModalTaskService } from './modal-task-service';

const MATERIAL_MODULES = [MatLabel, MatInputModule , MatFormFieldModule , MatDialogModule, MatButtonModule]
@Component({
  selector: 'app-modal-dialog',
  imports: [ReactiveFormsModule, CommonModule, MATERIAL_MODULES],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDialogComponent implements OnInit {

  private readonly _modalSvc = inject(ModalServiceService)
  private readonly _modalTaskSvc = inject(ModalTaskService)

  private readonly _fb = inject(FormBuilder);
  taskForm!: FormGroup;

//instancia para ejecutar notificaciones
  private _snackBar = inject(MatSnackBar);

  private readonly _mat_dialog = inject(MAT_DIALOG_DATA)
  titulo = this._mat_dialog.data ? this._mat_dialog.data.titulo : ''
  descripcion = this._mat_dialog.data ? this._mat_dialog.data.descripcion : ''

  ngOnInit() {
    this._buildForm();
  }
  private _buildForm():void{
    //creando formulario de tarea
    this.taskForm = this._fb.nonNullable.group({
      titulo: [this.titulo || '', [Validators.required, Validators.maxLength(50)]],
      descripcion: [this.descripcion || '', [Validators.required, Validators.maxLength(250)]]
    });

  }

  async onSubmit() {
    if(this._mat_dialog.data)
    {
      //actualizando la tarea
      const updateTask:ITodoResponse = {
        id: this._mat_dialog.data.id,
        userId: this._mat_dialog.data.userId || '',
        titulo: this.taskForm.get('titulo')?.value || '',
        descripcion: this.taskForm.get('descripcion')?.value  || '',
        estado: 'pendiente',
      }
      this._modalTaskSvc.updateTask(updateTask).subscribe({
        next: (resp:IUserResponse) => {
          this._snackBar.open(resp.message,'', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.taskForm.reset();
          this._modalSvc.closeModal();
          this._modalTaskSvc.notifyTaskCreated()

        },
        error: (error) => {
          console.log('Error al actualizar la tarea: ' + error.error.message);
        }
      })
    }else{
      this._modalTaskSvc.createTask(this.taskForm.value).subscribe({
        next: (resp:IUserResponse) => {
          this._snackBar.open(resp.message,'', {
            duration: 2000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.taskForm.reset();
          this._modalSvc.closeModal();
          this._modalTaskSvc.notifyTaskCreated()

        },
        error: (error) => {
          console.log('Error al crear la tarea: ' + error.error.message);
        }
      })
    }

    this.taskForm.markAllAsTouched();

  }

  getTitle():string{
    return this._mat_dialog.data ? 'Editar' : 'Agregar'
  }

  onNoClick():void {
    this._modalSvc.closeModal();
  }

  //capturar todos los campos para validacion de formulario
  get taskFormControls(): any {
    return this.taskForm.controls;
  }
}

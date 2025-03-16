//angular material

import {ChangeDetectionStrategy, Component, Input, inject} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ITodoResponse } from '../../interface/todo.interface';
import { IUserResponse } from '../../interface/login.interface';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDialogComponent } from '../../modals/modal-register-task/modal-dialog.component';
import { ModalServiceService } from '../../modals/modal-service.service';
import { ModalTaskService } from '../../modals/modal-register-task/modal-task-service';

@Component({
  selector: 'app-todo',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatButtonModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Input() task!:ITodoResponse;

  private readonly _modalSvc = inject(ModalServiceService)
  private readonly _modalTaskSvc = inject(ModalTaskService)
  private _snackBar = inject(MatSnackBar);


  editTask():void{
    this._modalSvc.openModal<ModalDialogComponent, ITodoResponse>(ModalDialogComponent, this.task)
  }

   //funcion que reciber el id de la tarea para procesarla
   processTask(taskId: string): void {
    //implementar acciones para procesar la tarea
    console.log('Procesando la tarea:'+ taskId);
    this._modalTaskSvc.processTask(taskId).subscribe({
      next: (resp:IUserResponse) => {
        this._snackBar.open(resp.message,'', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this._modalSvc.closeModal();
        this._modalTaskSvc.notifyTaskCreated()
      },
      error: (error) => {
        console.log('Error al procesar la tarea: '+ error.error.message);
      }
    })
  }

   //funcion que reciber el id de la tarea para eliminarla
   deleteTask(taskId: string): void {
    //implementar acciones para procesar la tarea
    console.log('Procesando la tarea:'+ taskId);
    this._modalTaskSvc.deleteTask(taskId).subscribe({
      next: (resp:IUserResponse) => {
        this._snackBar.open(resp.message,'', {
          duration: 2000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this._modalSvc.closeModal();
        this._modalTaskSvc.notifyTaskCreated()
      },
      error: (error) => {
        console.log('Error al eliminar la tarea: '+ error.error.message);
      }
    })
  }
}

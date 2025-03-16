import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ITodoResponse } from '../../interface/todo.interface';
import { ListTodoService } from './list-todo.service';
import { MatButtonModule } from '@angular/material/button';
import { ModalDialogComponent } from '../../modals/modal-register-task/modal-dialog.component';
import { ModalServiceService } from '../../modals/modal-service.service';
import { ModalTaskService } from '../../modals/modal-register-task/modal-task-service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TodoComponent } from '../todo/todo.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-todos',
  imports: [TodoComponent, CommonModule, MatButtonModule],
  templateUrl: './list-todos.component.html',
  styleUrl: './list-todos.component.css',
  providers: [ListTodoService]
})
export class ListTodosComponent implements OnInit, OnDestroy {

 tasks!:ITodoResponse[];
 name:string = 'Ricardo';
 user = JSON.parse(localStorage.getItem('user') as string)
 private readonly _modalSvc = inject(ModalServiceService)
 private readonly _modalTaskSvc = inject(ModalTaskService)
private readonly _cdr = inject(ChangeDetectorRef)
 private readonly _listTodoSvc = inject(ListTodoService)
 private destroy$ = new Subject<void>();
 private readonly _route = inject(Router)



  ngOnInit(): void {
    this.loadTodos() // cargar todas las tareas
  this._modalTaskSvc.refreshTasks$.pipe(takeUntil(this.destroy$)).subscribe(()=>{
    console.log('🔄 Refrescando lista de tareas...');
    this.loadTodos() // recarga la lista cuando se cree o edite y elimine una tarea o procese.
  })

  }

  private loadTodos() {
    this._listTodoSvc.getTodos(this.user.id).subscribe({

      next: (todos) =>{
        this.tasks = todos
      this._cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando tareas:', err)
    });
  }
  openDialog():void{
    // Aquí se abre el dialogo para crear una tarea
    this._modalSvc.openModal<ModalDialogComponent>(ModalDialogComponent)
  }

  //funcion para cerrar la sesion, redigirir al login borrar el localstorage
  logout():void{
    localStorage.removeItem('user')
    this._route.navigate(['login']);
  }

// funcion para finalizar subcripciones activas
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}

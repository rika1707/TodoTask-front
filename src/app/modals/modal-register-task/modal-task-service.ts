import { BehaviorSubject, Observable } from 'rxjs';
import { ITodoRequest, ITodoResponse } from '../../interface/todo.interface';
import { Injectable, inject } from '@angular/core';

import { ComponentType } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { IUserResponse } from '../../interface/login.interface';
import {MatDialog} from '@angular/material/dialog'

@Injectable({
  providedIn: 'root'
})
export class ModalTaskService {
  private refreshTasks = new BehaviorSubject<void>(undefined);
  refreshTasks$ = this.refreshTasks.asObservable();

  private readonly _http = inject(HttpClient)

  tasknUrl = 'https://localhost:7134/api/task'
  user = JSON.parse(localStorage.getItem('user') as string)

  notifyTaskCreated() {
    this.refreshTasks.next(); // 🚀 notificar cambios realizados tanto para create como update
  }


 //funcion para crear una tarea
 createTask(task:ITodoRequest):Observable<IUserResponse>{
  task.userId = this.user.id
  return this._http.post<IUserResponse>(this.tasknUrl, task,{
    headers: {
      'Authorization': 'Bearer '+ this.user.token
    }
  })
 }

 //funcion para actualizar la tarea
 updateTask(task:ITodoResponse):Observable<IUserResponse>{
  return this._http.put<IUserResponse>(`${this.tasknUrl}/${task.id}`, task,{
    headers: {
      'Authorization': 'Bearer '+ this.user.token
    }
  })
 }

 //funcion para procesar la tarea
 processTask(id: string): Observable<IUserResponse>{
    return this._http.get<IUserResponse>(`${this.tasknUrl}/process/${id}`,{
      headers: {
        'Authorization': 'Bearer '+ this.user.token
      }
    })
  }
  //funcion para eliminar la tarea
  deleteTask(id: string): Observable<IUserResponse>{
    return this._http.delete<IUserResponse>(`${this.tasknUrl}/${id}`,{
      headers: {
        'Authorization': 'Bearer '+ this.user.token
      }
    })
  }
 //funcion para obtener las tareas

}

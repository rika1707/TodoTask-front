import { HttpClient } from '@angular/common/http';
import { ITodoResponse } from '../../interface/todo.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListTodoService {
  private apiUrl = `${environment.API_URL}/task`; //url de la api


  constructor(private httpClient:HttpClient) { }

  //crear un servicio get para traer la lista de todos
  getTodos(id:string):Observable<ITodoResponse[]> {
    return this.httpClient.get<ITodoResponse[]>(this.apiUrl, {params: {IdUser:id}});
  }
}

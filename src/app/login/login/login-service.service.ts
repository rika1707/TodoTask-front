import { ILoginResponse, IUser, IUserResponse } from '../../interface/login.interface';
import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { IUserRequest } from '../../interface/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly _hhtp = inject(HttpClient)
  loginUrl = 'https://localhost:7134/api/login'
  usernUrl = 'https://localhost:7134/api/users'


  //verifica si hay un token de usuario
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Verifica si hay un token almacenado
  }

  //funcion de login de inicio de sesion
  login({userName, password}: IUser):Observable<ILoginResponse> {
    //llamada a la API para el login
    return this._hhtp.post<ILoginResponse>(this.loginUrl, { userName, password });
  }

  //crear un usuario
  createUser(user: IUserRequest): Observable<IUserResponse> {
    //llamada a la API para crear un nuevo usuario
    return this._hhtp.post<IUserResponse>(this.usernUrl, user);
  }
}

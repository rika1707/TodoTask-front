export interface ILoginResponse {
  exito:    boolean;
  message:  string;
  id:       string;
  userName: string;
  token:    string;
}

export interface IUser {
  userName: string;
  password: string;
}

export interface IUserResponse {
  message : string;
}

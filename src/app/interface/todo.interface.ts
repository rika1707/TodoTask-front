

  export interface ITodoResponse {
  id:          string;
  userId:      string;
  titulo:      string;
  descripcion: string;
  estado?:      string;
  isComplete?:  boolean;
  isDelete?:    boolean;
}

export interface ITodoRequest {
  userId:      string;
  titulo:      string;
  descripcion: string;
}

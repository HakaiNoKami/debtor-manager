export interface Debt {
  _id?: string;
  motivo: string;
  valor: number;
  idUsuario: number;
  uuid?: string;
  criado?: Date;
  __v?: number;
}
